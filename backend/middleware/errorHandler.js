const errorHandler = (err, req, res, next) => {
    // Determine status code
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    
    // Secure logging: exclude sensitive fields from req.body
    const sanitizedBody = { ...req.body };
    const sensitiveFields = ['password', 'token', 'captchaToken', 'secret', 'JWT_SECRET', 'RECAPTCHA_SECRET_KEY'];
    sensitiveFields.forEach(field => {
        if (sanitizedBody[field]) sanitizedBody[field] = '[REDACTED]';
    });

    console.error(`[Error] ${req.method} ${req.url}`);
    console.error(`Status: ${statusCode}`);
    console.error(`Message: ${err.message || err}`);
    if (Object.keys(sanitizedBody).length > 0) {
        console.error(`Body: ${JSON.stringify(sanitizedBody)}`);
    }

    res.status(statusCode).json({
        error: statusCode === 500 ? 'Internal Server Error' : (err.message || 'Error occurred')
    });
};

module.exports = errorHandler;
