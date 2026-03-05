const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'www');

// Create www folder
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}

// Folders and files to copy
const itemsToCopy = [
    'css',
    'js',
    'img',
    'screenshots',
    'favicon.svg',
    'CNAME',
    'robots.txt',
    'sitemap.xml',
    'manifest.json'
];

// Read all HTML files in the root
const filesInRoot = fs.readdirSync(srcDir);
filesInRoot.forEach(file => {
    if (file.endsWith('.html')) {
        itemsToCopy.push(file);
    }
});

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else if (exists) {
        fs.copyFileSync(src, dest);
    }
}

itemsToCopy.forEach(item => {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    if (fs.existsSync(srcPath)) {
        copyRecursiveSync(srcPath, destPath);
        console.log(`Copied ${item} to www/`);
    } else {
        console.warn(`Warning: ${item} not found in root directory.`);
    }
});

console.log('Build complete! Static site copied to www/');
