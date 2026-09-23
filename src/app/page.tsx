"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROJECTS } from "../data";

function Tree() {
  return (
    <div className="relative">
      <img src="/tree.gif" alt="Tree" className="mx-auto w-64" draggable={false} />
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

function Motorbike({ parked }: { parked: boolean }) {
  const [missing, setMissing] = useState(false);
  if (missing) return <BikeFace parked={parked} />;
  return (
    <img
      src="/bike.png"
      alt="Motorbike"
      onError={() => setMissing(true)}
      className={`w-20 ${parked ? "" : "animate-chug"}`}
      draggable={false}
    />
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
  const [phase, setPhase] = useState({ y: 0, y2: 0, x: 0, rot: 90, parked: false, parkT: 0, checkpoint: 0, turnLabel: "down" });

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
    let smooth = 0; // lerped scroll progress — the bike follows this, not raw scroll
    let target = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
    const H = () => journeyRef.current?.clientHeight ?? 1;
    // 6 segments: down-left → turn1 → across → turn2 → down-right → parked.
    // Position (x,y) is frozen inside turn segments so rotation never drifts diagonally.
    // Travel is proportional to measured journey height so the bike visibly moves the whole way.
    const render = (p: number) => {
      const seg = (a: number, b: number) => clamp01((p - a) / (b - a));
      const h = H();
      const Y1 = h * 0.38;
      const CROSS = h * 0.05;
      const Y2 = h * 0.42;
      const HW = Math.max(120, (journeyRef.current?.clientWidth ?? 400) - 70);
      const yDown = seg(0, 0.35);          // left rail descent
      const turn1 = seg(0.35, 0.45);       // 90° → 0°, held in place
      const across = seg(0.45, 0.65);      // left → right, height held
      const turn2 = seg(0.65, 0.75);       // 0° → 90°, held in place
      const yDown2 = seg(0.75, 0.92);      // right rail descent
      const parkT = seg(0.92, 1);          // settle into parked lean
      const parked = p > 0.92;
      // Rotation: +90 (wheels-left) down-left → 0 across → -90 (wheels-right) down-right → 0 parked
      let rotDeg: number;
      if (p < 0.35) rotDeg = 90;
      else if (p < 0.45) rotDeg = 90 * (1 - turn1);
      else if (p < 0.65) rotDeg = 0;
      else if (p < 0.75) rotDeg = -90 * turn2;
      else if (p < 0.92) rotDeg = -90;
      else rotDeg = -90 * (1 - parkT);
      if (reduced) rotDeg = 0;
      const top = yDown * Y1 + (across > 0 || yDown2 > 0 ? CROSS : across * CROSS) + yDown2 * Y2;
      const left = across * HW;
      setPhase({
        y: top,
        y2: yDown2,
        x: left,
        rot: rotDeg,
        parked,
        parkT,
        checkpoint: p < 0.2 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3,
        turnLabel:
          p < 0.35 ? "down" : p < 0.45 ? "turn1" : p < 0.65 ? "across" : p < 0.75 ? "turn2" : p < 0.92 ? "down-right" : "parked",
      });
    };
    const tick = () => {
      // persistent loop: always ease toward target and render every frame
      smooth += (target - smooth) * (reduced ? 1 : 0.12);
      if (Math.abs(target - smooth) < 0.0005) smooth = target;
      render(smooth);
      raf = requestAnimationFrame(tick);
    };
    const update = () => {
      const el = journeyRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      target = clamp01(-r.top / Math.max(total, 1));
      if (reduced) { smooth = target; render(smooth); }
    };
    const onScroll = () => update();
    update();
    render(0);
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const pros = PROJECTS.slice(0, 2);
  const personal = PROJECTS.slice(2);
  const bikeTop = phase.y;
  const bikeLeft = phase.x;

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
          <h1 className="text-sm font-bold mt-4 font-sans-ui">Product Designer & Creative Technologist</h1>
        </header>

        <div ref={journeyRef} className="relative">
          {/* scroll-driven bike: down-left → across → down-right → parked */}
          <div
            className="absolute left-0 top-0 z-10 pointer-events-none"
            style={{ transform: `translate(${bikeLeft}px, ${bikeTop}px) rotate(${phase.rot}deg) ${phase.parked ? `rotate(${-8 * phase.parkT}deg)` : ""}` }}
          >
            <Motorbike parked={phase.parked} />
          </div>

          {/* ACT 1 — Professional projects on the RIGHT of the bike */}
          <section className="mt-8 pl-24 pr-2">
            <p className="font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-40">Professional Projects</p>
            <div className="mt-3 space-y-0">
              {pros.map((p, i) => (
                <Link key={p.slug} href={`/work/${p.slug}`} className="block reveal min-h-[32vh] py-[3vh]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: phase.checkpoint >= i ? p.accent : "#ddd" }} />
                    <span className="font-sans-ui text-[10px] tracking-[0.2em] uppercase opacity-50">{["2026 · Hero MotoCorp", "2022–24 · BioBrain"][i]}</span>
                  </div>
                  <div className="mt-2">
                    {p.slug === "biobrain" ? (
                      <img src="/case/biobrain/data-visualization.jpg" alt="BioBrain story-telling dashboard" className="rounded-xl w-full" loading="lazy" />
                    ) : (
                      <Visual slug={p.slug} />
                    )}
                  </div>
                  <h3 className="font-sans-ui text-xl font-bold mt-2">{p.title}</h3>
                  <p className="font-sans-ui text-sm opacity-60">{p.tldr}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* TURN MARKER */}
          <p className="font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-40 text-center py-[4vh] px-24">
            — Parked —
          </p>

          {/* ACT 2 — Personal: across */}
          <section className="px-24 min-h-[32vh] py-[3vh]">
            <p className="font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-40">Personal — Across</p>
            <div className="flex flex-col gap-4 mt-3">
              {personal.map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`} className="flex items-center gap-3 reveal bg-white rounded-xl p-3 shadow-sm">
                  <div className="w-24 shrink-0"><Visual slug={p.slug} /></div>
                  <div>
                    <h3 className="font-sans-ui text-sm font-bold">{p.title}</h3>
                    <p className="font-sans-ui text-[11px] opacity-60 leading-snug">{p.tldr}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FINALE — parked */}
          <section className="mt-10 pr-24 text-center min-h-[36vh] pb-[6vh]">
            <Link href="/playground" className="block reveal">
              <p className="font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-40">Miscellaneous</p>
              <h3 className="font-sans-ui text-xl font-bold mt-1">Playground →</h3>
            </Link>
            <p className="font-sans-ui text-[11px] uppercase tracking-[0.25em] opacity-50 mt-8">
              ● Parked · Thanks for riding
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
