export interface WhoSaidThisItem {
  id: number;
  quote: string;
  context: string;
  options: string[];
  correctIndex: number;
  reaction: string;
  proofTitle: string;
  proofDescription: string;
  image?: string;
}

export const whoSaidThisList: WhoSaidThisItem[] = [
  {
    id: 1,
    quote: "Naan unmai-ah solren... enakku ippo pasikkave illa! (2 mins later: Oru full pizza order pannalama? 🍕😂)",
    context: "Said during a very serious evening discussion about life.",
    options: [
      "Sumantha 😌",
      "Me 😎",
      "Both 😭",
      "Evidence venum 👀"
    ],
    correctIndex: 0,
    reaction: "Caught in 4K 📸😂! Exact quote recorded in friendship history!",
    proofTitle: "Exhibit A: The Appetite Paradox 🍕",
    proofDescription: "[ADD REAL CHAT] - The classic sequence: First denying any sign of hunger, then ordering a feast that could feed a small colony.",
    image: "/images/memories/food-run.jpg"
  },
  {
    id: 2,
    quote: "Dei, naan thoongiten nu nenaikatha... Brain just buffering aagi konjam off aayiruchu 😭",
    context: "After disappearing for 18 hours in the middle of a sentence.",
    options: [
      "Sumantha 😌",
      "Me 😎",
      "Both 😭",
      "Evidence venum 👀"
    ],
    correctIndex: 0,
    reaction: "Confirmed! Classic Sumantha defense mechanism 😂",
    proofTitle: "Exhibit B: Brain Buffering Syndrome 🧠",
    proofDescription: "[ADD REAL CHAT] - When 'one second' turns into a full REM cycle sleep, and the explanation is 'system recharge required'.",
    image: "/images/memories/chat-wait.jpg"
  }
];
