import React, { useState } from 'react';
import { Sparkles, Trophy, ArrowRight, ShieldAlert, CheckCircle2, Heart, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';
import { friendshipQuizQuestions, FriendshipQuestion } from '../data/friendshipQuizData';
import RunawayAnswerButton from './RunawayAnswerButton';

interface FriendshipQuizProps {
  onComplete: () => void;
  onUnlockAchievement?: (id: string) => void;
}

export default function FriendshipQuiz({
  onComplete,
  onUnlockAchievement
}: FriendshipQuizProps) {
  // Stages: 'intro' | 'question' | 'reaction' | 'summary' | 'doorway'
  const [stage, setStage] = useState<'intro' | 'question' | 'reaction' | 'summary' | 'doorway'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Question 3 (Emoji) specific state
  const [emojiAttempts, setEmojiAttempts] = useState<number>(0);
  const [emojiWrongNotice, setEmojiWrongNotice] = useState<boolean>(false);
  const [emojiSuccess, setEmojiSuccess] = useState<boolean>(false);

  // Question 4 (Late reply) specific state
  const [ramEscapeCount, setRamEscapeCount] = useState<number>(0);
  const [ramErrorNotice, setRamErrorNotice] = useState<string | null>(null);
  const [lateReplyConfirmed, setLateReplyConfirmed] = useState<boolean>(false);

  // Reaction texts
  const [reactionMain, setReactionMain] = useState<string>('');
  const [reactionSub, setReactionSub] = useState<string>('');

  const currentQ: FriendshipQuestion = friendshipQuizQuestions[currentQuestionIndex];

  const handleStart = () => {
    sounds.playSparkle();
    setStage('question');
  };

  const handleSelectOption = (optionId: string) => {
    sounds.playClick();
    setSelectedOptionId(optionId);

    // Question 3: Emoji selection handling
    if (currentQ.specialType === 'emoji-selection') {
      if (optionId === 'unamused') {
        sounds.playCelebrate();
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
        setEmojiSuccess(true);
        setEmojiWrongNotice(false);
        if (onUnlockAchievement) {
          onUnlockAchievement('pro-unamused-user');
        }
        setReactionMain('CORRECTTT 😂');
        setReactionSub('Indha emoji-ku namma chat-la permanent job irukku 😭');
        setStage('reaction');
      } else {
        sounds.playBoing();
        setEmojiWrongNotice(true);
        setEmojiAttempts(prev => prev + 1);
      }
      return;
    }

    // Question 4: Late reply
    if (currentQ.specialType === 'late-reply-runaway') {
      if (optionId === 'suman') {
        sounds.playCelebrate();
        setLateReplyConfirmed(true);
        if (onUnlockAchievement) {
          onUnlockAchievement('late-reply-queen');
        }
        setReactionMain('CORRECTTTT 😂');
        setReactionSub('Finally truth accept pannita 😌');
        setStage('reaction');
      }
      return;
    }

    // General questions 1, 2, 5, 6
    const opt = currentQ.options.find(o => o.id === optionId);
    if (opt) {
      setReactionMain(opt.reaction || 'Accepted! 😂');
      setReactionSub(opt.subReaction || '');
      setStage('reaction');
    }
  };

  const handleNextQuestion = () => {
    sounds.playSparkle();
    setSelectedOptionId(null);
    setEmojiWrongNotice(false);
    setEmojiSuccess(false);
    setLateReplyConfirmed(false);
    setRamErrorNotice(null);

    if (currentQuestionIndex < friendshipQuizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setStage('question');
    } else {
      // Quiz finished -> Summary
      sounds.playCelebrate();
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });
      setStage('summary');
    }
  };

  // Ram runaway attempt message generator
  const getRamAttemptText = () => {
    switch (ramEscapeCount) {
      case 1:
        return '👀';
      case 2:
        return 'Enna try panra? 😂';
      case 3:
        return 'RAM-ah select panna mudiyathu madam 😌';
      case 4:
        return 'Evidence disagrees 😂';
      case 5:
        return 'Still trying ah? 😭';
      default:
        return 'SYSTEM PROTECTING THE TRUTH 🛡️😂';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040208]/95 backdrop-blur-xl text-white select-none overflow-y-auto font-sans animate-fade-in">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.3)_0%,rgba(4,2,8,0.98)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#a855f715_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* --- STAGE 0: INTRO SCREEN --- */}
      {stage === 'intro' && (
        <div className="relative max-w-lg w-full bg-slate-950/90 border-2 border-purple-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(168,85,247,0.3)] text-center animate-scale-up">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 mx-auto flex items-center justify-center shadow-lg shadow-purple-500/40 mb-5">
            <ShieldAlert className="w-8 h-8 text-white animate-bounce" />
          </div>

          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono tracking-widest uppercase">
            MANDATORY INVESTIGATION 🔍
          </span>

          <h2 className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200 mt-3 mb-2">
            FRIENDSHIP CHECK 😂
          </h2>

          <div className="space-y-1 text-slate-300 text-sm font-medium mb-6">
            <p>"Gallery-ku pogurathukku munnadi..."</p>
            <p className="text-pink-300">"Konjam important investigation irukku 👀"</p>
            <p className="text-amber-300 font-bold text-base mt-2">
              "Answer carefully madam 😂"
            </p>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02]"
          >
            <span>Start Investigation 🔍</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* --- STAGE 1: QUESTION CARDS --- */}
      {stage === 'question' && (
        <div className="relative max-w-lg w-full bg-slate-950/90 border-2 border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.25)] text-center animate-fade-in flex flex-col justify-between min-h-[440px]">
          
          {/* Progress Header */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="text-amber-400 font-bold uppercase tracking-wider">
                {currentQ.title}
              </span>
              <span className="text-purple-300">
                QUESTION {currentQuestionIndex + 1} / {friendshipQuizQuestions.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 transition-all duration-500"
                style={{
                  width: `${((currentQuestionIndex + 1) / friendshipQuizQuestions.length) * 100}%`
                }}
              />
            </div>

            {/* Question Title */}
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-100 leading-snug mb-6">
              {currentQ.question}
            </h3>
          </div>

          {/* QUESTION 3: EMOJI SELECTION */}
          {currentQ.specialType === 'emoji-selection' && (
            <div className="space-y-4 my-auto">
              <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className="w-14 h-14 sm:w-16 sm:h-16 text-2xl sm:text-3xl rounded-2xl bg-slate-900 border-2 border-purple-500/30 hover:border-pink-500 hover:scale-110 active:scale-95 transition-all shadow-lg flex items-center justify-center cursor-pointer"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              {emojiWrongNotice && (
                <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl text-rose-300 text-xs sm:text-sm animate-shake">
                  <p className="font-bold">Wrongggg 😂</p>
                  <p className="text-[11px] text-slate-300">Evidence check pannalama? 👀 Try again!</p>
                </div>
              )}
            </div>
          )}

          {/* QUESTION 4: LATE REPLY RUNAWAY BUTTON */}
          {currentQ.specialType === 'late-reply-runaway' && (
            <div className="space-y-6 my-auto">
              {ramEscapeCount > 0 && (
                <div className="p-2.5 bg-amber-950/60 border border-amber-500/40 rounded-xl text-amber-300 text-xs font-mono animate-fade-in">
                  <span>{getRamAttemptText()}</span>
                </div>
              )}

              {ramErrorNotice && (
                <div className="p-2.5 bg-rose-950/70 border border-rose-500/50 rounded-xl text-rose-300 text-xs animate-shake">
                  <p className="font-bold">ERROR 404</p>
                  <p>Poi solla system allow pannathu 😂</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative min-h-[140px] py-4">
                {/* Suman Button - Gets Bigger */}
                <button
                  onClick={() => handleSelectOption('suman')}
                  style={{
                    transform: `scale(${1 + Math.min(ramEscapeCount * 0.08, 0.4)})`
                  }}
                  className="w-full sm:w-44 py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-500/30 transition-all cursor-pointer z-10"
                >
                  SUMAN 😌
                </button>

                {/* RAM Runaway Button - Gets smaller & runs away */}
                <RunawayAnswerButton
                  label="RAM 😂"
                  scale={Math.max(1 - ramEscapeCount * 0.05, 0.7)}
                  onAttempt={(count) => {
                    setRamEscapeCount(count);
                    setRamErrorNotice(null);
                  }}
                  onClickAnyway={() => {
                    setRamErrorNotice('ERROR 404: Poi solla system allow pannathu 😂');
                  }}
                  className="w-full sm:w-44 py-4 px-6 rounded-2xl bg-slate-900 border-2 border-slate-700 text-slate-300 text-sm sm:text-base shadow-md"
                />
              </div>

              <p className="text-[11px] text-slate-400 italic">
                Choose the honest sender to proceed...
              </p>
            </div>
          )}

          {/* STANDARD CHOICE QUESTIONS (Q1, Q2, Q5, Q6) */}
          {currentQ.specialType !== 'emoji-selection' && currentQ.specialType !== 'late-reply-runaway' && (
            <div className="space-y-3 my-auto">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-slate-900/90 border-2 border-purple-500/20 hover:border-pink-500 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base shadow-md transition-all cursor-pointer flex items-center justify-between group hover:scale-[1.01]"
                >
                  <span>{opt.text}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-pink-400 transition-colors" />
                </button>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-purple-500/10 text-[11px] text-slate-500 font-mono">
            Sumantha Biometric Investigation Protocol
          </div>
        </div>
      )}

      {/* --- STAGE 2: REACTION CARD --- */}
      {stage === 'reaction' && (
        <div className="relative max-w-lg w-full bg-slate-950/90 border-2 border-pink-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(236,72,153,0.3)] text-center animate-scale-up space-y-6">
          
          {/* Question 3 Special Trophy Reveal */}
          {currentQ.specialType === 'emoji-selection' && emojiSuccess && (
            <div className="space-y-3">
              <div className="text-7xl animate-bounce my-2">😒</div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>ACHIEVEMENT UNLOCKED: PROFESSIONAL 😒 USER</span>
              </div>
            </div>
          )}

          {/* Question 4 Special Late Reply Breakdown */}
          {currentQ.specialType === 'late-reply-runaway' && lateReplyConfirmed && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-left text-xs font-mono space-y-2">
                <span className="text-amber-400 font-bold block text-center uppercase tracking-wider">
                  ⚡ REPLY SPEED ANALYSIS
                </span>
                <div className="flex justify-between items-center py-1 border-b border-purple-500/20">
                  <span className="text-slate-300">Sumantha:</span>
                  <span className="text-base">🐌🐌🐌</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-purple-500/20">
                  <span className="text-slate-300">Ram:</span>
                  <span className="text-base">⚡</span>
                </div>
                <div className="pt-1 text-slate-400 text-[11px] space-y-0.5">
                  <p>Message sent: <strong className="text-white">10:00 AM</strong></p>
                  <p>Suman reply: <strong className="text-pink-400">Next season 😭</strong></p>
                </div>
              </div>

              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-xs font-mono">
                <Trophy className="w-4 h-4 text-pink-400" />
                <span>ACHIEVEMENT: LATE REPLY QUEEN 👑</span>
              </div>
            </div>
          )}

          {/* Reaction Main Heading */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-amber-300 mb-2">
              {reactionMain}
            </h3>
            {reactionSub && (
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {reactionSub}
              </p>
            )}
          </div>

          <button
            onClick={handleNextQuestion}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center space-x-2 cursor-pointer hover:scale-[1.02]"
          >
            <span>Continue Investigation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* --- STAGE 3: SUMMARY REPORT --- */}
      {stage === 'summary' && (
        <div className="relative max-w-lg w-full bg-slate-950/90 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.3)] text-center animate-scale-up space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>FRIENDSHIP CHECK COMPLETE ✅</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-purple-200">
            OFFICIAL FRIENDSHIP AUDIT
          </h3>

          {/* Fake Stat Bars */}
          <div className="space-y-2.5 text-left text-xs font-mono bg-purple-950/40 p-4 rounded-2xl border border-purple-500/20">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Reels Sharing:</span>
                <span className="text-amber-300 font-bold">100%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-pink-500 w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>😒 Usage:</span>
                <span className="text-pink-300 font-bold">999%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Late Replies:</span>
                <span className="text-rose-300 font-bold">100%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-rose-500 to-amber-500 w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Teasing:</span>
                <span className="text-purple-300 font-bold">999%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Normal Conversations:</span>
                <span className="text-slate-400 font-bold">3%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[3%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Random Nonsense:</span>
                <span className="text-amber-400 font-bold">∞</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500 w-full animate-pulse" />
              </div>
            </div>

            <div className="pt-2 border-t border-purple-500/20 flex justify-between items-center">
              <span className="text-amber-300 font-bold">Friendship:</span>
              <span className="text-pink-300 font-bold">SYSTEM CANNOT CALCULATE 😂❤️</span>
            </div>
          </div>

          <div className="space-y-1 text-xs sm:text-sm text-slate-300">
            <p>"Okay Sumantha... Investigation mudinjiduchu 😌"</p>
            <p className="text-amber-300 font-bold text-base">
              "Result enna na... Namma rendu perum normal illa 😂"
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playSparkle();
              setStage('doorway');
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>See Verdict →</span>
          </button>
        </div>
      )}

      {/* --- STAGE 4: GLOWING DOORWAY TO 22-PHOTO MEMORY GALLERY --- */}
      {stage === 'doorway' && (
        <div className="relative max-w-md w-full bg-slate-950/95 border-2 border-pink-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_70px_rgba(236,72,153,0.35)] text-center animate-fade-in space-y-6">
          
          <div className="space-y-2">
            <p className="text-sm font-mono text-purple-300">But...</p>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-amber-200 to-pink-300">
              "Memories neraya irukku ❤️"
            </h3>
          </div>

          {/* Glowing Celestial Doorway Visual */}
          <div className="w-32 h-44 mx-auto rounded-t-full bg-gradient-to-t from-pink-600/40 via-purple-600/30 to-amber-400/50 border-4 border-amber-300/80 shadow-[0_0_50px_rgba(245,158,11,0.5)] flex flex-col items-center justify-center p-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] opacity-40 animate-pulse" />
            <Sparkles className="w-10 h-10 text-amber-200 animate-spin-slow relative z-10" />
            <span className="text-[10px] font-mono text-amber-200 uppercase tracking-widest mt-2 relative z-10 font-bold">
              22 MEMORIES
            </span>
          </div>

          <h4 className="text-lg font-display font-bold text-white tracking-wide">
            READY TO SEE THEM? 👀
          </h4>

          <button
            onClick={() => {
              sounds.playCelebrate();
              onComplete();
            }}
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center space-x-2 animate-bounce cursor-pointer"
          >
            <span>OPEN MEMORY GALLERY 📸 →</span>
          </button>
        </div>
      )}
    </div>
  );
}
