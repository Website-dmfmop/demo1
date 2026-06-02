import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '../../ui/ProgressBar';
import Button from '../../ui/Button';

const THEME_COLOR = '#000080';

const CorporateOnboarding = () => {
    const [step, setStep] = useState(0);
    const steps = ['Company Details', 'CSR Strategy', 'Contact Info'];
    const [formData, setFormData] = useState({
        companyName: '',
        budgetRange: '',
        focusSectors: [],
        geographies: '',
        contactName: '',
        contactEmail: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (step < steps.length - 1) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            status: "pending_approval",
            type: "funder"
        };
        console.log("Submitting Corporate Onboarding Payload:", payload);
        alert("Application submitted! Pending approval.");
    };

    const inputClasses = "w-full p-3 border border-gray-200 rounded-xl focus:outline-none transition-shadow bg-gray-50 mb-4";

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl shadow-[#000080]/5 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Partner with Us</h2>
            <p className="text-gray-500 mb-8">Deploy your CSR funds with high-impact, verified projects.</p>
            
            <div className="mb-12">
                <ProgressBar steps={steps} currentStep={step} themeColor={THEME_COLOR} />
            </div>

            <form onSubmit={handleSubmit}>
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {step === 0 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
                                <input 
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    type="text" 
                                    className={inputClasses} 
                                    style={{ focusRing: THEME_COLOR }}
                                    placeholder="Enter your registered company name"
                                    required 
                                />
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">CSR Budget Range</label>
                                <select 
                                    name="budgetRange"
                                    value={formData.budgetRange}
                                    onChange={handleChange}
                                    className={inputClasses}
                                    required
                                >
                                    <option value="">Select Range</option>
                                    <option value="<50L">Less than 50 Lakhs</option>
                                    <option value="50L-1Cr">50 Lakhs - 1 Crore</option>
                                    <option value="1Cr-5Cr">1 Crore - 5 Crores</option>
                                    <option value=">5Cr">More than 5 Crores</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Focus Sectors (Comma separated)</label>
                                <input 
                                    name="focusSectors"
                                    value={formData.focusSectors}
                                    onChange={(e) => setFormData(prev => ({...prev, focusSectors: e.target.value.split(',')}))}
                                    type="text" 
                                    className={inputClasses} 
                                    placeholder="Education, Healthcare, Environment..."
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Target Geographies</label>
                                <input 
                                    name="geographies"
                                    value={formData.geographies}
                                    onChange={handleChange}
                                    type="text" 
                                    className={inputClasses} 
                                    placeholder="E.g. Western Maharashtra, Pan India"
                                    required 
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Primary Contact Name</label>
                                <input 
                                    name="contactName"
                                    value={formData.contactName}
                                    onChange={handleChange}
                                    type="text" 
                                    className={inputClasses} 
                                    placeholder="Jane Doe"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Official Email Address</label>
                                <input 
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleChange}
                                    type="email" 
                                    className={inputClasses} 
                                    placeholder="jane.doe@company.com"
                                    required 
                                />
                            </div>
                        </div>
                    )}
                </motion.div>

                <div className="flex justify-between mt-10">
                    <Button 
                        variant="secondary" 
                        themeColor={THEME_COLOR} 
                        onClick={handleBack}
                        disabled={step === 0}
                    >
                        Back
                    </Button>
                    
                    {step < steps.length - 1 ? (
                        <Button 
                            variant="primary" 
                            themeColor={THEME_COLOR} 
                            onClick={handleNext}
                        >
                            Next Step
                        </Button>
                    ) : (
                        <Button 
                            variant="primary" 
                            themeColor={THEME_COLOR} 
                            type="submit"
                        >
                            Submit Application
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CorporateOnboarding;
