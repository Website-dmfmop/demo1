import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const countryCodes = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA/Canada' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
  { code: '+971', country: 'UAE' },
  { code: '+65', country: 'Singapore' },
  { code: '+81', country: 'Japan' },
  { code: '+49', country: 'Germany' },
];

export default function RegisterInterestModal({ show, onClose, selectedCourse, t, onSuccess, customSuccessMessage }) {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  
  const [enrollForm, setEnrollForm] = useState({
    fullName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    mobileCountryCode: '+91',
    phone: '',
    email: '',
    address: '',
    parentName: '',
    parentCountryCode: '+91',
    parentPhone: ''
  });

  // Calculate age when DOB changes
  useEffect(() => {
    if (enrollForm.dateOfBirth) {
      const dob = new Date(enrollForm.dateOfBirth);
      const diff_ms = Date.now() - dob.getTime();
      const age_dt = new Date(diff_ms); 
      const calculatedAge = Math.abs(age_dt.getUTCFullYear() - 1970);
      setEnrollForm(prev => ({ ...prev, age: calculatedAge }));
    } else {
      setEnrollForm(prev => ({ ...prev, age: '' }));
    }
  }, [enrollForm.dateOfBirth]);

  if (!show || !selectedCourse) return null;

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
        alert('Please verify that you are not a robot.');
        return;
    }
    setIsEnrolling(true);
    try {
      // Split full name for backward compatibility with existing data structures if needed
      const nameParts = enrollForm.fullName.trim().split(' ');
      const firstNameFallback = nameParts[0] || '';
      const lastNameFallback = nameParts.slice(1).join(' ') || '';

      const payload = {
        fullName: enrollForm.fullName,
        firstName: firstNameFallback,
        lastName: lastNameFallback,
        dateOfBirth: enrollForm.dateOfBirth,
        age: enrollForm.age,
        gender: enrollForm.gender,
        mobileCountryCode: enrollForm.mobileCountryCode,
        contactNumber: enrollForm.phone,
        email: enrollForm.email,
        address: enrollForm.address,
        parentName: enrollForm.parentName,
        parentCountryCode: enrollForm.parentCountryCode,
        parentContactNumber: enrollForm.parentPhone,
        courseCategory: selectedCourse.category || 'General',
        subCourse: selectedCourse.courseName || 'General',
        captchaToken,
      };

      const res = await fetch(`${API_URL}/api/admissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        if (customSuccessMessage) {
            alert(customSuccessMessage);
        } else {
            alert(`Registration Successful!\n\nYour interest in ${selectedCourse.courseName} has been recorded. Our team will contact you shortly.`);
        }
        
        if (onSuccess) {
            onSuccess(payload);
        }
        
        onClose();
        // Form resets automatically when unmounted/re-mounted usually, but reset anyway
        setEnrollForm({
          fullName: '', dateOfBirth: '', age: '', gender: '',
          mobileCountryCode: '+91', phone: '', email: '', address: '',
          parentName: '', parentCountryCode: '+91', parentPhone: ''
        });
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !isEnrolling && onClose()}></div>

      <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 text-left flex flex-col max-h-[90vh]">
        <div className="bg-[#000080] p-6 text-white text-center relative shrink-0">
          <h3 className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{t.registerTitle || 'Register Your Interest'}</h3>
          <p className="text-white/80 text-sm mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{selectedCourse.courseName}</p>
          {!isEnrolling && (
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          <p className="text-sm text-gray-500 mb-6 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>{t.fillDetails || 'Please provide your details below.'}</p>
          
          <form onSubmit={handleEnrollSubmit} className="space-y-6">
            
            {/* Personal Information Section */}
            <div>
                <h4 className="text-sm font-bold text-[#000080] border-b border-gray-100 pb-2 mb-4 uppercase tracking-wider">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{t.fullName || 'Full Name'} *</label>
                        <input
                            type="text" required
                            value={enrollForm.fullName}
                            onChange={e => setEnrollForm({ ...enrollForm, fullName: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Date of Birth *</label>
                        <input
                            type="date" required max={today}
                            value={enrollForm.dateOfBirth}
                            onChange={e => setEnrollForm({ ...enrollForm, dateOfBirth: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Age</label>
                        <input
                            type="text" readOnly
                            value={enrollForm.age}
                            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 outline-none cursor-not-allowed"
                            placeholder="Auto-calculated"
                        />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Gender *</label>
                        <select 
                            required
                            value={enrollForm.gender}
                            onChange={e => setEnrollForm({ ...enrollForm, gender: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all"
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Contact Information Section */}
            <div>
                <h4 className="text-sm font-bold text-[#000080] border-b border-gray-100 pb-2 mb-4 uppercase tracking-wider mt-2">Contact Information</h4>
                <div className="space-y-4">
                    
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{t.phoneNumber || 'Mobile Number'} *</label>
                        <div className="flex gap-2">
                            <select 
                                value={enrollForm.mobileCountryCode}
                                onChange={e => setEnrollForm({ ...enrollForm, mobileCountryCode: e.target.value })}
                                className="w-1/3 px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all"
                            >
                                {countryCodes.map(c => (
                                    <option key={`mob-${c.code}`} value={c.code}>{c.country} ({c.code})</option>
                                ))}
                            </select>
                            <input
                                type="tel" required
                                value={enrollForm.phone}
                                onChange={e => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                                className="w-2/3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all"
                                placeholder="98765 43210"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{t.emailAddress || 'Email Address'} *</label>
                        <input
                            type="email" required
                            value={enrollForm.email}
                            onChange={e => setEnrollForm({ ...enrollForm, email: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Residential Address *</label>
                        <textarea
                            required rows="2"
                            value={enrollForm.address}
                            onChange={e => setEnrollForm({ ...enrollForm, address: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all resize-none"
                            placeholder="Full Address"
                        ></textarea>
                    </div>

                </div>
            </div>

            {/* Parent Information Section */}
            <div>
                <h4 className="text-sm font-bold text-[#000080] border-b border-gray-100 pb-2 mb-4 uppercase tracking-wider mt-2">Parent/Guardian Information (Optional)</h4>
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Parent/Guardian Name</label>
                        <input
                            type="text"
                            value={enrollForm.parentName}
                            onChange={e => setEnrollForm({ ...enrollForm, parentName: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all"
                            placeholder="Jane Doe"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Contact Number</label>
                        <div className="flex gap-2">
                            <select 
                                value={enrollForm.parentCountryCode}
                                onChange={e => setEnrollForm({ ...enrollForm, parentCountryCode: e.target.value })}
                                className="w-1/3 px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all"
                            >
                                {countryCodes.map(c => (
                                    <option key={`parent-${c.code}`} value={c.code}>{c.country} ({c.code})</option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                value={enrollForm.parentPhone}
                                onChange={e => setEnrollForm({ ...enrollForm, parentPhone: e.target.value })}
                                className="w-2/3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#000080] outline-none transition-all"
                                placeholder="98765 43210"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center pt-4">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>

            <button
              type="submit"
              disabled={isEnrolling}
              className="w-full py-4 bg-[#000080] hover:bg-[#000060] text-white font-bold text-lg rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {isEnrolling ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  {t.submitRegistration || 'Submit Registration'}
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
