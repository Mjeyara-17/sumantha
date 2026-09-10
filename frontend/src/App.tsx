import React, { useState, useEffect } from 'react';
import { useBirthdayCountdown } from './hooks/useBirthdayCountdown';
import { usePerformanceMode } from './hooks/usePerformanceMode';
import { useProgressSave } from './hooks/useProgressSave';
import { birthdayConfig } from './config/birthdayConfig';
import LockedScreen from './components/LockedScreen';
import MusicController from './components/MusicController';
import Navigation from './components/Navigation';
import UniverseScene, { GameZoneType } from './scenes/UniverseScene';
import Fallback2D from './components/Fallback2D';
import AchievementToast from './components/AchievementToast';
import RecoveredChat from './components/RecoveredChat';
import FakeSeriousQuestion from './components/FakeSeriousQuestion';
import HeightScanner from './components/HeightScanner';
import KoreanMappillaiChapter from './components/KoreanMappillaiChapter';
import VoiceMessagePlayer from './components/VoiceMessagePlayer';
import RunawayNoButton from './components/RunawayNoButton';
import CakeCustomizerModal, { CakeConfig } from './components/CakeCustomizerModal';
import MemoryMapModal from './components/MemoryMapModal';
import PhotoViewerModal from './components/PhotoViewerModal';

// Dedicated Experience Components & Modals
import StartingShortQuestion from './components/StartingShortQuestion';
import SeriousWeddingMessage from './components/SeriousWeddingMessage';
import Photo01MysteryUnlock from './components/Photo01MysteryUnlock';
import Photo05DetectiveGuess from './components/Photo05DetectiveGuess';
import Photo06EmojiChallenge from './components/Photo06EmojiChallenge';
import InteractivePhotoPuzzle from './components/InteractivePhotoPuzzle';
import Photo10FoodQueen from './components/Photo10FoodQueen';
import Photo11HoloScanner from './components/Photo11HoloScanner';
import Photo14And15ThenVsNow from './components/Photo14And15ThenVsNow';
import Photo18OrbitingTraits from './components/Photo18OrbitingTraits';
import Photo19And20Emotional from './components/Photo19And20Emotional';
import Photo21BirthdayHero from './components/Photo21BirthdayHero';
import Photo22SecretEnding from './components/Photo22SecretEnding';
import HeartConstellation3D from './components/HeartConstellation3D';

// Upgraded Experience Components
import MidnightUnlockModal from './components/MidnightUnlockModal';
import FriendshipScoreModal from './components/FriendshipScoreModal';
import FakeGiftModal from './components/FakeGiftModal';
import MakeAWishModal from './components/MakeAWishModal';
import ResumeSessionModal from './components/ResumeSessionModal';

import { photoMemories } from './data/photoMemories';
import { friendshipTimeline } from './data/timeline';
import { sounds } from './utils/soundEffects';
import confetti from 'canvas-confetti';
import { 
  ArrowRight, Sparkles, Heart, Camera
} from 'lucide-react';
import SafeImage from './components/SafeImage';

export default function App() {
  const countdown = useBirthdayCountdown();
  const perf = usePerformanceMode();
  const {
    progress,
    hasSavedSession,
    saveProgress,
    unlockPhoto,
    markSceneComplete,
    addMemoryKey,
    unlockAchievement,
    setPuzzleDone,
    resetProgress,
    completeFirstPlaythrough,
    discoverSecretEnding,
    dismissResumeDialog
  } = useProgressSave();

  // Core Phase Gates: 'LOADING' | 'LOCKED' | 'MIDNIGHT_UNLOCK' | 'STARTING_QUESTION' | 'MYSTERY_01' | 'UNLOCKED_HUB'
  const [appPhase, setAppPhase] = useState<'LOADING' | 'LOCKED' | 'MIDNIGHT_UNLOCK' | 'STARTING_QUESTION' | 'MYSTERY_01' | 'UNLOCKED_HUB'>('LOADING');
  const [isBypassed, setIsBypassed] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // 3D Navigation Coordinator
  const [activeZone, setActiveZone] = useState<GameZoneType>('INTRO');
  const [selectedMemoryId, setSelectedMemoryId] = useState<number | null>(null);

  // Modals & Viewers
  const [showMemoryMap, setShowMemoryMap] = useState(false);
  const [showSecretEnding, setShowSecretEnding] = useState(false);
  const [showConstellation, setShowConstellation] = useState(false);
  const [showSeriousWeddingMessage, setShowSeriousWeddingMessage] = useState(false);
  const [viewingPhotoId, setViewingPhotoId] = useState<number | null>(null);
  const [activeToastId, setActiveToastId] = useState<string | null>(null);

  // Zone Sub-steps
  const [gameStep, setGameStep] = useState<'detective_05' | 'emoji_06' | 'puzzle_07' | 'done'>('detective_05');
  const [foodSubStep, setFoodSubStep] = useState<'question' | 'queen' | 'height'>('question');
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [letterSubStep, setLetterSubStep] = useState<'traits' | 'score' | 'voice' | 'reflection' | 'letter' | 'runaway_no'>('traits');
  const [cakeSubStep, setCakeSubStep] = useState<'customizer' | 'wish'>('customizer');

  // Typewriter personal letter state
  const [typedMessage, setTypedMessage] = useState('');
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [letterFinished, setLetterFinished] = useState(false);

  // Cake Customization & Candle state
  const [cakeConfig, setCakeConfig] = useState<CakeConfig>({
    flavor: 'chocolate',
    topping: 'strawberry',
    theme: 'purple'
  });
  const [candlesLit, setCandlesLit] = useState(true);

  // Resume Dialog State
  const [showResumeDialog, setShowResumeDialog] = useState(false);

  // WebGL support detector & initial gate
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const support = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebglSupported(support);
    } catch (e) {
      setWebglSupported(false);
    }

    const timer = setTimeout(() => {
      setAppPhase('LOCKED');
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // Show Resume Dialog when entering hub if session exists
  useEffect(() => {
    if (appPhase === 'UNLOCKED_HUB' && hasSavedSession) {
      setShowResumeDialog(true);
    }
  }, [appPhase, hasSavedSession]);

  // Unlock Photo helper
  const handleUnlockPhoto = (id: number) => {
    unlockPhoto(id);
    if (id === 7) {
      const isNew = unlockAchievement('puzzle-master');
      if (isNew) setActiveToastId('puzzle-master');
    }
    if (id === 10) {
      const isNew = unlockAchievement('food-queen');
      if (isNew) setActiveToastId('food-queen');
    }
    if (id === 11) {
      const isNew = unlockAchievement('bts-head');
      if (isNew) setActiveToastId('bts-head');
    }
    if (id === 12) {
      const isNew = unlockAchievement('korean-detector');
      if (isNew) setActiveToastId('korean-detector');
    }
    if (id === 21) {
      const isNew = unlockAchievement('memory-master');
      if (isNew) setActiveToastId('memory-master');
    }
    if (id === 22) {
      const isNew = unlockAchievement('too-curious');
      if (isNew) setActiveToastId('too-curious');
    }
  };

  // Switch between 3D zones
  const handleZoneChange = (zone: GameZoneType) => {
    sounds.playUnlock();
    setActiveZone(zone);
    setSelectedMemoryId(null);
    markSceneComplete(zone.toLowerCase());

    if (zone === 'FOOD') {
      setFoodSubStep('question');
      handleUnlockPhoto(10);
    }
    if (zone === 'LETTER') {
      setLetterSubStep('traits');
    }
    if (zone === 'CAKE') {
      setCakeSubStep('customizer');
    }
    if (zone === 'FINALE') {
      handleUnlockPhoto(21);
      completeFirstPlaythrough();
    }
  };

  // Handle Letter Typewriter Animation
  useEffect(() => {
    if (activeZone === 'LETTER' && letterSubStep === 'letter') {
      const fullLetter = birthdayConfig.personalMessage;
      if (typewriterIndex < fullLetter.length) {
        const timeout = setTimeout(() => {
          setTypedMessage((prev) => prev + fullLetter[typewriterIndex]);
          setTypewriterIndex((prev) => prev + 1);
        }, 18);
        return () => clearTimeout(timeout);
      } else {
        setLetterFinished(true);
      }
    }
  }, [activeZone, letterSubStep, typewriterIndex]);

  // Secret Star Trigger
  const handleSecretStarClick = () => {
    sounds.playSparkle();
    discoverSecretEnding();
    handleUnlockPhoto(22);
    setShowSecretEnding(true);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans text-slate-100 select-none">
      {/* 1. INITIAL LOADING SCREEN */}
      {appPhase === 'LOADING' && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-amber-400 rounded-full animate-spin mb-4" />
          <h2 className="text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-pink-400">
            Initializing Sumantha's Little Universe...
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">Preparing 22 celestial memory coordinates</p>
        </div>
      )}

      {/* 2. LOCKED SCREEN / COUNTDOWN */}
      {appPhase === 'LOCKED' && !isBypassed && (
        <LockedScreen
          countdown={countdown}
          onBypass={() => {
            sounds.playSparkle();
            setIsBypassed(true);
            setAppPhase('MIDNIGHT_UNLOCK');
          }}
          onUnlock={() => {
            sounds.playCelebrate();
            setAppPhase('MIDNIGHT_UNLOCK');
          }}
        />
      )}

      {/* 2.5. MIDNIGHT UNLOCK CINEMATIC SEQUENCE */}
      {appPhase === 'MIDNIGHT_UNLOCK' && (
        <MidnightUnlockModal
          onEnter={() => {
            sounds.playSparkle();
            setMusicPlaying(true);
            setAppPhase('STARTING_QUESTION');
          }}
        />
      )}

      {/* 3. PART 1 — STARTING FUNNY QUESTION: "I'M SHORT? 🤨" WITH RUNAWAY NO */}
      {appPhase === 'STARTING_QUESTION' && (
        <StartingShortQuestion
          onComplete={() => {
            unlockAchievement('short-queen');
            setAppPhase('MYSTERY_01');
          }}
        />
      )}

      {/* 4. PHOTO 01 MYSTERY UNLOCK REVEAL */}
      {appPhase === 'MYSTERY_01' && (
        <Photo01MysteryUnlock
          photoSrc={photoMemories[0].src}
          onProceed={() => {
            handleUnlockPhoto(1);
            setAppPhase('UNLOCKED_HUB');
            setActiveZone('INTRO');
          }}
        />
      )}

      {/* 5. MAIN UNLOCKED EXPERIENCE HUB */}
      {appPhase === 'UNLOCKED_HUB' && (
        <>
          {/* Audio Background Manager */}
          <MusicController 
            isPlaying={musicPlaying} 
            onStateChange={setMusicPlaying} 
          />

          {/* Top HUD Bar */}
          <div className="absolute top-4 inset-x-4 z-40 flex items-center justify-between pointer-events-none">
            <div className="flex items-center space-x-2 pointer-events-auto">
              <button
                onClick={() => setShowMemoryMap(true)}
                className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md border border-purple-500/30 text-xs font-mono text-amber-300 shadow-lg transition-all cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-pink-400" />
                <span>
                  {progress.unlockedPhotos.includes(22) ? "22 / 22" : `${Math.min(progress.unlockedPhotos.length, 21)} / 22`} MEMORIES
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-2 pointer-events-auto">
              <button
                onClick={() => setShowConstellation(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-pink-600/30 hover:bg-pink-600/50 backdrop-blur-md border border-pink-400/40 text-xs font-bold text-pink-300 shadow-lg transition-all cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                <span className="hidden sm:inline">Heart Constellation</span>
              </button>
            </div>
          </div>

          {/* 3D WebGL Canvas Layer */}
          {webglSupported ? (
            <div className="absolute inset-0 z-0">
              <UniverseScene
                activeZone={activeZone}
                selectedMemoryId={selectedMemoryId}
                onSelectMemory={(id) => {
                  setSelectedMemoryId(id);
                  if (id) {
                    handleUnlockPhoto(id);
                    setViewingPhotoId(id);
                  }
                }}
                perf={perf}
                giftOpened={false}
                onOpenGift={() => {}}
                candlesLit={candlesLit}
                onBlowOutCandles={() => {}}
                cakeConfig={cakeConfig}
                memoryKeys={progress.memoryKeys}
                onSecretStarClick={handleSecretStarClick}
              />
            </div>
          ) : (
            <Fallback2D
              onReplay={() => handleZoneChange('INTRO')}
            />
          )}

          {/* INTERACTIVE 2D HUD OVERLAYS PER ZONE */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-6 pointer-events-none overflow-y-auto">
            {/* Top Spacer */}
            <div className="h-14" />

            {/* Middle Main Narrative Card / Interaction */}
            <div className="w-full flex justify-center items-center my-auto pointer-events-auto">
              
              {/* ZONE: INTRO */}
              {activeZone === 'INTRO' && (
                <div className="max-w-md w-full text-center bg-slate-950/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl animate-fade-in">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs font-mono text-purple-300">
                    SUMANTHA'S UNIVERSE
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 mt-3 mb-2">
                    Welcome, Birthday Girl! ✨
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    A little cosmic universe crafted with our most memorable, crazy, and special moments.
                  </p>
                  <button
                    onClick={() => handleZoneChange('GAME')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-500/30 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>START MEMORY ADVENTURE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ZONE: GAME (Detective Guess -> Emoji Guess -> 3x3 Photo Puzzle) */}
              {activeZone === 'GAME' && (
                <div className="w-full">
                  {gameStep === 'detective_05' && (
                    <Photo05DetectiveGuess
                      photoSrc={photoMemories[4].src}
                      onComplete={() => handleUnlockPhoto(5)}
                      onNext={() => setGameStep('emoji_06')}
                    />
                  )}
                  {gameStep === 'emoji_06' && (
                    <Photo06EmojiChallenge
                      photoSrc={photoMemories[5].src}
                      onComplete={() => handleUnlockPhoto(6)}
                      onNext={() => setGameStep('puzzle_07')}
                    />
                  )}
                  {gameStep === 'puzzle_07' && (
                    <InteractivePhotoPuzzle
                      photoSrc={photoMemories[6].src}
                      onComplete={() => {
                        handleUnlockPhoto(7);
                        setPuzzleDone();
                      }}
                      onNext={() => {
                        setGameStep('done');
                        handleZoneChange('CHATS');
                      }}
                    />
                  )}
                </div>
              )}

              {/* ZONE: CHATS (Recovered Chat Archive) */}
              {activeZone === 'CHATS' && (
                <div className="w-full max-w-lg">
                  <RecoveredChat
                    onComplete={() => {
                      addMemoryKey();
                      unlockAchievement('late-replier');
                      sounds.playCelebrate();
                    }}
                    onNext={() => handleZoneChange('FOOD')}
                  />
                </div>
              )}

              {/* ZONE: FOOD (Fake Serious Question -> Food Queen 👑 -> Height Scanner Easter Egg) */}
              {activeZone === 'FOOD' && (
                <div className="w-full max-w-lg">
                  {foodSubStep === 'question' && (
                    <FakeSeriousQuestion
                      onComplete={() => setFoodSubStep('queen')}
                    />
                  )}
                  {foodSubStep === 'queen' && (
                    <Photo10FoodQueen
                      photoSrc={photoMemories[9].src}
                      onComplete={() => handleUnlockPhoto(10)}
                      onNext={() => setFoodSubStep('height')}
                    />
                  )}
                  {foodSubStep === 'height' && (
                    <HeightScanner
                      onComplete={() => {
                        unlockAchievement('short-queen');
                        handleZoneChange('KOREAN');
                      }}
                    />
                  )}
                </div>
              )}

              {/* ZONE: KOREAN (Full 14-Stage Korean Mappillai Chapter) */}
              {activeZone === 'KOREAN' && (
                <div className="w-full flex justify-center">
                  <KoreanMappillaiChapter
                    onComplete={() => {
                      handleUnlockPhoto(12);
                      handleUnlockPhoto(13);
                      unlockAchievement('korean-detector');
                      addMemoryKey();
                      sounds.playCelebrate();
                      handleZoneChange('BTS');
                    }}
                  />
                </div>
              )}

              {/* ZONE: BTS (Holographic Scanner & K-Pop Galaxy) */}
              {activeZone === 'BTS' && (
                <div className="w-full">
                  <Photo11HoloScanner
                    photoSrc={photoMemories[10].src}
                    onComplete={() => {
                      handleUnlockPhoto(11);
                      unlockAchievement('bts-head');
                      addMemoryKey();
                    }}
                    onNext={() => handleZoneChange('PUZZLE')}
                  />
                </div>
              )}

              {/* ZONE: PUZZLE (Photos 14 & 15 Then vs Now Interactive Slider) */}
              {activeZone === 'PUZZLE' && (
                <div className="w-full space-y-6">
                  <Photo14And15ThenVsNow
                    thenSrc={photoMemories[13].src}
                    nowSrc={photoMemories[14].src}
                    onComplete={() => {
                      handleUnlockPhoto(14);
                      handleUnlockPhoto(15);
                      addMemoryKey();
                    }}
                    onNext={() => handleZoneChange('TIMELINE')}
                  />
                </div>
              )}

              {/* ZONE: TIMELINE (Photos 16 & 17 Milestones) */}
              {activeZone === 'TIMELINE' && (
                <div className="w-full max-w-lg mx-auto bg-slate-950/90 backdrop-blur-2xl border border-purple-500/30 rounded-3xl p-6 sm:p-8 text-center text-white shadow-2xl">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-mono mb-4">
                    <span>FRIENDSHIP TIMELINE • PHOTOS 16 & 17</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-pink-300 mb-2">
                    {friendshipTimeline[timelineIndex]?.title || "Friendship Milestone"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-6">
                    {friendshipTimeline[timelineIndex]?.description}
                  </p>

                  <div className="relative w-64 h-72 sm:w-72 sm:h-80 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-purple-400/60 shadow-2xl">
                    <SafeImage
                      src={timelineIndex === 0 ? photoMemories[15].src : photoMemories[16].src}
                      alt="Timeline Memory"
                      className="w-full h-full object-cover"
                      focusX="50%"
                      focusY="35%"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      disabled={timelineIndex === 0}
                      onClick={() => setTimelineIndex(i => Math.max(0, i - 1))}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold disabled:opacity-40 cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        if (timelineIndex < 1) {
                          setTimelineIndex(i => i + 1);
                          handleUnlockPhoto(17);
                        } else {
                          handleZoneChange('LETTER');
                        }
                      }}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-xs shadow-md cursor-pointer hover:opacity-95"
                    >
                      {timelineIndex === 0 ? "Next Milestone (Photo 17)" : "Proceed to Affectionate Reflections"}
                    </button>
                  </div>
                </div>
              )}

              {/* ZONE: LETTER (Traits -> Score -> Voice -> Reflection -> Letter -> Serious Message -> Runaway NO) */}
              {activeZone === 'LETTER' && (
                <div className="w-full">
                  {/* Step 1: Orbiting Traits (Photo 18) */}
                  {letterSubStep === 'traits' && (
                    <Photo18OrbitingTraits
                      photoSrc={photoMemories[17].src}
                      onComplete={() => handleUnlockPhoto(18)}
                      onNext={() => setLetterSubStep('score')}
                    />
                  )}

                  {/* Step 2: Friendship Score Modal */}
                  {letterSubStep === 'score' && (
                    <FriendshipScoreModal
                      onContinue={() => setLetterSubStep('voice')}
                    />
                  )}

                  {/* Step 3: Real Voice Message Player */}
                  {letterSubStep === 'voice' && (
                    <VoiceMessagePlayer
                      onComplete={() => setLetterSubStep('reflection')}
                    />
                  )}

                  {/* Step 4: Emotional Reflection (Photos 19 & 20) */}
                  {letterSubStep === 'reflection' && (
                    <Photo19And20Emotional
                      photo19Src={photoMemories[18].src}
                      photo20Src={photoMemories[19].src}
                      onComplete={() => {
                        handleUnlockPhoto(19);
                        handleUnlockPhoto(20);
                      }}
                      onNext={() => setLetterSubStep('letter')}
                    />
                  )}

                  {/* Step 5: Personal Tanglish Typewriter Letter */}
                  {letterSubStep === 'letter' && (
                    <div className="w-full max-w-lg mx-auto bg-slate-950/95 backdrop-blur-2xl border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-left text-white">
                      <div className="flex items-center justify-between mb-4 border-b border-purple-500/20 pb-3">
                        <span className="text-xs font-mono text-purple-300">CONFIDENTIAL LETTER • FOR SUMANTHA</span>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                      </div>

                      <div className="min-h-[220px] font-sans text-sm sm:text-base leading-relaxed text-slate-200 whitespace-pre-wrap">
                        {typedMessage}
                        {!letterFinished && <span className="inline-block w-2 h-4 bg-amber-400 ml-1 animate-pulse" />}
                      </div>

                      {letterFinished && (
                        <div className="mt-6 pt-4 border-t border-purple-500/20 flex justify-between items-center">
                          <button
                            onClick={() => setShowSeriousWeddingMessage(true)}
                            className="py-2.5 px-4 rounded-xl bg-purple-900/40 border border-purple-400/30 text-xs font-semibold text-purple-200 hover:bg-purple-900/60 cursor-pointer"
                          >
                            One Important Thing For You ❤️
                          </button>
                          <button
                            onClick={() => setLetterSubStep('runaway_no')}
                            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-purple-500/30 flex items-center space-x-2 cursor-pointer hover:scale-[1.01]"
                          >
                            <span>Continue</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 6: Runaway NO Button */}
                  {letterSubStep === 'runaway_no' && (
                    <div className="w-full flex justify-center">
                      <RunawayNoButton
                        onYes={() => {
                          unlockAchievement('survived-teasing');
                          addMemoryKey();
                          sounds.playCelebrate();
                          handleZoneChange('GIFT');
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* ZONE: GIFT (Fake Gift Ice Cream -> Real Surprise Gift) */}
              {activeZone === 'GIFT' && (
                <div className="w-full flex justify-center">
                  <FakeGiftModal
                    onComplete={() => handleZoneChange('CAKE')}
                  />
                </div>
              )}

              {/* ZONE: CAKE (Cake Customizer -> Make a Wish Candle Blowout) */}
              {activeZone === 'CAKE' && (
                <div className="w-full flex justify-center">
                  {cakeSubStep === 'customizer' && (
                    <CakeCustomizerModal
                      currentConfig={cakeConfig}
                      onChange={setCakeConfig}
                      onConfirm={() => setCakeSubStep('wish')}
                    />
                  )}
                  {cakeSubStep === 'wish' && (
                    <MakeAWishModal
                      onWishBlown={() => {
                        setCandlesLit(false);
                        sounds.playCelebrate();
                        handleUnlockPhoto(21);
                        confetti({
                          particleCount: 160,
                          spread: 140,
                          origin: { y: 0.4 }
                        });
                        handleZoneChange('FINALE');
                      }}
                    />
                  )}
                </div>
              )}

              {/* ZONE: FINALE (Photo 21 Hero Celebration + Fireworks) */}
              {activeZone === 'FINALE' && (
                <div className="w-full">
                  <Photo21BirthdayHero
                    photoSrc={photoMemories[20].src}
                    onExploreMemoryMap={() => setShowMemoryMap(true)}
                  />
                </div>
              )}

            </div>

            {/* Bottom Navigation System */}
            <div className="w-full flex justify-center pointer-events-auto pb-2">
              <Navigation
                activeZone={activeZone}
                onZoneSelect={handleZoneChange}
                memoryKeys={progress.memoryKeys}
                firstPlaythroughComplete={progress.firstPlaythroughComplete}
                onOpenMemoryMap={() => setShowMemoryMap(true)}
                visible={appPhase === 'UNLOCKED_HUB'}
              />
            </div>
          </div>
        </>
      )}

      {/* MODAL: Serious Wedding-Life Motivational Reassurance */}
      {showSeriousWeddingMessage && (
        <SeriousWeddingMessage
          onProceedToFinale={() => {
            setShowSeriousWeddingMessage(false);
            setLetterSubStep('runaway_no');
          }}
          backgroundPhotoSrc={photoMemories[17].src}
        />
      )}

      {/* MODAL: 22-Memory Map Archive */}
      {showMemoryMap && (
        <MemoryMapModal
          unlockedPhotos={progress.unlockedPhotos}
          onSelectPhoto={(id) => {
            setShowMemoryMap(false);
            setViewingPhotoId(id);
          }}
          onOpenConstellation={() => {
            setShowMemoryMap(false);
            setShowConstellation(true);
          }}
          onClose={() => setShowMemoryMap(false)}
        />
      )}

      {/* MODAL: Photo Viewer (Full Zoom, Keyboard, Swipe) */}
      {viewingPhotoId !== null && (
        <PhotoViewerModal
          initialPhotoId={viewingPhotoId}
          unlockedPhotos={progress.unlockedPhotos}
          onClose={() => setViewingPhotoId(null)}
        />
      )}

      {/* MODAL: Secret Ending (Photo 22 Instant Film) */}
      {showSecretEnding && (
        <Photo22SecretEnding
          photoSrc={photoMemories[21].src}
          onOpenConstellation={() => {
            setShowSecretEnding(false);
            setShowConstellation(true);
          }}
          onClose={() => setShowSecretEnding(false)}
        />
      )}

      {/* MODAL: 3D Heart Constellation (All 22 Photos in 3D Space) */}
      {showConstellation && (
        <HeartConstellation3D
          onClose={() => setShowConstellation(false)}
        />
      )}

      {/* MODAL: Resume Saved Session Dialog */}
      {showResumeDialog && (
        <ResumeSessionModal
          memoryKeys={progress.memoryKeys}
          unlockedCount={progress.unlockedPhotos.length}
          onResume={() => {
            setShowResumeDialog(false);
            dismissResumeDialog();
          }}
          onRestart={() => {
            setShowResumeDialog(false);
            resetProgress();
            dismissResumeDialog();
            setActiveZone('INTRO');
          }}
        />
      )}

      {/* Achievement Popups */}
      <AchievementToast
        currentAchievementId={activeToastId}
        onDismiss={() => setActiveToastId(null)}
      />
    </div>
  );
}
