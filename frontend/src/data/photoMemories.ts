export interface PhotoMemoryItem {
  id: number;
  src: string;
  title: string;
  caption: string;
  funnyCaption?: string;
  emotionalCaption?: string;
  date?: string;
  location?: string;
  category: 
    | 'opening' 
    | 'universe' 
    | 'detective' 
    | 'emoji' 
    | 'puzzle' 
    | 'evidence' 
    | 'recovery' 
    | 'food' 
    | 'scanner' 
    | 'korean' 
    | 'wedding' 
    | 'then_now' 
    | 'timeline' 
    | 'thoughts' 
    | 'emotional' 
    | 'hero' 
    | 'secret';
  revealType: 'blur' | '3d_orbit' | 'crop_zoom' | 'emoji_burst' | 'puzzle_merge' | 'evidence_drop' | 'recovery_scan' | 'royal_frame' | 'holo_scan' | 'glitch_match' | 'wedding_reveal' | 'slider' | 'timeline_zoom' | 'orbit_words' | 'emotional_fade' | 'fireworks_hero' | 'instant_polaroid';
  question?: string;
  options?: string[];
  answer?: number;
  memoryStory: string;
  hidden?: boolean;
  finaleEnabled: boolean;
  focusX?: string;
  focusY?: string;
  // Constellation coordinate relative offsets in 3D
  constellationPos?: [number, number, number];
}

export const photoMemories: PhotoMemoryItem[] = [
  {
    id: 1,
    src: "/images/sumantha/photo-01.jpg",
    title: "The Mystery Unlock",
    caption: "First memory romba easy 👀 Indha photo identify panna mudiyuma?",
    funnyCaption: "Easy thane? 😂 Welcome to your universe!",
    category: "opening",
    revealType: "blur",
    memoryStory: "The very first moment that started this entire incredible chapter of memories.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "48%",
    constellationPos: [-2.8, 1.6, 0]
  },
  {
    id: 2,
    src: "/images/sumantha/photo-02.jpg",
    title: "Celestial Memory #1",
    caption: "Indha moment nyabagam irukka? 👀",
    funnyCaption: "Floating in zero gravity like your mood swings 😂",
    category: "universe",
    revealType: "3d_orbit",
    memoryStory: "Laughing at midnight texts and sharing unfiltered thoughts that no one else would ever understand.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "35%",
    constellationPos: [-2.2, 2.5, 0.4]
  },
  {
    id: 3,
    src: "/images/sumantha/photo-03.jpg",
    title: "Celestial Memory #2",
    caption: "Another unforgettable chapter orbiting in space ✨",
    funnyCaption: "100% candid, 0% planned chaos 😌",
    category: "universe",
    revealType: "3d_orbit",
    memoryStory: "Those completely unplanned moments where everything turned into a comedy show.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "38%",
    constellationPos: [-1.2, 3.2, -0.3]
  },
  {
    id: 4,
    src: "/images/sumantha/photo-04.jpg",
    title: "Celestial Memory #3",
    caption: "A golden memory shining in the constellation 💫",
    funnyCaption: "Caught mid-smile before the teasing started 😂",
    category: "universe",
    revealType: "3d_orbit",
    memoryStory: "Pure positive vibes and infectious laughter that always brightens up the room.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "35%",
    constellationPos: [0, 3.5, 0.2]
  },
  {
    id: 5,
    src: "/images/sumantha/photo-05.jpg",
    title: "Detective Challenge",
    caption: "Okay detective madam 🕵️‍♀️ Indha photo enga / eppo eduthom nu nyabagam irukka? 👀",
    funnyCaption: "YESSS 😂👏 Memory innum strong than!",
    category: "detective",
    revealType: "crop_zoom",
    question: "Indha photo-oda exact vibe enna? 👀",
    options: [
      "Full serious photoshoot mode 📸",
      "2 seconds before bursting into laughter 😂",
      "Thinking about what snack to eat next 🍰",
      "Planning how to win an argument 😌"
    ],
    answer: 1,
    memoryStory: "That time when we tried to take one normal photo, but laughing was strictly mandatory.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "30%",
    constellationPos: [1.2, 3.2, -0.3]
  },
  {
    id: 6,
    src: "/images/sumantha/photo-06.jpg",
    title: "Emoji Code Memory",
    caption: "Indha memory enna nu kandupidikka mudiyuma? 👀",
    funnyCaption: "Evidence inga irukku 😂 Escape aaga mudiyathu!",
    category: "emoji",
    revealType: "emoji_burst",
    question: "Decipher the emoji story: 🍦 + 📱 + 😂 + 🌙",
    options: [
      "Midnight ice cream run & non-stop gossip 🍦",
      "Watching K-drama till 3 AM 🌙",
      "Sending 50 memes without context 📱",
      "Debating life choices with snacks 🍜"
    ],
    answer: 0,
    memoryStory: "The legendary night where 'just one small ice cream' turned into an hour-long laughter marathon.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "35%",
    constellationPos: [2.2, 2.5, 0.4]
  },
  {
    id: 7,
    src: "/images/sumantha/photo-07.jpg",
    title: "The 3x3 Photo Puzzle",
    caption: "Connect the pieces to reconstruct this special memory 🧩",
    funnyCaption: "Finallyyyy 😂 Indha memory than ❤️",
    category: "puzzle",
    revealType: "puzzle_merge",
    memoryStory: "Piece by piece, every little memory fits together to form our unique friendship universe.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "35%",
    constellationPos: [2.8, 1.6, 0]
  },
  {
    id: 8,
    src: "/images/sumantha/photo-08.jpg",
    title: "Classified Evidence #008",
    caption: "Nee appadi pannala nu sollalam... But unfortunately evidence irukku madam 😂",
    funnyCaption: "CAUGHT IN 4K 😂 Explanation strictly rejected!",
    category: "evidence",
    revealType: "evidence_drop",
    memoryStory: "Uncontroversial proof that teasing Sumantha is one of the universe's greatest joys.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "40%",
    constellationPos: [3.1, 0.5, -0.3]
  },
  {
    id: 9,
    src: "/images/sumantha/photo-09.jpg",
    title: "Recovered Evidence #009",
    caption: "Someone tried to delete this memory... but recovery protocol initiated 👀",
    funnyCaption: "Why always 99%? 😭 ... Recovered successfully!",
    category: "recovery",
    revealType: "recovery_scan",
    memoryStory: "Even if you try to delete the crazy moments, the backup servers remember everything!",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "35%",
    constellationPos: [3.0, -0.6, 0.2]
  },
  {
    id: 10,
    src: "/images/sumantha/photo-10.jpg",
    title: "International Food Queen 👑",
    caption: "Official coronation of Sumantha — Food Enthusiast & Cake Specialist 🍰",
    funnyCaption: "Cake Interest: 100% 🍰 | Ice Cream: 1000% 🍦 | Sharing: UNKNOWN ⚠️",
    category: "food",
    revealType: "royal_frame",
    memoryStory: "Never trust Sumantha when she says 'I'm not that hungry' — food detection radius is 50 KM!",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "30%",
    constellationPos: [2.4, -1.6, -0.4]
  },
  {
    id: 11,
    src: "/images/sumantha/photo-11.jpg",
    title: "Sumantha Holographic Scanner",
    caption: "Biometric analysis running... System overheating from too much chaos! 😂",
    funnyCaption: "Tamil Ponnu: ✅ | BTS: 💜 | Height: ACCESS DENIED 🔒 | Cuteness: MAXIMUM ❤️",
    category: "scanner",
    revealType: "holo_scan",
    memoryStory: "Scanning complete: 999% chaos, 1000% good heart, and unmatched drama queen energy.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "35%",
    constellationPos: [1.5, -2.5, 0.3]
  },
  {
    id: 12,
    src: "/images/sumantha/photo-12.jpg",
    title: "Korean Mappillai Match 🇰🇷",
    caption: "Searching Global Database: France 🇫🇷 ... Sri Lanka 🇱🇰 ... Korea 🇰🇷 100%!",
    funnyCaption: "🚨 MATCH FOUND: UNAKKU KOREAN MAPPILLAI KIDAICHITTU 😭🇰🇷",
    category: "korean",
    revealType: "glitch_match",
    memoryStory: "The K-drama obsession has officially peaked — wedding invitations being prepared in Seoul!",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "30%",
    constellationPos: [0.6, -3.2, -0.2]
  },
  {
    id: 13,
    src: "/images/sumantha/photo-13.jpg",
    title: "Future Korean Wedding (2030) 💍",
    caption: "ACCESSING FUTURE DATABASE 2030: SUMANTHA ❤️ MR. CLASSIFIED 🇰🇷",
    funnyCaption: "Adei... Nijamave nadanthudumo 😭😂",
    category: "wedding",
    revealType: "wedding_reveal",
    memoryStory: "The grand East Palace Hanbok wedding — living the ultimate K-drama main character life!",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "25%",
    constellationPos: [0, -3.6, 0.4]
  },
  {
    id: 14,
    src: "/images/sumantha/photo-14.jpg",
    title: "Then vs Now — Chapter: Then",
    caption: "Konjam years back pogalam... Things konjam change aachu ⏳",
    funnyCaption: "Namma nonsense mattum same than 😂",
    category: "then_now",
    revealType: "slider",
    memoryStory: "Looking back at where we started — same contagious smile, zero filter, pure genuine soul.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "35%",
    constellationPos: [-0.6, -3.2, -0.2]
  },
  {
    id: 15,
    src: "/images/sumantha/photo-15.jpg",
    title: "Then vs Now — Chapter: Now",
    caption: "Present Day Sumantha — still rocking the universe!",
    funnyCaption: "Height pathi comment panna vendam... Enakku life important 😭😂",
    category: "then_now",
    revealType: "slider",
    memoryStory: "Growing older, wiser, and even more chaotic — wouldn't change a single thing!",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "35%",
    constellationPos: [-1.5, -2.5, 0.3]
  },
  {
    id: 16,
    src: "/images/sumantha/photo-16.jpg",
    title: "Timeline Milestone: The Golden Era",
    caption: "That unforgettable milestone where everything clicked seamlessly ✨",
    funnyCaption: "Peak friendship vibes unlocked 🚀",
    category: "timeline",
    revealType: "timeline_zoom",
    date: "MILESTONE ERA",
    location: "Memory Vault",
    memoryStory: "A defining memory etched into our friendship history.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "35%",
    constellationPos: [-2.4, -1.6, -0.4]
  },
  {
    id: 17,
    src: "/images/sumantha/photo-17.jpg",
    title: "Timeline Milestone: The Unstoppable Duo",
    caption: "Late night laughs, shared secrets, and endless cheering for each other ❤️",
    funnyCaption: "Partners in crime since day one 😌",
    category: "timeline",
    revealType: "timeline_zoom",
    date: "SPECIAL MOMENT",
    location: "Everywhere",
    memoryStory: "Supporting each other through thick and thin, celebrating every small win together.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "35%",
    constellationPos: [-3.0, -0.6, 0.2]
  },
  {
    id: 18,
    src: "/images/sumantha/photo-18.jpg",
    title: "What I Think About You",
    caption: "Centering the one person who brings so much warmth and fun into life ✨",
    funnyCaption: "Annoying konjam extra 😂 But that's what makes you... YOU. ❤️",
    category: "thoughts",
    revealType: "orbit_words",
    memoryStory: "CARING • FUNNY • SPECIAL — genuinely one in a billion.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "30%",
    constellationPos: [-3.1, 0.5, -0.3]
  },
  {
    id: 19,
    src: "/images/sumantha/photo-19.jpg",
    title: "Emotional Memory #1: Pure Moments",
    caption: "Ivlo neram jokes pannom... Sometimes photos are just photos.",
    emotionalCaption: "But sometimes they become the moments you cherish the most in life. ❤️",
    category: "emotional",
    revealType: "emotional_fade",
    memoryStory: "Behind all the jokes and teasing is immense gratitude for having you in my life.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "35%",
    constellationPos: [-1.4, 0.4, 0.5]
  },
  {
    id: 20,
    src: "/images/sumantha/photo-20.jpg",
    title: "Emotional Memory #2: Genuine Light",
    caption: "Namma random talks, silly jokes, and small moments... later than puriyum idhellam than actual memories nu. ❤️",
    emotionalCaption: "Some people make ordinary days feel extraordinary. You are one of them. ✨",
    category: "emotional",
    revealType: "emotional_fade",
    memoryStory: "Thank you for being such an authentic, caring, and wonderful human being.",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "35%",
    constellationPos: [1.4, 0.4, 0.5]
  },
  {
    id: 21,
    src: "/images/sumantha/photo-21.jpg",
    title: "Happy Birthday Sumantha! 🎂",
    caption: "HAPPY BIRTHDAY SUMANTHA ❤️ 11 SEPTEMBER",
    funnyCaption: "More laughs, more food, more crazy memories ahead! 🥳",
    emotionalCaption: "Innum neraya memories create pannuvom ❤️",
    category: "hero",
    revealType: "fireworks_hero",
    memoryStory: "May this year bring you boundless happiness, success, delicious food, and all your heart desires!",
    finaleEnabled: true,
    focusX: "50%",
    focusY: "30%",
    constellationPos: [0, 0.2, 0.8]
  },
  {
    id: 22,
    src: "/images/sumantha/photo-22.jpg",
    title: "Secret Star Memory ⭐",
    caption: "Website mudinjiduchu nu nenachiya? 👀 Actually... One last memory innum irukku.",
    emotionalCaption: "Ithu last photo... But hopefully last memory illa. ❤️ 22/22 Complete!",
    category: "secret",
    revealType: "instant_polaroid",
    memoryStory: "The secret star holding the eternal promise of countless more memories together.",
    hidden: true,
    finaleEnabled: true,
    focusX: "50%",
    focusY: "35%",
    constellationPos: [0, -0.8, 1.2]
  }
];
