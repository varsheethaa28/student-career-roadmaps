// ======================================================
// CAREERPATH BACKEND
// ======================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Firebase Admin SDK v14+
const { initializeApp, cert } = require("firebase-admin/app");

// ======================================================
// APP SETUP
// ======================================================

const app = express();

app.use(cors());
app.use(express.json());


// ======================================================
// FIREBASE ADMIN
// ======================================================

try {
    const serviceAccount = require("./serviceAccountKey.json");

    initializeApp({
        credential: cert(serviceAccount)
    });

    console.log("Firebase Admin initialized successfully");

} catch (error) {
    console.log("Firebase Admin initialization skipped:");
    console.log(error.message);
}


// ======================================================
// BASIC ROUTES
// ======================================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CareerPath backend is running",
        service: "CareerPath API"
    });
});


app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "healthy"
    });
});


// ======================================================
// CAREER DATABASE
// ======================================================

const careerProfiles = {

    // ==================================================
    // TECHNOLOGY
    // ==================================================

    "full stack developer": {
        category: "Technology",
        title: "Full Stack Developer",
        overview:
            "A Full Stack Developer builds complete web applications by working with both frontend and backend technologies.",
        prerequisites: [
            "Basic programming knowledge",
            "HTML and CSS",
            "JavaScript fundamentals"
        ],
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "Express.js",
            "REST APIs",
            "Databases",
            "Git and GitHub"
        ],
        tools: [
            "VS Code",
            "Git",
            "GitHub",
            "Postman",
            "MongoDB",
            "Firebase"
        ],
        projects: [
            "Personal portfolio",
            "Student management system",
            "E-commerce website",
            "Full stack internship portal"
        ],
        internship:
            "Build 2-3 complete projects, maintain a GitHub profile and apply for frontend, backend and full-stack internships.",
        careers: [
            "Full Stack Developer",
            "Web Developer",
            "Software Developer",
            "Backend Developer",
            "Frontend Developer"
        ]
    },

    "frontend developer": {
        category: "Technology",
        title: "Frontend Developer",
        overview:
            "Frontend Developers create the visual and interactive parts of websites and web applications.",
        prerequisites: [
            "Basic computer knowledge",
            "HTML fundamentals",
            "CSS fundamentals"
        ],
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design",
            "React",
            "Git",
            "REST API integration"
        ],
        tools: [
            "VS Code",
            "GitHub",
            "Chrome DevTools",
            "Figma"
        ],
        projects: [
            "Portfolio website",
            "Responsive landing page",
            "Weather application",
            "Student dashboard"
        ],
        internship:
            "Create responsive websites and publish them online. Build a portfolio and apply for frontend internships.",
        careers: [
            "Frontend Developer",
            "React Developer",
            "Web Developer",
            "UI Developer"
        ]
    },

    "backend developer": {
        category: "Technology",
        title: "Backend Developer",
        overview:
            "Backend Developers create APIs, server-side applications, authentication systems and database logic.",
        prerequisites: [
            "Programming fundamentals",
            "Basic databases",
            "Basic networking"
        ],
        skills: [
            "Node.js",
            "Express.js",
            "REST APIs",
            "Authentication",
            "Databases",
            "SQL",
            "MongoDB",
            "Git"
        ],
        tools: [
            "VS Code",
            "Postman",
            "MongoDB Compass",
            "GitHub"
        ],
        projects: [
            "REST API",
            "Authentication system",
            "Student management backend",
            "E-commerce backend"
        ],
        internship:
            "Build APIs and backend projects and demonstrate them through GitHub and Postman collections.",
        careers: [
            "Backend Developer",
            "Node.js Developer",
            "API Developer",
            "Software Developer"
        ]
    },

    "mobile app developer": {
        category: "Technology",
        title: "Mobile App Developer",
        overview:
            "Mobile App Developers build applications for Android and iOS devices.",
        prerequisites: [
            "Programming fundamentals",
            "Basic UI concepts"
        ],
        skills: [
            "Java",
            "Kotlin",
            "Flutter",
            "Dart",
            "React Native",
            "APIs",
            "Firebase"
        ],
        tools: [
            "Android Studio",
            "VS Code",
            "Firebase",
            "GitHub"
        ],
        projects: [
            "Student app",
            "Expense tracker",
            "Travel application",
            "College management app"
        ],
        internship:
            "Build and publish at least one functional mobile application.",
        careers: [
            "Android Developer",
            "Flutter Developer",
            "Mobile App Developer",
            "React Native Developer"
        ]
    },

    "python developer": {
        category: "Technology",
        title: "Python Developer",
        overview:
            "Python Developers use Python for software development, automation, backend systems and data applications.",
        prerequisites: [
            "Basic programming",
            "Logical thinking"
        ],
        skills: [
            "Python",
            "Object-Oriented Programming",
            "Data Structures",
            "Flask",
            "Django",
            "APIs",
            "SQL",
            "Git"
        ],
        tools: [
            "VS Code",
            "PyCharm",
            "GitHub",
            "Postman"
        ],
        projects: [
            "Python automation tool",
            "REST API",
            "Django website",
            "Student management system"
        ],
        internship:
            "Build Python projects and apply for Python development internships.",
        careers: [
            "Python Developer",
            "Backend Developer",
            "Django Developer",
            "Software Developer"
        ]
    },


    // ==================================================
    // DATA & AI
    // ==================================================

    "data analyst": {
        category: "Data & AI",
        title: "Data Analyst",
        overview:
            "Data Analysts collect, clean, analyze and visualize data to support business decisions.",
        prerequisites: [
            "Basic mathematics",
            "Basic statistics",
            "Spreadsheet knowledge"
        ],
        skills: [
            "Excel",
            "SQL",
            "Python",
            "Pandas",
            "Statistics",
            "Data Visualization",
            "Power BI"
        ],
        tools: [
            "Excel",
            "Power BI",
            "Tableau",
            "Jupyter Notebook",
            "MySQL"
        ],
        projects: [
            "Sales dashboard",
            "Student performance analysis",
            "COVID data analysis",
            "E-commerce analytics"
        ],
        internship:
            "Create dashboards and data analysis projects and publish them in your portfolio.",
        careers: [
            "Data Analyst",
            "Business Analyst",
            "BI Analyst",
            "Reporting Analyst"
        ]
    },

    "data scientist": {
        category: "Data & AI",
        title: "Data Scientist",
        overview:
            "Data Scientists use statistics, programming and machine learning to extract insights from data.",
        prerequisites: [
            "Python basics",
            "Statistics",
            "Mathematics"
        ],
        skills: [
            "Python",
            "Statistics",
            "Machine Learning",
            "Pandas",
            "NumPy",
            "SQL",
            "Data Visualization"
        ],
        tools: [
            "Jupyter",
            "Google Colab",
            "Scikit-learn",
            "Power BI"
        ],
        projects: [
            "House price prediction",
            "Customer segmentation",
            "Sales prediction",
            "Recommendation system"
        ],
        internship:
            "Build machine learning and analytics projects and maintain a data science portfolio.",
        careers: [
            "Data Scientist",
            "Data Analyst",
            "ML Engineer",
            "Research Analyst"
        ]
    },

    "machine learning engineer": {
        category: "Data & AI",
        title: "Machine Learning Engineer",
        overview:
            "Machine Learning Engineers build, train, evaluate and deploy machine learning models.",
        prerequisites: [
            "Python",
            "Statistics",
            "Linear algebra basics"
        ],
        skills: [
            "Python",
            "Machine Learning",
            "Deep Learning",
            "Scikit-learn",
            "TensorFlow",
            "PyTorch",
            "SQL",
            "MLOps"
        ],
        tools: [
            "Google Colab",
            "Jupyter",
            "TensorFlow",
            "PyTorch",
            "GitHub"
        ],
        projects: [
            "Image classifier",
            "Recommendation system",
            "Fraud detection model",
            "Prediction system"
        ],
        internship:
            "Create several ML projects and learn model deployment.",
        careers: [
            "Machine Learning Engineer",
            "ML Developer",
            "Data Scientist",
            "AI Engineer"
        ]
    },

    "artificial intelligence engineer": {
        category: "Data & AI",
        title: "Artificial Intelligence Engineer",
        overview:
            "AI Engineers build applications using machine learning, deep learning and modern AI technologies.",
        prerequisites: [
            "Python",
            "Mathematics",
            "Programming fundamentals"
        ],
        skills: [
            "Python",
            "Machine Learning",
            "Deep Learning",
            "NLP",
            "Computer Vision",
            "Generative AI",
            "APIs"
        ],
        tools: [
            "Python",
            "PyTorch",
            "TensorFlow",
            "Jupyter",
            "GitHub"
        ],
        projects: [
            "AI chatbot",
            "Image recognition system",
            "Recommendation engine",
            "AI assistant"
        ],
        internship:
            "Build practical AI applications and learn how to deploy AI models.",
        careers: [
            "AI Engineer",
            "Machine Learning Engineer",
            "AI Developer",
            "Data Scientist"
        ]
    },


    // ==================================================
    // CYBERSECURITY
    // ==================================================

    "cybersecurity analyst": {
        category: "Cybersecurity",
        title: "Cybersecurity Analyst",
        overview:
            "Cybersecurity Analysts monitor systems, investigate security incidents and help protect organizations from cyber threats.",
        prerequisites: [
            "Computer fundamentals",
            "Networking basics",
            "Operating systems"
        ],
        skills: [
            "Networking",
            "Linux",
            "Windows Security",
            "SIEM",
            "Incident Response",
            "Threat Analysis",
            "Security Fundamentals"
        ],
        tools: [
            "Wireshark",
            "Nmap",
            "Linux",
            "Splunk",
            "Burp Suite"
        ],
        projects: [
            "Home security lab",
            "Network traffic analysis",
            "Security monitoring dashboard",
            "Incident response simulation"
        ],
        internship:
            "Build a cybersecurity lab and practice defensive security scenarios.",
        careers: [
            "Security Analyst",
            "SOC Analyst",
            "Cybersecurity Analyst",
            "Security Engineer"
        ]
    },

    "ethical hacker": {
        category: "Cybersecurity",
        title: "Ethical Hacker",
        overview:
            "Ethical Hackers legally test systems and applications to identify security weaknesses.",
        prerequisites: [
            "Networking",
            "Linux",
            "Programming basics"
        ],
        skills: [
            "Networking",
            "Linux",
            "Web Security",
            "OWASP",
            "Penetration Testing",
            "Python",
            "Security Testing"
        ],
        tools: [
            "Kali Linux",
            "Burp Suite",
            "Nmap",
            "Wireshark",
            "Metasploit"
        ],
        projects: [
            "Web security lab",
            "CTF challenges",
            "Vulnerability assessment report",
            "Local penetration testing lab"
        ],
        internship:
            "Practice only on authorized labs such as CTF platforms and intentionally vulnerable applications.",
        careers: [
            "Ethical Hacker",
            "Penetration Tester",
            "Security Tester",
            "Application Security Analyst"
        ]
    },

    "cloud security engineer": {
        category: "Cybersecurity",
        title: "Cloud Security Engineer",
        overview:
            "Cloud Security Engineers protect cloud infrastructure, applications, identities and data.",
        prerequisites: [
            "Networking",
            "Linux",
            "Cloud fundamentals"
        ],
        skills: [
            "AWS",
            "Azure",
            "IAM",
            "Cloud Networking",
            "Security Monitoring",
            "Containers",
            "DevSecOps"
        ],
        tools: [
            "AWS",
            "Azure",
            "Docker",
            "Terraform",
            "GitHub"
        ],
        projects: [
            "Secure cloud architecture",
            "IAM project",
            "Cloud monitoring setup",
            "Secure container deployment"
        ],
        internship:
            "Learn one major cloud platform and create security-focused cloud projects.",
        careers: [
            "Cloud Security Engineer",
            "Cloud Engineer",
            "Security Engineer",
            "DevSecOps Engineer"
        ]
    },


    // ==================================================
    // DESIGN
    // ==================================================

    "ui/ux designer": {
        category: "Design",
        title: "UI/UX Designer",
        overview:
            "UI/UX Designers create user-friendly interfaces and experiences for digital products.",
        prerequisites: [
            "Basic design principles",
            "Creative thinking"
        ],
        skills: [
            "UI Design",
            "UX Research",
            "Wireframing",
            "Prototyping",
            "User Research",
            "Design Systems"
        ],
        tools: [
            "Figma",
            "Adobe XD",
            "FigJam"
        ],
        projects: [
            "Mobile app redesign",
            "College app UI",
            "E-commerce prototype",
            "Student dashboard"
        ],
        internship:
            "Build a portfolio containing complete case studies rather than only screenshots.",
        careers: [
            "UI Designer",
            "UX Designer",
            "Product Designer",
            "UX Researcher"
        ]
    },

    "graphic designer": {
        category: "Design",
        title: "Graphic Designer",
        overview:
            "Graphic Designers create visual content for digital and print communication.",
        prerequisites: [
            "Creative interest",
            "Basic design principles"
        ],
        skills: [
            "Typography",
            "Color theory",
            "Branding",
            "Layout",
            "Illustration",
            "Social media design"
        ],
        tools: [
            "Adobe Photoshop",
            "Illustrator",
            "Canva",
            "Figma"
        ],
        projects: [
            "Brand identity",
            "Poster collection",
            "Social media campaign",
            "Event branding"
        ],
        internship:
            "Create a portfolio of original designs and case studies.",
        careers: [
            "Graphic Designer",
            "Visual Designer",
            "Brand Designer",
            "Creative Designer"
        ]
    },

    "animator": {
        category: "Design",
        title: "Animator",
        overview:
            "Animators create motion graphics, 2D animations, 3D animations and visual storytelling.",
        prerequisites: [
            "Drawing or visual design interest",
            "Storytelling"
        ],
        skills: [
            "Animation principles",
            "Storyboarding",
            "2D Animation",
            "3D Animation",
            "Motion Graphics"
        ],
        tools: [
            "Blender",
            "Adobe After Effects",
            "Premiere Pro",
            "Toon Boom"
        ],
        projects: [
            "Short animation",
            "Motion graphics video",
            "Character animation",
            "3D scene"
        ],
        internship:
            "Create a showreel and portfolio demonstrating animation skills.",
        careers: [
            "Animator",
            "3D Artist",
            "Motion Designer",
            "VFX Artist"
        ]
    },


    // ==================================================
    // MEDIA & COMMUNICATION
    // ==================================================

    "actor": {
        category: "Media & Entertainment",
        title: "Actor",
        overview:
            "Actors perform characters for films, television, theatre, advertisements, web series and digital media.",
        prerequisites: [
            "Interest in acting",
            "Communication skills",
            "Willingness to practice"
        ],
        skills: [
            "Acting",
            "Voice modulation",
            "Body language",
            "Dialogue delivery",
            "Improvisation",
            "Emotional expression",
            "Audition skills"
        ],
        tools: [
            "Camera",
            "Microphone",
            "Video editing software",
            "Audition platforms"
        ],
        projects: [
            "Self-tape audition",
            "Short film",
            "Monologue portfolio",
            "Theatre performance"
        ],
        internship:
            "Participate in theatre, student films, short films and legitimate auditions. Build a professional showreel.",
        careers: [
            "Film Actor",
            "Television Actor",
            "Theatre Artist",
            "Voice Artist",
            "Web Series Actor",
            "Commercial Actor"
        ]
    },

    "content writer": {
        category: "Media & Communication",
        title: "Content Writer",
        overview:
            "Content Writers create useful written content for websites, blogs, brands, social media and digital platforms.",
        prerequisites: [
            "Good language skills",
            "Research ability",
            "Basic computer skills"
        ],
        skills: [
            "Writing",
            "Research",
            "SEO",
            "Editing",
            "Copywriting",
            "Storytelling"
        ],
        tools: [
            "Google Docs",
            "WordPress",
            "Grammarly",
            "Search Console"
        ],
        projects: [
            "Personal blog",
            "SEO articles",
            "Product descriptions",
            "Social media content calendar"
        ],
        internship:
            "Publish original articles and create a writing portfolio.",
        careers: [
            "Content Writer",
            "Copywriter",
            "SEO Writer",
            "Technical Writer",
            "Content Strategist"
        ]
    },

    "journalist": {
        category: "Media & Communication",
        title: "Journalist",
        overview:
            "Journalists research, verify and communicate news and information through various media.",
        prerequisites: [
            "Strong communication",
            "Research skills",
            "Interest in current affairs"
        ],
        skills: [
            "News writing",
            "Research",
            "Interviewing",
            "Fact checking",
            "Video journalism",
            "Digital journalism"
        ],
        tools: [
            "Google Docs",
            "CMS platforms",
            "Camera",
            "Audio recorder"
        ],
        projects: [
            "Student news portal",
            "Interview series",
            "Local news reporting",
            "Podcast"
        ],
        internship:
            "Build reporting experience through student publications, digital media and journalism internships.",
        careers: [
            "Journalist",
            "Reporter",
            "News Writer",
            "Digital Journalist",
            "Editor"
        ]
    },

    "photographer": {
        category: "Media & Entertainment",
        title: "Photographer",
        overview:
            "Photographers create images for journalism, advertising, events, fashion, products and creative projects.",
        prerequisites: [
            "Interest in photography",
            "Basic camera knowledge"
        ],
        skills: [
            "Composition",
            "Lighting",
            "Camera operation",
            "Photo editing",
            "Visual storytelling"
        ],
        tools: [
            "Camera",
            "Lightroom",
            "Photoshop",
            "Tripod"
        ],
        projects: [
            "Photography portfolio",
            "Portrait series",
            "Product photography",
            "Event photography"
        ],
        internship:
            "Create a portfolio and gain practical experience through events, studios and media organizations.",
        careers: [
            "Photographer",
            "Photojournalist",
            "Product Photographer",
            "Fashion Photographer"
        ]
    },


    // ==================================================
    // BUSINESS
    // ==================================================

    "business analyst": {
        category: "Business",
        title: "Business Analyst",
        overview:
            "Business Analysts analyze business requirements, processes and data to help organizations improve operations.",
        prerequisites: [
            "Basic business knowledge",
            "Analytical thinking"
        ],
        skills: [
            "Business analysis",
            "Excel",
            "SQL",
            "Data visualization",
            "Requirements gathering",
            "Communication"
        ],
        tools: [
            "Excel",
            "Power BI",
            "Jira",
            "Confluence"
        ],
        projects: [
            "Business process analysis",
            "Sales dashboard",
            "Requirement document",
            "Business case study"
        ],
        internship:
            "Build analytical case studies and learn requirement gathering.",
        careers: [
            "Business Analyst",
            "Product Analyst",
            "Business Consultant",
            "Operations Analyst"
        ]
    },

    "digital marketing specialist": {
        category: "Business",
        title: "Digital Marketing Specialist",
        overview:
            "Digital Marketing Specialists promote products, services and brands through digital channels.",
        prerequisites: [
            "Basic internet knowledge",
            "Communication skills"
        ],
        skills: [
            "SEO",
            "SEM",
            "Social Media Marketing",
            "Content Marketing",
            "Email Marketing",
            "Analytics"
        ],
        tools: [
            "Google Analytics",
            "Google Search Console",
            "Canva",
            "Google Ads"
        ],
        projects: [
            "SEO website",
            "Social media campaign",
            "Content strategy",
            "Marketing analytics dashboard"
        ],
        internship:
            "Run practical campaigns and create a measurable marketing portfolio.",
        careers: [
            "Digital Marketing Specialist",
            "SEO Specialist",
            "Social Media Manager",
            "Content Marketer"
        ]
    },


    // ==================================================
    // COMMERCE & FINANCE
    // ==================================================

    "accountant": {
        category: "Commerce & Finance",
        title: "Accountant",
        overview:
            "Accountants manage financial records, transactions, reports and compliance.",
        prerequisites: [
            "Basic accounting",
            "Commerce fundamentals"
        ],
        skills: [
            "Accounting",
            "Bookkeeping",
            "Excel",
            "GST basics",
            "Financial reporting"
        ],
        tools: [
            "Tally",
            "Excel",
            "Accounting software"
        ],
        projects: [
            "Sample business accounts",
            "Financial statement analysis",
            "Accounting spreadsheet"
        ],
        internship:
            "Gain practical experience with accounting systems and financial documentation.",
        careers: [
            "Accountant",
            "Accounts Executive",
            "Finance Assistant",
            "Tax Assistant"
        ]
    },

    "financial analyst": {
        category: "Commerce & Finance",
        title: "Financial Analyst",
        overview:
            "Financial Analysts analyze financial information to support investment and business decisions.",
        prerequisites: [
            "Basic finance",
            "Mathematics"
        ],
        skills: [
            "Financial analysis",
            "Excel",
            "Financial modeling",
            "Accounting",
            "Data analysis"
        ],
        tools: [
            "Excel",
            "Power BI",
            "Financial databases"
        ],
        projects: [
            "Company financial analysis",
            "Financial model",
            "Investment research report"
        ],
        internship:
            "Create financial analysis reports and learn financial modeling.",
        careers: [
            "Financial Analyst",
            "Investment Analyst",
            "FP&A Analyst",
            "Credit Analyst"
        ]
    },

    "chartered accountant": {
        category: "Commerce & Finance",
        title: "Chartered Accountant",
        overview:
            "Chartered Accountants work across accounting, auditing, taxation, finance and advisory.",
        prerequisites: [
            "Commerce or equivalent foundation",
            "Interest in accounting and finance"
        ],
        skills: [
            "Accounting",
            "Auditing",
            "Taxation",
            "Financial Reporting",
            "Corporate Law",
            "Financial Analysis"
        ],
        tools: [
            "Excel",
            "Accounting software",
            "Tally"
        ],
        projects: [
            "Financial statement analysis",
            "Tax calculation practice",
            "Audit case study"
        ],
        internship:
            "Follow the applicable professional qualification pathway and gain practical training experience.",
        careers: [
            "Chartered Accountant",
            "Auditor",
            "Tax Consultant",
            "Financial Consultant"
        ]
    },


    // ==================================================
    // ENGINEERING
    // ==================================================

    "mechanical engineer": {
        category: "Engineering",
        title: "Mechanical Engineer",
        overview:
            "Mechanical Engineers design, analyze and develop machines, products and mechanical systems.",
        prerequisites: [
            "Physics",
            "Mathematics",
            "Engineering fundamentals"
        ],
        skills: [
            "CAD",
            "Mechanical Design",
            "Thermodynamics",
            "Manufacturing",
            "Engineering Drawing"
        ],
        tools: [
            "AutoCAD",
            "SolidWorks",
            "CATIA",
            "MATLAB"
        ],
        projects: [
            "Mechanical prototype",
            "CAD model",
            "Automation project",
            "Product design"
        ],
        internship:
            "Gain practical exposure through manufacturing, automotive, design or engineering organizations.",
        careers: [
            "Mechanical Engineer",
            "Design Engineer",
            "Production Engineer",
            "Automotive Engineer"
        ]
    },

    "civil engineer": {
        category: "Engineering",
        title: "Civil Engineer",
        overview:
            "Civil Engineers design and manage infrastructure such as buildings, roads, bridges and water systems.",
        prerequisites: [
            "Mathematics",
            "Physics",
            "Engineering fundamentals"
        ],
        skills: [
            "Structural design",
            "AutoCAD",
            "Surveying",
            "Construction management",
            "Quantity estimation"
        ],
        tools: [
            "AutoCAD",
            "STAAD.Pro",
            "Revit",
            "Civil 3D"
        ],
        projects: [
            "Building design",
            "Structural model",
            "Road design",
            "Construction estimation"
        ],
        internship:
            "Gain site and design experience through construction and infrastructure organizations.",
        careers: [
            "Civil Engineer",
            "Structural Engineer",
            "Site Engineer",
            "Project Engineer"
        ]
    },

    "electrical engineer": {
        category: "Engineering",
        title: "Electrical Engineer",
        overview:
            "Electrical Engineers work with electrical systems, power systems, control systems and electronics.",
        prerequisites: [
            "Mathematics",
            "Physics",
            "Electrical fundamentals"
        ],
        skills: [
            "Circuit analysis",
            "Power systems",
            "Control systems",
            "Electrical design",
            "MATLAB"
        ],
        tools: [
            "MATLAB",
            "AutoCAD Electrical",
            "ETAP"
        ],
        projects: [
            "Smart energy system",
            "Home automation",
            "Solar power project",
            "Motor control system"
        ],
        internship:
            "Gain practical exposure through power, automation, manufacturing or electrical engineering companies.",
        careers: [
            "Electrical Engineer",
            "Power Engineer",
            "Control Engineer",
            "Electrical Design Engineer"
        ]
    },

    "electronics engineer": {
        category: "Engineering",
        title: "Electronics Engineer",
        overview:
            "Electronics Engineers design and develop electronic circuits, embedded systems and devices.",
        prerequisites: [
            "Mathematics",
            "Physics",
            "Electronics fundamentals"
        ],
        skills: [
            "Circuit design",
            "Embedded systems",
            "Microcontrollers",
            "PCB design",
            "Digital electronics"
        ],
        tools: [
            "Arduino",
            "Raspberry Pi",
            "KiCad",
            "MATLAB"
        ],
        projects: [
            "IoT device",
            "Smart home system",
            "Embedded controller",
            "Sensor project"
        ],
        internship:
            "Build embedded and IoT projects and seek internships in electronics and embedded companies.",
        careers: [
            "Electronics Engineer",
            "Embedded Engineer",
            "IoT Engineer",
            "Hardware Engineer"
        ]
    },


    // ==================================================
    // HEALTHCARE
    // ==================================================

    "doctor": {
        category: "Healthcare",
        title: "Doctor",
        overview:
            "Doctors diagnose and manage medical conditions after completing the required medical education and licensing pathway.",
        prerequisites: [
            "Biology",
            "Chemistry",
            "Physics"
        ],
        skills: [
            "Medical knowledge",
            "Clinical reasoning",
            "Communication",
            "Patient care"
        ],
        tools: [
            "Medical equipment",
            "Electronic health records",
            "Diagnostic tools"
        ],
        projects: [
            "Medical research project",
            "Health awareness campaign",
            "Clinical case study"
        ],
        internship:
            "Follow the applicable medical education, clinical training and licensing requirements.",
        careers: [
            "Doctor",
            "Medical Officer",
            "Specialist",
            "Medical Researcher"
        ]
    },

    "pharmacist": {
        category: "Healthcare",
        title: "Pharmacist",
        overview:
            "Pharmacists work with medicines, dispensing, pharmaceutical information and patient guidance within their professional scope.",
        prerequisites: [
            "Chemistry",
            "Biology",
            "Pharmaceutical science"
        ],
        skills: [
            "Pharmacology",
            "Drug information",
            "Dispensing",
            "Pharmaceutical science"
        ],
        tools: [
            "Pharmacy management systems",
            "Laboratory equipment"
        ],
        projects: [
            "Drug information project",
            "Pharmacy management project",
            "Healthcare awareness project"
        ],
        internship:
            "Complete the required professional education and practical training.",
        careers: [
            "Pharmacist",
            "Clinical Pharmacist",
            "Pharmaceutical Researcher",
            "Drug Safety Associate"
        ]
    },


    // ==================================================
    // EDUCATION
    // ==================================================

    "teacher": {
        category: "Education",
        title: "Teacher",
        overview:
            "Teachers help students learn academic subjects and develop knowledge and skills.",
        prerequisites: [
            "Subject knowledge",
            "Communication skills"
        ],
        skills: [
            "Teaching",
            "Communication",
            "Lesson planning",
            "Classroom management",
            "Digital teaching"
        ],
        tools: [
            "Google Classroom",
            "Microsoft Teams",
            "PowerPoint",
            "Digital whiteboards"
        ],
        projects: [
            "Online lesson",
            "Teaching portfolio",
            "Educational video",
            "Student activity"
        ],
        internship:
            "Gain teaching experience through schools, educational organizations or tutoring programs.",
        careers: [
            "Teacher",
            "Tutor",
            "Online Educator",
            "Academic Coordinator"
        ]
    },


    // ==================================================
    // LAW
    // ==================================================

    "lawyer": {
        category: "Law",
        title: "Lawyer",
        overview:
            "Lawyers provide legal services and represent clients within the applicable legal framework.",
        prerequisites: [
            "Strong communication",
            "Reading ability",
            "Interest in law"
        ],
        skills: [
            "Legal research",
            "Legal writing",
            "Case analysis",
            "Communication",
            "Negotiation"
        ],
        tools: [
            "Legal databases",
            "Document management software"
        ],
        projects: [
            "Legal research paper",
            "Case analysis",
            "Moot court",
            "Legal awareness project"
        ],
        internship:
            "Gain experience through law firms, legal departments, courts or legal organizations as permitted.",
        careers: [
            "Lawyer",
            "Legal Associate",
            "Legal Consultant",
            "Corporate Counsel"
        ]
    },


    // ==================================================
    // HOSPITALITY
    // ==================================================

    "chef": {
        category: "Hospitality",
        title: "Chef",
        overview:
            "Chefs plan, prepare and present food while managing kitchen operations and food safety.",
        prerequisites: [
            "Interest in cooking",
            "Creativity",
            "Food safety awareness"
        ],
        skills: [
            "Cooking",
            "Food preparation",
            "Menu planning",
            "Food safety",
            "Kitchen management"
        ],
        tools: [
            "Kitchen equipment",
            "Recipe management tools"
        ],
        projects: [
            "Personal recipe portfolio",
            "Menu design",
            "Food presentation project"
        ],
        internship:
            "Gain practical experience through restaurants, hotels, catering companies or culinary programs.",
        careers: [
            "Chef",
            "Sous Chef",
            "Pastry Chef",
            "Culinary Specialist"
        ]
    },


    // ==================================================
    // AVIATION
    // ==================================================

    "pilot": {
        category: "Aviation",
        title: "Pilot",
        overview:
            "Pilots operate aircraft after completing the applicable training, examinations and licensing requirements.",
        prerequisites: [
            "Physics",
            "Mathematics",
            "Medical eligibility",
            "Required aviation training"
        ],
        skills: [
            "Flight operations",
            "Navigation",
            "Communication",
            "Decision making",
            "Aviation safety"
        ],
        tools: [
            "Flight simulator",
            "Navigation systems",
            "Aircraft instruments"
        ],
        projects: [
            "Flight planning exercises",
            "Aviation research",
            "Simulator training"
        ],
        internship:
            "Follow the applicable aviation authority's training and licensing requirements.",
        careers: [
            "Commercial Pilot",
            "Flight Instructor",
            "Airline Pilot",
            "Charter Pilot"
        ]
    },


    // ==================================================
    // SPORTS & FITNESS
    // ==================================================

    "fitness trainer": {
        category: "Sports & Fitness",
        title: "Fitness Trainer",
        overview:
            "Fitness Trainers help clients develop exercise routines and healthy fitness habits within their professional scope.",
        prerequisites: [
            "Interest in fitness",
            "Basic anatomy knowledge"
        ],
        skills: [
            "Exercise programming",
            "Basic anatomy",
            "Communication",
            "Fitness assessment"
        ],
        tools: [
            "Fitness tracking apps",
            "Heart-rate monitors",
            "Gym equipment"
        ],
        projects: [
            "Workout plan",
            "Fitness portfolio",
            "Exercise education content"
        ],
        internship:
            "Gain supervised practical experience and pursue appropriate fitness certifications.",
        careers: [
            "Fitness Trainer",
            "Personal Trainer",
            "Fitness Coach",
            "Strength Coach"
        ]
    },


    // ==================================================
    // MUSIC
    // ==================================================

    "musician": {
        category: "Music",
        title: "Musician",
        overview:
            "Musicians perform, compose, arrange or produce music across live and digital environments.",
        prerequisites: [
            "Interest in music",
            "Practice discipline"
        ],
        skills: [
            "Instrument or vocal skills",
            "Music theory",
            "Performance",
            "Composition",
            "Music production"
        ],
        tools: [
            "DAW",
            "Microphone",
            "Audio interface",
            "Musical instruments"
        ],
        projects: [
            "Original song",
            "Music cover",
            "Live performance",
            "Music production project"
        ],
        internship:
            "Build a portfolio through performances, recordings and collaborations.",
        careers: [
            "Musician",
            "Singer",
            "Composer",
            "Music Producer",
            "Session Artist"
        ]
    }
};


// ======================================================
// SEARCH ALIASES
// ======================================================

const aliases = {

    // Technology
    "web developer": "full stack developer",
    "web development": "full stack developer",
    "software developer": "full stack developer",
    "software development": "full stack developer",
    "react developer": "frontend developer",
    "frontend": "frontend developer",
    "front end": "frontend developer",
    "backend": "backend developer",
    "back end": "backend developer",
    "app developer": "mobile app developer",
    "android developer": "mobile app developer",
    "python": "python developer",

    // AI
    "ai": "artificial intelligence engineer",
    "artificial intelligence": "artificial intelligence engineer",
    "ai engineer": "artificial intelligence engineer",
    "machine learning": "machine learning engineer",
    "ml": "machine learning engineer",
    "data science": "data scientist",
    "data scientist": "data scientist",
    "data analytics": "data analyst",
    "data analysis": "data analyst",

    // Cybersecurity
    "cyber security": "cybersecurity analyst",
    "cybersecurity": "cybersecurity analyst",
    "cyber security analyst": "cybersecurity analyst",
    "ethical hacking": "ethical hacker",
    "hacking": "ethical hacker",
    "penetration testing": "ethical hacker",
    "pentesting": "ethical hacker",
    "cloud security": "cloud security engineer",

    // Design
    "ui ux": "ui/ux designer",
    "ui/ux": "ui/ux designer",
    "ui ux designer": "ui/ux designer",
    "ux": "ui/ux designer",
    "ui": "ui/ux designer",
    "graphic design": "graphic designer",
    "animation": "animator",
    "3d animation": "animator",
    "motion graphics": "animator",

    // Writing / media
    "writing": "content writer",
    "writer": "content writer",
    "content writing": "content writer",
    "copywriting": "content writer",
    "seo writing": "content writer",
    "journalism": "journalist",
    "news": "journalist",
    "acting": "actor",
    "film acting": "actor",
    "cinema": "actor",
    "photography": "photographer",
    "photographer": "photographer",

    // Business
    "business analysis": "business analyst",
    "business analyst": "business analyst",
    "digital marketing": "digital marketing specialist",
    "marketing": "digital marketing specialist",
    "seo": "digital marketing specialist",
    "social media marketing": "digital marketing specialist",

    // Finance
    "accounting": "accountant",
    "accounts": "accountant",
    "finance": "financial analyst",
    "financial analysis": "financial analyst",
    "ca": "chartered accountant",
    "chartered accountancy": "chartered accountant",

    // Engineering
    "mechanical": "mechanical engineer",
    "mechanical engineering": "mechanical engineer",
    "civil": "civil engineer",
    "civil engineering": "civil engineer",
    "electrical": "electrical engineer",
    "electrical engineering": "electrical engineer",
    "electronics": "electronics engineer",
    "electronics engineering": "electronics engineer",

    // Healthcare
    "medicine": "doctor",
    "medical": "doctor",
    "mbbs": "doctor",
    "pharmacy": "pharmacist",
    "pharmacist": "pharmacist",

    // Education
    "teaching": "teacher",
    "teacher": "teacher",
    "teaching career": "teacher",

    // Law
    "law": "lawyer",
    "legal": "lawyer",
    "lawyer": "lawyer",

    // Hospitality
    "cooking": "chef",
    "cook": "chef",
    "chef": "chef",
    "culinary": "chef",

    // Aviation
    "aviation": "pilot",
    "pilot": "pilot",
    "piloting": "pilot",

    // Fitness
    "fitness": "fitness trainer",
    "gym trainer": "fitness trainer",
    "personal trainer": "fitness trainer",
    "sports fitness": "fitness trainer",

    // Music
    "music": "musician",
    "singing": "musician",
    "singer": "musician",
    "musician": "musician"
};


// ======================================================
// FIND CAREER
// ======================================================

function findCareer(course) {

    const original = String(course || "").trim();

    if (!original) {
        return null;
    }

    const normalized = original
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    // Exact profile
    if (careerProfiles[normalized]) {
        return careerProfiles[normalized];
    }

    // Alias
    if (aliases[normalized]) {
        return careerProfiles[aliases[normalized]];
    }

    // Partial matching
    for (const key of Object.keys(careerProfiles)) {
        if (
            normalized.includes(key) ||
            key.includes(normalized)
        ) {
            return careerProfiles[key];
        }
    }

    // Partial alias matching
    for (const alias of Object.keys(aliases)) {
        if (
            normalized.includes(alias) ||
            alias.includes(normalized)
        ) {
            return careerProfiles[aliases[alias]];
        }
    }

    return null;
}


// ======================================================
// GENERIC CAREER GENERATOR
// ======================================================

function createGenericCareer(course) {

    const title = String(course)
        .trim()
        .replace(/\b\w/g, letter => letter.toUpperCase());

    return {
        category: "Other",
        title: title,

        overview:
            `${title} is a career path that can be explored through education, practical learning, projects, internships and industry experience.`,

        prerequisites: [
            "Basic knowledge of the subject",
            "Interest in the field",
            "Communication skills",
            "Willingness to learn"
        ],

        skills: [
            `${title} fundamentals`,
            "Communication",
            "Problem solving",
            "Research",
            "Digital skills",
            "Professional skills"
        ],

        tools: [
            "VS Code or suitable learning tools",
            "Google",
            "GitHub",
            "Microsoft Office / Google Workspace"
        ],

        projects: [
            `Beginner ${title} project`,
            `Intermediate ${title} project`,
            `Portfolio project`
        ],

        internship:
            `Look for internships, volunteering, projects and entry-level opportunities related to ${title}. Build a portfolio and document your practical work.`,

        careers: [
            title,
            `${title} Specialist`,
            `${title} Associate`,
            `${title} Consultant`
        ]
    };
}


// ======================================================
// BUILD ROADMAP
// ======================================================

function buildRoadmap(course) {

    const profile = findCareer(course) || createGenericCareer(course);

    return {

        title: profile.title,

        category: profile.category,

        overview: profile.overview,

        prerequisites: profile.prerequisites,

        stages: [

            {
                stage: 1,
                title: "Foundation",
                duration: "1-2 months",
                skills: profile.prerequisites,
                topics: [
                    "Understand the fundamentals",
                    "Learn important terminology",
                    "Study basic concepts",
                    "Practice regularly"
                ]
            },

            {
                stage: 2,
                title: "Core Skills",
                duration: "2-3 months",
                skills: profile.skills,
                topics: [
                    "Learn the core skills",
                    "Practice with examples",
                    "Follow structured tutorials",
                    "Solve practical problems"
                ]
            },

            {
                stage: 3,
                title: "Tools & Practical Learning",
                duration: "1-3 months",
                skills: profile.tools,
                topics: [
                    "Learn industry tools",
                    "Build small projects",
                    "Practice real-world workflows",
                    "Document your work"
                ]
            },

            {
                stage: 4,
                title: "Projects & Portfolio",
                duration: "1-3 months",
                skills: [
                    "Project development",
                    "Problem solving",
                    "Documentation",
                    "Presentation"
                ],
                topics: profile.projects
            },

            {
                stage: 5,
                title: "Internship & Career Preparation",
                duration: "Ongoing",
                skills: [
                    "Resume building",
                    "Portfolio development",
                    "Interview preparation",
                    "Communication",
                    "Networking"
                ],
                topics: [
                    profile.internship,
                    "Create a professional resume",
                    "Build a LinkedIn profile",
                    "Maintain a GitHub or portfolio where relevant",
                    "Apply for relevant internships",
                    "Prepare for interviews"
                ]
            }
        ],

        internshipPreparation: profile.internship,

        careerOptions: profile.careers,

        importantNote:
            "Career requirements vary by role, organization and location. Always verify professional qualifications, licensing requirements and current job requirements before applying."
    };
}


// ======================================================
// ROADMAP API
// ======================================================

app.post("/api/generate-roadmap", (req, res) => {

    try {

        const { course } = req.body;

        if (!course || !String(course).trim()) {
            return res.status(400).json({
                success: false,
                message: "Please enter a career or course."
            });
        }

        const roadmap = buildRoadmap(course);

        return res.json({
            success: true,
            roadmap: roadmap
        });

    } catch (error) {

        console.error("Roadmap generation error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to generate roadmap."
        });
    }
});


// ======================================================
// AVAILABLE CAREERS API
// ======================================================

app.get("/api/careers", (req, res) => {

    const careers = Object.values(careerProfiles).map(career => ({
        title: career.title,
        category: career.category
    }));

    res.json({
        success: true,
        careers
    });
});


// ======================================================
// SERVER
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `CareerPath backend running on port ${PORT}`
    );

    console.log(
        "Career-aware roadmap generator is enabled."
    );
});