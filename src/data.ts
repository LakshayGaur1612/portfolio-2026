export type Project = {
  slug: string;
  title: string;
  tag: string;
  accent: string;
  tldr: string;
  meta: string[];
  problem: string;
  insight: string;
  decisions: { title: string; body: string }[];
  impact: string[];
  learning: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "two-wheeler",
    title: "2-Wheeler Service-Ops",
    tag: "Professional · Hero MotoCorp · 0.18M users",
    accent: "#FF2B2B",
    tldr: "0.18M users. Too many taps. One job card.",
    meta: ["Role: Product Designer", "Platform: Mobile + Tablet", "Year: 2026"],
    problem: "Supervisors were drowning. Every job card dragged through dependencies, handoffs and 20+ extra taps. Technicians waited, QRA staff sat idle.",
    insight: "How might we let simple jobs skip the queue? Let QRA eat the easy jobs, save supervisors for the hard ones.",
    decisions: [
      { title: "Split the flow: simple vs complex", body: "WhatsApp research + Jira mining showed 40% of jobs were trivial. New QRA fast-lane creates them in half the steps." },
      { title: "Kill 11–24 dead clicks", body: "Persona-mapped job-card creation, prefilled defaults, killed redundant approvals. 25–42% faster creation." },
      { title: "Multilingual + UAT hardened", body: "Tablet-first layouts tested in-field, multilingual support for pan-India techs." },
    ],
    impact: ["−25–42% job-card creation time", "−11–24 interactions per flow", "+10–15% daily business throughput"],
    learning: "Enterprise speed isn't fancier UI — it's fewer decisions. Next: offline-first for low-network service bays.",
  },
  {
    slug: "biobrain",
    title: "BioBrain",
    tag: "Professional · Stevie Award 2025 · Research Ops",
    accent: "#1F3BFF",
    tldr: "5 platforms. 0 clarity. One story-telling dashboard.",
    meta: ["Role: Product Designer", "Platform: Desktop SaaS + AI", "Year: 2022–24"],
    problem: "Brand managers juggled 5+ tools, survey programming ate weeks, collaborators drifted. Insights arrived stale.",
    insight: "HMW turn fragmented research stages into one continuous story? Start with the ending: a dashboard that tells it.",
    decisions: [
      { title: "Story-first dashboard", body: "Interactive drill-downs, filters, cross-question tables — explore a point, follow it to the source." },
      { title: "Configurable data pipelines", body: "Users wire answers → stages visually instead of filing tickets for every survey change." },
      { title: "One design system, 7 stages", body: "Survey tool, viz, admin — one scalable kit so 7+ research stages feel like one product." },
    ],
    impact: ["4× faster project execution", "60%+ higher retention", "7+ research stages unified"],
    learning: "Data products fail on trust, not charts. Next: explainable pipeline states everywhere.",
  },
  {
    slug: "habitat",
    title: "Habitat",
    tag: "Personal · Life OS · Mobile-first",
    accent: "#0a7d2c",
    tldr: "Not more tasks. More transformation.",
    meta: ["Role: Designer + Builder", "Platform: Mobile-first PWA", "Status: In progress"],
    problem: "Guidance dies between sessions. Tasks track completion, journals collect dust, AI gives context-free advice.",
    insight: "Loop it: Psychology → Action → Reflection → Awareness → Adaptation. The day is the interface.",
    decisions: [
      { title: "Day, not dashboard", body: "One calm question — what should I focus on today? Five modules: Psychology, Tasks, Reflections, Journal, Notes." },
      { title: "Reflections as USP", body: "Structured prompts (scales, grids, choices) compound into pattern memory — not another empty text box." },
      { title: "Calm over confetti", body: "No streak-guilt, no badges. Serif warmth, sage calm, one card at a time." },
    ],
    impact: ["21-day guided journeys", "Guru → Student → Doer role fluidity", "Patterns over streaks"],
    learning: "Care > monitoring. Next: reflection-informed journey adaptation + Doer mode.",
  },
  {
    slug: "whyser",
    title: "Whyser",
    tag: "Personal · Deep-reading workspace",
    accent: "#FFD400",
    tldr: "One doc. Many windows. Zero scroll hell.",
    meta: ["Role: Designer + Builder", "Platform: Desktop-first", "Status: Prototype"],
    problem: "Long docs force one vertical stream. Compare two sections? Scroll-marathon. Notes beside source? Good luck.",
    insight: "One document, multiple independently adjustable windows. A reading desk, not a viewer.",
    decisions: [
      { title: "Golden-ratio panes", body: "2–4 columns, splittable rows, draggable dividers. Every pane scrolls + resizes type independently." },
      { title: "Controls on demand", body: "Floating header, hover pane controls, black WYSIWYG-on-select. Resting state = pure content." },
      { title: "Shared parse, free viewports", body: "EPUB/URL chunked + cached globally; each pane keeps its own scroll. Responsive images, semantic formatting." },
    ],
    impact: ["3 reading surfaces + notes by default", "Independent scroll + per-pane type", "Progressive EPUB loading"],
    learning: "Quiet UI is hard. Next: mobile companion + synced highlights.",
  },
];
