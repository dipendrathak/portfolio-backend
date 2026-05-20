require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// ──────────────────────────────────────────
// Middleware
// ──────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ──────────────────────────────────────────
// API Routes
// ──────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/files', require('./routes/files'));

// ──────────────────────────────────────────
// Serve Admin Dashboard
// ──────────────────────────────────────────
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// ──────────────────────────────────────────
// Serve Frontend (Portfolio)
// ──────────────────────────────────────────
app.use(express.static(path.join(__dirname, '..')));

// Serve uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ──────────────────────────────────────────
// Health Check
// ──────────────────────────────────────────
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Portfolio Backend API is running!',
        timestamp: new Date().toISOString(),
        endpoints: {
            portfolio: '/api/portfolio',
            auth: '/api/auth/login',
            files: '/api/files',
            admin: '/admin'
        }
    });
});

// ──────────────────────────────────────────
// Start Server
// ──────────────────────────────────────────
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log('');
        console.log('╔══════════════════════════════════════════════╗');
        console.log('║   🚀 Dipendra Portfolio Backend Started!    ║');
        console.log('╠══════════════════════════════════════════════╣');
        console.log(`║   🌐 Portfolio:  http://localhost:${PORT}        ║`);
        console.log(`║   🔧 Admin:      http://localhost:${PORT}/admin  ║`);
        console.log(`║   📡 API:        http://localhost:${PORT}/api    ║`);
        console.log('╚══════════════════════════════════════════════╝');
        console.log('');
    });
};

startServer();
