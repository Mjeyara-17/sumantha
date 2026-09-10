import React, { useState, useEffect } from 'react';
import { 
  koreanMappillaiData, 
  weddingDresses, 
  WeddingDressOption 
} from '../data/koreanMarriage';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Heart, Sparkles, AlertOctagon, Check, X, ShieldAlert, 
  Radio, Clock, Star, ArrowRight, FileText, Award 
} from 'lucide-react';

interface KoreanMappillaiChapterProps {
  onComplete: () => void;
}

type Stage = 
  | 'scanner'
  | 'match-announcement'
  | 'cv'
  | 'compat-test-1'
  | 'compat-test-2'
  | 'red-flag-scan'
  | 'dress-selector'
  | 'future-wedding-photo'
  | 'wedding-invitation'
  | 'terms-conditions'
  | 'breaking-news'
  | 'five-years-later'
  | 'husband-review'
  | 'return-to-reality';

export default function KoreanMappillaiChapter({ onComplete }: KoreanMappillaiChapterProps) {
  const [stage, setStage] = useState<Stage>('scanner');
  const [scanStep, setScanStep] = useState(0);
  const [selectedDress, setSelectedDress] = useState<WeddingDressOption>(weddingDresses[0]);
  const [compatAnswer1, setCompatAnswer1] = useState<string | null>(null);
  const [compatAnswer2, setCompatAnswer2] = useState<string | null>(null);
  const [dbSearchPct, setDbSearchPct] = useState(21);

  // Stage 1: Korean Interest Scanner
  useEffect(() => {
    if (stage === 'scanner') {
      sounds.playScanner();
      const t1 = setTimeout(() => setScanStep(1), 700);
      const t2 = setTimeout(() => setScanStep(2), 1400);
      const t3 = setTimeout(() => setScanStep(3), 2100);
      const t4 = setTimeout(() => {
        setScanStep(4);
        sounds.playAlarm();
      }, 2900);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [stage]);

  // Stage 2: Match Announcement celebrations
  const triggerMatchAnnouncement = () => {
    sounds.playWeddingBells();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#ec4899', '#a855f7', '#ffd700']
    });
    setStage('match-announcement');
  };

  // Stage 7: 2030 Future DB Search simulation
  useEffect(() => {
    if (stage === 'future-wedding-photo') {
      sounds.playScanner();
      const p1 = setTimeout(() => setDbSearchPct(48), 500);
      const p2 = setTimeout(() => setDbSearchPct(76), 900);
      const p3 = setTimeout(() => setDbSearchPct(99), 1300);
      const p4 = setTimeout(() => {
        setDbSearchPct(100);
        sounds.playKeyEarned();
      }, 1700);

      return () => {
        clearTimeout(p1);
        clearTimeout(p2);
        clearTimeout(p3);
        clearTimeout(p4);
      };
    }
  }, [stage]);

  return (
    <div className="my-auto pointer-events-auto w-full max-w-lg bg-space-card border border-pink-500/30 p-6 sm:p-8 rounded-2xl shadow-[0_0_50px_rgba(236,72,153,0.25)] backdrop-blur-xl animate-fade-in flex flex-col max-h-[85vh] overflow-y-auto scrollbar-none">
      
      {/* --- 1. KOREAN SCANNER --- */}
      {stage === 'scanner' && (
        <div className="flex flex-col text-center">
          <span className="text-[10px] text-pink-400 font-mono tracking-widest uppercase mb-2">
            BIOMETRIC BEHAVIOR SCANNER
          </span>
          <h3 className="font-display text-white text-xl font-bold tracking-wider mb-6">
            SCANNING SUMANTHA...
          </h3>

          <div className="flex flex-col gap-3 text-left mb-6 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Food Obsession:</span>
                <span className="text-amber-400 font-bold">100%</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-full" />
              </div>
            </div>

            {scanStep >= 1 && (
              <div className="animate-fade-in">
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Cake & Ice Cream:</span>
                  <span className="text-pink-400 font-bold">100%</span>
                </div>
                <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-400 w-full" />
                </div>
              </div>
            )}

            {scanStep >= 2 && (
              <div className="animate-fade-in">
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>BTS Fandom Level:</span>
                  <span className="text-purple-400 font-bold">∞%</span>
                </div>
                <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 w-full animate-pulse" />
                </div>
              </div>
            )}

            {scanStep >= 3 && (
              <div className="animate-fade-in">
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Korean Boys Interest:</span>
                  <span className="text-rose-400 font-bold">DANGEROUS ⚠️</span>
                </div>
                <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-full animate-pulse" />
                </div>
              </div>
            )}
          </div>

          {scanStep >= 4 && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 animate-scale-up mb-6">
              <span className="text-rose-400 text-xs font-mono tracking-widest font-bold block mb-1">
                ⚠️ SYSTEM OVERLOAD DETECTED
              </span>
              <p className="text-slate-200 text-xs font-light">
                Wait... System-la something detect aaguthu 👀
              </p>
            </div>
          )}

          {scanStep >= 4 && (
            <button
              onClick={triggerMatchAnnouncement}
              className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
            >
              Analyze Detection 🚨 →
            </button>
          )}
        </div>
      )}

      {/* --- 2. MATCH ANNOUNCEMENT --- */}
      {stage === 'match-announcement' && (
        <div className="flex flex-col items-center text-center animate-scale-up py-4">
          <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-mono tracking-widest uppercase mb-4 animate-bounce">
            🚨 MATCH DETECTED 🚨
          </span>

          <p className="text-slate-400 text-sm font-light tracking-widest uppercase mb-2">
            Onnum yosikkatha...
          </p>

          <h1 className="font-display text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-300 to-purple-400 tracking-wider mb-4 leading-relaxed">
            UNAKKU KOREAN MAPPILLAI KIDAICHITTU 😭🇰🇷
          </h1>

          <p className="text-slate-300 text-xs tracking-wider mb-8">
            Congratulations madam 😂! The celestial matchmaking department has produced a verified candidate.
          </p>

          <button
            onClick={() => {
              sounds.playClick();
              setStage('cv');
            }}
            className="w-full py-3.5 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-xl hover:scale-[1.01]"
          >
            Inspect Candidate CV 📄 →
          </button>
        </div>
      )}

      {/* --- 3. KOREAN MAPPILLAI CV --- */}
      {stage === 'cv' && (
        <div className="flex flex-col animate-fade-in text-left">
          <div className="flex justify-between items-center border-b border-pink-500/20 pb-3 mb-4">
            <div>
              <span className="text-[10px] text-pink-400 font-mono tracking-widest uppercase">
                OFFICIAL LUXURY DOSSIER
              </span>
              <h3 className="font-display text-white text-base font-bold">
                KOREAN MAPPILLAI APPLICATION
              </h3>
            </div>
            <span className="text-2xl">🇰🇷</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs mb-4">
            <div className="p-2.5 bg-white/[0.03] rounded-lg border border-white/5">
              <span className="text-slate-400 text-[10px] block">NAME:</span>
              <span className="text-white font-semibold">{koreanMappillaiData.candidateName}</span>
            </div>
            <div className="p-2.5 bg-white/[0.03] rounded-lg border border-white/5">
              <span className="text-slate-400 text-[10px] block">OCCUPATION:</span>
              <span className="text-pink-400 font-semibold">{koreanMappillaiData.occupation}</span>
            </div>
          </div>

          <div className="mb-4">
            <span className="text-[11px] text-amber-400 font-semibold tracking-wider block mb-2 font-display">
              CERTIFIED SKILLS & CAPABILITIES:
            </span>
            <div className="flex flex-col gap-1.5 text-xs text-slate-300">
              {koreanMappillaiData.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center mb-6">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-0.5">
              CAN HANDLE SUMANTHA?
            </span>
            <span className="text-xs font-mono font-bold text-amber-400 animate-pulse">
              SYSTEM STILL CALCULATING... ⚠️
            </span>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setStage('compat-test-1');
            }}
            className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
          >
            Start Compatibility Test 🧪 →
          </button>
        </div>
      )}

      {/* --- 4. COMPATIBILITY TEST 1 --- */}
      {stage === 'compat-test-1' && (
        <div className="flex flex-col animate-fade-in text-center">
          <span className="text-[10px] text-pink-400 font-mono tracking-widest uppercase mb-2">
            COMPATIBILITY TEST • QUESTION 1
          </span>
          <h3 className="font-display text-white text-base sm:text-lg font-bold tracking-wide mb-6">
            Korean mappillai first enna vaangi tharanum? 👀
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {["🍰 Cake", "🍦 Ice Cream", "🍜 Korean Food", "💜 BTS Ticket"].map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  sounds.playClick();
                  setCompatAnswer1(opt);
                }}
                className={`p-3 rounded-xl border text-xs tracking-wider font-medium transition-all ${
                  compatAnswer1 === opt 
                    ? 'border-pink-500 bg-pink-500/20 text-white' 
                    : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-pink-400/40'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {compatAnswer1 && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 animate-scale-up mb-6">
              <span className="text-rose-400 text-xs font-bold block mb-1">
                Wrong 😂!
              </span>
              <h4 className="font-display text-amber-400 text-base font-bold">
                ELLAME VAANGI THARANUM. 😌
              </h4>
              <p className="text-slate-300 text-[11px] mt-1">
                Minimum husband requirements under Sumantha constitution!
              </p>
            </div>
          )}

          {compatAnswer1 && (
            <button
              onClick={() => {
                sounds.playClick();
                setStage('compat-test-2');
              }}
              className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
            >
              Question 2 →
            </button>
          )}
        </div>
      )}

      {/* --- 5. COMPATIBILITY TEST 2 --- */}
      {stage === 'compat-test-2' && (
        <div className="flex flex-col animate-fade-in text-center">
          <span className="text-[10px] text-pink-400 font-mono tracking-widest uppercase mb-2">
            COMPATIBILITY TEST • QUESTION 2
          </span>
          <h3 className="font-display text-white text-base sm:text-lg font-bold tracking-wide mb-6">
            Avan un food-la konjam eduthutta? 😱
          </h3>

          <div className="flex flex-col gap-2.5 mb-6">
            {[
              { text: "A: It's okay ❤️", val: 'A' },
              { text: "B: Konjam share pannalam 😌", val: 'B' },
              { text: "C: Marriage cancel 💀", val: 'C' }
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => {
                  sounds.playClick();
                  setCompatAnswer2(opt.val);
                }}
                className={`p-3.5 rounded-xl border text-xs tracking-wider text-left transition-all ${
                  compatAnswer2 === opt.val 
                    ? 'border-pink-500 bg-pink-500/20 text-white font-semibold' 
                    : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-pink-400/40'
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>

          {compatAnswer2 === 'C' && (
            <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 animate-scale-up mb-6 text-center">
              <span className="text-rose-400 text-xs font-mono font-bold uppercase tracking-widest block mb-1">
                DIVORCE SPEEDRUN
              </span>
              <h4 className="font-display text-white text-lg font-black">
                0.3 SECONDS 😭💀
              </h4>
              <p className="text-slate-300 text-[11px] mt-1">
                Touching Sumantha's food is classified as high treason!
              </p>
            </div>
          )}

          {compatAnswer2 && compatAnswer2 !== 'C' && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 animate-scale-up mb-6 text-center">
              <p className="text-emerald-400 text-xs font-semibold">
                Rare generosity detected! Marriage status remains stable ❤️
              </p>
            </div>
          )}

          {compatAnswer2 && (
            <button
              onClick={() => {
                sounds.playClick();
                setStage('red-flag-scan');
              }}
              className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
            >
              Run Red Flag Scanner 🔍 →
            </button>
          )}
        </div>
      )}

      {/* --- 6. RED FLAG SCANNER --- */}
      {stage === 'red-flag-scan' && (
        <div className="flex flex-col animate-fade-in text-left">
          <span className="text-[10px] text-pink-400 font-mono tracking-widest uppercase mb-1">
            GROOM COMPLIANCE AUDIT
          </span>
          <h3 className="font-display text-white text-base font-bold mb-4">
            RED FLAG vs GREEN FLAG SCANNER
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs mb-6">
            {[
              { label: "Handsome", pass: true },
              { label: "Korean 🇰🇷", pass: true },
              { label: "Likes Food", pass: true },
              { label: "Buys Cake", pass: true },
              { label: "Emergency Ice Cream", pass: true },
              { label: "Accepts BTS", pass: true },
              { label: "Steals Her Food", pass: false }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-2.5 bg-white/[0.03] border border-white/5 rounded-lg">
                <span className="text-slate-300 text-[11px]">{item.label}</span>
                {item.pass ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <X className="w-3.5 h-3.5 text-rose-500" />
                )}
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-center mb-6 animate-scale-up">
            <span className="text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase block mb-1">
              💚 GREEN FLAG DETECTED
            </span>
            <p className="text-slate-200 text-xs">
              Approved by Sumantha Birthday Security Department 😂
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setStage('dress-selector');
            }}
            className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
          >
            Select Wedding Dress 👰 →
          </button>
        </div>
      )}

      {/* --- 7. WEDDING DRESS SELECTOR --- */}
      {stage === 'dress-selector' && (
        <div className="flex flex-col animate-fade-in text-center">
          <span className="text-[10px] text-pink-400 font-mono tracking-widest uppercase mb-1">
            HAUTE COUTURE SELECTION
          </span>
          <h3 className="font-display text-white text-base sm:text-lg font-bold mb-2">
            Madam mattum dress select pannunga 😂
          </h3>
          <p className="text-slate-400 text-xs font-light mb-4">
            Mappillai ready. Venue ready. Food ready.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {weddingDresses.map((dress) => (
              <div
                key={dress.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedDress(dress);
                }}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  selectedDress.id === dress.id
                    ? 'border-pink-500 bg-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.3)] scale-[1.02]'
                    : 'border-white/10 bg-white/[0.02] hover:border-pink-400/40'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-2xl">{dress.emoji}</span>
                  <span className="text-[8px] font-mono tracking-widest px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-pink-300">
                    {dress.tag}
                  </span>
                </div>
                <h4 className="text-white text-xs font-bold mb-1">{dress.name}</h4>
                <p className="text-slate-400 text-[9px] leading-relaxed">{dress.description}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 mb-6">
            <span className="text-slate-400 text-xs">Mappillai-ku choice? </span>
            <strong className="text-pink-400 font-bold ml-1 font-display">ILLA 😂</strong>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setStage('future-wedding-photo');
            }}
            className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
          >
            Access 2030 Future Photo 📸 →
          </button>
        </div>
      )}

      {/* --- 8. FUTURE WEDDING PHOTO REVEAL --- */}
      {stage === 'future-wedding-photo' && (
        <div className="flex flex-col items-center text-center animate-fade-in">
          <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mb-2">
            ACCESSING FUTURE DATABASE... YEAR: 2030
          </span>

          {dbSearchPct < 100 ? (
            <div className="w-full py-8 flex flex-col items-center">
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-pink-500 transition-all duration-300"
                  style={{ width: `${dbSearchPct}%` }}
                />
              </div>
              <span className="text-xs font-mono text-slate-400">
                SEARCHING FUTURE TIMELINES... {dbSearchPct}%
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-scale-up w-full">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-mono tracking-widest uppercase mb-4">
                FUTURE MEMORY FOUND 👀
              </span>

              {/* Floating Gold Frame */}
              <div className="relative p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-400 to-amber-300 shadow-[0_0_40px_rgba(245,158,11,0.3)] mb-4 w-full max-w-sm">
                <div className="w-full rounded-xl bg-slate-950 relative overflow-hidden" style={{ minHeight: '280px' }}>
                  <img 
                    src="/images/wedding/sumantha-future-wedding.jpg" 
                    alt="Sumantha + Korean Mappillai"
                    onLoad={(e) => {
                      // Hide placeholder when image loads
                      const placeholder = e.currentTarget.parentElement?.querySelector('[data-placeholder]');
                      if (placeholder) (placeholder as HTMLElement).style.display = 'none';
                    }}
                    onError={(e) => {
                      // Show placeholder on error
                      e.currentTarget.style.display = 'none';
                    }}
                    className="w-full h-auto object-cover relative z-10 rounded-xl"
                  />
                  
                  {/* Visual Fallback Placeholder - only shown if image fails */}
                  <div data-placeholder className="absolute inset-0 z-0 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-4xl mb-2">🌸👰🤵🇰🇷</span>
                    <h4 className="font-display text-amber-300 text-sm font-bold tracking-widest">
                      SUMANTHA + KOREAN MAPPILLAI
                    </h4>
                  </div>
                </div>
              </div>

              <h2 className="font-display text-white text-base sm:text-lg font-bold mb-1">
                Adei... nijamave nadanthudumo 😭😂
              </h2>
              <p className="text-slate-400 text-xs font-light mb-6">
                Dress Theme: <strong className="text-pink-400">{selectedDress.name}</strong>
              </p>

              <button
                onClick={() => {
                  sounds.playClick();
                  setStage('wedding-invitation');
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
              >
                SAVE THE DATE? 💍 →
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- 9. LUXURY WEDDING INVITATION --- */}
      {stage === 'wedding-invitation' && (
        <div className="flex flex-col animate-fade-in text-center">
          {/* Gold embossed royal invitation parchment */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#181120] to-[#0d0714] border-2 border-amber-400/50 shadow-[0_0_35px_rgba(245,158,11,0.25)] relative overflow-hidden mb-6">
            <span className="text-[9px] text-amber-400 font-mono tracking-[0.25em] uppercase block mb-3">
              ✦ ROYAL WEDDING ANNOUNCEMENT ✦
            </span>

            <h2 className="font-display text-xl sm:text-2xl font-black text-white tracking-widest mb-1">
              SUMANTHA
            </h2>
            <span className="text-pink-400 text-xs font-serif block my-1">❤️ & ❤️</span>
            <h3 className="font-display text-lg font-bold text-amber-400 tracking-wider mb-4">
              MR. CLASSIFIED 🇰🇷
            </h3>

            <div className="flex flex-col gap-2 border-t border-b border-amber-400/20 py-3 my-3 text-xs text-slate-300 font-light">
              <div className="flex justify-between">
                <span className="text-slate-400">LOCATION:</span>
                <span className="text-white font-semibold">Seoul, South Korea 🇰🇷</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">FOOD:</span>
                <span className="text-emerald-400 font-semibold">UNLIMITED 🍜</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">DESSERT:</span>
                <span className="text-pink-400 font-semibold">Cake + Ice Cream 🍰🍦</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">SPECIAL GUESTS:</span>
                <span className="text-purple-400 font-semibold">Classified Purple Music Dept 💜</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 italic">
              Friend: Still processing what happened.
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setStage('terms-conditions');
            }}
            className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
          >
            Review Marriage Contract 📜 →
          </button>
        </div>
      )}

      {/* --- 10. TERMS & CONDITIONS --- */}
      {stage === 'terms-conditions' && (
        <div className="flex flex-col animate-fade-in text-left">
          <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mb-1">
            LEGAL BINDING PARCHMENT
          </span>
          <h3 className="font-display text-white text-base font-bold mb-3">
            MARRIAGE TERMS & CONDITIONS
          </h3>
          <p className="text-slate-400 text-xs font-light mb-4">
            By marrying Sumantha, the groom officially agrees to the following clauses:
          </p>

          <div className="flex flex-col gap-2 text-xs text-slate-300 max-h-48 overflow-y-auto scrollbar-none pr-1 mb-4 bg-white/[0.02] p-3 rounded-xl border border-white/5">
            {koreanMappillaiData.termsAndConditions.map((clause, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{clause}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs mb-6">
            <div className="p-2.5 bg-black/40 rounded-lg border border-white/5">
              <span className="text-slate-400 text-[10px] block">Groom Signature:</span>
              <span className="text-slate-500 font-mono italic">Pending approval...</span>
            </div>
            <div className="p-2.5 bg-black/40 rounded-lg border border-emerald-500/30">
              <span className="text-slate-400 text-[10px] block">Sumantha Signature:</span>
              <span className="text-emerald-400 font-mono font-bold">Already signed 😂</span>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playNewsFlash();
              setStage('breaking-news');
            }}
            className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
          >
            I AGREE 😭 →
          </button>
        </div>
      )}

      {/* --- 11. BREAKING NEWS BROADCAST --- */}
      {stage === 'breaking-news' && (
        <div className="flex flex-col animate-scale-up text-left">
          {/* TV Broadcast Graphic Frame */}
          <div className="rounded-2xl border-2 border-rose-600 bg-slate-950 p-4 shadow-[0_0_35px_rgba(225,29,72,0.4)] relative overflow-hidden mb-6">
            <div className="flex items-center justify-between border-b border-rose-600/40 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-rose-600 text-white font-black text-[10px] tracking-widest uppercase rounded animate-pulse">
                  🚨 BREAKING NEWS
                </span>
                <span className="text-[10px] font-mono text-slate-400">GLOBAL SPECIAL REPORT</span>
              </div>
              <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
            </div>

            <h3 className="font-display text-white text-base sm:text-lg font-black tracking-wide mb-3 leading-snug">
              "Tamil ponnu Korean mappillai-yoda escape aagittanga 😭🇰🇷"
            </h3>

            {/* Travel Route Diagram */}
            <div className="flex items-center justify-between bg-black/50 p-3 rounded-xl border border-white/10 text-xs font-mono mb-3">
              <div className="flex flex-col items-center">
                <span>🇱🇰</span>
                <span className="text-[10px] text-slate-400">Roots</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <div className="flex flex-col items-center">
                <span>🇫🇷</span>
                <span className="text-[10px] text-slate-400">France</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <div className="flex flex-col items-center">
                <span>🇰🇷</span>
                <span className="text-[10px] text-pink-400 font-bold">Seoul</span>
              </div>
            </div>

            {/* News Ticker Bar */}
            <div className="bg-rose-950/60 border border-rose-800/40 p-2 rounded-lg text-[10px] font-mono text-rose-200">
              <div className="animate-pulse">
                • {koreanMappillaiData.newsTickerLines[0]} <br />
                • {koreanMappillaiData.newsTickerLines[1]}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setStage('five-years-later');
            }}
            className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
          >
            Fast Forward 5 Years ⏩ →
          </button>
        </div>
      )}

      {/* --- 12. 5 YEARS LATER --- */}
      {stage === 'five-years-later' && (
        <div className="flex flex-col animate-fade-in text-left">
          <span className="text-[10px] text-pink-400 font-mono tracking-widest uppercase mb-1">
            SEOUL APARTMENT SURVEILLANCE
          </span>
          <h3 className="font-display text-white text-base font-bold mb-4">
            5 YEARS LATER... 🏠
          </h3>

          <div className="flex flex-col gap-2 text-xs mb-6">
            {koreanMappillaiData.fiveYearsTimeline.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2.5 bg-white/[0.03] border border-white/5 rounded-lg">
                <span className="text-[10px] font-mono text-amber-400 shrink-0">{item.time}</span>
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-400 font-semibold">{item.speaker}</span>
                  <span className="text-white font-light">{item.text}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-purple-500/15 border border-purple-500/40 text-center mb-6">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-0.5">
              MARRIAGE SURVIVAL RATE
            </span>
            <span className="text-base font-mono font-bold text-emerald-400">
              12% → 34% → 78% → 100% ❤️
            </span>
            <p className="text-slate-300 text-[11px] mt-1">
              Okay okay... avan survive pannitaan 😂❤️
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setStage('husband-review');
            }}
            className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
          >
            Read Husband Review ⭐ →
          </button>
        </div>
      )}

      {/* --- 13. HUSBAND 5-STAR REVIEW --- */}
      {stage === 'husband-review' && (
        <div className="flex flex-col animate-scale-up text-center">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-amber-400/30 shadow-xl mb-6">
            <span className="text-amber-400 text-lg tracking-widest block mb-1">
              {koreanMappillaiData.husbandReview.stars}
            </span>
            <h4 className="font-display text-white text-sm font-bold tracking-wider mb-4">
              VERIFIED HUSBAND REVIEW
            </h4>
            <p className="text-slate-300 text-xs font-light leading-relaxed italic mb-4">
              {koreanMappillaiData.husbandReview.quote}
            </p>
            <span className="text-[10px] text-slate-400 font-mono">
              — Reviewed on Seoul Spousal Portal • 5 Stars
            </span>
          </div>

          <button
            onClick={() => {
              sounds.playPortalWarp();
              setStage('return-to-reality');
            }}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-lg hover:scale-[1.01]"
          >
            Return to Reality 🌌 →
          </button>
        </div>
      )}

      {/* --- 14. RETURN TO REALITY TRANSITION --- */}
      {stage === 'return-to-reality' && (
        <div className="flex flex-col items-center text-center animate-fade-in py-4">
          <span className="text-amber-400 text-3xl mb-4 animate-spin">🌀</span>
          <h2 className="font-display text-white text-xl sm:text-2xl font-bold tracking-wider mb-3">
            RETURNING TO REALITY...
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed tracking-wide mb-8 max-w-sm">
            Okay okay 😂 Future-la enna nadakkum nu namakku theriyathu... 2030 database close pannuvom 😭 <br /><br />
            <strong className="text-amber-400 font-medium">Ippo namma REAL memories-ku thirumbi povom ❤️</strong>
          </p>

          <button
            onClick={() => {
              sounds.playKeyEarned();
              onComplete();
            }}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs tracking-widest rounded-xl uppercase transition-all shadow-xl hover:scale-[1.01]"
          >
            Enter Real Memories World 📸 →
          </button>
        </div>
      )}

    </div>
  );
}
