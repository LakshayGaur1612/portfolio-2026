import Link from "next/link";
const ITEMS = Array.from({ length: 9 }, (_, i) => ({ i, c: ["#FF2B2B", "#1F3BFF", "#FFD400"][i % 3] }));
export default function Playground() {
  return (
    <main className="max-w-md mx-auto px-5 pb-24 md:max-w-2xl">
      <nav className="py-5 font-sans-ui text-xs uppercase tracking-widest"><Link href="/" className="underline">← Home</Link></nav>
      <h1 className="text-5xl font-black tracking-tighter">Playground</h1>
      <p className="italic mt-1">Art, photos & artefacts. Swap these 9 slots with yours.</p>
      <div className="grid grid-cols-2 gap-3 mt-6">
        {ITEMS.map((it) => (
          <div key={it.i} className="border-2 border-black rounded-xl h-44 flex items-end p-2" style={{ background: `linear-gradient(135deg, #fff 60%, ${it.c}55)` }}>
            <span className="font-sans-ui text-xs font-bold uppercase">Artefact 0{it.i + 1}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
