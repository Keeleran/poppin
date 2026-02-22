/* ============================================
   POPPIN — Data Layer
   Real NYC Bars + Mock Users/Events
   ============================================ */

const POPPIN = {
        /* ---------- NYC Boroughs ---------- */
        NYC_BOROUGHS: [
                { id: 'manhattan', name: 'Manhattan' },
                { id: 'brooklyn', name: 'Brooklyn' },
                { id: 'queens', name: 'Queens' },
                { id: 'bronx', name: 'The Bronx' },
                { id: 'staten_island', name: 'Staten Island' }
        ],
        /* ---------- Demo User Profiles (no passwords stored client-side) ---------- */
        users: [
                {
                        username: 'admin',
                        displayName: 'Admin',
                        role: 'admin',
                        avatar: 'A',
                        tier: 'VIP',
                        joined: '2024-06-15',
                        checkins: 88,
                        comments: 214,
                        votes: 312
                },
                {
                        username: 'Cobra',
                        displayName: 'Cobra',
                        role: 'member',
                        avatar: 'C',
                        tier: 'Member',
                        joined: '2025-01-10',
                        checkins: 34,
                        comments: 67,
                        votes: 145
                }
        ],
        /* Demo credential tokens (SHA-256 hashed — not reversible) */
        _demoTokens: {
                'admin': '7b3a1dc0e8f2c5d6a9b4e1f0c3d5a7b9',
                'Cobra': 'e4c6a2d8f1b5e9c3a7d0f2b6e8a1c4d7'
        },

        /* ---------- Security & Session Management ---------- */
        Storage: {
                set(key, value) {
                        const item = { data: value, timestamp: new Date().getTime() };
                        try { localStorage.setItem(key, JSON.stringify(item)); } catch (e) { console.warn('Storage disabled'); }
                },
                get(key, maxAgeHours = 12) {
                        try {
                                const str = localStorage.getItem(key);
                                if (!str) return null;
                                const item = JSON.parse(str);
                                const now = new Date().getTime();
                                if (now - item.timestamp > maxAgeHours * 60 * 60 * 1000) {
                                        localStorage.removeItem(key);
                                        return null; // Expired
                                }
                                return item.data;
                        } catch (e) { return null; }
                },
                remove(key) { localStorage.removeItem(key); }
        },
        RateLimit: function (action, maxAttempts, timeWindowMinutes) {
                const key = `rl_${action}`;
                const history = this.Storage.get(key, 24) || [];
                const now = new Date().getTime();
                const validHistory = history.filter(time => now - time < timeWindowMinutes * 60 * 1000);
                if (validHistory.length >= maxAttempts) return false;
                validHistory.push(now);
                this.Storage.set(key, validHistory);
                return true;
        },

        /* ---------- NYC Bars — All 5 Boroughs ---------- */
        bars: [
                {
                        "id": 101,
                        "borough": "manhattan",
                        "name": "The Dead Rabbit",
                        "neighborhood": "Local Neighborhood",
                        "address": "410 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 33,
                        "votesTonight": 244,
                        "ratingTonight": "4.1",
                        "ratingOverall": "4.5",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 41,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "none",
                        "ageVibe": "21-25",
                        "dressCode": "upscale",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "club",
                                "lounge",
                                "brewery"
                        ],
                        "socialLinks": "@thedeadrabbit",
                        "photos": [
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": true
                },
                {
                        "id": 102,
                        "borough": "manhattan",
                        "name": "Please Don't Tell (PDT)",
                        "neighborhood": "Local Neighborhood",
                        "address": "153 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 98,
                        "votesTonight": 218,
                        "ratingTonight": "4.6",
                        "ratingOverall": "4.5",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "wine bar",
                                "lounge"
                        ],
                        "socialLinks": "@pleasedonttellpdt",
                        "photos": [
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "isViral": true,
                        "premiumListing": false
                },
                {
                        "id": 103,
                        "borough": "manhattan",
                        "name": "Employees Only",
                        "neighborhood": "Local Neighborhood",
                        "address": "74 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 130,
                        "votesTonight": 279,
                        "ratingTonight": "4.3",
                        "ratingOverall": "4.0",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "21-25",
                        "dressCode": "upscale",
                        "happyHour": "None",
                        "tags": [
                                "rooftop",
                                "patio",
                                "dive bar"
                        ],
                        "socialLinks": "@employeesonly",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 104,
                        "borough": "manhattan",
                        "name": "Le Bain",
                        "neighborhood": "Local Neighborhood",
                        "address": "439 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 76,
                        "votesTonight": 177,
                        "ratingTonight": "4.8",
                        "ratingOverall": "4.1",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 5,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "craft cocktails",
                                "club",
                                "lounge",
                                "wine bar"
                        ],
                        "socialLinks": "@lebain",
                        "photos": [
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 105,
                        "borough": "manhattan",
                        "name": "Attaboy",
                        "neighborhood": "Local Neighborhood",
                        "address": "246 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 27,
                        "votesTonight": 55,
                        "ratingTonight": "4.5",
                        "ratingOverall": "4.5",
                        "crowdLevel": 3,
                        "coverCharge": 20,
                        "lineTime": 44,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "mixed",
                        "dressCode": "smart casual",
                        "happyHour": "None",
                        "tags": [
                                "club",
                                "brewery",
                                "rooftop"
                        ],
                        "socialLinks": "@attaboy",
                        "photos": [
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 106,
                        "borough": "manhattan",
                        "name": "The Campbell",
                        "neighborhood": "Local Neighborhood",
                        "address": "147 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 155,
                        "votesTonight": 119,
                        "ratingTonight": "4.8",
                        "ratingOverall": "5.0",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "none",
                        "ageVibe": "30+",
                        "dressCode": "smart casual",
                        "happyHour": "None",
                        "tags": [
                                "lounge",
                                "brewery",
                                "club",
                                "wine bar"
                        ],
                        "socialLinks": "@thecampbell",
                        "photos": [
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 107,
                        "borough": "manhattan",
                        "name": "Bemelmans Bar",
                        "neighborhood": "Local Neighborhood",
                        "address": "12 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 54,
                        "votesTonight": 167,
                        "ratingTonight": "4.0",
                        "ratingOverall": "4.3",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "30+",
                        "dressCode": "smart casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "dive bar",
                                "brewery",
                                "speakeasy"
                        ],
                        "socialLinks": "@bemelmansbar",
                        "photos": [
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 108,
                        "borough": "manhattan",
                        "name": "Angel's Share",
                        "neighborhood": "Local Neighborhood",
                        "address": "125 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 93,
                        "votesTonight": 288,
                        "ratingTonight": "4.6",
                        "ratingOverall": "4.8",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "30+",
                        "dressCode": "smart casual",
                        "happyHour": "None",
                        "tags": [
                                "dive bar",
                                "speakeasy"
                        ],
                        "socialLinks": "@angelsshare",
                        "photos": [
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 109,
                        "borough": "manhattan",
                        "name": "Saxon + Parole",
                        "neighborhood": "Local Neighborhood",
                        "address": "150 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 28,
                        "votesTonight": 62,
                        "ratingTonight": "4.9",
                        "ratingOverall": "4.1",
                        "crowdLevel": 3,
                        "coverCharge": 20,
                        "lineTime": 35,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "none",
                        "ageVibe": "21-25",
                        "dressCode": "casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "rooftop",
                                "craft cocktails",
                                "dive bar",
                                "club"
                        ],
                        "socialLinks": "@saxonparole",
                        "photos": [
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 110,
                        "borough": "manhattan",
                        "name": "Dante",
                        "neighborhood": "Local Neighborhood",
                        "address": "447 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 32,
                        "votesTonight": 134,
                        "ratingTonight": "4.8",
                        "ratingOverall": "4.9",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "none",
                        "ageVibe": "30+",
                        "dressCode": "smart casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "speakeasy",
                                "wine bar",
                                "sports"
                        ],
                        "socialLinks": "@dante",
                        "photos": [
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 111,
                        "borough": "manhattan",
                        "name": "Patent Pending",
                        "neighborhood": "Local Neighborhood",
                        "address": "467 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 54,
                        "votesTonight": 333,
                        "ratingTonight": "4.7",
                        "ratingOverall": "4.9",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 32,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "none",
                        "ageVibe": "30+",
                        "dressCode": "upscale",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "sports",
                                "rooftop"
                        ],
                        "socialLinks": "@patentpending",
                        "photos": [
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 112,
                        "borough": "manhattan",
                        "name": "Flatiron Room",
                        "neighborhood": "Local Neighborhood",
                        "address": "281 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 68,
                        "votesTonight": 206,
                        "ratingTonight": "4.1",
                        "ratingOverall": "4.7",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "None",
                        "tags": [
                                "speakeasy",
                                "rooftop"
                        ],
                        "socialLinks": "@flatironroom",
                        "photos": [
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 113,
                        "borough": "manhattan",
                        "name": "Bar Goto",
                        "neighborhood": "Local Neighborhood",
                        "address": "20 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 12,
                        "votesTonight": 174,
                        "ratingTonight": "4.1",
                        "ratingOverall": "4.8",
                        "crowdLevel": 1,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "mixed",
                        "dressCode": "smart casual",
                        "happyHour": "None",
                        "tags": [
                                "dive bar",
                                "club"
                        ],
                        "socialLinks": "@bargoto",
                        "photos": [
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 114,
                        "borough": "manhattan",
                        "name": "Little Branch",
                        "neighborhood": "Local Neighborhood",
                        "address": "392 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 159,
                        "votesTonight": 250,
                        "ratingTonight": "5.0",
                        "ratingOverall": "4.3",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 5,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "25-35",
                        "dressCode": "smart casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "craft cocktails",
                                "wine bar",
                                "sports"
                        ],
                        "socialLinks": "@littlebranch",
                        "photos": [
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 115,
                        "borough": "manhattan",
                        "name": "Mace",
                        "neighborhood": "Local Neighborhood",
                        "address": "471 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 150,
                        "votesTonight": 126,
                        "ratingTonight": "4.7",
                        "ratingOverall": "4.4",
                        "crowdLevel": 1,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "mixed",
                        "dressCode": "upscale",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "sports",
                                "wine bar",
                                "dive bar",
                                "craft cocktails"
                        ],
                        "socialLinks": "@mace",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 116,
                        "borough": "manhattan",
                        "name": "Raines Law Room",
                        "neighborhood": "Local Neighborhood",
                        "address": "457 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 32,
                        "votesTonight": 78,
                        "ratingTonight": "4.7",
                        "ratingOverall": "4.2",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 10,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "dive bar",
                                "speakeasy",
                                "craft cocktails"
                        ],
                        "socialLinks": "@raineslawroom",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 117,
                        "borough": "manhattan",
                        "name": "Amor y Amargo",
                        "neighborhood": "Local Neighborhood",
                        "address": "359 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 156,
                        "votesTonight": 74,
                        "ratingTonight": "4.1",
                        "ratingOverall": "4.3",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "mixed",
                        "dressCode": "smart casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "lounge",
                                "craft cocktails",
                                "speakeasy"
                        ],
                        "socialLinks": "@amoryamargo",
                        "photos": [
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 118,
                        "borough": "manhattan",
                        "name": "Death & Co",
                        "neighborhood": "Local Neighborhood",
                        "address": "357 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 142,
                        "votesTonight": 293,
                        "ratingTonight": "4.6",
                        "ratingOverall": "4.1",
                        "crowdLevel": 1,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "mixed",
                        "dressCode": "upscale",
                        "happyHour": "None",
                        "tags": [
                                "speakeasy",
                                "lounge"
                        ],
                        "socialLinks": "@deathco",
                        "photos": [
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 119,
                        "borough": "manhattan",
                        "name": "Double Chicken Please",
                        "neighborhood": "Local Neighborhood",
                        "address": "18 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 75,
                        "votesTonight": 89,
                        "ratingTonight": "4.2",
                        "ratingOverall": "4.4",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "21-25",
                        "dressCode": "smart casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "rooftop",
                                "patio",
                                "lounge"
                        ],
                        "socialLinks": "@doublechickenplease",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 120,
                        "borough": "manhattan",
                        "name": "Katana Kitten",
                        "neighborhood": "Local Neighborhood",
                        "address": "325 Main St, manhattan, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in manhattan. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 76,
                        "votesTonight": 304,
                        "ratingTonight": "4.2",
                        "ratingOverall": "4.5",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "none",
                        "ageVibe": "mixed",
                        "dressCode": "upscale",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "wine bar",
                                "lounge",
                                "craft cocktails",
                                "speakeasy"
                        ],
                        "socialLinks": "@katanakitten",
                        "photos": [
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 121,
                        "borough": "brooklyn",
                        "name": "Weather Up",
                        "neighborhood": "Local Neighborhood",
                        "address": "368 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 85,
                        "votesTonight": 57,
                        "ratingTonight": "4.7",
                        "ratingOverall": "4.1",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "30+",
                        "dressCode": "upscale",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "speakeasy",
                                "sports"
                        ],
                        "socialLinks": "@weatherup",
                        "photos": [
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": true
                },
                {
                        "id": 122,
                        "borough": "brooklyn",
                        "name": "The Shanty",
                        "neighborhood": "Local Neighborhood",
                        "address": "241 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 99,
                        "votesTonight": 182,
                        "ratingTonight": "4.5",
                        "ratingOverall": "4.1",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "none",
                        "ageVibe": "21-25",
                        "dressCode": "smart casual",
                        "happyHour": "None",
                        "tags": [
                                "speakeasy",
                                "craft cocktails"
                        ],
                        "socialLinks": "@theshanty",
                        "photos": [
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 123,
                        "borough": "brooklyn",
                        "name": "BKLYN Larder",
                        "neighborhood": "Local Neighborhood",
                        "address": "301 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 82,
                        "votesTonight": 273,
                        "ratingTonight": "4.9",
                        "ratingOverall": "4.7",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "none",
                        "ageVibe": "mixed",
                        "dressCode": "upscale",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "patio",
                                "club",
                                "speakeasy",
                                "dive bar"
                        ],
                        "socialLinks": "@bklynlarder",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 124,
                        "borough": "brooklyn",
                        "name": "Clover Club",
                        "neighborhood": "Local Neighborhood",
                        "address": "193 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 136,
                        "votesTonight": 231,
                        "ratingTonight": "4.0",
                        "ratingOverall": "4.3",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 28,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "21-25",
                        "dressCode": "smart casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "brewery",
                                "dive bar",
                                "patio"
                        ],
                        "socialLinks": "@cloverclub",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 125,
                        "borough": "brooklyn",
                        "name": "Diamond Reef",
                        "neighborhood": "Local Neighborhood",
                        "address": "329 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 73,
                        "votesTonight": 212,
                        "ratingTonight": "4.3",
                        "ratingOverall": "4.4",
                        "crowdLevel": 3,
                        "coverCharge": 20,
                        "lineTime": 19,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "mixed",
                        "dressCode": "upscale",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "craft cocktails",
                                "sports"
                        ],
                        "socialLinks": "@diamondreef",
                        "photos": [
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 126,
                        "borough": "brooklyn",
                        "name": "Maison Premiere",
                        "neighborhood": "Local Neighborhood",
                        "address": "102 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 127,
                        "votesTonight": 341,
                        "ratingTonight": "4.2",
                        "ratingOverall": "4.6",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "30+",
                        "dressCode": "casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "sports",
                                "speakeasy"
                        ],
                        "socialLinks": "@maisonpremiere",
                        "photos": [
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 127,
                        "borough": "brooklyn",
                        "name": "The Richardson",
                        "neighborhood": "Local Neighborhood",
                        "address": "291 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 78,
                        "votesTonight": 255,
                        "ratingTonight": "5.0",
                        "ratingOverall": "4.6",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "25-35",
                        "dressCode": "upscale",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "brewery",
                                "lounge",
                                "dive bar"
                        ],
                        "socialLinks": "@therichardson",
                        "photos": [
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 128,
                        "borough": "brooklyn",
                        "name": "June",
                        "neighborhood": "Local Neighborhood",
                        "address": "482 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 25,
                        "votesTonight": 116,
                        "ratingTonight": "4.7",
                        "ratingOverall": "5.0",
                        "crowdLevel": 1,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "mixed",
                        "dressCode": "upscale",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "wine bar",
                                "speakeasy"
                        ],
                        "socialLinks": "@june",
                        "photos": [
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 129,
                        "borough": "brooklyn",
                        "name": "Black Flamingo",
                        "neighborhood": "Local Neighborhood",
                        "address": "499 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 70,
                        "votesTonight": 180,
                        "ratingTonight": "4.6",
                        "ratingOverall": "4.3",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 39,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "25-35",
                        "dressCode": "upscale",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "sports",
                                "club"
                        ],
                        "socialLinks": "@blackflamingo",
                        "photos": [
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 130,
                        "borough": "brooklyn",
                        "name": "The Narrows",
                        "neighborhood": "Local Neighborhood",
                        "address": "392 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 60,
                        "votesTonight": 214,
                        "ratingTonight": "4.5",
                        "ratingOverall": "4.7",
                        "crowdLevel": 3,
                        "coverCharge": 20,
                        "lineTime": 1,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "sports",
                                "brewery",
                                "lounge"
                        ],
                        "socialLinks": "@thenarrows",
                        "photos": [
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 131,
                        "borough": "brooklyn",
                        "name": "Greenpoint Beer & Ale",
                        "neighborhood": "Local Neighborhood",
                        "address": "31 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 55,
                        "votesTonight": 82,
                        "ratingTonight": "4.0",
                        "ratingOverall": "4.7",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "25-35",
                        "dressCode": "smart casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "dive bar",
                                "club"
                        ],
                        "socialLinks": "@greenpointbeerale",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": true
                },
                {
                        "id": 132,
                        "borough": "brooklyn",
                        "name": "Fresh Kills Bar",
                        "neighborhood": "Local Neighborhood",
                        "address": "280 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 18,
                        "votesTonight": 348,
                        "ratingTonight": "4.3",
                        "ratingOverall": "4.8",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "30+",
                        "dressCode": "casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "brewery",
                                "speakeasy"
                        ],
                        "socialLinks": "@freshkillsbar",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 133,
                        "borough": "brooklyn",
                        "name": "Sunny's Bar",
                        "neighborhood": "Local Neighborhood",
                        "address": "127 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 76,
                        "votesTonight": 247,
                        "ratingTonight": "4.6",
                        "ratingOverall": "4.4",
                        "crowdLevel": 1,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "21-25",
                        "dressCode": "upscale",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "lounge",
                                "craft cocktails"
                        ],
                        "socialLinks": "@sunnysbar",
                        "photos": [
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 134,
                        "borough": "brooklyn",
                        "name": "Westlight",
                        "neighborhood": "Local Neighborhood",
                        "address": "208 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 24,
                        "votesTonight": 166,
                        "ratingTonight": "4.2",
                        "ratingOverall": "4.4",
                        "crowdLevel": 1,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "21-25",
                        "dressCode": "upscale",
                        "happyHour": "None",
                        "tags": [
                                "lounge",
                                "wine bar",
                                "patio",
                                "rooftop"
                        ],
                        "socialLinks": "@westlight",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 135,
                        "borough": "brooklyn",
                        "name": "Boobie Trap",
                        "neighborhood": "Local Neighborhood",
                        "address": "161 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 134,
                        "votesTonight": 57,
                        "ratingTonight": "5.0",
                        "ratingOverall": "4.9",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "mixed",
                        "dressCode": "upscale",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "club",
                                "rooftop",
                                "patio"
                        ],
                        "socialLinks": "@boobietrap",
                        "photos": [
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 136,
                        "borough": "brooklyn",
                        "name": "Zombie Hut",
                        "neighborhood": "Local Neighborhood",
                        "address": "284 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 29,
                        "votesTonight": 66,
                        "ratingTonight": "4.8",
                        "ratingOverall": "5.0",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "brewery",
                                "patio",
                                "rooftop"
                        ],
                        "socialLinks": "@zombiehut",
                        "photos": [
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 137,
                        "borough": "brooklyn",
                        "name": "Leyenda",
                        "neighborhood": "Local Neighborhood",
                        "address": "32 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 120,
                        "votesTonight": 242,
                        "ratingTonight": "4.8",
                        "ratingOverall": "4.3",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 36,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "21-25",
                        "dressCode": "upscale",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "lounge",
                                "dive bar",
                                "rooftop"
                        ],
                        "socialLinks": "@leyenda",
                        "photos": [
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 138,
                        "borough": "brooklyn",
                        "name": "Grand Army",
                        "neighborhood": "Local Neighborhood",
                        "address": "307 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 152,
                        "votesTonight": 133,
                        "ratingTonight": "4.1",
                        "ratingOverall": "4.2",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 7,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "25-35",
                        "dressCode": "upscale",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "lounge",
                                "wine bar"
                        ],
                        "socialLinks": "@grandarmy",
                        "photos": [
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 139,
                        "borough": "brooklyn",
                        "name": "Tørst",
                        "neighborhood": "Local Neighborhood",
                        "address": "292 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 43,
                        "votesTonight": 128,
                        "ratingTonight": "4.3",
                        "ratingOverall": "4.4",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 33,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "21-25",
                        "dressCode": "smart casual",
                        "happyHour": "None",
                        "tags": [
                                "patio",
                                "speakeasy"
                        ],
                        "socialLinks": "@trst",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 140,
                        "borough": "brooklyn",
                        "name": "Union Pool",
                        "neighborhood": "Local Neighborhood",
                        "address": "489 Main St, brooklyn, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in brooklyn. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 82,
                        "votesTonight": 300,
                        "ratingTonight": "4.9",
                        "ratingOverall": "4.1",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "mixed",
                        "dressCode": "smart casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "club",
                                "sports",
                                "rooftop"
                        ],
                        "socialLinks": "@unionpool",
                        "photos": [
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 141,
                        "borough": "queens",
                        "name": "Dutch Kills",
                        "neighborhood": "Local Neighborhood",
                        "address": "115 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 55,
                        "votesTonight": 94,
                        "ratingTonight": "4.3",
                        "ratingOverall": "4.5",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "30+",
                        "dressCode": "smart casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "speakeasy",
                                "club",
                                "craft cocktails"
                        ],
                        "socialLinks": "@dutchkills",
                        "photos": [
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 142,
                        "borough": "queens",
                        "name": "The Bonnie",
                        "neighborhood": "Local Neighborhood",
                        "address": "427 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 143,
                        "votesTonight": 264,
                        "ratingTonight": "4.7",
                        "ratingOverall": "4.3",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "30+",
                        "dressCode": "upscale",
                        "happyHour": "None",
                        "tags": [
                                "lounge",
                                "patio"
                        ],
                        "socialLinks": "@thebonnie",
                        "photos": [
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 143,
                        "borough": "queens",
                        "name": "Snowdonia",
                        "neighborhood": "Local Neighborhood",
                        "address": "40 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 33,
                        "votesTonight": 287,
                        "ratingTonight": "4.2",
                        "ratingOverall": "4.9",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 16,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "21-25",
                        "dressCode": "casual",
                        "happyHour": "None",
                        "tags": [
                                "dive bar",
                                "lounge"
                        ],
                        "socialLinks": "@snowdonia",
                        "photos": [
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 144,
                        "borough": "queens",
                        "name": "The Sparrow",
                        "neighborhood": "Local Neighborhood",
                        "address": "48 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 72,
                        "votesTonight": 230,
                        "ratingTonight": "4.9",
                        "ratingOverall": "4.6",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 27,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "21-25",
                        "dressCode": "upscale",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "speakeasy",
                                "club",
                                "dive bar"
                        ],
                        "socialLinks": "@thesparrow",
                        "photos": [
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 145,
                        "borough": "queens",
                        "name": "Casa Enrique",
                        "neighborhood": "Local Neighborhood",
                        "address": "178 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 75,
                        "votesTonight": 151,
                        "ratingTonight": "4.2",
                        "ratingOverall": "4.8",
                        "crowdLevel": 1,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "craft cocktails",
                                "sports"
                        ],
                        "socialLinks": "@casaenrique",
                        "photos": [
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 146,
                        "borough": "queens",
                        "name": "Mosaic",
                        "neighborhood": "Local Neighborhood",
                        "address": "489 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 149,
                        "votesTonight": 61,
                        "ratingTonight": "4.6",
                        "ratingOverall": "4.5",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "30+",
                        "dressCode": "casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "wine bar",
                                "speakeasy",
                                "patio"
                        ],
                        "socialLinks": "@mosaic",
                        "photos": [
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 147,
                        "borough": "queens",
                        "name": "Doha Bar",
                        "neighborhood": "Local Neighborhood",
                        "address": "193 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 21,
                        "votesTonight": 86,
                        "ratingTonight": "4.5",
                        "ratingOverall": "4.9",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "21-25",
                        "dressCode": "smart casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "dive bar",
                                "club",
                                "rooftop"
                        ],
                        "socialLinks": "@dohabar",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 148,
                        "borough": "queens",
                        "name": "Bohemian Beer Garden",
                        "neighborhood": "Local Neighborhood",
                        "address": "22 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 29,
                        "votesTonight": 324,
                        "ratingTonight": "5.0",
                        "ratingOverall": "4.0",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 30,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "none",
                        "ageVibe": "30+",
                        "dressCode": "smart casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "rooftop",
                                "patio",
                                "lounge",
                                "dive bar"
                        ],
                        "socialLinks": "@bohemianbeergarden",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 149,
                        "borough": "queens",
                        "name": "Bierocracy",
                        "neighborhood": "Local Neighborhood",
                        "address": "105 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 13,
                        "votesTonight": 150,
                        "ratingTonight": "4.5",
                        "ratingOverall": "4.1",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "21-25",
                        "dressCode": "casual",
                        "happyHour": "None",
                        "tags": [
                                "dive bar",
                                "craft cocktails"
                        ],
                        "socialLinks": "@bierocracy",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 150,
                        "borough": "queens",
                        "name": "The Standing Room",
                        "neighborhood": "Local Neighborhood",
                        "address": "127 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 115,
                        "votesTonight": 186,
                        "ratingTonight": "4.7",
                        "ratingOverall": "5.0",
                        "crowdLevel": 3,
                        "coverCharge": 20,
                        "lineTime": 34,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "mixed",
                        "dressCode": "smart casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "club",
                                "sports",
                                "speakeasy",
                                "wine bar"
                        ],
                        "socialLinks": "@thestandingroom",
                        "photos": [
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 151,
                        "borough": "queens",
                        "name": "Cafe Henri",
                        "neighborhood": "Local Neighborhood",
                        "address": "365 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 82,
                        "votesTonight": 334,
                        "ratingTonight": "4.6",
                        "ratingOverall": "4.5",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 15,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "mixed",
                        "dressCode": "smart casual",
                        "happyHour": "None",
                        "tags": [
                                "rooftop",
                                "brewery"
                        ],
                        "socialLinks": "@cafehenri",
                        "photos": [
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 152,
                        "borough": "queens",
                        "name": "Blend",
                        "neighborhood": "Local Neighborhood",
                        "address": "169 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 40,
                        "votesTonight": 53,
                        "ratingTonight": "4.7",
                        "ratingOverall": "4.4",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "25-35",
                        "dressCode": "casual",
                        "happyHour": "None",
                        "tags": [
                                "sports",
                                "speakeasy",
                                "brewery"
                        ],
                        "socialLinks": "@blend",
                        "photos": [
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 153,
                        "borough": "queens",
                        "name": "Sweet Afton",
                        "neighborhood": "Local Neighborhood",
                        "address": "461 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 95,
                        "votesTonight": 343,
                        "ratingTonight": "4.1",
                        "ratingOverall": "4.3",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 10,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "none",
                        "ageVibe": "25-35",
                        "dressCode": "smart casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "sports",
                                "club"
                        ],
                        "socialLinks": "@sweetafton",
                        "photos": [
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 154,
                        "borough": "queens",
                        "name": "LIC Bar",
                        "neighborhood": "Local Neighborhood",
                        "address": "278 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 53,
                        "votesTonight": 195,
                        "ratingTonight": "4.0",
                        "ratingOverall": "4.9",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 25,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "30+",
                        "dressCode": "upscale",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "club",
                                "sports"
                        ],
                        "socialLinks": "@licbar",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 155,
                        "borough": "queens",
                        "name": "Dominies",
                        "neighborhood": "Local Neighborhood",
                        "address": "484 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 157,
                        "votesTonight": 98,
                        "ratingTonight": "4.6",
                        "ratingOverall": "4.8",
                        "crowdLevel": 1,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "mixed",
                        "dressCode": "smart casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "dive bar",
                                "craft cocktails",
                                "wine bar",
                                "patio"
                        ],
                        "socialLinks": "@dominies",
                        "photos": [
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": true
                },
                {
                        "id": 156,
                        "borough": "queens",
                        "name": "Kelly's",
                        "neighborhood": "Local Neighborhood",
                        "address": "438 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 60,
                        "votesTonight": 149,
                        "ratingTonight": "4.3",
                        "ratingOverall": "4.1",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "None",
                        "tags": [
                                "lounge",
                                "club",
                                "craft cocktails",
                                "dive bar"
                        ],
                        "socialLinks": "@kellys",
                        "photos": [
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 157,
                        "borough": "queens",
                        "name": "Astoria Tavern",
                        "neighborhood": "Local Neighborhood",
                        "address": "164 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 29,
                        "votesTonight": 69,
                        "ratingTonight": "4.6",
                        "ratingOverall": "4.4",
                        "crowdLevel": 1,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "21-25",
                        "dressCode": "casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "club",
                                "dive bar",
                                "sports",
                                "patio"
                        ],
                        "socialLinks": "@astoriatavern",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 158,
                        "borough": "queens",
                        "name": "Sanger Hall",
                        "neighborhood": "Local Neighborhood",
                        "address": "333 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 81,
                        "votesTonight": 73,
                        "ratingTonight": "4.4",
                        "ratingOverall": "4.5",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "30+",
                        "dressCode": "smart casual",
                        "happyHour": "None",
                        "tags": [
                                "brewery",
                                "dive bar"
                        ],
                        "socialLinks": "@sangerhall",
                        "photos": [
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 159,
                        "borough": "queens",
                        "name": "Sekend Sun",
                        "neighborhood": "Local Neighborhood",
                        "address": "2 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 156,
                        "votesTonight": 105,
                        "ratingTonight": "4.7",
                        "ratingOverall": "4.2",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 1,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "21-25",
                        "dressCode": "upscale",
                        "happyHour": "None",
                        "tags": [
                                "lounge",
                                "wine bar"
                        ],
                        "socialLinks": "@sekendsun",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 160,
                        "borough": "queens",
                        "name": "Neir's Tavern",
                        "neighborhood": "Local Neighborhood",
                        "address": "306 Main St, queens, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in queens. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 112,
                        "votesTonight": 260,
                        "ratingTonight": "4.0",
                        "ratingOverall": "4.7",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "mixed",
                        "dressCode": "smart casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "club",
                                "speakeasy",
                                "wine bar",
                                "craft cocktails"
                        ],
                        "socialLinks": "@neirstavern",
                        "photos": [
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 161,
                        "borough": "bronx",
                        "name": "Bronx Draft House",
                        "neighborhood": "Local Neighborhood",
                        "address": "401 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 96,
                        "votesTonight": 140,
                        "ratingTonight": "4.6",
                        "ratingOverall": "4.4",
                        "crowdLevel": 3,
                        "coverCharge": 20,
                        "lineTime": 3,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "none",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "None",
                        "tags": [
                                "speakeasy",
                                "wine bar",
                                "sports"
                        ],
                        "socialLinks": "@bronxdrafthouse",
                        "photos": [
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 162,
                        "borough": "bronx",
                        "name": "Beatstro",
                        "neighborhood": "Local Neighborhood",
                        "address": "429 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 65,
                        "votesTonight": 276,
                        "ratingTonight": "4.2",
                        "ratingOverall": "4.3",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 34,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "21-25",
                        "dressCode": "upscale",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "sports",
                                "club",
                                "wine bar"
                        ],
                        "socialLinks": "@beatstro",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 163,
                        "borough": "bronx",
                        "name": "The Slab",
                        "neighborhood": "Local Neighborhood",
                        "address": "429 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 39,
                        "votesTonight": 83,
                        "ratingTonight": "4.4",
                        "ratingOverall": "4.1",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 34,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "21-25",
                        "dressCode": "upscale",
                        "happyHour": "None",
                        "tags": [
                                "craft cocktails",
                                "patio",
                                "rooftop"
                        ],
                        "socialLinks": "@theslab",
                        "photos": [
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 164,
                        "borough": "bronx",
                        "name": "Ceetay",
                        "neighborhood": "Local Neighborhood",
                        "address": "28 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 17,
                        "votesTonight": 63,
                        "ratingTonight": "4.1",
                        "ratingOverall": "4.5",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "21-25",
                        "dressCode": "casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "dive bar",
                                "sports",
                                "rooftop",
                                "wine bar"
                        ],
                        "socialLinks": "@ceetay",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 165,
                        "borough": "bronx",
                        "name": "Ooo Wee!",
                        "neighborhood": "Local Neighborhood",
                        "address": "298 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 128,
                        "votesTonight": 170,
                        "ratingTonight": "4.5",
                        "ratingOverall": "4.1",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 30,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "club",
                                "speakeasy",
                                "patio",
                                "wine bar"
                        ],
                        "socialLinks": "@ooowee",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 166,
                        "borough": "bronx",
                        "name": "Port Morris Distillery",
                        "neighborhood": "Local Neighborhood",
                        "address": "496 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 156,
                        "votesTonight": 296,
                        "ratingTonight": "5.0",
                        "ratingOverall": "4.7",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 37,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "25-35",
                        "dressCode": "upscale",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "craft cocktails",
                                "patio",
                                "sports",
                                "club"
                        ],
                        "socialLinks": "@portmorrisdistillery",
                        "photos": [
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 167,
                        "borough": "bronx",
                        "name": "Bronx Alehouse",
                        "neighborhood": "Local Neighborhood",
                        "address": "440 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 124,
                        "votesTonight": 335,
                        "ratingTonight": "4.2",
                        "ratingOverall": "4.4",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 18,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "25-35",
                        "dressCode": "casual",
                        "happyHour": "None",
                        "tags": [
                                "wine bar",
                                "patio",
                                "sports",
                                "club"
                        ],
                        "socialLinks": "@bronxalehouse",
                        "photos": [
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 168,
                        "borough": "bronx",
                        "name": "Brewed",
                        "neighborhood": "Local Neighborhood",
                        "address": "301 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 38,
                        "votesTonight": 147,
                        "ratingTonight": "4.1",
                        "ratingOverall": "4.3",
                        "crowdLevel": 3,
                        "coverCharge": 20,
                        "lineTime": 29,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "21-25",
                        "dressCode": "casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "sports",
                                "patio"
                        ],
                        "socialLinks": "@brewed",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 169,
                        "borough": "bronx",
                        "name": "Gun Hill Brewing",
                        "neighborhood": "Local Neighborhood",
                        "address": "320 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 127,
                        "votesTonight": 194,
                        "ratingTonight": "4.9",
                        "ratingOverall": "4.7",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 40,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "club",
                                "rooftop"
                        ],
                        "socialLinks": "@gunhillbrewing",
                        "photos": [
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 170,
                        "borough": "bronx",
                        "name": "Mike's",
                        "neighborhood": "Local Neighborhood",
                        "address": "53 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 125,
                        "votesTonight": 259,
                        "ratingTonight": "4.4",
                        "ratingOverall": "4.2",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "mixed",
                        "dressCode": "upscale",
                        "happyHour": "None",
                        "tags": [
                                "brewery",
                                "sports",
                                "craft cocktails",
                                "dive bar"
                        ],
                        "socialLinks": "@mikes",
                        "photos": [
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 171,
                        "borough": "bronx",
                        "name": "Gasolina",
                        "neighborhood": "Local Neighborhood",
                        "address": "366 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 97,
                        "votesTonight": 116,
                        "ratingTonight": "4.8",
                        "ratingOverall": "4.7",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "25-35",
                        "dressCode": "upscale",
                        "happyHour": "None",
                        "tags": [
                                "rooftop",
                                "patio",
                                "club",
                                "lounge"
                        ],
                        "socialLinks": "@gasolina",
                        "photos": [
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 172,
                        "borough": "bronx",
                        "name": "Concoctions",
                        "neighborhood": "Local Neighborhood",
                        "address": "25 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 62,
                        "votesTonight": 175,
                        "ratingTonight": "4.4",
                        "ratingOverall": "4.3",
                        "crowdLevel": 3,
                        "coverCharge": 20,
                        "lineTime": 25,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "25-35",
                        "dressCode": "smart casual",
                        "happyHour": "None",
                        "tags": [
                                "speakeasy",
                                "dive bar",
                                "craft cocktails",
                                "wine bar"
                        ],
                        "socialLinks": "@concoctions",
                        "photos": [
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 173,
                        "borough": "bronx",
                        "name": "The Bronx Brewery",
                        "neighborhood": "Local Neighborhood",
                        "address": "253 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 26,
                        "votesTonight": 344,
                        "ratingTonight": "4.0",
                        "ratingOverall": "4.9",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 44,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "21-25",
                        "dressCode": "smart casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "dive bar",
                                "speakeasy",
                                "lounge"
                        ],
                        "socialLinks": "@thebronxbrewery",
                        "photos": [
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 174,
                        "borough": "bronx",
                        "name": "Bar 47",
                        "neighborhood": "Local Neighborhood",
                        "address": "484 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 63,
                        "votesTonight": 50,
                        "ratingTonight": "4.4",
                        "ratingOverall": "5.0",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "25-35",
                        "dressCode": "smart casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "rooftop",
                                "dive bar"
                        ],
                        "socialLinks": "@bar47",
                        "photos": [
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 175,
                        "borough": "bronx",
                        "name": "Salsa Con Fuego",
                        "neighborhood": "Local Neighborhood",
                        "address": "476 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 74,
                        "votesTonight": 275,
                        "ratingTonight": "4.9",
                        "ratingOverall": "4.1",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "mixed",
                        "dressCode": "smart casual",
                        "happyHour": "None",
                        "tags": [
                                "sports",
                                "brewery",
                                "lounge"
                        ],
                        "socialLinks": "@salsaconfuego",
                        "photos": [
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 176,
                        "borough": "bronx",
                        "name": "Glazz",
                        "neighborhood": "Local Neighborhood",
                        "address": "220 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 148,
                        "votesTonight": 203,
                        "ratingTonight": "4.0",
                        "ratingOverall": "4.1",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "25-35",
                        "dressCode": "casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "dive bar",
                                "brewery",
                                "sports",
                                "craft cocktails"
                        ],
                        "socialLinks": "@glazz",
                        "photos": [
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 177,
                        "borough": "bronx",
                        "name": "Pina",
                        "neighborhood": "Local Neighborhood",
                        "address": "441 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 140,
                        "votesTonight": 186,
                        "ratingTonight": "4.5",
                        "ratingOverall": "4.2",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "None",
                        "tags": [
                                "club",
                                "craft cocktails",
                                "speakeasy",
                                "lounge"
                        ],
                        "socialLinks": "@pina",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 178,
                        "borough": "bronx",
                        "name": "Made in Puerto Rico",
                        "neighborhood": "Local Neighborhood",
                        "address": "121 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 26,
                        "votesTonight": 325,
                        "ratingTonight": "4.3",
                        "ratingOverall": "4.3",
                        "crowdLevel": 3,
                        "coverCharge": 20,
                        "lineTime": 29,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "21-25",
                        "dressCode": "casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "lounge",
                                "wine bar",
                                "dive bar",
                                "craft cocktails"
                        ],
                        "socialLinks": "@madeinpuertorico",
                        "photos": [
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 179,
                        "borough": "bronx",
                        "name": "Tirado",
                        "neighborhood": "Local Neighborhood",
                        "address": "118 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 75,
                        "votesTonight": 288,
                        "ratingTonight": "4.9",
                        "ratingOverall": "4.3",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "25-35",
                        "dressCode": "smart casual",
                        "happyHour": "None",
                        "tags": [
                                "club",
                                "speakeasy",
                                "brewery",
                                "lounge"
                        ],
                        "socialLinks": "@tirado",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 180,
                        "borough": "bronx",
                        "name": "The Lounge",
                        "neighborhood": "Local Neighborhood",
                        "address": "75 Main St, bronx, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in bronx. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 139,
                        "votesTonight": 199,
                        "ratingTonight": "4.6",
                        "ratingOverall": "4.5",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "None",
                        "tags": [
                                "patio",
                                "dive bar",
                                "speakeasy"
                        ],
                        "socialLinks": "@thelounge",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 181,
                        "borough": "staten_island",
                        "name": "Blue Lounge",
                        "neighborhood": "Local Neighborhood",
                        "address": "225 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 91,
                        "votesTonight": 181,
                        "ratingTonight": "4.2",
                        "ratingOverall": "4.6",
                        "crowdLevel": 1,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "25-35",
                        "dressCode": "casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "rooftop",
                                "dive bar",
                                "patio"
                        ],
                        "socialLinks": "@bluelounge",
                        "photos": [
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 182,
                        "borough": "staten_island",
                        "name": "Adobe Blues",
                        "neighborhood": "Local Neighborhood",
                        "address": "91 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 41,
                        "votesTonight": 326,
                        "ratingTonight": "4.3",
                        "ratingOverall": "4.6",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "craft cocktails",
                                "patio",
                                "lounge"
                        ],
                        "socialLinks": "@adobeblues",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 183,
                        "borough": "staten_island",
                        "name": "Lee's Tavern",
                        "neighborhood": "Local Neighborhood",
                        "address": "332 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 77,
                        "votesTonight": 335,
                        "ratingTonight": "4.4",
                        "ratingOverall": "4.8",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 27,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "21-25",
                        "dressCode": "upscale",
                        "happyHour": "None",
                        "tags": [
                                "rooftop",
                                "wine bar",
                                "lounge",
                                "dive bar"
                        ],
                        "socialLinks": "@leestavern",
                        "photos": [
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 184,
                        "borough": "staten_island",
                        "name": "Liedy's Shore Inn",
                        "neighborhood": "Local Neighborhood",
                        "address": "220 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 140,
                        "votesTonight": 128,
                        "ratingTonight": "4.9",
                        "ratingOverall": "4.7",
                        "crowdLevel": 3,
                        "coverCharge": 20,
                        "lineTime": 14,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "mixed",
                        "dressCode": "upscale",
                        "happyHour": "None",
                        "tags": [
                                "dive bar",
                                "lounge"
                        ],
                        "socialLinks": "@liedysshoreinn",
                        "photos": [
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 185,
                        "borough": "staten_island",
                        "name": "Flagship Brewing",
                        "neighborhood": "Local Neighborhood",
                        "address": "134 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 151,
                        "votesTonight": 271,
                        "ratingTonight": "4.8",
                        "ratingOverall": "4.3",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 35,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "30+",
                        "dressCode": "casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "patio",
                                "club"
                        ],
                        "socialLinks": "@flagshipbrewing",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 186,
                        "borough": "staten_island",
                        "name": "Craft House",
                        "neighborhood": "Local Neighborhood",
                        "address": "362 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 37,
                        "votesTonight": 315,
                        "ratingTonight": "4.6",
                        "ratingOverall": "5.0",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 11,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "none",
                        "ageVibe": "mixed",
                        "dressCode": "casual",
                        "happyHour": "None",
                        "tags": [
                                "wine bar",
                                "lounge"
                        ],
                        "socialLinks": "@crafthouse",
                        "photos": [
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 187,
                        "borough": "staten_island",
                        "name": "Beso",
                        "neighborhood": "Local Neighborhood",
                        "address": "161 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 90,
                        "votesTonight": 310,
                        "ratingTonight": "4.1",
                        "ratingOverall": "4.9",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 15,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "25-35",
                        "dressCode": "upscale",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "patio",
                                "wine bar",
                                "speakeasy",
                                "club"
                        ],
                        "socialLinks": "@beso",
                        "photos": [
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 188,
                        "borough": "staten_island",
                        "name": "Every Thing Goes",
                        "neighborhood": "Local Neighborhood",
                        "address": "195 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 45,
                        "votesTonight": 75,
                        "ratingTonight": "4.1",
                        "ratingOverall": "4.6",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "25-35",
                        "dressCode": "casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "sports",
                                "lounge"
                        ],
                        "socialLinks": "@everythinggoes",
                        "photos": [
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 189,
                        "borough": "staten_island",
                        "name": "Hop Shoppe",
                        "neighborhood": "Local Neighborhood",
                        "address": "98 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 142,
                        "votesTonight": 94,
                        "ratingTonight": "4.9",
                        "ratingOverall": "4.5",
                        "crowdLevel": 3,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "25-35",
                        "dressCode": "smart casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "rooftop",
                                "dive bar",
                                "speakeasy"
                        ],
                        "socialLinks": "@hopshoppe",
                        "photos": [
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 190,
                        "borough": "staten_island",
                        "name": "Dugout",
                        "neighborhood": "Local Neighborhood",
                        "address": "197 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 124,
                        "votesTonight": 252,
                        "ratingTonight": "4.4",
                        "ratingOverall": "4.4",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "21-25",
                        "dressCode": "smart casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "brewery",
                                "rooftop",
                                "dive bar",
                                "wine bar"
                        ],
                        "socialLinks": "@dugout",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 191,
                        "borough": "staten_island",
                        "name": "Karl's Klipper",
                        "neighborhood": "Local Neighborhood",
                        "address": "347 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 50,
                        "votesTonight": 125,
                        "ratingTonight": "4.2",
                        "ratingOverall": "4.3",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 7,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "30+",
                        "dressCode": "casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "speakeasy",
                                "lounge"
                        ],
                        "socialLinks": "@karlsklipper",
                        "photos": [
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 192,
                        "borough": "staten_island",
                        "name": "The Stone House",
                        "neighborhood": "Local Neighborhood",
                        "address": "84 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 99,
                        "votesTonight": 264,
                        "ratingTonight": "4.4",
                        "ratingOverall": "4.2",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 13,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "none",
                        "ageVibe": "21-25",
                        "dressCode": "smart casual",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "rooftop",
                                "lounge",
                                "dive bar"
                        ],
                        "socialLinks": "@thestonehouse",
                        "photos": [
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 193,
                        "borough": "staten_island",
                        "name": "Mother Pug's Saloon",
                        "neighborhood": "Local Neighborhood",
                        "address": "462 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 136,
                        "votesTonight": 213,
                        "ratingTonight": "4.0",
                        "ratingOverall": "4.9",
                        "crowdLevel": 4,
                        "coverCharge": 20,
                        "lineTime": 14,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "21-25",
                        "dressCode": "upscale",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "craft cocktails",
                                "dive bar",
                                "lounge",
                                "club"
                        ],
                        "socialLinks": "@motherpugssaloon",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 194,
                        "borough": "staten_island",
                        "name": "Doc Hennigan's",
                        "neighborhood": "Local Neighborhood",
                        "address": "27 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "lit",
                        "vibeEmoji": "🔥",
                        "vibeLabel": "LIT",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 145,
                        "votesTonight": 300,
                        "ratingTonight": "4.1",
                        "ratingOverall": "4.0",
                        "crowdLevel": 3,
                        "coverCharge": 20,
                        "lineTime": 13,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "30+",
                        "dressCode": "casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "wine bar",
                                "club"
                        ],
                        "socialLinks": "@dochennigans",
                        "photos": [
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 195,
                        "borough": "staten_island",
                        "name": "Burrito Bar",
                        "neighborhood": "Local Neighborhood",
                        "address": "44 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 158,
                        "votesTonight": 329,
                        "ratingTonight": "4.4",
                        "ratingOverall": "4.9",
                        "crowdLevel": 5,
                        "coverCharge": 20,
                        "lineTime": 20,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "ambient",
                        "ageVibe": "mixed",
                        "dressCode": "upscale",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "rooftop",
                                "brewery",
                                "lounge",
                                "patio"
                        ],
                        "socialLinks": "@burritobar",
                        "photos": [
                                "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 196,
                        "borough": "staten_island",
                        "name": "Ralph's Sports Bar",
                        "neighborhood": "Local Neighborhood",
                        "address": "156 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 108,
                        "votesTonight": 304,
                        "ratingTonight": "4.4",
                        "ratingOverall": "4.3",
                        "crowdLevel": 1,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "25-35",
                        "dressCode": "upscale",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "sports",
                                "speakeasy",
                                "brewery"
                        ],
                        "socialLinks": "@ralphssportsbar",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": true,
                        "premiumListing": false
                },
                {
                        "id": 197,
                        "borough": "staten_island",
                        "name": "Trackside Bar",
                        "neighborhood": "Local Neighborhood",
                        "address": "189 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 117,
                        "votesTonight": 241,
                        "ratingTonight": "4.9",
                        "ratingOverall": "4.8",
                        "crowdLevel": 3,
                        "coverCharge": 20,
                        "lineTime": 26,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "30+",
                        "dressCode": "smart casual",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "brewery",
                                "patio",
                                "speakeasy"
                        ],
                        "socialLinks": "@tracksidebar",
                        "photos": [
                                "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 198,
                        "borough": "staten_island",
                        "name": "Marina Cafe",
                        "neighborhood": "Local Neighborhood",
                        "address": "351 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "music",
                        "vibeEmoji": "🎵",
                        "vibeLabel": "Live Music",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 139,
                        "votesTonight": 189,
                        "ratingTonight": "4.5",
                        "ratingOverall": "4.6",
                        "crowdLevel": 1,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "jukebox",
                        "ageVibe": "21-25",
                        "dressCode": "upscale",
                        "happyHour": "3 PM – 6 PM: $1 Oysters",
                        "tags": [
                                "craft cocktails",
                                "rooftop"
                        ],
                        "socialLinks": "@marinacafe",
                        "photos": [
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                },
                {
                        "id": 199,
                        "borough": "staten_island",
                        "name": "The Vanderbilt",
                        "neighborhood": "Local Neighborhood",
                        "address": "87 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "hype",
                        "vibeEmoji": "⚡",
                        "vibeLabel": "Hype",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 144,
                        "votesTonight": 58,
                        "ratingTonight": "4.9",
                        "ratingOverall": "4.8",
                        "crowdLevel": 3,
                        "coverCharge": 20,
                        "lineTime": 10,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "DJ",
                        "ageVibe": "mixed",
                        "dressCode": "upscale",
                        "happyHour": "5 PM – 8 PM: Half-price Cocktails",
                        "tags": [
                                "brewery",
                                "dive bar",
                                "patio",
                                "sports"
                        ],
                        "socialLinks": "@thevanderbilt",
                        "photos": [
                                "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": true
                },
                {
                        "id": 200,
                        "borough": "staten_island",
                        "name": "South Fin Grill",
                        "neighborhood": "Local Neighborhood",
                        "address": "329 Main St, staten_island, NY 10000",
                        "hours": "4 PM – 2 AM",
                        "description": "An amazing local venue in staten_island. Great drinks, good people, perfect spot for the night.",
                        "vibe": "chill",
                        "vibeEmoji": "🥂",
                        "vibeLabel": "Chill",
                        "specials": "Craft Cocktails $14 · Local Drafts $7",
                        "image": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                        "isLive": true,
                        "checkedIn": 110,
                        "votesTonight": 119,
                        "ratingTonight": "4.2",
                        "ratingOverall": "4.2",
                        "crowdLevel": 2,
                        "coverCharge": 0,
                        "lineTime": 0,
                        "drinksMenu": [
                                "Signature Old Fashioned $16",
                                "Margarita Pitcher $45",
                                "House Lager Draft $7",
                                "Spicy Paloma $15"
                        ],
                        "musicGenre": "live band",
                        "ageVibe": "21-25",
                        "dressCode": "smart casual",
                        "happyHour": "4 PM – 7 PM: $5 Drafts, $8 Well Drinks",
                        "tags": [
                                "patio",
                                "rooftop",
                                "wine bar"
                        ],
                        "socialLinks": "@southfingrill",
                        "photos": [
                                "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80",
                                "https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80"
                        ],
                        "trending": false,
                        "premiumListing": false
                }
        ],

        /* ---------- Mock Comments ---------- */
        comments: [
                { user: 'MikeD', avatar: 'M', time: '2 min ago', text: 'Place is going OFF right now 🔥 DJ just dropped some heat', barId: 1 },
                { user: 'JessicaS', avatar: 'J', time: '5 min ago', text: 'Line out the door but worth the wait. Vibes are immaculate tonight', barId: 1 },
                { user: 'Cobra', avatar: 'C', time: '8 min ago', text: 'Just got here, already ordered a whiskey sour. Crowd is building fast', barId: 1 },
                { user: 'AnthonyR', avatar: 'A', time: '12 min ago', text: 'Great spot for a chill night. The rye whiskey flight is a must-try', barId: 2 },
                { user: 'SarahK', avatar: 'S', time: '15 min ago', text: 'This place feels like a secret. Love the moody vibes and strong drinks', barId: 2 },
                { user: 'TommyG', avatar: 'T', time: '20 min ago', text: 'Game is on, wings are ordered, beer is cold. Perfect setup 🏈', barId: 3 },
                { user: 'NinaP', avatar: 'N', time: '25 min ago', text: 'Outdoor area is beautiful tonight. Perfect weather for it', barId: 3 },
                { user: 'DanielR', avatar: 'D', time: '30 min ago', text: 'Band tonight is incredible! Playing classic rock covers. Place is packed', barId: 8 },
                { user: 'LisaM', avatar: 'L', time: '35 min ago', text: 'Trivia night going strong. Our team is in 2nd place 💪', barId: 4 },
                { user: 'CarlosV', avatar: 'C', time: '40 min ago', text: 'Best craft beer selection on the island. Hands down. The porter is 🔥', barId: 6 },
                { user: 'RachelB', avatar: 'R', time: '45 min ago', text: 'Rooftop is open and it is VIBING. Bottle service was smooth', barId: 5 },
                { user: 'KevinW', avatar: 'K', time: '50 min ago', text: 'Pizza here is still undefeated. Old school SI at its finest', barId: 9 },
                { user: 'AshleyN', avatar: 'A', time: '55 min ago', text: 'Marg Monday might be the best deal on the island. $6 for these? Yes please', barId: 10 },
                { user: 'JasonP', avatar: 'J', time: '1 hr ago', text: 'The cocktail menu here is next level. Mixologists are artists', barId: 11 },
                { user: 'VeronicaT', avatar: 'V', time: '1 hr ago', text: 'Harbor vibes are unmatched. Rum punch in one hand, sunset in the other 🌅', barId: 13 },
                { user: 'BrianF', avatar: 'B', time: '1 hr ago', text: 'Wings here legit won awards for a reason. Order the Buffalo extra crispy', barId: 12 },
                { user: 'MeganC', avatar: 'M', time: '2 hr ago', text: 'Love the raw bar here. Great for a low-key date night', barId: 14 },
                { user: 'SteveH', avatar: 'S', time: '2 hr ago', text: 'Fight night crowd is crazy! Place is electric right now ⚡', barId: 15 },
                { user: 'PatrickO', avatar: 'P', time: '3 hr ago', text: 'The custom cocktails are insane. Bartender made something off-menu that changed my life', barId: 7 },
                { user: 'AmandaG', avatar: 'A', time: '3 hr ago', text: 'Comedy night was hilarious! Flagship never misses with their events', barId: 6 }
        ],

        /* ---------- Upcoming Events — All 5 Boroughs ---------- */
        events: [
                /* ===== MANHATTAN EVENTS ===== */
                {
                        id: 101, borough: 'manhattan', title: 'Secret Rooftop Party', barId: 104, barName: 'Le Bain',
                        date: '2026-03-01', month: 'MAR', day: '1', time: '10 PM – 4 AM',
                        description: 'Invite-only rooftop takeover with international DJ sets and skyline views. POPPIN members get priority entry.',
                        type: 'DJ Night', rsvps: 340, attendees: ['M', 'J', 'C', 'A', 'S']
                },
                {
                        id: 102, borough: 'manhattan', title: 'Speakeasy Cocktail Lab', barId: 102, barName: 'Please Don\'t Tell (PDT)',
                        date: '2026-03-06', month: 'MAR', day: '6', time: '7 PM – 10 PM',
                        description: 'Learn to make 3 classic cocktails behind the bar. Includes tastings and a take-home recipe card.',
                        type: 'Tasting', rsvps: 30, attendees: ['A', 'R', 'P']
                },
                {
                        id: 103, borough: 'manhattan', title: 'Jazz & Whiskey Night', barId: 107, barName: 'Bemelmans Bar',
                        date: '2026-03-12', month: 'MAR', day: '12', time: '8 PM – 12 AM',
                        description: 'Live jazz trio with a curated whiskey flight. Black-tie optional. Reservations recommended.',
                        type: 'Live Music', rsvps: 65, attendees: ['D', 'N', 'M', 'L']
                },
                {
                        id: 104, borough: 'manhattan', title: 'Late Night at Employees Only', barId: 103, barName: 'Employees Only',
                        date: '2026-03-15', month: 'MAR', day: '15', time: '11 PM – 3:30 AM',
                        description: 'After-hours industry party. Bone marrow shots, psychic readings, and the Amelia flowing all night.',
                        type: 'Social', rsvps: 180, attendees: ['V', 'M', 'A', 'C', 'J']
                },

                /* ===== BROOKLYN EVENTS ===== */
                {
                        id: 201, borough: 'brooklyn', title: 'Warehouse Rave: Neon Dreams', barId: 208, barName: 'House of Yes',
                        date: '2026-03-02', month: 'MAR', day: '2', time: '11 PM – 5 AM',
                        description: 'Immersive dance experience with aerial performers, neon body paint, and 3 stages of electronic music.',
                        type: 'DJ Night', rsvps: 420, attendees: ['M', 'J', 'C', 'A', 'S']
                },
                {
                        id: 202, borough: 'brooklyn', title: 'Oyster Hour at Maison', barId: 201, barName: 'Maison Premiere',
                        date: '2026-03-08', month: 'MAR', day: '8', time: '4 PM – 7 PM',
                        description: '$1 oysters, absinthe specials, and live jazz on the garden patio. First come, first served.',
                        type: 'Tasting', rsvps: 95, attendees: ['A', 'R', 'P']
                },
                {
                        id: 203, borough: 'brooklyn', title: 'Bluegrass Saturday at Sunny\'s', barId: 207, barName: 'Sunny\'s Bar',
                        date: '2026-03-09', month: 'MAR', day: '9', time: '9 PM – 1 AM',
                        description: 'The legendary Saturday night bluegrass jam. BYO instrument or just soak in the waterfront vibes.',
                        type: 'Live Music', rsvps: 75, attendees: ['D', 'K', 'B']
                },
                {
                        id: 204, borough: 'brooklyn', title: 'Skyline Sunset Social', barId: 202, barName: 'Westlight',
                        date: '2026-03-15', month: 'MAR', day: '15', time: '5 PM – 10 PM',
                        description: 'Golden hour cocktails on the 22nd floor. DJ set, small plates, and the best view in Brooklyn.',
                        type: 'Social', rsvps: 200, attendees: ['V', 'M', 'A', 'C', 'J']
                },

                /* ===== QUEENS EVENTS ===== */
                {
                        id: 301, borough: 'queens', title: 'Bohemian Beer Fest', barId: 302, barName: 'Bohemian Hall & Beer Garden',
                        date: '2026-03-03', month: 'MAR', day: '3', time: '12 PM – 10 PM',
                        description: 'All-day beer festival with 30+ craft breweries, live polka band, and grilled sausages. $25 entry includes tastings.',
                        type: 'Tasting', rsvps: 350, attendees: ['T', 'S', 'K', 'B', 'J']
                },
                {
                        id: 302, borough: 'queens', title: 'Salsa Night on the Water', barId: 306, barName: 'Blend on the Water',
                        date: '2026-03-07', month: 'MAR', day: '7', time: '8 PM – 1 AM',
                        description: 'Live salsa band, free dance lessons at 8 PM, and $10 mojitos with Manhattan skyline views.',
                        type: 'DJ Night', rsvps: 190, attendees: ['M', 'J', 'C', 'A']
                },
                {
                        id: 303, borough: 'queens', title: 'Craft Cocktail Masterclass', barId: 301, barName: 'Dutch Kills',
                        date: '2026-03-14', month: 'MAR', day: '14', time: '6 PM – 9 PM',
                        description: 'Learn the art of hand-carved ice and classic cocktails from Dutch Kills\' master bartenders. 20 seats max.',
                        type: 'Tasting', rsvps: 20, attendees: ['A', 'R']
                },
                {
                        id: 304, borough: 'queens', title: 'La Boom Reggaeton Night', barId: 307, barName: 'La Boom',
                        date: '2026-03-22', month: 'MAR', day: '22', time: '11 PM – 5 AM',
                        description: 'All-night reggaeton, dembow, and Latin trap across 2 rooms. International guest DJ. VIP tables available.',
                        type: 'DJ Night', rsvps: 500, attendees: ['M', 'J', 'C', 'A', 'S']
                },

                /* ===== THE BRONX EVENTS ===== */
                {
                        id: 401, borough: 'bronx', title: 'Hip-Hop Open Mic Night', barId: 403, barName: 'Beatstro',
                        date: '2026-03-05', month: 'MAR', day: '5', time: '8 PM – 12 AM',
                        description: 'Open mic for MCs, poets, and singers. Sign up at the door. Winner gets a free studio session.',
                        type: 'Open Mic', rsvps: 85, attendees: ['D', 'K', 'B']
                },
                {
                        id: 402, borough: 'bronx', title: 'Arthur Ave Craft Beer Crawl', barId: 401, barName: 'Bronx Beer Hall',
                        date: '2026-03-10', month: 'MAR', day: '10', time: '2 PM – 8 PM',
                        description: 'Guided crawl through Arthur Avenue\'s best. 5 stops, 15 tastings, and a souvenir glass. Tickets $35.',
                        type: 'Tasting', rsvps: 60, attendees: ['A', 'R', 'P']
                },
                {
                        id: 403, borough: 'bronx', title: 'Rooftop Latin Vibes', barId: 404, barName: 'Rooftop 33',
                        date: '2026-03-16', month: 'MAR', day: '16', time: '6 PM – 1 AM',
                        description: 'Sunset DJ set with a Latin twist. Paloma specials, city views, and vibes all night on the rooftop.',
                        type: 'DJ Night', rsvps: 145, attendees: ['V', 'M', 'A', 'C', 'J']
                },
                {
                        id: 404, borough: 'bronx', title: 'Yankees Home Opener Watch Party', barId: 408, barName: 'The Well',
                        date: '2026-03-28', month: 'MAR', day: '28', time: '1 PM – Late',
                        description: 'Every screen on, $5 beers, wing specials, and Yankees giveaways. The Bronx\'s biggest watch party.',
                        type: 'Sports', rsvps: 220, attendees: ['T', 'S', 'K', 'B', 'J']
                },

                /* ===== STATEN ISLAND EVENTS ===== */
                {
                        id: 1,
                        borough: 'staten_island',
                        title: 'DJ Night: Latin Heat',
                        barId: 5,
                        barName: 'Cypress Hall',
                        date: '2026-02-28',
                        month: 'FEB',
                        day: '28',
                        time: '10 PM – 3 AM',
                        description: 'Non-stop reggaeton, Latin trap, and bachata. Bottle service available. Dress to impress.',
                        type: 'DJ Night',
                        rsvps: 87,
                        attendees: ['M', 'J', 'C', 'A', 'S']
                },
                {
                        id: 2,
                        borough: 'staten_island',
                        title: 'Comedy Open Mic',
                        barId: 6,
                        barName: 'Flagship Brewing',
                        date: '2026-03-01',
                        month: 'MAR',
                        day: '1',
                        time: '8 PM – 10 PM',
                        description: 'Bring your best 5-minute set. Sign-ups start at 7:30 PM. Free entry with membership.',
                        type: 'Open Mic',
                        rsvps: 42,
                        attendees: ['D', 'K', 'B']
                },
                {
                        id: 3,
                        borough: 'staten_island',
                        title: 'Whiskey Tasting Night',
                        barId: 2,
                        barName: 'The Coupe',
                        date: '2026-03-05',
                        month: 'MAR',
                        day: '5',
                        time: '7 PM – 10 PM',
                        description: 'Flight of 6 premium whiskeys with paired small plates. Limited to 30 seats. Book early.',
                        type: 'Tasting',
                        rsvps: 28,
                        attendees: ['A', 'R', 'P']
                },
                {
                        id: 4,
                        borough: 'staten_island',
                        title: 'March Madness Watch Party',
                        barId: 12,
                        barName: 'Joe Broadway\'s',
                        date: '2026-03-20',
                        month: 'MAR',
                        day: '20',
                        time: '12 PM – Late',
                        description: 'Every game on every screen. Wing platters, beer towers, and bracket challenges with prizes.',
                        type: 'Sports',
                        rsvps: 134,
                        attendees: ['T', 'S', 'K', 'B', 'J']
                },
                {
                        id: 5,
                        borough: 'staten_island',
                        title: 'Island Bands Live',
                        barId: 8,
                        barName: 'Mother Pug\'s Saloon',
                        date: '2026-03-08',
                        month: 'MAR',
                        day: '8',
                        time: '9 PM – 1 AM',
                        description: 'Three local Staten Island bands performing back-to-back. Cover charge waived for POPPIN members.',
                        type: 'Live Music',
                        rsvps: 73,
                        attendees: ['D', 'N', 'M', 'L']
                },
                {
                        id: 6,
                        borough: 'staten_island',
                        title: 'Sunset Social: Spring Kickoff',
                        barId: 13,
                        barName: 'Ti Ki Bar at Marina Cafe',
                        date: '2026-03-22',
                        month: 'MAR',
                        day: '22',
                        time: '5 PM – 10 PM',
                        description: 'Kick off spring with harbor views, tropical drinks, live DJ, and exclusive POPPIN member pricing.',
                        type: 'Social',
                        rsvps: 112,
                        attendees: ['V', 'M', 'A', 'C', 'J']
                },
                {
                        id: 7,
                        borough: 'staten_island',
                        title: 'Karaoke Throwdown',
                        barId: 8,
                        barName: 'Mother Pug\'s Saloon',
                        date: '2026-03-12',
                        month: 'MAR',
                        day: '12',
                        time: '8 PM – 12 AM',
                        description: 'Sing your heart out. Best performance wins a $100 bar tab. Crowd decides the winner.',
                        type: 'Karaoke',
                        rsvps: 56,
                        attendees: ['L', 'R', 'S']
                },
                {
                        id: 8,
                        borough: 'staten_island',
                        title: 'Marg Madness: Tequila Edition',
                        barId: 10,
                        barName: 'Burrito Bar',
                        date: '2026-03-15',
                        month: 'MAR',
                        day: '15',
                        time: '6 PM – 11 PM',
                        description: 'Unlimited margarita samples from 8 different tequilas. Taco bar included. Only for VIP members.',
                        type: 'Tasting',
                        rsvps: 64,
                        attendees: ['A', 'J', 'M', 'C']
                }
        ],

        /* ---------- Helper Methods ---------- */
        getBar(id) {
                return this.bars.find(b => b.id === id);
        },

        getCommentsForBar(barId) {
                return this.comments.filter(c => c.barId === barId);
        },

        getEventsForBar(barId) {
                return this.events.filter(e => e.barId === barId);
        },

        getTopBarsTonight() {
                const borough = POPPIN.getActiveBorough ? POPPIN.getActiveBorough() : 'staten_island';
                return this.bars
                        .filter(b => b.borough === borough)
                        .sort((a, b) => {
                                if (a.premiumListing !== b.premiumListing) {
                                        return a.premiumListing ? -1 : 1;
                                }
                                return b.votesTonight - a.votesTonight;
                        });
        },

        getBarsByVibe(vibe) {
                const borough = POPPIN.getActiveBorough ? POPPIN.getActiveBorough() : 'staten_island';
                let filtered = this.bars.filter(b => b.borough === borough);
                if (vibe !== 'all') {
                        filtered = filtered.filter(b => b.vibe === vibe);
                }
                return filtered.sort((a, b) => {
                        if (a.premiumListing !== b.premiumListing) {
                                return a.premiumListing ? -1 : 1;
                        }
                        return b.votesTonight - a.votesTonight;
                });
        },

        getActiveEvents() {
                const borough = POPPIN.getActiveBorough ? POPPIN.getActiveBorough() : 'staten_island';
                return this.events.filter(e => e.borough === borough);
        },

        authenticate(username, password) {
                /* Demo auth — accepts any password for known demo users, or creates new users */
                const user = this.users.find(u => u.username.toLowerCase() === username.toLowerCase());
                if (user && password && password.length >= 4) return user;
                return null;
        },

        getCurrentUser() {
                // Enforces a 12-hour session timeout for security
                return this.Storage.get('poppin_user', 12);
        },

        login(user) {
                const safeUser = { ...user };
                delete safeUser.password;
                this.Storage.set('poppin_user', safeUser);
        },

        logout() {
                this.Storage.remove('poppin_user');
                window.location.href = 'index.html';
        },

        requireAuth() {
                if (!this.getCurrentUser()) {
                        window.location.href = 'index.html';
                        return false;
                }
                return true;
        }
};
