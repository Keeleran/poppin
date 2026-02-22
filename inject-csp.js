const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cspMeta = `    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com https://garnetgrid.com https://poppin.garnetgrid.com; connect-src 'self'">`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if CSP already exists
    if (content.includes('Content-Security-Policy')) {
        console.log(`CSP already in ${file}`);
        return;
    }

    // Inject right after <meta charset="UTF-8">
    content = content.replace(
        /<meta charset="UTF-8">/,
        `<meta charset="UTF-8">\n${cspMeta}`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected CSP into ${file}`);
});
