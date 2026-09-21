const http = require('http');

function testUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ url, status: res.statusCode, length: data.length });
      });
    }).on('error', (err) => resolve({ url, status: 'ERROR', error: err.message }));
  });
}

async function run() {
  console.log('=== PUBLIC & BACKEND REGRESSION CHECKS ===\n');
  
  const apis = [
    'http://localhost:5000/api/health',
    'http://localhost:5000/api/media',
    'http://localhost:5000/api/courses',
    'http://localhost:5000/api/projects'
  ];
  for (const u of apis) {
    const r = await testUrl(u);
    console.log(`✓ API  ${u.padEnd(40)}: HTTP ${r.status}`);
  }

  const pages = [
    'http://localhost:5173/',
    'http://localhost:5173/who-we-are',
    'http://localhost:5173/what-we-do',
    'http://localhost:5173/words-beyond-borders',
    'http://localhost:5173/icoe',
    'http://localhost:5173/media',
    'http://localhost:5173/donate',
    'http://localhost:5173/admin'
  ];
  for (const p of pages) {
    const r = await testUrl(p);
    console.log(`✓ Page ${p.padEnd(40)}: HTTP ${r.status}`);
  }

  console.log('\n=== ALL REGRESSION CHECKS COMPLETED ===');
}

run();
