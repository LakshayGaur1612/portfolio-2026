import Link from "next/link";
import { PROJECTS } from "../../../data";

function PhoneWire({ mode }: { mode: "flow" | "modal" | "dash" }) {
  return (
    <div className="w-[190px] mx-auto rounded-[2rem] bg-white p-2" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.10)" }}>
      <div className="rounded-[1.6rem] bg-[#F4F2EE] overflow-hidden relative h-[340px]">
        <div className="mx-auto mt-2 w-16 h-4 bg-black/80 rounded-full" />
        {/* screen 1 */}
        <div className="wire-screen absolute inset-x-3 top-8 bottom-3" style={{ animation: mode === "flow" ? "wflow 6s ease-in-out infinite" : undefined }}>
          <div className="bg-white rounded-xl p-2.5 shadow-sm">
            <div className="h-2 w-2/3 rounded bg-black/15" />
            <div className="mt-2 space-y-1.5">
              {[90, 70, 80].map((w, i) => <div key={i} className="h-6 rounded-lg bg-black/[0.06]" style={{ width: `${w}%` }} />)}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {[0, 1].map((i) => <div key={i} className="h-14 rounded-xl bg-white shadow-sm" />)}
          </div>
        </div>
        {/* screen 2 (slides in for flow mode) */}
        {mode === "flow" && (
          <div className="wire-screen2 absolute inset-x-3 top-8 bottom-3" style={{ animation: "wflow2 6s ease-in-out infinite" }}>
            <div className="bg-[#1F3BFF] rounded-xl p-2.5 text-white font-sans-ui text-[10px]">
              <p className="font-bold">Detail view</p>
              <div className="mt-2 flex items-end gap-1 h-16">
                {[40, 70, 55, 90].map((h, i) => <div key={i} className="flex-1 bg-white/80 rounded-t" style={{ height: `${h}%` }} />)}
              </div>
            </div>
          </div>
        )}
        {/* filter modal */}
        {mode === "modal" && (
          <div className="absolute inset-x-3 bottom-3 rounded-2xl bg-white p-3 shadow-lg" style={{ animation: "wmodal 4s ease-in-out infinite" }}>
            <p className="font-sans-ui text-[10px] font-bold">Filters</p>
            <div className="flex gap-1.5 mt-2">
              {["All", "New", "Done"].map((t, i) => (
                <span key={t} className="font-sans-ui text-[10px] px-2 py-1 rounded-full" style={{ background: i === 1 ? "#0a0a0a" : "#eee", color: i === 1 ? "#fff" : "#555" }}>{t}</span>
              ))}
            </div>
            <div className="mt-2 h-7 rounded-lg bg-black text-white font-sans-ui text-[10px] flex items-center justify-center">Apply</div>
          </div>
        )}
        {/* dashboard pulse */}
        {mode === "dash" && (
          <div className="absolute inset-x-3 top-8">
            <div className="bg-white rounded-xl p-2.5 shadow-sm">
              <div className="flex items-end gap-1 h-20">
                {[50, 80, 60, 95, 70].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-[#1F3BFF]" style={{ height: `${h}%`, opacity: .4 + (i % 3) * .25, animation: `wbar 2s ease-in-out ${i * .2}s infinite alternate` }} />
                ))}
              </div>
            </div>
            <div className="mt-2 bg-white rounded-xl p-2.5 shadow-sm font-sans-ui text-[10px] opacity-70">Tap a bar to drill down ↓</div>
          </div>
        )}
      </div>
      <style>{`@keyframes wflow{0%,45%{transform:translateX(0);opacity:1}55%,100%{transform:translateX(-110%);opacity:0}}@keyframes wflow2{0%,45%{transform:translateX(110%);opacity:0}55%,100%{transform:translateX(0);opacity:1}}@keyframes wmodal{0%,100%{transform:translateY(8px);opacity:.85}50%{transform:translateY(0);opacity:1}}@keyframes wbar{from{transform:scaleY(.75)}to{transform:scaleY(1)}}`}</style>
    </div>
  );
}

function Gif({ label, mode }: { label: string; mode: "flow" | "modal" | "dash" }) {
  return (
    <figure className="my-8">
      <div className="rounded-xl bg-[#ECEAE6] py-8 px-4" style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <PhoneWire mode={mode} />
        <figcaption className="text-center font-sans-ui text-[11px] opacity-50 mt-4">{label} — live wireframe preview</figcaption>
      </div>
    </figure>
  );
}

function Section({ label, title, children }: { label: string; title?: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 md:grid md:grid-cols-[110px_1fr] md:gap-6">
      <p className="font-sans-ui text-[10px] tracking-[0.22em] uppercase opacity-40 md:text-right md:pt-1">{label}</p>
      <div>
        {title && <h2 className="font-sans-ui text-[15px] font-bold">{title}</h2>}
        <div className="font-sans-ui text-[15px] leading-[1.75] opacity-80 mt-2">{children}</div>
      </div>
    </section>
  );
}

export default async function Case({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug) ?? PROJECTS[0];
  const idx = PROJECTS.findIndex((x) => x.slug === p.slug);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const dots = ["#FF2B2B", "#1F3BFF", "#FFD400"];
  return (
    <main className="bg-[#FAF9F7] min-h-screen">
      <article className="max-w-xl mx-auto px-6 pb-32">
        <nav className="py-6 font-sans-ui text-[10px] tracking-[0.2em] uppercase opacity-50">
          <Link href="/" className="hover:opacity-100">← All work</Link>
        </nav>
        <p className="font-sans-ui text-[10px] tracking-[0.22em] uppercase opacity-40">{p.tag}</p>
        <h1 className="font-sans-ui text-2xl font-bold mt-2">{p.title}</h1>
        <p className="font-sans-ui text-[15px] opacity-60 mt-1">{p.tldr}</p>

        <Section label="Overview">
          <p className="font-semibold text-[#111] opacity-100">{p.insight}</p>
          <p className="mt-3">{p.problem}</p>
        </Section>

        <Gif label={`${p.title} — navigating screens`} mode="flow" />

        {p.decisions.map((d, i) => (
          <div key={d.title}>
            <Section label={i === 0 ? "Decisions" : ""} title={d.title}>
              <p>{d.body}</p>
            </Section>
            {i === 0 && <Gif label={`${p.title} — filter modal`} mode="modal" />}
          </div>
        ))}

        <Gif label={`${p.title} — dashboard interaction`} mode="dash" />

        <Section label="Impact">
          <ul className="space-y-2">
            {p.impact.map((m, i) => (
              <li key={m} className="flex items-baseline gap-2">
                <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ background: dots[i % 3] }} />
                <span className="font-semibold text-[#111] opacity-100">{m}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section label="Learning">
          <p className="italic">{p.learning}</p>
        </Section>

        <div className="mt-12 font-sans-ui text-[11px] flex flex-wrap gap-2 opacity-60">
          {p.meta.map((m) => <span key={m}>{m} ·</span>)}
        </div>
      </article>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#6b6b6b]/90 backdrop-blur text-white font-sans-ui text-[11px] rounded-full pl-4 pr-2 py-1.5 flex gap-3 items-center shadow-lg">
        <Link href={`/work/${prev.slug}`} className="opacity-80 hover:opacity-100">‹ Back<br /><b>{prev.title}</b></Link>
        <Link href="/" className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">⌂</Link>
        <Link href={`/work/${next.slug}`} className="opacity-80 hover:opacity-100 text-right">Next ›<br /><b>{next.title}</b></Link>
      </div>
    </main>
  );
}
export function generateStaticParams() { return PROJECTS.map((p) => ({ slug: p.slug })); }
