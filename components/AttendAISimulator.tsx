"use client";

import React, { useState, useEffect } from "react";
import { Camera, RefreshCw, Database, ScanFace, CheckCircle2, UserCheck, ShieldCheck, Cpu, Sparkles } from "lucide-react";

type ScanState = "idle" | "scanning" | "processing" | "success" | "offline";

export default function AttendAISimulator() {
  const [state, setState] = useState<ScanState>("idle");
  const [log, setLog] = useState<string>("SYSTEM READY");
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    if (state === "scanning" || state === "processing") return;
    setState("scanning");
    setLog("MTCNN: DETECTING BIOMETRIC LANDMARKS...");
    setProgress(0);
  };

  // Simulate scanning & processing steps
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state === "scanning") {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            setState("processing");
            setLog("INCEPTION RESNET: EXTRACTING 128-D VECTORS...");
            return 100;
          }
          return p + 10;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
    if (state === "processing") {
      const timer = setTimeout(() => {
        setState("success");
        setLog("SQLITE: ATTENDANCE LOG SYNCED (ONLINE)");
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const resetScanner = () => {
    setState("idle");
    setLog("SYSTEM READY");
    setProgress(0);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0F1110] text-[#E0E0E0] p-4 font-sans select-none justify-between border-t border-white/5">
      {/* Header inside phone screen */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-1.5">
          <ScanFace className="w-4 h-4 text-emerald animate-pulse" />
          <span className="font-display font-bold text-xs tracking-wider text-white">AttendAI</span>
        </div>
        <div className="flex items-center space-x-1 text-[8px] bg-emerald/15 text-emerald px-2 py-0.5 rounded-full border border-emerald/40 font-bold shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-ping"></span>
          <span>99.8% ACCURACY</span>
        </div>
      </div>

      {/* Camera Simulator Area with Real Photo & HUD */}
      <div className="relative flex-1 my-2 bg-black border border-white/15 rounded-2xl overflow-hidden flex flex-col items-center justify-center shadow-2xl shadow-emerald/10 group">
        
        {/* Background Portrait Photo */}
        <div className="absolute inset-0 opacity-80 group-hover:scale-105 transition-transform duration-700">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" 
            alt="Student Biometric Scan" 
            className="w-full h-full object-cover filter contrast-125 brightness-90"
          />
          {/* Dark gradient overlay for HUD contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60"></div>
        </div>

        {/* Camera Reticle Corners */}
        <div className="absolute inset-3 border border-white/10 pointer-events-none rounded-xl">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald"></div>
        </div>

        {/* Top HUD Specs */}
        <div className="absolute top-4 left-5 right-5 flex justify-between items-center text-[7px] font-mono text-emerald/80 tracking-widest">
          <span>MTCNN v2.4 · 68 POINTS</span>
          <span>[FPS: 60.0]</span>
        </div>

        {/* Facial Bounding Box HUD */}
        <div className={`relative w-36 h-36 border-2 rounded-xl flex items-center justify-center backdrop-blur-[1px] transition-all duration-300 ${
          state === "success" 
            ? "border-emerald bg-emerald/10 shadow-lg shadow-emerald/30 scale-105" 
            : state === "scanning" 
            ? "border-ochre bg-ochre/10 animate-pulse" 
            : "border-white/30 bg-black/20"
        }`}>
          
          {/* Face Center Target Crosshair */}
          <div className="absolute w-6 h-6 border border-white/20 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-emerald rounded-full"></div>
          </div>

          {/* Biometric Coordinates overlay */}
          <span className="absolute -top-3.5 left-2 text-[7px] font-mono bg-black/80 px-1 text-white border border-white/20 rounded">
            {state === "success" ? "ID: #FA21-BCS-089" : "X:142 Y:88 W:180"}
          </span>

          {/* Animated Laser Scanning Bar */}
          {state === "scanning" && (
            <div 
              className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-ochre to-transparent shadow-lg shadow-ochre transition-all duration-100"
              style={{ top: `${progress}%` }}
            ></div>
          )}

          {/* Success Badge Inside Box */}
          {state === "success" && (
            <div className="absolute -bottom-4 bg-emerald text-black font-bold text-[8px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-lg animate-bounce">
              <UserCheck className="w-3 h-3" />
              <span>USBAH SALEEM · VERIFIED</span>
            </div>
          )}
        </div>

        {/* Bottom HUD Specs */}
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[7px] font-mono text-white/60">
          <div className="flex items-center gap-1">
            <Database className="w-3 h-3 text-emerald" />
            <span>SQLITE_OFFLINE_SYNC</span>
          </div>
          <span className="text-ochre font-bold">LATENCY: 142ms</span>
        </div>
      </div>

      {/* Interactive Controls / Log Output */}
      <div className="space-y-2.5">
        {/* Cyberpunk Log Viewer */}
        <div className="bg-black/90 border border-white/10 p-2.5 rounded-xl text-[8.5px] font-mono space-y-1 shadow-inner">
          <div className="flex justify-between text-white/40 text-[7.5px] border-b border-white/5 pb-1">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-emerald" />
              <span>PYTORCH ENGINE LOGS</span>
            </span>
            <span className="text-emerald font-bold">STATUS: OK</span>
          </div>
          <div className="text-ochre font-bold animate-pulse">&gt; {log}</div>
          
          {state === "scanning" && (
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-1">
              <div className="bg-gradient-to-r from-ochre to-emerald h-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          {state === "success" && (
            <div className="text-emerald text-[7.5px] leading-relaxed pt-0.5 border-t border-white/5">
              &gt; Cosine Similarity: <strong className="text-white font-bold">0.984 (High Match)</strong><br />
              &gt; Identity: <strong className="text-white font-bold">Usbah Saleem</strong> · 7th Semester<br />
              &gt; SQLite local sync &amp; server backup: <strong className="text-emerald">SUCCESS</strong>
            </div>
          )}
        </div>

        {/* Button triggers */}
        {state === "idle" && (
          <button
            onClick={startScan}
            className="w-full py-2.5 bg-emerald text-black text-[10px] font-bold font-sans rounded-xl border border-emerald/50 hover:bg-emerald/90 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald/20 active:scale-95 animate-pulse"
          >
            <ScanFace className="w-3.5 h-3.5" />
            <span>TRIGGER BIOMETRIC SCAN</span>
          </button>
        )}

        {(state === "scanning" || state === "processing") && (
          <button
            disabled
            className="w-full py-2.5 bg-neutral-800 text-neutral-400 text-[10px] font-bold font-sans rounded-xl border border-neutral-700 flex items-center justify-center gap-1.5 cursor-wait"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-ochre" />
            <span>{state === "scanning" ? "SCANNING LANDMARKS..." : "MATCHING VECTORS..."}</span>
          </button>
        )}

        {state === "success" && (
          <button
            onClick={resetScanner}
            className="w-full py-2.5 bg-white/10 text-white text-[10px] font-bold font-sans rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>SCAN ANOTHER ATTENDEE</span>
          </button>
        )}
      </div>
    </div>
  );
}
