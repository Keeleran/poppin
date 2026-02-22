const fs = require('fs');
const path = require('path');

const dir = '.';
const filesToProcess = ['js/app.js', 'js/chat.js', 'profile.html', 'inbox.html', 'whos-here.html', 'drinks.html', 'js/data.js'];

// Read data.js to add window.renderAvatar
let dataJsPath = path.join(dir, 'js/data.js');
let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');
if (!dataJsContent.includes('window.renderAvatar')) {
    dataJsContent = `window.renderAvatar = (str) => {
    if(!str) return '?';
    return str.startsWith('http') ? \`<img src="\${str}" alt="avatar" style="width:100%; height:100%; min-width:100%; min-height:100%; border-radius:inherit; object-fit:cover; display:block;">\` : str;
};\n\n` + dataJsContent;
    fs.writeFileSync(dataJsPath, dataJsContent);
}

// Regex to replace avatar template literals with renderAvatar
const replaceAvatar = (file) => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Custom replacements for specific files
    if (file === 'js/app.js') {
        content = content.replace(/\$\{sanitize\(user\.avatar\)\}/g, '${window.renderAvatar(user.avatar)}');
        content = content.replace(/\$\{sanitize\(c\.avatar\)\}/g, '${window.renderAvatar(c.avatar)}');
    }
    
    // Global template replacements
    content = content.replace(/\$\{user\.avatar\}/g, '${window.renderAvatar(user.avatar)}');
    content = content.replace(/\$\{c\.avatar\}/g, '${window.renderAvatar(c.avatar)}');
    content = content.replace(/\$\{msg\.senderAvatar\}/g, '${window.renderAvatar(msg.senderAvatar)}');
    content = content.replace(/\$\{bot\.avatar\}/g, '${window.renderAvatar(bot.avatar)}');
    content = content.replace(/\$\{m\.senderAvatar\}/g, '${window.renderAvatar(m.senderAvatar)}');
    content = content.replace(/\$\{convo\.avatar\}/g, '${window.renderAvatar(convo.avatar)}');
    
    // Fix hardcoded IDs in script blocks
    content = content.replace(/document\.getElementById\('navAvatar'\)\.textContent = user\.avatar;/g, "document.getElementById('navAvatar').innerHTML = window.renderAvatar(user.avatar);");
    
    content = content.replace(/document\.getElementById\('threadAvatar'\)\.textContent = convo \? convo\.avatar \: '\?';/g, "document.getElementById('threadAvatar').innerHTML = convo ? window.renderAvatar(convo.avatar) : '?';");
    
    fs.writeFileSync(path.join(dir, file), content);
    console.log(`Updated ${file}`);
}

filesToProcess.forEach(replaceAvatar);
