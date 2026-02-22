const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const footerAck = `\n                <p class="built-by" style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px;">A GarnetGrid Product. Built by <a href="https://garnetgrid.com" target="_blank" rel="noopener noreferrer" style="color:var(--text-muted); text-decoration:underline;">GarnetGrid</a>.</p>`;

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Add GarnetGrid Acknowledgement to footer
    if (content.includes('&copy; 2026 POPPIN LLC. All rights reserved.</p>') && !content.includes('A GarnetGrid Product')) {
        content = content.replace(
            '&copy; 2026 POPPIN LLC. All rights reserved.</p>',
            '&copy; 2026 POPPIN LLC. All rights reserved.</p>' + footerAck
        );
    } else if (content.includes('class="text-muted" style="margin-top: 2rem;"') && !content.includes('A GarnetGrid Product')) {
        // Fallback for pages without standard footer
        content = content.replace(
            '</p>\n    </div>\n</body>',
            '</p>' + footerAck + '\n    </div>\n</body>'
        );
    }

    // SEO Meta Tags missing?
    if (!content.includes('<meta name="description"')) {
        let titleMatch = content.match(/<title>(.*?)<\/title>/);
        let title = titleMatch ? titleMatch[1] : "POPPIN";
        const metaDesc = `\n    <meta name="description" content="Join ${title} - The premium membership-based platform for NYC nightlife. See live crowds, vote on vibes, and discover exclusive events.">`;
        content = content.replace(/<title>.*?<\/title>/, `$&${metaDesc}`);
    }

    // Cybersecurity: Basic Security Headers via Meta (CSP, X-UA)
    if (!content.includes('Content-Security-Policy')) {
        const csp = `\n    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://images.unsplash.com https://garnetgrid.com https://poppin.garnetgrid.com; connect-src 'self' https://formspree.io; form-action 'self' https://formspree.io">`;
        content = content.replace(/<meta name="viewport"/, `${csp}\n    <meta name="viewport"`);
    }

    // Open Graph
    if (!content.includes('og:title')) {
        let titleMatch = content.match(/<title>(.*?)<\/title>/);
        let title = titleMatch ? titleMatch[1] : "POPPIN";
        const og = `\n    <meta property="og:title" content="${title}">\n    <meta property="og:type" content="website">\n    <meta property="og:image" content="https://poppin.garnetgrid.com/img/icon-512.png">\n    <meta name="twitter:card" content="summary">\n    <meta name="twitter:title" content="${title}">`;
        content = content.replace(/<\/head>/, `${og}\n</head>`);
    }

    fs.writeFileSync(path.join(dir, file), content);
    console.log(`Updated SEO/Security/Footer in ${file}`);
}
