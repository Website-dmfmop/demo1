require('dotenv').config({ override: true });

/**
 * Validates required backend environment variables before startup.
 * Intentionally halts application startup with a clear error message if any
 * critical configuration is missing, preventing insecure or broken operation.
 */
const validateEnv = () => {
    const missing = [];

    if (!process.env.MONGO_URI || process.env.MONGO_URI.trim() === '') {
        missing.push({
            name: 'MONGO_URI',
            desc: 'Database connection URI (e.g., MongoDB Atlas connection string)',
            action: 'Configure MONGO_URI in backend/.env with your production database credentials.'
        });
    }

    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
        missing.push({
            name: 'JWT_SECRET',
            desc: 'Cryptographic secret key for signing admin authentication tokens',
            action: 'Generate a 256-bit key (e.g. openssl rand -hex 32) and set JWT_SECRET in backend/.env.'
        });
    }

    if (!process.env.RECAPTCHA_SECRET_KEY || process.env.RECAPTCHA_SECRET_KEY.trim() === '') {
        missing.push({
            name: 'RECAPTCHA_SECRET_KEY',
            desc: 'Google reCAPTCHA secret key for verifying form submissions',
            action: 'Configure RECAPTCHA_SECRET_KEY in backend/.env from Google reCAPTCHA console.'
        });
    }

    if (missing.length > 0) {
        console.error('\n======================================================================');
        console.error(' [FATAL] BACKEND STARTUP ABORTED: Missing Required Configuration');
        console.error('======================================================================');
        console.error('The application was intentionally prevented from starting because the');
        console.error('following required environment variable(s) are not configured in');
        console.error('your backend environment file (backend/.env):\n');

        missing.forEach((item, index) => {
            console.error(`  ${index + 1}. ${item.name}`);
            console.error(`     Purpose: ${item.desc}`);
            console.error(`     Action:  ${item.action}\n`);
        });

        console.error('Reference template: backend/.env.example');
        console.error('======================================================================\n');
        process.exit(1);
    }

    // Non-fatal production warnings
    if (!process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGINS.trim() === '') {
        console.warn('\n[WARN] ALLOWED_ORIGINS is not set in backend/.env.');
        console.warn('Defaulting to http://localhost:5173. Cross-origin browser requests');
        console.warn('from production domains (https://dmfmop.org) will be blocked by CORS.\n');
    }
};

module.exports = { validateEnv };
