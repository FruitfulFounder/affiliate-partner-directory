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




function LogoMark({ className = "h-10 w-10" }) {
  return (
    <img
      src={BRAND.iconLogo}
      alt="AvaraPath icon"
      className={cn("rounded-full object-contain", className)}
    />
  );
}

const MEMBER_PREVIEW_PROGRAMS = new Set([
  "Kit Affiliate Program",
  "Coursera Affiliate Program",
  "HubSpot Affiliate Program",
  "Leadpages Affiliate Program",
  "Kinsta Affiliate Program",
  "Hostinger Affiliate Program",
]);

function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Directory", href: "#directory" },
    { label: "Membership", href: "#pricing" },
    { label: "For brands", href: "#submit-program" },
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
          <a href={TALLY_FORM_URL} className="text-sm font-bold text-slate-600 hover:text-blue-700">
            Get free updates
          </a>
          <a
            href={TALLY_FORM_URL}
            className="rounded-2xl bg-gradient-to-r from-[#071A3D] to-[#0B63F6] px-5 py-3 text-sm font-extrabold text-white shadow-md shadow-blue-950/10 transition hover:shadow-lg"
          >
            List your program
          </a>
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
            <a href={TALLY_FORM_URL} onClick={() => setOpen(false)}>
              Get free updates
            </a>
            <a href={TALLY_FORM_URL} onClick={() => setOpen(false)}>
              List your program
            </a>
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
            Find better affiliate paths for your audience.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl">
            AvaraPath helps creators, publishers, and businesses explore public affiliate programs for free, then upgrade for premium opportunity discovery, niche paths, and strategy-focused program notes.
          </p>

          <div className="mt-8 flex max-w-2xl flex-col gap-3 rounded-3xl border border-blue-100 bg-white p-3 shadow-xl shadow-blue-950/10 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
              <Search className="h-5 w-5 text-blue-700" />
              <span className="text-sm font-semibold text-slate-500 sm:text-base">
                Search public opportunities by niche, audience, brand, or commission
              </span>
            </div>
            <button
              onClick={scrollToDirectory}
              className="rounded-2xl bg-gradient-to-r from-[#071A3D] to-[#0B63F6] px-6 py-4 font-extrabold text-white shadow-md shadow-blue-950/10 transition hover:shadow-lg"
            >
              Explore free directory
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "Free public directory",
              "Member previews",
              "Premium opportunity drops",
              "Niche-specific affiliate paths",
            ].map((chip) => (
              <span key={chip} className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-red-500/30 bg-gradient-to-br from-[#020617] via-[#071A3D] to-[#111827] p-6 text-white shadow-2xl shadow-blue-950/30">
            <img
              src={BRAND.iconLogo}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -right-14 -top-16 h-64 w-64 opacity-[0.08]"
            />
            <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-red-600 via-blue-500 to-red-500" />
            <div className="absolute -right-4 -top-4 rounded-full bg-gradient-to-r from-red-600 to-blue-700 px-5 py-3 text-sm font-extrabold text-white shadow-xl">
              Membership preview
            </div>
            <div className="relative mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-sm font-bold text-red-300">AvaraPath Membership</p>
                <h2 className="text-2xl font-extrabold">Opportunity intelligence</h2>
              </div>
              <div className="rounded-2xl bg-white px-5 py-4 text-2xl font-extrabold text-[#071A3D]">$49</div>
            </div>

            <div className="relative space-y-4">
              {[
                ["Free Directory", "Browse a useful public sample and learn the AvaraPath system."],
                ["Member previews", "Spot higher-value examples that point toward the paid membership."],
                ["AvaraPath Membership", "Unlock premium opportunity drops, niche paths, strategy notes, and ongoing updates."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-red-300" />
                    <h3 className="font-extrabold">{title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
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
      title: "Explore basic opportunities free",
      text: "Browse a public sample of affiliate programs and learn which niches, categories, and commission types exist.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Spot higher-value paths",
      text: "Member previews show the kind of stronger opportunities paid members can find more consistently.",
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: "Upgrade for ongoing direction",
      text: "Membership is designed around premium drops, niche paths, program notes, promotion angles, and updates over time.",
    },
  ];

  return (
    <section id="for-creators" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">What AvaraPath does</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            A free starting point with a premium path forward.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            AvaraPath is being shaped into an affiliate opportunity growth system. The public directory helps anyone begin, while membership is built for people who want better opportunities and clearer next steps.
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
    ["01", "Search free opportunities", "Anyone can use the public directory to explore basic affiliate programs by niche, category, and audience fit."],
    ["02", "Notice member previews", "A few stronger examples show the kind of higher-value opportunities members can discover more consistently."],
    ["03", "Join for premium access", "Membership is built around opportunity drops, niche-specific paths, program updates, and strategy notes."],
    ["04", "Apply with better direction", "Use recommendations, caution notes, and promotion angles to decide which programs to pursue first."],
  ];

  return (
    <section id="how-it-works" className="border-y border-blue-100 bg-[#071A3D] py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-300">How it works</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Search basic opportunities free. Join to unlock premium affiliate paths.
            </h2>
          </div>
          <p className="max-w-md text-slate-300">
            Free users get a useful starting point. Members get deeper opportunity discovery, strategy notes, and ongoing updates designed to help them keep finding better partner paths over time.
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
  const isMemberPreview = MEMBER_PREVIEW_PROGRAMS.has(program.name);
  const detailItems = [
    ["Commission", program.commission],
    ["Payout", program.payout],
    ["Cookie", program.cookie],
    ["Level", program.difficulty],
  ];

  const cardClass = isMemberPreview
    ? "group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-red-500/60 bg-gradient-to-br from-[#020617] via-[#071A3D] to-[#111827] p-6 text-white shadow-xl shadow-red-950/20 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-950/30"
    : "flex h-full flex-col rounded-3xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10";

  const body = (
    <article className={cardClass}>
      {isMemberPreview && (
        <>
          <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-red-500/20 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-red-600 via-blue-500 to-red-500" />
        </>
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", isMemberPreview ? "bg-white/10 text-red-300" : "bg-blue-50 text-blue-800")}>
          <Building2 className="h-6 w-6" />
        </div>
        {isMemberPreview && (
          <div className="rounded-full bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white">
            Member preview
          </div>
        )}
      </div>

      <div className="relative mt-6">
        <div className="flex items-center gap-2">
          <h3 className={cn("text-xl font-extrabold leading-tight", isMemberPreview ? "text-white" : "text-[#071A3D]")}>{program.name}</h3>
          {program.verified && <BadgeCheck className={cn("h-5 w-5 shrink-0", isMemberPreview ? "text-red-300" : "text-blue-700")} />}
        </div>
        <p className={cn("mt-2 text-sm font-extrabold", isMemberPreview ? "text-red-300" : "text-blue-900")}>{program.category}</p>
        <p className={cn("mt-4 min-h-[72px] leading-7", isMemberPreview ? "text-slate-300" : "text-slate-700")}>{program.bestFor}</p>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-3">
        {detailItems.map(([label, value]) => (
          <div key={label} className={cn("rounded-2xl p-4", isMemberPreview ? "bg-white/10" : "bg-slate-50")}>
            <p className={cn("text-sm font-extrabold", isMemberPreview ? "text-white" : "text-[#071A3D]")}>{label}</p>
            <p className={cn("mt-1 text-sm leading-5", isMemberPreview ? "text-slate-300" : "text-slate-700")}>{value}</p>
          </div>
        ))}
      </div>

      <div className={cn("relative mt-4 rounded-2xl p-4", isMemberPreview ? "border border-red-500/30 bg-white/10" : "border border-blue-100 bg-blue-50/60")}>
        <p className={cn("text-xs font-extrabold uppercase tracking-[0.18em]", isMemberPreview ? "text-red-300" : "text-blue-800")}>Why it matters</p>
        <p className={cn("mt-2 text-sm leading-6", isMemberPreview ? "text-slate-300" : "text-slate-700")}>{program.premiumReason}</p>
        {isMemberPreview && (
          <p className="mt-3 text-sm font-bold leading-6 text-white">
            Members get more opportunities like this, plus niche paths, promotion angles, caution notes, and ongoing opportunity drops.
          </p>
        )}
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2">
        {program.tags.map((tag) => (
          <span key={tag} className={cn("rounded-full px-3 py-1 text-xs font-bold", isMemberPreview ? "border border-white/10 bg-white/10 text-slate-200" : "border border-blue-100 bg-white text-slate-700")}>
            {tag}
          </span>
        ))}
      </div>

      {isMemberPreview && (
        <div className="relative mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-blue-700 px-5 py-4 font-extrabold text-white shadow-md shadow-red-950/20 transition group-hover:shadow-lg">
          Join to view more like this
          <ArrowRight className="h-4 w-4" />
        </div>
      )}
    </article>
  );

  if (isMemberPreview) {
    return (
      <a href={TALLY_FORM_URL} target="_blank" rel="noreferrer" className="block h-full" aria-label={`Join AvaraPath Membership to view more opportunities like ${program.name}`}>
        {body}
      </a>
    );
  }

  return body;
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

  const memberPreviewCount = filteredPrograms.filter((program) => MEMBER_PREVIEW_PROGRAMS.has(program.name)).length;

  return (
    <section id="directory" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-700">Free directory</p>
            <h2 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-[#071A3D] sm:text-5xl">
              Browse public affiliate opportunities and spot member previews.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              The public directory is a useful starting point. Basic listings stay clean and free, while occasional member previews show the stronger opportunities AvaraPath Membership is being built to unlock more consistently.
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
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full bg-transparent font-semibold text-slate-950 outline-none">
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
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">Commission type</label>
                <select value={commissionType} onChange={(event) => setCommissionType(event.target.value)} className="w-full bg-transparent font-semibold text-slate-950 outline-none">
                  {commissionTypes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">Audience type</label>
                <select value={audienceType} onChange={(event) => setAudienceType(event.target.value)} className="w-full bg-transparent font-semibold text-slate-950 outline-none">
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
            Showing <span className="font-black text-slate-950">{filteredPrograms.length}</span> public listings, including <span className="font-black text-slate-950">{memberPreviewCount}</span> member previews.
          </p>
          <p>Basic cards are free to browse. Member previews point toward the premium membership experience.</p>
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
    <section id="pricing" className="bg-gradient-to-br from-[#020617] via-[#071A3D] to-[#111827] py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-red-300">AvaraPath Membership</p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Free discovery to start. Premium opportunity intelligence when you are ready.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            AvaraPath is moving away from a static paid list. The goal is a membership built around ongoing opportunity drops, higher-value program discovery, niche-specific paths, program updates, and strategy-focused notes.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">Free</p>
            <h3 className="mt-3 text-2xl font-black">Free Directory</h3>
            <p className="mt-3 text-4xl font-black">$0</p>
            <p className="mt-3 text-slate-300">For anyone who wants to explore public affiliate opportunities and learn how AvaraPath works.</p>
            <ul className="mt-6 space-y-3">
              {[
                "Public affiliate directory access",
                "Basic search and filters",
                "Mostly lower-commission and beginner-friendly examples",
                "Occasional member previews",
                "Basic commission, cookie, and platform notes",
                "Free updates and program submission form",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
                  {item}
                </li>
              ))}
            </ul>
            <a href={TALLY_FORM_URL} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 px-5 py-4 font-extrabold text-white transition hover:bg-white/10">
              Get free updates
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border-2 border-red-500/60 bg-gradient-to-br from-[#020617] via-[#071A3D] to-[#111827] p-8 shadow-2xl shadow-red-950/20">
            <img src={BRAND.iconLogo} alt="" aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-[0.08]" />
            <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-red-600 via-blue-500 to-red-500" />
            <p className="relative text-sm font-black uppercase tracking-[0.2em] text-red-300">Paid membership</p>
            <h3 className="relative mt-3 text-3xl font-black">AvaraPath Membership</h3>
            <p className="relative mt-3 text-5xl font-black">$49/mo</p>
            <p className="relative mt-3 max-w-2xl text-slate-300">
              For creators, publishers, side hustlers, agencies, and small businesses who want ongoing affiliate opportunity discovery instead of a one-time list.
            </p>

            <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Premium opportunity drops",
                "Higher-commission programs",
                "Recurring commission programs",
                "High-ticket opportunities",
                "Niche-specific affiliate paths",
                "Best-fit program recommendations",
                "Program priority notes",
                "Promotion angle notes",
                "Caution and compliance notes",
                "Member research request consideration",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
                  <span className="text-sm font-semibold leading-6">{item}</span>
                </div>
              ))}
            </div>

            <a href={TALLY_FORM_URL} className="relative mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-blue-700 px-5 py-4 font-extrabold text-white shadow-md shadow-red-950/20 transition hover:shadow-lg">
              Join membership waitlist
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="relative mt-5 text-sm leading-6 text-slate-400">
              Payment links are prepared but not public yet. AvaraPath does not guarantee affiliate approval, earnings, commissions, or business results.
            </p>
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
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950">Want your affiliate program reviewed?</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
              AvaraPath is building a cleaner way for creators and businesses to discover affiliate connections. Brands and affiliate managers can submit programs for future review and listing consideration.
            </p>
          </div>
          <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-blue-950/10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-blue-700" />
              <h3 className="text-xl font-black text-slate-950">Review-based listing</h3>
            </div>
            <p className="mt-4 leading-7 text-slate-700">Programs should have clear application links, commission details, restrictions, and rules before being treated as public-ready.</p>
            <a href={TALLY_FORM_URL} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 font-extrabold text-white transition hover:bg-blue-700">
              Submit or contact AvaraPath
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
        <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Get AvaraPath updates.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-700">
          Follow the build as AvaraPath grows from a public directory into a membership built around affiliate opportunity discovery, niche-specific paths, and ongoing program intelligence.
        </p>
        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-[2rem] border border-slate-950 bg-white p-3 shadow-xl sm:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4">
            <Mail className="h-5 w-5 text-blue-700" />
            <input className="w-full bg-transparent outline-none" placeholder="Enter your email" />
          </div>
          <a href={TALLY_FORM_URL} className="rounded-2xl bg-gradient-to-r from-[#071A3D] to-[#0B63F6] px-6 py-4 text-center font-extrabold text-white shadow-md shadow-blue-950/10 transition hover:shadow-lg">
            Join update list
          </a>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["New opportunities", "Get updates as better affiliate opportunities are added or reviewed."],
            ["Membership build", "Follow new premium features, niche paths, and program intelligence."],
            ["Early access", "Be first in line as AvaraPath Membership takes shape."],
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
    ["Is AvaraPath an affiliate network?", "No. AvaraPath is a discovery and research directory. Users apply directly through the affiliate or partner program pages."],
    ["What is free?", "The free directory gives visitors a public starting point with basic affiliate opportunities, filters, and occasional member previews."],
    ["What will paid members get?", "AvaraPath Membership is being shaped around ongoing opportunity discovery: premium drops, higher-commission and recurring programs, niche-specific paths, strategy notes, caution notes, and member request consideration."],
    ["Are results guaranteed?", "No. AvaraPath does not guarantee affiliate approval, earnings, commissions, traffic, sales, or business results. Always review official program terms before applying or promoting."],
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

function LegalSections() {
  return (
    <section id="legal" className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-blue-700">Trust & transparency</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#071A3D] sm:text-5xl">Basic policies for early access.</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
            These MVP policies explain how AvaraPath handles early access inquiries, affiliate program information, and directory content while the platform is still being built.
          </p>
        </div>

        <div className="space-y-6">
          <div id="privacy" className="rounded-3xl border border-blue-100 bg-slate-50 p-8">
            <h3 className="text-2xl font-extrabold text-[#071A3D]">Privacy Policy</h3>
            <div className="mt-4 space-y-4 leading-7 text-slate-700">
              <p>AvaraPath may collect information submitted through early access and inquiry forms, including your name, email address, website or social link, inquiry type, and message.</p>
              <p>This information is used to respond to inquiries, manage early access interest, review affiliate program submissions, improve the directory, and understand what visitors are looking for.</p>
              <p>AvaraPath does not sell personal information. Form submissions may be processed through third-party tools such as Tally, and the website may be hosted or delivered through third-party services such as Vercel.</p>
              <p>
                If you submit information and later want it removed, you may request removal by contacting AvaraPath at{" "}
                <a href="mailto:contact@avarapath.com" className="font-bold text-blue-700 hover:underline">contact@avarapath.com</a>.
              </p>
            </div>
          </div>

          <div id="terms" className="rounded-3xl border border-blue-100 bg-slate-50 p-8">
            <h3 className="text-2xl font-extrabold text-[#071A3D]">Terms / Disclaimer</h3>
            <div className="mt-4 space-y-4 leading-7 text-slate-700">
              <p>AvaraPath is an affiliate program discovery directory. The information shown on this site is provided for research and discovery purposes only.</p>
              <p>Affiliate program details, commission rates, cookie windows, approval requirements, restrictions, and availability can change at any time. Visitors should always review each program’s official terms before applying, promoting, or relying on any information.</p>
              <p>AvaraPath does not guarantee affiliate approval, earnings, commissions, traffic, sales, program availability, or business results.</p>
              <p>Nothing on this site should be treated as financial, legal, tax, or business advice.</p>
            </div>
          </div>

          <div id="affiliate-disclosure" className="rounded-3xl border border-blue-100 bg-slate-50 p-8">
            <h3 className="text-2xl font-extrabold text-[#071A3D]">Affiliate Disclosure</h3>
            <div className="mt-4 space-y-4 leading-7 text-slate-700">
              <p>AvaraPath may eventually earn referral fees, affiliate commissions, sponsorship revenue, paid placement fees, or other compensation from some programs, brands, or partners listed or discussed on the site.</p>
              <p>Listings may include affiliate or partner relationships in the future. The goal of the directory is to organize useful affiliate program information and help visitors discover opportunities that may fit their audience.</p>
              <p>Visitors should always review official program pages and terms before joining or promoting any affiliate program.</p>
            </div>
          </div>
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
          <p className="mt-2 max-w-4xl leading-7 text-slate-300">AvaraPath is being built as a discovery directory and membership concept. Commission details, cookie windows, restrictions, and eligibility can change. Always review each program’s official terms before applying or promoting.</p>
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
            <a href="mailto:contact@avarapath.com" className="mt-1 block text-sm font-semibold text-blue-700 hover:underline">contact@avarapath.com</a>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 text-sm font-bold text-slate-600">
          <a href="#how-it-works" className="hover:text-blue-700">How it works</a>
          <a href="#directory" className="hover:text-blue-700">Directory</a>
          <a href="#pricing" className="hover:text-blue-700">Membership</a>
          <a href="#privacy" className="hover:text-blue-700">Privacy</a>
          <a href="#terms" className="hover:text-blue-700">Terms</a>
          <a href="#affiliate-disclosure" className="hover:text-blue-700">Affiliate Disclosure</a>
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
      <LegalSections />
      <TrustNote />
      <Footer />
    </main>
  );
}
