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
import headshot from "./assets/about_headshot.png";
import waving from "./assets/bpa_waving.png";
import breathing from "./assets/breathing.png";
import schoolhouse from "./assets/schoolhouse.png";
import bharatanatyma from "./assets/dance.png";
import fablab from "./assets/fablab.png";

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

const COMPUTER_SCIENCE = [
  {
    title: "Predicting Drug Recall Timing from Public Signals",
    org: "AP Research",
    summary:
      "Conducted independent research analyzing whether sentiment on social media can predict FDA pharmaceutical drug recalls, bridging machine learning and public health.",
    details: [
      "Built a hybrid natural language processing model combining sentiment anlysis models TextBlob and RoBERTa to quantify tone and subjectivity in 1K+ adverse drug reaction posts.",
      "Cleaned, tokenized, and engineered linguistics features in Python (using padas, NumPy, NLTK) for model input and trained a decision forest regression model to predict recall dates.",
    ],
    type: "project",
  },
  {
    title: "Market Development and Customer Success Intern",
    org: "IntelliEase AI Solutions",
    summary:
      "Led IntelliEase's early go-to-market and customer growth: sizing the market, building an SMB pipeline, running customer success/feedback loops, and launching the company's first website to establish its presence.",
    details: [
      "Identified $3M revenue potential across Florida and built a data-driven prospect pipeline of 100+ SMBs.",
      "Led customer success meetings, collected client feedback, and integrated insights into AI marketing strategy.",
      "Represented the company in client sessions to strengthen partnerships and communicate product value.",
      "Launched IntelliEase's first official website, creating its professional digital presence."
    ],
    type: "role",
  },
  {
    title: "Marketing and Design Intern",
    org: "SoulMender AI (Sohum AI)",
    summary:
      "Led UX research and prototyping for therapist and patient portals, turning demographic and usability insights into Figma wireframes that defined the minimum viable product.",
    details: [
      "Created Figma wireframes and UI prototypes for therapist dashboards and patient portals.",
      "Conducted demographic analysis and usability research to inform the MVP design of the patient portal.",
      "Designed Soulmender's website, adapting its professional design to target the company's audience based on conducted surveys."
    ],
    type: "role",
  },
];

// BUSINESS / ACTIVITIES / AWARDS and TABS for filters
const BUSINESS = [
  {
    title: "BPA Leadership (National, State, and Chapter)",
    org: "Business Professionals of America",
    summary:
      "Served as National Secretary of Secondary Division, Florida State President, and Chapter President, impacting over 60,000 students globally.",
    details: [
      "National Secretary:",
      "   - Elected to serve as student executive leading BPA's 60,000-member Secondary Division.",
      "   - Launhed cross-state Buddy System program connecting international, national, and state chapters to foster collaboration and mentorship.",
      "   - Revamped Student Certification Series and co-designed the Student Leadership Summit, strengthening leadership and personal development through leading workshops on communication and branding.",
      "Florida State President",
      "   - Managed 1,500-member state association; grew membership by 54% through targeted chapter support and outreach initiatives.",
      "   - Planned and co-hosted a 500-attendee State Leadership Conference."
    ],
    type: "role",
  },
  {
    title: "DECA Co-founder & President of Chapter",
    org: "DECA",
    summary:
      "Co-launched our school's first DECA chapter and managed recruiting, setting officer roles, and training members in preparation for competition.",
    details: [
      "Grew membership to 40 students within the first year after founding.",
      "Led team to 2nd place at districts, 1st place at states, and qualification for the international tournament in year one.",
      "Established officer structure, training resources, and mentorship programs that set the foundation for sustainable growth and future leadership."
    ],
    type: "role",
  },
  {
    title: "President, former Vice President",
    org: "Entrepreneurship Club, Pine View School",
    summary:
      "Led Pine View's Entrepreneurship Club, expanding the school-wide Shark Tank program, supporting student ventures, and providing funding and workshops on entrepreneurship.",
    details: 
    [
      "President:",
      "   - Oversaw development of student-led ventures and expanded the Shark Tank program into a recurring, school-wide program.",
      "Vice President:",
      "   - Raised $1,000 in funding through faculty collaboration and external outreach.",
      "   - Coordinated workshops to introduce students to core principles of entrepreneurship."
    ],
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
  { title: "x2 First Class Honors, 2x Honors", organization: "Royal Conservatory of Music, Piano", level: "National", grade: "8th-11th grades", notes: "Earned four national-level distinctions through juried RCM performance exams assessing technical mastery, sight reading, and musicianship (≥ 85th percentile)."},
  { title: "x2 Silved Medalist, x1 Bronze Medalist (90th percentile)", organization: "Le Grand Concours, French", level: "National", grade:"8th-10th grades", notes: "Placed in the top 10% nationally in a standardized French proficiency test three years consecutively, demonstrating linguistic skill and cultural fluency."},
  { title: "1st Place - National Qualifiers, Extemporaneous Speaking", organization: "National Speech and Debate Association", level: "Regional", grade: "10th grade", notes: "Won first place at the district qualifiers in extemporaneous speech, earning advancement to the National tournament on behalf of the school."},
  { title: "Semifinalist - Novice States, Extemporaneous Speaking", organization: "National Speech and Debate Association", level: "State", grade: "10th grade", notes: "Ranked among the top 24 speakers in extemporaneous speaking statewide in the first year of competing."},
  { title: "2nd Place - State Leadership Conference, Economic Research", organization: "Business Professional of America", level: "State", grade: "10th grade", notes: "Placed 2nd statewide among 50+ individuals for an original paper and presentation connecting macroeconomic trends to practical market applications."},
  { title: "3rd Place - State Leadership Conference, Presentation Team", organization: "Business Professionals of America", level: "State", grade: "10th grade", notes: "Placed 3rd statewide among 40+ teams for developing and presenting a proposal regarding the evolving local labor market to a mock Chamber of Commerce; advanced to nationals."},
  { title: "National Honor Society", organization: "Pine View School", level: "State", grade: "10th - 12th grades", notes: "Selected for academic excellence, leadership, and service; contributed over 100 volunteer hours across school and community initiatives."},
  { title: "1st Place - Regionals", organization: "Poetry Out Loud", level: "Regional", grade: "11th grade", notes: "Named regional champion in Poetry Out Loud for expressive performance and interpretation of both classical and modern works, advancing to the state finals."},
  { title: "1st Place - State Career Development Conference, Travel and Tourism Decision Making", organization: "DECA", level: "State", grade: "11th grade", notes: "Won DECA State Championship in a business case analysis event, surpassing ~100 teams, and advanced to Internationals in the first year of competing."},
  { title: "1st Place - State Leadership Conference, Extemporaneous Speech", organization: "Business Professionals of America", level: "State", grade: "11th grade", notes: "Ranked first place statewide for impromptu professional speaking; recognized for originality and impactful delivery, and advanced to nationals."},
  { title: "AP Scholar with Distinction", organization: "College Board", level: "National", grade: "11th grade", notes: "Awarded for scores of all 4s and 5s in 7 AP exams, demonstrating mastery across disciplines."},
  { title: "National Merit Semifinalist", organization: "National Merit Scholarship Corporation", level: "National", grade: "12th grade", notes: "Recognized as top 1% of U.S high school students based on PSAT/NMSQT score; received a perfect 1520 (99th percentile)."},
];
//note: fix the grade system- reinstate the year and add grade as another category?

const TABS = [
  { id: "Computer Science", icon: Cpu, label: "Computer Science" },
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
  const [activeTab, setActiveTab] = useState("computer science");
  const [filter, setFilter] = useState("project"); // roles | projects

  // Default filter per tab
  useEffect(() => {
    if (activeTab === "computer science") setFilter("project");
    if (activeTab === "business" || activeTab === "activities") setFilter("role");
  }, [activeTab]);

  const dataset = useMemo(() => {
    if (activeTab === "computer science") return COMPUTER_SCIENCE;
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
          <span className="text-xs opacity-60">{item.organization}</span>
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
  const [sort, setSort] = useState("gradeDesc");

  const filtered = useMemo(() => {
    const needle = q.toLowerCase();
    return AWARDS.filter((a) =>
      [a.title, a.organization, a.level, a.notes, a.grade?.toString()].some((v) =>
        (v || "").toLowerCase().includes(needle)
      )
    );
  }, [q]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "gradeDesc") arr.sort((a, b) => (b.grade || 0) - (a.grade || 0));
    if (sort === "gradeAsc") arr.sort((a, b) => (a.grade || 0) - (b.grade || 0));
    if (sort === "level") arr.sort((a, b) => (a.level || "").localeCompare(b.level || ""));
    return arr;
  }, [filtered, sort]);

  return (
    <div className="md:col-span-2">
      <div className="flex items-center gap-2 mb-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search awards (title, organization, level, grade)"
          className="w-full md:w-80 px-3 py-2 rounded-xl border border-black/10 bg-white/70 backdrop-blur text-sm"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 rounded-xl border border-black/10 bg-white/70 backdrop-blur text-sm"
        >
          <option value="gradeDesc">Newest</option>
          <option value="gradeAsc">Oldest</option>
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
              <span className="ml-auto text-xs opacity-60">{a.grade || "—"}</span>
            </div>
            <div className="text-xs opacity-80 flex flex-wrap gap-3 pl-6">
              <span>
                <strong>Organization:</strong> {a.organization}
              </span>
              <span>
                <strong>Level:</strong> {a.level}
              </span>
              {a.notes && <span className="opacity-80">{a.notes}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const COMMUNITY = [
  {
    image: breathing,
    title: "Youth Ambassador",
    org: "Art of Living / SKY Schools",
    details: [
      "Breath-work instructor and keynote speaker; lead school stress-management programs.",
      "   - Delivered a keynote to 1,000+ educators on evidence-based stress management breath techniques in schools for the National School Board Association (NSBA) annual conference.",
      "   - Facilitated and organized local Art of Living programs for students and staff, teaching practical breathing and mindfulness techniques.",
    ],
  },
  {
    image: waving,
    title: "BPA Student Certification Series (Designer)",
    org: "BPA National / Chapters",
    details: [
      "Multi‑week officer training adopted across chapters.",
      "Templates, agendas, and role guides reusable statewide.",
      "Raised advisor confidence and chapter self‑sufficiency.",
    ],
  },
  {
    image: schoolhouse,
    title: "International Tutoring",
    org: "Schoolhouse World",
    details: [
      "Taught SAT Reading & Writing to a global cohort and ranked among the top-rated tutors for impact and student feedback.",
      "   - Taught 130+ students across 23 countries in SAT Reading and Writing throughout 17 sessions.",
      "   - Ranked in the top 5% of tutors for impact and rating (129 positive ratings, 80 super helpful ratings).",
    ],
  },
  {
    image: bharatanatyam,
    title: "Professional Dancer",
    org: "Sai Nrityalaya School for Dance",
    details: [
      "Classical Bharatanatyam dancer, soloist and lead performer, with a completed Arangetram and appearances in large-scale productions and cultural festivals.",
      "   - Performed as a part of the 2023 World Culture Festival on the National Mall, D.C. before an audience of 1 million people.",
      "   - Completed a 3-hour solo Arangetram recital for 750+ attendees, showcasing mastery after 12 years of training and a final year of intensive preparation.",
      "   - Selected as lead performer in 4 productions at the Sarasota Opera House, a historic center for the performing arts."
    ],
  },
  {
    image: fablab,
    title: "STEM Mentor",
    org: "Faulhaber Fabrication Lab",
    details: [
      "STEM education volunteer and curriculum contributor, leading hands-on chemistry and coding sessions for elementary students.",
      "   - Led hands-on fabrication sessions for 50+ elementary students, introducing foundational chemistry and coding principles.",
     	"   - Volunteered 50+ hours leading hands-on STEM education sessions for elementary students and contributed to curriculum development to expand access to foundational STEM concepts.",
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
                src={headshot}
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
