const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const rateLimit = require("express-rate-limit");
const { Resend } = require("resend");
require("dotenv").config();

const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const app = express();

app.use(cors());
app.use(express.json());

// ====================================
// FIREBASE ADMIN
// ====================================

const serviceAccount = require("./serviceAccountKey.json");

try {
    initializeApp({
        credential: cert(serviceAccount)
    });

    console.log("Firebase Admin initialized successfully");
} catch (error) {
    console.error(
        "Firebase initialization error:",
        error.message
    );
}

const firebaseAuth = getAuth();

// ====================================
// RESEND
// ====================================

const resend = new Resend(
    process.env.RESEND_API_KEY
);

// ====================================
// OTP CONFIGURATION
// ====================================

const OTP_EXPIRY_MINUTES = 10;
const MAX_OTP_ATTEMPTS = 5;

const resetRequests = new Map();

// ====================================
// RATE LIMITERS
// ====================================

const requestResetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,

    message: {
        message:
            "Too many reset requests. Try again later."
    }
});

const verifyOtpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,

    message: {
        message:
            "Too many OTP attempts. Try again later."
    }
});

// ====================================
// HELPER FUNCTIONS
// ====================================

function normalizeEmail(email) {
    return String(email || "")
        .trim()
        .toLowerCase();
}

function generateOTP() {
    return crypto
        .randomInt(100000, 1000000)
        .toString();
}

function hashValue(value) {
    return crypto
        .createHash("sha256")
        .update(value)
        .digest("hex");
}

function createResetToken() {
    return crypto
        .randomBytes(32)
        .toString("hex");
}

// ====================================
// HOME
// ====================================

app.get("/", (req, res) => {
    res.json({
        message:
            "CareerPath backend is working!"
    });
});

// ====================================
// FIREBASE TEST
// ====================================

app.get("/api/firebase-test", async (req, res) => {
    try {
        const result =
            await firebaseAuth.listUsers(1);

        res.json({
            success: true,
            message:
                "Firebase Admin is working",
            usersFound:
                result.users.length
        });

    } catch (error) {
        console.error(
            "Firebase test error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message:
                "Firebase test failed"
        });
    }
});

// ====================================
// RESEND TEST
// ====================================

app.get("/api/email-test", async (req, res) => {
    try {
        const testEmail =
            normalizeEmail(
                req.query.email
            );

        if (!testEmail) {
            return res.status(400).json({
                success: false,
                message:
                    "Please provide an email address."
            });
        }

        const { data, error } =
            await resend.emails.send({
                from:
                    process.env.RESEND_FROM_EMAIL ||
                    "onboarding@resend.dev",

                to: [testEmail],

                subject:
                    "CareerPath Resend Test",

                text:
                    "This is a test email from CareerPath."
            });

        if (error) {
            console.error(
                "Resend test error:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Resend email failed.",
                error:
                    error.message ||
                    String(error)
            });
        }

        res.json({
            success: true,
            message:
                "Test email sent successfully.",
            data
        });

    } catch (error) {
        console.error(
            "Email test error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to send test email."
        });
    }
});

// ====================================
// REQUEST PASSWORD RESET
// ====================================

app.post(
    "/api/auth/request-reset",
    requestResetLimiter,

    async (req, res) => {

        const email =
            normalizeEmail(
                req.body.email
            );

        const generalResponse = {
            success: true,

            message:
                "If an account exists with this email, an OTP has been sent."
        };

        if (!email) {
            return res.json(
                generalResponse
            );
        }

        try {

            let userRecord;

            try {

                userRecord =
                    await firebaseAuth.getUserByEmail(
                        email
                    );

            } catch (error) {

                if (
                    error.code ===
                    "auth/user-not-found"
                ) {
                    return res.json(
                        generalResponse
                    );
                }

                throw error;
            }

            const otp =
                generateOTP();

            const otpHash =
                hashValue(otp);

            const resetToken =
                createResetToken();

            const expiresAt =
                Date.now() +
                OTP_EXPIRY_MINUTES *
                60 *
                1000;

            resetRequests.set(email, {

                uid:
                    userRecord.uid,

                otpHash,

                resetToken,

                expiresAt,

                attempts: 0,

                verified: false

            });

            const { data, error } =
                await resend.emails.send({

                    from:
                        process.env.RESEND_FROM_EMAIL ||
                        "onboarding@resend.dev",

                    to: [email],

                    subject:
                        "CareerPath Password Reset OTP",

                    text: `
Hello,

Your CareerPath password reset OTP is:

${otp}

This OTP expires in ${OTP_EXPIRY_MINUTES} minutes.

If you did not request a password reset, ignore this email.

Regards,
CareerPath Team
                    `.trim()

                });

            if (error) {

                console.error(
                    "Resend OTP error:",
                    error
                );

                resetRequests.delete(
                    email
                );

                throw new Error(
                    error.message ||
                    "Resend could not send the OTP email."
                );
            }

            console.log(
                "Password reset OTP email sent:",
                data
            );

            res.json(
                generalResponse
            );

        } catch (error) {

            console.error(
                "Request reset error:",
                error.message
            );

            res.status(500).json({

                success: false,

                message:
                    "Unable to process the reset request."

            });
        }
    }
);

// ====================================
// VERIFY OTP
// ====================================

app.post(
    "/api/auth/verify-reset-otp",
    verifyOtpLimiter,

    async (req, res) => {

        try {

            const email =
                normalizeEmail(
                    req.body.email
                );

            const otp =
                String(
                    req.body.otp || ""
                ).trim();

            if (!email || !otp) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Email and OTP are required."

                });
            }

            const resetRequest =
                resetRequests.get(email);

            if (!resetRequest) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid or expired OTP."

                });
            }

            if (
                Date.now() >
                resetRequest.expiresAt
            ) {

                resetRequests.delete(
                    email
                );

                return res.status(400).json({

                    success: false,

                    message:
                        "OTP has expired."

                });
            }

            if (
                resetRequest.attempts >=
                MAX_OTP_ATTEMPTS
            ) {

                resetRequests.delete(
                    email
                );

                return res.status(400).json({

                    success: false,

                    message:
                        "Too many incorrect attempts."

                });
            }

            resetRequest.attempts++;

            const submittedOtpHash =
                hashValue(otp);

            if (
                submittedOtpHash !==
                resetRequest.otpHash
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid or expired OTP."

                });
            }

            resetRequest.verified =
                true;

            res.json({

                success: true,

                message:
                    "OTP verified successfully.",

                resetToken:
                    resetRequest.resetToken

            });

        } catch (error) {

            console.error(
                "Verify OTP error:",
                error.message
            );

            res.status(500).json({

                success: false,

                message:
                    "Unable to verify OTP."

            });
        }
    }
);

// ====================================
// RESET PASSWORD
// ====================================

app.post(
    "/api/auth/reset-password",

    async (req, res) => {

        try {

            const email =
                normalizeEmail(
                    req.body.email
                );

            const resetToken =
                String(
                    req.body.resetToken || ""
                ).trim();

            const newPassword =
                String(
                    req.body.newPassword || ""
                );

            if (
                !email ||
                !resetToken ||
                !newPassword
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Required fields are missing."

                });
            }

            if (
                newPassword.length < 6
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Password must contain at least 6 characters."

                });
            }

            const resetRequest =
                resetRequests.get(email);

            if (!resetRequest) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid or expired reset request."

                });
            }

            if (
                Date.now() >
                resetRequest.expiresAt
            ) {

                resetRequests.delete(
                    email
                );

                return res.status(400).json({

                    success: false,

                    message:
                        "Reset request has expired."

                });
            }

            if (
                !resetRequest.verified
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Please verify your OTP first."

                });
            }

            if (
                resetRequest.resetToken !==
                resetToken
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid reset token."

                });
            }

            await firebaseAuth.updateUser(
                resetRequest.uid,

                {
                    password:
                        newPassword
                }
            );

            resetRequests.delete(
                email
            );

            res.json({

                success: true,

                message:
                    "Password reset successfully. You can now log in."

            });

        } catch (error) {

            console.error(
                "Reset password error:",
                error.message
            );

            res.status(500).json({

                success: false,

                message:
                    "Unable to reset password."

            });
        }
    }
);

// ====================================
// FREE ROADMAP DATABASE
// ====================================

const roadmapTemplates = {

    python: {
        title: "Python Developer Roadmap",

        overview:
            "Learn Python from the basics and progress toward building real applications, APIs and projects.",

        prerequisites: [
            "Basic computer knowledge",
            "Logical thinking",
            "Basic mathematics"
        ],

        stages: [

            {
                number: 1,
                title: "Python Fundamentals",
                duration: "2-3 weeks",

                description:
                    "Learn Python syntax and programming fundamentals.",

                skills: [
                    "Variables",
                    "Data Types",
                    "Operators",
                    "Conditions",
                    "Loops",
                    "Functions"
                ],

                tools: [
                    "Python",
                    "VS Code"
                ],

                projects: [
                    {
                        title: "Calculator",
                        description:
                            "Build a command-line calculator using Python."
                    },
                    {
                        title: "Number Guessing Game",
                        description:
                            "Create a simple interactive guessing game."
                    }
                ]
            },

            {
                number: 2,
                title: "Intermediate Python",
                duration: "3-4 weeks",

                description:
                    "Develop stronger Python programming skills.",

                skills: [
                    "Lists",
                    "Tuples",
                    "Dictionaries",
                    "Sets",
                    "File Handling",
                    "Exception Handling"
                ],

                tools: [
                    "Python",
                    "VS Code",
                    "Git"
                ],

                projects: [
                    {
                        title: "Student Management System",
                        description:
                            "Create an application to store and manage student information."
                    }
                ]
            },

            {
                number: 3,
                title: "Object Oriented Programming",
                duration: "2-3 weeks",

                description:
                    "Learn how professional Python applications are structured.",

                skills: [
                    "Classes",
                    "Objects",
                    "Inheritance",
                    "Encapsulation",
                    "Polymorphism"
                ],

                tools: [
                    "Python",
                    "GitHub"
                ],

                projects: [
                    {
                        title: "Bank Management System",
                        description:
                            "Build a Python application using classes and objects."
                    }
                ]
            },

            {
                number: 4,
                title: "Web Development with Python",
                duration: "4-6 weeks",

                description:
                    "Learn how Python is used to build backend applications.",

                skills: [
                    "HTTP",
                    "REST APIs",
                    "Flask",
                    "FastAPI",
                    "JSON"
                ],

                tools: [
                    "Flask",
                    "FastAPI",
                    "Postman"
                ],

                projects: [
                    {
                        title: "Student REST API",
                        description:
                            "Create a backend API for student information."
                    }
                ]
            },

            {
                number: 5,
                title: "Databases",
                duration: "3-4 weeks",

                description:
                    "Learn how applications store and retrieve data.",

                skills: [
                    "SQL",
                    "CRUD Operations",
                    "Database Design",
                    "Relationships"
                ],

                tools: [
                    "MySQL",
                    "PostgreSQL"
                ],

                projects: [
                    {
                        title: "Student Database Application",
                        description:
                            "Build an application connected to a relational database."
                    }
                ]
            },

            {
                number: 6,
                title: "Job and Internship Preparation",
                duration: "3-4 weeks",

                description:
                    "Prepare your portfolio and technical skills for internships and fresher roles.",

                skills: [
                    "GitHub",
                    "Resume Building",
                    "Problem Solving",
                    "Interview Preparation"
                ],

                tools: [
                    "GitHub",
                    "LinkedIn"
                ],

                projects: [
                    {
                        title: "Portfolio Project",
                        description:
                            "Build and publish a complete Python project on GitHub."
                    }
                ]
            }

        ],

        internshipPreparation: [
            "Create a GitHub profile",
            "Upload 2-3 Python projects",
            "Build a resume focused on Python",
            "Practice coding problems",
            "Apply for Python internships"
        ],

        careerOptions: [
            "Python Developer",
            "Backend Developer",
            "Software Developer",
            "Automation Developer",
            "Junior API Developer"
        ],

        importantNote:
            "Practice by building projects instead of only watching tutorials."
    },

    cybersecurity: {
        title: "Cybersecurity Roadmap",

        overview:
            "Build cybersecurity knowledge from networking and operating systems to security tools, ethical hacking and practical projects.",

        prerequisites: [
            "Basic computer knowledge",
            "Basic networking concepts",
            "Linux fundamentals"
        ],

        stages: [

            {
                number: 1,
                title: "Computer and Networking Fundamentals",
                duration: "3-4 weeks",

                description:
                    "Understand how computers and networks communicate.",

                skills: [
                    "TCP/IP",
                    "DNS",
                    "HTTP",
                    "Ports",
                    "IP Addresses",
                    "Networking Basics"
                ],

                tools: [
                    "Wireshark",
                    "Cisco Packet Tracer"
                ],

                projects: [
                    {
                        title: "Network Analysis Lab",
                        description:
                            "Capture and study network traffic in a controlled environment."
                    }
                ]
            },

            {
                number: 2,
                title: "Linux Fundamentals",
                duration: "2-3 weeks",

                description:
                    "Learn Linux commands and system administration basics.",

                skills: [
                    "Linux Commands",
                    "File Permissions",
                    "Processes",
                    "Users",
                    "Shell Basics"
                ],

                tools: [
                    "Ubuntu",
                    "Kali Linux"
                ],

                projects: [
                    {
                        title: "Linux Security Lab",
                        description:
                            "Create a controlled Linux lab and practice basic security administration."
                    }
                ]
            },

            {
                number: 3,
                title: "Cybersecurity Fundamentals",
                duration: "3-4 weeks",

                description:
                    "Learn common security concepts and threats.",

                skills: [
                    "CIA Triad",
                    "Authentication",
                    "Authorization",
                    "Cryptography Basics",
                    "Security Threats"
                ],

                tools: [
                    "Wireshark",
                    "Nmap"
                ],

                projects: [
                    {
                        title: "Security Assessment Lab",
                        description:
                            "Perform basic security analysis in your own controlled lab."
                    }
                ]
            },

            {
                number: 4,
                title: "Web Security",
                duration: "4-5 weeks",

                description:
                    "Understand common web application security concepts.",

                skills: [
                    "HTTP",
                    "Sessions",
                    "Authentication",
                    "OWASP Concepts",
                    "Input Validation"
                ],

                tools: [
                    "Burp Suite",
                    "OWASP ZAP"
                ],

                projects: [
                    {
                        title: "Web Security Lab",
                        description:
                            "Practice identifying common vulnerabilities in intentionally vulnerable applications."
                    }
                ]
            },

            {
                number: 5,
                title: "Practical Security Skills",
                duration: "4-6 weeks",

                description:
                    "Develop hands-on skills through legal and controlled security labs.",

                skills: [
                    "Reconnaissance",
                    "Vulnerability Analysis",
                    "Log Analysis",
                    "Incident Response Basics"
                ],

                tools: [
                    "Nmap",
                    "Wireshark",
                    "Burp Suite"
                ],

                projects: [
                    {
                        title: "Security Monitoring Project",
                        description:
                            "Create a small lab for collecting and analyzing security events."
                    }
                ]
            },

            {
                number: 6,
                title: "Career Preparation",
                duration: "3-4 weeks",

                description:
                    "Prepare for cybersecurity internships and entry-level roles.",

                skills: [
                    "Security Portfolio",
                    "CTF Practice",
                    "Resume Building",
                    "Interview Preparation"
                ],

                tools: [
                    "GitHub",
                    "LinkedIn"
                ],

                projects: [
                    {
                        title: "Cybersecurity Portfolio",
                        description:
                            "Document your security labs, projects and learning journey."
                    }
                ]
            }

        ],

        internshipPreparation: [
            "Build a cybersecurity portfolio",
            "Complete legal security labs",
            "Document projects on GitHub",
            "Practice networking and Linux",
            "Apply for cybersecurity internships"
        ],

        careerOptions: [
            "Cybersecurity Analyst",
            "SOC Analyst",
            "Security Analyst",
            "Junior Penetration Tester",
            "Security Engineer"
        ],

        importantNote:
            "Only perform security testing on systems you own or have explicit permission to test."
    }

};

// ====================================
// GENERIC ROADMAP GENERATOR
// ====================================

function createGenericRoadmap(course) {

    return {

        title:
            `${course} Roadmap`,

        overview:
            `This roadmap provides a structured path for learning ${course} from beginner level toward practical projects, internships and entry-level opportunities.`,

        prerequisites: [
            "Basic computer knowledge",
            "Logical thinking",
            "Willingness to practice",
            "Basic communication skills"
        ],

        stages: [

            {
                number: 1,

                title:
                    `${course} Fundamentals`,

                duration:
                    "2-4 weeks",

                description:
                    `Start by learning the fundamental concepts of ${course}.`,

                skills: [
                    `${course} Basics`,
                    "Core Concepts",
                    "Problem Solving",
                    "Terminology"
                ],

                tools: [
                    "VS Code",
                    "Git",
                    "GitHub"
                ],

                projects: [
                    {
                        title:
                            `Beginner ${course} Project`,

                        description:
                            `Build a small project to practice the basic concepts of ${course}.`
                    }
                ]
            },

            {
                number: 2,

                title:
                    "Intermediate Skills",

                duration:
                    "3-5 weeks",

                description:
                    "Move from basic concepts into practical and intermediate skills.",

                skills: [
                    "Problem Solving",
                    "Practical Implementation",
                    "Debugging",
                    "Project Structure"
                ],

                tools: [
                    "VS Code",
                    "GitHub"
                ],

                projects: [
                    {
                        title:
                            `Intermediate ${course} Project`,

                        description:
                            `Create a practical application related to ${course}.`
                    }
                ]
            },

            {
                number: 3,

                title:
                    "Advanced Concepts",

                duration:
                    "4-6 weeks",

                description:
                    `Learn advanced concepts that are commonly used in ${course} careers.`,

                skills: [
                    "Advanced Concepts",
                    "Best Practices",
                    "System Thinking",
                    "Performance"
                ],

                tools: [
                    "GitHub",
                    "Documentation Tools"
                ],

                projects: [
                    {
                        title:
                            `Advanced ${course} Project`,

                        description:
                            `Build a larger project demonstrating practical ${course} skills.`
                    }
                ]
            },

            {
                number: 4,

                title:
                    "Real-World Projects",

                duration:
                    "4-6 weeks",

                description:
                    "Build projects that demonstrate your ability to solve real problems.",

                skills: [
                    "Project Planning",
                    "Problem Solving",
                    "Testing",
                    "Documentation"
                ],

                tools: [
                    "GitHub",
                    "VS Code"
                ],

                projects: [
                    {
                        title:
                            `Real-World ${course} Application`,

                        description:
                            `Create a portfolio-level project based on a real student or business problem.`
                    }
                ]
            },

            {
                number: 5,

                title:
                    "Portfolio and Internship Preparation",

                duration:
                    "3-4 weeks",

                description:
                    "Prepare your portfolio, resume and interview skills.",

                skills: [
                    "Resume Building",
                    "GitHub Portfolio",
                    "Communication",
                    "Interview Preparation"
                ],

                tools: [
                    "GitHub",
                    "LinkedIn"
                ],

                projects: [
                    {
                        title:
                            "Portfolio Website",

                        description:
                            "Create a portfolio website showing your projects and skills."
                    }
                ]
            },

            {
                number: 6,

                title:
                    "Job Readiness",

                duration:
                    "2-4 weeks",

                description:
                    "Prepare for internships, placements and entry-level opportunities.",

                skills: [
                    "Technical Interview",
                    "Aptitude",
                    "Problem Solving",
                    "Resume Optimization"
                ],

                tools: [
                    "GitHub",
                    "LinkedIn"
                ],

                projects: [
                    {
                        title:
                            "Final Capstone Project",

                        description:
                            `Build one complete project that demonstrates your ${course} knowledge.`
                    }
                ]
            }

        ],

        internshipPreparation: [
            "Build at least 2-3 projects",
            "Create and maintain a GitHub profile",
            "Prepare a one-page resume",
            "Create a LinkedIn profile",
            "Practice interview questions",
            `Search for ${course} internships`,
            "Apply consistently"
        ],

        careerOptions: [
            `${course} Intern`,
            `Junior ${course} Professional`,
            `${course} Associate`,
            `${course} Developer`,
            `${course} Analyst`
        ],

        importantNote:
            "The fastest way to improve is to combine learning with projects and consistent practice."
    };
}

// ====================================
// FIND ROADMAP
// ====================================

function getRoadmap(course) {

    const normalized =
        course
            .toLowerCase()
            .trim();

    if (
        normalized.includes("python")
    ) {
        return roadmapTemplates.python;
    }

    if (
        normalized.includes("cyber") ||
        normalized.includes("ethical hacking") ||
        normalized.includes("penetration testing") ||
        normalized.includes("pentesting")
    ) {
        return roadmapTemplates.cybersecurity;
    }

    return createGenericRoadmap(
        course
    );
}

// ====================================
// FREE ROADMAP API
// ====================================

app.post(
    "/api/generate-roadmap",

    async (req, res) => {

        try {

            const course =
                String(
                    req.body.course || ""
                ).trim();

            if (!course) {

                return res.status(400).json({

                    success: false,

                    error:
                        "Please enter a course or career."

                });
            }

            console.log(
                "Generating free roadmap for:",
                course
            );

            const roadmap =
                getRoadmap(course);

            res.json({

                success: true,

                roadmap

            });

        } catch (error) {

            console.error(
                "Roadmap generation error:",
                error.message
            );

            res.status(500).json({

                success: false,

                error:
                    "Unable to generate roadmap."

            });
        }
    }
);

// ====================================
// START SERVER
// ====================================

const PORT =
    process.env.PORT || 5000;

app.listen(
    PORT,

    () => {

        console.log(
            `CareerPath backend running on port ${PORT}`
        );

        console.log(
            "Free roadmap generator is enabled."
        );
    }
);