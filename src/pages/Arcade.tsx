import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoodleLayout } from '@/components/DoodleLayout';
import { triggerConfetti } from '@/lib/confetti';
import { 
  Sparkles, RefreshCw, Trophy, Gamepad2, Gift, 
  HelpCircle, CheckCircle, ChevronRight, Award, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────────────────────
   1. CLAW MACHINE COMPONENT
───────────────────────────────────────────────────────────────────────────── */
interface PrizeItem {
  id: string;
  name: string;
  emoji: string;
  x: number;
}

const INITIAL_PRIZES: PrizeItem[] = [
  { id: 'cap', name: 'Vintage Cap', emoji: '🧢', x: 20 },
  { id: 'coffee', name: 'Fresh Latte', emoji: '☕', x: 35 },
  { id: 'gamepad', name: 'Retro Controller', emoji: '🎮', x: 50 },
  { id: 'burger', name: 'Cheeseburger', emoji: '🍔', x: 65 },
  { id: 'apple', name: 'Lucky Apple', emoji: '🍎', x: 80 },
  { id: 'teddy', name: 'Plushie Teddy', emoji: '🧸', x: 42 },
  { id: 'camera', name: 'Lofi Camera', emoji: '📷', x: 58 },
  { id: 'sparkles', name: 'Magic Star', emoji: '⭐', x: 28 },
];

const ClawMachine: React.FC = () => {
  const [clawX, setClawX] = useState<number>(50); // percentage 15 to 85
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [clawY, setClawY] = useState<number>(10); // percentage 10 to 65
  const [grabbedPrize, setGrabbedPrize] = useState<PrizeItem | null>(null);
  const [wonPrizes, setWonPrizes] = useState<PrizeItem[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('Ready to play! Aim with buttons or A/D');

  const moveLeft = () => {
    if (isDropping) return;
    setClawX((prev) => Math.max(15, prev - 8));
  };

  const moveRight = () => {
    if (isDropping) return;
    setClawX((prev) => Math.min(85, prev + 8));
  };

  const dropClaw = () => {
    if (isDropping) return;
    setIsDropping(true);
    setStatusMessage('Dropping claw...');

    // 1. Lower the claw
    setClawY(62);

    setTimeout(() => {
      // 2. Check if a prize is close to clawX
      const target = INITIAL_PRIZES.find((p) => Math.abs(p.x - clawX) <= 12);
      if (target && Math.random() > 0.15) {
        setGrabbedPrize(target);
        setStatusMessage(`Grabbed the ${target.name}! Raising...`);
      } else {
        setStatusMessage('Missed! Raising claw...');
      }

      // 3. Lift the claw back up
      setClawY(10);

      setTimeout(() => {
        // 4. Move claw to left chute
        setClawX(15);

        setTimeout(() => {
          // 5. Release prize into chute
          if (target) {
            setWonPrizes((prev) => [target, ...prev]);
            setStatusMessage(`🎉 You caught the ${target.name}!`);
            triggerConfetti(0.3, 0.5);
          } else {
            setStatusMessage('Empty claw! Try again.');
          }
          setGrabbedPrize(null);
          setIsDropping(false);
        }, 800);
      }, 900);
    }, 900);
  };

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        moveLeft();
      } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        moveRight();
      } else if (e.key === ' ' && !isDropping) {
        e.preventDefault();
        dropClaw();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDropping, clawX]);

  return (
    <div className="flex flex-col items-center bg-[#faf9f6] border-2 border-zinc-900 rounded-2xl p-4 shadow-sm w-full max-w-sm">
      {/* Top Banner */}
      <div className="w-full bg-[#fef08a] border-2 border-zinc-900 rounded-xl py-1.5 px-4 mb-3 text-center shadow-xs">
        <span className="font-display font-extrabold text-sm sm:text-base tracking-wide text-zinc-900">
          Slot machine
        </span>
      </div>

      {/* Glass Claw Enclosure */}
      <div className="relative w-full h-64 bg-white border-2 border-zinc-900 rounded-xl overflow-hidden shadow-inner flex flex-col justify-between p-2">
        {/* Top rail */}
        <div className="absolute top-0 inset-x-0 h-3 bg-zinc-200 border-b border-zinc-400" />

        {/* Chute on left */}
        <div className="absolute bottom-0 left-1 w-12 h-14 bg-zinc-100 border-2 border-dashed border-zinc-400 rounded-t-lg flex flex-col items-center justify-center">
          <span className="text-[9px] font-mono font-bold text-zinc-500">CHUTE</span>
          <span className="text-xs">⬇️</span>
        </div>

        {/* The Claw Mechanism */}
        <div
          className="absolute z-20 transition-all duration-700 ease-out flex flex-col items-center"
          style={{
            left: `${clawX}%`,
            top: `${clawY}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {/* Cable cord */}
          <div className="w-[3px] h-12 bg-zinc-700 -mt-12" />
          {/* Claw Head */}
          <div className="w-6 h-4 bg-zinc-700 border border-zinc-900 rounded-t-sm" />
          {/* Fingers */}
          <div className="flex justify-between w-8 -mt-0.5">
            <div className="w-1.5 h-4 bg-zinc-800 rounded-bl-full rotate-12" />
            <div className="w-1.5 h-4 bg-zinc-800 rounded-br-full -rotate-12" />
          </div>

          {/* Grabbed Item floating in claw */}
          {grabbedPrize && (
            <div className="text-xl -mt-1 animate-bounce">
              {grabbedPrize.emoji}
            </div>
          )}
        </div>

        {/* Prize Pool resting at bottom */}
        <div className="relative z-10 w-full h-16 flex items-end justify-around px-8 mt-auto">
          {INITIAL_PRIZES.map((prize) => (
            <span
              key={prize.id}
              className="text-2xl select-none hover:scale-125 transition-transform cursor-pointer drop-shadow-xs"
              title={prize.name}
            >
              {prize.emoji}
            </span>
          ))}
        </div>
      </div>

      {/* Control Panel Area */}
      <div className="w-full mt-3 bg-zinc-100 border-2 border-zinc-900 rounded-xl p-3 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          {/* Left/Right Direction Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={moveLeft}
              disabled={isDropping}
              className="w-9 h-9 bg-white border-2 border-zinc-900 rounded-lg font-bold text-xs shadow-xs active:translate-y-0.5 disabled:opacity-50"
            >
              A ◀
            </button>
            <button
              onClick={moveRight}
              disabled={isDropping}
              className="w-9 h-9 bg-white border-2 border-zinc-900 rounded-lg font-bold text-xs shadow-xs active:translate-y-0.5 disabled:opacity-50"
            >
              ▶ D
            </button>
          </div>

          {/* Joystick Visual (Red Knob) */}
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-zinc-900 shadow-xs" />
            <div className="w-1.5 h-3 bg-zinc-600 rounded-full" />
          </div>

          {/* Drop / Release Button */}
          <button
            onClick={dropClaw}
            disabled={isDropping}
            className="px-4 py-2 bg-[#fef08a] border-2 border-zinc-900 rounded-lg font-bold text-xs shadow-xs hover:bg-[#fde047] active:translate-y-0.5 disabled:opacity-50"
          >
            space Release
          </button>
        </div>

        {/* Live Status */}
        <p className="text-[11px] text-zinc-600 font-doodle text-center truncate">
          {statusMessage}
        </p>
      </div>

      {/* Won Prizes Drawer */}
      {wonPrizes.length > 0 && (
        <div className="w-full mt-2.5 pt-2 border-t border-dashed border-zinc-300 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-bold text-zinc-500 uppercase">Won:</span>
          {wonPrizes.map((p, i) => (
            <span key={i} className="text-base" title={p.name}>
              {p.emoji}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. GUMBALL MACHINE COMPONENT ("Drag to Twist")
───────────────────────────────────────────────────────────────────────────── */
interface FortunePrize {
  title: string;
  fortune: string;
  icon: string;
  color: string;
}

const FORTUNES: FortunePrize[] = [
  { title: 'The Architect', fortune: 'Your next deployment will pass all tests on the first try!', icon: '🏛️', color: '#38bdf8' },
  { title: 'Lucky Bug-Hunter', fortune: 'You will squash a tricky edge case in less than 5 minutes today.', icon: '🐞', color: '#f43f5e' },
  { title: 'Golden Spark', fortune: 'Creativity flows when you step away from the keyboard and take a walk.', icon: '✨', color: '#facc15' },
  { title: 'Full-Stack Sage', fortune: 'Clean architecture today saves 100 hours of refactoring tomorrow.', icon: '🧙‍♂️', color: '#a855f7' },
  { title: 'Infinite Coffee', fortune: 'May your APIs be snappy and your database indexes always hot.', icon: '☕', color: '#fb923c' },
];

const GumballMachine: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [isTwisting, setIsTwisting] = useState<boolean>(false);
  const [dispensedBall, setDispensedBall] = useState<FortunePrize | null>(null);
  const [modalFortune, setModalFortune] = useState<FortunePrize | null>(null);

  const twistCrank = () => {
    if (isTwisting) return;
    setIsTwisting(true);

    // Turn dial 360 degrees
    setRotation((prev) => prev + 360);

    // Dispense gumball after spin
    setTimeout(() => {
      const prize = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setDispensedBall(prize);
      setIsTwisting(false);
      triggerConfetti(0.5, 0.6);
    }, 700);
  };

  return (
    <div className="flex flex-col items-center bg-[#faf9f6] border-2 border-zinc-900 rounded-2xl p-4 shadow-sm w-full max-w-sm">
      {/* Clear Glass Globe filled with gumballs */}
      <div className="relative w-44 h-44 rounded-full bg-white/90 border-2 border-zinc-900 shadow-inner flex items-center justify-center overflow-hidden p-2">
        {/* Glass Reflection Highlight */}
        <div className="absolute top-2 left-4 w-12 h-6 bg-white rounded-full opacity-60 rotate-[-25deg] pointer-events-none" />

        {/* Colorful Gumballs inside */}
        <div className="grid grid-cols-4 gap-1.5 p-3">
          {['#ef4444', '#3b82f6', '#facc15', '#10b981', '#a855f7', '#ec4899', '#f97316', '#06b6d4', '#84cc16', '#6366f1'].map((c, i) => (
            <motion.div
              key={i}
              animate={isTwisting ? { y: [0, -6, 2, 0], x: [0, 3, -3, 0] } : {}}
              transition={{ duration: 0.3, repeat: isTwisting ? 2 : 0 }}
              className="w-6 h-6 rounded-full border border-zinc-800 shadow-xs relative overflow-hidden"
              style={{ backgroundColor: c }}
            >
              <div className="absolute top-0.5 left-1 w-2 h-1 bg-white rounded-full opacity-70" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Machine Lower Body (Grey metal dispenser) */}
      <div className="relative w-40 bg-zinc-200 border-2 border-zinc-900 rounded-b-2xl p-3 flex flex-col items-center -mt-3 pt-4 shadow-sm">
        {/* Drag to Twist Crank */}
        <button
          onClick={twistCrank}
          disabled={isTwisting}
          className="group relative flex flex-col items-center focus:outline-none"
          title="Click to turn crank!"
        >
          {/* Label matching screenshot */}
          <div className="px-2.5 py-0.5 rounded-full bg-[#fef08a] border border-zinc-900 text-[10px] font-bold text-zinc-900 mb-1 shadow-2xs group-hover:bg-[#fde047]">
            Drag to Twist
          </div>

          {/* Dial Wheel */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-full bg-white border-2 border-zinc-900 flex items-center justify-center shadow-xs cursor-pointer hover:scale-105 active:scale-95"
          >
            <div className="w-8 h-2 bg-zinc-800 rounded-full" />
            <div className="w-2 h-8 bg-zinc-800 rounded-full absolute" />
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-zinc-900 z-10" />
          </motion.div>
        </button>

        {/* Bottom Dispenser Slot */}
        <div className="w-14 h-12 bg-zinc-800 border-2 border-zinc-900 rounded-t-lg mt-3 flex items-center justify-center relative overflow-hidden">
          {dispensedBall ? (
            <motion.div
              initial={{ y: -20, scale: 0.5 }}
              animate={{ y: 0, scale: 1 }}
              onClick={() => setModalFortune(dispensedBall)}
              className="cursor-pointer flex flex-col items-center animate-pulse"
              title="Click capsule to open!"
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center text-xs"
                style={{ backgroundColor: dispensedBall.color }}
              >
                {dispensedBall.icon}
              </div>
              <span className="text-[8px] text-white font-mono font-bold">OPEN ME</span>
            </motion.div>
          ) : (
            <span className="text-[9px] text-zinc-400 font-mono">PUSH</span>
          )}
        </div>
      </div>

      {/* Capsule Prize Modal */}
      <AnimatePresence>
        {modalFortune && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-full max-w-sm bg-white rounded-2xl border-2 border-zinc-900 p-6 text-center shadow-2xl space-y-4"
            >
              <div
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl border-2 border-zinc-900 shadow-md"
                style={{ backgroundColor: modalFortune.color }}
              >
                {modalFortune.icon}
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Capsule Unlocked!
                </span>
                <h3 className="text-xl font-extrabold text-zinc-900 font-display">
                  {modalFortune.title}
                </h3>
                <p className="text-sm text-zinc-600 font-doodle text-base leading-relaxed pt-2">
                  "{modalFortune.fortune}"
                </p>
              </div>

              <button
                onClick={() => setModalFortune(null)}
                className="w-full py-2.5 bg-[#fef08a] border-2 border-zinc-900 rounded-xl font-bold text-sm text-zinc-900 hover:bg-[#fde047] shadow-xs"
              >
                Awesome! ✨
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   3. SCRATCH TO WIN COMPONENT ("find 3 Smiles")
───────────────────────────────────────────────────────────────────────────── */
interface ScratchCell {
  id: number;
  icon: string;
  isSmile: boolean;
  scratched: boolean;
}

const ScratchToWin: React.FC = () => {
  const [cells, setCells] = useState<ScratchCell[]>([]);
  const [smilesFound, setSmilesFound] = useState<number>(0);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const initGame = () => {
    // Generate 12 cells, exactly 3 to 4 smiles
    const totalCells = 12;
    const smileCount = 3;
    const icons = ['⭐', '💎', '🍀', '🚀', '🍕', '🎉', '⚡', '🎈'];

    const newCells: ScratchCell[] = [];
    const smileIndices = new Set<number>();
    while (smileIndices.size < smileCount) {
      smileIndices.add(Math.floor(Math.random() * totalCells));
    }

    for (let i = 0; i < totalCells; i++) {
      const isSmile = smileIndices.has(i);
      newCells.push({
        id: i,
        icon: isSmile ? '😊' : icons[Math.floor(Math.random() * icons.length)],
        isSmile,
        scratched: false,
      });
    }

    setCells(newCells);
    setSmilesFound(0);
    setHasWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const scratchCell = (id: number) => {
    setCells((prev) =>
      prev.map((cell) => {
        if (cell.id === id && !cell.scratched) {
          const updated = { ...cell, scratched: true };
          if (updated.isSmile) {
            const nextSmiles = smilesFound + 1;
            setSmilesFound(nextSmiles);
            if (nextSmiles >= 3) {
              setHasWon(true);
              triggerConfetti(0.7, 0.5);
            }
          }
          return updated;
        }
        return cell;
      })
    );
  };

  return (
    <div className="flex flex-col items-center bg-[#faf9f6] border-2 border-zinc-900 rounded-2xl p-4 shadow-sm w-full max-w-sm">
      {/* Scratch Card Header */}
      <div className="w-full text-center pb-2 border-b-2 border-dashed border-zinc-300">
        <h3 className="font-display font-extrabold text-base text-zinc-900 tracking-tight">
          Scratch to Win!
        </h3>
        <p className="text-xs text-zinc-500 font-doodle text-sm">
          find 3 Smiles 😊 (Found: {smilesFound}/3)
        </p>
      </div>

      {/* 4x3 Grid (12 circular coins matching screenshot) */}
      <div className="w-full bg-white border-2 border-zinc-900 rounded-xl p-3 my-3 shadow-inner">
        <div className="grid grid-cols-3 gap-3">
          {cells.map((cell) => (
            <button
              key={cell.id}
              onClick={() => scratchCell(cell.id)}
              disabled={cell.scratched}
              className={`relative w-14 h-14 mx-auto rounded-full border-2 border-zinc-900 flex items-center justify-center font-bold text-lg transition-all duration-200 select-none ${
                cell.scratched
                  ? cell.isSmile
                    ? 'bg-amber-100 scale-105 shadow-sm'
                    : 'bg-zinc-100 text-zinc-600'
                  : 'bg-[#fef08a] hover:bg-[#fde047] active:scale-95 shadow-xs cursor-pointer'
              }`}
            >
              {cell.scratched ? (
                <span className="text-2xl">{cell.icon}</span>
              ) : (
                <span className="text-[10px] text-zinc-800 font-sans uppercase font-extrabold leading-tight text-center">
                  scratch<br />me
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Win Banner / Play Again Button */}
      {hasWon ? (
        <div className="w-full bg-emerald-100 border-2 border-emerald-600 rounded-xl p-2.5 text-center space-y-1">
          <p className="font-display font-bold text-sm text-emerald-800">
            🎉 You found 3 Smiles! Winner!
          </p>
          <button
            onClick={initGame}
            className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
          >
            Play Another Card
          </button>
        </div>
      ) : (
        <button
          onClick={initGame}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 font-medium pt-1"
        >
          <RefreshCw className="w-3 h-3" />
          <span>New Scratch Card</span>
        </button>
      )}

      {/* Signature corner JC */}
      <div className="w-full flex justify-end text-[11px] font-doodle text-zinc-400 font-bold pr-1 pt-1">
        PS 2026
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN ARCADE PAGE
───────────────────────────────────────────────────────────────────────────── */
export const Arcade: React.FC = () => {
  const [surpriseOpen, setSurpriseOpen] = useState<boolean>(false);
  const [surprisePrize, setSurprisePrize] = useState<string>('');

  const surprises = [
    '☕ You unlocked free virtual coffee! Keep building awesome things!',
    '🌟 High five! You have discovered the secret builder level.',
    '🚀 May your code run smoothly and your ideas ship fast!',
    '🎨 True craft is doing what feels playful and purposeful.',
    '🕹️ You are a certified Arcade Champion!',
  ];

  const handleSurpriseClick = () => {
    const random = surprises[Math.floor(Math.random() * surprises.length)];
    setSurprisePrize(random);
    setSurpriseOpen(true);
    triggerConfetti(0.85, 0.2);
  };

  return (
    <DoodleLayout>
      {/* ─────────────────────────────────────────────────────────────
          HEADER ROW WITH TOP-RIGHT SURPRISE BOX (Screenshot 3)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col sm:flex-row items-start justify-between gap-6 mb-10 sm:mb-12">
        {/* Headline */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-xl sm:text-2xl md:text-[28px] font-semibold text-zinc-900 leading-snug sm:leading-tight">
            Welcome to my arcade! This is where I design and code little games just for fun.
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-2 font-medium">
            Step right up! Everything here is interactive and made with code & love.
          </p>
        </div>

        {/* Top-Right Surprise Gift Box (Direct match to Screenshot 3) */}
        <div className="self-end sm:self-start flex flex-col items-center">
          {/* Speech bubble */}
          <div className="px-3 py-1 rounded-full bg-white border-2 border-zinc-900 text-xs font-bold text-zinc-800 shadow-xs mb-1.5 font-doodle">
            Click for a nice surprise!
          </div>

          {/* Yellow Mystery Box */}
          <button
            onClick={handleSurpriseClick}
            className="group relative focus:outline-none hover:scale-105 active:scale-95 transition-transform"
            title="Open surprise!"
          >
            <div className="w-16 h-14 bg-[#fef08a] border-2 border-zinc-900 rounded-xl shadow-md flex items-center justify-center relative overflow-hidden group-hover:bg-[#fde047]">
              {/* Ribbon */}
              <div className="w-full h-2.5 bg-amber-400 border-y border-zinc-900" />
              <div className="h-full w-2.5 bg-amber-400 border-x border-zinc-900 absolute" />
              <span className="absolute z-10 text-xl group-hover:animate-bounce">🎁</span>
            </div>
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          THE 3 ARCADE MACHINES (Direct match to Screenshot 3)
      ────────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-14">
        {/* Machine 1: The Claw Machine */}
        <div className="w-full flex justify-center">
          <ClawMachine />
        </div>

        {/* Machine 2: The Gumball Machine */}
        <div className="w-full flex justify-center">
          <GumballMachine />
        </div>

        {/* Machine 3: Scratch to Win */}
        <div className="w-full flex justify-center">
          <ScratchToWin />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          BONUS: RETRO CONSOLE (Mario, Tetris, Dino, etc.)
      ────────────────────────────────────────────────────────────── */}
      <section className="pt-6 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-xl">
            👾
          </div>
          <div>
            <h3 className="font-bold text-sm text-zinc-900">
              Want more classic retro console games?
            </h3>
            <p className="text-xs text-zinc-500">
              Check out the playable Mario, Tetris, Dino Run & Hextris web emulators!
            </p>
          </div>
        </div>

        <Link
          to="/playgames"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 transition-colors shadow-sm shrink-0"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Launch Retro Arcade</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SURPRISE MODAL
      ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {surpriseOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-full max-w-sm bg-white rounded-2xl border-2 border-zinc-900 p-6 text-center shadow-2xl space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-zinc-900 mx-auto flex items-center justify-center text-3xl shadow-sm animate-bounce">
                🎁
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Special Surprise!
                </span>
                <h3 className="text-lg font-extrabold text-zinc-900 font-display">
                  You Unlocked a Treat!
                </h3>
                <p className="text-sm text-zinc-700 font-doodle text-base leading-relaxed pt-2">
                  {surprisePrize}
                </p>
              </div>

              <button
                onClick={() => setSurpriseOpen(false)}
                className="w-full py-2.5 bg-[#fef08a] border-2 border-zinc-900 rounded-xl font-bold text-sm text-zinc-900 hover:bg-[#fde047] shadow-xs"
              >
                Yay, thank you! 🎉
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DoodleLayout>
  );
};

export default Arcade;
