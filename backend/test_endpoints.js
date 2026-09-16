const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const API = 'http://localhost:5000';
const SECRET = process.env.JWT_SECRET;

// Generate test tokens
const adminToken = jwt.sign({ id: '123', role: 'SUPER_ADMIN' }, SECRET, { expiresIn: '1h' });
const userToken = jwt.sign({ id: '456', role: 'STUDENT' }, SECRET, { expiresIn: '1h' });

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

    // 1. Public GET endpoint
    let res = await fetch(`${API}/api/projects`);
    assert(res.ok, "Public GET /api/projects works");

    // 2. Protected endpoint (no auth)
    res = await fetch(`${API}/api/donations`);
    assert(res.status === 401, `Protected GET /api/donations without token returns 401 (got ${res.status})`);

    // 3. Protected endpoint (unauthorized role)
    res = await fetch(`${API}/api/donations`, { headers: { 'Authorization': `Bearer ${userToken}` } });
    assert(res.status === 403, `Protected GET /api/donations with STUDENT token returns 403 (got ${res.status})`);

    // 4. Protected endpoint (authorized role)
    res = await fetch(`${API}/api/donations`, { headers: { 'Authorization': `Bearer ${adminToken}` } });
    assert(res.status === 200 || res.status === 304, `Protected GET /api/donations with SUPER_ADMIN token works (got ${res.status})`);

    // 5. Private file static access
    const testFilePath = path.join(__dirname, 'uploads', 'private', 'test_secret.txt');
    fs.writeFileSync(testFilePath, 'This is a secret');
    res = await fetch(`${API}/uploads/private/test_secret.txt`);
    assert(res.status === 403 || res.status === 404, `Direct static access to /uploads/private/test_secret.txt is denied (got ${res.status})`);

    // 6. Private file authenticated access
    res = await fetch(`${API}/api/private-uploads/test_secret.txt`, { headers: { 'Authorization': `Bearer ${adminToken}` } });
    assert(res.ok, `Authenticated access to /api/private-uploads/test_secret.txt works (got ${res.status})`);

    // 7. Path traversal attempt
    res = await fetch(`${API}/api/private-uploads/..%2ftest_secret.txt`, { headers: { 'Authorization': `Bearer ${adminToken}` } });
    assert(res.status === 400 || res.status === 404, `Path traversal attempt is blocked (got ${res.status})`);

    // Clean up
    fs.unlinkSync(testFilePath);

    console.log(`\nTests completed: ${passed} passed, ${failed} failed.`);
    process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(e => {
    console.error(e);
    process.exit(1);
});
