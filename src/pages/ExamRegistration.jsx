import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';

const inputClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/20 outline-none transition-all text-gray-800 bg-white";
const errorClasses = "text-red-500 text-xs mt-1 absolute -bottom-5 left-1";
const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

const ExamRegistrationForm = ({ onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        fullName: '', email: '', mobileNumber: '', highestQualification: '',
        yearOfPassing: '', targetStream: [], currentCity: '', preferredMedium: '', intent: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const streams = ['UPSC', 'MPSC', 'Banking', 'SSC', 'Other'];

    const handleStreamToggle = (stream) => {
        setFormData(prev => {
            const currentStreams = prev.targetStream;
            if (currentStreams.includes(stream)) {
                return { ...prev, targetStream: currentStreams.filter(s => s !== stream) };
            } else {
                return { ...prev, targetStream: [...currentStreams, stream] };
            }
        });
        if (errors.targetStream) setErrors(prev => ({ ...prev, targetStream: null }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email Address is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email Address is required';
        if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile Number is required';
        if (!formData.highestQualification) newErrors.highestQualification = 'Highest Qualification is required';
        if (!formData.yearOfPassing) newErrors.yearOfPassing = 'Year of Passing is required';
        if (formData.targetStream.length === 0) newErrors.targetStream = 'Select at least one Target Stream';
        if (!formData.currentCity.trim()) newErrors.currentCity = 'Current City/Location is required';
        if (!formData.preferredMedium) newErrors.preferredMedium = 'Preferred Medium is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                const payload = { ...formData };
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const response = await fetch(`${API_URL}/api/competitive-exam-admissions`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (response.ok) {
                    setIsSubmitting(false);
                    onSubmitSuccess();
                } else {
                    console.error("Failed to submit form");
                    setIsSubmitting(false);
                }
            } catch (err) {
                console.error("Error submitting form", err);
                setIsSubmitting(false);
            }
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="w-full max-w-3xl mx-auto bg-[#F8F9FA] rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 relative mb-12 mt-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-manrope font-bold text-[#000080] mb-2">Registration Form</h2>
                <p className="text-gray-600 font-inter">Join our comprehensive foundation program.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    <div className="relative">
                        <label className={labelClasses}>Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`${inputClasses} ${errors.fullName ? 'border-red-500' : ''}`} placeholder="John Doe" />
                        {errors.fullName && <span className={errorClasses}>{errors.fullName}</span>}
                    </div>
                    <div className="relative">
                        <label className={labelClasses}>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`} placeholder="john@example.com" />
                        {errors.email && <span className={errorClasses}>{errors.email}</span>}
                    </div>
                    <div className="relative">
                        <label className={labelClasses}>Mobile Number</label>
                        <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className={`${inputClasses} ${errors.mobileNumber ? 'border-red-500' : ''}`} placeholder="+91 98765 43210" />
                        {errors.mobileNumber && <span className={errorClasses}>{errors.mobileNumber}</span>}
                    </div>
                </div>
                <hr className="border-gray-200" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                        <label className={labelClasses}>Highest Qualification</label>
                        <select name="highestQualification" value={formData.highestQualification} onChange={handleChange} className={`${inputClasses} ${errors.highestQualification ? 'border-red-500' : ''}`}>
                            <option value="">Select Qualification</option>
                            <option value="High School">High School</option>
                            <option value="Undergrad">Undergrad</option>
                            <option value="Postgrad">Postgrad</option>
                        </select>
                        {errors.highestQualification && <span className={errorClasses}>{errors.highestQualification}</span>}
                    </div>
                    <div className="relative">
                        <label className={labelClasses}>Year of Passing</label>
                        <input type="number" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} className={`${inputClasses} ${errors.yearOfPassing ? 'border-red-500' : ''}`} placeholder="YYYY" min="1990" max="2030" />
                        {errors.yearOfPassing && <span className={errorClasses}>{errors.yearOfPassing}</span>}
                    </div>
                </div>
                <hr className="border-gray-200" />
                <div className="relative pb-4">
                    <label className={labelClasses}>Target Exam Stream</label>
                    <div className="flex flex-wrap gap-3">
                        {streams.map(stream => (
                            <button key={stream} type="button" onClick={() => handleStreamToggle(stream)} className={`px-5 py-2 rounded-full font-medium transition-colors text-sm border ${formData.targetStream.includes(stream) ? 'bg-[#FF9933] text-white border-[#FF9933] shadow-md shadow-orange-500/20' : 'bg-white text-gray-600 border-gray-300 hover:border-[#FF9933]'}`}>{stream}</button>
                        ))}
                    </div>
                    {errors.targetStream && <span className={errorClasses}>{errors.targetStream}</span>}
                </div>
                <hr className="border-gray-200" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                        <label className={labelClasses}>Current City/Location</label>
                        <input type="text" name="currentCity" value={formData.currentCity} onChange={handleChange} className={`${inputClasses} ${errors.currentCity ? 'border-red-500' : ''}`} placeholder="e.g., Pune" />
                        {errors.currentCity && <span className={errorClasses}>{errors.currentCity}</span>}
                    </div>
                    <div className="relative">
                        <label className={labelClasses}>Preferred Medium of Study</label>
                        <select name="preferredMedium" value={formData.preferredMedium} onChange={handleChange} className={`${inputClasses} ${errors.preferredMedium ? 'border-red-500' : ''}`}>
                            <option value="">Select Medium</option>
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Marathi">Marathi</option>
                        </select>
                        {errors.preferredMedium && <span className={errorClasses}>{errors.preferredMedium}</span>}
                    </div>
                </div>
                <hr className="border-gray-200" />
                <div className="relative">
                    <label className={labelClasses}>Why do you want to join this foundation's program? <span className="text-gray-400 font-normal text-xs">(Optional)</span></label>
                    <textarea name="intent" value={formData.intent} onChange={handleChange} rows={4} className={inputClasses} placeholder="Tell us about your goals..."></textarea>
                </div>
                <div className="pt-4">
                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#000080] hover:bg-blue-900 text-white font-bold py-4 px-8 rounded-lg shadow-xl shadow-blue-900/30 transition-all flex justify-center items-center gap-2 text-lg">
                        {isSubmitting ? <><Loader2 className="animate-spin" size={24} /> Submitting...</> : 'Submit Registration'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

const RegistrationSuccess = () => {
    const navigate = useNavigate();
    return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, type: 'spring' }} className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-10 text-center border border-gray-100 mt-16">
            <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} className="w-24 h-24 rounded-full bg-green-50 text-[#138808] mx-auto flex items-center justify-center mb-6 relative">
                <motion.svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#138808]">
                    <motion.path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} />
                    <motion.path d="M22 4L12 14.01l-3-3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }} />
                </motion.svg>
            </motion.div>
            <h2 className="text-3xl font-manrope font-bold text-[#000080] mb-4">Registration Successful</h2>
            <p className="text-gray-600 font-inter mb-8 text-lg">Thank you for applying. A counselor will reach out to your provided mobile number shortly with further details.</p>
            <button onClick={() => navigate('/')} className="bg-[#F8F9FA] hover:bg-gray-200 text-[#000080] font-bold py-3 px-8 rounded-lg transition-colors border border-gray-200 w-full">Return to Home</button>
        </motion.div>
    );
};

const ExamRegistration = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#000080]/10 to-transparent -z-10" />
            <div className="max-w-7xl mx-auto mb-6 relative z-10">
                <button onClick={() => navigate('/competitive-exams-hub')} className="flex items-center gap-2 text-[#000080] font-semibold hover:text-blue-700 transition-colors bg-white px-4 py-2 rounded-full shadow-sm w-fit border border-gray-200">
                    <ArrowLeft size={18} /> Back to Exams
                </button>
            </div>
            <AnimatePresence mode="wait">
                {!isSuccess ? <ExamRegistrationForm key="form" onSubmitSuccess={() => setIsSuccess(true)} /> : <RegistrationSuccess key="success" />}
            </AnimatePresence>
        </div>
    );
};

export default ExamRegistration;
