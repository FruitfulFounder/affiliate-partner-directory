import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Star,
  ArrowRight,
  Users,
  Building2,
  BadgeDollarSign,
  CheckCircle2,
  TrendingUp,
  Globe2,
  ShieldCheck,
  Menu,
  X,
  ExternalLink,
  Mail,
  Sparkles,
  Target,
  Layers,
  Clock,
  MousePointerClick,
  FileText,
  HelpCircle,
} from "lucide-react";

const categories = [
  "All",
  "Travel",
  "Beauty & Skincare",
  "Finance & Investing",
  "Pets",
  "Health & Wellness",
  "Personal Growth",
  "Parenting & Family",
  "Fashion & Apparel",
  "Entertainment & Music",
  "Software & SaaS",
  "Business Tools",
  "Education & Courses",
  "Home & Lifestyle",
  "Food & Cooking",
  "Creator Tools",
];

const commissionTypes = [
  "All",
  "Recurring",
  "High-ticket",
  "Lead commission",
  "Signup commission",
  "Product commission",
  "Course commission",
  "Subscription commission",
];

const audienceTypes = [
  "All",
  "Creators",
  "Bloggers",
  "Small Businesses",
  "Agencies",
  "Affiliate Managers",
  "Niche Publishers",
];

const programs = [
  {
    name: "Villiers Jets",
    category: "Travel",
    commissionType: "High-ticket",
    commission: "High-ticket commission",
    audienceType: "Creators",
    audience: "Luxury travel creators",
    bestFor: "Luxury travel, business travel, and high-income audiences",
    payout: "Monthly",
    cookie: "Inquiry based",
    platform: "Direct program",
    difficulty: "Advanced",
    rating: 4.8,
    tags: ["Private jets", "Luxury", "Travel"],
    verified: true,
  },
  {
    name: "TradingView Partner Program",
    category: "Finance & Investing",
    commissionType: "Recurring",
    commission: "Recurring revenue",
    audienceType: "Niche Publishers",
    audience: "Finance creators & traders",
    bestFor: "Trading, investing, market analysis, and finance education",
    payout: "Monthly",
    cookie: "30 days",
    platform: "Partner platform",
    difficulty: "Intermediate",
    rating: 4.9,
    tags: ["Charts", "Investing", "SaaS"],
    verified: true,
  },
  {
    name: "Mindvalley",
    category: "Personal Growth",
    commissionType: "Course commission",
    commission: "Course commission",
    audienceType: "Creators",
    audience: "Self-improvement creators",
    bestFor: "Personal growth, mindset, wellness, and education audiences",
    payout: "Monthly",
    cookie: "30 days",
    platform: "Affiliate network",
    difficulty: "Beginner-friendly",
    rating: 4.7,
    tags: ["Courses", "Mindset", "Wellness"],
    verified: true,
  },
  {
    name: "Innovet Pet",
    category: "Pets",
    commissionType: "Product commission",
    commission: "Product commission",
    audienceType: "Bloggers",
    audience: "Pet creators & bloggers",
    bestFor: "Pet care, pet wellness, dog owners, and animal content",
    payout: "Net 30",
    cookie: "30 days",
    platform: "Affiliate network",
    difficulty: "Beginner-friendly",
    rating: 4.6,
    tags: ["Pets", "Supplements", "DTC"],
    verified: true,
  },
  {
    name: "Digital Fashion Academy",
    category: "Fashion & Apparel",
    commissionType: "Course commission",
    commission: "Education commission",
    audienceType: "Niche Publishers",
    audience: "Fashion professionals",
    bestFor: "Fashion business, fashion education, and career audiences",
    payout: "Monthly",
    cookie: "30 days",
    platform: "Direct program",
    difficulty: "Intermediate",
    rating: 4.5,
    tags: ["Fashion", "Courses", "Career"],
    verified: false,
  },
  {
    name: "Skoove",
    category: "Entertainment & Music",
    commissionType: "Subscription commission",
    commission: "Subscription commission",
    audienceType: "Creators",
    audience: "Music & education creators",
    bestFor: "Music lessons, piano learning, education, and hobby audiences",
    payout: "Monthly",
    cookie: "30 days",
    platform: "Affiliate network",
    difficulty: "Beginner-friendly",
    rating: 4.6,
    tags: ["Music", "Education", "App"],
    verified: true,
  },
  {
    name: "Canva Affiliate Program",
    category: "Creator Tools",
    commissionType: "Subscription commission",
    commission: "Subscription commission",
    audienceType: "Small Businesses",
    audience: "Creators, designers, and small businesses",
    bestFor: "Design, marketing, social media, and creator business audiences",
    payout: "Monthly",
    cookie: "30 days",
    platform: "Partner platform",
    difficulty: "Beginner-friendly",
    rating: 4.8,
    tags: ["Design", "Creator Tools", "SaaS"],
    verified: true,
  },
  {
    name: "Teachable Partner Program",
    category: "Education & Courses",
    commissionType: "Recurring",
    commission: "Recurring commission",
    audienceType: "Creators",
    audience: "Course creators and educators",
    bestFor: "Online courses, coaches, educators, and creator entrepreneurs",
    payout: "Monthly",
    cookie: "30 days",
    platform: "Partner platform",
    difficulty: "Intermediate",
    rating: 4.7,
    tags: ["Courses", "Education", "Creator Business"],
    verified: true,
  },
  {
    name: "Home Chef Affiliate Program",
    category: "Food & Cooking",
    commissionType: "Lead commission",
    commission: "Lead commission",
    audienceType: "Bloggers",
    audience: "Food, cooking, and lifestyle creators",
    bestFor: "Recipe blogs, family meals, cooking content, and lifestyle audiences",
    payout: "Monthly",
    cookie: "30 days",
    platform: "Affiliate network",
    difficulty: "Beginner-friendly",
    rating: 4.5,
    tags: ["Food", "Cooking", "Meal Kits"],
    verified: false,
  },
  {
    name: "Grammarly Affiliate Program",
    category: "Software & SaaS",
    commissionType: "Signup commission",
    commission: "Signup commission",
    audienceType: "Niche Publishers",
    audience: "Writers, bloggers, students, and professionals",
    bestFor: "Writing, productivity, education, business, and blogging audiences",
    payout: "Monthly",
    cookie: "90 days",
    platform: "Affiliate network",
    difficulty: "Beginner-friendly",
    rating: 4.6,
    tags: ["Writing", "Productivity", "Software"],
    verified: true,
  },
];

const stats = [
  { label: "Affiliate programs", value: "8,500+" },
  { label: "Niches covered", value: "120+" },
  { label: "Verified partners", value: "2,400+" },
  { label: "Creator searches/month", value: "75K+" },
];

const featuredNiches = [
  "Scout travel affiliate programs",
  "Scout finance partner offers",
  "Find beauty brand partnerships",
  "Discover pet product affiliates",
  "Compare wellness creator offers",
  "Explore fashion affiliate networks",
  "Find software referral programs",
  "Scout parenting brand deals",
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-sm">
            <BadgeDollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight text-slate-950">PartnerScout</p>
            <p className="text-xs font-medium text-slate-500">Affiliate partner discovery</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
          <a href="#how" className="hover:text-slate-950">How it works</a>
          <a href="#directory" className="hover:text-slate-950">Scout Programs</a>
          <a href="#niches" className="hover:text-slate-950">Niches</a>
          <a href="#submit" className="hover:text-slate-950">List a Program</a>
          <a href="#pricing" className="hover:text-slate-950">Pricing</a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#waitlist" className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Join waitlist</a>
          <a href="#submit" className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800">List your program</a>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          <div className="grid gap-3 text-sm font-semibold text-slate-700">
            <a href="#how">How it works</a>
            <a href="#directory">Scout Programs</a>
            <a href="#niches">Niches</a>
            <a href="#submit">List a Program</a>
            <a href="#pricing">Pricing</a>
            <a href="#waitlist" className="mt-2 rounded-xl bg-slate-950 px-4 py-3 text-center text-white">Join waitlist</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(15,23,42,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(100,116,139,0.18),transparent_35%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            The scouting engine for affiliate partnerships
          </div>

          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Scout affiliate partners built for your audience.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            PartnerScout helps creators, publishers, and businesses discover affiliate programs by niche, commission type, audience fit, and growth potential.
          </p>

          <div className="mt-8 rounded-3xl border bg-white p-3 shadow-xl shadow-slate-200/70">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex min-h-14 flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4">
                <Search className="h-5 w-5 text-slate-500" />
                <input className="w-full bg-transparent text-base outline-none placeholder:text-slate-400" placeholder="Scout by niche, product, brand, audience, or commission type" />
              </div>

              <a href="#directory" className="flex min-h-14 items-center justify-center rounded-2xl bg-slate-950 px-7 font-bold text-white hover:bg-slate-800">
                Start scouting
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-slate-600">
            {featuredNiches.slice(0, 4).map((item) => (
              <span key={item} className="rounded-full bg-white px-4 py-2 shadow-sm">{item}</span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }} className="rounded-[2rem] border bg-white p-5 shadow-2xl shadow-slate-200">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Recommended match</p>
              <h2 className="text-2xl font-black text-slate-950">Creator fit score</h2>
            </div>
            <div className="rounded-2xl bg-slate-950 px-4 py-3 text-xl font-black text-white">94%</div>
          </div>

          <div className="space-y-4">
            {programs.slice(0, 3).map((program) => (
              <div key={program.name} className="rounded-3xl border bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-slate-950">{program.name}</h3>
                      {program.verified && <ShieldCheck className="h-4 w-4 text-slate-700" />}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{program.bestFor}</p>
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-bold">
                    <Star className="h-4 w-4 fill-current" /> {program.rating}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {program.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl bg-slate-50 p-6 text-center">
            <p className="text-3xl font-black text-slate-950">{stat.value}</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhatItDoes() {
  const cards = [
    {
      icon: Target,
      title: "Find audience-fit programs",
      text: "Scout opportunities by niche, audience type, product fit, and creator relevance.",
    },
    {
      icon: Layers,
      title: "Compare key details",
      text: "Review commission style, payout timing, cookie windows, platform, and difficulty.",
    },
    {
      icon: MousePointerClick,
      title: "Build a smarter shortlist",
      text: "Move from random affiliate hunting to a more intentional partner discovery process.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-slate-500">What PartnerScout does</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">A cleaner way to discover affiliate opportunities.</h2>
            <p className="mt-4 text-slate-600">
              Instead of digging through scattered websites, PartnerScout organizes affiliate programs into a searchable scouting directory for creators, publishers, small businesses, and affiliate managers.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((card) => (
              <div key={card.title} className="rounded-[2rem] border bg-slate-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                  <card.icon className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="mt-5 text-lg font-black text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search your niche",
      text: "Start with your audience, niche, content topic, or product category.",
    },
    {
      icon: Filter,
      title: "Refine the fit",
      text: "Narrow programs by commission type, payout style, audience match, and partner rules.",
    },
    {
      icon: CheckCircle2,
      title: "Compare opportunities",
      text: "Review program details, creator fit, brand relevance, and earning potential.",
    },
    {
      icon: TrendingUp,
      title: "Apply and grow",
      text: "Build a shortlist, apply to the right programs, and turn trusted content into revenue.",
    },
  ];

  return (
    <section id="how" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-widest text-slate-500">How it works</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">A simple path from niche to partner.</h2>
          <p className="mt-4 text-slate-600">
            PartnerScout gives creators and businesses a clearer way to search, refine, compare, and choose affiliate programs that fit their audience.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-[2rem] border bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 shadow-sm">
                <step.icon className="h-6 w-6 text-slate-700" />
              </div>
              <p className="mt-5 text-sm font-black text-slate-400">0{index + 1}</p>
              <h3 className="mt-2 text-xl font-black text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Directory() {
  const [category, setCategory] = useState("All");
  const [commissionType, setCommissionType] = useState("All");
  const [audienceType, setAudienceType] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return programs.filter((program) => {
      const categoryMatch = category === "All" || program.category === category;
      const commissionMatch = commissionType === "All" || program.commissionType === commissionType;
      const audienceMatch = audienceType === "All" || program.audienceType === audienceType;
      const queryMatch = [
        program.name,
        program.category,
        program.audience,
        program.bestFor,
        program.commission,
        program.commissionType,
        program.platform,
        program.difficulty,
        ...program.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());

      return categoryMatch && commissionMatch && audienceMatch && queryMatch;
    });
  }, [category, commissionType, audienceType, query]);

  return (
    <section id="directory" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-slate-500">Affiliate directory</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Scout programs by niche, payout, and audience fit.</h2>
            <p className="mt-4 max-w-2xl text-slate-600">
              Built like a sourcing directory, but designed to help creators and businesses scout affiliate partnerships that match their audience.
            </p>
          </div>

          <a href="#waitlist" className="inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 font-bold text-slate-800 hover:bg-slate-50">
            Refine scouting <Filter className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 grid gap-4 rounded-[2rem] border bg-slate-50 p-4 lg:grid-cols-[1fr_auto_auto_auto]">
          <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <Search className="h-5 w-5 text-slate-500" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full outline-none" placeholder="Scout by niche, audience, product type, commission, or brand name" />
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <Filter className="h-5 w-5 text-slate-500" />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-white font-semibold outline-none">
              {categories.map((cat) => <option key={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <BadgeDollarSign className="h-5 w-5 text-slate-500" />
            <select value={commissionType} onChange={(e) => setCommissionType(e.target.value)} className="bg-white font-semibold outline-none">
              {commissionTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <Users className="h-5 w-5 text-slate-500" />
            <select value={audienceType} onChange={(e) => setAudienceType(e.target.value)} className="bg-white font-semibold outline-none">
              {audienceTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 text-sm font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Tip: Start with a niche, then refine by audience fit, commission type, or product category.</p>
          <p>{filtered.length} program{filtered.length === 1 ? "" : "s"} showing</p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {filtered.map((program) => (
            <motion.article layout key={program.name} className="rounded-[2rem] border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <Building2 className="h-6 w-6 text-slate-700" />
                </div>

                <div className="flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 text-sm font-bold text-slate-700">
                  <Star className="h-4 w-4 fill-current" /> {program.rating}
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-slate-950">{program.name}</h3>
                  {program.verified && <ShieldCheck className="h-5 w-5 text-slate-700" />}
                </div>
                <p className="mt-2 text-sm font-bold text-slate-500">{program.category}</p>
                <p className="mt-3 text-slate-600">{program.bestFor}</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="font-bold text-slate-950">Commission</p>
                  <p className="mt-1 text-slate-600">{program.commission}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="font-bold text-slate-950">Payout</p>
                  <p className="mt-1 text-slate-600">{program.payout}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="font-bold text-slate-950">Cookie</p>
                  <p className="mt-1 text-slate-600">{program.cookie}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="font-bold text-slate-950">Level</p>
                  <p className="mt-1 text-slate-600">{program.difficulty}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {program.tags.map((tag) => (
                  <span key={tag} className="rounded-full border px-3 py-1 text-xs font-bold text-slate-600">{tag}</span>
                ))}
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 font-bold text-white hover:bg-slate-800">
                Scout this program <ArrowRight className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NicheBrowser() {
  return (
    <section id="niches" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-widest text-slate-500">Browse by opportunity</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Turn your audience into a partner strategy.</h2>
          <p className="mt-4 text-slate-600">Explore affiliate programs by niche, audience type, content format, commission model, and business goal.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredNiches.map((niche) => (
            <button key={niche} className="group rounded-[2rem] border bg-white p-6 text-left shadow-sm hover:shadow-lg">
              <Globe2 className="h-7 w-7 text-slate-700" />
              <p className="mt-5 font-black text-slate-950">{niche}</p>
              <p className="mt-2 text-sm text-slate-500">Scout programs, compare payout details, and find the best audience fit.</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-bold text-slate-950">
                Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoItsFor() {
  const groups = [
    { title: "Content Creators", text: "Find affiliate programs that match your niche, content style, and audience trust.", icon: Users },
    { title: "Influencers", text: "Scout brands and products your followers already care about.", icon: Star },
    { title: "Bloggers & Publishers", text: "Compare affiliate offers that fit your articles, reviews, guides, and newsletters.", icon: Globe2 },
    { title: "Small Businesses", text: "Discover partner programs that can add new revenue streams to your website or audience.", icon: Building2 },
    { title: "Agencies", text: "Build affiliate partner lists for clients across multiple niches and campaigns.", icon: TrendingUp },
    { title: "Affiliate Managers", text: "Understand how creators search for programs and position your offer to get discovered.", icon: ShieldCheck },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-widest text-slate-500">Who it is for</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Built for anyone scouting better affiliate opportunities.</h2>
          <p className="mt-4 text-slate-600">PartnerScout helps people turn their audience, content, website, or client work into smarter partnership opportunities.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title} className="rounded-[2rem] border bg-slate-50 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                <group.icon className="h-6 w-6 text-slate-700" />
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-950">{group.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{group.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubmitProgram() {
  return (
    <section id="submit" className="bg-slate-950 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-slate-400">For affiliate managers</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">Get discovered by creators ready to promote.</h2>
          <p className="mt-4 text-slate-300">
            List your affiliate program, verify your offer, and reach creators, publishers, agencies, and businesses searching for partner opportunities in your niche.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Verified program badge", "Creator lead requests", "Featured niche placement", "Program detail pages"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-2xl">
          <h3 className="text-2xl font-black">Submit an affiliate program</h3>
          <p className="mt-2 text-sm text-slate-600">This form is a placeholder for the MVP. Later we can connect it to email, Airtable, Notion, or a database.</p>
          <div className="mt-6 grid gap-4">
            <input className="rounded-2xl border px-4 py-3 outline-none" placeholder="Company name" />
            <input className="rounded-2xl border px-4 py-3 outline-none" placeholder="Affiliate program URL" />
            <select className="rounded-2xl border px-4 py-3 outline-none">
              <option>Select primary category</option>
              {categories.filter((cat) => cat !== "All").map((cat) => <option key={cat}>{cat}</option>)}
            </select>
            <textarea className="min-h-28 rounded-2xl border px-4 py-3 outline-none" placeholder="Tell creators what makes your program worth joining" />
            <button className="rounded-2xl bg-slate-950 px-5 py-4 font-black text-white hover:bg-slate-800">Submit program</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Waitlist() {
  return (
    <section id="waitlist" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border bg-white p-8 shadow-sm sm:p-10">
          <p className="text-sm font-black uppercase tracking-widest text-slate-500">Early access</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Get early PartnerScout updates.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Be the first to know when new affiliate programs, categories, scouting tools, and partner opportunities are added.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <input className="min-h-14 flex-1 rounded-2xl border px-4 outline-none" placeholder="Enter your email" type="email" />
            <button className="min-h-14 rounded-2xl bg-slate-950 px-7 font-bold text-white hover:bg-slate-800">Join the waitlist</button>
          </div>

          <div className="mx-auto mt-6 grid max-w-2xl gap-3 text-left sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="font-bold text-slate-950">New programs</p>
              <p className="mt-1 text-sm text-slate-600">Get updates when new affiliate programs are added.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="font-bold text-slate-950">Better scouting</p>
              <p className="mt-1 text-sm text-slate-600">Follow new filters, categories, and discovery tools.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="font-bold text-slate-950">Early access</p>
              <p className="mt-1 text-sm text-slate-600">Be first to try new PartnerScout features.</p>
            </div>
          </div>

          <p className="mt-4 text-xs font-medium text-slate-500">No spam. Just updates as PartnerScout grows.</p>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Is PartnerScout an affiliate network?",
      a: "Not exactly. PartnerScout is being built as a discovery directory that helps people find and compare affiliate programs across different niches and platforms.",
    },
    {
      q: "Who is PartnerScout for?",
      a: "It is for creators, bloggers, niche publishers, small businesses, agencies, and affiliate managers who want a clearer way to scout partnership opportunities.",
    },
    {
      q: "Are the current program listings final?",
      a: "No. The current listings are starter examples for the prototype. The MVP will need verified details, real links, updated terms, and more complete program data.",
    },
    {
      q: "How will PartnerScout make money?",
      a: "Possible revenue models include featured listings, brand submissions, premium creator filters, sponsorships, newsletter placements, and affiliate relationships.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-widest text-slate-500">FAQ</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Questions before the full launch.</h2>
          <p className="mt-4 text-slate-600">A few clear notes about what PartnerScout is becoming.</p>
        </div>

        <div className="mt-10 grid gap-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-[2rem] border bg-slate-50 p-6">
              <div className="flex gap-3">
                <HelpCircle className="mt-1 h-5 w-5 flex-none text-slate-700" />
                <div>
                  <h3 className="font-black text-slate-950">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustNotes() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-slate-500">Trust note</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Program details should be verified before applying.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                Affiliate terms can change. PartnerScout should eventually track source links, last-reviewed dates, program rules, and verified status so users can make better decisions.
              </p>
            </div>
            <div className="flex min-w-fit items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
              <FileText className="h-5 w-5" /> MVP trust layer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Creator", price: "Free", text: "Search programs, browse categories, and build a starter shortlist.", cta: "Start scouting" },
    { name: "Pro Creator", price: "$19/mo", text: "Advanced filters, alerts, saved lists, templates, and hidden opportunities.", cta: "Join waitlist" },
    { name: "Brand Listing", price: "$99/mo", text: "Verified listing, creator leads, featured placement, and program analytics.", cta: "List program" },
  ];

  return (
    <section id="pricing" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-widest text-slate-500">Pricing</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Simple plans for both sides of the marketplace.</h2>
          <p className="mt-4 text-slate-600">These are placeholder MVP pricing ideas. We can adjust them before launch.</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className="rounded-[2rem] border bg-slate-50 p-6">
              <h3 className="text-xl font-black text-slate-950">{tier.name}</h3>
              <p className="mt-4 text-4xl font-black text-slate-950">{tier.price}</p>
              <p className="mt-4 min-h-14 text-slate-600">{tier.text}</p>
              <a href={tier.name === "Brand Listing" ? "#submit" : tier.name === "Creator" ? "#directory" : "#waitlist"} className="mt-6 flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 font-black text-white hover:bg-slate-800">
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <BadgeDollarSign className="h-6 w-6" />
            </div>
            <p className="text-xl font-black text-slate-950">PartnerScout</p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            The scouting directory for affiliate programs, partner opportunities, creator monetization, and brand discovery.
          </p>
        </div>

        <div>
          <p className="font-black text-slate-950">Creators</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <a href="#directory">Scout programs</a>
            <a href="#niches">Browse niches</a>
            <a href="#waitlist">Join waitlist</a>
          </div>
        </div>

        <div>
          <p className="font-black text-slate-950">Brands</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <a href="#submit">List program</a>
            <a href="#submit">Submit details</a>
            <a href="#pricing">Pricing ideas</a>
          </div>
        </div>

        <div>
          <p className="font-black text-slate-950">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-slate-600">
            <a className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@partnerscout.com</a>
            <a className="flex items-center gap-2"><Clock className="h-4 w-4" /> Build in progress</a>
            <a className="flex items-center gap-2"><ExternalLink className="h-4 w-4" /> Partner resources</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function AffiliatePartnerDirectory() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />
      <Hero />
      <Stats />
      <WhatItDoes />
      <HowItWorks />
      <Directory />
      <NicheBrowser />
      <WhoItsFor />
      <SubmitProgram />
      <Waitlist />
      <FAQ />
      <TrustNotes />
      <Pricing />
      <Footer />
    </div>
  );
}
