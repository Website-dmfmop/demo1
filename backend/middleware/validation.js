const mongoose = require('mongoose');

const validateObjectId = (req, res, next, id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }
    next();
};

const verifyCaptcha = async (req, res, next) => {
    let secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey && process.env.NODE_ENV !== 'production') {
        console.warn('Skipping CAPTCHA verification in development (missing RECAPTCHA_SECRET_KEY)');
        return next();
    }

    const { captchaToken } = req.body;
    if (!captchaToken) {
        return res.status(400).json({ error: 'CAPTCHA verification failed: missing token' });
    }

    try {
        let response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${secretKey}&response=${encodeURIComponent(captchaToken)}`
        });
        let data = await response.json();

        if (!data.success) {
            return res.status(400).json({ error: 'CAPTCHA verification failed: invalid token' });
        }
        next();
    } catch (err) {
        console.error('CAPTCHA verification error:', err);
        res.status(500).json({ error: 'CAPTCHA verification process failed' });
    }
};

module.exports = { validateObjectId, verifyCaptcha };
