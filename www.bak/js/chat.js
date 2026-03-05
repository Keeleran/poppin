/* ============================================
   POPPIN — Chat & Comments Engine
   localStorage + BroadcastChannel real-time
   ============================================ */

const PoppinChat = {
    channel: null,
    presence: {},
    unreadDMs: 0,

    /* ---------- Init ---------- */
    init() {
        try { this.channel = new BroadcastChannel('poppin_realtime'); } catch (e) { }
        if (this.channel) {
            this.channel.onmessage = (e) => this._handleBroadcast(e.data);
        }
        this._loadUnreadCount();
        this._startPresenceHeartbeat();
    },

    /* ---------- Comments (persistent) ---------- */
    getComments(barId) {
        const key = `poppin_comments_${barId}`;
        const stored = localStorage.getItem(key);
        const userComments = stored ? JSON.parse(stored) : [];
        const mockComments = POPPIN.getCommentsForBar(barId);
        return [...mockComments, ...userComments].sort((a, b) => {
            const tA = a.timestamp || 0;
            const tB = b.timestamp || 0;
            return tB - tA;
        });
    },

    postComment(barId, text) {
        const user = POPPIN.getCurrentUser();
        if (!user || !text.trim()) return null;
        const comment = {
            id: Date.now(),
            user: user.displayName,
            avatar: user.avatar,
            time: 'Just now',
            text: text.trim(),
            barId: barId,
            timestamp: Date.now()
        };
        const key = `poppin_comments_${barId}`;
        const stored = localStorage.getItem(key);
        const comments = stored ? JSON.parse(stored) : [];
        comments.push(comment);
        localStorage.setItem(key, JSON.stringify(comments));
        if (this.channel) {
            this.channel.postMessage({ type: 'comment', barId, comment });
        }
        return comment;
    },

    /* ---------- Live Chat (per bar) ---------- */
    getChatMessages(barId) {
        const key = `poppin_chat_${barId}`;
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    },

    sendChat(barId, message) {
        const user = POPPIN.getCurrentUser();
        if (!user || !message.trim()) return null;
        const msg = {
            id: Date.now(),
            user: user.displayName,
            avatar: user.avatar,
            text: message.trim(),
            timestamp: Date.now(),
            barId: barId
        };
        const key = `poppin_chat_${barId}`;
        const stored = localStorage.getItem(key);
        const messages = stored ? JSON.parse(stored) : [];
        messages.push(msg);
        if (messages.length > 200) messages.splice(0, messages.length - 200);
        localStorage.setItem(key, JSON.stringify(messages));
        if (this.channel) {
            this.channel.postMessage({ type: 'chat', barId, message: msg });
        }
        return msg;
    },

    /* ---------- Direct Messages ---------- */
    getConversations() {
        const user = POPPIN.getCurrentUser();
        if (!user) return [];
        const key = `poppin_dm_convos_${user.username}`;
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : this._seedConversations(user);
    },

    getDMThread(conversationId) {
        const key = `poppin_dm_${conversationId}`;
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    },

    sendDM(conversationId, recipientUsername, text) {
        const user = POPPIN.getCurrentUser();
        if (!user || !text.trim()) return null;
        const msg = {
            id: Date.now(),
            sender: user.username,
            senderAvatar: user.avatar,
            senderName: user.displayName,
            text: text.trim(),
            timestamp: Date.now(),
            read: false
        };
        const key = `poppin_dm_${conversationId}`;
        const stored = localStorage.getItem(key);
        const thread = stored ? JSON.parse(stored) : [];
        thread.push(msg);
        localStorage.setItem(key, JSON.stringify(thread));
        this._updateConvoPreview(conversationId, msg);
        if (this.channel) {
            this.channel.postMessage({ type: 'dm', conversationId, message: msg });
        }
        return msg;
    },

    markConvoRead(conversationId) {
        const convos = this.getConversations();
        const c = convos.find(c => c.id === conversationId);
        if (c) { c.unread = 0; }
        const user = POPPIN.getCurrentUser();
        if (user) localStorage.setItem(`poppin_dm_convos_${user.username}`, JSON.stringify(convos));
        this._updateUnreadCount();
    },

    /* ---------- Presence ---------- */
    trackPresence(barId) {
        const user = POPPIN.getCurrentUser();
        if (!user) return;
        const key = `poppin_presence_${barId}`;
        const stored = localStorage.getItem(key);
        const viewers = stored ? JSON.parse(stored) : [];
        const existing = viewers.find(v => v.username === user.username);
        if (existing) {
            existing.lastSeen = Date.now();
        } else {
            viewers.push({ username: user.displayName, avatar: user.avatar, lastSeen: Date.now() });
        }
        localStorage.setItem(key, JSON.stringify(viewers));
    },

    getPresence(barId) {
        const key = `poppin_presence_${barId}`;
        const stored = localStorage.getItem(key);
        if (!stored) return [];
        const viewers = JSON.parse(stored);
        const now = Date.now();
        return viewers.filter(v => now - v.lastSeen < 120000);
    },

    /* ---------- Simulated Bot Activity ---------- */
    startBotActivity(barId) {
        const botUsers = [
            { name: 'MikeD', avatar: 'M' }, { name: 'JessicaS', avatar: 'J' },
            { name: 'AnthonyR', avatar: 'A' }, { name: 'SarahK', avatar: 'S' },
            { name: 'TommyG', avatar: 'T' }, { name: 'NinaP', avatar: 'N' },
            { name: 'DanielR', avatar: 'D' }, { name: 'LisaM', avatar: 'L' },
            { name: 'CarlosV', avatar: 'C' }, { name: 'RachelB', avatar: 'R' }
        ];
        const chatPhrases = [
            'This place is going crazy right now 🔥',
            'Just got here, vibes are immaculate',
            'Who else is out tonight??',
            'DJ just dropped a banger 🎵',
            'Drinks are flowing, crowd is wild',
            'Best night out in a while fr fr',
            'The bartender here is goated 🐐',
            'Anyone else seeing this crowd?? Packed!',
            'Happy hour specials hitting different tonight',
            'This is why SI nightlife hits different 💯',
            'Shots shots shots 🥃',
            'The energy in here is unmatched rn',
            'Finally made it through the line worth it',
            'Living for these vibes tonight ✨',
            'Can we talk about these cocktails tho 🍸',
            'Security camera doesn\'t lie — it\'s LIT',
            'Bringing the squad next Friday for sure'
        ];
        this._botInterval = setInterval(() => {
            const bot = botUsers[Math.floor(Math.random() * botUsers.length)];
            const phrase = chatPhrases[Math.floor(Math.random() * chatPhrases.length)];
            const msg = {
                id: Date.now(),
                user: bot.name,
                avatar: bot.avatar,
                text: phrase,
                timestamp: Date.now(),
                barId: barId,
                isBot: true
            };
            const key = `poppin_chat_${barId}`;
            const stored = localStorage.getItem(key);
            const messages = stored ? JSON.parse(stored) : [];
            messages.push(msg);
            if (messages.length > 200) messages.splice(0, messages.length - 200);
            localStorage.setItem(key, JSON.stringify(messages));
            if (typeof window._onNewChatMessage === 'function') {
                window._onNewChatMessage(msg);
            }
        }, 8000 + Math.random() * 12000);
    },

    stopBotActivity() {
        if (this._botInterval) clearInterval(this._botInterval);
    },

    /* ---------- Internal ---------- */
    _handleBroadcast(data) {
        if (data.type === 'chat' && typeof window._onNewChatMessage === 'function') {
            window._onNewChatMessage(data.message);
        }
        if (data.type === 'comment' && typeof window._onNewComment === 'function') {
            window._onNewComment(data.comment);
        }
        if (data.type === 'dm') {
            this._updateUnreadCount();
            if (typeof window._onNewDM === 'function') {
                window._onNewDM(data.message);
            }
        }
    },

    _updateConvoPreview(conversationId, msg) {
        const user = POPPIN.getCurrentUser();
        if (!user) return;
        const convos = this.getConversations();
        const c = convos.find(c => c.id === conversationId);
        if (c) {
            c.lastMessage = msg.text;
            c.lastTime = 'Just now';
            c.unread = (c.unread || 0) + 1;
        }
        localStorage.setItem(`poppin_dm_convos_${user.username}`, JSON.stringify(convos));
        this._updateUnreadCount();
    },

    _loadUnreadCount() {
        const convos = this.getConversations();
        this.unreadDMs = convos.reduce((sum, c) => sum + (c.unread || 0), 0);
    },

    _updateUnreadCount() {
        this._loadUnreadCount();
        const badge = document.querySelector('.dm-badge');
        if (badge) {
            badge.textContent = this.unreadDMs;
            badge.style.display = this.unreadDMs > 0 ? 'flex' : 'none';
        }
    },

    _startPresenceHeartbeat() {
        const barId = new URLSearchParams(window.location.search).get('id');
        if (barId) {
            this.trackPresence(barId);
            setInterval(() => this.trackPresence(barId), 30000);
        }
    },

    _seedConversations(user) {
        const convos = [
            { id: 'dm_mike', username: 'MikeD', displayName: 'MikeD', avatar: 'M', lastMessage: 'Yo we heading to Kettle Black tonight?', lastTime: '2 min ago', unread: 2 },
            { id: 'dm_jessica', username: 'JessicaS', displayName: 'JessicaS', avatar: 'J', lastMessage: 'That bar was incredible last night!', lastTime: '1 hr ago', unread: 0 },
            { id: 'dm_tommy', username: 'TommyG', displayName: 'TommyG', avatar: 'T', lastMessage: 'Game day tomorrow — Joe Broadway\'s?', lastTime: '3 hr ago', unread: 1 },
            { id: 'dm_rachel', username: 'RachelB', displayName: 'RachelB', avatar: 'R', lastMessage: 'VIP section at Cypress was 🔥', lastTime: 'Yesterday', unread: 0 },
            { id: 'dm_carlos', username: 'CarlosV', displayName: 'CarlosV', avatar: 'C', lastMessage: 'You try that new IPA at Flagship?', lastTime: 'Yesterday', unread: 0 }
        ];
        const seedThreads = {
            'dm_mike': [
                { id: 1, sender: 'MikeD', senderAvatar: 'M', senderName: 'MikeD', text: 'Bro the crowd at Kettle Black was insane last Saturday', timestamp: Date.now() - 7200000, read: true },
                { id: 2, sender: user.username, senderAvatar: user.avatar, senderName: user.displayName, text: 'Facts! DJ was going off', timestamp: Date.now() - 7100000, read: true },
                { id: 3, sender: 'MikeD', senderAvatar: 'M', senderName: 'MikeD', text: 'Yo we heading to Kettle Black tonight?', timestamp: Date.now() - 120000, read: false },
                { id: 4, sender: 'MikeD', senderAvatar: 'M', senderName: 'MikeD', text: 'They got $5 draft specials rn', timestamp: Date.now() - 60000, read: false }
            ],
            'dm_tommy': [
                { id: 1, sender: 'TommyG', senderAvatar: 'T', senderName: 'TommyG', text: 'Game day tomorrow — Joe Broadway\'s?', timestamp: Date.now() - 10800000, read: false }
            ]
        };
        localStorage.setItem(`poppin_dm_convos_${user.username}`, JSON.stringify(convos));
        Object.entries(seedThreads).forEach(([key, thread]) => {
            localStorage.setItem(`poppin_dm_${key}`, JSON.stringify(thread));
        });
        return convos;
    }
};

/* Initialize on load */
document.addEventListener('DOMContentLoaded', () => PoppinChat.init());
