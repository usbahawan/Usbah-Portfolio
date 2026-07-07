"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Mail,
  MapPin,
  Check,
  Send,
  Briefcase,
  Award,
  Terminal,
  Layers,
  BrainCircuit,
  MessageSquare,
  FolderGit2,
  Sparkles,
  Cpu,
  Eye,
  Bot,
  Database,
  Activity,
  Shield,
  Users,
  Calendar,
  ArrowUpRight,
  ExternalLink
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CoreStackStrip } from "@/components/CoreStackStrip";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Import simulators
import PhoneFrame from "@/components/PhoneFrame";
import NearConnectSimulator from "@/components/NearConnectSimulator";
import ShopEaseSimulator from "@/components/ShopEaseSimulator";
import AttendAISimulator from "@/components/AttendAISimulator";
import EventGoSimulator from "@/components/EventGoSimulator";
import FocusFlowSimulator from "@/components/FocusFlowSimulator";
import PlanoraSimulator from "@/components/PlanoraSimulator";

export default function PortfolioHome() {
  // Contact form state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [shakeForm, setShakeForm] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const formEl = document.getElementById("contact-form-card");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setShakeForm(true);
    setFormError("Please fill out the form below to send a message directly to awanusbah@gmail.com!");
    setTimeout(() => {
      setShakeForm(false);
    }, 800);
    const nameInput = document.getElementById("name");
    if (nameInput) {
      setTimeout(() => nameInput.focus(), 500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Basic validation: all 3 fields required
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError("All fields (Name, Email, and Message) are required.");
      return;
    }

    // Valid email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response from server:", text);
        throw new Error("API endpoint not detected. Please restart your local dev server (Ctrl+C then npm run dev) so Next.js loads the new API route.");
      }

      if (!response.ok) {
        throw new Error(result?.error || "Failed to send message. Please try again later.");
      }

      setFormSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      console.error("Form submit error:", error);
      setFormError(error.message || "An error occurred while sending your message. Please email directly.");
    } finally {
      setFormLoading(false);
    }
  };

  // Animation constants for Framer Motion
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  return (
    <div className="flex-1 bg-paper text-ink min-h-screen flex flex-col font-sans selection:bg-emerald selection:text-paper bg-grid relative z-0">

      <Navbar />
      {/* 2. Hero Section — mobile-first split screen */}
      <section id="hero" className="relative w-full flex flex-col border-b border-ink/10">
        {/* Mobile: content on top, image below. Desktop: side by side */}
        <div className="w-full flex flex-col-reverse md:flex-row md:min-h-screen">

          {/* Left: Image Area */}
          <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[700px] relative overflow-hidden bg-ink/5 flex items-center justify-center">
            <img
              src="/portrait.jpg?v=hd3"
              alt="Usbah Saleem"
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-ink mix-blend-overlay opacity-20 pointer-events-none"></div>
          </div>

          {/* Right: Content Area */}
          <div className="w-full md:w-1/2 bg-paper flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-10 sm:py-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl w-full"
            >
              {/* Name — scales from mobile to desktop */}
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.2rem] font-bold tracking-tighter text-emerald leading-[0.9] mb-4">
                Usbah<br />Saleem
              </h1>

              {/* Subtitle */}
              <p className="font-sans text-sm md:text-base text-ink/60 tracking-wide">
                Islamabad, Pakistan &middot; Open to remote &amp; hybrid opportunities
              </p>

              {/* Divider — tighter on mobile */}
              <div className="flex items-center gap-4 my-4 md:my-8">
                <div className="w-12 md:w-24 h-px bg-transparent"></div>
                <div className="flex-1 h-px bg-emerald"></div>
              </div>

              {/* Bio — smaller text on mobile for readability */}
              <p className="font-sans text-ink/70 text-sm sm:text-base md:text-base leading-relaxed mb-6 md:mb-8 max-w-xl">
                <span className="text-emerald font-semibold">Mobile App Developer (Flutter)</span> and Cross-Platform Engineer building <span className="text-emerald font-semibold">production-grade</span> Android and iOS applications with client-side AI integration. I work across the full mobile development lifecycle, including state management (Bloc, Riverpod, Provider), REST API architecture, Firebase and Supabase backends, real-time data synchronization, and <span className="text-emerald font-semibold">on-device machine learning</span> using TensorFlow Lite and PyTorch. I&apos;ve shipped <span className="text-emerald font-semibold">5+ cross-platform applications</span> spanning social networking, e-commerce, computer vision, and productivity tools, and I bring hands-on Agile/Scrum experience from an AI engineering internship. I&apos;m also comfortable across the web stack (React, Next.js, Node.js) when a project calls for it.
              </p>

              {/* Buttons — stack on mobile, row on sm+ */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6">
                <a
                  href="#projects"
                  className="w-full sm:w-auto bg-emerald text-white px-7 py-3.5 font-sans font-medium text-sm hover:bg-ink hover:text-paper transition-colors rounded-sm flex items-center justify-center gap-2 group"
                >
                  View Projects
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-sans font-medium text-sm text-emerald hover:text-ink transition-colors group"
                >
                  <div className="w-11 h-11 rounded-full border border-emerald flex items-center justify-center group-hover:border-ink group-hover:bg-ink/5 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </div>
                  Download CV
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Core Stack Strip */}
      <CoreStackStrip />

      {/* 2.5 Purpose-Grouped Skills */}
      <section id="skills" className="py-16 md:py-20 px-8 md:px-16 lg:px-24 mx-auto w-full border-b border-ink/10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 md:mb-16">
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-ink flex items-center space-x-4 font-normal">
              <Layers className="w-8 h-8 md:w-10 md:h-10 text-emerald" />
              <span>Skills</span>
            </h3>
            <p className="text-base text-ink/60 font-sans mt-3 uppercase tracking-wider">Purpose Architectures</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Category 1 */}
            <div className="bg-white border border-ink/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-ink/5 hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Terminal className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2} />
                </div>
                <h4 className="font-sans font-bold text-xl md:text-2xl mb-2 text-pine">Cross-Platform UI</h4>
                <p className="text-sm md:text-base text-ink/60 leading-relaxed mb-6">
                  Pixel-perfect interface compilation and scalable layouts.
                </p>
                <ul className="text-sm md:text-base font-sans grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-ink/70">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald rounded-full shrink-0"></span>
                    <span>Flutter, Dart & Kotlin</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald rounded-full shrink-0"></span>
                    <span>React, Next.js & Tailwind CSS</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald rounded-full shrink-0"></span>
                    <span>TypeScript & Node.js</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald rounded-full shrink-0"></span>
                    <span>Material Design & UI/UX</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald rounded-full shrink-0"></span>
                    <span>Bloc, Riverpod & Provider</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald rounded-full shrink-0"></span>
                    <span>Cross-Platform Lifecycles</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-pine border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-pine/30 hover:-translate-y-1 transition-all duration-300 group text-white">
              <div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layers className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2} />
                </div>
                <h4 className="font-sans font-bold text-xl md:text-2xl mb-2 text-white">Backend & Real-time</h4>
                <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6">
                  Asynchronous sync systems and database configurations.
                </p>
                <ul className="text-sm md:text-base font-sans grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-white/70">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-ochre rounded-full shrink-0"></span>
                    <span>REST API Architecture</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-ochre rounded-full shrink-0"></span>
                    <span>Firebase Real-time Sync</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-ochre rounded-full shrink-0"></span>
                    <span>Supabase, PostgreSQL & RLS</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-ochre rounded-full shrink-0"></span>
                    <span>PostGIS Geographic Data</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-ochre rounded-full shrink-0"></span>
                    <span>MongoDB, SQLite & Hive DB</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-ochre rounded-full shrink-0"></span>
                    <span>Agora SDK & WebRTC Video</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-white border border-ink/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-ink/5 hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2} />
                </div>
                <h4 className="font-sans font-bold text-xl md:text-2xl mb-2 text-pine">On-Device & Server AI</h4>
                <p className="text-sm md:text-base text-ink/60 leading-relaxed mb-6">
                  Client computer vision models and API integrations.
                </p>
                <ul className="text-sm md:text-base font-sans grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-ink/70">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald rounded-full shrink-0"></span>
                    <span>Python Data Pipelines</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald rounded-full shrink-0"></span>
                    <span>TensorFlow Lite On-Device</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald rounded-full shrink-0"></span>
                    <span>PyTorch Deep Learning</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald rounded-full shrink-0"></span>
                    <span>Computer Vision & Spatial AI</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald rounded-full shrink-0"></span>
                    <span>Offline OCR & Extraction</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-emerald rounded-full shrink-0"></span>
                    <span>Autonomous Pathfinding</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Category 4 */}
            <div className="bg-pine border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl hover:shadow-pine/30 hover:-translate-y-1 transition-all duration-300 group text-white">
              <div>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2} />
                </div>
                <h4 className="font-sans font-bold text-xl md:text-2xl mb-2 text-white">Systems & Engineering</h4>
                <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6">
                  Low-level architecture and agile deployment workflows.
                </p>
                <ul className="text-sm md:text-base font-sans grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-white/70">
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-ochre rounded-full shrink-0"></span>
                    <span>Agile/Scrum Integration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-ochre rounded-full shrink-0"></span>
                    <span>Git Version Control & CI/CD</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-ochre rounded-full shrink-0"></span>
                    <span>Java Object-Oriented Design</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-ochre rounded-full shrink-0"></span>
                    <span>MIPS/x86 Assembly & Hardware</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Case Studies (Alternating backgrounds) */}
      <section id="projects">
        {/* Projects Section Header */}
        <div className="py-8 md:py-10 px-8 md:px-16 lg:px-24 mx-auto w-full border-b border-ink/10 bg-paper">
          <div className="max-w-7xl mx-auto">
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-ink flex items-center space-x-4 font-normal">
              <FolderGit2 className="w-8 h-8 md:w-10 md:h-10 text-emerald" />
              <span>Projects</span>
            </h3>
            <p className="text-base text-ink/60 font-sans mt-3 uppercase tracking-wider">Production Case Studies & Systems</p>
          </div>
        </div>

        {/* Project 1: Zync (Light paper theme) */}
        <div className="relative py-24 md:py-32 border-b border-ink/10 bg-paper transition-colors overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-display font-bold text-ink/[0.03] .03] pointer-events-none select-none leading-none z-0">
            01
          </div>
          <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">
            {/* Project Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className="md:col-span-7 space-y-6"
            >
              <span className="text-[10px] font-sans text-ochre font-bold uppercase tracking-widest bg-ochre/10 px-2 py-1 rounded">
                Project 01
              </span>

              <h3 className="font-display text-4xl md:text-6xl leading-none text-ink tracking-tight font-normal">
                Zync
              </h3>

              {/* Lead sentence that proves competence */}
              <p className="font-sans text-xs md:text-sm text-emerald font-bold leading-relaxed border-l-2 border-emerald pl-4">
                Proximity-driven social coordination connecting active users within a live geographical radius.
              </p>

              <div className="space-y-4 text-sm md:text-base text-ink/75 leading-relaxed">
                <div>
                  <h4 className="font-sans text-[10px] uppercase text-ink/40 tracking-wider font-bold">The Problem</h4>
                  <p className="mt-1">
                    Building location sharing that doesn&apos;t drain device batteries and ranks connections accurately based on interests and geographic proximity.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-[10px] uppercase text-ink/40 tracking-wider font-bold">The Technical Decision</h4>
                  <p className="mt-1">
                    Leveraged PostGIS queries over a Supabase database coupled with Supabase Realtime triggers. Computed distance calculations directly on the database level, avoiding costly client-side computational overhead. Integrated WebRTC & Agora SDKs tuned for low-bandwidth environments to support smooth group video channels.
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="font-sans text-[10px] uppercase text-ink/40 tracking-wider font-bold">Concrete Outcome</h4>
                  <p className="mt-1 font-sans text-xs text-ink">
                    &gt; PostGIS geo-queries resolve under <strong className="text-emerald">sub-300ms</strong>, maintaining strict Postgres Row-Level Security policies.
                  </p>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["Flutter", "Supabase", "PostGIS", "Agora SDK", "WebRTC", "Riverpod"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-emerald text-white border border-emerald/80 text-[10px] font-sans font-bold rounded-md shadow-sm hover:scale-105 transition-transform">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Interactive Phone simulator */}
            <div className="md:col-span-5 flex justify-center">
              <PhoneFrame appName="Zync">
                <NearConnectSimulator />
              </PhoneFrame>
            </div>
          </div>
        </div>

        {/* Project 2: Planora (Dark pine theme - Flagship 4-Role System) */}
        <div className="relative py-24 md:py-32 border-b border-white/10 bg-pine text-white transition-colors overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-display font-bold text-white/[0.03] pointer-events-none select-none leading-none z-0">
            02
          </div>
          <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">

            {/* Interactive Phone simulator (on left for alternating visual rhythm) */}
            <div className="md:col-span-5 flex justify-center order-last md:order-first">
              <PhoneFrame appName="Planora">
                <PlanoraSimulator />
              </PhoneFrame>
            </div>

            {/* Project Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className="md:col-span-7 space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-sans text-ochre font-bold uppercase tracking-widest bg-ochre/10 px-2 py-1 rounded">
                  Project 02 · FLAGSHIP
                </span>
                <span className="text-[10px] font-sans text-emerald font-bold uppercase tracking-widest bg-emerald/10 border border-emerald/30 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>4-Role Enterprise System</span>
                </span>
              </div>

              <h3 className="font-display text-4xl md:text-6xl leading-none text-white tracking-tight font-normal">
                Planora
              </h3>

              {/* Lead sentence that proves competence */}
              <p className="font-sans text-xs md:text-sm text-emerald font-bold leading-relaxed border-l-2 border-emerald pl-4">
                Enterprise-grade event planning & management platform with real-time multi-role access control (RBAC).
              </p>

              <div className="space-y-4 text-sm md:text-base text-white/75 leading-relaxed">
                <div>
                  <h4 className="font-sans text-[10px] uppercase text-white/40 tracking-wider font-bold">The Problem</h4>
                  <p className="mt-1">
                    Event ecosystems suffer from fragmented data silos where attendees, organizers, vendors, and admins use disconnected software, leading to gate check-in delays and financial discrepancy.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-[10px] uppercase text-white/40 tracking-wider font-bold">The Technical Decision</h4>
                  <p className="mt-1">
                    Architected a unified Flutter mobile client powered by Firebase Realtime Database and custom JWT authentication. Built 4 distinct, role-segregated UI views (Attendee, Organizer, Vendor, Admin) that synchronize live ticket inventory, booth logistics, and check-in metrics instantaneously.
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="font-sans text-[10px] uppercase text-white/40 tracking-wider font-bold">Concrete Outcome</h4>
                  <p className="mt-1 font-sans text-xs text-white">
                    &gt; <strong className="text-emerald">Zero latency state synchronization</strong> across 4 concurrent user roles with automated QR gate validation and live revenue tracking.
                  </p>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["Flutter", "Firebase Realtime DB", "RBAC Auth", "QR Code Scanner", "State Management", "Dark UI"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-emerald text-white border border-emerald/80 text-[10px] font-sans font-bold rounded-md shadow-sm hover:scale-105 transition-transform">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Project 3: AttendAI (Light paper theme) */}
        <div className="relative py-24 md:py-32 border-b border-ink/10 bg-paper transition-colors overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-display font-bold text-ink/[0.03] .03] pointer-events-none select-none leading-none z-0">
            03
          </div>
          <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">
            {/* Project Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className="md:col-span-7 space-y-6"
            >
              <span className="text-[10px] font-sans text-ochre font-bold uppercase tracking-widest bg-ochre/10 px-2 py-1 rounded">
                Project 03
              </span>

              <h3 className="font-display text-4xl md:text-6xl leading-none text-ink tracking-tight font-normal">
                AttendAI
              </h3>

              {/* Lead sentence that proves competence */}
              <p className="font-sans text-xs md:text-sm text-emerald font-bold leading-relaxed border-l-2 border-emerald pl-4">
                On-device facial scanning verifying campus attendance with high confidence.
              </p>

              <div className="space-y-4 text-sm md:text-base text-ink/75 leading-relaxed">
                <div>
                  <h4 className="font-sans text-[10px] uppercase text-ink/40 tracking-wider font-bold">The Problem</h4>
                  <p className="mt-1">
                    Manual event tracking is slow, error-prone, and relies on persistent cloud connectivity which fails in high-occupancy university halls.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-[10px] uppercase text-ink/40 tracking-wider font-bold">The Technical Decision</h4>
                  <p className="mt-1">
                    Streamed raw camera frames to a localized Flask inference engine. Configured MTCNN for face localization and InceptionResnetV1 in PyTorch to compute 512-dimensional face embeddings matched via cosine similarity. Integrated an offline-first SQLite synchronization engine.
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="font-sans text-[10px] uppercase text-ink/40 tracking-wider font-bold">Concrete Outcome</h4>
                  <p className="mt-1 font-sans text-xs text-ink">
                    &gt; Achieved <strong className="text-emerald">97%+ facial verification accuracy</strong>, reducing queue verification time by <strong className="text-ochre">~100%</strong>.
                  </p>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["Flutter", "Python", "PyTorch", "MTCNN", "Flask API", "OpenCV", "SQLite"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-emerald text-white border border-emerald/80 text-[10px] font-sans font-bold rounded-md shadow-sm hover:scale-105 transition-transform">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Interactive Phone simulator */}
            <div className="md:col-span-5 flex justify-center">
              <PhoneFrame appName="AttendAI">
                <AttendAISimulator />
              </PhoneFrame>
            </div>
          </div>
        </div>

        {/* Project 4: EventGo (Dark pine theme) */}
        <div className="relative py-24 md:py-32 border-b border-white/10 bg-pine text-white transition-colors overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-display font-bold text-white/[0.03] pointer-events-none select-none leading-none z-0">
            04
          </div>
          <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">

            {/* Interactive Phone simulator */}
            <div className="md:col-span-5 flex justify-center order-last md:order-first">
              <PhoneFrame appName="EventGo">
                <EventGoSimulator />
              </PhoneFrame>
            </div>

            {/* Project Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className="md:col-span-7 space-y-6"
            >
              <span className="text-[10px] font-sans text-ochre font-bold uppercase tracking-widest bg-ochre/10 px-2 py-1 rounded">
                Project 04
              </span>

              <h3 className="font-display text-4xl md:text-6xl leading-none text-white tracking-tight font-normal">
                EventGo
              </h3>

              {/* Lead sentence that proves competence */}
              <p className="font-sans text-xs md:text-sm text-emerald font-bold leading-relaxed border-l-2 border-emerald pl-4">
                Real-time registration system securing seating bookings for large-scale campus conferences.
              </p>

              <div className="space-y-4 text-sm md:text-base text-white/75 leading-relaxed">
                <div>
                  <h4 className="font-sans text-[10px] uppercase text-white/40 tracking-wider font-bold">The Problem</h4>
                  <p className="mt-1">
                    Double-booking seats during high-traffic campus ticketing runs due to concurrent registration requests.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-[10px] uppercase text-white/40 tracking-wider font-bold">The Technical Decision</h4>
                  <p className="mt-1">
                    Implemented REST polling updates inside a clean Flutter UI, synchronized against persistent backend state. Leveraged adaptive layouts to support both tablet check-in desks and mobile ticket holders, caching credentials locally via SharedPreferences.
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="font-sans text-[10px] uppercase text-white/40 tracking-wider font-bold">Concrete Outcome</h4>
                  <p className="mt-1 font-sans text-xs text-white">
                    &gt; Managed <strong className="text-emerald">5+ large campus registrations</strong> smoothly with zero collision conflicts and instantly generated QR code ticket vouchers.
                  </p>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["Flutter", "Dart", "REST API", "Firebase Auth", "SharedPreferences"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-emerald text-white border border-emerald/80 text-[10px] font-sans font-bold rounded-md shadow-sm hover:scale-105 transition-transform">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Project 5: FocusFlow (Light paper theme) */}
        <div className="relative py-24 md:py-32 border-b border-ink/10 bg-paper transition-colors overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-display font-bold text-ink/[0.03] .03] pointer-events-none select-none leading-none z-0">
            05
          </div>
          <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">
            {/* Project Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className="md:col-span-7 space-y-6"
            >
              <span className="text-[10px] font-sans text-ochre font-bold uppercase tracking-widest bg-ochre/10 px-2 py-1 rounded">
                Project 05
              </span>

              <h3 className="font-display text-4xl md:text-6xl leading-none text-ink tracking-tight font-normal">
                FocusFlow
              </h3>

              {/* Lead sentence that proves competence */}
              <p className="font-sans text-xs md:text-sm text-emerald font-bold leading-relaxed border-l-2 border-emerald pl-4">
                A robust Pomodoro tracker ensuring time execution persists during background minimization.
              </p>

              <div className="space-y-4 text-sm md:text-base text-ink/75 leading-relaxed">
                <div>
                  <h4 className="font-sans text-[10px] uppercase text-ink/40 tracking-wider font-bold">The Problem</h4>
                  <p className="mt-1">
                    Mobile OS systems suspend active app threads when minimized, killing background timers and breaking the user&apos;s focus metrics.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-[10px] uppercase text-ink/40 tracking-wider font-bold">The Technical Decision</h4>
                  <p className="mt-1">
                    Deployed the countdown logic inside a dedicated background isolate in Dart, persisting the session state locally inside a Hive database. Scheduled native platform alarms using local notifications to fire alerts even if the system kills the application.
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="font-sans text-[10px] uppercase text-ink/40 tracking-wider font-bold">Concrete Outcome</h4>
                  <p className="mt-1 font-sans text-xs text-ink">
                    &gt; <strong className="text-emerald">100% timer survival</strong> across device standby triggers, displaying smooth micro-interactions via Lottie frames.
                  </p>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["Flutter", "Hive DB", "Riverpod", "Local Notifications", "Lottie"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-emerald text-white border border-emerald/80 text-[10px] font-sans font-bold rounded-md shadow-sm hover:scale-105 transition-transform">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Interactive Phone simulator */}
            <div className="md:col-span-5 flex justify-center">
              <PhoneFrame appName="FocusFlow">
                <FocusFlowSimulator />
              </PhoneFrame>
            </div>
          </div>
        </div>

        {/* Project 6: ShopEase (Dark pine theme) */}
        <div className="relative py-24 md:py-32 border-b border-white/10 bg-pine text-white transition-colors overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35vw] font-display font-bold text-white/[0.03] pointer-events-none select-none leading-none z-0">
            06
          </div>
          <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">

            {/* Interactive Phone simulator (on left for alternating visual rhythm) */}
            <div className="md:col-span-5 flex justify-center order-last md:order-first">
              <PhoneFrame appName="ShopEase">
                <ShopEaseSimulator />
              </PhoneFrame>
            </div>

            {/* Project Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className="md:col-span-7 space-y-6"
            >
              <span className="text-[10px] font-sans text-ochre font-bold uppercase tracking-widest bg-ochre/10 px-2 py-1 rounded">
                Project 06
              </span>

              <h3 className="font-display text-4xl md:text-6xl leading-none text-white tracking-tight font-normal">
                ShopEase
              </h3>

              {/* Lead sentence that proves competence */}
              <p className="font-sans text-xs md:text-sm text-emerald font-bold leading-relaxed border-l-2 border-emerald pl-4">
                High-performance e-commerce gateway with transaction validation and order confirmation.
              </p>

              <div className="space-y-4 text-sm md:text-base text-white/75 leading-relaxed">
                <div>
                  <h4 className="font-sans text-[10px] uppercase text-white/40 tracking-wider font-bold">The Problem</h4>
                  <p className="mt-1">
                    Shopping checkouts frequently fail due to API drop-offs, slow database queries, or unhandled payment webhook retries.
                  </p>
                </div>

                <div>
                  <h4 className="font-sans text-[10px] uppercase text-white/40 tracking-wider font-bold">The Technical Decision</h4>
                  <p className="mt-1">
                    Implemented a Node.js/Express REST API talking to an indexed MongoDB instance. Decoupled order state updates via Stripe webhook listeners, ensuring cart confirmation happens asynchronously. Handled state management via flutter Bloc to prevent cart sync glitches across offline transitions.
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="font-sans text-[10px] uppercase text-white/40 tracking-wider font-bold">Concrete Outcome</h4>
                  <p className="mt-1 font-sans text-xs text-white">
                    &gt; MongoDB queries indexed to return catalog results in <strong className="text-emerald">sub-300ms</strong>, push notifications dispatched immediately via Firebase Cloud Messaging.
                  </p>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["Flutter", "Node.js", "Express", "MongoDB", "Stripe SDK", "Bloc"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-emerald text-white border border-emerald/80 text-[10px] font-sans font-bold rounded-md shadow-sm hover:scale-105 transition-transform">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* 3.5. Open-Source Engineering & AI Architecture Section */}
      <section id="ai-innovations" className="border-b border-ink/10 bg-paper">
        {/* Section Header matching Skills & Projects */}
        <div className="py-16 md:py-20 px-8 md:px-16 lg:px-24 mx-auto w-full border-b border-ink/10 bg-paper">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="p-3 md:p-4 bg-emerald/10 border border-emerald/20 rounded-2xl shrink-0">
                <BrainCircuit className="w-8 h-8 md:w-12 md:h-12 text-emerald stroke-[1.5]" />
              </div>
              <div>
                <span className="text-xs md:text-sm font-sans font-bold uppercase tracking-widest text-emerald block mb-1">
                  ADVANCED ALGORITHMS & SYSTEMS
                </span>
                <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight font-normal leading-none">
                  Open-Source & AI Gems
                </h2>
              </div>
            </div>
            <p className="font-sans text-ink/60 text-sm md:text-base max-w-md md:text-right">
              Explore deep-tech repositories: computer vision pipelines, autonomous robot navigation, and low-level hardware optimization.
            </p>
          </div>
        </div>

        {/* Gems Grid */}
        <div className="py-12 md:py-16 px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Gem 1: EventSight AI */}
            <div className="bg-paper border border-ink/10 hover:border-emerald/50 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald/5 group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center group-hover:bg-emerald transition-colors">
                    <Eye className="w-6 h-6 text-emerald group-hover:text-white transition-colors" />
                  </div>
                  <a
                    href="https://github.com/usbahawan/EventSight-AI-CV-Project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-ink/40 hover:text-emerald transition-colors"
                    aria-label="View on GitHub"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-emerald block mb-2">
                  COMPUTER VISION · AI
                </span>
                <h3 className="font-display font-semibold text-2xl text-ink mb-3 group-hover:text-emerald transition-colors">
                  EventSight AI
                </h3>
                <p className="font-sans text-sm text-ink/70 leading-relaxed mb-6">
                  AI-powered venue intelligence platform designed to analyze crowd densities, segment spatial zones, answer visual scene queries, and provide real-time interactive chat using deep learning.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-ink/5">
                {["Python", "Computer Vision", "PyTorch", "Deep Learning", "Spatial AI"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-emerald text-white border border-emerald/80 text-[10px] font-sans font-bold rounded-md shadow-sm hover:scale-105 transition-transform">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Gem 2: SmartPosterScanner */}
            <div className="bg-pine border border-white/10 hover:border-emerald p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald/20 group flex flex-col justify-between text-white">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-emerald transition-colors">
                    <Sparkles className="w-6 h-6 text-white group-hover:text-white transition-colors" />
                  </div>
                  <a
                    href="https://github.com/usbahawan/SmartPosterScanner-ComputerVision"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/40 hover:text-white transition-colors"
                    aria-label="View on GitHub"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-emerald block mb-2">
                  AUTOMATED OCR · NLP
                </span>
                <h3 className="font-display font-semibold text-2xl text-white mb-3 group-hover:text-emerald transition-colors">
                  SmartPosterScanner
                </h3>
                <p className="font-sans text-sm text-white/80 leading-relaxed mb-6">
                  Takes highly stylized, chaotic event posters and automatically extracts structured, actionable data (Title, Date, Time, Venue, Organizers) without relying on internet connectivity.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {["JavaScript", "Python", "Computer Vision", "Offline OCR", "Data Parsing"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-emerald text-white border border-emerald text-[10px] font-sans font-bold rounded-md shadow-sm hover:scale-105 transition-transform">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Gem 3: AI Automated Home Service Robot */}
            <div className="bg-paper border border-ink/10 hover:border-emerald/50 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald/5 group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center group-hover:bg-emerald transition-colors">
                    <Bot className="w-6 h-6 text-emerald group-hover:text-white transition-colors" />
                  </div>
                  <a
                    href="https://github.com/usbahawan/AI-Automated-Home-Service-Robot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-ink/40 hover:text-emerald transition-colors"
                    aria-label="View on GitHub"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-emerald block mb-2">
                  AUTONOMOUS AGENTS · ROBOTICS
                </span>
                <h3 className="font-display font-semibold text-2xl text-ink mb-3 group-hover:text-emerald transition-colors">
                  AI Home Service Robot
                </h3>
                <p className="font-sans text-sm text-ink/70 leading-relaxed mb-6">
                  An intelligent, autonomous home service robot simulation powered by advanced AI techniques. Demonstrates house-scale pathfinding, task scheduling, and state-based reasoning.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-ink/5">
                {["Python", "AI Navigation", "Autonomous Agents", "State Reasoning", "Simulation"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-emerald text-white border border-emerald/80 text-[10px] font-sans font-bold rounded-md shadow-sm hover:scale-105 transition-transform">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Gem 4: OptiMIPS Pipeline Optimizer */}
            <div className="bg-pine border border-white/10 hover:border-emerald p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald/20 group flex flex-col justify-between text-white">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-emerald transition-colors">
                    <Cpu className="w-6 h-6 text-white group-hover:text-white transition-colors" />
                  </div>
                  <a
                    href="https://github.com/usbahawan/OptiMIPS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/40 hover:text-white transition-colors"
                    aria-label="View on GitHub"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-emerald block mb-2">
                  COMPUTER ARCHITECTURE
                </span>
                <h3 className="font-display font-semibold text-2xl text-white mb-3 group-hover:text-emerald transition-colors">
                  OptiMIPS Optimizer
                </h3>
                <p className="font-sans text-sm text-white/80 leading-relaxed mb-6">
                  A pipeline-aware MIPS instruction reordering and optimization plugin for the MARS simulator that builds data dependency graphs to resolve hardware hazards and minimize stall cycles.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {["MIPS Assembly", "Pipeline Optimization", "Hazard Resolution", "Algorithms", "Java"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-emerald text-white border border-emerald text-[10px] font-sans font-bold rounded-md shadow-sm hover:scale-105 transition-transform">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Gem 5: x86 Assembly Event Notification */}
            <div className="bg-paper border border-ink/10 hover:border-emerald/50 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald/5 group flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center group-hover:bg-emerald transition-colors">
                    <Terminal className="w-6 h-6 text-emerald group-hover:text-white transition-colors" />
                  </div>
                  <a
                    href="https://github.com/usbahawan/x86-Assembly-Event-Notification-System"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-ink/40 hover:text-emerald transition-colors"
                    aria-label="View on GitHub"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-emerald block mb-2">
                  LOW-LEVEL SYSTEMS · ASSEMBLY
                </span>
                <h3 className="font-display font-semibold text-2xl text-ink mb-3 group-hover:text-emerald transition-colors">
                  x86 Event Handler
                </h3>
                <p className="font-sans text-sm text-ink/70 leading-relaxed mb-6">
                  Real-time hardware-level event notification and interrupt handler built in pure x86 Assembly, demonstrating low-level systems programming and direct memory management.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-ink/5">
                {["x86 Assembly", "Low-Level Systems", "Interrupt Handling", "Hardware Architecture"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-emerald text-white border border-emerald/80 text-[10px] font-sans font-bold rounded-md shadow-sm hover:scale-105 transition-transform">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Gem 6: Enterprise Bank Management */}
            <div className="bg-pine border border-white/10 hover:border-emerald p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald/20 group flex flex-col justify-between text-white">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-emerald transition-colors">
                    <Database className="w-6 h-6 text-white group-hover:text-white transition-colors" />
                  </div>
                  <a
                    href="https://github.com/usbahawan/Bank-Management-System"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white/40 hover:text-white transition-colors"
                    aria-label="View on GitHub"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-emerald block mb-2">
                  OBJECT-ORIENTED ARCHITECTURE
                </span>
                <h3 className="font-display font-semibold text-2xl text-white mb-3 group-hover:text-emerald transition-colors">
                  Bank Management System
                </h3>
                <p className="font-sans text-sm text-white/80 leading-relaxed mb-6">
                  Role-based enterprise application designed to streamline banking operations for Managers, CSRs, and Account Holders with secure transaction logging and multi-tier authentication.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {["Java", "OOP Design", "SQL Database", "Desktop Architecture", "Security"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-emerald text-white border border-emerald text-[10px] font-sans font-bold rounded-md shadow-sm hover:scale-105 transition-transform">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Experience & Leadership Section (Timeline concept, no badges) */}
      <section id="experience" className="py-16 md:py-20 px-8 md:px-16 lg:px-24 mx-auto w-full border-b border-ink/10">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-24">
          <div className="md:col-span-5 lg:col-span-5">
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-ink flex items-center space-x-4 font-normal">
              <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-emerald" />
              <span>Timeline</span>
            </h3>
            <p className="text-base text-ink/60 font-sans mt-4 uppercase tracking-wider">Work + Leadership</p>
          </div>

          <div className="md:col-span-7 lg:col-span-7">
            {/* Timeline Item 1 — DevHawks */}
            <div className="relative pl-8 md:pl-10 border-l-2 border-ink/20 pb-10 last:pb-0 group">
              <div className="absolute -left-[5px] top-7 w-3 h-3 bg-emerald rounded-full ring-4 ring-emerald/20 group-hover:bg-emerald group-hover:ring-emerald/30 transition-all duration-300"></div>
              <div className="bg-pine hover:bg-pine/90 border border-white/10 rounded-xl p-6 transition-all duration-300 text-white">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-block px-2.5 py-1 bg-white/10 text-white text-[11px] font-sans font-bold uppercase tracking-widest rounded-full">
                    INTERNSHIP
                  </span>
                  <span className="text-sm md:text-base text-white/70 font-sans font-semibold">
                    Jul 2026
                  </span>
                </div>
                <div className="text-sm md:text-base font-sans text-emerald font-bold tracking-wider mb-1">
                  DEVHAWKS (PRIVATE) LIMITED
                </div>
                <h4 className="font-display font-semibold text-xl md:text-2xl text-white mb-3">
                  Junior Mobile Application Engineer
                </h4>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  Selected to design, develop, and test features for cross-platform mobile applications during an 8-week engineering internship.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 — Safex Solutions */}
            <div className="relative pl-8 md:pl-10 border-l-2 border-ink/20 pb-10 last:pb-0 group">
              <div className="absolute -left-[5px] top-7 w-3 h-3 bg-emerald/70 group-hover:bg-emerald rounded-full ring-4 ring-emerald/20 group-hover:ring-emerald/30 transition-all duration-300"></div>
              <div className="bg-white hover:bg-white/80 border border-ink/5 rounded-xl p-6 transition-all duration-300">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-block px-2.5 py-1 bg-emerald/10 text-emerald text-[11px] font-sans font-bold uppercase tracking-widest rounded-full">
                    INTERNSHIP
                  </span>
                  <span className="text-sm md:text-base text-ink/60 font-sans font-semibold">
                    Jun 2026
                  </span>
                </div>
                <div className="text-sm md:text-base font-sans text-emerald font-bold tracking-wider mb-1">
                  SAFEX SOLUTIONS
                </div>
                <h4 className="font-display font-semibold text-xl md:text-2xl text-pine mb-3">
                  Website Development Intern
                </h4>
                <p className="text-base md:text-lg text-ink/70 leading-relaxed">
                  Contributing to live web development projects, gaining hands-on industry experience with modern web technologies in a hybrid work environment.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 — FlyRank AI */}
            <div className="relative pl-8 md:pl-10 border-l-2 border-ink/20 pb-10 last:pb-0 group">
              <div className="absolute -left-[5px] top-7 w-3 h-3 bg-emerald/50 group-hover:bg-emerald rounded-full ring-4 ring-emerald/20 group-hover:ring-emerald/30 transition-all duration-300"></div>
              <div className="bg-pine hover:bg-pine/90 border border-white/10 rounded-xl p-6 transition-all duration-300 text-white">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-block px-2.5 py-1 bg-white/10 text-white text-[11px] font-sans font-bold uppercase tracking-widest rounded-full">
                    INTERNSHIP
                  </span>
                  <span className="text-sm md:text-base text-white/70 font-sans font-semibold">
                    Jul 2025
                  </span>
                </div>
                <div className="text-sm md:text-base font-sans text-emerald font-bold tracking-wider mb-1">
                  FLYRANK AI
                </div>
                <h4 className="font-display font-semibold text-xl md:text-2xl text-white mb-3">
                  Backend AI Engineering
                </h4>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  Selected for the Backend AI Engineering track, focused on backend systems supporting AI-driven products.
                </p>
              </div>
            </div>

            {/* Timeline Item 4 — AlKhidmat Foundation */}
            <div className="relative pl-8 md:pl-10 border-l-2 border-ink/20 pb-10 last:pb-0 group">
              <div className="absolute -left-[5px] top-7 w-3 h-3 bg-ochre/70 group-hover:bg-ochre rounded-full ring-4 ring-ochre/20 group-hover:ring-ochre/30 transition-all duration-300"></div>
              <div className="bg-white hover:bg-white/80 border border-ink/5 rounded-xl p-6 transition-all duration-300">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-block px-2.5 py-1 bg-ochre/10 text-ochre text-[11px] font-sans font-bold uppercase tracking-widest rounded-full">
                    COMMUNITY
                  </span>
                  <span className="text-sm md:text-base text-ink/60 font-sans font-semibold">
                    2026
                  </span>
                </div>
                <div className="text-sm md:text-base font-sans text-emerald font-bold tracking-wider mb-1">
                  ALKHIDMAT FOUNDATION PAKISTAN
                </div>
                <h4 className="font-display font-semibold text-xl md:text-2xl text-pine mb-3">
                  Social Internship Program Participant
                </h4>
                <p className="text-base md:text-lg text-ink/70 leading-relaxed">
                  Participated in a 6-week hybrid social internship involving learning sessions, community engagement activities, and project-based participation.
                </p>
              </div>
            </div>

            {/* Timeline Item 5 — SPS */}
            <div className="relative pl-8 md:pl-10 border-l-2 border-ink/20 pb-10 last:pb-0 group">
              <div className="absolute -left-[5px] top-7 w-3 h-3 bg-emerald rounded-full ring-4 ring-emerald/20 group-hover:bg-emerald group-hover:ring-emerald/30 transition-all duration-300"></div>
              <div className="bg-pine hover:bg-pine/90 border border-white/10 rounded-xl p-6 transition-all duration-300 text-white">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-block px-2.5 py-1 bg-white/10 text-white text-[11px] font-sans font-bold uppercase tracking-widest rounded-full">
                    INTERNSHIP
                  </span>
                  <span className="text-sm md:text-base text-white/70 font-sans font-semibold">
                    2025
                  </span>
                </div>
                <div className="text-sm md:text-base font-sans text-emerald font-bold tracking-wider mb-1">
                  SOFTWARE SOLUTIONS (SPS)
                </div>
                <h4 className="font-display font-semibold text-xl md:text-2xl text-white mb-3">
                  AI Engineering Intern
                </h4>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  Contributed Flutter UI integrations and client REST APIs to a live client application within an active Agile sprint cycle. Researched and prototyped on-device, localized computer vision pipelines using TensorFlow Lite (TFLite) to cache inference calculations.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative pl-8 md:pl-10 border-l-2 border-ink/20 pb-10 last:pb-0 group">
              <div className="absolute -left-[5px] top-7 w-3 h-3 bg-emerald/70 group-hover:bg-emerald rounded-full ring-4 ring-emerald/20 group-hover:ring-emerald/30 transition-all duration-300"></div>

              <div className="bg-white hover:bg-white/80 border border-ink/5 rounded-xl p-6 transition-all duration-300">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-block px-2.5 py-1 bg-ochre/10 text-ochre text-[11px] font-sans font-bold uppercase tracking-widest rounded-full">
                    LEADERSHIP
                  </span>
                  <span className="text-sm md:text-base text-ink/60 font-sans font-semibold">
                    2025 - Present
                  </span>
                </div>
                <div className="text-sm md:text-base font-sans text-ochre font-bold tracking-wider mb-1">
                  CREATIVE DYNAMIC SOCIETY (CDS)
                </div>
                <h4 className="font-display font-semibold text-xl md:text-2xl text-pine mb-3">
                  President
                </h4>
                <p className="text-base md:text-lg text-ink/70 leading-relaxed">
                  Elected to direct the leading creative tech society, managing a cross-functional team of 300+ members. Directed budgeting, sponsor acquisition, and logs for 5+ major campus events, establishing partnerships with regional software houses.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative pl-8 md:pl-10 border-l-2 border-ink/20 pb-10 last:pb-0 group">
              <div className="absolute -left-[5px] top-7 w-3 h-3 bg-emerald/40 group-hover:bg-emerald rounded-full ring-4 ring-emerald/20 group-hover:ring-emerald/30 transition-all duration-300"></div>

              <div className="bg-pine hover:bg-pine/90 border border-white/10 rounded-xl p-6 transition-all duration-300 text-white">
                <div className="flex justify-between items-center mb-3">
                  <span className="inline-block px-2.5 py-1 bg-white/10 text-white text-[11px] font-sans font-bold uppercase tracking-widest rounded-full">
                    EDUCATION
                  </span>
                  <span className="text-sm md:text-base text-white/70 font-sans font-semibold">
                    2023 - Present
                  </span>
                </div>
                <div className="text-sm md:text-base font-sans text-emerald font-bold tracking-wider mb-1">
                  COMSATS UNIVERSITY
                </div>
                <h4 className="font-display font-semibold text-xl md:text-2xl text-white mb-3">
                  BS Computer Science (7th Sem)
                </h4>
                <p className="text-base md:text-lg text-white/80 leading-relaxed">
                  Maintaining a Cumulative GPA of 3.5/4.0. Coursework includes Database Architectures, Operating Systems, Algorithm Analysis, and Artificial Intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 6. Contact Section (Accessible form, no wave emojis) */}
      <section id="contact" className="py-16 md:py-20 px-8 md:px-16 lg:px-24 mx-auto w-full">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-24">
          <div className="md:col-span-5 lg:col-span-5">
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-ink flex items-center space-x-4 font-normal">
              <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-emerald" />
              <span>Contact</span>
            </h3>
            <p className="text-base text-ink/60 font-sans mt-4 uppercase tracking-wider">Get in touch</p>
            <div className="mt-10 space-y-8 text-base font-sans">
              <p className="text-ink/70 leading-relaxed text-lg md:text-xl">
                Have a role or project in mind? Send a message or email me directly.
              </p>
              <div>
                <span className="block text-ink/50 text-sm uppercase font-bold tracking-wider mb-2">Email directly</span>
                <a
                  href="mailto:awanusbah@gmail.com"
                  onClick={handleEmailClick}
                  className="text-emerald hover:underline font-bold text-lg md:text-xl inline-block cursor-pointer"
                >
                  awanusbah@gmail.com
                </a>
              </div>
              <div>
                <span className="block text-ink/50 text-sm uppercase font-bold tracking-wider mb-2">Phone contact</span>
                <span className="text-ink font-medium text-lg md:text-xl">Available on request</span>
              </div>
            </div>
          </div>

          <motion.div
            id="contact-form-card"
            className="md:col-span-7 lg:col-span-7"
            animate={shakeForm ? { x: [-14, 14, -10, 10, -6, 6, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleFormSubmit}
                  className="bg-ink border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl shadow-ink/10 space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-sans font-bold text-white/50 uppercase tracking-wider mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-base text-white focus:outline-none focus:border-2 focus:border-emerald font-sans placeholder:text-white/30 transition-all"
                        placeholder="Sarah Ali"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-sans font-bold text-white/50 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-base text-white focus:outline-none focus:border-2 focus:border-emerald font-sans placeholder:text-white/30 transition-all"
                        placeholder="sarah@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-sans font-bold text-white/50 uppercase tracking-wider mb-1.5">
                      Project Details or Inquiry
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-base text-white focus:outline-none focus:border-2 focus:border-emerald font-sans resize-none placeholder:text-white/30 transition-all"
                      placeholder="Let's discuss an AI integration project for our mobile app..."
                    />
                  </div>

                  {formError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs md:text-sm font-sans text-center">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full py-3.5 bg-emerald text-white hover:bg-emerald/80 text-sm font-sans font-bold rounded-lg border border-transparent shadow-2xl shadow-emerald/10 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formLoading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-ink border-t-transparent rounded-full animate-spin"></span>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-ink border border-white/10 p-8 md:p-10 rounded-3xl text-center space-y-4 shadow-2xl shadow-ink/10"
                >
                  <div className="w-12 h-12 bg-emerald text-paper rounded-full flex items-center justify-center mx-auto border border-white/20">
                    <Check className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>
                  <h4 className="font-display font-bold text-xl text-emerald">Message Sent</h4>
                  <p className="text-sm text-white/80 max-w-sm mx-auto leading-relaxed">
                    Message sent — I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-sans font-bold rounded-lg border border-white/20 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 py-8 px-6 md:px-12 bg-pine text-white/60 text-center text-xs font-sans space-y-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto flex-col sm:flex-row gap-4">
          <div className="text-left">
            <span className="font-bold text-white block">USBAH SALEEM</span>
            <span className="text-[10px] text-white/40">Mobile App Developer &amp; AI Integration Engineer</span>
          </div>

          <div className="flex space-x-6 text-[10px]">
            <a href="https://github.com/usbahawan" target="_blank" rel="noopener noreferrer" className="hover:text-emerald transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/usbah-saleem-315a0b327/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald transition-colors">LinkedIn</a>
            <a href="https://www.instagram.com/docto.dev?igsh=MWs4eWxubjN2eGxsOA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-emerald transition-colors">Instagram</a>
            <a href="mailto:awanusbah@gmail.com" onClick={handleEmailClick} className="hover:text-emerald transition-colors cursor-pointer">Email</a>
          </div>
        </div>

        <div className="border-t border-paper/10 pt-4 flex items-center justify-center max-w-6xl mx-auto text-[9px] text-paper/30">
          <span>&copy; {new Date().getFullYear()} USBAH SALEEM. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    </div>
  );
}
