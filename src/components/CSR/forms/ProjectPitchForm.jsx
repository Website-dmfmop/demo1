import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '../../ui/ProgressBar';
import Button from '../../ui/Button';
import { useCSRContext } from '../../../context/CSRContext';

const THEME_COLOR = '#FF9933';

const ProjectPitchForm = () => {
    const { addProject, setCurrentView } = useCSRContext();
    const [step, setStep] = useState(0);
    const steps = ['The Basics', 'Impact & Alignment', 'Financials', 'Compliance'];
    
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        zone: '',
        ward: '',
        fundingGoal: '',
        description: '',
        targetDemographics: [],
        sdgGoals: [],
        isAspirationalDistrict: false,
        timeline: '',
        hasCoInvestment: false,
        overheadCap: '',
        csr1Validated: false,
        hasNitiAayog: false,
        auditLayer: '',
        taxExemptions: [],
        hasFCRA: false,
        organization: '',
        pitchDeckFile: null
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? e.target.files[0] : value
        }));
        // Clear error when user types
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const toggleArrayItem = (key, item) => {
        setFormData(prev => {
            const arr = prev[key];
            return {
                ...prev,
                [key]: arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]
            };
        });
    };

    const validateStep = () => {
        const newErrors = {};
        if (step === 0) {
            if (!formData.title) newErrors.title = "Project Title is required";
            if (!formData.organization) newErrors.organization = "Organization Name is required";
            if (!formData.category) newErrors.category = "Category is required";
            if (!formData.fundingGoal || isNaN(formData.fundingGoal) || Number(formData.fundingGoal) <= 0) newErrors.fundingGoal = "Valid Funding Goal is required";
        } else if (step === 1) {
            if (!formData.description) newErrors.description = "Problem Statement is required";
            if (formData.targetDemographics.length === 0) newErrors.targetDemographics = "Select at least one target demographic";
        } else if (step === 2) {
            if (!formData.timeline) newErrors.timeline = "Timeline is required";
            if (!formData.overheadCap) newErrors.overheadCap = "Overhead Cap must be selected";
        } else if (step === 3) {
            if (!formData.auditLayer) newErrors.auditLayer = "Select an audit verification layer";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setStep(prev => Math.min(prev + 1, steps.length - 1));
        }
    };

    const handlePrev = () => {
        setStep(prev => Math.max(prev - 1, 0));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (validateStep()) {
            setIsSubmitting(true);
            const data = new FormData();
            data.append('title', formData.title);
            data.append('organization', formData.organization);
            data.append('category', formData.category);
            data.append('location', 'Various');
            data.append('zone', formData.zone);
            data.append('ward', formData.ward);
            data.append('timeline', formData.timeline);
            data.append('fundingGoal', Number(formData.fundingGoal));
            data.append('currentFunding', 0);
            data.append('description', formData.description);
            data.append('targetDemographics', JSON.stringify(formData.targetDemographics));
            data.append('sdgGoals', JSON.stringify(formData.sdgGoals));
            data.append('isAspirationalDistrict', formData.isAspirationalDistrict);
            data.append('hasCoInvestment', formData.hasCoInvestment);
            data.append('overheadPercent', Number(formData.overheadCap));
            data.append('csr1Validated', formData.csr1Validated);
            data.append('hasNitiAayog', formData.hasNitiAayog);
            data.append('auditLayer', formData.auditLayer);
            data.append('taxExemptions', JSON.stringify(formData.taxExemptions));
            data.append('hasFCRA', formData.hasFCRA);
            data.append('status', 'Pending');
            if (formData.pitchDeckFile) {
                data.append('pitchDeck', formData.pitchDeckFile);
            }

            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const res = await fetch(`${API_URL}/api/projects`, {
                    method: 'POST',
                    body: data
                });
                
                if (res.ok) {
                    const savedProject = await res.json();
                    addProject(savedProject);
                    setIsSubmitted(true);
                } else {
                    alert('Failed to submit project. Please try again.');
                }
            } catch (error) {
                console.error("Submission error:", error);
                alert('An error occurred during submission.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const inputClasses = (name) => `w-full p-3 border rounded-xl focus:outline-none transition-shadow bg-gray-50 mb-1 ${errors[name] ? 'border-red-400 focus:ring-1 focus:ring-red-400' : 'border-gray-200 focus:ring-1 focus:ring-[#FF9933]'}`;
    const errorText = (name) => errors[name] ? <p className="text-red-500 text-xs font-semibold mb-3">{errors[name]}</p> : <div className="mb-4"></div>;

    const sectorsList = ['Gardens and Parks', 'Education', 'Health', 'Environment', 'Infrastructural Support', 'Social Inclusion', 'SWM'];
    const demographicsList = ['General', 'Women & Children', 'Marginalized Farmers', 'Scheduled Tribes/Castes', 'Youth', 'Senior Citizens', 'Specially-Abled'];
    const sdgData = [
        { id: 1, name: 'No Poverty' },
        { id: 2, name: 'Zero Hunger' },
        { id: 3, name: 'Good Health' },
        { id: 4, name: 'Quality Education' },
        { id: 5, name: 'Gender Equality' },
        { id: 6, name: 'Clean Water' },
        { id: 7, name: 'Clean Energy' },
        { id: 8, name: 'Economic Growth' },
        { id: 9, name: 'Industry & Innovation' },
        { id: 10, name: 'Reduced Inequalities' },
        { id: 11, name: 'Sustainable Cities' },
        { id: 12, name: 'Responsible Consumption' },
        { id: 13, name: 'Climate Action' },
        { id: 14, name: 'Life Below Water' },
        { id: 15, name: 'Life on Land' },
        { id: 16, name: 'Peace & Justice' },
        { id: 17, name: 'Partnerships' }
    ];

    if (isSubmitted) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100 max-w-xl mx-auto"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="material-symbols-outlined text-5xl text-green-600"
                    >
                        check_circle
                    </motion.span>
                </div>
                <h2 style={{ fontFamily: 'Manrope, sans-serif' }} className="text-3xl font-extrabold text-gray-900 mb-4">Pitch Submitted!</h2>
                <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-gray-600 mb-8">
                    Your project "{formData.title}" has been successfully submitted to the directory. It is currently marked as <span className="font-bold text-[#FF9933]">Pending Verification</span>.
                </p>
                <Button variant="primary" themeColor="#000080" onClick={() => setCurrentView('directory')} className="w-full justify-center py-4">
                    View in Directory
                </Button>
            </motion.div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 max-w-3xl mx-auto overflow-hidden relative">
            <h2 style={{ fontFamily: 'Manrope, sans-serif' }} className="text-2xl font-bold text-gray-900 mb-2">Pitch a Project</h2>
            <p className="text-gray-500 mb-8">Submit your initiative to our institutional database to connect with corporate funders.</p>

            <div className="mb-10">
                <ProgressBar steps={steps} currentStep={step} themeColor={THEME_COLOR} />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {step === 0 && (
                        <div className="flex flex-col">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-700 mb-2">Project Title *</label>
                                    <input 
                                        type="text" name="title" value={formData.title} onChange={handleInputChange} 
                                        className={inputClasses('title')} placeholder="e.g., Rural Digital Literacy Hub" 
                                    />
                                    {errorText('title')}
                                </div>
                                <div>
                                    <label style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-700 mb-2">Organization/NGO Name *</label>
                                    <input 
                                        type="text" name="organization" value={formData.organization} onChange={handleInputChange} 
                                        className={inputClasses('organization')} placeholder="e.g., Green Earth Foundation" 
                                    />
                                    {errorText('organization')}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-700 mb-2">Core Sector *</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange} className={inputClasses('category')}>
                                        <option value="">Select a Sector</option>
                                        {sectorsList.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    {errorText('category')}
                                </div>
                                <div>
                                    <label style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-700 mb-2">Funding Goal (INR) *</label>
                                    <input 
                                        type="number" name="fundingGoal" value={formData.fundingGoal} onChange={handleInputChange} 
                                        className={inputClasses('fundingGoal')} placeholder="e.g., 5000000" 
                                    />
                                    {errorText('fundingGoal')}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-700 mb-2">Zone</label>
                                    <select name="zone" value={formData.zone} onChange={handleInputChange} className={inputClasses('zone')}>
                                        <option value="">Select Zone</option>
                                        <option value="North">North Zone</option>
                                        <option value="South">South Zone</option>
                                    </select>
                                    {errorText('zone')}
                                </div>
                                <div>
                                    <label style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-700 mb-2">Ward</label>
                                    <input 
                                        type="text" name="ward" value={formData.ward} onChange={handleInputChange} 
                                        className={inputClasses('ward')} placeholder="e.g., Ward 4" 
                                    />
                                    {errorText('ward')}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="flex flex-col">
                            <label style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-700 mb-2">Problem Statement & Solution *</label>
                            <textarea 
                                name="description" value={formData.description} onChange={handleInputChange} 
                                rows="4" className={inputClasses('description')} placeholder="Describe the impact your project will create..."
                            ></textarea>
                            {errorText('description')}

                            <label style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-700 mb-2">Target Demographics *</label>
                            <div className={`flex flex-wrap gap-2 p-4 border rounded-xl bg-gray-50 mb-1 ${errors.targetDemographics ? 'border-red-400' : 'border-gray-200'}`}>
                                {demographicsList.map(demo => {
                                    const isActive = formData.targetDemographics.includes(demo);
                                    return (
                                        <button
                                            key={demo} onClick={() => toggleArrayItem('targetDemographics', demo)}
                                            style={{ fontFamily: 'Inter, sans-serif' }}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                                                isActive ? 'bg-[#FF9933]/10 text-[#FF9933] border-[#FF9933]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                                            }`}
                                        >
                                            {demo}
                                        </button>
                                    );
                                })}
                            </div>
                            {errorText('targetDemographics')}

                            <label style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-700 mb-2 mt-4">SDG Alignment</label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-4">
                                {sdgData.map(sdg => {
                                    const isActive = formData.sdgGoals.includes(sdg.id);
                                    return (
                                        <button
                                            key={sdg.id} type="button" onClick={() => toggleArrayItem('sdgGoals', sdg.id)}
                                            className={`p-2 rounded-xl border flex flex-col items-center text-center transition-all ${
                                                isActive ? 'bg-[#FF9933]/10 border-[#FF9933] shadow-sm' : 'bg-white border-gray-200 hover:border-[#FF9933]/50 hover:bg-orange-50'
                                            }`}
                                        >
                                            <img 
                                                src={`/goals/${sdg.id}.png`} 
                                                alt={sdg.name} 
                                                className={`w-14 h-14 object-contain mb-2 transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-md' : 'hover:scale-105'}`} 
                                            />
                                            <span style={{ fontFamily: 'Inter, sans-serif' }} className={`text-[10px] font-semibold leading-tight ${isActive ? 'text-[#FF9933]' : 'text-gray-500'}`}>
                                                {sdg.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <label className="flex items-center gap-3 p-3 mt-4 rounded-xl border border-gray-200 bg-white cursor-pointer hover:border-[#FF9933]/50 transition-all">
                                <input type="checkbox" name="isAspirationalDistrict" checked={formData.isAspirationalDistrict} onChange={handleInputChange} className="w-5 h-5 accent-[#FF9933]" />
                                <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-800">Operating in an Aspirational District</span>
                            </label>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col">
                            <label style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-700 mb-2">Expected Timeline *</label>
                            <select name="timeline" value={formData.timeline} onChange={handleInputChange} className={inputClasses('timeline')}>
                                <option value="">Select Duration</option>
                                <option value="6 Months">6 Months</option>
                                <option value="12 Months">12 Months</option>
                                <option value="24 Months">24 Months</option>
                                <option value="36+ Months">36+ Months</option>
                            </select>
                            {errorText('timeline')}

                            <label style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-700 mb-2 mt-4">Administrative Overhead Cap *</label>
                            <select name="overheadCap" value={formData.overheadCap} onChange={handleInputChange} className={inputClasses('overheadCap')}>
                                <option value="">Select Maximum Overhead</option>
                                <option value="5">Under 5%</option>
                                <option value="10">Under 10%</option>
                                <option value="15">Under 15%</option>
                                <option value="20">Under 20%</option>
                            </select>
                            {errorText('overheadCap')}

                            <label className="flex items-center gap-3 p-4 mt-6 rounded-xl border border-gray-200 bg-white cursor-pointer hover:border-[#FF9933]/50 transition-all">
                                <input type="checkbox" name="hasCoInvestment" checked={formData.hasCoInvestment} onChange={handleInputChange} className="w-5 h-5 accent-[#FF9933]" />
                                <div>
                                    <p style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-bold text-gray-800">Co-Investment / Match Funding Secured</p>
                                    <p className="text-xs text-gray-500 mt-1">Check this if you already have baseline community or corporate capital secured.</p>
                                </div>
                            </label>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col">
                            <label className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50 mb-6 hover:border-[#FF9933]/50 transition-all cursor-pointer block relative">
                                <input type="file" name="pitchDeckFile" accept=".pdf" onChange={handleInputChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">upload_file</span>
                                <p style={{ fontFamily: 'Manrope, sans-serif' }} className="font-bold text-gray-700">
                                    {formData.pitchDeckFile ? formData.pitchDeckFile.name : "Upload supporting project documents (e.g., Detailed Project Report, Pitch Deck, or Budget Breakdown) (.pdf)"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Maximum file size: 10MB</p>
                            </label>

                            <label style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-700 mb-2">Audit Verification Layer *</label>
                            <select name="auditLayer" value={formData.auditLayer} onChange={handleInputChange} className={inputClasses('auditLayer')}>
                                <option value="">Select Audit Level</option>
                                <option value="Self-Certified">Self-Certified</option>
                                <option value="Government Audited">Government Audited</option>
                                <option value="Independent Third-Party Audited">Independent Third-Party Audited</option>
                            </select>
                            {errorText('auditLayer')}

                            <div className="flex flex-col gap-3 mt-4">
                                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white cursor-pointer hover:border-[#FF9933]/50 transition-all">
                                    <input type="checkbox" name="csr1Validated" checked={formData.csr1Validated} onChange={handleInputChange} className="w-5 h-5 accent-[#FF9933]" />
                                    <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-800">CSR-1 Registered (Mandatory)</span>
                                </label>
                                
                                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white cursor-pointer hover:border-[#FF9933]/50 transition-all">
                                    <input type="checkbox" name="hasNitiAayog" checked={formData.hasNitiAayog} onChange={handleInputChange} className="w-5 h-5 accent-[#FF9933]" />
                                    <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-800">NITI Aayog Darpan ID Available</span>
                                </label>

                                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white cursor-pointer hover:border-[#FF9933]/50 transition-all">
                                    <input type="checkbox" checked={formData.taxExemptions.includes('80G')} onChange={() => toggleArrayItem('taxExemptions', '80G')} className="w-5 h-5 accent-[#FF9933]" />
                                    <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-800">80G Tax Exemption</span>
                                </label>

                                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white cursor-pointer hover:border-[#FF9933]/50 transition-all">
                                    <input type="checkbox" checked={formData.taxExemptions.includes('12A')} onChange={() => toggleArrayItem('taxExemptions', '12A')} className="w-5 h-5 accent-[#FF9933]" />
                                    <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-800">12A Registration</span>
                                </label>

                                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white cursor-pointer hover:border-[#FF9933]/50 transition-all">
                                    <input type="checkbox" name="hasFCRA" checked={formData.hasFCRA} onChange={handleInputChange} className="w-5 h-5 accent-[#FF9933]" />
                                    <span style={{ fontFamily: 'Inter, sans-serif' }} className="text-sm font-semibold text-gray-800">FCRA Certified (Foreign Funding)</span>
                                </label>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
                {step > 0 ? (
                    <Button variant="secondary" onClick={handlePrev} className="px-6">
                        Back
                    </Button>
                ) : (
                    <div></div>
                )}
                
                <div className="flex gap-4">
                    <Button variant="secondary" className="px-6 text-gray-500 hover:text-gray-700">
                        Save Draft
                    </Button>
                    
                    {step < steps.length - 1 ? (
                        <Button variant="primary" themeColor={THEME_COLOR} onClick={handleNext} className="px-8 shadow-lg">
                            Next Step
                        </Button>
                    ) : (
                        <Button variant="primary" themeColor={THEME_COLOR} onClick={handleSubmit} disabled={isSubmitting} className="px-8 shadow-lg flex items-center gap-2">
                            {isSubmitting ? (
                                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Submitting...</>
                            ) : (
                                "Submit Project"
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectPitchForm;
