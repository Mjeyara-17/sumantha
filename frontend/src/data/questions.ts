export interface GameQuestion {
  id: number;
  category: 'first-memory' | 'teasing' | 'food' | 'korean' | 'bts';
  question: string;
  options: string[];
  correctIndex: number;
  funnyResponse: string;
  revealTitle: string;
  image?: string;
  description: string;
}

export const gameQuestions: GameQuestion[] = [
  {
    id: 1,
    category: 'first-memory',
    question: "First question... ready ah? 👀 Namma first proper conversation enna nu nyabagam irukka?",
    options: [
      "Obviously full-ah nyabagam irukku 😌",
      "Konjam konjam memory lag aagudhu...",
      "Actually marandhuten, light-ah blame panren 😂",
      "Nee sollu, let's see what you remember 😭"
    ],
    correctIndex: 0,
    funnyResponse: "Hmmm... Confidence irukku 😂 Let's reveal the real story!",
    revealTitle: "Our First Connection Rift 🌌",
    image: "/images/memories/first-chat.jpg",
    description: "[ADD REAL MEMORY] - Random midnight conversation that quickly turned into continuous inside jokes and nonstop laughter. From that very day, the vibe matched instantly."
  },
  {
    id: 2,
    category: 'teasing',
    question: "Chat list-la reply panna infinite time eduthutu, disappear aagradhu yaaroda signature style? 😈",
    options: [
      "Sumantha (Honest acceptance 😌)",
      "Definitely You! (False accusation 😭)",
      "Rendu perume template characters than 😂",
      "Question is highly dangerous, skip panren! 🤫"
    ],
    correctIndex: 2,
    funnyResponse: "YESSS! Rendu perume same speed than 😂. Silent spectator mode automatically engaged!",
    revealTitle: "The Famous Chat Disappearing Act 📱",
    image: "/images/memories/chat-wait.jpg",
    description: "[ADD REAL CHAT] - Sometimes reply in 2 seconds, and other times reply in 2 business days. But whenever we resume, it feels like no time has passed at all."
  },
  {
    id: 3,
    category: 'food',
    question: "Sumantha-ku ultimate happiness na enna? Be honest! 🍰🍦🍜",
    options: [
      "Strawberries & Chocolate 🍓🍫",
      "Ice Cream & Cake 🍦🍰",
      "Street Food & Pizza 🍜🍕",
      "Korean boys & BTS 🇰🇷💜",
      "All of the above! (Food is life 👑)"
    ],
    correctIndex: 4,
    funnyResponse: "Wait... why am I even asking? 😂 Answer obviously ellame than! Presenting the FOOD QUEEN 👑",
    revealTitle: "The Food Queen's Eternal Hunger 🍰",
    image: "/images/memories/food-run.jpg",
    description: "[ADD REAL MEMORY] - 'I'm not hungry' is the biggest myth in universe history. Five minutes later, she's hunting for cake, demanding ice cream, and raiding the pantry!"
  },
  {
    id: 4,
    category: 'korean',
    question: "Unakku pidicha K-drama protagonist live-ah munnala vandha... enna panve? 👀🇰🇷",
    options: [
      "Unna ignore pannitu oodi poiruven 😂",
      "Friendship stays, but visual focus shifts 😭",
      "Decent-ah hello soltu stand-by la irupen",
      "Avan kitta unna pathi tease panni pesuven 🤫"
    ],
    correctIndex: 0,
    funnyResponse: "Correct-ah sonna paathiya! 😭 Immediately namma friendship-ku competition clear-ah visible!",
    revealTitle: "The Korean Boy Competition 🇰🇷",
    image: "/images/memories/k-drama.jpg",
    description: "[ADD REAL MEME] - One K-drama scene appears and suddenly our chat revolves around standard drama plots, coffee shops in Seoul, and cherry blossoms."
  },
  {
    id: 5,
    category: 'bts',
    question: "And obviously... BTS mode on panna namma first discussion song list nyabagam irukka? 💜",
    options: [
      "Dynamic beat songs 🕺",
      "Soft acoustic emotional lyrics 🥹",
      "Every single song playlist loop 🎧",
      "Forget statistical data, purple heart check! 💜"
    ],
    correctIndex: 3,
    funnyResponse: "Purple hearts never lie! 💜 BTS Mode Activated. Spotlights align to the K-pop universe stage!",
    revealTitle: "BTS Mode: Purple Constellations 🌌",
    image: "/images/memories/bts-stars.jpg",
    description: "[ADD REAL MEMORY] - Talking about playlists, sharing concert clips, and filling the screen with purple heart spams. It's our little purple constellation."
  }
];
