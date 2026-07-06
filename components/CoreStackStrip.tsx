"use client";

import { useState } from "react";
import {
  SiFlutter,
  SiDart,
  SiPython,
  SiFirebase,
  SiSupabase,
  SiPytorch,
  SiTensorflow,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiKotlin,
} from "react-icons/si";
import { Network } from "lucide-react";

const STACK = [
  { icon: SiFlutter, label: "Flutter" },
  { icon: SiDart, label: "Dart" },
  { icon: SiKotlin, label: "Kotlin" },
  { icon: SiPython, label: "Python" },
  { icon: SiFirebase, label: "Firebase" },
  { icon: SiSupabase, label: "Supabase" },
  { icon: SiMongodb, label: "MongoDB" },
  { icon: SiPytorch, label: "PyTorch" },
  { icon: SiTensorflow, label: "TensorFlow" },
  { icon: SiReact, label: "React" },
  { icon: SiNextdotjs, label: "Next.js" },
  { icon: SiNodedotjs, label: "Node.js" },
  { icon: Network, label: "REST APIs" },
];

export function CoreStackStrip() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full border-y border-ink/10 bg-paper py-6 mt-12 md:mt-16">
      <div className="mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-8 px-6">
        {STACK.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="relative flex flex-col items-center cursor-default"
            onMouseEnter={() => setHovered(label)}
            onMouseLeave={() => setHovered(null)}
          >
            <Icon
              size={28}
              className={`transition-colors duration-200 ${
                hovered === label ? "text-emerald" : "text-ink/60"
              }`}
            />
            {hovered === label && (
              <span className="absolute -bottom-7 whitespace-nowrap rounded bg-ink px-2 py-1 text-xs text-paper z-10 pointer-events-none">
                {label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
