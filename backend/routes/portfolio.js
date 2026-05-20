const express = require('express');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');

const router = express.Router();

// ──────────────────────────────────────────
// GET /api/portfolio — Get All Portfolio Data (Public)
// ──────────────────────────────────────────
router.get('/', async (req, res) => {
    try {
        let portfolio = await Portfolio.findOne();
        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: 'Portfolio data not found. Please run the seed script first.'
            });
        }
        res.json({
            success: true,
            data: portfolio
        });
    } catch (error) {
        console.error('Get portfolio error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching portfolio data.'
        });
    }
});

// ──────────────────────────────────────────
// PUT /api/portfolio/hero — Update Hero Section (Protected)
// ──────────────────────────────────────────
router.put('/hero', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        portfolio.hero = { ...portfolio.hero.toObject(), ...req.body };
        await portfolio.save();

        res.json({ success: true, message: 'Hero section updated!', data: portfolio.hero });
    } catch (error) {
        console.error('Update hero error:', error);
        res.status(500).json({ success: false, message: 'Error updating hero section.' });
    }
});

// ──────────────────────────────────────────
// PUT /api/portfolio/about — Update About Section (Protected)
// ──────────────────────────────────────────
router.put('/about', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        portfolio.about = { ...portfolio.about.toObject(), ...req.body };
        await portfolio.save();

        res.json({ success: true, message: 'About section updated!', data: portfolio.about });
    } catch (error) {
        console.error('Update about error:', error);
        res.status(500).json({ success: false, message: 'Error updating about section.' });
    }
});

// ──────────────────────────────────────────
// PUT /api/portfolio/skills — Update Skills (Protected)
// ──────────────────────────────────────────
router.put('/skills', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        if (req.body.skillsIntro) portfolio.skillsIntro = req.body.skillsIntro;
        if (req.body.skills) portfolio.skills = req.body.skills;
        await portfolio.save();

        res.json({
            success: true,
            message: 'Skills updated!',
            data: { skillsIntro: portfolio.skillsIntro, skills: portfolio.skills }
        });
    } catch (error) {
        console.error('Update skills error:', error);
        res.status(500).json({ success: false, message: 'Error updating skills.' });
    }
});

// ──────────────────────────────────────────
// PUT /api/portfolio/teaching-stats — Update Teaching Stats (Protected)
// ──────────────────────────────────────────
router.put('/teaching-stats', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        if (req.body.teachingStats) portfolio.teachingStats = req.body.teachingStats;
        if (req.body.chartData) portfolio.chartData = { ...portfolio.chartData.toObject(), ...req.body.chartData };
        await portfolio.save();

        res.json({
            success: true,
            message: 'Teaching stats updated!',
            data: { teachingStats: portfolio.teachingStats, chartData: portfolio.chartData }
        });
    } catch (error) {
        console.error('Update teaching stats error:', error);
        res.status(500).json({ success: false, message: 'Error updating teaching stats.' });
    }
});

// ──────────────────────────────────────────
// PUT /api/portfolio/experience — Update Experience (Protected)
// ──────────────────────────────────────────
router.put('/experience', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        portfolio.experience = req.body.experience || req.body;
        await portfolio.save();

        res.json({ success: true, message: 'Experience updated!', data: portfolio.experience });
    } catch (error) {
        console.error('Update experience error:', error);
        res.status(500).json({ success: false, message: 'Error updating experience.' });
    }
});

// ──────────────────────────────────────────
// GET /api/portfolio/projects — Get All Projects (Public)
// PUT /api/portfolio/projects — Update All Projects (Protected)
// POST /api/portfolio/projects — Add New Project (Protected)
// DELETE /api/portfolio/projects/:index — Delete Project (Protected)
// ──────────────────────────────────────────
router.get('/projects', async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });
        res.json({ success: true, data: portfolio.projects });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching projects.' });
    }
});

router.put('/projects', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        portfolio.projects = req.body.projects || req.body;
        await portfolio.save();

        res.json({ success: true, message: 'Projects updated!', data: portfolio.projects });
    } catch (error) {
        console.error('Update projects error:', error);
        res.status(500).json({ success: false, message: 'Error updating projects.' });
    }
});

router.post('/projects', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        portfolio.projects.push(req.body);
        await portfolio.save();

        res.status(201).json({
            success: true,
            message: 'Project added!',
            data: portfolio.projects[portfolio.projects.length - 1]
        });
    } catch (error) {
        console.error('Add project error:', error);
        res.status(500).json({ success: false, message: 'Error adding project.' });
    }
});

router.delete('/projects/:index', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        const index = parseInt(req.params.index);
        if (index < 0 || index >= portfolio.projects.length) {
            return res.status(400).json({ success: false, message: 'Invalid project index.' });
        }

        const removed = portfolio.projects.splice(index, 1);
        await portfolio.save();

        res.json({ success: true, message: 'Project deleted!', data: removed[0] });
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ success: false, message: 'Error deleting project.' });
    }
});

// ──────────────────────────────────────────
// PUT /api/portfolio/publications — Update Publications (Protected)
// ──────────────────────────────────────────
router.put('/publications', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        portfolio.publications = req.body.publications || req.body;
        await portfolio.save();

        res.json({ success: true, message: 'Publications updated!', data: portfolio.publications });
    } catch (error) {
        console.error('Update publications error:', error);
        res.status(500).json({ success: false, message: 'Error updating publications.' });
    }
});

// ──────────────────────────────────────────
// PUT /api/portfolio/achievements — Update Achievements (Protected)
// ──────────────────────────────────────────
router.put('/achievements', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        portfolio.achievements = req.body.achievements || req.body;
        await portfolio.save();

        res.json({ success: true, message: 'Achievements updated!', data: portfolio.achievements });
    } catch (error) {
        console.error('Update achievements error:', error);
        res.status(500).json({ success: false, message: 'Error updating achievements.' });
    }
});

// ──────────────────────────────────────────
// PUT /api/portfolio/education — Update Education (Protected)
// ──────────────────────────────────────────
router.put('/education', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        portfolio.education = req.body.education || req.body;
        await portfolio.save();

        res.json({ success: true, message: 'Education updated!', data: portfolio.education });
    } catch (error) {
        console.error('Update education error:', error);
        res.status(500).json({ success: false, message: 'Error updating education.' });
    }
});

// ──────────────────────────────────────────
// PUT /api/portfolio/contact — Update Contact (Protected)
// ──────────────────────────────────────────
router.put('/contact', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        portfolio.contact = { ...portfolio.contact.toObject(), ...req.body };
        await portfolio.save();

        res.json({ success: true, message: 'Contact info updated!', data: portfolio.contact });
    } catch (error) {
        console.error('Update contact error:', error);
        res.status(500).json({ success: false, message: 'Error updating contact.' });
    }
});

// ──────────────────────────────────────────
// PUT /api/portfolio/footer — Update Footer (Protected)
// ──────────────────────────────────────────
router.put('/footer', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        portfolio.footer = { ...portfolio.footer.toObject(), ...req.body };
        await portfolio.save();

        res.json({ success: true, message: 'Footer updated!', data: portfolio.footer });
    } catch (error) {
        console.error('Update footer error:', error);
        res.status(500).json({ success: false, message: 'Error updating footer.' });
    }
});

// ──────────────────────────────────────────
// PUT /api/portfolio/files — Update File References (Protected)
// ──────────────────────────────────────────
router.put('/files', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne();
        if (!portfolio) return res.status(404).json({ success: false, message: 'Portfolio not found.' });

        portfolio.files = { ...portfolio.files.toObject(), ...req.body };
        await portfolio.save();

        res.json({ success: true, message: 'File references updated!', data: portfolio.files });
    } catch (error) {
        console.error('Update files error:', error);
        res.status(500).json({ success: false, message: 'Error updating file references.' });
    }
});

module.exports = router;
