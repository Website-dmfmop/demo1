const fs = require('fs');

const path = 'd:\\DMF Website\\demo1\\src\\pages\\Admin.jsx';
let content = fs.readFileSync(path, 'utf8');

const startMarker = "  const createDiplomaCourse = async (e) => {";
const endMarker = "  const createPress = async (e) => {";

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
    console.error("Markers not found!");
    process.exit(1);
}

const newContent = `  const createDiplomaCourse = async (e) => {
      e.preventDefault();
      try {
          const url = editingId ? \`\${API_URL}/api/diploma-courses/\${editingId}\` : \`\${API_URL}/api/diploma-courses\`;
          const method = editingId ? 'PUT' : 'POST';
          const res = await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(diplomaCourseForm)
          });
          if (res.ok) {
              setDiplomaCourseForm({ courseName: '', description: '', category: 'General' });
              setShowDiplomaCourseForm(false);
              setEditingId(null);
              fetchData();
          } else {
              alert('Failed to save diploma course');
          }
      } catch (err) {
          alert('Error saving diploma course');
      }
  };

  const createCompetitiveExam = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('examName', competitiveExamForm.examName);
      formData.append('description', competitiveExamForm.description);
      formData.append('category', competitiveExamForm.category);
      if (competitiveExamForm.brochure) formData.append('brochure', competitiveExamForm.brochure);

      try {
          const url = editingId ? \`\${API_URL}/api/competitive-exams/\${editingId}\` : \`\${API_URL}/api/competitive-exams\`;
          const method = editingId ? 'PUT' : 'POST';
          const res = await fetch(url, {
              method,
              body: formData
          });
          if (res.ok) {
              setCompetitiveExamForm({ examName: '', description: '', category: 'General', brochure: null });
              setShowCompetitiveExamForm(false);
              setEditingId(null);
              fetchData();
          } else {
              alert('Failed to save competitive exam');
          }
      } catch (err) {
          alert('Error saving competitive exam');
      }
  };

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const res = await fetch(\`\${API_URL}/api/login\`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ loginId, password })
          });
          const data = await res.json();
          if (res.ok) {
              sessionStorage.setItem('adminToken', data.token);
              sessionStorage.setItem('adminUser', JSON.stringify(data.user));
              setCurrentUser(data.user);
              setIsAuthenticated(true);
          } else {
              alert(data.error || 'Invalid credentials');
          }
      } catch (err) {
          alert('Login failed');
      }
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('adminUser');
      setCurrentUser(null);
      setPassword('');
      setLoginId('');
  };

  const createMedia = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', mediaForm.title);
      formData.append('date', mediaForm.date);
      formData.append('category', mediaForm.isCustomCategory ? mediaForm.customCategory : mediaForm.category);
      if (mediaForm.file) formData.append('file', mediaForm.file);

      try {
          const url = editingId ? \`\${API_URL}/api/media/\${editingId}\` : \`\${API_URL}/api/media\`;
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
          const url = editingId ? \`\${API_URL}/api/videos/\${editingId}\` : \`\${API_URL}/api/videos\`;
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
          const url = editingId ? \`\${API_URL}/api/publications/\${editingId}\` : \`\${API_URL}/api/publications\`;
          const res = await fetch(url, { method: editingId ? 'PUT' : 'POST', body: formData });
          if (res.ok) {
              setPubForm({ title: '', soon: false, imgFile: null, pdfFile: null });
              setShowPubForm(false);
              setEditingId(null);
              fetchData();
          }
      } catch (err) { alert('Error saving publication'); }
  };

`;

content = content.substring(0, startIdx) + newContent + content.substring(endIdx);

fs.writeFileSync(path, content, 'utf8');
console.log("Patch applied successfully.");
