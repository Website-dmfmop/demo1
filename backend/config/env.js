require('dotenv').config();

const validateEnv = () => {
    if (!process.env.JWT_SECRET) {
        console.error('FATAL ERROR: JWT_SECRET environment variable is not set.');
        process.exit(1);
    }
    if (!process.env.RECAPTCHA_SECRET_KEY) {
        console.error('FATAL ERROR: RECAPTCHA_SECRET_KEY environment variable is not set.');
        process.exit(1);
    }
    if (!process.env.MONGO_URI) {
        console.error('FATAL ERROR: MONGO_URI environment variable is not set.');
        process.exit(1);
    }
    
    // ALLOWED_ORIGINS is optional (falls back to local), but we can log its absence securely if we want
    if (!process.env.ALLOWED_ORIGINS) {
        // console.warn('Warning: ALLOWED_ORIGINS not set. Defaulting to http://localhost:5173');
    }
};

module.exports = { validateEnv };
