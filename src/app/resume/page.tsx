import Link from "next/link";
export default function Resume() {
  return (
    <main className="max-w-md mx-auto px-5 pb-24 md:max-w-2xl font-sans-ui">
      <nav className="py-5 text-xs uppercase tracking-widest"><Link href="/" className="underline">← Home</Link></nav>
      <h1 className="text-5xl font-black tracking-tighter" style={{ fontFamily: "Georgia,serif" }}>Lakshay Gaur</h1>
      <p className="text-sm mt-1">Mid-Product Designer · Enterprise SaaS & AI · Gurgaon · Lakshaygaur1612@gmail.com</p>
      <section className="mt-6 border-2 border-black rounded-xl p-4">
        <h2 className="text-xs font-bold uppercase tracking-widest">Profile</h2>
        <p className="text-sm mt-2">5+ yrs designing enterprise SaaS & AI across automotive, research, ads. 2+ yrs leading design. End-to-end: discovery → UX strategy → scalable systems → delivery.</p>
      </section>
      <section className="mt-4 border-2 border-black rounded-xl p-4">
        <h2 className="text-xs font-bold uppercase tracking-widest">Experience</h2>
        <ul className="text-sm mt-2 space-y-3">
          <li><b>Think Design / Havas (2026–)</b> — 2-wheeler service-ops, 0.18M users. −25–42% time, −11–24 clicks.</li>
          <li><b>Foqal Analytics (2025–26)</b> — Led 2 AI products: ad-sales & subscriber lifecycle. −60% planning time.</li>
          <li><b>Tooliqa (2022–24)</b> — BioBrain, Stevie 2025. 4× faster execution, 7+ stages unified.</li>
          <li><b>Dataacross (2024–25)</b> — WhatsApp business platform, WCAG systems.</li>
        </ul>
      </section>
      <section className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="border-2 border-black rounded-xl p-3"><h2 className="text-xs font-bold uppercase">Skills</h2><p className="mt-1">Strategy, IA, wireframes, prototypes, systems</p></div>
        <div className="border-2 border-black rounded-xl p-3"><h2 className="text-xs font-bold uppercase">Tools</h2><p className="mt-1">Figma, Illustrator, HTML/CSS/JS, AI flows</p></div>
      </section>
      <section className="mt-4 border-2 border-black rounded-xl p-4 text-sm">
        <h2 className="text-xs font-bold uppercase tracking-widest">Education</h2>
        <p className="mt-1">SNU M.Des Product Design ’21 — 9.2 · B.Tech Mech ’19 — 7.3</p>
        <p className="mt-1 italic">Publication: Product Semantics, ICoRD-IISc</p>
      </section>
    </main>
  );
}
