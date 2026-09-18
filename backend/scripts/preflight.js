/**
 * Production Environment Preflight Check
 * 
 * Verifies that all required environment variables are configured before
 * restarting the production backend or proceeding with deployment.
 * 
 * NEVER prints or exposes secret values.
 */

const fs = require('fs');
const path = require('path');

// Target .env path (supports running from repo root or backend/)
let envPath = path.resolve(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
    envPath = path.resolve(process.cwd(), '.env');
}

console.log('\n=== Production Environment Preflight ===\n');

if (!fs.existsSync(envPath)) {
    console.error(`✗ Configuration file not found: ${envPath}`);
    console.error('\nDEPLOYMENT ABORTED.');
    console.error('Production backend was not restarted.');
    console.error('Create backend/.env before running deployment.\n');
    process.exit(1);
}

// Load env vars with override
require('dotenv').config({ path: envPath, override: true });

// Core production variables to verify
const variables = [
    { key: 'PORT', defaultFallback: '5000', required: false },
    { key: 'MONGO_URI', required: true },
    { key: 'JWT_SECRET', required: true },
    { key: 'RECAPTCHA_SECRET_KEY', required: true },
    { key: 'ALLOWED_ORIGINS', required: true }
];

let hasError = false;

variables.forEach(({ key, defaultFallback, required }) => {
    const val = process.env[key];
    if (val && val.trim().length > 0) {
        console.log(`✓ ${key}`);
    } else if (!required && defaultFallback) {
        // Fallback available but logged
        console.log(`✓ ${key} (default: ${defaultFallback})`);
    } else {
        console.error(`✗ ${key}`);
        hasError = true;
    }
});

console.log('');

if (hasError) {
    console.error('DEPLOYMENT ABORTED.');
    console.error('Production backend was not restarted.');
    console.error('Ensure all required environment variables are set in backend/.env.\n');
    process.exit(1);
} else {
    console.log('All required environment variables are present.');
    console.log('Deployment may proceed.\n');
    process.exit(0);
}

