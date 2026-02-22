const fs = require('fs');

const boroughs = ['manhattan', 'brooklyn', 'queens', 'bronx', 'staten_island'];

const vibeMap = {
    chill: { emoji: '🥂', label: 'Chill' },
    hype: { emoji: '⚡', label: 'Hype' },
    lit: { emoji: '🔥', label: 'LIT' },
    music: { emoji: '🎵', label: 'Live Music' }
};

const musicGenres = ['ambient', 'DJ', 'jukebox', 'live band', 'none'];
const ageVibes = ['21-25', '25-35', '30+', 'mixed'];
const dressCodes = ['casual', 'smart casual', 'upscale'];
const tagBank = ['rooftop', 'speakeasy', 'craft cocktails', 'sports', 'dive bar', 'lounge', 'club', 'wine bar', 'brewery', 'patio'];
const happyHours = ['4 PM – 7 PM: $5 Drafts, $8 Well Drinks', '5 PM – 8 PM: Half-price Cocktails', '3 PM – 6 PM: $1 Oysters', 'None'];

const imageBank = [
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1575444758702-4a6b9222c016?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582222129532-b7b5f543dc6e?auto=format&fit=crop&w=800&q=80'
];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomTags() {
    let count = Math.floor(Math.random() * 3) + 2;
    let selected = new Set();
    while (selected.size < count) selected.add(getRandom(tagBank));
    return Array.from(selected);
}

function makeBar(id, name, borough) {
    const vibeKey = getRandom(Object.keys(vibeMap));
    const isLit = vibeKey === 'lit' || vibeKey === 'hype';

    return {
        id: id,
        borough: borough,
        name: name,
        neighborhood: 'Local Neighborhood',
        address: `${Math.floor(Math.random() * 500) + 1} Main St, ${borough}, NY 10000`,
        hours: '4 PM – 2 AM',
        description: `An amazing local venue in ${borough}. Great drinks, good people, perfect spot for the night.`,
        vibe: vibeKey,
        vibeEmoji: vibeMap[vibeKey].emoji,
        vibeLabel: vibeMap[vibeKey].label,
        specials: 'Craft Cocktails $14 · Local Drafts $7',
        image: getRandom(imageBank),
        isLive: true,
        checkedIn: Math.floor(Math.random() * 150) + 10,
        votesTonight: Math.floor(Math.random() * 300) + 50,
        ratingTonight: (Math.random() * 1.0 + 4.0).toFixed(1),
        ratingOverall: (Math.random() * 1.0 + 4.0).toFixed(1),
        crowdLevel: isLit ? Math.floor(Math.random() * 3) + 3 : Math.floor(Math.random() * 3) + 1,
        coverCharge: isLit ? 20 : 0,
        lineTime: isLit ? Math.floor(Math.random() * 45) : 0,
        // NEW FIELDS
        drinksMenu: [
            "Signature Old Fashioned $16",
            "Margarita Pitcher $45",
            "House Lager Draft $7",
            "Spicy Paloma $15"
        ],
        musicGenre: getRandom(musicGenres),
        ageVibe: getRandom(ageVibes),
        dressCode: getRandom(dressCodes),
        happyHour: getRandom(happyHours),
        tags: getRandomTags(),
        socialLinks: '@' + name.toLowerCase().replace(/[^a-z0-9]/g, ''),
        photos: [getRandom(imageBank), getRandom(imageBank), getRandom(imageBank)],
        trending: Math.random() > 0.8,
        premiumListing: Math.random() > 0.8
    };
}

// Provided in the implementation plan requirements
const specificManhattan = ["The Dead Rabbit", "Please Don't Tell (PDT)", "Employees Only", "Le Bain", "Attaboy", "The Campbell", "Bemelmans Bar", "Angel's Share", "Saxon + Parole", "Dante", "Patent Pending", "Flatiron Room", "Bar Goto", "Little Branch", "Mace", "Raines Law Room", "Amor y Amargo", "Death & Co", "Double Chicken Please", "Katana Kitten"];
const specificBrooklyn = ["Weather Up", "The Shanty", "BKLYN Larder", "Clover Club", "Diamond Reef", "Maison Premiere", "The Richardson", "June", "Black Flamingo", "The Narrows", "Greenpoint Beer & Ale", "Fresh Kills Bar", "Sunny's Bar", "Westlight", "Boobie Trap", "Zombie Hut", "Leyenda", "Grand Army", "Tørst", "Union Pool"];
const specificQueens = ["Dutch Kills", "The Bonnie", "Snowdonia", "The Sparrow", "Casa Enrique", "Mosaic", "Doha Bar", "Bohemian Beer Garden", "Bierocracy", "The Standing Room", "Cafe Henri", "Blend", "Sweet Afton", "LIC Bar", "Dominies", "Kelly's", "Astoria Tavern", "Sanger Hall", "Sekend Sun", "Neir's Tavern"];
const specificBronx = ["Bronx Draft House", "Beatstro", "The Slab", "Ceetay", "Ooo Wee!", "Port Morris Distillery", "Bronx Alehouse", "Brewed", "Gun Hill Brewing", "Mike's", "Gasolina", "Concoctions", "The Bronx Brewery", "Bar 47", "Salsa Con Fuego", "Glazz", "Pina", "Made in Puerto Rico", "Tirado", "The Lounge"];
const specificStatenIsland = ["Blue Lounge", "Adobe Blues", "Lee's Tavern", "Liedy's Shore Inn", "Flagship Brewing", "Craft House", "Beso", "Every Thing Goes", "Hop Shoppe", "Dugout", "Karl's Klipper", "The Stone House", "Mother Pug's Saloon", "Doc Hennigan's", "Burrito Bar", "Ralph's Sports Bar", "Trackside Bar", "Marina Cafe", "The Vanderbilt", "South Fin Grill"];

const barNamesByBorough = {
    manhattan: specificManhattan,
    brooklyn: specificBrooklyn,
    queens: specificQueens,
    bronx: specificBronx,
    staten_island: specificStatenIsland
};

let allBars = [];
let globalId = 101;

for (const b of boroughs) {
    const names = barNamesByBorough[b] || [];
    for (let i = 0; i < 20; i++) {
        let name = names[i] || `${b} Bar ${i + 1}`;
        allBars.push(makeBar(globalId++, name, b));
    }
}

const dataJsPath = './js/data.js';
let content = fs.readFileSync(dataJsPath, 'utf8');

// The array starts at `    bars: [` and ends at `    ],` before `    /* ---------- Mock Comments`
const barsStartRegex = /bars:\s*\[/;
const commentsStartRegex = /\/\* ---------- Mock Comments/;

const startMatch = content.match(barsStartRegex);
const endMatch = content.match(commentsStartRegex);

if (startMatch && endMatch) {
    const startIdx = startMatch.index;
    const endIdx = endMatch.index;

    // Find the '],' right before commentsStartRegex
    const textBeforeComments = content.substring(startIdx, endIdx);
    const lastBracketIndex = textBeforeComments.lastIndexOf('],');

    if (lastBracketIndex !== -1) {
        const fullEndIdx = startIdx + lastBracketIndex + 2; // include '],'

        const stringifiedBars = JSON.stringify(allBars, null, 8).replace(/^\[/m, 'bars: [').replace(/\]$/m, '    ]');

        // Let's replace the whole array
        const newContent = content.substring(0, startIdx) + stringifiedBars + ",\n\n    " + content.substring(endIdx);

        fs.writeFileSync(dataJsPath, newContent, 'utf8');
        console.log('Successfully injected 100 bars into data.js');
    } else {
        console.log('Could not find closing bracket of bars array.');
    }
} else {
    console.log('Could not find bars array start or Mock Comments section.');
}
