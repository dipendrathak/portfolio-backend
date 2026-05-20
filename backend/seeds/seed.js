require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');

// ══════════════════════════════════════════════
// PORTFOLIO DATA (from data.js)
// ══════════════════════════════════════════════
const PORTFOLIO_DATA = {
    hero: {
        name: "Dipendra Thakur",
        tagline: "Geomatics Engineer · Researcher · Educator",
        subtitle: "Published Researcher · HackFast Winner · Geomatics Innovator",
        description: "Bridging geospatial science with modern technology — GPS crustal deformation analysis, spatial data visualization, and innovative digital solutions.",
        image: "image.jpg",
        buttons: [
            { text: "View Projects", icon: "fas fa-rocket", href: "#projects", style: "" },
            { text: "Publications", icon: "fas fa-newspaper", href: "#publications", style: "background: transparent; border: 2px solid white;" },
            { text: "Download CV", icon: "fas fa-download", href: "#cv-download", style: "", class: "download-cv" }
        ]
    },

    about: {
        image: "11.jpg",
        paragraphs: [
            "I am Dipendra, a passionate Geomatics Engineer with a strong foundation in spatial data analysis, mapping, and digital surveying. My academic journey has shaped my skills in ArcGIS, QGIS, Pix4D, and various photogrammetry and database management tools.",
            "I have worked on several geospatial projects, including the Digitization Project at NAXA, where I contributed to building and updating geodatabases, digitizing buildings, and managing spatial datasets. I have also gained practical experience through internships in drone ecosystem research, geo-database management, and multihazard risk assessment.",
            "Alongside my technical background, I am also a teacher, guiding students in Mathematics and Physics. Teaching allows me to connect with learners, simplify complex concepts, and share my love for discovery and problem-solving.",
            "I believe that every map tells a story and every dataset holds potential for change. My goal is to combine my analytical skills and creative approach to contribute meaningfully to the field of geomatics and spatial innovation."
        ]
    },

    skillsIntro: [
        "I have developed a broad range of technical and creative skills through my studies in Geomatics Engineering and my hands on experience in mapping, data management, and education. My technical expertise covers GIS, remote sensing, photogrammetry, and spatial data visualization, allowing me to manage each stage of the geospatial workflow with precision and efficiency.",
        "I am skilled in using ArcGIS, QGIS, and Pix4D, with experience in digitization, spatial analysis, contour creation, and drone data processing. I also possess strong abilities in cartographic design, data quality assurance, and geodatabase management, ensuring accuracy and clarity in all project outcomes.",
        "In addition to my technical background, I have developed creative skills in video editing and digital presentation. I apply these abilities to both professional and educational work, producing engaging visual materials that make complex spatial and scientific concepts easier to understand.",
        "My experience as a teacher of Mathematics and Physics has strengthened my communication, analytical, and problem-solving skills. I value teamwork, adaptability, and continuous learning, and I strive to use every skill technical or creative to contribute meaningfully to the fields of geomatics and education."
    ],

    skills: [
        {
            title: "GIS & Remote Sensing",
            icon: "fas fa-map",
            items: [
                { name: "ArcGIS", level: 90 },
                { name: "QGIS", level: 85 },
                { name: "Pix4D", level: 80 },
                { name: "Photogrammetry", level: 75 }
            ]
        },
        {
            title: "Data Management",
            icon: "fas fa-database",
            items: [
                { name: "Digitization", level: 85 },
                { name: "Geo-Database Management", level: 80 },
                { name: "Drone Data Processing", level: 75 }
            ]
        },
        {
            title: "Teaching",
            icon: "fas fa-chalkboard-teacher",
            items: [
                { name: "Mathematics", level: 90 },
                { name: "Physics", level: 85 },
                { name: "Educational Content Creation", level: 80 }
            ]
        }
    ],

    teachingStats: [
        { icon: "fas fa-user-graduate", target: 2500, label: "Students Taught" },
        { icon: "fas fa-chalkboard", target: 5000, label: "Teaching Hours" },
        { icon: "fas fa-award", target: 95, label: "Success Rate (%)" },
        { icon: "fas fa-book", target: 120, label: "Topics Covered" }
    ],

    chartData: {
        performanceChart: {
            title: "Student Performance Improvement",
            bars: [
                { label: "Mathematics", value: 85, gradient: "linear-gradient(90deg, var(--secondary), var(--accent))" },
                { label: "Physics", value: 80, gradient: "linear-gradient(90deg, var(--secondary), #9b59b6)" },
                { label: "Problem Solving", value: 90, gradient: "linear-gradient(90deg, var(--secondary), #e74c3c)" }
            ]
        },
        growthChart: {
            title: "Student Growth Over Time",
            height: 85,
            label: "Teaching Journey (2019-Present)",
            number: "2500+ Students"
        }
    },

    experience: [
        {
            date: "2025",
            title: "Published Research Article",
            icon: "fas fa-newspaper",
            iconColor: "var(--secondary)",
            description: "Authored a research article published in <strong>Geomatics World Magazine</strong> on GPS-based crustal deformation analysis and Himalayan geodynamics. The publication reflects deep analytical capability, research-oriented thinking, and the ability to bridge theoretical geomatics concepts with real-world geospatial applications."
        },
        {
            date: "2025",
            title: "HackFast — First Prize Winner",
            icon: "fas fa-trophy",
            iconColor: "#ffd700",
            description: "Achieved <strong>First Prize Winner</strong> position at HackFast by presenting DisasterReady — a Live Emergency Evacuation System with real-time disaster response, shelter management, and evacuation route planning. Demonstrated innovation, teamwork, technical leadership, and the ability to transform ideas into impactful solutions."
        },
        {
            date: "2024 - Present",
            title: "Nepal GPS Crustal Deformation Analysis",
            icon: "fas fa-satellite",
            iconColor: "var(--accent)",
            description: "Developed a comprehensive interactive web-based geospatial analysis system for studying tectonic plate collision and ground movement in the Nepal Himalaya using GPS and geodetic survey data. Features include velocity mapping, strain rate calculation, earthquake hazard visualization, and time series analysis using real data from Nevada Geodetic Laboratory and UNAVCO."
        },
        {
            date: "2023 - Present",
            title: "Digitization Project",
            icon: "",
            iconColor: "",
            description: "Worked on the Digitization Project at NAXA, contributing to building and updating geodatabases, digitizing buildings, and managing spatial datasets."
        },
        {
            date: "2022 - 2023",
            title: "Drone Ecosystem Research",
            icon: "",
            iconColor: "",
            description: "Conducted research using drone technology for ecosystem analysis and environmental monitoring."
        },
        {
            date: "2021 - 2022",
            title: "Geo Database Management",
            icon: "",
            iconColor: "",
            description: "Managed geospatial databases, ensuring data integrity and accessibility for various projects."
        },
        {
            date: "2020 - 2021",
            title: "Municipal Geodatabase Development Project",
            icon: "",
            iconColor: "",
            description: "Participated in projects assessing Municipal Geodatabase Development Project."
        },
        {
            date: "2019 - Present",
            title: "Mathematics & Physics Tutor",
            icon: "",
            iconColor: "",
            description: "Teaching Mathematics and Physics to students up to grade 12, helping them understand complex concepts and improve their problem-solving skills."
        }
    ],

    projects: [
        {
            title: "Nepal GPS Crustal Deformation Analysis",
            description: "Interactive web-based analysis system for studying tectonic plate collision and ground movement in Nepal Himalaya using real GPS data from Nevada Geodetic Laboratory & UNAVCO.",
            icon: "fas fa-satellite",
            gradient: "linear-gradient(135deg, #1a1f36, #2d3a8c, #4f6df5)",
            tags: ["GPS Analysis", "Leaflet.js", "Chart.js", "Geodesy", "Tectonics"],
            link: "https://dipendrathak.github.io/Nepal-GPS-Crustal-Deformation/",
            featured: true,
            badgeText: "Featured",
            badgeIcon: "fas fa-star"
        },
        {
            title: "DisasterReady — HackFast Winner",
            description: "Live Emergency Evacuation System with real-time disaster response, shelter management, evacuation route planning, and resource tracking. First Prize at HackFast hackathon.",
            icon: "fas fa-shield-alt",
            gradient: "linear-gradient(135deg, #ff6b35, #f7931e, #ffd700)",
            tags: ["Emergency System", "Real-time Maps", "Hackathon", "GIS"],
            link: "https://dipendrathak.github.io/Hackfast-project-idea/",
            featured: true,
            badgeText: "1st Prize",
            badgeIcon: "fas fa-trophy"
        },
        {
            title: "Digitization Project",
            description: "Building and updating geodatabases, digitizing buildings, and managing spatial datasets for NAXA.",
            icon: "fas fa-map-marked-alt",
            gradient: "linear-gradient(45deg, var(--primary), var(--secondary))",
            tags: ["ArcGIS", "QGIS", "Database Management"],
            link: "",
            featured: false
        },
        {
            title: "Drone Ecosystem Research",
            description: "Using drone technology and photogrammetry for environmental monitoring and ecosystem analysis.",
            icon: "fas fa-drone",
            gradient: "linear-gradient(45deg, var(--primary), var(--secondary))",
            tags: ["Pix4D", "Photogrammetry", "Drone Data"],
            link: "",
            featured: false
        },
        {
            title: "Municipal Geodatabase Development Project",
            description: "Assessing multi-hazard risks using geospatial analysis techniques and creating risk maps.",
            icon: "fas fa-exclamation-triangle",
            gradient: "linear-gradient(45deg, var(--primary), var(--secondary))",
            tags: ["Risk Assessment", "Spatial Analysis", "GIS"],
            link: "",
            featured: false
        },
        {
            title: "Augmented Reality App",
            description: "Final year project developing an augmented reality application for geospatial visualization.",
            icon: "fas fa-vr-cardboard",
            gradient: "linear-gradient(45deg, var(--primary), var(--secondary))",
            tags: ["Augmented Reality", "Solo Project", "Innovation"],
            link: "https://dipendrathak.github.io/AR-project/",
            featured: false
        },
        {
            title: "ArcGIS Project",
            description: "A comprehensive GIS project showcasing spatial analysis and mapping capabilities.",
            icon: "fas fa-globe",
            gradient: "linear-gradient(45deg, var(--primary), var(--secondary))",
            tags: ["ArcGIS", "Spatial Analysis", "Web GIS"],
            link: "https://dipendrathak.github.io/ArcGisByDIpendra",
            featured: false
        }
    ],

    publications: [
        {
            badge: "Published",
            title: "GPS-Based Crustal Deformation Analysis in the Nepal Himalaya: Insights from Geodetic Monitoring and Tectonic Movement Interpretation",
            journal: "Geomatics World Magazine",
            description: "A comprehensive research article exploring crustal deformation studies using GPS data analysis across the Nepal Himalayan region. The publication examines India-Eurasia plate convergence rates, strain accumulation patterns, and seismic hazard implications through geodetic monitoring. The research bridges theoretical geomatics concepts with real-world geospatial applications, demonstrating advanced analytical capability in processing continuous GPS station data from Nevada Geodetic Laboratory and UNAVCO networks.",
            topics: ["GPS Data Analysis", "Crustal Deformation", "Himalayan Geodynamics", "Geodetic Monitoring", "Tectonic Movements", "Strain Analysis", "Seismic Hazard"],
            link: "https://dipendrathak.github.io/Nepal-GPS-Crustal-Deformation/",
            linkText: "View Interactive Research Dashboard"
        }
    ],

    achievements: [
        {
            title: "HackFast — First Prize Winner",
            description: "Secured the First Prize at HackFast hackathon by presenting DisasterReady — an innovative Live Emergency Evacuation System. Demonstrated strong problem-solving, creative thinking, technical leadership, and the ability to transform visionary ideas into impactful digital solutions.",
            iconClass: "fas fa-trophy",
            iconType: "trophy",
            year: "2025"
        },
        {
            title: "Published Research Author",
            description: "Authored and published a research article in Geomatics World Magazine on GPS-based crustal deformation analysis and Himalayan geodynamics — bridging academic research with practical geospatial technology and scientific communication.",
            iconClass: "fas fa-newspaper",
            iconType: "research",
            year: "2025"
        },
        {
            title: "Geospatial Innovation Leader",
            description: "Developed comprehensive interactive web-based geospatial portfolio projects combining GPS analysis, spatial data visualization, earthquake hazard mapping, and scientific communication through modern web technologies.",
            iconClass: "fas fa-lightbulb",
            iconType: "innovation",
            year: "2024 - Present"
        }
    ],

    education: [
        {
            degree: "Bachelor's in Geomatics Engineering",
            period: "2022 - Present",
            institution: "IOE Paschimanchal Campus, Pokhara",
            description: "Currently pursuing a Bachelor's degree in Geomatics Engineering with a focus on spatial data analysis, mapping, and surveying technologies."
        },
        {
            degree: "High School Degree",
            period: "Completed",
            institution: "Mithila Institute of Technology (MIT) Janakpur",
            description: "Completed higher secondary education with a focus on Science, Mathematics, and Physics."
        }
    ],

    contact: {
        email: "thakurnikee47@gmail.com",
        phone: "9824177549",
        whatsapp: "9779824177549",
        location: "Bathanaha/ Manara, Shiswa municipality - 09, Mahottari",
        socialLinks: [
            { href: "https://www.facebook.com/", icon: "fab fa-facebook", title: "Facebook" },
            { href: "https://youtube.com/%40DipendarThakur-iu7np", icon: "fab fa-youtube", title: "YouTube" },
            { href: "https://dipendrathak.github.io/ArcGisByDIpendra", icon: "fas fa-map", title: "ArcGIS Project" },
            { href: "https://dipendrathak.github.io/Agumented-Reality-App", icon: "fas fa-vr-cardboard", title: "AR Project" }
        ]
    },

    footer: {
        copyright: "2026 Dipendra Thakur. All Rights Reserved.",
        socialLinks: [
            { href: "https://www.facebook.com/", icon: "fab fa-facebook", title: "Facebook" },
            { href: "https://youtube.com/%40DipendarThakur-iu7np", icon: "fab fa-youtube", title: "YouTube" },
            { href: "https://github.com/dipendrathak", icon: "fab fa-github", title: "GitHub" },
            { href: "https://dipendrathak.github.io/Nepal-GPS-Crustal-Deformation/", icon: "fas fa-satellite", title: "GPS Research" },
            { href: "https://dipendrathak.github.io/ArcGisByDIpendra", icon: "fas fa-map", title: "ArcGIS Project" },
            { href: "https://dipendrathak.github.io/Agumented-Reality-App", icon: "fas fa-vr-cardboard", title: "AR Project" }
        ]
    },

    files: {
        cv: "CV.pdf",
        magazine: "Geo World Magzine Volume VIII.pdf",
        profilePhoto: "image.jpg",
        aboutPhoto: "11.jpg"
    }
};

// ══════════════════════════════════════════════
// SEED FUNCTION
// ══════════════════════════════════════════════
async function seed() {
    try {
        console.log('🌱 Starting database seed...');
        console.log('');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // ─── Create Admin User ───
        console.log('');
        console.log('👤 Creating admin user...');
        await User.deleteMany({});
        const admin = await User.create({
            name: process.env.ADMIN_NAME || 'Dipendra Thakur',
            email: process.env.ADMIN_EMAIL || 'thakurnikee47@gmail.com',
            password: process.env.ADMIN_PASSWORD || 'Dipendra@2026',
            role: 'admin'
        });
        console.log(`   ✅ Admin created: ${admin.email}`);

        // ─── Seed Portfolio Data ───
        console.log('');
        console.log('📦 Seeding portfolio data...');
        await Portfolio.deleteMany({});
        const portfolio = await Portfolio.create(PORTFOLIO_DATA);
        console.log('   ✅ Portfolio data seeded successfully!');
        console.log(`   📊 Projects: ${portfolio.projects.length}`);
        console.log(`   📰 Publications: ${portfolio.publications.length}`);
        console.log(`   🏆 Achievements: ${portfolio.achievements.length}`);
        console.log(`   🎓 Education: ${portfolio.education.length}`);
        console.log(`   💼 Experience: ${portfolio.experience.length}`);
        console.log(`   🔧 Skill Categories: ${portfolio.skills.length}`);

        console.log('');
        console.log('╔══════════════════════════════════════════════╗');
        console.log('║       ✅ Database Seeded Successfully!      ║');
        console.log('╠══════════════════════════════════════════════╣');
        console.log('║                                              ║');
        console.log(`║   Admin Email:    ${admin.email}  ║`);
        console.log('║   Admin Password: (as set in .env)           ║');
        console.log('║                                              ║');
        console.log('║   Run: npm start                             ║');
        console.log('║   Admin: http://localhost:5000/admin          ║');
        console.log('║                                              ║');
        console.log('╚══════════════════════════════════════════════╝');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error.message);
        await mongoose.connection.close();
        process.exit(1);
    }
}

seed();
