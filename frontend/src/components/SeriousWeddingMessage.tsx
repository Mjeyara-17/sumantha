import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import SafeImage from './SafeImage';

interface SeriousWeddingMessageProps {
  onProceedToFinale: () => void;
  backgroundPhotoSrc?: string;
}

export default function SeriousWeddingMessage({
  onProceedToFinale,
  backgroundPhotoSrc = '/images/sumantha/photo-18.jpg'
}: SeriousWeddingMessageProps) {
  // Screens: 0 (Transition Intro), 1 (Title Reveal), 2..7 (Paragraphs), 8 (Climax 2 lines), 9 (Final Personal Line), 10 (Ready for Finale)
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [transitionStep, setTransitionStep] = useState(0);

  // Transition intro pacing
  useEffect(() => {
    if (currentScreen === 0) {
      const t1 = setTimeout(() => setTransitionStep(1), 1000);
      const t2 = setTimeout(() => setTransitionStep(2), 2600);
      const t3 = setTimeout(() => setTransitionStep(3), 4400);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [currentScreen]);

  const floatingTraits = [
    { text: "SMILE ✨", x: -140, y: -90, color: "text-amber-200" },
    { text: "CRAZY 😂", x: 130, y: -80, color: "text-rose-300" },
    { text: "FOOD 🍜", x: -150, y: 70, color: "text-emerald-300" },
    { text: "DREAMS ✨", x: 140, y: 80, color: "text-purple-300" },
    { text: "CHAOS 🔥", x: -110, y: 140, color: "text-yellow-300" },
    { text: "CARING ❤️", x: 110, y: 140, color: "text-pink-300" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040208] text-white select-none overflow-hidden animate-fade-in font-sans">
      {/* Background Soft Warm Lighting & Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(49,20,70,0.5)_0%,rgba(4,2,8,0.98)_100%)] pointer-events-none" />

      {/* Subtle Background Photo with Warm Soft Blur */}
      {currentScreen >= 2 && currentScreen <= 8 && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-15 filter blur-sm transition-opacity duration-1000">
          <SafeImage
            src={backgroundPhotoSrc}
            alt="Sumantha Ambient"
            className="w-full h-full object-cover"
            focusX="50%"
            focusY="30%"
          />
        </div>
      )}

      {/* Subtle Star Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(#a855f720_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Main Narrative Card */}
      <div className="relative max-w-2xl w-full min-h-[500px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/20 rounded-3xl p-6 sm:p-12 shadow-2xl flex flex-col justify-between items-center text-center">
        
        {/* SCREEN 0: COMEDY TO SERIOUS MOMENT TRANSITION */}
        {currentScreen === 0 && (
          <div className="my-auto space-y-6 py-6 animate-fade-in">
            <p className="text-xs sm:text-sm font-mono text-purple-300 tracking-wider">
              Seri seri... Wedding jokes ellam pothum 😂
            </p>

            {transitionStep >= 1 && (
              <h3 className="text-xl sm:text-2xl font-display font-medium text-slate-200 animate-fade-in">
                One important thing sollanum...
              </h3>
            )}

            {transitionStep >= 2 && (
              <p className="text-sm sm:text-base font-bold text-amber-300 animate-fade-in">
                Indha part joke illa.
              </p>
            )}

            {transitionStep >= 3 && (
              <div className="space-y-2 pt-2 animate-fade-in text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>Because I know... Future pathi nee sometimes konjam overthink pannuva.</p>
                <p className="text-pink-300 font-semibold text-sm sm:text-base">
                  Especially... Wedding life pathi. ❤️
                </p>
              </div>
            )}

            {transitionStep >= 3 && (
              <button
                onClick={() => {
                  sounds.playSparkle();
                  setCurrentScreen(1);
                }}
                className="mt-6 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center space-x-2 mx-auto animate-fade-in"
              >
                <span>Read This From My Heart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* SCREEN 1: CINEMATIC TITLE REVEAL */}
        {currentScreen === 1 && (
          <div className="my-auto space-y-6 py-8 animate-fade-in">
            <span className="text-xs font-mono text-amber-300 tracking-widest uppercase bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-400/30">
              ONE IMPORTANT THING...
            </span>

            <h2 className="text-2xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 leading-tight">
              I WANT YOU TO REMEMBER THIS ❤️
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Take your time to read each thought at your own pace.
            </p>

            <button
              onClick={() => setCurrentScreen(2)}
              className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2 mx-auto"
            >
              <span>Begin ❤️</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* SCREEN 2: PARAGRAPH 1 */}
        {currentScreen === 2 && (
          <div className="my-auto space-y-5 py-4 animate-fade-in text-left max-w-xl">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-pink-300 text-center">
              Sumantha… ❤️
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Unakku wedding life-ah pathi konjam bayam irukku nu enakku theriyum. Future epdi irukkum, life epdi change aagum, ellame okay-ah irukkuma nu yosikkumbothu konjam worry varradhu normal than.
            </p>
            <p className="text-sm sm:text-base text-amber-200 font-medium leading-relaxed bg-purple-950/40 p-4 rounded-2xl border border-purple-500/20">
              Aana wedding-ah paathu romba bayappadatha. Marriage na un life mudiyura place illa… <strong className="text-pink-300 font-bold">adhu un life-la oru pudhu chapter start aagura place.</strong> ❤️
            </p>
          </div>
        )}

        {/* SCREEN 3: PARAGRAPH 2 */}
        {currentScreen === 3 && (
          <div className="my-auto space-y-5 py-4 animate-fade-in text-left max-w-xl">
            <span className="text-xs font-mono text-purple-300 block text-center uppercase tracking-wider">
              A BEAUTIFUL CHAPTER
            </span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Life change aagum, responsibilities varum, new situations varum… aana change ellame bad-ah irukkanum nu illa. Sometimes namma expect pannadha changes than namma life-la romba beautiful-aana moments-ah kondu varum.
            </p>
            <p className="text-sm sm:text-base text-purple-200 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-purple-500/20">
              Unakku right-aana person un life-la varumbothu, avar un dreams-ah stop panna maataru; <span className="text-amber-300 font-semibold">un kooda ninnu, un happiness, goals, silly moments, difficult days ellathayum share pannuvaaru.</span>
            </p>
          </div>
        )}

        {/* SCREEN 4: PARAGRAPH 3 */}
        {currentScreen === 4 && (
          <div className="my-auto space-y-5 py-4 animate-fade-in text-left max-w-xl">
            <span className="text-xs font-mono text-amber-300 block text-center uppercase tracking-wider">
              DON'T LOSE YOUR PRESENT
            </span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              So future-la enna nadakkum nu ippo-ve yosichu un present happiness-ah lose pannatha. <strong className="text-amber-300">Everything doesn't have to be figured out today.</strong> Un life unakku correct-aana time-la, correct-aana way-la move aagum.
            </p>
            <p className="text-sm sm:text-base text-pink-200 leading-relaxed italic bg-pink-950/30 p-4 rounded-2xl border border-pink-500/20 text-center">
              "One day nee ippo bayappadura same future-ah paathu smile pannitu, <strong className="text-white">“Naan idhukku thaan ivlo bayandhena?”</strong> nu yosikkalam. ❤️"
            </p>
          </div>
        )}

        {/* SCREEN 5: PARAGRAPH 4 */}
        {currentScreen === 5 && (
          <div className="my-auto space-y-5 py-4 animate-fade-in text-left max-w-xl">
            <span className="text-xs font-mono text-pink-300 block text-center uppercase tracking-wider">
              A NEW BEGINNING
            </span>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Marriage un freedom-oda ending illa. Happiness-oda ending illa. <strong className="text-amber-300">It's simply another beginning — new memories, new experiences, new happiness, and someone to share the journey with.</strong>
            </p>
            <p className="text-sm sm:text-base text-purple-200 leading-relaxed bg-purple-950/30 p-4 rounded-2xl border border-purple-500/20 text-center">
              So wedding pathi worry pannama, un life-la vara ovvoru chapter-aiyum un own pace-la enjoy pannu. ✨
            </p>
          </div>
        )}

        {/* SCREEN 6: DON'T LOSE WHO YOU ARE + FLOATING WORDS */}
        {currentScreen === 6 && (
          <div className="my-auto space-y-6 py-4 animate-fade-in text-center max-w-xl relative">
            {/* Floating trait badges */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {floatingTraits.map((t, idx) => (
                <div
                  key={idx}
                  className={`absolute px-3 py-1 rounded-full bg-slate-900/90 border border-white/20 text-xs font-mono ${t.color} shadow-lg animate-pulse`}
                  style={{
                    transform: `translate(${t.x}px, ${t.y}px)`
                  }}
                >
                  {t.text}
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-widest font-mono">
              AND WHATEVER CHANGES IN LIFE…
            </p>

            <h3 className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-200 leading-relaxed p-4 bg-slate-950/80 rounded-2xl border border-purple-500/30 z-10 relative">
              "Don't lose the Sumantha we know — the smile, the craziness, the food love 😂, the dreams, and that little bit of chaos that makes you YOU. ❤️"
            </h3>
          </div>
        )}

        {/* SCREEN 7: THE TWO CLIMAX LINES */}
        {currentScreen === 7 && (
          <div className="my-auto space-y-8 py-10 animate-fade-in text-center max-w-lg">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-amber-300 leading-tight">
                YOUR BEST DAYS<br />DON'T HAVE TO BE BEHIND YOU.
              </h2>
            </div>

            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

            <div className="space-y-4">
              <h3 className="text-xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-300 leading-tight">
                SOME OF THE MOST BEAUTIFUL ONES<br />MAY STILL BE WAITING FOR YOU. ✨
              </h3>
            </div>
          </div>
        )}

        {/* SCREEN 8: FINAL PERSONAL LINE & PLAYFUL CALLBACK */}
        {currentScreen === 8 && (
          <div className="my-auto space-y-5 py-6 animate-fade-in text-center max-w-lg">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Future epdi irukkum nu namakku ippo theriyathu... But one thing:
            </p>

            <div className="p-4 bg-gradient-to-r from-purple-950/80 to-pink-950/80 rounded-2xl border border-purple-400/40 shadow-xl">
              <h4 className="text-lg sm:text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-amber-300 mb-1">
                "Bayathoda illa... Hope-oda face pannu. ❤️"
              </h4>
              <p className="text-xs text-purple-200 mt-2">
                Nee happy-ah irukkanum. Adhu than important.
              </p>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 text-xs text-amber-300 font-mono">
              And yes... Korean mappillai matter-ku... System already working on it 😂🇰🇷
            </div>
          </div>
        )}

        {/* SCREEN 9: READY FOR FINAL SURPRISE */}
        {currentScreen === 9 && (
          <div className="my-auto space-y-6 py-6 animate-fade-in text-center max-w-md">
            <span className="text-xs font-mono text-purple-300">
              Okay... Enough serious talk 😌
            </span>

            <h3 className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300">
              Birthday girl-ku இன்னும் one last celebration irukku...
            </h3>

            <p className="text-xs sm:text-sm text-slate-300">
              Cake, candles, fireworks, and the grand finale await!
            </p>

            <button
              onClick={() => {
                sounds.playCelebrate();
                onProceedToFinale();
              }}
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center space-x-2 animate-bounce mx-auto"
            >
              <span>I'M READY FOR THE FINALE →</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        )}

        {/* Bottom Pagination & Nav */}
        {currentScreen >= 2 && currentScreen <= 8 && (
          <div className="w-full pt-4 border-t border-purple-500/20 flex items-center justify-between gap-3 text-xs">
            <button
              disabled={currentScreen <= 2}
              onClick={() => setCurrentScreen(s => Math.max(2, s - 1))}
              className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 disabled:opacity-30 flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="font-mono text-purple-300 text-[11px]">
              STEP {currentScreen - 1} / 7
            </span>

            <button
              onClick={() => {
                sounds.playClick();
                setCurrentScreen(s => s + 1);
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-md flex items-center space-x-1"
            >
              <span>{currentScreen === 8 ? "Finish" : "Next"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
