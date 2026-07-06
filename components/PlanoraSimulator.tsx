"use client";

import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Users, 
  Store, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Activity, 
  QrCode,
  Sparkles,
  DollarSign,
  Award,
  Zap,
  BarChart3
} from "lucide-react";

type Role = "attendee" | "organizer" | "vendor" | "admin";

export default function PlanoraSimulator() {
  const [activeRole, setActiveRole] = useState<Role>("attendee");
  const [ticketBooked, setTicketBooked] = useState(false);
  const [liveRevenue, setLiveRevenue] = useState(14250);
  const [checkInCount, setCheckInCount] = useState(342);
  const [vendorApproved, setVendorApproved] = useState(true);
  const [scanningQr, setScanningQr] = useState(false);

  // Simulate real-time Firebase database pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRevenue((prev) => prev + (Math.random() > 0.6 ? 150 : 0));
      setCheckInCount((prev) => (prev < 400 && Math.random() > 0.5 ? prev + 1 : prev));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleQrScan = () => {
    setScanningQr(true);
    setTimeout(() => {
      setScanningQr(false);
      setTicketBooked(true);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#08100D] text-white p-3.5 font-sans select-none justify-between border-t border-white/10 relative overflow-hidden">
      
      {/* Top Bar inside mobile frame */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 z-20">
        <div className="flex items-center space-x-1.5">
          <div className="w-5 h-5 rounded-md bg-emerald/20 flex items-center justify-center border border-emerald/50 shadow-sm shadow-emerald/20">
            <Sparkles className="w-3 h-3 text-emerald animate-spin-slow" />
          </div>
          <span className="font-display font-bold text-xs tracking-wide text-white">Planora</span>
        </div>
        <div className="flex items-center space-x-1 bg-emerald/20 border border-emerald/40 text-emerald px-2 py-0.5 rounded-full text-[7.5px] font-bold tracking-wider shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-ping"></span>
          <span>4-ROLE FIREBASE SYSTEM</span>
        </div>
      </div>

      {/* Role Switcher Tabs with unique role accent colors */}
      <div className="grid grid-cols-4 gap-1 my-2 bg-white/5 p-1 rounded-xl border border-white/10 z-20 shadow-inner">
        {(["attendee", "organizer", "vendor", "admin"] as Role[]).map((role) => {
          const isActive = activeRole === role;
          let activeClass = "bg-emerald text-black font-bold shadow-lg shadow-emerald/20 scale-105";
          if (role === "organizer") activeClass = "bg-ochre text-black font-bold shadow-lg shadow-ochre/20 scale-105";
          if (role === "vendor") activeClass = "bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/20 scale-105";
          if (role === "admin") activeClass = "bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/20 scale-105";

          return (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`py-1.5 rounded-lg text-[9px] font-sans capitalize transition-all flex flex-col items-center justify-center gap-0.5 ${
                isActive 
                  ? activeClass 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {role === "attendee" && <Users className="w-3 h-3" />}
              {role === "organizer" && <TrendingUp className="w-3 h-3" />}
              {role === "vendor" && <Store className="w-3 h-3" />}
              {role === "admin" && <ShieldCheck className="w-3 h-3" />}
              <span className="truncate w-full text-center">{role}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Role Dashboard Content */}
      <div className="flex-1 flex flex-col justify-center my-1 z-20">
        
        {/* ROLE 1: ATTENDEE */}
        {activeRole === "attendee" && (
          <div className="space-y-2.5 animate-fadeIn">
            {/* Event Banner Card with Real Photo */}
            <div className="bg-[#0c1a16] border border-white/15 rounded-2xl overflow-hidden shadow-xl group">
              <div className="relative h-24 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80" 
                  alt="Conference Auditorium" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a16] via-[#0c1a16]/40 to-transparent"></div>
                <span className="absolute top-2 left-2 text-[7px] font-bold uppercase tracking-widest text-black bg-emerald px-2 py-0.5 rounded-full shadow-md">
                  🔥 Featured Summit
                </span>
                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                  <div>
                    <h4 className="font-display font-bold text-sm text-white leading-tight">
                      AI &amp; Cyber Security 2026
                    </h4>
                    <p className="text-[9px] text-white/70">Main Auditorium · COMSATS</p>
                  </div>
                  <div className="text-right bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-lg border border-white/10">
                    <span className="text-xs font-bold text-emerald">$45.00</span>
                    <span className="block text-[7px] text-white/60">VIP Pass</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-2.5 flex items-center justify-between bg-white/5">
                <div className="flex items-center space-x-1.5 text-[9.5px] text-white/80">
                  <QrCode className={`w-4 h-4 text-emerald ${scanningQr ? "animate-spin" : ""}`} />
                  <span>{scanningQr ? "Scanning NFC..." : "Instant NFC Check-in"}</span>
                </div>
                <button
                  onClick={handleQrScan}
                  disabled={scanningQr}
                  className={`px-3 py-1.5 rounded-xl text-[9.5px] font-bold transition-all flex items-center gap-1 shadow-md active:scale-95 ${
                    ticketBooked
                      ? "bg-emerald/20 text-emerald border border-emerald/50"
                      : "bg-emerald text-black hover:bg-emerald/90 shadow-emerald/20"
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{ticketBooked ? "Pass Secured ✓" : "Book VIP Pass"}</span>
                </button>
              </div>
            </div>

            {/* Digital Wallet Pill */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center justify-between shadow-inner">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-emerald/20 border border-emerald/40 flex items-center justify-center">
                  <Award className="w-3.5 h-3.5 text-emerald" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-white">My Digital Wallet</div>
                  <div className="text-[8px] text-white/60">2 Active NFC Event Passes Synced</div>
                </div>
              </div>
              <span className="text-[8.5px] font-bold text-ochre hover:underline cursor-pointer">View Passes ➔</span>
            </div>
          </div>
        )}

        {/* ROLE 2: ORGANIZER */}
        {activeRole === "organizer" && (
          <div className="space-y-2.5 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 border border-ochre/30 rounded-xl p-2.5 shadow-lg shadow-ochre/5 relative overflow-hidden">
                <div className="flex items-center justify-between text-white/60 mb-1 text-[8.5px]">
                  <span className="uppercase font-bold tracking-wider">Live Revenue</span>
                  <DollarSign className="w-3.5 h-3.5 text-ochre" />
                </div>
                <div className="font-display font-bold text-base text-ochre">
                  ${liveRevenue.toLocaleString()}
                </div>
                <div className="text-[7.5px] text-emerald font-bold mt-0.5 flex items-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5" />
                  <span>↑ 18% vs last sprint</span>
                </div>
                {/* Mini background chart bars */}
                <div className="absolute -bottom-1 right-1 flex items-end gap-0.5 opacity-20">
                  <div className="w-1.5 h-4 bg-ochre rounded-t"></div>
                  <div className="w-1.5 h-6 bg-ochre rounded-t"></div>
                  <div className="w-1.5 h-8 bg-ochre rounded-t"></div>
                  <div className="w-1.5 h-10 bg-ochre rounded-t"></div>
                </div>
              </div>

              <div className="bg-white/5 border border-emerald/30 rounded-xl p-2.5 shadow-lg shadow-emerald/5">
                <div className="flex items-center justify-between text-white/60 mb-1 text-[8.5px]">
                  <span className="uppercase font-bold tracking-wider">Check-in Rate</span>
                  <Activity className="w-3.5 h-3.5 text-emerald" />
                </div>
                <div className="font-display font-bold text-base text-white">
                  {checkInCount} <span className="text-[10px] text-white/40 font-sans">/ 400</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="bg-emerald h-full transition-all duration-500 shadow-sm" 
                    style={{ width: `${(checkInCount / 400) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 space-y-1.5 shadow-inner">
              <div className="flex items-center justify-between text-[9.5px]">
                <span className="font-bold text-white flex items-center gap-1">
                  <Zap className="w-3 h-3 text-ochre fill-ochre" />
                  <span>Real-Time Firebase Sync</span>
                </span>
                <span className="text-[8px] bg-emerald/20 text-emerald border border-emerald/40 px-1.5 py-0.2 rounded font-bold animate-pulse">
                  ● ACTIVE SPRINT
                </span>
              </div>
              <div className="text-[9px] text-white/70 leading-relaxed">
                Organizer dashboard syncs live ticket sales and gate NFC scans across all 4 role nodes without page refresh.
              </div>
            </div>
          </div>
        )}

        {/* ROLE 3: VENDOR */}
        {activeRole === "vendor" && (
          <div className="space-y-2.5 animate-fadeIn">
            <div className="bg-white/5 border border-amber-400/30 rounded-2xl p-3 space-y-2 shadow-xl shadow-amber-400/5">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <div className="flex items-center space-x-1.5">
                  <Store className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-xs text-white">Booth A-12 (Tech Catering)</span>
                </div>
                <span className="px-2 py-0.5 bg-amber-400/20 text-amber-400 border border-amber-400/40 text-[7.5px] font-bold rounded-full">
                  {vendorApproved ? "Contract Approved ✓" : "Pending Review"}
                </span>
              </div>

              <div className="space-y-1 text-[9.5px] bg-black/40 p-2 rounded-xl border border-white/5">
                <div className="flex justify-between text-white/70">
                  <span>Assigned Zone:</span>
                  <strong className="text-white">North Wing VIP Lounge</strong>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Equipment Rental:</span>
                  <strong className="text-white">4x AV Displays, 200W Sound</strong>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Logistics Status:</span>
                  <strong className="text-emerald">Dispatched for Setup ✓</strong>
                </div>
              </div>

              <button
                onClick={() => setVendorApproved(!vendorApproved)}
                className="w-full py-2 bg-amber-400 text-black hover:bg-amber-300 rounded-xl text-[9.5px] font-bold transition-all shadow-md active:scale-95"
              >
                {vendorApproved ? "Request Additional Power Rig ➔" : "Submit Compliance Docs"}
              </button>
            </div>
          </div>
        )}

        {/* ROLE 4: ADMIN */}
        {activeRole === "admin" && (
          <div className="space-y-2.5 animate-fadeIn">
            <div className="bg-white/5 border border-rose-500/30 rounded-2xl p-3 space-y-2 shadow-xl shadow-rose-500/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                  <span>Platform Security Audit</span>
                </span>
                <span className="text-[8px] bg-rose-500/20 text-rose-400 border border-rose-500/40 px-2 py-0.5 rounded-full font-bold">
                  100% SECURE
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-0.5 text-[9px]">
                <div className="bg-black/50 p-2 rounded-xl border border-white/5">
                  <div className="text-white/50">Auth Providers</div>
                  <div className="font-bold text-white mt-0.5">Firebase JWT + RBAC</div>
                </div>
                <div className="bg-black/50 p-2 rounded-xl border border-white/5">
                  <div className="text-white/50">Database Latency</div>
                  <div className="font-bold text-emerald mt-0.5">14ms (Realtime DB)</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center justify-between text-[9.5px]">
              <div className="flex items-center space-x-1.5 text-white/80">
                <BarChart3 className="w-3.5 h-3.5 text-ochre" />
                <span>4-Node Multi-Tenant Cluster</span>
              </div>
              <span className="text-emerald font-mono text-[8.5px] font-bold">v2.4.0-PROD</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer info inside phone */}
      <div className="mt-1 pt-1.5 border-t border-white/10 flex items-center justify-between text-[8.5px] text-white/50 font-sans z-20">
        <span>Tap tabs above to test 4 roles</span>
        <span className="text-emerald font-bold">Flutter + Firebase</span>
      </div>
    </div>
  );
}
