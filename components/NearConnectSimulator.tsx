"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Compass, Users, MapPin, PhoneCall, MessageSquare, ShieldCheck, Sparkles, Radio, Wifi } from "lucide-react";

interface NearbyUser {
  id: string;
  name: string;
  role: string;
  distance: number; // in km
  x: number; // percentage offset X from center
  y: number; // percentage offset Y from center
  tags: string[];
  avatar: string;
  matchScore: number;
}

const mockUsers: NearbyUser[] = [
  { id: "1", name: "Zainab A.", role: "Senior UX Designer", distance: 1.2, x: 22, y: -28, tags: ["Flutter", "UI/UX", "Figma"], avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80", matchScore: 98 },
  { id: "2", name: "Ahmed K.", role: "AI Research Lead", distance: 3.5, x: -35, y: 18, tags: ["Python", "PyTorch", "AI"], avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", matchScore: 94 },
  { id: "3", name: "Fatima S.", role: "Full-Stack Engineer", distance: 6.8, x: 42, y: 48, tags: ["Supabase", "React", "PostGIS"], avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80", matchScore: 89 },
  { id: "4", name: "Hamza M.", role: "Mobile Architect", distance: 12.1, x: -52, y: -58, tags: ["Dart", "WebRTC", "Agora"], avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", matchScore: 85 },
  { id: "5", name: "Ayesha T.", role: "Cloud DevOps Lead", distance: 18.5, x: 15, y: 75, tags: ["Firebase", "AWS", "Docker"], avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", matchScore: 82 },
  { id: "6", name: "Bilal R.", role: "Backend Specialist", distance: 24.2, x: -70, y: -12, tags: ["Node.js", "GraphQL", "Redis"], avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80", matchScore: 78 },
];

export default function NearConnectSimulator() {
  const [radius, setRadius] = useState<number>(15); // max 30km
  const [selectedUserId, setSelectedUserId] = useState<string | null>("1");
  const [calling, setCalling] = useState<boolean>(false);

  const activeUsers = useMemo(
    () => mockUsers.filter((u) => u.distance <= radius),
    [radius]
  );

  const selectedUser = useMemo(
    () => mockUsers.find((u) => u.id === selectedUserId) || activeUsers[0] || null,
    [selectedUserId, activeUsers]
  );

  const [pinging, setPinging] = useState(true);

  // Periodic radar pulse effect
  useEffect(() => {
    const timer = setInterval(() => {
      setPinging((prev) => !prev);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleCall = () => {
    setCalling(true);
    setTimeout(() => {
      setCalling(false);
    }, 3000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#061411] text-white p-3.5 font-sans select-none justify-between border-t border-white/5 relative overflow-hidden">
      
      {/* Header inside phone screen */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 z-20">
        <div className="flex items-center space-x-1.5">
          <Radio className="w-4 h-4 text-emerald animate-pulse" />
          <span className="font-display font-bold text-xs tracking-wider text-white">Zync</span>
        </div>
        <div className="flex items-center space-x-1 bg-emerald/20 text-emerald border border-emerald/40 px-2 py-0.5 rounded-full text-[7.5px] font-bold shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-ping"></span>
          <span>POSTGIS RADAR LIVE</span>
        </div>
      </div>

      {/* Radar Graphic Area */}
      <div className="relative h-44 my-2 bg-[#091815] border border-white/15 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl shadow-emerald/10 group">
        
        {/* Radar Grid Circles & Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-12 h-12 rounded-full border border-white/40"></div>
          <div className="absolute w-28 h-28 rounded-full border border-white/30"></div>
          <div className="absolute w-44 h-44 rounded-full border border-white/20"></div>
          <div className="absolute w-full h-[1px] bg-white/20"></div>
          <div className="absolute h-full w-[1px] bg-white/20"></div>
        </div>

        {/* Rotating Radar Sweep Line */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-44 h-44 rounded-full overflow-hidden relative animate-spin-slow opacity-30">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-emerald via-emerald/20 to-transparent"></div>
          </div>
        </div>

        {/* Center Main User (Usbah) */}
        <div className="relative z-20 w-5 h-5 rounded-full bg-emerald border-2 border-white flex items-center justify-center shadow-lg shadow-emerald/50">
          <span className="absolute w-9 h-9 rounded-full bg-emerald/30 border border-emerald/50 animate-ping"></span>
          <span className="text-[7px] font-bold text-black">YOU</span>
        </div>

        {/* Dynamic Radius Visual Circle */}
        <div 
          className="absolute rounded-full border border-emerald/40 bg-emerald/[0.04] transition-all duration-300 ease-out z-10"
          style={{
            width: `${(radius / 30) * 100}%`,
            height: `${(radius / 30) * 100}%`,
            maxWidth: "94%",
            maxHeight: "94%",
          }}
        >
          <div className={`absolute inset-0 rounded-full bg-emerald/[0.05] transition-opacity duration-1000 ${pinging ? "opacity-100" : "opacity-20"}`}></div>
        </div>

        {/* Surrounding Users */}
        {mockUsers.map((u) => {
          const isActive = u.distance <= radius;
          const isSelected = selectedUser?.id === u.id;
          const scale = 0.40;
          const left = 50 + u.x * scale;
          const top = 50 + u.y * scale;

          return (
            <button
              key={u.id}
              onClick={() => {
                if (isActive) setSelectedUserId(u.id);
              }}
              disabled={!isActive}
              className="absolute z-20 transition-all duration-500 flex flex-col items-center group/btn"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div 
                className={`relative rounded-full transition-all duration-300 flex items-center justify-center overflow-hidden border-2 ${
                  !isActive 
                    ? "w-4 h-4 border-neutral-700 opacity-20 grayscale scale-75" 
                    : isSelected 
                    ? "w-7 h-7 border-ochre scale-125 shadow-lg shadow-ochre/50 z-30" 
                    : "w-5 h-5 border-emerald hover:scale-110 shadow-md"
                }`}
              >
                <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                {isSelected && (
                  <span className="absolute inset-0 border-2 border-ochre rounded-full animate-ping pointer-events-none"></span>
                )}
              </div>
              
              {isActive && (
                <span className={`text-[7px] font-sans mt-0.5 px-1 py-0.2 rounded font-bold transition-all ${
                  isSelected ? "text-black bg-ochre shadow-sm" : "text-white bg-black/80 border border-white/20"
                }`}>
                  {u.name.split(" ")[0]}
                </span>
              )}
            </button>
          );
        })}

        {/* Top & Bottom Latency HUD */}
        <div className="absolute top-2 left-3 right-3 flex justify-between text-[7px] font-mono text-white/50 pointer-events-none">
          <span>POSTGIS GEOMETRY INDEX</span>
          <span className="text-emerald">P2P MESH: ACTIVE</span>
        </div>
      </div>

      {/* Interactive WebRTC / Agora User Profile Connect Card */}
      {selectedUser && selectedUser.distance <= radius ? (
        <div className="bg-white/5 border border-white/15 p-2.5 rounded-xl space-y-2 z-20 shadow-lg transition-all animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={selectedUser.avatar} alt={selectedUser.name} className="w-9 h-9 rounded-full border border-emerald object-cover" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-white">{selectedUser.name}</span>
                  <span className="text-[7px] bg-emerald/20 text-emerald px-1 rounded border border-emerald/30 font-bold">
                    {selectedUser.matchScore}% MATCH
                  </span>
                </div>
                <p className="text-[8px] text-white/60">{selectedUser.role} · <strong className="text-ochre">{selectedUser.distance} km away</strong></p>
              </div>
            </div>
            <Wifi className="w-4 h-4 text-emerald animate-pulse" />
          </div>

          {/* Tags */}
          <div className="flex gap-1 flex-wrap">
            {selectedUser.tags.map((tag, idx) => (
              <span key={idx} className="text-[7px] bg-black/60 text-white/80 px-1.5 py-0.5 rounded border border-white/10">
                #{tag}
              </span>
            ))}
          </div>

          {/* Action CTA Buttons */}
          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            <button
              onClick={handleCall}
              disabled={calling}
              className="py-1.5 bg-emerald text-black text-[8.5px] font-bold rounded-lg border border-emerald hover:bg-emerald/90 transition-all flex items-center justify-center gap-1 shadow-md active:scale-95"
            >
              <PhoneCall className={`w-3 h-3 ${calling ? "animate-bounce" : ""}`} />
              <span>{calling ? "AGORA CALLING..." : "WEBRTC AUDIO"}</span>
            </button>
            <button
              onClick={() => alert(`Opened P2P encrypted chat with ${selectedUser.name}!`)}
              className="py-1.5 bg-white/10 text-white text-[8.5px] font-bold rounded-lg border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-1 active:scale-95"
            >
              <MessageSquare className="w-3 h-3 text-ochre" />
              <span>P2P CHAT</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-center text-[8.5px] text-white/50 font-sans">
          No user selected or out of range. Expand radius or tap an active avatar!
        </div>
      )}

      {/* Control Panel Slider */}
      <div className="space-y-1 bg-[#091a16] p-2 rounded-xl border border-white/10 z-20 mt-1">
        <div className="flex justify-between items-center text-[8.5px] font-sans">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-emerald" />
            <span className="text-white/70">PostGIS Geo-Radius:</span>
          </div>
          <span className="text-ochre font-bold font-sans">{radius.toFixed(1)} km</span>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min="2"
          max="30"
          step="0.5"
          value={radius}
          onChange={(e) => setRadius(parseFloat(e.target.value))}
          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald focus:outline-none"
          aria-label="Set geographic query radius"
        />

        <div className="flex justify-between items-center text-[7.5px] text-white/50 font-sans">
          <span>Min: 2km</span>
          <div className="flex items-center space-x-1">
            <Users className="w-2.5 h-2.5 text-emerald" />
            <span><strong className="text-white font-bold">{activeUsers.length}</strong> engineers nearby</span>
          </div>
          <span>Max: 30km</span>
        </div>
      </div>
    </div>
  );
}
