"use client";
import { useEffect } from "react";
import Link from "next/link";
import { PROJECTS } from "../data";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Subtle animated visuals per project — CSS only, stroke-free */
function Visual({ slug }: { slug: string }) {
  const soft = "rounded-xl overflow-hidden";
  if (slug === "two-wheeler")
    return (
      <div className={`${soft} bg-[#F3EFE9] p-4`}>
        <div className="flex items-center gap-2">
          <div className="flex-1 space-y-2">
            {["Job #4821", "Job #4822", "Job #4823"].map((j, i) => (
              <div key={j} className="bg-white rounded-lg px-3 py-2 font-sans-ui text-[11px] shadow-sm flex justify-between" style={{ animation: `slidein 3s ease-in-out ${i * 0.6}s infinite alternate` }}>
                <span>{j}</span><span className="font-bold" style={{ color: i === 0 ? "#0a7d2c" : "#999" }}>{i === 0 ? "QRA ✓ fast" : "Queued"}</span>
              </div>
            ))}
          </div>
          <div className="font-sans-ui text-[10px] opacity-50">−42%<br />time</div>
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
        <p className="font-sans-ui text-[11px] mt-2 opacity-60">Drill down → filter → story · 4× faster</p>
      </div>
    );
  if (slug === "habitat")
    return (
      <div className={`${soft} bg-[#EFF5EC] p-4 flex gap-2 overflow-hidden`}>
        {["Psy", "Act", "Refl"].map((t, i) => (
          <div key={t} className="bg-white rounded-lg px-3 py-4 font-sans-ui text-[11px] shadow-sm min-w-[90px] text-center" style={{ animation: `floaty 3.5s ease-in-out ${i * 0.5}s infinite alternate` }}>
            <p className="font-bold">{t}</p><p className="opacity-50 mt-1">day card</p>
          </div>
        ))}
      </div>
    );
  return (
    <div className={`${soft} bg-[#FFF7DC] p-4`}>
      <div className="flex gap-1.5">
        {[38, 62].map((w, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-2 overflow-hidden" style={{ width: `${w}%` }}>
            {[80, 60, 70].map((l, j) => (
              <div key={j} className="h-1.5 rounded-full bg-black/10 my-1.5" style={{ width: `${l}%`, animation: `slidein 3s ease ${j * 0.3}s infinite alternate` }} />
            ))}
          </div>
        ))}
      </div>
      <p className="font-sans-ui text-[11px] mt-2 opacity-60">One doc · many windows</p>
    </div>
  );
}

export default function Home() {
  useReveal();
  const pros = PROJECTS.slice(0, 2);
  const personal = PROJECTS.slice(2);
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

        <header className="pt-8 text-center">
          <p className="font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-50">Portfolio 2026</p>
          <h1 className="text-sm font-bold mt-4 font-sans-ui">Product Designer & Creative Technologist</h1>
          <p className="mt-2 text-sm opacity-60 font-sans-ui max-w-sm mx-auto">5+ years turning fragmented enterprise workflows into calm, clear systems.</p>
        </header>

        {/* Professional — big feature cards, no strokes */}
        <section className="mt-10">
          <p className="font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-40">Professional — featured</p>
          <div className="space-y-6 mt-3">
            {pros.map((p, i) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="block reveal">
                <Visual slug={p.slug} />
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ background: p.accent }} />
                  <span className="font-sans-ui text-[10px] tracking-[0.2em] uppercase opacity-50">{["2026 · Hero MotoCorp", "2022–24 · BioBrain"][i]}</span>
                </div>
                <h3 className="font-sans-ui text-xl font-bold mt-1">{p.title}</h3>
                <p className="font-sans-ui text-sm opacity-60">{p.tldr}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Personal — compact 2-col */}
        <section className="mt-12">
          <p className="font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-40">Personal — experiments</p>
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

        <Link href="/playground" className="block mt-10 reveal">
          <p className="font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-40">Miscellaneous</p>
          <h3 className="font-sans-ui text-xl font-bold mt-1">Playground →</h3>
          <p className="font-sans-ui text-sm opacity-60">Art, photos & artefacts.</p>
        </Link>

        <footer className="mt-12 text-center font-sans-ui text-[10px] tracking-[0.25em] uppercase opacity-60">
          Lakshaygaur1612@gmail.com · <Link href="/" className="underline">Return to gate</Link>
        </footer>
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur text-white font-sans-ui text-[11px] rounded-full px-5 py-2 flex gap-4 items-center">
          <Link href="/">⌂</Link>
          <Link href="/resume">Resume</Link>
          <Link href="/playground">Playground</Link>
        </div>
      </div>
      <style>{`@keyframes bar{from{transform:scaleY(.7)}to{transform:scaleY(1)}}@keyframes slidein{from{transform:translateX(-4px)}to{transform:translateX(4px)}}@keyframes floaty{from{transform:translateY(-3px)}to{transform:translateY(3px)}}`}</style>
    </main>
  );
}
