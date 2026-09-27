require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { initializeApp, cert } = require("firebase-admin/app");

const serviceAccount = require("./serviceAccountKey.json");

// =====================================================
// APP
// =====================================================

const app = express();

app.use(cors());
app.use(express.json());


// =====================================================
// FIREBASE ADMIN
// =====================================================

try {
    initializeApp({
        credential: cert(serviceAccount)
    });

    console.log("Firebase Admin initialized successfully");

} catch (error) {

    console.error("Firebase Admin initialization failed:");
    console.error(error.message);
}


// =====================================================
// BASIC ROUTES
// =====================================================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "CareerPath backend is running"
    });

});


app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        status: "ok",
        service: "CareerPath API"
    });

});


// =====================================================
// CAREER DATABASE
// =====================================================

const careerProfiles = {

    // -------------------------------------------------
    // JAVA
    // -------------------------------------------------

    "java developer": {

        category: "Technology",

        overview:
            "A Java Developer develops software applications using Java, object-oriented programming, databases, APIs and Java frameworks.",

        prerequisites: [
            "Basic computer knowledge",
            "Logical thinking",
            "Basic programming concepts"
        ],

        skills: [
            "Java fundamentals",
            "Object-Oriented Programming",
            "Classes and Objects",
            "Inheritance",
            "Polymorphism",
            "Abstraction",
            "Exception Handling",
            "Collections Framework",
            "Generics",
            "File Handling",
            "Multithreading",
            "Data Structures",
            "Algorithms",
            "SQL",
            "REST APIs",
            "Spring Boot",
            "Git and GitHub"
        ],

        tools: [
            "JDK",
            "IntelliJ IDEA",
            "Eclipse",
            "Maven",
            "Gradle",
            "Postman",
            "MySQL",
            "Git",
            "GitHub"
        ],

        projects: [
            "Java Console Application",
            "Student Management System",
            "Banking Management System",
            "Java Database Application",
            "Spring Boot REST API",
            "E-commerce Backend",
            "Online Booking System"
        ],

        internship:
            "Look for Java Developer, Backend Developer and Spring Boot internships. Build at least two Java projects and maintain a professional GitHub profile.",

        careers: [
            "Java Developer",
            "Backend Developer",
            "Spring Boot Developer",
            "Software Developer",
            "Java Application Developer"
        ]
    },


    // -------------------------------------------------
    // PYTHON
    // -------------------------------------------------

    "python developer": {

        category: "Technology",

        overview:
            "A Python Developer builds software, automation tools, APIs and data-driven applications using Python.",

        prerequisites: [
            "Basic computer knowledge",
            "Logical thinking",
            "Basic programming concepts"
        ],

        skills: [
            "Python fundamentals",
            "Variables and data types",
            "Functions",
            "Object-Oriented Programming",
            "Data Structures",
            "Algorithms",
            "File Handling",
            "Exception Handling",
            "APIs",
            "Databases",
            "Git"
        ],

        tools: [
            "Python",
            "VS Code",
            "PyCharm",
            "Git",
            "GitHub",
            "Postman"
        ],

        projects: [
            "Automation Tool",
            "Student Management System",
            "REST API",
            "Web Application",
            "Data Processing Application"
        ],

        internship:
            "Apply for Python Developer, Backend Developer, Automation and Software Development internships.",

        careers: [
            "Python Developer",
            "Backend Developer",
            "Software Developer",
            "Automation Developer"
        ]
    },


    // -------------------------------------------------
    // FULL STACK
    // -------------------------------------------------

    "full stack developer": {

        category: "Technology",

        overview:
            "A Full Stack Developer builds complete web applications including frontend interfaces, backend services, databases and APIs.",

        prerequisites: [
            "Basic computer knowledge",
            "Basic programming knowledge"
        ],

        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design",
            "React",
            "Node.js",
            "Express.js",
            "REST APIs",
            "Databases",
            "Authentication",
            "Git and GitHub"
        ],

        tools: [
            "VS Code",
            "Git",
            "GitHub",
            "Postman",
            "MongoDB",
            "MySQL"
        ],

        projects: [
            "Portfolio Website",
            "Student Management System",
            "E-commerce Website",
            "Full Stack Authentication System",
            "Job Portal"
        ],

        internship:
            "Build a portfolio and apply for frontend, backend and full-stack internships.",

        careers: [
            "Full Stack Developer",
            "Web Developer",
            "Software Developer",
            "Application Developer"
        ]
    },


    // -------------------------------------------------
    // FRONTEND
    // -------------------------------------------------

    "frontend developer": {

        category: "Technology",

        overview:
            "A Frontend Developer creates the user interface and interactive parts of websites and web applications.",

        prerequisites: [
            "Basic computer knowledge",
            "Interest in web development"
        ],

        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design",
            "React",
            "UI Development",
            "API Integration",
            "Git"
        ],

        tools: [
            "VS Code",
            "Git",
            "GitHub",
            "Chrome DevTools",
            "Figma"
        ],

        projects: [
            "Portfolio Website",
            "Responsive Landing Page",
            "Dashboard UI",
            "E-commerce Frontend"
        ],

        internship:
            "Apply for frontend and UI development internships after building several responsive projects.",

        careers: [
            "Frontend Developer",
            "UI Developer",
            "Web Developer",
            "React Developer"
        ]
    },


    // -------------------------------------------------
    // BACKEND
    // -------------------------------------------------

    "backend developer": {

        category: "Technology",

        overview:
            "A Backend Developer develops server-side applications, APIs, databases and business logic.",

        prerequisites: [
            "Basic programming",
            "Logical thinking"
        ],

        skills: [
            "Programming Fundamentals",
            "REST APIs",
            "Databases",
            "Authentication",
            "Server Development",
            "Data Structures",
            "Algorithms",
            "Git"
        ],

        tools: [
            "Node.js",
            "Express.js",
            "Postman",
            "MongoDB",
            "MySQL",
            "GitHub"
        ],

        projects: [
            "REST API",
            "Authentication API",
            "Student Management Backend",
            "E-commerce Backend"
        ],

        internship:
            "Apply for backend and API development internships.",

        careers: [
            "Backend Developer",
            "API Developer",
            "Server-side Developer",
            "Software Developer"
        ]
    },


    // -------------------------------------------------
    // CYBERSECURITY
    // -------------------------------------------------

    "cybersecurity analyst": {

        category: "Cybersecurity",

        overview:
            "A Cybersecurity Analyst monitors systems, investigates security incidents and helps protect organizations from cyber threats.",

        prerequisites: [
            "Basic computer knowledge",
            "Basic networking knowledge"
        ],

        skills: [
            "Networking",
            "Linux",
            "Cybersecurity Fundamentals",
            "Threat Detection",
            "Incident Response",
            "Vulnerability Assessment",
            "Security Monitoring",
            "Risk Management"
        ],

        tools: [
            "Linux",
            "Wireshark",
            "Nmap",
            "Burp Suite",
            "SIEM Platforms",
            "VirtualBox"
        ],

        projects: [
            "Network Security Lab",
            "Vulnerability Assessment Report",
            "Security Monitoring Dashboard",
            "Incident Response Simulation"
        ],

        internship:
            "Build cybersecurity labs and apply for SOC Analyst, Security Analyst and Cybersecurity internships.",

        careers: [
            "Cybersecurity Analyst",
            "SOC Analyst",
            "Security Analyst",
            "Information Security Analyst"
        ]
    },


    // -------------------------------------------------
    // ETHICAL HACKER
    // -------------------------------------------------

    "ethical hacker": {

        category: "Cybersecurity",

        overview:
            "An Ethical Hacker legally tests systems and applications to identify and report security vulnerabilities.",

        prerequisites: [
            "Networking fundamentals",
            "Linux basics",
            "Cybersecurity fundamentals"
        ],

        skills: [
            "Networking",
            "Linux",
            "Web Security",
            "Vulnerability Assessment",
            "Penetration Testing",
            "OWASP Concepts",
            "Reconnaissance",
            "Security Reporting"
        ],

        tools: [
            "Kali Linux",
            "Nmap",
            "Burp Suite",
            "Wireshark",
            "Metasploit",
            "VirtualBox"
        ],

        projects: [
            "Web Application Security Lab",
            "Network Scanning Lab",
            "OWASP Testing Lab",
            "Security Assessment Report"
        ],

        internship:
            "Build legal security labs and apply for cybersecurity, penetration testing and application security internships.",

        careers: [
            "Ethical Hacker",
            "Penetration Tester",
            "Security Tester",
            "Application Security Analyst"
        ]
    },


    // -------------------------------------------------
    // DATA ANALYST
    // -------------------------------------------------

    "data analyst": {

        category: "Data and AI",

        overview:
            "A Data Analyst collects, cleans, analyzes and visualizes data to support business decisions.",

        prerequisites: [
            "Basic mathematics",
            "Basic computer knowledge"
        ],

        skills: [
            "Statistics",
            "Excel",
            "SQL",
            "Data Cleaning",
            "Data Analysis",
            "Data Visualization",
            "Python",
            "Business Intelligence"
        ],

        tools: [
            "Microsoft Excel",
            "SQL",
            "Python",
            "Pandas",
            "Power BI",
            "Tableau"
        ],

        projects: [
            "Sales Dashboard",
            "Student Performance Analysis",
            "Customer Analysis",
            "Business Analytics Dashboard"
        ],

        internship:
            "Build dashboards and apply for Data Analyst, Business Analyst and BI internships.",

        careers: [
            "Data Analyst",
            "Business Analyst",
            "BI Analyst",
            "Reporting Analyst"
        ]
    },


    // -------------------------------------------------
    // DATA SCIENTIST
    // -------------------------------------------------

    "data scientist": {

        category: "Data and AI",

        overview:
            "A Data Scientist uses statistics, programming and machine learning to discover insights and build predictive models.",

        prerequisites: [
            "Mathematics",
            "Statistics",
            "Basic programming"
        ],

        skills: [
            "Python",
            "Statistics",
            "Probability",
            "Data Cleaning",
            "Data Visualization",
            "Machine Learning",
            "SQL",
            "Feature Engineering"
        ],

        tools: [
            "Python",
            "Jupyter Notebook",
            "Pandas",
            "NumPy",
            "Scikit-learn",
            "Matplotlib",
            "SQL"
        ],

        projects: [
            "Customer Churn Prediction",
            "House Price Prediction",
            "Sales Forecasting",
            "Recommendation System"
        ],

        internship:
            "Create machine learning projects and apply for data science and analytics internships.",

        careers: [
            "Data Scientist",
            "Data Analyst",
            "Machine Learning Engineer",
            "Data Science Associate"
        ]
    },


    // -------------------------------------------------
    // UI/UX
    // -------------------------------------------------

    "ui/ux designer": {

        category: "Design",

        overview:
            "A UI/UX Designer designs digital interfaces and user experiences for websites and applications.",

        prerequisites: [
            "Creative interest",
            "Basic computer skills"
        ],

        skills: [
            "User Research",
            "Wireframing",
            "Prototyping",
            "Visual Design",
            "Typography",
            "Color Theory",
            "Interaction Design",
            "Usability Testing"
        ],

        tools: [
            "Figma",
            "Adobe XD",
            "Photoshop",
            "FigJam"
        ],

        projects: [
            "Mobile App Design",
            "Website Redesign",
            "Student Dashboard",
            "E-commerce UI"
        ],

        internship:
            "Create a strong design portfolio and apply for UI/UX and product design internships.",

        careers: [
            "UI Designer",
            "UX Designer",
            "Product Designer",
            "Interaction Designer"
        ]
    },


    // -------------------------------------------------
    // CONTENT WRITER
    // -------------------------------------------------

    "content writer": {

        category: "Writing and Media",

        overview:
            "A Content Writer creates useful and engaging written content for websites, blogs, businesses and digital platforms.",

        prerequisites: [
            "Interest in writing",
            "Basic language skills",
            "Research ability"
        ],

        skills: [
            "Writing",
            "Grammar",
            "Research",
            "Storytelling",
            "SEO Writing",
            "Keyword Research",
            "Editing",
            "Proofreading",
            "Content Planning"
        ],

        tools: [
            "Google Docs",
            "Microsoft Word",
            "Grammarly",
            "Google Search",
            "Canva",
            "SEO Tools"
        ],

        projects: [
            "Personal Blog",
            "SEO Article Portfolio",
            "Product Descriptions",
            "Website Content",
            "Social Media Content Plan"
        ],

        internship:
            "Create a writing portfolio and apply for content writing, SEO writing and copywriting internships.",

        careers: [
            "Content Writer",
            "SEO Writer",
            "Copywriter",
            "Technical Writer",
            "Content Strategist"
        ]
    },


    // -------------------------------------------------
    // DIGITAL MARKETING
    // -------------------------------------------------

    "digital marketing specialist": {

        category: "Business and Marketing",

        overview:
            "A Digital Marketing Specialist promotes products, services and brands through online marketing channels.",

        prerequisites: [
            "Basic computer knowledge",
            "Interest in marketing"
        ],

        skills: [
            "SEO",
            "Content Marketing",
            "Social Media Marketing",
            "Email Marketing",
            "Keyword Research",
            "Analytics",
            "Advertising",
            "Conversion Optimization"
        ],

        tools: [
            "Google Analytics",
            "Google Search Console",
            "Canva",
            "Google Ads",
            "Meta Business Suite",
            "SEO Tools"
        ],

        projects: [
            "SEO Website",
            "Social Media Campaign",
            "Keyword Research Project",
            "Digital Marketing Campaign",
            "Website Traffic Analysis"
        ],

        internship:
            "Build a practical SEO or marketing project and apply for digital marketing internships.",

        careers: [
            "Digital Marketing Specialist",
            "SEO Specialist",
            "Social Media Specialist",
            "Marketing Analyst"
        ]
    },


    // -------------------------------------------------
    // PHOTOGRAPHER
    // -------------------------------------------------

    "photographer": {

        category: "Creative and Media",

        overview:
            "A Photographer creates professional visual content using photography, lighting, composition and editing.",

        prerequisites: [
            "Interest in photography",
            "Basic camera knowledge"
        ],

        skills: [
            "Camera Handling",
            "Composition",
            "Lighting",
            "Exposure",
            "Portrait Photography",
            "Product Photography",
            "Event Photography",
            "Photo Editing"
        ],

        tools: [
            "DSLR or Mirrorless Camera",
            "Tripod",
            "Lighting Equipment",
            "Adobe Lightroom",
            "Adobe Photoshop"
        ],

        projects: [
            "Portrait Portfolio",
            "Product Photography Project",
            "Event Photography Portfolio",
            "Street Photography Collection"
        ],

        internship:
            "Build a photography portfolio and approach studios, media companies and creative agencies.",

        careers: [
            "Photographer",
            "Product Photographer",
            "Event Photographer",
            "Portrait Photographer"
        ]
    },


    // -------------------------------------------------
    // ACTOR
    // -------------------------------------------------

    "actor": {

        category: "Media and Entertainment",

        overview:
            "An Actor performs characters for films, television, theatre, advertisements and digital productions.",

        prerequisites: [
            "Interest in performing",
            "Willingness to practice",
            "Communication skills"
        ],

        skills: [
            "Acting",
            "Voice Modulation",
            "Body Language",
            "Dialogue Delivery",
            "Improvisation",
            "Emotional Expression",
            "Audition Skills",
            "Character Development"
        ],

        tools: [
            "Camera",
            "Microphone",
            "Tripod",
            "Video Editing Software",
            "Audition Platforms"
        ],

        projects: [
            "Self-tape Audition",
            "Monologue Portfolio",
            "Short Film",
            "Theatre Performance",
            "Acting Showreel"
        ],

        internship:
            "Prepare a showreel and self-tape portfolio and look for theatre, production and acting opportunities.",

        careers: [
            "Film Actor",
            "Television Actor",
            "Theatre Artist",
            "Voice Artist",
            "Web Series Actor",
            "Commercial Actor"
        ]
    },


    // -------------------------------------------------
    // CHEF
    // -------------------------------------------------

    "chef": {

        category: "Hospitality and Culinary",

        overview:
            "A Chef prepares food professionally and develops skills in cooking, kitchen management, food safety and menu planning.",

        prerequisites: [
            "Interest in cooking",
            "Basic kitchen awareness"
        ],

        skills: [
            "Cooking Fundamentals",
            "Knife Skills",
            "Food Safety",
            "Kitchen Hygiene",
            "Ingredient Preparation",
            "Recipe Development",
            "Plating",
            "Menu Planning"
        ],

        tools: [
            "Chef Knife",
            "Cutting Board",
            "Cookware",
            "Oven",
            "Food Thermometer",
            "Kitchen Equipment"
        ],

        projects: [
            "Recipe Portfolio",
            "Multi-Cuisine Menu",
            "Dessert Collection",
            "Food Presentation Project",
            "Personal Cooking Portfolio"
        ],

        internship:
            "Build practical kitchen experience through restaurants, hotels, bakeries and culinary training opportunities.",

        careers: [
            "Chef",
            "Commis Chef",
            "Sous Chef",
            "Pastry Chef",
            "Restaurant Chef"
        ]
    },


    // -------------------------------------------------
    // TEACHER
    // -------------------------------------------------

    "teacher": {

        category: "Education",

        overview:
            "A Teacher helps students learn through subject knowledge, lesson planning, communication and assessment.",

        prerequisites: [
            "Strong subject knowledge",
            "Communication skills"
        ],

        skills: [
            "Subject Knowledge",
            "Communication",
            "Lesson Planning",
            "Classroom Management",
            "Assessment",
            "Presentation",
            "Student Engagement",
            "Educational Technology"
        ],

        tools: [
            "PowerPoint",
            "Google Classroom",
            "Microsoft Teams",
            "Zoom",
            "Digital Whiteboard"
        ],

        projects: [
            "Lesson Plan",
            "Teaching Demonstration",
            "Online Learning Module",
            "Educational Presentation",
            "Student Assessment Plan"
        ],

        internship:
            "Gain teaching experience through schools, tutoring centres, online tutoring and education organizations.",

        careers: [
            "Teacher",
            "Online Tutor",
            "Academic Trainer",
            "Lecturer"
        ]
    }

};


// =====================================================
// ALIASES
// =====================================================

const careerAliases = {

    "java": "java developer",
    "java development": "java developer",
    "java programmer": "java developer",

    "python": "python developer",
    "python programming": "python developer",

    "cybersecurity": "cybersecurity analyst",
    "cyber security": "cybersecurity analyst",
    "cyber security analyst": "cybersecurity analyst",

    "ethical hacking": "ethical hacker",
    "penetration testing": "ethical hacker",
    "pentesting": "ethical hacker",

    "content writing": "content writer",
    "writing": "content writer",
    "copywriting": "content writer",

    "digital marketing": "digital marketing specialist",
    "seo": "digital marketing specialist",
    "seo specialist": "digital marketing specialist",

    "acting": "actor",
    "film acting": "actor",

    "photography": "photographer",

    "cooking": "chef",
    "cook": "chef",
    "baking": "chef",
    "culinary arts": "chef",

    "teaching": "teacher",
    "education": "teacher"
};


// =====================================================
// NORMALIZE INPUT
// =====================================================

function normalizeCourse(course) {

    return String(course || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}


// =====================================================
// FIND EXISTING CAREER
// =====================================================

function findCareer(course) {

    const normalized = normalizeCourse(course);

    console.log("Searching career:", normalized);


    // Exact match
    if (careerProfiles[normalized]) {

        console.log(
            "Direct career match:",
            normalized
        );

        return careerProfiles[normalized];
    }


    // Alias match
    if (careerAliases[normalized]) {

        const alias =
            careerAliases[normalized];

        console.log(
            "Alias career match:",
            alias
        );

        return careerProfiles[alias];
    }


    // Partial match
    for (const key of Object.keys(careerProfiles)) {

        if (
            normalized.includes(key) ||
            key.includes(normalized)
        ) {

            console.log(
                "Partial career match:",
                key
            );

            return careerProfiles[key];
        }
    }


    console.log(
        "No predefined career match."
    );

    return null;
}


// =====================================================
// DYNAMIC CAREER GENERATOR
// =====================================================

function createGenericCareer(course) {

    const original =
        String(course || "").trim();

    const lower =
        normalizeCourse(original);

    const title =
        original.charAt(0).toUpperCase() +
        original.slice(1);


    // -------------------------------------------------
    // BEAUTY
    // -------------------------------------------------

    if (
        lower.includes("beautician") ||
        lower.includes("beauty") ||
        lower.includes("makeup") ||
        lower.includes("cosmetology") ||
        lower.includes("hair stylist") ||
        lower.includes("hairdresser") ||
        lower.includes("skincare") ||
        lower.includes("skin care")
    ) {

        return {

            category: "Beauty and Wellness",

            overview:
                `${title} focuses on professional beauty, grooming, skincare, haircare and personal styling services.`,

            prerequisites: [
                "Interest in beauty and wellness",
                "Basic hygiene knowledge"
            ],

            skills: [
                "Skin Care Fundamentals",
                "Hair Care",
                "Makeup Techniques",
                "Facial Treatments",
                "Hair Styling",
                "Hygiene and Sanitation",
                "Client Consultation",
                "Product Knowledge"
            ],

            tools: [
                "Makeup Brushes",
                "Beauty Products",
                "Hair Styling Tools",
                "Facial Equipment",
                "Sanitation Equipment"
            ],

            projects: [
                "Makeup Look Portfolio",
                "Bridal Makeup Project",
                "Hair Styling Portfolio",
                "Skincare Routine Project",
                "Beauty Transformation Portfolio"
            ],

            internship:
                "Gain practical experience through salons, spas, beauty studios and professional beauty training.",

            careers: [
                "Beautician",
                "Makeup Artist",
                "Hair Stylist",
                "Beauty Consultant",
                "Salon Professional",
                "Skincare Specialist"
            ]
        };
    }


    // -------------------------------------------------
    // CONTENT WRITING
    // -------------------------------------------------

    if (
        lower.includes("content writing") ||
        lower.includes("content writer") ||
        lower.includes("copywriter") ||
        lower.includes("blog writer")
    ) {

        return {

            category: "Writing and Media",

            overview:
                `${title} focuses on creating clear, useful and engaging written content for digital platforms, businesses and publications.`,

            prerequisites: [
                "Interest in writing",
                "Basic grammar",
                "Research ability"
            ],

            skills: [
                "Writing Fundamentals",
                "Grammar",
                "Research",
                "Storytelling",
                "SEO Writing",
                "Keyword Research",
                "Editing",
                "Proofreading",
                "Content Planning"
            ],

            tools: [
                "Google Docs",
                "Microsoft Word",
                "Grammarly",
                "Google Search",
                "Canva",
                "SEO Tools"
            ],

            projects: [
                "Personal Blog",
                "SEO Article Portfolio",
                "Product Descriptions",
                "Website Content",
                "Social Media Content Plan"
            ],

            internship:
                "Create a writing portfolio and apply for content writing, SEO writing and copywriting internships.",

            careers: [
                "Content Writer",
                "SEO Writer",
                "Copywriter",
                "Technical Writer",
                "Content Strategist"
            ]
        };
    }


    // -------------------------------------------------
    // CYBERSECURITY
    // -------------------------------------------------

    if (
        lower.includes("cyber") ||
        lower.includes("ethical hack") ||
        lower.includes("penetration test") ||
        lower.includes("pentest") ||
        lower.includes("information security")
    ) {

        return {

            category: "Cybersecurity",

            overview:
                `${title} focuses on protecting systems, networks, applications and information from security threats.`,

            prerequisites: [
                "Basic computer knowledge",
                "Basic networking knowledge"
            ],

            skills: [
                "Networking",
                "Linux",
                "Cybersecurity Fundamentals",
                "Threat Analysis",
                "Vulnerability Assessment",
                "Security Monitoring",
                "Incident Response",
                "Web Security"
            ],

            tools: [
                "Linux",
                "Wireshark",
                "Nmap",
                "Burp Suite",
                "VirtualBox",
                "SIEM Platforms"
            ],

            projects: [
                "Network Security Lab",
                "Vulnerability Assessment",
                "Web Security Testing Lab",
                "Security Monitoring Dashboard",
                "Incident Response Simulation"
            ],

            internship:
                "Build legal cybersecurity labs and apply for SOC, security analyst and cybersecurity internships.",

            careers: [
                "Cybersecurity Analyst",
                "SOC Analyst",
                "Security Analyst",
                "Penetration Tester",
                "Application Security Analyst"
            ]
        };
    }


    // -------------------------------------------------
    // DIGITAL MARKETING
    // -------------------------------------------------

    if (
        lower.includes("digital marketing") ||
        lower.includes("seo") ||
        lower.includes("social media marketing") ||
        lower.includes("marketing")
    ) {

        return {

            category: "Business and Marketing",

            overview:
                `${title} focuses on promoting brands, products and services through digital channels and online marketing strategies.`,

            prerequisites: [
                "Basic computer knowledge",
                "Interest in marketing"
            ],

            skills: [
                "SEO",
                "Keyword Research",
                "Content Marketing",
                "Social Media Marketing",
                "Email Marketing",
                "Digital Advertising",
                "Analytics",
                "Conversion Optimization"
            ],

            tools: [
                "Google Search Console",
                "Google Analytics",
                "Google Ads",
                "Canva",
                "Meta Business Suite",
                "SEO Tools"
            ],

            projects: [
                "SEO Website",
                "Keyword Research Project",
                "Social Media Campaign",
                "Digital Marketing Campaign",
                "Website Traffic Analysis"
            ],

            internship:
                "Build an SEO or digital marketing project and apply for marketing internships.",

            careers: [
                "Digital Marketing Specialist",
                "SEO Specialist",
                "Social Media Specialist",
                "Marketing Analyst"
            ]
        };
    }


    // -------------------------------------------------
    // PHOTOGRAPHY
    // -------------------------------------------------

    if (
        lower.includes("photograph")
    ) {

        return {

            category: "Creative and Media",

            overview:
                `${title} focuses on creating professional photographs using camera techniques, composition, lighting and editing.`,

            prerequisites: [
                "Interest in photography",
                "Basic camera knowledge"
            ],

            skills: [
                "Camera Handling",
                "Composition",
                "Exposure",
                "Lighting",
                "Portrait Photography",
                "Product Photography",
                "Event Photography",
                "Photo Editing"
            ],

            tools: [
                "DSLR or Mirrorless Camera",
                "Tripod",
                "Lighting Equipment",
                "Adobe Lightroom",
                "Adobe Photoshop"
            ],

            projects: [
                "Portrait Portfolio",
                "Product Photography",
                "Event Photography Portfolio",
                "Street Photography Collection"
            ],

            internship:
                "Build a photography portfolio and seek practical experience with studios, events and creative agencies.",

            careers: [
                "Photographer",
                "Portrait Photographer",
                "Product Photographer",
                "Event Photographer",
                "Photo Editor"
            ]
        };
    }


    // -------------------------------------------------
    // ACTING
    // -------------------------------------------------

    if (
        lower.includes("actor") ||
        lower.includes("acting") ||
        lower.includes("theatre") ||
        lower.includes("theater") ||
        lower.includes("performing arts")
    ) {

        return {

            category: "Media and Entertainment",

            overview:
                `${title} focuses on performing characters for films, television, theatre, advertisements and digital productions.`,

            prerequisites: [
                "Interest in performing",
                "Communication skills",
                "Willingness to practice"
            ],

            skills: [
                "Acting",
                "Voice Modulation",
                "Body Language",
                "Dialogue Delivery",
                "Improvisation",
                "Emotional Expression",
                "Character Development",
                "Audition Preparation"
            ],

            tools: [
                "Camera",
                "Microphone",
                "Tripod",
                "Video Editing Software",
                "Audition Platforms"
            ],

            projects: [
                "Self-Tape Audition",
                "Monologue Portfolio",
                "Short Film",
                "Theatre Performance",
                "Acting Showreel"
            ],

            internship:
                "Build a showreel and self-tape portfolio and look for theatre, production and acting opportunities.",

            careers: [
                "Film Actor",
                "Television Actor",
                "Theatre Artist",
                "Voice Artist",
                "Web Series Actor",
                "Commercial Actor"
            ]
        };
    }


    // -------------------------------------------------
    // CHEF / COOKING
    // -------------------------------------------------

    if (
        lower.includes("chef") ||
        lower.includes("cook") ||
        lower.includes("culinary") ||
        lower.includes("baking") ||
        lower.includes("pastry")
    ) {

        return {

            category: "Hospitality and Culinary",

            overview:
                `${title} focuses on professional food preparation, cooking techniques, kitchen management and food safety.`,

            prerequisites: [
                "Interest in cooking",
                "Basic kitchen awareness"
            ],

            skills: [
                "Cooking Fundamentals",
                "Knife Skills",
                "Food Safety",
                "Kitchen Hygiene",
                "Ingredient Preparation",
                "Cooking Techniques",
                "Recipe Development",
                "Plating",
                "Menu Planning"
            ],

            tools: [
                "Chef Knife",
                "Cutting Board",
                "Cookware",
                "Oven",
                "Food Thermometer",
                "Kitchen Equipment"
            ],

            projects: [
                "Recipe Portfolio",
                "Multi-Cuisine Menu",
                "Dessert Collection",
                "Food Presentation Project",
                "Personal Cooking Portfolio"
            ],

            internship:
                "Gain practical kitchen experience through restaurants, hotels, bakeries and culinary training.",

            careers: [
                "Chef",
                "Commis Chef",
                "Sous Chef",
                "Pastry Chef",
                "Restaurant Chef"
            ]
        };
    }


    // -------------------------------------------------
    // TEACHING
    // -------------------------------------------------

    if (
        lower.includes("teacher") ||
        lower.includes("teaching") ||
        lower.includes("education") ||
        lower.includes("lecturer") ||
        lower.includes("professor")
    ) {

        return {

            category: "Education",

            overview:
                `${title} focuses on teaching, lesson planning, communication, assessment and supporting student learning.`,

            prerequisites: [
                "Subject knowledge",
                "Communication skills"
            ],

            skills: [
                "Subject Knowledge",
                "Communication",
                "Lesson Planning",
                "Classroom Management",
                "Assessment",
                "Presentation",
                "Student Engagement",
                "Educational Technology"
            ],

            tools: [
                "PowerPoint",
                "Google Classroom",
                "Microsoft Teams",
                "Zoom",
                "Digital Whiteboard"
            ],

            projects: [
                "Lesson Plan",
                "Teaching Demonstration",
                "Online Learning Module",
                "Educational Presentation",
                "Student Assessment Plan"
            ],

            internship:
                "Gain teaching experience through schools, tutoring centres, online tutoring and education organizations.",

            careers: [
                "Teacher",
                "Online Tutor",
                "Academic Trainer",
                "Lecturer"
            ]
        };
    }


    // -------------------------------------------------
    // FINANCE
    // -------------------------------------------------

    if (
        lower.includes("finance") ||
        lower.includes("account") ||
        lower.includes("banking") ||
        lower.includes("investment")
    ) {

        return {

            category: "Finance and Business",

            overview:
                `${title} focuses on financial analysis, accounting, reporting, business finance and decision-making.`,

            prerequisites: [
                "Basic mathematics",
                "Interest in finance"
            ],

            skills: [
                "Accounting Fundamentals",
                "Financial Statements",
                "Excel",
                "Financial Analysis",
                "Budgeting",
                "Business Mathematics",
                "Financial Reporting",
                "Data Analysis"
            ],

            tools: [
                "Microsoft Excel",
                "Google Sheets",
                "Tally",
                "Power BI",
                "Accounting Software"
            ],

            projects: [
                "Company Financial Analysis",
                "Budgeting Project",
                "Financial Dashboard",
                "Accounting Case Study"
            ],

            internship:
                "Build practical financial analysis experience and apply for accounting, finance and banking internships.",

            careers: [
                "Accountant",
                "Financial Analyst",
                "Banking Associate",
                "Finance Executive"
            ]
        };
    }


    // -------------------------------------------------
    // ENGINEERING
    // -------------------------------------------------

    if (
        lower.includes("engineering") ||
        lower.includes("engineer") ||
        lower.includes("mechanical") ||
        lower.includes("civil") ||
        lower.includes("electrical") ||
        lower.includes("electronics") ||
        lower.includes("automobile") ||
        lower.includes("chemical engineering")
    ) {

        return {

            category: "Engineering",

            overview:
                `${title} focuses on engineering fundamentals, practical problem-solving, technical tools, projects and industry preparation.`,

            prerequisites: [
                "Mathematics fundamentals",
                "Basic science knowledge"
            ],

            skills: [
                `${title} Fundamentals`,
                "Engineering Mathematics",
                "Problem Solving",
                "Technical Drawing",
                "Project Planning",
                "Technical Documentation",
                "Safety Practices",
                "Industry Standards"
            ],

            tools: [
                "AutoCAD",
                "CAD Software",
                "MATLAB",
                "Microsoft Excel",
                "Engineering Simulation Tools"
            ],

            projects: [
                `${title} Mini Project`,
                "Engineering Design Project",
                "Simulation Project",
                "Technical Documentation Project",
                "Final Year Project"
            ],

            internship:
                `Gain practical industry experience through ${title} internships, industrial training and engineering projects.`,

            careers: [
                `${title} Engineer`,
                "Design Engineer",
                "Project Engineer",
                "Production Engineer",
                "Technical Engineer"
            ]
        };
    }


    // -------------------------------------------------
    // LAW
    // -------------------------------------------------

    if (
        lower.includes("law") ||
        lower.includes("legal") ||
        lower.includes("lawyer") ||
        lower.includes("advocate")
    ) {

        return {

            category: "Law and Legal Services",

            overview:
                `${title} focuses on legal concepts, research, documentation, communication and practical legal work.`,

            prerequisites: [
                "Interest in law",
                "Reading and research ability"
            ],

            skills: [
                "Legal Research",
                "Legal Writing",
                "Case Analysis",
                "Communication",
                "Legal Documentation",
                "Argumentation",
                "Critical Thinking",
                "Professional Ethics"
            ],

            tools: [
                "Legal Databases",
                "Microsoft Word",
                "Google Docs",
                "Research Databases"
            ],

            projects: [
                "Case Analysis",
                "Legal Research Report",
                "Mock Legal Argument",
                "Legal Document Drafting",
                "Moot Court Project"
            ],

            internship:
                "Seek internships with law firms, legal departments, courts and legal organizations.",

            careers: [
                "Lawyer",
                "Advocate",
                "Legal Associate",
                "Legal Consultant",
                "Corporate Legal Executive"
            ]
        };
    }


    // -------------------------------------------------
    // AVIATION
    // -------------------------------------------------

    if (
        lower.includes("pilot") ||
        lower.includes("aviation") ||
        lower.includes("airline")
    ) {

        return {

            category: "Aviation",

            overview:
                `${title} focuses on aviation knowledge, safety procedures, communication, technical training and professional preparation.`,

            prerequisites: [
                "Interest in aviation",
                "Required educational qualifications"
            ],

            skills: [
                "Aviation Fundamentals",
                "Flight Theory",
                "Navigation",
                "Meteorology",
                "Communication",
                "Aviation Safety",
                "Emergency Procedures",
                "Decision Making"
            ],

            tools: [
                "Flight Simulator",
                "Navigation Equipment",
                "Aviation Charts",
                "Communication Systems"
            ],

            projects: [
                "Flight Planning Exercise",
                "Navigation Exercise",
                "Aviation Safety Study",
                "Simulator Training Log"
            ],

            internship:
                "Explore approved aviation training, airport operations and aviation industry opportunities.",

            careers: [
                "Commercial Pilot",
                "Private Pilot",
                "Flight Instructor",
                "Aviation Operations Executive"
            ]
        };
    }


    // -------------------------------------------------
    // FITNESS
    // -------------------------------------------------

    if (
        lower.includes("fitness") ||
        lower.includes("sports") ||
        lower.includes("physical training")
    ) {

        return {

            category: "Fitness and Sports",

            overview:
                `${title} focuses on exercise science, fitness planning, physical training and client support.`,

            prerequisites: [
                "Interest in fitness",
                "Basic health and exercise awareness"
            ],

            skills: [
                "Exercise Fundamentals",
                "Fitness Assessment",
                "Workout Planning",
                "Strength Training",
                "Cardio Training",
                "Mobility",
                "Basic Nutrition",
                "Client Communication"
            ],

            tools: [
                "Fitness Tracker",
                "Heart Rate Monitor",
                "Gym Equipment",
                "Workout Planning Software"
            ],

            projects: [
                "Workout Plan",
                "Fitness Assessment",
                "Personal Training Program",
                "Fitness Progress Portfolio"
            ],

            internship:
                "Gain practical experience through gyms, fitness centres, sports organizations and training programs.",

            careers: [
                "Fitness Trainer",
                "Personal Trainer",
                "Strength Coach",
                "Fitness Consultant",
                "Sports Trainer"
            ]
        };
    }


    // -------------------------------------------------
    // DESIGN
    // -------------------------------------------------

    if (
        lower.includes("design") ||
        lower.includes("animation") ||
        lower.includes("fashion") ||
        lower.includes("graphic")
    ) {

        return {

            category: "Design and Creative Arts",

            overview:
                `${title} focuses on creative design, visual communication, creative software and portfolio development.`,

            prerequisites: [
                "Creative interest",
                "Basic computer skills"
            ],

            skills: [
                "Design Fundamentals",
                "Color Theory",
                "Typography",
                "Composition",
                "Visual Communication",
                "Creative Thinking",
                "Portfolio Development",
                "Client Communication"
            ],

            tools: [
                "Adobe Photoshop",
                "Adobe Illustrator",
                "Figma",
                "Canva",
                "Blender"
            ],

            projects: [
                "Personal Portfolio",
                "Brand Identity Project",
                "Poster Design",
                "Social Media Design",
                "Creative Campaign"
            ],

            internship:
                "Build a design portfolio and apply for design, animation, fashion or creative internships.",

            careers: [
                "Graphic Designer",
                "Visual Designer",
                "Creative Designer",
                "Animator",
                "Fashion Designer"
            ]
        };
    }


    // -------------------------------------------------
    // MUSIC
    // -------------------------------------------------

    if (
        lower.includes("music") ||
        lower.includes("musician") ||
        lower.includes("singer") ||
        lower.includes("songwriter")
    ) {

        return {

            category: "Music and Performing Arts",

            overview:
                `${title} focuses on musical performance, practice, composition, recording and professional portfolio development.`,

            prerequisites: [
                "Interest in music",
                "Regular practice"
            ],

            skills: [
                "Music Fundamentals",
                "Instrument or Vocal Skills",
                "Rhythm",
                "Performance",
                "Music Theory",
                "Composition",
                "Recording",
                "Stage Presence"
            ],

            tools: [
                "Musical Instrument",
                "Microphone",
                "Audio Interface",
                "DAW Software",
                "Headphones"
            ],

            projects: [
                "Original Song",
                "Cover Performance",
                "Music Portfolio",
                "Live Performance",
                "Recorded Music Project"
            ],

            internship:
                "Build a music portfolio and seek practical experience through performances, studios and music organizations.",

            careers: [
                "Musician",
                "Singer",
                "Composer",
                "Songwriter",
                "Music Producer"
            ]
        };
    }


    // =================================================
    // FINAL UNIVERSAL FALLBACK
    // =================================================

    return {

        category: "Career Development",

        overview:
            `${title} is a career path that requires foundational knowledge, practical skills, real-world experience and a professional portfolio.`,

        prerequisites: [
            `Basic knowledge related to ${title}`,
            "Communication skills",
            "Research ability"
        ],

        skills: [
            `${title} Fundamentals`,
            `${title} Core Concepts`,
            `${title} Practical Skills`,
            "Communication",
            "Problem Solving",
            "Research",
            "Professional Skills",
            "Industry Knowledge"
        ],

        tools: [
            `${title} Learning Resources`,
            "Documentation and Reference Materials",
            "Microsoft Office or Google Workspace",
            "Portfolio Platform",
            "Professional Networking Platforms"
        ],

        projects: [
            `${title} Beginner Project`,
            `${title} Practical Project`,
            `${title} Portfolio Project`,
            `${title} Real-World Case Study`
        ],

        internship:
            `Look for internships, apprenticeships, volunteering or entry-level opportunities related to ${title}.`,

        careers: [
            title,
            `${title} Specialist`,
            `${title} Associate`,
            `${title} Professional`
        ]
    };
}


// =====================================================
// BUILD ROADMAP
// =====================================================

function buildRoadmap(course) {

    const requestedCourse =
        String(course || "").trim();

    const profile =
        findCareer(requestedCourse) ||
        createGenericCareer(requestedCourse);


    const roadmap = {

        title: requestedCourse,

        category: profile.category,

        overview: profile.overview,

        prerequisites: profile.prerequisites,

        stages: [

            // -----------------------------------------
            // STAGE 1
            // -----------------------------------------

            {
                stage: 1,

                title: "Foundation",

                duration: "1-2 months",

                skills: profile.prerequisites,

                topics: [
                    `Understand the fundamentals of ${requestedCourse}`,
                    "Learn important terminology",
                    "Study basic concepts",
                    "Create a regular learning schedule"
                ]
            },


            // -----------------------------------------
            // STAGE 2
            // -----------------------------------------

            {
                stage: 2,

                title: "Core Skills",

                duration: "2-3 months",

                skills: profile.skills,

                topics: [
                    "Learn the core skills",
                    "Practice with examples",
                    "Follow structured learning resources",
                    "Complete practical exercises"
                ]
            },


            // -----------------------------------------
            // STAGE 3
            // -----------------------------------------

            {
                stage: 3,

                title: "Tools & Practical Learning",

                duration: "1-3 months",

                skills: profile.tools,

                topics: [
                    "Learn the relevant tools",
                    "Practice real-world workflows",
                    "Complete guided exercises",
                    "Document your work"
                ]
            },


            // -----------------------------------------
            // STAGE 4
            // -----------------------------------------

            {
                stage: 4,

                title: "Projects & Portfolio",

                duration: "1-3 months",

                skills: [
                    "Project Development",
                    "Problem Solving",
                    "Documentation",
                    "Presentation"
                ],

                topics: profile.projects
            },


            // -----------------------------------------
            // STAGE 5
            // -----------------------------------------

            {
                stage: 5,

                title: "Internship & Career Preparation",

                duration: "Ongoing",

                skills: [
                    "Resume Building",
                    "Portfolio Development",
                    "Interview Preparation",
                    "Communication",
                    "Networking"
                ],

                topics: [
                    profile.internship,
                    "Create a professional resume",
                    "Build or update your LinkedIn profile",
                    "Maintain your portfolio",
                    "Search for relevant internships",
                    "Prepare for interviews",
                    "Apply for relevant opportunities"
                ]
            }

        ],

        skills: profile.skills,

        tools: profile.tools,

        projects: profile.projects,

        internshipPreparation: profile.internship,

        careerOptions: profile.careers,

        importantNote:
            "Career requirements can vary by role, organization and location. Verify current qualifications and job requirements before applying."

    };


    return roadmap;
}


// =====================================================
// GENERATE ROADMAP API
// =====================================================

app.post("/api/generate-roadmap", (req, res) => {

    try {

        const course =
            req.body && req.body.course;


        if (
            course === undefined ||
            course === null ||
            !String(course).trim()
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a career or course."
            });
        }


        const requestedCourse =
            String(course).trim();


        const roadmap =
            buildRoadmap(requestedCourse);


        console.log(
            `Roadmap generated for: ${requestedCourse}`
        );


        return res.status(200).json({

            success: true,

            course: requestedCourse,

            roadmap: roadmap
        });


    } catch (error) {

        console.error(
            "Roadmap generation error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to generate roadmap right now."
        });
    }

});


// =====================================================
// AVAILABLE CAREERS API
// =====================================================

app.get("/api/careers", (req, res) => {

    try {

        const careers =
            Object.keys(careerProfiles);


        res.json({

            success: true,

            count: careers.length,

            careers: careers
        });


    } catch (error) {

        console.error(
            "Career list error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to load careers."
        });
    }

});


// =====================================================
// 404
// =====================================================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "API endpoint not found."
    });

});


// =====================================================
// SERVER ERROR HANDLER
// =====================================================

app.use((error, req, res, next) => {

    console.error(
        "Server error:",
        error
    );


    res.status(500).json({

        success: false,

        message:
            "Something went wrong on the server."
    });

});


// =====================================================
// START SERVER
// =====================================================

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `CareerPath backend running on port ${PORT}`
        );

        console.log(
            "Dynamic career-aware roadmap generator is enabled."
        );

    }
);