import React, { useState } from 'react';

const Admission = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    age: '',
    grade: '',
    courseCategory: '',
    subCourse: '',
    parentName: '',
    contactNumber: '',
    email: '',
    address: ''
  });

  const courseHierarchies = {
    "Computer Science": ["AIML", "Cloud Computing", "Cyber Security", "Web Development"],
    "Language & Culture": ["German", "Japanese", "French", "Spanish"],
    "Professional Skills": ["Communication", "Leadership Development", "Public Speaking"]
  };
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('http://localhost:5000/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
        })
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ studentName: '', age: '', grade: '', courseCategory: '', subCourse: '', parentName: '', contactNumber: '', email: '', address: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-surface pt-28 pb-20 font-body">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary-container/10 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Creative Typography & Value Proposition */}
          <div className="flex-1 text-center lg:text-left space-y-8 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-widest">
              <span className="material-symbols-outlined text-[18px]">school</span>
              Admissions Open
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-primary leading-[1.1]">
              Begin Your Journey to <span className="text-secondary-container relative inline-block">Excellence<svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary-container/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg></span>
            </h1>
            
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join the Movement of Positivity. Our programs are designed to empower youth, foster innovation, and shape the leaders of tomorrow. Register today to secure your spot.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 hidden md:grid">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <span className="material-symbols-outlined">psychology</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-on-surface">Holistic Growth</h4>
                        <p className="text-sm text-on-surface-variant mt-1">Focusing on academic and personal development.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-container shrink-0">
                        <span className="material-symbols-outlined">workspace_premium</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-on-surface">Expert Mentorship</h4>
                        <p className="text-sm text-on-surface-variant mt-1">Guidance from industry leaders and educators.</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Side: The Form Card */}
          <div className="w-full lg:w-[500px] shrink-0">
            <div className="bg-surface-container-lowest rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-outline-variant/30 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary-container"></div>
              
              <h3 className="text-2xl font-bold text-primary mb-6 font-headline">Registration Form</h3>
              
              {status === 'success' ? (
                <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-tertiary-fixed-dim/20 text-on-tertiary-fixed-variant rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">Application Received!</h3>
                  <p className="text-on-surface-variant mb-8">Thank you! Our admission counselors will review your application and contact you shortly.</p>
                  <button 
                    onClick={() => setStatus('')}
                    className="px-6 py-3 bg-surface hover:bg-surface-container-low text-primary font-bold rounded-xl transition-colors border border-outline-variant/30"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Student Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="studentName"
                      required
                      value={formData.studentName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-on-surface-variant mb-1.5">Age <span className="text-red-500">*</span></label>
                      <input
                        type="number"
                        name="age"
                        required min="2" max="30"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g. 15"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-surface-variant mb-1.5">Grade / standard <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="grade"
                        required
                        value={formData.grade}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g. 10th"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-on-surface-variant mb-1.5">Course Category <span className="text-red-500">*</span></label>
                      <select
                        name="courseCategory"
                        required
                        value={formData.courseCategory}
                        onChange={(e) => setFormData({ ...formData, courseCategory: e.target.value, subCourse: '' })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
                      >
                        <option value="" disabled>Select Category</option>
                        {Object.keys(courseHierarchies).map(cat => (
                           <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-on-surface-variant mb-1.5">Sub Course <span className="text-red-500">*</span></label>
                      <select
                        name="subCourse"
                        required
                        disabled={!formData.courseCategory}
                        value={formData.subCourse}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${!formData.courseCategory ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <option value="" disabled>Select Sub Course</option>
                        {formData.courseCategory && courseHierarchies[formData.courseCategory].map(sub => (
                           <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Parent/Guardian Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="parentName"
                      required
                      value={formData.parentName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Name of guardian"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Contact Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      name="contactNumber"
                      required
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="+91"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Optional"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="text-error bg-error-container/30 border border-error-container p-3 rounded-lg text-sm font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">error</span>
                      Submission failed. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full px-8 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 flex justify-center items-center mt-4"
                  >
                    {status === 'submitting' ? (
                      <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Admission;
