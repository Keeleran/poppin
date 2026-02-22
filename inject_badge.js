const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== '404.html');

const garnetBadge = `
    <!-- GarnetGrid Product Acknowledgement -->
    <div style="text-align:center;padding:1.2rem 0 1rem;opacity:0.7;margin-top:auto;">
        <a href="https://garnetgrid.com" target="_blank" rel="noopener"
            style="color:#aaa;font-size:0.72rem;text-decoration:none;display:inline-flex;align-items:center;gap:4px"
            title="Built by GarnetGrid">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"
                style="width:14px;height:14px;min-width:14px">
                <defs>
                    <linearGradient id="gf1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#9b1b30" />
                        <stop offset="100%" stop-color="#d4374a" />
                    </linearGradient>
                    <linearGradient id="gf2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#e63946" />
                        <stop offset="100%" stop-color="#7a1525" />
                    </linearGradient>
                    <linearGradient id="gf3" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stop-color="#ff6b6b" />
                        <stop offset="100%" stop-color="#c0392b" />
                    </linearGradient>
                </defs>
                <style>
                    @keyframes facet-shimmer {
                        0%, 100% { opacity: 0 }
                        15% { opacity: .4 }
                        30% { opacity: 0 }
                    }
                    @keyframes gem-rotate {
                        0%, 100% { transform: rotate(0deg) scale(1) }
                        25% { transform: rotate(3deg) scale(1.02) }
                        75% { transform: rotate(-3deg) scale(1.02) }
                    }
                    @keyframes sparkle-pop {
                        0%, 100% { opacity: 0; transform: scale(0) }
                        50% { opacity: 1; transform: scale(1) }
                    }
                    .gem-body { transform-origin: 12px 12px; animation: gem-rotate 4s ease-in-out infinite }
                    .shimmer-1 { animation: facet-shimmer 3s ease-in-out infinite }
                    .shimmer-2 { animation: facet-shimmer 3s ease-in-out infinite; animation-delay: 1s }
                    .shimmer-3 { animation: facet-shimmer 3s ease-in-out infinite; animation-delay: 2s }
                    .sparkle { transform-origin: center; animation: sparkle-pop 2.5s ease-in-out infinite }
                    .sparkle:nth-child(2) { animation-delay: .8s }
                    .sparkle:nth-child(3) { animation-delay: 1.6s }
                </style>
                <g class="gem-body">
                    <polygon points="12,22 4,10 20,10" fill="url(#gf1)" />
                    <polygon points="4,10 8,3 12,6 12,10" fill="url(#gf2)" />
                    <polygon points="20,10 16,3 12,6 12,10" fill="url(#gf3)" />
                    <polygon points="8,3 12,1.5 16,3 12,6" fill="#e63946" />
                    <polygon points="4,10 12,10 12,22" fill="url(#gf2)" opacity=".7" />
                    <polygon points="20,10 12,10 12,22" fill="url(#gf1)" opacity=".8" />
                    <polygon class="shimmer-1" points="4,10 12,10 12,22" fill="white" opacity="0" />
                    <polygon class="shimmer-2" points="20,10 12,10 12,22" fill="white" opacity="0" />
                    <polygon class="shimmer-3" points="8,3 12,1.5 16,3 12,6" fill="white" opacity="0" />
                </g>
                <g>
                    <circle class="sparkle" cx="3" cy="5" r=".8" fill="white" opacity="0" />
                    <circle class="sparkle" cx="21" cy="4" r=".6" fill="white" opacity="0" />
                    <circle class="sparkle" cx="22" cy="16" r=".7" fill="white" opacity="0" />
                </g>
            </svg>
            Built by GarnetGrid
        </a>
    </div>
</body>`;

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    if (!content.includes('Built by GarnetGrid')) {
        content = content.replace('</body>', garnetBadge);
        fs.writeFileSync(path.join(dir, file), content);
        console.log(`Injected GarnetGrid badge into ${file}`);
    }
}
