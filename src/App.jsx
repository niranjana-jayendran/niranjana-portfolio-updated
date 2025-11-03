import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Award as AwardIcon,
  Briefcase,
  Cpu,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Star,
  Mail,
  Linkedin,
  FileText,
  Link as LinkIcon,
  Users,
} from "lucide-react";


const Button = ({ children, variant = "default", size = "md", asChild, ...props }) => {
  const base = "inline-flex items-center justify-center rounded-2xl border transition px-3 py-2 text-sm";
  const styles = {
    default: "bg-black text-white border-black hover:opacity-90",
    outline: "bg-white text-black border-black/20 hover:border-black/40",
    ghost: "bg-transparent text-black border-transparent hover:bg-black/5",
  };
  const sizes = { sm: "px-2 py-1 text-sm rounded-xl", md: "px-3 py-2", lg: "px-4 py-2.5 text-base" };
  const cls = `${base} ${styles[variant]} ${sizes[size]}`;
  if (asChild) return React.cloneElement(children, { className: cls });
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
};

const Card = ({ className = "", children }) => <div className={`rounded-2xl border ${className}`}>{children}</div>;
const CardHeader = ({ children }) => <div className="px-5 pt-5">{children}</div>;
const CardTitle = ({ children, className = "" }) => <h3 className={`font-semibold ${className}`}>{children}</h3>;
const CardContent = ({ children, className = "" }) => <div className={`px-5 pb-5 ${className}`}>{children}</div>;


const ABOUT = {
  name: "Niranjana Jayendran",
  tagline: "Student advocate • Mindfulness instructor • Community builder",
  blurb:
    "National Secretary of BPA’s Secondary Division serving ~60,000 students. I design trustworthy, human-centered tech and scalable student programs; co-founded my school’s DECA chapter (ICDC in year one) and lead breathing/stress-management workshops for 1,000+ educators and students.",
  highlights: [
    "+54% state membership growth (BPA Florida)",
    "AP Research: R² 0.92 predicting recall timing from ADR sentiment",
    "ICDC qualification in DECA’s first year at my school",
    "Bharatanatyam Arangetram; performer at World Culture Festival (National Mall)",
  ],
  contacts: {
    email: "niranjanajayendran@gmail.com",
    linkedin: "https://www.linkedin.com/in/niranjana-jayendran-ab5576276/",
    resume: "#",
  },
};

const ENGINEERING = [
  {
    title: "Predicting Drug Recall Timing from Public Signals",
    org: "AP Research",
    summary:
      "Estimated recall timing from ADR discussions using sentiment and anomaly patterns; emphasized interpretability and ethical limits.",
    details: ["Framed as timing (days) rather than a simple yes/no.", "Reported R² and MAE; documented boundaries and use-cases."],
  },
  {
    title: "Automation that Earns Trust in Small Businesses",
    org: "IntelliEase AI Solutions",
    summary:
      "Mapped service workflows and added audit trails, checkpoints, and human-in-the-loop steps; pilot billing errors reduced ≈50% and adoption increased.",
    details: ["Co-designed guardrails and exception handling with owners.", "Focused on restarts, opt-outs, and time-to-first-value."],
  },
  {
    title: "Clinician Dashboard for Transparent Suggestions",
    org: "SoulMender AI",
    summary:
      "Prototyped therapist-facing flows with clear rationale for suggestions; aligned UI with clinician expectations and safety.",
    details: ["Interviewed stakeholders; prioritized explain-why patterns."],
  },
];

const BUSINESS = [
  {
    title: "BPA National Secretary (Secondary Division)",
    org: "Business Professionals of America",
    summary:
      "Programs for ~60,000 students: refreshed Student Certification Series, launched cross-state Buddy System, co-designed National Leadership Summit workshops.",
    details: ["Scaled communications and reusable toolkits for officers."],
  },
  {
    title: "Florida BPA President — Membership +54%",
    org: "BPA Florida",
    summary:
      "Managed ~1,500-member association; planned 500-attendee SLC; built advisor coalition and clear role guides to sustain growth.",
    details: ["Student-led ops with measurable engagement targets."],
  },
  {
    title: "DECA Co-founder & President (ICDC Year One)",
    org: "Pine View School",
    summary:
      "Built training pipeline, event selection strategy, and peer coaching; chapter grew to 40 and advanced to ICDC in year one.",
    details: ["Mentored teams on research, presentation, and role-play."],
  },
];


const AWARDS = [
  // Debate / Speech
  { title: "NSDA Extemporaneous Speaking — National Qualifier (1st)", org: "NSDA", level: "National", year: 2025, rank: "1st", notes: "Qualified via district championship" },
  { title: "District Champion — Extemporaneous Speaking", org: "NSDA", level: "District", year: 2024, rank: "1st", notes: "Team historian; led chapter engagement +25%" },
  { title: "District Finalist — Extemporaneous Speaking", org: "NSDA", level: "District", year: 2023, rank: "2nd", notes: "Multiple placements across seasons" },

  // BPA
  { title: "BPA SLC — Economic Research", org: "BPA Florida", level: "State", year: 2024, rank: "2nd", notes: "Team project; 150+ teams statewide" },
  { title: "BPA SLC — Presentation Team", org: "BPA Florida", level: "State", year: 2024, rank: "3rd", notes: "Cross-functional presentation event" },

  // DECA
  { title: "DECA Districts — Travel & Tourism TDM", org: "DECA", level: "District", year: 2025, rank: "2nd", notes: "Advanced to Florida States in chapter’s founding year" },
  { title: "DECA States — Travel & Tourism TDM", org: "DECA", level: "State", year: 2025, rank: "1st", notes: "Advanced to ICDC" },

  // Academics / Exams
  { title: "PSAT/NMSQT — National Merit Scholar", org: "College Board", level: "National", year: 2025, rank: "Top 1%", notes: "National Merit Scholar" },

  // Music / Arts
  { title: "RCM Piano — First Class Honors", org: "Royal Conservatory of Music", level: "National", year: 2023, rank: "Honors", notes: "Multiple First Class Honors; Silver/Bronze medals" },
  { title: "World Culture Festival Performer", org: "Art of Living Foundation", level: "International", year: 2023, rank: "Selected Performer", notes: "Performed Bharatanatyam on the National Mall (1M+ audience)" },

  // Service / Honor Societies
  { title: "National Honor Society", org: "NHS", level: "National", year: 2024, rank: "Member", notes: "Service and scholarship" },
];

const TABS = [
  { id: "engineering", icon: Cpu, label: "Engineering" },
  { id: "business", icon: Briefcase, label: "Business" },
  { id: "awards", icon: AwardIcon, label: "Awards" },
];

// =========================
// UTILITIES
// =========================
function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

// Pencil-sketch dynamic background (SVG paths with stroke-dash animations)
const PencilSketchBackground = () => (
  <svg className="absolute inset-0 -z-10 w-full h-full opacity-[0.07]" viewBox="0 0 1200 800" preserveAspectRatio="none">
    <defs>
      <filter id="roughen" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feDisplacementMap in="SourceGraphic" scale="1" />
      </filter>
    </defs>
    {[
      "M50 120 C 180 60, 320 180, 460 110",
      "M80 300 C 240 240, 360 360, 520 280",
      "M700 160 C 860 120, 940 220, 1100 180",
      "M680 360 C 820 320, 960 420, 1120 380",
      "M120 520 C 280 480, 380 560, 560 520",
      "M640 560 C 780 520, 940 620, 1120 580",
    ].map((d, i) => (
      <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" filter="url(#roughen)" strokeDasharray="6 8">
        <animate attributeName="stroke-dashoffset" values="0;14" dur={`${6 + i}s`} repeatCount="indefinite" />
      </path>
    ))}
    {/* Hint of icons in line art: cap & scroll */}
    <g transform="translate(950 120) scale(1.1)" stroke="currentColor" fill="none" strokeWidth="2">
      <path d="M0 0 L40 12 L0 24 L-40 12 Z" />
      <path d="M-20 14 L-20 32 L20 32 L20 14" />
    </g>
    <g transform="translate(240 640) scale(1.2)" stroke="currentColor" fill="none" strokeWidth="2">
      <rect x="-28" y="-14" width="56" height="28" rx="6" />
      <circle cx="-10" cy="0" r="3" />
      <circle cx="10" cy="0" r="3" />
    </g>
  </svg>
);

const Background = () => (
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(120,119,198,0.16),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(56,189,248,0.14),transparent_35%),radial-gradient(circle_at_40%_80%,rgba(16,185,129,0.14),transparent_35%)]" />
    <PencilSketchBackground />
  </div>
);

// =========================
 // COMPONENTS
// =========================
const Chip = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={classNames(
      "px-3 py-1 rounded-full text-sm border transition",
      active ? "bg-black/80 text-white border-black/80" : "bg-white/70 backdrop-blur border-black/10 hover:bg-white"
    )}
  >
    {children}
  </button>
);

const Section = ({ id, title, icon: Icon, children, right }) => (
  <section id={id} className="scroll-mt-24 py-14">
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-6 w-6 opacity-70" />}
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
        {right}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  </section>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#work", label: "Portfolio" },
    { href: "#community", label: "Community" },
    { href: "#story", label: "Leadership" },
    { href: "#fun", label: "Fun Facts" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <div className="sticky top-0 z-40 backdrop-blur bg-white/60 border-b border-black/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#hero" className="font-semibold">
          Niranjana
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm hover:opacity-70">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="text-sm">
            <Button size="sm">Resume</Button>
          </a>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden border-t border-black/10">
            <div className="px-4 py-3 flex flex-col gap-3">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(ABOUT.contacts.email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = ABOUT.contacts.email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // no-op
    }
  };

  // compute dynamic metrics from résumé data
  const awardsCount = AWARDS.length;

  return (
    <section id="hero" className="relative overflow-hidden">
      <Background />
      <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">{ABOUT.name}</h1>
            <p className="mt-2 text-lg opacity-80">{ABOUT.tagline}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {ABOUT.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <ChevronRight className="h-4 w-4 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              <Button onClick={copyEmail}>
                <Mail className="mr-2 h-4 w-4" />
                {copied ? "Copied" : "Email"}
              </Button>
              <a href={ABOUT.contacts.linkedin} target="_blank" rel="noreferrer">
                <Button variant="outline">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
              </a>
              <a href={ABOUT.contacts.resume}>
                <Button variant="ghost">
                  <FileText className="mr-2 h-4 w-4" />
                  Resume
                </Button>
              </a>
            </div>
          </div>
          <div>
            <Card className="shadow-xl bg-white/80 backdrop-blur border-black/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" /> Live Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <Metric label="Students served (BPA)" value="60k+" />
                  <Metric label="State growth (YoY)" value="+54%" />
                  <Metric label="Educators reached" value="1,000+" />
                  <Metric label="Awards (tracked)" value={`${awardsCount}+`} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const Metric = ({ label, value }) => (
  <div className="rounded-2xl border border-black/10 p-4 bg-white/70 backdrop-blur">
    <div className="text-2xl font-semibold">{value}</div>
    <div className="text-xs opacity-70">{label}</div>
  </div>
);

const Work = () => {
  const [activeTab, setActiveTab] = useState("engineering");

  const dataset = useMemo(() => {
    if (activeTab === "engineering") return ENGINEERING;
    if (activeTab === "business") return BUSINESS;
    return AWARDS;
  }, [activeTab]);

  return (
    <Section
      id="work"
      title="Portfolio & Impact"
      icon={Briefcase}
      right={
        <div className="hidden md:flex items-center gap-3">
          {TABS.map((t) => (
            <Chip key={t.id} active={t.id === activeTab} onClick={() => setActiveTab(t.id)}>
              <div className="flex items-center gap-2">
                {t.icon ? <t.icon className="h-4 w-4" /> : null} {t.label}
              </div>
            </Chip>
          ))}
        </div>
      }
    >
      <div className="md:hidden mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <Chip key={t.id} active={t.id === activeTab} onClick={() => setActiveTab(t.id)}>
              <div className="flex items-center gap-2">
                {t.icon ? <t.icon className="h-4 w-4" /> : null} {t.label}
              </div>
            </Chip>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">{activeTab === "awards" ? <AwardsList /> : dataset.map((item, idx) => <WorkCard key={idx} item={item} />)}</div>
    </Section>
  );
};

const WorkCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="bg-white/80 backdrop-blur border-black/10 shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center justify-between">
          <span>{item.title}</span>
          <span className="text-xs opacity-60">{item.org}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm opacity-80">{item.summary}</p>
        <button className="mt-3 inline-flex items-center text-sm gap-1 underline underline-offset-4" onClick={() => setOpen((v) => !v)}>
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />} Details
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 space-y-1 text-sm">
              {item.details?.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 mt-0.5 opacity-60" />
                  <span>{d}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

// awards list
const AwardsList = () => {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("yearDesc");

  const filtered = useMemo(() => {
    const needle = q.toLowerCase();
    return AWARDS.filter((a) =>
      [a.title, a.org, a.level, a.rank, a.notes, a.year?.toString()].some((v) => (v || "").toLowerCase().includes(needle))
    );
  }, [q]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "yearDesc") arr.sort((a, b) => (b.year || 0) - (a.year || 0));
    if (sort === "yearAsc") arr.sort((a, b) => (a.year || 0) - (b.year || 0));
    if (sort === "level") arr.sort((a, b) => (a.level || "").localeCompare(b.level || ""));
    return arr;
  }, [filtered, sort]);

  return (
    <div className="md:col-span-2">
      <div className="flex items-center gap-2 mb-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search awards (title, org, level, year)"
          className="w-full md:w-80 px-3 py-2 rounded-xl border border-black/10 bg-white/70 backdrop-blur text-sm"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 rounded-xl border border-black/10 bg-white/70 backdrop-blur text-sm">
          <option value="yearDesc">Newest</option>
          <option value="yearAsc">Oldest</option>
          <option value="level">By Level</option>
        </select>
        <span className="text-xs opacity-70 ml-auto">{sorted.length} results</span>
      </div>
      <ul className="space-y-2">
        {sorted.map((a, i) => (
          <li key={i} className="flex flex-col gap-1 rounded-xl border border-black/10 bg-white/70 backdrop-blur px-3 py-2">
            <div className="flex items-center gap-2">
              <AwardIcon className="h-4 w-4 opacity-70" />
              <span className="text-sm font-medium">{a.title}</span>
              <span className="ml-auto text-xs opacity-60">{a.year || "—"}</span>
            </div>
            <div className="text-xs opacity-80 flex flex-wrap gap-3 pl-6">
              <span>
                <strong>Org:</strong> {a.org}
              </span>
              <span>
                <strong>Level:</strong> {a.level}
              </span>
              <span>
                <strong>Rank:</strong> {a.rank}
              </span>
              {a.notes && <span className="opacity-80">{a.notes}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Community Impact section
const Community = () => (
  <Section id="community" title="Community Impact" icon={Users}>
    <div className="grid md:grid-cols-2 gap-6">
      <WorkCard
        item={{
          title: "Breath & Stress-Management Workshops",
          org: "Art of Living / Schools",
          summary: "Keynoted to 1,000+ educators at NSBA; led student & staff sessions with practical take-home guides.",
          details: ["Designed activities to build calm focus in under 2 minutes.", "Scaled talks to multi-school audiences with actionable worksheets."],
        }}
      />
      <WorkCard
        item={{
          title: "BPA Student Certification Series (Designer)",
          org: "BPA National / Chapters",
          summary: "Multi-week officer training adopted across chapters; improved meeting quality and event readiness.",
          details: ["Templates, agendas, and role guides reusable statewide.", "Increased officer confidence and chapter self-sufficiency."],
        }}
      />
      <WorkCard
        item={{
          title: "Buddy State Program Revamp",
          org: "BPA Florida → National",
          summary: "Cross-state mentorship network to raise participation and retention; storytelling pitch centered on durable peer ties.",
          details: ["Onboarding scripts and periodic check-ins.", "Playbook to replicate in new regions."],
        }}
      />
      <WorkCard
        item={{
          title: "STEM Mentor (60+ hrs)",
          org: "Faulhaber Fabrication Lab",
          summary: "Hands-on STEM workshops for elementary students; confidence-building through making.",
          details: ["Simple scaffolds for early wins; safety-first shop habits."],
        }}
      />
      <WorkCard
        item={{
          title: "Entrepreneurship Club ‘Shark Tank’",
          org: "Pine View School",
          summary: "Organized school-wide competition; raised $1,000+ for student ventures.",
          details: ["Coached teams on problem/solution fit and storytelling."],
        }}
      />
    </div>
  </Section>
);

// Leadership Story 
const LEADERSHIP = [
  {
    phase: "National BPA — Secretary",
    summary: "Scaled national student programs with a trust-building mindset.",
    bullets: [
      "Serve ~60,000 students; focus on access and practical adoption.",
      "Refreshed Student Certification Series; co-led National Leadership Summit workshops.",
      "Launched cross-state Buddy System to strengthen participation and retention.",
    ],
  },
  {
    phase: "Florida BPA — State President",
    summary: "Operational growth through clarity and coaching.",
    bullets: [
      "+54% membership growth YoY; planned 500-attendee SLC with student-led teams.",
      "Built advisor coalition; instituted predictable cadences and role guides.",
      "Raised chapter engagement via templates, agendas, and officer coaching.",
    ],
  },
  {
    phase: "DECA — Founder & President",
    summary: "From zero to ICDC in year one.",
    bullets: [
      "Grew chapter to 40 members; built training pipeline and event selection.",
      "Travel & Tourism TDM: Districts 2nd → States 1st → ICDC qualification.",
      "Peer-led prep on research, presentations, and role-plays.",
    ],
  },
];

const Story = () => {
  const [active, setActive] = useState(0);
  const tabs = LEADERSHIP.map((l) => l.phase);
  const current = LEADERSHIP[active];
  return (
    <Section id="story" title="Leadership Story" icon={Users}>
      <div className="grid md:grid-cols-3 gap-6">
        <Timeline items={LEADERSHIP.map((l) => ({ t: l.phase, d: l.summary }))} />
        <Card className="md:col-span-2 bg-white/80 backdrop-blur border-black/10">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Highlights
              </CardTitle>
              <div className="hidden md:flex items-center gap-2">
                {tabs.map((t, i) => (
                  <Chip key={t} active={i === active} onClick={() => setActive(i)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="md:hidden mb-3 flex gap-2 overflow-x-auto pb-1">
              {tabs.map((t, i) => (
                <Chip key={t} active={i === active} onClick={() => setActive(i)}>
                  {t}
                </Chip>
              ))}
            </div>
            <div className="rounded-2xl border border-black/10 p-4 bg-white/70 backdrop-blur text-sm">
              <div className="font-medium mb-1">{current.phase}</div>
              <div className="opacity-80 mb-2">{current.summary}</div>
              <ul className="space-y-1">
                {current.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 opacity-60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

const Timeline = ({ items }) => (
  <ol className="relative border-l border-black/10 pl-6">
    {items.map((it, i) => (
      <li key={i} className="mb-6">
        <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-black/80" />
        <div className="text-sm font-medium">{it.t}</div>
        <div className="text-sm opacity-80">{it.d}</div>
      </li>
    ))}
  </ol>
);

// Fun Facts
const Fun = () => (
  <Section id="fun" title="Fun Facts" icon={Star}>
    <div className="grid md:grid-cols-3 gap-6">
      {[
        "Reads business + psych for fun; always collecting book recs.",
        "Bharatanatyam = my brain’s debugging tool.",
        "Endlessly optimizing dosa crispiness ratios.",
        "RCM piano honors; will accompany if there’s a keyboard nearby.",
        "90-second breath reset before big presentations.",
        "Current rabbit hole: humane automation for small businesses.",
      ].map((t, i) => (
        <Card key={i} className="bg-white/80 backdrop-blur border-black/10">
          <CardContent className="text-sm">{t}</CardContent>
        </Card>
      ))}
    </div>
  </Section>
);

const Contact = () => (
  <Section id="contact" title="Contact & Downloads" icon={Mail}>
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="bg-white/80 backdrop-blur border-black/10">
        <CardHeader>
          <CardTitle className="text-base">Reach out</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p className="opacity-80">Email: {ABOUT.contacts.email}</p>
          <p className="opacity-80 mt-1">
            LinkedIn:{" "}
            <a className="underline" href={ABOUT.contacts.linkedin} target="_blank" rel="noreferrer">
              Profile
            </a>
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white/80 backdrop-blur border-black/10">
        <CardHeader>
          <CardTitle className="text-base">Résumé</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p className="opacity-80">One-page PDF tailored for admissions.</p>
          <div className="mt-3">
            <Button asChild>
              <a href={ABOUT.contacts.resume}>
                <FileText className="h-4 w-4 mr-2" />
                Download
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white/80 backdrop-blur border-black/10">
        <CardHeader>
          <CardTitle className="text-base">Quick links</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" /> <a className="underline" href="#work">Portfolio</a>
            </li>
            <li className="flex items-center gap-2">
              <Users className="h-4 w-4" /> <a className="underline" href="#community">Community impact</a>
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4" /> <a className="underline" href="#fun">Fun facts</a>
            </li>
            <li className="flex items-center gap-2">
              <Users className="h-4 w-4" /> <a className="underline" href="#story">Leadership story</a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </Section>
);

export default function App() {
  return (
    <div className="min-h-screen text-gray-900">
      <Navbar />
      <Hero />
      <main>
        <Section id="about" title="About" icon={GraduationCap}>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 bg-white/80 backdrop-blur border-black/10">
              <CardContent className="pt-6 text-sm">
                <p className="opacity-80">{ABOUT.blurb}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur border-black/10">
              <CardHeader>
                <CardTitle className="text-base">Snapshot</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {ABOUT.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5" /> <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Section>
        <Work />
        <Community />
        <Story />
        <Fun />
        <Contact />
      </main>
      <footer className="py-12 text-center text-xs opacity-70">
        {new Date().getFullYear()} Niranjana Jayendran
      </footer>
    </div>
  );
}
