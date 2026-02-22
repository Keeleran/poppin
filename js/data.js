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
        /* ===== MANHATTAN ===== */
        {
            id: 101, borough: 'manhattan', name: 'The Dead Rabbit', neighborhood: 'Financial District',
            address: '30 Water St, New York, NY 10004', hours: '12 PM – 2 AM',
            description: 'World-renowned tri-level Irish pub. Cocktail parlor upstairs, taproom below. Multiple "World\'s Best Bar" awards.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Famous Irish Coffee $14 · Whiskey Flights $22',
            image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 185, votesTonight: 340, ratingTonight: 4.8, ratingOverall: 4.9,
            crowdLevel: 4, coverCharge: 0, lineTime: 15
        },
        {
            id: 102, borough: 'manhattan', name: 'Please Don\'t Tell (PDT)', neighborhood: 'East Village',
            address: '113 St Marks Pl, New York, NY 10009', hours: '5 PM – 2 AM',
            description: 'Legendary speakeasy hidden behind a phone booth inside Crif Dogs. Reservations at 3 PM sharp or walk-in.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Craft Cocktails $18 · Hot Dog Pairings',
            image: 'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 62, votesTonight: 210, ratingTonight: 4.7, ratingOverall: 4.8,
            crowdLevel: 5, coverCharge: 0, lineTime: 30
        },
        {
            id: 103, borough: 'manhattan', name: 'Employees Only', neighborhood: 'West Village',
            address: '510 Hudson St, New York, NY 10014', hours: '6 PM – 3:30 AM',
            description: 'Award-winning cocktail bar with a psychic at the door. Late-night kitchen serves bone marrow and steak.',
            vibe: 'hype', vibeEmoji: '⚡', vibeLabel: 'Hype',
            specials: 'Amelia $17 · Late-Night Bone Marrow $14',
            image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 134, votesTonight: 290, ratingTonight: 4.6, ratingOverall: 4.7,
            crowdLevel: 4, coverCharge: 0, lineTime: 20
        },
        {
            id: 104, borough: 'manhattan', name: 'Le Bain', neighborhood: 'Meatpacking District',
            address: '848 Washington St, New York, NY 10014', hours: '4 PM – 4 AM',
            description: 'Rooftop lounge atop The Standard hotel with a plunge pool, panoramic views, and world-class DJs.',
            vibe: 'lit', vibeEmoji: '🔥', vibeLabel: 'LIT',
            specials: 'Bottle Service from $500 · Craft Cocktails $20',
            image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 220, votesTonight: 410, ratingTonight: 4.5, ratingOverall: 4.6,
            crowdLevel: 5, coverCharge: 20, lineTime: 45
        },
        {
            id: 105, borough: 'manhattan', name: 'Attaboy', neighborhood: 'Lower East Side',
            address: '134 Eldridge St, New York, NY 10002', hours: '6 PM – 4 AM',
            description: 'No-menu cocktail bar. Tell the bartender what you like and they\'ll craft something perfect. Intimate, 28-seat space.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Custom Cocktails $16 · Bartender\'s Choice',
            image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 28, votesTonight: 180, ratingTonight: 4.9, ratingOverall: 4.9,
            crowdLevel: 5, coverCharge: 0, lineTime: 25
        },
        {
            id: 106, borough: 'manhattan', name: 'The Campbell', neighborhood: 'Midtown',
            address: '15 Vanderbilt Ave, New York, NY 10017', hours: '12 PM – 1 AM',
            description: 'Grand cocktail bar inside Grand Central Terminal. Stunning hand-painted ceiling and 1920s glamour.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Classic Martini $19 · Old Fashioned $18',
            image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 95, votesTonight: 150, ratingTonight: 4.4, ratingOverall: 4.6,
            crowdLevel: 3, coverCharge: 0, lineTime: 5
        },
        {
            id: 107, borough: 'manhattan', name: 'Bemelmans Bar', neighborhood: 'Upper East Side',
            address: '35 E 76th St, New York, NY 10021', hours: '5 PM – 12:30 AM',
            description: 'Iconic bar at The Carlyle hotel featuring murals by Ludwig Bemelmans and nightly live jazz piano.',
            vibe: 'music', vibeEmoji: '🎵', vibeLabel: 'Live Music',
            specials: 'Signature Cocktails $25 · Live Jazz Nightly',
            image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 55, votesTonight: 120, ratingTonight: 4.7, ratingOverall: 4.8,
            crowdLevel: 3, coverCharge: 0, lineTime: 10
        },
        {
            id: 108, borough: 'manhattan', name: 'Angel\'s Share', neighborhood: 'East Village',
            address: '8 Stuyvesant St, 2nd Fl, New York, NY 10003', hours: '6 PM – 1:30 AM',
            description: 'Hidden Japanese cocktail bar above a yakitori joint. Strict no-standing, no-group-larger-than-4 policy.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Japanese Whisky Highball $16 · Seasonal Menu',
            image: 'https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 24, votesTonight: 95, ratingTonight: 4.8, ratingOverall: 4.8,
            crowdLevel: 4, coverCharge: 0, lineTime: 35
        },

        /* ===== BROOKLYN ===== */
        {
            id: 201, borough: 'brooklyn', name: 'Maison Premiere', neighborhood: 'Williamsburg',
            address: '298 Bedford Ave, Brooklyn, NY 11249', hours: '4 PM – 2 AM',
            description: 'New Orleans-inspired oyster bar with an absinthe program and lush garden patio. James Beard nominated.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: '$1 Oysters (Happy Hour) · Absinthe Drip $15',
            image: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 110, votesTonight: 275, ratingTonight: 4.7, ratingOverall: 4.8,
            crowdLevel: 4, coverCharge: 0, lineTime: 15
        },
        {
            id: 202, borough: 'brooklyn', name: 'Westlight', neighborhood: 'Williamsburg',
            address: '111 N 12th St, 22nd Fl, Brooklyn, NY 11249', hours: '4 PM – 2 AM',
            description: 'Rooftop bar on the 22nd floor of The William Vale hotel. 360° views of the Manhattan skyline.',
            vibe: 'hype', vibeEmoji: '⚡', vibeLabel: 'Hype',
            specials: 'Skyline Spritz $19 · Small Plates',
            image: 'https://images.unsplash.com/photo-1470219556762-1fd5b26f3a75?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 165, votesTonight: 320, ratingTonight: 4.5, ratingOverall: 4.6,
            crowdLevel: 5, coverCharge: 0, lineTime: 25
        },
        {
            id: 203, borough: 'brooklyn', name: 'The Shanty', neighborhood: 'Williamsburg',
            address: '79 Richardson St, Brooklyn, NY 11211', hours: '5 PM – 12 AM',
            description: 'Cocktail bar inside the New York Distilling Company. Gin-focused menu with house-distilled spirits.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Perry\'s Tot Negroni $14 · Distillery Tours',
            image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 48, votesTonight: 130, ratingTonight: 4.4, ratingOverall: 4.5,
            crowdLevel: 2, coverCharge: 0, lineTime: 0
        },
        {
            id: 204, borough: 'brooklyn', name: 'Weather Up', neighborhood: 'Prospect Heights',
            address: '589 Vanderbilt Ave, Brooklyn, NY 11238', hours: '5 PM – 2 AM',
            description: 'Intimate neighborhood cocktail bar with a vintage railcar vibe. Known for perfectly balanced classicss.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Daiquiri $15 · Seasonal Menu',
            image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 32, votesTonight: 95, ratingTonight: 4.6, ratingOverall: 4.7,
            crowdLevel: 3, coverCharge: 0, lineTime: 0
        },
        {
            id: 205, borough: 'brooklyn', name: 'Lavender Lake', neighborhood: 'Gowanus',
            address: '383 Carroll St, Brooklyn, NY 11231', hours: '3 PM – 2 AM',
            description: 'Converted warehouse bar with a massive backyard overlooking the Gowanus Canal. Chill industrial vibes.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Draft Beers $8 · Frozen Drinks $12',
            image: 'https://images.unsplash.com/photo-1519214605650-76a613ee3245?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 72, votesTonight: 140, ratingTonight: 4.3, ratingOverall: 4.4,
            crowdLevel: 3, coverCharge: 0, lineTime: 0
        },
        {
            id: 206, borough: 'brooklyn', name: 'Skinny Dennis', neighborhood: 'Williamsburg',
            address: '152 Metropolitan Ave, Brooklyn, NY 11249', hours: '2 PM – 4 AM',
            description: 'Honky-tonk dive with free live country, bluegrass, and Americana every night. Cheap beer, good times.',
            vibe: 'music', vibeEmoji: '🎵', vibeLabel: 'Live Music',
            specials: '$5 Lone Star Tallboys · Free Live Music Nightly',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 88, votesTonight: 195, ratingTonight: 4.5, ratingOverall: 4.6,
            crowdLevel: 4, coverCharge: 0, lineTime: 5
        },
        {
            id: 207, borough: 'brooklyn', name: 'Sunny\'s Bar', neighborhood: 'Red Hook',
            address: '253 Conover St, Brooklyn, NY 11231', hours: '5 PM – 2 AM',
            description: 'Legendary waterfront dive in Red Hook since 1890. Saturday night bluegrass jams are a Brooklyn institution.',
            vibe: 'waterfront', vibeEmoji: '🌊', vibeLabel: 'Waterfront',
            specials: 'Well Drinks $8 · Saturday Bluegrass Jams',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 45, votesTonight: 110, ratingTonight: 4.6, ratingOverall: 4.7,
            crowdLevel: 3, coverCharge: 0, lineTime: 0
        },
        {
            id: 208, borough: 'brooklyn', name: 'House of Yes', neighborhood: 'Bushwick',
            address: '2 Wyckoff Ave, Brooklyn, NY 11237', hours: '10 PM – 4 AM',
            description: 'Legendary nightclub and performance venue. Themed parties, aerial acts, and immersive dance experiences.',
            vibe: 'lit', vibeEmoji: '🔥', vibeLabel: 'LIT',
            specials: 'Themed Cocktails $16 · Costume Encouraged',
            image: 'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 310, votesTonight: 480, ratingTonight: 4.7, ratingOverall: 4.8,
            crowdLevel: 5, coverCharge: 25, lineTime: 30
        },

        /* ===== QUEENS ===== */
        {
            id: 301, borough: 'queens', name: 'Dutch Kills', neighborhood: 'Long Island City',
            address: '27-24 Jackson Ave, Long Island City, NY 11101', hours: '5 PM – 2 AM',
            description: 'Acclaimed cocktail bar with hand-carved ice and classic cocktails in a dark, intimate setting.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Classic Cocktails $15 · Hand-Cut Ice',
            image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 42, votesTonight: 150, ratingTonight: 4.7, ratingOverall: 4.8,
            crowdLevel: 3, coverCharge: 0, lineTime: 10
        },
        {
            id: 302, borough: 'queens', name: 'Bohemian Hall & Beer Garden', neighborhood: 'Astoria',
            address: '29-19 24th Ave, Astoria, NY 11102', hours: '12 PM – 2 AM',
            description: 'NYC\'s oldest beer garden (since 1910). Massive outdoor space with Czech beer, grilled sausages, and good times.',
            vibe: 'hype', vibeEmoji: '⚡', vibeLabel: 'Hype',
            specials: 'Pilsner Urquell $8 · Grilled Kielbasa $6',
            image: 'https://images.unsplash.com/photo-1575037614876-c38a4c44f5b8?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 240, votesTonight: 380, ratingTonight: 4.5, ratingOverall: 4.6,
            crowdLevel: 4, coverCharge: 0, lineTime: 10
        },
        {
            id: 303, borough: 'queens', name: 'The Bonnie', neighborhood: 'Astoria',
            address: '29-12 23rd Ave, Astoria, NY 11105', hours: '4 PM – 2 AM',
            description: 'Gastropub with a curated cocktail list and Scottish-American fare. Backyard patio is an Astoria gem.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Scotch Egg $11 · Whisky Sour $14',
            image: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 55, votesTonight: 120, ratingTonight: 4.4, ratingOverall: 4.5,
            crowdLevel: 3, coverCharge: 0, lineTime: 5
        },
        {
            id: 304, borough: 'queens', name: 'Alobar', neighborhood: 'Long Island City',
            address: '46-42 Vernon Blvd, Long Island City, NY 11101', hours: '5 PM – 12 AM',
            description: 'Upscale wine bar and restaurant with stunning city views and a seasonal rooftop.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Wine Flights $18 · Rooftop Seasonal',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 38, votesTonight: 85, ratingTonight: 4.5, ratingOverall: 4.6,
            crowdLevel: 2, coverCharge: 0, lineTime: 0
        },
        {
            id: 305, borough: 'queens', name: 'Snowdonia', neighborhood: 'Astoria',
            address: '34-17 Steinway St, Astoria, NY 11101', hours: '3 PM – 2 AM',
            description: 'Welsh-inspired pub and cocktail lounge. Rotating craft taps and hearty pub grub in a cozy setting.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Craft Pints $7 · Welsh Rarebit $11',
            image: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 30, votesTonight: 70, ratingTonight: 4.3, ratingOverall: 4.4,
            crowdLevel: 2, coverCharge: 0, lineTime: 0
        },
        {
            id: 306, borough: 'queens', name: 'Blend on the Water', neighborhood: 'Long Island City',
            address: '45-04 Center Blvd, Long Island City, NY 11109', hours: '11 AM – 12 AM',
            description: 'Latin-fusion waterfront restaurant and lounge with incredible Manhattan skyline views and salsa nights.',
            vibe: 'lit', vibeEmoji: '🔥', vibeLabel: 'LIT',
            specials: 'Mojitos $14 · Salsa Thursdays',
            image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 130, votesTonight: 250, ratingTonight: 4.4, ratingOverall: 4.5,
            crowdLevel: 4, coverCharge: 0, lineTime: 15
        },
        {
            id: 307, borough: 'queens', name: 'La Boom', neighborhood: 'Woodside',
            address: '56-15 Northern Blvd, Woodside, NY 11377', hours: '10 PM – 5 AM',
            description: 'Massive Latin nightclub with multiple rooms, international DJs, and reggaeton/Latin trap all night.',
            vibe: 'lit', vibeEmoji: '🔥', vibeLabel: 'LIT',
            specials: 'Bottle Service from $300 · Themed Nights',
            image: 'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 280, votesTonight: 420, ratingTonight: 4.3, ratingOverall: 4.4,
            crowdLevel: 5, coverCharge: 30, lineTime: 40
        },
        {
            id: 308, borough: 'queens', name: 'The Astorian', neighborhood: 'Astoria',
            address: '36-11 35th Ave, Astoria, NY 11106', hours: '5 PM – 12 AM',
            description: 'Craft cocktail bar in a restored 1920s building with exposed brick, creative drinks, and a great backyard.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Happy Hour 2-for-1 · Garden Patio',
            image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 46, votesTonight: 95, ratingTonight: 4.3, ratingOverall: 4.4,
            crowdLevel: 3, coverCharge: 0, lineTime: 0
        },

        /* ===== THE BRONX ===== */
        {
            id: 401, borough: 'bronx', name: 'Bronx Beer Hall', neighborhood: 'Arthur Avenue',
            address: '2344 Arthur Ave, Bronx, NY 10458', hours: '12 PM – 10 PM',
            description: 'Craft beer haven inside the Arthur Avenue Retail Market. Local brews on tap and old-school Italian vibes.',
            vibe: 'brewery', vibeEmoji: '🍺', vibeLabel: 'Brewery',
            specials: 'Local Craft Pints $7 · Italian Market Snacks',
            image: 'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 65, votesTonight: 140, ratingTonight: 4.5, ratingOverall: 4.6,
            crowdLevel: 3, coverCharge: 0, lineTime: 0
        },
        {
            id: 402, borough: 'bronx', name: 'Gun Hill Brewing Company', neighborhood: 'Williamsbridge',
            address: '3227 Laconia Ave, Bronx, NY 10469', hours: '12 PM – 10 PM',
            description: 'The Bronx\'s premier craft brewery. Taproom pours fresh-brewed ales and lagers with a neighborhood feel.',
            vibe: 'brewery', vibeEmoji: '🍺', vibeLabel: 'Brewery',
            specials: 'Flight of 4 $12 · Seasonal Releases',
            image: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 40, votesTonight: 90, ratingTonight: 4.4, ratingOverall: 4.5,
            crowdLevel: 2, coverCharge: 0, lineTime: 0
        },
        {
            id: 403, borough: 'bronx', name: 'Beatstro', neighborhood: 'Mott Haven',
            address: '135 Alexander Ave, Bronx, NY 10454', hours: '5 PM – 12 AM',
            description: 'Hip-hop inspired cocktail lounge and kitchen. DJ sets, open mics, and craft cocktails in the South Bronx.',
            vibe: 'lit', vibeEmoji: '🔥', vibeLabel: 'LIT',
            specials: 'Signature Cocktails $14 · Open Mic Wednesdays',
            image: 'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 85, votesTonight: 195, ratingTonight: 4.3, ratingOverall: 4.4,
            crowdLevel: 4, coverCharge: 0, lineTime: 10
        },
        {
            id: 404, borough: 'bronx', name: 'Rooftop 33', neighborhood: 'Mott Haven',
            address: '70 E 149th St, Bronx, NY 10451', hours: '4 PM – 1 AM',
            description: 'Elevated rooftop lounge in Mott Haven with stunning views, Latin-inspired cocktails, and weekend DJs.',
            vibe: 'hype', vibeEmoji: '⚡', vibeLabel: 'Hype',
            specials: 'Paloma $15 · Saturday DJ Sets',
            image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 110, votesTonight: 230, ratingTonight: 4.4, ratingOverall: 4.5,
            crowdLevel: 4, coverCharge: 10, lineTime: 15
        },
        {
            id: 405, borough: 'bronx', name: 'The Bronx Drafthouse', neighborhood: 'Kingsbridge',
            address: '884 Gerard Ave, Bronx, NY 10452', hours: '12 PM – 12 AM',
            description: 'Spacious sports bar with 20 flat screens, a full menu, and a huge craft beer selection on tap.',
            vibe: 'hype', vibeEmoji: '⚡', vibeLabel: 'Hype',
            specials: 'Wings $10 · Bucket of 5 $25',
            image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 95, votesTonight: 175, ratingTonight: 4.2, ratingOverall: 4.3,
            crowdLevel: 4, coverCharge: 0, lineTime: 0
        },
        {
            id: 406, borough: 'bronx', name: 'Beso', neighborhood: 'Mott Haven',
            address: '287 Alexander Ave, Bronx, NY 10454', hours: '5 PM – 11 PM',
            description: 'Trendy Latin-inspired cocktail bar and restaurant. Known for plantain empanadas and inventive drinks.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Empanadas $3ea · Jungle Bird $14',
            image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 58, votesTonight: 110, ratingTonight: 4.4, ratingOverall: 4.5,
            crowdLevel: 3, coverCharge: 0, lineTime: 5
        },
        {
            id: 407, borough: 'bronx', name: 'Ceetay', neighborhood: 'Riverdale',
            address: '129 Alexander Ave, Bronx, NY 10454', hours: '5 PM – 11 PM',
            description: 'Pan-Asian fusion with a creative cocktail program. Lively atmosphere and sushi happy hour.',
            vibe: 'chill', vibeEmoji: '🥂', vibeLabel: 'Chill',
            specials: 'Sushi Happy Hour 50% Off · Lychee Martini $13',
            image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 44, votesTonight: 80, ratingTonight: 4.3, ratingOverall: 4.4,
            crowdLevel: 2, coverCharge: 0, lineTime: 0
        },
        {
            id: 408, borough: 'bronx', name: 'The Well', neighborhood: 'Concourse',
            address: '234 E 161st St, Bronx, NY 10451', hours: '12 PM – 2 AM',
            description: 'Sports bar and grill right by Yankee Stadium. Game day headquarters with cheap drinks and massive screens.',
            vibe: 'hype', vibeEmoji: '⚡', vibeLabel: 'Hype',
            specials: '$5 Game Day Beers · Yankees Specials',
            image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=800&q=80',
            isLive: true, checkedIn: 150, votesTonight: 260, ratingTonight: 4.1, ratingOverall: 4.2,
            crowdLevel: 5, coverCharge: 0, lineTime: 10
        },

        /* ===== STATEN ISLAND ===== */
        {
            id: 1,
            borough: 'staten_island',
            name: 'Kettle Black',
            neighborhood: 'Forest Avenue',
            address: '1464 Forest Ave, Staten Island, NY 10302',
            description: 'One of the most popular bars on the island. Always packed, great music, young crowd with high energy every weekend.',
            hours: '4 PM – 4 AM',
            vibe: 'lit',
            vibeEmoji: '🔥',
            vibeLabel: 'LIT',
            crowdLevel: 5,
            ratingTonight: 4.8,
            ratingOverall: 4.6,
            votesTonight: 187,
            specials: 'Happy Hour 4-7 PM · $5 Drafts · $8 Cocktails',
            image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 64
        },
        {
            id: 2,
            borough: 'staten_island',
            name: 'The Coupe',
            neighborhood: 'Stapleton Heights',
            address: '129 Bay St, Staten Island, NY 10301',
            description: 'Hidden gem speakeasy with moody lighting and craft cocktails. Known for their spicy rye whiskey specials and intimate late-night atmosphere.',
            hours: '5 PM – 2 AM',
            vibe: 'chill',
            vibeEmoji: '🥂',
            vibeLabel: 'CHILL',
            crowdLevel: 3,
            ratingTonight: 4.5,
            ratingOverall: 4.7,
            votesTonight: 98,
            specials: 'Speakeasy Cocktails · Craft Rye Flights · Small Plates',
            image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 28
        },
        {
            id: 3,
            borough: 'staten_island',
            name: 'District',
            neighborhood: 'Annadale',
            address: '60 Annadale Rd, Staten Island, NY 10312',
            description: 'Popular sports bar with a younger crowd, good music, outdoor area, and legendary weekend nights where anything can happen.',
            hours: '3 PM – 4 AM',
            vibe: 'hype',
            vibeEmoji: '⚡',
            vibeLabel: 'HYPE',
            crowdLevel: 4,
            ratingTonight: 4.3,
            ratingOverall: 4.2,
            votesTonight: 156,
            specials: 'Game Day Wings · $4 Bud Lights · Outdoor Patio',
            image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 51
        },
        {
            id: 4,
            borough: 'staten_island',
            name: 'Richmond Republic',
            neighborhood: 'Great Kills',
            address: '28 Nelson Ave, Staten Island, NY 10308',
            description: 'Versatile bar and grill that transitions from a chill hangout to a lively weekend destination. Great food, strong pours.',
            hours: '12 PM – 2 AM',
            vibe: 'chill',
            vibeEmoji: '🥂',
            vibeLabel: 'CHILL',
            crowdLevel: 3,
            ratingTonight: 4.1,
            ratingOverall: 4.3,
            votesTonight: 112,
            specials: 'Brunch Sat-Sun · Trivia Tuesdays · Craft Beer Menu',
            image: 'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 33
        },
        {
            id: 5,
            borough: 'staten_island',
            name: 'Cypress Hall',
            neighborhood: 'Richmond Road',
            address: '1458 Richmond Rd, Staten Island, NY 10304',
            description: 'Newer establishment drawing a younger crowd. Modern interior with craft cocktails and a lively weekend scene.',
            hours: '4 PM – 3 AM',
            vibe: 'hype',
            vibeEmoji: '⚡',
            vibeLabel: 'HYPE',
            crowdLevel: 4,
            ratingTonight: 4.4,
            ratingOverall: 4.1,
            votesTonight: 134,
            specials: 'DJ Fridays · Bottle Service · Rooftop Available',
            image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 47
        },
        {
            id: 6,
            borough: 'staten_island',
            name: 'Flagship Brewing Company',
            neighborhood: 'Stapleton',
            address: '40 Minthorne St, Staten Island, NY 10301',
            description: 'Staten Island\'s beloved craft brewery. Laid-back taproom with rotating local brews, comedy nights, open mics, and live bands.',
            hours: '4 PM – 10 PM',
            vibe: 'music',
            vibeEmoji: '🎵',
            vibeLabel: 'LIVE MUSIC',
            crowdLevel: 3,
            ratingTonight: 4.6,
            ratingOverall: 4.8,
            votesTonight: 89,
            specials: 'Brewery Tours Sat · Open Mic Thursdays · Comedy Nights',
            image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 22
        },
        {
            id: 7,
            borough: 'staten_island',
            name: 'Doc Hennigan\'s',
            neighborhood: 'Port Richmond',
            address: '2118 Richmond Terrace, Staten Island, NY 10302',
            description: 'Local hotspot since 2019. Known for amazing food, custom cocktails, and a neighborhood crowd that feels like family.',
            hours: '12 PM – 2 AM',
            vibe: 'chill',
            vibeEmoji: '🥂',
            vibeLabel: 'CHILL',
            crowdLevel: 2,
            ratingTonight: 4.0,
            ratingOverall: 4.4,
            votesTonight: 67,
            specials: 'Brunch Menu · Custom Cocktails · Sports Screens',
            image: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 18
        },
        {
            id: 8,
            borough: 'staten_island',
            name: 'Mother Pug\'s Saloon',
            neighborhood: 'Richmond Valley',
            address: '4389 Amboy Rd, Staten Island, NY 10312',
            description: 'Lively neighborhood saloon with live music, karaoke nights, and a dedicated following of regulars who know how to party.',
            hours: '2 PM – 4 AM',
            vibe: 'music',
            vibeEmoji: '🎵',
            vibeLabel: 'LIVE MUSIC',
            crowdLevel: 4,
            ratingTonight: 4.2,
            ratingOverall: 4.0,
            votesTonight: 103,
            specials: 'Live Bands Fri & Sat · Karaoke Wednesday · Happy Hour',
            image: 'https://images.unsplash.com/photo-1570872626485-d8ffea69f463?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 39
        },
        {
            id: 9,
            borough: 'staten_island',
            name: 'Lee\'s Tavern',
            neighborhood: 'Dongan Hills',
            address: '60 Hancock St, Staten Island, NY 10305',
            description: 'Classic Staten Island institution since 1969. Famous for their thin-crust bar pizza and an old-school drinking atmosphere.',
            hours: '11 AM – 2 AM',
            vibe: 'chill',
            vibeEmoji: '🥂',
            vibeLabel: 'CHILL',
            crowdLevel: 3,
            ratingTonight: 3.9,
            ratingOverall: 4.5,
            votesTonight: 78,
            specials: 'Famous Bar Pizza · Cash Only · $3 Bud Drafts',
            image: 'https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 25
        },
        {
            id: 10,
            borough: 'staten_island',
            name: 'Burrito Bar',
            neighborhood: 'Forest Avenue',
            address: '585 Forest Ave, Staten Island, NY 10310',
            description: 'Tex-Mex meets nightlife. Known for margaritas, loaded burritos, and one of the best happy hours on the island.',
            hours: '11 AM – 12 AM',
            vibe: 'chill',
            vibeEmoji: '🥂',
            vibeLabel: 'CHILL',
            crowdLevel: 3,
            ratingTonight: 4.0,
            ratingOverall: 4.1,
            votesTonight: 91,
            specials: '$6 Margs Happy Hour · Taco Tuesday · Loaded Nachos',
            image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 20
        },
        {
            id: 11,
            borough: 'staten_island',
            name: 'The Alchemist',
            neighborhood: 'New Dorp',
            address: '310 New Dorp Ln, Staten Island, NY 10306',
            description: 'Newer craft cocktail bar with an incredible vibe and creative drinks. The mixologists here are next level.',
            hours: '5 PM – 2 AM',
            vibe: 'chill',
            vibeEmoji: '🥂',
            vibeLabel: 'CHILL',
            crowdLevel: 2,
            ratingTonight: 4.3,
            ratingOverall: 4.4,
            votesTonight: 74,
            specials: 'Craft Cocktail Menu · Date Night Specials · Small Plates',
            image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 15
        },
        {
            id: 12,
            borough: 'staten_island',
            name: 'Joe Broadway\'s',
            neighborhood: 'Mariner\'s Harbor',
            address: '2364 Richmond Terrace, Staten Island, NY 10302',
            description: 'Two-level sports hub with billiards, darts, big screens, comfort food, and award-winning wings. Game day headquarters.',
            hours: '11 AM – 4 AM',
            vibe: 'hype',
            vibeEmoji: '⚡',
            vibeLabel: 'HYPE',
            crowdLevel: 4,
            ratingTonight: 4.1,
            ratingOverall: 4.0,
            votesTonight: 119,
            specials: 'Award-Winning Wings · Pool Tables · Every Game, Every Screen',
            image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 41
        },
        {
            id: 13,
            borough: 'staten_island',
            name: 'Ti Ki Bar at Marina Cafe',
            neighborhood: 'Great Kills Harbor',
            address: '154 Mansion Ave, Staten Island, NY 10308',
            description: 'Waterfront tiki bar that goes crazy during summer. Tropical cocktails, outdoor seating with harbor views, and packed weekend nights.',
            hours: '12 PM – 12 AM (Seasonal)',
            vibe: 'lit',
            vibeEmoji: '🔥',
            vibeLabel: 'LIT',
            crowdLevel: 5,
            ratingTonight: 4.5,
            ratingOverall: 4.3,
            votesTonight: 143,
            specials: 'Rum Punch · Tiki Cocktails · Waterfront Dining',
            image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 55
        },
        {
            id: 14,
            borough: 'staten_island',
            name: 'Lacey\'s Bridge Tavern',
            neighborhood: 'Tottenville',
            address: '235 Ellis St, Staten Island, NY 10307',
            description: 'Laid-back homey tavern at the southern tip of the island. Family-style dining, raw bar, and a crowd that treats everyone like a regular.',
            hours: '12 PM – 11 PM',
            vibe: 'chill',
            vibeEmoji: '🥂',
            vibeLabel: 'CHILL',
            crowdLevel: 2,
            ratingTonight: 3.8,
            ratingOverall: 4.2,
            votesTonight: 52,
            specials: 'Raw Bar · Family-Style Dinners · Waterfront Patio',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 12
        },
        {
            id: 15,
            borough: 'staten_island',
            name: 'Hot Shotz Sports Bar',
            neighborhood: 'Eltingville',
            address: '4523 Amboy Rd, Staten Island, NY 10312',
            description: 'Dedicated sports bar where the games are always on and the drinks are always cold. Loud, proud, and packed on fight nights.',
            hours: '12 PM – 4 AM',
            vibe: 'hype',
            vibeEmoji: '⚡',
            vibeLabel: 'HYPE',
            crowdLevel: 4,
            ratingTonight: 4.0,
            ratingOverall: 3.9,
            votesTonight: 108,
            specials: 'Fight Night Events · $3 Shots · Wing Platters',
            image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=800&q=80',
            isLive: true,
            checkedIn: 36
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
            .sort((a, b) => b.votesTonight - a.votesTonight);
    },

    getBarsByVibe(vibe) {
        const borough = POPPIN.getActiveBorough ? POPPIN.getActiveBorough() : 'staten_island';
        let filtered = this.bars.filter(b => b.borough === borough);
        if (vibe !== 'all') {
            filtered = filtered.filter(b => b.vibe === vibe);
        }
        return filtered;
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
