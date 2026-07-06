"use client";

import React, { useEffect, useState } from "react";
import { Wifi, Battery, Signal } from "lucide-react";

interface PhoneFrameProps {
  children: React.ReactNode;
  appName: string;
}

export default function PhoneFrame({ children, appName }: PhoneFrameProps) {
  const [time, setTime] = useState("09:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative mx-auto w-[280px] h-[550px] bg-paper border border-ink/10 rounded-[36px] shadow-2xl shadow-ink/10 flex flex-col overflow-hidden select-none"
      aria-label={`Interactive simulator for ${appName}`}
    >
      {/* Top Speaker and Camera Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[18px] bg-ink rounded-b-xl z-30 flex items-center justify-center">
        {/* Speaker line */}
        <div className="w-10 h-[3px] bg-neutral-700 rounded-full mr-2"></div>
        {/* Camera dot */}
        <div className="w-[6px] h-[6px] bg-neutral-800 rounded-full border border-neutral-700"></div>
      </div>
      
      {/* iOS-style Status Bar */}
      <div className="h-7 bg-paper text-ink px-6 pt-2 flex justify-between items-center text-[10px] font-sans z-20">
        <span className="font-semibold select-none">{time}</span>
        <div className="flex items-center space-x-1 select-none">
          <Signal className="w-2.5 h-2.5 text-ink" strokeWidth={2.5} />
          <Wifi className="w-2.5 h-2.5 text-ink" strokeWidth={2.5} />
          <Battery className="w-3.5 h-3.5 text-ink" strokeWidth={2} />
        </div>
      </div>

      {/* Simulator Viewport */}
      <div className="flex-1 relative overflow-hidden flex flex-col bg-white">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="h-3 bg-paper flex items-center justify-center z-20 pb-1">
        <div className="w-24 h-1 bg-ink rounded-full opacity-60"></div>
      </div>
    </div>
  );
}
