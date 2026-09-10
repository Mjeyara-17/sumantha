import React, { useState, useEffect } from 'react';
import { chatThreads, ChatMessage } from '../data/conversations';
import { sounds } from '../utils/soundEffects';
import { Sparkles, Terminal, ArrowRight } from 'lucide-react';

interface RecoveredChatProps {
  onComplete: () => void;
  onNext?: () => void;
}

export default function RecoveredChat({ onComplete, onNext }: RecoveredChatProps) {
  const [activeThreadIndex, setActiveThreadIndex] = useState(0);
  const [phase, setPhase] = useState<'recovery-progress' | 'chat-display'>('recovery-progress');
  const [recoveryPercent, setRecoveryPercent] = useState(12);
  const [visibleMessages, setVisibleMessages] = useState<ChatMessage[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const currentThread = chatThreads[activeThreadIndex];

  // Recovery progress animation: 12% -> 38% -> 69% -> 99% -> 100%
  useEffect(() => {
    if (phase === 'recovery-progress') {
      sounds.playScanner();
      const steps = [
        { pct: 38, delay: 350 },
        { pct: 69, delay: 700 },
        { pct: 99, delay: 1100 },
        { pct: 100, delay: 1400 }
      ];

      const timers = steps.map(s => 
        setTimeout(() => {
          setRecoveryPercent(s.pct);
          if (s.pct === 100) {
            setTimeout(() => {
              sounds.playNotification();
              setPhase('chat-display');
              setVisibleMessages([]);
              setMessageIndex(0);
            }, 500);
          }
        }, s.delay)
      );

      return () => timers.forEach(t => clearTimeout(t));
    }
  }, [phase, activeThreadIndex]);

  // Message-by-message display with typing simulation
  useEffect(() => {
    if (phase === 'chat-display' && messageIndex < currentThread.messages.length) {
      setIsTyping(true);
      const msg = currentThread.messages[messageIndex];
      const timer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(prev => [...prev, msg]);
        sounds.playNotification();
        setMessageIndex(prev => prev + 1);
      }, msg.delay);

      return () => clearTimeout(timer);
    }
  }, [phase, messageIndex, currentThread]);

  const handleNextThread = () => {
    sounds.playClick();
    if (activeThreadIndex < chatThreads.length - 1) {
      setActiveThreadIndex(prev => prev + 1);
      setPhase('recovery-progress');
      setRecoveryPercent(12);
    } else {
      sounds.playKeyEarned();
      onComplete();
      if (onNext) {
        onNext();
      }
    }
  };

  return (
    <div className="my-auto pointer-events-auto w-full max-w-md bg-space-card border border-space-border p-6 rounded-2xl shadow-2xl backdrop-blur-xl animate-fade-in flex flex-col">
      {/* PHASE 1: Recovery Matrix */}
      {phase === 'recovery-progress' ? (
        <div className="flex flex-col items-center text-center py-6">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono tracking-widest uppercase mb-4 animate-pulse">
            <Terminal className="w-4 h-4" />
            <span>CLASSIFIED ARCHIVE</span>
          </div>

          <h3 className="font-display text-white text-base font-bold tracking-wider mb-2">
            Recovering deleted nonsense...
          </h3>
          <p className="text-slate-400 text-xs tracking-wide font-light mb-6">
            Decrypting late-night archives & unexplainable messages
          </p>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-black/60 border border-white/10 rounded-full overflow-hidden p-0.5 mb-3">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
              style={{ width: `${recoveryPercent}%` }}
            />
          </div>

          <span className="font-mono text-amber-400 text-sm font-bold tracking-widest">
            {recoveryPercent}%
          </span>
        </div>
      ) : (
        /* PHASE 2: Live Chat Replay */
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-amber-400 font-bold tracking-widest uppercase font-display">
                CHAT RECOVERED 📱
              </span>
              <h4 className="text-white text-xs font-semibold tracking-wide">
                {currentThread.title}
              </h4>
            </div>
            <span className="text-[9px] text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
              {activeThreadIndex + 1} / {chatThreads.length}
            </span>
          </div>

          {/* Scrollable chat messages container */}
          <div className="flex flex-col gap-3 min-h-[220px] max-h-[260px] overflow-y-auto pr-1 scrollbar-none mb-4">
            {visibleMessages.map((msg, idx) => {
              const isHer = msg.sender === 'her';
              return (
                <div 
                  key={idx}
                  className={`flex ${isHer ? 'justify-start' : 'justify-end'} animate-scale-up relative`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-xs font-light tracking-wide leading-relaxed relative ${
                    isHer 
                      ? 'bg-purple-600/30 border border-purple-400/30 text-slate-100 rounded-tl-sm' 
                      : 'bg-amber-500 text-slate-950 font-medium rounded-tr-sm shadow-md'
                  }`}>
                    {msg.text}
                    {msg.reaction && (
                      <span className="absolute -bottom-2 -right-1 text-xs bg-black/60 border border-white/20 rounded-full px-1.5 py-0.5 backdrop-blur-md">
                        {msg.reaction}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-purple-600/20 border border-purple-400/20 rounded-2xl px-4 py-2 text-xs text-purple-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
          </div>

          {/* Punchline and Next trigger once messages finish */}
          {messageIndex >= currentThread.messages.length && (
            <div className="flex flex-col gap-3 border-t border-white/10 pt-3 animate-fade-in">
              <p className="text-amber-300 text-xs italic text-center font-medium">
                "{currentThread.punchline}"
              </p>

              <button
                onClick={handleNextThread}
                className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
              >
                <span>{activeThreadIndex < chatThreads.length - 1 ? "Next Chat Archive 📱" : "Continue Journey →"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
