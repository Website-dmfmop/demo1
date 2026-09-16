const cors = require('cors');

const getAllowedOrigins = () => {
    return process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:5173'];
};

const expressCors = cors({
    origin: function (origin, callback) {
        const allowedOrigins = getAllowedOrigins();
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
});

module.exports = { expressCors, getAllowedOrigins };
