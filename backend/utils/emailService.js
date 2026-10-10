const nodemailer = require('nodemailer');

// Ensure transporter is configured with environment variables
const getTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

const sendOTP = async (toEmail, otp) => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('SMTP credentials not configured. OTP email not sent. Check backend/.env');
        throw new Error('Email service not configured. Please contact the administrator.');
    }

    const transporter = getTransporter();

    const mailOptions = {
        from: `"DMF Workspace" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: 'Your DMF Workspace Verification Code',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px;">
                <h2 style="color: #333;">Workspace Authentication</h2>
                <p>You recently attempted to sign in to the DMF Workspace. Please use the verification code below to complete your sign in:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #1a73e8; background: #f0f4f8; padding: 15px 30px; border-radius: 8px;">${otp}</span>
                </div>
                <p style="color: #666; font-size: 14px;">This code will expire in 5 minutes. If you did not request this code, please ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                <p style="color: #999; font-size: 12px; text-align: center;">DMF Workspace Security</p>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = { sendOTP };
