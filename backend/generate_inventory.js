const fs = require('fs');

const routeFiles = fs.readdirSync('routes').filter(f => f !== 'index.js');
let inventory = '# Route Inventory\n\n| METHOD | PATH | ROUTE FILE | AUTH | ROLE |\n|---|---|---|---|---|\n';

routeFiles.forEach(file => {
    const content = fs.readFileSync('routes/' + file, 'utf8');
    const routeRegex = /router\.(get|post|put|delete|patch)\(['"`](.+?)['"`](.*?),\s*async/g;
    let match;
    while ((match = routeRegex.exec(content)) !== null) {
        const method = match[1].toUpperCase();
        const path = match[2];
        const middlewares = match[3];
        
        let auth = middlewares.includes('verifyToken') ? 'Yes' : 'No';
        
        let role = 'Any';
        const roleMatch = middlewares.match(/restrictTo\(([^)]+)\)/);
        if (roleMatch) {
            role = roleMatch[1].replace(/['"\s]/g, '');
        }
        
        inventory += `| ${method} | ${path} | \`${file}\` | ${auth} | ${role} |\n`;
    }
    
    // Also catch non-async routes like /api/download/:filename
    const routeRegexSync = /router\.(get|post|put|delete|patch)\(['"`](.+?)['"`](?!.*async)(.*?),.*?=>/g;
    while ((match = routeRegexSync.exec(content)) !== null) {
        const method = match[1].toUpperCase();
        const path = match[2];
        const middlewares = match[3];
        
        let auth = middlewares.includes('verifyToken') ? 'Yes' : 'No';
        
        let role = 'Any';
        const roleMatch = middlewares.match(/restrictTo\(([^)]+)\)/);
        if (roleMatch) {
            role = roleMatch[1].replace(/['"\s]/g, '');
        }
        
        inventory += `| ${method} | ${path} | \`${file}\` | ${auth} | ${role} |\n`;
    }
});

fs.writeFileSync('route_inventory.md', inventory);
