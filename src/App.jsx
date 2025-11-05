import React, { useMemo, useState, useEffect } from "react";
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
  Users2,
} from "lucide-react";

// Lightweight UI primitives
const Button = ({ children, variant = "default", size = "md", asChild, ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-2xl border transition px-3 py-2 text-sm";
  const styles = {
    default: "bg-black text-white border-black hover:opacity-90",
    outline: "bg-white text-black border-black/20 hover:border-black/40",
    ghost: "bg-transparent text-black border-transparent hover:bg-black/5",
  };
  const sizes = {
    sm: "px-2 py-1 text-sm rounded-xl",
    md: "px-3 py-2",
    lg: "px-4 py-2.5 text-base",
  };
  const cls = `${base} ${styles[variant]} ${sizes[size]}`;
  if (asChild) return React.cloneElement(children, { className: cls });
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
};

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border ${className}`}>{children}</div>
);
const CardHeader = ({ children }) => <div className="px-5 pt-5">{children}</div>;
const CardTitle = ({ children, className = "" }) => (
  <h3 className={`font-semibold ${className}`}>{children}</h3>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`px-5 pb-5 ${className}`}>{children}</div>
);

// UTILITIES & SHELL COMPONENTS
function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

const Chip = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={classNames(
      "px-3 py-1 rounded-full text-sm border transition",
      active
        ? "bg-black/80 text-white border-black/80"
        : "bg-white/70 backdrop-blur border-black/10 hover:bg-white"
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

// Background (colorful wash + pencil sketch lines)
const PencilSketchBackground = () => (
  <svg
    className="absolute inset-0 -z-10 w-full h-full"
    style={{ opacity: 0.06 }}
    viewBox="0 0 1200 800"
    preserveAspectRatio="none"
  >
    {[
      "M40 120 C 200 40, 360 200, 520 120",
      "M80 280 C 240 220, 360 360, 540 280",
      "M720 140 C 880 90, 1000 210, 1160 160",
      "M120 520 C 260 470, 390 560, 560 520",
      "M640 560 C 780 520, 940 620, 1140 580",
    ].map((d, i) => (
      <path
        key={i}
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 9"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;16"
          dur={`${4 + i}s`}
          repeatCount="indefinite"
        />
      </path>
    ))}
  </svg>
);

const Background = () => (
  <div className="fixed inset-0 -z-10">
    <style>{`@keyframes spinSlow { to { transform: rotate(1turn); } }`}</style>
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(1200px 600px at 15% 20%, rgba(255, 182, 193, 0.35), transparent 60%)," +
          "radial-gradient(900px 500px at 85% 15%, rgba(147, 197, 253, 0.35), transparent 55%)," +
          "radial-gradient(1000px 800px at 50% 85%, rgba(167, 243, 208, 0.35), transparent 55%)," +
          "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.9))",
      }}
    />
    <div
      className="absolute blur-3xl"
      style={{
        inset: "-20%",
        opacity: 0.35,
        background:
          "conic-gradient(from 180deg at 50% 50%, rgba(255, 0, 128, 0.35), rgba(255, 166, 0, 0.35), rgba(0, 212, 255, 0.35), rgba(147, 51, 234, 0.35), rgba(255, 0, 128, 0.35))",
        animation: "spinSlow 80s linear infinite",
        willChange: "transform",
        pointerEvents: "none",
      }}
    />
    <PencilSketchBackground />
  </div>
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
        <a href="#hero" className="font-semibold">Niranjana</a>
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
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden border-t border-black/10"
          >
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

// DATA - about + activities

const ABOUT = {
  name: "Niranjana Jayendran",
  tagline: "passionate about: books • breath • business",
  blurb:
    "National Secretary of BPA’s Secondary Division serving ~60,000 students. I design trustworthy, human‑centered tech and scalable student programs; co‑founded my school’s DECA chapter (ICDC in year one) and lead breathing/stress‑management workshops for 1,000+ educators and students.",
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
    details: [
      "Framed as timing (days) rather than a simple yes/no.",
      "Reported R² and MAE; documented boundaries and use‑cases.",
    ],
    type: "project",
  },
  {
    title: "Automation that Earns Trust in Small Businesses",
    org: "IntelliEase AI Solutions",
    summary:
      "Mapped service workflows and added audit trails, checkpoints, and human‑in‑the‑loop steps; pilot billing errors reduced ≈50% and adoption increased.",
    details: [
      "Co‑designed guardrails and exception handling with owners.",
      "Focused on restarts, opt‑outs, and time‑to‑first‑value.",
    ],
    type: "project",
  },
  {
    title: "Clinician Dashboard for Transparent Suggestions",
    org: "SoulMender AI",
    summary:
      "Prototyped therapist‑facing flows with clear rationale for suggestions; aligned UI with clinician expectations and safety.",
    details: ["Interviewed stakeholders; prioritized explain‑why patterns."],
    type: "project",
  },
];

// BUSINESS / ACTIVITIES / AWARDS and TABS for filters
const BUSINESS = [
  {
    title: "BPA National Secretary (Secondary Division)",
    org: "Business Professionals of America",
    summary:
      "Programs for ~60,000 students: refreshed Student Certification Series, launched cross‑state Buddy System, co‑designed National Leadership Summit workshops.",
    details: ["Scaled communications and reusable toolkits for officers."],
    type: "role",
  },
  {
    title: "Florida BPA President — Membership +54%",
    org: "BPA Florida",
    summary:
      "Managed ~1,500‑member association; planned 500‑attendee SLC; built advisor coalition and clear role guides to sustain growth.",
    details: ["Student‑led ops with measurable engagement targets."],
    type: "role",
  },
  {
    title: "DECA Co‑founder & President (ICDC Year One)",
    org: "Pine View School",
    summary:
      "Built training pipeline, event selection strategy, and peer coaching; chapter grew to 40 and advanced to ICDC in year one.",
    details: ["Mentored teams on research, presentation, and role‑play."],
    type: "role",
  },
];

const ACTIVITIES = [
  {
    title: "Breath & Stress‑Management Facilitator",
    org: "Art of Living Foundation / Schools",
    summary:
      "Lead practical breath‑based focus sessions for students and educators; emphasize habit formation and calm.",
    details: [
      "1,000+ educators reached (NSBA)",
      "2‑minute resets built into workshops",
      "Peer ambassadors embedded in chapters",
    ],
    type: "role",
  },
  {
    title: "One‑on‑one Tutor (Math, Science, Business)",
    org: "Independent / School Programs",
    summary:
      "Design structured plans, diagnostics, and bite‑size practice loops; focus on clarity and confidence.",
    details: [
      "Middle & high school curriculum support",
      "Measurable weekly goals and habit check‑ins",
    ],
    type: "role",
  },
  {
    title: "Bharatanatyam Performer & Choreography",
    org: "Dance Academy / Community",
    summary:
      "Arangetram; performances at cultural events; mentor younger dancers.",
    details: [
      "World Culture Festival on National Mall",
      "Mentored students on technique & stage prep",
    ],
    type: "role",
  },
  {
    title: "World Culture Festival — Main Stage Performance",
    org: "National Mall, Washington D.C.",
    summary:
      "Selected performer representing classical arts at a global festival.",
    details: [
      "Coordinated rehearsals and logistics",
      "Performed before 1M+ audience",
    ],
    type: "project",
  },
];

const AWARDS = [
  { title: "NSDA Extemporaneous Speaking — National Qualifier (1st)", org: "NSDA", level: "National", year: 2025, rank: "1st", notes: "Qualified via district championship" },
  { title: "BPA SLC — Economic Research (Team)", org: "BPA Florida", level: "State", year: 2024, rank: "2nd", notes: "150+ teams statewide" },
  { title: "DECA States — Travel & Tourism TDM", org: "DECA", level: "State", year: 2025, rank: "1st", notes: "Advanced to ICDC" },
  { title: "RCM Piano — First Class Honors", org: "Royal Conservatory of Music", level: "National", year: 2023, rank: "Honors", notes: "Multiple First Class Honors" },
];

const TABS = [
  { id: "engineering", icon: Cpu, label: "Engineering" },
  { id: "business", icon: Briefcase, label: "Business" },
  { id: "activities", icon: Users2, label: "Activities" },
  { id: "awards", icon: AwardIcon, label: "Awards" },
];

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(ABOUT.contacts.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {}
  };

  const awardsCount = AWARDS.length;

  return (
    <section id="hero" className="relative overflow-hidden">
      <Background />
      <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
              {ABOUT.name}
            </h1>
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
  const [filter, setFilter] = useState("project"); // roles | projects

  // Default filter per tab
  useEffect(() => {
    if (activeTab === "engineering") setFilter("project");
    if (activeTab === "business" || activeTab === "activities") setFilter("role");
  }, [activeTab]);

  const dataset = useMemo(() => {
    if (activeTab === "engineering") return ENGINEERING;
    if (activeTab === "business") return BUSINESS;
    if (activeTab === "activities") return ACTIVITIES;
    return AWARDS;
  }, [activeTab]);

  const filteredList = useMemo(() => {
    if (activeTab === "awards") return [];
    return (dataset || []).filter((it) =>
      filter === "role" ? it.type === "role" : it.type === "project"
    );
  }, [dataset, filter, activeTab]);

  const showFilters = activeTab !== "awards";

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
                <t.icon className="h-4 w-4" /> {t.label}
              </div>
            </Chip>
          ))}
        </div>
      }
    >
      <div className="md:hidden mb-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <Chip key={t.id} active={t.id === activeTab} onClick={() => setActiveTab(t.id)}>
              <div className="flex items-center gap-2">
                <t.icon className="h-4 w-4" /> {t.label}
              </div>
            </Chip>
          ))}
        </div>
      </div>

      {showFilters && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xs opacity-70">Filter:</span>
          <Chip active={filter === "role"} onClick={() => setFilter("role")}>
            Roles
          </Chip>
          <Chip active={filter === "project"} onClick={() => setFilter("project")}>
            Projects
          </Chip>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {activeTab === "awards" ? (
          <AwardsList />
        ) : filteredList.length ? (
          filteredList.map((item, idx) => <WorkCard key={idx} item={item} />)
        ) : (
          <div className="text-sm opacity-70">No items match this filter.</div>
        )}
      </div>
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
        <button
          className="mt-3 inline-flex items-center text-sm gap-1 underline underline-offset-4"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />} Details
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 space-y-1 text-sm"
            >
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

// Portrait flip card used in Community Impact
const FlipCard = ({ image, title, org, details = [] }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="relative group" style={{ perspective: "1200px" }}>
      <div
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onClick={() => setFlipped((v) => !v)}
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", transformStyle: "preserve-3d", height: 480 }}
        className="relative w-full rounded-2xl transition-transform duration-700"
      >
        {/* Front */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl shadow border border-black/10" style={{ backfaceVisibility: "hidden" }}>
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
            <div className="text-white/90 text-xs">{org}</div>
            <div className="text-white font-semibold text-base leading-tight">{title}</div>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-2xl bg-white/90 backdrop-blur border border-black/10 p-5 flex" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
          <ul className="text-sm space-y-2">
            {details.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <ChevronRight className="h-4 w-4 mt-0.5 opacity-60" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-2 text-xs opacity-60 text-center">Tap/hover to flip</div>
    </div>
  );
};

const AwardsList = () => {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("yearDesc");

  const filtered = useMemo(() => {
    const needle = q.toLowerCase();
    return AWARDS.filter((a) =>
      [a.title, a.org, a.level, a.rank, a.notes, a.year?.toString()].some((v) =>
        (v || "").toLowerCase().includes(needle)
      )
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
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 rounded-xl border border-black/10 bg-white/70 backdrop-blur text-sm"
        >
          <option value="yearDesc">Newest</option>
          <option value="yearAsc">Oldest</option>
          <option value="level">By Level</option>
        </select>
        <span className="text-xs opacity-70 ml-auto">{sorted.length} results</span>
      </div>
      <ul className="space-y-2">
        {sorted.map((a, i) => (
          <li
            key={i}
            className="flex flex-col gap-1 rounded-xl border border-black/10 bg-white/70 backdrop-blur px-3 py-2"
          >
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
      <p className="text-xs opacity-60 mt-2">
        Missing or off by a line? Paste the exact awards block from your résumé and I’ll slot them in verbatim.
      </p>
    </div>
  );
};

const COMMUNITY = [
  {
    image: "/src/assets/community/breath.jpg",
    title: "Breath & Stress‑Management Workshops",
    org: "Art of Living / Schools",
    details: [
      "Keynoted to 1,000+ educators at NSBA; led student & staff sessions.",
      "Designed activities to build calm focus in under 2 minutes.",
      "Scaled talks to multi‑school audiences with actionable worksheets.",
    ],
  },
  {
    image: "/src/assets/community/certification.jpg",
    title: "BPA Student Certification Series (Designer)",
    org: "BPA National / Chapters",
    details: [
      "Multi‑week officer training adopted across chapters.",
      "Templates, agendas, and role guides reusable statewide.",
      "Raised advisor confidence and chapter self‑sufficiency.",
    ],
  },
  {
    image: "/src/assets/community/buddy.jpg",
    title: "Buddy State Program Revamp",
    org: "BPA Florida → National",
    details: [
      "Cross‑state mentorship to raise participation and retention.",
      "Onboarding scripts and periodic check‑ins.",
      "Portable playbook to replicate in new regions.",
    ],
  },
  {
    image: "/src/assets/community/stem.jpg",
    title: "STEM Mentor (60+ hrs)",
    org: "Faulhaber Fabrication Lab",
    details: [
      "Hands‑on workshops for elementary students; building confidence.",
      "Simple scaffolds for early wins; safety‑first shop habits.",
    ],
  },
  {
    image: "/src/assets/community/shark.jpg",
    title: "Entrepreneurship Club ‘Shark Tank’",
    org: "Pine View School",
    details: [
      "Organized school‑wide competition; raised $1,000+ for ventures.",
      "Coached teams on problem/solution fit and storytelling.",
    ],
  },
];

const Community = () => (
  <Section id="community" title="Community Impact" icon={Users2}>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {COMMUNITY.map((c, i) => (
        <FlipCard key={i} image={c.image} title={c.title} org={c.org} details={c.details} />
      ))}
    </div>
  </Section>
);

// =========================
// FUN FACTS — IMAGE CARDS 
// =========================
const FUN_MEDIA = [
  { image: "/src/assets/fun/books.jpg", caption: "Always reading — business & psych." },
  { image: "/src/assets/fun/breath.jpg", caption: "90‑second breath reset before talks." },
  { image: "/src/assets/fun/dance.jpg", caption: "Bharatanatyam = focus + joy." },
  { image: "/src/assets/fun/dosa.jpg", caption: "Forever tuning dosa crispiness ratios." },
  { image: "/src/assets/fun/piano.jpg", caption: "RCM piano honors; love to accompany." },
  { image: "/src/assets/fun/coach.jpg", caption: "Tutoring & peer coaching for clarity." },
];

const FunImageCard = ({ image, caption }) => (
  <div>
    <div className="rounded-2xl overflow-hidden border border-black/10 bg-white/70 backdrop-blur">
      <img src={image} alt={caption} className="w-full object-cover" style={{ height: 360 }} />
    </div>
    <div className="mt-2 text-sm text-center opacity-80">{caption}</div>
  </div>
);

const LEADERSHIP = [
  {
    phase: "National BPA — Secretary",
    summary: "Scaled national student programs with a trust‑building mindset.",
    bullets: [
      "Serve ~60,000 students; focus on access and practical adoption.",
      "Refreshed Student Certification Series; co‑led National Leadership Summit workshops.",
      "Launched cross‑state Buddy System to strengthen participation and retention.",
    ],
  },
  {
    phase: "Florida BPA — State President",
    summary: "Operational growth through clarity and coaching.",
    bullets: [
      "+54% membership growth YoY; planned 500‑attendee SLC with student‑led teams.",
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
      "Peer‑led prep on research, presentations, and role‑plays.",
    ],
  },
];

const Story = () => {
  const [active, setActive] = useState(0);
  const current = LEADERSHIP[active];
  return (
    <Section id="story" title="Leadership Story" icon={Users2}>
      <div className="grid md:grid-cols-3 gap-6">
        <Timeline
          items={LEADERSHIP.map((l) => ({ t: l.phase, d: l.summary }))}
          active={active}
          onSelect={setActive}
        />
        <Card className="md:col-span-2 bg-white/80 backdrop-blur border-black/10">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
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

const Timeline = ({ items, active = 0, onSelect }) => (
  <ol className="relative pl-10">
    <div className="absolute top-0 bottom-0 w-px bg-black/15" style={{ left: "0" }} />
    {items.map((it, i) => (
      <li key={i} className="relative mb-6">
        <button
          type="button"
          onClick={() => onSelect?.(i)}
          aria-pressed={active === i}
          aria-label={`Show ${it.t} highlights`}
          className={classNames(
            "absolute -translate-x-1/2 top-1 h-5 w-5 rounded-full border-2 transition hover:ring-2 hover:ring-black/20 focus:outline-none focus:ring-2 focus:ring-black/30",
            active === i ? "bg-black border-black" : "bg-white border-black"
          )} style={{ left: "-2.5rem" }}
        />
        <div className="text-sm font-medium">{it.t}</div>
        <div className="text-sm opacity-80">{it.d}</div>
      </li>
    ))}
  </ol>
);

const Fun = () => (
  <Section id="fun" title="Fun Facts" icon={Star}>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {FUN_MEDIA.map((m, i) => (
        <FunImageCard key={i} image={m.image} caption={m.caption} />
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
            LinkedIn: <a className="underline" href={ABOUT.contacts.linkedin}>Profile</a>
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white/80 backdrop-blur border-black/10">
        <CardHeader>
          <CardTitle className="text-base">Résumé</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p className="opacity-80">One‑page PDF tailored for admissions.</p>
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
              <Users2 className="h-4 w-4" /> <a className="underline" href="#community">Community impact</a>
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4" /> <a className="underline" href="#fun">Fun facts</a>
            </li>
            <li className="flex items-center gap-2">
              <Users2 className="h-4 w-4" /> <a className="underline" href="#story">Leadership story</a>
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
            <Card className="bg-white/80 backdrop-blur border-black/10 overflow-hidden flex items-center justify-center">
              {/* headshot from src/assets/about_headshot.png (keep rounded corners) */}
              <img
                src="/src/assets/about_headshot.png"
                alt="Niranjana headshot"
                className="w-full h-full object-cover rounded-2xl"
              />
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
        Built as a single‑file React app. Print‑friendly and mobile‑first.
      </footer>
    </div>
  );
}