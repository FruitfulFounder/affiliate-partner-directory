import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  Filter,
  Mail,
  Map,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  X,
} from "lucide-react";

const BRAND = {
  name: "AvaraPath",
  slogan: "The simple path to affiliate connections.",
  shortDescription: "Affiliate connection discovery",
  headerLogo: "/images/brand/avarapath-header-logo.png",
  iconLogo: "/images/brand/avarapath-icon-only.png",
  simpleLogo: "/images/brand/avarapath-simple-logo.png",
  fullLogo: "/images/brand/avarapath-primary-full-logo.png",
};

const TALLY_FORM_URL = "https://tally.so/r/rjkN1p";

const stats = [
  { value: "100+", label: "Affiliate programs tracked" },
  { value: "35", label: "High-priority import candidates" },
  { value: "84", label: "Link verified programs" },
  { value: "0", label: "Duplicate brands in database" },
];

const programs = [
  {
    name: "Villiers Jets",
    category: "Travel",
    commissionType: "High-ticket",
    commission: "Varies / high-ticket private jet commission",
    audienceType: "Creators",
    audience: "Luxury travel creators and business travel audiences",
    bestFor: "Private jet content, luxury travel blogs, business travel, and high-income audiences",
    payout: "Unknown",
    cookie: "Inquiry based",
    platform: "Direct program",
    difficulty: "Advanced",
    rating: 4.8,
    tags: ["Private jets", "Luxury", "Travel"],
    verified: true,
    premiumReason: "High-ticket private aviation affiliate opportunity",
  },
  {
    name: "TradingView Partner Program",
    category: "Finance & Investing",
    commissionType: "Recurring",
    commission: "Recurring / revenue share",
    audienceType: "Niche Publishers",
    audience: "Finance creators, trading educators, and investing audiences",
    bestFor: "Trading blogs, finance YouTubers, investing newsletters, and market education content",
    payout: "Monthly",
    cookie: "90 days",
    platform: "Partner platform",
    difficulty: "Intermediate",
    rating: 4.9,
    tags: ["Charts", "Investing", "SaaS"],
    verified: true,
    premiumReason: "Recurring finance/SaaS program",
  },
  {
    name: "Expedia Group Affiliate Program",
    category: "Travel",
    commissionType: "Percentage commission",
    commission: "Up to 4% listed on affiliate page",
    audienceType: "Creators",
    audience: "Travel creators, travel bloggers, and trip planning websites",
    bestFor: "Hotel, flight, vacation package, travel guide, and trip planning content",
    payout: "Unknown",
    cookie: "7 days",
    platform: "Direct / Expedia Group",
    difficulty: "Intermediate",
    rating: 4.7,
    tags: ["Hotels", "Travel booking", "Packages"],
    verified: true,
    premiumReason: "Recognized travel booking program with broad hotel and package inventory",
  },
  {
    name: "Empower Affiliate Program",
    category: "Finance & Investing",
    commissionType: "Lead commission",
    commission: "Unknown / confirm",
    audienceType: "Niche Publishers",
    audience: "Personal finance creators, retirement content publishers, and wealth-building audiences",
    bestFor: "Net worth tracking, retirement planning, investment tracking, and financial wellness content",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Direct program / affiliate platform",
    difficulty: "Advanced",
    rating: 4.5,
    tags: ["Finance", "Retirement", "Wealth tools"],
    verified: true,
    premiumReason: "High-value finance lead opportunity; review compliance carefully",
  },
  {
    name: "Kit Affiliate Program",
    category: "Creator Tools",
    commissionType: "Recurring",
    commission: "50% monthly commission for up to 12 months; possible 10–20% recurring after 12 months",
    audienceType: "Creators",
    audience: "Creators, newsletter writers, bloggers, coaches, and educators",
    bestFor: "Email marketing, newsletters, creator business, audience building, and digital product content",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "PartnerStack",
    difficulty: "Intermediate",
    rating: 4.8,
    tags: ["Email marketing", "Creator tools", "Recurring"],
    verified: true,
    premiumReason: "Recurring creator email platform opportunity",
  },
  {
    name: "Coursera Affiliate Program",
    category: "Education & Courses",
    commissionType: "Percentage commission",
    commission: "15%–45% commission on eligible purchases",
    audienceType: "Creators",
    audience: "Education creators, career bloggers, and professional development audiences",
    bestFor: "Career growth, online courses, certifications, professional learning, and skill-building content",
    payout: "Unknown",
    cookie: "30 days",
    platform: "Impact",
    difficulty: "Beginner-friendly",
    rating: 4.8,
    tags: ["Courses", "Education", "Career"],
    verified: true,
    premiumReason: "High-commission education/course affiliate opportunity",
  },
  {
    name: "Myprotein Affiliate Program",
    category: "Health & Wellness",
    commissionType: "Percentage commission",
    commission: "Up to 8% listed on affiliate page",
    audienceType: "Creators",
    audience: "Fitness creators, gym content creators, and wellness bloggers",
    bestFor: "Fitness nutrition, protein, workout content, healthy lifestyle, and performance-focused audiences",
    payout: "Unknown",
    cookie: "30 days",
    platform: "Direct / in-house affiliate team",
    difficulty: "Intermediate",
    rating: 4.5,
    tags: ["Fitness", "Nutrition", "Wellness"],
    verified: true,
    premiumReason: "Fitness and wellness affiliate opportunity; review supplement claims carefully",
  },
  {
    name: "Shopify Affiliate Program",
    category: "Business Tools",
    commissionType: "Signup commission",
    commission: "Commission on full-price Shopify plan referrals",
    audienceType: "Small Businesses",
    audience: "Business creators, ecommerce educators, entrepreneurs, and agencies",
    bestFor: "Ecommerce, online stores, business building, creator businesses, and entrepreneurship content",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Direct affiliate program",
    difficulty: "Intermediate",
    rating: 4.8,
    tags: ["Ecommerce", "Business", "SaaS"],
    verified: true,
    premiumReason: "High-value ecommerce platform opportunity",
  },
  {
    name: "SafetyWing Ambassador / Affiliate Program",
    category: "Travel",
    commissionType: "Recurring",
    commission: "Unknown / confirm",
    audienceType: "Creators",
    audience: "Digital nomads, travel creators, and remote work audiences",
    bestFor: "Travel medical insurance, nomad insurance, remote worker travel, and long-term travel content",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Direct ambassador program",
    difficulty: "Intermediate",
    rating: 4.6,
    tags: ["Travel insurance", "Nomads", "Remote work"],
    verified: true,
    premiumReason: "Travel insurance and digital nomad affiliate opportunity; review compliance carefully",
  },
  {
    name: "HubSpot Affiliate Program",
    category: "Business Tools",
    commissionType: "Hybrid",
    commission: "30% recurring commission for up to one year",
    audienceType: "Agencies",
    audience: "Business creators, SaaS bloggers, and marketing educators",
    bestFor: "CRM, marketing software, sales tools, business growth, and B2B content",
    payout: "Unknown",
    cookie: "180 days",
    platform: "Impact / affiliate platform",
    difficulty: "Intermediate",
    rating: 4.8,
    tags: ["CRM", "Marketing", "B2B SaaS"],
    verified: true,
    premiumReason: "High-value B2B SaaS affiliate opportunity with long cookie window",
  },
  {
    name: "Semrush Affiliate Program",
    category: "Business Tools",
    commissionType: "Recurring",
    commission: "$200 per sale; $10 per trial activation; $0.01 per sign-up",
    audienceType: "Agencies",
    audience: "SEO creators, marketing bloggers, agencies, and business publishers",
    bestFor: "SEO tools, marketing software, content marketing, agency growth, and business education",
    payout: "Unknown",
    cookie: "120 days",
    platform: "Impact / affiliate platform",
    difficulty: "Advanced",
    rating: 4.8,
    tags: ["SEO", "Marketing", "SaaS"],
    verified: true,
    premiumReason: "High-value SEO/SaaS affiliate opportunity",
  },
  {
    name: "Leadpages Affiliate Program",
    category: "Business Tools",
    commissionType: "Recurring",
    commission: "30% recurring commission; up to $400 per referral",
    audienceType: "Small Businesses",
    audience: "Business creators, marketers, agencies, and funnel builders",
    bestFor: "Landing pages, lead generation, small business marketing, conversion tools, and funnels",
    payout: "Unknown",
    cookie: "90 days",
    platform: "Direct affiliate platform",
    difficulty: "Intermediate",
    rating: 4.7,
    tags: ["Landing pages", "Lead gen", "Recurring"],
    verified: true,
    premiumReason: "Recurring landing-page SaaS opportunity",
  },
  {
    name: "ClickFunnels Affiliate Program",
    category: "Business Tools",
    commissionType: "Recurring",
    commission: "30% recurring commission listed for ClickFunnels 2.0 affiliate program",
    audienceType: "Agencies",
    audience: "Marketing creators, funnel builders, agencies, and online business audiences",
    bestFor: "Sales funnels, landing pages, digital marketing, online sales, and business growth content",
    payout: "Unknown",
    cookie: "45 days",
    platform: "Direct / affiliate platform",
    difficulty: "Advanced",
    rating: 4.6,
    tags: ["Funnels", "Marketing", "Recurring"],
    verified: true,
    premiumReason: "Recurring funnel software opportunity; review earnings claims carefully",
  },
  {
    name: "AWeber Advocate / Affiliate Program",
    category: "Business Tools",
    commissionType: "Recurring",
    commission: "30%–50% recurring commission depending on referral volume",
    audienceType: "Creators",
    audience: "Creators, bloggers, newsletter publishers, and small businesses",
    bestFor: "Email marketing, newsletters, automation, creator audience building, and small business marketing",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Direct advocate program",
    difficulty: "Beginner-friendly",
    rating: 4.5,
    tags: ["Email marketing", "Newsletters", "Recurring"],
    verified: true,
    premiumReason: "Recurring email marketing affiliate opportunity",
  },
  {
    name: "Jotform Affiliate Program",
    category: "Business Tools",
    commissionType: "Recurring",
    commission: "30% commission on every new paid user referred",
    audienceType: "Small Businesses",
    audience: "Business creators, productivity bloggers, agencies, and small businesses",
    bestFor: "Online forms, workflow automation, lead capture, surveys, and small business tools",
    payout: "Unknown",
    cookie: "60 days / confirm",
    platform: "Direct affiliate program",
    difficulty: "Beginner-friendly",
    rating: 4.5,
    tags: ["Forms", "Automation", "Business tools"],
    verified: true,
    premiumReason: "Recurring-style business forms/software affiliate opportunity",
  },
  {
    name: "Webflow Affiliate / Partner Program",
    category: "Business Tools",
    commissionType: "Hybrid",
    commission: "50% revenue-share commission on qualified first subscription for up to 12 months",
    audienceType: "Agencies",
    audience: "Designers, web agencies, no-code creators, and business educators",
    bestFor: "No-code websites, web design, freelance web design, agency content, and business websites",
    payout: "Unknown",
    cookie: "90 days",
    platform: "PartnerStack / Webflow affiliate program",
    difficulty: "Advanced",
    rating: 4.7,
    tags: ["Web design", "No-code", "SaaS"],
    verified: true,
    premiumReason: "High-value website builder affiliate opportunity",
  },
  {
    name: "Podia Affiliate Program",
    category: "Creator Tools",
    commissionType: "Recurring",
    commission: "20% recurring commission capped at 12 months",
    audienceType: "Creators",
    audience: "Creators, course sellers, coaches, and digital product entrepreneurs",
    bestFor: "Courses, digital downloads, memberships, creator business, and online stores",
    payout: "Unknown",
    cookie: "31 days",
    platform: "Direct affiliate program",
    difficulty: "Intermediate",
    rating: 4.6,
    tags: ["Courses", "Creator commerce", "Recurring"],
    verified: true,
    premiumReason: "Recurring creator-commerce platform opportunity",
  },
  {
    name: "Kajabi Partner Program",
    category: "Creator Tools",
    commissionType: "Hybrid",
    commission: "Scalable partner commission structure; exact rate needs confirmation",
    audienceType: "Creators",
    audience: "Coaches, course creators, creators, consultants, and digital business owners",
    bestFor: "Online courses, coaching, memberships, digital products, and creator business content",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Kajabi Partner Program",
    difficulty: "Advanced",
    rating: 4.6,
    tags: ["Courses", "Coaching", "Creator platform"],
    verified: true,
    premiumReason: "High-value course and creator platform partner opportunity",
  },
  {
    name: "TubeBuddy Affiliate Program",
    category: "Creator Tools",
    commissionType: "Recurring",
    commission: "Unknown / confirm",
    audienceType: "Creators",
    audience: "YouTubers, creator educators, and video marketing bloggers",
    bestFor: "YouTube growth, video SEO, creator tools, channel optimization, and video marketing content",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Direct affiliate program",
    difficulty: "Beginner-friendly",
    rating: 4.5,
    tags: ["YouTube", "Creator tools", "Video SEO"],
    verified: true,
    premiumReason: "YouTube creator tool affiliate opportunity",
  },
  {
    name: "vidIQ Affiliate Program",
    category: "Creator Tools",
    commissionType: "Recurring",
    commission: "15%–25% recurring commission based on affiliate level",
    audienceType: "Creators",
    audience: "YouTubers, creator educators, and video marketing publishers",
    bestFor: "YouTube analytics, video SEO, creator growth, and channel optimization content",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Direct affiliate program",
    difficulty: "Beginner-friendly",
    rating: 4.6,
    tags: ["YouTube", "Analytics", "Recurring"],
    verified: true,
    premiumReason: "Recurring YouTube growth tool opportunity",
  },
  {
    name: "Greenlight Affiliate Program",
    category: "Parenting & Family",
    commissionType: "Lead commission",
    commission: "Unknown / confirm",
    audienceType: "Bloggers",
    audience: "Parenting creators, family finance bloggers, and money educators",
    bestFor: "Kids debit cards, family finance, teaching money habits, and parenting content",
    payout: "Unknown",
    cookie: "30 days",
    platform: "FlexOffers / affiliate platform",
    difficulty: "Advanced",
    rating: 4.4,
    tags: ["Family finance", "Parenting", "Lead commission"],
    verified: true,
    premiumReason: "High-value family finance affiliate opportunity; review compliance carefully",
  },
  {
    name: "Squarespace Affiliate Program",
    category: "Business Tools",
    commissionType: "Signup commission",
    commission: "Unknown / confirm",
    audienceType: "Small Businesses",
    audience: "Creators, business owners, designers, bloggers, and small businesses",
    bestFor: "Website building, portfolios, online stores, service businesses, and creator websites",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Impact / affiliate platform",
    difficulty: "Intermediate",
    rating: 4.6,
    tags: ["Website builder", "Business", "SaaS"],
    verified: true,
    premiumReason: "High-value website builder affiliate opportunity",
  },
  {
    name: "Mailchimp & Co Referral / Rewards Program",
    category: "Business Tools",
    commissionType: "Hybrid",
    commission: "25% new customer referrals and 5% managed customer revenue",
    audienceType: "Agencies",
    audience: "Agencies, marketers, freelancers, and email marketing consultants",
    bestFor: "Email marketing, automation, newsletters, small business marketing, and client services",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Mailchimp & Co",
    difficulty: "Advanced",
    rating: 4.5,
    tags: ["Email marketing", "Agencies", "Rewards"],
    verified: true,
    premiumReason: "Agency/business email marketing rewards opportunity",
  },
  {
    name: "SiteGround Affiliate Program",
    category: "Business Tools",
    commissionType: "Flat fee",
    commission: "Tiered commissions; $50–$100+ per sale listed/source-found",
    audienceType: "Bloggers",
    audience: "Bloggers, website creators, WordPress educators, and small businesses",
    bestFor: "Web hosting, WordPress tutorials, blogging, business websites, and site-building content",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Direct affiliate program",
    difficulty: "Intermediate",
    rating: 4.6,
    tags: ["Hosting", "WordPress", "High payout"],
    verified: true,
    premiumReason: "High-payout hosting affiliate opportunity",
  },
  {
    name: "WP Engine Affiliate Program",
    category: "Business Tools",
    commissionType: "Signup commission",
    commission: "Unknown / confirm",
    audienceType: "Agencies",
    audience: "WordPress creators, agencies, developers, and business publishers",
    bestFor: "Managed WordPress hosting, agency websites, professional websites, and web development",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Direct affiliate program / partner program",
    difficulty: "Advanced",
    rating: 4.6,
    tags: ["Managed hosting", "WordPress", "Agency"],
    verified: true,
    premiumReason: "Premium managed WordPress hosting opportunity",
  },
  {
    name: "Kinsta Affiliate Program",
    category: "Business Tools",
    commissionType: "Recurring",
    commission: "Up to $500 one-time bonus plus 5%–10% monthly recurring commissions",
    audienceType: "Agencies",
    audience: "WordPress creators, developers, agencies, and hosting review sites",
    bestFor: "Managed WordPress hosting, cloud hosting, professional websites, and agency content",
    payout: "Unknown",
    cookie: "60 days",
    platform: "Direct / in-house affiliate program",
    difficulty: "Advanced",
    rating: 4.8,
    tags: ["Hosting", "WordPress", "Recurring"],
    verified: true,
    premiumReason: "High-ticket recurring hosting opportunity",
  },
  {
    name: "Cloudways Affiliate Program",
    category: "Business Tools",
    commissionType: "Hybrid",
    commission: "Up to $125 CPA / source-found",
    audienceType: "Agencies",
    audience: "Developers, agencies, WordPress creators, and hosting review publishers",
    bestFor: "Cloud hosting, managed hosting, WordPress hosting, ecommerce hosting, and agency content",
    payout: "Unknown",
    cookie: "90 days",
    platform: "Awin / Cloudways affiliate program",
    difficulty: "Advanced",
    rating: 4.6,
    tags: ["Cloud hosting", "Agencies", "High payout"],
    verified: true,
    premiumReason: "High-value cloud hosting affiliate opportunity",
  },
  {
    name: "Hostinger Affiliate Program",
    category: "Business Tools",
    commissionType: "Signup commission",
    commission: "Starts at 40% commission and grows by volume",
    audienceType: "Bloggers",
    audience: "Bloggers, website creators, entrepreneurs, and small businesses",
    bestFor: "Web hosting, domain setup, WordPress tutorials, online business, and beginner websites",
    payout: "Unknown",
    cookie: "Up to 30 days",
    platform: "Direct affiliate program",
    difficulty: "Beginner-friendly",
    rating: 4.6,
    tags: ["Hosting", "Websites", "High commission"],
    verified: true,
    premiumReason: "High-commission hosting affiliate opportunity",
  },
  {
    name: "A2 Hosting Affiliate Program",
    category: "Business Tools",
    commissionType: "Flat fee",
    commission: "Up to $125 per customer / source-found",
    audienceType: "Bloggers",
    audience: "Bloggers, web developers, hosting reviewers, and small business creators",
    bestFor: "Web hosting, WordPress hosting, ecommerce hosting, and website setup content",
    payout: "Unknown",
    cookie: "90 days",
    platform: "Post Affiliate Pro / Hosting.com affiliate program",
    difficulty: "Intermediate",
    rating: 4.4,
    tags: ["Hosting", "WordPress", "High payout"],
    verified: true,
    premiumReason: "High-payout hosting affiliate opportunity",
  },
  {
    name: "Tailwind Affiliate Program",
    category: "Creator Tools",
    commissionType: "Recurring",
    commission: "Up to 25% recurring affiliate commission",
    audienceType: "Creators",
    audience: "Bloggers, Pinterest creators, social media managers, and small businesses",
    bestFor: "Pinterest scheduling, Instagram planning, social media marketing, and creator workflows",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Direct affiliate program",
    difficulty: "Beginner-friendly",
    rating: 4.4,
    tags: ["Pinterest", "Social media", "Recurring"],
    verified: true,
    premiumReason: "Recurring social media scheduling affiliate opportunity",
  },
  {
    name: "Hootsuite Affiliate / Partner Program",
    category: "Creator Tools",
    commissionType: "Hybrid",
    commission: "Commission on qualifying Standard or Advanced plan referrals",
    audienceType: "Agencies",
    audience: "Agencies, social media managers, business creators, and marketers",
    bestFor: "Social media management, scheduling, analytics, agency marketing, and business content",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Hootsuite affiliate / partner program",
    difficulty: "Advanced",
    rating: 4.5,
    tags: ["Social media", "Agencies", "Management"],
    verified: true,
    premiumReason: "Social media management affiliate opportunity",
  },
  {
    name: "Monday.com Affiliate Program",
    category: "Business Tools",
    commissionType: "Signup commission",
    commission: "25% on first sale / source-found",
    audienceType: "Agencies",
    audience: "Business creators, productivity bloggers, agencies, and operations consultants",
    bestFor: "Project management, workflows, team collaboration, operations, and productivity content",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Direct / affiliate platform",
    difficulty: "Intermediate",
    rating: 4.6,
    tags: ["Project management", "Productivity", "SaaS"],
    verified: true,
    premiumReason: "High-value project management SaaS opportunity",
  },
  {
    name: "Asana Partner Program",
    category: "Business Tools",
    commissionType: "Hybrid",
    commission: "Commission on successful referral partner deals; exact rate needs confirmation",
    audienceType: "Agencies",
    audience: "Agencies, consultants, business creators, and productivity educators",
    bestFor: "Project management, team workflows, operations, collaboration, and productivity content",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Asana Referral Partner Program",
    difficulty: "Advanced",
    rating: 4.4,
    tags: ["Project management", "Productivity", "Partners"],
    verified: true,
    premiumReason: "Business productivity partner opportunity",
  },
  {
    name: "Gusto Partner / Affiliate Program",
    category: "Business Tools",
    commissionType: "Lead commission",
    commission: "$200+ per valid business customer sale",
    audienceType: "Agencies",
    audience: "Business creators, accountants, HR consultants, and small business publishers",
    bestFor: "Payroll, HR, benefits, small business operations, and accounting partner content",
    payout: "Unknown",
    cookie: "120 days",
    platform: "Direct affiliate program / PartnerStack",
    difficulty: "Advanced",
    rating: 4.6,
    tags: ["Payroll", "HR", "Business"],
    verified: true,
    premiumReason: "Governed payroll and HR affiliate opportunity; review finance/business compliance carefully",
  },
  {
    name: "Bench Partner Program",
    category: "Business Tools",
    commissionType: "Lead commission",
    commission: "Commission becomes due after qualifying customer payments; exact rate needs confirmation",
    audienceType: "Agencies",
    audience: "Business creators, accountants, finance bloggers, and startup publishers",
    bestFor: "Bookkeeping, small business finance, accounting, startups, and business operations",
    payout: "Unknown",
    cookie: "Unknown / confirm",
    platform: "Bench partner / affiliate terms",
    difficulty: "Advanced",
    rating: 4.4,
    tags: ["Bookkeeping", "Small business", "Finance"],
    verified: true,
    premiumReason: "Bookkeeping and small-business finance partner opportunity",
  },
];

const categories = ["All", ...Array.from(new Set(programs.map((program) => program.category)))];
const commissionTypes = ["All", ...Array.from(new Set(programs.map((program) => program.commissionType)))];
const audienceTypes = ["All", ...Array.from(new Set(programs.map((program) => program.audienceType)))];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function scrollToDirectory() {
  const section = document.getElementById("directory");
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openTallyForm() {
  window.open(TALLY_FORM_URL, "_blank", "noopener,noreferrer");
}

function LogoMark({ className = "h-10 w-10" }) {
  return (
    <img
      src={BRAND.iconLogo}
      alt="AvaraPath icon"
      className={cn("rounded-full object-contain", className)}
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Affiliate directory", href: "#directory" },
    { label: "For creators", href: "#for-creators" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={BRAND.headerLogo}
            alt="AvaraPath"
            className="h-9 w-auto object-contain sm:h-10"
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-blue-700">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button type="button" onClick={openTallyForm} className="text-sm font-bold text-slate-600 hover:text-blue-700">
            Join waitlist
          </button>
          <button
            type="button"
            onClick={openTallyForm}
            className="rounded-2xl bg-gradient-to-r from-[#071A3D] to-[#0B63F6] px-5 py-3 text-sm font-extrabold text-white shadow-md shadow-blue-950/10 transition hover:shadow-lg"
          >
            List your program
          </button>
        </div>

        <button
          type="button"
          className="rounded-xl border border-blue-100 p-2 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-blue-100 bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm font-bold text-slate-700">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openTallyForm();
              }}
              className="text-left"
            >
              Join waitlist
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openTallyForm();
              }}
              className="text-left"
            >
              List your program
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-white via-blue-50/60 to-slate-50">
      <img
        src={BRAND.iconLogo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-16 hidden w-[36rem] opacity-[0.05] lg:block"
      />
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="relative z-10 flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-extrabold text-blue-900 shadow-sm">
            <Sparkles className="h-4 w-4 text-blue-600" />
            {BRAND.slogan}
          </div>
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-[#071A3D] sm:text-6xl lg:text-7xl">
            Find the affiliate path built for your audience.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
            AvaraPath helps creators, publishers, and businesses discover affiliate programs by niche,
            commission type, audience fit, and growth potential.
          </p>

          <div className="mt-8 flex max-w-2xl flex-col gap-3 rounded-3xl border border-blue-100 bg-white p-3 shadow-xl shadow-blue-950/10 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
              <Search className="h-5 w-5 text-blue-700" />
              <span className="text-sm font-semibold text-slate-500 sm:text-base">
                Search by niche, product, brand, audience, or commission
              </span>
            </div>
            <button
              onClick={scrollToDirectory}
              className="rounded-2xl bg-gradient-to-r from-[#071A3D] to-[#0B63F6] px-6 py-4 font-extrabold text-white shadow-md shadow-blue-950/10 transition hover:shadow-lg"
            >
              Start exploring
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "Find high-commission programs",
              "Compare affiliate opportunities",
              "Scout better audience fits",
              "Build your partner path",
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center">
          <div className="relative w-full max-w-xl rounded-[2rem] border border-blue-100 bg-white/95 p-6 shadow-xl shadow-blue-950/10">
            <div className="absolute -right-4 -top-4 rounded-full bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-xl">
              35 import-ready
            </div>
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-blue-100 pb-5">
              <div>
                <p className="text-sm font-bold text-blue-700">Recommended match</p>
                <h2 className="text-2xl font-extrabold text-[#071A3D]">Creator fit score</h2>
              </div>
              <div className="rounded-2xl bg-[#071A3D] px-5 py-4 text-2xl font-extrabold text-white">94%</div>
            </div>

            <div className="space-y-4">
              {programs.slice(0, 3).map((program) => (
                <div key={program.name} className="rounded-3xl border border-blue-100 bg-slate-50/80 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-[#071A3D]">{program.name}</h3>
                        <BadgeCheck className="h-4 w-4 text-blue-700" />
                      </div>
                      <p className="mt-2 text-sm text-slate-700">{program.audience}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-extrabold text-slate-900">
                      <Star className="h-4 w-4 fill-slate-900" />
                      {program.rating}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {program.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-b border-slate-200 bg-white py-8">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[2rem] bg-slate-50 p-8 text-center shadow-sm">
            <p className="text-4xl font-black text-slate-950">{stat.value}</p>
            <p className="mt-2 font-semibold text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhatItDoes() {
  const items = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Discover affiliate programs",
      text: "Search real affiliate opportunities by niche, category, audience fit, and commission type.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Compare partner fit",
      text: "Use commission, cookie, platform, level, and audience notes to compare program quality faster.",
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: "Follow a clearer path",
      text: "AvaraPath keeps the process simple: find the program, understand the fit, then apply directly.",
    },
  ];

  return (
    <section id="for-creators" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">What AvaraPath does</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Affiliate discovery without the messy searching.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            AvaraPath is being built as a simple affiliate connection directory for creators, publishers,
            and businesses that want better partner discovery.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-blue-50/50 p-8 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white">
                {item.icon}
              </div>
              <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["01", "Search your niche", "Start with a topic, audience, brand, product type, or commission goal."],
    ["02", "Refine the fit", "Filter by category, commission type, audience type, cookie window, and level."],
    ["03", "Compare opportunities", "Review the program card to understand payout style, platform, and fit."],
    ["04", "Apply and grow", "Use the program link to apply directly through the partner or affiliate page."],
  ];

  return (
    <section id="how-it-works" className="border-y border-blue-100 bg-[#071A3D] py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-300">How it works</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              A simple path from niche to partner.
            </h2>
          </div>
          <p className="max-w-md text-slate-300">
            The directory is designed to help you scout programs quickly without pretending every program is right for every audience.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number, title, text]) => (
            <div key={number} className="rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-xl shadow-blue-950/20">
              <p className="text-sm font-black text-blue-300">{number}</p>
              <h3 className="mt-4 text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ program }) {
  const detailItems = [
    ["Commission", program.commission],
    ["Payout", program.payout],
    ["Cookie", program.cookie],
    ["Level", program.difficulty],
  ];

  return (
    <article className="flex h-full flex-col rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-800">
          <Building2 className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 text-sm font-extrabold text-slate-900">
          <Star className="h-4 w-4 fill-slate-900" />
          {program.rating}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-extrabold leading-tight text-[#071A3D]">{program.name}</h3>
          {program.verified && <BadgeCheck className="h-5 w-5 shrink-0 text-blue-700" />}
        </div>
        <p className="mt-2 text-sm font-extrabold text-blue-900">{program.category}</p>
        <p className="mt-4 min-h-[72px] leading-7 text-slate-700">{program.bestFor}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {detailItems.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-extrabold text-[#071A3D]">{label}</p>
            <p className="mt-1 text-sm leading-5 text-slate-700">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-800">Why it matters</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{program.premiumReason}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {program.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-bold text-slate-700">
            {tag}
          </span>
        ))}
      </div>

      <button className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#071A3D] to-[#0B63F6] px-5 py-4 font-extrabold text-white shadow-md shadow-blue-950/10 transition hover:shadow-lg">
        Scout this program
        <ArrowRight className="h-4 w-4" />
      </button>
    </article>
  );
}

function Directory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [commissionType, setCommissionType] = useState("All");
  const [audienceType, setAudienceType] = useState("All");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const filteredPrograms = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return programs.filter((program) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          program.name,
          program.category,
          program.commissionType,
          program.audienceType,
          program.audience,
          program.bestFor,
          program.platform,
          program.premiumReason,
          ...program.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      const matchesCategory = category === "All" || program.category === category;
      const matchesCommission = commissionType === "All" || program.commissionType === commissionType;
      const matchesAudience = audienceType === "All" || program.audienceType === audienceType;

      return matchesQuery && matchesCategory && matchesCommission && matchesAudience;
    });
  }, [query, category, commissionType, audienceType]);

  return (
    <section id="directory" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">Affiliate directory</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-[#071A3D] sm:text-5xl">
              Scout affiliate programs by niche, payout, and audience fit.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Built like a sourcing directory, but designed to help creators and businesses find affiliate connections that fit their audience.
            </p>
          </div>
          <button
            onClick={() => setShowAdvanced((value) => !value)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-100 px-5 py-4 font-extrabold text-[#071A3D] transition hover:bg-blue-50"
          >
            Refine path
            <Filter className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-slate-50 p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1fr_260px]">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
              <Search className="h-5 w-5 text-blue-700" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                placeholder="Search by niche, audience, product type, commission, or brand name"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
              <Filter className="h-5 w-5 text-blue-700" />
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full bg-transparent font-semibold text-slate-950 outline-none"
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </div>
          </div>

          {showAdvanced && (
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  Commission type
                </label>
                <select
                  value={commissionType}
                  onChange={(event) => setCommissionType(event.target.value)}
                  className="w-full bg-transparent font-semibold text-slate-950 outline-none"
                >
                  {commissionTypes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  Audience type
                </label>
                <select
                  value={audienceType}
                  onChange={(event) => setAudienceType(event.target.value)}
                  className="w-full bg-transparent font-semibold text-slate-950 outline-none"
                >
                  {audienceTypes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col justify-between gap-3 text-sm font-semibold text-slate-600 sm:flex-row sm:items-center">
          <p>
            Showing <span className="font-black text-slate-950">{filteredPrograms.length}</span> of {programs.length} import-ready programs.
          </p>
          <p>Tip: Start with a niche, then refine by commission type, audience fit, or product category.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPrograms.map((program) => (
            <ProgramCard key={program.name} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="bg-gradient-to-br from-[#071A3D] via-blue-950 to-[#071A3D] py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-300">Free vs Pro path</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Free discovery first. Premium intelligence later.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            AvaraPath is currently being built around a free directory plus future premium discovery tools for higher-value affiliate opportunities.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-black">Free Directory</h3>
            <p className="mt-3 text-slate-300">Broad affiliate discovery for creators and businesses.</p>
            <ul className="mt-6 space-y-3">
              {[
                "Search affiliate programs by niche",
                "View basic commission and category data",
                "Find direct application/source links",
                "Explore beginner-friendly opportunities",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-blue-300 bg-white p-8 text-slate-950 shadow-2xl shadow-blue-950/30">
            <div className="mb-4 inline-flex rounded-full bg-blue-700 px-4 py-2 text-sm font-black text-white">
              Coming soon
            </div>
            <h3 className="text-2xl font-black">AvaraPath Pro</h3>
            <p className="mt-3 text-slate-700">Premium filters, higher-value program notes, and scouting intelligence.</p>
            <ul className="mt-6 space-y-3">
              {[
                "High-commission and recurring program views",
                "Premium reason and opportunity notes",
                "Advanced comparison filters",
                "Member spotlight eligibility as the platform grows",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SubmitProgram() {
  return (
    <section id="submit-program" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[2.5rem] border border-slate-950 bg-gradient-to-br from-white to-blue-50 p-8 lg:grid-cols-[1fr_0.8fr] lg:p-12">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">For brands and programs</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
              Want your affiliate program listed?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
              AvaraPath is building a cleaner way for creators and businesses to discover affiliate connections. Brands and affiliate managers will eventually be able to submit programs for review.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-blue-950/10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-blue-700" />
              <h3 className="text-xl font-black text-slate-950">Review-based listing</h3>
            </div>
            <p className="mt-4 leading-7 text-slate-700">
              Programs should have clear application links, commission details, and rules before being marked fully public-ready.
            </p>
            <a
              href={TALLY_FORM_URL} target="_blank" rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 font-extrabold text-white transition hover:bg-blue-700"
            >
              Join launch updates
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Waitlist() {
  return (
    <section id="waitlist" className="border-y border-slate-200 bg-slate-50 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <img src={BRAND.simpleLogo} alt="AvaraPath" className="mx-auto mb-8 h-28 w-auto object-contain" />
        <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">Early access</p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Get early AvaraPath updates.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-700">
          Follow the build as the affiliate directory grows from curated data into a full discovery platform for affiliate connections.
        </p>
        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-[2rem] border border-slate-950 bg-white p-3 shadow-xl sm:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
            <Mail className="h-5 w-5 text-blue-700" />
            <input className="w-full bg-transparent outline-none" placeholder="Enter your email" />
          </div>
          <button className="rounded-2xl bg-slate-950 px-6 py-4 font-extrabold text-white transition hover:bg-blue-700">
            Join waitlist
          </button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["New programs", "Get updates as better affiliate opportunities are added."],
            ["Better scouting", "Follow improvements to filters, categories, and program notes."],
            ["Early access", "Be first in line as AvaraPath Pro takes shape."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl bg-white p-5 text-left shadow-sm">
              <h3 className="font-black text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const questions = [
    [
      "Is AvaraPath an affiliate network?",
      "No. The current MVP is a directory and discovery tool. Users apply directly through the affiliate or partner program pages.",
    ],
    [
      "Are all programs fully verified?",
      "The database currently separates link-verified, partially verified, and future fully verified rows. The site should be treated as discovery, not legal or financial advice.",
    ],
    [
      "What will paid members get?",
      "The planned paid value is premium discovery intelligence: higher-commission programs, recurring programs, better filters, comparison notes, and member visibility opportunities.",
    ],
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">FAQ</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950">Questions before launch</h2>
        </div>
        <div className="space-y-4">
          {questions.map(([question, answer]) => (
            <div key={question} className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-black text-slate-950">{question}</h3>
              <p className="mt-3 leading-7 text-slate-700">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustNote() {
  return (
    <section className="bg-[#071A3D] py-14 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <div>
          <h2 className="text-2xl font-black">Trust note</h2>
          <p className="mt-2 max-w-4xl leading-7 text-slate-300">
            AvaraPath is being built as a discovery directory. Commission details, cookie windows, restrictions, and eligibility can change. Always review each program’s official terms before applying or promoting.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="flex items-center gap-3">
          <LogoMark className="h-12 w-12" />
          <div>
            <p className="text-xl font-black text-slate-950">{BRAND.name}</p>
            <p className="text-sm font-semibold text-slate-600">{BRAND.slogan}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 text-sm font-bold text-slate-600">
          <a href="#how-it-works" className="hover:text-blue-700">How it works</a>
          <a href="#directory" className="hover:text-blue-700">Directory</a>
          <a href={TALLY_FORM_URL} target="_blank" rel="noreferrer" className="hover:text-blue-700">List a program</a>
          <a href={TALLY_FORM_URL} target="_blank" rel="noreferrer" className="hover:text-blue-700">Waitlist</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-white font-sans text-[#071A3D]">
      <Header />
      <Hero />
      <Stats />
      <WhatItDoes />
      <HowItWorks />
      <Directory />
      <Pricing />
      <SubmitProgram />
      <Waitlist />
      <FAQ />
      <TrustNote />
      <Footer />
    </main>
  );
}
