const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const API = 'http://localhost:5000';
const SECRET = process.env.JWT_SECRET;
const adminToken = jwt.sign({ id: '123', role: 'SUPER_ADMIN' }, SECRET, { expiresIn: '1h' });

async function testUpload() {
    fs.writeFileSync('test_upload.txt', 'This is a test upload');

    // Test Private Upload via /api/projects
    const formPrivate = new FormData();
    formPrivate.append('title', 'Test Project');
    formPrivate.append('description', 'Desc');
    formPrivate.append('category', 'Education');
    formPrivate.append('pitchDeck', fs.createReadStream('test_upload.txt'));

    const resPrivate = await fetch(`${API}/api/projects`, {
        method: 'POST',
        headers: { 'Authorization': \`Bearer \${adminToken}\` },
        body: formPrivate
    });

    const dataPrivate = await resPrivate.json();
    console.log('Private Upload Response:', resPrivate.status, dataPrivate);

    fs.unlinkSync('test_upload.txt');
}

testUpload().catch(console.error);
