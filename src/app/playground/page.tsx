import Link from "next/link";
const ITEMS = Array.from({ length: 9 }, (_, i) => ({ i, c: ["#FF2B2B", "#1F3BFF", "#FFD400"][i % 3] }));
const SHAPES = [
  "col-span-2 row-span-2 rounded-[42%_58%_55%_45%/48%_42%_58%_52%]",
  "rounded-[58%_42%_45%_55%/52%_58%_42%_48%]",
  "rounded-[45%_55%_60%_40%/55%_45%_55%_45%] aspect-[3/4]",
  "rounded-[60%_40%_42%_58%/45%_55%_45%_55%]",
  "col-span-2 rounded-[38%_62%_50%_50%/55%_45%_60%_40%]",
  "rounded-[52%_48%_58%_42%/42%_58%_48%_52%] aspect-square",
  "rounded-[46%_54%_40%_60%/58%_42%_58%_42%] aspect-[3/4]",
  "col-span-2 rounded-[58%_42%_55%_45%/45%_55%_42%_58%]",
  "rounded-[44%_56%_52%_48%/56%_44%_56%_44%]",
];
export default function Playground() {
  return (
    <main className="max-w-md mx-auto px-5 pb-24 md:max-w-2xl">
      <nav className="py-5 font-sans-ui text-xs uppercase tracking-widest"><Link href="/" className="underline">← Home</Link></nav>
      <h1 className="text-5xl font-black tracking-tighter">Playground</h1>
      <p className="italic mt-1">Art, photos & artefacts. An organic mosaic — swap these slots with yours.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 auto-rows-[130px] md:auto-rows-[150px]">
        {ITEMS.map((it) => (
          <div
            key={it.i}
            className={`border-2 border-black p-3 flex items-end overflow-hidden ${SHAPES[it.i % SHAPES.length]} ${it.i % 2 ? "rotate-1" : "-rotate-1"}`}
            style={{ background: `linear-gradient(135deg, #fff 55%, ${it.c}66)` }}
          >
            <span className="font-sans-ui text-xs font-bold uppercase bg-white/70 rounded-full px-2 py-0.5">Artefact 0{it.i + 1}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
