/* ============================================
   POPPIN — Core Application JS  v2.1
   Shared UI logic across all pages
   With GarnetGrid badge, legal footer, DM nav
   XSS-safe · Accessible · Vote-persistent
   ============================================ */

/* ---------- XSS Sanitizer ---------- */
function sanitize(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ---------- Feed Image Map ---------- */
const BAR_FEED_IMAGES = {
  lit: 'img/bar-feed-lit.png',
  chill: 'img/bar-feed-chill.png',
  hype: 'img/bar-feed-hype.png',
  music: 'img/bar-feed-music.png',
  waterfront: 'img/bar-feed-waterfront.png',
  brewery: 'img/bar-feed-brewery.png'
};

function getBarFeedImage(bar) {
  const vibe = bar.vibe || 'lit';
  return BAR_FEED_IMAGES[vibe] || BAR_FEED_IMAGES.lit;
}

/* ---------- Borough State Management ---------- */
POPPIN.getActiveBorough = function () {
  return localStorage.getItem('poppin_active_borough') || 'staten_island';
};

POPPIN.setActiveBorough = function (boroughId) {
  localStorage.setItem('poppin_active_borough', boroughId);
  window.location.reload();
};

POPPIN.isLoggedIn = function () {
  return !!this.getCurrentUser();
};

POPPIN.getBoroughName = function () {
  const b = this.NYC_BOROUGHS.find(x => x.id === this.getActiveBorough());
  return b ? b.name : 'NYC';
};

/* ---------- Vote Persistence ---------- */
function getVotedBars() {
  try {
    return JSON.parse(localStorage.getItem('poppin_voted_bars') || '[]');
  } catch { return []; }
}

function markBarVoted(barId) {
  const voted = getVotedBars();
  if (!voted.includes(barId)) {
    voted.push(barId);
    localStorage.setItem('poppin_voted_bars', JSON.stringify(voted));
  }
}

function hasVotedFor(barId) {
  return getVotedBars().includes(barId);
}

/* ---------- GarnetGrid Gem SVG ---------- */
const GARNET_GEM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" style="width:14px;height:14px;min-width:14px"><defs><linearGradient id="gf1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#9b1b30"/><stop offset="100%" stop-color="#d4374a"/></linearGradient><linearGradient id="gf2" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#e63946"/><stop offset="100%" stop-color="#7a1525"/></linearGradient><linearGradient id="gf3" x1="50%" y1="0%" x2="50%" y2="100%"><stop offset="0%" stop-color="#ff6b6b"/><stop offset="100%" stop-color="#c0392b"/></linearGradient></defs><style>@keyframes facet-shimmer{0%,100%{opacity:0}15%{opacity:.9}30%{opacity:0}}@keyframes gem-rotate{0%,100%{transform:rotate(0) scale(1)}25%{transform:rotate(3deg) scale(1.02)}75%{transform:rotate(-3deg) scale(1.02)}}@keyframes sparkle-pop{0%,100%{opacity:0;transform:scale(0)}50%{opacity:1;transform:scale(1)}}.gem-body{transform-origin:12px 12px;animation:gem-rotate 4s ease-in-out infinite}.shimmer-1{animation:facet-shimmer 3s ease-in-out infinite}.shimmer-2{animation:facet-shimmer 3s ease-in-out infinite;animation-delay:1s}.shimmer-3{animation:facet-shimmer 3s ease-in-out infinite;animation-delay:2s}.sparkle{transform-origin:center;animation:sparkle-pop 2.5s ease-in-out infinite}.sparkle:nth-child(2){animation-delay:.8s}.sparkle:nth-child(3){animation-delay:1.6s}</style><g class="gem-body"><polygon points="12,22 4,10 20,10" fill="url(#gf1)"/><polygon points="4,10 8,3 12,6 12,10" fill="url(#gf2)"/><polygon points="20,10 16,3 12,6 12,10" fill="url(#gf3)"/><polygon points="8,3 12,1.5 16,3 12,6" fill="#e63946"/><polygon points="4,10 12,10 12,22" fill="url(#gf2)" opacity=".7"/><polygon points="20,10 12,10 12,22" fill="url(#gf1)" opacity=".8"/><polygon class="shimmer-1" points="4,10 12,10 12,22" fill="white" opacity="0"/><polygon class="shimmer-2" points="20,10 12,10 12,22" fill="white" opacity="0"/><polygon class="shimmer-3" points="8,3 12,1.5 16,3 12,6" fill="white" opacity="0"/></g><g><circle class="sparkle" cx="3" cy="5" r=".8" fill="white" opacity="0"/><circle class="sparkle" cx="21" cy="4" r=".6" fill="white" opacity="0"/><circle class="sparkle" cx="22" cy="16" r=".7" fill="white" opacity="0"/></g></svg>`;

/* ---------- Navbar ---------- */
function renderNavbar(activePage) {
  const user = POPPIN.getCurrentUser();
  if (!user) return '';

  const dmUnread = typeof PoppinChat !== 'undefined' ? PoppinChat.unreadDMs : 0;

  return `
    <a href="#main-content" class="skip-to-content">Skip to content</a>
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <div class="container">
        <a href="dashboard.html" class="nav-brand">
          <img src="favicon.svg" class="nav-brand-icon-img" alt="P">
          <img src="img/poppin-logo.svg" class="nav-brand-text-img" alt="POPPIN">
        </a>
        <div class="borough-selector" onclick="toggleBoroughs(event)" role="button" aria-haspopup="true" aria-expanded="false" tabindex="0">
          📍 ${POPPIN.NYC_BOROUGHS.find(b => b.id === POPPIN.getActiveBorough())?.name || 'Manhattan'} ▾
          <div class="borough-dropdown" id="boroughDropdown" style="display:none;" role="listbox">
            ${POPPIN.NYC_BOROUGHS.map(b => `
              <div class="borough-item ${b.id === POPPIN.getActiveBorough() ? 'active' : ''}" role="option" aria-selected="${b.id === POPPIN.getActiveBorough()}" onclick="POPPIN.setActiveBorough('${b.id}')">
                ${b.name}
              </div>
            `).join('')}
          </div>
        </div>
        <div class="nav-links" id="navLinks" role="menubar">
          <a href="dashboard.html" class="${activePage === 'dashboard' ? 'active' : ''}" role="menuitem">Tonight</a>
          <a href="events.html" class="${activePage === 'events' ? 'active' : ''}" role="menuitem">Events</a>
          <a href="leaderboard.html" class="${activePage === 'leaderboard' ? 'active' : ''}" role="menuitem">Rankings</a>
          <a href="pricing.html" class="${activePage === 'pricing' ? 'active' : ''}" role="menuitem">Membership</a>
        </div>
        <div class="nav-user">
          <a href="inbox.html" class="nav-dm-link" title="Messages" aria-label="Messages${dmUnread > 0 ? `, ${dmUnread} unread` : ''}">
            💬
            <span class="dm-badge" style="display:${dmUnread > 0 ? 'flex' : 'none'}" aria-hidden="true">${dmUnread}</span>
          </a>
          <div class="nav-notification-wrapper">
            <span class="nav-notification" onclick="toggleNotifications(event)" role="button" aria-haspopup="true" aria-expanded="false" aria-label="Notifications, 3 new" tabindex="0">
              🔔 <span class="badge" aria-hidden="true">3</span>
            </span>
            <div class="notification-dropdown" id="notificationDropdown" style="display:none;" role="menu">
              <div class="notif-header">Notifications</div>
              <div class="notif-list">
                <div class="notif-item unread">
                  <div class="notif-icon" aria-hidden="true">🔥</div>
                  <div class="notif-content">
                    <p><strong>Kettle Black</strong> is popping right now! 50+ check-ins in the last hour.</p>
                    <span>10m ago</span>
                  </div>
                </div>
                <div class="notif-item unread">
                  <div class="notif-icon" aria-hidden="true">🎟️</div>
                  <div class="notif-content">
                    <p>Your RSVP for <strong>UFC 300 Watch Party</strong> is confirmed.</p>
                    <span>2h ago</span>
                  </div>
                </div>
                <div class="notif-item unread">
                  <div class="notif-icon" aria-hidden="true">⭐</div>
                  <div class="notif-content">
                    <p>You earned the <strong>Night Owl</strong> badge!</p>
                    <span>Yesterday</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="profile.html" class="nav-avatar" title="${sanitize(user.displayName)}">${sanitize(user.avatar)}</a>
          <button class="btn btn-ghost btn-sm" onclick="POPPIN.logout()" title="Sign Out" aria-label="Sign out">✕</button>
        </div>
          <button class="nav-toggle" onclick="toggleNav()" aria-label="Toggle navigation" aria-expanded="false">☰</button>
        </div>
      </div>
      <div class="nav-backdrop" id="navBackdrop" onclick="closeNav()"></div>
    </nav>
  `;
}

function toggleNav() {
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.querySelector('.nav-toggle');
  const backdrop = document.getElementById('navBackdrop');
  const isOpen = navLinks.classList.contains('open');

  if (isOpen) {
    closeNav();
  } else {
    navLinks.classList.add('open');
    if (backdrop) backdrop.classList.add('show');
    if (navToggle) {
      navToggle.textContent = '✕';
      navToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';

    // Close nav when any link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav, { once: true });
    });
  }
}

function closeNav() {
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.querySelector('.nav-toggle');
  const backdrop = document.getElementById('navBackdrop');

  if (navLinks) navLinks.classList.remove('open');
  if (backdrop) backdrop.classList.remove('show');
  if (navToggle) {
    navToggle.textContent = '☰';
    navToggle.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
}

function toggleNotifications(e) {
  e.stopPropagation();
  const dropdown = document.getElementById('notificationDropdown');
  const trigger = e.target.closest('.nav-notification');
  if (dropdown) {
    const showing = dropdown.style.display === 'none';
    dropdown.style.display = showing ? 'block' : 'none';
    if (trigger) trigger.setAttribute('aria-expanded', showing ? 'true' : 'false');
  }
}

function toggleBoroughs(e) {
  e.stopPropagation();
  const dropdown = document.getElementById('boroughDropdown');
  const trigger = e.target.closest('.borough-selector');
  if (dropdown) {
    const showing = dropdown.style.display === 'none';
    dropdown.style.display = showing ? 'block' : 'none';
    if (trigger) trigger.setAttribute('aria-expanded', showing ? 'true' : 'false');
  }
}

document.addEventListener('click', (e) => {
  const notifDropdown = document.getElementById('notificationDropdown');
  if (notifDropdown && notifDropdown.style.display === 'block') {
    if (!e.target.closest('.nav-notification-wrapper')) {
      notifDropdown.style.display = 'none';
      const trigger = document.querySelector('.nav-notification');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  }

  const boroughDropdown = document.getElementById('boroughDropdown');
  if (boroughDropdown && boroughDropdown.style.display === 'block') {
    if (!e.target.closest('.borough-selector')) {
      boroughDropdown.style.display = 'none';
      const trigger = document.querySelector('.borough-selector');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  }
});

/* ---------- Footer ---------- */
function renderFooter() {
  return `
    <footer class="site-footer" role="contentinfo">
      <div class="footer-inner">
        <div class="footer-brand">
          <img src="img/poppin-logo.svg" class="footer-brand-logo" alt="POPPIN Logo">
          <p>${sanitize(POPPIN.getBoroughName())}'s live nightlife platform. See who's out. Vote the vibes. Own the night.</p>
          <a href="https://garnetgrid.com" target="_blank" rel="noopener" class="garnetgrid-badge" title="Built by GarnetGrid">
            ${GARNET_GEM_SVG}
            GarnetGrid
          </a>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <a href="dashboard.html">Tonight</a>
          <a href="events.html">Events</a>
          <a href="leaderboard.html">Rankings</a>
          <a href="pricing.html">Membership</a>
        </div>
        <div class="footer-col">
          <h4>Account</h4>
          <a href="profile.html">Profile</a>
          <a href="inbox.html">Messages</a>
          <a href="pricing.html">Upgrade</a>
        </div>
        <div class="footer-col">
          <h4>Business</h4>
          <a href="for-bars.html">For Bars (Owners)</a>
          <a href="shop.html">POPPIN Shop</a>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms of Service</a>
          <a href="cookies.html">Cookie Policy</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} POPPIN — a <a href="https://garnetgrid.com" target="_blank" rel="noopener" style="color:var(--purple-light)">Garnet Grid Consulting LLC</a> product. All rights reserved.</p>
        <p>21+ Only. Please drink responsibly.</p>
      </div>
    </footer>
  `;
}

/* ---------- Bar Card ---------- */
function renderBarCard(bar) {
  const crowdBars = Array.from({ length: 5 }, (_, i) => {
    const active = i < bar.crowdLevel;
    const high = bar.crowdLevel >= 4 && active;
    return `<div class="bar ${active ? 'active' : ''} ${high ? 'high' : ''}" aria-hidden="true"></div>`;
  }).join('');

  const crowdLabel = ['Empty', 'Quiet', 'Moderate', 'Busy', 'Packed'][bar.crowdLevel - 1] || 'Unknown';
  const feedImg = getBarFeedImage(bar);
  const voted = hasVotedFor(bar.id);
  const promotedTag = bar.premiumListing ? `<div class="promoted-badge" style="position:absolute; top:8px; right:8px; background:var(--accent-primary); color:#000; font-size:0.7rem; font-weight:800; padding:4px 8px; border-radius:4px; z-index:5; text-transform:uppercase; box-shadow: 0 0 10px rgba(57, 255, 20, 0.4); border: 1px solid #000;">⭐ Promoted</div>` : '';
  const viralTag = bar.isViral ? `<div class="viral-badge" style="position:absolute; top:${bar.premiumListing ? '36px' : '8px'}; right:8px; background:linear-gradient(45deg, #ff0055, #ff5500); color:#fff; font-size:0.7rem; font-weight:800; padding:4px 8px; border-radius:4px; z-index:5; text-transform:uppercase; box-shadow: 0 0 12px rgba(255, 85, 0, 0.8); border: 1px solid #fff;">🔥 Trending</div>` : '';

  return `
    <div class="card bar-card" onclick="window.location.href='bar.html?id=${bar.id}'" role="link" tabindex="0" aria-label="${sanitize(bar.name)} — ${crowdLabel}, rated ${bar.ratingTonight}">
      <div class="camera-feed" style="position:relative;">
        ${promotedTag}
        ${viralTag}
        <img src="${feedImg}" alt="${sanitize(bar.name)} — Live Feed" loading="lazy">
        <div class="live-badge"><span class="dot"></span> LIVE</div>
        <span class="vibe-tag vibe-${bar.vibe}">${bar.vibeEmoji} ${sanitize(bar.vibeLabel)}</span>
      </div>
      <div class="card-body">
        <div class="bar-name">${sanitize(bar.name)}</div>
        <div class="bar-neighborhood">📍 ${sanitize(bar.neighborhood)}</div>
        <div class="bar-tags" style="display:flex;gap:4px;flex-wrap:wrap;margin:var(--space-sm) 0;">
          ${(bar.tags || []).map(t => `<span style="font-size:0.65rem;background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px;color:var(--text-secondary)">#${sanitize(t)}</span>`).join('')}
        </div>
        <div class="bar-meta">
          <div class="crowd-meter" aria-label="Crowd level: ${crowdLabel}">
            <div class="bars">${crowdBars}</div>
            <span>${bar.checkedIn} here</span>
          </div>
          <div class="rating-badge" aria-label="Rating: ${bar.ratingTonight} out of 5">⭐ ${bar.ratingTonight}</div>
          <button class="vote-btn ${voted ? 'voted' : ''}" onclick="event.stopPropagation(); voteBar(${bar.id}, this)" ${voted ? 'disabled' : ''} aria-label="Vote for ${sanitize(bar.name)}, ${bar.votesTonight} votes">
            🔥 ${bar.votesTonight}
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ---------- Comment ---------- */
function renderComment(c) {
  return `
    <div class="comment">
      <div class="comment-avatar" aria-hidden="true">${sanitize(c.avatar)}</div>
      <div class="comment-body">
        <div class="comment-header">
          <span class="comment-user">${sanitize(c.user)}</span>
          <span class="comment-time">${sanitize(c.time)}</span>
        </div>
        <div class="comment-text">${sanitize(c.text)}</div>
      </div>
    </div>
  `;
}

/* ---------- Chat Panel (for bar detail page) ---------- */
function renderChatPanel(barId) {
  return `
    <div class="chat-panel">
      <div class="chat-tabs" role="tablist">
        <button class="chat-tab active" data-panel="live-chat" onclick="switchChatTab(this)" role="tab" aria-selected="true">💬 Live Chat</button>
        <button class="chat-tab" data-panel="comments" onclick="switchChatTab(this)" role="tab" aria-selected="false">📝 Comments</button>
      </div>
      <div id="liveChatPanel" role="tabpanel">
        <div class="chat-messages" id="chatMessages" aria-live="polite"></div>
        <div class="chat-input-row">
          <input type="text" id="chatInput" placeholder="Say something..." autocomplete="off" aria-label="Chat message">
          <button onclick="sendChatMsg(${barId})" aria-label="Send chat message">Send</button>
        </div>
      </div>
      <div id="commentsPanel" style="display:none" role="tabpanel">
        <div style="padding:var(--space-md);max-height:300px;overflow-y:auto" id="commentsList"></div>
        <div class="chat-input-row">
          <input type="text" id="commentInput" placeholder="Add a comment..." autocomplete="off" aria-label="Comment text">
          <button onclick="postNewComment(${barId})" aria-label="Post comment">Post</button>
        </div>
      </div>
    </div>
  `;
}

function switchChatTab(btn) {
  document.querySelectorAll('.chat-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  const panel = btn.dataset.panel;
  document.getElementById('liveChatPanel').style.display = panel === 'live-chat' ? 'block' : 'none';
  document.getElementById('commentsPanel').style.display = panel === 'comments' ? 'block' : 'none';
}

function sendChatMsg(barId) {
  if (!POPPIN.RateLimit('chat', 15, 1)) {
    showToast('Slow down, chat is moving too fast. 🛑');
    return;
  }
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  const msg = PoppinChat.sendChat(barId, text);
  if (msg) {
    appendChatBubble(msg);
    input.value = '';
    const container = document.getElementById('chatMessages');
    container.scrollTop = container.scrollHeight;
  }
}

function appendChatBubble(msg) {
  const container = document.getElementById('chatMessages');
  if (!container) return;
  const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.className = 'chat-msg';
  div.innerHTML = `<span class="chat-user">${sanitize(msg.user)}:</span><span class="chat-text">${sanitize(msg.text)}</span><span class="chat-timestamp">${time}</span>`;
  container.appendChild(div);
}

function loadChatHistory(barId) {
  const messages = PoppinChat.getChatMessages(barId);
  messages.forEach(m => appendChatBubble(m));
  const container = document.getElementById('chatMessages');
  if (container) container.scrollTop = container.scrollHeight;
}

function postNewComment(barId) {
  if (!POPPIN.RateLimit('comment', 5, 2)) {
    showToast('Take a breath! You are commenting too fast.');
    return;
  }
  const input = document.getElementById('commentInput');
  const text = input.value.trim();
  if (!text) return;
  PoppinChat.postComment(barId, text);
  input.value = '';
  refreshCommentsList(barId);
}

function refreshCommentsList(barId) {
  const list = document.getElementById('commentsList');
  if (!list) return;
  const comments = PoppinChat.getComments(barId);
  list.innerHTML = comments.map(c => renderComment(c)).join('');
}

/* ---------- Event Card ---------- */
function renderEventCard(ev) {
  const bar = POPPIN.getBar(ev.barId);
  const attendeeHTML = ev.attendees.slice(0, 4).map(a => `<div class="att" aria-hidden="true">${sanitize(a)}</div>`).join('');
  const extra = ev.rsvps - ev.attendees.length;

  return `
    <div class="event-card">
      <div class="event-date-box" aria-label="${sanitize(ev.month)} ${sanitize(ev.day)}">
        <span class="month">${sanitize(ev.month)}</span>
        <span class="day">${sanitize(ev.day)}</span>
      </div>
      <div class="event-info">
        <div class="event-title">${sanitize(ev.title)}</div>
        <div class="event-bar">📍 ${sanitize(ev.barName)}</div>
        <div class="event-desc">${sanitize(ev.description)}</div>
        <div class="event-meta">
          <div class="event-rsvp">
            <div class="attendee-stack">${attendeeHTML}</div>
            <span>${ev.rsvps} going</span>
          </div>
          <span style="font-size:0.72rem; color:var(--text-muted)">${sanitize(ev.time)}</span>
          <button class="btn btn-sm btn-outline" onclick="rsvpEvent(${ev.id}, this)" aria-label="RSVP to ${sanitize(ev.title)}">RSVP</button>
        </div>
      </div>
    </div>
  `;
}

/* ---------- Rank Row ---------- */
function renderRankRow(bar, index) {
  const feedImg = getBarFeedImage(bar);
  return `
    <div class="rank-row">
      <div class="rank-number">${index + 1}</div>
      <img src="${feedImg}" alt="${sanitize(bar.name)}" class="rank-thumb" loading="lazy">
      <div class="rank-info">
        <div class="rank-bar-name">${sanitize(bar.name)}</div>
        <div class="rank-neighborhood">${sanitize(bar.neighborhood)}</div>
      </div>
      <div style="text-align:center;">
        <div class="rating-badge" aria-label="Rating: ${bar.ratingTonight}">⭐ ${bar.ratingTonight}</div>
        <div style="font-size:0.65rem;color:var(--text-muted);margin-top:2px">${bar.votesTonight} votes</div>
      </div>
      <div class="rank-score">🔥 ${bar.votesTonight}</div>
    </div>
  `;
}

/* ---------- Toast ---------- */
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ---------- Vote ---------- */
function voteBar(barId, btn) {
  if (hasVotedFor(barId) || btn.classList.contains('voted')) {
    showToast('You already voted for this bar tonight!');
    return;
  }
  if (!POPPIN.RateLimit('vote', 10, 5)) {
    showToast('You are voting too fast! Chill out for a bit.');
    return;
  }
  btn.classList.add('voted');
  btn.disabled = true;
  markBarVoted(barId);
  const bar = POPPIN.getBar(barId);
  if (bar) bar.votesTonight++;
  btn.innerHTML = `🔥 ${bar.votesTonight}`;
  showToast(`Voted for ${sanitize(bar.name)}! 🔥`);
}

/* ---------- RSVP ---------- */
function rsvpEvent(eventId, btn) {
  if (!POPPIN.requireAuth()) return;
  if (btn.classList.contains('btn-gold')) {
    showToast("You already RSVP'd to this event!");
    return;
  }
  if (!POPPIN.RateLimit('rsvp', 10, 5)) {
    showToast('Too many RSVPs! Save some fun for later.');
    return;
  }
  btn.textContent = '✓ Going';
  btn.classList.remove('btn-outline');
  btn.classList.add('btn-gold');
  btn.disabled = true;
  showToast("You're in! See you there 🎉");
}

/* ---------- Init Page ---------- */
function initPage(pageName) {
  if (!POPPIN.requireAuth()) return;

  /* Add main content landmark */
  const mainEl = document.querySelector('main');
  if (mainEl && !mainEl.id) mainEl.id = 'main-content';

  const navEl = document.getElementById('mainNav') || document.getElementById('nav-root');
  if (navEl) navEl.outerHTML = renderNavbar(pageName);

  const footerEl = document.getElementById('siteFooter') || document.getElementById('footer-root');
  if (footerEl) footerEl.outerHTML = renderFooter();

  /* Add preconnect for Unsplash images */
  if (!document.querySelector('link[href*="images.unsplash.com"]')) {
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://images.unsplash.com';
    document.head.appendChild(preconnect);
  }
}

/* Auto-init: detect page from URL */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.replace(/^\//, '').replace('.html', '');
  const pageMap = {
    'dashboard': 'dashboard',
    'events': 'events',
    'leaderboard': 'leaderboard',
    'pricing': 'pricing',
    'profile': 'profile',
    'inbox': 'inbox',
    'bar': 'bar',
    'privacy': 'legal',
    'terms': 'legal',
    'cookies': 'legal',
    'borough-select': 'borough-select',
    '404': '404'
  };
  const pageName = pageMap[path] || '';
  if (pageName && POPPIN.isLoggedIn()) {
    initPage(pageName);
  }
});
