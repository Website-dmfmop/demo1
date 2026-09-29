const fs = require('fs');

let adminContent = fs.readFileSync('src/pages/Admin.jsx', 'utf8');
let workspaceContent = fs.readFileSync('src/pages/Workspace.jsx', 'utf8');

// For Admin.jsx, remove the Workspace specific tabs from the sidebar
adminContent = adminContent.replace(/<button[^>]+onClick={\(\) => setActiveTab\('tasks'\)}[^>]+>[\s\S]*?<\/button>/, '');
adminContent = adminContent.replace(/<button[^>]+onClick={\(\) => setActiveTab\('attendance'\)}[^>]+>[\s\S]*?<\/button>/, '');
adminContent = adminContent.replace(/<button[^>]+onClick={\(\) => setActiveTab\('daily_tasks'\)}[^>]+>[\s\S]*?<\/button>/, '');
adminContent = adminContent.replace(/<button[^>]+onClick={\(\) => setActiveTab\('leave_requests'\)}[^>]+>[\s\S]*?<\/button>/, '');
adminContent = adminContent.replace(/<button[^>]+onClick={\(\) => setActiveTab\('team'\)}[^>]+>[\s\S]*?<\/button>/, '');
adminContent = adminContent.replace(/<button[^>]+onClick={\(\) => setActiveTab\('directory'\)}[^>]+>[\s\S]*?<\/button>/, '');
adminContent = adminContent.replace(/<button[^>]+onClick={\(\) => setActiveTab\('profile'\)}[^>]+>[\s\S]*?<\/button>/, '');

// Also remove the conditional rendering of Workspace tabs in Admin.jsx main content area
adminContent = adminContent.replace(/{activeTab === 'tasks'.*?\n/g, '');
adminContent = adminContent.replace(/{activeTab === 'attendance'.*?\n/g, '');
adminContent = adminContent.replace(/{activeTab === 'daily_tasks'.*?\n/g, '');
adminContent = adminContent.replace(/{activeTab === 'leave_requests'.*?\n/g, '');
adminContent = adminContent.replace(/{activeTab === 'team'.*?\n/g, '');
adminContent = adminContent.replace(/{activeTab === 'directory'.*?\n/g, '');
adminContent = adminContent.replace(/{activeTab === 'profile'.*?\n/g, '');


// For Workspace.jsx, rename the component
workspaceContent = workspaceContent.replace(/const Admin = \(\) => {/, 'const Workspace = () => {');
workspaceContent = workspaceContent.replace(/export default Admin;/, 'export default Workspace;');
workspaceContent = workspaceContent.replace(/Loading Admin Console.../, 'Loading Workspace Console...');
workspaceContent = workspaceContent.replace(/Admin Login/g, 'Workspace Login');

// Remove Admin specific tabs from Workspace.jsx sidebar
const adminTabs = [
  'admissions', 'live_session_admissions', 'competitive_exam_admissions', 'donations',
  'joinees', 'dmf_members', 'job-applications', 'partner-requests', 'slot-bookings',
  'projects', 'courses', 'diploma_courses', 'competitive_exams', 'media', 'live_sessions', 'jobs'
];

adminTabs.forEach(tab => {
  const regex = new RegExp(`<button[^>]+onClick={\\(\\) => setActiveTab\\('${tab}'\\)}[^>]+>[\\s\\S]*?<\\/button>`, 'g');
  workspaceContent = workspaceContent.replace(regex, '');
  
  const contentRegex = new RegExp(`{activeTab === '${tab}'.*?\\n`, 'g');
  workspaceContent = workspaceContent.replace(contentRegex, '');
});

// Remove the whole blocks of admin conditional renders
workspaceContent = workspaceContent.replace(/{activeTab === 'admissions' && \([\s\S]*?}\)}/g, '');
workspaceContent = workspaceContent.replace(/{activeTab === 'media' && \([\s\S]*?}\)}/g, '');
// For the others, they might be rendered as components or custom logic. Let's do a more robust approach.

fs.writeFileSync('src/pages/Admin.jsx', adminContent);
fs.writeFileSync('src/pages/Workspace.jsx', workspaceContent);

console.log('Migration scripts applied.');
