/* ============================================
   POPPIN — Membership & Token Engine
   Handling premium gating, token distribution, and tracking
   ============================================ */

const Membership = {
    // 1. Tier Definitions & Token Grants
    TIERS: {
        'Peek': {
            name: 'Peek',
            price: 0,
            dailyTokens: 1, // 1 token per night for basic interactions (e.g. 1 drink redeem or 1 vote)
            permissions: {
                viewAllBars: false,
                seeCrowdLevel: false,
                liveChat: false,
                voteLimit: 1,
                createEvents: false,
                trackerAccess: false,
                whoIsHere: false
            }
        },
        'Member': {
            name: 'Member',
            price: 9.99,
            dailyTokens: 5,
            permissions: {
                viewAllBars: true,
                seeCrowdLevel: true,
                liveChat: true,
                voteLimit: 5,
                createEvents: true,
                trackerAccess: false,
                whoIsHere: false
            }
        },
        'VIP': {
            name: 'VIP',
            price: 24.99,
            dailyTokens: -1, // Unlimited
            permissions: {
                viewAllBars: true,
                seeCrowdLevel: true,
                liveChat: true,
                voteLimit: -1,
                createEvents: true,
                trackerAccess: true,
                whoIsHere: true
            }
        }
    },

    // 2. State Management for Current User
    getCurrentUser() {
        return POPPIN.Storage.get('poppin_user', 24);
    },

    getUserTier() {
        const user = this.getCurrentUser();
        return user ? user.tier : 'Peek'; // Default to Peek if logged out (though they shouldn't be here)
    },

    getTierConfig() {
        const tierName = this.getUserTier();
        return this.TIERS[tierName] || this.TIERS['Peek'];
    },

    // 3. Token Tracking
    // We store tokens in localStorage per user per day to simulate daily limits
    _getTokenKey() {
        const user = this.getCurrentUser();
        if (!user) return null;
        const today = new Date().toISOString().split('T')[0];
        return `tokens_${user.username}_${today}`;
    },

    getAvailableTokens() {
        const config = this.getTierConfig();
        if (config.dailyTokens === -1) return Infinity; // VIP

        const key = this._getTokenKey();
        if (!key) return 0;

        const stored = POPPIN.Storage.get(key, 24);
        if (stored !== null) {
            return parseInt(stored, 10);
        } else {
            // First time today, grant daily tokens
            POPPIN.Storage.set(key, config.dailyTokens);
            return config.dailyTokens;
        }
    },

    deductToken(amount = 1) {
        const config = this.getTierConfig();
        if (config.dailyTokens === -1) return true; // VIP always succeeds

        let current = this.getAvailableTokens();
        if (current >= amount) {
            current -= amount;
            const key = this._getTokenKey();
            POPPIN.Storage.set(key, current);
            // Fire event so UI can update (e.g., drinks tracker)
            window.dispatchEvent(new CustomEvent('poppin:tokensUpdated', { detail: { tokens: current } }));
            return true;
        }
        return false;
    },

    // 4. Feature Gating
    requireFeature(featureKey, actionCallback, upsellCallback) {
        const config = this.getTierConfig();
        if (config.permissions[featureKey] !== false) {
            if (typeof actionCallback === 'function') actionCallback();
            return true;
        } else {
            this.showUpsellModal(featureKey);
            if (typeof upsellCallback === 'function') upsellCallback();
            return false;
        }
    },

    requireToken(actionCallback) {
        if (this.deductToken(1)) {
            if (typeof actionCallback === 'function') actionCallback();
            return true;
        } else {
            this.showTokenUpsellModal();
            return false;
        }
    },

    // 5. Upsell Modals
    showUpsellModal(featureKey) {
        let modal = document.getElementById('poppin-upsell-modal');
        if (!modal) {
            modal = this._buildModal();
        }
        modal.querySelector('.upsell-message').innerText = `To access ${this._formatFeatureName(featureKey)}, upgrade your membership to Member or VIP.`;
        modal.classList.add('active');
    },

    showTokenUpsellModal() {
        let modal = document.getElementById('poppin-upsell-modal');
        if (!modal) {
            modal = this._buildModal();
        }
        modal.querySelector('.upsell-message').innerText = "You're out of tokens for tonight! Upgrade to VIP for unlimited interactions.";
        modal.classList.add('active');
    },

    _formatFeatureName(key) {
        return key.replace(/([A-Z])/g, ' $1')
            .replace(/^./, function (str) { return str.toUpperCase(); });
    },

    _buildModal() {
        const modalHtml = `
            <div id="poppin-upsell-modal" class="modal-overlay">
                <div class="modal-content glass-panel glow-border">
                    <button class="modal-close" onclick="document.getElementById('poppin-upsell-modal').classList.remove('active')">&times;</button>
                    <h2 style="margin-top:0;">Premium Area</h2>
                    <p class="upsell-message">Upgrade your membership to access this feature.</p>
                    <div class="upsell-options">
                        <div class="tier-card">
                            <h3>Member</h3>
                            <p class="price">$9.99<span style="font-size:0.8rem;color:var(--text-secondary);">/mo</span></p>
                            <ul>
                                <li>5 Tokens/Night</li>
                                <li>Live Chat</li>
                                <li>All Borough Bars</li>
                            </ul>
                            <button class="btn btn-outline" onclick="window.location.href='index.html#pricing'" style="width:100%;margin-top:1rem;">Upgrade</button>
                        </div>
                        <div class="tier-card premium">
                            <h3>VIP</h3>
                            <p class="price">$24.99<span style="font-size:0.8rem;color:var(--text-secondary);">/mo</span></p>
                            <ul>
                                <li>Unlimited Tokens</li>
                                <li>Drinks Tracker</li>
                                <li>See Who's Here</li>
                            </ul>
                            <button class="btn btn-primary" onclick="window.location.href='index.html#pricing'" style="width:100%;margin-top:1rem;">Go VIP</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        if (!document.getElementById('upsell-styles')) {
            const style = document.createElement('style');
            style.id = 'upsell-styles';
            style.innerHTML = `
                .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; backdrop-filter: blur(5px); }
                .modal-overlay.active { opacity: 1; pointer-events: all; }
                .modal-content { background: var(--surface-1); padding: 2rem; border-radius: 1rem; width: 90%; max-width: 500px; position: relative; text-align: center; }
                .modal-close { position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer; }
                .upsell-options { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; text-align: left; }
                .tier-card { background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; }
                .tier-card.premium { border-color: var(--accent-primary); background: rgba(57, 255, 20, 0.05); }
                .tier-card h3 { margin-top: 0; margin-bottom: 0.5rem; }
                .tier-card .price { font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem; color: var(--accent-primary); }
                .tier-card ul { list-style: none; padding: 0; margin-bottom: auto; }
                .tier-card ul li { margin-bottom: 0.5rem; font-size: 0.85rem; position: relative; padding-left: 1.5rem; color: var(--text-secondary); }
                .tier-card ul li::before { content: '✓'; position: absolute; left: 0; color: var(--accent-primary); }
                @media (max-width: 600px) { .upsell-options { grid-template-columns: 1fr; } }
            `;
            document.head.appendChild(style);
        }

        return document.getElementById('poppin-upsell-modal');
    },

    // 6. Redeem Tracker Integration
    logRedemption(barId, actionDetails) {
        const user = this.getCurrentUser();
        if (!user) return;
        const key = `history_${user.username}`;
        const history = POPPIN.Storage.get(key, 24 * 30) || []; // Keep 30 days
        history.unshift({
            timestamp: new Date().toISOString(),
            barId: parseInt(barId, 10),
            details: actionDetails
        });
        POPPIN.Storage.set(key, history);
        window.dispatchEvent(new CustomEvent('poppin:historyUpdated'));
    },

    getHistory() {
        const user = this.getCurrentUser();
        if (!user) return [];
        return POPPIN.Storage.get(`history_${user.username}`, 24 * 30) || [];
    }
};

window.Membership = Membership;
