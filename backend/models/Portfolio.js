const mongoose = require('mongoose');

// Sub-schemas for nested objects
const buttonSchema = new mongoose.Schema({
    text: String,
    icon: String,
    href: String,
    style: { type: String, default: '' },
    class: { type: String, default: '' }
}, { _id: false });

const skillItemSchema = new mongoose.Schema({
    name: String,
    level: Number
}, { _id: false });

const skillCategorySchema = new mongoose.Schema({
    title: String,
    icon: String,
    items: [skillItemSchema]
}, { _id: false });

const teachingStatSchema = new mongoose.Schema({
    icon: String,
    target: Number,
    label: String
}, { _id: false });

const experienceSchema = new mongoose.Schema({
    date: String,
    title: String,
    icon: { type: String, default: '' },
    iconColor: { type: String, default: '' },
    description: String
}, { _id: false });

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    icon: String,
    gradient: String,
    tags: [String],
    link: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    badgeText: { type: String, default: '' },
    badgeIcon: { type: String, default: '' }
}, { _id: false });

const publicationSchema = new mongoose.Schema({
    badge: String,
    title: String,
    journal: String,
    description: String,
    topics: [String],
    link: { type: String, default: '' },
    linkText: { type: String, default: '' }
}, { _id: false });

const achievementSchema = new mongoose.Schema({
    title: String,
    description: String,
    iconClass: String,
    iconType: String,
    year: String
}, { _id: false });

const educationSchema = new mongoose.Schema({
    degree: String,
    period: String,
    institution: String,
    description: String
}, { _id: false });

const socialLinkSchema = new mongoose.Schema({
    href: String,
    icon: String,
    title: String
}, { _id: false });

// Chart data schemas
const chartBarSchema = new mongoose.Schema({
    label: String,
    value: Number,
    gradient: { type: String, default: 'linear-gradient(90deg, var(--secondary), var(--accent))' }
}, { _id: false });

// Main Portfolio Schema
const portfolioSchema = new mongoose.Schema({
    // Hero Section
    hero: {
        name: String,
        tagline: String,
        subtitle: String,
        description: String,
        image: String,
        buttons: [buttonSchema]
    },

    // About Section
    about: {
        image: String,
        paragraphs: [String]
    },

    // Skills Section
    skillsIntro: [String],
    skills: [skillCategorySchema],

    // Teaching Stats
    teachingStats: [teachingStatSchema],

    // Chart Data (for real-time graphs)
    chartData: {
        performanceChart: {
            title: { type: String, default: 'Student Performance Improvement' },
            bars: [chartBarSchema]
        },
        growthChart: {
            title: { type: String, default: 'Student Growth Over Time' },
            height: { type: Number, default: 85 },
            label: { type: String, default: 'Teaching Journey (2019-Present)' },
            number: { type: String, default: '2500+ Students' }
        }
    },

    // Experience Timeline
    experience: [experienceSchema],

    // Projects
    projects: [projectSchema],

    // Publications
    publications: [publicationSchema],

    // Achievements
    achievements: [achievementSchema],

    // Education
    education: [educationSchema],

    // Contact
    contact: {
        email: String,
        phone: String,
        whatsapp: String,
        location: String,
        socialLinks: [socialLinkSchema]
    },

    // Footer
    footer: {
        copyright: String,
        socialLinks: [socialLinkSchema]
    },

    // Files metadata
    files: {
        cv: { type: String, default: 'CV.pdf' },
        magazine: { type: String, default: 'Geo World Magzine Volume VIII.pdf' },
        profilePhoto: { type: String, default: 'image.jpg' },
        aboutPhoto: { type: String, default: '11.jpg' }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
