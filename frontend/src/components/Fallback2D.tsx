import React, { useState } from 'react';
import { memories } from '../data/memories';
import { birthdayConfig } from '../config/birthdayConfig';
import { koreanMappillaiData } from '../data/koreanMarriage';
import { Gift, Sparkles, Volume2, VolumeX, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

interface Fallback2DProps {
  onReplay: () => void;
}

export default function Fallback2D({ onReplay }: Fallback2DProps) {
  const [giftOpened, setGiftOpened] = useState(false);
  const [fakeGiftClaimed, setFakeGiftClaimed] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audio] = useState(() => new Audio(birthdayConfig.musicFile));

  // Runaway button in 2D
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);
  const [answeredYes, setAnsweredYes] = useState(false);

  const toggleMusic = () => {
    if (musicPlaying) {
      audio.pause();
    } else {
      audio.loop = true;
      audio.play().catch(e => console.log('Audio autoplay blocked', e));
    }
    setMusicPlaying(!musicPlaying);
  };

  const handleOpenGift = () => {
    sounds.playClick();
    setGiftOpened(true);
  };

  const handleMakeWish = () => {
    sounds.playCandleBlow();
    setCandlesLit(false);
    setTimeout(() => {
      sounds.playFirework();
      confetti({
        particleCount: 150,
        spread: 100,
        colors: ['#ffd700', '#ec4899', '#a855f7']
      });
    }, 600);
  };

  const dodgeNo = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sounds.playClick();
    const rx = (Math.random() - 0.5) * 160;
    const ry = (Math.random() - 0.5) * 80;
    setNoOffset({ x: rx, y: ry });
    setNoClicks(prev => prev + 1);
  };

  return (
    <div className="min-h-screen w-full bg-[#050308] text-[#f8fafc] flex flex-col items-center select-none overflow-y-auto font-sans pb-24 px-4 sm:px-6">
      {/* Deep space radial background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(26,14,50,0.45)_0%,rgba(5,3,8,1)_100%)] pointer-events-none z-0" />
      
      {/* Floating Music Control */}
      <button 
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-white/5 border border-white/10 hover:border-amber-400 rounded-full text-slate-300 hover:text-amber-400 backdrop-blur-xl transition-all shadow-lg pointer-events-auto"
      >
        {musicPlaying ? <Volume2 className="w-5 h-5 text-amber-400" /> : <VolumeX className="w-5 h-5 text-rose-500" />}
      </button>

      {/* 1. LANDING INTRO */}
      <header className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center max-w-2xl">
        <div className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-4 py-2 rounded-full text-[10px] sm:text-xs tracking-[0.25em] text-slate-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>SUMANTHA'S LITTLE UNIVERSE</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl tracking-wider leading-tight font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 mb-6">
          HAPPY BIRTHDAY<br />{birthdayConfig.friendName} ❤️
        </h1>
        <p className="text-slate-300 font-light text-sm sm:text-base tracking-wider max-w-lg leading-relaxed mb-10">
          Innaiku unakku oru normal birthday wish illa... Namma friendship, silly jokes, food talks, and BTS memories ellam serthu oru digital universe build pannirukkom!
        </p>
        <div className="h-10 w-[1px] bg-gradient-to-b from-amber-400 to-transparent animate-bounce" />
      </header>

      {/* 2. OPERATION KOREAN MAPPILLAI COMEDY FEATURE */}
      <section className="relative z-10 w-full max-w-2xl py-16 flex flex-col items-center">
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-pink-950/20 to-purple-950/30 border border-pink-500/30 backdrop-blur-xl text-center shadow-2xl">
          <span className="text-[10px] text-pink-400 font-mono tracking-widest uppercase mb-1 block">
            🚨 CELESTIAL MATCH DETECTION 🚨
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-black text-white mb-2">
            UNAKKU KOREAN MAPPILLAI KIDAICHITTU 😭🇰🇷
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-light mb-6">
            Name: {koreanMappillaiData.candidateName} • Occupation: {koreanMappillaiData.occupation}
          </p>

          <div className="bg-black/50 p-4 rounded-2xl border border-white/10 text-left text-xs mb-6 flex flex-col gap-2">
            <span className="text-amber-400 font-bold font-display uppercase tracking-wider text-[11px]">
              Groom Verified Skills:
            </span>
            {koreanMappillaiData.skills.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{s}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-serif italic">
            "By marrying Sumantha, groom agrees never to touch her food and to supply emergency ice cream 24/7!"
          </div>
        </div>
      </section>

      {/* 3. MEMORIES POLAROID GRID */}
      <section className="relative z-10 w-full max-w-5xl py-16 flex flex-col items-center">
        <h2 className="font-display text-2xl sm:text-3xl tracking-wider font-bold text-center mb-12 uppercase text-white">
          ✦ Floating Memories ✦
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {memories.map((m) => (
            <div 
              key={m.id}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 hover:border-amber-400/50 transition-all shadow-xl backdrop-blur-xl"
            >
              <div className="w-full sm:w-40 h-44 bg-white p-2.5 rounded-xl shadow-lg flex flex-col justify-between shrink-0">
                <div 
                  className="w-full h-[80%] rounded-lg"
                  style={{
                    background: m.gradient,
                    backgroundImage: `url(${m.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="text-center font-display font-black text-[9px] text-[#1a1a2e] tracking-widest uppercase mt-1">
                  {m.year}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <span className="text-amber-400 font-display font-bold text-xs tracking-widest mb-1 uppercase">
                  {m.year} • MEMORY #{m.id}
                </span>
                <h3 className="font-display text-white text-base font-bold mb-2">
                  {m.title}
                </h3>
                <p className="text-slate-300 font-light text-xs leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PERSONAL LETTER */}
      <section className="relative z-10 w-full max-w-2xl py-16">
        <div className="bg-white/[0.03] border border-amber-400/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <h2 className="font-display text-amber-400 text-base sm:text-lg tracking-wider font-bold mb-6 border-b border-white/10 pb-3">
            Trans-Universe Letter 💌
          </h2>
          <p className="text-slate-200 font-light text-xs sm:text-sm tracking-wide leading-loose whitespace-pre-wrap font-serif">
            {birthdayConfig.personalMessage}
          </p>
        </div>
      </section>

      {/* 5. RUNAWAY NO QUESTION */}
      <section className="relative z-10 w-full max-w-md py-16 text-center">
        <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl">
          <h3 className="font-display text-white text-sm sm:text-base font-bold mb-6">
            Would you choose this friendship again? ❤️
          </h3>

          <div className="flex items-center justify-center gap-4 min-h-[60px] relative">
            <button
              onClick={() => {
                sounds.playKeyEarned();
                setAnsweredYes(true);
              }}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-full uppercase transition-all"
            >
              YES ❤️
            </button>
            {!answeredYes && (
              <button
                onMouseEnter={dodgeNo}
                onClick={dodgeNo}
                style={{
                  transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
                  transition: 'transform 0.15s ease-out'
                }}
                className="px-6 py-2.5 bg-rose-700/80 text-white font-medium text-xs rounded-full uppercase"
              >
                {noClicks > 2 ? "Nice try 😌" : "NO 😭"}
              </button>
            )}
          </div>

          {answeredYes && (
            <p className="text-emerald-400 text-xs mt-4 font-semibold animate-fade-in">
              Correct answer 😂❤️! High five!
            </p>
          )}
        </div>
      </section>

      {/* 6. GIFT BOX */}
      <section className="relative z-10 w-full max-w-md py-16 flex flex-col items-center text-center">
        <div className="p-8 bg-white/[0.03] border border-amber-400/30 rounded-3xl w-full flex flex-col items-center backdrop-blur-xl shadow-2xl">
          {!giftOpened ? (
            <>
              <Gift className="w-12 h-12 text-amber-400 mb-4 animate-bounce" />
              <h3 className="font-display text-white text-base font-bold mb-4">
                Finally... Your Birthday Gift 🎁
              </h3>
              <button 
                onClick={handleOpenGift}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs tracking-widest rounded-full uppercase transition-all shadow-lg"
              >
                Open Your Gift 🎁
              </button>
            </>
          ) : !fakeGiftClaimed ? (
            <div className="animate-scale-up">
              <span className="text-4xl mb-2 block">🍦</span>
              <h4 className="font-display text-white text-base font-bold mb-1">
                ONE VIRTUAL ICE CREAM 🍦
              </h4>
              <p className="text-slate-300 text-xs italic mb-4">
                Budget avlo than 😭😂
              </p>
              <button
                onClick={() => setFakeGiftClaimed(true)}
                className="px-6 py-2.5 bg-rose-600 text-white font-bold text-xs rounded-full uppercase"
              >
                SERIOUS AH? 😑 (Show Real Gift)
              </button>
            </div>
          ) : (
            <div className="animate-scale-up">
              <h3 className="font-display text-amber-400 text-sm font-bold tracking-widest mb-3 uppercase">
                ACTUAL SURPRISE 🌟
              </h3>
              <p className="text-slate-200 font-light text-xs sm:text-sm tracking-wide leading-relaxed font-serif">
                "{birthdayConfig.finalMessage}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 7. BIRTHDAY CAKE & MAKE A WISH */}
      <section className="relative z-10 w-full max-w-md py-16 flex flex-col items-center text-center">
        <h2 className="font-display text-xl tracking-wider uppercase font-bold text-white mb-6">
          MAKE A WISH & BLOW CANDLES 🎂
        </h2>
        
        <div className="flex flex-col items-center justify-center p-8 bg-white/[0.03] border border-white/10 rounded-3xl w-full backdrop-blur-xl shadow-2xl">
          {candlesLit ? (
            <>
              <div className="flex justify-center gap-4 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-2.5 h-4 bg-amber-400 rounded-full animate-ping mb-1" />
                    <div className="w-1 h-6 bg-pink-400 rounded-full" />
                  </div>
                ))}
              </div>
              <button 
                onClick={handleMakeWish}
                className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs tracking-widest rounded-full uppercase transition-all shadow-lg hover:scale-105"
              >
                Make A Wish ✨
              </button>
            </>
          ) : (
            <div className="animate-scale-up">
              <span className="text-3xl mb-2 block">🎆</span>
              <p className="text-amber-400 font-display text-sm tracking-widest uppercase font-bold mb-2">
                Wish Granted! Happy Birthday Sumantha ❤️
              </p>
              <p className="text-slate-300 font-light text-xs tracking-wide">
                May this year bring unlimited cake, ice cream, happiness and laughter!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 w-full max-w-sm flex flex-col items-center text-center mt-8 gap-3">
        <button 
          onClick={onReplay}
          className="px-6 py-2 border border-white/10 hover:border-white/30 bg-white/[0.02] text-xs text-slate-400 hover:text-white rounded-full tracking-widest uppercase transition-all"
        >
          Replay Journey
        </button>
        <div className="text-[10px] text-slate-500 uppercase">
          Prepared for {birthdayConfig.friendName} • Static 2D Edition
        </div>
      </footer>
    </div>
  );
}
