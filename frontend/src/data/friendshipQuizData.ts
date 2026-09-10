export interface FriendshipQuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
  reaction?: string;
  subReaction?: string;
  isRunaway?: boolean;
}

export interface FriendshipQuestion {
  id: number;
  title: string;
  subtitle?: string;
  question: string;
  type: 'standard' | 'emoji' | 'runaway' | 'choice';
  options: FriendshipQuestionOption[];
  correctAnswerId?: string;
  specialType?: 'emoji-selection' | 'late-reply-runaway' | 'how-we-met' | 'reels' | 'annoying' | 'friendship-nature';
}

export const friendshipQuizQuestions: FriendshipQuestion[] = [
  {
    id: 1,
    title: "QUESTION 1 — REELS",
    subtitle: "Investigation begins 👀",
    question: "Yaar kooda most-ah reels share pannuva? 👀📱",
    type: 'choice',
    specialType: 'reels',
    options: [
      {
        id: 'suman',
        text: 'SUMAN 😂',
        reaction: 'Reels department officially confirmed 😂📱',
        subReaction: 'Nonstop scroll & share daily routine verified!'
      },
      {
        id: 'ram',
        text: 'RAM 😌',
        reaction: 'Hmmm... interesting evidence 👀',
        subReaction: 'System noting this valuable data.'
      }
    ]
  },
  {
    id: 2,
    title: "QUESTION 2 — HOW WE MET",
    subtitle: "Cosmic Investigation 🌌",
    question: "Namma rendu perum yen meet panninom nu yosichirukkiya? 😂",
    type: 'choice',
    specialType: 'how-we-met',
    options: [
      {
        id: 'yes',
        text: 'YES 👀',
        reaction: 'Adei... naanum sometimes yosippen 😂',
        subReaction: 'Great minds question the universe!'
      },
      {
        id: 'no',
        text: 'NO 😂',
        reaction: 'Fair enough 😭',
        subReaction: 'No thoughts, head empty, pure vibes.'
      },
      {
        id: 'vidhi',
        text: 'VIDHI 😭',
        reaction: 'VIDHI-KU VERA VELAI ILLA POLA 😂',
        subReaction: 'Anyway... Meet pannitom... ippo escape illa 😌😂'
      }
    ]
  },
  {
    id: 3,
    title: "QUESTION 3 — MOST USED EMOJI",
    subtitle: "Biometric Chat Analysis 📊",
    question: "Namma chat-la most used emoji ethu? 😂",
    type: 'emoji',
    specialType: 'emoji-selection',
    correctAnswerId: 'unamused',
    options: [
      { id: 'joy', text: '😂' },
      { id: 'heart', text: '❤️' },
      { id: 'sob', text: '😭' },
      { id: 'unamused', text: '😒', isCorrect: true },
      { id: 'eyes', text: '👀' }
    ]
  },
  {
    id: 4,
    title: "QUESTION 4 — LATE REPLY",
    subtitle: "Quantum Timestamp Audit 📱",
    question: "WHO IS ALWAYS LATE TO REPLY? 📱😭",
    type: 'runaway',
    specialType: 'late-reply-runaway',
    correctAnswerId: 'suman',
    options: [
      {
        id: 'suman',
        text: 'SUMAN 😌',
        reaction: 'Finally truth accept pannita 😌'
      },
      {
        id: 'ram',
        text: 'RAM 😂',
        isRunaway: true
      }
    ]
  },
  {
    id: 5,
    title: "QUESTION 5 — CLOSE FRIEND QUESTION",
    subtitle: "Honesty Test ⚖️",
    question: "Namma rendu perla yaaru romba annoying? 😂",
    type: 'choice',
    specialType: 'annoying',
    options: [
      {
        id: 'both',
        text: 'BOTH 😭',
        reaction: 'MOST ACCURATE ANSWER 😂',
        subReaction: 'Finally oru unbiased answer 😌'
      },
      {
        id: 'suman',
        text: 'SUMAN 😌',
        reaction: 'Hmmm... accepted 👀😂',
        subReaction: 'Self-awareness is key!'
      },
      {
        id: 'ram',
        text: 'RAM 😂',
        reaction: 'Website owner disagrees with this result 😭',
        subReaction: 'Objection sustained by server admin.'
      }
    ]
  },
  {
    id: 6,
    title: "QUESTION 6 — FRIENDSHIP FINAL CHECK",
    subtitle: "Final Verdict 👀",
    question: "Namma friendship epdi? 😂❤️",
    type: 'choice',
    specialType: 'friendship-nature',
    options: [
      {
        id: 'normal',
        text: 'NORMAL 😌',
        reaction: 'Normal-ah? 🤨',
        subReaction: 'Biggest joke of the website 😂'
      },
      {
        id: 'chaotic',
        text: 'CHAOTIC 😂',
        reaction: 'Correct answer 😂',
        subReaction: 'Certified pure unadulterated madness!'
      },
      {
        id: 'unexplainable',
        text: 'EXPLAIN PANNA MUDIYATHU 😭',
        reaction: 'Actually... idhu than correct answer 😂❤️',
        subReaction: 'Some things are beyond physics and science.'
      }
    ]
  }
];
