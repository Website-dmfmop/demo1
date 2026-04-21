import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('admissions');
  const [admissions, setAdmissions] = useState([]);
  const [donations, setDonations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [mediaItems, setMediaItems] = useState([]);
  const [videos, setVideos] = useState([]);
  const [publications, setPublications] = useState([]);
  const [press, setPress] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMenuOpenId, setActionMenuOpenId] = useState(null);
  
  // Analytics & Media SubTabs
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [mediaSubTab, setMediaSubTab] = useState('photos'); // photos, videos, publications, press

  const [editingId, setEditingId] = useState(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('adminAuth') === 'true');

  // Forms State
  const [courseForm, setCourseForm] = useState({ courseName: '', description: '', price: '', discountOffer: 0, category: 'General', brochure: null });
  const [showCourseForm, setShowCourseForm] = useState(false);
  
  const [showMediaForm, setShowMediaForm] = useState(false);
  const [mediaForm, setMediaForm] = useState({ title: '', category: 'Events', isCustomCategory: false, customCategory: '', date: '', file: null });

  const [showVideoForm, setShowVideoForm] = useState(false);
  const [videoForm, setVideoForm] = useState({ title: '', desc: '', duration: '', link: '', file: null });

  const [showPubForm, setShowPubForm] = useState(false);
  const [pubForm, setPubForm] = useState({ title: '', soon: false, imgFile: null, pdfFile: null });

  const [showPressForm, setShowPressForm] = useState(false);
  const [pressForm, setPressForm] = useState({ outlet: '', headline: '', date: '', tag: 'ICOE', color: 'border-primary', url: '', isCustomTag: false, customTag: '' });
  const [showLiveSessionForm, setShowLiveSessionForm] = useState(false);
  const [liveSessionForm, setLiveSessionForm] = useState({ title: '', meetingLink: '', speaker: '', description: '', collaboration: '', date: '', time: '', cost: 0 });
  useEffect(() => {
    setActionMenuOpenId(null);
    setShowAnalytics(false);
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'admissions') {
        const res = await fetch('http://localhost:5000/api/admissions');
        if (!res.ok) throw new Error('Failed to fetch admissions');
        setAdmissions(await res.json());
      } else if (activeTab === 'donations') {
        const res = await fetch('http://localhost:5000/api/donations');
        if (!res.ok) throw new Error('Failed to fetch donations');
        setDonations(await res.json());
      } else if (activeTab === 'courses') {
        const res = await fetch('http://localhost:5000/api/courses');
        if (!res.ok) throw new Error('Failed to fetch courses');
        setCourses(await res.json());
      } else if (activeTab === 'media') {
        const [resMedia, resVid, resPub, resPress] = await Promise.all([
          fetch('http://localhost:5000/api/media'),
          fetch('http://localhost:5000/api/videos'),
          fetch('http://localhost:5000/api/publications'),
          fetch('http://localhost:5000/api/press')
        ]);
        if (!resMedia.ok) throw new Error('Failed to fetch media');
        setMediaItems(await resMedia.json());
        setVideos(await resVid.json());
        setPublications(await resPub.json());
        setPress(await resPress.json());
      } else if (activeTab === 'live_sessions') {
        const res = await fetch('http://localhost:5000/api/live-sessions');
        if (!res.ok) throw new Error('Failed to fetch live sessions');
        setLiveSessions(await res.json());
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateAdmissionStatus = async (id, newStatus) => {
    setActionMenuOpenId(null);
    try {
      const res = await fetch(`http://localhost:5000/api/admissions/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchData();
      else alert('Failed to update status');
    } catch (err) {
      alert('Error updating status');
    }
  };

  const deleteRecord = async (type, id) => {
    setActionMenuOpenId(null);
    if (!window.confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) return;
    try {
      let endpoint = `http://localhost:5000/api/${type}s/${id}`;
      // Grammar handling for pluralization edge cases
      if (type === 'media') endpoint = `http://localhost:5000/api/media/${id}`;
      if (type === 'press') endpoint = `http://localhost:5000/api/press/${id}`;

      const res = await fetch(endpoint, { method: 'DELETE' });
      if (res.ok) fetchData();
      else alert('Failed to delete');
    } catch (err) {
      alert('Error deleting');
    }
  };

  const createCourse = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('courseName', courseForm.courseName);
      formData.append('description', courseForm.description);
      formData.append('price', courseForm.price);
      formData.append('discountOffer', courseForm.discountOffer);
      formData.append('category', courseForm.category);
      if (courseForm.brochure) formData.append('brochure', courseForm.brochure);

      try {
          const url = editingId ? `http://localhost:5000/api/courses/${editingId}` : 'http://localhost:5000/api/courses';
          const method = editingId ? 'PUT' : 'POST';
          const res = await fetch(url, {
              method,
              body: formData
          });
          if (res.ok) {
              setCourseForm({ courseName: '', description: '', price: '', discountOffer: 0, category: 'General', brochure: null });
              setShowCourseForm(false);
              setEditingId(null);
              fetchData();
          } else {
              alert('Failed to save course');
          }
      } catch (err) {
          alert('Error saving course');
      }
  };

  const handleLogin = (e) => {
      e.preventDefault();
      if (password === 'Dmfmop@123') {
          setIsAuthenticated(true);
          sessionStorage.setItem('adminAuth', 'true');
      } else {
          alert('Incorrect password');
      }
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      sessionStorage.removeItem('adminAuth');
      setPassword('');
  };

  const createMedia = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', mediaForm.title);
      formData.append('date', mediaForm.date);
      formData.append('category', mediaForm.isCustomCategory ? mediaForm.customCategory : mediaForm.category);
      if (mediaForm.file) formData.append('file', mediaForm.file);

      try {
          const url = editingId ? `http://localhost:5000/api/media/${editingId}` : 'http://localhost:5000/api/media';
          const res = await fetch(url, {
              method: editingId ? 'PUT' : 'POST',
              body: formData
          });
          if (res.ok) {
              setMediaForm({ title: '', category: 'Events', isCustomCategory: false, customCategory: '', date: '', file: null });
              setShowMediaForm(false);
              setEditingId(null);
              fetchData();
          } else {
              alert('Failed to save media item');
          }
      } catch (err) {
          alert('Error saving media');
      }
  };

  const createVideo = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', videoForm.title);
      formData.append('desc', videoForm.desc);
      formData.append('duration', videoForm.duration);
      formData.append('link', videoForm.link);
      if (videoForm.file) formData.append('thumb', videoForm.file);

      try {
          const url = editingId ? `http://localhost:5000/api/videos/${editingId}` : 'http://localhost:5000/api/videos';
          const res = await fetch(url, { method: editingId ? 'PUT' : 'POST', body: formData });
          if (res.ok) {
              setVideoForm({ title: '', desc: '', duration: '', link: '', file: null });
              setShowVideoForm(false);
              setEditingId(null);
              fetchData();
          }
      } catch (err) { alert('Error saving video'); }
  };

  const createPub = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', pubForm.title);
      formData.append('soon', pubForm.soon);
      if (pubForm.imgFile) formData.append('img', pubForm.imgFile);
      if (pubForm.pdfFile) formData.append('pdf', pubForm.pdfFile);

      try {
          const url = editingId ? `http://localhost:5000/api/publications/${editingId}` : 'http://localhost:5000/api/publications';
          const res = await fetch(url, { method: editingId ? 'PUT' : 'POST', body: formData });
          if (res.ok) {
              setPubForm({ title: '', soon: false, imgFile: null, pdfFile: null });
              setShowPubForm(false);
              setEditingId(null);
              fetchData();
          }
      } catch (err) { alert('Error saving publication'); }
  };

  const createPress = async (e) => {
      e.preventDefault();
      const data = { ...pressForm };
      data.tag = pressForm.isCustomTag ? pressForm.customTag : pressForm.tag;

      try {
          const url = editingId ? `http://localhost:5000/api/press/${editingId}` : 'http://localhost:5000/api/press';
          const res = await fetch(url, {
              method: editingId ? 'PUT' : 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data)
          });
          if (res.ok) {
              setPressForm({ outlet: '', headline: '', date: '', tag: 'ICOE', color: 'border-primary', url: '', isCustomTag: false, customTag: '' });
              setShowPressForm(false);
              setEditingId(null);
              fetchData();
          }
      } catch (err) { alert('Error saving press'); }
  };

  const createLiveSession = async (e) => {
      e.preventDefault();
      try {
          const url = editingId ? `http://localhost:5000/api/live-sessions/${editingId}` : 'http://localhost:5000/api/live-sessions';
          const res = await fetch(url, {
              method: editingId ? 'PUT' : 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(liveSessionForm)
          });
          if (res.ok) {
              setLiveSessionForm({ title: '', meetingLink: '', speaker: '', description: '', collaboration: '', date: '', time: '', cost: 0 });
              setShowLiveSessionForm(false);
              setEditingId(null);
              fetchData();
          } else {
              alert('Failed to save live session');
          }
      } catch (err) { alert('Error saving live session'); }
  };

  const openEditForm = (type, item) => {
      setEditingId(item._id);
      if (type === 'course') {
          setCourseForm({ courseName: item.courseName, description: item.description, price: item.price, discountOffer: item.discountOffer || 0, category: item.category || 'General', brochure: null });
          setShowCourseForm(true);
      } else if (type === 'media') {
          setMediaForm({ title: item.title, category: item.category, isCustomCategory: false, customCategory: '', date: item.date || '', file: null });
          setShowMediaForm(true);
      } else if (type === 'video') {
          setVideoForm({ title: item.title, desc: item.desc, duration: item.duration || '', link: item.link, file: null });
          setShowVideoForm(true);
      } else if (type === 'pub') {
          setPubForm({ title: item.title, soon: item.soon || false, imgFile: null, pdfFile: null });
          setShowPubForm(true);
      } else if (type === 'press') {
          setPressForm({ outlet: item.outlet, headline: item.headline, date: item.date || '', tag: item.tag, color: item.color || 'border-primary', url: item.url || '', isCustomTag: false, customTag: '' });
          setShowPressForm(true);
      } else if (type === 'live-session') {
          setLiveSessionForm({ title: item.title, meetingLink: item.meetingLink, speaker: item.speaker || '', description: item.description || '', collaboration: item.collaboration || '', date: item.date || '', time: item.time || '', cost: item.cost || 0 });
          setShowLiveSessionForm(true);
      }
  };

  // Helper counters & sorted arrays
  const sortedAdmissions = [...admissions].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  const sortedDonations = [...donations].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
  const totalDonationsAmount = donations.reduce((sum, don) => sum + (don.amount || 0), 0);
  const recentAdmissionsCount = admissions.filter(a => new Date() - new Date(a.createdAt) < 7 * 24 * 60 * 60 * 1000).length;
  const pendingAdmissionsCount = admissions.filter(a => !a.status || a.status === 'Pending' || a.status === 'Under Review').length;

  // Chart Data preparation
  const PIE_COLORS = ['#FE9832', '#00C49F', '#FFBB28', '#FF8042'];
  const admissionStatusData = [
    { name: 'Pending', value: admissions.filter(a => !a.status || a.status === 'Pending').length },
    { name: 'Approved', value: admissions.filter(a => a.status === 'Approved').length },
    { name: 'Under Review', value: admissions.filter(a => a.status === 'Under Review').length },
    { name: 'Rejected', value: admissions.filter(a => a.status === 'Rejected').length },
  ].filter(d => d.value > 0);

  // Simple aggregation for chart (group by date)
  const admissionsByDateMap = {};
  admissions.forEach(a => {
      const dString = new Date(a.createdAt).toLocaleDateString();
      admissionsByDateMap[dString] = (admissionsByDateMap[dString] || 0) + 1;
  });
  const admissionTrendData = Object.keys(admissionsByDateMap).map(k => ({ date: k, count: admissionsByDateMap[k] })).reverse();


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl">lock</span>
            </div>
            <h1 className="text-3xl font-headline font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-500 font-medium font-body">Please enter password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold tracking-widest"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full py-4 bg-primary text-white font-headline font-bold rounded-2xl shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen font-body text-slate-800" style={{ background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.20) 0%, rgba(255, 255, 255, 1) 50%, rgba(18, 136, 7, 0.20) 100%)' }} onClick={() => setActionMenuOpenId(null)}>
      {/* SIDEBAR */}
      <aside className="w-64 bg-primary text-white flex flex-col shadow-2xl z-20 shrink-0" onClick={e => e.stopPropagation()}>
        <div className="h-20 flex items-center justify-center border-b border-white/10 px-6">
            <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl">dashboard_customize</span>
                <span className="font-headline font-extrabold text-xl tracking-wide uppercase">Admin Portal</span>
            </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 mt-2">
            <p className="px-2 text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-4">Dashboards</p>
            
            <button
                onClick={() => setActiveTab('admissions')}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-semibold text-sm ${
                activeTab === 'admissions' ? 'bg-white text-primary shadow-lg scale-[1.02]' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
            >
                <span className="material-symbols-outlined text-[20px]">school</span> Admissions
            </button>

            <button
                onClick={() => setActiveTab('donations')}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-semibold text-sm ${
                activeTab === 'donations' ? 'bg-white text-primary shadow-lg scale-[1.02]' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
            >
                <span className="material-symbols-outlined text-[20px]">volunteer_activism</span> Donations
            </button>

            <p className="px-2 text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-4 mt-8">Manage System</p>
            <button
                onClick={() => setActiveTab('courses')}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-semibold text-sm ${
                activeTab === 'courses' ? 'bg-white text-primary shadow-lg scale-[1.02]' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
            >
                <span className="material-symbols-outlined text-[20px]">menu_book</span> Courses
            </button>
            <button
                onClick={() => setActiveTab('media')}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-semibold text-sm ${
                activeTab === 'media' ? 'bg-white text-primary shadow-lg scale-[1.02]' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
            >
                <span className="material-symbols-outlined text-[20px]">perm_media</span> Media Gallery
            </button>
            <button
                onClick={() => setActiveTab('live_sessions')}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-semibold text-sm ${
                activeTab === 'live_sessions' ? 'bg-white text-primary shadow-lg scale-[1.02]' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
            >
                <span className="material-symbols-outlined text-[20px]">live_tv</span> Live Sessions
            </button>
        </nav>
        <div className="p-6 border-t border-white/10 space-y-4">
            <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-xs text-white/70 mb-2">Logged in as</p>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center font-bold">A</div>
                    <span className="font-headline font-bold text-sm">Super Admin</span>
                </div>
            </div>
            <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all font-bold text-sm border border-red-500/20 shadow-sm"
            >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                Logout Session
            </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOPBAR */}
        <header className="h-20 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-gray-400 cursor-pointer hover:text-primary transition-colors">menu</span>
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <h2 className="text-xl font-headline font-bold text-gray-800 uppercase tracking-wide">
                {activeTab === 'admissions' && 'Admissions Data'}
                {activeTab === 'donations' && 'Donations Tracker'}
                {activeTab === 'courses' && 'Course Management'}
                {activeTab === 'media' && 'Media Management'}
                {activeTab === 'live_sessions' && 'Live Sessions Management'}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={fetchData} className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-gray-600 hover:text-primary transition-all text-sm font-semibold shadow-sm">
                <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>refresh</span>
                Refresh Data
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-8">
            
            {error && (
            <div className="max-w-6xl mx-auto bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm mb-6 flex items-center gap-3 font-medium">
                <span className="material-symbols-outlined">error</span> {error}
            </div>
            )}

            {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 font-medium">Loading remote data...</p>
            </div>
            ) : (
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* ---------- ADMISSIONS TAB ---------- */}
                {activeTab === 'admissions' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl">group</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Admissions</p>
                                    <h3 className="text-3xl font-headline font-bold text-gray-800">{admissions.length}</h3>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl">trending_up</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Recent (7 Days)</p>
                                    <h3 className="text-3xl font-headline font-bold text-gray-800">+{recentAdmissionsCount}</h3>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl">pending_actions</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Pending/Review</p>
                                    <h3 className="text-3xl font-headline font-bold text-gray-800">{pendingAdmissionsCount}</h3>
                                </div>
                            </div>
                        </div>

                        {showAnalytics ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                                    <h3 className="font-headline font-bold text-2xl text-gray-800 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">pie_chart</span>
                                        Admissions Analytics
                                    </h3>
                                    <button onClick={() => setShowAnalytics(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">table_rows</span> View Data Table
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="bg-slate-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                                        <h4 className="font-bold text-gray-700 mb-6 text-center">Status Distribution</h4>
                                        <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie data={admissionStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                                        {admissionStatusData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                                        <h4 className="font-bold text-gray-700 mb-6 text-center">Application Trend Over Time</h4>
                                        <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={admissionTrendData}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                                                    <XAxis dataKey="date" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                                                    <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                                                    <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                                                    <Bar dataKey="count" fill="#FE9832" radius={[4, 4, 0, 0]} barSize={40} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible relative">
                                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white rounded-t-2xl">
                                    <h3 className="font-headline font-bold text-lg text-gray-800">Recent Applications</h3>
                                    <button onClick={() => setShowAnalytics(true)} className="text-sm px-4 py-2 bg-primary/10 rounded-lg font-bold text-primary hover:bg-primary/20 flex items-center gap-2 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">query_stats</span> View Analytics
                                    </button>
                                </div>
                                <div className="overflow-x-auto min-h-[300px]">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                                            <tr>
                                                <th className="px-6 py-4 border-b border-gray-200">Applicant Name</th>
                                                <th className="px-6 py-4 border-b border-gray-200">Payment</th>
                                                <th className="px-6 py-4 border-b border-gray-200">Course</th>
                                                <th className="px-6 py-4 border-b border-gray-200">Contact Info</th>
                                                <th className="px-6 py-4 border-b border-gray-200">Status</th>
                                                <th className="px-6 py-4 border-b border-gray-200">Date</th>
                                                <th className="px-6 py-4 border-b border-gray-200 text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 bg-white">
                                            {sortedAdmissions.length === 0 ? (
                                            <tr><td colSpan="7" className="py-12 text-center text-gray-400 font-medium">No records found.</td></tr>
                                            ) : (
                                            sortedAdmissions.map(adm => {
                                                const admStatus = adm.status || 'Pending';
                                                let statusColor = 'bg-yellow-100 text-yellow-700'; let dotColor = 'bg-yellow-500';
                                                if (admStatus === 'Approved') { statusColor = 'bg-green-100 text-green-700'; dotColor = 'bg-green-500'; }
                                                if (admStatus === 'Rejected') { statusColor = 'bg-red-100 text-red-700'; dotColor = 'bg-red-500'; }
                                                if (admStatus === 'Under Review') { statusColor = 'bg-blue-100 text-blue-700'; dotColor = 'bg-blue-500'; }

                                                const fullName = adm.firstName ? `${adm.firstName} ${adm.lastName}` : (adm.studentName || 'Unknown');

                                                return (
                                                <tr key={adm._id} className="hover:bg-blue-50/30 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                                                                {fullName.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-gray-800">{fullName}</div>
                                                                <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{adm.age ? `${adm.age} yrs • ${adm.grade}` : 'Web Enrollment'}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-gray-700 text-sm">₹{adm.amountPaid || 0}</span>
                                                            <span className={`text-[10px] font-extrabold uppercase tracking-widest ${adm.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-500'}`}>
                                                                {adm.paymentStatus || 'Pending'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-xs text-gray-600 uppercase tracking-tight">{adm.courseCategory || 'N/A'}</div>
                                                        <div className="text-sm text-primary font-bold">{adm.subCourse || 'N/A'}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-gray-800 font-medium text-xs">{adm.email || 'No Email'}</div>
                                                        <div className="text-gray-500 text-xs">{adm.contactNumber}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest ${statusColor}`}>
                                                            <div className={`w-1 h-1 rounded-full ${dotColor}`}></div>
                                                            {admStatus}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">{new Date(adm.createdAt).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 text-center relative pointer-events-auto">
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); setActionMenuOpenId(actionMenuOpenId === adm._id ? null : adm._id); }}
                                                            className={`p-1.5 rounded-lg transition-colors ${actionMenuOpenId === adm._id ? 'bg-gray-100 text-primary' : 'text-gray-400 hover:text-primary hover:bg-gray-50'}`}
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                        </button>
                                                        
                                                        {actionMenuOpenId === adm._id && (
                                                            <div className="absolute right-12 top-8 w-48 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                                                                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 border-b border-gray-50 text-left">Set Status</div>
                                                                <button onClick={() => updateAdmissionStatus(adm._id, 'Pending')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Pending</button>
                                                                <button onClick={() => updateAdmissionStatus(adm._id, 'Under Review')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Under Review</button>
                                                                <button onClick={() => updateAdmissionStatus(adm._id, 'Approved')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-medium"><div className="w-2 h-2 rounded-full bg-green-500"></div> Approve</button>
                                                                <button onClick={() => updateAdmissionStatus(adm._id, 'Rejected')} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50 font-medium"><div className="w-2 h-2 rounded-full bg-red-500"></div> Reject</button>
                                                                <button onClick={() => deleteRecord('admission', adm._id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 mt-1 font-bold">
                                                                    <span className="material-symbols-outlined text-[16px]">delete</span> Delete Record
                                                                </button>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                                );
                                            })
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* ---------- DONATIONS TAB ---------- */}
                {activeTab === 'donations' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible relative">
                        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white rounded-t-2xl">
                            <h3 className="font-headline font-bold text-lg text-gray-800">Recent Transactions</h3>
                        </div>
                        <div className="overflow-x-auto min-h-[300px]">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 border-b border-gray-200">Donor Details</th>
                                        <th className="px-6 py-4 border-b border-gray-200">Amount</th>
                                        <th className="px-6 py-4 border-b border-gray-200">Status</th>
                                        <th className="px-6 py-4 border-b border-gray-200">Date</th>
                                        <th className="px-6 py-4 border-b border-gray-200 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {sortedDonations.length === 0 ? (
                                        <tr><td colSpan="5" className="py-12 text-center text-gray-400 font-medium">No records found.</td></tr>
                                    ) : (
                                    sortedDonations.map(don => (
                                        <tr key={don._id} className="hover:bg-secondary-container/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-secondary-container/20 text-secondary-container flex items-center justify-center font-bold text-lg">
                                                        {don.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-800">{don.name}</div>
                                                        <div className="text-xs text-gray-500">{don.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4"><span className="font-headline font-bold text-lg text-gray-800">₹{don.amount.toLocaleString()}</span></td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-700">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>Completed
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{new Date(don.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-center relative pointer-events-auto">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); setActionMenuOpenId(actionMenuOpenId === don._id ? null : don._id); }}
                                                    className={`p-1.5 rounded-lg transition-colors ${actionMenuOpenId === don._id ? 'bg-gray-100 text-primary' : 'text-gray-400 hover:text-primary hover:bg-gray-50'}`}
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                                </button>
                                                {actionMenuOpenId === don._id && (
                                                    <div className="absolute right-12 top-8 w-48 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
                                                        <button onClick={() => deleteRecord('donation', don._id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-[16px]">delete</span> Delete Record
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    )))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ---------- COURSES TAB ---------- */}
                {activeTab === 'courses' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="flex justify-between items-center">
                            <h3 className="font-headline font-bold text-2xl text-gray-800">Course Offerings</h3>
                            <button onClick={() => { if (!showCourseForm) setEditingId(null); setShowCourseForm(!showCourseForm); }} className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover flex items-center gap-2 shadow-md transition-all">
                                <span className="material-symbols-outlined text-[18px]">add</span> {showCourseForm ? 'Cancel' : 'Add New Course'}
                            </button>
                        </div>

                        {showCourseForm && (
                            <form onSubmit={createCourse} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-3 mb-6">Create New Course</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Course Name</label>
                                        <input type="text" required value={courseForm.courseName} onChange={e => setCourseForm({...courseForm, courseName: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                        <select value={courseForm.category} onChange={e => setCourseForm({...courseForm, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                                            <option>General</option>
                                            <option>Language</option>
                                            <option>Technical Skills</option>
                                            <option>Soft Skills</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                        <textarea required value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" rows="3"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Base Price (₹)</label>
                                        <input type="number" required min="0" value={courseForm.price} onChange={e => setCourseForm({...courseForm, price: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Discount Percentage (%)</label>
                                        <input type="number" min="0" max="100" value={courseForm.discountOffer} onChange={e => setCourseForm({...courseForm, discountOffer: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Upload Course Brochure (Image/PDF)</label>
                                        <input type="file" accept="image/*,application/pdf" onChange={e => setCourseForm({...courseForm, brochure: e.target.files[0]})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                        {editingId && <p className="text-[10px] text-gray-400 mt-1 italic">Leave empty to keep existing brochure</p>}
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button type="submit" className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-sm">{editingId ? 'Save Changes' : 'Save Course'}</button>
                                </div>
                            </form>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.length === 0 ? (
                                <p className="col-span-full py-8 text-center text-gray-400 font-medium">No courses available. Create one to get started.</p>
                            ) : (
                                courses.map(course => (
                                    <div key={course._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative">
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">{course.category}</span>
                                                <div className="flex gap-2">
                                                    <button onClick={() => openEditForm('course', course)} className="text-gray-300 hover:text-blue-500 transition-colors p-1"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                                    <button onClick={() => deleteRecord('course', course._id)} className="text-gray-300 hover:text-red-500 transition-colors p-1"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                                                </div>
                                            </div>
                                            <h4 className="font-headline font-bold text-xl text-gray-800 mb-2">{course.courseName}</h4>
                                            <p className="text-sm text-gray-500 mb-6 line-clamp-2">{course.description}</p>
                                            
                                            <div className="flex items-center gap-3 mt-auto border-t border-gray-100 pt-4">
                                                <div className="font-headline font-bold text-2xl text-gray-800">
                                                    ₹{course.price - (course.price * (course.discountOffer/100))}
                                                </div>
                                                {course.discountOffer > 0 && (
                                                    <div className="flex flex-col">
                                                        <span className="text-xs text-gray-400 line-through">₹{course.price}</span>
                                                        <span className="text-xs font-bold text-green-600">{course.discountOffer}% OFF</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* ---------- MEDIA TAB ---------- */}
                {activeTab === 'media' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h3 className="font-headline font-bold text-2xl text-gray-800">Media CMS <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-widest">{mediaSubTab}</span></h3>
                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => setMediaSubTab('photos')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${mediaSubTab === 'photos' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Photos</button>
                                <button onClick={() => setMediaSubTab('videos')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${mediaSubTab === 'videos' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Videos</button>
                                <button onClick={() => setMediaSubTab('publications')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${mediaSubTab === 'publications' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Publications</button>
                                <button onClick={() => setMediaSubTab('press')} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${mediaSubTab === 'press' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>Press</button>
                            </div>
                        </div>

                        {/* SUBTAB: PHOTOS */}
                        {mediaSubTab === 'photos' && (
                            <div className="space-y-6 animate-in fade-in">
                                <button onClick={() => { if (!showMediaForm) setEditingId(null); setShowMediaForm(!showMediaForm); }} className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover flex items-center gap-2 shadow-md transition-all w-fit">
                                    <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span> {showMediaForm ? 'Cancel' : 'Upload New Photo'}
                                </button>
                                {showMediaForm && (
                                    <form onSubmit={createMedia} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                        <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-3 mb-6">Upload Photo Entry</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Upload Image File</label>
                                                <input type="file" required accept="image/*" onChange={e => setMediaForm({...mediaForm, file: e.target.files[0]})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Title / Description</label>
                                                <input type="text" required value={mediaForm.title} onChange={e => setMediaForm({...mediaForm, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Display Date (e.g. April 2026)</label>
                                                <input type="text" value={mediaForm.date} onChange={e => setMediaForm({...mediaForm, date: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            
                                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Category Flag</label>
                                                    <select value={mediaForm.isCustomCategory ? 'Custom' : mediaForm.category} onChange={e => {
                                                        if (e.target.value === 'Custom') setMediaForm({...mediaForm, isCustomCategory: true});
                                                        else setMediaForm({...mediaForm, isCustomCategory: false, category: e.target.value});
                                                    }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                                                        <option value="Events">Events</option>
                                                        <option value="Programmes">Programmes</option>
                                                        <option value="Community">Community</option>
                                                        <option value="Visitors">Visitors</option>
                                                        <option value="MoU">MoU</option>
                                                        <option value="Custom">-- Custom Category --</option>
                                                    </select>
                                                </div>
                                                {mediaForm.isCustomCategory && (
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-2">Custom Category</label>
                                                        <input type="text" required placeholder="Type custom category name..." value={mediaForm.customCategory} onChange={e => setMediaForm({...mediaForm, customCategory: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-8 flex justify-end">
                                            <button type="submit" className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-sm">{editingId ? 'Save Changes' : 'Publish Photo'}</button>
                                        </div>
                                    </form>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    {mediaItems.length === 0 ? <p className="col-span-full py-8 text-center text-gray-400 font-medium">No photos found.</p> : mediaItems.map(item => (
                                        <div key={item._id} className="group flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
                                            <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-all">
                                                <button type="button" onClick={(e) => { e.stopPropagation(); openEditForm('media', item); }} className="bg-blue-500/80 hover:bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md">
                                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                                </button>
                                                <button type="button" onClick={(e) => { e.stopPropagation(); deleteRecord('media', item._id); }} className="bg-black/50 hover:bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md">
                                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                                </button>
                                            </div>
                                            <div className="aspect-[4/3] bg-gray-100 relative">
                                                <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                                                <div className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">{item.category}</div>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-headline font-bold text-gray-800 text-sm mb-1 line-clamp-2 leading-snug">{item.title}</h4>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{item.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SUBTAB: VIDEOS */}
                        {mediaSubTab === 'videos' && (
                            <div className="space-y-6 animate-in fade-in">
                                <button onClick={() => { if (!showVideoForm) setEditingId(null); setShowVideoForm(!showVideoForm); }} className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover flex items-center gap-2 shadow-md transition-all w-fit">
                                    <span className="material-symbols-outlined text-[18px]">video_call</span> {showVideoForm ? 'Cancel' : 'Add New Video'}
                                </button>
                                {showVideoForm && (
                                    <form onSubmit={createVideo} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                        <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-3 mb-6">Upload Video Metadata</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Upload Thumbnail Image</label>
                                                <input type="file" accept="image/*" onChange={e => setVideoForm({...videoForm, file: e.target.files[0]})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Video Link (YouTube URL)</label>
                                                <input type="url" required value={videoForm.link} onChange={e => setVideoForm({...videoForm, link: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Video Title</label>
                                                <input type="text" required value={videoForm.title} onChange={e => setVideoForm({...videoForm, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Duration (e.g. 5:30)</label>
                                                <input type="text" value={videoForm.duration} onChange={e => setVideoForm({...videoForm, duration: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                                <textarea rows="3" required value={videoForm.desc} onChange={e => setVideoForm({...videoForm, desc: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"></textarea>
                                            </div>
                                        </div>
                                        <div className="mt-8 flex justify-end">
                                            <button type="submit" className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-sm">{editingId ? 'Save Changes' : 'Publish Video'}</button>
                                        </div>
                                    </form>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {videos.length === 0 ? <p className="col-span-full py-8 text-center text-gray-400 font-medium">No videos found.</p> : videos.map(vid => (
                                        <div key={vid._id} className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                            <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-all">
                                                <button type="button" onClick={(e) => { e.stopPropagation(); openEditForm('video', vid); }} className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                                </button>
                                                <button type="button" onClick={(e) => { e.stopPropagation(); deleteRecord('video', vid._id); }} className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                                </button>
                                            </div>
                                            <div className="aspect-video relative overflow-hidden bg-gray-100">
                                                <img src={vid.thumb} className="w-full h-full object-cover" alt="Video" />
                                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-white opacity-80 border-2 border-white rounded-full">play_arrow</span></div>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold text-gray-800 text-base mb-1 line-clamp-2">{vid.title}</h4>
                                                <p className="text-gray-500 text-xs line-clamp-2">{vid.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SUBTAB: PUBLICATIONS */}
                        {mediaSubTab === 'publications' && (
                            <div className="space-y-6 animate-in fade-in">
                                <button onClick={() => { if (!showPubForm) setEditingId(null); setShowPubForm(!showPubForm); }} className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover flex items-center gap-2 shadow-md transition-all w-fit">
                                    <span className="material-symbols-outlined text-[18px]">library_books</span> {showPubForm ? 'Cancel' : 'Add New Publication'}
                                </button>
                                {showPubForm && (
                                    <form onSubmit={createPub} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                        <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-3 mb-6">Upload Publication</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Upload Cover Image</label>
                                                <input type="file" accept="image/*" onChange={e => setPubForm({...pubForm, imgFile: e.target.files[0]})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Upload PDF Document</label>
                                                <input type="file" accept="application/pdf" onChange={e => setPubForm({...pubForm, pdfFile: e.target.files[0]})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Publication Title</label>
                                                <input type="text" value={pubForm.title} onChange={e => setPubForm({...pubForm, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            <div className="flex items-center gap-3 mt-8">
                                                <input type="checkbox" id="soonCheck" checked={pubForm.soon} onChange={e => setPubForm({...pubForm, soon: e.target.checked})} className="w-5 h-5 accent-primary rounded cursor-pointer" />
                                                <label htmlFor="soonCheck" className="text-sm font-bold text-gray-700 cursor-pointer">Mark as "Coming Soon"</label>
                                            </div>
                                        </div>
                                        <div className="mt-8 flex justify-end">
                                            <button type="submit" className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-sm">{editingId ? 'Save Changes' : 'Publish Document'}</button>
                                        </div>
                                    </form>
                                )}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    {publications.length === 0 ? <p className="col-span-full py-8 text-center text-gray-400 font-medium">No publications found.</p> : publications.map(pub => (
                                        <div key={pub._id} className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                            <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-all">
                                                <button type="button" onClick={(e) => { e.stopPropagation(); openEditForm('pub', pub); }} className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                                </button>
                                                <button type="button" onClick={(e) => { e.stopPropagation(); deleteRecord('publication', pub._id); }} className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                                </button>
                                            </div>
                                            <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center">
                                                {pub.img ? <img src={pub.img} className="w-full h-full object-cover" alt="Cover" /> : <span className="material-symbols-outlined text-4xl text-gray-300">book</span>}
                                                {pub.soon && <div className="absolute inset-0 bg-black/50 flex items-center justify-center uppercase tracking-widest text-white font-bold text-xs">Soon</div>}
                                            </div>
                                            <div className="p-3 text-center border-t border-gray-100">
                                                <h4 className="font-bold text-sm text-gray-700 truncate">{pub.title || 'Untitled'}</h4>
                                                {pub.pdf && !pub.soon && <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-bold hover:underline mt-1 inline-block">View PDF</a>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SUBTAB: PRESS */}
                        {mediaSubTab === 'press' && (
                            <div className="space-y-6 animate-in fade-in">
                                <button onClick={() => { if (!showPressForm) setEditingId(null); setShowPressForm(!showPressForm); }} className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover flex items-center gap-2 shadow-md transition-all w-fit">
                                    <span className="material-symbols-outlined text-[18px]">newspaper</span> {showPressForm ? 'Cancel' : 'Add New Press Coverage'}
                                </button>
                                {showPressForm && (
                                    <form onSubmit={createPress} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                        <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-3 mb-6">Press Record Details</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Media Outlet Name</label>
                                                <input type="text" required value={pressForm.outlet} onChange={e => setPressForm({...pressForm, outlet: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Article Headline</label>
                                                <input type="text" required value={pressForm.headline} onChange={e => setPressForm({...pressForm, headline: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Article URL</label>
                                                <input type="url" value={pressForm.url} onChange={e => setPressForm({...pressForm, url: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Published Date</label>
                                                <input type="text" value={pressForm.date} onChange={e => setPressForm({...pressForm, date: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                            </div>
                                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Border Tag & Color Options</label>
                                                    <select value={pressForm.isCustomTag ? 'Custom' : pressForm.tag} onChange={e => {
                                                        if (e.target.value === 'Custom') setPressForm({...pressForm, isCustomTag: true});
                                                        else {
                                                            const colMap = { 'ICOE': 'border-primary', 'Women': 'border-secondary-container', 'Youth': 'border-blue-500' };
                                                            setPressForm({...pressForm, isCustomTag: false, tag: e.target.value, color: colMap[e.target.value] || 'border-gray-500'});
                                                        }
                                                    }} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                                                        <option value="ICOE">ICOE</option>
                                                        <option value="Women">Women</option>
                                                        <option value="Youth">Youth</option>
                                                        <option value="Custom">-- Custom Tag --</option>
                                                    </select>
                                                </div>
                                                {pressForm.isCustomTag && (
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-2">Custom Tag Name</label>
                                                        <input type="text" required placeholder="Custom Tag" value={pressForm.customTag} onChange={e => setPressForm({...pressForm, customTag: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-8 flex justify-end">
                                            <button type="submit" className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover transition-colors shadow-sm">{editingId ? 'Save Changes' : 'Publish Press Record'}</button>
                                        </div>
                                    </form>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {press.length === 0 ? <p className="col-span-full py-8 text-center text-gray-400 font-medium">No press records found.</p> : press.map(p => (
                                        <div key={p._id} className={`group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 ${p.color} relative pr-12`}>
                                            <div className="absolute top-4 right-4 flex gap-1">
                                                <button type="button" onClick={() => openEditForm('press', p)} className="bg-gray-100 hover:bg-blue-500 text-gray-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                                                    <span className="material-symbols-outlined text-[16px]">edit</span>
                                                </button>
                                                <button type="button" onClick={() => deleteRecord('press', p._id)} className="bg-gray-100 hover:bg-red-500 text-gray-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                                                    <span className="material-symbols-outlined text-[16px]">delete</span>
                                                </button>
                                            </div>
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="font-bold text-primary">{p.outlet}</div>
                                                <span className="text-[10px] uppercase font-bold tracking-widest bg-gray-100 px-2 py-1 rounded">{p.tag}</span>
                                            </div>
                                            <h4 className="text-sm font-medium italic text-gray-600 mb-2">"{p.headline}"</h4>
                                            <p className="text-xs text-gray-400">{p.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ---------- LIVE SESSIONS TAB ---------- */}
                {activeTab === 'live_sessions' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="flex justify-between items-center">
                            <h3 className="font-headline font-bold text-2xl text-gray-800">Live Sessions</h3>
                            <button onClick={() => { if (!showLiveSessionForm) setEditingId(null); setShowLiveSessionForm(!showLiveSessionForm); }} className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover flex items-center gap-2 shadow-md transition-all">
                                <span className="material-symbols-outlined text-[18px]">add</span> {showLiveSessionForm ? 'Cancel' : 'Schedule Session'}
                            </button>
                        </div>

                        {showLiveSessionForm && (
                            <form onSubmit={createLiveSession} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-3 mb-6">Schedule New Live Session</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                                        <input type="text" required value={liveSessionForm.title} onChange={e => setLiveSessionForm({...liveSessionForm, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Meeting Link (URL) *</label>
                                        <input type="url" required value={liveSessionForm.meetingLink} onChange={e => setLiveSessionForm({...liveSessionForm, meetingLink: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Speaker Name</label>
                                        <input type="text" value={liveSessionForm.speaker} onChange={e => setLiveSessionForm({...liveSessionForm, speaker: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">In Collaboration With</label>
                                        <input type="text" value={liveSessionForm.collaboration} onChange={e => setLiveSessionForm({...liveSessionForm, collaboration: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                                        <input type="text" placeholder="e.g. 25 Oct 2026" value={liveSessionForm.date} onChange={e => setLiveSessionForm({...liveSessionForm, date: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Time</label>
                                        <input type="text" placeholder="e.g. 10:00 AM" value={liveSessionForm.time} onChange={e => setLiveSessionForm({...liveSessionForm, time: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Cost (₹) - 0 for Free</label>
                                        <input type="number" min="0" value={liveSessionForm.cost} onChange={e => setLiveSessionForm({...liveSessionForm, cost: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                        <textarea rows="3" value={liveSessionForm.description} onChange={e => setLiveSessionForm({...liveSessionForm, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"></textarea>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button type="submit" className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-sm">{editingId ? 'Save Changes' : 'Save Live Session'}</button>
                                </div>
                            </form>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {liveSessions.length === 0 ? (
                                <p className="col-span-full py-8 text-center text-gray-400 font-medium">No live sessions scheduled.</p>
                            ) : (
                                liveSessions.map(session => (
                                    <div key={session._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative">
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span> LIVE</span>
                                                <div className="flex gap-2">
                                                    <button onClick={() => openEditForm('live-session', session)} className="text-gray-300 hover:text-blue-500 transition-colors p-1"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                                    <button onClick={() => deleteRecord('live-session', session._id)} className="text-gray-300 hover:text-red-500 transition-colors p-1"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                                                </div>
                                            </div>
                                            <h4 className="font-headline font-bold text-xl text-gray-800 mb-2">{session.title}</h4>
                                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{session.description}</p>
                                            
                                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                                                {session.speaker && <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">person</span> {session.speaker}</div>}
                                                {session.date && <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">event</span> {session.date} {session.time}</div>}
                                                {session.collaboration && <div className="flex items-center gap-2 text-primary"><span className="material-symbols-outlined text-[16px]">handshake</span> {session.collaboration}</div>}
                                            </div>

                                            <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-4">
                                                <div className="font-headline font-bold text-2xl text-gray-800">
                                                    {Number(session.cost) === 0 ? 'Free' : `₹${session.cost}`}
                                                </div>
                                                <a href={session.meetingLink} target="_blank" rel="noreferrer" className="text-sm font-bold text-primary hover:underline">Join Link</a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

            </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
