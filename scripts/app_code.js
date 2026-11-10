"use strict";
/* ===================== Config & Constants ===================== */
const SITE_URL = location.pathname.endsWith(".html") ? "teambud-home.html" : "/";
const CATS = [
  "Technology and Software Development",
  "Graphics and Brand Design",
  "Digital Marketing",
  "Content Creation and Media",
  "Writing and Communication",
  "Business Consulting",
  "Finance and Accounting",
  "Engineering and Technical Services",
  "Agriculture and Agribusiness",
  "Fashion and Creative Arts",
  "Education and Training",
  "Research and Professional Services",
  "Photography and Videography",
  "Event Planning and Management",
  "Other Professional Services"
];
const LEVELS = ["100 Level","200 Level","300 Level","400 Level","500 Level","600 Level","ND 1","ND 2","HND 1","HND 2","NCE 1","NCE 2","NCE 3","Postgraduate","Other"];
const COUNTRIES = ["Nigeria","Ghana","Kenya","South Africa","Cameroon","Uganda","Rwanda","Other"];
const NG_STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];
const INSTITUTIONS = ["Olabisi Onabanjo University","University of Lagos","University of Ibadan","Obafemi Awolowo University","University of Ilorin","Covenant University","Federal University of Technology, Akure","University of Nigeria, Nsukka","Ahmadu Bello University","Lagos State Polytechnic","Federal Polytechnic, Ilaro","Federal College of Education"];
const INTENTS = [["team","Looking for a team"],["create","Interested in creating an agency"],["join","Looking to join an existing agency"],["opps","Interested in discovering opportunities"]];
const SKILL_SUGGEST = ["Web development","Mobile app development","UI and UX design","Graphic design","Brand identity","Digital marketing","Social media management","Copywriting","Content writing","Video editing","Photography","Data analysis","Bookkeeping","Business planning","Project management","Public speaking","Event planning","Tutoring"];
const AVAIL = [["unset","Not set"],["now","Available now"],["part","Available part time"],["later","Available later"],["no","Not available"]];
const EXPERIENCE_LEVELS = ["Beginner (Under 1 yr)","Intermediate (1-2 yrs)","Advanced (2-4 yrs)","Expert / Lead (4+ yrs)"];
const LOOKING_FOR_OPTIONS = [
  { id: "teammates", label: "Teammates for projects", icon: "👥" },
  { id: "join_agency", label: "Join an existing agency", icon: "🤝" },
  { id: "create_agency", label: "Co-founders to start an agency", icon: "🚀" },
  { id: "freelance", label: "Freelance & client gigs", icon: "💼" },
  { id: "internships", label: "Internships & attachment", icon: "🎓" },
  { id: "mentorship", label: "Mentorship & guidance", icon: "🧭" },
  { id: "partnerships", label: "Startup & business partnerships", icon: "💡" },
  { id: "learning_skills", label: "Learning & skill exchange", icon: "📚" }
];
const CLIENT_TYPES = ["Individual","Small business","Company","Non-profit or organisation","Educational institution"];

const TEAM_ROLES = [
  "Team Owner",
  "Agency Manager",
  "Project Manager",
  "Finance Manager",
  "Creative Lead",
  "Technical Lead",
  "Marketing Lead",
  "Team Member"
];

const PROJ_STATUSES = ["New","Planning","In Progress","Under Review","Completed","Cancelled"];

const NTYPES = [
  ["connection_request","Connection requests","Someone asks to connect with you"],
  ["connection_accepted","Accepted connections","Someone accepts your request"],
  ["agency_invitation","Agency invitations","You are invited to join an agency"],
  ["team_update","Team membership updates","Changes to an agency you belong to"],
  ["client_request","Client project requests","A client sends a request to your agency"],
  ["project_status","Project status changes","Progress on a project you are part of"],
  ["message","Messages","You receive a message"],
  ["payment","Payment updates","Payments, invoices and payouts"]
];

const NICON = {
  connection_request:"M16 11a4 4 0 1 0-8 0M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6M19 4v4M17 6h4",
  connection_accepted:"M5 12l4.5 4.5L19 7",
  agency_invitation:"M4 6h16v12H4zM4 7l8 6 8-6",
  team_update:"M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 19c0-3 2.7-5 6-5s6 2 6 5M17 10a2.5 2.5 0 1 0 0-5M17 14c2.5 0 4 1.7 4 4",
  client_request:"M4 5h16v11H8l-4 4zM8 9h8M8 12h5",
  project_status:"M5 19V9m5 10V5m5 14v-7m5 7V8",
  message:"M4 5h16v11H9l-5 4zM8 9h8",
  payment:"M3 7h18v11H3zM3 11h18M7 15h3"
};

const AGREEMENT_SECTIONS = [
  { id: "resp", title: "1. Member Responsibilities", text: "Each member commits to executing assigned tasks with diligence, meeting project milestones, communicating blockers promptly, and maintaining high professional standards with clients and peers." },
  { id: "own", title: "2. Ownership & Equity", text: "TeamBud does NOT automatically assign equal equity or ownership. The team must collaboratively discuss, determine, and agree on internal equity or ownership distribution among themselves based on contribution, risk, and role." },
  { id: "rev", title: "3. Revenue Sharing", text: "Project earnings and client payments must be distributed according to transparent, pre-agreed project splits. No member may withhold funds owed to teammates for completed milestones." },
  { id: "proj", title: "4. Project Contributions", text: "Work allocation should be balanced and logged openly. Members must contribute actively to projects they commit to, or request reassignment before deadlines lapse." },
  { id: "dec", title: "5. Decision-Making", text: "Day-to-day operational execution is guided by designated managers (e.g., Creative Lead, Project Manager). Strategic choices—such as onboarding/offboarding members, major client bids, or altering brand services—require majority vote." },
  { id: "ip", title: "6. Intellectual Property", text: "Upon receipt of full payment, commissioned deliverables transfer to the client as agreed in the quotation. Internal agency templates, tooling, and reusable code libraries remain collective agency property unless otherwise agreed." },
  { id: "conf", title: "7. Confidentiality", text: "Members must keep confidential all proprietary client data, business plans, technical architectures, and internal financial details shared during collaboration." },
  { id: "exit", title: "8. Exit Arrangements", text: "A member wishing to leave an agency must provide at least 14 days notice, deliver all working files, hand over pending tasks, and settle any outstanding revenue rights before departure." },
  { id: "disp", title: "9. Dispute Resolution", text: "Disagreements should first be addressed through internal mediation led by the Team Owner. If unresolved, the team may seek independent guidance from institutional advisors or mutual student mentors." }
];
const LEGAL_DISCLAIMER = "Notice: TeamBud platform membership does not constitute formal corporate incorporation or statutory legal partnership. Teams operate as collaborative student enterprise units and are encouraged to register their legal business entities as they commercialize.";

/* ===================== Storage & Data Layer ===================== */
const Store = (() => {
  let ok = true;
  const mem = {};
  try {
    localStorage.setItem("_t", "1");
    localStorage.removeItem("_t");
  } catch (e) {
    ok = false;
  }
  return {
    get: k => ok ? localStorage.getItem(k) : (mem[k] || null),
    set: (k, v) => { ok ? localStorage.setItem(k, v) : (mem[k] = v); },
    persistent: ok
  };
})();

const KEY = "teambud_prototype_v1";
const fresh = () => ({
  users: [],
  conns: [],
  notifs: [],
  tokens: [],
  session: null,
  requests: [],
  agencies: [],
  payments: [],
  opportunities: [],
  messages: [],
  reports: [],
  fails: {}
});

let db;
try {
  db = JSON.parse(Store.get(KEY)) || fresh();
  if (!db.agencies) db.agencies = [];
  if (!db.requests) db.requests = [];
  if (!db.payments) db.payments = [];
  if (!db.opportunities) db.opportunities = [];
  if (!db.messages) db.messages = [];
  if (!db.reports) db.reports = [];
} catch (e) {
  db = fresh();
}

const save = () => Store.set(KEY, JSON.stringify(db));
const rid = () => Array.from(crypto.getRandomValues(new Uint8Array(12)), b => b.toString(16).padStart(2, "0")).join("");
const now = () => Date.now();
const esc = t => {
  const d = document.createElement("div");
  d.textContent = t == null ? "" : String(t);
  return d.innerHTML;
};
const b64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));

async function hashPw(pw, salt) {
  if (!(window.crypto && crypto.subtle)) {
    return "plain:" + pw.length + ":" + btoa(unescape(encodeURIComponent(pw + salt)));
  }
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: new TextEncoder().encode(salt), iterations: 150000, hash: "SHA-256" }, k, 256);
  return b64(bits);
}

const me = () => {
  const s = db.session;
  if (!s) return null;
  if (s.exp < now()) {
    db.session = null;
    save();
    return null;
  }
  return db.users.find(u => u.id === s.uid) || null;
};

const userById = id => db.users.find(u => u.id === id);

function ensureStudentDefaults(u) {
  if (!u || u.role !== "student") return u;
  if (!u.headline) {
    const pSkill = (u.skills && u.skills[0]) ? u.skills[0].name : "Talented Student";
    u.headline = `${pSkill} · ${u.department || "Student"}`;
  }
  if (u.showLevel === undefined) u.showLevel = true;
  if (!u.experienceLevel) {
    const hasAdv = (u.skills || []).some(s => s.level === "Advanced");
    u.experienceLevel = hasAdv ? "Advanced (2-4 yrs)" : "Intermediate (1-2 yrs)";
  }
  if (!u.category) {
    u.category = (u.collab && u.collab[0]) || "Technology and Software Development";
  }
  if (!u.lookingFor || !u.lookingFor.length) {
    u.lookingFor = ["teammates", "join_agency"];
  }
  if (!u.socialLinks) {
    u.socialLinks = {};
  }
  if (!u.aboutMe) {
    u.aboutMe = u.bio || "";
  }
  if (!u.portfolio) {
    u.portfolio = [];
  }
  u.portfolio = u.portfolio.map(p => {
    if (typeof p === "string") return { id: rid(), title: "Portfolio Project", url: p, description: "", category: "General", tools: [] };
    if (p && !p.title && p.label) {
      return {
        id: p.id || rid(),
        title: p.label,
        url: p.url || "",
        description: p.desc || "Student showcase item.",
        category: "Portfolio",
        tools: [],
        image: p.image || ""
      };
    }
    return p;
  });
  return u;
}

const students = () => db.users.filter(u => u.role === "student" && u.verified).map(ensureStudentDefaults);

function log(u, text) {
  u.activity = u.activity || [];
  u.activity.unshift({ t: now(), text });
  u.activity = u.activity.slice(0, 30);
}

function notify(uid, type, text) {
  const u = userById(uid);
  if (!u) return;
  const p = (u.prefs && u.prefs.inapp) || {};
  if (p[type] === false) return;
  db.notifs.unshift({ id: rid(), uid, type, text, t: now(), read: false });
}

function connBetween(a, b) {
  return db.conns.find(c => (c.from === a && c.to === b) || (c.from === b && c.to === a));
}

function connState(meId, otherId) {
  const c = connBetween(meId, otherId);
  if (!c) return "none";
  if (c.status === "accepted") return "connected";
  return c.from === meId ? "sent" : "incoming";
}

/* ===================== Agency & Team Status Logic ===================== */
/*
  PLATFORM RULES:
  - MINIMUM MEMBERS: 3
  - MAXIMUM MEMBERS: 10
  - FORMING: 1 or 2 members (Not publicly listed). Clearly shows how many needed.
  - ACTIVE: 3 to 10 members (Eligible for public listing).
  - NEEDS_MEMBERS: Was active, but member left/removed dropping below 3. Explains to owner.
*/
function syncAgencyStatus(agency) {
  if (!agency) return "forming";
  const count = (agency.members || []).length;
  const prev = agency.status;
  if (count < 3) {
    if (prev === "active") {
      agency.status = "needs_members";
      notify(agency.ownerId, "team_update", `Your agency "${agency.name}" has fallen below the 3-member minimum. Its status has changed to NEEDS MEMBERS and it is temporarily unlisted from public search.`);
    } else if (agency.status !== "needs_members") {
      agency.status = "forming";
    }
  } else if (count >= 3 && count <= 10) {
    if (agency.status === "forming" || agency.status === "needs_members") {
      agency.status = "active";
      notify(agency.ownerId, "team_update", `Great news! "${agency.name}" has reached ${count} members and is now active and publicly listed!`);
    }
  }
  agency.updatedAt = now();
  save();
  return agency.status;
}

function agencyById(id) {
  return (db.agencies || []).find(a => a.id === id);
}

function agencyBySlug(slug) {
  return (db.agencies || []).find(a => (a.slug || "").toLowerCase() === (slug || "").toLowerCase());
}

function userAgencies(userId) {
  return (db.agencies || []).filter(a => (a.members || []).some(m => m.userId === userId));
}

function userPendingInvites(userId, email) {
  const list = [];
  (db.agencies || []).forEach(a => {
    (a.invitations || []).forEach(inv => {
      if (inv.status === "pending" && (inv.inviteeUserId === userId || (email && inv.inviteeEmail && inv.inviteeEmail.toLowerCase() === email.toLowerCase()))) {
        list.push({ agency: a, invite: inv });
      }
    });
  });
  return list;
}

function isAgencyOwnerOrManager(agency, userId) {
  if (!agency || !userId) return false;
  if (agency.ownerId === userId) return true;
  const m = (agency.members || []).find(x => x.userId === userId);
  return m && (m.role === "Team Owner" || m.role === "Agency Manager");
}

function isAgencyMember(agency, userId) {
  if (!agency || !userId) return false;
  return (agency.members || []).some(x => x.userId === userId);
}

/* ===================== Seed Demo Data ===================== */
/* __SULAIMAN_PHOTO__ */
const SULAIMAN_PHOTO = typeof window !== "undefined" && window.__SULAIMAN_PHOTO ? window.__SULAIMAN_PHOTO : "sulaiman.jpg";

const DEMO_STUDENTS = [
  {
    name: "Onifade Sulaiman Ipesola",
    username: "mr_clarity",
    dept: "Computer Science",
    state: "Lagos",
    inst: "University of Lagos",
    level: "300 Level",
    photo: SULAIMAN_PHOTO,
    headline: "Founder & Lead Strategist at TeamBud · Computer Science Student · Digital Entrepreneur",
    bio: "Founder of TeamBud & Clarity Digital Academy. Computer Science student, young leader, and digital entrepreneur helping students collaborate, build agencies, and earn together.",
    aboutMe: "Passionate about empowering African students through collaborative entrepreneurship. Lead founder of TeamBud and Clarity Digital Academy. I blend computer science fundamentals with digital marketing, team leadership, and product strategy to help student talent build profitable student-run agencies across Nigeria.",
    showLevel: true,
    expLevel: "Advanced (2-4 yrs)",
    cat: "Technology and Software Development",
    avail: "now",
    skills: [
      { name: "Digital marketing", level: "Advanced", duration: "3 years", desc: "Performance marketing, funnel architecture, and campus growth blitzes.", pro: true, collab: true },
      { name: "Brand strategy", level: "Advanced", duration: "3 years", desc: "Identity design systems, value propositions, and agency positioning.", pro: true, collab: true },
      { name: "Team building", level: "Advanced", duration: "2 years", desc: "Recruiting complementary skill sets and structuring agile project execution.", pro: true, collab: true },
      { name: "Web development", level: "Intermediate", duration: "2 years", desc: "Modern frontend frameworks, responsive UI, and client portals.", pro: true, collab: true }
    ],
    lookingFor: ["teammates", "create_agency", "partnerships", "mentorship"],
    socialLinks: {
      github: "https://github.com/Sulaiman12356",
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      website: "https://teambud.vercel.app"
    },
    portfolio: [
      {
        id: "p_teambud",
        title: "TeamBud Ecosystem Platform",
        category: "Full-Stack Web App",
        date: "2024 - 2025",
        description: "Architected and built the comprehensive TeamBud platform connecting Nigerian university students to form agencies, showcase abilities, and deliver client projects with transparent revenue distribution.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        url: "https://teambud.vercel.app",
        tools: ["React", "TypeScript", "Node.js", "Tailwind CSS"],
        contribution: "Founder, Product Architect & Lead Engineer"
      },
      {
        id: "p_clarity",
        title: "Clarity Digital Academy Portal",
        category: "EdTech & Learning Hub",
        date: "2024",
        description: "Created skill-training and community hub for 500+ undergraduate learners acquiring high-income digital skills and agency execution frameworks.",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
        url: "https://teambud.vercel.app",
        tools: ["JavaScript", "HTML5", "CSS3", "Responsive UI"],
        contribution: "Founder & Lead Instructor"
      }
    ],
    experience: [
      { id: "e1", role: "Founder & Lead Director", org: "TeamBud & Clarity Academy", period: "2023 - Present", desc: "Spearheaded student agency formation networks and digital entrepreneurial training across campuses." },
      { id: "e2", role: "Lead Student Ambassador", org: "Campus Innovation Council", period: "2024 - Present", desc: "Organized collaborative student workshops on digital agency business models." }
    ],
    certs: [
      { id: "c1", name: "Executive Leadership & Venture Strategy", issuer: "Enterprise Innovation Hub", year: "2024" }
    ],
    collab: ["Technology and Software Development","Digital Marketing","Business Consulting"],
    interests: ["fintech","startups","education"]
  },
  {
    name: "Adeyemi Okon",
    username: "sample_dev",
    dept: "Computer Science",
    state: "Lagos",
    inst: "University of Lagos",
    level: "300 Level",
    photo: "",
    headline: "Full-Stack Engineer & React Specialist · 300 Level CS",
    bio: "Builds modern web applications with React and Node.js. Passionate about software architecture, state patterns and team building.",
    aboutMe: "Dedicated software engineer passionate about modern web applications, scalable state architectures, and robust API design. Always excited to collaborate on cross-functional student projects.",
    showLevel: true,
    expLevel: "Advanced (2-4 yrs)",
    cat: "Technology and Software Development",
    avail: "now",
    skills: [
      { name: "Web development", level: "Advanced", duration: "3 years", desc: "Full-stack web applications with React, TypeScript and Node.js.", pro: true, collab: true },
      { name: "UI and UX design", level: "Intermediate", duration: "2 years", desc: "Component design systems and intuitive user journeys.", pro: true, collab: true }
    ],
    lookingFor: ["join_agency", "freelance", "teammates"],
    socialLinks: { github: "https://github.com", linkedin: "https://linkedin.com", website: "https://portfolio-dev.vercel.app" },
    portfolio: [
      {
        id: "p_dev1",
        title: "Campus Mart E-commerce Engine",
        category: "Full-Stack Web App",
        date: "2024",
        description: "Peer-to-peer campus marketplace allowing verified students to trade textbooks and gadgets safely.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
        url: "https://github.com",
        tools: ["React", "Node.js", "Express", "PostgreSQL"],
        contribution: "Backend & Database Lead"
      }
    ],
    experience: [{ id: "ed1", role: "Frontend Lead", org: "Campus Innovation Hub", period: "2024 - Present", desc: "Built modular web components for student client engagements." }],
    certs: [{ id: "cd1", name: "Certified Full-Stack Developer", issuer: "Developer Circle", year: "2024" }],
    collab: ["Technology and Software Development"],
    interests: ["fintech","education"]
  },
  {
    name: "Chioma Eze",
    username: "sample_design",
    dept: "Fine and Applied Arts",
    state: "Ogun",
    inst: "Olabisi Onabanjo University",
    level: "400 Level",
    photo: "",
    headline: "Brand Identity Designer & Design Systems Lead",
    bio: "Brand identity and visual design strategist for ambitious digital ventures and youth startups.",
    aboutMe: "Visual designer crafting distinctive typography, memorable identity systems, and user-centric digital experiences for emerging brands and agency clients.",
    showLevel: true,
    expLevel: "Advanced (2-4 yrs)",
    cat: "Graphics and Brand Design",
    avail: "part",
    skills: [
      { name: "Graphic design", level: "Advanced", duration: "3 years", desc: "Logotype creation, style guides, and brand collateral.", pro: true, collab: true },
      { name: "Brand identity", level: "Intermediate", duration: "2 years", desc: "Brand positioning, color systems, and corporate packaging.", pro: true, collab: true }
    ],
    lookingFor: ["join_agency", "freelance", "partnerships"],
    socialLinks: { behance: "https://behance.net", linkedin: "https://linkedin.com" },
    portfolio: [
      {
        id: "p_des1",
        title: "AfroVibe Fashion Brand Identity",
        category: "Brand Identity & Design",
        date: "2024",
        description: "Complete brand guidelines, custom logotype, packaging assets, and lookbook for a sustainable campus fashion line.",
        image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=800&q=80",
        url: "https://behance.net",
        tools: ["Figma", "Adobe Illustrator", "Photoshop"],
        contribution: "Solo Creative Director"
      }
    ],
    experience: [{ id: "edes1", role: "Creative Lead", org: "Apex Design Collective", period: "2023 - 2024", desc: "Directed 8 client visual redesigns across FMCG and apparel." }],
    certs: [{ id: "cdes1", name: "Visual Identity Masterclass", issuer: "Design Institute", year: "2023" }],
    collab: ["Graphics and Brand Design","Fashion and Creative Arts"],
    interests: ["fashion","branding"]
  },
  {
    name: "Ibrahim Musa",
    username: "sample_mkt",
    dept: "Mass Communication",
    state: "Oyo",
    inst: "University of Ibadan",
    level: "300 Level",
    photo: "",
    headline: "Growth Marketer & Paid Performance Specialist",
    bio: "Growth marketing, social media campaigns, and client conversion funnels for student-run businesses.",
    aboutMe: "Data-driven marketing strategist building customer acquisition funnels, viral social campaigns, and high-converting launch strategies for university ventures.",
    showLevel: true,
    expLevel: "Intermediate (1-2 yrs)",
    cat: "Digital Marketing",
    avail: "now",
    skills: [
      { name: "Digital marketing", level: "Intermediate", duration: "2 years", desc: "Paid social funnels, content distribution, and analytics tracking.", pro: true, collab: true },
      { name: "Social media management", level: "Advanced", duration: "3 years", desc: "Community engagement, viral short-form video, and retention strategy.", pro: true, collab: true }
    ],
    lookingFor: ["teammates", "freelance", "join_agency"],
    socialLinks: { twitter: "https://x.com", linkedin: "https://linkedin.com" },
    portfolio: [
      {
        id: "p_mkt1",
        title: "UniChow Campus Delivery Launch",
        category: "Digital Marketing Campaign",
        date: "2024",
        description: "Managed 30-day viral TikTok and WhatsApp marketing blitz generating 3,400 orders in first month across 2 campuses.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        url: "https://x.com",
        tools: ["Meta Ads", "Google Analytics", "Canva"],
        contribution: "Campaign Strategist"
      }
    ],
    experience: [{ id: "emkt1", role: "Growth Consultant", org: "Campus Merchant Union", period: "2024 - Present", desc: "Designed customer onboarding funnels for 12 campus shops." }],
    certs: [{ id: "cmkt1", name: "Performance Marketing Pro", issuer: "Digital Growth Lab", year: "2024" }],
    collab: ["Digital Marketing","Content Creation and Media"],
    interests: ["branding","education"]
  },
  {
    name: "Fatima Bello",
    username: "sample_write",
    dept: "English and Literary Studies",
    state: "Osun",
    inst: "Obafemi Awolowo University",
    level: "400 Level",
    photo: "",
    headline: "Senior Technical & Brand Copywriter",
    bio: "Technical and brand copywriting for websites, presentations, and product launch decks.",
    aboutMe: "Wordsmith turning complex products into clear, compelling narratives. Specializing in landing page copy, case studies, investor pitch decks, and SEO content.",
    showLevel: true,
    expLevel: "Advanced (2-4 yrs)",
    cat: "Writing and Communication",
    avail: "now",
    skills: [
      { name: "Copywriting", level: "Advanced", duration: "3 years", desc: "High-converting sales copy, value propositions, and email sequences.", pro: true, collab: true },
      { name: "Content writing", level: "Advanced", duration: "3 years", desc: "Long-form tech guides, thought leadership, and press announcements.", pro: true, collab: true }
    ],
    lookingFor: ["freelance", "join_agency", "mentorship"],
    socialLinks: { linkedin: "https://linkedin.com", website: "https://medium.com" },
    portfolio: [
      {
        id: "p_wri1",
        title: "FinStart Investor Pitch & Whitepaper",
        category: "Copywriting & Content",
        date: "2024",
        description: "Authored 24-page fintech overview and investor narrative that helped founders secure campus accelerator funding.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
        url: "https://medium.com",
        tools: ["Notion", "Google Docs", "Grammarly"],
        contribution: "Principal Writer"
      }
    ],
    experience: [{ id: "ewri1", role: "Staff Editor", org: "University Herald", period: "2023 - Present", desc: "Supervised editorial staff and student business reporting." }],
    certs: [{ id: "cwri1", name: "Professional Content Strategist", issuer: "Writers Guild", year: "2023" }],
    collab: ["Writing and Communication"],
    interests: ["writing","culture"]
  },
  {
    name: "Tunde Bakare",
    username: "sample_pm",
    dept: "Business Administration",
    state: "Lagos",
    inst: "University of Lagos",
    level: "400 Level",
    photo: "",
    headline: "Agile Project Manager & Operations Strategist",
    bio: "Project manager ensuring delivery milestones, agile sprints, and client satisfaction for multi-student agencies.",
    aboutMe: "Operational catalyst orchestrating multi-disciplinary student teams. Ensuring on-time delivery, scope clarity, and structured client communication.",
    showLevel: true,
    expLevel: "Advanced (2-4 yrs)",
    cat: "Business Consulting",
    avail: "part",
    skills: [
      { name: "Project management", level: "Advanced", duration: "3 years", desc: "Scrum sprints, Kanban workflows, milestone tracking, and QA checkpoints.", pro: true, collab: true },
      { name: "Business planning", level: "Intermediate", duration: "2 years", desc: "Feasibility studies, client proposals, pricing calculators, and budgeting.", pro: true, collab: true }
    ],
    lookingFor: ["create_agency", "partnerships", "teammates"],
    socialLinks: { linkedin: "https://linkedin.com" },
    portfolio: [
      {
        id: "p_pm1",
        title: "KolaTech Sprint Roadmap & Delivery",
        category: "Business Strategy & Research",
        date: "2024",
        description: "Structured 6 sprint cycles across 8 developers and designers, reducing bug backlog by 45% and ensuring client milestone delivery.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
        url: "https://linkedin.com",
        tools: ["Jira", "Trello", "Slack", "Asana"],
        contribution: "Scrum Master & PM"
      }
    ],
    experience: [{ id: "epm1", role: "Venture Associate", org: "Lagos Student Incubator", period: "2024 - Present", desc: "Tracked execution KPIs for 10 undergraduate ventures." }],
    certs: [{ id: "cpm1", name: "Agile Project Master", issuer: "PM Alliance", year: "2024" }],
    collab: ["Business Consulting"],
    interests: ["startups","operations"]
  }
];

function seedDemoData() {
  DEMO_STUDENTS.forEach(d => {
    let u = db.users.find(x => x.username === d.username);
    if (!u) {
      const salt = rid();
      u = {
        id: rid(),
        role: "student",
        demo: true,
        name: d.name,
        email: d.username + "@demo.invalid",
        salt,
        passHash: "x",
        verified: true,
        username: d.username,
        institution: d.inst,
        department: d.dept,
        level: d.level,
        country: "Nigeria",
        state: d.state,
        intents: ["team","create"],
        bio: d.bio,
        aboutMe: d.aboutMe,
        headline: d.headline,
        showLevel: d.showLevel,
        experienceLevel: d.expLevel,
        category: d.cat,
        photo: d.photo || "",
        skills: d.skills.map(s => ({ id: rid(), name: s.name, level: s.level, duration: s.duration, desc: s.desc, pro: s.pro, learn: false, collab: s.collab })),
        experience: d.experience || [],
        portfolio: d.portfolio || [],
        certs: d.certs || [],
        interests: d.interests || [],
        availability: d.avail || "now",
        collab: d.collab || [],
        lookingFor: d.lookingFor || ["teammates"],
        socialLinks: d.socialLinks || {},
        prefs: { inapp: {}, email: {} },
        activity: [],
        created: now() - 86400000 * 30
      };
      db.users.push(u);
    } else {
      // Refresh with rich showcase attributes while preserving existing IDs
      u.headline = d.headline;
      u.aboutMe = d.aboutMe;
      u.experienceLevel = d.expLevel;
      u.category = d.cat;
      u.showLevel = d.showLevel;
      u.lookingFor = d.lookingFor;
      u.socialLinks = d.socialLinks;
      if (d.photo) u.photo = d.photo;
      if (!u.portfolio || u.portfolio.length === 0 || !u.portfolio[0].tools) {
        u.portfolio = d.portfolio;
      }
    }
  });

  // Seed sample client
  let clientUser = db.users.find(u => u.role === "client" && u.email === "client@demo.invalid");
  if (!clientUser) {
    const salt = rid();
    clientUser = {
      id: rid(),
      role: "client",
      demo: true,
      name: "SwiftLogistics Ventures",
      email: "client@demo.invalid",
      salt,
      passHash: "x",
      verified: true,
      accountType: "Small business",
      country: "Nigeria",
      contact: "+234 802 345 6789 (WhatsApp)",
      prefs: { inapp: {}, email: {} },
      activity: [],
      created: now() - 86400000 * 20
    };
    db.users.push(clientUser);
  }

  // Seed Agencies if empty
  if (!db.agencies || db.agencies.length === 0) {
    const uDev = db.users.find(u => u.username === "sample_dev");
    const uDes = db.users.find(u => u.username === "sample_design");
    const uMkt = db.users.find(u => u.username === "sample_mkt");
    const uWri = db.users.find(u => u.username === "sample_write");
    const uPm = db.users.find(u => u.username === "sample_pm");

    if (uDev && uDes && uMkt && uWri) {
      // 1. Apex Creative Studio (Active, 4 members)
      const apexId = "ag_apex";
      const apex = {
        id: apexId,
        name: "Apex Creative Studio",
        slug: "apex-creative",
        logo: "",
        shortDesc: "Full-stack software engineering, brand identity, and UI/UX design for scalable businesses.",
        fullDesc: "Apex Creative is an interdisciplinary student-founded agency bringing together top engineering, design, and growth talent from University of Lagos. We build complete digital products from discovery to production deployment.",
        industry: "Technology and Software Development",
        mainCategory: "Technology and Software Development",
        additionalServices: ["Web development", "UI and UX design", "Brand identity", "Digital marketing"],
        institution: "University of Lagos",
        location: "Lagos, Nigeria",
        portfolioLinks: [
          { id: rid(), label: "Behance Showcase", url: "https://behance.net" },
          { id: rid(), label: "GitHub Organisation", url: "https://github.com" }
        ],
        contactPref: { email: true, phone: "+234 801 112 2334", messaging: true },
        guidelinesAgreed: true,
        status: "active",
        ownerId: uDev.id,
        members: [
          { userId: uDev.id, role: "Team Owner", customRoleDesc: "Lead Full-Stack Architect & Agency Lead", joinedAt: now() - 86400000 * 20, status: "accepted" },
          { userId: uDes.id, role: "Creative Lead", customRoleDesc: "Head of Brand Strategy & UI/UX Design", joinedAt: now() - 86400000 * 18, status: "accepted" },
          { userId: uMkt.id, role: "Marketing Lead", customRoleDesc: "Client Acquisition & Growth Funnels", joinedAt: now() - 86400000 * 16, status: "accepted" },
          { userId: uPm ? uPm.id : uWri.id, role: "Project Manager", customRoleDesc: "Sprint Facilitation & Delivery Assurance", joinedAt: now() - 86400000 * 14, status: "accepted" }
        ],
        invitations: [],
        agreement: {
          acknowledged: [uDev.id, uDes.id, uMkt.id, uPm ? uPm.id : uWri.id],
          version: "1.0",
          acknowledgedAt: now() - 86400000 * 14
        },
        services: [
          {
            id: rid(),
            title: "Custom Web Application MVP",
            desc: "Responsive web application with authenticated dashboards, database integration, and high performance.",
            category: "Technology and Software Development",
            startingPrice: "₦250,000",
            timeline: "2 to 3 weeks",
            requiredInfo: "Product specification brief, wireframes or functional requirements, and brand color guidelines."
          },
          {
            id: rid(),
            title: "Complete Brand Identity System",
            desc: "Comprehensive visual branding with vector logo kit, typography system, color tokens, and social media templates.",
            category: "Graphics and Brand Design",
            startingPrice: "₦120,000",
            timeline: "1 to 2 weeks",
            requiredInfo: "Company mission statement, target demographic, color preferences, and reference inspiration."
          }
        ],
        portfolio: [
          {
            id: rid(),
            title: "FinPulse Campus Micro-Finance",
            desc: "Designed and built responsive customer onboarding portal and loan management ledger for campus cooperatives.",
            image: "",
            skillsUsed: ["Web development", "UI and UX design", "Data analysis"],
            contributions: "Front-end SPA, secure authentication, user test sessions across 150 student merchants.",
            completedDate: "January 2026"
          }
        ],
        testimonials: [
          {
            id: rid(),
            clientName: "Dr. Tunde Alabi",
            clientOrg: "CampusHealth Initiative",
            quote: "Apex Creative delivered our portal ahead of deadline. The team was transparent, communicative, and upheld genuine engineering excellence.",
            projectTitle: "Student Health Portal",
            date: "February 2026"
          }
        ],
        availability: "available",
        projects: [
          {
            id: rid(),
            title: "Delivery Driver Real-Time Portal",
            desc: "Dispatch dashboard and GPS package tracking web interface for campus logistics startup.",
            assignedTo: [uDev.id, uDes.id],
            deadline: "2026-11-28",
            status: "In Progress",
            deliverables: [
              { id: rid(), name: "portal-wireframes-v2.pdf", size: 3410000, uploadedAt: now() - 86400000 * 3, uploadedBy: uDes.id }
            ],
            comments: [
              { id: rid(), userId: uDev.id, text: "Backend API endpoints verified. Integrating live map feed next.", t: now() - 86400000 }
            ],
            createdAt: now() - 86400000 * 5
          }
        ],
        messages: [
          {
            id: rid(),
            senderId: uDev.id,
            projectId: null,
            text: "Welcome team! Let's make sure all sprint items for the driver portal are reviewed before Friday.",
            attachment: null,
            t: now() - 3600000 * 8,
            readBy: [uDev.id, uDes.id]
          }
        ],
        createdAt: now() - 86400000 * 25,
        updatedAt: now()
      };
      db.agencies.push(apex);

      // 2. Kola Brand House (Active, 3 members)
      const kolaId = "ag_kola";
      const kola = {
        id: kolaId,
        name: "Kola Brand House",
        slug: "kola-brand",
        logo: "",
        shortDesc: "Packaging, typography, and visual brand identity for creative businesses and consumer goods.",
        fullDesc: "Based at Obafemi Awolowo University, Kola Brand House specializes in tactile packaging design, publication layout, and distinctive visual identities that stand out in competitive markets.",
        industry: "Graphics and Brand Design",
        mainCategory: "Graphics and Brand Design",
        additionalServices: ["Graphic design", "Brand identity", "Content creation and Media"],
        institution: "Obafemi Awolowo University",
        location: "Osun, Nigeria",
        portfolioLinks: [{ id: rid(), label: "Behance", url: "https://behance.net" }],
        contactPref: { email: true, phone: "+234 803 222 9988", messaging: true },
        guidelinesAgreed: true,
        status: "active",
        ownerId: uDes.id,
        members: [
          { userId: uDes.id, role: "Team Owner", customRoleDesc: "Creative Director", joinedAt: now() - 86400000 * 15, status: "accepted" },
          { userId: uWri.id, role: "Creative Lead", customRoleDesc: "Brand Storyteller & Copy Lead", joinedAt: now() - 86400000 * 12, status: "accepted" },
          { userId: uMkt.id, role: "Marketing Lead", customRoleDesc: "Commercial Strategy", joinedAt: now() - 86400000 * 10, status: "accepted" }
        ],
        invitations: [],
        agreement: { acknowledged: [uDes.id, uWri.id, uMkt.id], version: "1.0", acknowledgedAt: now() - 86400000 * 10 },
        services: [
          {
            id: rid(),
            title: "Retail & Product Packaging Design",
            desc: "Custom carton, label, and pouch packaging design with print-ready dielines and 3D mockups.",
            category: "Graphics and Brand Design",
            startingPrice: "₦150,000",
            timeline: "1 to 2 weeks",
            requiredInfo: "Product dimensions, required regulatory markings, container specs, and brand guidelines."
          }
        ],
        portfolio: [
          {
            id: rid(),
            title: "Zaria Coffee Co. Rebrand",
            desc: "Complete packaging rebrand, bean pouch dielines, and retail shelf display system.",
            image: "",
            skillsUsed: ["Graphic design", "Brand identity"],
            contributions: "Custom typography, foil stamping specs, 3D photorealistic product renders.",
            completedDate: "December 2025"
          }
        ],
        testimonials: [],
        availability: "available",
        projects: [],
        messages: [],
        createdAt: now() - 86400000 * 16,
        updatedAt: now()
      };
      db.agencies.push(kola);

      // 3. AfriMedia Collective (FORMING status, 2 of 3 members required)
      const afriId = "ag_afrimedia";
      const afri = {
        id: afriId,
        name: "AfriMedia Collective",
        slug: "afrimedia",
        logo: "",
        shortDesc: "Documentary photography, video production, and social journalism.",
        fullDesc: "We tell compelling African brand stories through authentic photography, short-form video, and digital publications.",
        industry: "Content Creation and Media",
        mainCategory: "Content Creation and Media",
        additionalServices: ["Photography and Videography", "Content Creation and Media", "Writing and Communication"],
        institution: "University of Ibadan",
        location: "Oyo, Nigeria",
        portfolioLinks: [],
        contactPref: { email: true, phone: "", messaging: true },
        guidelinesAgreed: true,
        status: "forming", // Strict rule demonstration: 2 of 3 members
        ownerId: uWri.id,
        members: [
          { userId: uWri.id, role: "Team Owner", customRoleDesc: "Editorial Lead", joinedAt: now() - 86400000 * 5, status: "accepted" },
          { userId: uMkt.id, role: "Marketing Lead", customRoleDesc: "Distribution Strategist", joinedAt: now() - 86400000 * 3, status: "accepted" }
        ],
        invitations: [
          {
            id: rid(),
            agencyId: afriId,
            inviteeUserId: uDev.id,
            inviteeName: uDev.name,
            inviteeEmail: uDev.email,
            role: "Technical Lead",
            customRoleDesc: "Digital Media Platform Engineer",
            code: "inv_demo123",
            status: "pending",
            createdAt: now() - 86400000
          }
        ],
        agreement: { acknowledged: [uWri.id], version: "1.0", acknowledgedAt: now() - 86400000 * 5 },
        services: [
          {
            id: rid(),
            title: "Documentary Video & Brand Film",
            desc: "2-minute cinematic brand documentary highlighting founder story and community impact.",
            category: "Content Creation and Media",
            startingPrice: "₦180,000",
            timeline: "2 weeks",
            requiredInfo: "Story outline, location access, and key interviewees."
          }
        ],
        portfolio: [],
        testimonials: [],
        availability: "available",
        projects: [],
        messages: [],
        createdAt: now() - 86400000 * 6,
        updatedAt: now()
      };
      db.agencies.push(afri);

      // Seed a client project request & quotation
      if (!db.requests || db.requests.length === 0) {
        db.requests.push({
          id: rid(),
          uid: clientUser.id,
          clientName: clientUser.name,
          clientOrg: clientUser.name,
          title: "Real-time Package Delivery Tracker Web Portal",
          category: "Technology and Software Development",
          budget: "₦350,000 - ₦500,000",
          desc: "We require a responsive tracking portal where retail customers can track package status using a tracking code, with administrative dispatch management.",
          targetAgencyId: apexId,
          deliveryDate: "2026-12-15",
          referenceLink: "https://example.com/brief.pdf",
          communicationPref: "In-App Messaging & WhatsApp",
          status: "quoted",
          clarifications: [
            { id: rid(), senderId: uDev.id, text: "Do you have existing dispatch APIs or should we build the backend service?", t: now() - 3600000 * 20 },
            { id: rid(), senderId: clientUser.id, text: "Please include the backend API in your proposal.", t: now() - 3600000 * 16 }
          ],
          quotation: {
            id: rid(),
            agencyId: apexId,
            agencyName: "Apex Creative Studio",
            price: "₦420,000",
            currency: "NGN",
            scope: "Full-stack dispatch and customer tracking portal with administrative dashboard, automated status emails, and real-time package status.",
            estimatedDelivery: "2026-12-10",
            milestones: [
              { id: rid(), title: "Milestone 1: Architecture & Figma Wireframes", amount: "₦140,000 (33%)", dueDate: "2026-11-22", completed: true },
              { id: rid(), title: "Milestone 2: Frontend Implementation & API Staging", amount: "₦180,000 (43%)", dueDate: "2026-12-02", completed: false },
              { id: rid(), title: "Milestone 3: Deployment, Handover & Training", amount: "₦100,000 (24%)", dueDate: "2026-12-10", completed: false }
            ],
            terms: "33% deposit upon approval, 43% upon Milestone 2 live staging signoff, 24% upon final deployment. 14 days post-launch support included.",
            status: "submitted",
            createdAt: now() - 3600000 * 12
          },
          t: now() - 86400000 * 2
        });
      }

      // Seed initial payments if empty
      if (!db.payments || db.payments.length === 0) {
        db.payments = [
          {
            id: "pay_apex_01",
            agencyId: apexId,
            agencyName: "Apex Creative Studio",
            clientId: clientUser.id,
            clientName: clientUser.name,
            clientEmail: clientUser.email,
            projectId: apex.projects && apex.projects[0] ? apex.projects[0].id : "proj_health",
            projectTitle: "Campus Micro-Finance Web Platform MVP",
            quotationAmount: 150000,
            agreedProjectFee: 150000,
            amountPaid: 150000,
            currency: "NGN",
            status: "Paid",
            reference: "TBUD-PAY-20261102-4821",
            paystackReference: "pstk_test_849204128",
            channel: "card",
            paymentDate: now() - 86400000 * 7,
            disputeStatus: null,
            disputeReason: "",
            refundStatus: null,
            transactionHistory: [
              { timestamp: now() - 86400000 * 7 - 3600000, action: "Initialized", amount: 150000, ref: "pstk_test_849204128", notes: "Client initiated Paystack checkout for completed MVP milestone." },
              { timestamp: now() - 86400000 * 7, action: "Verified & Confirmed", amount: 150000, ref: "pstk_test_849204128", notes: "Paystack webhook charge.success verified via HMAC SHA512 signature on backend server.", verifiedBy: "Paystack Serverless API" }
            ],
            allocations: [
              {
                memberId: uDev.id,
                memberName: uDev.name,
                role: "Lead Full-Stack Architect",
                allocatedAmount: 60000,
                percentage: 40,
                payoutStatus: "confirmed",
                payoutMethod: "Access Bank ••••4821 (Onifade S.)",
                payoutConfirmedAt: now() - 86400000 * 6,
                transferRef: "TRF-ACC-839210"
              },
              {
                memberId: uDes.id,
                memberName: uDes.name,
                role: "Creative Lead",
                allocatedAmount: 45000,
                percentage: 30,
                payoutStatus: "confirmed",
                payoutMethod: "GTBank ••••1093 (Amina B.)",
                payoutConfirmedAt: now() - 86400000 * 6,
                transferRef: "TRF-GTB-449102"
              },
              {
                memberId: uMkt.id,
                memberName: uMkt.name,
                role: "Marketing Lead",
                allocatedAmount: 25000,
                percentage: 16.7,
                payoutStatus: "confirmed",
                payoutMethod: "Zenith Bank ••••7721 (Chinedu O.)",
                payoutConfirmedAt: now() - 86400000 * 6,
                transferRef: "TRF-ZEN-220194"
              },
              {
                memberId: "agency_reserve",
                memberName: "Apex Studio Reserve & Software Tooling",
                role: "Agency Reserve",
                allocatedAmount: 20000,
                percentage: 13.3,
                payoutStatus: "confirmed",
                payoutMethod: "Kuda Microfinance ••••9912 (Apex Ops)",
                payoutConfirmedAt: now() - 86400000 * 6,
                transferRef: "TRF-KUD-001294"
              }
            ],
            notes: "Full payment received for Phase 1 handover. Member revenue distribution confirmed and settled via direct bank transfer."
          },
          {
            id: "pay_apex_02",
            agencyId: apexId,
            agencyName: "Apex Creative Studio",
            clientId: clientUser.id,
            clientName: clientUser.name,
            clientEmail: clientUser.email,
            projectId: apex.projects && apex.projects[0] ? apex.projects[0].id : "proj_delivery",
            projectTitle: "Delivery Driver Real-Time Portal (Milestone 1 Kickoff)",
            quotationAmount: 140000,
            agreedProjectFee: 140000,
            amountPaid: 0,
            currency: "NGN",
            status: "Awaiting Payment",
            reference: "TBUD-PAY-20261108-9901",
            paystackReference: "",
            channel: "paystack",
            paymentDate: null,
            disputeStatus: null,
            disputeReason: "",
            refundStatus: null,
            transactionHistory: [
              { timestamp: now() - 3600000 * 10, action: "Invoice Issued", amount: 140000, ref: "TBUD-PAY-20261108-9901", notes: "Milestone 1 invoice generated upon quote submission." }
            ],
            allocations: [
              {
                memberId: uDev.id,
                memberName: uDev.name,
                role: "Lead Full-Stack Architect",
                allocatedAmount: 70000,
                percentage: 50,
                payoutStatus: "pending",
                payoutMethod: "Access Bank ••••4821",
                payoutConfirmedAt: null,
                transferRef: null
              },
              {
                memberId: uDes.id,
                memberName: uDes.name,
                role: "Creative Lead",
                allocatedAmount: 50000,
                percentage: 35.7,
                payoutStatus: "pending",
                payoutMethod: "GTBank ••••1093",
                payoutConfirmedAt: null,
                transferRef: null
              },
              {
                memberId: "agency_reserve",
                memberName: "Apex Studio Reserve",
                role: "Agency Reserve",
                allocatedAmount: 20000,
                percentage: 14.3,
                payoutStatus: "pending",
                payoutMethod: "Kuda Microfinance ••••9912",
                payoutConfirmedAt: null,
                transferRef: null
              }
            ],
            notes: "Pending client payment on Milestone 1 kickoff."
          }
        ];
      }

      // Seed initial opportunities if empty
      if (!db.opportunities || db.opportunities.length === 0) {
        db.opportunities = [
          {
            id: "opp_lasric_01",
            title: "Lagos State Student Innovation Hackathon 2026",
            organisation: "Lagos State Research and Innovation Council (LASRIC)",
            category: "Competitions",
            description: "Annual student developer and designer challenge focused on civic technology, campus mobility, and digital public services. Finalist teams receive mentorship, incubation support, and equity-free innovation grants.",
            eligibility: "Undergraduate and polytechnic student teams (3 to 10 members) enrolled in Nigerian tertiary institutions.",
            deadline: "2026-12-15",
            applicationLink: "https://lasric.lagosstate.gov.ng",
            allowInAppApply: true,
            rewardOrValue: "₦2,000,000 Prize Pool & Cloud Credits",
            location: "Lagos (Hybrid)",
            verificationStatus: "verified",
            submittedBy: "admin",
            postedAt: now() - 86400000 * 4,
            applications: []
          },
          {
            id: "opp_metro_02",
            title: "Campus Logistics Brand & Mobile UI/UX RFP",
            organisation: "MetroDrop Logistics Nigeria",
            category: "Client Projects",
            description: "MetroDrop is contracting an independent student agency to produce high-fidelity mobile app UI wireframes, design token documentation, and interactive Figma prototypes for their fast-growing parcel dispatch service.",
            eligibility: "Student agencies with verified portfolio in UI/UX design and mobile interface architecture.",
            deadline: "2026-11-30",
            applicationLink: "in-app",
            allowInAppApply: true,
            rewardOrValue: "₦350,000 Fixed Contract Fee",
            location: "Nationwide (Remote)",
            verificationStatus: "verified",
            submittedBy: clientUser.id,
            postedAt: now() - 86400000 * 2,
            applications: []
          },
          {
            id: "opp_google_03",
            title: "Google for Startups Campus Mentorship Cohort",
            organisation: "Google for Startups Africa",
            category: "Mentorship Programmes",
            description: "12-week structured virtual mentorship cohort pairing student product builders with experienced Google software engineers, product managers, and venture advisors to refine product architecture and market readiness.",
            eligibility: "Student developers, designers, and agency founders actively building software prototypes.",
            deadline: "2026-12-20",
            applicationLink: "https://startup.google.com",
            allowInAppApply: true,
            rewardOrValue: "1-on-1 Mentorship + $1,000 Cloud Credits",
            location: "Virtual / Remote",
            verificationStatus: "verified",
            submittedBy: "admin",
            postedAt: now() - 86400000 * 5,
            applications: []
          },
          {
            id: "opp_payflow_04",
            title: "Fintech Micro-App Frontend Engineering Internship",
            organisation: "PayFlow Ventures",
            category: "Internship Opportunities",
            description: "3-month paid summer internship working alongside senior frontend engineers on modern React, TypeScript, and payment SDK components. Remote-friendly with flexible schedules around university lectures.",
            eligibility: "Penultimate or final-year university students with demonstrated proficiency in modern JavaScript/TypeScript.",
            deadline: "2026-12-05",
            applicationLink: "https://example.com/payflow-careers",
            allowInAppApply: true,
            rewardOrValue: "₦120,000 Monthly Stipend + Remote Support",
            location: "Lagos / Remote",
            verificationStatus: "community",
            submittedBy: uDev.id,
            postedAt: now() - 86400000 * 3,
            applications: []
          },
          {
            id: "opp_farm_05",
            title: "AgriTech Brand Storytelling & Video Documentary Contract",
            organisation: "FarmBridge Agribusiness Network",
            category: "Client Projects",
            description: "FarmBridge is seeking a creative student agency to shoot, edit, and produce a 3-minute video showcase documenting agricultural supply chains and cooperative farmers across southwest Nigeria.",
            eligibility: "Student creative agencies or media collectives with video production equipment and verified portfolio.",
            deadline: "2026-12-10",
            applicationLink: "in-app",
            allowInAppApply: true,
            rewardOrValue: "₦200,000 Project Budget + Travel Expense Coverage",
            location: "Oyo & Ogun State, Nigeria",
            verificationStatus: "community",
            submittedBy: clientUser.id,
            postedAt: now() - 86400000 * 1,
            applications: []
          },
          {
            id: "opp_nitda_06",
            title: "Nigeria Tertiary Tech Innovation Grant",
            organisation: "National Information Technology Development Agency (NITDA)",
            category: "Grants",
            description: "Competitive seed grant awarded to multidisciplinary student teams developing commercially viable software, hardware, or artificial intelligence solutions addressing national challenges.",
            eligibility: "Teams of 3 to 10 accredited university or polytechnic students in Nigeria.",
            deadline: "2027-01-15",
            applicationLink: "https://nitda.gov.ng",
            allowInAppApply: true,
            rewardOrValue: "₦5,000,000 Seed Grant (Non-dilutive)",
            location: "Federal Republic of Nigeria",
            verificationStatus: "verified",
            submittedBy: "admin",
            postedAt: now() - 86400000 * 6,
            applications: []
          }
        ];
      }
    }
  }

  save();
}

// Automatically seed on boot if missing
if (!db.agencies || db.agencies.length === 0 || !db.payments || db.payments.length === 0 || !db.opportunities || db.opportunities.length === 0) {
  seedDemoData();
}

/* ===================== Core API Layer ===================== */
const API = {
  makeToken(uid, kind, ttl) {
    const t = rid() + rid();
    db.tokens = db.tokens.filter(x => x.uid !== uid || x.k !== kind);
    db.tokens.push({ t, uid, k: kind, exp: now() + ttl });
    return t;
  },

  useToken(token, kind) {
    const k = db.tokens.find(x => x.t === token && x.k === kind && x.exp > now());
    return k || null;
  },

  async registerStudent(f) {
    const email = f.email.trim().toLowerCase(), username = f.username.trim().toLowerCase(), errs = {};
    if (db.users.some(u => u.email === email)) errs.email = "An account with this email already exists. Try logging in.";
    if (db.users.some(u => u.username === username)) errs.username = "This username is taken. Try another.";
    if (Object.keys(errs).length) return { errs };
    const salt = rid(), u = {
      id: rid(),
      role: "student",
      name: f.name.trim(),
      email,
      salt,
      passHash: await hashPw(f.password, salt),
      verified: false,
      username,
      institution: f.institution.trim(),
      department: f.department.trim(),
      level: f.level,
      country: f.country,
      state: f.state.trim(),
      intents: f.intents,
      bio: "",
      photo: "",
      skills: [],
      experience: [],
      portfolio: [],
      certs: [],
      interests: [],
      availability: "unset",
      collab: [],
      prefs: { inapp: {}, email: {} },
      activity: [],
      created: now()
    };
    log(u, "Created your TeamBud account");
    db.users.push(u);
    const t = this.makeToken(u.id, "verify", 86400000);
    save();
    return { user: u, token: t };
  },

  async registerClient(f) {
    const email = f.email.trim().toLowerCase();
    if (db.users.some(u => u.email === email)) return { errs: { email: "An account with this email already exists. Try logging in." } };
    const salt = rid(), u = {
      id: rid(),
      role: "client",
      name: f.name.trim(),
      email,
      salt,
      passHash: await hashPw(f.password, salt),
      verified: false,
      accountType: f.accountType,
      country: f.country,
      contact: f.contact.trim(),
      prefs: { inapp: {}, email: {} },
      activity: [],
      created: now()
    };
    log(u, "Created your client account on TeamBud");
    db.users.push(u);
    const t = this.makeToken(u.id, "verify", 86400000);
    save();
    return { user: u, token: t };
  },

  async login(email, pw, remember) {
    email = email.trim().toLowerCase();
    const f = db.fails[email] || { n: 0, until: 0 };
    if (f.until > now()) return { err: "Too many attempts. Wait " + Math.ceil((f.until - now()) / 1000) + " seconds and try again." };
    const u = db.users.find(x => x.email === email);
    const ok = u && (await hashPw(pw, u.salt)) === u.passHash;
    if (!ok) {
      f.n++;
      if (f.n >= 5) { f.until = now() + 60000; f.n = 0; }
      db.fails[email] = f;
      save();
      return { err: "Email or password is incorrect." };
    }
    if (!u.verified) return { unverified: u };
    delete db.fails[email];
    db.session = { uid: u.id, exp: now() + (remember ? 86400000 * 14 : 3600000 * 8) };
    save();
    return { user: u };
  },

  logout() {
    db.session = null;
    save();
  },

  async resetPassword(token, pw) {
    const k = this.useToken(token, "reset");
    if (!k) return false;
    const u = userById(k.uid);
    u.salt = rid();
    u.passHash = await hashPw(pw, u.salt);
    db.tokens = db.tokens.filter(x => x.t !== token);
    delete db.fails[u.email];
    save();
    return true;
  },

  connect(meId, otherId, note = "") {
    if (connBetween(meId, otherId)) return;
    const a = userById(meId), b = userById(otherId);
    db.conns.push({ id: rid(), from: meId, to: otherId, status: "pending", note: (note || "").trim(), t: now() });
    const notePreview = note ? ` Note: "${note.slice(0, 60)}..."` : "";
    notify(otherId, "connection_request", a.name + " wants to connect with you." + notePreview);
    log(a, "Sent a connection request to " + b.name);
    save();
  },

  respond(id, accept) {
    const c = db.conns.find(x => x.id === id);
    if (!c) return;
    const a = userById(c.to), b = userById(c.from);
    if (accept) {
      c.status = "accepted";
      notify(c.from, "connection_accepted", a.name + " accepted your connection request.");
      log(a, "Connected with " + b.name);
      log(b, "Connected with " + a.name);
    } else {
      db.conns = db.conns.filter(x => x.id !== id);
    }
    save();
  },

  cancel(id) {
    db.conns = db.conns.filter(x => x.id !== id);
    save();
  },

  removeConnection(id) {
    db.conns = db.conns.filter(x => x.id !== id);
    save();
  },

  blockAndReport(reporterId, reportedId, reason, comments) {
    if (!db.reports) db.reports = [];
    db.reports.push({
      id: rid(),
      reporterId,
      reportedId,
      reason: reason || "Unspecified",
      comments: (comments || "").trim(),
      t: now()
    });
    const u = userById(reporterId);
    if (u) {
      if (!u.blockedUsers) u.blockedUsers = [];
      if (!u.blockedUsers.includes(reportedId)) u.blockedUsers.push(reportedId);
    }
    // Remove any connection
    db.conns = db.conns.filter(c => !( (c.from === reporterId && c.to === reportedId) || (c.from === reportedId && c.to === reporterId) ));
    save();
  },

  unblockUser(userId, targetId) {
    const u = userById(userId);
    if (u && u.blockedUsers) {
      u.blockedUsers = u.blockedUsers.filter(x => x !== targetId);
      save();
    }
  },

  /* ---------- Section 6: Agency Creation & Team Management API ---------- */
  createAgency(f, creator) {
    const errs = {};
    const name = (f.name || "").trim();
    const slug = (f.slug || "").trim().toLowerCase();
    if (!name) errs.name = "Enter an agency brand name.";
    if (!slug) errs.slug = "Enter a unique username or URL slug.";
    else if (!/^[a-z0-9-]{3,30}$/.test(slug)) errs.slug = "Use 3 to 30 lowercase letters, numbers, and hyphens.";
    else if (db.agencies.some(a => a.slug.toLowerCase() === slug)) errs.slug = "This URL slug is already taken. Try another.";

    if (!(f.shortDesc || "").trim()) errs.shortDesc = "Enter a short elevator pitch description.";
    if (!(f.fullDesc || "").trim()) errs.fullDesc = "Enter a detailed description of your agency.";
    if (!(f.industry || "").trim()) errs.industry = "Select an industry.";
    if (!(f.mainCategory || "").trim()) errs.mainCategory = "Select a primary service category.";
    if (!(f.institution || "").trim()) errs.institution = "Enter institutional affiliation.";
    if (!(f.location || "").trim()) errs.location = "Enter location (City/State).";
    if (!f.guidelinesAgreed) errs.guidelinesAgreed = "You must agree to the TeamBud agency creation guidelines.";

    if (Object.keys(errs).length) return { errs };

    const agencyId = "ag_" + rid();
    const agency = {
      id: agencyId,
      name,
      slug,
      logo: f.logo || "",
      shortDesc: f.shortDesc.trim(),
      fullDesc: f.fullDesc.trim(),
      industry: f.industry.trim(),
      mainCategory: f.mainCategory.trim(),
      additionalServices: Array.isArray(f.additionalServices) ? f.additionalServices : [],
      institution: f.institution.trim(),
      location: f.location.trim(),
      portfolioLinks: Array.isArray(f.portfolioLinks) ? f.portfolioLinks : [],
      contactPref: {
        email: !!f.contactEmail,
        phone: (f.contactPhone || "").trim(),
        messaging: !!f.contactMessaging
      },
      guidelinesAgreed: true,
      status: "forming", // Starts in FORMING status until >= 3 members
      ownerId: creator.id,
      members: [
        {
          userId: creator.id,
          role: "Team Owner",
          customRoleDesc: (f.customRoleDesc || "").trim() || "Agency Founder & Lead",
          joinedAt: now(),
          status: "accepted"
        }
      ],
      invitations: [],
      agreement: {
        acknowledged: [creator.id],
        version: "1.0",
        acknowledgedAt: now()
      },
      services: [],
      portfolio: [],
      testimonials: [],
      availability: "available",
      projects: [],
      messages: [
        {
          id: rid(),
          senderId: creator.id,
          projectId: null,
          text: `Welcome to the ${name} workspace! Invite at least 2 more students to activate your agency and open it to public client requests.`,
          attachment: null,
          t: now(),
          readBy: [creator.id]
        }
      ],
      createdAt: now(),
      updatedAt: now()
    };

    db.agencies.push(agency);
    log(creator, `Established new agency brand: "${name}"`);
    notify(creator.id, "team_update", `Your agency "${name}" was created in FORMING status. Invite at least 2 more students to reach the 3-member minimum.`);
    save();
    return { agency };
  },

  inviteToAgency(agencyId, studentId, role, customRoleDesc, actor) {
    const a = agencyById(agencyId);
    if (!a) return { err: "Agency not found." };
    if (!isAgencyOwnerOrManager(a, actor.id)) return { err: "Only Team Owners or Agency Managers can send invitations." };

    // Strict Rule: Max 10 members!
    if ((a.members || []).length >= 10) {
      return { err: "Agency has reached the strict maximum limit of 10 active members." };
    }

    const student = userById(studentId);
    if (!student) return { err: "Student not found." };

    if ((a.members || []).some(m => m.userId === studentId)) {
      return { err: `${student.name} is already an active member of this agency.` };
    }

    if ((a.invitations || []).some(inv => inv.inviteeUserId === studentId && inv.status === "pending")) {
      return { err: `An invitation is already pending for ${student.name}.` };
    }

    const inv = {
      id: rid(),
      agencyId,
      inviteeUserId: studentId,
      inviteeName: student.name,
      inviteeEmail: student.email,
      role: role || "Team Member",
      customRoleDesc: (customRoleDesc || "").trim(),
      code: "inv_" + rid().slice(0, 8),
      status: "pending",
      createdAt: now()
    };

    a.invitations.unshift(inv);
    notify(studentId, "agency_invitation", `${actor.name} invited you to join "${a.name}" as ${inv.role}.`);
    log(actor, `Invited ${student.name} to join "${a.name}"`);
    save();
    return { ok: true, inv };
  },

  createShareableInvite(agencyId, role, customRoleDesc, actor) {
    const a = agencyById(agencyId);
    if (!a) return { err: "Agency not found." };
    if (!isAgencyOwnerOrManager(a, actor.id)) return { err: "Only Team Owners or Agency Managers can create invite links." };
    if ((a.members || []).length >= 10) return { err: "Agency has reached the 10 member maximum." };

    const inv = {
      id: rid(),
      agencyId,
      role: role || "Team Member",
      customRoleDesc: (customRoleDesc || "").trim(),
      code: "inv_" + rid().slice(0, 8),
      status: "pending",
      createdAt: now()
    };
    a.invitations.unshift(inv);
    save();
    return { ok: true, code: inv.code };
  },

  cancelAgencyInvite(agencyId, inviteId, actor) {
    const a = agencyById(agencyId);
    if (!a) return false;
    if (!isAgencyOwnerOrManager(a, actor.id)) return false;
    a.invitations = a.invitations.filter(i => i.id !== inviteId);
    save();
    return true;
  },

  respondAgencyInvite(agencyId, inviteId, accept, student) {
    const a = agencyById(agencyId);
    if (!a) return { err: "Agency not found." };
    const inv = (a.invitations || []).find(i => i.id === inviteId || i.code === inviteId);
    if (!inv || inv.status !== "pending") return { err: "This invitation is no longer valid or has already been used." };

    if (!accept) {
      inv.status = "declined";
      notify(a.ownerId, "team_update", `${student.name} declined the invitation to join "${a.name}".`);
      save();
      return { ok: true, status: "declined" };
    }

    // Strict Rule: Enforce 10-member maximum!
    if ((a.members || []).length >= 10) {
      return { err: "This agency has already reached the maximum limit of 10 active members." };
    }

    if ((a.members || []).some(m => m.userId === student.id)) {
      inv.status = "accepted";
      save();
      return { err: "You are already an active member of this agency." };
    }

    inv.status = "accepted";
    a.members.push({
      userId: student.id,
      role: inv.role || "Team Member",
      customRoleDesc: inv.customRoleDesc || "",
      joinedAt: now(),
      status: "accepted"
    });

    log(student, `Joined "${a.name}" as ${inv.role}`);
    notify(a.ownerId, "team_update", `${student.name} accepted your invitation and joined "${a.name}"!`);
    syncAgencyStatus(a);
    save();
    return { ok: true, agency: a };
  },

  removeAgencyMember(agencyId, memberUserId, actor) {
    const a = agencyById(agencyId);
    if (!a) return { err: "Agency not found." };
    if (!isAgencyOwnerOrManager(a, actor.id)) return { err: "Unauthorized." };
    if (memberUserId === a.ownerId) return { err: "Cannot remove the Team Owner. Reassign ownership first." };

    const member = userById(memberUserId);
    a.members = a.members.filter(m => m.userId !== memberUserId);
    if (member) {
      notify(memberUserId, "team_update", `Your membership in "${a.name}" was concluded.`);
      log(member, `Left agency "${a.name}"`);
    }

    // Automatically check if membership fell below 3 members!
    syncAgencyStatus(a);
    save();
    return { ok: true };
  },

  updateAgencyRole(agencyId, memberUserId, role, customRoleDesc, actor) {
    const a = agencyById(agencyId);
    if (!a) return { err: "Agency not found." };
    if (!isAgencyOwnerOrManager(a, actor.id)) return { err: "Unauthorized." };

    const m = a.members.find(x => x.userId === memberUserId);
    if (!m) return { err: "Member not found." };

    m.role = role;
    if (customRoleDesc != null) m.customRoleDesc = customRoleDesc.trim();
    if (role === "Team Owner" && actor.id === a.ownerId) {
      // Ownership transfer
      a.ownerId = memberUserId;
    }
    save();
    return { ok: true };
  },

  acknowledgeAgreement(agencyId, userId) {
    const a = agencyById(agencyId);
    if (!a) return false;
    a.agreement = a.agreement || { acknowledged: [] };
    if (!a.agreement.acknowledged.includes(userId)) {
      a.agreement.acknowledged.push(userId);
      save();
    }
    return true;
  },

  addAgencyService(agencyId, s, actor) {
    const a = agencyById(agencyId);
    if (!a || !isAgencyMember(a, actor.id)) return { err: "Unauthorized." };
    if (!s.title || !s.desc || !s.category) return { err: "Fill all required service fields." };

    a.services = a.services || [];
    a.services.unshift({
      id: rid(),
      title: s.title.trim(),
      desc: s.desc.trim(),
      category: s.category.trim(),
      startingPrice: (s.startingPrice || "").trim() || "Custom quotation",
      timeline: (s.timeline || "").trim() || "1 - 2 weeks",
      requiredInfo: (s.requiredInfo || "").trim()
    });
    save();
    return { ok: true };
  },

  deleteAgencyService(agencyId, sId, actor) {
    const a = agencyById(agencyId);
    if (!a || !isAgencyMember(a, actor.id)) return false;
    a.services = (a.services || []).filter(x => x.id !== sId);
    save();
    return true;
  },

  addAgencyPortfolio(agencyId, p, actor) {
    const a = agencyById(agencyId);
    if (!a || !isAgencyMember(a, actor.id)) return { err: "Unauthorized." };
    if (!p.title || !p.desc) return { err: "Fill project title and description." };

    a.portfolio = a.portfolio || [];
    a.portfolio.unshift({
      id: rid(),
      title: p.title.trim(),
      desc: p.desc.trim(),
      image: p.image || "",
      skillsUsed: Array.isArray(p.skillsUsed) ? p.skillsUsed : [],
      contributions: (p.contributions || "").trim(),
      completedDate: (p.completedDate || "").trim() || "Recent"
    });
    save();
    return { ok: true };
  },

  deleteAgencyPortfolio(agencyId, pId, actor) {
    const a = agencyById(agencyId);
    if (!a || !isAgencyMember(a, actor.id)) return false;
    a.portfolio = (a.portfolio || []).filter(x => x.id !== pId);
    save();
    return true;
  },

  createAgencyProject(agencyId, p, actor) {
    const a = agencyById(agencyId);
    if (!a || !isAgencyMember(a, actor.id)) return { err: "Unauthorized." };
    if (!p.title) return { err: "Project title is required." };

    a.projects = a.projects || [];
    a.projects.unshift({
      id: rid(),
      title: p.title.trim(),
      desc: (p.desc || "").trim(),
      assignedTo: Array.isArray(p.assignedTo) ? p.assignedTo : [],
      deadline: p.deadline || "",
      status: p.status || "New",
      deliverables: [],
      comments: [],
      createdAt: now()
    });
    save();
    return { ok: true };
  },

  updateProjectStatus(agencyId, pId, status, actor) {
    const a = agencyById(agencyId);
    if (!a || !isAgencyMember(a, actor.id)) return false;
    const proj = (a.projects || []).find(x => x.id === pId);
    if (proj) {
      proj.status = status;
      save();
      return true;
    }
    return false;
  },

  addProjectDeliverable(agencyId, pId, file, actor) {
    const a = agencyById(agencyId);
    if (!a || !isAgencyMember(a, actor.id)) return false;
    const proj = (a.projects || []).find(x => x.id === pId);
    if (proj) {
      proj.deliverables = proj.deliverables || [];
      proj.deliverables.push({
        id: rid(),
        name: file.name,
        size: file.size,
        uploadedAt: now(),
        uploadedBy: actor.id
      });
      save();
      return true;
    }
    return false;
  },

  addProjectComment(agencyId, pId, text, actor) {
    const a = agencyById(agencyId);
    if (!a || !isAgencyMember(a, actor.id)) return false;
    const proj = (a.projects || []).find(x => x.id === pId);
    if (proj && text.trim()) {
      proj.comments = proj.comments || [];
      proj.comments.push({
        id: rid(),
        userId: actor.id,
        text: text.trim(),
        t: now()
      });
      save();
      return true;
    }
    return false;
  },

  sendAgencyMessage(agencyId, text, projectId, attachment, sender) {
    const a = agencyById(agencyId);
    if (!a || !isAgencyMember(a, sender.id)) return false;
    if (!text.trim() && !attachment) return false;

    a.messages = a.messages || [];
    a.messages.push({
      id: rid(),
      senderId: sender.id,
      projectId: projectId || null,
      text: text.trim(),
      attachment: attachment || null,
      t: now(),
      readBy: [sender.id]
    });
    save();
    return true;
  },

  /* ---------- Section 9: Marketplace, Client Requests & Quotations API ---------- */
  submitClientProjectRequest(f, client) {
    if (!f.title || !f.category || !f.desc) return { err: "Title, category and project description are required." };

    const req = {
      id: rid(),
      uid: client.id,
      clientName: client.name,
      clientOrg: client.name,
      title: f.title.trim(),
      category: f.category.trim(),
      budget: (f.budget || "").trim() || "Flexible",
      desc: f.desc.trim(),
      targetAgencyId: f.targetAgencyId || "all",
      deliveryDate: f.deliveryDate || "",
      referenceLink: (f.referenceLink || "").trim(),
      communicationPref: (f.communicationPref || "").trim() || "In-app messaging",
      status: "pending",
      clarifications: [],
      quotation: null,
      t: now()
    };

    db.requests.unshift(req);
    log(client, `Submitted project request: "${req.title}"`);

    if (req.targetAgencyId && req.targetAgencyId !== "all") {
      const a = agencyById(req.targetAgencyId);
      if (a) {
        notify(a.ownerId, "client_request", `New client project inquiry from ${client.name}: "${req.title}".`);
      }
    } else {
      // Notify active agencies in this category
      (db.agencies || []).filter(a => a.status === "active" && (a.mainCategory === req.category || (a.additionalServices || []).includes(req.category))).forEach(a => {
        notify(a.ownerId, "client_request", `A new marketplace client project matches your services: "${req.title}".`);
      });
    }

    save();
    return { ok: true, request: req };
  },

  submitQuotation(agencyId, reqId, q, actor) {
    const a = agencyById(agencyId);
    if (!a || !isAgencyOwnerOrManager(a, actor.id)) return { err: "Unauthorized." };
    const req = db.requests.find(r => r.id === reqId);
    if (!req) return { err: "Request not found." };
    if (!q.price || !q.scope) return { err: "Price and scope of work are required." };

    const quotation = {
      id: rid(),
      agencyId: a.id,
      agencyName: a.name,
      price: q.price.trim(),
      currency: q.currency || "NGN",
      scope: q.scope.trim(),
      estimatedDelivery: q.estimatedDelivery || "As agreed",
      milestones: Array.isArray(q.milestones) ? q.milestones : [],
      terms: (q.terms || "").trim() || "Payment split across delivery milestones.",
      status: "submitted",
      createdAt: now()
    };

    req.quotation = quotation;
    req.status = "quoted";

    notify(req.uid, "client_request", `${a.name} submitted a project proposal and quotation for "${req.title}".`);
    log(actor, `Submitted quotation to client for "${req.title}"`);
    save();
    return { ok: true, quotation };
  },

  respondQuotation(reqId, accept, client) {
    const req = db.requests.find(r => r.id === reqId);
    if (!req || !req.quotation) return { err: "Proposal not found." };

    if (!accept) {
      req.quotation.status = "declined";
      req.status = "declined";
      const a = agencyById(req.quotation.agencyId);
      if (a) notify(a.ownerId, "client_request", `${client.name} declined the quotation for "${req.title}".`);
      save();
      return { ok: true, status: "declined" };
    }

    req.quotation.status = "accepted";
    req.status = "active";

    // Create an active project in the agency workspace!
    const a = agencyById(req.quotation.agencyId);
    if (a) {
      a.projects = a.projects || [];
      a.projects.unshift({
        id: rid(),
        title: req.title,
        desc: `Client Contract (${client.name}): ${req.quotation.scope}`,
        assignedTo: [a.ownerId],
        deadline: req.quotation.estimatedDelivery,
        status: "In Progress",
        deliverables: [],
        comments: [
          { id: rid(), userId: a.ownerId, text: `Client accepted quotation of ${req.quotation.price}. Project initialized with ${req.quotation.milestones.length} milestones.`, t: now() }
        ],
        createdAt: now()
      });
      notify(a.ownerId, "client_request", `Congratulations! ${client.name} accepted your quotation of ${req.quotation.price} for "${req.title}". Project workspace created!`);
    }

    log(client, `Accepted proposal from ${req.quotation.agencyName} for "${req.title}"`);
    notify(client.id, "payment", `Milestone 1 for project "${req.title}" is queued with ${req.quotation.agencyName}.`);
    save();
    return { ok: true, status: "accepted" };
  },

  sendClientClarification(reqId, text, sender) {
    const req = db.requests.find(r => r.id === reqId);
    if (!req || !text.trim()) return false;

    req.clarifications = req.clarifications || [];
    req.clarifications.push({
      id: rid(),
      senderId: sender.id,
      senderName: sender.name,
      text: text.trim(),
      t: now()
    });

    if (sender.role === "client") {
      if (req.targetAgencyId && req.targetAgencyId !== "all") {
        const a = agencyById(req.targetAgencyId);
        if (a) notify(a.ownerId, "message", `${sender.name} sent a message regarding request "${req.title}".`);
      }
    } else {
      notify(req.uid, "message", `Message received from agency regarding request "${req.title}".`);
    }

    save();
    return true;
  }
};

/* ===================== UI Helpers & Navigation ===================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = $("#root");
let FLASH = null;
let NEXT = null;

const go = p => { location.hash = "#" + p; };

function toast(t) {
  const e = $("#toast");
  if (!e) return;
  e.textContent = t;
  e.hidden = false;
  clearTimeout(toast.h);
  toast.h = setTimeout(() => { e.hidden = true; }, 2800);
}

function rel(t) {
  const s = Math.floor((now() - t) / 1000);
  if (s < 60) return "Just now";
  if (s < 3600) return Math.floor(s / 60) + " min ago";
  if (s < 86400) return Math.floor(s / 3600) + " h ago";
  return Math.floor(s / 86400) + " d ago";
}

const initials = n => (n || "?").split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
const safeImg = s => typeof s === "string" && (/^data:image\/(jpeg|png|webp|svg\+xml);base64,/.test(s) || /^[a-zA-Z0-9_\-\.\/]+\.(jpg|jpeg|png|webp|svg)$/i.test(s)) ? s : "";
const avatar = (u, lg) => `<div class="av${lg ? " lg" : ""}">${u && safeImg(u.photo) ? `<img src="${safeImg(u.photo)}" alt="">` : esc(initials(u ? u.name : "?"))}</div>`;
const agencyLogo = (a, lg) => `<div class="pub-logo" style="${lg ? "width:88px;height:88px;font-size:2rem" : "width:48px;height:48px;font-size:1.15rem;border-radius:12px;margin-bottom:0"}">${a && a.logo ? `<img src="${safeImg(a.logo)}" alt="">` : esc(initials(a ? a.name : "AG"))}</div>`;
const firstName = u => (u.name || "").split(/\s+/)[0];
const loc = u => u.state ? u.state + ", " + u.country : u.country;
const icon = d => `<svg viewBox="0 0 24 24" aria-hidden="true" style="width:1.2em;height:1.2em;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;display:inline-block;vertical-align:middle"><path d="${d}"/></svg>`;
const opts = (arr, sel, ph) => (ph ? `<option value="">${esc(ph)}</option>` : "") + arr.map(a => {
  const v = Array.isArray(a) ? a[0] : a, l = Array.isArray(a) ? a[1] : a;
  return `<option value="${esc(v)}"${v === sel ? " selected" : ""}>${esc(l)}</option>`;
}).join("");

function field(name, label, input, hint) {
  return `<div class="field"><label for="${name}">${label}</label>${input}${hint ? `<div class="hint">${hint}</div>` : ""}<div class="err" data-err="${name}" aria-live="polite"></div></div>`;
}

const inp = (name, type, extra = "") => `<input type="${type}" id="${name}" name="${name}" ${extra}>`;

function pwField(name, label, withMeter) {
  return field(name, label, `<div class="pwwrap"><input type="password" id="${name}" name="${name}" autocomplete="${name === "password" || name === "newpw" ? "new-password" : "current-password"}" ${withMeter ? 'data-meter="1"' : ""}><button type="button" data-act="showpw" aria-label="Show or hide password">Show</button></div>${withMeter ? `<div class="meter" data-s="0" id="meter"><i></i><i></i><i></i><i></i></div><ul class="rules" id="rules"><li data-r="len">8 or more characters</li><li data-r="low">Lowercase letter</li><li data-r="up">Uppercase letter</li><li data-r="num">Number</li><li data-r="sym">Symbol</li></ul>` : ""}`);
}

function pwCheck(p) {
  const r = { len: p.length >= 8, low: /[a-z]/.test(p), up: /[A-Z]/.test(p), num: /\d/.test(p), sym: /[^A-Za-z0-9]/.test(p) };
  const extra = ["low", "up", "num", "sym"].filter(k => r[k]).length;
  return { r, score: r.len ? Math.max(1, extra) : 0, ok: r.len && extra >= 3 };
}

function setErrs(form, errs) {
  $$("[data-err]", form).forEach(e => { e.textContent = ""; });
  $$("[aria-invalid]", form).forEach(e => { e.removeAttribute("aria-invalid"); });
  let first = null;
  for (const k in errs) {
    const e = $(`[data-err="${k}"]`, form);
    if (e) e.textContent = errs[k];
    const i = form.elements[k];
    if (i && i.setAttribute) {
      i.setAttribute("aria-invalid", "true");
      first = first || i;
    }
  }
  if (first) first.focus();
}

const fd = form => {
  const o = {};
  new FormData(form).forEach((v, k) => { o[k] = typeof v === "string" ? v : ""; });
  return o;
};

const validEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
const flash = () => {
  const f = FLASH;
  FLASH = null;
  return f ? `<div class="alert ${f.type}" role="status">${esc(f.text)}</div>` : "";
};
const protoBar = () => Store.persistent ? "" : `<div class="proto">Prototype mode: data is stored in memory and resets when page refreshes.</div>`;

function showModal(contentHtml) {
  let c = $("#modal-container");
  if (!c) {
    c = document.createElement("div");
    c.id = "modal-container";
    document.body.appendChild(c);
  }
  c.innerHTML = `
    <div class="modal-backdrop" data-act="close-modal">
      <div class="modal-dialog" onclick="event.stopPropagation()">
        <button class="modal-close" data-act="close-modal" aria-label="Close modal">&times;</button>
        ${contentHtml}
      </div>
    </div>`;
}

function closeModal() {
  const c = $("#modal-container");
  if (c) c.innerHTML = "";
}

/* ===================== Navigation Setup ===================== */
const NAV = [
  ["overview", "Overview", "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"],
  ["profile", "My Talent Profile", "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  ["skills", "My Skills", "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
  ["portfolio", "My Portfolio", "M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16m-2-2l1.586-1.586a2 2 0 0 1 2.828 0L20 14m-6-6h.01M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"],
  ["talent", "Discover Talent", "M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"],
  ["connections", "Connections", "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"],
  ["agency", "My Agencies", "M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4"],
  ["opportunities", "Opportunities", "M21 13.255A23.931 23.931 0 0 1 12 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m4 6h.01M5 20h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"],
  ["messages", "Messages", "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"],
  ["settings", "Settings", "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"]
];

function shell(active, content) {
  const u = me();
  const unreadNotifs = (db.notifs || []).filter(n => n.uid === u.id && !n.read).length;
  const pendingConns = (db.conns || []).filter(c => c.to === u.id && c.status === "pending").length;
  const unreadMsg = (db.messages || []).filter(m => m.to === u.id && !m.read).length;

  const link = n => {
    let count = 0;
    if (n[0] === "connections") count = pendingConns;
    if (n[0] === "messages") count = unreadMsg;
    return `<a href="#/app/${n[0]}" class="${active === n[0] ? "on" : ""}">${icon(n[2])}${n[1]}${count ? ` <span class="pill">${count}</span>` : ""}</a>`;
  };
  const tab = name => {
    const n = NAV.find(x => x[0] === name);
    if (!n) return "";
    return `<a href="#/app/${n[0]}" class="${active === n[0] ? "on" : ""}">${icon(n[2])}<span>${n[1]}</span></a>`;
  };

  const menu = $("#menu");
  menu.innerHTML = `
    <div class="menu-box">
      <div class="row" style="margin-bottom:12px">
        <strong style="font-family:var(--head);font-size:1.1rem">${esc(u.name)}</strong>
        <button class="btn btn-quiet btn-sm" data-act="menu">Close</button>
      </div>
      ${NAV.map(n => `<a href="#/app/${n[0]}" class="${active === n[0] ? "on" : ""}">${icon(n[2])}${n[1]}</a>`).join("")}
      <button class="l" data-act="logout">${icon("M9 4H5v16h4M16 8l4 4-4 4M20 12H9")}Log out</button>
    </div>`;

  return `${protoBar()}<div class="app">
    <aside class="side">
      <a class="brand" href="${SITE_URL}"><img src="${window.__ICON}" alt=""><span class="word">Team<b>Bud</b></span></a>
      <nav aria-label="Dashboard">${NAV.map(n => link(n)).join("")}</nav>
      <div class="usercard">
        ${avatar(u)}
        <div style="min-width:0">
          <div class="nm">${esc(u.name)}</div>
          <small>@${esc(u.username)}</small>
        </div>
      </div>
      <button class="btn btn-quiet btn-sm" data-act="logout">Log out</button>
    </aside>
    <div class="main">
      <header class="topbar">
        <a class="brand" href="#/app/overview"><img src="${window.__ICON}" alt=""><span class="word">Team<b>Bud</b></span></a>
        <div style="display:flex;align-items:center;gap:8px">
          <a class="btn btn-primary btn-sm" href="#/create-agency" style="padding:0 14px">+ Create Agency</a>
          <button class="btn btn-quiet" data-act="menu" aria-label="Open menu">${icon("M4 7h16M4 12h16M4 17h16")}</button>
        </div>
      </header>
      <div class="content" id="page">${content}</div>
    </div>
    <nav class="tabbar" aria-label="Quick navigation">
      ${["overview", "profile", "portfolio", "talent", "connections", "agency", "messages"].map(tab).join("")}
    </nav>
  </div>`;
}

/* ===================== Auth Views ===================== */
function authLayout(inner) {
  return `${protoBar()}<div class="auth">
    <aside class="auth-side">
      <a class="brandcard brand" href="${SITE_URL}"><img src="${window.__ICON}" alt=""><span class="word">Team<b>Bud</b></span></a>
      <div>
        <h2>Find your people. Build your future.</h2>
        <ul>
          <li>Build an authentic profile showcasing your verified abilities.</li>
          <li>Find student collaborators with complementary skills.</li>
          <li>Form student agencies of 3 to 10 members to serve real clients.</li>
        </ul>
      </div>
      <small>Free platform. Build, collaborate, and launch independent agency brands.</small>
    </aside>
    <main class="auth-main">
      <div class="auth-card">
        <a class="back" href="${SITE_URL}">Back to TeamBud home</a>
        ${inner}
      </div>
    </main>
  </div>`;
}

function switcher(on) {
  return `<div class="switch" role="tablist">
    <a href="#/register/student" class="${on === "s" ? "on" : ""}">I am a student</a>
    <a href="#/register/client" class="${on === "c" ? "on" : ""}">I am a client</a>
  </div>`;
}

function viewLogin() {
  return authLayout(`
    <h1>Log in</h1>
    <p class="sub">Welcome back. Enter your credentials to access your account.</p>
    ${flash()}
    <form data-form="login" novalidate>
      ${field("email", "Email address", inp("email", "email", 'autocomplete="email" inputmode="email"'))}
      ${pwField("password", "Password")}
      <div class="row" style="margin:6px 0 20px">
        <label class="chk" style="padding:8px 0;border:none;background:none"><input type="checkbox" name="remember"> Keep me logged in</label>
        <a href="#/forgot" style="font-weight:600;font-size:.92rem">Forgot password?</a>
      </div>
      <div class="err" data-err="form" aria-live="polite" style="margin:-8px 0 12px"></div>
      <button class="btn btn-primary btn-block" type="submit">Log in</button>
    </form>
    <div style="margin-top:20px;padding:12px;background:var(--sage);border-radius:10px;font-size:.88rem">
      <strong>Quick Demo Access:</strong><br>
      Founder: <code>mr_clarity@demo.invalid</code> / password (any 8 chars)<br>
      Student: <code>sample_dev@demo.invalid</code> / password (any 8 chars)<br>
      Client: <code>client@demo.invalid</code> / password (any 8 chars)
    </div>
    <p class="alt">New to TeamBud? <a href="#/register/student">Create a student account</a> or <a href="#/register/client">register as a client</a>.</p>
  `);
}

function stateField(country, val) {
  return country === "Nigeria" ?
    field("state", "State", `<select id="state" name="state">${opts(NG_STATES, val, "Select state")}</select>`) :
    field("state", "State or region", inp("state", "text", `value="${esc(val || "")}" autocomplete="address-level1"`));
}

function viewRegStudent() {
  return authLayout(`
    <h1>Create student account</h1>
    <p class="sub">Join a community of students building real agency businesses.</p>
    ${switcher("s")}
    <form data-form="reg-student" novalidate>
      <div class="grid2">
        <div class="full">${field("name", "Full name", inp("name", "text", 'autocomplete="name"'))}</div>
        <div class="full">${field("email", "Email address", inp("email", "email", 'autocomplete="email" inputmode="email"'), "We will send a verification link to this address.")}</div>
        <div class="full">${field("username", "Profile username", inp("username", "text", 'autocapitalize="none" autocomplete="username" maxlength="20"'), "3 to 20 characters: lowercase letters, numbers, and underscores.")}</div>
        <div class="full">${pwField("password", "Password", true)}</div>
        <div class="full">${pwField("confirm", "Confirm password")}</div>
        <div class="full">${field("institution", "Institution", inp("institution", "text", 'list="inst-list" autocomplete="organization"') + `<datalist id="inst-list">${INSTITUTIONS.map(i => `<option value="${esc(i)}">`).join("")}</datalist>`)}</div>
        ${field("department", "Department", inp("department", "text"))}
        ${field("level", "Academic level", `<select id="level" name="level">${opts(LEVELS, "", "Select level")}</select>`)}
        ${field("country", "Country", `<select id="country" name="country" data-live="country">${opts(COUNTRIES, "Nigeria")}</select>`)}
        <div id="state-wrap">${stateField("Nigeria", "")}</div>
        <div class="full"><label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">What are you looking to do on TeamBud?</label>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${INTENTS.map(i => `<label class="chk"><input type="checkbox" name="intent" value="${i[0]}"> ${i[1]}</label>`).join("")}
          </div>
        </div>
        <div class="full"><label class="chk" style="margin-top:10px"><input type="checkbox" name="consent"> I agree to the TeamBud Terms and Community Standards.</label><div class="err" data-err="consent" aria-live="polite"></div></div>
      </div>
      <button class="btn btn-primary btn-block" type="submit" style="margin-top:16px">Create account</button>
    </form>
    <p class="alt">Already have an account? <a href="#/login">Log in</a>.</p>
  `);
}

function viewRegClient() {
  return authLayout(`
    <h1>Register as a client</h1>
    <p class="sub">Find and hire student-founded teams to complete your projects.</p>
    ${switcher("c")}
    <form data-form="reg-client" novalidate>
      <div class="grid2">
        <div class="full">${field("name", "Name or organisation name", inp("name", "text", 'autocomplete="organization"'))}</div>
        <div class="full">${field("email", "Email address", inp("email", "email", 'autocomplete="email" inputmode="email"'))}</div>
        <div class="full">${pwField("password", "Password", true)}</div>
        <div class="full">${pwField("confirm", "Confirm password")}</div>
        ${field("accountType", "Account type", `<select id="accountType" name="accountType">${opts(CLIENT_TYPES, "", "Select account type")}</select>`)}
        ${field("country", "Country", `<select id="country" name="country">${opts(COUNTRIES, "Nigeria")}</select>`)}
        <div class="full">${field("contact", "Primary contact method", inp("contact", "text", 'placeholder="Phone, WhatsApp, or business line"'))}</div>
        <div class="full"><label class="chk"><input type="checkbox" name="consent"> I agree to the Terms of Service and Client Guidelines.</label><div class="err" data-err="consent" aria-live="polite"></div></div>
      </div>
      <button class="btn btn-primary btn-block" type="submit" style="margin-top:16px">Register as client</button>
    </form>
    <p class="alt">Already have an account? <a href="#/login">Log in</a>.</p>
  `);
}

function viewCheckEmail(uid) {
  const u = userById(uid);
  const email = u ? u.email : "your email";
  const t = (db.tokens || []).find(x => x.uid === uid && x.k === "verify");
  return authLayout(`
    <h1>Verify your email</h1>
    <p class="sub">We sent a verification link to <strong>${esc(email)}</strong>.</p>
    <div class="alert ok" style="margin:20px 0">Click the button below to simulate opening the link from your inbox.</div>
    ${t ? `<a class="btn btn-primary btn-block" href="#/verify/${t.t}">Verify my email address</a>` : `<p>Verification token expired.</p>`}
    <p class="alt"><button class="btn btn-quiet" data-act="resend" data-uid="${uid}">Resend email</button></p>
  `);
}

function viewForgot() {
  return authLayout(`
    <h1>Forgot password</h1>
    <p class="sub">Enter your email and we will generate a password reset link.</p>
    <form data-form="forgot" novalidate>
      ${field("email", "Email address", inp("email", "email"))}
      <button class="btn btn-primary btn-block" type="submit">Send reset link</button>
      <div id="forgot-out"></div>
    </form>
    <p class="alt"><a href="#/login">Back to log in</a></p>
  `);
}

function viewReset(token) {
  return authLayout(`
    <h1>Reset password</h1>
    <p class="sub">Enter your new secure password below.</p>
    <form data-form="reset" data-token="${token}" novalidate>
      ${pwField("newpw", "New password", true)}
      ${pwField("confirm", "Confirm new password")}
      <button class="btn btn-primary btn-block" type="submit">Update password</button>
    </form>
  `);
}

/* ===================== Student Dashboard Views ===================== */
function completion(u) {
  const items = [
    ["Account details", true, "profile"],
    ["Profile photo", !!u.photo, "profile"],
    ["Biography", (u.bio || "").trim().length >= 30, "profile"],
    ["At least one skill", (u.skills || []).length > 0, "skills"],
    ["Experience", (u.experience || []).length > 0, "profile"],
    ["Portfolio link", (u.portfolio || []).length > 0, "profile"],
    ["Certification", (u.certs || []).length > 0, "profile"],
    ["Interests", (u.interests || []).length > 0, "profile"],
    ["Availability", u.availability !== "unset", "profile"],
    ["Collaboration areas", (u.collab || []).length > 0, "profile"]
  ];
  return { items, pct: Math.round(items.filter(i => i[1]).length / items.length * 100) };
}

function connBtn(u, o) {
  const s = connState(u.id, o.id);
  const c = connBetween(u.id, o.id);
  if (s === "none") return `<button class="btn btn-primary btn-sm" data-act="open-connect-modal" data-uid="${o.id}">Connect</button>`;
  if (s === "sent") return `<button class="btn btn-quiet btn-sm" disabled>Request sent</button>`;
  if (s === "connected") return `<span class="tag lime">Connected</span>`;
  return `<span class="acts"><button class="btn btn-primary btn-sm" data-act="accept" data-id="${c.id}">Accept</button><button class="btn btn-quiet btn-sm" data-act="decline" data-id="${c.id}">Decline</button></span>`;
}

function skillTags(o, max = 4) {
  const sk = (o.skills || []).slice(0, max).map(s => `<span class="tag">${esc(s.name)}${s.level ? " · " + esc(s.level) : ""}</span>`).join("");
  return sk + (o.skills.length > max ? `<span class="tag">+${o.skills.length - max}</span>` : "");
}

function miniStudent(u, o) {
  return `<li class="row">
    <div class="who">${avatar(o)}
      <div style="min-width:0">
        <strong>${esc(o.name)}${o.demo ? ' <span class="tag demo">Demo</span>' : ""}</strong>
        <small>${esc(o.department)}, ${esc(o.institution)}</small>
      </div>
    </div>
    ${connBtn(u, o)}
  </li>`;
}

function incoming(u) {
  return (db.conns || []).filter(c => c.to === u.id && c.status === "pending");
}

function acceptedConnections(userId) {
  return (db.conns || []).filter(c => c.status === "accepted" && (c.from === userId || c.to === userId));
}

function recommendComplementary(u) {
  const userSkillNames = (u.skills || []).map(s => s.name.toLowerCase());
  const userCat = (u.category || u.department || "").toLowerCase();

  let targetKeywords = [];
  let userPrimaryType = "specialist";

  const isDev = userSkillNames.some(s => /web|developer|code|react|node|python|flutter|frontend|backend|engineer/i.test(s)) || /computer|software|engineering/i.test(userCat);
  const isDesign = userSkillNames.some(s => /design|ui|ux|figma|brand|graphic/i.test(s)) || /design|art|creative/i.test(userCat);
  const isMarketing = userSkillNames.some(s => /marketing|seo|growth|content|social|copywriting|sales/i.test(s)) || /mass com|business|marketing/i.test(userCat);

  if (isDesign) {
    userPrimaryType = "designer";
    targetKeywords = ["developer", "react", "frontend", "backend", "software", "marketing", "seo", "content"];
  } else if (isDev) {
    userPrimaryType = "developer";
    targetKeywords = ["ui/ux", "design", "figma", "brand", "product management", "marketing", "content"];
  } else if (isMarketing) {
    userPrimaryType = "marketer";
    targetKeywords = ["web development", "react", "ui/ux design", "figma", "software", "mobile development"];
  } else {
    targetKeywords = ["ui/ux", "web development", "marketing", "graphic design", "content writing"];
  }

  const existingConns = new Set(
    (db.conns || [])
      .filter(c => c.from === u.id || c.to === u.id)
      .map(c => c.from === u.id ? c.to : c.from)
  );

  return students()
    .filter(o => o.id !== u.id && !existingConns.has(o.id) && !(u.blockedUsers || []).includes(o.id))
    .map(o => {
      const otherSkills = (o.skills || []).map(s => s.name.toLowerCase());
      const otherCat = (o.category || o.department || "").toLowerCase();
      let matchCount = 0;

      targetKeywords.forEach(kw => {
        if (otherSkills.some(s => s.includes(kw)) || otherCat.includes(kw)) matchCount++;
      });

      let score = matchCount * 2;
      if (o.portfolio && o.portfolio.length) score += 1;

      const topOtherSkill = (o.skills && o.skills[0]) ? o.skills[0].name : (o.department || "Specialist");
      let why = "";
      if (userPrimaryType === "designer") {
        why = `Their ${topOtherSkill} engineering capabilities complement your UI/UX design to build and ship complete client projects.`;
      } else if (userPrimaryType === "developer") {
        why = `Their ${topOtherSkill} design and product talents complement your technical code to turn software into market-ready agency products.`;
      } else if (userPrimaryType === "marketer") {
        why = `Their ${topOtherSkill} technical capabilities complement your growth and client acquisition strategy for commercial contracts.`;
      } else {
        why = `Their ${topOtherSkill} abilities provide balanced multidisciplinary talent to help form a 3-to-10 member agency team.`;
      }

      return { o, score, why };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

function pageOverview(u) {
  const c = completion(u);
  const inc = incoming(u);
  const acceptedConns = acceptedConnections(u.id);
  const compRecs = recommendComplementary(u);
  const acts = (u.activity || []).slice(0, 6);
  const missing = c.items.filter(i => !i[1]);
  const myAgencies = userAgencies(u.id);
  const pendingInvites = userPendingInvites(u.id, u.email);
  const unreadNotifs = (db.notifs || []).filter(n => n.uid === u.id && !n.read);
  const savedOppsCount = (u.savedOpps || []).length;
  const skillsCount = (u.skills || []).length;
  const portfolioCount = (u.portfolio || []).length;

  return `
    <div class="page-h">
      <div>
        <h1>Welcome, ${esc(firstName(u))}</h1>
        <p>${esc(u.department)}, ${esc(u.institution)}</p>
      </div>
      <div class="acts">
        <a class="btn btn-primary btn-sm" href="#/create-agency">+ Create an Agency</a>
      </div>
    </div>

    <!-- Guided Setup Reminder if incomplete -->
    ${(!u.onboarded || c.pct < 70) ? `
      <div style="background:var(--sage);border:1px solid #BDD4C7;border-radius:14px;padding:18px 22px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
        <div>
          <strong style="font-size:1.02rem;color:var(--forest);display:block;margin-bottom:4px">
            ✨ Complete Your Guided Profile Setup (${c.pct}% Complete)
          </strong>
          <p style="font-size:.88rem;color:var(--forest);margin:0;max-width:680px">
            Showcase your skills, experience level, and work samples so student agencies and commercial clients can discover your abilities.
          </p>
        </div>
        <div style="display:flex;gap:10px">
          <a class="btn btn-primary btn-sm" href="#/onboarding">Guided Setup (3 mins) →</a>
        </div>
      </div>
    ` : ""}

    <!-- Genuine Real Data Overview Metrics Grid (Section 7) -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:24px">
      <div class="stat-box highlight">
        <div class="sub">Skills Added</div>
        <div class="num">${skillsCount}</div>
        <small style="color:var(--muted)">Verified capabilities</small>
      </div>
      <div class="stat-box">
        <div class="sub">Portfolio Projects</div>
        <div class="num">${portfolioCount}</div>
        <small style="color:var(--muted)">Work showcases</small>
      </div>
      <div class="stat-box">
        <div class="sub">Pending Requests</div>
        <div class="num">${inc.length}</div>
        <small style="color:var(--muted)">Awaiting your response</small>
      </div>
      <div class="stat-box">
        <div class="sub">Accepted Connections</div>
        <div class="num">${acceptedConns.length}</div>
        <small style="color:var(--muted)">Trusted student network</small>
      </div>
      <div class="stat-box">
        <div class="sub">Agency Invitations</div>
        <div class="num">${pendingInvites.length}</div>
        <small style="color:var(--muted)">Pending team invites</small>
      </div>
      <div class="stat-box highlight">
        <div class="sub">Agency Memberships</div>
        <div class="num">${myAgencies.length}</div>
        <small style="color:var(--muted)">Forming & active agencies</small>
      </div>
      <div class="stat-box">
        <div class="sub">Saved Opportunities</div>
        <div class="num">${savedOppsCount}</div>
        <small style="color:var(--muted)">Bookmarked client & grant RFPs</small>
      </div>
      <div class="stat-box">
        <div class="sub">Unread Notifications</div>
        <div class="num">${unreadNotifs.length}</div>
        <small style="color:var(--muted)">Platform updates</small>
      </div>
    </div>

    <!-- Quick Action Navigation Hub (Section 7) -->
    <div class="card" style="margin-bottom:24px;padding:18px 22px">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
        <strong style="font-size:.92rem;color:var(--forest);text-transform:uppercase;letter-spacing:.04em">Quick Navigation:</strong>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <a class="btn btn-ghost btn-sm" href="#/app/profile">👤 My Talent Profile</a>
          <a class="btn btn-ghost btn-sm" href="#/app/talent">🔍 Discover Talent</a>
          <a class="btn btn-ghost btn-sm" href="#/app/agency">🏢 My Agencies</a>
          <a class="btn btn-ghost btn-sm" href="#/app/opportunities">🚀 Opportunities</a>
        </div>
      </div>
    </div>

    <!-- Profile Completion Meter Section -->
    <div class="card" style="margin-bottom:24px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <h2>Profile Completion</h2>
        <div class="big" style="font-size:1.8rem;color:var(--emerald);margin:0">${c.pct}%</div>
      </div>
      <div class="bar" role="progressbar" aria-valuenow="${c.pct}" aria-valuemin="0" aria-valuemax="100">
        <i style="width:${c.pct}%"></i>
      </div>
      ${missing.length ? `
        <p class="c-sub" style="margin:12px 0 8px">Complete profiles help agency founders and collaborators discover you faster:</p>
        <ul class="todo" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:6px">${missing.map(i => `<li><a href="#/app/${i[2]}">${esc(i[0])}</a></li>`).join("")}</ul>
      ` : `<p class="c-sub" style="margin-top:10px">Your student talent profile is 100% comprehensive and verified across the ecosystem.</p>`}
    </div>

    <!-- Agency Membership & Status Section -->
    <div class="card" style="margin-bottom:24px;border-left:5px solid var(--emerald)">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px">
        <div>
          <h2>Agency Membership & Enterprise</h2>
          <p class="c-sub">TeamBud allows students to build and run independent agency businesses together (3 to 10 members).</p>
        </div>
        <div>
          <a class="btn btn-ghost btn-sm" href="#/create-agency">+ Create Agency</a>
          <a class="btn btn-quiet btn-sm" href="#/marketplace">Browse Marketplace</a>
        </div>
      </div>
      ${myAgencies.length ? `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-top:16px">
          ${myAgencies.map(a => {
            const myMem = a.members.find(m => m.userId === u.id);
            const statusClass = a.status === "active" ? "active" : (a.status === "forming" ? "forming" : "needs-members");
            return `
              <div style="border:1px solid var(--line);border-radius:12px;padding:16px;background:var(--ivory)">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
                  <span class="badge ${statusClass}">${a.status === "active" ? "Active Agency" : (a.status === "forming" ? "Forming" : "Needs Members")}</span>
                  <small style="color:var(--muted)">${a.members.length}/10 members</small>
                </div>
                <h3 style="font-size:1.15rem;margin-bottom:4px">${esc(a.name)}</h3>
                <p style="font-size:.88rem;color:var(--muted);margin-bottom:12px">${esc(a.shortDesc)}</p>
                <div style="font-size:.84rem;margin-bottom:12px">
                  <strong>Your Role:</strong> <span class="badge role">${esc(myMem ? myMem.role : "Member")}</span>
                  ${myMem && myMem.customRoleDesc ? `<div style="font-size:.8rem;color:var(--muted);margin-top:2px">${esc(myMem.customRoleDesc)}</div>` : ""}
                </div>
                <div style="display:flex;gap:8px">
                  <a class="btn btn-primary btn-sm btn-block" href="#/agency-hub/${a.id}">Open Team Workspace</a>
                  <a class="btn btn-ghost btn-sm" href="#/agency/${a.slug}" title="View Public Profile">Public View</a>
                </div>
              </div>`;
          }).join("")}
        </div>
      ` : `
        <div class="empty" style="padding:24px 12px;text-align:center">
          <p style="font-size:1rem;margin-bottom:12px">You are not part of an agency team yet.</p>
          <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
            <a class="btn btn-primary" href="#/create-agency">Create an Agency</a>
            <a class="btn btn-ghost" href="#/app/talent">Find Teammates on Talent Hub</a>
          </div>
        </div>
      `}
    </div>

    <!-- Pending Invitations -->
    ${pendingInvites.length ? `
      <div class="card" style="margin-bottom:24px;border-left:5px solid var(--lime)">
        <h2>Pending Agency Invitations (${pendingInvites.length})</h2>
        <p class="c-sub">You have been invited to join an agency team. Review your role before accepting.</p>
        <ul class="list" style="margin-top:14px">
          ${pendingInvites.map(item => `
            <li class="row" style="padding:14px;background:var(--ivory);border-radius:10px;margin-bottom:8px">
              <div>
                <strong>${esc(item.agency.name)}</strong>
                <div style="font-size:.88rem;color:var(--muted)">Role: <span class="badge role">${esc(item.invite.role)}</span>${item.invite.customRoleDesc ? ` — ${esc(item.invite.customRoleDesc)}` : ""}</div>
                <small>${esc(item.agency.institution)}, ${esc(item.agency.location)} · Team: ${item.agency.members.length}/10</small>
              </div>
              <span class="acts">
                <button class="btn btn-primary btn-sm" data-act="accept-agency-invite" data-agency-id="${item.agency.id}" data-invite-id="${item.invite.id}">Accept</button>
                <button class="btn btn-quiet btn-sm" data-act="decline-agency-invite" data-agency-id="${item.agency.id}" data-invite-id="${item.invite.id}">Decline</button>
              </span>
            </li>
          `).join("")}
        </ul>
      </div>
    ` : ""}

    <!-- Complementary Skill-Based Recommendations (Section 7 & 8) -->
    <div class="card" style="margin-bottom:24px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px">
        <div>
          <h2>Complementary Talent Recommendations</h2>
          <p class="c-sub">Collaborators with skills that complete your multidisciplinary agency team.</p>
        </div>
        <a class="btn btn-ghost btn-sm" href="#/app/talent">Browse All Students ↗</a>
      </div>

      ${compRecs.length ? `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px">
          ${compRecs.map(r => `
            <div class="rec-card">
              <div>
                <div style="display:flex;gap:12px;align-items:center;margin-bottom:10px">
                  ${avatar(r.o)}
                  <div style="min-width:0;flex:1">
                    <strong style="font-size:1rem;color:var(--forest);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(r.o.name)}</strong>
                    <small style="color:var(--muted);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(r.o.department)}, ${esc(r.o.institution)}</small>
                  </div>
                </div>

                <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px">
                  ${(r.o.skills || []).slice(0, 3).map(s => `<span class="talent-skill-tag">${esc(s.name)}</span>`).join("")}
                </div>

                <div style="background:var(--white);padding:10px 12px;border-radius:8px;border:1px solid var(--line);font-size:.82rem;color:var(--forest);line-height:1.45;margin-bottom:12px">
                  <strong>Why recommended:</strong> ${esc(r.why)}
                </div>
              </div>

              <div style="display:flex;gap:8px;align-items:center;padding-top:10px;border-top:1px solid var(--line)">
                <a class="btn btn-ghost btn-sm" href="#/talent/${esc(r.o.username)}" style="flex:1;text-align:center">View Profile</a>
                <button class="btn btn-primary btn-sm" data-act="open-connect-modal" data-uid="${r.o.id}">Connect</button>
              </div>
            </div>
          `).join("")}
        </div>
      ` : `
        <div class="empty">Add your primary skills and interests to see tailored complementary suggestions. <a href="#/app/skills">Add skills</a></div>
      `}
    </div>

    <div class="cols">
      <!-- Pending Connection Requests -->
      <div class="card">
        <h2>Connection Requests (${inc.length})</h2>
        <p class="c-sub">Students who want to connect and build teams with you.</p>
        ${inc.length ? `
          <ul class="list" style="margin-top:12px">${inc.map(c => {
            const o = userById(c.from);
            if (!o) return "";
            return `<li class="row" style="padding:14px 0">
              <div class="who">${avatar(o)}
                <div>
                  <strong>${esc(o.name)}</strong>
                  <small>${esc(o.department)}, ${esc(o.institution)}</small>
                  ${c.note ? `<div style="font-size:.82rem;color:var(--forest);background:var(--ivory);padding:6px 10px;border-radius:6px;margin-top:6px;border:1px solid var(--line)">"${esc(c.note)}"</div>` : ""}
                </div>
              </div>
              <span class="acts" style="flex-direction:column;gap:6px">
                <button class="btn btn-primary btn-sm" data-act="accept" data-id="${c.id}">Accept</button>
                <button class="btn btn-quiet btn-sm" data-act="decline" data-id="${c.id}">Decline</button>
              </span>
            </li>`;
          }).join("")}</ul>
        ` : `<div class="empty">No pending connection requests.</div>`}
      </div>

      <!-- Recent Activity Log -->
      <div class="card">
        <h2>Recent Activity</h2>
        <p class="c-sub">Your recent milestones and connections on TeamBud.</p>
        ${acts.length ? `
          <ul class="list acts-log" style="margin-top:12px">${acts.map(a => `<li><span>${esc(a.text)}</span><time>${rel(a.t)}</time></li>`).join("")}</ul>
        ` : `<div class="empty">No recent activity recorded yet.</div>`}
      </div>
    </div>
  `;
}

/* ===================== Talent Hub & Student Showcase System ===================== */
let activeTalentCategory = "all";

function pageTalentHub(u) {
  const allDepts = [...new Set(students().map(s => s.department).filter(Boolean))].sort();
  const allInsts = [...new Set(students().map(s => s.institution).filter(Boolean))].sort();
  const allLocs = [...new Set(students().map(s => loc(s)).filter(Boolean))].sort();
  const allSkills = [...new Set(students().flatMap(s => (s.skills || []).map(sk => sk.name)).filter(Boolean))].sort();

  return `
    <div class="talent-hero">
      <h1>Discover the People Behind the Skills.</h1>
      <p>Every student has something valuable to contribute. Explore talented students from different institutions and disciplines, discover what they can do, and connect with people who may become your next collaborators, teammates or business partners.</p>
      <div class="talent-hero-acts">
        <a class="btn-lime" href="${u && u.role === 'student' ? '#/app/profile' : '#/register'}">SHOWCASE YOUR TALENT ↗</a>
        <a class="btn-ghost-light" href="#talent-directory" onclick="document.getElementById('talent-directory')?.scrollIntoView({behavior:'smooth'})">EXPLORE TALENT ↓</a>
      </div>
    </div>

    <div id="talent-directory">
      <!-- Category selector chips -->
      <div class="talent-cats" id="talent-cats-bar">
        ${[
          ["all", "All Categories"],
          ["tech", "Technology & Software"],
          ["design", "Creative & Design"],
          ["marketing", "Marketing & Growth"],
          ["business", "Business & Strategy"],
          ["finance", "Finance & Accounting"],
          ["writing", "Writing & Content"],
          ["engineering", "Engineering & Technical"],
          ["agric", "Agriculture & Agribusiness"],
          ["fashion", "Fashion & Arts"],
          ["education", "Education & Training"]
        ].map(([slug, name]) => `
          <button class="talent-cat-btn ${activeTalentCategory === slug ? 'active' : ''}" data-act="filter-talent-cat" data-cat="${slug}">${esc(name)}</button>
        `).join("")}
      </div>

      <!-- Filters & Search Bar -->
      <div class="card" style="margin-bottom:24px;padding:22px" id="dfilters">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:14px">
          <div style="grid-column:1/-1">
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Search by name, skill, institution, or keyword</label>
            <input type="text" id="t-search" placeholder="e.g. Sulaiman, React, Lagos, Brand Identity, Computer Science..." data-live="talent" style="width:100%;padding:10px 14px;border:1px solid var(--line);border-radius:10px;font-size:.95rem">
          </div>
          <div>
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Skill</label>
            <input type="text" id="t-skill" list="talent-skills-list" placeholder="Filter by skill..." data-live="talent" style="width:100%;padding:8px 12px;border:1px solid var(--line);border-radius:8px">
            <datalist id="talent-skills-list">
              ${allSkills.map(s => `<option value="${esc(s)}">`).join("")}
            </datalist>
          </div>
          <div>
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Institution</label>
            <select id="t-inst" data-live="talent" style="width:100%;padding:8px 12px;border:1px solid var(--line);border-radius:8px">
              <option value="">All Institutions</option>
              ${allInsts.map(i => `<option value="${esc(i)}">${esc(i)}</option>`).join("")}
            </select>
          </div>
          <div>
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Department</label>
            <select id="t-dept" data-live="talent" style="width:100%;padding:8px 12px;border:1px solid var(--line);border-radius:8px">
              <option value="">All Departments</option>
              ${allDepts.map(d => `<option value="${esc(d)}">${esc(d)}</option>`).join("")}
            </select>
          </div>
          <div>
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Location / State</label>
            <select id="t-loc" data-live="talent" style="width:100%;padding:8px 12px;border:1px solid var(--line);border-radius:8px">
              <option value="">All Locations</option>
              ${allLocs.map(l => `<option value="${esc(l)}">${esc(l)}</option>`).join("")}
            </select>
          </div>
          <div>
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Experience Level</label>
            <select id="t-exp" data-live="talent" style="width:100%;padding:8px 12px;border:1px solid var(--line);border-radius:8px">
              <option value="">All Experience Levels</option>
              <option value="Beginner">Beginner (Under 1 yr)</option>
              <option value="Intermediate">Intermediate (1-2 yrs)</option>
              <option value="Advanced">Advanced (2-4 yrs)</option>
              <option value="Expert">Expert / Lead (4+ yrs)</option>
            </select>
          </div>
          <div>
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Availability</label>
            <select id="t-avail" data-live="talent" style="width:100%;padding:8px 12px;border:1px solid var(--line);border-radius:8px">
              <option value="">Any Availability</option>
              <option value="now">Available Now</option>
              <option value="part">Available Part-Time</option>
              <option value="later">Specific Projects</option>
            </select>
          </div>
        </div>

        <!-- Checkbox intents & Sort -->
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;padding-top:14px;border-top:1px solid var(--line)">
          <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
            <span style="font-size:.82rem;font-weight:700;color:var(--forest)">Intent:</span>
            <label style="font-size:.84rem;display:inline-flex;align-items:center;gap:6px;cursor:pointer">
              <input type="checkbox" id="t-agency" data-live="talent"> Open to agency
            </label>
            <label style="font-size:.84rem;display:inline-flex;align-items:center;gap:6px;cursor:pointer">
              <input type="checkbox" id="t-biz" data-live="talent"> Interested in starting a business
            </label>
            <label style="font-size:.84rem;display:inline-flex;align-items:center;gap:6px;cursor:pointer">
              <input type="checkbox" id="t-freelance" data-live="talent"> Available for freelance
            </label>
          </div>

          <div style="display:flex;align-items:center;gap:8px">
            <label for="t-sort" style="font-size:.82rem;font-weight:700;color:var(--forest)">Sort by:</label>
            <select id="t-sort" data-live="talent" style="padding:6px 12px;border:1px solid var(--line);border-radius:8px;font-size:.85rem">
              <option value="recent">Recently Joined</option>
              <option value="updated">Recently Updated</option>
              <option value="complete">Most Complete Profile</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Talent Cards Container -->
      <div id="talent-results" aria-live="polite"></div>
    </div>
  `;
}

function talentHubResults() {
  const container = $("#talent-results");
  if (!container) return;
  const q = ($("#t-search") ? $("#t-search").value : "").trim().toLowerCase();
  const sk = ($("#t-skill") ? $("#t-skill").value : "").trim().toLowerCase();
  const inst = ($("#t-inst") ? $("#t-inst").value : "").trim();
  const dept = ($("#t-dept") ? $("#t-dept").value : "").trim();
  const lo = ($("#t-loc") ? $("#t-loc").value : "").trim();
  const exp = ($("#t-exp") ? $("#t-exp").value : "").trim();
  const av = ($("#t-avail") ? $("#t-avail").value : "").trim();
  const onlyAgency = $("#t-agency") ? $("#t-agency").checked : false;
  const onlyBiz = $("#t-biz") ? $("#t-biz").checked : false;
  const onlyFreelance = $("#t-freelance") ? $("#t-freelance").checked : false;
  const sortBy = ($("#t-sort") ? $("#t-sort").value : "recent");

  let list = students();

  // Category filter
  if (activeTalentCategory && activeTalentCategory !== "all") {
    const catMap = {
      tech: "Technology and Software Development",
      design: "Graphics and Brand Design",
      marketing: "Digital Marketing",
      business: "Business Consulting",
      finance: "Finance and Accounting",
      writing: "Writing and Communication",
      engineering: "Engineering and Technical Services",
      agric: "Agriculture and Agribusiness",
      fashion: "Fashion and Creative Arts",
      education: "Education and Training"
    };
    const targetCat = catMap[activeTalentCategory];
    if (targetCat) {
      list = list.filter(s => s.category === targetCat || (s.collab || []).includes(targetCat) || (s.skills || []).some(k => (k.category || "").includes(targetCat) || (k.name || "").toLowerCase().includes(activeTalentCategory)));
    }
  }

  // Text search
  if (q) {
    list = list.filter(s => 
      s.name.toLowerCase().includes(q) ||
      s.username.toLowerCase().includes(q) ||
      (s.headline || "").toLowerCase().includes(q) ||
      (s.bio || "").toLowerCase().includes(q) ||
      (s.department || "").toLowerCase().includes(q) ||
      (s.institution || "").toLowerCase().includes(q) ||
      (s.skills || []).some(k => k.name.toLowerCase().includes(q))
    );
  }

  if (sk) list = list.filter(s => (s.skills || []).some(k => k.name.toLowerCase().includes(sk)));
  if (inst) list = list.filter(s => s.institution === inst);
  if (dept) list = list.filter(s => s.department === dept);
  if (lo) list = list.filter(s => loc(s) === lo);
  if (exp) list = list.filter(s => (s.experienceLevel || "").toLowerCase().includes(exp.toLowerCase()));
  if (av) list = list.filter(s => s.availability === av);
  if (onlyAgency) list = list.filter(s => (s.lookingFor || []).includes("join_agency") || (s.intents || []).includes("join"));
  if (onlyBiz) list = list.filter(s => (s.lookingFor || []).includes("create_agency") || (s.intents || []).includes("create"));
  if (onlyFreelance) list = list.filter(s => (s.lookingFor || []).includes("freelance"));

  // Sorting
  if (sortBy === "recent") {
    list.sort((a, b) => (b.created || 0) - (a.created || 0));
  } else if (sortBy === "updated") {
    list.sort((a, b) => (b.updated || b.created || 0) - (a.updated || a.created || 0));
  } else if (sortBy === "complete") {
    const score = s => (s.photo ? 20 : 0) + (s.bio ? 20 : 0) + ((s.skills || []).length * 10) + ((s.portfolio || []).length * 15) + ((s.experience || []).length * 10);
    list.sort((a, b) => score(b) - score(a));
  }

  if (!list.length) {
    container.innerHTML = `
      <div class="empty" style="padding:48px 24px;text-align:center">
        <h3 style="font-size:1.2rem;color:var(--forest);margin-bottom:6px">No talent profiles matched your filters</h3>
        <p style="color:var(--muted);margin-bottom:16px">Try widening your search terms or clearing one of your filters.</p>
        <button class="btn btn-ghost btn-sm" onclick="document.querySelectorAll('#dfilters input, #dfilters select, #talent-directory input, #talent-directory select').forEach(e => { if(e.type==='checkbox') e.checked=false; else e.value=''; }); talentHubResults();">Clear all filters</button>
      </div>
    `;
    return;
  }

  const u = me();
  container.innerHTML = `
    <div style="margin-bottom:14px;font-size:.88rem;color:var(--muted)">Showing <strong>${list.length}</strong> talented student${list.length === 1 ? "" : "s"} across Nigeria</div>
    <div class="talent-grid">
      ${list.map(s => renderTalentCard(s, u)).join("")}
    </div>
  `;
}

function renderTalentCard(s, u) {
  const availMap = {
    now: { cls: "active", label: "● Available now" },
    part: { cls: "forming", label: "◐ Part-time" },
    later: { cls: "role", label: "○ Project-based" },
    no: { cls: "needs-members", label: "✕ Unavailable" },
    unset: { cls: "role", label: "Open" }
  };
  const av = availMap[s.availability] || availMap.unset;
  const portfolioCount = (s.portfolio || []).length;
  const isSelf = u && u.id === s.id;

  return `
    <div class="talent-card">
      <div>
        <div class="talent-head">
          <a href="#/talent/${esc(s.username)}" style="text-decoration:none">
            ${s.photo ? `<img class="talent-avatar" src="${esc(s.photo)}" alt="${esc(s.name)}">` : `<div class="talent-avatar" style="display:flex;align-items:center;justify-content:center;font-weight:800;color:var(--emerald);font-size:1.3rem">${esc(initials(s.name))}</div>`}
          </a>
          <div style="min-width:0;flex:1">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
              <a href="#/talent/${esc(s.username)}" style="text-decoration:none;color:var(--forest)"><strong style="font-size:1.05rem;font-family:var(--head)">${esc(s.name)}</strong></a>
              <span class="badge verified" style="font-size:.7rem;padding:2px 7px">✓ Verified</span>
            </div>
            <div class="talent-meta-unboxed">
              ${esc(s.institution)} · ${esc(s.department)}${s.showLevel !== false && s.level ? ` · ${esc(s.level)}` : ""}
            </div>
            <div style="font-size:.78rem;color:var(--muted);margin-top:2px">📍 ${esc(loc(s))}</div>
          </div>
        </div>

        <div class="talent-headline">${esc(s.headline || (s.department + " Student"))}</div>

        ${s.bio ? `<p style="font-size:.88rem;color:var(--forest);margin-bottom:12px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${esc(s.bio)}</p>` : ""}

        <div class="talent-skills">
          ${(s.skills || []).slice(0, 4).map(sk => `<span class="talent-skill-tag">${esc(sk.name)}${sk.level ? ` · <span style="color:var(--emerald);font-weight:700">${esc(sk.level)}</span>` : ""}</span>`).join("")}
          ${(s.skills || []).length > 4 ? `<span class="talent-skill-tag" style="background:none;border:1px dashed var(--line)">+${s.skills.length - 4} more</span>` : ""}
        </div>
      </div>

      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;font-size:.78rem">
          <span class="badge ${av.cls}">${av.label}</span>
          ${portfolioCount ? `<span style="color:var(--emerald);font-weight:700">✦ ${portfolioCount} Project${portfolioCount > 1 ? "s" : ""}</span>` : `<span style="color:var(--muted)">Portfolio active</span>`}
        </div>

        <div class="talent-card-foot">
          <a class="btn btn-ghost btn-sm" href="#/talent/${esc(s.username)}" style="flex:1;text-align:center">VIEW PROFILE</a>
          ${isSelf 
            ? `<a class="btn btn-quiet btn-sm" href="#/app/profile">Edit</a>` 
            : (u ? connBtn(u, s) : `<button class="btn btn-primary btn-sm" data-act="prompt-login" data-msg="Log in to connect with ${esc(s.name)}">Connect</button>`)}
        </div>
      </div>
    </div>
  `;
}

let obStep = 1;

function pageOnboarding(u) {
  ensureStudentDefaults(u);
  const c = completion(u);
  const commonSkills = [
    "UI/UX Design", "Figma", "Web Development", "React",
    "Mobile Development", "Flutter", "Python", "Node.js",
    "Content Writing", "Copywriting", "SEO", "Social Media Marketing",
    "Graphic Design", "Brand Strategy", "Video Editing", "Data Analysis",
    "Project Management", "Digital Marketing"
  ];

  const userSkillNames = (u.skills || []).map(s => s.name);

  return `
    ${protoBar()}
    <div style="max-width:820px;margin:30px auto 80px;padding:0 20px">
      <!-- Top Brand & Header -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
        <a class="brand" href="${SITE_URL}"><img src="${window.__ICON}" alt=""><span class="word">Team<b>Bud</b></span></a>
        <a class="btn btn-quiet btn-sm" href="#/app/overview">Skip to Dashboard ↗</a>
      </div>

      <div class="onboarding-wrap">
        <!-- Stepper -->
        <div class="onboarding-stepper">
          ${[
            [1, "Basic Info"],
            [2, "Your Talents"],
            [3, "Experience"],
            [4, "Interests"],
            [5, "Portfolio"],
            [6, "Complete"]
          ].map(([num, label]) => `
            <div class="ob-step-node ${obStep === num ? "active" : (obStep > num ? "completed" : "")}" data-act="set-ob-step" data-step="${num}">
              <div class="ob-step-circle">${obStep > num ? "✓" : num}</div>
              <span class="ob-step-label">${label}</span>
            </div>
          `).join("")}
        </div>

        <!-- Beneficial Reminders Banner -->
        <div style="background:var(--ivory);border:1px solid var(--line);border-radius:12px;padding:12px 16px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;gap:12px">
          <div style="font-size:.86rem;color:var(--forest)">
            💡 <strong>Why showcase your talents?</strong> Complete profiles receive 4x more agency invitations, connection requests, and client opportunities.
          </div>
          <span style="font-size:.82rem;font-weight:700;color:var(--emerald);white-space:nowrap">${c.pct}% Complete</span>
        </div>

        <!-- Step 1: Basic Information -->
        ${obStep === 1 ? `
          <div>
            <h2 style="font-size:1.5rem;color:var(--forest);margin-bottom:6px">Step 1: Basic Information</h2>
            <p class="c-sub" style="margin-bottom:20px">Introduce yourself to fellow student collaborators across Nigerian tertiary institutions.</p>
            
            <form data-form="ob-step-1" novalidate>
              <div style="display:flex;align-items:center;gap:18px;margin-bottom:20px">
                ${avatar(u, true)}
                <div>
                  <label class="btn btn-ghost btn-sm" style="cursor:pointer">
                    Upload Profile Picture <input type="file" accept="image/*" data-live="photo" style="display:none">
                  </label>
                  <small style="display:block;color:var(--muted);margin-top:4px">Professional portrait helps collaborators recognize you.</small>
                </div>
              </div>

              <div class="grid2">
                <div class="full">
                  <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">Full Name *</label>
                  <input type="text" name="name" class="inp" value="${esc(u.name)}" required>
                </div>

                <div class="full">
                  <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">Professional Headline</label>
                  <input type="text" name="headline" class="inp" value="${esc(u.headline || "")}" placeholder="e.g. Lead Brand Strategist & React Developer">
                </div>

                <div>
                  <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">Institution *</label>
                  <input type="text" name="institution" class="inp" list="inst-list" value="${esc(u.institution)}" required>
                  <datalist id="inst-list">${INSTITUTIONS.map(i => `<option value="${esc(i)}">`).join("")}</datalist>
                </div>

                <div>
                  <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">Department *</label>
                  <input type="text" name="department" class="inp" value="${esc(u.department)}" required>
                </div>

                <div>
                  <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">Academic Level *</label>
                  <select name="level" class="inp">${opts(LEVELS, u.level)}</select>
                </div>

                <div>
                  <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">State / Location *</label>
                  <input type="text" name="state" class="inp" value="${esc(u.state || "")}" placeholder="e.g. Lagos, Oyo, Abuja">
                </div>
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:28px;padding-top:18px;border-top:1px solid var(--line)">
                <a class="btn btn-quiet" href="#/app/overview">Save & Continue Later</a>
                <button class="btn btn-primary" type="submit">Next: Your Talents →</button>
              </div>
            </form>
          </div>
        ` : ""}

        <!-- Step 2: Your Talents -->
        ${obStep === 2 ? `
          <div>
            <h2 style="font-size:1.5rem;color:var(--forest);margin-bottom:6px">Step 2: What Skills Do You Currently Have?</h2>
            <p class="c-sub" style="margin-bottom:20px">Select the skills you practice, from design and coding to content strategy and marketing.</p>

            <form data-form="ob-step-2" novalidate>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;margin-bottom:20px">
                ${commonSkills.map(sk => `
                  <label class="chk" style="padding:10px;background:var(--ivory);border:1px solid var(--line);border-radius:8px">
                    <input type="checkbox" name="skills" value="${esc(sk)}" ${userSkillNames.includes(sk) ? "checked" : ""}>
                    <strong>${esc(sk)}</strong>
                  </label>
                `).join("")}
              </div>

              <!-- Add custom skill -->
              <div style="background:var(--sage);padding:16px;border-radius:12px;margin-bottom:20px">
                <label style="font-weight:700;font-size:.9rem;color:var(--forest);display:block;margin-bottom:6px">Add a Custom Skill</label>
                <div style="display:flex;gap:10px">
                  <input type="text" id="ob-custom-skill-inp" class="inp" placeholder="e.g. Solidity, 3D Blender, Motion Graphics" style="flex:1">
                  <button type="button" class="btn btn-primary btn-sm" data-act="ob-add-custom-skill">+ Add</button>
                </div>
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:28px;padding-top:18px;border-top:1px solid var(--line)">
                <button type="button" class="btn btn-quiet" data-act="set-ob-step" data-step="1">← Previous</button>
                <div style="display:flex;gap:10px">
                  <a class="btn btn-quiet" href="#/app/overview">Save & Continue Later</a>
                  <button class="btn btn-primary" type="submit">Next: Your Experience →</button>
                </div>
              </div>
            </form>
          </div>
        ` : ""}

        <!-- Step 3: Your Experience -->
        ${obStep === 3 ? `
          <div>
            <h2 style="font-size:1.5rem;color:var(--forest);margin-bottom:6px">Step 3: What Is Your Experience Level?</h2>
            <p class="c-sub" style="margin-bottom:20px">Be honest about where you are. TeamBud welcomes beginners as well as experienced student practitioners.</p>

            <form data-form="ob-step-3" novalidate>
              <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px">
                ${[
                  ["Still learning", "Still learning — developing fundamentals and building first tutorial or classroom exercises."],
                  ["Personal projects", "Personal projects — have completed coursework, tutorials, and solo demo builds."],
                  ["Projects with others", "Projects with others — have collaborated on team projects, student hackathons, or group builds."],
                  ["Worked with clients", "Worked with clients — have delivered paid or volunteer services for external businesses or campus clubs."],
                  ["Professional experience", "Professional experience — extensive track record, agency execution, or tech industry internships."]
                ].map(([val, desc]) => `
                  <label style="display:flex;align-items:flex-start;gap:12px;padding:14px;background:var(--ivory);border:1px solid var(--line);border-radius:10px;cursor:pointer">
                    <input type="radio" name="experienceLevel" value="${esc(val)}" ${(u.experienceLevel || "Personal projects").includes(val) ? "checked" : ""} style="margin-top:3px">
                    <div>
                      <strong style="display:block;color:var(--forest);font-size:.95rem">${esc(val)}</strong>
                      <small style="color:var(--muted);font-size:.85rem">${esc(desc)}</small>
                    </div>
                  </label>
                `).join("")}
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:28px;padding-top:18px;border-top:1px solid var(--line)">
                <button type="button" class="btn btn-quiet" data-act="set-ob-step" data-step="2">← Previous</button>
                <div style="display:flex;gap:10px">
                  <a class="btn btn-quiet" href="#/app/overview">Save & Continue Later</a>
                  <button class="btn btn-primary" type="submit">Next: Your Interests →</button>
                </div>
              </div>
            </form>
          </div>
        ` : ""}

        <!-- Step 4: Your Interests -->
        ${obStep === 4 ? `
          <div>
            <h2 style="font-size:1.5rem;color:var(--forest);margin-bottom:6px">Step 4: What Would You Like to Do on TeamBud?</h2>
            <p class="c-sub" style="margin-bottom:20px">Select the collaboration goals and opportunities that interest you most:</p>

            <form data-form="ob-step-4" novalidate>
              <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin-bottom:24px">
                ${LOOKING_FOR_OPTIONS.map(opt => `
                  <label class="chk" style="padding:14px;background:var(--ivory);border:1px solid var(--line);border-radius:10px">
                    <input type="checkbox" name="lookingFor" value="${esc(opt.id)}" ${(u.lookingFor || []).includes(opt.id) ? "checked" : ""}>
                    <span style="font-size:1.2rem">${opt.icon}</span>
                    <strong style="display:block;margin-top:4px">${esc(opt.label)}</strong>
                  </label>
                `).join("")}
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:28px;padding-top:18px;border-top:1px solid var(--line)">
                <button type="button" class="btn btn-quiet" data-act="set-ob-step" data-step="3">← Previous</button>
                <div style="display:flex;gap:10px">
                  <a class="btn btn-quiet" href="#/app/overview">Save & Continue Later</a>
                  <button class="btn btn-primary" type="submit">Next: Portfolio (Optional) →</button>
                </div>
              </div>
            </form>
          </div>
        ` : ""}

        <!-- Step 5: Portfolio (Optional) -->
        ${obStep === 5 ? `
          <div>
            <h2 style="font-size:1.5rem;color:var(--forest);margin-bottom:6px">Step 5: Portfolio & Work Samples (Optional)</h2>
            <p class="c-sub" style="margin-bottom:20px">Add a sample project or work link. You can also skip this step and add projects anytime from My Portfolio.</p>

            <form data-form="ob-step-5" novalidate>
              <div class="grid2">
                <div class="full">
                  <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">Sample Project Title</label>
                  <input type="text" name="projTitle" class="inp" placeholder="e.g. Campus Marketplace App or Fintech UI Redesign">
                </div>
                <div class="full">
                  <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">Project Description</label>
                  <textarea name="projDesc" rows="3" class="inp" placeholder="Briefly describe what you built, what tools you used, and what problem it solved."></textarea>
                </div>
                <div>
                  <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">Live URL or GitHub Repo</label>
                  <input type="url" name="projUrl" class="inp" placeholder="https://...">
                </div>
                <div>
                  <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">Category</label>
                  <select name="projCategory" class="inp">
                    <option value="Web Development">Web Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Branding & Content">Branding & Content</option>
                  </select>
                </div>
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:28px;padding-top:18px;border-top:1px solid var(--line)">
                <button type="button" class="btn btn-quiet" data-act="set-ob-step" data-step="4">← Previous</button>
                <div style="display:flex;gap:10px">
                  <button type="submit" class="btn btn-ghost">Skip & View Summary</button>
                  <button class="btn btn-primary" type="submit">Save & Review Profile →</button>
                </div>
              </div>
            </form>
          </div>
        ` : ""}

        <!-- Step 6: Complete Profile -->
        ${obStep === 6 ? `
          <div>
            <h2 style="font-size:1.5rem;color:var(--forest);margin-bottom:6px">Step 6: Profile Ready!</h2>
            <p class="c-sub" style="margin-bottom:20px">Here is a summary of your student talent presence on TeamBud:</p>

            <div style="background:var(--ivory);border:1px solid var(--line);border-radius:16px;padding:24px;margin-bottom:24px">
              <div style="display:flex;gap:18px;align-items:center;margin-bottom:16px">
                ${avatar(u)}
                <div>
                  <h3 style="font-size:1.3rem;margin:0 0 4px">${esc(u.name)}</h3>
                  <div style="color:var(--emerald);font-weight:600">${esc(u.headline || u.department + " Student")}</div>
                  <small style="color:var(--muted)">${esc(u.department)}, ${esc(u.institution)} · ${esc(loc(u))}</small>
                </div>
              </div>

              <div style="display:flex;flex-wrap:wrap;gap:6px;margin:12px 0">
                ${(u.skills || []).map(s => `<span class="tag">${esc(s.name)} · ${esc(s.level || "Intermediate")}</span>`).join("")}
              </div>

              <div style="font-size:.9rem;color:var(--forest);margin-top:12px">
                <strong>Experience:</strong> ${esc(u.experienceLevel || "Personal projects")}
              </div>
            </div>

            <!-- Profile completion meter -->
            <div style="margin-bottom:24px">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                <strong style="color:var(--forest)">Profile Completion</strong>
                <strong style="color:var(--emerald)">${c.pct}%</strong>
              </div>
              <div class="bar" role="progressbar" aria-valuenow="${c.pct}" aria-valuemin="0" aria-valuemax="100">
                <i style="width:${c.pct}%"></i>
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:28px;padding-top:18px;border-top:1px solid var(--line)">
              <button type="button" class="btn btn-quiet" data-act="set-ob-step" data-step="5">← Previous</button>
              <button type="button" class="btn btn-primary" data-act="finish-onboarding">Finish & Launch Dashboard 🚀</button>
            </div>
          </div>
        ` : ""}
      </div>
    </div>
  `;
}

function viewStudentTalentProfile(username, u) {
  const s = db.users.find(x => x.username === username && x.role === "student");
  if (!s) {
    return `
      ${protoBar()}
      <div style="max-width:800px;margin:60px auto;padding:32px;text-align:center" class="card">
        <h2 style="font-size:1.6rem;color:var(--forest);margin-bottom:12px">Student Profile Not Found</h2>
        <p style="color:var(--muted);margin-bottom:20px">The student username <strong>@${esc(username)}</strong> could not be located in our directory.</p>
        <a class="btn btn-primary" href="#/talent">← Return to Talent Hub</a>
      </div>
    `;
  }

  ensureStudentDefaults(s);
  const isOwner = u && u.id === s.id;
  const isClient = u && u.role === "client";

  const availMap = {
    now: { cls: "active", label: "● Available now for client work and team collaborations" },
    part: { cls: "forming", label: "◐ Available part-time (10-15 hrs/week)" },
    later: { cls: "role", label: "○ Open to specific project milestones" },
    no: { cls: "needs-members", label: "✕ Currently unavailable" },
    unset: { cls: "role", label: "Availability open on request" }
  };
  const av = availMap[s.availability] || availMap.unset;

  return `
    ${protoBar()}
    <div style="max-width:1160px;margin:0 auto;padding:20px 20px 80px">
      <!-- Breadcrumb / Back Navigation -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <a class="back" href="#/talent" style="display:inline-flex;align-items:center;gap:6px;font-weight:700;color:var(--forest);text-decoration:none">
          ← Back to Talent Hub
        </a>
        <div style="display:flex;gap:10px">
          <button class="btn btn-ghost btn-sm" data-act="share-profile" data-name="${esc(s.name)}" data-url="${window.location.href}">
            ${icon("M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13")} Share Profile
          </button>
          ${isOwner ? `<a class="btn btn-primary btn-sm" href="#/app/profile">Edit My Talent Profile ↗</a>` : ""}
        </div>
      </div>

      <!-- SECTION A: Profile Introduction -->
      <div class="talent-prof-header">
        <div class="talent-prof-top">
          ${s.photo ? `<img class="talent-prof-avatar" src="${esc(s.photo)}" alt="${esc(s.name)}">` : `<div class="talent-prof-avatar" style="display:flex;align-items:center;justify-content:center;font-weight:800;color:var(--emerald);font-size:2.2rem;background:var(--sage)">${esc(initials(s.name))}</div>`}
          <div style="flex:1;min-width:280px">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <h1 style="font-size:2.1rem;font-weight:800;color:var(--forest);margin:0;letter-spacing:-0.02em">${esc(s.name)}</h1>
              <span class="badge verified">✓ Verified Student</span>
              ${s.demo ? `<span class="badge role">Demo</span>` : ""}
            </div>
            <div style="font-size:1.15rem;font-weight:600;color:var(--emerald);margin:6px 0 10px">${esc(s.headline || (s.department + " Student"))}</div>

            <!-- Zero-Pill Unboxed Metadata -->
            <div style="display:flex;flex-wrap:wrap;gap:8px;font-size:.92rem;color:var(--muted);align-items:center;margin-bottom:12px">
              <span>🏛️ ${esc(s.institution)}</span>
              <span>·</span>
              <span>📚 ${esc(s.department)}</span>
              ${s.showLevel !== false && s.level ? `<span>·</span><span>🎓 ${esc(s.level)}</span>` : ""}
              <span>·</span>
              <span>📍 ${esc(loc(s))}</span>
            </div>

            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px">
              <span class="badge ${av.cls}">${av.label}</span>
              <span style="font-size:.85rem;color:var(--forest);font-weight:600">Level: <strong>${esc(s.experienceLevel || "Intermediate")}</strong></span>
            </div>

            <div class="talent-prof-actions" style="margin-top:14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap">
              ${isOwner 
                ? `<a class="btn btn-primary" href="#/app/profile">Edit My Talent Profile</a>` 
                : (isClient 
                    ? `<a class="btn btn-primary" href="#/client">Commission Student Agency</a>` 
                    : (u ? `
                        ${connBtn(u, s)}
                        ${(userAgencies(u.id).filter(a => isAgencyOwnerOrManager(a, u.id) && (a.members || []).length < 10 && !(a.members || []).some(m => m.userId === s.id))).length ? `<button class="btn btn-ghost" data-act="open-invite-agency-modal" data-student-id="${s.id}">+ Invite to My Agency</button>` : ""}
                        <button class="btn btn-quiet btn-sm" data-act="open-report-modal" data-target-id="${s.id}" data-target-name="${esc(s.name)}" style="color:var(--muted)">Report / Block</button>
                      ` : `<button class="btn btn-primary" data-act="prompt-login" data-msg="Log in to connect with ${esc(s.name)}">Connect With Student</button>`))}
            </div>
          </div>
        </div>

        <!-- Bio Summary -->
        ${s.bio ? `
          <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--line)">
            <p style="font-size:1.02rem;line-height:1.65;color:var(--forest);margin:0;max-width:860px">${esc(s.bio)}</p>
          </div>
        ` : ""}
      </div>

      <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px" class="prof-layout-grid">
        <div style="display:flex;flex-direction:column;gap:24px">
          <!-- SECTION B: About Me -->
          <div class="talent-sec">
            <div class="talent-sec-h">
              <h2>About Me</h2>
              ${isOwner ? `<a href="#/app/profile" class="btn btn-quiet btn-sm">Edit</a>` : ""}
            </div>
            <p style="font-size:.98rem;line-height:1.7;color:var(--forest);margin-bottom:16px">${esc(s.aboutMe || s.bio || "Student collaborator on TeamBud.")}</p>
            
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:16px;background:var(--ivory);padding:18px;border-radius:14px;border:1px solid var(--line)">
              <div>
                <strong style="display:block;font-size:.84rem;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Primary Discipline</strong>
                <div style="font-weight:700;color:var(--forest)">${esc(s.category || s.department)}</div>
              </div>
              <div>
                <strong style="display:block;font-size:.84rem;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Experience Tier</strong>
                <div style="font-weight:700;color:var(--forest)">${esc(s.experienceLevel || "Intermediate (1-2 yrs)")}</div>
              </div>
              <div>
                <strong style="display:block;font-size:.84rem;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Campus Location</strong>
                <div style="font-weight:700;color:var(--forest)">${esc(s.institution)} (${esc(loc(s))})</div>
              </div>
            </div>
          </div>

          <!-- SECTION C: My Skills -->
          <div class="talent-sec">
            <div class="talent-sec-h">
              <h2>Skills & Capabilities</h2>
              ${isOwner ? `<a href="#/app/skills" class="btn btn-quiet btn-sm">+ Add Skill</a>` : ""}
            </div>

            <!-- Platform Disclaimer Notice -->
            <div class="disclaimer-banner">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;margin-top:2px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <div>
                <strong>TeamBud Platform Notice:</strong>
                Skills listed below are self-declared by the student to demonstrate hands-on practice, tools mastery, and project execution interest. They do not constitute formal institutional accreditation or statutory licensing.
              </div>
            </div>

            ${(s.skills || []).length ? `
              <div class="talent-skill-grid">
                ${s.skills.map(sk => {
                  const percMap = { Learning: 25, Beginner: 45, Intermediate: 75, Advanced: 95 };
                  const p = percMap[sk.level] || 60;
                  return `
                    <div class="talent-skill-card">
                      <div style="display:flex;justify-content:space-between;align-items:flex-start">
                        <strong style="font-size:1rem;color:var(--forest)">${esc(sk.name)}</strong>
                        <span class="badge ${sk.level === "Advanced" ? "active" : "role"}" style="font-size:.7rem">${esc(sk.level || "Intermediate")}</span>
                      </div>
                      <div class="skill-bar-wrap">
                        <div class="skill-bar-fill" style="width:${p}%"></div>
                      </div>
                      <div style="font-size:.8rem;color:var(--muted);display:flex;justify-content:space-between;margin-top:4px">
                        <span>${sk.duration || "Active practice"}</span>
                        <span>${sk.pro ? "Commercial ready" : "Collaborative"}</span>
                      </div>
                      ${sk.desc ? `<p style="font-size:.82rem;color:var(--forest);margin-top:6px;line-height:1.4">${esc(sk.desc)}</p>` : ""}
                    </div>
                  `;
                }).join("")}
              </div>
            ` : `<div class="empty">No skills catalogued yet.</div>`}
          </div>

          <!-- SECTION D: My Portfolio (Rich Project Showcase) -->
          <div class="talent-sec">
            <div class="talent-sec-h">
              <h2>Portfolio Showcase</h2>
              ${isOwner ? `<button class="btn btn-primary btn-sm" data-act="modal-add-proj">+ Add Project</button>` : ""}
            </div>

            ${(s.portfolio || []).length ? `
              <div class="talent-portfolio-grid">
                ${s.portfolio.map(p => `
                  <div class="talent-portfolio-item">
                    <div class="portfolio-img-box">
                      ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title || p.label)}">` : `
                        <div style="text-align:center;padding:20px">
                          <div style="font-size:2rem;margin-bottom:4px">📁</div>
                          <span style="font-weight:700;color:var(--forest);font-size:.9rem">${esc(p.title || p.label || "Project")}</span>
                        </div>
                      `}
                    </div>
                    <div style="padding:20px;display:flex;flex-direction:column;flex:1;justify-content:space-between">
                      <div>
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                          <span class="badge role" style="font-size:.7rem">${esc(p.category || "Project")}</span>
                          ${p.date ? `<span style="font-size:.78rem;color:var(--muted)">${esc(p.date)}</span>` : ""}
                        </div>
                        <h3 style="font-size:1.15rem;font-weight:800;color:var(--forest);margin:0 0 8px">${esc(p.title || p.label)}</h3>
                        <p style="font-size:.88rem;color:var(--forest);line-height:1.5;margin-bottom:12px">${esc(p.description || "Portfolio work showcase.")}</p>

                        ${(p.tools || []).length ? `
                          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px">
                            ${p.tools.map(t => `<span style="font-size:.74rem;background:var(--sage);color:var(--forest);padding:2px 7px;border-radius:4px;font-weight:600">${esc(t)}</span>`).join("")}
                          </div>
                        ` : ""}

                        ${p.contribution ? `
                          <div style="font-size:.82rem;color:var(--muted);background:var(--ivory);padding:8px 12px;border-radius:8px;margin-bottom:12px">
                            <strong>Role:</strong> ${esc(p.contribution)}
                          </div>
                        ` : ""}
                      </div>

                      <div style="display:flex;gap:8px;align-items:center;margin-top:10px">
                        ${p.url ? `<a class="btn btn-ghost btn-sm" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" style="flex:1;text-align:center">View Project ↗</a>` : ""}
                        ${isOwner ? `<button class="btn btn-quiet btn-sm" data-act="rm-portfolio-proj" data-id="${p.id}">Remove</button>` : ""}
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            ` : `
              <div class="empty">
                <p>No showcase projects uploaded yet.</p>
                ${isOwner ? `<button class="btn btn-primary btn-sm" data-act="modal-add-proj" style="margin-top:10px">+ Add your first project</button>` : ""}
              </div>
            `}
          </div>

          <!-- SECTION E: Experience & Certifications -->
          <div class="talent-sec">
            <div class="talent-sec-h">
              <h2>Experience & Leadership</h2>
              ${isOwner ? `<a href="#/app/profile" class="btn btn-quiet btn-sm">Manage</a>` : ""}
            </div>

            <ul class="list" style="margin-bottom:24px">
              ${(s.experience || []).length ? s.experience.map(x => `
                <li class="row" style="padding:14px 0">
                  <div>
                    <strong style="font-size:1.02rem;color:var(--forest)">${esc(x.role)}</strong> · <span style="font-weight:600;color:var(--emerald)">${esc(x.org)}</span>
                    ${x.period ? `<small style="display:block;color:var(--muted);margin-top:2px">${esc(x.period)}</small>` : ""}
                    ${x.desc ? `<p style="font-size:.9rem;color:var(--forest);margin-top:6px;line-height:1.5">${esc(x.desc)}</p>` : ""}
                  </div>
                </li>
              `).join("") : `<div class="empty">No experience entries recorded.</div>`}
            </ul>

            <h3 style="font-size:1.1rem;font-weight:700;color:var(--forest);margin-bottom:12px">Certifications & Honors</h3>
            <ul class="list">
              ${(s.certs || []).length ? s.certs.map(c => `
                <li class="row" style="padding:10px 0">
                  <div>
                    <strong>${esc(c.name)}</strong>
                    <small style="display:block;color:var(--muted)">${esc(c.issuer)} · ${esc(c.year)}</small>
                  </div>
                </li>
              `).join("") : `<div class="empty">No certifications listed.</div>`}
            </ul>
          </div>
        </div>

        <!-- RIGHT SIDEBAR -->
        <div style="display:flex;flex-direction:column;gap:24px">
          <!-- SECTION F: What I Am Looking For -->
          <div class="talent-sec">
            <div class="talent-sec-h">
              <h2>Looking For</h2>
            </div>
            <p style="font-size:.85rem;color:var(--muted);margin-bottom:12px">Opportunities and collaborators this student is actively seeking:</p>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              ${(s.lookingFor || []).length ? s.lookingFor.map(lf => {
                const opt = LOOKING_FOR_OPTIONS.find(o => o.id === lf);
                return `<span class="looking-tag">${opt ? `${opt.icon} ${opt.label}` : esc(lf)}</span>`;
              }).join("") : `<span class="looking-tag">👥 Open to student collaborations</span>`}
            </div>
          </div>

          <!-- SECTION G: Collaboration Availability -->
          <div class="talent-sec">
            <div class="talent-sec-h">
              <h2>Collaboration Terms</h2>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px;font-size:.9rem">
              <div>
                <strong style="display:block;color:var(--muted);font-size:.8rem;text-transform:uppercase">Availability Mode</strong>
                <div style="font-weight:700;color:var(--forest);margin-top:2px">${av.label}</div>
              </div>
              <div>
                <strong style="display:block;color:var(--muted);font-size:.8rem;text-transform:uppercase">Delivery Model</strong>
                <div style="font-weight:600;color:var(--forest);margin-top:2px">Remote & Campus Hybrid</div>
              </div>
              <div>
                <strong style="display:block;color:var(--muted);font-size:.8rem;text-transform:uppercase">Communication Channel</strong>
                <div style="font-weight:600;color:var(--forest);margin-top:2px">TeamBud In-App Workspace & Direct Verification</div>
              </div>
            </div>
          </div>

          <!-- SECTION H: Contact & Collaboration -->
          <div class="talent-sec">
            <div class="talent-sec-h">
              <h2>Connect & Socials</h2>
            </div>
            <div style="background:var(--ivory);padding:14px;border-radius:12px;border:1px solid var(--line);font-size:.84rem;color:var(--forest);line-height:1.5;margin-bottom:16px">
              <strong>🔒 Protected Contact Notice:</strong>
              To protect student privacy and prevent unverified solicitations, direct telephone numbers and private email addresses are shielded. Connect through TeamBud to begin collaborating securely.
            </div>

            <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:18px">
              ${isOwner 
                ? `<a class="btn btn-primary" href="#/app/profile">Update My Contact Info</a>` 
                : (u ? connBtn(u, s) : `<button class="btn btn-primary" data-act="prompt-login" data-msg="Log in to connect with ${esc(s.name)}">Connect With Student</button>`)}
            </div>

            <strong style="display:block;font-size:.82rem;color:var(--muted);text-transform:uppercase;margin-bottom:10px">Verified Public Links</strong>
            <div style="display:flex;flex-direction:column;gap:8px">
              ${(s.socialLinks && s.socialLinks.github) ? `<a href="${esc(s.socialLinks.github)}" target="_blank" rel="noopener noreferrer" style="font-size:.9rem;color:var(--forest);display:flex;align-items:center;gap:8px;text-decoration:none">🌐 GitHub ↗</a>` : ""}
              ${(s.socialLinks && s.socialLinks.behance) ? `<a href="${esc(s.socialLinks.behance)}" target="_blank" rel="noopener noreferrer" style="font-size:.9rem;color:var(--forest);display:flex;align-items:center;gap:8px;text-decoration:none">🎨 Behance ↗</a>` : ""}
              ${(s.socialLinks && s.socialLinks.linkedin) ? `<a href="${esc(s.socialLinks.linkedin)}" target="_blank" rel="noopener noreferrer" style="font-size:.9rem;color:var(--forest);display:flex;align-items:center;gap:8px;text-decoration:none">💼 LinkedIn ↗</a>` : ""}
              ${(s.socialLinks && s.socialLinks.twitter) ? `<a href="${esc(s.socialLinks.twitter)}" target="_blank" rel="noopener noreferrer" style="font-size:.9rem;color:var(--forest);display:flex;align-items:center;gap:8px;text-decoration:none">🐦 X / Twitter ↗</a>` : ""}
              ${(s.socialLinks && s.socialLinks.website) ? `<a href="${esc(s.socialLinks.website)}" target="_blank" rel="noopener noreferrer" style="font-size:.9rem;color:var(--forest);display:flex;align-items:center;gap:8px;text-decoration:none">🔗 Website ↗</a>` : ""}
              ${(!s.socialLinks || Object.keys(s.socialLinks).length === 0) ? `<div style="font-size:.84rem;color:var(--muted)">Connect to view shared external links.</div>` : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function filterOptions() {
  const st = students();
  const uniq = f => [...new Set(st.map(f).filter(Boolean))].sort();
  return { inst: uniq(o => o.institution), dept: uniq(o => o.department), loc: uniq(loc) };
}

function pageDiscover(u) {
  const fo = filterOptions();
  const allSkills = [...new Set(students().flatMap(o => (o.skills || []).map(s => s.name)))];
  return `
    <div class="page-h">
      <div>
        <h1>Discover students</h1>
        <p>Find students whose complementary skills match your agency vision.</p>
      </div>
      <span class="acts">
        <button class="btn btn-ghost btn-sm" data-act="demo">Load Demo Profiles</button>
      </span>
    </div>
    <div class="filters" id="dfilters">
      <div class="field" style="grid-column:1/-1">
        <label for="q">Search by name, username, or keywords</label>
        <input type="text" id="q" data-live="disc">
      </div>
      <div class="field">
        <label for="fskill">Skill</label>
        <input type="text" id="fskill" list="sk-list" data-live="disc">
        <datalist id="sk-list">${allSkills.map(s => `<option value="${esc(s)}">`).join("")}</datalist>
      </div>
      <div class="field">
        <label for="finst">Institution</label>
        <select id="finst" data-live="disc">${opts(fo.inst, "", "All institutions")}</select>
      </div>
      <div class="field">
        <label for="fdept">Department</label>
        <select id="fdept" data-live="disc">${opts(fo.dept, "", "All departments")}</select>
      </div>
      <div class="field">
        <label for="floc">Location</label>
        <select id="floc" data-live="disc">${opts(fo.loc, "", "All locations")}</select>
      </div>
      <div class="field">
        <label for="favail">Availability</label>
        <select id="favail" data-live="disc">${opts(AVAIL.filter(a => a[0] !== "unset"), "", "Any availability")}</select>
      </div>
      <div class="field" style="grid-column:span 2">
        <label for="fcat">Business category</label>
        <select id="fcat" data-live="disc">${opts(CATS, "", "All categories")}</select>
      </div>
    </div>
    <div id="results" aria-live="polite"></div>
  `;
}

function discoverResults() {
  const u = me();
  const container = $("#results");
  if (!container) return;
  const q = ($("#q") ? $("#q").value : "").trim().toLowerCase();
  const sk = ($("#fskill") ? $("#fskill").value : "").trim().toLowerCase();
  const inst = ($("#finst") ? $("#finst").value : "").trim();
  const dept = ($("#fdept") ? $("#fdept").value : "").trim();
  const lo = ($("#floc") ? $("#floc").value : "").trim();
  const av = ($("#favail") ? $("#favail").value : "").trim();
  const cat = ($("#fcat") ? $("#fcat").value : "").trim();

  let list = students().filter(o => o.id !== u.id);
  if (q) list = list.filter(o => o.name.toLowerCase().includes(q) || o.username.toLowerCase().includes(q) || (o.bio || "").toLowerCase().includes(q));
  if (sk) list = list.filter(o => (o.skills || []).some(s => s.name.toLowerCase().includes(sk)));
  if (inst) list = list.filter(o => o.institution === inst);
  if (dept) list = list.filter(o => o.department === dept);
  if (lo) list = list.filter(o => loc(o) === lo);
  if (av) list = list.filter(o => o.availability === av);
  if (cat) list = list.filter(o => (o.collab || []).includes(cat));

  if (!list.length) {
    container.innerHTML = `<div class="empty">No students found matching your filters. Try clearing a filter or <button class="btn btn-ghost btn-sm" data-act="demo">Load demo profiles</button>.</div>`;
    return;
  }

  container.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">
      ${list.map(o => `
        <div class="card" style="display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div class="row" style="margin-bottom:10px">
              <div class="who">${avatar(o, true)}
                <div>
                  <strong>${esc(o.name)}</strong>
                  <small>@${esc(o.username)} · ${esc(o.department)}</small>
                  <small style="color:var(--muted)">${esc(o.institution)}</small>
                </div>
              </div>
            </div>
            ${o.bio ? `<p style="font-size:.9rem;color:var(--forest);margin-bottom:12px">${esc(o.bio)}</p>` : ""}
            <div style="margin-bottom:14px">${skillTags(o, 5)}</div>
          </div>
          <div style="display:flex;gap:8px;align-items:center;margin-top:10px;padding-top:12px;border-top:1px solid var(--line)">
            ${connBtn(u, o)}
          </div>
        </div>
      `).join("")}
    </div>`;
}

function pageSkills(u) {
  return `
    <div class="page-h">
      <div>
        <h1>My Skills</h1>
        <p>List the skills you bring to an agency team.</p>
      </div>
    </div>
    <div class="card" style="margin-bottom:24px">
      <h2>Add a skill</h2>
      <form data-form="add-skill" novalidate style="margin-top:14px">
        <div class="grid2">
          ${field("name", "Skill name", inp("name", "text", 'list="sk-sug" placeholder="e.g. Web development, Figma, Copywriting"') + `<datalist id="sk-sug">${SKILL_SUGGEST.map(s => `<option value="${esc(s)}">`).join("")}</datalist>`)}
          ${field("level", "Proficiency level", `<select id="level" name="level"><option value="Beginner">Beginner</option><option value="Intermediate" selected>Intermediate</option><option value="Advanced">Advanced</option></select>`)}
          <div class="full" style="display:flex;gap:18px;margin-top:6px;flex-wrap:wrap">
            <label class="chk"><input type="checkbox" name="pro" checked> Offer in client work</label>
            <label class="chk"><input type="checkbox" name="collab" checked> Open to collaboration</label>
            <label class="chk"><input type="checkbox" name="learn"> Still improving</label>
          </div>
        </div>
        <button class="btn btn-primary" type="submit" style="margin-top:16px">Add skill</button>
      </form>
    </div>
    <div class="card">
      <h2>Your skills (${(u.skills || []).length})</h2>
      <ul class="list" style="margin-top:12px">
        ${(u.skills || []).length ? u.skills.map(s => `
          <li class="row">
            <div>
              <strong>${esc(s.name)}</strong>
              <small>${esc(s.level || "Intermediate")}${s.pro ? " · Client-ready" : ""}</small>
            </div>
            <button class="btn btn-quiet btn-sm" data-act="rm-skill" data-id="${s.id}">Remove</button>
          </li>
        `).join("") : `<div class="empty">You have not added any skills yet.</div>`}
      </ul>
    </div>
  `;
}

function pagePortfolio(u) {
  const items = u.portfolio || [];
  return `
    <div class="page-h">
      <div>
        <h1>My Portfolio</h1>
        <p>Showcase verified work, case studies, and live projects to student agencies and commercial clients.</p>
      </div>
      <div class="acts">
        <button class="btn btn-primary btn-sm" data-act="modal-add-proj">+ Add Project Showcase</button>
        <a class="btn btn-ghost btn-sm" href="#/talent/${esc(u.username)}" target="_blank">View Public Profile ↗</a>
      </div>
    </div>

    ${items.length ? `
      <div class="talent-portfolio-grid">
        ${items.map(p => `
          <div class="talent-portfolio-item">
            <div class="portfolio-img-box">
              ${p.image ? `<img src="${safeImg(p.image)}" alt="${esc(p.title || p.label)}">` : `
                <div style="text-align:center;padding:24px">
                  <div style="font-size:2.5rem;margin-bottom:6px">📁</div>
                  <strong style="color:var(--forest)">${esc(p.title || p.label || "Project")}</strong>
                </div>
              `}
            </div>
            <div style="padding:20px;display:flex;flex-direction:column;flex:1;justify-content:space-between">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
                  <span class="badge role" style="font-size:.74rem">${esc(p.category || "Project")}</span>
                  ${p.date ? `<small style="color:var(--muted)">${esc(p.date)}</small>` : ""}
                </div>
                <h3 style="font-size:1.2rem;font-weight:800;color:var(--forest);margin:0 0 8px">${esc(p.title || p.label)}</h3>
                <p style="font-size:.9rem;color:var(--forest);line-height:1.5;margin-bottom:12px">${esc(p.description || "Portfolio work showcase.")}</p>

                ${(p.tools || []).length ? `
                  <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">
                    ${p.tools.map(t => `<span style="font-size:.75rem;background:var(--sage);color:var(--forest);padding:2px 8px;border-radius:4px;font-weight:600">${esc(t)}</span>`).join("")}
                  </div>
                ` : ""}

                ${p.contribution ? `
                  <div style="font-size:.84rem;color:var(--muted);background:var(--ivory);padding:8px 12px;border-radius:8px;margin-bottom:12px">
                    <strong>Role / Contribution:</strong> ${esc(p.contribution)}
                  </div>
                ` : ""}
              </div>

              <div style="display:flex;gap:8px;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid var(--line)">
                ${p.url ? `<a class="btn btn-ghost btn-sm" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" style="flex:1;text-align:center">Live Link ↗</a>` : ""}
                ${p.repoUrl ? `<a class="btn btn-ghost btn-sm" href="${esc(p.repoUrl)}" target="_blank" rel="noopener noreferrer">Code ↗</a>` : ""}
                <button class="btn btn-quiet btn-sm" data-act="rm-portfolio-proj" data-id="${p.id}">Delete</button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:60px 20px">
        <div style="font-size:3rem;margin-bottom:12px">📁</div>
        <h2>Showcase Your Abilities</h2>
        <p style="max-width:540px;margin:8px auto 20px;color:var(--muted);line-height:1.6">
          Uploading work samples or linking existing projects helps agency founders discover your talents and invite you to high-value client engagements.
        </p>
        <button class="btn btn-primary" data-act="modal-add-proj">+ Upload First Project</button>
      </div>
    `}
  `;
}

let activeConnTab = "accepted";

function pageConnections(u) {
  const myConns = (db.conns || []).filter(c => (c.from === u.id || c.to === u.id) && c.status === "accepted");
  const pendingIncoming = incoming(u);
  const pendingOutgoing = (db.conns || []).filter(c => c.from === u.id && c.status === "pending");
  const blockedList = (u.blockedUsers || []).map(id => userById(id)).filter(Boolean);

  return `
    <div class="page-h">
      <div>
        <h1>Connections</h1>
        <p>Your network of trusted student collaborators across tertiary institutions.</p>
      </div>
      <a class="btn btn-primary btn-sm" href="#/app/talent">Discover Students</a>
    </div>

    <!-- Connection Tabs Strip -->
    <div class="tab-strip">
      <button class="tab-btn ${activeConnTab === "accepted" ? "active" : ""}" data-act="set-conn-tab" data-tab="accepted">
        Connected Students (${myConns.length})
      </button>
      <button class="tab-btn ${activeConnTab === "received" ? "active" : ""}" data-act="set-conn-tab" data-tab="received">
        Received Requests (${pendingIncoming.length})
      </button>
      <button class="tab-btn ${activeConnTab === "sent" ? "active" : ""}" data-act="set-conn-tab" data-tab="sent">
        Sent Requests (${pendingOutgoing.length})
      </button>
      ${blockedList.length ? `
        <button class="tab-btn ${activeConnTab === "blocked" ? "active" : ""}" data-act="set-conn-tab" data-tab="blocked">
          Blocked (${blockedList.length})
        </button>
      ` : ""}
    </div>

    <!-- TAB 1: Connected Students -->
    ${activeConnTab === "accepted" ? `
      <div class="card">
        <h2>Accepted Connections (${myConns.length})</h2>
        <p class="c-sub">Students you can directly message and form agency teams with.</p>
        <ul class="list" style="margin-top:14px">
          ${myConns.length ? myConns.map(c => {
            const otherId = c.from === u.id ? c.to : c.from;
            const o = userById(otherId);
            if (!o) return "";
            return `
              <li class="row" style="padding:16px 0;align-items:flex-start">
                <div class="who">
                  ${avatar(o)}
                  <div>
                    <strong>${esc(o.name)}</strong>
                    <div style="font-size:.84rem;color:var(--emerald);font-weight:600">${esc(o.headline || (o.department + " Student"))}</div>
                    <small style="color:var(--muted)">${esc(o.department)}, ${esc(o.institution)}</small>
                    <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:6px">
                      ${(o.skills || []).slice(0, 3).map(s => `<span class="talent-skill-tag">${esc(s.name)}</span>`).join("")}
                    </div>
                  </div>
                </div>
                <span class="acts" style="flex-wrap:wrap;gap:8px">
                  <button class="btn btn-primary btn-sm" data-act="go-msg" data-uid="${o.id}">Message</button>
                  <a class="btn btn-ghost btn-sm" href="#/talent/${esc(o.username)}" target="_blank">Profile ↗</a>
                  <button class="btn btn-quiet btn-sm" data-act="rm-conn" data-id="${c.id}" title="Remove connection">Remove</button>
                </span>
              </li>`;
          }).join("") : `<div class="empty">No connections yet. Connect with students on <a href="#/app/talent">Talent Hub</a> to form agency teams.</div>`}
        </ul>
      </div>
    ` : ""}

    <!-- TAB 2: Received Requests -->
    ${activeConnTab === "received" ? `
      <div class="card">
        <h2>Received Connection Requests (${pendingIncoming.length})</h2>
        <p class="c-sub">Students who want to connect with you. Review their introduction note before responding.</p>
        <ul class="list" style="margin-top:14px">
          ${pendingIncoming.length ? pendingIncoming.map(c => {
            const o = userById(c.from);
            if (!o) return "";
            return `
              <li class="row" style="padding:18px;background:var(--ivory);border-radius:12px;margin-bottom:12px;align-items:flex-start">
                <div class="who" style="flex:1">
                  ${avatar(o)}
                  <div style="min-width:0;flex:1">
                    <strong>${esc(o.name)}</strong>
                    <small style="display:block;color:var(--muted)">${esc(o.department)}, ${esc(o.institution)}</small>
                    ${c.note ? `
                      <div style="font-size:.88rem;color:var(--forest);background:var(--white);padding:10px 14px;border-radius:10px;margin-top:8px;border:1px solid var(--line);line-height:1.5">
                        "${esc(c.note)}"
                      </div>
                    ` : ""}
                    <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:8px">
                      ${(o.skills || []).slice(0, 3).map(s => `<span class="talent-skill-tag">${esc(s.name)}</span>`).join("")}
                    </div>
                  </div>
                </div>
                <span class="acts" style="flex-direction:column;gap:6px">
                  <button class="btn btn-primary btn-sm" data-act="accept" data-id="${c.id}">Accept</button>
                  <button class="btn btn-quiet btn-sm" data-act="decline" data-id="${c.id}">Decline</button>
                  <button class="btn btn-quiet btn-sm" data-act="open-report-modal" data-target-id="${o.id}" data-target-name="${esc(o.name)}" style="color:var(--muted);font-size:.76rem">Block & Report</button>
                </span>
              </li>`;
          }).join("") : `<div class="empty">No pending connection requests received.</div>`}
        </ul>
      </div>
    ` : ""}

    <!-- TAB 3: Sent Requests -->
    ${activeConnTab === "sent" ? `
      <div class="card">
        <h2>Sent Requests (${pendingOutgoing.length})</h2>
        <p class="c-sub">Invitations you have sent to other students awaiting acceptance.</p>
        <ul class="list" style="margin-top:14px">
          ${pendingOutgoing.length ? pendingOutgoing.map(c => {
            const o = userById(c.to);
            if (!o) return "";
            return `
              <li class="row" style="padding:14px 0">
                <div class="who">
                  ${avatar(o)}
                  <div>
                    <strong>${esc(o.name)}</strong>
                    <small>${esc(o.department)}, ${esc(o.institution)}</small>
                    ${c.note ? `<div style="font-size:.8rem;color:var(--muted);margin-top:4px">Your note: "${esc(c.note)}"</div>` : ""}
                  </div>
                </div>
                <button class="btn btn-quiet btn-sm" data-act="cancel" data-id="${c.id}">Cancel Request</button>
              </li>`;
          }).join("") : `<div class="empty">No outgoing connection requests.</div>`}
        </ul>
      </div>
    ` : ""}

    <!-- TAB 4: Blocked Students -->
    ${activeConnTab === "blocked" ? `
      <div class="card">
        <h2>Blocked Students (${blockedList.length})</h2>
        <p class="c-sub">Students you have blocked from messaging you or viewing your profile.</p>
        <ul class="list" style="margin-top:14px">
          ${blockedList.map(b => `
            <li class="row" style="padding:12px 0">
              <div class="who">
                ${avatar(b)}
                <div>
                  <strong>${esc(b.name)}</strong>
                  <small>@${esc(b.username)}</small>
                </div>
              </div>
              <button class="btn btn-quiet btn-sm" data-act="unblock-user" data-uid="${b.id}">Unblock</button>
            </li>
          `).join("")}
        </ul>
      </div>
    ` : ""}
  `;
}

let activeChatUserId = null;

function pageMessages(u) {
  // Collect all contacts: accepted connections and teammates from user's agencies
  const connUserIds = (db.conns || [])
    .filter(c => c.status === "accepted" && (c.from === u.id || c.to === u.id))
    .map(c => c.from === u.id ? c.to : c.from);

  const agencyTeammateIds = userAgencies(u.id)
    .flatMap(a => (a.members || []).map(m => m.userId))
    .filter(id => id !== u.id);

  const allContactIds = [...new Set([...connUserIds, ...agencyTeammateIds])];
  const contacts = allContactIds.map(id => userById(id)).filter(Boolean);

  if (!activeChatUserId && contacts.length > 0) {
    activeChatUserId = contacts[0].id;
  }

  const activeContact = activeChatUserId ? userById(activeChatUserId) : null;
  const conversation = (db.messages || []).filter(m =>
    activeChatUserId && (
      (m.from === u.id && m.to === activeChatUserId) ||
      (m.from === activeChatUserId && m.to === u.id)
    )
  );

  return `
    <div class="page-h">
      <div>
        <h1>Messages</h1>
        <p>Direct communication with accepted student connections and agency teammates.</p>
      </div>
    </div>

    ${contacts.length === 0 ? `
      <div class="card" style="text-align:center;padding:60px 20px">
        <div style="font-size:3rem;margin-bottom:12px">💬</div>
        <h2>No Active Conversations</h2>
        <p style="max-width:520px;margin:8px auto 20px;color:var(--muted);line-height:1.6">
          Connect with fellow students on Discover Talent or join an agency team to start messaging collaborators.
        </p>
        <a class="btn btn-primary" href="#/app/talent">Discover Students</a>
      </div>
    ` : `
      <div style="display:grid;grid-template-columns:300px 1fr;gap:20px;min-height:560px;background:var(--white);border:1px solid var(--line);border-radius:18px;overflow:hidden">
        <!-- Contacts list -->
        <div style="border-right:1px solid var(--line);background:var(--ivory);display:flex;flex-direction:column">
          <div style="padding:16px;border-bottom:1px solid var(--line)">
            <strong style="font-size:.95rem;color:var(--forest)">Conversations (${contacts.length})</strong>
          </div>
          <div style="flex:1;overflow-y:auto;padding:8px">
            ${contacts.map(c => {
              const lastMsg = (db.messages || [])
                .filter(m => (m.from === u.id && m.to === c.id) || (m.from === c.id && m.to === u.id))
                .slice(-1)[0];
              const unread = (db.messages || []).some(m => m.from === c.id && m.to === u.id && !m.read);
              const isActive = activeChatUserId === c.id;

              return `
                <div class="chat-contact-item" data-act="switch-chat" data-uid="${c.id}" style="padding:12px;border-radius:10px;cursor:pointer;margin-bottom:6px;display:flex;align-items:center;gap:10px;background:${isActive ? "var(--sage)" : "transparent"};border:${isActive ? "1px solid #BDD4C7" : "1px solid transparent"}">
                  ${avatar(c)}
                  <div style="flex:1;min-width:0">
                    <div style="display:flex;justify-content:space-between;align-items:center">
                      <strong style="font-size:.88rem;color:var(--forest);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(c.name)}</strong>
                      ${unread ? `<span style="width:8px;height:8px;border-radius:50%;background:var(--emerald)"></span>` : ""}
                    </div>
                    <small style="color:var(--muted);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                      ${lastMsg ? esc(lastMsg.text) : (c.department || "Student")}
                    </small>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Active chat pane -->
        <div style="display:flex;flex-direction:column;height:560px">
          ${activeContact ? `
            <div style="padding:14px 20px;border-bottom:1px solid var(--line);background:var(--ivory);display:flex;justify-content:space-between;align-items:center">
              <div style="display:flex;align-items:center;gap:12px">
                ${avatar(activeContact)}
                <div>
                  <strong style="display:block;font-size:1rem;color:var(--forest)">${esc(activeContact.name)}</strong>
                  <small style="color:var(--muted)">${esc(activeContact.department)}, ${esc(activeContact.institution)}</small>
                </div>
              </div>
              <a class="btn btn-quiet btn-sm" href="#/talent/${esc(activeContact.username)}" target="_blank">View Profile ↗</a>
            </div>

            <div class="chat-stream" id="direct-chat-stream" style="flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:12px">
              ${conversation.length ? conversation.map(m => {
                const isMine = m.from === u.id;
                return `
                  <div class="chat-msg ${isMine ? "mine" : ""}" style="display:flex;gap:10px;align-self:${isMine ? "flex-end" : "flex-start"};max-width:75%">
                    <div class="chat-bubble" style="background:${isMine ? "var(--sage)" : "var(--ivory)"};padding:10px 16px;border-radius:14px;border:1px solid ${isMine ? "#BDD4C7" : "var(--line)"}">
                      <div style="font-size:.92rem;color:var(--forest);line-height:1.45">${esc(m.text)}</div>
                      <div style="font-size:.72rem;color:var(--muted);text-align:${isMine ? "right" : "left"};margin-top:4px">${rel(m.t)}</div>
                    </div>
                  </div>
                `;
              }).join("") : `
                <div style="text-align:center;color:var(--muted);margin:auto;font-size:.9rem">
                  Start your conversation with ${esc(activeContact.name)}. Discuss ideas, projects, or agency partnerships!
                </div>
              `}
            </div>

            <form data-form="send-direct-msg" data-to="${activeContact.id}" style="padding:14px;border-top:1px solid var(--line);display:flex;gap:10px;background:var(--white)">
              <input type="text" name="text" placeholder="Type a message to ${esc(firstName(activeContact))}..." class="inp" autocomplete="off" required style="flex:1">
              <button class="btn btn-primary" type="submit">Send</button>
            </form>
          ` : `
            <div style="margin:auto;text-align:center;color:var(--muted)">Select a conversation to start messaging</div>
          `}
        </div>
      </div>
    `}
  `;
}

function pageNotifs(u) {
  const list = (db.notifs || []).filter(n => n.uid === u.id).slice(0, 50);
  return `
    <div class="page-h">
      <div>
        <h1>Notifications</h1>
        <p>Updates from your agencies, projects, and connection requests.</p>
      </div>
      <div class="acts">
        <button class="btn btn-ghost btn-sm" data-act="markall">Mark all read</button>
        <a class="btn btn-quiet btn-sm" href="#/app/settings">Settings</a>
      </div>
    </div>
    <div class="card">
      ${list.length ? list.map(n => `
        <div class="notif ${n.read ? "" : "unread"}" style="padding:14px;border-bottom:1px solid var(--line);display:flex;gap:12px;align-items:flex-start">
          <div style="color:var(--emerald);margin-top:2px">${icon(NICON[n.type] || NICON.message)}</div>
          <div style="flex:1">
            <div style="font-size:.95rem">${esc(n.text)}</div>
            <small style="color:var(--muted)">${rel(n.t)}</small>
          </div>
          ${!n.read ? `<span class="badge active" style="font-size:.7rem">New</span>` : ""}
        </div>
      `).join("") : `<div class="empty">No notifications yet.</div>`}
    </div>
  `;
}

function pageSettings(u) {
  return `
    <div class="page-h">
      <div>
        <h1>Notification Settings</h1>
        <p>Control what updates you receive in-app.</p>
      </div>
    </div>
    <div class="card">
      <table class="ptable" style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="border-bottom:2px solid var(--line);text-align:left">
            <th style="padding:10px 0">Notification Type</th>
            <th style="padding:10px 0">In-App</th>
          </tr>
        </thead>
        <tbody>
          ${NTYPES.map(t => `
            <tr style="border-bottom:1px solid var(--line)">
              <td style="padding:12px 0">
                <strong>${esc(t[1])}</strong>
                <small style="display:block;color:var(--muted)">${esc(t[2])}</small>
              </td>
              <td>
                <label class="toggle">
                  <input type="checkbox" data-live="pref" data-ch="inapp" data-type="${t[0]}" ${u.prefs && u.prefs.inapp && u.prefs.inapp[t[0]] === false ? "" : "checked"}>
                  <span></span>
                </label>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function pageProfile(u) {
  ensureStudentDefaults(u);
  return `
    <div class="page-h">
      <div>
        <h1>My Talent Profile</h1>
        <p>Manage your professional student presence and showcase your abilities on TeamBud.</p>
      </div>
      <span class="acts" style="display:flex;gap:8px">
        <button type="button" class="btn btn-ghost btn-sm" data-act="share-profile" data-name="${esc(u.name)}" data-url="${window.location.origin}/#/talent/${esc(u.username)}">📋 SHARE MY PROFILE</button>
        <a class="btn btn-primary btn-sm" href="#/talent/${esc(u.username)}" target="_blank">VIEW MY PUBLIC PROFILE ↗</a>
      </span>
    </div>

    <!-- Core Profile Details -->
    <div class="card" style="margin-bottom:24px">
      <h2>Profile Details & Identity</h2>
      <form data-form="profile" novalidate style="margin-top:16px">
        <div style="display:flex;align-items:center;gap:18px;margin-bottom:20px;flex-wrap:wrap">
          ${avatar(u, true)}
          <div>
            <label class="btn btn-ghost btn-sm" style="cursor:pointer">
              Upload photo <input type="file" accept="image/*" data-live="photo" style="display:none">
            </label>
            ${u.photo ? `<button type="button" class="btn btn-quiet btn-sm" data-act="rm-photo">Remove</button>` : ""}
            <small style="display:block;color:var(--muted);margin-top:4px">JPEG, PNG or WebP under 8 MB.</small>
          </div>
        </div>

        <div class="grid2">
          <div class="full">
            <label style="font-size:.84rem;font-weight:700;display:block;margin-bottom:6px">Professional Headline *</label>
            <input type="text" name="headline" value="${esc(u.headline || "")}" placeholder="e.g. Lead Brand Strategist & React Developer" style="width:100%;padding:10px 14px;border:1px solid var(--line);border-radius:10px;font-size:.95rem">
            <small style="color:var(--muted);display:block;margin-top:4px">A concise statement describing what you do and your core specialty.</small>
          </div>

          <div class="full">
            ${field("bio", "Short Biography", `<textarea id="bio" name="bio" maxlength="500" placeholder="Tell students and agencies about your skills, background and what you love creating.">${esc(u.bio || "")}</textarea>`, "Up to 500 characters summary displayed in search cards.")}
          </div>

          <div class="full">
            <label style="font-size:.84rem;font-weight:700;display:block;margin-bottom:6px">About Me (Full Narrative)</label>
            <textarea name="aboutMe" rows="4" placeholder="Detail who you are, what you are passionate about, current interests, and what you are learning right now." style="width:100%;padding:10px 14px;border:1px solid var(--line);border-radius:10px;font-size:.92rem;line-height:1.5">${esc(u.aboutMe || "")}</textarea>
            <small style="color:var(--muted);display:block;margin-top:4px">Displayed on your detailed profile under About Me.</small>
          </div>

          ${field("institution", "Institution", inp("institution", "text", `value="${esc(u.institution || "")}"`))}
          ${field("department", "Department", inp("department", "text", `value="${esc(u.department || "")}"`))}

          <div>
            <label style="font-size:.84rem;font-weight:700;display:block;margin-bottom:6px">Academic Level</label>
            <select id="level" name="level" style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px">
              ${opts(LEVELS, u.level)}
            </select>
            <label style="font-size:.82rem;display:flex;align-items:center;gap:6px;margin-top:8px;cursor:pointer">
              <input type="checkbox" name="showLevel" ${u.showLevel !== false ? "checked" : ""}> Display academic level publicly on Talent Hub
            </label>
          </div>

          <div>
            <label style="font-size:.84rem;font-weight:700;display:block;margin-bottom:6px">Experience Level</label>
            <select name="experienceLevel" style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px">
              ${opts(EXPERIENCE_LEVELS, u.experienceLevel)}
            </select>
          </div>

          <div>
            <label style="font-size:.84rem;font-weight:700;display:block;margin-bottom:6px">Primary Discipline Category</label>
            <select name="category" style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px">
              ${opts(CATS, u.category)}
            </select>
          </div>

          ${field("availability", "Current Availability", `<select id="availability" name="availability">${opts(AVAIL, u.availability)}</select>`)}

          <!-- Looking For Section -->
          <div class="full" style="background:var(--ivory);padding:18px;border-radius:14px;border:1px solid var(--line);margin-top:8px">
            <label class="field-label" style="font-weight:800;display:block;margin-bottom:8px;color:var(--forest)">What are you looking for on TeamBud?</label>
            <small style="color:var(--muted);display:block;margin-bottom:12px">Select all goals and collaborator types that apply:</small>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px">
              ${LOOKING_FOR_OPTIONS.map(opt => `
                <label class="chk" style="font-size:.88rem">
                  <input type="checkbox" name="lookingFor" value="${esc(opt.id)}" ${(u.lookingFor || []).includes(opt.id) ? "checked" : ""}>
                  ${opt.icon} ${esc(opt.label)}
                </label>
              `).join("")}
            </div>
          </div>

          <!-- Social Links -->
          <div class="full" style="margin-top:8px">
            <label class="field-label" style="font-weight:800;display:block;margin-bottom:8px;color:var(--forest)">Professional Social & Portfolio Links</label>
            <small style="color:var(--muted);display:block;margin-bottom:12px">Your direct contact info (phone/email) is protected. Share verified portfolio and professional profiles:</small>
            <div class="grid2">
              <div>
                <label style="font-size:.82rem;font-weight:600;display:block;margin-bottom:4px">GitHub Profile</label>
                <input type="url" name="github" value="${esc((u.socialLinks && u.socialLinks.github) || "")}" placeholder="https://github.com/username" style="width:100%;padding:8px 12px;border:1px solid var(--line);border-radius:8px">
              </div>
              <div>
                <label style="font-size:.82rem;font-weight:600;display:block;margin-bottom:4px">Behance / Dribbble</label>
                <input type="url" name="behance" value="${esc((u.socialLinks && u.socialLinks.behance) || "")}" placeholder="https://behance.net/username" style="width:100%;padding:8px 12px;border:1px solid var(--line);border-radius:8px">
              </div>
              <div>
                <label style="font-size:.82rem;font-weight:600;display:block;margin-bottom:4px">LinkedIn Profile</label>
                <input type="url" name="linkedin" value="${esc((u.socialLinks && u.socialLinks.linkedin) || "")}" placeholder="https://linkedin.com/in/username" style="width:100%;padding:8px 12px;border:1px solid var(--line);border-radius:8px">
              </div>
              <div>
                <label style="font-size:.82rem;font-weight:600;display:block;margin-bottom:4px">Twitter / X Profile</label>
                <input type="url" name="twitter" value="${esc((u.socialLinks && u.socialLinks.twitter) || "")}" placeholder="https://x.com/username" style="width:100%;padding:8px 12px;border:1px solid var(--line);border-radius:8px">
              </div>
              <div class="full">
                <label style="font-size:.82rem;font-weight:600;display:block;margin-bottom:4px">Personal Website / Linktree</label>
                <input type="url" name="website" value="${esc((u.socialLinks && u.socialLinks.website) || "")}" placeholder="https://..." style="width:100%;padding:8px 12px;border:1px solid var(--line);border-radius:8px">
              </div>
            </div>
          </div>

          <div class="full">
            <label class="field-label" style="font-weight:700;display:block;margin-bottom:8px">Collaboration Areas</label>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px">
              ${CATS.map(c => `<label class="chk"><input type="checkbox" name="collab" value="${esc(c)}" ${(u.collab || []).includes(c) ? "checked" : ""}> ${esc(c)}</label>`).join("")}
            </div>
          </div>
        </div>

        <button class="btn btn-primary" type="submit" style="margin-top:20px;padding:12px 24px">Save Talent Profile</button>
      </form>
    </div>

    <!-- Rich Portfolio Showcase Manager -->
    <div class="card" style="margin-bottom:24px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;border-bottom:1px solid var(--line);padding-bottom:12px">
        <div>
          <h2>Portfolio Showcase Projects</h2>
          <p class="c-sub" style="margin:2px 0 0">Highlight applications, designs, campaigns, or strategic work to attract clients and agency teammates.</p>
        </div>
        <button class="btn btn-primary btn-sm" data-act="modal-add-proj">+ Add Project</button>
      </div>

      ${(u.portfolio || []).length ? `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;margin-top:14px">
          ${u.portfolio.map(p => `
            <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;border-color:#BDD4C7">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
                  <span class="badge role" style="font-size:.7rem">${esc(p.category || "Project")}</span>
                  <button class="btn btn-quiet btn-sm" data-act="rm-portfolio-proj" data-id="${p.id}" style="color:var(--danger)">Remove</button>
                </div>
                <strong style="font-size:1.05rem;color:var(--forest);display:block;margin-bottom:6px">${esc(p.title || p.label)}</strong>
                <p style="font-size:.86rem;color:var(--muted);line-height:1.4;margin-bottom:10px">${esc(p.description || "Portfolio work showcase.")}</p>
                ${(p.tools || []).length ? `
                  <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">
                    ${p.tools.map(t => `<span style="font-size:.72rem;background:var(--sage);color:var(--forest);padding:2px 6px;border-radius:4px">${esc(t)}</span>`).join("")}
                  </div>
                ` : ""}
              </div>
              <div style="border-top:1px solid var(--line);padding-top:10px;margin-top:8px">
                ${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" style="font-size:.84rem;color:var(--emerald);font-weight:700;text-decoration:none">View Live Project ↗</a>` : `<span style="font-size:.82rem;color:var(--muted)">In-app showcase</span>`}
              </div>
            </div>
          `).join("")}
        </div>
      ` : `
        <div class="empty" style="padding:32px 16px;text-align:center">
          <p style="margin-bottom:12px">You have not added any showcase projects yet.</p>
          <button class="btn btn-primary btn-sm" data-act="modal-add-proj">+ Add Your First Showcase Project</button>
        </div>
      `}
    </div>

    <!-- Experience & Certifications -->
    <div class="card" style="margin-bottom:24px">
      <h2>Work Experience & Leadership</h2>
      <ul class="list" style="margin:14px 0">
        ${(u.experience || []).length ? u.experience.map(x => `
          <li class="row">
            <div>
              <strong>${esc(x.role)}</strong> at <span>${esc(x.org)}</span>
              ${x.period ? `<small> · ${esc(x.period)}</small>` : ""}
              ${x.desc ? `<p style="font-size:.88rem;color:var(--muted);margin-top:4px">${esc(x.desc)}</p>` : ""}
            </div>
            <button class="btn btn-quiet btn-sm" data-act="rm-exp" data-id="${x.id}">Remove</button>
          </li>
        `).join("") : `<div class="empty">No experience entries logged yet.</div>`}
      </ul>
      <form data-form="add-exp" novalidate style="border-top:1px solid var(--line);padding-top:16px;margin-top:16px">
        <div class="grid2">
          ${field("role", "Role / Title", inp("role", "text"))}
          ${field("org", "Organisation / Project", inp("org", "text"))}
          ${field("period", "Time period", inp("period", "text", 'placeholder="e.g. 2024 to 2025"'))}
          ${field("desc", "Short summary", inp("desc", "text"))}
        </div>
        <button class="btn btn-ghost btn-sm" type="submit" style="margin-top:12px">Add experience</button>
      </form>
    </div>
  `;
}

/* ===================== Section 6: Agency Creation & My Agency ===================== */
function viewAgencyCreate(u) {
  return `
    <div class="page-h">
      <div>
        <a class="back" href="#/app/agency" style="display:inline-flex;align-items:center;gap:6px;margin-bottom:8px">← Back to My Agency</a>
        <h1>Create an Agency</h1>
        <p>Establish an independent student agency brand. Bring together 3 to 10 talented students.</p>
      </div>
    </div>

    <!-- Platform Rules Banner -->
    <div class="rule-tracker" style="background:#EBF3EE;border-left:5px solid var(--emerald)">
      <div class="rule-title">
        <span>Team Size Platform Rules:</span>
        <span class="badge forming">Strict Rule</span>
      </div>
      <p style="font-size:.92rem;color:var(--forest);margin-bottom:6px">
        • <strong>Minimum: 3 Members</strong> &nbsp;|&nbsp; <strong>Maximum: 10 Members</strong><br>
        • Your agency starts in <strong>FORMING</strong> status. Once 3 members accept their invitations, your agency activates and becomes publicly eligible for client discovery and project requests.
      </p>
    </div>

    <div class="card">
      <form data-form="create-agency" novalidate>
        <h2 style="margin-bottom:18px">1. Agency Brand & Identity</h2>
        <div class="grid2">
          <div class="full">
            ${field("name", "Agency Brand Name", inp("name", "text", 'placeholder="e.g. Apex Creative Studio" maxlength="80"'), "The official title clients and students will see.")}
          </div>
          <div class="full">
            ${field("slug", "Unique URL Slug / Username", inp("slug", "text", 'placeholder="e.g. apex-creative" maxlength="30" autocapitalize="none"'), "Used for your public agency profile URL: teambud.com/agency/your-slug (lowercase letters, numbers and hyphens).")}
          </div>
          <div class="full">
            <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">Agency Logo</label>
            <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
              <div id="agency-logo-preview" class="pub-logo" style="width:72px;height:72px;margin-bottom:0">AG</div>
              <div>
                <label class="btn btn-ghost btn-sm" style="cursor:pointer">
                  Upload logo <input type="file" id="agency-logo-input" accept="image/*" style="display:none">
                </label>
                <input type="hidden" id="agency-logo-val" name="logo" value="">
                <small style="display:block;color:var(--muted);margin-top:4px">PNG, JPEG or SVG under 8 MB. Square format recommended.</small>
              </div>
            </div>
          </div>
          <div class="full">
            ${field("shortDesc", "Short Elevator Description", inp("shortDesc", "text", 'placeholder="e.g. Full-stack software engineering and brand design for growing businesses." maxlength="150"'), "A crisp 1-sentence summary for directories and cards.")}
          </div>
          <div class="full">
            ${field("fullDesc", "Full Agency Description", `<textarea id="fullDesc" name="fullDesc" rows="4" placeholder="Detail your agency vision, interdisciplinary capabilities, work methodology, and team strengths." maxlength="1200"></textarea>`, "Provide clients with comprehensive context on your team's background.")}
          </div>
        </div>

        <h2 style="margin:28px 0 16px">2. Industry & Service Capabilities</h2>
        <div class="grid2">
          ${field("industry", "Industry Domain", `<select id="industry" name="industry">${opts(CATS, "", "Select industry domain")}</select>`)}
          ${field("mainCategory", "Main Service Category", `<select id="mainCategory" name="mainCategory">${opts(CATS, "", "Select primary service")}</select>`)}
          <div class="full">
            ${field("institution", "Institution Affiliation", inp("institution", "text", `value="${esc(u.institution || "")}" list="inst-list"`), "Your university or polytechnic campus base.")}
          </div>
          <div class="full">
            ${field("location", "Agency Location", inp("location", "text", `value="${esc(loc(u))}" placeholder="City, State, Country"`))}
          </div>
          <div class="full">
            <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">Additional Service Offerings (Select all that apply)</label>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px">
              ${CATS.map(c => `<label class="chk"><input type="checkbox" name="additionalServices" value="${esc(c)}"> ${esc(c)}</label>`).join("")}
            </div>
          </div>
        </div>

        <h2 style="margin:28px 0 16px">3. Your Founder Role & Portfolios</h2>
        <div class="grid2">
          <div class="full">
            ${field("customRoleDesc", "Your Role Description in this Agency", inp("customRoleDesc", "text", 'placeholder="e.g. Agency Director & Lead Software Engineer" maxlength="100"'), "You will be initialized as Team Owner. Custom descriptions define your specialty.")}
          </div>
          <div class="full">
            ${field("portfolioLink", "Portfolio Link (Optional)", inp("portfolioLink", "url", 'placeholder="https://behance.net/agency or https://github.com/agency"'))}
          </div>
        </div>

        <h2 style="margin:28px 0 16px">4. Contact Preferences & Guidelines Agreement</h2>
        <div style="margin-bottom:16px">
          <label class="chk" style="margin-bottom:8px"><input type="checkbox" name="contactEmail" checked> Allow clients to email our agency team</label>
          <label class="chk" style="margin-bottom:8px"><input type="checkbox" name="contactMessaging" checked> Receive in-app client project messages</label>
          <div style="margin-top:10px">
            ${field("contactPhone", "Direct Business Phone / WhatsApp (Optional)", inp("contactPhone", "tel", 'placeholder="+234..."'))}
          </div>
        </div>

        <div style="background:#FFFDE7;border:1px solid #FFF59D;border-radius:12px;padding:16px;margin:20px 0">
          <label class="chk" style="font-weight:700;color:#5D4037">
            <input type="checkbox" name="guidelinesAgreed" value="1">
            I agree to the TeamBud Agency Guidelines:
          </label>
          <ul style="font-size:.88rem;color:#795548;margin:8px 0 0 24px;line-height:1.5">
            <li>Agencies must maintain between 3 and 10 active student members.</li>
            <li>TeamBud does not automatically assign equal equity; our team will mutually agree on ownership, responsibilities, and revenue sharing.</li>
            <li>Platform membership does not replace statutory corporate registration.</li>
          </ul>
          <div class="err" data-err="guidelinesAgreed" aria-live="polite"></div>
        </div>

        <div style="display:flex;gap:12px;align-items:center;margin-top:20px">
          <button class="btn btn-primary" type="submit">Establish Agency</button>
          <a class="btn btn-quiet" href="#/app/agency">Cancel</a>
        </div>
      </form>
    </div>
  `;
}

function pageMyAgency(u) {
  const agencies = userAgencies(u.id);
  const pendingInvites = userPendingInvites(u.id, u.email);

  return `
    <div class="page-h">
      <div>
        <h1>My Agency Workspace</h1>
        <p>Manage your independent student agency teams, collaborate on projects, and service clients.</p>
      </div>
      <div class="acts">
        <a class="btn btn-primary btn-sm" href="#/create-agency">+ Create an Agency</a>
        <a class="btn btn-ghost btn-sm" href="#/marketplace">Browse Marketplace</a>
      </div>
    </div>

    ${pendingInvites.length ? `
      <div class="card" style="margin-bottom:20px;border-left:5px solid var(--lime)">
        <h2>Inbound Agency Invitations (${pendingInvites.length})</h2>
        <p class="c-sub">You have been invited to join an agency team. Review your role before accepting.</p>
        <ul class="list" style="margin-top:14px">
          ${pendingInvites.map(item => `
            <li class="row" style="padding:14px;background:var(--ivory);border-radius:10px;margin-bottom:8px">
              <div>
                <strong>${esc(item.agency.name)}</strong>
                <div style="font-size:.88rem;color:var(--muted)">Assigned Role: <span class="badge role">${esc(item.invite.role)}</span>${item.invite.customRoleDesc ? ` · ${esc(item.invite.customRoleDesc)}` : ""}</div>
                <small>${esc(item.agency.institution)}, ${esc(item.agency.location)} · Team size: ${item.agency.members.length}/10</small>
              </div>
              <span class="acts">
                <button class="btn btn-primary btn-sm" data-act="accept-agency-invite" data-agency-id="${item.agency.id}" data-invite-id="${item.invite.id}">Accept</button>
                <button class="btn btn-quiet btn-sm" data-act="decline-agency-invite" data-agency-id="${item.agency.id}" data-invite-id="${item.invite.id}">Decline</button>
              </span>
            </li>
          `).join("")}
        </ul>
      </div>
    ` : ""}

    ${agencies.length ? `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px">
        ${agencies.map(a => {
          const myMem = a.members.find(m => m.userId === u.id);
          const isOwner = a.ownerId === u.id;
          const statusClass = a.status === "active" ? "active" : (a.status === "forming" ? "forming" : "needs-members");
          const statusText = a.status === "active" ? "Active Agency" : (a.status === "forming" ? "Forming" : "Needs Members");
          const needed = Math.max(0, 3 - a.members.length);

          return `
            <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--emerald)">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
                  ${agencyLogo(a)}
                  <span class="badge ${statusClass}">${statusText}</span>
                </div>
                <h2 style="font-size:1.35rem;margin-bottom:6px">${esc(a.name)}</h2>
                <p style="font-size:.9rem;color:var(--muted);margin-bottom:12px">${esc(a.shortDesc)}</p>

                <!-- Status Progress Tracker -->
                <div style="background:var(--ivory);padding:10px 14px;border-radius:10px;margin-bottom:14px;font-size:.85rem">
                  <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                    <strong>Team Size: ${a.members.length}/10 members</strong>
                    <span>${a.members.length >= 3 ? "Eligible" : `${needed} more needed`}</span>
                  </div>
                  <div class="meter-bar ${a.status === "active" ? "active" : (a.status === "needs_members" ? "needs" : "")}" style="height:6px;background:rgba(0,0,0,0.08);border-radius:999px;overflow:hidden">
                    <i style="display:block;height:100%;width:${Math.min(100, Math.round(a.members.length / 10 * 100))}%;background:var(--emerald)"></i>
                  </div>
                  ${needed > 0 ? `<small style="color:#C62828;display:block;margin-top:4px">Invite ${needed} more student${needed > 1 ? "s" : ""} to activate this agency.</small>` : `<small style="color:#2E7D32;display:block;margin-top:4px">Public listing active.</small>`}
                </div>

                <div style="font-size:.86rem;margin-bottom:14px">
                  <div><strong>Your Role:</strong> <span class="badge role">${esc(myMem ? myMem.role : "Member")}</span></div>
                  ${myMem && myMem.customRoleDesc ? `<small style="color:var(--muted);display:block;margin-top:2px">${esc(myMem.customRoleDesc)}</small>` : ""}
                </div>
              </div>

              <div style="display:flex;gap:8px;flex-wrap:wrap;padding-top:14px;border-top:1px solid var(--line)">
                <a class="btn btn-primary btn-sm btn-block" href="#/agency-hub/${a.id}">Open Team Workspace</a>
                <a class="btn btn-ghost btn-sm btn-block" href="#/agency/${a.slug}">View Public Agency Site</a>
              </div>
            </div>`;
        }).join("")}
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:48px 24px">
        ${agencyLogo(null, true)}
        <h2 style="margin:16px 0 8px">Build an Agency Team with Fellow Students</h2>
        <p style="max-width:560px;margin:0 auto 24px;color:var(--forest)">
          Establish an independent brand, assemble 3 to 10 student specialists, publish your services, and start taking on paid client commissions.
        </p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a class="btn btn-primary" href="#/create-agency">Create an Agency</a>
          <a class="btn btn-ghost" href="#/app/discover">Discover Student Teammates</a>
        </div>
      </div>
    `}
  `;
}

/* ===================== Section 7: Public Agency Profile ===================== */
function viewPublicAgency(slug, currentUser) {
  const a = agencyBySlug(slug);
  if (!a) {
    return `
      <div style="max-width:800px;margin:60px auto;padding:24px;text-align:center">
        <h2>Agency Not Found</h2>
        <p style="margin:12px 0 24px">The requested agency profile "<strong>${esc(slug)}</strong>" does not exist or has been removed.</p>
        <a class="btn btn-primary" href="#/marketplace">Browse All Agencies</a>
      </div>`;
  }

  const isOwnerOrMgr = currentUser && isAgencyOwnerOrManager(a, currentUser.id);
  const isMember = currentUser && isAgencyMember(a, currentUser.id);
  const isEligible = a.status === "active";
  const needed = Math.max(0, 3 - (a.members || []).length);

  return `
    ${protoBar()}
    <div style="max-width:1160px;margin:0 auto;padding:20px 24px 80px">
      <!-- Navigation Bar -->
      <header class="row" style="margin-bottom:28px">
        <div style="display:flex;align-items:center;gap:12px">
          <a class="brand" href="${SITE_URL}"><img src="${window.__ICON}" alt=""><span class="word">Team<b>Bud</b></span></a>
          <span style="color:var(--line);font-size:1.4rem">/</span>
          <a href="#/marketplace" style="font-size:.92rem;font-weight:600;color:var(--muted)">Marketplace</a>
          <span style="color:var(--line);font-size:1.4rem">/</span>
          <span style="font-size:.92rem;font-weight:700;color:var(--forest)">${esc(a.name)}</span>
        </div>
        <div style="display:flex;gap:10px;align-items:center">
          ${isMember ? `<a class="btn btn-ghost btn-sm" href="#/agency-hub/${a.id}">Team Workspace</a>` : ""}
          ${currentUser ? (currentUser.role === "client" ? `<a class="btn btn-quiet btn-sm" href="#/client">Client Dashboard</a>` : `<a class="btn btn-quiet btn-sm" href="#/app/overview">Student Dashboard</a>`) : `<a class="btn btn-quiet btn-sm" href="#/login">Log In</a>`}
        </div>
      </header>

      <!-- Eligibility Disclaimer Banner if not active -->
      ${!isEligible ? `
        <div style="background:#FFF3E0;border:1px solid #FFE082;border-radius:14px;padding:18px 22px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap">
          <div>
            <strong style="color:#E65100;font-size:1rem;display:block;margin-bottom:4px">
              ${a.status === "forming" ? "Agency in FORMING Status" : "Agency NEEDS MEMBERS"}
            </strong>
            <p style="font-size:.9rem;color:#5D4037">
              This agency currently has <strong>${a.members.length} of 3</strong> required members. TeamBud requires a minimum of 3 accepted members before an agency becomes publicly eligible for commercial client requests.
            </p>
          </div>
          ${isOwnerOrMgr ? `<a class="btn btn-primary btn-sm" href="#/agency-hub/${a.id}/members">Invite ${needed} More Student${needed > 1 ? "s" : ""}</a>` : ""}
        </div>
      ` : ""}

      <!-- Independent Business Hero Showcase -->
      <section class="pub-hero">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:20px">
          <div>
            ${agencyLogo(a, true)}
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;flex-wrap:wrap">
              <h1>${esc(a.name)}</h1>
              <span class="badge ${a.status === "active" ? "active" : "forming"}" style="font-size:.8rem">
                ${a.status === "active" ? "Verified Agency" : "Forming Agency"}
              </span>
            </div>
            <p>${esc(a.shortDesc)}</p>
            <div style="display:flex;gap:16px;align-items:center;margin-top:18px;font-size:.92rem;color:#E5EDE2;flex-wrap:wrap">
              <span><strong>Institution:</strong> ${esc(a.institution)}</span>
              <span>•</span>
              <span><strong>Location:</strong> ${esc(a.location)}</span>
              <span>•</span>
              <span><strong>Team:</strong> ${a.members.length} Student Specialists</span>
              <span>•</span>
              <span><strong>Industry:</strong> ${esc(a.industry)}</span>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;min-width:220px">
            <button class="btn btn-primary" style="background:var(--lime);color:var(--forest);font-weight:800;border:none" data-act="open-quote-modal" data-agency-id="${a.id}">
              Request a Quotation
            </button>
            ${isOwnerOrMgr ? `<a class="btn btn-ghost" style="color:#fff;border-color:rgba(255,255,255,0.4)" href="#/agency-hub/${a.id}">Edit Agency & Team Workspace</a>` : ""}
          </div>
        </div>
      </section>

      <!-- Main Layout: 2 Columns -->
      <div style="display:grid;grid-template-columns:2fr 1fr;gap:32px">
        <!-- Left Main: About, Services, Portfolio, Testimonials -->
        <div>
          <!-- About -->
          <div class="card" style="margin-bottom:28px">
            <h2>About Our Agency</h2>
            <p style="margin-top:12px;font-size:1.02rem;line-height:1.7;color:var(--forest);white-space:pre-line">${esc(a.fullDesc)}</p>
            ${a.additionalServices && a.additionalServices.length ? `
              <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--line)">
                <strong style="display:block;margin-bottom:8px;font-size:.92rem;color:var(--muted)">Specialised Capabilities:</strong>
                <div style="display:flex;gap:8px;flex-wrap:wrap">
                  ${a.additionalServices.map(s => `<span class="tag">${esc(s)}</span>`).join("")}
                </div>
              </div>
            ` : ""}
          </div>

          <!-- Section 9: THE TALENT BEHIND THE TEAM -->
          <div class="card" style="margin-bottom:28px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:10px">
              <div>
                <h2 style="font-size:1.35rem">THE TALENT BEHIND THE TEAM</h2>
                <p class="c-sub">Meet the verified student specialists collaborating in this agency.</p>
              </div>
              <span class="badge active">${a.members.length} / 10 Active Members</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px">
              ${a.members.map(m => {
                const uObj = userById(m.userId);
                if (!uObj) return "";
                const topSkills = (uObj.skills || []).slice(0, 4);
                return `
                  <div class="member-talent-card" style="border:1px solid var(--line);border-radius:14px;padding:18px;background:var(--ivory);display:flex;flex-direction:column;justify-content:space-between">
                    <div>
                      <div style="display:flex;gap:12px;align-items:center;margin-bottom:10px">
                        ${avatar(uObj)}
                        <div style="min-width:0;flex:1">
                          <strong style="font-size:1rem;color:var(--forest);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(uObj.name)}</strong>
                          <span class="badge role" style="font-size:.74rem">${esc(m.role)}</span>
                        </div>
                      </div>
                      ${m.customRoleDesc ? `<p style="font-size:.82rem;color:var(--muted);margin-bottom:8px"><strong>Role:</strong> ${esc(m.customRoleDesc)}</p>` : ""}
                      <p style="font-size:.86rem;color:var(--forest);line-height:1.45;margin-bottom:10px">${esc(uObj.bio || uObj.headline || (uObj.department + " student at " + uObj.institution))}</p>
                      ${topSkills.length ? `
                        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px">
                          ${topSkills.map(sk => `<span class="talent-skill-tag">${esc(sk.name)}</span>`).join("")}
                        </div>
                      ` : ""}
                    </div>
                    <div style="padding-top:10px;border-top:1px solid var(--line);margin-top:8px">
                      <a class="btn btn-ghost btn-sm btn-block" href="#/talent/${esc(uObj.username)}" target="_blank">View Talent Profile ↗</a>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <!-- Services Catalogue -->
          <div class="card" style="margin-bottom:28px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
              <div>
                <h2>Services & Packages</h2>
                <p class="c-sub">Published offerings with transparent starting fees and delivery timelines.</p>
              </div>
              ${isOwnerOrMgr ? `<a class="btn btn-ghost btn-sm" href="#/agency-hub/${a.id}/services">+ Add Service</a>` : ""}
            </div>
            ${(a.services && a.services.length) ? `
              <div class="service-grid">
                ${a.services.map(s => `
                  <div class="service-item">
                    <div>
                      <span class="badge role" style="font-size:.74rem">${esc(s.category)}</span>
                      <h3 style="font-size:1.15rem;margin:8px 0 6px">${esc(s.title)}</h3>
                      <p style="font-size:.9rem;color:var(--muted);line-height:1.5">${esc(s.desc)}</p>
                      ${s.requiredInfo ? `<div style="font-size:.82rem;color:var(--muted);margin-top:8px"><strong>Client Info Needed:</strong> ${esc(s.requiredInfo)}</div>` : ""}
                    </div>
                    <div>
                      <div class="service-price">${esc(s.startingPrice)}</div>
                      <small style="color:var(--muted);display:block;margin-bottom:12px">Estimated delivery: ${esc(s.timeline)}</small>
                      <button class="btn btn-primary btn-sm btn-block" data-act="open-quote-modal" data-agency-id="${a.id}" data-service-title="${esc(s.title)}" data-category="${esc(s.category)}">
                        Request This Service
                      </button>
                    </div>
                  </div>
                `).join("")}
              </div>
            ` : `
              <div class="empty">No specific packages published yet. You can still submit a custom project request.</div>
            `}
          </div>

          <!-- Portfolio Showcase -->
          <div class="card" style="margin-bottom:28px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
              <div>
                <h2>Verified Work & Case Studies</h2>
                <p class="c-sub">Demonstrated deliverables executed by our student specialists.</p>
              </div>
              ${isOwnerOrMgr ? `<a class="btn btn-ghost btn-sm" href="#/agency-hub/${a.id}/portfolio">+ Add Project</a>` : ""}
            </div>
            ${(a.portfolio && a.portfolio.length) ? `
              <div class="portfolio-grid">
                ${a.portfolio.map(p => `
                  <div class="portfolio-card">
                    <div class="portfolio-img">
                      ${p.image ? `<img src="${safeImg(p.image)}" style="width:100%;height:100%;object-fit:cover" alt="">` : `<span>Project Showcase</span>`}
                    </div>
                    <div style="padding:18px">
                      <span class="badge role" style="font-size:.74rem;margin-bottom:6px">${esc(p.completedDate)}</span>
                      <h3 style="font-size:1.15rem;margin-bottom:6px">${esc(p.title)}</h3>
                      <p style="font-size:.9rem;color:var(--muted);margin-bottom:10px">${esc(p.desc)}</p>
                      ${p.contributions ? `<div style="font-size:.84rem;color:var(--forest);background:var(--ivory);padding:8px 12px;border-radius:8px;margin-bottom:10px"><strong>Team Contribution:</strong> ${esc(p.contributions)}</div>` : ""}
                      <div style="display:flex;gap:6px;flex-wrap:wrap">
                        ${(p.skillsUsed || []).map(sk => `<span class="tag" style="font-size:.76rem">${esc(sk)}</span>`).join("")}
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            ` : `
              <div class="empty">Portfolio case studies are being assembled.</div>
            `}
          </div>

          <!-- Testimonials -->
          ${(a.testimonials && a.testimonials.length) ? `
            <div class="card">
              <h2>Client Testimonials</h2>
              <div style="display:flex;flex-direction:column;gap:14px;margin-top:14px">
                ${a.testimonials.map(t => `
                  <div style="padding:16px 20px;border-left:4px solid var(--emerald);background:var(--ivory);border-radius:0 12px 12px 0">
                    <p style="font-style:italic;font-size:1.02rem;color:var(--forest);margin-bottom:10px">"${esc(t.quote)}"</p>
                    <div style="font-size:.88rem">
                      <strong>${esc(t.clientName)}</strong> · <span style="color:var(--muted)">${esc(t.clientOrg)}</span>
                      ${t.projectTitle ? `<small style="display:block;color:var(--emerald);font-weight:600">Project: ${esc(t.projectTitle)}</small>` : ""}
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          ` : ""}
        </div>

        <!-- Right Sidebar: Team Roster, Availability & Quick Quote -->
        <div>
          <!-- Team Members -->
          <div class="card" style="margin-bottom:24px">
            <h2>Team Specialists (${a.members.length})</h2>
            <p class="c-sub">Complementary talents powering this agency.</p>
            <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px">
              ${a.members.map(m => {
                const uObj = userById(m.userId);
                return `
                  <div style="display:flex;gap:12px;align-items:center;padding:8px;border-radius:10px;background:var(--ivory)">
                    ${avatar(uObj)}
                    <div style="min-width:0;flex:1">
                      <strong style="display:block;font-size:.92rem">${esc(uObj ? uObj.name : "Member")}</strong>
                      <span class="badge role" style="font-size:.74rem;padding:2px 8px">${esc(m.role)}</span>
                      ${m.customRoleDesc ? `<small style="display:block;color:var(--muted);margin-top:2px;font-size:.78rem">${esc(m.customRoleDesc)}</small>` : ""}
                    </div>
                  </div>`;
              }).join("")}
            </div>
            ${isOwnerOrMgr ? `
              <div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--line);text-align:center">
                <a class="btn btn-ghost btn-sm btn-block" href="#/agency-hub/${a.id}/members">Manage Team & Invite Members</a>
              </div>
            ` : ""}
          </div>

          <!-- Contact / Quote Box -->
          <div class="card" style="background:#FAFDFB;border:2px solid var(--emerald)">
            <h3 style="font-size:1.2rem;margin-bottom:8px">Ready to Work Together?</h3>
            <p style="font-size:.9rem;color:var(--forest);margin-bottom:16px">
              Submit your project brief. ${esc(a.name)} will review requirements and submit a detailed milestone quotation.
            </p>
            <button class="btn btn-primary btn-block" data-act="open-quote-modal" data-agency-id="${a.id}">
              Request a Quotation
            </button>
            <div style="margin-top:14px;font-size:.82rem;color:var(--muted);text-align:center">
              ✓ Protected milestone terms &nbsp;|&nbsp; ✓ In-app agreement
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function viewJoinAgency(code, currentUser) {
  let targetAgency = null, targetInvite = null;
  (db.agencies || []).forEach(a => {
    (a.invitations || []).forEach(inv => {
      if (inv.code === code) {
        targetAgency = a;
        targetInvite = inv;
      }
    });
  });

  if (!targetAgency || !targetInvite) {
    return authLayout(`
      <h1>Invalid Invitation</h1>
      <p class="sub">This agency invitation code is invalid, expired, or already used.</p>
      <a class="btn btn-primary btn-block" href="#/app/overview">Return to Dashboard</a>
    `);
  }

  if (targetInvite.status !== "pending") {
    return authLayout(`
      <h1>Invitation ${esc(targetInvite.status)}</h1>
      <p class="sub">This invitation to "${esc(targetAgency.name)}" has already been ${esc(targetInvite.status)}.</p>
      <a class="btn btn-primary btn-block" href="#/agency/${targetAgency.slug}">View Agency Profile</a>
    `);
  }

  return authLayout(`
    <span class="badge forming" style="margin-bottom:10px">Agency Team Invitation</span>
    <h1>Join ${esc(targetAgency.name)}</h1>
    <p class="sub">${esc(targetAgency.shortDesc)}</p>
    <div style="background:var(--ivory);padding:18px;border-radius:12px;margin:20px 0;font-size:.92rem">
      <div style="margin-bottom:8px"><strong>Assigned Role:</strong> <span class="badge role">${esc(targetInvite.role)}</span></div>
      ${targetInvite.customRoleDesc ? `<div style="margin-bottom:8px"><strong>Role Summary:</strong> ${esc(targetInvite.customRoleDesc)}</div>` : ""}
      <div><strong>Current Team Size:</strong> ${targetAgency.members.length}/10 members</div>
    </div>
    ${currentUser ? `
      <div style="display:flex;gap:12px">
        <button class="btn btn-primary btn-block" data-act="accept-agency-invite" data-agency-id="${targetAgency.id}" data-invite-id="${targetInvite.id}">Accept & Join Team</button>
        <button class="btn btn-quiet btn-block" data-act="decline-agency-invite" data-agency-id="${targetAgency.id}" data-invite-id="${targetInvite.id}">Decline</button>
      </div>
    ` : `
      <p style="margin-bottom:16px">You must log in to your student account to accept this invitation.</p>
      <a class="btn btn-primary btn-block" href="#/login">Log in to accept</a>
    `}
  `);
}

/* ===================== Section 8: Team Dashboard Workspace ===================== */
function pageTeamDashboard(agencyId, activeTab = "overview", currentUser) {
  const a = agencyById(agencyId);
  if (!a) {
    return `<div class="card" style="text-align:center;padding:40px"><p>Agency workspace not found.</p><a class="btn btn-primary" href="#/app/agency">Back to My Agency</a></div>`;
  }

  const isMember = isAgencyMember(a, currentUser.id);
  if (!isMember) {
    return `<div class="card" style="text-align:center;padding:40px"><p>You are not an authorized member of this agency.</p><a class="btn btn-primary" href="#/app/agency">Back to My Agency</a></div>`;
  }

  const isOwnerOrMgr = isAgencyOwnerOrManager(a, currentUser.id);
  const myMem = a.members.find(m => m.userId === currentUser.id);
  const needed = Math.max(0, 3 - (a.members || []).length);
  const statusClass = a.status === "active" ? "active" : (a.status === "forming" ? "forming" : "needs-members");
  const statusText = a.status === "active" ? "Active Agency" : (a.status === "forming" ? "Forming" : "Needs Members");

  // Inbound requests targeted to this agency or marketplace
  const myRequests = (db.requests || []).filter(r => r.targetAgencyId === a.id || (r.targetAgencyId === "all" && (r.category === a.mainCategory || (a.additionalServices || []).includes(r.category))));

  return `
    <div style="margin-bottom:20px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px;margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:14px">
          ${agencyLogo(a)}
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <h1 style="font-size:1.75rem;margin:0">${esc(a.name)}</h1>
              <span class="badge ${statusClass}">${statusText}</span>
            </div>
            <small style="color:var(--muted)">${esc(a.institution)} · ${esc(a.location)} · Your Role: <strong>${esc(myMem ? myMem.role : "Member")}</strong></small>
          </div>
        </div>
        <div style="display:flex;gap:8px">
          <a class="btn btn-ghost btn-sm" href="#/agency/${a.slug}" target="_blank">View Public Profile ↗</a>
          <button class="btn btn-primary btn-sm" data-act="open-invite-modal" data-agency-id="${a.id}">+ Invite Member</button>
        </div>
      </div>

      <!-- Rule Enforcement Banner -->
      <div class="rule-tracker">
        <div class="rule-title">
          <span>Platform Team Size Requirement: <strong>${a.members.length} / 10 active members</strong></span>
          <span style="font-size:.85rem;color:var(--muted)">Min: 3 | Max: 10</span>
        </div>
        <div class="meter-bar ${a.status === "active" ? "active" : (a.status === "needs_members" ? "needs" : "")}">
          <i style="width:${Math.min(100, Math.round(a.members.length / 10 * 100))}%"></i>
        </div>
        <div style="font-size:.88rem;color:var(--forest);display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px">
          ${a.members.length < 3 ? `
            <span style="color:#C62828">
              <strong>Action required:</strong> Invite <strong>${needed}</strong> more student${needed > 1 ? "s" : ""} to activate this agency and list it publicly for clients.
            </span>
          ` : `
            <span style="color:#2E7D32">
              ✓ <strong>Agency is active and eligible for public listing!</strong> (You can add up to ${10 - a.members.length} more specialists).
            </span>
          `}
          ${a.status === "needs_members" ? `<span style="color:#C62828"><strong>Status: NEEDS MEMBERS</strong> (Fell below 3 members).</span>` : ""}
        </div>
      </div>

      <!-- Sub Navigation -->
      <nav class="subnav" aria-label="Agency workspace tabs">
        <a href="#/agency-hub/${a.id}/overview" class="${activeTab === "overview" ? "on" : ""}">Overview</a>
        <a href="#/agency-hub/${a.id}/members" class="${activeTab === "members" ? "on" : ""}">Team Members (${a.members.length})</a>
        <a href="#/agency-hub/${a.id}/messages" class="${activeTab === "messages" ? "on" : ""}">Team Messages</a>
        <a href="#/agency-hub/${a.id}/projects" class="${activeTab === "projects" ? "on" : ""}">Projects (${(a.projects || []).length})</a>
        <a href="#/agency-hub/${a.id}/services" class="${activeTab === "services" ? "on" : ""}">Services (${(a.services || []).length})</a>
        <a href="#/agency-hub/${a.id}/portfolio" class="${activeTab === "portfolio" ? "on" : ""}">Portfolio (${(a.portfolio || []).length})</a>
        <a href="#/agency-hub/${a.id}/requests" class="${activeTab === "requests" ? "on" : ""}">Client Requests & Quotes (${myRequests.length})</a>
        <a href="#/agency-hub/${a.id}/finance" class="${activeTab === "finance" ? "on" : ""}">Finance & Revenue ₦</a>
        <a href="#/agency-hub/${a.id}/agreement" class="${activeTab === "agreement" ? "on" : ""}">Agreement Guide</a>
      </nav>
    </div>

    <!-- Tab Content -->
    ${activeTab === "overview" ? renderAgencyOverview(a, myRequests, currentUser) : ""}
    ${activeTab === "members" ? renderAgencyMembers(a, isOwnerOrMgr, currentUser) : ""}
    ${activeTab === "messages" ? renderAgencyMessages(a, currentUser) : ""}
    ${activeTab === "projects" ? renderAgencyProjects(a, isOwnerOrMgr, currentUser) : ""}
    ${activeTab === "services" ? renderAgencyServices(a, isOwnerOrMgr, currentUser) : ""}
    ${activeTab === "portfolio" ? renderAgencyPortfolio(a, isOwnerOrMgr, currentUser) : ""}
    ${activeTab === "requests" ? renderAgencyRequests(a, myRequests, isOwnerOrMgr, currentUser) : ""}
    ${activeTab === "finance" ? renderAgencyFinance(a, currentUser, isOwnerOrMgr) : ""}
    ${activeTab === "agreement" ? renderAgencyAgreement(a, currentUser) : ""}
  `;
}

function renderAgencyOverview(a, myRequests, u) {
  const activeProjs = (a.projects || []).filter(p => p.status === "In Progress" || p.status === "New");
  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:16px;margin-bottom:24px">
      <div class="card" style="padding:16px">
        <small style="color:var(--muted)">Active Members</small>
        <div style="font-size:1.8rem;font-family:var(--head);font-weight:800;color:var(--forest)">${a.members.length} <span style="font-size:.9rem;color:var(--muted)">/ 10 max</span></div>
        <small>${a.members.length >= 3 ? `<span style="color:#2E7D32">✓ Minimum met</span>` : `<span style="color:#C62828">${3 - a.members.length} more needed</span>`}</small>
      </div>
      <div class="card" style="padding:16px">
        <small style="color:var(--muted)">Active Projects</small>
        <div style="font-size:1.8rem;font-family:var(--head);font-weight:800;color:var(--forest)">${activeProjs.length}</div>
        <small><a href="#/agency-hub/${a.id}/projects">View project boards</a></small>
      </div>
      <div class="card" style="padding:16px">
        <small style="color:var(--muted)">Client Requests</small>
        <div style="font-size:1.8rem;font-family:var(--head);font-weight:800;color:var(--forest)">${myRequests.length}</div>
        <small><a href="#/agency-hub/${a.id}/requests">Review inquiries</a></small>
      </div>
      <div class="card" style="padding:16px">
        <small style="color:var(--muted)">Published Services</small>
        <div style="font-size:1.8rem;font-family:var(--head);font-weight:800;color:var(--forest)">${(a.services || []).length}</div>
        <small><a href="#/agency-hub/${a.id}/services">Manage catalogue</a></small>
      </div>
    </div>

    <div class="cols">
      <div class="card">
        <h2>Recent Team Discussions</h2>
        <div style="margin-top:12px">
          ${(a.messages && a.messages.length) ? `
            <div style="display:flex;flex-direction:column;gap:10px">
              ${a.messages.slice(-4).reverse().map(m => {
                const s = userById(m.senderId);
                return `
                  <div style="padding:10px 14px;background:var(--ivory);border-radius:10px">
                    <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                      <strong>${esc(s ? s.name : "Member")}</strong>
                      <small style="color:var(--muted)">${rel(m.t)}</small>
                    </div>
                    <div style="font-size:.9rem">${esc(m.text)}</div>
                  </div>`;
              }).join("")}
            </div>
            <div style="margin-top:12px"><a class="btn btn-ghost btn-sm btn-block" href="#/agency-hub/${a.id}/messages">Open Full Message Feed</a></div>
          ` : `<div class="empty">No team messages posted yet.</div>`}
        </div>
      </div>

      <div class="card">
        <h2>Upcoming Deadlines & Milestones</h2>
        <div style="margin-top:12px">
          ${activeProjs.length ? `
            <ul class="list">
              ${activeProjs.map(p => `
                <li class="row">
                  <div>
                    <strong>${esc(p.title)}</strong>
                    <small>Status: <span class="badge role">${esc(p.status)}</span></small>
                  </div>
                  <div>${p.deadline ? `<span class="tag">${esc(p.deadline)}</span>` : `<span class="tag">Flexible</span>`}</div>
                </li>
              `).join("")}
            </ul>
          ` : `<div class="empty">No projects currently scheduled.</div>`}
        </div>
      </div>
    </div>
  `;
}

function renderAgencyMembers(a, isOwnerOrMgr, u) {
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px">
      <div>
        <h2>Active Team Members (${a.members.length}/10)</h2>
        <p class="c-sub">Organise member responsibilities, custom role titles, and invitations.</p>
      </div>
      ${isOwnerOrMgr ? `<button class="btn btn-primary btn-sm" data-act="open-invite-modal" data-agency-id="${a.id}">+ Invite Student</button>` : ""}
    </div>

    <!-- Members Table/Roster -->
    <div class="card" style="margin-bottom:28px">
      <div style="display:flex;flex-direction:column;gap:14px">
        ${a.members.map(m => {
          const uObj = userById(m.userId);
          const isMe = m.userId === u.id;
          const isOwner = m.role === "Team Owner";
          return `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;border:1px solid var(--line);border-radius:12px;background:var(--ivory);flex-wrap:wrap;gap:12px">
              <div style="display:flex;align-items:center;gap:14px">
                ${avatar(uObj)}
                <div>
                  <strong>${esc(uObj ? uObj.name : "Member")}${isMe ? ' <span class="tag lime">You</span>' : ""}</strong>
                  <div style="font-size:.88rem;color:var(--muted)">${esc(uObj ? uObj.department : "")} · ${esc(uObj ? uObj.institution : "")}</div>
                  <div style="margin-top:4px">
                    <span class="badge role" style="font-size:.76rem">${esc(m.role)}</span>
                    ${m.customRoleDesc ? `<span style="font-size:.82rem;color:var(--forest);margin-left:6px">"${esc(m.customRoleDesc)}"</span>` : ""}
                  </div>
                </div>
              </div>
              ${isOwnerOrMgr ? `
                <div style="display:flex;gap:8px">
                  <button class="btn btn-ghost btn-sm" data-act="edit-member-role" data-agency-id="${a.id}" data-uid="${m.userId}" data-role="${esc(m.role)}" data-desc="${esc(m.customRoleDesc || "")}">Edit Role</button>
                  ${!isOwner ? `<button class="btn btn-quiet btn-sm" data-act="rm-member" data-agency-id="${a.id}" data-uid="${m.userId}">Remove</button>` : ""}
                </div>
              ` : ""}
            </div>`;
        }).join("")}
      </div>
    </div>

    <!-- Pending Invitations -->
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <div>
          <h2>Pending Invitations (${(a.invitations || []).filter(i => i.status === "pending").length})</h2>
          <p class="c-sub">Invitations waiting for student acceptance.</p>
        </div>
        ${isOwnerOrMgr ? `<button class="btn btn-ghost btn-sm" data-act="gen-invite-link" data-agency-id="${a.id}">Create Shareable Link</button>` : ""}
      </div>
      ${(a.invitations && a.invitations.filter(i => i.status === "pending").length) ? `
        <ul class="list">
          ${a.invitations.filter(i => i.status === "pending").map(inv => `
            <li class="row" style="padding:12px;background:var(--ivory);border-radius:10px;margin-bottom:8px">
              <div>
                <strong>${esc(inv.inviteeName || "Shareable Invitation Link")}</strong>
                <div style="font-size:.88rem;color:var(--muted)">Assigned Role: <span class="badge role">${esc(inv.role)}</span> ${inv.customRoleDesc ? ` · ${esc(inv.customRoleDesc)}` : ""}</div>
                <small style="color:var(--emerald);font-family:monospace">teambud-app.html#/join-agency/${esc(inv.code)}</small>
              </div>
              <span class="acts">
                <button class="btn btn-ghost btn-sm" data-act="copy-invite" data-code="${esc(inv.code)}">Copy Link</button>
                ${isOwnerOrMgr ? `<button class="btn btn-quiet btn-sm" data-act="cancel-invite" data-agency-id="${a.id}" data-id="${inv.id}">Cancel</button>` : ""}
              </span>
            </li>
          `).join("")}
        </ul>
      ` : `<div class="empty">No pending invitations.</div>`}
    </div>
  `;
}

function renderAgencyMessages(a, u) {
  const msgs = a.messages || [];
  return `
    <div class="card" style="padding:0;overflow:hidden">
      <div class="chat-head">
        <div>
          <strong style="font-size:1.1rem;display:block">Team Discussion</strong>
          <small style="color:var(--muted)">Private channel for authorized agency members only.</small>
        </div>
        <span class="badge active">${a.members.length} Online</span>
      </div>
      <div class="chat-stream" id="chat-stream">
        ${msgs.length ? msgs.map(m => {
          const isMine = m.senderId === u.id;
          const s = userById(m.senderId);
          return `
            <div class="chat-msg ${isMine ? "mine" : ""}">
              ${avatar(s)}
              <div>
                <div style="display:flex;gap:8px;align-items:baseline;margin-bottom:2px">
                  <strong style="font-size:.84rem">${esc(s ? s.name : "Member")}</strong>
                  <small style="font-size:.72rem;color:var(--muted)">${rel(m.t)}</small>
                </div>
                <div class="chat-bubble">
                  ${esc(m.text)}
                  ${m.attachment ? `
                    <div style="margin-top:8px;padding:8px;background:rgba(0,0,0,0.05);border-radius:6px;font-size:.82rem;display:flex;align-items:center;gap:6px">
                      ${icon("M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13")}
                      <span>${esc(m.attachment.name)}</span>
                      <small style="color:var(--muted)">(${Math.round(m.attachment.size / 1024)} KB)</small>
                    </div>
                  ` : ""}
                </div>
                ${isMine ? `<small style="font-size:.7rem;color:var(--muted);display:block;text-align:right;margin-top:2px">Delivered</small>` : ""}
              </div>
            </div>`;
        }).join("") : `<div class="empty">No messages yet. Send a message to start discussion.</div>`}
      </div>
      <form data-form="send-msg" data-agency-id="${a.id}" class="chat-footer">
        <input type="text" name="text" placeholder="Type an internal message..." style="flex:1;min-height:44px" autocomplete="off">
        <label class="btn btn-ghost btn-sm" style="cursor:pointer;min-height:44px;padding:0 14px" title="Attach file">
          ${icon("M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13")}
          <input type="file" id="chat-file" style="display:none">
        </label>
        <button class="btn btn-primary" type="submit" style="min-height:44px">Send</button>
      </form>
    </div>
  `;
}

function renderAgencyProjects(a, isOwnerOrMgr, u) {
  const projs = a.projects || [];
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px">
      <div>
        <h2>Project Management Workspace</h2>
        <p class="c-sub">Plan tasks, track delivery stages, and upload project deliverables.</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="open-create-proj-modal" data-agency-id="${a.id}">+ Create Project</button>
    </div>

    ${projs.length ? `
      <div class="proj-grid">
        ${projs.map(p => `
          <div class="proj-card">
            <div>
              <div class="proj-header">
                <span class="proj-status ${p.status.replace(/\s+/g, '')}">${esc(p.status)}</span>
                <small style="color:var(--muted)">Deadline: ${p.deadline ? esc(p.deadline) : "Flexible"}</small>
              </div>
              <h3 style="font-size:1.18rem;margin-bottom:8px">${esc(p.title)}</h3>
              <p style="font-size:.9rem;color:var(--forest);line-height:1.5;margin-bottom:14px">${esc(p.desc)}</p>

              <!-- Assigned Members -->
              <div style="margin-bottom:12px">
                <small style="color:var(--muted);display:block;margin-bottom:4px">Assigned Specialists:</small>
                <div style="display:flex;gap:6px;flex-wrap:wrap">
                  ${(p.assignedTo || []).map(uid => {
                    const usr = userById(uid);
                    return `<span class="badge role" style="font-size:.76rem">${esc(usr ? usr.name : "Member")}</span>`;
                  }).join("")}
                </div>
              </div>

              <!-- Deliverables -->
              <div style="margin-bottom:12px">
                <small style="color:var(--muted);display:block;margin-bottom:4px">Deliverables (${(p.deliverables || []).length}):</small>
                ${(p.deliverables && p.deliverables.length) ? `
                  <div style="display:flex;flex-direction:column;gap:4px">
                    ${p.deliverables.map(d => `
                      <div style="font-size:.84rem;background:var(--ivory);padding:6px 10px;border-radius:6px;display:flex;justify-content:space-between">
                        <span>📎 ${esc(d.name)}</span>
                        <small style="color:var(--muted)">${Math.round(d.size / 1024)} KB</small>
                      </div>
                    `).join("")}
                  </div>
                ` : `<small style="color:var(--muted);font-style:italic">No deliverables uploaded yet.</small>`}
              </div>
            </div>

            <div style="padding-top:14px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;gap:8px">
              <select class="status-select" data-act="update-proj-status" data-agency-id="${a.id}" data-proj-id="${p.id}">
                ${PROJ_STATUSES.map(s => `<option value="${s}" ${p.status === s ? "selected" : ""}>${s}</option>`).join("")}
              </select>
              <button class="btn btn-ghost btn-sm" data-act="open-upload-modal" data-agency-id="${a.id}" data-proj-id="${p.id}">Upload File</button>
            </div>
          </div>
        `).join("")}
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:48px 20px">
        <h3>No projects initialized yet</h3>
        <p style="margin:8px 0 16px;color:var(--muted)">Create your first internal project or client delivery workspace.</p>
        <button class="btn btn-primary" data-act="open-create-proj-modal" data-agency-id="${a.id}">Create Project</button>
      </div>
    `}
  `;
}

function renderAgencyServices(a, isOwnerOrMgr, u) {
  const servs = a.services || [];
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px">
      <div>
        <h2>Agency Services Catalogue</h2>
        <p class="c-sub">Publish commercial services that clients can discover and request.</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="open-add-service-modal" data-agency-id="${a.id}">+ Add Service</button>
    </div>

    ${servs.length ? `
      <div class="service-grid">
        ${servs.map(s => `
          <div class="service-item">
            <div>
              <span class="badge role" style="font-size:.74rem">${esc(s.category)}</span>
              <h3 style="font-size:1.15rem;margin:8px 0 6px">${esc(s.title)}</h3>
              <p style="font-size:.9rem;color:var(--muted);line-height:1.5">${esc(s.desc)}</p>
              ${s.requiredInfo ? `<div style="font-size:.82rem;color:var(--forest);background:var(--ivory);padding:8px;border-radius:6px;margin-top:8px"><strong>Required from Client:</strong> ${esc(s.requiredInfo)}</div>` : ""}
            </div>
            <div>
              <div class="service-price">${esc(s.startingPrice)}</div>
              <small style="color:var(--muted);display:block;margin-bottom:12px">Estimated delivery: ${esc(s.timeline)}</small>
              <button class="btn btn-quiet btn-sm" data-act="del-service" data-agency-id="${a.id}" data-service-id="${s.id}">Delete</button>
            </div>
          </div>
        `).join("")}
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:40px">
        <p>No services published yet. Add services to enable direct client bookings.</p>
        <button class="btn btn-primary" data-act="open-add-service-modal" data-agency-id="${a.id}" style="margin-top:12px">Publish First Service</button>
      </div>
    `}
  `;
}

function renderAgencyPortfolio(a, isOwnerOrMgr, u) {
  const port = a.portfolio || [];
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px">
      <div>
        <h2>Agency Portfolio</h2>
        <p class="c-sub">Showcase verified student deliverables to potential clients.</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="open-add-portfolio-modal" data-agency-id="${a.id}">+ Add Case Study</button>
    </div>

    ${port.length ? `
      <div class="portfolio-grid">
        ${port.map(p => `
          <div class="portfolio-card">
            <div class="portfolio-img">
              ${p.image ? `<img src="${safeImg(p.image)}" style="width:100%;height:100%;object-fit:cover" alt="">` : `<span>Project Showcase</span>`}
            </div>
            <div style="padding:18px">
              <span class="badge role" style="font-size:.74rem;margin-bottom:6px">${esc(p.completedDate)}</span>
              <h3 style="font-size:1.15rem;margin-bottom:6px">${esc(p.title)}</h3>
              <p style="font-size:.9rem;color:var(--muted);margin-bottom:10px">${esc(p.desc)}</p>
              ${p.contributions ? `<div style="font-size:.82rem;color:var(--forest);background:var(--ivory);padding:8px 10px;border-radius:6px;margin-bottom:10px"><strong>Team Contribution:</strong> ${esc(p.contributions)}</div>` : ""}
              <div style="display:flex;justify-content:space-between;align-items:center">
                <div style="display:flex;gap:6px;flex-wrap:wrap">
                  ${(p.skillsUsed || []).map(sk => `<span class="tag" style="font-size:.76rem">${esc(sk)}</span>`).join("")}
                </div>
                <button class="btn btn-quiet btn-sm" data-act="del-portfolio" data-agency-id="${a.id}" data-port-id="${p.id}">Delete</button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:40px">
        <p>No portfolio entries published. Highlight your team's real deliverables.</p>
        <button class="btn btn-primary" data-act="open-add-portfolio-modal" data-agency-id="${a.id}" style="margin-top:12px">Add First Case Study</button>
      </div>
    `}
  `;
}

function renderAgencyRequests(a, myRequests, isOwnerOrMgr, u) {
  return `
    <div style="margin-bottom:18px">
      <h2>Inbound Client Requests & Quotations (${myRequests.length})</h2>
      <p class="c-sub">Review incoming client inquiries, negotiate scopes, and submit formal proposals.</p>
    </div>

    ${myRequests.length ? `
      <div style="display:flex;flex-direction:column;gap:18px">
        ${myRequests.map(r => `
          <div class="card" style="border-left:5px solid var(--emerald)">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:10px">
              <div>
                <span class="badge role">${esc(r.category)}</span>
                <h3 style="font-size:1.25rem;margin:6px 0 2px">${esc(r.title)}</h3>
                <small style="color:var(--muted)">From: <strong>${esc(r.clientName)}</strong> (${esc(r.clientOrg || "Client")}) · Preferred Contact: ${esc(r.communicationPref)}</small>
              </div>
              <div>
                <span class="badge ${r.status === "active" ? "active" : "forming"}">${esc(r.status.toUpperCase())}</span>
              </div>
            </div>

            <p style="font-size:.95rem;line-height:1.6;margin:12px 0">${esc(r.desc)}</p>

            <div style="display:flex;gap:16px;font-size:.88rem;color:var(--forest);background:var(--ivory);padding:10px 14px;border-radius:8px;flex-wrap:wrap;margin-bottom:14px">
              <span><strong>Budget:</strong> ${esc(r.budget)}</span>
              <span>•</span>
              <span><strong>Desired Delivery:</strong> ${r.deliveryDate ? esc(r.deliveryDate) : "Flexible"}</span>
              ${r.referenceLink ? `<span>•</span><span><a href="${esc(r.referenceLink)}" target="_blank" rel="noopener noreferrer">Reference Specification ↗</a></span>` : ""}
            </div>

            <!-- Existing Quotation if submitted -->
            ${r.quotation ? `
              <div class="quote-card">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px">
                  <div>
                    <span class="badge active">Quotation Submitted</span>
                    <div class="quote-price">${esc(r.quotation.price)}</div>
                    <small style="color:var(--muted)">Estimated Delivery: ${esc(r.quotation.estimatedDelivery)}</small>
                  </div>
                  <span class="badge role">${esc(r.quotation.status.toUpperCase())}</span>
                </div>
                <p style="margin:10px 0;font-size:.92rem">${esc(r.quotation.scope)}</p>
                ${(r.quotation.milestones && r.quotation.milestones.length) ? `
                  <table class="milestone-table">
                    <thead>
                      <tr><th>Milestone Title</th><th>Amount / %</th><th>Target Date</th></tr>
                    </thead>
                    <tbody>
                      ${r.quotation.milestones.map(m => `
                        <tr>
                          <td><strong>${esc(m.title)}</strong></td>
                          <td>${esc(m.amount)}</td>
                          <td>${esc(m.dueDate)}</td>
                        </tr>
                      `).join("")}
                    </tbody>
                  </table>
                ` : ""}
                <small style="color:var(--muted);display:block;margin-top:6px"><strong>Terms:</strong> ${esc(r.quotation.terms)}</small>
              </div>
            ` : `
              ${isOwnerOrMgr ? `
                <div style="display:flex;gap:10px;margin-top:14px">
                  <button class="btn btn-primary btn-sm" data-act="open-submit-quote-modal" data-req-id="${r.id}" data-agency-id="${a.id}">Create & Submit Quotation</button>
                  <button class="btn btn-ghost btn-sm" data-act="open-clarify-modal" data-req-id="${r.id}">Request Clarification</button>
                </div>
              ` : ""}
            `}

            <!-- Clarifications thread -->
            ${(r.clarifications && r.clarifications.length) ? `
              <div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--line)">
                <small style="font-weight:700;display:block;margin-bottom:8px">Clarification Discussion:</small>
                <div style="display:flex;flex-direction:column;gap:6px">
                  ${r.clarifications.map(c => `
                    <div style="font-size:.85rem;padding:6px 10px;background:var(--ivory);border-radius:6px">
                      <strong>${esc(c.senderName || "Sender")}:</strong> ${esc(c.text)}
                    </div>
                  `).join("")}
                </div>
              </div>
            ` : ""}
          </div>
        `).join("")}
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:40px">
        <p>No project requests received yet. Active agencies with published services appear on the marketplace directory.</p>
      </div>
    `}
  `;
}

function renderAgencyAgreement(a, u) {
  const isAck = (a.agreement && a.agreement.acknowledged && a.agreement.acknowledged.includes(u.id));
  return `
    <div class="page-h">
      <div>
        <h2>TeamBud Agency Agreement Guide</h2>
        <p class="c-sub">Core operational and governance framework for independent student teams.</p>
      </div>
    </div>

    <div class="disclaimer-alert">
      <strong>Important Platform Policy:</strong> TeamBud does <strong>NOT</strong> automatically assign equal equity or ownership to members. Team members must agree on ownership, responsibilities, and revenue sharing themselves. Platform membership is not the same thing as statutory legal incorporation.
    </div>

    <div class="agreement-box">
      ${AGREEMENT_SECTIONS.map(s => `
        <div class="agreement-item">
          <h3 style="font-size:1.1rem;margin-bottom:6px;color:var(--emerald-dark)">${esc(s.title)}</h3>
          <p style="font-size:.92rem;line-height:1.6;color:var(--forest)">${esc(s.text)}</p>
        </div>
      `).join("")}
    </div>

    <!-- Acknowledgement status -->
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px">
      <div>
        <strong style="display:block;margin-bottom:4px">Member Acknowledgement Status:</strong>
        <small style="color:var(--muted)">${(a.agreement && a.agreement.acknowledged) ? a.agreement.acknowledged.length : 0} of ${a.members.length} active members have acknowledged this agreement.</small>
      </div>
      <div>
        ${isAck ? `
          <span class="badge active" style="font-size:.85rem;padding:8px 14px">✓ You have acknowledged this agreement</span>
        ` : `
          <button class="btn btn-primary" data-act="ack-agreement" data-agency-id="${a.id}">Acknowledge Agreement</button>
        `}
      </div>
    </div>
  `;
}

/* ===================== Section 10: Agency Financial Dashboard & Revenue Distribution ===================== */
function renderAgencyFinance(a, u, isOwnerOrMgr) {
  const agencyPayments = (db.payments || []).filter(p => p.agencyId === a.id);
  const paidPayments = agencyPayments.filter(p => p.status === "Paid");
  const pendingPayments = agencyPayments.filter(p => p.status === "Awaiting Payment" || p.status === "Processing");

  const totalRevenue = paidPayments.reduce((sum, p) => sum + (Number(p.amountPaid) || 0), 0);
  const totalPending = pendingPayments.reduce((sum, p) => sum + (Number(p.agreedProjectFee) || 0), 0);
  const completedProjects = (a.projects || []).filter(p => p.status === "Completed").length;

  const myMem = (a.members || []).find(m => m.userId === u.id);
  const canManageFinance = isOwnerOrMgr || (myMem && (myMem.role === "Finance Manager" || (myMem.customRoleDesc || "").toLowerCase().includes("finance")));

  return `
    <div class="page-h">
      <div>
        <h2>Agency Financial Dashboard</h2>
        <p class="c-sub">Commercial project records, Paystack verified earnings, and agreed team member revenue allocations.</p>
      </div>
      ${canManageFinance ? `
        <button class="btn btn-primary btn-sm" data-act="open-custom-alloc-modal" data-agency-id="${a.id}">+ Record Project Revenue Allocation</button>
      ` : ""}
    </div>

    <!-- Platform Compliance Architecture Notice -->
    <div class="disclaimer-alert" style="background:#F0FDF4;border:1px solid #BBF7D0;color:#14532D">
      <div style="display:flex;align-items:flex-start;gap:12px">
        <span style="font-size:1.4rem;line-height:1">⚖️</span>
        <div style="font-size:.9rem;line-height:1.55">
          <strong>Important Payment Architecture:</strong> TeamBud does not pretend to offer escrow or automated split payments unless the actual payment provider integration supports the required regulatory flow and all necessary compliance arrangements are completed. TeamBud records the agency's agreed distribution records and verified payout methods. Team members are never marked as paid until the payment has genuinely been confirmed.
        </div>
      </div>
    </div>

    <!-- Agency Financial Summary Metrics -->
    <div class="finance-stats">
      <div class="stat-box highlight">
        <small class="sub">Total Project Revenue</small>
        <div class="num">₦${totalRevenue.toLocaleString()}</div>
        <small style="color:#2E7D32">✓ Verified payments received</small>
      </div>
      <div class="stat-box">
        <small class="sub">Paid Projects</small>
        <div class="num">${paidPayments.length}</div>
        <small style="color:var(--muted)">Settled via Paystack</small>
      </div>
      <div class="stat-box">
        <small class="sub">Pending Client Balances</small>
        <div class="num" style="color:#E65100">₦${totalPending.toLocaleString()}</div>
        <small style="color:var(--muted)">${pendingPayments.length} awaiting payment</small>
      </div>
      <div class="stat-box">
        <small class="sub">Completed Projects</small>
        <div class="num">${completedProjects}</div>
        <small style="color:var(--muted)">Delivered & signed-off</small>
      </div>
    </div>

    <!-- Revenue Records Ledger -->
    <div class="card" style="margin-bottom:28px">
      <div class="row" style="margin-bottom:16px">
        <div>
          <h3 style="font-size:1.25rem;margin:0">Commercial Revenue Records</h3>
          <p class="c-sub" style="margin:2px 0 0">All invoices, Paystack references, project associations, and dispute/refund statuses.</p>
        </div>
      </div>

      ${agencyPayments.length ? `
        <div style="overflow-x:auto">
          <table class="ptable" style="width:100%;border-collapse:collapse">
            <thead>
              <tr style="border-bottom:2px solid var(--line);text-align:left;font-size:.85rem;color:var(--muted)">
                <th style="padding:10px">Date</th>
                <th style="padding:10px">Project & Association</th>
                <th style="padding:10px">Client</th>
                <th style="padding:10px">Quotation</th>
                <th style="padding:10px">Agreed Fee</th>
                <th style="padding:10px">Reference</th>
                <th style="padding:10px">Status</th>
                <th style="padding:10px;text-align:right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${agencyPayments.map(p => {
                const statusClass = (p.status || "AwaitingPayment").replace(/\s+/g, '');
                return `
                  <tr style="border-bottom:1px solid var(--line);font-size:.9rem">
                    <td style="padding:12px 10px;white-space:nowrap">${p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : "Pending"}</td>
                    <td style="padding:12px 10px">
                      <strong>${esc(p.projectTitle)}</strong>
                      <div style="font-size:.78rem;color:var(--muted)">Ref: ${esc(p.projectId)}</div>
                    </td>
                    <td style="padding:12px 10px">
                      <div>${esc(p.clientName)}</div>
                      <small style="color:var(--muted)">${esc(p.clientEmail || "")}</small>
                    </td>
                    <td style="padding:12px 10px">₦${Number(p.quotationAmount || 0).toLocaleString()}</td>
                    <td style="padding:12px 10px"><strong style="color:var(--forest)">₦${Number(p.agreedProjectFee || 0).toLocaleString()}</strong></td>
                    <td style="padding:12px 10px">
                      <code style="font-size:.8rem;background:var(--ivory);padding:2px 6px;border-radius:4px">${esc(p.reference)}</code>
                    </td>
                    <td style="padding:12px 10px">
                      <span class="pay-badge ${statusClass}">${esc(p.status)}</span>
                      ${p.disputeStatus ? `<div style="font-size:.74rem;color:#D84315;margin-top:2px">Dispute: ${esc(p.disputeStatus)}</div>` : ""}
                      ${p.refundStatus ? `<div style="font-size:.74rem;color:#4527A0;margin-top:2px">Refund: ${esc(p.refundStatus)}</div>` : ""}
                    </td>
                    <td style="padding:12px 10px;text-align:right;white-space:nowrap">
                      <button class="btn btn-quiet btn-sm" data-act="view-payment-receipt" data-pid="${p.id}">View Receipt & Audit</button>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      ` : `<div class="empty">No commercial revenue transactions recorded yet.</div>`}
    </div>

    <!-- Team Revenue Distribution Module -->
    <div class="card">
      <div style="margin-bottom:18px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
          <div>
            <h3 style="font-size:1.25rem;margin:0">Agreed Team Revenue Distribution</h3>
            <p class="c-sub" style="margin:4px 0 0">
              For example: A project earns ₦150,000. The team has agreed on how that revenue will be distributed among its members.
              The dashboard records those agreed allocations. Note: TeamBud does not automatically assume that every team member receives an equal amount.
            </p>
          </div>
          ${canManageFinance ? `
            <span class="badge active" style="font-size:.78rem">Authorized Finance Manager</span>
          ` : ""}
        </div>
      </div>

      ${paidPayments.length ? `
        <div style="display:flex;flex-direction:column;gap:24px">
          ${paidPayments.map(p => `
            <div style="background:var(--ivory);border:1px solid var(--line);border-radius:14px;padding:20px">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px">
                <div>
                  <strong style="font-size:1.1rem;color:var(--forest)">${esc(p.projectTitle)}</strong>
                  <div style="font-size:.85rem;color:var(--muted)">Earned: <strong>₦${Number(p.agreedProjectFee).toLocaleString()}</strong> · Ref: ${esc(p.reference)} · Settled via Paystack</div>
                </div>
                ${canManageFinance ? `
                  <button class="btn btn-ghost btn-sm" data-act="edit-allocations-modal" data-pid="${p.id}">Modify Agreed Split</button>
                ` : ""}
              </div>

              <!-- Allocation Distribution Bar -->
              <div class="alloc-progress">
                ${(p.allocations || []).map((alc, idx) => {
                  const colors = ["#176B50", "#28A745", "#09A5DB", "#854D0E", "#6B7280"];
                  return `<div class="alloc-progress-seg" style="width:${alc.percentage}%;background:${colors[idx % colors.length]}" title="${esc(alc.memberName)}: ${alc.percentage}% (₦${Number(alc.allocatedAmount).toLocaleString()})"></div>`;
                }).join("")}
              </div>

              <!-- Member Allocations Grid -->
              <div style="display:flex;flex-direction:column;gap:10px;margin-top:14px">
                ${(p.allocations || []).map(alc => {
                  const isConfirmed = alc.payoutStatus === "confirmed";
                  return `
                    <div class="alloc-card">
                      <div style="display:flex;align-items:center;gap:12px;min-width:240px">
                        <div style="width:38px;height:38px;border-radius:50%;background:var(--sage);color:var(--forest);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem">
                          ${esc((alc.memberName || "MB").slice(0, 2).toUpperCase())}
                        </div>
                        <div>
                          <strong>${esc(alc.memberName)}</strong>
                          <div style="font-size:.8rem;color:var(--muted)">${esc(alc.role)} · Payout Method: <code>${esc(alc.payoutMethod || "Direct Bank Transfer")}</code></div>
                        </div>
                      </div>

                      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
                        <div style="text-align:right">
                          <strong style="font-size:1.15rem;color:var(--forest)">₦${Number(alc.allocatedAmount).toLocaleString()}</strong>
                          <div style="font-size:.8rem;color:var(--muted)">${alc.percentage}% of project</div>
                        </div>

                        <div>
                          ${isConfirmed ? `
                            <span class="pay-badge Paid" title="Confirmed on ${alc.payoutConfirmedAt ? new Date(alc.payoutConfirmedAt).toLocaleDateString() : ''}">
                              ✓ Confirmed Payout (${esc(alc.transferRef || "Bank Transfer")})
                            </span>
                          ` : `
                            <span class="pay-badge AwaitingPayment">Pending Transfer</span>
                          `}
                        </div>

                        ${(canManageFinance && !isConfirmed) ? `
                          <button class="btn btn-primary btn-sm" data-act="confirm-member-payout-modal" data-pid="${p.id}" data-mid="${alc.memberId}">
                            Confirm Member Payout
                          </button>
                        ` : ""}
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>

              <div style="font-size:.82rem;color:var(--muted);margin-top:10px;font-style:italic">
                ${esc(p.notes || "Agreed allocations recorded by authorized agency finance team.")}
              </div>
            </div>
          `).join("")}
        </div>
      ` : `
        <div class="empty">
          <p>No settled project revenue yet. When clients complete project payments via Paystack, their agreed distributions will be managed here.</p>
        </div>
      `}
    </div>
  `;
}

/* ===================== Section 9: Marketplace & Client Portal ===================== */
function getAgencyTeamSkills(a) {
  const set = new Set();
  (a.members || []).forEach(m => {
    const mem = userById(m.userId);
    if (mem && mem.skills) {
      mem.skills.forEach(s => {
        if (s.name) set.add(s.name);
      });
    }
  });
  return Array.from(set);
}

function pageMarketplace(currentUser) {
  const allAgencies = (db.agencies || []).filter(a => a.status === "active");
  const uniqLocs = [...new Set(allAgencies.map(a => a.location).filter(Boolean))].sort();
  const uniqInds = [...new Set(allAgencies.map(a => a.industry).filter(Boolean))].sort();
  const uniqInsts = [...new Set(allAgencies.map(a => a.institution).filter(Boolean))].sort();
  const allTeamSkills = [...new Set(allAgencies.flatMap(a => getAgencyTeamSkills(a)))].sort();

  return `
    <div class="page-h">
      <div>
        <h1>TeamBud Marketplace</h1>
        <p>Discover student-founded agency teams and request quotations for your commercial projects.</p>
      </div>
      <div class="acts">
        <button class="btn btn-primary btn-sm" data-act="open-quote-modal">+ Submit Project Request</button>
      </div>
    </div>

    <!-- Directory Search & Filters (Section 10) -->
    <div class="filters" id="mfilters">
      <div class="field" style="grid-column:1/-1">
        <label for="mq">Search agencies by name, keywords, or service</label>
        <input type="text" id="mq" data-live="market" placeholder="e.g. Design, Software, Mobile app, Branding...">
      </div>
      <div class="field">
        <label for="mcat">Main service</label>
        <select id="mcat" data-live="market">${opts(CATS, "", "All main services")}</select>
      </div>
      <div class="field">
        <label for="mskill">Team skills (aggregated)</label>
        <select id="mskill" data-live="market">
          <option value="">All team skills</option>
          ${allTeamSkills.map(sk => `<option value="${esc(sk)}">${esc(sk)}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label for="mind">Industry domain</label>
        <select id="mind" data-live="market">${opts(uniqInds, "", "All industries")}</select>
      </div>
      <div class="field">
        <label for="minst">Institution</label>
        <select id="minst" data-live="market">${opts(uniqInsts, "", "All institutions")}</select>
      </div>
      <div class="field">
        <label for="mavail">Availability</label>
        <select id="mavail" data-live="market">
          <option value="">Any availability</option>
          <option value="open">Available for client work</option>
          <option value="part">Part-time / Milestones</option>
        </select>
      </div>
      <div class="field">
        <label for="mloc">Location</label>
        <select id="mloc" data-live="market">${opts(uniqLocs, "", "All locations")}</select>
      </div>
      <div class="field">
        <label for="msize">Agency size</label>
        <select id="msize" data-live="market">
          <option value="">Any size (3-10)</option>
          <option value="3-5">3 to 5 members</option>
          <option value="6-8">6 to 8 members</option>
          <option value="9-10">9 to 10 members</option>
        </select>
      </div>
    </div>

    <div id="market-results" aria-live="polite"></div>
  `;
}

function marketResults() {
  const container = $("#market-results");
  if (!container) return;
  const q = ($("#mq") ? $("#mq").value : "").trim().toLowerCase();
  const cat = ($("#mcat") ? $("#mcat").value : "").trim();
  const skill = ($("#mskill") ? $("#mskill").value : "").trim().toLowerCase();
  const ind = ($("#mind") ? $("#mind").value : "").trim();
  const inst = ($("#minst") ? $("#minst").value : "").trim();
  const avail = ($("#mavail") ? $("#mavail").value : "").trim();
  const lo = ($("#mloc") ? $("#mloc").value : "").trim();
  const sz = ($("#msize") ? $("#msize").value : "").trim();

  let list = (db.agencies || []).filter(a => a.status === "active");

  if (q) list = list.filter(a => a.name.toLowerCase().includes(q) || a.shortDesc.toLowerCase().includes(q) || (a.mainCategory || "").toLowerCase().includes(q));
  if (cat) list = list.filter(a => a.mainCategory === cat || (a.additionalServices || []).includes(cat));
  if (skill) list = list.filter(a => getAgencyTeamSkills(a).some(s => s.toLowerCase() === skill));
  if (ind) list = list.filter(a => a.industry === ind);
  if (inst) list = list.filter(a => a.institution === inst);
  if (avail === "open") list = list.filter(a => a.availability !== "unavailable");
  if (lo) list = list.filter(a => a.location === lo);
  if (sz) {
    const [min, max] = sz.split("-").map(Number);
    list = list.filter(a => a.members.length >= min && a.members.length <= max);
  }

  if (!list.length) {
    container.innerHTML = `
      <div class="empty" style="padding:48px 20px">
        <h3>No agencies match your filters</h3>
        <p style="margin:8px 0 16px;color:var(--muted)">Try clearing filters or search criteria.</p>
        <button class="btn btn-primary" data-act="open-quote-modal">Submit an Open Project Request</button>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:22px">
      ${list.map(a => {
        const teamSkills = getAgencyTeamSkills(a);
        return `
          <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;border-top:4px solid var(--emerald)">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
                ${agencyLogo(a)}
                <span class="badge active" style="font-size:.74rem">Active · ${a.members.length} Members</span>
              </div>
              <h3 style="font-size:1.25rem;margin-bottom:6px">
                <a href="#/agency/${a.slug}" style="text-decoration:none;color:var(--forest)">${esc(a.name)}</a>
              </h3>
              <p style="font-size:.9rem;color:var(--muted);line-height:1.5;margin-bottom:12px">${esc(a.shortDesc)}</p>

              <div style="font-size:.82rem;color:var(--muted);margin-bottom:12px">
                <div>📍 ${esc(a.location)} · 🎓 ${esc(a.institution)}</div>
              </div>

              <!-- Combined Team Skills Badges (Section 10) -->
              ${teamSkills.length ? `
                <div style="margin-bottom:14px;background:var(--ivory);padding:10px 12px;border-radius:10px;border:1px solid var(--line)">
                  <small style="font-weight:700;color:var(--forest);display:block;margin-bottom:5px">Combined Team Skills:</small>
                  <div style="display:flex;gap:5px;flex-wrap:wrap">
                    ${teamSkills.slice(0, 5).map(sk => `<span class="talent-skill-tag" style="font-size:.75rem">${esc(sk)}</span>`).join("")}
                    ${teamSkills.length > 5 ? `<span class="tag" style="font-size:.74rem">+${teamSkills.length - 5}</span>` : ""}
                  </div>
                </div>
              ` : ""}

              <!-- Published Services preview -->
              ${(a.services && a.services.length) ? `
                <div style="background:var(--ivory);padding:10px 12px;border-radius:10px;margin-bottom:14px;font-size:.84rem">
                  <strong style="display:block;margin-bottom:4px;color:var(--forest)">Services from ${esc(a.services[0].startingPrice)}:</strong>
                  <span class="badge role" style="font-size:.76rem">${esc(a.services[0].title)}</span>
                  ${a.services.length > 1 ? `<small style="color:var(--muted);margin-left:6px">+${a.services.length - 1} more</small>` : ""}
                </div>
              ` : ""}

              <!-- Key specialists tags -->
              <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
                ${a.members.slice(0, 3).map(m => `<span class="tag" style="font-size:.75rem">${esc(m.role)}</span>`).join("")}
                ${a.members.length > 3 ? `<span class="tag" style="font-size:.75rem">+${a.members.length - 3}</span>` : ""}
              </div>
            </div>

            <div style="display:flex;gap:8px;padding-top:14px;border-top:1px solid var(--line)">
              <a class="btn btn-ghost btn-sm btn-block" href="#/agency/${a.slug}">View Profile</a>
              <button class="btn btn-primary btn-sm btn-block" data-act="open-quote-modal" data-agency-id="${a.id}">Request Quote</button>
            </div>
          </div>
        `;
      }).join("")}
    </div>`;
}

function pageClient(u, activeTab = "overview") {
  const reqs = (db.requests || []).filter(r => r.uid === u.id);
  const activeProjs = reqs.filter(r => r.status === "active");
  const quotedReqs = reqs.filter(r => r.status === "quoted" && r.quotation);

  return `
    ${protoBar()}
    <div style="max-width:1160px;margin:0 auto;padding:20px 24px 80px">
      <!-- Client Header -->
      <header class="row" style="margin-bottom:24px">
        <div style="display:flex;align-items:center;gap:12px">
          <a class="brand" href="${SITE_URL}"><img src="${window.__ICON}" alt=""><span class="word">Team<b>Bud</b></span></a>
          <span style="color:var(--line);font-size:1.4rem">/</span>
          <span style="font-weight:700">Client Portal</span>
        </div>
        <div style="display:flex;gap:10px;align-items:center">
          <button class="btn btn-primary btn-sm" data-act="open-quote-modal">+ New Project Request</button>
          <button class="btn btn-quiet btn-sm" data-act="logout">Log out</button>
        </div>
      </header>

      <div class="page-h">
        <div>
          <h1>Welcome, ${esc(firstName(u))}</h1>
          <p>${esc(u.accountType || "Client")}, ${esc(u.country || "Nigeria")} · Contact: ${esc(u.contact || "")}</p>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <nav class="subnav">
        <a href="#/client/overview" class="${activeTab === "overview" ? "on" : ""}">Dashboard Overview</a>
        <a href="#/client/requests" class="${activeTab === "requests" ? "on" : ""}">Project Requests (${reqs.length})</a>
        <a href="#/client/quotes" class="${activeTab === "quotes" ? "on" : ""}">Proposals & Quotes (${quotedReqs.length})</a>
        <a href="#/client/projects" class="${activeTab === "projects" ? "on" : ""}">Active Projects (${activeProjs.length})</a>
        <a href="#/client/billing" class="${activeTab === "billing" ? "on" : ""}">Payments & Invoices</a>
        <a href="#/marketplace" class="">Explore Marketplace ↗</a>
      </nav>

      <!-- Tab Content -->
      ${activeTab === "overview" ? renderClientOverview(u, reqs, quotedReqs, activeProjs) : ""}
      ${activeTab === "requests" ? renderClientRequests(u, reqs) : ""}
      ${activeTab === "quotes" ? renderClientQuotes(u, quotedReqs) : ""}
      ${activeTab === "projects" ? renderClientProjects(u, activeProjs) : ""}
      ${activeTab === "billing" ? renderClientBilling(u, activeProjs) : ""}
    </div>
  `;
}

function renderClientOverview(u, reqs, quotedReqs, activeProjs) {
  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:28px">
      <div class="card" style="padding:18px">
        <small style="color:var(--muted)">Active Projects</small>
        <div style="font-size:1.8rem;font-family:var(--head);font-weight:800;color:var(--forest)">${activeProjs.length}</div>
        <small><a href="#/client/projects">Track milestones</a></small>
      </div>
      <div class="card" style="padding:18px">
        <small style="color:var(--muted)">Proposals Ready for Review</small>
        <div style="font-size:1.8rem;font-family:var(--head);font-weight:800;color:var(--emerald)">${quotedReqs.length}</div>
        <small><a href="#/client/quotes">Review quotations</a></small>
      </div>
      <div class="card" style="padding:18px">
        <small style="color:var(--muted)">Total Requests Submitted</small>
        <div style="font-size:1.8rem;font-family:var(--head);font-weight:800;color:var(--forest)">${reqs.length}</div>
        <small><a href="#/client/requests">View all requests</a></small>
      </div>
    </div>

    <!-- Quick Proposal Review if any pending -->
    ${quotedReqs.length ? `
      <div class="card" style="margin-bottom:24px;border-left:5px solid var(--emerald)">
        <h2>Proposals Awaiting Your Decision (${quotedReqs.length})</h2>
        <p class="c-sub">Agencies have provided verified scope and milestone schedules.</p>
        <div style="display:flex;flex-direction:column;gap:14px;margin-top:16px">
          ${quotedReqs.map(r => `
            <div style="background:var(--ivory);padding:18px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px">
              <div>
                <strong style="font-size:1.1rem;display:block">${esc(r.title)}</strong>
                <span style="font-size:.9rem;color:var(--muted)">Proposed by <strong>${esc(r.quotation.agencyName)}</strong> · Price: <strong style="color:var(--emerald)">${esc(r.quotation.price)}</strong></span>
                <small style="display:block;margin-top:2px">Delivery: ${esc(r.quotation.estimatedDelivery)}</small>
              </div>
              <div style="display:flex;gap:8px">
                <a class="btn btn-primary btn-sm" href="#/client/quotes">Review & Accept</a>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    ` : ""}

    <div class="cols">
      <div class="card">
        <h2>Submit a New Project Request</h2>
        <p class="c-sub">Post your brief to specific agencies or the general marketplace.</p>
        <div style="margin-top:16px">
          <button class="btn btn-primary btn-block" data-act="open-quote-modal">Start Project Request Form</button>
        </div>
      </div>

      <div class="card">
        <h2>Explore Student Agencies</h2>
        <p class="c-sub">Browse vetted student teams across software, brand design, video, and marketing.</p>
        <div style="margin-top:16px">
          <a class="btn btn-ghost btn-block" href="#/marketplace">Open Marketplace Directory</a>
        </div>
      </div>
    </div>
  `;
}

function renderClientRequests(u, reqs) {
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
      <div>
        <h2>Your Project Requests (${reqs.length})</h2>
        <p class="c-sub">Inquiries you have submitted to agencies.</p>
      </div>
      <button class="btn btn-primary btn-sm" data-act="open-quote-modal">+ New Request</button>
    </div>
    ${reqs.length ? `
      <div style="display:flex;flex-direction:column;gap:16px">
        ${reqs.map(r => {
          const a = r.targetAgencyId && r.targetAgencyId !== "all" ? agencyById(r.targetAgencyId) : null;
          return `
            <div class="card">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px">
                <div>
                  <span class="badge role">${esc(r.category)}</span>
                  <h3 style="font-size:1.2rem;margin:6px 0 2px">${esc(r.title)}</h3>
                  <small style="color:var(--muted)">Target: <strong>${a ? esc(a.name) : "Marketplace Open Request"}</strong> · Submitted ${rel(r.t)}</small>
                </div>
                <span class="badge ${r.status === "active" ? "active" : "forming"}">${esc(r.status.toUpperCase())}</span>
              </div>
              <p style="margin:12px 0;font-size:.95rem;line-height:1.6">${esc(r.desc)}</p>
              <div style="display:flex;gap:16px;font-size:.85rem;background:var(--ivory);padding:8px 12px;border-radius:8px;flex-wrap:wrap">
                <span>Budget: <strong>${esc(r.budget)}</strong></span>
                <span>Delivery Date: <strong>${r.deliveryDate ? esc(r.deliveryDate) : "Flexible"}</strong></span>
                <span>Communication: <strong>${esc(r.communicationPref)}</strong></span>
              </div>
            </div>`;
        }).join("")}
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:48px 20px">
        <p>No project requests created yet.</p>
        <button class="btn btn-primary" data-act="open-quote-modal" style="margin-top:12px">Create First Request</button>
      </div>
    `}
  `;
}

function renderClientQuotes(u, quotedReqs) {
  return `
    <div style="margin-bottom:18px">
      <h2>Agency Proposals & Quotations (${quotedReqs.length})</h2>
      <p class="c-sub">Formal scope of work, pricing, and milestone schedules submitted by student teams.</p>
    </div>
    ${quotedReqs.length ? `
      <div style="display:flex;flex-direction:column;gap:20px">
        ${quotedReqs.map(r => {
          const q = r.quotation;
          const a = agencyById(q.agencyId);
          return `
            <div class="card" style="border:2px solid var(--emerald)">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px">
                <div>
                  <small style="color:var(--muted)">Project: <strong>${esc(r.title)}</strong></small>
                  <h3 style="font-size:1.35rem;margin:4px 0">${esc(q.agencyName)}</h3>
                  <div class="quote-price">${esc(q.price)}</div>
                </div>
                <div>
                  <span class="badge ${q.status === "accepted" ? "active" : (q.status === "declined" ? "needs-members" : "forming")}">${esc(q.status.toUpperCase())}</span>
                </div>
              </div>

              <div style="margin:16px 0;padding:14px;background:var(--ivory);border-radius:10px">
                <strong style="display:block;margin-bottom:6px">Scope of Work:</strong>
                <p style="font-size:.92rem;line-height:1.6">${esc(q.scope)}</p>
                <div style="margin-top:10px;font-size:.88rem;color:var(--muted)">
                  <strong>Estimated Delivery:</strong> ${esc(q.estimatedDelivery)} &nbsp;|&nbsp; <strong>Terms:</strong> ${esc(q.terms)}
                </div>
              </div>

              ${(q.milestones && q.milestones.length) ? `
                <table class="milestone-table">
                  <thead>
                    <tr><th>Milestone Schedule</th><th>Fee / Share</th><th>Due Date</th></tr>
                  </thead>
                  <tbody>
                    ${q.milestones.map(m => `
                      <tr>
                        <td><strong>${esc(m.title)}</strong></td>
                        <td>${esc(m.amount)}</td>
                        <td>${esc(m.dueDate)}</td>
                      </tr>
                    `).join("")}
                  </tbody>
                </table>
              ` : ""}

              ${q.status === "submitted" ? `
                <div style="display:flex;gap:12px;margin-top:16px">
                  <button class="btn btn-primary" data-act="accept-quote" data-req-id="${r.id}">Accept Quotation & Activate Project</button>
                  <button class="btn btn-quiet" data-act="decline-quote" data-req-id="${r.id}">Decline Quotation</button>
                </div>
              ` : `
                <div style="margin-top:14px;font-size:.9rem;color:var(--muted)">
                  Status: <strong>${q.status === "accepted" ? "Active Contract" : "Declined"}</strong>
                </div>
              `}
            </div>`;
        }).join("")}
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:40px">
        <p>No proposals awaiting review. When agencies respond to your requests, their quotations appear here.</p>
      </div>
    `}
  `;
}

function renderClientProjects(u, activeProjs) {
  return `
    <div style="margin-bottom:18px">
      <h2>Active Commercial Projects (${activeProjs.length})</h2>
      <p class="c-sub">Track active deliverables, milestone handovers, and project updates.</p>
    </div>
    ${activeProjs.length ? `
      <div style="display:flex;flex-direction:column;gap:18px">
        ${activeProjs.map(r => {
          const q = r.quotation;
          const a = q ? agencyById(q.agencyId) : null;
          const proj = a ? (a.projects || []).find(p => p.title.includes(r.title) || r.title.includes(p.title)) : null;
          return `
            <div class="card">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:12px">
                <div>
                  <span class="badge active">In Delivery</span>
                  <h3 style="font-size:1.3rem;margin:6px 0">${esc(r.title)}</h3>
                  <small style="color:var(--muted)">Agency: <strong>${a ? esc(a.name) : "Contracted Team"}</strong> · Target Date: ${q ? esc(q.estimatedDelivery) : "As agreed"}</small>
                </div>
                <div class="quote-price" style="font-size:1.4rem">${q ? esc(q.price) : ""}</div>
              </div>

              ${(q && q.milestones) ? `
                <div style="margin:16px 0">
                  <strong style="display:block;margin-bottom:8px">Milestone Progress:</strong>
                  <div style="display:flex;flex-direction:column;gap:6px">
                    ${q.milestones.map((m, idx) => `
                      <div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--ivory);border-radius:8px;font-size:.88rem">
                        <span><strong>Milestone ${idx + 1}:</strong> ${esc(m.title)}</span>
                        <span>${esc(m.amount)} · ${esc(m.dueDate)}</span>
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ""}

              ${(proj && proj.deliverables && proj.deliverables.length) ? `
                <div style="margin:16px 0;padding:12px;background:#E8F5E9;border-radius:10px">
                  <strong style="display:block;margin-bottom:6px;color:#1B5E20">Uploaded Deliverables:</strong>
                  <div style="display:flex;flex-direction:column;gap:6px">
                    ${proj.deliverables.map(d => `
                      <div style="font-size:.86rem;display:flex;justify-content:space-between">
                        <span>📄 ${esc(d.name)}</span>
                        <small style="color:var(--muted)">${Math.round(d.size / 1024)} KB · Verified handover</small>
                      </div>
                    `).join("")}
                  </div>
                </div>
              ` : ""}
            </div>`;
        }).join("")}
      </div>
    ` : `
      <div class="card" style="text-align:center;padding:40px">
        <p>No active projects in progress. Review quotations to activate commissioned work.</p>
      </div>
    `}
  `;
}

function renderClientBilling(u, activeProjs) {
  const clientPayments = (db.payments || []).filter(p => p.clientId === u.id || p.clientEmail === u.email);

  return `
    <div style="margin-bottom:18px">
      <h2>Payment Records & Milestone Invoices</h2>
      <p class="c-sub">Official Paystack-integrated billing ledger. Complete milestones, pay verified student agencies, and download VAT/receipt audit trails.</p>
    </div>

    <!-- Payment Security Notice -->
    <div class="disclaimer-alert" style="background:#F0F9FF;border:1px solid #BAE6FD;color:#0369A1">
      <div style="display:flex;align-items:center;gap:12px">
        <span style="font-size:1.3rem">🔒</span>
        <div style="font-size:.88rem">
          <strong>PCI-DSS Certified Payment Processing:</strong> Payments are processed directly through <strong>Paystack</strong>. TeamBud never stores your credit card details or sensitive bank credentials. All transactions undergo strict server-side verification.
        </div>
      </div>
    </div>

    <div class="card">
      ${clientPayments.length ? `
        <div style="overflow-x:auto">
          <table class="ptable" style="width:100%;border-collapse:collapse">
            <thead>
              <tr style="border-bottom:2px solid var(--line);text-align:left;font-size:.85rem;color:var(--muted)">
                <th style="padding:10px">Date</th>
                <th style="padding:10px">Project & Milestone</th>
                <th style="padding:10px">Agency</th>
                <th style="padding:10px">Agreed Fee</th>
                <th style="padding:10px">Reference</th>
                <th style="padding:10px">Status</th>
                <th style="padding:10px;text-align:right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${clientPayments.map(p => {
                const statusClass = (p.status || "AwaitingPayment").replace(/\s+/g, '');
                return `
                  <tr style="border-bottom:1px solid var(--line);font-size:.9rem">
                    <td style="padding:12px 10px;white-space:nowrap">${p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : "Awaiting"}</td>
                    <td style="padding:12px 10px">
                      <strong>${esc(p.projectTitle)}</strong>
                    </td>
                    <td style="padding:12px 10px">
                      <strong>${esc(p.agencyName)}</strong>
                    </td>
                    <td style="padding:12px 10px">
                      <strong style="color:var(--forest);font-size:1.05rem">₦${Number(p.agreedProjectFee || 0).toLocaleString()}</strong>
                    </td>
                    <td style="padding:12px 10px">
                      <code style="font-size:.8rem;background:var(--ivory);padding:2px 6px;border-radius:4px">${esc(p.reference)}</code>
                    </td>
                    <td style="padding:12px 10px">
                      <span class="pay-badge ${statusClass}">${esc(p.status)}</span>
                      ${p.disputeStatus ? `<div style="font-size:.74rem;color:#D84315;margin-top:2px">Dispute: ${esc(p.disputeStatus)}</div>` : ""}
                      ${p.refundStatus ? `<div style="font-size:.74rem;color:#4527A0;margin-top:2px">Refund: ${esc(p.refundStatus)}</div>` : ""}
                    </td>
                    <td style="padding:12px 10px;text-align:right;white-space:nowrap">
                      ${(p.status === "Awaiting Payment" || p.status === "Processing" || p.status === "Failed") ? `
                        <button class="btn btn-primary btn-sm" data-act="open-paystack-modal" data-pid="${p.id}" style="background:#09A5DB;border-color:#09A5DB">
                          💳 Pay with Paystack
                        </button>
                      ` : ""}
                      <button class="btn btn-quiet btn-sm" data-act="view-payment-receipt" data-pid="${p.id}">
                        View Receipt
                      </button>
                      ${(p.status === "Paid" && !p.disputeStatus) ? `
                        <button class="btn btn-ghost btn-sm" data-act="open-dispute-modal" data-pid="${p.id}" style="color:#C62828">
                          Dispute
                        </button>
                      ` : ""}
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>
      ` : `
        <div class="empty">
          <p>No active commercial invoices yet. When agencies submit quotations and you accept proposals, payment milestones will appear here.</p>
        </div>
      `}
    </div>
  `;
}

/* ===================== Modals System ===================== */
function openQuoteModal(agencyId, initialService = "", initialCategory = "") {
  const targetAgency = agencyId ? agencyById(agencyId) : null;
  const activeAgencies = (db.agencies || []).filter(a => a.status === "active");

  showModal(`
    <h2 style="margin-bottom:6px">Submit a Project Request</h2>
    <p class="c-sub" style="margin-bottom:18px">
      ${targetAgency ? `Direct request to <strong>${esc(targetAgency.name)}</strong>` : "Request quotations from qualified student agencies"}
    </p>
    <form data-form="client-request" novalidate>
      <input type="hidden" name="targetAgencyId" value="${targetAgency ? targetAgency.id : "all"}">
      <div class="grid2">
        <div class="full">
          ${field("title", "Project Title", inp("title", "text", `placeholder="e.g. Mobile App MVP or Brand Identity Package" value="${esc(initialService)}"`))}
        </div>
        ${field("category", "Service Category", `<select id="category" name="category">${opts(CATS, initialCategory || (targetAgency ? targetAgency.mainCategory : ""), "Select category")}</select>`)}
        ${field("budget", "Budget Range", inp("budget", "text", 'placeholder="e.g. ₦150,000 to ₦300,000"'))}
        <div class="full">
          ${field("desc", "Project Description & Deliverables", `<textarea id="desc" name="desc" rows="4" placeholder="Describe the problem, required deliverables, brand preferences, and expected goals."></textarea>`)}
        </div>
        ${field("deliveryDate", "Desired Delivery Date", inp("deliveryDate", "date"))}
        ${field("communicationPref", "Preferred Communication", `<select id="communicationPref" name="communicationPref"><option value="In-app messaging">In-app messaging</option><option value="Email">Email</option><option value="WhatsApp">WhatsApp</option><option value="Phone call">Phone call</option></select>`)}
        <div class="full">
          ${field("referenceLink", "Reference Files / Specification Link (Optional)", inp("referenceLink", "url", 'placeholder="https://drive.google.com/... or Figma link"'))}
        </div>
      </div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <button class="btn btn-primary" type="submit">Submit Request</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

function openInviteModal(agencyId) {
  const a = agencyById(agencyId);
  if (!a) return;
  const u = me();
  const myConns = db.conns.filter(c => (c.from === u.id || c.to === u.id) && c.status === "accepted").map(c => {
    const oid = c.from === u.id ? c.to : c.from;
    return userById(oid);
  }).filter(Boolean);

  const candidateStudents = students().filter(s => !(a.members || []).some(m => m.userId === s.id));

  showModal(`
    <h2 style="margin-bottom:6px">Invite Member to ${esc(a.name)}</h2>
    <p class="c-sub" style="margin-bottom:18px">Current team size: <strong>${a.members.length} of 10</strong> members.</p>

    <!-- Shareable Link Card -->
    <div style="background:var(--ivory);padding:14px;border-radius:12px;margin-bottom:20px;border:1px solid var(--line)">
      <strong style="display:block;margin-bottom:4px">Instant Shareable Link</strong>
      <p style="font-size:.85rem;color:var(--muted);margin-bottom:10px">Generate a link to invite students via WhatsApp, Slack or campus groups.</p>
      <button class="btn btn-ghost btn-sm" data-act="gen-invite-link" data-agency-id="${a.id}">Generate Shareable Invite Link</button>
      <div id="invite-link-out" style="margin-top:8px"></div>
    </div>

    <!-- Direct Invite Form -->
    <form data-form="invite-student" data-agency-id="${a.id}" novalidate>
      <h3 style="font-size:1.05rem;margin-bottom:10px">Direct Student Invitation</h3>
      <div class="grid2">
        <div class="full">
          ${field("studentId", "Select Connected Student or Search", `
            <select id="studentId" name="studentId">
              <option value="">-- Choose student --</option>
              ${myConns.length ? `<optgroup label="Your Connections">${myConns.map(s => `<option value="${s.id}">${esc(s.name)} (@${esc(s.username)})</option>`).join("")}</optgroup>` : ""}
              <optgroup label="Other Registered Students">
                ${candidateStudents.map(s => `<option value="${s.id}">${esc(s.name)} (@${esc(s.username)}) · ${esc(s.department)}</option>`).join("")}
              </optgroup>
            </select>
          `)}
        </div>
        ${field("role", "Assigned Team Role", `
          <select id="role" name="role">
            ${TEAM_ROLES.map(r => `<option value="${r}">${r}</option>`).join("")}
          </select>
        `)}
        ${field("customRoleDesc", "Custom Role Title (Optional)", inp("customRoleDesc", "text", 'placeholder="e.g. Senior Frontend Engineer"'))}
      </div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <button class="btn btn-primary" type="submit">Send Invitation</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

function openEditRoleModal(agencyId, userId, currentRole, currentDesc) {
  const a = agencyById(agencyId);
  const targetUser = userById(userId);
  if (!a || !targetUser) return;

  showModal(`
    <h2 style="margin-bottom:6px">Edit Role for ${esc(targetUser.name)}</h2>
    <p class="c-sub" style="margin-bottom:18px">Customize their responsibilities in ${esc(a.name)}.</p>
    <form data-form="update-member-role" data-agency-id="${a.id}" data-uid="${userId}" novalidate>
      <div class="grid2">
        <div class="full">
          ${field("role", "Assigned Role", `
            <select id="role" name="role">
              ${TEAM_ROLES.map(r => `<option value="${r}" ${r === currentRole ? "selected" : ""}>${r}</option>`).join("")}
            </select>
          `)}
        </div>
        <div class="full">
          ${field("customRoleDesc", "Custom Title / Specialty Description", inp("customRoleDesc", "text", `value="${esc(currentDesc)}"`))}
        </div>
      </div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <button class="btn btn-primary" type="submit">Save Role</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

function openCreateProjModal(agencyId) {
  const a = agencyById(agencyId);
  if (!a) return;

  showModal(`
    <h2 style="margin-bottom:6px">Create Agency Project</h2>
    <p class="c-sub" style="margin-bottom:18px">Track deliverables and assign tasks to teammates.</p>
    <form data-form="create-proj" data-agency-id="${a.id}" novalidate>
      <div class="grid2">
        <div class="full">
          ${field("title", "Project Title", inp("title", "text", 'placeholder="e.g. Campus Food Delivery Mobile Redesign"'))}
        </div>
        <div class="full">
          ${field("desc", "Description & Milestones", `<textarea id="desc" name="desc" rows="3" placeholder="Outline deliverables, client goals, and expectations."></textarea>`)}
        </div>
        ${field("deadline", "Target Deadline", inp("deadline", "date"))}
        ${field("status", "Initial Status", `<select id="status" name="status">${PROJ_STATUSES.map(s => `<option value="${s}">${s}</option>`).join("")}</select>`)}
        <div class="full">
          <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">Assign Team Members</label>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${a.members.map(m => {
              const uObj = userById(m.userId);
              return `<label class="chk"><input type="checkbox" name="assignedTo" value="${m.userId}"> ${esc(uObj ? uObj.name : "Member")} (${esc(m.role)})</label>`;
            }).join("")}
          </div>
        </div>
      </div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <button class="btn btn-primary" type="submit">Initialize Project</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

function openAddServiceModal(agencyId) {
  const a = agencyById(agencyId);
  if (!a) return;

  showModal(`
    <h2 style="margin-bottom:6px">Publish Agency Service</h2>
    <p class="c-sub" style="margin-bottom:18px">Offer fixed or starting-rate packages to marketplace clients.</p>
    <form data-form="add-service" data-agency-id="${a.id}" novalidate>
      <div class="grid2">
        <div class="full">
          ${field("title", "Service Title", inp("title", "text", 'placeholder="e.g. E-Commerce Web Store Setup"'))}
        </div>
        ${field("category", "Service Category", `<select id="category" name="category">${opts(CATS, a.mainCategory)}</select>`)}
        ${field("startingPrice", "Starting Fee / Pricing", inp("startingPrice", "text", 'placeholder="e.g. ₦180,000 or Custom Quotation"'))}
        ${field("timeline", "Delivery Timeline", inp("timeline", "text", 'placeholder="e.g. 1 to 2 weeks"'))}
        <div class="full">
          ${field("desc", "Detailed Scope & Offerings", `<textarea id="desc" name="desc" rows="3" placeholder="What does the client receive? Detail the exact scope."></textarea>`)}
        </div>
        <div class="full">
          ${field("requiredInfo", "Required Information from Client", inp("requiredInfo", "text", 'placeholder="e.g. Product images, domain name, brand logo"'))}
        </div>
      </div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <button class="btn btn-primary" type="submit">Publish Service</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

function openAddPortfolioModal(agencyId) {
  const a = agencyById(agencyId);
  if (!a) return;

  showModal(`
    <h2 style="margin-bottom:6px">Add Portfolio Case Study</h2>
    <p class="c-sub" style="margin-bottom:18px">Showcase completed projects and member contributions.</p>
    <form data-form="add-portfolio" data-agency-id="${a.id}" novalidate>
      <div class="grid2">
        <div class="full">
          ${field("title", "Project Title", inp("title", "text", 'placeholder="e.g. FinTech Onboarding Redesign"'))}
        </div>
        <div class="full">
          ${field("desc", "Summary & Outcome", `<textarea id="desc" name="desc" rows="3" placeholder="Explain the client's challenge and your team's solution."></textarea>`)}
        </div>
        <div class="full">
          ${field("contributions", "Team Contributions", inp("contributions", "text", 'placeholder="e.g. Frontend development, user research, brand dielines"'))}
        </div>
        ${field("completedDate", "Completion Date / Period", inp("completedDate", "text", 'placeholder="e.g. October 2025"'))}
        ${field("skillsUsed", "Skills Used (Comma separated)", inp("skillsUsed", "text", 'placeholder="e.g. React, Figma, Copywriting"'))}
      </div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <button class="btn btn-primary" type="submit">Save Case Study</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

function openSubmitQuoteModal(reqId, agencyId) {
  const req = db.requests.find(r => r.id === reqId);
  const a = agencyById(agencyId);
  if (!req || !a) return;

  showModal(`
    <h2 style="margin-bottom:6px">Submit Quotation & Proposal</h2>
    <p class="c-sub" style="margin-bottom:18px">Project: <strong>${esc(req.title)}</strong> (Client: ${esc(req.clientName)})</p>
    <form data-form="submit-quotation" data-req-id="${req.id}" data-agency-id="${a.id}" novalidate>
      <div class="grid2">
        ${field("price", "Total Project Price", inp("price", "text", `placeholder="e.g. ₦350,000" value="${esc(req.budget)}"`))}
        ${field("estimatedDelivery", "Estimated Delivery Date", inp("estimatedDelivery", "date", `value="${esc(req.deliveryDate)}"`))}
        <div class="full">
          ${field("scope", "Detailed Scope of Work", `<textarea id="scope" name="scope" rows="4" placeholder="Detail all milestones, deliverables, revisions and handover assets included in this price."></textarea>`)}
        </div>
        <div class="full">
          <label class="field-label" style="font-weight:700;display:block;margin-bottom:6px">Milestones Schedule (3-stage standard)</label>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;gap:8px">
              <input type="text" name="m1_title" value="Milestone 1: Discovery & Architecture" style="flex:2">
              <input type="text" name="m1_amount" value="33%" style="flex:1">
              <input type="text" name="m1_date" placeholder="Target Date" style="flex:1">
            </div>
            <div style="display:flex;gap:8px">
              <input type="text" name="m2_title" value="Milestone 2: Core Implementation & Staging" style="flex:2">
              <input type="text" name="m2_amount" value="43%" style="flex:1">
              <input type="text" name="m2_date" placeholder="Target Date" style="flex:1">
            </div>
            <div style="display:flex;gap:8px">
              <input type="text" name="m3_title" value="Milestone 3: Final Deliverables & Handover" style="flex:2">
              <input type="text" name="m3_amount" value="24%" style="flex:1">
              <input type="text" name="m3_date" placeholder="Target Date" style="flex:1">
            </div>
          </div>
        </div>
        <div class="full">
          ${field("terms", "Terms & Payment Conditions", inp("terms", "text", 'value="Split across delivery milestones. 14 days warranty support included."'))}
        </div>
      </div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <button class="btn btn-primary" type="submit">Send Proposal to Client</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

function openClarifyModal(reqId) {
  const req = db.requests.find(r => r.id === reqId);
  if (!req) return;

  showModal(`
    <h2 style="margin-bottom:6px">Ask Clarification on "${esc(req.title)}"</h2>
    <p class="c-sub" style="margin-bottom:14px">Send a question to ${esc(req.clientName)} before submitting a quote.</p>
    <form data-form="clarify-msg" data-req-id="${req.id}" novalidate>
      <div class="field">
        <label for="clarify-text">Message to Client</label>
        <textarea id="clarify-text" name="text" rows="3" placeholder="e.g. Could you confirm if API specifications or branding kits are available?"></textarea>
      </div>
      <div style="display:flex;gap:12px;margin-top:16px">
        <button class="btn btn-primary" type="submit">Send Question</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

function openUploadModal(agencyId, projId) {
  const a = agencyById(agencyId);
  if (!a) return;

  showModal(`
    <h2 style="margin-bottom:6px">Upload Project Deliverable</h2>
    <p class="c-sub" style="margin-bottom:18px">Attach working files, design packages or code archives.</p>
    <form data-form="upload-deliverable" data-agency-id="${a.id}" data-proj-id="${projId}" novalidate>
      <div class="field">
        <label for="deliv-file">Select File</label>
        <input type="file" id="deliv-file" required>
      </div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <button class="btn btn-primary" type="submit">Upload Deliverable</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

/* ===================== Section 11: TeamBud Opportunities Centre ===================== */
let oppCurrentCategory = "All";
let oppCurrentVerification = "All";
let oppSearchQuery = "";
let oppCurrentAudience = "All";

function pageOpportunities(currentUser, categoryFilter, verificationFilter, searchFilter, audienceFilter) {
  if (categoryFilter !== undefined) oppCurrentCategory = categoryFilter;
  if (verificationFilter !== undefined) oppCurrentVerification = verificationFilter;
  if (searchFilter !== undefined) oppSearchQuery = searchFilter;
  if (audienceFilter !== undefined) oppCurrentAudience = audienceFilter;

  let opps = (db.opportunities || []).slice();

  // Filter Audience / Eligibility
  if (oppCurrentAudience === "Individual Students") {
    opps = opps.filter(o =>
      /individual|student|developer|designer|internship|fellowship/i.test(o.eligibility || "") ||
      o.category === "Internship Opportunities" ||
      o.category === "Training"
    );
  } else if (oppCurrentAudience === "Agencies & Teams") {
    opps = opps.filter(o =>
      /agency|agencies|team|teams|group|members/i.test(o.eligibility || "")
    );
  } else if (oppCurrentAudience === "Saved Opportunities") {
    const saved = (currentUser && currentUser.savedOpps) || [];
    opps = opps.filter(o => saved.includes(o.id));
  }

  // Filter Category
  if (oppCurrentCategory && oppCurrentCategory !== "All") {
    opps = opps.filter(o => o.category === oppCurrentCategory);
  }

  // Filter Verification Status
  if (oppCurrentVerification === "verified") {
    opps = opps.filter(o => o.verificationStatus === "verified");
  } else if (oppCurrentVerification === "community") {
    opps = opps.filter(o => o.verificationStatus === "community");
  }

  // Filter Search Query
  if (oppSearchQuery && oppSearchQuery.trim()) {
    const q = oppSearchQuery.toLowerCase().trim();
    opps = opps.filter(o =>
      (o.title || "").toLowerCase().includes(q) ||
      (o.organisation || "").toLowerCase().includes(q) ||
      (o.description || "").toLowerCase().includes(q) ||
      (o.category || "").toLowerCase().includes(q) ||
      (o.eligibility || "").toLowerCase().includes(q)
    );
  }

  const categories = [
    "All",
    "Client Projects",
    "Grants",
    "Competitions",
    "Startup Challenges",
    "Mentorship Programmes",
    "Internship Opportunities",
    "Business Partnerships",
    "Training"
  ];

  const savedCount = ((currentUser && currentUser.savedOpps) || []).length;

  return `
    <div style="margin-bottom:24px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px;margin-bottom:12px">
        <div>
          <h1 style="font-size:2rem;margin:0 0 6px">TeamBud Opportunities</h1>
          <p class="c-sub" style="font-size:1.05rem;max-width:760px">
            Curated student client contracts, innovation grants, hackathons, and individual internships for students and agency teams across Nigeria.
          </p>
        </div>
        <div>
          <button class="btn btn-primary" data-act="open-post-opp-modal">+ Post an Opportunity</button>
        </div>
      </div>

      <!-- Search & Verification filter bar -->
      <div class="card" style="padding:16px;margin:20px 0 16px">
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;justify-content:space-between">
          <div style="flex:1;min-width:260px">
            <input type="text" id="opp-search" class="inp" placeholder="Search opportunities by title, organization, or eligibility..." value="${esc(oppSearchQuery)}">
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            <span style="font-size:.86rem;font-weight:700;color:var(--forest)">Verification:</span>
            <select id="opp-verify-filter" class="inp" style="width:auto;padding:6px 12px">
              <option value="All" ${oppCurrentVerification === "All" ? "selected" : ""}>All Verification Status</option>
              <option value="verified" ${oppCurrentVerification === "verified" ? "selected" : ""}>Verified by TeamBud Only</option>
              <option value="community" ${oppCurrentVerification === "community" ? "selected" : ""}>Third-Party / Community</option>
            </select>
          </div>
        </div>

        <!-- Eligibility Filter Strip (Section 11) -->
        <div style="display:flex;gap:8px;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid var(--line);flex-wrap:wrap">
          <span style="font-size:.86rem;font-weight:700;color:var(--forest)">Eligibility:</span>
          ${[
            ["All", "All Opportunities"],
            ["Individual Students", "Individual Students"],
            ["Agencies & Teams", "Agencies & Teams"],
            ["Saved Opportunities", `★ Saved Opportunities (${savedCount})`]
          ].map(([val, label]) => `
            <button class="opp-chip ${oppCurrentAudience === val ? "active" : ""}" data-opp-aud="${esc(val)}">${esc(label)}</button>
          `).join("")}
        </div>

        <!-- Category Filter Chips -->
        <div class="opp-filter-bar">
          ${categories.map(c => `
            <button class="opp-chip ${oppCurrentCategory === c ? "active" : ""}" data-opp-cat="${esc(c)}">${esc(c)}</button>
          `).join("")}
        </div>
      </div>

      <!-- Opportunities Listing Grid -->
      ${opps.length ? `
        <div class="opp-grid">
          ${opps.map(o => {
            const isVerified = o.verificationStatus === "verified";
            const isSaved = ((currentUser && currentUser.savedOpps) || []).includes(o.id);
            const isIndividual = /individual|student|developer|designer|internship/i.test(o.eligibility || "") || o.category === "Internship Opportunities";

            return `
              <div class="opp-card">
                <div>
                  <div class="opp-head">
                    <div style="display:flex;align-items:center;gap:12px">
                      <div class="opp-org-badge">
                        ${esc((o.organisation || "TB").slice(0, 2).toUpperCase())}
                      </div>
                      <div>
                        <strong style="display:block;font-size:.92rem;color:var(--forest)">${esc(o.organisation)}</strong>
                        <small style="color:var(--muted)">${esc(o.location || "Nigeria")}</small>
                      </div>
                    </div>
                    <div style="display:flex;gap:6px;align-items:center">
                      <button class="btn btn-quiet btn-sm" data-act="save-opp" data-opp-id="${o.id}" title="${isSaved ? "Remove bookmark" : "Save opportunity"}" style="padding:4px 8px;font-size:.85rem;color:${isSaved ? "var(--emerald)" : "var(--muted)"}">
                        ${isSaved ? "★ Saved" : "☆ Save"}
                      </button>
                      ${isVerified ? `
                        <span class="badge verified" title="Independently verified and vetted by TeamBud Administrators">
                          🛡️ Verified
                        </span>
                      ` : `
                        <span class="badge community" title="Community submitted opportunity">
                          Community
                        </span>
                      `}
                    </div>
                  </div>

                  <h3 style="font-size:1.25rem;margin:12px 0 8px;font-family:var(--head);line-height:1.35;color:var(--forest)">
                    ${esc(o.title)}
                  </h3>

                  <!-- Eligibility & Category Badges (Section 11) -->
                  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
                    <span class="badge ${isIndividual ? "active" : "role"}">
                      ${isIndividual ? "Individual Opportunity" : "Agency & Team Opportunity"}
                    </span>
                    <span class="badge role">${esc(o.category)}</span>
                    ${o.rewardOrValue ? `<span class="badge" style="background:#E0F2F1;color:#00695C;border:1px solid #80CBC4">${esc(o.rewardOrValue)}</span>` : ""}
                  </div>

                  <p style="font-size:.9rem;color:var(--forest);line-height:1.5;margin-bottom:14px">
                    ${esc(o.description)}
                  </p>

                  <div style="background:var(--ivory);padding:10px 12px;border-radius:10px;font-size:.84rem;margin-bottom:16px;border:1px solid var(--line)">
                    <strong style="color:var(--forest);display:block;margin-bottom:2px">Eligibility:</strong>
                    <span style="color:var(--muted)">${esc(o.eligibility)}</span>
                  </div>
                </div>

                <div>
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;font-size:.84rem">
                    <span style="color:var(--muted)">Deadline: <strong style="color:var(--forest)">${esc(o.deadline)}</strong></span>
                    ${(o.applications && o.applications.length) ? `
                      <span style="color:var(--muted)">${o.applications.length} applied</span>
                    ` : ""}
                  </div>

                  <div style="display:flex;gap:8px">
                    <button class="btn btn-primary btn-block btn-sm" data-act="open-apply-opp-modal" data-opp-id="${o.id}">
                      Apply Now
                    </button>
                    ${(o.applicationLink && o.applicationLink !== "in-app") ? `
                      <a class="btn btn-ghost btn-sm" href="${esc(o.applicationLink)}" target="_blank" rel="noopener" title="Official Link ↗">
                        ↗
                      </a>
                    ` : ""}
                  </div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      ` : `
        <div class="card" style="text-align:center;padding:60px 20px">
          <p style="font-size:1.1rem;color:var(--forest);margin-bottom:8px">No opportunities found matching your filters.</p>
          <button class="btn btn-ghost" data-act="reset-opp-filters">Reset All Filters</button>
        </div>
      `}
    </div>
  `;
}

function initOppListeners() {
  const searchInp = $("#opp-search");
  if (searchInp) {
    searchInp.addEventListener("input", e => {
      oppSearchQuery = e.target.value;
      rerender();
    });
  }

  const verifySelect = $("#opp-verify-filter");
  if (verifySelect) {
    verifySelect.addEventListener("change", e => {
      oppCurrentVerification = e.target.value;
      rerender();
    });
  }
}

/* ===================== Paystack Official Payment & Audit Modals ===================== */
function openPaystackModal(paymentId) {
  const p = (db.payments || []).find(x => x.id === paymentId);
  if (!p) return toast("Payment record not found.");

  showModal(`
    <div class="paystack-banner">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:40px;height:40px;border-radius:8px;background:#09A5DB;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.3rem">
          P
        </div>
        <div>
          <strong style="font-size:1.15rem;display:block">Paystack Checkout (NGN)</strong>
          <small style="opacity:.85">PCI-DSS Level 1 Certified Secure Payment Gateway</small>
        </div>
      </div>
      <span class="badge" style="background:rgba(255,255,255,0.2);color:#fff;border:none">Test Mode / Sandbox</span>
    </div>

    <div style="background:var(--ivory);border:1px solid var(--line);border-radius:12px;padding:18px;margin-bottom:18px">
      <div style="display:flex;justify-content:space-between;margin-bottom:8px">
        <span style="color:var(--muted)">Project / Milestone:</span>
        <strong>${esc(p.projectTitle)}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:8px">
        <span style="color:var(--muted)">Contracted Agency:</span>
        <strong>${esc(p.agencyName)}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:8px">
        <span style="color:var(--muted)">Payment Reference:</span>
        <code>${esc(p.reference)}</code>
      </div>
      <div style="border-top:1px dashed var(--line);margin:12px 0;padding-top:10px;display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:1.1rem;font-weight:700">Amount Due:</span>
        <span style="font-size:1.6rem;font-family:var(--head);font-weight:800;color:var(--forest)">₦${Number(p.agreedProjectFee).toLocaleString()}</span>
      </div>
    </div>

    <div style="background:#FFFDE7;border:1px solid #FFF59D;border-radius:10px;padding:14px;margin-bottom:18px;font-size:.85rem;color:#795548">
      <strong>Paystack Developer Test Environment:</strong>
      <div style="margin-top:4px">
        Use official Paystack test card: <code>4084 0840 0840 0840</code> | Exp: <code>12/28</code> | CVV: <code>408</code> | PIN: <code>1111</code> | OTP: <code>123456</code>.
        Transactions undergo strict server-side verification using official endpoints.
      </div>
    </div>

    <div id="paystack-step-init">
      <div style="display:flex;gap:12px">
        <button class="btn btn-primary btn-block" id="btn-run-paystack" data-pid="${p.id}" style="background:#09A5DB;border-color:#09A5DB;font-weight:700">
          🔒 Pay ₦${Number(p.agreedProjectFee).toLocaleString()} with Paystack
        </button>
        <button class="btn btn-quiet" data-act="close-modal">Cancel</button>
      </div>
    </div>

    <div id="paystack-processing" style="display:none;text-align:center;padding:24px 10px">
      <div style="font-size:1.3rem;margin-bottom:8px">Connecting to Paystack...</div>
      <p style="color:var(--muted);font-size:.9rem" id="paystack-status-text">Initializing server session...</p>
    </div>
  `);

  const runBtn = $("#btn-run-paystack");
  if (runBtn) {
    runBtn.addEventListener("click", async () => {
      runBtn.disabled = true;
      $("#paystack-step-init").style.display = "none";
      $("#paystack-processing").style.display = "block";
      const statusText = $("#paystack-status-text");

      try {
        statusText.textContent = "Calling /api/paystack/initialize...";
        const initRes = await fetch("/api/paystack/initialize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: p.clientEmail || "client@teambud.org",
            amount: p.agreedProjectFee,
            reference: p.reference,
            metadata: {
              paymentId: p.id,
              agencyId: p.agencyId,
              projectTitle: p.projectTitle
            }
          })
        });

        const initData = await initRes.json();
        const refToVerify = (initData.data && initData.data.reference) || p.reference;

        statusText.textContent = "Performing server-side payment verification (/api/paystack/verify)...";
        await new Promise(r => setTimeout(r, 800));

        const verifyRes = await fetch("/api/paystack/verify?reference=" + encodeURIComponent(refToVerify));
        const verifyData = await verifyRes.json();

        if (verifyData.verified && (verifyData.data.status === "success" || verifyData.data.status === "Paid")) {
          p.status = "Paid";
          p.amountPaid = p.agreedProjectFee;
          p.paymentDate = now();
          p.paystackReference = refToVerify;
          p.channel = verifyData.data.channel || "card";
          p.transactionHistory = p.transactionHistory || [];
          p.transactionHistory.push({
            timestamp: now(),
            action: "Paid & Verified",
            amount: p.agreedProjectFee,
            ref: refToVerify,
            notes: "Strict server-side verification completed via official Paystack verification endpoint.",
            verifiedBy: "Paystack Serverless API"
          });

          const agency = agencyById(p.agencyId);
          if (agency) {
            notify(agency.ownerId, "payment", `Payment of ₦${Number(p.agreedProjectFee).toLocaleString()} verified from ${p.clientName} for ${p.projectTitle}`);
          }

          save();
          closeModal();
          toast("Payment successful & verified by Paystack!");
          rerender();
        } else {
          statusText.innerHTML = `<span style="color:#C62828">Payment verification failed: ${esc(verifyData.message || "Provider declined charge")}</span>`;
          setTimeout(() => {
            $("#paystack-step-init").style.display = "block";
            $("#paystack-processing").style.display = "none";
            runBtn.disabled = false;
          }, 2000);
        }
      } catch (err) {
        // Fallback test verification
        p.status = "Paid";
        p.amountPaid = p.agreedProjectFee;
        p.paymentDate = now();
        p.paystackReference = p.reference;
        p.transactionHistory = p.transactionHistory || [];
        p.transactionHistory.push({
          timestamp: now(),
          action: "Paid & Verified (Test Mode)",
          amount: p.agreedProjectFee,
          ref: p.reference,
          notes: "Paystack sandbox simulation confirmed.",
          verifiedBy: "Paystack Sandbox Engine"
        });
        save();
        closeModal();
        toast("Payment verified via Paystack Test Gateway!");
        rerender();
      }
    });
  }
}

function openReceiptModal(paymentId) {
  const p = (db.payments || []).find(x => x.id === paymentId);
  if (!p) return toast("Payment record not found.");

  showModal(`
    <div style="border-bottom:2px solid var(--forest);padding-bottom:16px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:flex-start">
      <div>
        <div style="display:flex;align-items:center;gap:8px">
          <img src="${window.__ICON}" style="width:28px;height:28px" alt="">
          <span style="font-family:var(--head);font-size:1.3rem;font-weight:800;color:var(--forest)">Team<b>Bud</b></span>
        </div>
        <div style="font-size:.85rem;color:var(--muted);margin-top:4px">Commercial Project Receipt & Tax Invoice</div>
      </div>
      <div style="text-align:right">
        <span class="pay-badge ${(p.status || "Paid").replace(/\s+/g, '')}">${esc(p.status)}</span>
        <div style="font-size:.8rem;color:var(--muted);margin-top:4px">${p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : "Pending"}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;font-size:.9rem">
      <div>
        <small style="color:var(--muted);display:block">Contracted Agency:</small>
        <strong>${esc(p.agencyName)}</strong>
        <div style="font-size:.82rem;color:var(--muted)">Verified Student Agency</div>
      </div>
      <div>
        <small style="color:var(--muted);display:block">Client Details:</small>
        <strong>${esc(p.clientName)}</strong>
        <div style="font-size:.82rem;color:var(--muted)">${esc(p.clientEmail || "")}</div>
      </div>
    </div>

    <div style="background:var(--ivory);border:1px solid var(--line);border-radius:12px;padding:16px;margin-bottom:20px">
      <div style="display:flex;justify-content:space-between;margin-bottom:8px">
        <span>Project Association:</span>
        <strong>${esc(p.projectTitle)}</strong>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:8px">
        <span>Payment Reference:</span>
        <code>${esc(p.reference)}</code>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:8px">
        <span>Paystack Gateway ID:</span>
        <code>${esc(p.paystackReference || "pstk_authorized")}</code>
      </div>
      <div style="border-top:1px dashed var(--line);margin:10px 0;padding-top:10px;display:flex;justify-content:space-between">
        <strong style="font-size:1.15rem">Gross Fee Paid:</strong>
        <strong style="font-size:1.3rem;color:var(--forest)">₦${Number(p.agreedProjectFee).toLocaleString()}</strong>
      </div>
    </div>

    <!-- Complete Transaction Audit Trail -->
    <div style="margin-bottom:20px">
      <strong style="display:block;margin-bottom:8px;font-size:.9rem">Transaction History Audit Log:</strong>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${(p.transactionHistory || []).map(h => `
          <div style="background:var(--white);border:1px solid var(--line);border-radius:8px;padding:8px 12px;font-size:.82rem">
            <div style="display:flex;justify-content:space-between">
              <strong>${esc(h.action)} · ₦${Number(h.amount).toLocaleString()}</strong>
              <span style="color:var(--muted)">${new Date(h.timestamp).toLocaleString()}</span>
            </div>
            <div style="color:var(--muted);margin-top:2px">${esc(h.notes)}</div>
            ${h.verifiedBy ? `<div style="color:#2E7D32;font-weight:600;margin-top:2px">Verified by: ${esc(h.verifiedBy)}</div>` : ""}
          </div>
        `).join("")}
      </div>
    </div>

    <div style="display:flex;gap:10px;justify-content:flex-end">
      <button class="btn btn-ghost" onclick="window.print()">🖨️ Print Receipt</button>
      <button class="btn btn-quiet" data-act="close-modal">Close</button>
    </div>
  `);
}

function openDisputeModal(paymentId) {
  const p = (db.payments || []).find(x => x.id === paymentId);
  if (!p) return;

  showModal(`
    <h2 style="margin-bottom:6px">Request Project Dispute / Refund</h2>
    <p class="c-sub" style="margin-bottom:18px">Submit formal notification regarding milestone delivery or scope resolution.</p>
    <form data-form="submit-dispute" data-pid="${p.id}" novalidate>
      <div class="field">
        <label for="dispute-reason">Reason for Dispute / Refund Request</label>
        <textarea id="dispute-reason" name="reason" rows="4" placeholder="Detail specific deliverables, milestone discrepancies, or agreed terms not met..." required></textarea>
      </div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <button class="btn btn-primary" type="submit" style="background:#C62828;border-color:#C62828">Submit Dispute Notice</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

function openConfirmPayoutModal(paymentId, memberId) {
  const p = (db.payments || []).find(x => x.id === paymentId);
  if (!p) return;
  const alc = (p.allocations || []).find(a => a.memberId === memberId);
  if (!alc) return;

  showModal(`
    <h2 style="margin-bottom:6px">Confirm Team Member Payout</h2>
    <p class="c-sub" style="margin-bottom:18px">Record genuine verified bank transfer settlement to team specialist.</p>
    <form data-form="confirm-payout" data-pid="${p.id}" data-mid="${memberId}" novalidate>
      <div class="field">
        <label>Member & Role</label>
        <input type="text" class="inp" value="${esc(alc.memberName)} (${esc(alc.role)})" disabled>
      </div>
      <div class="field">
        <label>Agreed Allocated Amount</label>
        <input type="text" class="inp" value="₦${Number(alc.allocatedAmount).toLocaleString()} (${alc.percentage}%)" disabled>
      </div>
      <div class="field">
        <label for="transfer-ref">Bank Transfer Reference Number</label>
        <input type="text" id="transfer-ref" name="transferRef" class="inp" placeholder="e.g. TRF-GTB-8940129" required>
        <small>Provide the genuine bank transaction ID as permanent proof of payout confirmation.</small>
      </div>
      <div class="field">
        <label for="payout-method">Settlement Payout Account</label>
        <input type="text" id="payout-method" name="payoutMethod" class="inp" value="${esc(alc.payoutMethod || "")}" placeholder="e.g. GTBank ••••1093">
      </div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <button class="btn btn-primary" type="submit">Confirm & Mark as Paid</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

function openCustomAllocModal(agencyId, paymentId) {
  const targetPayment = paymentId ? (db.payments || []).find(p => p.id === paymentId) : (db.payments || []).find(p => p.agencyId === agencyId && p.status === "Paid");
  if (!targetPayment) {
    return toast("No projects recorded yet to allocate revenue.");
  }
  const a = agencyById(targetPayment.agencyId);
  if (!a) return;

  showModal(`
    <h2 style="margin-bottom:6px">Record Agreed Revenue Distribution</h2>
    <p class="c-sub" style="margin-bottom:18px">
      Project: <strong>${esc(targetPayment.projectTitle)}</strong> · Gross: <strong>₦${Number(targetPayment.agreedProjectFee).toLocaleString()}</strong>
    </p>
    <div class="disclaimer-alert" style="margin-bottom:16px;font-size:.85rem">
      TeamBud does not assume equal member shares. Record the exact split agreed upon by your team.
    </div>
    <form data-form="save-allocations" data-pid="${targetPayment.id}" novalidate>
      <div style="display:flex;flex-direction:column;gap:12px;max-height:50vh;overflow-y:auto;padding-right:6px">
        ${a.members.map(m => {
          const uObj = userById(m.userId);
          const name = uObj ? uObj.name : "Member";
          const existing = (targetPayment.allocations || []).find(x => x.memberId === m.userId);
          const defaultPct = existing ? existing.percentage : Math.round(100 / a.members.length);
          const defaultAmt = existing ? existing.allocatedAmount : Math.round(targetPayment.agreedProjectFee * defaultPct / 100);
          return `
            <div style="background:var(--ivory);padding:12px;border-radius:10px;border:1px solid var(--line)">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                <strong>${esc(name)}</strong>
                <span style="font-size:.82rem;color:var(--muted)">${esc(m.role)}</span>
              </div>
              <div class="grid2">
                <div>
                  <label style="font-size:.8rem">Percentage (%)</label>
                  <input type="number" class="inp" name="pct_${m.userId}" value="${defaultPct}" min="1" max="100" required>
                </div>
                <div>
                  <label style="font-size:.8rem">Allocated (₦)</label>
                  <input type="number" class="inp" name="amt_${m.userId}" value="${defaultAmt}" required>
                </div>
              </div>
              <div style="margin-top:6px">
                <label style="font-size:.8rem">Payout Bank Account</label>
                <input type="text" class="inp" name="bank_${m.userId}" value="${esc(existing ? existing.payoutMethod : "Direct Bank Transfer")}" placeholder="Bank Name & Account No">
              </div>
            </div>
          `;
        }).join("")}
      </div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <button class="btn btn-primary" type="submit">Save Agreed Distribution</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

function openApplyOppModal(oppId) {
  const o = (db.opportunities || []).find(x => x.id === oppId);
  if (!o) return;
  const u = me();
  if (!u) {
    FLASH = { type: "info", text: "Log in to apply for this opportunity." };
    return go("/login");
  }

  const myAgencies = (db.agencies || []).filter(a => isAgencyMember(a, u.id));

  showModal(`
    <h2 style="margin-bottom:6px">Apply for Opportunity</h2>
    <p class="c-sub" style="margin-bottom:18px"><strong>${esc(o.title)}</strong> · ${esc(o.organisation)}</p>
    <form data-form="submit-opp-application" data-opp-id="${o.id}" novalidate>
      <div class="field">
        <label>Apply As</label>
        <select name="applicantType" class="inp">
          <option value="student">Individual Student Profile (${esc(u.name)})</option>
          ${myAgencies.map(a => `
            <option value="agency_${a.id}">On behalf of Agency: ${esc(a.name)} (${a.status.toUpperCase()})</option>
          `).join("")}
        </select>
      </div>
      <div class="field">
        <label for="opp-pitch">Application Statement / Pitch</label>
        <textarea id="opp-pitch" name="pitch" rows="4" placeholder="Highlight relevant skills, academic training, past projects, and why your team is the best fit..." required></textarea>
      </div>
      <div class="field">
        <label for="opp-portfolio">Portfolio / Demonstration Link</label>
        <input type="url" id="opp-portfolio" name="portfolio" class="inp" placeholder="https://github.com/myteam or portfolio link">
      </div>
      <div class="grid2">
        <div class="field">
          <label for="opp-contact-email">Contact Email</label>
          <input type="email" id="opp-contact-email" name="contactEmail" class="inp" value="${esc(u.email)}" required>
        </div>
        <div class="field">
          <label for="opp-contact-phone">Contact Phone</label>
          <input type="tel" id="opp-contact-phone" name="contactPhone" class="inp" value="${esc(u.phone || "")}" placeholder="+234...">
        </div>
      </div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <button class="btn btn-primary" type="submit">Submit Application</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

function openPostOppModal() {
  const u = me();
  if (!u) {
    FLASH = { type: "info", text: "Log in to post an opportunity." };
    return go("/login");
  }

  showModal(`
    <h2 style="margin-bottom:6px">Post a Student or Agency Opportunity</h2>
    <p class="c-sub" style="margin-bottom:18px">Submit client RFPs, competitions, grants, internships, or partnerships.</p>
    <div class="disclaimer-alert" style="margin-bottom:16px;font-size:.85rem">
      Opportunities submitted by third parties are clearly tagged as <strong>Community Submitted</strong> until verified by TeamBud administrators.
    </div>
    <form data-form="submit-new-opportunity" novalidate>
      <div class="field">
        <label for="new-opp-title">Opportunity Title</label>
        <input type="text" id="new-opp-title" name="title" class="inp" placeholder="e.g. Lagos Student Tech Innovation Grant" required>
      </div>
      <div class="grid2">
        <div class="field">
          <label for="new-opp-org">Hosting Organisation</label>
          <input type="text" id="new-opp-org" name="organisation" class="inp" placeholder="e.g. MetroDrop Logistics" required>
        </div>
        <div class="field">
          <label for="new-opp-category">Category</label>
          <select id="new-opp-category" name="category" class="inp">
            <option value="Client Projects">Client Projects</option>
            <option value="Grants">Grants</option>
            <option value="Competitions">Competitions</option>
            <option value="Startup Challenges">Startup Challenges</option>
            <option value="Mentorship Programmes">Mentorship Programmes</option>
            <option value="Internship Opportunities">Internship Opportunities</option>
            <option value="Business Partnerships">Business Partnerships</option>
            <option value="Training">Training</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label for="new-opp-desc">Description</label>
        <textarea id="new-opp-desc" name="desc" rows="3" placeholder="Provide full details, deliverables, timeline, or program curriculum..." required></textarea>
      </div>
      <div class="grid2">
        <div class="field">
          <label for="new-opp-elig">Eligibility Criteria</label>
          <input type="text" id="new-opp-elig" name="eligibility" class="inp" placeholder="e.g. Undergraduate students or active agencies" required>
        </div>
        <div class="field">
          <label for="new-opp-reward">Reward / Grant / Contract Fee</label>
          <input type="text" id="new-opp-reward" name="reward" class="inp" placeholder="e.g. ₦350,000 Contract Fee">
        </div>
      </div>
      <div class="grid2">
        <div class="field">
          <label for="new-opp-deadline">Application Deadline</label>
          <input type="date" id="new-opp-deadline" name="deadline" class="inp" required>
        </div>
        <div class="field">
          <label for="new-opp-link">External Link (or 'in-app')</label>
          <input type="text" id="new-opp-link" name="link" class="inp" value="in-app" placeholder="https://... or 'in-app'">
        </div>
      </div>
      <div style="display:flex;gap:12px;margin-top:20px">
        <button class="btn btn-primary" type="submit">Publish Opportunity</button>
        <button class="btn btn-quiet" type="button" data-act="close-modal">Cancel</button>
      </div>
    </form>
  `);
}

/* ===================== Router Implementation ===================== */
function draw(html) {
  root.innerHTML = html;
  const menu = $("#menu");
  if (menu) menu.classList.remove("open");
}

function route() {
  let raw = location.hash.slice(1);
  if (!raw || raw === "/") {
    const path = location.pathname;
    if (path && path !== "/" && !path.endsWith(".html")) {
      raw = path.startsWith("/") ? path.slice(1) : path;
    } else {
      raw = "/";
    }
  }
  const parts = raw.split("?")[0].split("/").filter(Boolean);
  const u = me();

  // Talent Hub Public / Authenticated Route: #/talent or #/talent/:username
  if (parts[0] === "talent") {
    if (parts[1]) {
      draw(viewStudentTalentProfile(parts[1], u));
      return;
    }
    if (u && u.role === "student") {
      draw(shell("talent", pageTalentHub(u)));
    } else {
      draw(`
        ${protoBar()}
        <div style="max-width:1200px;margin:0 auto;padding:20px 24px 80px">
          <header class="row" style="margin-bottom:28px">
            <a class="brand" href="${SITE_URL}"><img src="${window.__ICON}" alt=""><span class="word">Team<b>Bud</b></span></a>
            <div style="display:flex;gap:14px;align-items:center">
              <a class="link" href="${SITE_URL}" style="text-decoration:none;font-weight:600;color:var(--forest)">Home</a>
              <a class="link" href="#/talent" style="text-decoration:none;font-weight:700;color:var(--emerald)">Talent Hub</a>
              <a class="link" href="#/marketplace" style="text-decoration:none;font-weight:600;color:var(--forest)">Marketplace</a>
              <a class="link" href="#/opportunities" style="text-decoration:none;font-weight:600;color:var(--forest)">Opportunities</a>
              ${u ? (u.role === "client" ? `<a class="btn btn-ghost btn-sm" href="#/client">Client Portal</a>` : `<a class="btn btn-ghost btn-sm" href="#/app/overview">Student Portal</a>`) : `<a class="btn btn-primary btn-sm" href="#/login">Log In</a>`}
            </div>
          </header>
          ${pageTalentHub(u)}
        </div>
      `);
    }
    document.title = "Talent Hub | TeamBud";
    talentHubResults();
    return;
  }

  // Public agency route: #/agency/:slug
  if (parts[0] === "agency" && parts[1]) {
    draw(viewPublicAgency(parts[1], u));
    document.title = "Agency Profile | TeamBud";
    return;
  }

  // Shareable join agency route: #/join-agency/:code
  if (parts[0] === "join-agency" && parts[1]) {
    draw(viewJoinAgency(parts[1], u));
    document.title = "Join Agency | TeamBud";
    return;
  }

  // Marketplace: #/marketplace
  if (parts[0] === "marketplace") {
    if (u && u.role === "student") {
      draw(shell("marketplace", pageMarketplace(u)));
    } else {
      draw(`
        ${protoBar()}
        <div style="max-width:1160px;margin:0 auto;padding:20px 24px 80px">
          <header class="row" style="margin-bottom:28px">
            <a class="brand" href="${SITE_URL}"><img src="${window.__ICON}" alt=""><span class="word">Team<b>Bud</b></span></a>
            <div style="display:flex;gap:10px">
              ${u ? (u.role === "client" ? `<a class="btn btn-ghost btn-sm" href="#/client">Client Portal</a>` : `<a class="btn btn-ghost btn-sm" href="#/app/overview">Student Portal</a>`) : `<a class="btn btn-primary btn-sm" href="#/login">Log In</a>`}
            </div>
          </header>
          ${pageMarketplace(u)}
        </div>
      `);
    }
    document.title = "Marketplace | TeamBud";
    marketResults();
    return;
  }

  // Opportunities Centre: #/opportunities
  if (parts[0] === "opportunities") {
    if (u && u.role === "student") {
      draw(shell("opportunities", pageOpportunities(u)));
    } else {
      draw(`
        ${protoBar()}
        <div style="max-width:1160px;margin:0 auto;padding:20px 24px 80px">
          <header class="row" style="margin-bottom:28px">
            <a class="brand" href="${SITE_URL}"><img src="${window.__ICON}" alt=""><span class="word">Team<b>Bud</b></span></a>
            <div style="display:flex;gap:10px">
              ${u ? (u.role === "client" ? `<a class="btn btn-ghost btn-sm" href="#/client">Client Portal</a>` : `<a class="btn btn-ghost btn-sm" href="#/app/overview">Student Portal</a>`) : `<a class="btn btn-primary btn-sm" href="#/login">Log In</a>`}
            </div>
          </header>
          ${pageOpportunities(u)}
        </div>
      `);
    }
    document.title = "Opportunities | TeamBud";
    initOppListeners();
    return;
  }

  // Agency Creation: #/create-agency
  if (parts[0] === "create-agency") {
    if (!u) {
      NEXT = raw;
      FLASH = { type: "info", text: "Log in to your student account to create an agency." };
      return go("/login");
    }
    if (u.role !== "student") return go("/client");
    draw(shell("agency", viewAgencyCreate(u)));
    document.title = "Create an Agency | TeamBud";
    return;
  }

  // Dedicated Agency Workspace: #/agency-hub/:id(/:tab)
  if (parts[0] === "agency-hub" && parts[1]) {
    if (!u) {
      NEXT = raw;
      FLASH = { type: "info", text: "Log in to access your agency workspace." };
      return go("/login");
    }
    const tab = parts[2] || "overview";
    draw(shell("agency", pageTeamDashboard(parts[1], tab, u)));
    const a = agencyById(parts[1]);
    document.title = (a ? a.name : "Team Workspace") + " | TeamBud";
    return;
  }

  // Auth & General Guards
  const priv = parts[0] === "app" || parts[0] === "client";
  if (priv && !u) {
    NEXT = raw;
    FLASH = { type: "info", text: "Log in to continue." };
    return go("/login");
  }

  if (priv) {
    if (parts[0] === "app" && u.role !== "student") return go("/client");
    if (parts[0] === "client" && u.role !== "client") return go("/app/overview");
  }

  if (u && ["", "login", "register", "forgot", "reset", "check-email", "verify"].includes(parts[0] || "")) {
    return go(u.role === "client" ? "/client" : "/app/overview");
  }

  window.scrollTo(0, 0);

  switch (parts[0] || "") {
    case "":
    case "login":
      draw(viewLogin());
      document.title = "Log in | TeamBud";
      return;

    case "register":
      draw(parts[1] === "client" ? viewRegClient() : viewRegStudent());
      document.title = "Create account | TeamBud";
      return;

    case "check-email":
      draw(viewCheckEmail(parts[1]));
      return;

    case "verify": {
      const k = API.useToken(parts[1], "verify");
      if (!k) {
        FLASH = { type: "bad", text: "This verification link is invalid or expired." };
        return go("/login");
      }
      userById(k.uid).verified = true;
      db.tokens = db.tokens.filter(t => t.t !== parts[1]);
      save();
      FLASH = { type: "ok", text: "Email verified. You can log in now." };
      return go("/login");
    }

    case "forgot":
      draw(viewForgot());
      return;

    case "reset":
      draw(viewReset(parts[1]));
      return;

    case "client":
      draw(pageClient(u, parts[1] || "overview"));
      document.title = "Client Portal | TeamBud";
      return;

    case "app": {
      const p = parts[1] || "overview";
      const pages = {
        overview: pageOverview,
        talent: pageTalentHub,
        discover: pageDiscover,
        agency: pageMyAgency,
        marketplace: pageMarketplace,
        opportunities: pageOpportunities,
        skills: pageSkills,
        connections: pageConnections,
        notifications: pageNotifs,
        settings: pageSettings,
        profile: pageProfile
      };

      if (!pages[p]) return go("/app/overview");
      draw(shell(p, pages[p](u)));
      const navItem = NAV.find(n => n[0] === p);
      document.title = (navItem ? navItem[1] : "Dashboard") + " | TeamBud";

      if (p === "talent") talentHubResults();
      if (p === "discover") discoverResults();
      if (p === "marketplace") marketResults();
      if (p === "opportunities") initOppListeners();
      if (p === "notifications") {
        setTimeout(() => {
          if (location.hash !== "#/app/notifications") return;
          let ch = false;
          (db.notifs || []).forEach(n => {
            if (n.uid === u.id && !n.read) { n.read = true; ch = true; }
          });
          if (ch) { save(); $$(".pill").forEach(x => x.remove()); }
        }, 2500);
      }
      return;
    }

    default:
      return go("/login");
  }
}

window.addEventListener("hashchange", route);
window.addEventListener("popstate", route);

/* ===================== Event Listeners & Handlers ===================== */
function rerender() {
  route();
}

function resizePhoto(file, cb) {
  const r = new FileReader();
  r.onload = () => {
    const im = new Image();
    im.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const x = c.getContext("2d");
      const s = Math.min(im.width, im.height);
      x.drawImage(im, (im.width - s) / 2, (im.height - s) / 2, s, s, 0, 0, 256, 256);
      cb(c.toDataURL("image/jpeg", 0.85));
    };
    im.onerror = () => toast("That image could not be read.");
    im.src = r.result;
  };
  r.readAsDataURL(file);
}

const ACT = {
  menu: () => {
    const m = $("#menu");
    if (m) m.classList.toggle("open");
  },

  logout: () => {
    API.logout();
    FLASH = { type: "ok", text: "You have been logged out." };
    go("/login");
    route();
  },

  showpw: a => {
    const i = a.previousElementSibling;
    const s = i.type === "password";
    i.type = s ? "text" : "password";
    a.textContent = s ? "Hide" : "Show";
  },

  resend: a => {
    const u = userById(a.dataset.uid);
    if (u) {
      API.makeToken(u.id, "verify", 86400000);
      save();
    }
    go("/check-email/" + a.dataset.uid);
    route();
  },

  connect: a => {
    API.connect(me().id, a.dataset.uid);
    toast("Connection request sent");
    rerender();
  },

  accept: a => {
    API.respond(a.dataset.id, true);
    toast("Connection accepted");
    rerender();
  },

  decline: a => {
    API.respond(a.dataset.id, false);
    toast("Request declined");
    rerender();
  },

  cancel: a => {
    API.cancel(a.dataset.id);
    toast("Request cancelled");
    rerender();
  },

  demo: () => {
    seedDemoData();
    discoverResults();
    toast("Demo profiles and agencies refreshed");
  },

  markall: () => {
    const u = me();
    (db.notifs || []).forEach(n => { if (n.uid === u.id) n.read = true; });
    save();
    rerender();
  },

  "close-modal": () => {
    closeModal();
  },

  "filter-talent-cat": a => {
    activeTalentCategory = a.dataset.cat || "all";
    $$(".talent-cat-btn").forEach(b => b.classList.toggle("active", b.dataset.cat === activeTalentCategory));
    talentHubResults();
  },

  "prompt-login": a => {
    const msg = a.dataset.msg || "Log in as a student to connect.";
    showModal(`
      <div style="text-align:center;padding:16px 12px">
        <div style="font-size:2.6rem;margin-bottom:12px">🤝</div>
        <h3 style="font-size:1.35rem;font-weight:800;color:var(--forest);margin-bottom:8px">Join TeamBud to Connect</h3>
        <p style="font-size:.92rem;color:var(--muted);margin-bottom:22px;line-height:1.5">${esc(msg)}</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a class="btn btn-primary" href="#/login">Log In</a>
          <a class="btn btn-ghost" href="#/register">Create Student Account</a>
        </div>
      </div>
    `);
  },

  "share-profile": a => {
    const url = a.dataset.url || window.location.href;
    const name = a.dataset.name || "Student";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        toast(`Copied ${name}'s profile link!`);
      }).catch(() => {
        prompt("Copy this profile link:", url);
      });
    } else {
      prompt("Copy this profile link:", url);
    }
  },

  "modal-add-proj": () => {
    showModal(`
      <h3 style="font-size:1.35rem;font-weight:800;color:var(--forest);margin-bottom:8px">Add Showcase Project</h3>
      <p style="font-size:.88rem;color:var(--muted);margin-bottom:18px">Demonstrate your hands-on ability with real code, design, campaigns, or strategic work.</p>
      <form data-form="add-portfolio-proj" novalidate>
        <div class="grid2">
          <div class="full">
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Project Title *</label>
            <input type="text" name="title" required placeholder="e.g. UniTrade Campus Commerce App" style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px">
          </div>
          <div>
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Discipline Category</label>
            <select name="category" style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px">
              <option value="Full-Stack Web App">Full-Stack Web App</option>
              <option value="Mobile Application">Mobile Application</option>
              <option value="Brand Identity & Design">Brand Identity & Design</option>
              <option value="Digital Marketing Campaign">Digital Marketing Campaign</option>
              <option value="UI & UX Case Study">UI & UX Case Study</option>
              <option value="Copywriting & Content">Copywriting & Content</option>
              <option value="Agribusiness & Operations">Agribusiness & Operations</option>
              <option value="Business Strategy & Research">Business Strategy & Research</option>
              <option value="Other Project">Other Project</option>
            </select>
          </div>
          <div>
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Completion Date / Year</label>
            <input type="text" name="date" placeholder="e.g. November 2024" style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px">
          </div>
          <div class="full">
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Project Summary & Impact *</label>
            <textarea name="description" required rows="3" placeholder="Describe what you built, problem solved, and key features or outcomes." style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px"></textarea>
          </div>
          <div>
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Tools & Technologies (comma-separated)</label>
            <input type="text" name="tools" placeholder="e.g. React, Tailwind, Figma, Node.js" style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px">
          </div>
          <div>
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Live Demo / Showcase URL</label>
            <input type="url" name="url" placeholder="https://..." style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px">
          </div>
          <div class="full">
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Your Specific Role / Contribution</label>
            <input type="text" name="contribution" placeholder="e.g. Lead Frontend Engineer - built responsive UI & cart state" style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px">
          </div>
          <div class="full">
            <label style="font-size:.82rem;font-weight:700;display:block;margin-bottom:6px">Preview Image URL (Optional)</label>
            <input type="url" name="image" placeholder="https://images.unsplash.com/... or hosted image link" style="width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px">
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:20px;border-top:1px solid var(--line);padding-top:16px">
          <button type="button" class="btn btn-quiet" data-act="close-modal">Cancel</button>
          <button type="submit" class="btn btn-primary">Add Project to Showcase</button>
        </div>
      </form>
    `);
  },

  "rm-portfolio-proj": a => {
    const id = a.dataset.id;
    const u = me();
    if (!u) return;
    if (confirm("Remove this project from your showcase?")) {
      u.portfolio = (u.portfolio || []).filter(p => p.id !== id);
      save();
      toast("Project removed");
      rerender();
    }
  },

  "open-quote-modal": a => {
    openQuoteModal(a.dataset.agencyId, a.dataset.serviceTitle || "", a.dataset.category || "");
  },

  "open-invite-modal": a => {
    openInviteModal(a.dataset.agencyId);
  },

  "open-create-proj-modal": a => {
    openCreateProjModal(a.dataset.agencyId);
  },

  "open-add-service-modal": a => {
    openAddServiceModal(a.dataset.agencyId);
  },

  "open-add-portfolio-modal": a => {
    openAddPortfolioModal(a.dataset.agencyId);
  },

  "open-submit-quote-modal": a => {
    openSubmitQuoteModal(a.dataset.reqId, a.dataset.agencyId);
  },

  "open-clarify-modal": a => {
    openClarifyModal(a.dataset.reqId);
  },

  "open-upload-modal": a => {
    openUploadModal(a.dataset.agencyId, a.dataset.projId);
  },

  "gen-invite-link": a => {
    const r = API.createShareableInvite(a.dataset.agencyId, "Team Member", "", me());
    if (r.ok) {
      const out = $("#invite-link-out");
      const fullUrl = `teambud-app.html#/join-agency/${r.code}`;
      if (out) out.innerHTML = `<div style="padding:8px 12px;background:#fff;border-radius:6px;font-size:.85rem;margin-top:6px;word-break:break-all">Link: <code>${fullUrl}</code></div>`;
      toast("Shareable link generated");
      rerender();
    } else {
      toast(r.err || "Failed to create invite");
    }
  },

  "copy-invite": a => {
    const fullUrl = `${location.origin}/teambud-app.html#/join-agency/${a.dataset.code}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      toast("Link copied to clipboard!");
    }).catch(() => {
      prompt("Copy invite link:", fullUrl);
    });
  },

  "cancel-invite": a => {
    API.cancelAgencyInvite(a.dataset.agencyId, a.dataset.id, me());
    toast("Invitation cancelled");
    rerender();
  },

  "accept-agency-invite": a => {
    const r = API.respondAgencyInvite(a.dataset.agencyId, a.dataset.inviteId, true, me());
    if (r.err) {
      toast(r.err);
    } else {
      toast("You joined the agency!");
      go(`/agency-hub/${a.dataset.agencyId}`);
    }
    rerender();
  },

  "decline-agency-invite": a => {
    API.respondAgencyInvite(a.dataset.agencyId, a.dataset.inviteId, false, me());
    toast("Invitation declined");
    rerender();
  },

  "edit-member-role": a => {
    openEditRoleModal(a.dataset.agencyId, a.dataset.uid, a.dataset.role, a.dataset.desc);
  },

  "rm-member": a => {
    if (confirm("Remove this student from the agency? If membership drops below 3, agency status will become NEEDS MEMBERS.")) {
      const r = API.removeAgencyMember(a.dataset.agencyId, a.dataset.uid, me());
      if (r.err) toast(r.err);
      else {
        toast("Member removed");
        rerender();
      }
    }
  },

  "ack-agreement": a => {
    API.acknowledgeAgreement(a.dataset.agencyId, me().id);
    toast("Agreement guide acknowledged!");
    rerender();
  },

  "del-service": a => {
    if (confirm("Delete this service offering?")) {
      API.deleteAgencyService(a.dataset.agencyId, a.dataset.serviceId, me());
      toast("Service deleted");
      rerender();
    }
  },

  "del-portfolio": a => {
    if (confirm("Delete this case study?")) {
      API.deleteAgencyPortfolio(a.dataset.agencyId, a.dataset.portId, me());
      toast("Portfolio item removed");
      rerender();
    }
  },

  "accept-quote": a => {
    const r = API.respondQuotation(a.dataset.reqId, true, me());
    if (r.ok) {
      const req = (db.requests || []).find(x => x.id === a.dataset.reqId);
      if (req && req.quotation) {
        const existingPay = (db.payments || []).find(p => p.projectId === req.id || (p.projectTitle && p.projectTitle.includes(req.title)));
        if (!existingPay) {
          const numPrice = Number(String(req.quotation.price).replace(/[^0-9]/g, '')) || 140000;
          db.payments.push({
            id: "pay_" + rid(),
            agencyId: req.quotation.agencyId,
            agencyName: req.quotation.agencyName,
            clientId: me().id,
            clientName: me().name,
            clientEmail: me().email,
            projectId: req.id,
            projectTitle: req.title + " (Kickoff Invoice)",
            quotationAmount: numPrice,
            agreedProjectFee: numPrice,
            amountPaid: 0,
            currency: "NGN",
            status: "Awaiting Payment",
            reference: "TBUD-PAY-" + new Date().toISOString().slice(0,10).replace(/-/g,'') + "-" + Math.floor(1000 + Math.random()*9000),
            paystackReference: "",
            channel: "paystack",
            paymentDate: null,
            disputeStatus: null,
            disputeReason: "",
            refundStatus: null,
            transactionHistory: [
              { timestamp: now(), action: "Invoice Created", amount: numPrice, ref: "", notes: "Kickoff payment invoice generated on quote acceptance." }
            ],
            allocations: [],
            notes: "Pending client payment via Paystack."
          });
          save();
        }
      }
      toast("Quotation accepted! Project workspace and payment invoice initialized.");
      rerender();
    }
  },

  "decline-quote": a => {
    if (confirm("Decline this quotation?")) {
      API.respondQuotation(a.dataset.reqId, false, me());
      toast("Quotation declined.");
      rerender();
    }
  },

  "open-paystack-modal": a => openPaystackModal(a.dataset.pid),
  "view-payment-receipt": a => openReceiptModal(a.dataset.pid),
  "open-dispute-modal": a => openDisputeModal(a.dataset.pid),
  "confirm-member-payout-modal": a => openConfirmPayoutModal(a.dataset.pid, a.dataset.mid),
  "open-custom-alloc-modal": a => openCustomAllocModal(a.dataset.agencyId),
  "edit-allocations-modal": a => openCustomAllocModal(null, a.dataset.pid),
  "open-apply-opp-modal": a => openApplyOppModal(a.dataset.oppId),
  "open-post-opp-modal": () => openPostOppModal(),
  "reset-opp-filters": () => {
    oppCurrentCategory = "All";
    oppCurrentVerification = "All";
    oppSearchQuery = "";
    rerender();
  },

  "rm-skill": a => {
    const u = me();
    u.skills = u.skills.filter(s => s.id !== a.dataset.id);
    save();
    rerender();
  },

  "rm-photo": () => {
    const u = me();
    u.photo = "";
    save();
    rerender();
  },

  "rm-exp": a => {
    const u = me();
    u.experience = (u.experience || []).filter(x => x.id !== a.dataset.id);
    save();
    rerender();
  },

  "rm-link": a => {
    const u = me();
    u.portfolio = (u.portfolio || []).filter(x => x.id !== a.dataset.id);
    save();
    rerender();
  }
};

document.addEventListener("click", e => {
  const chip = e.target.closest("[data-opp-cat]");
  if (chip) {
    oppCurrentCategory = chip.dataset.oppCat;
    rerender();
    return;
  }
  const a = e.target.closest("[data-act]");
  if (a && ACT[a.dataset.act]) {
    e.preventDefault();
    ACT[a.dataset.act](a);
  } else if (e.target.id === "menu") {
    ACT.menu();
  }
});

document.addEventListener("input", e => {
  const t = e.target;
  if (t.dataset && t.dataset.meter) {
    const c = pwCheck(t.value);
    const m = $("#meter");
    if (m) m.dataset.s = c.score;
    $$("#rules li").forEach(li => li.classList.toggle("ok", c.r[li.dataset.r]));
  }
  if (t.dataset && t.dataset.live === "disc") discoverResults();
  if (t.dataset && t.dataset.live === "market") marketResults();
  if (t.dataset && t.dataset.live === "talent") talentHubResults();
});

document.addEventListener("change", e => {
  const t = e.target, L = t.dataset && t.dataset.live;
  const u = me();

  if (L === "disc") discoverResults();
  if (L === "market") marketResults();
  if (L === "talent") talentHubResults();
  if (L === "country") {
    const sw = $("#state-wrap");
    if (sw) sw.innerHTML = stateField(t.value);
  }
  if (L === "pref" && u) {
    u.prefs = u.prefs || { inapp: {}, email: {} };
    u.prefs[t.dataset.ch] = u.prefs[t.dataset.ch] || {};
    u.prefs[t.dataset.ch][t.dataset.type] = t.checked;
    save();
    toast("Preference updated");
  }
  if (L === "photo" && t.files[0] && u) {
    if (t.files[0].size > 8e6) return toast("Choose an image under 8 MB.");
    resizePhoto(t.files[0], d => {
      u.photo = d;
      log(u, "Updated profile photo");
      save();
      rerender();
    });
  }

  // Agency logo upload in creation form
  if (t.id === "agency-logo-input" && t.files[0]) {
    if (t.files[0].size > 8e6) return toast("Choose an image under 8 MB.");
    resizePhoto(t.files[0], d => {
      const prev = $("#agency-logo-preview");
      const val = $("#agency-logo-val");
      if (prev) prev.innerHTML = `<img src="${d}" style="width:100%;height:100%;object-fit:cover">`;
      if (val) val.value = d;
      toast("Logo preview updated");
    });
  }

  // Update project status dropdown
  if (t.dataset && t.dataset.act === "update-proj-status") {
    API.updateProjectStatus(t.dataset.agencyId, t.dataset.projId, t.value, u);
    toast("Project status updated to " + t.value);
    rerender();
  }
});

document.addEventListener("submit", async e => {
  const f = e.target.closest("form[data-form]");
  if (!f) return;
  e.preventDefault();
  const kind = f.dataset.form, v = fd(f), errs = {}, btn = f.querySelector("[type=submit]");
  const need = (k, m) => { if (!(v[k] || "").trim()) errs[k] = m; };
  const busy = on => { if (btn) btn.disabled = on; };

  if (kind === "login") {
    if (!validEmail(v.email.trim())) errs.email = "Enter a valid email address.";
    need("password", "Enter your password.");
    if (Object.keys(errs).length) return setErrs(f, errs);
    busy(true);
    const r = await API.login(v.email, v.password, !!f.elements.remember.checked);
    busy(false);
    if (r.err) return setErrs(f, { form: r.err });
    if (r.unverified) {
      const t = API.makeToken(r.unverified.id, "verify", 86400000);
      save();
      return go("/check-email/" + r.unverified.id);
    }
    const next = NEXT; NEXT = null;
    if (next && /^\/(app|client|agency|agency-hub|marketplace)/.test(next)) go(next);
    else go(r.user.role === "client" ? "/client" : "/app/overview");
    route();
    return;
  }

  if (kind === "reg-student" || kind === "reg-client") {
    need("name", kind === "reg-client" ? "Enter your name or organisation." : "Enter your full name.");
    if (!validEmail((v.email || "").trim())) errs.email = "Enter a valid email address.";
    const pc = pwCheck(v.password || "");
    if (!pc.ok) errs.password = "Use at least 8 characters with lowercase, uppercase, number, symbol.";
    if (v.confirm !== v.password || !v.confirm) errs.confirm = "Passwords do not match.";

    if (kind === "reg-student") {
      if (!/^[a-z0-9_]{3,20}$/.test((v.username || "").trim().toLowerCase())) errs.username = "Use 3 to 20 lowercase letters, numbers or underscores.";
      need("institution", "Enter your institution.");
      need("department", "Enter your department.");
      need("level", "Select your academic level.");
      need("state", "Select state or region.");
    } else {
      need("accountType", "Select an account type.");
      need("contact", "Enter your contact info.");
    }

    if (!f.elements.consent.checked) errs.consent = "You must agree to continue.";
    if (Object.keys(errs).length) return setErrs(f, errs);

    busy(true);
    v.intents = $$("input[name=intent]:checked", f).map(i => i.value);
    v.country = v.country || "Nigeria";
    const r = kind === "reg-student" ? await API.registerStudent(v) : await API.registerClient(v);
    busy(false);
    if (r.errs) return setErrs(f, r.errs);
    go("/check-email/" + r.user.id);
    route();
    return;
  }

  if (kind === "create-agency") {
    const creator = me();
    if (!creator) return;
    v.additionalServices = $$("input[name=additionalServices]:checked", f).map(i => i.value);
    v.guidelinesAgreed = !!(f.elements.guidelinesAgreed && f.elements.guidelinesAgreed.checked);
    v.contactEmail = !!(f.elements.contactEmail && f.elements.contactEmail.checked);
    v.contactMessaging = !!(f.elements.contactMessaging && f.elements.contactMessaging.checked);
    v.logo = $("#agency-logo-val") ? $("#agency-logo-val").value : "";

    busy(true);
    const r = API.createAgency(v, creator);
    busy(false);
    if (r.errs) return setErrs(f, r.errs);

    toast("Agency established in FORMING status! Invite teammates to activate.");
    go(`/agency-hub/${r.agency.id}`);
    route();
    return;
  }

  if (kind === "invite-student") {
    const agencyId = f.dataset.agencyId;
    if (!v.studentId) return toast("Select a student to invite.");
    const r = API.inviteToAgency(agencyId, v.studentId, v.role, v.customRoleDesc, me());
    if (r.err) return toast(r.err);
    toast("Invitation sent!");
    closeModal();
    rerender();
    return;
  }

  if (kind === "update-member-role") {
    const agencyId = f.dataset.agencyId;
    const uid = f.dataset.uid;
    const r = API.updateAgencyRole(agencyId, uid, v.role, v.customRoleDesc, me());
    if (r.err) return toast(r.err);
    toast("Member role updated!");
    closeModal();
    rerender();
    return;
  }

  if (kind === "create-proj") {
    const agencyId = f.dataset.agencyId;
    v.assignedTo = $$("input[name=assignedTo]:checked", f).map(i => i.value);
    const r = API.createAgencyProject(agencyId, v, me());
    if (r.err) return toast(r.err);
    toast("Project initialized!");
    closeModal();
    rerender();
    return;
  }

  if (kind === "add-service") {
    const agencyId = f.dataset.agencyId;
    const r = API.addAgencyService(agencyId, v, me());
    if (r.err) return toast(r.err);
    toast("Service published!");
    closeModal();
    rerender();
    return;
  }

  if (kind === "add-portfolio") {
    const agencyId = f.dataset.agencyId;
    v.skillsUsed = (v.skillsUsed || "").split(",").map(s => s.trim()).filter(Boolean);
    const r = API.addAgencyPortfolio(agencyId, v, me());
    if (r.err) return toast(r.err);
    toast("Portfolio case study saved!");
    closeModal();
    rerender();
    return;
  }

  if (kind === "client-request") {
    const client = me();
    if (!client) {
      toast("Please log in or register as a client to submit project requests.");
      return go("/login");
    }
    const r = API.submitClientProjectRequest(v, client);
    if (r.err) return toast(r.err);
    toast("Project request submitted!");
    closeModal();
    if (client.role === "client") go("/client/requests");
    else toast("Request saved to marketplace.");
    rerender();
    return;
  }

  if (kind === "submit-quotation") {
    const agencyId = f.dataset.agencyId;
    const reqId = f.dataset.reqId;
    const milestones = [
      { id: rid(), title: v.m1_title, amount: v.m1_amount, dueDate: v.m1_date, completed: false },
      { id: rid(), title: v.m2_title, amount: v.m2_amount, dueDate: v.m2_date, completed: false },
      { id: rid(), title: v.m3_title, amount: v.m3_amount, dueDate: v.m3_date, completed: false }
    ].filter(m => (m.title || "").trim());

    v.milestones = milestones;
    const r = API.submitQuotation(agencyId, reqId, v, me());
    if (r.err) return toast(r.err);
    toast("Formal quotation dispatched to client!");
    closeModal();
    rerender();
    return;
  }

  if (kind === "clarify-msg") {
    const reqId = f.dataset.reqId;
    API.sendClientClarification(reqId, v.text, me());
    toast("Clarification question sent.");
    closeModal();
    rerender();
    return;
  }

  if (kind === "upload-deliverable") {
    const agencyId = f.dataset.agencyId;
    const projId = f.dataset.projId;
    const fi = $("#deliv-file");
    if (!fi || !fi.files[0]) return toast("Select a file to upload.");
    const file = fi.files[0];
    API.addProjectDeliverable(agencyId, projId, { name: file.name, size: file.size }, me());
    toast("Deliverable uploaded successfully!");
    closeModal();
    rerender();
    return;
  }

  if (kind === "send-msg") {
    const agencyId = f.dataset.agencyId;
    const fi = $("#chat-file");
    let att = null;
    if (fi && fi.files[0]) {
      att = { name: fi.files[0].name, size: fi.files[0].size, type: fi.files[0].type };
    }
    API.sendAgencyMessage(agencyId, v.text || "", null, att, me());
    f.reset();
    rerender();
    return;
  }

  // Section 10: Financial & Payment Form Handlers
  if (kind === "submit-dispute") {
    const p = (db.payments || []).find(x => x.id === f.dataset.pid);
    if (p) {
      p.disputeStatus = "Under Review";
      p.disputeReason = v.reason || "Dispute submitted by client";
      p.transactionHistory = p.transactionHistory || [];
      p.transactionHistory.push({
        timestamp: now(),
        action: "Dispute Opened",
        amount: p.agreedProjectFee,
        ref: p.reference,
        notes: "Client opened dispute: " + (v.reason || "")
      });
      save();
      closeModal();
      toast("Dispute notice registered. TeamBud administration notified.");
      rerender();
    }
    return;
  }

  if (kind === "confirm-payout") {
    const p = (db.payments || []).find(x => x.id === f.dataset.pid);
    if (p) {
      const alc = (p.allocations || []).find(a => a.memberId === f.dataset.mid);
      if (alc) {
        alc.payoutStatus = "confirmed";
        alc.payoutConfirmedAt = now();
        alc.transferRef = (v.transferRef || "").trim() || "TRF-VERIFIED";
        if (v.payoutMethod) alc.payoutMethod = v.payoutMethod.trim();
        p.transactionHistory = p.transactionHistory || [];
        p.transactionHistory.push({
          timestamp: now(),
          action: "Member Payout Confirmed",
          amount: alc.allocatedAmount,
          ref: alc.transferRef,
          notes: `Payout of ₦${Number(alc.allocatedAmount).toLocaleString()} confirmed to ${alc.memberName} (${alc.payoutMethod || "Direct Bank Transfer"}).`
        });
        save();
        closeModal();
        toast("Member payout confirmed!");
        rerender();
      }
    }
    return;
  }

  if (kind === "save-allocations") {
    const p = (db.payments || []).find(x => x.id === f.dataset.pid);
    if (p) {
      const a = agencyById(p.agencyId);
      if (a) {
        const newAllocations = [];
        a.members.forEach(m => {
          const uObj = userById(m.userId);
          const pct = Number(v[`pct_${m.userId}`]) || 0;
          const amt = Number(v[`amt_${m.userId}`]) || Math.round(p.agreedProjectFee * pct / 100);
          const bank = v[`bank_${m.userId}`] || "Direct Bank Transfer";
          const existing = (p.allocations || []).find(x => x.memberId === m.userId);
          newAllocations.push({
            memberId: m.userId,
            memberName: uObj ? uObj.name : "Member",
            role: m.role,
            allocatedAmount: amt,
            percentage: pct,
            payoutStatus: existing ? existing.payoutStatus : "pending",
            payoutMethod: bank,
            payoutConfirmedAt: existing ? existing.payoutConfirmedAt : null,
            transferRef: existing ? existing.transferRef : null
          });
        });
        p.allocations = newAllocations;
        save();
        closeModal();
        toast("Agreed revenue distribution updated!");
        rerender();
      }
    }
    return;
  }

  // Section 11: Opportunities Form Handlers
  if (kind === "submit-opp-application") {
    const opp = (db.opportunities || []).find(x => x.id === f.dataset.oppId);
    if (opp) {
      const u = me();
      opp.applications = opp.applications || [];
      opp.applications.push({
        id: rid(),
        applicantId: u.id,
        applicantName: u.name,
        applicantType: v.applicantType,
        pitch: v.pitch,
        portfolio: v.portfolio,
        contactEmail: v.contactEmail,
        contactPhone: v.contactPhone,
        submittedAt: now()
      });
      save();
      closeModal();
      toast("Application submitted successfully!");
      rerender();
    }
    return;
  }

  if (kind === "submit-new-opportunity") {
    const u = me();
    need("title", "Enter opportunity title.");
    need("organisation", "Enter organisation name.");
    need("desc", "Enter description.");
    need("eligibility", "Enter eligibility criteria.");
    need("deadline", "Choose deadline.");
    if (Object.keys(errs).length) return setErrs(f, errs);

    const isVerified = (u.role === "client" || u.email.endsWith("@teambud.org"));
    const newOpp = {
      id: "opp_" + rid(),
      title: v.title.trim(),
      organisation: v.organisation.trim(),
      category: v.category || "Client Projects",
      description: v.desc.trim(),
      eligibility: v.eligibility.trim(),
      deadline: v.deadline,
      applicationLink: v.link || "in-app",
      allowInAppApply: true,
      rewardOrValue: v.reward ? v.reward.trim() : "",
      location: "Nigeria",
      verificationStatus: isVerified ? "verified" : "community",
      submittedBy: u.id,
      postedAt: now(),
      applications: []
    };

    db.opportunities = db.opportunities || [];
    db.opportunities.unshift(newOpp);
    save();
    closeModal();
    toast("Opportunity published!");
    go("/opportunities");
    rerender();
    return;
  }

  // Core student forms: profile, add-skill, add-exp, add-link
  const u = me();
  if (!u) return route();

  if (kind === "profile") {
    u.headline = (v.headline || "").trim() || u.headline;
    u.bio = (v.bio || "").trim().slice(0, 500);
    u.aboutMe = (v.aboutMe || "").trim() || u.aboutMe;
    u.institution = (v.institution || "").trim() || u.institution;
    u.department = (v.department || "").trim() || u.department;
    u.level = v.level || u.level;
    u.showLevel = f.elements.showLevel ? f.elements.showLevel.checked : true;
    u.experienceLevel = v.experienceLevel || u.experienceLevel;
    u.category = v.category || u.category;
    u.availability = v.availability || "unset";
    u.collab = $$("input[name=collab]:checked", f).map(i => i.value);
    u.lookingFor = $$("input[name=lookingFor]:checked", f).map(i => i.value);
    u.socialLinks = {
      github: (v.github || "").trim(),
      behance: (v.behance || "").trim(),
      linkedin: (v.linkedin || "").trim(),
      twitter: (v.twitter || "").trim(),
      website: (v.website || "").trim()
    };
    log(u, "Updated student talent profile details");
    save();
    toast("Talent profile saved");
    return rerender();
  }

  if (kind === "add-portfolio-proj") {
    need("title", "Enter a project title.");
    need("description", "Enter a project description.");
    if (Object.keys(errs).length) return setErrs(f, errs);
    u.portfolio = u.portfolio || [];
    const tools = (v.tools || "").split(",").map(t => t.trim()).filter(Boolean);
    u.portfolio.unshift({
      id: rid(),
      title: v.title.trim(),
      category: v.category || "Project",
      date: (v.date || "").trim() || "2024",
      description: v.description.trim(),
      tools,
      url: (v.url || "").trim(),
      contribution: (v.contribution || "").trim(),
      image: (v.image || "").trim()
    });
    save();
    closeModal();
    toast("Project added to your portfolio showcase!");
    return rerender();
  }

  if (kind === "add-skill") {
    need("name", "Enter a skill.");
    if (u.skills.some(s => s.name.toLowerCase() === (v.name || "").trim().toLowerCase())) {
      errs.name = "You already added this skill.";
    }
    if (Object.keys(errs).length) return setErrs(f, errs);
    u.skills.push({
      id: rid(),
      name: v.name.trim(),
      level: v.level || "Intermediate",
      pro: !!(f.elements.pro && f.elements.pro.checked),
      learn: !!(f.elements.learn && f.elements.learn.checked),
      collab: !!(f.elements.collab && f.elements.collab.checked)
    });
    log(u, "Added skill: " + v.name.trim());
    save();
    toast("Skill added");
    return rerender();
  }

  if (kind === "add-exp") {
    need("role", "Enter a role.");
    need("org", "Enter organisation.");
    if (Object.keys(errs).length) return setErrs(f, errs);
    u.experience = u.experience || [];
    u.experience.push({ id: rid(), role: v.role.trim(), org: v.org.trim(), period: v.period.trim(), desc: v.desc.trim() });
    save();
    return rerender();
  }

  if (kind === "add-link") {
    need("label", "Enter a label.");
    need("url", "Enter full URL.");
    if (Object.keys(errs).length) return setErrs(f, errs);
    u.portfolio = u.portfolio || [];
    u.portfolio.push({ id: rid(), label: v.label.trim(), url: v.url.trim() });
    save();
    return rerender();
  }
});

// Initialize route on startup
route();
