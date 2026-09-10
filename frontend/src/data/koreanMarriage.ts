export interface WeddingDressOption {
  id: string;
  name: string;
  emoji: string;
  tag: string;
  description: string;
  color: string;
}

export const weddingDresses: WeddingDressOption[] = [
  {
    id: 'classic-white',
    name: 'Classic White Royal',
    emoji: '👰',
    tag: 'ELEGANCE',
    description: 'Timeless white silk gown with embroidered lace and royal veil.',
    color: 'from-amber-100/20 to-white/10'
  },
  {
    id: 'korean-elegant',
    name: 'Korean Modern Hanbok',
    emoji: '🌸',
    tag: 'SEOUL SPECIAL',
    description: 'Pastel peach & gold traditional Korean silk fusion with floral hairpins.',
    color: 'from-pink-500/20 to-rose-400/10'
  },
  {
    id: 'princess-sparkle',
    name: 'Princess Galaxy Gown',
    emoji: '✨',
    tag: 'SPARKLE MAX',
    description: 'Tiered tulle skirt embedded with shimmering celestial crystals.',
    color: 'from-cyan-500/20 to-blue-400/10'
  },
  {
    id: 'purple-dream',
    name: 'BTS Purple Dream Edition',
    emoji: '💜',
    tag: 'ARMY APPROVED',
    description: 'Deep lavender velvet royal couture featuring subtle purple constellations.',
    color: 'from-purple-500/20 to-violet-400/10'
  }
];

export const koreanMappillaiData = {
  candidateName: "CLASSIFIED 👀",
  nationality: "Korean 🇰🇷",
  height: "Tall enough to reach the top shelf for cake 😂",
  occupation: "Professional K-Drama Protagonist",
  skills: [
    "Buying cake unconditionally 🍰",
    "Emergency ice cream delivery 24/7 🍦",
    "Korean BBQ & Tteokbokki masterchef 🍜",
    "BTS tolerance level: MAXIMUM 💜",
    "Takes 500 photos without a single complaint 📸",
    "Replies faster than Sumantha 😂",
    "Survives massive monthly dessert expenses 💳"
  ],
  termsAndConditions: [
    "Never touch her food without official written clearance.",
    "Cake must be supplied on schedule without delays.",
    "Emergency ice cream delivery must be active 24/7/365.",
    "BTS complaints are strictly prohibited under cosmic law.",
    "Korean drama interruptions require 24-hour advance notice.",
    "'I'm not hungry' must NEVER be believed under any circumstances.",
    "Food sharing percentages are 100% controlled by Sumantha.",
    "Unlimited patience & teasing tolerance required at all times."
  ],
  newsTickerLines: [
    "Family and friends currently in shock and celebration.",
    "Birthday website creator remarks: 'Honestly, I saw this coming from miles away.' 😂",
    "All bakeries in Seoul prepare emergency cake reserves for arrival.",
    "BTS agency confirms VIP purple invitations dispatched."
  ],
  fiveYearsTimeline: [
    { time: "08:00 AM", speaker: "Korean Husband", text: "Good morning Sumantha ❤️ Coffee ready!" },
    { time: "08:05 AM", speaker: "Sumantha", text: "Enakku pasikkuthu..." },
    { time: "08:10 AM", speaker: "Sumantha", text: "Cake irukka? 👀" },
    { time: "08:12 AM", speaker: "Sumantha", text: "Ice cream irukka? 🍦" },
    { time: "08:15 AM", speaker: "Sumantha", text: "And Korean street food? 🍜" },
    { time: "08:20 AM", speaker: "Korean Husband", text: "Running to market immediately! 😭🏃‍♂️💨" }
  ],
  husbandReview: {
    rating: 5,
    stars: "⭐⭐⭐⭐⭐",
    title: "Best Wife in the Galaxy",
    quote: `"Very cute wife. Very funny. Food expenses konjam dangerous. She said 'I'm not hungry' and then ate my entire lunch. BTS volume occasionally shakes the building foundations. Would marry again though ❤️"`
  }
};
