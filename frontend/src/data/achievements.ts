export interface Achievement {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  category: 'funny' | 'food' | 'kpop' | 'friendship';
}

export const allAchievements: Record<string, Achievement> = {
  'food-queen': {
    id: 'food-queen',
    icon: '👑',
    title: 'FOOD QUEEN',
    subtitle: 'Demonstrated supernatural appetite and unyielding loyalty to cake & ice cream.',
    category: 'food'
  },
  'late-replier': {
    id: 'late-replier',
    icon: '⏳',
    title: 'PROFESSIONAL LATE REPLIER',
    subtitle: 'Successfully took 2 business days to compile a 3-word text message.',
    category: 'funny'
  },
  'korean-detector': {
    id: 'korean-detector',
    icon: '🇰🇷',
    title: 'KOREAN DETECTOR',
    subtitle: 'Spotted K-drama aesthetics from 3 light-years away.',
    category: 'kpop'
  },
  'bts-head': {
    id: 'bts-head',
    icon: '💜',
    title: 'BTS DEPARTMENT HEAD',
    subtitle: 'Spammed purple hearts and maintained 24/7 galaxy playlist integrity.',
    category: 'kpop'
  },
  'chaos-creator': {
    id: 'chaos-creator',
    icon: '🌪️',
    title: 'CHAOS CREATOR',
    subtitle: 'Turned a normal conversation into an uncontrollable laughter storm.',
    category: 'funny'
  },
  'short-queen': {
    id: 'short-queen',
    icon: '🤏',
    title: 'CERTIFIED SHORT QUEEN',
    subtitle: 'System scanner officially classified height as confidential and cuteness as maximum.',
    category: 'funny'
  },
  'survived-teasing': {
    id: 'survived-teasing',
    icon: '🛡️',
    title: 'SURVIVED MY TEASING',
    subtitle: 'Endured extreme levels of sarcasm and friendship roast without rage-quitting.',
    category: 'friendship'
  },
  'memory-master': {
    id: 'memory-master',
    icon: '🔑',
    title: 'MEMORY MASTER',
    subtitle: 'Collected all celestial memory keys across the galaxy.',
    category: 'friendship'
  },
  'too-curious': {
    id: 'too-curious',
    icon: '👀',
    title: 'TOO CURIOUS',
    subtitle: 'Investigated hidden coordinates in the stars and unlocked the secret ending.',
    category: 'friendship'
  }
};
