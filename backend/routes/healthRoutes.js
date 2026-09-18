const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/**
 * Lightweight public health check endpoint.
 * Suitable for load balancers, deployment verification, and external uptime monitors.
 *
 * Exposes NO sensitive details, credentials, database connection strings, or system paths.
 */
router.get('/api/health', (req, res) => {
    // 1 = connected, 2 = connecting, 0 = disconnected, 3 = disconnecting
    const isDbConnected = mongoose.connection && mongoose.connection.readyState === 1;

    const payload = {
        status: isDbConnected ? 'ok' : 'degraded',
        database: isDbConnected ? 'connected' : 'disconnected',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
    };

    if (isDbConnected) {
        return res.status(200).json(payload);
    } else {
        return res.status(503).json(payload);
    }
});

module.exports = router;
