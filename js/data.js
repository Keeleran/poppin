/* ============================================
   POPPIN — Data Layer
   Real Staten Island Bars + Mock Users/Events
   ============================================ */

const POPPIN = {
    /* ---------- Auth Credentials ---------- */
    users: [
        {
            username: 'admin',
            password: 'Admin123!',
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
            password: 'Cobra1!',
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

    /* ---------- Staten Island Bars ---------- */
    bars: [
        {
            id: 1,
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

    /* ---------- Upcoming Events ---------- */
    events: [
        {
            id: 1,
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
        return [...this.bars].sort((a, b) => b.votesTonight - a.votesTonight);
    },

    getBarsByVibe(vibe) {
        if (vibe === 'all') return this.bars;
        return this.bars.filter(b => b.vibe === vibe);
    },

    authenticate(username, password) {
        return this.users.find(u => u.username === username && u.password === password);
    },

    getCurrentUser() {
        const stored = localStorage.getItem('poppin_user');
        return stored ? JSON.parse(stored) : null;
    },

    login(user) {
        const safeUser = { ...user };
        delete safeUser.password;
        localStorage.setItem('poppin_user', JSON.stringify(safeUser));
    },

    logout() {
        localStorage.removeItem('poppin_user');
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
