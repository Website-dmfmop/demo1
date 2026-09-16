const jwt = require('jsonwebtoken');
require('dotenv').config();

const API = 'http://localhost:5000';
const SECRET = process.env.JWT_SECRET;
const adminToken = jwt.sign({ id: '123', role: 'SUPER_ADMIN' }, SECRET, { expiresIn: '1h' });

async function runTests() {
    let passed = 0;
    let failed = 0;

    function assert(condition, message) {
        if (condition) {
            console.log(`✅ PASS: ${message}`);
            passed++;
        } else {
            console.error(`❌ FAIL: ${message}`);
            failed++;
        }
    }

    const testRoute = async (path, methods = ['GET', 'POST', 'PUT', 'DELETE']) => {
        if (methods.includes('GET')) {
            let res = await fetch(`${API}${path}`, { headers: { 'Authorization': `Bearer ${adminToken}` } });
            assert(res.status === 200, `GET ${path} with admin token works (got ${res.status})`);
            
            res = await fetch(`${API}${path}`);
            assert(res.status === 401, `GET ${path} without token returns 401 (got ${res.status})`);
        }

        if (methods.includes('POST')) {
            // Test missing CAPTCHA or missing data (we expect 400 either way)
            let res = await fetch(`${API}${path}`, { method: 'POST', body: JSON.stringify({}), headers: { 'Content-Type': 'application/json' } });
            assert(res.status === 400, `POST ${path} missing captcha/data returns 400 (got ${res.status})`);
        }

        if (methods.includes('PUT')) {
            // Test invalid ID format (validateObjectId should catch it)
            let res = await fetch(`${API}${path}/invalid-id/status`, { method: 'PUT', headers: { 'Authorization': `Bearer ${adminToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Approved' }) });
            assert(res.status === 400, `PUT ${path}/invalid-id/status invalid ObjectId returns 400 (got ${res.status})`);
        }
        
        if (methods.includes('DELETE')) {
            let res = await fetch(`${API}${path}/invalid-id`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${adminToken}` } });
            assert(res.status === 400, `DELETE ${path}/invalid-id invalid ObjectId returns 400 (got ${res.status})`);
        }
    };

    await testRoute('/api/admissions');
    await testRoute('/api/competitive-exam-admissions');
    await testRoute('/api/joinees');

    console.log(`\nTests completed: ${passed} passed, ${failed} failed.`);
    process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(e => {
    console.error(e);
    process.exit(1);
});
