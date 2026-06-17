import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '../../ui/ProgressBar';
import Button from '../../ui/Button';

const THEME_COLOR = '#138808';

const NGORegistration = () => {
    const [step, setStep] = useState(0);
    const steps = ['Organization Details', 'Impact & Reach', 'Verification'];
    const [formData, setFormData] = useState({
        ngoName: '',
        registrationNumber: '',
        coreSectors: '',
        regions: '',
        yearsOfOperation: '',
        pastImpact: '',
        contactPerson: '',
        supportingDocumentFile: null
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('type', 'ngo');
        data.append('ngoName', formData.ngoName);
        data.append('registrationNumber', formData.registrationNumber);
        data.append('coreSectors', formData.coreSectors);
        data.append('regions', formData.regions);
        data.append('yearsOfOperation', formData.yearsOfOperation);
        data.append('pastImpact', formData.pastImpact);
        data.append('contactPerson', formData.contactPerson);
        
        if (formData.supportingDocumentFile) {
            data.append('supportingDocument', formData.supportingDocumentFile);
        }
        
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/csr-partners`, {
                method: 'POST',
                body: data
            });
            if (res.ok) {
                alert("Registration submitted! Pending verification.");
                setFormData({
                    ngoName: '',
                    registrationNumber: '',
                    coreSectors: '',
                    regions: '',
                    yearsOfOperation: '',
                    pastImpact: '',
                    contactPerson: ''
                });
                setStep(0);
            } else {
                alert("Failed to submit registration.");
            }
        } catch (err) {
            console.error("Submission error:", err);
            alert("An error occurred during submission.");
        }
    };

    const inputClasses = "w-full p-3 border border-gray-200 rounded-xl focus:outline-none transition-shadow bg-gray-50 mb-4";

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl shadow-[#138808]/10 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">NGO Registration</h2>
            <p className="text-gray-500 mb-8">Join as a verified implementation partner.</p>
            
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
                                <label className="block text-sm font-semibold text-gray-700 mb-1">NGO / Organization Name</label>
                                <input 
                                    name="ngoName"
                                    value={formData.ngoName}
                                    onChange={handleChange}
                                    type="text" 
                                    className={inputClasses} 
                                    placeholder="Enter full organization name"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Registration / NGO Darpan ID</label>
                                <input 
                                    name="registrationNumber"
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    type="text" 
                                    className={inputClasses} 
                                    placeholder="e.g. MH/2021/0123456"
                                    required 
                                />
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Core Sectors (Comma separated)</label>
                                <input 
                                    name="coreSectors"
                                    value={formData.coreSectors}
                                    onChange={handleChange}
                                    type="text" 
                                    className={inputClasses} 
                                    placeholder="Health, Education, Rural Dev..."
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Operational Regions</label>
                                <input 
                                    name="regions"
                                    value={formData.regions}
                                    onChange={handleChange}
                                    type="text" 
                                    className={inputClasses} 
                                    placeholder="e.g. Pune, Satara, Kolhapur"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Years of Operation</label>
                                <input 
                                    name="yearsOfOperation"
                                    value={formData.yearsOfOperation}
                                    onChange={handleChange}
                                    type="number" 
                                    className={inputClasses} 
                                    placeholder="e.g. 5"
                                    required 
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Past Impact Highlights</label>
                                <textarea 
                                    name="pastImpact"
                                    value={formData.pastImpact}
                                    onChange={handleChange}
                                    className={`${inputClasses} min-h-[100px]`} 
                                    placeholder="Briefly describe your most successful projects..."
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Contact Person Name & Phone</label>
                                <input 
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    type="text" 
                                    className={inputClasses} 
                                    placeholder="John Doe, +91 9876543210"
                                    required 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Upload a supporting document (e.g., Annual Report, 80G/12A Certificate, or NGO Profile) (.pdf)</label>
                                <div className="relative">
                                    <input 
                                        type="file" 
                                        name="supportingDocumentFile" 
                                        accept=".pdf" 
                                        onChange={(e) => setFormData(prev => ({ ...prev, supportingDocumentFile: e.target.files[0] }))} 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                    />
                                    <div className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 font-medium hover:bg-gray-100 transition-colors pointer-events-none">
                                        <span className="material-symbols-outlined mr-2">upload_file</span>
                                        {formData.supportingDocumentFile ? formData.supportingDocumentFile.name : "Select PDF Document"}
                                    </div>
                                </div>
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
                            Submit Registration
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default NGORegistration;
