import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import pool, { initializeDatabase } from './db.js';
import gamesRouter from './routes/games.js';
import { swaggerSpec } from './swagger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Eneba Game Search API'
}));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/', gamesRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Initialize database and start server
// Initialize database and start server
async function startServer() {
    if (process.env.VERCEL) {
        console.log('⚡ Vercel environment detected - skipping manual port bind');
        return;
    }

    // Start server immediately to satisfy Render's port binding requirement
    const server = app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🔗 Health check: http://localhost:${PORT}/health`);
        console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    });

    // Attempt database connection in background
    try {
        console.log('Attempting to connect to database...');
        await initializeDatabase();
        console.log('✅ Database initialization successful');
    } catch (error) {
        console.error('⚠️ Database initialization failed:', error.message);
    }
}

// Handle graceful shutdown
if (!process.env.VERCEL) {
    process.on('SIGTERM', async () => {
        console.log('SIGTERM received, closing server...');
        // await pool.end(); // Pool removed in client mode
        process.exit(0);
    });
}

// Only start server if run directly (node index.js)
if (import.meta.url === `file://${process.argv[1]}`) {
    startServer();
}

export default app;
