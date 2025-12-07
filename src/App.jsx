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
import bharatanatyam from "./assets/bharatanatyam.png";
import fablab from "./assets/fablab.png";
import resumePdf from "./assets/Resume.pdf";

function openResumePdf() {
  window.open(resumePdf, "_blank", "noopener,noreferrer");
};

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

const Background = () => {
  const COLS = 60;
  const ROWS = 40; 
  const trail = 12;

  const [heads, setHeads] = useState(() =>
    Array.from({ length: COLS }, () => Math.floor(Math.random() * ROWS))
  );

  const digits = useMemo(
    () =>
      Array.from({ length: COLS }, (_, i) =>
        Array.from({ length: ROWS }, (_, j) =>
          ((i * 17 + j * 31 + 7) % 2).toString()
        )
      ),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setHeads((prev) => prev.map((h) => (h + 1) % ROWS));
    }, 140);
    return () => clearInterval(interval);
  }, []);

  const columns = Array.from({ length: COLS });

  return (
    <div className="fixed inset-0 -z-10 bg-slate-950 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 0%, #020617 0, transparent 55%)," +
            "radial-gradient(circle at 85% 10%, #020617 0, transparent 55%)," +
            "radial-gradient(circle at 50% 80%, #020617 10%, #020617 60%)",
        }}
      />

      {/* Animated binary cascades with fixed slots per column */}
      <svg
        className="absolute inset-0 opacity-70"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        {columns.map((_, i) => {
          const x = 10 + (i / (COLS - 1)) * 1180; 
          const head = heads[i];

          return (
            <g key={i} transform={`translate(${x}, 0)`}>
              {Array.from({ length: ROWS }).map((_, j) => {
                const y = 12 + j * 18; 
                const distance = (ROWS + head - j) % ROWS;

                if (distance > trail) {
                  const dimAlpha = 0.07;
                  return (
                    <text
                      key={j}
                      x={0}
                      y={y}
                      fontSize={12}
                      fontFamily="Menlo, ui-monospace, SFMono-Regular"
                      fill={`rgba(148, 208, 255, ${dimAlpha})`}
                    >
                      {digits[i][j]}
                    </text>
                  );
                }

                const t = 1 - distance / trail; // 0..1
                const alpha = 0.18 + t * 0.7;
                const size = 9 + t * 3; 
                const neon = distance === 0;

                const color = neon
                  ? "#7DF9FF" 
                  : `rgba(148, 208, 255, ${alpha})`;

                return (
                  <text
                    key={j}
                    x={0}
                    y={y}
                    fontSize={size}
                    fontFamily="Menlo, ui-monospace, SFMono-Regular"
                    fill={color}
                  >
                    {digits[i][j]}
                  </text>
                );
              })}
            </g>
          );
        })}
      </svg>

      <div
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(2,6,23,0.85) 0, transparent 30%, transparent 70%, rgba(2,6,23,0.9) 100%)",
        }}
      />
    </div>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#work", label: "Portfolio" },
    { href: "#community", label: "Community" },
    { href: "#story", label: "Leadership" },
//    { href: "#fun", label: "Fun Facts" },
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
          <Button size="sm" onClick={openResumePdf}>Resume</Button>
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



const ABOUT = {
  name: "Niranjana Jayendran",
  tagline: "passionate about: books • breath • business !",
  blurb: [
    "Business - I serve as BPA's National Secretary, founded our school's DECA chapter, and lead the Entrepreneurship Club, focusing on leadership training and fostering students' ideas.",
    "Applied Computer Science and Research - I've worked on market sizing, customer meetings, and model development at IntelliEase AI; prototyped model and designed website at SoulMender; and trained a sentiment model estimating drug-recall timing for AP Research.",
    "Stress-Management Teaching - Outside of work, I'm passionate about sharing the techniques that have helped me increase my capacity and decrease my stress: breathing! I've delivered keynote speeches to educators on the importance of such techniques in schools and have facilitated workshops for students locally.",
    "Arts and Community - My heritage and community is incredibly important to me: I am a proud Bharatanatyam (South Indian Classical Dance) Soloist, performing on stages from the National Mall in DC to my backyard for my family!",
  ],
//  highlights: [
//    "",
//  ],
  contacts: {
    email: "niranjanajayendran@gmail.com",
    linkedin: "https://www.linkedin.com/in/niranjana-jayendran-ab5576276/",
    resume: resumePdf,
  },
};

const ABOUT_CHAPTERS = [
  {
    id: "business",
    chapter: "",
    title: "Business & Leadership",
    subtitle: "",
    blurb:
      "I serve as BPA's National Secretary, founded our school's DECA chapter, and lead the Entrepreneurship Club, focusing on leadership training and fostering students' ideas.",
    statLabel: "students impacted",
    statValue: "60k+",
    accent: "from-sky-200/80 to-indigo-200/80",
  },
  {
    id: "cs",
    chapter: "",
    title: "Applied CS & Research",
    subtitle: "",
    blurb:
      "I've worked on market sizing, customer meetings, and model development at IntelliEase AI; prototyped model and designed website at SoulMender; and trained a sentiment model estimating drug-recall timing for AP Research.",
    statLabel: "major projects",
    statValue: "3+",
    accent: "from-cyan-200/80 to-teal-200/80",
  },
  {
    id: "breath",
    chapter: "",
    title: "Breath & Stress Management",
    subtitle: "",
    blurb:
      "Outside of work, I'm passionate about sharing the techniques that have helped me increase my capacity and decrease my stress: breathing! I've delivered keynote speeches to educators on the importance of such techniques in schools and have facilitated workshops for students locally.",
    statLabel: "people reached",
    statValue: "1k+",
    accent: "from-emerald-200/80 to-lime-200/80",
  },
  {
    id: "arts",
    chapter: "Node 04",
    title: "Arts & Community",
    subtitle: "Bharatanatyam, music, and cultural spaces",
    blurb:
      "My heritage and community is incredibly important to me: I am a proud Bharatanatyam (South Indian Classical Dance) Soloist, performing on stages from the National Mall in DC to my backyard for my family!",
    statLabel: "years training",
    statValue: "12",
    accent: "from-rose-200/80 to-purple-200/80",
  },
];

const AboutBookshelf = () => {
  const [activeId, setActiveId] = useState("business");
  const active =
    ABOUT_CHAPTERS.find((c) => c.id === activeId) ?? ABOUT_CHAPTERS[0];

  const CHIP_CONNECTIONS = {
    business: {
      nodeClass: "top-3 left-1/2 -translate-x-1/2",
      lineClass: "top-16 left-1/2 -translate-x-1/2 h-10 w-[3px]",
    },
    cs: {
      nodeClass: "top-1/2 right-3 -translate-y-1/2",
      lineClass: "top-1/2 right-16 -translate-y-1/2 w-10 h-[3px]",
    },
    breath: {
      nodeClass: "bottom-3 left-1/2 -translate-x-1/2",
      lineClass: "bottom-16 left-1/2 -translate-x-1/2 h-10 w-[3px]",
    },
    arts: {
      nodeClass: "top-1/2 left-3 -translate-y-1/2",
      lineClass: "top-1/2 left-16 -translate-y-1/2 w-10 h-[3px]",
    },
  };

  return (
    <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 items-stretch">
      {/* LEFT: chip + PCB */}
      <div className="relative rounded-2xl bg-slate-950/95 border border-sky-400/40 overflow-hidden text-[11px] text-sky-50">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 0 0, rgba(56,189,248,0.45), transparent 55%)," +
              "radial-gradient(circle at 100% 100%, rgba(244,114,182,0.35), transparent 55%)," +
              "linear-gradient(90deg, rgba(15,23,42,1), rgba(15,23,42,0.95))",
          }}
        />
        <div className="relative z-10 h-80 md:h-72 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="uppercase tracking-[0.18em] text-[0.6rem] text-sky-200/80">
              Core profile
            </span>
            <span className="text-[0.6rem] text-sky-300/80">
              Click a button to learn more about me in each area!
            </span>
          </div>

          <div className="relative h-full">
            {/* PCB board */}
            <div className="absolute inset-3 rounded-2xl bg-slate-950 border border-sky-500/60 overflow-hidden">
              <div
                className="absolute inset-[-40%] opacity-45"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(60deg, rgba(56,189,248,0.22) 0, rgba(56,189,248,0.22) 1px, transparent 1px, transparent 6px)," +
                    "repeating-linear-gradient(-60deg, rgba(129,230,217,0.18) 0, rgba(129,230,217,0.18) 1px, transparent 1px, transparent 6px)",
                }}
              />

              {/* four main glowing highways */}
              <div className="absolute left-1/2 -translate-x-1/2 top-3 bottom-1/2 pointer-events-none">
                <div className="absolute inset-y-6 w-[3px] mx-auto bg-gradient-to-b from-cyan-300 via-cyan-400 to-transparent blur-[0.5px]" />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 left-1/2 pointer-events-none">
                <div className="absolute left-10 right-6 h-[3px] top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-300 via-cyan-400 to-transparent blur-[0.5px]" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-3 top-1/2 pointer-events-none">
                <div className="absolute inset-y-6 w-[3px] mx-auto bg-gradient-to-t from-cyan-300 via-cyan-400 to-transparent blur-[0.5px]" />
              </div>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 right-1/2 pointer-events-none">
                <div className="absolute right-10 left-6 h-[3px] top-1/2 -translate-y-1/2 bg-gradient-to-l from-cyan-300 via-cyan-400 to-transparent blur-[0.5px]" />
              </div>
            </div>

            {/* central chip */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <div className="absolute inset-0 rounded-[18px] bg-black/70 blur-md translate-x-1 translate-y-1 opacity-70" />
                <div className="relative w-full h-full rounded-[18px] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 shadow-[0_18px_35px_rgba(0,0,0,0.7)] overflow-hidden">
                  <div className="absolute inset-[3px] rounded-[14px] bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-500/80" />
                  <div className="absolute inset-[18%] rounded-[10px] bg-slate-950" />
                  <div
                    className="absolute inset-[22%] rounded-[10px] opacity-70 mix-blend-screen"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(56,189,248,0.26) 0, rgba(56,189,248,0.26) 1px, transparent 1px, transparent 4px)," +
                        "repeating-linear-gradient(0deg, rgba(56,189,248,0.2) 0, rgba(56,189,248,0.2) 1px, transparent 1px, transparent 4px)",
                    }}
                  />
                  <div className="absolute inset-[30%] rounded-[6px] bg-cyan-400/40 blur-[4px]" />
                  <div className="absolute inset-[30%] rounded-[6px] border border-cyan-300/80" />
                  {Array.from({ length: 10 }).map((_, i) => {
                    const offset = 8 + i * 8;
                    const pos = `${offset}%`;
                    return (
                      <React.Fragment key={i}>
                        <div
                          className="absolute h-1.5 w-[7px] bg-amber-300 rounded-sm shadow-[0_0_6px_rgba(251,191,36,0.7)]"
                          style={{ top: -4, left: pos }}
                        />
                        <div
                          className="absolute h-1.5 w-[7px] bg-amber-300 rounded-sm shadow-[0_0_6px_rgba(251,191,36,0.7)]"
                          style={{ bottom: -4, left: pos }}
                        />
                        <div
                          className="absolute w-1.5 h-[7px] bg-amber-300 rounded-sm shadow-[0_0_6px_rgba(251,191,36,0.7)]"
                          style={{ left: -4, top: pos }}
                        />
                        <div
                          className="absolute w-1.5 h-[7px] bg-amber-300 rounded-sm shadow-[0_0_6px_rgba(251,191,36,0.7)]"
                          style={{ right: -4, top: pos }}
                        />
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* short glowing connectors to each node */}
            {ABOUT_CHAPTERS.map((chapter) => {
              const cfg = CHIP_CONNECTIONS[chapter.id];
              if (!cfg) return null;
              return (
                <div
                  key={chapter.id + "-wire"}
                  className={classNames(
                    "absolute bg-gradient-to-b from-cyan-300 to-cyan-500 rounded-full shadow-[0_0_14px_rgba(56,189,248,0.8)]",
                    cfg.lineClass
                  )}
                />
              );
            })}

            {/* clickable nodes around the chip */}
            {ABOUT_CHAPTERS.map((chapter) => {
              const cfg = CHIP_CONNECTIONS[chapter.id];
              if (!cfg) return null;
              const isActive = chapter.id === activeId;
              return (
                <motion.button
                  key={chapter.id + "-node"}
                  type="button"
                  onClick={() => setActiveId(chapter.id)}
                  className={classNames(
                    "absolute flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[0.65rem] backdrop-blur-sm transition",
                    "border-cyan-300/60 bg-slate-900/85",
                    isActive
                      ? "shadow-[0_0_20px_rgba(56,189,248,0.9)] border-cyan-200"
                      : "opacity-80 hover:opacity-100",
                    cfg.nodeClass
                  )}
                >
                  <span
                    className={classNames(
                      "h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.9)]",
                      isActive && "scale-110"
                    )}
                  />
                  <span className="truncate max-w-[7.5rem]">{chapter.title}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: about text panel */}
      <motion.div
        key={active.id}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative rounded-2xl border border-black/10 bg-white/80 backdrop-blur p-5 md:p-6"
      >
        <div
          className={classNames(
            "pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-70 bg-gradient-to-br",
            active.accent
          )}
        />
        <div className="relative z-10 space-y-3 text-sm">
          <div className="text-[11px] uppercase tracking-[0.18em] opacity-60">
            {active.chapter}
          </div>
          <h3 className="text-base md:text-lg font-semibold">{active.title}</h3>
          <p className="text-xs opacity-70">{active.subtitle}</p>
          <p className="opacity-85 leading-relaxed">{active.blurb}</p>

          <div className="pt-3 border-t border-dashed border-black/10 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-baseline gap-1.5 px-3 py-1.5 rounded-full bg-black text-white text-[11px]">
              <span className="font-semibold">{active.statValue}</span>
              <span className="opacity-80">{active.statLabel}</span>
            </div>
            <p className="text-[11px] opacity-60">
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const COMPUTER_SCIENCE = [
  {
    title: "Predicting Drug Recall Timing from Public Signals",
    org: "AP Research",
    summary:
      "I conducted independent research analyzing whether sentiment on social media can predict FDA pharmaceutical drug recalls, bridging machine learning and public health.",
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
      "I led IntelliEase's early go-to-market and customer growth: sizing the market, building an SMB pipeline, running customer success/feedback loops, and launching the company's first website to establish its presence.",
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
      "I led UX research and prototyping for therapist and patient portals, turning demographic and usability insights into Figma wireframes that defined the minimum viable product.",
    details: [
      "Created Figma wireframes and UI prototypes for therapist dashboards and patient portals.",
      "Conducted demographic analysis and usability research to inform the MVP design of the patient portal.",
    ],
    type: "role",
  },
  {
    title: "Website Design",
    org: "SoulMender AI (Sohum AI)",
    summary: "Utilizing JavaScript, React, HTML, and CSS, I translated SoulMender's Figma wireframes and customer survey insights into a polished, marketing site catered for potential clients (separate dashboard for therapists to join and for clients to sign up) and investors",
    details: [
      "Here is the website I designed: https://soulmender.ai/"
    ],
    type: "project",
  }
];

// BUSINESS / AWARDS and TABS for filters
const BUSINESS = [
  {
    title: "BPA Leadership (National, State, and Chapter)",
    org: "Business Professionals of America",
    summary:
      "I served as National Secretary of Secondary Division, Florida State President, and Chapter President, impacting over 60,000 students globally.",
    details: [
      "National Secretary:",
      "   - Elected to serve as student executive leading BPA's 60,000-member Secondary Division.",
      "   - Launched cross-state Buddy System program connecting international, national, and state chapters to foster collaboration and mentorship.",
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
      "I co-launched our school's first DECA chapter and managed recruiting, setting officer roles, and training members in preparation for competition.",
    details: 
    [
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
      "I led Pine View's Entrepreneurship Club, expanding the school-wide Python Tank program, supporting student ventures, and providing funding and workshops on entrepreneurship.",
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
  {
    title: "Student Certification Series",
    org: "Business Professionals of America",
    summary: "I scripted and filmed modules of the 8-week Student Certification Series designed to elevate members' leadership skills and help manage stress.",
    type: "project",
  },
  {
    title: "Python Tank Competition",
    org: "Entrepreneurship Club, Pine View School",
    summary: "I expanded my school's version of the shark tank pitch competition, inspiring dozens of students to compete and raising over $1,000 to support their ventures.",
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

const TABS = [
  { id: "Computer Science", icon: Cpu, label: "Computer Science" },
  { id: "business", icon: Briefcase, label: "Business" },
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
          {/* LEFT: text */}
          <div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
              {ABOUT.name}
            </h1>
            <p className="mt-2 text-lg opacity-80">{ABOUT.tagline}</p>

            {(ABOUT.highlights ?? []).length > 0 && (
              <ul className="mt-6 space-y-2 text-sm">
                {(ABOUT.highlights ?? []).map((h, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <ChevronRight className="h-4 w-4 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

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
              <a
                href={ABOUT.contacts.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost">
                  <FileText className="mr-2 h-4 w-4" />
                  Resume
                </Button>
              </a>
            </div>
          </div>

          {/* RIGHT: headshot card */}
          <Card className="bg-white/80 backdrop-blur border-black/10 overflow-hidden flex items-center justify-center md:max-w-sm md:ml-auto">
            <div className="w-full" style={{ aspectRatio: "4 / 3" }}>
              <img
                src={headshot}
                alt="Niranjana headshot"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};


// live snapshot:
//         <div>
//            <Card className="shadow-xl bg-white/80 backdrop-blur border-black/10">
//              <CardHeader>
//                <CardTitle className="flex items-center gap-2">
//                  <Cpu className="h-5 w-5" /> Live Snapshot
//                </CardTitle>
//              </CardHeader>
//              <CardContent>
//                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
//                  <Metric label="Students served (BPA)" value="60k+" />
//                  <Metric label="State growth (YoY)" value="+54%" />
//                  <Metric label="Educators reached" value="1,000+" />
//                  <Metric label="Awards (tracked)" value={`${awardsCount}+`} />
//                </div>
//              </CardContent>
//            </Card>
//          </div>

const Metric = ({ label, value }) => (
  <div className="rounded-2xl border border-black/10 p-4 bg-white/70 backdrop-blur">
    <div className="text-2xl font-semibold">{value}</div>
    <div className="text-xs opacity-70">{label}</div>
  </div>
);

const Work = () => {
  const [activeTab, setActiveTab] = useState("Computer Science");
  const [filter, setFilter] = useState("project"); // roles | projects

  // Default filter per tab
  useEffect(() => {
    if (activeTab === "Computer Science") setFilter("role");
    if (activeTab === "business") setFilter("role");
  }, [activeTab]);

  const dataset = useMemo(() => {
    if (activeTab === "Computer Science") return COMPUTER_SCIENCE;
    if (activeTab === "business") return BUSINESS;
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
        <CardTitle className="text-base">{item.title}</CardTitle>
        <div className="mt-0.5 text-xs opacity-60">
          {item.org ?? item.organization}
        </div>
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
const LEADERSHIP_CHAPTERS = [
  {
    id: "competitor",
    chapter: "",
    title: "Competitor",
    subtitle: "Finding my voice through Speech & Debate and early BPA",
    blurb:
      "My journey as a competitor began with Extemporaneous Speaking in Speech and Debate. The event challenged me to take issues I cared about and articulate them with clarity, even when the clock was ticking. In those moments, I learned to think quickly, to remain composed in the face of uncertainty, and to trust that my voice could carry meaning in a crowded room. By ninth grade, I was eager to continue growing in an environment that aligned more closely with my interest in business, so I joined BPA and the Entrepreneurship Club. These organizations introduced me to a new kind of challenge, one that demanded both analytical thinking and adaptability, and kept me searching for ways to improve.",
    statLabel: "years competing across events",
    statValue: "4+",
    accent: "from-sky-200/80 to-indigo-200/80",
  },
  {
    id: "advocate",
    chapter: "",
    title: "Student Advocate",
    subtitle: "Leading BPA, DECA, and entrepreneurship communities",
    blurb:
      "Co-founding DECA at my school and welcoming over thirty students into their first business competitions showed me how much people can grow when they are supported by a community, and seeing our chapter reach ICDC in our very first year was a testament to what we could accomplish together. In BPA, I campaigned for Florida State President and spent the year collaborating with chapters across the state, ultimately helping our membership grow by 54%. That number mattered to me because it meant more students were discovering a place where they could challenge themselves and find their voice. Now, as National Secretary, I have the privilege of representing 60,000 members worldwide, developing programs that genuinely serve students, and staying connected to the people who make BPA meaningful.",
    statLabel: "members represented nationally",
    statValue: "60k+",
    accent: "from-amber-200/80 to-orange-200/80",
  },
  {
    id: "interdisciplinary",
    chapter: "",
    title: "Interdisciplinary Exploration",
    subtitle: "Connecting business and technology",
    blurb:
      "These experiences have not handed me a single, clear answer about my future, but they have helped me refine my interests and ambitions. I am drawn to business because it offers a framework for turning ideas into tangible projects, and I am fascinated by technology because it constantly redefines what is possible. To explore where these fields intersect, I have sought out internships and side projects, from developing AI-informed tools for mental health to creating automations for small businesses. I am still experimenting and learning from mentors and peers around me. What excites me most is the prospect of building a path that weaves together strategy, innovation, and the kind of community that first inspired me to compete.",
    statLabel: "internships and major side projects",
    statValue: "3+",
    accent: "from-emerald-200/80 to-teal-200/80",
  },
];

const LeadershipChapters = () => {
  const [activeId, setActiveId] = useState("competitor");
  const active =
    LEADERSHIP_CHAPTERS.find((c) => c.id === activeId) ?? LEADERSHIP_CHAPTERS[0];

  return (
    <div className="grid md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-6 items-stretch">
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-4 md:mx-0 px-4 md:px-0">
        {LEADERSHIP_CHAPTERS.map((chapter) => {
          const isActive = chapter.id === activeId;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => setActiveId(chapter.id)}
              className={classNames(
                "relative group text-left shrink-0 md:shrink border rounded-2xl transition-all duration-200",
                "bg-white/70 backdrop-blur",
                isActive
                  ? "border-black/80 shadow-[0_8px_25px_rgba(0,0,0,0.12)]"
                  : "border-black/10 hover:border-black/40 hover:shadow-sm",
                "px-3 py-3 md:px-4 md:py-4 min-w-[150px] md:min-w-0"
              )}
            >
              <div
                className={classNames(
                  "absolute inset-y-2 left-1 w-1 rounded-full bg-gradient-to-b",
                  chapter.accent
                )}
              />
              <div className="pl-3">
                <div className="text-[11px] uppercase tracking-[0.16em] opacity-70">
                  {chapter.chapter}
                </div>
                <div className="text-sm font-semibold leading-snug mt-0.5">
                  {chapter.title}
                </div>
                <div className="text-[11px] opacity-70 mt-1 line-clamp-2">
                  {chapter.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <motion.div
        key={active.id}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative rounded-2xl border border-black/10 bg-white/80 backdrop-blur p-5 md:p-6"
      >
        <div
          className={classNames(
            "pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-70 bg-gradient-to-br",
            active.accent
          )}
        />

        <div className="relative z-10 space-y-3 text-sm">
          <div className="text-[11px] uppercase tracking-[0.18em] opacity-60">
            {active.chapter}
          </div>
          <h3 className="text-base md:text-lg font-semibold">{active.title}</h3>
          <p className="text-xs opacity-70">{active.subtitle}</p>
          <p className="opacity-80 leading-relaxed">{active.blurb}</p>

          <div className="pt-3 border-t border-dashed border-black/10 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-baseline gap-1.5 px-3 py-1.5 rounded-full bg-black text-white text-[11px]">
              <span className="font-semibold">{active.statValue}</span>
              <span className="opacity-80">{active.statLabel}</span>
            </div>
            <p className="text-[11px] opacity-60">
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Story = () => (
  <Section id="story" title="Leadership Story" icon={Users2}>
    <LeadershipChapters />
  </Section>
);


// ========================= 
// FUN FACTS — IMAGE CARDS 
// =========================
//const FUN_MEDIA = [
//  { image: "/src/assets/fun/books.jpg", caption: "Always reading — business & psych." },
//  { image: "/src/assets/fun/breath.jpg", caption: "90‑second breath reset before talks." },
//  { image: "/src/assets/fun/dance.jpg", caption: "Bharatanatyam = focus + joy." },
//  { image: "/src/assets/fun/dosa.jpg", caption: "Forever tuning dosa crispiness ratios." },
//  { image: "/src/assets/fun/piano.jpg", caption: "RCM piano honors; love to accompany." },
//  { image: "/src/assets/fun/coach.jpg", caption: "Tutoring & peer coaching for clarity." },
//];

//const FunImageCard = ({ image, caption }) => (
//  <div>
//    <div className="rounded-2xl overflow-hidden border border-black/10 bg-white/70 backdrop-blur">
//      <img src={image} alt={caption} className="w-full object-cover" style={{ height: 360 }} />
//    </div>
//    <div className="mt-2 text-sm text-center opacity-80">{caption}</div>
//  </div>
//);


//const Fun = () => (
//  <Section id="fun" title="Fun Facts" icon={Star}>
//    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
//      {FUN_MEDIA.map((m, i) => (
//        <FunImageCard key={i} image={m.image} caption={m.caption} />
//      ))}
//    </div>
//  </Section>
//);

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
          <div className="mt-3">
            <Button onClick={openResumePdf}>
              <FileText className="h-4 w-4 mr-2"/>
              Download
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
              <Users2 className="h-4 w-4" /> <a className="underline" href="#story">Leadership story</a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </Section>
);

// add this in the above section when ready:
//<li className="flex items-center gap-2">
//              <Star className="h-4 w-4" /> <a className="underline" href="#fun">Fun facts</a>
//            </li>

export default function App() {
  return (
    <div className="min-h-screen text-gray-900">
      <Navbar />
      <Hero />
      <main>
        <Section id="about" title="About" icon={GraduationCap}>
          <AboutBookshelf />
        </Section>
        <Work />
        <Community />
        <Story />
        <Contact />
      </main>
      <footer className="py-12 text-center text-xs opacity-70">
      </footer>
    </div>
  );
}
// add <Fun /> in after fixed

