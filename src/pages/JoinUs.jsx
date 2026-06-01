import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { subPageTranslations } from '../translations/subPages';
import ReCAPTCHA from "react-google-recaptcha";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const JoinUs = () => {
    const { language } = useLanguage();
    const t = subPageTranslations[language];
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [purpose, setPurpose] = useState(searchParams.get('purpose') || 'Volunteer');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);

    // Redirect to dedicated partner page
    useEffect(() => {
        if (searchParams.get('purpose') === 'Partner') {
            navigate('/become-a-partner', { replace: true });
        }
    }, [searchParams, navigate]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: ''
    });

    useEffect(() => {
        const p = searchParams.get('purpose');
        if (p) setPurpose(p);
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaToken) {
            alert(language === 'hi' ? 'कृपया सत्यापित करें कि आप रोबोट नहीं हैं।' : 'Please verify that you are not a robot.');
            return;
        }
        setIsSubmitting(true);

        try {
            const payload = { ...formData, purpose, captchaToken };
            const res = await fetch(`${API_URL}/api/joinees`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const displayPurpose = purpose === 'Member' ? 'MOP Member' : purpose;
                const displayPurposeHi = purpose === 'Member' ? 'MOP सदस्य' : (purpose === 'Volunteer' ? 'स्वयंसेवक' : purpose);
                alert(language === 'hi' ? `${displayPurposeHi} बनने की इच्छा के लिए धन्यवाद! आपका अनुरोध जमा हो गया है। हम जल्द ही आपसे संपर्क करेंगे।` : `Thank you for wanting to become a ${displayPurpose}! Your request has been submitted. We will contact you soon.`);
                setFormData({ name: '', email: '', phone: '', address: '', message: '' });
            } else {
                let errMsg = 'Unknown error';
                try {
                    const errData = await res.json();
                    errMsg = errData.error || errMsg;
                } catch (e) {}
                alert('Submission failed: ' + errMsg);
            }
        } catch (err) {
            console.error('Join Us Error:', err);
            alert(language === 'hi' ? 'एक त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।' : 'An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-surface flex flex-col items-center pb-20 px-6">
            <div className="w-full max-w-3xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4 capitalize">
                        {language === 'hi'
                            ? (purpose === 'Member' ? 'MOP सदस्य बनें' : (purpose === 'Volunteer' ? 'स्वयंसेवक बनें' : `${purpose} बनें`))
                            : `Become a ${purpose === 'Member' ? 'MOP Member' : purpose}`}
                    </h1>
                    <p className="text-on-surface-variant max-w-xl mx-auto">
                        {language === 'hi' ? 'हमारे मिशन में शामिल होने के लिए नीचे दिया गया फॉर्म भरें। अपना विवरण प्रदान करें और हमारी टीम आपकी स्थिति को अंतिम रूप देने के लिए आपसे संपर्क करेगी।' : 'Fill out the form below to join our mission. Provide your details and our team will get back to you to finalize your status.'}
                    </p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-outline-variant/30">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t.fullName}</label>
                                <input 
                                    type="text" required 
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t.emailAddress}</label>
                                <input 
                                    type="email" required 
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{t.phoneNumber}</label>
                                <input 
                                    type="tel" required 
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'hi' ? 'वर्तमान पता' : 'Current Address'}</label>
                                <input 
                                    type="text" required 
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                    placeholder="City, State, Country"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'hi' ? 'आप क्यों जुड़ना चाहते हैं? (वैकल्पिक)' : 'Why do you want to join? (Optional)'}</label>
                            <textarea 
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none placeholder-gray-400" 
                                rows="4"
                                placeholder={language === 'hi' ? `हमें बताएं कि आप ${purpose === 'Member' ? 'MOP सदस्य' : (purpose === 'Volunteer' ? 'स्वयंसेवक' : purpose)} बनने के लिए क्यों प्रेरित हैं...` : `Tell us a little about your motivation to become a ${purpose === 'Member' ? 'MOP member' : purpose.toLowerCase()}...`}
                            ></textarea>
                        </div>

                        {/* CAPTCHA */}
                        <div className="flex justify-center pt-2">
                            <ReCAPTCHA
                                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                onChange={(token) => setCaptchaToken(token)}
                            />
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full md:w-auto px-10 py-4 bg-primary hover:bg-primary-hover text-white font-headline font-bold rounded-2xl shadow-md cursor-pointer transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? t.submitting : t.submitRequest}
                                {!isSubmitting && <span className="material-symbols-outlined text-[20px]">send</span>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;
