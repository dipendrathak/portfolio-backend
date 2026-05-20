const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for file upload (store in uploads/ directory)
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        // Keep original filename or use provided name
        const customName = req.body.customName;
        if (customName) {
            const ext = path.extname(file.originalname);
            cb(null, customName + ext);
        } else {
            cb(null, file.originalname);
        }
    }
});

const fileFilter = (req, file, cb) => {
    // Allow PDFs, images
    const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF and image files are allowed.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB max
    }
});

// ──────────────────────────────────────────
// POST /api/files/upload — Upload File (Protected)
// ──────────────────────────────────────────
router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded.'
            });
        }

        // Also copy to frontend directory for static serving
        const frontendDir = path.join(__dirname, '..', '..');
        const destPath = path.join(frontendDir, req.file.filename);
        fs.copyFileSync(req.file.path, destPath);

        res.json({
            success: true,
            message: 'File uploaded successfully!',
            file: {
                filename: req.file.filename,
                originalname: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype,
                path: `/api/files/${req.file.filename}`
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Error uploading file.'
        });
    }
});

// ──────────────────────────────────────────
// GET /api/files/:filename — Serve File (Public)
// ──────────────────────────────────────────
router.get('/:filename', (req, res) => {
    const filename = req.params.filename;

    // First check uploads directory
    const uploadPath = path.join(uploadsDir, filename);
    if (fs.existsSync(uploadPath)) {
        return res.sendFile(uploadPath);
    }

    // Then check frontend directory (for existing files)
    const frontendPath = path.join(__dirname, '..', '..', filename);
    if (fs.existsSync(frontendPath)) {
        return res.sendFile(frontendPath);
    }

    res.status(404).json({
        success: false,
        message: 'File not found.'
    });
});

// ──────────────────────────────────────────
// GET /api/files — List All Files (Protected)
// ──────────────────────────────────────────
router.get('/', auth, async (req, res) => {
    try {
        const files = [];

        // List files in uploads directory
        if (fs.existsSync(uploadsDir)) {
            const uploadFiles = fs.readdirSync(uploadsDir);
            uploadFiles.forEach(filename => {
                const filePath = path.join(uploadsDir, filename);
                const stats = fs.statSync(filePath);
                files.push({
                    filename,
                    size: stats.size,
                    uploadedAt: stats.mtime,
                    path: `/api/files/${filename}`,
                    location: 'uploads'
                });
            });
        }

        // List portfolio files in frontend directory
        const frontendDir = path.join(__dirname, '..', '..');
        const portfolioFiles = ['CV.pdf', 'Geo World Magzine Volume VIII.pdf', 'image.jpg', '11.jpg'];
        portfolioFiles.forEach(filename => {
            const filePath = path.join(frontendDir, filename);
            if (fs.existsSync(filePath)) {
                const stats = fs.statSync(filePath);
                // Don't add if already in uploads list
                if (!files.find(f => f.filename === filename)) {
                    files.push({
                        filename,
                        size: stats.size,
                        uploadedAt: stats.mtime,
                        path: `/api/files/${filename}`,
                        location: 'frontend'
                    });
                }
            }
        });

        res.json({
            success: true,
            count: files.length,
            files
        });
    } catch (error) {
        console.error('List files error:', error);
        res.status(500).json({
            success: false,
            message: 'Error listing files.'
        });
    }
});

// ──────────────────────────────────────────
// DELETE /api/files/:filename — Delete File (Protected)
// ──────────────────────────────────────────
router.delete('/:filename', auth, (req, res) => {
    try {
        const filename = req.params.filename;
        const uploadPath = path.join(uploadsDir, filename);

        if (fs.existsSync(uploadPath)) {
            fs.unlinkSync(uploadPath);
            return res.json({
                success: true,
                message: `File "${filename}" deleted successfully.`
            });
        }

        res.status(404).json({
            success: false,
            message: 'File not found in uploads directory.'
        });
    } catch (error) {
        console.error('Delete file error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting file.'
        });
    }
});

module.exports = router;
