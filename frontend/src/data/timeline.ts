export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  tag: string;
  description: string;
  image?: string;
}

export const friendshipTimeline: TimelineMilestone[] = [
  {
    id: "first-talk",
    year: "FIRST TALK",
    tag: "THE GENESIS",
    title: "Where the Chaos Began",
    description: "First conversation, exchanging random ideas at midnight, and realizing we share the exact same humor frequency.",
    image: "/images/memories/memory-01.jpg"
  },
  {
    id: "inside-joke",
    year: "MILESTONE",
    tag: "UNSTOPPABLE",
    title: "The First Inside Joke",
    description: "Laughing at something nobody else in the room understood, solidifying our reputation as the dynamic nonsense duo.",
    image: "/images/memories/memory-02.jpg"
  },
  {
    id: "random-day",
    year: "THAT DAY",
    tag: "ADVENTURE",
    title: "That Completely Random Day",
    description: "No plans, zero schedule, just wandering around, getting food, and laughing until our stomachs hurt.",
    image: "/images/memories/memory-03.jpg"
  },
  {
    id: "late-chat",
    year: "MIDNIGHTS",
    tag: "HEART TO HEART",
    title: "Late Night Life Debates",
    description: "From debating what dessert to order to discussing life dreams and supporting each other through every hurdle.",
    image: "/images/memories/memory-04.jpg"
  },
  {
    id: "favourite-memory",
    year: "HIGHLIGHT",
    tag: "GOLDEN MOMENT",
    title: "Unforgettable Smiles",
    description: "That unforgettable moment where everything was simple, pure, and filled with genuine happiness.",
    image: "/images/sumantha/photo-01.jpg"
  },
  {
    id: "today",
    year: "SEPTEMBER 11 ❤️",
    tag: "CELEBRATION",
    title: "Happy Birthday Sumantha!",
    description: "Celebrating the wonderful light, energy, and joy you bring into the universe. Here's to countless more memories together!",
    image: "/images/sumantha/photo-02.jpg"
  }
];
