import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { commonTranslations } from '../translations/common';
import ReCAPTCHA from "react-google-recaptcha";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const DmfMemberForm = () => {
    const { language } = useLanguage();
    const t = commonTranslations[language] || commonTranslations['en'];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        occupation: '',
        message: '',
        screenshotUrl: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaToken) {
            alert(language === 'hi' ? 'कृपया सत्यापित करें कि आप रोबोट नहीं हैं।' : 'Please verify that you are not a robot.');
            return;
        }
        if (!formData.screenshotUrl) {
            alert(language === 'hi' ? 'कृपया भुगतान का स्क्रीनशॉट अपलोड करें।' : 'Please upload the payment screenshot.');
            return;
        }
        setIsSubmitting(true);

        try {
            const payload = new FormData();
            payload.append('name', formData.name);
            payload.append('email', formData.email);
            payload.append('phone', formData.phone);
            payload.append('address', formData.address);
            payload.append('city', formData.city);
            payload.append('state', formData.state);
            payload.append('country', formData.country);
            payload.append('occupation', formData.occupation);
            payload.append('message', formData.message);
            payload.append('screenshotUrl', formData.screenshotUrl);
            payload.append('captchaToken', captchaToken);

            const res = await fetch(`${API_URL}/api/dmf-members`, {
                method: 'POST',
                body: payload
            });

            if (res.ok) {
                alert(language === 'hi' ? 'DMF सदस्य बनने की इच्छा के लिए धन्यवाद! आपका अनुरोध जमा हो गया है।' : 'Thank you for wanting to become a DMF Member! Your request has been submitted.');
                setFormData({ name: '', email: '', phone: '', address: '', city: '', state: '', country: '', occupation: '', message: '', screenshotUrl: null });
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
                        {language === 'hi' ? 'DMF सदस्य बनें' : 'Become a DMF Member'}
                    </h1>
                    <p className="text-on-surface-variant max-w-xl mx-auto">
                        {language === 'hi' ? 'DMF सदस्य बनने के लिए नीचे दिया गया फॉर्म भरें और अपना भुगतान विवरण अपलोड करें।' : 'Fill out the form below and upload your payment details to become a DMF Member.'}
                    </p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-outline-variant/30">
                    <div className="w-full">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'hi' ? 'पूरा नाम' : 'Full Name'}</label>
                                    <input 
                                        type="text" required 
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'hi' ? 'ईमेल पता' : 'Email Address'}</label>
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
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'hi' ? 'फोन नंबर' : 'Phone Number'}</label>
                                    <input 
                                        type="tel" required 
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'hi' ? 'व्यवसाय' : 'Occupation'}</label>
                                    <input 
                                        type="text" required 
                                        value={formData.occupation}
                                        onChange={e => setFormData({ ...formData, occupation: e.target.value })}
                                        className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                        placeholder="Engineer, Teacher, etc."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'hi' ? 'वर्तमान पता' : 'Current Address'}</label>
                                    <input 
                                        type="text" required 
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                        className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                        placeholder="Street Address"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'hi' ? 'शहर' : 'City'}</label>
                                    <input 
                                        type="text" required 
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'hi' ? 'राज्य' : 'State'}</label>
                                    <input 
                                        type="text" required 
                                        value={formData.state}
                                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                                        className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                        placeholder="State"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'hi' ? 'देश' : 'Country'}</label>
                                    <input 
                                        type="text" required 
                                        value={formData.country}
                                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                                        className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                        placeholder="Country"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'hi' ? 'आप क्यों जुड़ना चाहते हैं? (वैकल्पिक)' : 'Why do you want to join? (Optional)'}</label>
                                <textarea 
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none placeholder-gray-400" 
                                    rows="3"
                                    placeholder={language === 'hi' ? 'हमें बताएं कि आप DMF सदस्य बनने के लिए क्यों प्रेरित हैं...' : 'Tell us a little about your motivation to become a DMF member...'}
                                ></textarea>
                            </div>

                            {/* Payment Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-t border-b border-gray-100 my-6">
                                <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl shadow-sm">
                                    <h3 className="text-xl font-bold text-primary mb-2">Payment Details</h3>
                                    <div className="space-y-2 text-gray-700">
                                        <div className="flex justify-between border-b border-orange-200 pb-2">
                                            <span>Membership Fee</span>
                                            <span className="font-semibold">₹100</span>
                                        </div>
                                        <div className="flex justify-between border-b border-orange-200 pb-2">
                                            <span>Donation</span>
                                            <span className="font-semibold">₹900</span>
                                        </div>
                                        <div className="flex justify-between pt-2 text-lg">
                                            <span className="font-bold text-gray-900">Total</span>
                                            <span className="font-bold text-primary">₹1000</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">account_balance</span>
                                        Bank Information
                                    </h3>
                                    <div className="space-y-3 text-sm text-gray-700">
                                        <p className="font-bold text-gray-900 mb-1">DMFs International Centre of Excellence, Khadki, Pune</p>
                                        <div>
                                            <span className="block text-xs text-gray-500 uppercase tracking-wider">Account Name</span>
                                            <span className="font-semibold">Dr. Dnyaneshwar Mule Foundation</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 uppercase tracking-wider">Bank Name</span>
                                            <span className="font-semibold">Bank Of Maharashtra</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 uppercase tracking-wider">Branch</span>
                                            <span className="font-semibold">Khadki Bazar, Pune - 411003</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 uppercase tracking-wider">Account No</span>
                                            <span className="font-bold text-lg text-primary tracking-wider">60551831984</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 uppercase tracking-wider">IFSC CODE</span>
                                            <span className="font-bold text-md text-gray-900">MAHB0000007</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs text-gray-500 uppercase tracking-wider">Account Type</span>
                                            <span className="font-semibold">Current</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                                <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'hi' ? 'भुगतान स्क्रीनशॉट अपलोड करें' : 'Upload Payment Screenshot'} *</label>
                                <input 
                                    type="file" required accept="image/*"
                                    onChange={e => setFormData({ ...formData, screenshotUrl: e.target.files[0] })}
                                    className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-gray-600"
                                />
                                <p className="text-xs text-gray-500 mt-2">Accepted formats: .jpg, .png, .jpeg</p>
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
                                    className="w-full px-10 py-4 bg-primary hover:bg-primary-hover text-white font-headline font-bold rounded-2xl shadow-md cursor-pointer transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (language === 'hi' ? 'सबमिट किया जा रहा है...' : 'Submitting...') : (language === 'hi' ? 'अनुरोध जमा करें' : 'Submit Request')}
                                    {!isSubmitting && <span className="material-symbols-outlined text-[20px]">send</span>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DmfMemberForm;
