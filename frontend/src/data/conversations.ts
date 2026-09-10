export interface ChatMessage {
  sender: 'you' | 'her';
  text: string;
  delay: number; // millisecond delay to render after previous message
  reaction?: string;
}

export interface ChatThread {
  id: number;
  title: string;
  subtitle: string;
  punchline: string;
  messages: ChatMessage[];
}

export const chatThreads: ChatThread[] = [
  {
    id: 1,
    title: "Eternal Food Conversation",
    subtitle: "RECOVERED DELETED ARCHIVE #401",
    punchline: "Indha conversation-ku meaning enna nu innum puriyala 😭",
    messages: [
      { sender: 'you', text: "Enna panra? 👀", delay: 800 },
      { sender: 'her', text: "Onnum illa...", delay: 900 },
      { sender: 'you', text: "Appo? 🤔", delay: 800 },
      { sender: 'her', text: "Saapdren 😂", delay: 1100, reaction: "🍰" },
      { sender: 'you', text: "Again?! 😭 Enna saapdra?", delay: 900 },
      { sender: 'her', text: "Ice cream... and cake order pannen 😌🍦", delay: 1300, reaction: "🍦" },
      { sender: 'you', text: "Weight classified-nu sonnadhu correct than 😂", delay: 1000 },
      { sender: 'her', text: "Don't tease okay! 😭 Food is happiness!", delay: 1300, reaction: "👑" }
    ]
  },
  {
    id: 2,
    title: "The 2-Business-Days Reply",
    subtitle: "RECOVERED DELETED ARCHIVE #788",
    punchline: "Indha conversation-ku meaning enna nu innum puriyala 😭",
    messages: [
      { sender: 'you', text: "Dei, adhu enna nu sollu first... 🧐", delay: 700 },
      { sender: 'her', text: "[Message sent on Monday 11:15 AM]", delay: 600 },
      { sender: 'her', text: "Hello! 😂 (Replied on Thursday)", delay: 1400, reaction: "💀" },
      { sender: 'you', text: "Innuma reply compile aala? 🤦‍♂️ Business days system-ah?", delay: 900 },
      { sender: 'her', text: "Aiyoo sorry, brain loading slow-ah irundhuchi 😭", delay: 1200 },
      { sender: 'you', text: "Busy-ah Instagram reels pathutu irundhiya? 😂", delay: 900 },
      { sender: 'her', text: "Reels oru stress relief da! Hehehe 🤫", delay: 1100, reaction: "🍿" }
    ]
  }
];
