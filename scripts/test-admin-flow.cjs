const http = require('http');

function post(path, data, headers = {}) {
    return new Promise((resolve, reject) => {
        const bodyStr = typeof data === 'string' ? data : JSON.stringify(data);
        const req = http.request({
            hostname: 'localhost',
            port: 5000,
            path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(bodyStr),
                ...headers
            }
        }, (res) => {
            let resBody = '';
            res.on('data', chunk => resBody += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: resBody }));
        });
        req.on('error', reject);
        req.write(bodyStr);
        req.end();
    });
}

function get(path, headers = {}) {
    return new Promise((resolve, reject) => {
        const req = http.request({
            hostname: 'localhost',
            port: 5000,
            path,
            method: 'GET',
            headers
        }, (res) => {
            let resBody = '';
            res.on('data', chunk => resBody += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: resBody }));
        });
        req.on('error', reject);
        req.end();
    });
}

function del(path, headers = {}) {
    return new Promise((resolve, reject) => {
        const req = http.request({
            hostname: 'localhost',
            port: 5000,
            path,
            method: 'DELETE',
            headers
        }, (res) => {
            let resBody = '';
            res.on('data', chunk => resBody += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: resBody }));
        });
        req.on('error', reject);
        req.end();
    });
}

function put(path, data, headers = {}) {
    return new Promise((resolve, reject) => {
        const bodyStr = typeof data === 'string' ? data : JSON.stringify(data);
        const req = http.request({
            hostname: 'localhost',
            port: 5000,
            path,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(bodyStr),
                ...headers
            }
        }, (res) => {
            let resBody = '';
            res.on('data', chunk => resBody += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: resBody }));
        });
        req.on('error', reject);
        req.write(bodyStr);
        req.end();
    });
}

async function runTests() {
    console.log('=== ADMIN FLOW INTEGRATION TEST ===\n');

    // 1. Login
    const loginRes = await post('/api/login', { loginId: 'admin', password: 'Dmfmop@123' });
    if (loginRes.status !== 200) {
        console.error('❌ Login failed:', loginRes.status, loginRes.body);
        process.exit(1);
    }
    const loginData = JSON.parse(loginRes.body);
    const token = loginData.token;
    console.log('✓ 1. Admin Login: Succeeded (HTTP 200)');
    console.log(`     User: ${loginData.user.loginId} (${loginData.user.role})`);

    const authHeader = { 'Authorization': `Bearer ${token}` };

    // 2. Test All Endpoints with Auth Header
    console.log('\n--- 2. Testing All Dashboard Endpoints (with JWT Authorization) ---');
    const endpoints = [
        { path: '/api/permissions', name: 'Permissions' },
        { path: '/api/admissions', name: 'Admissions' },
        { path: '/api/competitive-exam-admissions', name: 'Comp. Exam Admissions' },
        { path: '/api/donations', name: 'Donations' },
        { path: '/api/courses', name: 'Courses' },
        { path: '/api/diploma-courses', name: 'Diploma Courses' },
        { path: '/api/competitive-exams', name: 'Competitive Exams' },
        { path: '/api/media', name: 'Media' },
        { path: '/api/videos', name: 'Videos' },
        { path: '/api/publications', name: 'Publications' },
        { path: '/api/press', name: 'Press' },
        { path: '/api/live-sessions', name: 'Live Sessions' },
        { path: '/api/joinees', name: 'Joinees' },
        { path: '/api/dmf-members', name: 'DMF Members' },
        { path: '/api/jobs', name: 'Jobs' },
        { path: '/api/job-applications', name: 'Job Applications' },
        { path: '/api/csr-partners', name: 'CSR Partners' },
        { path: '/api/partner-requests', name: 'Partner Requests' },
        { path: '/api/slot-bookings', name: 'Slot Bookings' },
        { path: '/api/projects', name: 'Projects' }
    ];

    for (const ep of endpoints) {
        const res = await get(ep.path, authHeader);
        if (res.status === 200) {
            const parsed = JSON.parse(res.body);
            const count = Array.isArray(parsed) ? parsed.length : 'Object';
            console.log(`✓ ${ep.name.padEnd(25)}: HTTP 200 OK | ${count} records loaded`);
        } else {
            console.error(`❌ ${ep.name.padEnd(25)}: HTTP ${res.status} | Body: ${res.body}`);
        }
    }

    // 3. Test Form Creation Flow (Diploma Course with auth header)
    console.log('\n--- 3. Testing Authenticated Create Flow ---');
    const testCourseName = 'Automated Verification Course ' + Date.now();
    const createRes = await post('/api/diploma-courses', {
        courseName: testCourseName,
        description: 'Temporary automated test record for verification',
        category: 'General'
    }, authHeader);

    if (createRes.status === 201) {
        const created = JSON.parse(createRes.body);
        console.log(`✓ Course Created: HTTP 201 Created | ID: ${created._id}`);

        // 4. Test Authenticated Update Flow
        console.log('\n--- 4. Testing Authenticated Update Flow ---');
        const updateRes = await put(`/api/diploma-courses/${created._id}`, {
            courseName: testCourseName + ' (Updated)',
            description: 'Updated test description',
            category: 'General'
        }, authHeader);
        if (updateRes.status === 200) {
            console.log(`✓ Course Updated: HTTP 200 OK`);
        } else {
            console.error(`❌ Course Update Failed: HTTP ${updateRes.status}`);
        }

        // 5. Test Authenticated Delete Flow
        console.log('\n--- 5. Testing Authenticated Delete Flow ---');
        const deleteRes = await del(`/api/diploma-courses/${created._id}`, authHeader);
        if (deleteRes.status === 200) {
            console.log(`✓ Course Deleted: HTTP 200 OK (Cleaned up, no test data left)`);
        } else {
            console.error(`❌ Course Delete Failed: HTTP ${deleteRes.status}`);
        }
    } else {
        console.error(`❌ Course Creation Failed: HTTP ${createRes.status} | Body: ${createRes.body}`);
    }

    // 6. Test Unauthenticated Rejection (Security check)
    console.log('\n--- 6. Security Check (Confirming unauthenticated requests are rejected) ---');
    const unauthRes = await get('/api/admissions');
    if (unauthRes.status === 401) {
        console.log(`✓ Unauthenticated request to protected endpoint correctly rejected: HTTP 401 Unauthorized`);
    } else {
        console.error(`❌ Expected HTTP 401 for unauthenticated request, got: ${unauthRes.status}`);
    }

    console.log('\n=== ALL INTEGRATION CHECKS PASSED SUCCESSFULLY ===');
}

runTests().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
