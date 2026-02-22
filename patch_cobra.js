const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'js', 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Replace Admin
dataContent = dataContent.replace(
    /joined:\s*'2024-06-15',/,
    "joined: '2024-06-15',\n\t\t\tbio: 'Founder & admin. Always on the hunt for the perfect espresso martini.',"
);

// Replace Cobra
dataContent = dataContent.replace(
    /username:\s*'Cobra',[\s\S]*?checkins:/,
    `username: 'Cobra',
\t\t\tdisplayName: 'Cobra',
\t\t\trole: 'member',
\t\t\tavatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
\t\t\ttier: 'Member',
\t\t\tjoined: '2025-01-10',
\t\t\tbio: 'Egyptian nocturnal explorer. If the vibe is right and the music is loud, you\\'ll find me there.',
\t\t\tcheckins:`
);

fs.writeFileSync(dataPath, dataContent);

const profilePath = path.join(__dirname, 'profile.html');
let profileContent = fs.readFileSync(profilePath, 'utf8');

const bioSnippet = `
            <p style="font-size:0.82rem;color:var(--text-muted); margin-top:4px;">Member since \${user.joined || '2025'}</p>
            \${user.bio ? \`<p style="font-size:0.85rem;color:var(--text-main); margin-top:6px; font-style:italic;">"\${user.bio}"</p>\` : ''}
`;

if (!profileContent.includes('user.bio')) {
    profileContent = profileContent.replace(
        /<p style="font-size:0.82rem;color:var\(--text-muted\); margin-top:4px;">Member since \$\{user\.joined \|\| '2025'\}<\/p>/,
        bioSnippet.trim()
    );
    fs.writeFileSync(profilePath, profileContent);
}

console.log("Patched data.js and profile.html successfully.");
