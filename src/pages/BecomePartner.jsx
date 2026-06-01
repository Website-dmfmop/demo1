import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { subPageTranslations } from '../translations/subPages';
import ReCAPTCHA from "react-google-recaptcha";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const PARTNERSHIP_TYPES = [
    'Strategic Partnership',
    'Funding / CSR Partnership',
    'Technical / Knowledge Partnership',
    'Implementing Partner',
    'Academic / Research Partner',
    'Media & Communications Partner',
    'Other',
];

const initialForm = {
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    country: '',
    projectTitle: '',
    projectDescription: '',
    leadAssessment: '',
    proposedSolution: '',
    purposeOfPartnership: '',
    partnershipType: '',
};

export default function BecomePartner() {
    const { language } = useLanguage();
    const t = subPageTranslations[language];
    const [form, setForm] = useState(initialForm);
    const [pdfFile, setPdfFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [captchaToken, setCaptchaToken] = useState(null);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaToken) {
            setError(language === 'hi' ? 'कृपया सत्यापित करें कि आप रोबोट नहीं हैं।' : 'Please verify that you are not a robot.');
            return;
        }
        setSubmitting(true);
        setError('');
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, val]) => formData.append(key, val));
            if (pdfFile) formData.append('pdfFile', pdfFile);
            formData.append('captchaToken', captchaToken);

            const res = await fetch(`${API_URL}/api/partner-requests`, {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                setSubmitted(true);
                setForm(initialForm);
                setPdfFile(null);
            } else {
                const data = await res.json();
                setError(data.error || 'Submission failed: ' + JSON.stringify(data));
            }
        } catch (err) {
            setError('Network error. Please check your connection and try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface">
            {/* ── Hero ── */}
            <section className="bg-primary mt-[88px] py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 md:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Left: Text */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-1 bg-secondary-container shrink-0"></div>
                                <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">{language === 'hi' ? 'DMF साझेदारी' : 'DMF Partnerships'}</p>
                            </div>
                            <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                <span className="block mb-2">{language === 'hi' ? 'भागीदार' : 'BECOME'}</span>
                                <span className="block mb-2">{language === 'hi' ? 'बनें' : 'A PARTNER'}</span>
                                <span className="block text-secondary-container mb-2">{language === 'hi' ? 'बदलाव' : 'DRIVE'}</span>
                                <span className="block text-secondary-container">{language === 'hi' ? 'लाएँ।' : 'CHANGE.'}</span>
                            </h1>
                            <p className="mt-8 text-white/70 text-base md:text-lg leading-relaxed max-w-md">
                                {language === 'hi' ? 'स्थायी प्रभाव बनाने में डॉ. ज्ञानेश्वर मुलय फाउंडेशन के साथ जुड़ें। साथ मिलकर, हम आगे बढ़ सकते हैं, तेजी से नवाचार कर सकते हैं और अधिक जीवन बदल सकते हैं।' : 'Join the Dr. Dnyaneshwar Mulay Foundation in building lasting impact. Together, we can reach farther, innovate faster, and transform more lives.'}
                            </p>
                        </div>
                        {/* Right: Image */}
                        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                            <img
                                alt="Become a Partner"
                                className="w-full h-full object-cover"
                                src="/Images/partenship_image.jpg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Why Partner ── */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-16">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold tracking-widest uppercase text-secondary-container">{language === 'hi' ? 'क्यों सहयोग करें' : 'Why Collaborate'}</span>
                        <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-primary mt-2">{language === 'hi' ? 'साझेदारी के लाभ' : 'Partnership Benefits'}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: 'hub', title: language === 'hi' ? 'साझा नेटवर्क' : 'Shared Networks', desc: language === 'hi' ? 'भारत और विश्व भर में DMF के संस्थानों, सरकारी निकायों और सामुदायिक नेताओं के विस्तृत नेटवर्क तक पहुँच प्राप्त करें।' : 'Access DMF\'s wide network of institutions, government bodies, and community leaders across India and globally.' },
                            { icon: 'trending_up', title: language === 'hi' ? 'प्रभाव का विस्तार' : 'Amplified Impact', desc: language === 'hi' ? 'सिद्ध कार्यप्रणालियों के साथ मापनीय समाधान सह-निर्माण करें जो जमीनी स्तर पर मापने योग्य परिवर्तन लाएं।' : 'Co-create scalable solutions with proven methodologies that deliver measurable change at the grassroots level.' },
                            { icon: 'workspace_premium', title: language === 'hi' ? 'ब्रांड दृश्यता' : 'Brand Visibility', desc: language === 'hi' ? 'एक मूल्यवान प्रभाव भागीदार के रूप में DMF के मंचों, कार्यक्रमों, रिपोर्टों और मीडिया कवरेज में प्रदर्शित हों।' : 'Be featured across DMF\'s platforms, events, reports and media coverage as a valued impact partner.' },
                            { icon: 'groups', title: language === 'hi' ? 'सामुदायिक पहुँच' : 'Community Access', desc: language === 'hi' ? 'शिक्षा, कौशल और सामाजिक कल्याण में संरचित कार्यक्रमों के माध्यम से लाभार्थी समुदायों से सीधे जुड़ें।' : 'Engage directly with beneficiary communities through structured programs in education, skilling, and social welfare.' },
                            { icon: 'science', title: language === 'hi' ? 'अनुसंधान और नवाचार' : 'Research & Innovation', desc: language === 'hi' ? 'हमारी विशेषज्ञ टीम के साथ ज्ञान उत्पादों, शोध पत्रों और नीतिगत सिफारिशों पर सहयोग करें।' : 'Collaborate on knowledge products, research papers, and policy recommendations with our expert team.' },
                            { icon: 'handshake', title: language === 'hi' ? 'सह-ब्रांडिंग' : 'Co-branding', desc: language === 'hi' ? 'संयुक्त प्रकाशनों, कार्यक्रमों और अभियान सह-ब्रांडिंग अवसरों के माध्यम से अपने ब्रांड को विश्वसनीय सामाजिक प्रभाव के साथ जोड़ें।' : 'Align your brand with credible social impact through joint publications, events, and campaign co-branding opportunities.' },
                        ].map((item, i) => (
                            <div key={i} className="bg-surface-container-low rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all">
                                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                </div>
                                <h3 className="font-headline font-bold text-lg text-primary mb-2">{item.title}</h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Form ── */}
            <section className="py-20 bg-surface-container-low">
                <div className="max-w-4xl mx-auto px-6 md:px-8">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold tracking-widest uppercase text-secondary-container">{language === 'hi' ? 'शुरू करें' : 'Get Started'}</span>
                        <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-primary mt-2">{language === 'hi' ? 'साझेदारी अनुरोध फॉर्म' : 'Partnership Request Form'}</h2>
                        <p className="mt-3 text-on-surface-variant max-w-2xl mx-auto">
                            {language === 'hi' ? 'नीचे दिए गए फॉर्म को भरें और हमारी साझेदारी टीम 5 कार्य दिवसों के भीतर आपके प्रस्ताव की समीक्षा करके आपसे संपर्क करेगी।' : 'Fill in the form below and our partnerships team will review your proposal and get back to you within 5 business days.'}
                        </p>
                    </div>

                    {submitted ? (
                        <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-green-100">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="material-symbols-outlined text-4xl">check_circle</span>
                            </div>
                            <h3 className="font-headline font-bold text-2xl text-primary mb-3">{language === 'hi' ? 'अनुरोध सफलतापूर्वक जमा!' : 'Request Submitted!'}</h3>
                            <p className="text-on-surface-variant max-w-md mx-auto mb-8">
                                {language === 'hi' ? 'DMF के साथ साझेदारी में आपकी रुचि के लिए धन्यवाद। हमारी टीम 5 कार्य दिवसों के भीतर आपके प्रस्ताव की समीक्षा करके संपर्क करेगी।' : 'Thank you for your interest in partnering with DMF. Our team will review your proposal and reach out within 5 business days.'}
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all"
                            >
                                {language === 'hi' ? 'एक और अनुरोध जमा करें' : 'Submit Another Request'}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 space-y-10">

                            {/* Section 1: Organization Details */}
                            <div>
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-xl">business</span>
                                    </div>
                                    <h3 className="font-headline font-bold text-xl text-primary">{language === 'hi' ? 'संगठन विवरण' : 'Organization Details'}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Organization / Company Name *</label>
                                        <input required name="organizationName" value={form.organizationName} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="Your organization name" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Contact Person Name *</label>
                                        <input required name="contactName" value={form.contactName} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="Full name" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address *</label>
                                        <input required type="email" name="email" value={form.email} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="your@email.com" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Phone Number *</label>
                                        <input required name="phone" value={form.phone} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="+91 98765 43210" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Website (optional)</label>
                                        <input name="website" value={form.website} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="https://yourwebsite.com" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Country *</label>
                                        <input required name="country" value={form.country} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="Country of operation" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Project Details */}
                            <div>
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="w-10 h-10 rounded-xl bg-secondary-container/20 text-secondary-container flex items-center justify-center">
                                        <span className="material-symbols-outlined text-xl">article</span>
                                    </div>
                                    <h3 className="font-headline font-bold text-xl text-primary">{language === 'hi' ? 'अपनी परियोजना के बारे में बताएं' : 'Tell Us About Your Project'}</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Project Title *</label>
                                        <input required name="projectTitle" value={form.projectTitle} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="Give your project a clear, concise title" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Project Description *</label>
                                        <textarea required name="projectDescription" value={form.projectDescription} onChange={handleChange} rows={4}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                            placeholder="Describe your project — its goals, target beneficiaries, geographic scope, and timeline..." />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Assessment & Solution */}
                            <div>
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-xl">troubleshoot</span>
                                    </div>
                                    <h3 className="font-headline font-bold text-xl text-primary">{language === 'hi' ? 'मूल्यांकन और समाधान' : 'Assessment & Solution'}</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Lead Assessment *</label>
                                        <p className="text-xs text-gray-400 mb-2">What problem or gap have you identified? What is the current situation that needs to be addressed?</p>
                                        <textarea required name="leadAssessment" value={form.leadAssessment} onChange={handleChange} rows={4}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                            placeholder="Describe the problem, challenge, or opportunity your project addresses..." />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Proposed Solution *</label>
                                        <p className="text-xs text-gray-400 mb-2">How do you plan to solve this? What is your approach and methodology?</p>
                                        <textarea required name="proposedSolution" value={form.proposedSolution} onChange={handleChange} rows={4}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                            placeholder="Describe your proposed solution, approach, tools, and expected outcomes..." />
                                    </div>
                                </div>
                            </div>

                            {/* Section 4: Partnership Purpose */}
                            <div>
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-xl">handshake</span>
                                    </div>
                                    <h3 className="font-headline font-bold text-xl text-primary">{language === 'hi' ? 'साझेदारी का उद्देश्य' : 'Purpose of Partnership'}</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Type of Partnership *</label>
                                        <select required name="partnershipType" value={form.partnershipType} onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                                            <option value="">Select partnership type...</option>
                                            {PARTNERSHIP_TYPES.map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Purpose of Partnership *</label>
                                        <p className="text-xs text-gray-400 mb-2">Why are you seeking to partner with DMF specifically? What do you hope to achieve together?</p>
                                        <textarea required name="purposeOfPartnership" value={form.purposeOfPartnership} onChange={handleChange} rows={4}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                            placeholder="Explain why you wish to partner with DMF, what resources or capabilities each party brings, and the mutual benefit expected..." />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Supporting Document / Proposal (PDF)</label>
                                        <p className="text-xs text-gray-400 mb-2">Upload any relevant concept note, organizational profile, or detailed proposal.</p>
                                        <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files[0])}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl flex items-center gap-3">
                                    <span className="material-symbols-outlined">error</span>
                                    <p className="font-medium text-sm">{error}</p>
                                </div>
                            )}

                            {/* CAPTCHA */}
                            <div className="flex justify-center">
                                <ReCAPTCHA
                                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                    onChange={(token) => setCaptchaToken(token)}
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-4 bg-primary text-white font-headline font-bold text-lg rounded-2xl shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            {language === 'hi' ? 'जमा हो रहा है...' : 'Submitting...'}
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined">send</span>
                                            {language === 'hi' ? 'साझेदारी अनुरोध जमा करें' : 'Submit Partnership Request'}
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4">
                                    {language === 'hi' ? 'जमा करके, आप सहमत हैं कि DMF आपके साझेदारी प्रस्ताव के संबंध में आपसे संपर्क कर सकता है।' : 'By submitting, you agree that DMF may contact you regarding your partnership proposal.'}
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
}
