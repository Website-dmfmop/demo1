import React, { useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const SafeReCAPTCHA = ({ sitekey, onChange, ...props }) => {
    const activeSiteKey = sitekey || import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    const isDev = import.meta.env.DEV;

    if (!activeSiteKey) {
        if (isDev) {
            // In development, automatically trigger onChange with a dummy token so frontend form validation passes
            useEffect(() => {
                if (onChange) {
                    onChange('dummy-dev-token');
                }
            }, [onChange]);

            return (
                <div className="p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-200 text-center my-2">
                    reCAPTCHA disabled (missing VITE_RECAPTCHA_SITE_KEY in .env)
                </div>
            );
        } else {
            // In production, render it without a sitekey to trigger the same error it used to,
            // or render a warning but still fail, preserving the security requirement.
            return <ReCAPTCHA sitekey={activeSiteKey} onChange={onChange} {...props} />;
        }
    }

    return <ReCAPTCHA sitekey={activeSiteKey} onChange={onChange} {...props} />;
};

export default SafeReCAPTCHA;
