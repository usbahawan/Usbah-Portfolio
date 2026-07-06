"use client";

import React, { useState, useEffect } from "react";
import { Ticket, RefreshCw, Info } from "lucide-react";

type SeatState = "available" | "selected" | "booked";

interface Seat {
  id: string;
  name: string;
  state: SeatState;
}

export default function EventGoSimulator() {
  const [seats, setSeats] = useState<Seat[]>(() => {
    const initSeats: Seat[] = [];
    const rows = ["A", "B", "C", "D"];
    for (let r = 0; r < 4; r++) {
      for (let s = 1; s <= 4; s++) {
        const id = `${rows[r]}${s}`;
        const isBooked = (r === 0 && s === 2) || (r === 1 && s === 4) || (r === 2 && s === 1) || (r === 3 && s === 3);
        initSeats.push({ id, name: id, state: isBooked ? "booked" : "available" });
      }
    }
    return initSeats;
  });
  const [liveReservationsCount, setLiveReservationsCount] = useState(12);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [ticketIssued, setTicketIssued] = useState(false);

  // Simulate REST polling updates changing booking count
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveReservationsCount((prev) => {
        // fluctuate booked seats count slightly
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next >= 16 ? 15 : next <= 6 ? 7 : next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSeatClick = (seatId: string) => {
    if (ticketIssued) return;
    
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id === seatId) {
          if (s.state === "booked") return s;
          if (s.state === "selected") {
            setSelectedSeat(null);
            return { ...s, state: "available" };
          }
          // Unselect previous selection first
          setSelectedSeat(seatId);
          return { ...s, state: "selected" };
        }
        // If another seat was selected, reset it to available
        if (s.state === "selected") {
          return { ...s, state: "available" };
        }
        return s;
      })
    );
  };

  const handleBookTicket = () => {
    if (!selectedSeat) return;
    setTicketIssued(true);
  };

  const handleReset = () => {
    setTicketIssued(false);
    setSelectedSeat(null);
    setSeats((prev) =>
      prev.map((s) => (s.state === "selected" ? { ...s, state: "available" } : s))
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-paper text-ink p-4 font-sans select-none justify-between border-t border-ink/5">
      {/* Header inside phone screen */}
      <div className="flex items-center justify-between border-b border-ink/10 pb-2">
        <div className="flex items-center space-x-1.5">
          <Ticket className="w-4 h-4 text-emerald" />
          <span className="font-display font-semibold text-xs tracking-wide">EventGo</span>
        </div>
        <div className="flex items-center space-x-1 bg-ink text-paper px-1.5 py-0.5 rounded text-[8px] font-sans">
          <span className="w-1 h-1 rounded-full bg-emerald animate-ping"></span>
          <span>LIVE REGISTER</span>
        </div>
      </div>

      {/* Main Seat booking view */}
      <div className="flex-1 my-3 flex flex-col justify-center">
        {!ticketIssued ? (
          <div className="space-y-4">
            {/* Screen indicator line */}
            <div className="text-center">
              <div className="w-4/5 h-[3px] bg-ink/20 mx-auto rounded-full"></div>
              <span className="text-[7px] font-sans uppercase tracking-widest text-ink/40">CDS STAGE</span>
            </div>

            {/* Seat Grid Layout */}
            <div className="grid grid-cols-4 gap-2.5 max-w-[190px] mx-auto">
              {seats.map((seat) => {
                let bgClass = "bg-white border-ink/20 hover:border-emerald hover:shadow-sm text-ink";
                if (seat.state === "booked") bgClass = "bg-ochre/20 text-ochre border border-ochre/40 font-bold cursor-not-allowed shadow-sm";
                if (seat.state === "selected") bgClass = "bg-emerald text-white border-emerald shadow-md shadow-emerald/30 scale-105 font-bold";

                return (
                  <button
                    key={seat.id}
                    disabled={seat.state === "booked"}
                    onClick={() => handleSeatClick(seat.id)}
                    className={`w-9 h-9 border rounded-lg flex items-center justify-center text-[10px] font-sans font-bold transition-all duration-300 ${bgClass}`}
                    aria-label={`Seat ${seat.name}`}
                  >
                    {seat.name}
                  </button>
                );
              })}
            </div>

            {/* Seat Legends */}
            <div className="flex justify-center space-x-3 text-[8px] font-sans font-bold text-ink/70">
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 bg-white border border-ink/20 rounded"></span>
                <span>Free</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 bg-emerald border border-emerald rounded"></span>
                <span>Select</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 bg-ochre/20 border border-ochre/40 rounded"></span>
                <span className="text-ochre">VIP / Reserved</span>
              </div>
            </div>
          </div>
        ) : (
          /* Ticket output receipt with CSS QR code */
          <div className="bg-white border border-ink/15 p-3 rounded-xl shadow-lg shadow-ink/5 space-y-3 animate-fade-in">
            <div className="border-b border-dashed border-ink/10 pb-2 text-center">
              <h4 className="font-display font-semibold text-[10px]">CDS ANNUAL SUMMIT</h4>
              <p className="text-[7.5px] text-ink/50 font-sans mt-0.5 uppercase">COMSATS Islamabad</p>
            </div>

            {/* Simulated QR Code SVG */}
            <div className="w-24 h-24 mx-auto bg-paper/30 border border-ink/10 rounded-lg p-2 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-ink">
                {/* Outer bounding box */}
                <rect x="0" y="0" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="75" y="0" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="0" y="75" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                {/* Random QR code pixels blocky pattern */}
                <rect x="35" y="10" width="10" height="10" fill="currentColor" />
                <rect x="55" y="0" width="10" height="15" fill="currentColor" />
                <rect x="10" y="35" width="15" height="10" fill="currentColor" />
                <rect x="40" y="40" width="20" height="20" fill="currentColor" />
                <rect x="70" y="35" width="10" height="10" fill="currentColor" />
                <rect x="10" y="55" width="15" height="10" fill="currentColor" />
                <rect x="50" y="70" width="15" height="15" fill="currentColor" />
                <rect x="75" y="60" width="10" height="10" fill="currentColor" />
              </svg>
            </div>

            <div className="bg-paper/35 p-2 rounded text-[8px] font-sans space-y-1">
              <div className="flex justify-between">
                <span>TICKET CODE:</span>
                <span className="font-bold text-ink">#CDS-{selectedSeat}-92A</span>
              </div>
              <div className="flex justify-between">
                <span>SEAT UNIT:</span>
                <span className="font-bold text-emerald">{selectedSeat}</span>
              </div>
              <div className="flex justify-between">
                <span>STATUS:</span>
                <span className="text-emerald font-bold">CONFIRMED</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-1.5 bg-ink text-paper text-[8px] font-sans font-bold rounded hover:bg-emerald transition-all"
            >
              CANCEL TICKET
            </button>
          </div>
        )}
      </div>

      {/* Dynamic CTAs / Polling Stats */}
      <div className="space-y-2 bg-paper/60 p-2.5 rounded-xl border border-ink/5">
        {!ticketIssued ? (
          <>
            <div className="flex justify-between items-center text-[8.5px] font-sans">
              <div className="flex items-center space-x-1 text-ink/75">
                <RefreshCw className="w-3 h-3 text-emerald animate-spin-slow" />
                <span>Seat Polling...</span>
              </div>
              <span className="text-ochre font-bold font-sans">
                {16 - liveReservationsCount} Seats Left
              </span>
            </div>

            <button
              disabled={!selectedSeat}
              onClick={handleBookTicket}
              className={`w-full py-1.5 text-[9px] font-sans font-bold rounded border transition-all ${
                selectedSeat
                  ? "bg-emerald text-paper border-ink shadow-lg shadow-ink/5 hover:bg-ochre hover:text-ink cursor-pointer"
                  : "bg-ink/5 text-ink/30 border-transparent cursor-not-allowed"
              }`}
            >
              RESERVE {selectedSeat ? selectedSeat : ""} & GENERATE
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center space-x-1.5 text-[8.5px] text-ink/60 font-sans">
            <Info className="w-3.5 h-3.5 text-emerald" />
            <span>Present this QR Code on entry.</span>
          </div>
        )}
      </div>
    </div>
  );
}
