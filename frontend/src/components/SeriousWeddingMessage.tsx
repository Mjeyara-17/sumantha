import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
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
  // Screens: 0 (Transition Intro), 1 (Title Reveal), 2..6 (Paragraphs 1-5), 7 (Climax 2 lines), 8 (Final Personal Line), 9 (Ready for Finale)
  const [currentScreen, setCurrentScreen] = useState<number>(0);
  const [transitionStep, setTransitionStep] = useState(0);

  // Transition intro pacing
  useEffect(() => {
    if (currentScreen === 0) {
      const t1 = setTimeout(() => setTransitionStep(1), 1000);
      const t2 = setTimeout(() => setTransitionStep(2), 2400);
      const t3 = setTimeout(() => setTransitionStep(3), 4000);
      const t4 = setTimeout(() => setTransitionStep(4), 5800);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [currentScreen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040208] text-white select-none overflow-hidden animate-fade-in font-sans">
      {/* Background Soft Warm Lighting & Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(49,20,70,0.4)_0%,rgba(4,2,8,0.98)_100%)] pointer-events-none" />

      {/* Subtle Background Photo with Warm Soft Blur */}
      {currentScreen >= 2 && currentScreen <= 8 && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-10 filter blur-md transition-opacity duration-1000">
          <SafeImage
            src={backgroundPhotoSrc}
            alt="Sumantha Ambient"
            className="w-full h-full object-cover"
            focusX="50%"
            focusY="30%"
          />
        </div>
      )}

      {/* Subtle Warm Star Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b15_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Main Narrative Card */}
      <div className="relative max-w-2xl w-full min-h-[520px] bg-slate-950/90 backdrop-blur-2xl border border-purple-500/20 rounded-3xl p-6 sm:p-12 shadow-2xl flex flex-col justify-between items-center text-center">
        
        {/* SCREEN 0: COMEDY TO SERIOUS MOMENT TRANSITION */}
        {currentScreen === 0 && (
          <div className="my-auto space-y-5 py-6 animate-fade-in">
            <p className="text-sm font-mono text-purple-300 tracking-wider">
              "Seri..."
            </p>
            <p className="text-base sm:text-lg font-bold text-slate-200">
              "Wedding jokes ellam oru pakkam 😂"
            </p>

            {transitionStep >= 1 && (
              <div className="space-y-1 animate-fade-in">
                <p className="text-xs font-mono text-slate-400">But...</p>
                <h3 className="text-xl sm:text-2xl font-display font-black text-amber-300">
                  "ONE IMPORTANT THING SOLLANUM."
                </h3>
              </div>
            )}

            {transitionStep >= 2 && (
              <p className="text-sm sm:text-base font-bold text-pink-400 animate-fade-in tracking-wide">
                "INDHA PART JOKE ILLA."
              </p>
            )}

            {transitionStep >= 3 && (
              <div className="space-y-2 pt-2 animate-fade-in text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p>"Because I know..."</p>
                <p>"Future pathi nee konjam overthink pannuva..."</p>
                <p className="text-purple-300">"Especially..."</p>
                <p className="text-pink-300 font-bold text-base sm:text-lg">
                  "WEDDING LIFE PATHI. ❤️"
                </p>
              </div>
            )}

            {transitionStep >= 4 && (
              <button
                onClick={() => {
                  sounds.playSparkle();
                  setCurrentScreen(1);
                }}
                className="mt-6 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center space-x-2 mx-auto animate-fade-in cursor-pointer hover:scale-105"
              >
                <span>Read This From My Heart ❤️</span>
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
              className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center space-x-2 mx-auto cursor-pointer"
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

        {/* SCREEN 6: DON'T LOSE WHO YOU ARE */}
        {currentScreen === 6 && (
          <div className="my-auto space-y-6 py-4 animate-fade-in text-center max-w-xl relative">
            <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-widest font-mono">
              AND WHATEVER CHANGES IN LIFE…
            </p>

            <h3 className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-200 leading-relaxed p-6 bg-slate-950/80 rounded-2xl border border-purple-500/30">
              "don't lose the Sumantha we know — the smile, the craziness, the food love 😂, the dreams, and that little bit of chaos that makes you YOU. ❤️"
            </h3>
          </div>
        )}

        {/* SCREEN 7: THE TWO CLIMAX LINES (DARKENED SCENE) */}
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

        {/* SCREEN 8: FINAL PERSONAL LINE & HOPE */}
        {currentScreen === 8 && (
          <div className="my-auto space-y-6 py-6 animate-fade-in text-center max-w-lg">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "Future epdi irukkum nu namakku ippo theriyathu..."
            </p>

            <p className="text-xs font-mono text-purple-300">"But one thing..."</p>

            <div className="p-5 bg-gradient-to-r from-purple-950/90 to-pink-950/90 rounded-2xl border border-purple-400/40 shadow-xl space-y-2">
              <h4 className="text-xl sm:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-amber-300">
                "BAYATHODA ILLA...<br />HOPE-ODA FACE PANNU. ❤️"
              </h4>
              <div className="pt-2 border-t border-purple-500/20 text-sm text-purple-200 font-medium">
                <p>"Nee happy-ah irukkanum."</p>
                <p className="text-amber-300 font-bold">"Adhu than important."</p>
              </div>
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
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center space-x-2 animate-bounce mx-auto cursor-pointer"
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
              className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 disabled:opacity-30 flex items-center space-x-1 cursor-pointer"
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
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-md flex items-center space-x-1 cursor-pointer hover:scale-105 transition-all"
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
