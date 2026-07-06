"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, FastForward, RotateCcw, Bell, Flame, Headphones, Sparkles, CheckCircle2, Zap, Trophy, Volume2 } from "lucide-react";

// Deterministic confetti particle configuration
const CONFETTI_PARTICLES = Array.from({ length: 24 }).map((_, i) => {
  const colors = ["bg-emerald", "bg-ochre", "bg-white"];
  return {
    id: i,
    left: (i * 17) % 100,
    size: (i * 7) % 6 + 4,
    delay: ((i * 13) % 20) / 10,
    color: colors[i % colors.length],
  };
});

type FocusTask = {
  id: string;
  name: string;
  durationMins: number;
  color: string;
  icon: string;
};

const TASKS: FocusTask[] = [
  { id: "code", name: "Deep Coding (Flutter)", durationMins: 25, color: "text-emerald border-emerald/50 bg-emerald/10", icon: "🔥" },
  { id: "ai", name: "AI System Design", durationMins: 45, color: "text-ochre border-ochre/50 bg-ochre/10", icon: "🧠" },
  { id: "sprint", name: "Quick Bug Fix Sprint", durationMins: 15, color: "text-amber-400 border-amber-400/50 bg-amber-400/10", icon: "⚡" },
];

export default function FocusFlowSimulator() {
  const [selectedTask, setSelectedTask] = useState<FocusTask>(TASKS[0]);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFastForward, setIsFastForward] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [notified, setNotified] = useState(false);
  const [streak, setStreak] = useState(14);
  const [completedToday, setCompletedToday] = useState(3);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTaskChange = (task: FocusTask) => {
    if (isRunning) return; // Prevent switching while timer runs
    setSelectedTask(task);
    setSecondsLeft(task.durationMins * 60);
    setShowConfetti(false);
    setNotified(false);
  };

  // Core countdown logic
  useEffect(() => {
    if (isRunning) {
      const intervalSpeed = isFastForward ? 25 : 1000;
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            setIsFastForward(false);
            setShowConfetti(true);
            setNotified(true);
            setCompletedToday((c) => c + 1);
            setStreak((s) => s + 1);
            return 0;
          }
          return prev - 1;
        });
      }, intervalSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isFastForward]);

  const handleStartStop = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(selectedTask.durationMins * 60);
      setShowConfetti(false);
      setNotified(false);
    }
    setIsRunning(!isRunning);
  };

  const handleFastForward = () => {
    if (!isRunning) setIsRunning(true);
    setIsFastForward(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFastForward(false);
    setSecondsLeft(selectedTask.durationMins * 60);
    setShowConfetti(false);
    setNotified(false);
  };

  const formatTime = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const totalSeconds = selectedTask.durationMins * 60;
  const progressPercent = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <div className="flex-1 flex flex-col bg-[#081411] text-white p-4 font-sans select-none justify-between relative overflow-hidden border-t border-white/5">
      {/* Dynamic Confetti Particle Effects */}
      {showConfetti && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {CONFETTI_PARTICLES.map((p) => (
            <div
              key={p.id}
              className={`absolute rounded-sm ${p.color}`}
              style={{
                left: `${p.left}%`,
                top: `-20px`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: 0.8,
                animation: `fall 3s linear infinite`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header inside phone screen */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 z-20">
        <div className="flex items-center space-x-1.5">
          <Flame className="w-4 h-4 text-ochre animate-bounce" />
          <span className="font-display font-bold text-xs tracking-wider text-white">FocusFlow</span>
        </div>
        <div className="flex items-center space-x-1 bg-white/10 text-emerald px-2 py-0.5 rounded-full text-[7.5px] font-bold border border-white/10 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse"></span>
          <span>HIVE DB SYNCED</span>
        </div>
      </div>

      {/* Local Notification banner */}
      {notified && (
        <div className="absolute top-10 inset-x-2 bg-emerald text-black p-2.5 rounded-xl border border-emerald shadow-2xl z-30 animate-slide-down flex items-start space-x-2">
          <Trophy className="w-4 h-4 text-black shrink-0 mt-0.5" />
          <div className="text-[8.5px] font-sans leading-tight">
            <span className="font-bold text-black">Focus Sprint Finished! 🎉</span>
            <p className="text-black/80 mt-0.5">+{selectedTask.durationMins} mins added to your daily streak! Isolate alarm triggered.</p>
          </div>
        </div>
      )}

      {/* Interactive Task Selector Pills */}
      <div className="my-1.5 z-20">
        <div className="flex justify-between items-center text-[7.5px] font-bold text-white/50 uppercase tracking-widest mb-1">
          <span>Select Focus Sprint</span>
          <span className="text-ochre flex items-center gap-0.5">
            <Flame className="w-2.5 h-2.5 fill-ochre" />
            <span>{streak} Day Streak</span>
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {TASKS.map((t) => {
            const isSelected = selectedTask.id === t.id;
            return (
              <button
                key={t.id}
                disabled={isRunning}
                onClick={() => handleTaskChange(t)}
                className={`py-1 px-1 rounded-lg border text-[8px] font-bold flex flex-col items-center justify-center transition-all ${
                  isSelected 
                    ? `${t.color} shadow-md scale-105` 
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span className="text-[10px]">{t.icon}</span>
                <span className="truncate w-full text-center mt-0.5">{t.durationMins}m Sprint</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timer Circle Graphical Layout with Ambient Audio Waves */}
      <div className="flex-1 my-2 flex flex-col items-center justify-center relative z-20">
        
        {/* Ambient Lofi Equalizer Sound Waves (visible when running) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 rounded-full border border-emerald/20 animate-ping opacity-20"></div>
          {isRunning && (
            <div className="absolute -bottom-2 flex items-end gap-1 h-6 opacity-60">
              {[40, 80, 50, 100, 60, 90, 45, 75].map((h, idx) => (
                <div 
                  key={idx} 
                  className="w-1 bg-emerald rounded-full transition-all duration-300 animate-pulse"
                  style={{ height: `${h}%`, animationDelay: `${idx * 150}ms` }}
                ></div>
              ))}
            </div>
          )}
        </div>

        {/* Glowing Progress Circle */}
        <div className={`relative w-36 h-36 flex items-center justify-center rounded-full border-2 transition-all duration-500 ${
          isRunning ? "border-emerald/40 bg-[#0c221b] shadow-2xl shadow-emerald/20 scale-105" : "border-white/10 bg-[#0a1814]"
        }`}>
          {/* Pure SVG Circle Progress Loader */}
          <svg className="w-full h-full transform -rotate-90 absolute">
            <circle
              cx="72"
              cy="72"
              r="64"
              className="text-white/5"
              strokeWidth="5"
              fill="transparent"
              stroke="currentColor"
            />
            <circle
              cx="72"
              cy="72"
              r="64"
              className="text-emerald transition-all duration-300"
              strokeWidth="5"
              strokeDasharray={2 * Math.PI * 64}
              strokeDashoffset={2 * Math.PI * 64 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              fill="transparent"
              stroke="currentColor"
            />
          </svg>

          {/* Time digits text */}
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-bold text-emerald uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <Volume2 className={`w-2.5 h-2.5 ${isRunning ? "animate-bounce text-ochre" : "text-white/40"}`} />
              <span>{isRunning ? "Lofi Beats 432Hz" : "Ready"}</span>
            </span>
            <span className="text-3xl font-display font-bold tracking-tight text-white select-all leading-none">
              {formatTime()}
            </span>
            <span className="text-[7.5px] font-sans font-bold tracking-widest text-white/50 uppercase mt-1 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
              {isRunning ? "🔥 SPRINT ACTIVE" : "⏸ PAUSED"}
            </span>
          </div>
        </div>
      </div>

      {/* Daily Progress Stats Bar */}
      <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl flex justify-between items-center text-[8px] font-sans mb-2 z-20">
        <div className="flex items-center gap-1 text-white/70">
          <CheckCircle2 className="w-3 h-3 text-emerald" />
          <span>Today&apos;s Sprints: <strong className="text-white font-bold">{completedToday}/8</strong></span>
        </div>
        <div className="flex items-center gap-1 text-ochre font-bold">
          <Zap className="w-3 h-3 fill-ochre" />
          <span>Background Alarm Isolate</span>
        </div>
      </div>

      {/* Navigation / controls triggers */}
      <div className="space-y-2 bg-[#0c1d19] p-2.5 rounded-xl border border-white/10 z-20 shadow-lg">
        <div className="flex justify-around items-center">
          <button
            onClick={handleReset}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all active:scale-95"
            title="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleStartStop}
            className={`px-6 py-2.5 rounded-full text-black font-bold font-sans text-[10px] flex items-center justify-center gap-1.5 shadow-xl transition-all active:scale-95 ${
              isRunning 
                ? "bg-ochre hover:bg-amber-400 shadow-ochre/20 animate-pulse" 
                : "bg-emerald hover:bg-emerald/90 shadow-emerald/20"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>PAUSE SPRINT</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>START SPRINT</span>
              </>
            )}
          </button>

          <button
            disabled={!isRunning || secondsLeft === 0}
            onClick={handleFastForward}
            className={`p-2 rounded-full transition-all active:scale-95 ${
              isRunning && secondsLeft > 0
                ? "text-ochre hover:bg-white/10 cursor-pointer animate-pulse"
                : "text-white/20 cursor-not-allowed"
            }`}
            title="Fast forward (Simulate count-down)"
          >
            <FastForward className="w-4 h-4 fill-current" />
          </button>
        </div>

        <div className="text-[7.5px] font-mono text-center text-white/40 flex justify-between items-center px-1">
          <span>FLUTTER ISOLATE: {isRunning ? "RUNNING (PID: 9024)" : "SUSPENDED"}</span>
          <span className="text-emerald">⚡ 100% BATTERY OPTIMIZED</span>
        </div>
      </div>
    </div>
  );
}
