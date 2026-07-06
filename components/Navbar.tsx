"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-ink/5 text-ink py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center transition-all shadow-sm">
      <div className="w-full md:w-auto flex justify-between items-center">
        <span className="font-display font-bold text-xl tracking-tight text-emerald">Usbah Saleem</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-ink focus:outline-none md:hidden">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <nav className={`${isOpen ? "flex" : "hidden"} mt-6 md:mt-0 md:flex flex-col md:flex-row flex-wrap justify-center items-center gap-3 md:gap-8 text-sm font-sans tracking-wide w-full md:w-auto`}>
        <a href="#hero" onClick={() => setIsOpen(false)} className="w-full md:w-auto text-center px-5 py-2.5 rounded-full bg-emerald/10 text-emerald hover:bg-emerald hover:text-white transition-all font-medium">Home</a>
        <a href="#skills" onClick={() => setIsOpen(false)} className="w-full md:w-auto text-center px-5 py-2.5 rounded-full bg-emerald/10 text-emerald hover:bg-emerald hover:text-white transition-all font-medium">Skills</a>
        <a href="#projects" onClick={() => setIsOpen(false)} className="w-full md:w-auto text-center px-5 py-2.5 rounded-full bg-emerald/10 text-emerald hover:bg-emerald hover:text-white transition-all font-medium">Projects</a>
        <a href="#experience" onClick={() => setIsOpen(false)} className="w-full md:w-auto text-center px-5 py-2.5 rounded-full bg-emerald/10 text-emerald hover:bg-emerald hover:text-white transition-all font-medium">Timeline</a>
        <a href="#contact" onClick={() => setIsOpen(false)} className="w-full md:w-auto text-center px-6 py-2.5 rounded-full bg-emerald text-white hover:bg-emerald/90 transition-all font-bold shadow-md shadow-emerald/20 hover:shadow-lg hover:shadow-emerald/40 hover:-translate-y-0.5 mt-2 md:mt-0 md:ml-4">Get In Touch</a>
        
        <div className="flex md:hidden items-center gap-6 mt-4">
          <a href="https://linkedin.com/in/usbah-saleem-315a0b327/" target="_blank" rel="noreferrer" className="hover:text-emerald transition-colors">
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a href="https://github.com/usbahawan" target="_blank" rel="noreferrer" className="hover:text-emerald transition-colors">
            <GithubIcon className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/docto.dev?igsh=MWs4eWxubjN2eGxsOA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="hover:text-emerald transition-colors">
            <InstagramIcon className="w-5 h-5" />
          </a>
        </div>
      </nav>
      
      <div className="hidden md:flex items-center gap-4">
        {/* Social Icons Desktop */}
        <a href="https://linkedin.com/in/usbah-saleem-315a0b327/" target="_blank" rel="noreferrer" className="hover:text-emerald transition-colors">
          <LinkedinIcon className="w-5 h-5" />
        </a>
        <a href="https://github.com/usbahawan" target="_blank" rel="noreferrer" className="hover:text-emerald transition-colors">
          <GithubIcon className="w-5 h-5" />
        </a>
        <a href="https://www.instagram.com/docto.dev?igsh=MWs4eWxubjN2eGxsOA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="hover:text-emerald transition-colors">
          <InstagramIcon className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
}
