export interface Memory {
  id: number;
  year: string;
  title: string;
  description: string;
  image: string;
  gradient: string; // Beautiful CSS gradient placeholder if image fails to load
  category?: 'funny' | 'adventure' | 'kpop' | 'friendship';
}

export const memories: Memory[] = [
  {
    id: 1,
    year: "2023",
    title: "The First Connection",
    description: "Midnight texting, laughing non-stop at absurd jokes, and the start of an irreplaceable bond.",
    image: "/images/memories/memory-01.jpg",
    gradient: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
    category: "friendship"
  },
  {
    id: 2,
    year: "2024",
    title: "Food Hunt & Chaos",
    description: "The legendary food trips where 'just one bite' turned into ordering half the menu and teasing each other endlessly.",
    image: "/images/memories/memory-02.jpg",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #e11d48 100%)",
    category: "funny"
  },
  {
    id: 3,
    year: "2025",
    title: "Deep Talks & Memes",
    description: "From discussing life dreams and Paris adventures to sending 50 ridiculous reels in 5 minutes.",
    image: "/images/memories/memory-03.jpg",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    category: "adventure"
  },
  {
    id: 4,
    year: "2025",
    title: "K-Drama & BTS Mania",
    description: "Endless fangirling sessions, purple heart spamming, and hunting for Korean snacks.",
    image: "/images/memories/memory-04.jpg",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
    category: "kpop"
  },
  {
    id: 5,
    year: "2026",
    title: "Caught in 4K Queen",
    description: "Those candids and funny expressions that prove nobody does chaotic cuteness better than Sumantha!",
    image: "/images/memories/memory-05.jpg",
    gradient: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
    category: "funny"
  },
  {
    id: 6,
    year: "2026",
    title: "Forever Little Universe",
    description: "Celebrating another amazing year of you shining bright. Cheers to endless more memories together!",
    image: "/images/memories/memory-06.jpg",
    gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
    category: "friendship"
  }
];
