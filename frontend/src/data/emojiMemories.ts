export interface EmojiMemory {
  id: number;
  emojis: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  revealTitle: string;
  story: string;
  image?: string;
}

export const emojiMemories: EmojiMemory[] = [
  {
    id: 1,
    emojis: "🍦 + 📱 + 😂 + 🌙",
    prompt: "Indha memory enna nu kandupidikka mudiyuma? 👀",
    options: [
      "Midnight Ice cream & non-stop chat run 🍦🌙",
      "Phone charging potu thoongina day 😴",
      "Reels paathu siricha routine evening 😂",
      "Food order miss aagi sanda pota night 😭"
    ],
    correctIndex: 0,
    revealTitle: "Midnight Ice Cream & Endless Texts 🌙🍦",
    story: "[ADD REAL MEMORY] - Sumantha deciding that 11:30 PM is the medically recommended time for ice cream, leading into 3 hours of unstoppable laughter and voice notes.",
    image: "/images/memories/memory-02.jpg"
  },
  {
    id: 2,
    emojis: "🍰 + 😭 + 🤫 + 🏃‍♀️",
    prompt: "Clue paathutu correct-ah guess pannu! 👀",
    options: [
      "Diet start pannitu 10 mins-la cake saaptadhu 🍰",
      "Late-ah vandhu sorry ketta scenario ⏰",
      "Shopping panna poi vazhi thavarinadhu 🛍️",
      "Instagram reels infinite scroll trance 📱"
    ],
    correctIndex: 0,
    revealTitle: "The World Record Diet: 10 Minutes 🍰😂",
    story: "[ADD REAL MEMORY] - 'Naan innaiku la irundhu strict diet da!' Exactly 10 minutes later: 'Aama andha cake fridge-la irundhudhey, eduthu saapdalama?'",
    image: "/images/memories/food-run.jpg"
  }
];
