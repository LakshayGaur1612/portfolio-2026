"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROJECTS } from "../data";

const LEAVES = Array.from({ length: 18 }, (_, i) => ({
  left: 8 + ((i * 53) % 84),
  delay: (i * 0.55) % 8,
  dur: 7 + ((i * 37) % 40) / 10,
  size: 4 + ((i * 29) % 5),
  drift: 40 + ((i * 41) % 70),
  color: ["#1F3BFF", "#0a7d2c", "#FF2B2B"][i % 3],
}));

function Tree() {
  return (
    <div className="relative">
      <div className="animate-sway mx-auto w-56">
        <svg viewBox="0 0 200 170" className="w-full">
          <path d="M95 165 C95 130 88 108 68 92 M105 165 C105 125 116 102 138 86" stroke="#111" strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M92 130 C80 125 72 118 66 108 M108 128 C120 122 128 114 132 104" stroke="#111" strokeWidth="3" fill="none" />
          <ellipse cx="100" cy="68" rx="72" ry="52" fill="#111" />
          <ellipse cx="72" cy="58" rx="30" ry="22" fill="#FAF9F7" />
          <ellipse cx="128" cy="52" rx="26" ry="20" fill="#FAF9F7" />
          <ellipse cx="100" cy="84" rx="34" ry="17" fill="#FAF9F7" opacity="0.9" />
          <ellipse cx="52" cy="76" rx="14" ry="12" fill="#FAF9F7" />
          <ellipse cx="150" cy="74" rx="15" ry="12" fill="#FAF9F7" />
        </svg>
      </div>
      {LEAVES.map((l, i) => (
        <span
          key={i}
          className="wind-leaf absolute top-10 rounded-full"
          style={{
            left: `${l.left}%`,
            width: l.size, height: l.size,
            background: l.color, opacity: 0.55,
            animationDuration: `${l.dur}s`,
            animationDelay: `${l.delay}s`,
            ["--drift" as string]: `${l.drift}px`,
          }}
        />
      ))}
      <style>{`@keyframes windblow{0%{transform:translate(0,0) rotate(0);opacity:0}12%{opacity:.7}80%{opacity:.5}100%{transform:translate(calc(var(--drift)*-1),70px) rotate(50deg);opacity:0}}.wind-leaf{animation-name:windblow;animation-iteration-count:infinite;animation-timing-function:ease-in-out}@media (prefers-reduced-motion:reduce){.wind-leaf,.animate-sway{animation:none!important}}`}</style>
    </div>
  );
}

function BikeFace({ parked }: { parked: boolean }) {
  return (
    <svg viewBox="0 0 120 60" className={`w-20 ${parked ? "" : "animate-chug"}`} fill="none" stroke="#111" strokeWidth="3">
      <circle cx="28" cy="44" r="12" fill="#FAF9F7" /><circle cx="92" cy="44" r="12" fill="#FAF9F7" />
      <circle cx="28" cy="44" r="3" fill="#111" /><circle cx="92" cy="44" r="3" fill="#111" />
      <path d="M28 44 L48 24 L72 24 L92 44 M48 24 L42 12 L58 12 M60 24 L55 44 L28 44 M72 24 L80 10 L92 10" />
      <circle cx="98" cy="22" r="9" fill="#FFD400" stroke="#111" /><text x="94" y="26" fontSize="9" fill="#111" stroke="none" fontWeight="bold">15</text>
      {!parked && <path d="M16 44 q-8 2 -12 8 M14 50 q-7 1 -10 6" stroke="#999" strokeWidth="2" />}
    </svg>
  );
}

function Visual({ slug }: { slug: string }) {
  const soft = "rounded-xl overflow-hidden";
  if (slug === "two-wheeler")
    return (
      <div className={`${soft} bg-[#F3EFE9] p-4`}>
        <div className="space-y-2">
          {["Job #4821 · QRA ✓ fast", "Job #4822 · Queued", "Job #4823 · Queued"].map((j, i) => (
            <div key={j} className="bg-white rounded-lg px-3 py-2 font-sans-ui text-[11px] shadow-sm" style={{ animation: `slidein 3s ease-in-out ${i * 0.6}s infinite alternate` }}>{j}</div>
          ))}
        </div>
      </div>
    );
  if (slug === "biobrain")
    return (
      <div className={`${soft} bg-[#EEF1FF] p-4`}>
        <div className="flex items-end gap-1.5 h-24">
          {[40, 65, 50, 80, 58, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-[#1F3BFF]" style={{ height: `${h}%`, opacity: 0.35 + (i % 3) * 0.25, animation: `bar 2.4s ease-in-out ${i * 0.2}s infinite alternate` }} />
          ))}
        </div>
      </div>
    );
  if (slug === "habitat")
    return (
      <div className={`${soft} bg-[#EFF5EC] p-4 flex gap-2 overflow-hidden`}>
        {["Psy", "Act", "Refl"].map((t, i) => (
          <div key={t} className="bg-white rounded-lg px-3 py-4 font-sans-ui text-[11px] shadow-sm min-w-[80px] text-center font-bold" style={{ animation: `floaty 3.5s ease-in-out ${i * 0.5}s infinite alternate` }}>{t}</div>
        ))}
      </div>
    );
  return (
    <div className={`${soft} bg-[#FFF7DC] p-4`}>
      <div className="flex gap-1.5">
        {[38, 62].map((w, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-2" style={{ width: `${w}%` }}>
            {[80, 60, 70].map((l, j) => (
              <div key={j} className="h-1.5 rounded-full bg-black/10 my-1.5" style={{ width: `${l}%` }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState({ y: 0, x: 0, rot: 0, parked: false, checkpoint: 0 });

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const update = () => {
      raf = 0;
      const el = journeyRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(total, 1)));
      // vertical ride 0→0.45, turn 0.45→0.55, horizontal 0.55→0.85, parked 0.85→1
      const y = Math.min(p / 0.45, 1);
      const turn = Math.min(Math.max((p - 0.45) / 0.1, 0), 1);
      const x = Math.min(Math.max((p - 0.55) / 0.3, 0), 1);
      const parked = p > 0.88;
      setPhase({
        y, x,
        rot: reduced ? 0 : turn * 90,
        parked,
        checkpoint: p < 0.2 ? 0 : p < 0.42 ? 1 : p < 0.7 ? 2 : 3,
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const pros = PROJECTS.slice(0, 2);
  const personal = PROJECTS.slice(2);
  const vh = 320; // vertical travel px
  const hw = 180; // horizontal travel px

  return (
    <main className="bg-[#FAF9F7] min-h-screen">
      <div className="max-w-xl mx-auto px-6 pb-32">
        <nav className="flex items-start justify-between py-6 font-sans-ui text-[10px] tracking-[0.2em] uppercase opacity-60">
          <div className="leading-relaxed">Lakshay Gaur<br />Gurgaon, IN<br />28.6° N, 77.2° E</div>
          <div className="flex gap-4">
            <Link href="/resume">Resume</Link>
            <Link href="/playground">Playground</Link>
          </div>
        </nav>

        <header className="pt-6 text-center">
          <p className="font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-50">Portfolio 2026</p>
          <Tree />
          <p className="font-sans-ui text-[11px] mt-1 uppercase tracking-widest opacity-40">Soft wind study — leaves drift slow & gentle</p>
          <h1 className="text-sm font-bold mt-4 font-sans-ui">Product Designer & Creative Technologist</h1>
          <p className="mt-2 text-sm opacity-60 font-sans-ui max-w-sm mx-auto">Scroll — the bike rides down through my work, turns, and parks at the end.</p>
        </header>

        <div ref={journeyRef} className="relative">
          {/* scroll-driven bike: absolute, travels the whole journey */}
          <div
            className="absolute left-0 top-0 z-10 pointer-events-none transition-transform duration-100"
            style={{ transform: `translate(${phase.x * hw}px, ${phase.y * vh + phase.x * 620}px) rotate(${phase.rot}deg) ${phase.parked ? "rotate(-8deg)" : ""}` }}
          >
            <BikeFace parked={phase.parked} />
          </div>

          {/* ACT 1 — Professional: timeline on the RIGHT of the bike */}
          <section className="mt-8 pl-24">
            <p className="font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-40">Professional — the ride down</p>
            <div className="space-y-6 mt-3">
              {pros.map((p, i) => (
                <Link key={p.slug} href={`/work/${p.slug}`} className="block reveal">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: phase.checkpoint >= i ? p.accent : "#ddd" }} />
                    <span className="font-sans-ui text-[10px] tracking-[0.2em] uppercase opacity-50">{["2026 · Hero MotoCorp", "2022–24 · BioBrain"][i]}</span>
                  </div>
                  <div className="mt-2"><Visual slug={p.slug} /></div>
                  <h3 className="font-sans-ui text-xl font-bold mt-2">{p.title}</h3>
                  <p className="font-sans-ui text-sm opacity-60">{p.tldr}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* TURN ZONE */}
          <p className="font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-40 text-center my-8 pl-24">
            {phase.rot > 45 ? "— turned, riding across —" : "— the turn —"}
          </p>

          {/* ACT 2 — Personal: horizontal ride */}
          <section className="pl-24">
            <p className="font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-40">Personal — across</p>
            <div className="grid grid-cols-2 gap-4 mt-3">
              {personal.map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`} className="block reveal bg-white rounded-xl p-3 shadow-sm">
                  <Visual slug={p.slug} />
                  <h3 className="font-sans-ui text-sm font-bold mt-2">{p.title}</h3>
                  <p className="font-sans-ui text-[11px] opacity-60 leading-snug">{p.tldr}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FINALE — parked */}
          <section className="mt-10 pl-24 text-center">
            <Link href="/playground" className="block reveal">
              <p className="font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-40">Miscellaneous</p>
              <h3 className="font-sans-ui text-xl font-bold mt-1">Playground →</h3>
            </Link>
            <p className="font-sans-ui text-[11px] uppercase tracking-[0.25em] opacity-50 mt-8">
              {phase.parked ? "● Parked · thanks for riding" : "○ still riding…"}
            </p>
          </section>
        </div>

        <footer className="mt-10 text-center font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-60">
          Lakshaygaur1612@gmail.com · <Link href="/" className="underline">Return to gate</Link>
        </footer>
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur text-white font-sans-ui text-[11px] rounded-full px-5 py-2 flex gap-4 items-center z-20">
          <Link href="/">⌂</Link>
          <Link href="/resume">Resume</Link>
          <Link href="/playground">Playground</Link>
        </div>
      </div>
      <style>{`@keyframes bar{from{transform:scaleY(.7)}to{transform:scaleY(1)}}@keyframes slidein{from{transform:translateX(-4px)}to{transform:translateX(4px)}}@keyframes floaty{from{transform:translateY(-3px)}to{transform:translateY(3px)}}`}</style>
    </main>
  );
}
