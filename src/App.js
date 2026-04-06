import React, { useState } from 'react';

// Colors: Blue #7EB3FF (primary), Rose #A3244A (deeper, not salmon), #111 text
// Logo: friend's design - blue square with dual-tone checkmark
// Talia: neutral civic expert renamed and personified with avatar
// Issue cards: solid blue selected state (not white/disappearing)
// Policy cards: visible borders always
// All text: darker and more legible

const policies = [
  {
    id: 1,
    title: "Rent Control Removed for New Units",
    year: "2018",
    tag: "Housing",
    issueKey: "housing",
    plain: "Ontario removed rent control on any unit first occupied after November 15, 2018. Landlords of newer units can now raise rent by any amount between tenancies. Units built before that date still have annual rent increase guidelines (2.5% in 2024).",
    getImpact: (a) => {
      if (a.housing === 'Homeowner') return "As a homeowner this doesn't affect your housing costs directly. But it has driven up property values as rental properties in newer buildings became more profitable investments for landlords.";
      if (a.housing === 'Living with family') return "When you move out and rent independently, check carefully whether your unit was built after November 2018. If it was, your landlord can raise rent by any amount between tenancies - no legal cap at all.";
      if (a.housing === 'Looking to buy') return "The removal of rent control on new units made rental properties more profitable, which contributed to higher real estate prices overall - making it harder to enter the housing market in Ontario.";
      return "This directly affects you. If your unit was first occupied after November 15, 2018 your landlord can raise rent by any amount between tenancies - there is no legal limit. Always check your unit's build date. Pre-2018 units are protected by the 2.5% annual guideline.";
    },
    link: "https://www.ontario.ca/page/renting-ontario-your-rights",
    linkLabel: "Know your tenant rights",
    source: "Ontario Residential Tenancies Act"
  },
  {
    id: 2,
    title: "OSAP Grant Cuts - 85% to 25%",
    year: "2026",
    tag: "Education",
    issueKey: "education",
    plain: "On February 12, 2026, the Ford government announced the most dramatic OSAP change in the program's history. Starting Fall 2026, OSAP grants drop from a maximum of 85% of your aid to just 25%. The rest - at least 75% - becomes loans you have to repay. The 7-year tuition freeze also ends, with tuition rising up to 2% per year.",
    getImpact: (a) => {
      if (a.student === 'Not a student') return "If you ever plan to go to college or university in Ontario, this change hits you hard. Starting Fall 2026, what used to be mostly free grant money becomes mostly loans. A student who previously got $17,000 in free grants from a $20,000 OSAP package will now only get $5,000 in grants - and owe $15,000 in loans.";
      if (a.student === 'In high school') return "This is probably the most important policy change for your future. When you start university or college this fall or next year, you'll face a completely different OSAP system. A $20,000 aid package that used to give $17,000 in free grants now gives only $5,000 - you'll graduate with significantly more debt than students who started even one year earlier.";
      if ((a.student === 'College/university' || a.student === 'Yes, college/university') && a.income === 'Under $40k') return "If you're returning in Fall 2026, your OSAP package will look very different. What used to be up to 85% free grant money becomes mostly repayable loans. Lower-income students pay several thousand dollars more while wealthier families barely notice the difference.";
      if (a.student === 'College/university' || a.student === 'Yes, college/university') return "Starting Fall 2026, at least 75% of your provincial OSAP funding becomes loans instead of grants. If you're mid-degree, the changes apply when you re-apply for OSAP. The average Ontario bachelor's grad already carries $30,800 in debt - this change will push that number significantly higher.";
      if (a.student === 'Recently graduated') return "You got out just in time. Students starting Fall 2026 face a dramatically worse OSAP system - grants dropping from 85% to 25% of aid. Your debt load would have been significantly higher under these new rules, especially combined with tuition rising up to 2% per year.";
      return "Ontario's OSAP overhaul starting Fall 2026 shifts the financial burden of post-secondary education heavily onto students. Grants drop from 85% to 25% of aid, turning what was mostly free money into mostly debt.";
    },
    link: "https://www.ontario.ca/page/learn-about-osap",
    linkLabel: "Learn more about OSAP",
    source: "CBC News, Feb 12 2026 / Ontario Ministry of Colleges and Universities"
  },
  {
    id: 3,
    title: "OHIP+ Changes - Free Prescriptions",
    year: "2019",
    tag: "Healthcare",
    issueKey: "healthcare",
    plain: "When OHIP+ launched in 2018 it gave free prescriptions to everyone under 25. In 2019 the Ford government changed it so that if you have any private insurance you must use that first. OHIP+ only covers what private insurance doesn't pay.",
    getImpact: (a) => {
      if (a.student === 'College/university' || a.student === 'Yes, college/university') return "If you're on a parent's benefits plan or your school's health plan, OHIP+ no longer covers you first - your private insurance does. Private plans often have co-pays and deductibles, so you're not getting fully free prescriptions anymore even though OHIP+ technically still exists for under-25s.";
      if (a.student === 'In high school') return "If you're under 25 and not covered by a private plan, OHIP+ still covers your prescriptions for free - you just need your health card. But if you're on a parent's work benefits plan, their private insurance goes first and OHIP+ only fills the gaps.";
      if (a.student === 'Recently graduated') return "If you just aged off a parent's benefits and don't have employer coverage yet, OHIP+ may still help if you're under 25. After 25 you're fully on your own for prescription costs unless your employer offers benefits.";
      if (a.income === 'Under $40k') return "If you don't have private insurance through work or a parent, OHIP+ still covers your prescriptions for free if you're under 25. But if you have any private coverage at all, that goes first and OHIP+ only fills the gaps.";
      return "The 2019 changes mean OHIP+ acts as a secondary payer for anyone with private insurance. If you're under 25 and have benefits through school or a parent's plan, your prescriptions aren't fully free - you pay whatever your private plan doesn't cover.";
    },
    link: "https://www.ontario.ca/page/learn-about-ohip-plus",
    linkLabel: "Check OHIP+ eligibility",
    source: "Ontario Ministry of Health"
  },
  {
    id: 4,
    title: "Ontario Minimum Wage Increases",
    year: "2022-2024",
    tag: "Jobs & Economy",
    issueKey: "jobs",
    plain: "Ontario's minimum wage rose from $15/hr in 2022 to $17.20/hr in October 2024 - a 14.7% increase over two years. However the living wage in the GTA is estimated at $23-25/hr, meaning full-time minimum wage workers still face a major gap.",
    getImpact: (a) => {
      if (a.employment === 'Looking for work') return "Ontario's minimum wage is now $17.20/hr, up from $15 in 2022. But the bigger picture for job seekers is that the GTA living wage is $23-25/hr - meaning even a full-time minimum wage job won't cover rent, food, and transit in most of the city.";
      if (a.student === 'In high school') return "Most first jobs for high schoolers pay at or near minimum wage. At $17.20/hr you're making more than students did in 2022 ($15/hr), but the GTA living wage is estimated at $23-25/hr - meaning even full-time minimum wage isn't enough to live independently in most of Ontario.";
      if (a.student === 'College/university' || a.student === 'Yes, college/university') return "Most student part-time jobs pay at or near minimum wage. At $17.20/hr working 20 hours a week you're making about $17,900/year - around $2,600 more than in 2022. Still well below the $23-25/hr living wage in the GTA though.";
      if (a.employment === 'Employed part-time' || a.income === 'Under $40k') return "If you're earning near minimum wage, the jump to $17.20/hr means roughly $4,000/year more than 2022 rates at full-time hours. But Ontario inflation over the same period eroded much of that gain - groceries, rent, and transit all went up significantly too.";
      return "At your income level minimum wage increases don't affect your earnings directly. But Ontario's minimum wage is still significantly below the estimated living wage of $23-25/hr in the GTA.";
    },
    link: "https://www.ontario.ca/document/your-guide-employment-standards-act-0/minimum-wage",
    linkLabel: "Ontario minimum wage info",
    source: "Ontario Ministry of Labour"
  },
  {
    id: 5,
    title: "Federal Carbon Tax - Introduced then Cancelled",
    year: "2019-2025",
    tag: "Climate",
    issueKey: "climate",
    plain: "Canada introduced a federal carbon tax in 2019 at $20/tonne, rising to $80/tonne by 2024. Ontario residents received quarterly rebates - around $560/year for individuals. In March 2025, the Carney government cancelled the consumer carbon tax entirely, ending both the tax and the rebates.",
    getImpact: (a) => {
      if (a.income === 'Under $40k') return "When the carbon tax existed, you were likely getting more back in rebates ($560/year in Ontario) than you paid in extra costs - 8 in 10 lower-income Canadians came out ahead. Since Carney cancelled it in March 2025, you no longer get the rebate, but gas is slightly cheaper.";
      if (a.housing === 'Renting') return "As a renter you probably don't pay directly for home heating fuel, so the carbon tax's cost impact on you was relatively low. The $560/year Ontario rebate was essentially free money while it lasted. Now that it's been cancelled (March 2025), both the tax and the rebate are gone.";
      if (a.student === 'In high school' || a.student === 'College/university' || a.student === 'Yes, college/university') return "As a student, the carbon tax rebate ($560/year in Ontario) was likely more than you paid in extra costs. With its cancellation in March 2025, both the rebate and the tax are gone. The bigger question is what replaces it for climate action.";
      return "Ontario individuals received ~$560/year in carbon rebates before cancellation in March 2025. The policy debate now shifts to what replaces the carbon tax as Canada's main climate tool.";
    },
    link: "https://www.canada.ca/en/environment-climate-change/services/climate-change/pricing-pollution-how-it-will-work.html",
    linkLabel: "Learn about Canadian climate policy",
    source: "Environment and Climate Change Canada / Canada Revenue Agency"
  },
  {
    id: 6,
    title: "Bank of Canada Interest Rate Hikes",
    year: "2022-2023",
    tag: "Cost of Living",
    issueKey: "costoflife",
    plain: "To fight inflation that hit a 40-year high of 8.1% in 2022, the Bank of Canada raised interest rates 10 times - from 0.25% to 5% between March 2022 and July 2023. This made mortgages, car loans, and lines of credit significantly more expensive for millions of Canadians.",
    getImpact: (a) => {
      if (a.housing === 'Renting') return "Higher interest rates made it harder for people to buy homes, pushing more people into the rental market and driving up rent prices. If your rent increased significantly after 2022, this is part of why. Vacancy rates in Ontario hit 1.5% in late 2023 - one of the lowest ever recorded.";
      if (a.housing === 'Looking to buy') return "This directly affects your home-buying plans. In 2020-2021, you could get a mortgage at under 2%. By 2023 rates were over 6%. On a $500,000 mortgage, that's roughly $1,200 more per month. Many first-time buyers were priced out entirely during this period.";
      if (a.housing === 'Homeowner') return "If you renewed your mortgage after 2022, you likely saw a significant payment increase. Median mortgage payments for variable-rate holders were up 70% by late 2023. About 45% of all Ontario mortgage holders will face renewal shock by end of 2026.";
      if (a.income === 'Under $40k') return "Higher interest rates increased the cost of any debt you carry - credit cards, car loans, student lines of credit. It also made buying a home essentially impossible for most people in your income range.";
      return "Interest rate hikes made borrowing more expensive across the board. Rates have since dropped back to 2.25% (March 2026) but mortgage renewal shock is still hitting thousands of Ontarians.";
    },
    link: "https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/",
    linkLabel: "Bank of Canada rate history",
    source: "Bank of Canada / CMHC / Angus Reid Institute"
  },
  {
    id: 7,
    title: "US Tariffs on Canadian Steel, Aluminum and Autos",
    year: "2025",
    tag: "Canada-US Relations",
    issueKey: "canadaus",
    plain: "In March 2025, the US imposed 25% tariffs on Canadian steel, aluminum, and automobiles. Ontario's manufacturing sector - which sends 40% of its output to the US - was hit hardest. Ontario's Financial Accountability Office projects 119,200 fewer jobs in Ontario by 2026 compared to a no-tariff scenario.",
    getImpact: (a) => {
      if (a.employment === 'Looking for work') return "The timing couldn't be worse. US tariffs are projected to cost Ontario 119,200 jobs by 2026 according to the Financial Accountability Office. Manufacturing, auto, and trades jobs - historically strong options for job seekers - are among the most at risk.";
      if (a.student === 'In high school') return "By the time you enter the job market, Ontario's economy could look very different. The FAO projects 119,200 fewer jobs in Ontario by 2026 due to US tariffs. Manufacturing, auto, and steel jobs - traditionally strong entry-level options - are among the most affected sectors.";
      if (a.student === 'College/university' || a.student === 'Yes, college/university' || a.student === 'Recently graduated') return "If you're studying in or entering fields connected to manufacturing, engineering, or trade, the tariff situation directly affects your job prospects. Ontario's auto and steel industries are projected to see significant output declines.";
      if (a.income === 'Under $40k') return "Lower-income workers are disproportionately represented in the manufacturing and trades jobs most at risk from tariffs. The FAO projects Ontario's manufacturing GDP could drop 8% in 2026.";
      return "Even if your job isn't directly in manufacturing, the tariff situation affects Ontario's broader economy - slower growth, potential recession, and higher prices for goods. Ontario's GDP is projected to be 1.8% lower than it would have been without tariffs by 2026.";
    },
    link: "https://fao-on.org/en/report/impacts-of-us-tariffs/",
    linkLabel: "Read the FAO tariff impact report",
    source: "Ontario Financial Accountability Office, April 2025"
  },
  {
    id: 8,
    title: "Bill C-27 - Your Digital Privacy Rights",
    year: "2022-present",
    tag: "Privacy & Tech",
    issueKey: "privacy",
    plain: "Bill C-27 (the Digital Charter Implementation Act) is Canada's proposed update to privacy law for the internet age. It would give Canadians the right to delete their data, require companies to explain how AI makes decisions about them, and create Canada's first AI regulation framework. As of 2025 it is still working through Parliament.",
    getImpact: (a) => {
      if (a.student === 'In high school') return "This law directly protects you. It would give you - and your parents - stronger rights to delete information collected about you when you were a child. TikTok, Instagram, and other platforms would face stricter rules about how they collect and use your data.";
      if (a.student === 'College/university' || a.student === 'Yes, college/university') return "As a college or university student, you generate huge amounts of data. Bill C-27 would give you the right to know when AI is making decisions about you (like loan approvals or job screening), request explanations, and move your data between services.";
      if (a.student === 'Recently graduated') return "As you enter the workforce, AI is increasingly used in hiring, credit scoring, and performance evaluation. Bill C-27 would require companies to disclose when they're using automated systems to make decisions about you and give you the right to challenge those decisions.";
      return "Bill C-27 affects anyone who uses the internet in Canada - which is everyone. It would strengthen your right to know what data companies hold about you, require them to delete it when asked, and create Canada's first legal framework for regulating AI systems. Data breaches more than tripled between 2013 and 2022.";
    },
    link: "https://www.parl.ca/legisinfo/en/bill/44-1/c-27",
    linkLabel: "Read about Bill C-27",
    source: "Parliament of Canada / Office of the Privacy Commissioner"
  }
];

// SVG icons - single blue #7EB3FF color only, no multicolor
const IssueIcon = ({ issueKey, size = 18, color = '#7EB3FF' }) => {
  const style = { width: size, height: size, strokeWidth: 1.75, fill: 'none', stroke: color, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (issueKey === 'housing') return <svg style={style} viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
  if (issueKey === 'education') return <svg style={style} viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
  if (issueKey === 'healthcare') return <svg style={style} viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
  if (issueKey === 'jobs') return <svg style={style} viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
  if (issueKey === 'climate') return <svg style={style} viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>;
  if (issueKey === 'costoflife') return <svg style={style} viewBox="0 0 24 24"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;
  if (issueKey === 'canadaus') return <svg style={style} viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>;
  if (issueKey === 'privacy') return <svg style={style} viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
  return null;
};

// Updated logo matching friend's design - accurate dual-tone checkmark
const TalliedLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="4" y="4" width="68" height="68" rx="14" fill="#7EB3FF"/>
    <polyline points="18,46 34,62 46,50" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="34,62 84,12" stroke="#A3244A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Talia avatar - stylized "T" icon for the civic expert
const TaliaAvatar = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="28" fill="#F0F5FF"/>
    <circle cx="28" cy="28" r="26" fill="#7EB3FF" opacity="0.15"/>
    <text x="28" y="35" textAnchor="middle" fontFamily="'Lora', Georgia, serif" fontSize="22" fontWeight="500" fill="#2D6FD4">T</text>
  </svg>
);

// Talia guide bubble - shows at bottom right of each step
function TaliaGuide({ message, step, onDismiss }) {
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    setDismissed(false);
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, [step]);

  if (dismissed || !message) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '20px', zIndex: 100,
      maxWidth: '260px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
      transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '14px 16px', border: '1px solid #D8E6FF', boxShadow: '0 8px 32px rgba(126,179,255,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <TaliaAvatar size={32} />
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, color: '#7EB3FF', marginBottom: '3px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Talia</p>
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#222', lineHeight: 1.55 }}>{message}</p>
          </div>
        </div>
        <button
          onClick={() => { setDismissed(true); onDismiss && onDismiss(); }}
          style={{ position: 'absolute', top: '8px', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: '#CCC', fontSize: '14px', lineHeight: 1 }}
        >×</button>
      </div>
      {/* Tail */}
      <div style={{ position: 'absolute', bottom: '-7px', right: '20px', width: '14px', height: '14px', background: 'white', border: '1px solid #D8E6FF', borderTop: 'none', borderLeft: 'none', transform: 'rotate(45deg)', borderRadius: '0 0 3px 0' }} />
    </div>
  );
}

const taliaMessages = {
  form: "Tell us about yourself and what matters to you - these two things together are what make Tallied different from a Google search. I use them to show how each policy hits your specific situation.",
  priorities: "Pick what genuinely matters to you - not what sounds impressive. Only 3 picks, so choose the stuff that actually affects your day-to-day.",
  policies: "This is what actually happened in Ontario - real policies, real effects on people like you. No spin. Read your priority issues first.",
  results: "Now see what each candidate actually plans to do about your priorities. I'll show you what it means specifically for your situation.",
  summary: "You've got the full picture now. This page helps you pull it all together before you decide. No score - just your call.",
  chat: "Ask me anything you're still unsure about. I'm neutral and sourced. Or talk directly to the AI versions of the candidates.",
};

const issueOptions = [
  { key: 'housing', label: 'Housing & Affordability', description: 'Rent, home prices, tenant rights' },
  { key: 'education', label: 'Education & Student Debt', description: 'Tuition, OSAP, student loans' },
  { key: 'healthcare', label: 'Healthcare & Mental Health', description: 'Wait times, prescriptions, access' },
  { key: 'jobs', label: 'Jobs & Economy', description: 'Wages, employment, cost of living' },
  { key: 'climate', label: 'Climate & Environment', description: 'Carbon policy, green jobs, emissions' },
  { key: 'costoflife', label: 'Cost of Living', description: 'Inflation, interest rates, affordability' },
  { key: 'canadaus', label: 'Canada-US Relations', description: 'Tariffs, sovereignty, trade' },
  { key: 'privacy', label: 'Privacy & Tech', description: 'Data rights, AI, digital safety' },
];

function renderMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^#{1,3}\s+/gm, '')
    .trim();
}

function NavBar({ currentStep, onNavigate }) {
  const steps = [
    { key: 'form', label: 'Profile & Issues' },
    { key: 'policies', label: 'Policies' },
    { key: 'results', label: 'Comparison' },
    { key: 'summary', label: 'Summary' },
    { key: 'chat', label: 'Chat' },
  ];
  const order = steps.map(s => s.key);
  const currentIdx = order.indexOf(currentStep);

  return (
    <div style={{ background: '#FEFEFE', borderBottom: '1px solid #E8E8E8', padding: '10px 20px', position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => onNavigate('landing')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <TalliedLogo size={26} />
          <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111' }}>Tallied</span>
        </button>
        <div style={{ display: 'flex', gap: '2px' }}>
          {steps.map((s, i) => (
            <button
              key={s.key}
              onClick={() => i <= currentIdx && onNavigate(s.key)}
              style={{
                fontSize: '9px', padding: '3px 7px', borderRadius: '20px', border: 'none',
                cursor: i <= currentIdx ? 'pointer' : 'default',
                fontFamily: "'Inter', sans-serif",
                fontWeight: s.key === currentStep ? 600 : 400,
                background: s.key === currentStep ? '#7EB3FF' : 'transparent',
                color: s.key === currentStep ? 'white' : i < currentIdx ? '#7EB3FF' : '#BBB',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Reusable hover card
function HoverCard({ children, style = {}, padding = '24px' }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#F5F9FF' : 'white',
        borderRadius: '16px',
        padding,
        border: hovered ? '1.5px solid #7EB3FF' : '1px solid #E0E0E0',
        boxShadow: hovered ? '0 8px 24px rgba(126,179,255,0.15)' : '0 1px 4px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        transition: 'all 0.2s ease',
        ...style
      }}
    >
      {children}
    </div>
  );
}

function App() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [userAnswers, setUserAnswers] = useState(null);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [taliaDismissed, setTaliaDismissed] = useState(false);

  React.useEffect(() => {
    setTaliaDismissed(false);
  }, [currentStep]);

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes popIn { 0% { transform: scale(0.94); } 60% { transform: scale(1.02); } 100% { transform: scale(1); } }
      @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      .tl-fade { animation: fadeUp 0.6s ease both; }
      .tl-fade-1 { animation: fadeUp 0.6s ease 0.2s both; }
      .tl-fade-2 { animation: fadeUp 0.6s ease 0.4s both; }
      .tl-fade-3 { animation: fadeUp 0.6s ease 0.6s both; }
      .tl-fade-4 { animation: fadeUp 0.6s ease 0.8s both; }
      .tl-fade-5 { animation: fadeUp 0.6s ease 1.0s both; }
    `;
    document.head.appendChild(style);
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    document.body.style.fontFamily = "'Lora', Georgia, serif";
    document.body.style.background = '#FEFEFE';
  }, []);

  const navigate = (step) => {
    if (step === 'landing') { setCurrentStep('landing'); setSelectedIssues([]); setUserAnswers(null); }
    else setCurrentStep(step);
  };

  const showTalia = !taliaDismissed && currentStep !== 'landing' && currentStep !== 'privacy';

  if (currentStep === 'landing') {
    return (
      <div style={{ minHeight: '100vh', background: '#FEFEFE', display: 'flex', flexDirection: 'column', fontFamily: "'Lora', Georgia, serif" }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 20px' }}>
          <div style={{ maxWidth: '680px', width: '100%' }}>
            <div className="tl-fade" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
              <TalliedLogo size={60} />
              <div>
                <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '56px', fontWeight: 500, color: '#111', lineHeight: 1, letterSpacing: '-0.02em' }}>Tallied</h1>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888', fontWeight: 600, marginTop: '4px' }}>Politics, Personalized</p>
              </div>
            </div>
            <p className="tl-fade-1" style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', color: '#7EB3FF', fontWeight: 500, fontStyle: 'italic', marginBottom: '24px', marginLeft: '76px' }}>
              This affects you. Get tallied.
            </p>
            <div className="tl-fade-2" style={{ display: 'flex', gap: '8px', marginBottom: '22px', flexWrap: 'wrap' }}>
              {[{ key: 'housing', label: 'Housing', rose: false }, { key: 'healthcare', label: 'Healthcare', rose: true }, { key: 'education', label: 'Education', rose: false }].map(p => (
                <div key={p.key} style={{ background: p.rose ? '#FFF0F3' : '#F0F5FF', border: p.rose ? '1px solid #F4B8C4' : '1px solid #C8DCFF', borderRadius: '20px', padding: '7px 14px', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: p.rose ? '#A3244A' : '#2D6FD4', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <IssueIcon issueKey={p.key} size={12} color={p.rose ? '#A3244A' : '#2D6FD4'} />
                  {p.label}
                </div>
              ))}
            </div>
            <div className="tl-fade-3" style={{ background: '#F0F5FF', borderRadius: '16px', padding: '22px 24px', marginBottom: '14px', display: 'flex', gap: '20px', alignItems: 'flex-start', border: '1px solid #C8DCFF' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '48px', fontWeight: 700, color: '#111', lineHeight: 1, minWidth: '86px', letterSpacing: '-0.03em' }}>57%</div>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#222', lineHeight: 1.75, paddingTop: '4px' }}>
                of eligible Ontario voters didn't cast a ballot in 2022 - the highest abstention rate in provincial history. Meanwhile the policies they skipped voting on affect your{' '}
                <span style={{ color: '#7EB3FF', fontWeight: 500 }}>rent</span>,{' '}
                <span style={{ color: '#7EB3FF', fontWeight: 500 }}>tuition</span>, and{' '}
                <span style={{ color: '#A3244A', fontWeight: 500 }}>healthcare</span>.
              </p>
            </div>
            <div className="tl-fade-3" style={{ background: '#F0F5FF', borderRadius: '12px', padding: '12px 18px', marginBottom: '24px', border: '1px solid #C8DCFF' }}>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#222', lineHeight: 1.7 }}>
                <span style={{ color: '#7EB3FF', fontWeight: 500 }}>Built for Ontario residents.</span>{' '}
                Tallied covers both provincial policies and federal decisions that directly affect life in Ontario. It is not a national tool and does not cover all Canadian provinces.
              </p>
            </div>
            <button onClick={() => setCurrentStep('form')} className="tl-fade-4" style={{ width: '100%', background: '#7EB3FF', color: 'white', borderRadius: '14px', padding: '18px', fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, border: 'none', cursor: 'pointer', marginBottom: '12px', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#6BA3EF'}
              onMouseLeave={e => e.currentTarget.style.background = '#7EB3FF'}
            >
              Get Started
            </button>
            <p className="tl-fade-5" style={{ textAlign: 'center', fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#666', fontStyle: 'italic' }}>
              Already have questions?{' '}
              <button onClick={() => setCurrentStep('chat')} style={{ color: '#7EB3FF', fontStyle: 'normal', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: "'Lora', Georgia, serif", fontSize: '13px' }}>
                Chat with Talia or the candidates directly
              </button>
            </p>
          </div>
        </div>
        <footer style={{ textAlign: 'center', padding: '24px', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#AAA' }}>
          Built by Ivana Okpakovwodo - {new Date().getFullYear()}
          <div style={{ marginTop: '6px' }}>
            <button onClick={() => setCurrentStep('privacy')} style={{ color: '#AAA', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '11px' }}>Privacy & Terms</button>
          </div>
        </footer>
      </div>
    );
  }

  if (currentStep === 'form') return (
    <>
      <NavBar currentStep={currentStep} onNavigate={navigate} />
      <ProfileAndPrioritiesPage
        existingAnswers={userAnswers}
        existingIssues={selectedIssues}
        onComplete={(answers, issues) => {
          setUserAnswers(answers);
          setSelectedIssues(issues);
          setCurrentStep('policies');
        }}
      />
      {showTalia && <TaliaGuide message={taliaMessages.form} step={currentStep} onDismiss={() => setTaliaDismissed(true)} />}
    </>
  );
  if (currentStep === 'policies') return (
    <>
      <NavBar currentStep={currentStep} onNavigate={navigate} />
      <PoliciesPage answers={userAnswers} selectedIssues={selectedIssues} onComplete={() => setCurrentStep('results')} onChat={() => setCurrentStep('chat')} />
      {showTalia && <TaliaGuide message={taliaMessages.policies} step={currentStep} onDismiss={() => setTaliaDismissed(true)} />}
    </>
  );
  if (currentStep === 'results') return (
    <>
      <NavBar currentStep={currentStep} onNavigate={navigate} />
      <ResultsPage answers={userAnswers} selectedIssues={selectedIssues} onContinue={() => setCurrentStep('summary')} onChat={() => setCurrentStep('chat')} onRestart={() => navigate('landing')} />
      {showTalia && <TaliaGuide message={taliaMessages.results} step={currentStep} onDismiss={() => setTaliaDismissed(true)} />}
    </>
  );
  if (currentStep === 'summary') return (
    <>
      <NavBar currentStep={currentStep} onNavigate={navigate} />
      <DecisionSummaryPage answers={userAnswers} selectedIssues={selectedIssues} onChat={() => setCurrentStep('chat')} onRestart={() => navigate('landing')} />
      {showTalia && <TaliaGuide message={taliaMessages.summary} step={currentStep} onDismiss={() => setTaliaDismissed(true)} />}
    </>
  );
  if (currentStep === 'chat') return (
    <>
      <NavBar currentStep={currentStep} onNavigate={navigate} />
      <ChatPage answers={userAnswers} selectedIssues={selectedIssues} onRestart={() => navigate('landing')} onBack={() => setCurrentStep('summary')} />
    </>
  );
  if (currentStep === 'privacy') return (
    <>
      <NavBar currentStep={currentStep} onNavigate={navigate} />
      <PrivacyPage onBack={() => navigate('landing')} />
    </>
  );
}


function ProfileAndPrioritiesPage({ onComplete, existingAnswers, existingIssues }) {
  const [answers, setAnswers] = useState(existingAnswers || { student: null, income: null, housing: null, employment: null });
  const [selected, setSelected] = useState(existingIssues || []);

  const questions = [
    { key: 'student', question: 'Student status', options: ['College/university', 'In high school', 'Recently graduated', 'Not a student'] },
    { key: 'employment', question: 'Employment', options: ['Employed full-time', 'Employed part-time', 'Looking for work', 'Not currently working'] },
    { key: 'income', question: 'Household income', options: ['Under $40k', '$40k-$75k', '$75k-$120k', 'Over $120k'] },
    { key: 'housing', question: 'Housing situation', options: ['Renting', 'Homeowner', 'Living with family', 'Looking to buy'] }
  ];

  const toggle = (key) => {
    if (selected.includes(key)) setSelected(selected.filter(k => k !== key));
    else if (selected.length < 3) setSelected([...selected, key]);
  };

  const profileComplete = answers.student && answers.income && answers.housing && answers.employment;
  const isComplete = profileComplete && selected.length > 0;
  const answeredCount = [answers.student, answers.employment, answers.income, answers.housing].filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', background: '#FEFEFE', padding: '40px 20px 100px' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '28px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>
            Let's personalize this for you
          </h1>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#444', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto' }}>
            Your answers to these questions are the only reason Tallied is different from a Google search. They let us show you exactly how each policy affects <em>your</em> life - not just in general.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#7EB3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: 'white' }}>1</div>
              <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111' }}>Tell us about yourself</h2>
              <div style={{ display: 'flex', gap: '5px', marginLeft: 'auto' }}>
                {[0,1,2,3].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i < answeredCount ? '#7EB3FF' : '#E0E0E0', transition: 'background 0.2s' }} />)}
              </div>
            </div>
            {questions.map(({ key, question, options }) => (
              <div key={key} style={{ background: 'white', borderRadius: '14px', padding: '18px', marginBottom: '12px', border: '1px solid #E0E0E0' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>{question}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px' }}>
                  {options.map(option => {
                    const sel = answers[key] === option;
                    return (
                      <button
                        key={option}
                        onClick={() => setAnswers({ ...answers, [key]: option })}
                        style={{
                          padding: '10px 12px', borderRadius: '10px',
                          fontFamily: "'Lora', Georgia, serif", fontSize: '13px', cursor: 'pointer',
                          transition: 'all 0.15s',
                          background: sel ? '#7EB3FF' : '#F6F6F6',
                          color: sel ? 'white' : '#222',
                          border: sel ? '2px solid #7EB3FF' : '2px solid transparent',
                          fontWeight: sel ? 500 : 400,
                          textAlign: 'left',
                        }}
                        onMouseEnter={e => { if (!sel) { e.currentTarget.style.background = '#EEF5FF'; e.currentTarget.style.borderColor = '#7EB3FF'; }}}
                        onMouseLeave={e => { if (!sel) { e.currentTarget.style.background = '#F6F6F6'; e.currentTarget.style.borderColor = 'transparent'; }}}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: selected.length > 0 ? '#7EB3FF' : '#E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: 'white', transition: 'background 0.2s' }}>2</div>
              <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111' }}>What matters most to you?</h2>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#A3244A', marginLeft: 'auto' }}>{selected.length}/3</span>
            </div>
            <div style={{ background: 'white', borderRadius: '14px', padding: '18px', border: '1px solid #E0E0E0' }}>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#555', lineHeight: 1.6, marginBottom: '14px' }}>
                Pick up to 3. We'll filter every policy card and candidate comparison through these.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {issueOptions.map(issue => {
                  const isSelected = selected.includes(issue.key);
                  const isDisabled = !isSelected && selected.length >= 3;
                  return (
                    <button
                      key={issue.key}
                      onClick={() => toggle(issue.key)}
                      disabled={isDisabled}
                      style={{
                        padding: '12px', borderRadius: '12px', textAlign: 'left',
                        border: isSelected ? '2px solid #7EB3FF' : '1px solid #E8E8E8',
                        background: isSelected ? '#EEF5FF' : isDisabled ? '#F8F8F8' : 'white',
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        transition: 'all 0.18s',
                        boxShadow: isSelected ? '0 0 0 3px rgba(126,179,255,0.15)' : 'none',
                      }}
                      onMouseEnter={e => { if (!isDisabled && !isSelected) { e.currentTarget.style.borderColor = '#7EB3FF'; e.currentTarget.style.background = '#F5F9FF'; }}}
                      onMouseLeave={e => { if (!isDisabled && !isSelected) { e.currentTarget.style.borderColor = '#E8E8E8'; e.currentTarget.style.background = 'white'; }}}
                    >
                      <div style={{ width: '26px', height: '26px', borderRadius: '8px', marginBottom: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isSelected ? '#C8DCFF' : isDisabled ? '#EEE' : '#EEF4FF' }}>
                        <IssueIcon issueKey={issue.key} size={14} color={isSelected ? '#2D6FD4' : isDisabled ? '#CCC' : '#7EB3FF'} />
                      </div>
                      <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 500, fontSize: '12px', color: isSelected ? '#1A4FAA' : isDisabled ? '#CCC' : '#111', marginBottom: '2px', lineHeight: 1.3 }}>{issue.label}</div>
                      <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '10px', color: isSelected ? '#4A7AE0' : isDisabled ? '#DDD' : '#777', fontStyle: 'italic' }}>{issue.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          {!isComplete && (
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#AAA', marginBottom: '12px', fontStyle: 'italic' }}>
              {!profileComplete ? 'Answer all four profile questions and pick at least one issue to continue' : 'Now pick at least one issue that matters to you'}
            </p>
          )}
          <button
            onClick={() => isComplete && onComplete(answers, selected)}
            disabled={!isComplete}
            style={{
              padding: '18px 56px', borderRadius: '14px',
              fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500,
              border: 'none', cursor: isComplete ? 'pointer' : 'not-allowed',
              background: isComplete ? '#7EB3FF' : '#E0E0E0',
              color: isComplete ? 'white' : '#AAA',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (isComplete) e.currentTarget.style.background = '#6BA3EF'; }}
            onMouseLeave={e => { if (isComplete) e.currentTarget.style.background = '#7EB3FF'; }}
          >
            Show Me How This Affects Me
          </button>
        </div>
      </div>
    </div>
  );
}

function PersonalizationForm({ onComplete, existingAnswers }) {
  const [answers, setAnswers] = useState(existingAnswers || { student: null, income: null, housing: null, employment: null });

  const questions = [
    { key: 'student', question: 'What is your current student status?', options: ['College/university', 'In high school', 'Recently graduated', 'Not a student'] },
    { key: 'employment', question: "What's your employment situation?", options: ['Employed full-time', 'Employed part-time', 'Looking for work', 'Not currently working'] },
    { key: 'income', question: "What's your household income range?", options: ['Under $40k', '$40k-$75k', '$75k-$120k', 'Over $120k'] },
    { key: 'housing', question: "What's your housing situation?", options: ['Renting', 'Homeowner', 'Living with family', 'Looking to buy'] }
  ];

  const isComplete = answers.student && answers.income && answers.housing && answers.employment;
  const answeredCount = [answers.student, answers.employment, answers.income, answers.housing].filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', background: '#FEFEFE', padding: '40px 20px 80px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '30px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>Tell us about yourself</h1>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#444', marginBottom: '16px' }}>Step 1 of 3 - 4 quick questions, then we personalize everything</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {[0,1,2,3].map(i => <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: i < answeredCount ? '#7EB3FF' : '#E0E0E0', transition: 'background 0.2s' }} />)}
          </div>
        </div>

        {questions.map(({ key, question, options }) => (
          <div key={key} style={{ background: 'white', borderRadius: '16px', padding: '28px', marginBottom: '16px', border: '1px solid #E0E0E0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '18px', fontWeight: 500, color: '#111', marginBottom: '18px' }}>{question}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {options.map(option => {
                const sel = answers[key] === option;
                return (
                  <button
                    key={option}
                    onClick={() => setAnswers({ ...answers, [key]: option })}
                    style={{
                      padding: '13px 16px', borderRadius: '12px',
                      fontFamily: "'Lora', Georgia, serif", fontSize: '14px', cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      background: sel ? '#7EB3FF' : '#F6F6F6',
                      color: sel ? 'white' : '#222',
                      border: sel ? '2px solid #7EB3FF' : '2px solid transparent',
                      fontWeight: sel ? 500 : 400,
                    }}
                    onMouseEnter={e => { if (!sel) { e.currentTarget.style.background = '#EEF5FF'; e.currentTarget.style.borderColor = '#7EB3FF'; }}}
                    onMouseLeave={e => { if (!sel) { e.currentTarget.style.background = '#F6F6F6'; e.currentTarget.style.borderColor = 'transparent'; }}}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button
            onClick={() => isComplete && onComplete(answers)}
            disabled={!isComplete}
            style={{
              padding: '16px 52px', borderRadius: '12px',
              fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500,
              border: 'none', cursor: isComplete ? 'pointer' : 'not-allowed',
              background: isComplete ? '#7EB3FF' : '#E0E0E0',
              color: isComplete ? 'white' : '#AAA',
              transition: 'all 0.15s',
            }}
          >
            See How Policy Affects You
          </button>
        </div>
      </div>
    </div>
  );
}

function PrioritiesPage({ onComplete, existingIssues }) {
  const [selected, setSelected] = useState(existingIssues || []);

  const toggle = (key) => {
    if (selected.includes(key)) setSelected(selected.filter(k => k !== key));
    else if (selected.length < 3) setSelected([...selected, key]);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FEFEFE', padding: '40px 20px 80px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #E0E0E0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '26px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>What matters most to you?</h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#333', marginBottom: '8px', lineHeight: 1.7 }}>
            Pick your top 3 issues. We'll show you exactly how recent policy decisions have affected people in your situation - and how today's candidates plan to address them.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#A3244A', fontWeight: 600, marginBottom: '20px' }}>{selected.length} of 3 selected</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
            {issueOptions.map(issue => {
              const isSelected = selected.includes(issue.key);
              const isDisabled = !isSelected && selected.length >= 3;
              return (
                <button
                  key={issue.key}
                  onClick={() => toggle(issue.key)}
                  disabled={isDisabled}
                  style={{
                    padding: '16px', borderRadius: '14px', textAlign: 'left',
                    border: isSelected ? '2px solid #7EB3FF' : '1px solid #E0E0E0',
                    background: isSelected ? '#EEF5FF' : isDisabled ? '#F8F8F8' : 'white',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    transition: 'all 0.18s ease',
                    fontFamily: "'Lora', Georgia, serif",
                    boxShadow: isSelected ? '0 0 0 3px rgba(126,179,255,0.2)' : '0 1px 3px rgba(0,0,0,0.03)',
                  }}
                  onMouseEnter={e => { if (!isDisabled && !isSelected) { e.currentTarget.style.borderColor = '#7EB3FF'; e.currentTarget.style.background = '#F5F9FF'; e.currentTarget.style.transform = 'translateY(-2px)'; }}}
                  onMouseLeave={e => { if (!isDisabled && !isSelected) { e.currentTarget.style.borderColor = '#E0E0E0'; e.currentTarget.style.background = 'white'; e.currentTarget.style.transform = ''; }}}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isSelected ? '#D0E5FF' : isDisabled ? '#EEEEEE' : '#EEF4FF', transition: 'background 0.15s' }}>
                    <IssueIcon issueKey={issue.key} size={16} color={isSelected ? '#2D6FD4' : isDisabled ? '#CCC' : '#7EB3FF'} />
                  </div>
                  <div style={{ fontWeight: 500, fontSize: '13px', color: isSelected ? '#1A4FAA' : isDisabled ? '#CCC' : '#111', marginBottom: '3px' }}>{issue.label}</div>
                  <div style={{ fontSize: '11px', color: isSelected ? '#4A7AE0' : isDisabled ? '#DDD' : '#666', fontStyle: 'italic' }}>{issue.description}</div>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => selected.length > 0 && onComplete(selected)}
            disabled={selected.length === 0}
            style={{
              width: '100%', padding: '16px', borderRadius: '12px',
              fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, border: 'none',
              cursor: selected.length > 0 ? 'pointer' : 'not-allowed',
              background: selected.length > 0 ? '#7EB3FF' : '#E0E0E0',
              color: selected.length > 0 ? 'white' : '#AAA',
              transition: 'background 0.15s',
            }}
          >
            See How These Issues Affect You
          </button>
        </div>
      </div>
    </div>
  );
}

function PolicyCard({ policy, answers }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#F5F9FF' : 'white',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '16px',
        border: hovered ? '1.5px solid #7EB3FF' : '1px solid #E0E0E0',
        boxShadow: hovered ? '0 8px 24px rgba(126,179,255,0.15)' : '0 1px 4px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px', background: '#EEF4FF', color: '#2D6FD4', border: '1px solid #C8DCFF', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <IssueIcon issueKey={policy.issueKey} size={10} color="#2D6FD4" />
          {policy.tag}
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#888' }}>{policy.year}</span>
      </div>
      <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '19px', fontWeight: 500, color: '#111', marginBottom: '12px', lineHeight: 1.3 }}>{policy.title}</h3>
      <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#333', lineHeight: 1.75, marginBottom: '16px' }}>{policy.plain}</p>
      <div style={{ background: '#FFF0F3', borderRadius: '12px', padding: '16px', marginBottom: '16px', border: '1px solid #F4B8C4' }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, color: '#A3244A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>How this affects you</p>
        <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#222', lineHeight: 1.75, fontStyle: 'italic' }}>{policy.getImpact(answers)}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href={policy.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#7EB3FF', textDecoration: 'none', fontWeight: 500 }}>{policy.linkLabel} ↗</a>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#AAA' }}>Source: {policy.source}</p>
      </div>
    </div>
  );
}

function PoliciesPage({ answers, selectedIssues, onComplete, onChat }) {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const priorityPolicies = policies.filter(p => selectedIssues.includes(p.issueKey));
  const otherPolicies = policies.filter(p => !selectedIssues.includes(p.issueKey));

  const searchSynonyms = {
    housing: ['housing', 'rent', 'home', 'homes', 'apartment', 'landlord', 'tenant', 'mortgage', 'renting', 'house'],
    education: ['education', 'osap', 'tuition', 'student', 'university', 'college', 'school', 'debt', 'loan', 'grants'],
    healthcare: ['healthcare', 'health', 'ohip', 'prescription', 'dental', 'doctor', 'mental health', 'medicine', 'hospital', 'clinic'],
    jobs: ['jobs', 'minimum wage', 'work', 'employment', 'wages', 'salary', 'pay', 'labour', 'labor', 'economy'],
    climate: ['climate', 'carbon', 'environment', 'green', 'emissions', 'energy', 'pollution', 'oil', 'gas'],
    costoflife: ['cost of living', 'inflation', 'interest rate', 'groceries', 'food', 'prices', 'mortgage', 'bank', 'affordability', 'cost'],
    canadaus: ['tariff', 'trade', 'us', 'trump', 'canada us', 'steel', 'aluminum', 'auto', 'manufacturing', 'america'],
    privacy: ['privacy', 'data', 'tech', 'digital', 'ai', 'internet', 'social media', 'cybersecurity', 'online', 'bill c-27']
  };

  const searchResults = searchQuery.trim().length > 1
    ? policies.filter(p => {
        const q = searchQuery.toLowerCase();
        const synonyms = searchSynonyms[p.issueKey] || [];
        return p.title.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q) || p.plain.toLowerCase().includes(q) || synonyms.some(s => s.includes(q) || q.includes(s));
      })
    : null;

  return (
    <div style={{ minHeight: '100vh', background: '#FEFEFE', padding: '0 20px 80px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ background: '#7EB3FF', borderRadius: '14px', margin: '20px 0', padding: '18px 22px' }}>
          <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: 'white', marginBottom: '4px' }}>Step 3 - Understand the Landscape</h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#D8EAFF', lineHeight: 1.6, fontStyle: 'italic' }}>Before comparing candidates, see how recent policy decisions have already affected people like you. This is your context - what's actually happened, and what's at stake.</p>
        </div>

        <div style={{ background: 'white', borderRadius: '14px', padding: '14px', marginBottom: '20px', border: '1px solid #E0E0E0' }}>
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search policies... (e.g. housing, OSAP, climate)" style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: '10px', padding: '12px 16px', fontFamily: "'Lora', Georgia, serif", fontSize: '14px', outline: 'none', boxSizing: 'border-box', color: '#222' }} />
          {searchQuery.trim().length > 1 && searchResults && searchResults.length === 0 && (
            <p style={{ fontFamily: "'Lora', Georgia, serif", color: '#888', fontSize: '14px', marginTop: '12px', textAlign: 'center' }}>No results for "{searchQuery}" - try: housing, education, healthcare, jobs, climate, cost of living, trade, or privacy.</p>
          )}
        </div>

        {searchResults && searchResults.length > 0 ? (
          <>{searchResults.map(policy => <PolicyCard key={policy.id} policy={policy} answers={answers} />)}</>
        ) : !searchQuery && (
          <>
            <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A3244A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>
              Your Priority Issues
            </h3>
            {priorityPolicies.map(policy => <PolicyCard key={policy.id} policy={policy} answers={answers} />)}
          </>
        )}

        {!searchQuery && (!showAll ? (
          <button onClick={() => setShowAll(true)} style={{ width: '100%', padding: '16px', borderRadius: '12px', fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#444', background: 'white', border: '1px solid #E0E0E0', cursor: 'pointer', marginBottom: '24px', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#7EB3FF'; e.currentTarget.style.background = '#F5F9FF'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E0E0E0'; e.currentTarget.style.background = 'white'; }}
          >
            Explore all 8 issues ↓
          </button>
        ) : (
          <>
            <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111', marginBottom: '16px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7EB3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              Other Issues
            </h3>
            {otherPolicies.map(policy => <PolicyCard key={policy.id} policy={policy} answers={answers} />)}
            <button onClick={() => setShowAll(false)} style={{ width: '100%', padding: '12px', borderRadius: '12px', fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#AAA', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '24px' }}>Show less ↑</button>
          </>
        ))}

        <HoverCard style={{ marginBottom: '20px' }} padding="24px">
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '18px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>Ready to compare candidates?</h3>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#444', marginBottom: '20px', lineHeight: 1.7 }}>Now that you understand how policies have affected people like you, let's see what Carney and Poilievre actually plan to do about your top priorities.</p>
          <button onClick={onComplete} style={{ width: '100%', padding: '16px', borderRadius: '12px', fontFamily: "'Lora', Georgia, serif", fontSize: '15px', fontWeight: 500, background: '#7EB3FF', color: 'white', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#6BA3EF'}
            onMouseLeave={e => e.currentTarget.style.background = '#7EB3FF'}
          >
            Compare Candidates on My Priorities
          </button>
        </HoverCard>
      </div>
    </div>
  );
}

const candidateComparison = {
  housing: {
    liberal: { bottomLine: "Focused on helping first-time buyers get in the door.", what: "Carney's government removed the GST for first-time homebuyers on homes under $1 million - that saves you up to $50,000 upfront. They also want to build 500,000 new homes per year by getting the government involved in construction again. This is already government policy.", source: "https://www.pm.gc.ca/en/news/news-releases/2025/03/20/prime-minister-mark-carney-will-eliminate-gst-for-first-time-homebuyers", sourceLabel: "PM announcement - GST for first-time buyers" },
    conservative: { bottomLine: "Went furthest on housing - tax cuts for all buyers, not just first-timers.", what: "Poilievre promised to remove the GST on ALL new homes under $1.3 million. He also wanted to sell federal land to developers to build homes faster, and cut funding to cities that slow down new home approvals. His goal was 2.3 million homes in 5 years.", source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/", sourceLabel: "Conservative plan for change" },
    ndp: { bottomLine: "Most focused on renters and people who can't afford to buy at all.", what: "The NDP wanted to build 3 million homes by 2030 and make national rent control a condition for any city that wants federal housing money. They also wanted to protect existing social housing from being bought up by large investment companies.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP campaign commitments" },
    getPersonalized: (a) => {
      if (a.housing === 'Renting') return "As a renter, Carney and Poilievre's plans mostly help people buying homes - not you right now. The NDP's rent control proposal would have had the most direct impact on what you pay monthly. Since NDP lost the election, none of that is happening federally.";
      if (a.housing === 'Looking to buy') return "The Liberal GST cut is now law - if you buy your first home under $1 million, you save up to $50,000 in tax. Poilievre would have gone further and removed GST for everyone, not just first-timers.";
      if (a.housing === 'Living with family') return "When you eventually move out, the Liberal GST cut (already in effect) means your first home purchase under $1M comes with up to $50,000 in tax savings. All parties promised to build more homes - which should eventually bring prices down.";
      return "All parties promised major housing construction. Liberals are now in government implementing their plan. More supply eventually helps the broader market even if it doesn't directly lower your mortgage.";
    }
  },
  education: {
    liberal: { bottomLine: "Mostly silent on student debt and tuition - this was a weak spot.", what: "Carney's 2025 platform had almost nothing specifically for post-secondary students. No promises to lower tuition, cancel debt, or fix OSAP. The main benefit was a tax cut that saves working Canadians up to $825 a year.", source: "https://thegauntlet.ca/2025/04/25/the-liberal-partys-plan-for-students-steady-with-short-reach/", sourceLabel: "The Gauntlet - Liberal plan for students" },
    conservative: { bottomLine: "Made loan repayment more flexible, but didn't cancel debt.", what: "Poilievre promised income-contingent repayment for student loans - meaning you only start paying back your loans once you're earning enough money to afford it. He also wanted to make the interest on student lines of credit tax-deductible.", source: "https://universityaffairs.ca/news/where-do-the-federal-election-candidates-stand-on-postsecondary-education/", sourceLabel: "University Affairs - party education platforms" },
    ndp: { bottomLine: "Most ambitious for students - free tuition and debt cancellation.", what: "The NDP made the biggest promises: cancel existing student debt entirely, and eventually make tuition free at public colleges and universities. The catch: the NDP lost the 2025 election badly and lost official party status, so none of this is happening.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP campaign commitments" },
    getPersonalized: (a) => {
      if (a.student === 'In high school') return "The OSAP cuts you'll face when you start university are a Ford provincial government decision - the federal parties don't control OSAP. Federally, NDP promised the most for students (free tuition, cancel debt) but lost the election. Liberals and Conservatives had very little for students specifically.";
      if (a.student === 'College/university' || a.student === 'Yes, college/university') return "None of the federal parties promised to fix Ontario's OSAP cuts - that's on the Ford government, not Ottawa. Federally, NDP promised full debt cancellation and free tuition but lost. Conservatives offered more flexible loan repayment. Liberals were largely quiet.";
      if (a.student === 'Recently graduated') return "Conservatives' flexible repayment plan would have helped you most - paying back loans only once you earn enough. NDP promised full cancellation. Liberals offered little. Since Liberals won, your federal student loan situation stays as-is.";
      return "Federal parties had limited education platforms in 2025. The OSAP cuts are provincial. NDP had the boldest student promises but lost.";
    }
  },
  healthcare: {
    liberal: { bottomLine: "Expanding what's already covered - dental and some prescriptions.", what: "Carney's government is expanding dental care coverage to Canadians aged 18 to 64 - saving around $800 per person per year if you have no benefits. They're also covering insulin and birth control through pharmacare, and investing $4 billion in building more local health clinics.", source: "https://liberal.ca/mark-carneys-liberals-take-action-to-make-life-more-affordable/", sourceLabel: "Liberal affordability announcement" },
    conservative: { bottomLine: "No new healthcare spending - focused on fixing the system, not expanding it.", what: "Poilievre's platform didn't promise major new healthcare programs or funding. His focus was on reducing government spending and letting the system become more efficient. He opposed expanding pharmacare.", source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/", sourceLabel: "Conservative plan for change" },
    ndp: { bottomLine: "Most ambitious - wanted every Canadian covered for doctor, dental, and prescriptions.", what: "The NDP promised the biggest expansion of Canadian healthcare since Medicare. Every Canadian would have a family doctor by 2030. All prescriptions would eventually be covered for free. Mental health therapy and counselling would be covered too.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP campaign commitments" },
    getPersonalized: (a) => {
      if (a.student === 'College/university' || a.student === 'Yes, college/university' || a.student === 'In high school') return "The Liberal dental expansion to ages 18-64 is already happening - if you don't have dental coverage through school or a parent's plan, you may now qualify. NDP promised to go much further with full pharmacare and mental health coverage, but they lost the election.";
      if (a.income === 'Under $40k' || a.employment === 'Looking for work' || a.employment === 'Not currently working') return "Without employer benefits, the Liberal dental expansion directly helps you. NDP's full pharmacare would have helped even more - free prescriptions regardless of income. Conservatives offered nothing new here.";
      return "Liberals are expanding dental care to ages 18-64 and covering insulin and birth control. NDP wanted to go further. Conservatives planned no new healthcare programs.";
    }
  },
  jobs: {
    liberal: { bottomLine: "Small tax cut for workers, focused on protecting jobs from US tariffs.", what: "Carney cut income taxes slightly for the middle class - saving a household with two working adults up to $825 a year. He also promised that every dollar Canada collects from retaliatory tariffs on US goods goes directly to support Canadian workers and businesses affected by the trade war.", source: "https://liberal.ca/mark-carneys-liberals-take-action-to-make-life-more-affordable/", sourceLabel: "Liberal affordability announcement" },
    conservative: { bottomLine: "Bigger tax cut, betting on oil and resource jobs to grow the economy.", what: "Poilievre promised a larger income tax cut - saving the average worker $900 a year, and families with two incomes $1,800 a year. He planned to fund this by cutting government spending and growing the economy through more oil, mining, and natural resource extraction.", source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/", sourceLabel: "Conservative plan for change" },
    ndp: { bottomLine: "Best for low-income workers and people between jobs.", what: "The NDP wanted to raise the basic personal amount to $19,500 - meaning most minimum wage workers would pay little to no federal income tax. They also wanted to make Employment Insurance easier to qualify for and expand it to cover gig workers who currently get nothing when they lose work.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP campaign commitments" },
    getPersonalized: (a) => {
      if (a.employment === 'Looking for work') return "NDP's EI improvements would have helped you most - easier to qualify, longer duration, higher payments. Liberal EI modernization is happening but more slowly. Conservative plan focused on creating new jobs through resource extraction, not supporting people between jobs.";
      if (a.employment === 'Employed part-time' || a.income === 'Under $40k') return "NDP's plan to raise the tax-free threshold to $19,500 would have been the biggest benefit for you - most part-time and minimum wage workers would pay little to no federal income tax. Liberal tax cut helps a bit. Conservative cut is larger but you need to earn more to feel it.";
      if (a.student === 'College/university' || a.student === 'Yes, college/university' || a.student === 'In high school') return "NDP's higher tax-free threshold ($19,500) would mean most student jobs pay zero federal income tax. Liberal cut (now in effect) saves working students something. Conservative cut is bigger but mainly benefits people earning above average.";
      return "Liberal tax cut (up to $825/family) is now law. Conservative promised bigger cuts ($1,800/family). NDP focused on making sure low earners pay nothing and people between jobs are properly supported.";
    }
  },
  climate: {
    liberal: { bottomLine: "Cancelled the gas price tax but kept rules for big polluters.", what: "Carney cancelled the consumer carbon tax in March 2025. But big industrial companies like oil refineries and factories still have to pay for their pollution. The government is also offering grants to help Canadians buy energy-efficient appliances and electric vehicles.", source: "https://liberal.ca/cstrong/build/", sourceLabel: "Liberal build plan - climate section" },
    conservative: { bottomLine: "Would have scrapped all carbon rules and focused on oil and gas growth.", what: "Poilievre wanted to cancel not just the consumer carbon tax but all carbon pricing - including the rules that big companies follow. His approach: instead of charging polluters, give them tax credits if they choose to reduce emissions voluntarily. He also wanted to build more pipelines and expand oil and gas production.", source: "https://www.conservative.ca/poilievre-announces-new-canada-first-economic-action-plan/", sourceLabel: "Conservative Canada First Economic Action Plan" },
    ndp: { bottomLine: "Strongest on climate - make polluters pay and help households go green for free.", what: "The NDP wanted to keep charging big polluters for their emissions AND stop giving oil and gas companies $18 billion in government subsidies every year. They also had free home energy upgrades for low-income households, potentially saving up to $4,500 a year on energy bills.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP campaign commitments" },
    getPersonalized: (a) => {
      if (a.income === 'Under $40k') return "NDP's free home retrofit for low-income households would have been the biggest direct benefit - cutting your energy bills by up to $4,500/year with no upfront cost. Conservative plan had nothing targeted at lower-income Canadians on climate.";
      if (a.housing === 'Renting') return "As a renter you don't control your heating system, so most green home grants don't apply to you. The consumer carbon tax cancellation (already done by Carney) saves you a bit on gas. NDP's EV rebate would have helped if you buy a car.";
      if (a.student === 'In high school' || a.student === 'College/university' || a.student === 'Yes, college/university') return "This is your generation's issue more than any other. Liberals cancelled the consumer tax but kept industrial rules. NDP kept the most climate action and cut oil subsidies. Conservatives would have removed all carbon rules and expanded fossil fuels. The differences between parties here are significant and long-lasting.";
      return "Liberals cancelled consumer carbon tax but kept industrial pricing. NDP would have kept industrial pricing AND cut fossil fuel subsidies AND provided home retrofit grants. Conservatives wanted to remove all carbon pricing entirely and grow oil and gas.";
    }
  },
  costoflife: {
    liberal: { bottomLine: "Tax cut, cheaper gas, and dental care - modest but real.", what: "Carney's government delivered three main cost-of-living wins: a small income tax cut (up to $825/year for a two-income family), the cancellation of the carbon tax saving about 18 cents per litre of gas, and expanding dental coverage. These are already in effect.", source: "https://liberal.ca/mark-carneys-liberals-take-action-to-make-life-more-affordable/", sourceLabel: "Liberal affordability announcement" },
    conservative: { bottomLine: "Bigger tax cut - but mostly benefits people who already earn decent wages.", what: "Poilievre promised a larger income tax cut - saving workers $900/year and two-income families $1,800/year. He also wanted to cancel all carbon pricing and freeze the tax on alcohol. The bigger tax cut sounds great, but economists noted it benefits higher earners more since it's a flat rate cut.", source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/", sourceLabel: "Conservative plan for change" },
    ndp: { bottomLine: "Targeted the actual things eating up your budget - groceries, internet, heat.", what: "The NDP's approach was different: instead of income tax cuts, they wanted to directly cap prices on grocery staples and permanently remove the GST from groceries, home heating bills, internet plans, and diapers. Funded by a new tax on households worth over $10 million.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP campaign commitments" },
    getPersonalized: (a) => {
      if (a.income === 'Under $40k') return "NDP's approach would have helped you most - capping grocery prices and removing tax from your internet and heating bills hits your biggest expenses directly. Tax cuts are less useful when you don't earn much. Conservative tax cut is larger but you'd need to earn more to feel it.";
      if (a.housing === 'Renting') return "Your biggest costs are rent, groceries, and utilities. NDP removing GST from heating and internet would have directly cut your monthly bills. Liberal tax cut puts a bit back in your pocket. Conservative cut is larger but mostly benefits higher earners.";
      if (a.student === 'College/university' || a.student === 'Yes, college/university' || a.student === 'In high school') return "As a student, your money goes to food, phone bills, and transit. NDP's GST removal from grocery and internet bills would have helped directly. Liberal tax cut helps if you work. Conservative tax cut is bigger but you'd need to be earning a real salary to benefit much.";
      return "Liberal delivered modest tax cut and cheaper gas. Conservative promised bigger tax cut. NDP focused on directly reducing the cost of groceries, heat, and internet - a different philosophy that benefits people who spend most of their income on basics.";
    }
  },
  canadaus: {
    liberal: { bottomLine: "Fighting back against the US while protecting Canadian workers.", what: "When the US put tariffs on Canadian steel, aluminum and cars, Carney responded by putting matching tariffs on US goods coming into Canada. Every dollar Canada collects from those tariffs is being directed to Canadian workers and businesses affected by the trade war. The longer-term goal is to make Canada less dependent on the US.", source: "https://www.canada.ca/en/department-finance/news/2025/03/canada-responds-to-unjustified-us-tariffs-on-canadian-steel-and-aluminum-products.html", sourceLabel: "Canada.ca - response to US tariffs" },
    conservative: { bottomLine: "Renegotiate the deal and grow our own economy so we need the US less.", what: "Poilievre's plan was to renegotiate Canada's trade deal with the US (CUSMA) early. He also wanted to remove trade barriers between Canadian provinces and grow Canada's oil and resource sector to be less dependent on any single trading partner.", source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/", sourceLabel: "Conservative plan for change" },
    ndp: { bottomLine: "Protect workers first - and don't trade away Canadian healthcare to get a deal.", what: "The NDP's main positions: Canadian healthcare must stay completely off the table in any trade agreement. They also wanted to make Employment Insurance easier to access for workers who lose jobs because of tariffs, and invest in Canadian-made products through a 'Buy Canadian' strategy.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP campaign commitments" },
    getPersonalized: (a) => {
      if (a.employment === 'Looking for work') return "The tariff situation is directly reducing job opportunities in Ontario right now - the province's financial watchdog projects 119,200 fewer jobs by 2026. Liberal government is directing tariff revenues to displaced workers. NDP wanted stronger EI for job losses.";
      if (a.income === 'Under $40k' || a.employment === 'Employed part-time') return "Tariffs make everyday goods more expensive - cars, appliances, and construction materials all cost more. Liberal government is using tariff revenue to support affected workers. All parties agreed Canada needs to rely on the US less.";
      if (a.student === 'In high school' || a.student === 'College/university' || a.student === 'Yes, college/university') return "The job market you graduate into will be shaped by how Canada handles this trade war. Liberals are building new trade relationships with Europe and Asia. Conservatives wanted to grow the resource sector. NDP focused on protecting workers during the transition.";
      return "Liberals are retaliating against US tariffs and directing the revenue to affected workers while diversifying trade. Conservatives planned to renegotiate the trade deal and grow resource exports. NDP focused on worker protections and keeping healthcare out of any trade negotiations.";
    }
  },
  privacy: {
    liberal: { bottomLine: "Introduced a privacy law in 2022 but hasn't passed it yet.", what: "The Liberals introduced Bill C-27 - a law that would give Canadians the right to see what data companies hold on them, delete it, and understand when AI is making decisions about their lives. But they introduced it in 2022 and it still hasn't passed into law by 2026.", source: "https://www.parl.ca/legisinfo/en/bill/44-1/c-27", sourceLabel: "Parliament of Canada - Bill C-27 status" },
    conservative: { bottomLine: "Focused on specific online harms - not broad privacy rights.", what: "Poilievre's platform focused on making specific online harms illegal - things like cyberbullying, sharing someone's private photos without consent, and child sexual abuse material. He didn't take a position on Bill C-27 or broader questions about who owns your data.", source: "https://pollenize.org/en/elections/canada-2025/pierre-poilievre/", sourceLabel: "Pollenize - Conservative platform summary" },
    ndp: { bottomLine: "Most vocal on tech accountability, but no specific data privacy law.", what: "The NDP were the most outspoken about tech companies having too much power - they wanted to crack down on AI-driven misinformation, regulate social media platforms more strongly, and create a foreign agent registry to stop foreign interference in Canadian democracy.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP campaign commitments" },
    getPersonalized: (a) => {
      if (a.student === 'In high school') return "No party made your digital privacy a real priority in 2025. Bill C-27 - which would let you delete your data from TikTok, Instagram and other platforms - has been sitting in Parliament since 2022 without passing. NDP was loudest on tech accountability but didn't win.";
      if (a.student === 'College/university' || a.student === 'Yes, college/university') return "None of the major parties made digital privacy a centrepiece in 2025. The law that would give you rights over your data (Bill C-27) is still not passed. NDP was most vocal about tech accountability and AI. Conservatives focused on specific crimes online.";
      return "All three parties fell short on digital privacy in 2025. Bill C-27 gives Canadians important rights - know what data is held about you, delete it, understand AI decisions - but it's still not law.";
    }
  }
};

function ResultsPage({ answers, selectedIssues, onContinue, onChat, onRestart }) {
  const [showNDP, setShowNDP] = useState(false);
  const selectedIssueLabels = issueOptions.filter(i => selectedIssues.includes(i.key)).map(i => i.label);
  const labelMap = {
    student: { 'College/university': 'college/university student', 'Yes, college/university': 'college/university student', 'In high school': 'high school student', 'Recently graduated': 'recent grad', 'Not a student': 'non-student' },
    employment: { 'Employed full-time': 'employed full-time', 'Employed part-time': 'employed part-time', 'Looking for work': 'looking for work', 'Not currently working': 'not currently working' },
    income: { 'Under $40k': 'under $40k income', '$40k-$75k': '$40k-$75k income', '$75k-$120k': '$75k-$120k income', 'Over $120k': 'over $120k income' },
    housing: { 'Renting': 'renter', 'Homeowner': 'homeowner', 'Living with family': 'living with family', 'Looking to buy': 'looking to buy' }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FEFEFE', padding: '0 20px 80px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', padding: '28px 0 16px' }}>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#444', marginBottom: '4px' }}>
            Your priorities: <span style={{ fontWeight: 500, color: '#2D6FD4' }}>{selectedIssueLabels.join(', ')}</span>
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#888' }}>
            Personalized for: {[labelMap.student[answers.student], labelMap.employment[answers.employment], labelMap.income[answers.income], labelMap.housing[answers.housing]].filter(Boolean).join(' - ')}
          </p>
        </div>

        <div style={{ background: '#7EB3FF', borderRadius: '14px', marginBottom: '20px', padding: '18px 22px' }}>
          <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: 'white', marginBottom: '4px' }}>Step 4 - Compare the Candidates</h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#D8EAFF', lineHeight: 1.6, fontStyle: 'italic' }}>Now that you understand how policies have shaped your world, here's what Carney and Poilievre actually propose to do about your priorities - in plain language.</p>
        </div>

        <div style={{ background: '#EEF4FF', border: '1px solid #C8DCFF', borderRadius: '12px', padding: '12px 18px', marginBottom: '20px' }}>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#2D4A8A', textAlign: 'center', lineHeight: 1.6 }}>
            These are official 2025 federal election platform positions. Carney won and is now PM. All positions sourced from party websites and CBC News.
          </p>
        </div>

        {selectedIssues.map(issueKey => {
          const comparison = candidateComparison[issueKey];
          const issueInfo = issueOptions.find(i => i.key === issueKey);
          if (!comparison || !issueInfo) return null;
          return (
            <HoverCard key={issueKey} style={{ marginBottom: '20px' }} padding="24px">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', background: '#EEF4FF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #C8DCFF' }}>
                  <IssueIcon issueKey={issueKey} size={18} color="#2D6FD4" />
                </div>
                <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '20px', fontWeight: 500, color: '#111' }}>{issueInfo.label}</h2>
              </div>
              <div style={{ background: '#FFF0F3', borderRadius: '12px', padding: '16px', marginBottom: '20px', border: '1px solid #F4B8C4' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, color: '#A3244A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>What this means for you</p>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#222', lineHeight: 1.75, fontStyle: 'italic' }}>{comparison.getPersonalized(answers)}</p>
              </div>
              <div style={{ borderLeft: '4px solid #FCA5A5', paddingLeft: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', fontWeight: 500, color: '#111' }}>Mark Carney - Liberal</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', background: '#FEE2E2', color: '#991B1B', padding: '2px 8px', borderRadius: '20px', fontWeight: 600 }}>Current PM</span>
                </div>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#666', fontStyle: 'italic', marginBottom: '8px' }}>{comparison.liberal.bottomLine}</p>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#333', lineHeight: 1.75, marginBottom: '8px' }}>{comparison.liberal.what}</p>
                <a href={comparison.liberal.source} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#7EB3FF', fontWeight: 500 }}>Source: {comparison.liberal.sourceLabel} ↗</a>
              </div>
              <div style={{ borderLeft: '4px solid #93C5FD', paddingLeft: '16px', marginBottom: showNDP ? '16px' : '0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', fontWeight: 500, color: '#111' }}>Pierre Poilievre - Conservative</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', background: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: '20px', fontWeight: 600 }}>Opposition Leader</span>
                </div>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#666', fontStyle: 'italic', marginBottom: '8px' }}>{comparison.conservative.bottomLine}</p>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#333', lineHeight: 1.75, marginBottom: '8px' }}>{comparison.conservative.what}</p>
                <a href={comparison.conservative.source} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#7EB3FF', fontWeight: 500 }}>Source: {comparison.conservative.sourceLabel} ↗</a>
              </div>
              {showNDP && (
                <div style={{ borderLeft: '4px solid #FCD34D', paddingLeft: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', fontWeight: 500, color: '#111' }}>NDP - New Democrats</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', background: '#FEF3C7', color: '#92400E', padding: '2px 8px', borderRadius: '20px', fontWeight: 600 }}>Lost party status 2025</span>
                  </div>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#666', fontStyle: 'italic', marginBottom: '8px' }}>{comparison.ndp.bottomLine}</p>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#333', lineHeight: 1.75, marginBottom: '8px' }}>{comparison.ndp.what}</p>
                  <a href={comparison.ndp.source} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#7EB3FF', fontWeight: 500 }}>Source: {comparison.ndp.sourceLabel} ↗</a>
                </div>
              )}
            </HoverCard>
          );
        })}

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <button onClick={() => setShowNDP(!showNDP)} style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#666', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            {showNDP ? 'Hide NDP positions' : 'Curious about other parties? See NDP positions'}
          </button>
          {showNDP && <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '12px', color: '#AAA', marginTop: '8px' }}>The NDP lost official party status in the April 2025 election. Jagmeet Singh resigned; Avi Lewis became leader in March 2026.</p>}
        </div>

        <HoverCard style={{ marginBottom: '20px' }} padding="24px">
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '18px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>Seen enough? Let's wrap this up.</h3>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#444', marginBottom: '16px', lineHeight: 1.7 }}>Get a plain-language summary of what you learned and your next steps.</p>
          <button onClick={onContinue} style={{ width: '100%', padding: '16px', borderRadius: '12px', fontFamily: "'Lora', Georgia, serif", fontSize: '15px', fontWeight: 500, background: '#7EB3FF', color: 'white', border: 'none', cursor: 'pointer', marginBottom: '12px', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#6BA3EF'}
            onMouseLeave={e => e.currentTarget.style.background = '#7EB3FF'}
          >
            See My Decision Summary
          </button>
          <button onClick={onChat} style={{ width: '100%', padding: '14px', borderRadius: '12px', fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#444', background: '#F6F6F6', border: '1px solid #E0E0E0', cursor: 'pointer' }}>
            Have questions? Talk to Talia or the candidates
          </button>
        </HoverCard>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <button onClick={onRestart} style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#AAA', background: 'none', border: 'none', cursor: 'pointer' }}>Start over</button>
        </div>
      </div>
    </div>
  );
}

function DecisionSummaryPage({ answers, selectedIssues, onChat, onRestart }) {
  const selectedIssueData = issueOptions.filter(i => selectedIssues.includes(i.key));
  const labelMap = {
    student: { 'College/university': 'college/university student', 'Yes, college/university': 'college/university student', 'In high school': 'high school student', 'Recently graduated': 'recent grad', 'Not a student': 'non-student' },
    employment: { 'Employed full-time': 'employed full-time', 'Employed part-time': 'employed part-time', 'Looking for work': 'looking for work', 'Not currently working': 'not currently working' },
    income: { 'Under $40k': 'under $40k', '$40k-$75k': '$40k-$75k', '$75k-$120k': '$75k-$120k', 'Over $120k': 'over $120k' },
    housing: { 'Renting': 'renter', 'Homeowner': 'homeowner', 'Living with family': 'living with family', 'Looking to buy': 'looking to buy' }
  };
  const issueAlignment = {
    housing: { renting: { note: "NDP was the only party that proposed national rent control." }, buying: { note: "Both Liberal and Conservative removed GST on new homes - Conservative went further." }, default: { note: "All parties promised major home construction increases." } },
    education: { student: { note: "NDP was the only party that promised to cancel student debt and pursue free tuition." }, default: { note: "NDP had the boldest education platform but lost the election." } },
    healthcare: { low_income: { note: "Liberal dental expansion is now in effect. NDP promised full pharmacare." }, default: { note: "Liberals expanded dental and pharmacare. NDP promised even more. Conservatives proposed nothing new." } },
    jobs: { low_wage: { note: "NDP's raised tax-free threshold helps low earners most. Liberal cut helps all workers somewhat." }, job_seeking: { note: "Liberal tariff revenue goes to affected workers. NDP wanted stronger EI for people between jobs." }, default: { note: "Both Liberal and Conservative delivered income tax cuts - Conservative's was larger." } },
    climate: { low_income: { note: "NDP's free home retrofit program would help low-income Canadians most." }, default: { note: "Liberals kept industrial carbon pricing and invested in clean energy. NDP went furthest. Conservatives would have scrapped all carbon rules." } },
    costoflife: { low_income: { note: "NDP's grocery caps and GST removal from essentials would help low earners most." }, renting: { note: "NDP removing GST from heating and internet directly cuts monthly bills for renters." }, default: { note: "Both parties cut taxes - Conservative's cut was larger but benefits higher earners more." } },
    canadaus: { job_seeking: { note: "Liberal tariff revenue goes to workers. NDP wanted stronger EI for displaced workers." }, default: { note: "All parties agreed Canada needs to diversify away from US dependence - different strategies." } },
    privacy: { default: { note: "No party made digital privacy a real priority in 2025. All fell short." } }
  };
  const getAlignment = (issueKey) => {
    const issue = issueAlignment[issueKey];
    if (!issue) return issue?.default;
    if (issueKey === 'housing' && answers.housing === 'Renting') return issue.renting;
    if (issueKey === 'housing' && (answers.housing === 'Looking to buy' || answers.housing === 'Living with family')) return issue.buying;
    if (issueKey === 'education' && (answers.student === 'College/university' || answers.student === 'Yes, college/university' || answers.student === 'In high school' || answers.student === 'Recently graduated')) return issue.student;
    if (issueKey === 'healthcare' && answers.income === 'Under $40k') return issue.low_income;
    if (issueKey === 'jobs' && answers.employment === 'Looking for work') return issue.job_seeking;
    if (issueKey === 'jobs' && (answers.employment === 'Employed part-time' || answers.income === 'Under $40k')) return issue.low_wage;
    if (issueKey === 'climate' && answers.income === 'Under $40k') return issue.low_income;
    if (issueKey === 'costoflife' && answers.income === 'Under $40k') return issue.low_income;
    if (issueKey === 'costoflife' && answers.housing === 'Renting') return issue.renting;
    if (issueKey === 'canadaus' && answers.employment === 'Looking for work') return issue.job_seeking;
    return issue.default;
  };
  const alignments = selectedIssues.map(key => ({ key, info: issueOptions.find(i => i.key === key), alignment: getAlignment(key) }));

  return (
    <div style={{ minHeight: '100vh', background: '#FEFEFE', padding: '0 20px 80px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ background: '#7EB3FF', borderRadius: '14px', margin: '20px 0', padding: '18px 22px' }}>
          <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '18px', fontWeight: 500, color: 'white', marginBottom: '6px' }}>Your Decision Summary</h2>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#D8EAFF', lineHeight: 1.6, fontStyle: 'italic' }}>Based on your priorities and profile, here's a plain-language summary of what you learned. This isn't "here's who to vote for." It's the information you need to decide for yourself.</p>
        </div>

        <HoverCard style={{ marginBottom: '16px' }} padding="24px">
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111', marginBottom: '12px' }}>Your profile</h3>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#333' }}>
            {[labelMap.student[answers.student], labelMap.employment[answers.employment], labelMap.income[answers.income] + ' income', labelMap.housing[answers.housing]].filter(Boolean).join(' · ')}
          </p>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#555', marginTop: '8px' }}>
            Your top priorities: {selectedIssueData.map(i => i.label).join(', ')}
          </p>
        </HoverCard>

        <HoverCard style={{ marginBottom: '16px' }} padding="24px">
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111', marginBottom: '6px' }}>How each candidate approaches your priorities</h3>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#888', marginBottom: '20px', fontStyle: 'italic' }}>Based on verified 2025 platform positions. No ranking - just the tradeoffs.</p>
          {alignments.map(({ key, info, alignment }) => (
            <div key={key} style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <IssueIcon issueKey={key} size={18} color="#2D6FD4" />
                <span style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 500, color: '#111', fontSize: '15px' }}>{info?.label}</span>
              </div>
              <div style={{ marginBottom: '8px', background: '#F6F6F6', borderRadius: '10px', padding: '12px' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, color: '#888', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Carney - Liberal</p>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#333', lineHeight: 1.6 }}>{candidateComparison[key]?.liberal?.bottomLine || 'See comparison page.'}</p>
              </div>
              <div style={{ background: '#F6F6F6', borderRadius: '10px', padding: '12px', marginBottom: '8px' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, color: '#888', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Poilievre - Conservative</p>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#333', lineHeight: 1.6 }}>{candidateComparison[key]?.conservative?.bottomLine || 'See comparison page.'}</p>
              </div>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '12px', color: '#AAA', fontStyle: 'italic', lineHeight: 1.6 }}>{alignment?.note}</p>
            </div>
          ))}
        </HoverCard>

        <div style={{ background: '#F6F6F6', borderRadius: '16px', padding: '24px', marginBottom: '16px', border: '1px solid #E8E8E8' }}>
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111', marginBottom: '12px' }}>Questions to ask yourself</h3>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#333', lineHeight: 1.75, marginBottom: '8px' }}>- Which candidate's approach to your top issue feels more realistic and specific?</p>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#333', lineHeight: 1.75, marginBottom: '8px' }}>- Are there tradeoffs you're willing to accept on lower-priority issues to get what you want on your top one?</p>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#333', lineHeight: 1.75, marginBottom: '16px' }}>- Does your local candidate's position on these issues matter to you as much as the party leader's?</p>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#AAA', fontStyle: 'italic' }}>There is no right answer. Politics is about tradeoffs and only you know which ones matter most in your life.</p>
        </div>

        <HoverCard style={{ marginBottom: '16px' }} padding="24px">
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111', marginBottom: '16px' }}>What now?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { href: 'https://www.registertovoteon.ca/', label: 'Register to vote (Ontario)', sub: 'Takes 2 minutes - registertovoteon.ca', blue: true },
              { href: 'https://www.elections.ca/content.aspx?section=vot&dir=reg/etr&document=index&lang=e', label: 'Register to vote (Federal)', sub: 'elections.ca', blue: true },
              { href: 'https://www.elections.on.ca/en/voting-in-ontario/electoral-districts.html', label: 'Find your riding', sub: 'Your local candidate matters too', blue: false },
            ].map(item => (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '12px', background: item.blue ? '#EEF4FF' : '#F6F6F6', textDecoration: 'none', border: '1px solid ' + (item.blue ? '#C8DCFF' : '#E8E8E8') }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.blue ? '#2D6FD4' : '#7EB3FF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <div>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 500, fontSize: '14px', color: '#111' }}>{item.label}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#666' }}>{item.sub}</p>
                </div>
              </a>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '12px', background: '#F6F6F6', border: '1px solid #E8E8E8' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7EB3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              <div>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 500, fontSize: '14px', color: '#111' }}>Ontario's next provincial election</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#666' }}>June 5, 2029 - put it in your calendar</p>
              </div>
            </div>
          </div>
        </HoverCard>

        <HoverCard style={{ marginBottom: '16px' }} padding="24px">
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>Still have questions?</h3>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#444', marginBottom: '16px', lineHeight: 1.7 }}>Talk to Talia - our neutral civic expert - or ask the AI versions of the candidates directly. All responses are sourced.</p>
          <button onClick={onChat} style={{ width: '100%', padding: '16px', borderRadius: '12px', fontFamily: "'Lora', Georgia, serif", fontSize: '14px', fontWeight: 500, background: '#7EB3FF', color: 'white', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#6BA3EF'}
            onMouseLeave={e => e.currentTarget.style.background = '#7EB3FF'}
          >
            Talk to Talia or the candidates
          </button>
        </HoverCard>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <button onClick={onRestart} style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#AAA', background: 'none', border: 'none', cursor: 'pointer' }}>Start over</button>
        </div>
      </div>
    </div>
  );
}

function ChatPage({ answers, selectedIssues, onBack, onRestart }) {
  const [mode, setMode] = useState('talia');
  const [messages, setMessages] = useState({ talia: [], carney: [], poilievre: [] });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [loadingMode, setLoadingMode] = useState(null);
  const messagesEndRef = React.useRef(null);

  const selectedIssueLabels = selectedIssues && selectedIssues.length > 0
    ? issueOptions.filter(i => selectedIssues.includes(i.key)).map(i => i.label).join(', ')
    : 'Not selected yet';
  const profileSummary = answers ? `${answers.student}, ${answers.employment}, ${answers.income} income, ${answers.housing}` : 'Not provided';

  const systemPrompts = {
    talia: `You are Talia, a neutral and friendly Canadian civic education guide built into Tallied - a civic tech tool aimed at Gen Z Ontario voters. You are NOT affiliated with any political party. You have a warm, clear, and direct tone - you speak like a knowledgeable friend, not a textbook.

RULES:
- Be completely neutral - never favour any party or candidate
- Explain things clearly in plain language - you're talking to young Canadians, many of whom are voting or engaging with politics for the first time
- If asked who to vote for: "That's genuinely not my call to make - my job is to give you what you need to decide for yourself."
- Do NOT use em dashes. Use a hyphen (-) or a new sentence instead
- Do NOT use emojis
- Do NOT use markdown stars or bold formatting
- Separate each paragraph with a blank line
- For lists use a hyphen (-) at the start of each item
- Keep each paragraph to 2-3 sentences max
- Keep responses focused - 2-4 paragraphs max
- If you cite a specific fact, end with: SOURCES: [Label](URL) | [Label](URL)
- If asked whether you might be wrong: "Good question - I always try to be accurate but cross-reference with elections.ca or canada.ca to be sure."
- Topics: how voting works, ridings, Parliament, bills, how policies become law, party differences, registering to vote, political history, recent political news, what Tallied is and how to use it

User profile: ${profileSummary}
Priority issues: ${selectedIssueLabels}`,

    carney: `You are an AI simulation of Mark Carney based on his verified 2025 Liberal Party platform. You are NOT the real Mark Carney. Speak in first person, warmly and clearly. You are talking to a Canadian voter - do not assume it is their first time voting.

RULES:
- Only make claims grounded in the verified 2025 Liberal platform
- Never tell the user who to vote for
- Never speak negatively about other politicians as people - contrast policies only on substance
- If asked about personal feelings, regrets, or private opinions: say "I keep my personal reflections private - what I can speak to is my platform and what I plan to do for Canadians"
- If asked about the other candidate negatively: say "I'll let my platform speak for itself - here is what I am proposing on that issue"
- Do NOT use em dashes. Use a hyphen (-) or a new sentence instead
- Do NOT use emojis
- Do NOT use markdown stars or bold formatting
- Separate each paragraph with a blank line
- Keep each paragraph to 2-3 sentences max
- Keep responses focused - 2-4 short paragraphs max
- Never make up policies or numbers
- For specific verifiable claims end with: SOURCES: [Label](URL) | [Label](URL)

User profile: ${profileSummary}
Priority issues: ${selectedIssueLabels}

Verified Liberal platform positions:
- Housing: 500,000 homes/year, GST removed for first-time buyers under $1M saving up to $50,000 - source: https://www.pm.gc.ca/en/news/news-releases/2025/03/20/prime-minister-mark-carney-will-eliminate-gst-for-first-time-homebuyers
- Tax: Middle class tax cut saving dual-income families up to $825/year - source: https://liberal.ca/mark-carneys-liberals-take-action-to-make-life-more-affordable/
- Climate: Consumer carbon tax cancelled March 2025, industrial pricing kept, clean energy investment - source: https://liberal.ca/cstrong/build/
- Healthcare: Dental expanded to ages 18-64, pharmacare for insulin and contraception, $4B for clinics - source: https://liberal.ca/cstrong/build/
- Trade: Retaliatory tariffs on US goods, tariff revenue directed to affected workers - source: https://www.canada.ca/en/department-finance/news/2025/03/canada-responds-to-unjustified-us-tariffs-on-canadian-steel-and-aluminum-products.html
- Education: Apprenticeship training costs covered up to $8,000. No post-secondary tuition promises in 2025 platform.`,

    poilievre: `You are an AI simulation of Pierre Poilievre based on his verified 2025 Conservative Party platform. You are NOT the real Pierre Poilievre. Speak in first person, directly and clearly. You are talking to a Canadian voter - do not assume it is their first time voting.

RULES:
- Only make claims grounded in the verified 2025 Conservative platform
- Never tell the user who to vote for
- Never speak negatively about other politicians as people - contrast policies only on substance
- If asked about personal feelings, regrets, or private opinions: say "I keep my personal life separate from my platform - what I can tell you is what I plan to do for Canadians"
- Do NOT use em dashes. Use a hyphen (-) or a new sentence instead
- Do NOT use emojis
- Do NOT use markdown stars or bold formatting
- Separate each paragraph with a blank line
- Keep each paragraph to 2-3 sentences max
- Keep responses focused - 2-4 short paragraphs max
- Never make up policies or numbers
- For specific verifiable claims end with: SOURCES: [Label](URL) | [Label](URL)

User profile: ${profileSummary}
Priority issues: ${selectedIssueLabels}

Verified Conservative platform positions:
- Housing: 2.3 million homes in 5 years, GST removed on ALL new homes under $1.3M, sell federal land, reward cities that permit 15% more homes - source: https://www.conservative.ca/poilievre-unveils-his-plan-for-change/
- Tax: Income tax cut saving average worker $900/year, families $1,800/year - source: https://www.conservative.ca/poilievre-unveils-his-plan-for-change/
- Climate: Cancel all carbon pricing including industrial, technology-only approach, more resource development - source: https://www.conservative.ca/poilievre-announces-new-canada-first-economic-action-plan/
- Healthcare: No major new spending, focus on system efficiency - source: https://www.conservative.ca/poilievre-unveils-his-plan-for-change/
- Trade: Early CUSMA renegotiation, remove internal trade barriers, resource sector expansion - source: https://www.conservative.ca/poilievre-unveils-his-plan-for-change/
- Education: Income-contingent student loan repayment, interest on student lines of credit tax-deductible - source: https://universityaffairs.ca/news/where-do-the-federal-election-candidates-stand-on-postsecondary-education/`
  };

  const modeConfig = {
    talia: {
      label: 'Talia',
      Avatar: () => <TaliaAvatar size={24} />,
      badge: 'Neutral civic guide',
      badgeBg: '#EEF4FF', badgeText: '#2D4A8A',
      bubbleBg: '#F5F9FF', bubbleBorder: '#C8DCFF',
      placeholder: 'Ask Talia anything about how Canadian politics works...',
      intro: "Hey, I'm Talia - Tallied's neutral civic guide. I can explain how Canadian politics and government works, walk you through what you've seen on this site, or answer anything you're still unsure about. No agenda, just answers. What's on your mind?"
    },
    carney: {
      label: 'Mark Carney',
      Avatar: () => <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontSize: '8px', fontWeight: 700, color: '#991B1B' }}>MC</div>,
      badge: 'Liberal - Current PM',
      badgeBg: '#FEE2E2', badgeText: '#991B1B',
      bubbleBg: '#FEF2F2', bubbleBorder: '#FECACA',
      placeholder: 'Ask Mark Carney anything about his platform...',
      intro: "I'm an AI simulation of Mark Carney, based on his verified 2025 Liberal platform. Ask me about housing, healthcare, climate, jobs, or anything else in my platform. I'll be straight with you about what I have and have not committed to. What's on your mind?"
    },
    poilievre: {
      label: 'Pierre Poilievre',
      Avatar: () => <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontSize: '8px', fontWeight: 700, color: '#1E40AF' }}>PP</div>,
      badge: 'Conservative - Opposition',
      badgeBg: '#DBEAFE', badgeText: '#1E40AF',
      bubbleBg: '#EFF6FF', bubbleBorder: '#BFDBFE',
      placeholder: 'Ask Pierre Poilievre anything about his platform...',
      intro: "I'm an AI simulation of Pierre Poilievre, based on his verified 2025 Conservative platform. Ask me about housing, jobs, affordability, trade, or anything else in my platform. I will tell you what I would do differently and where the evidence comes from. What do you want to know?"
    }
  };

  const config = modeConfig[mode];
  const currentMessages = messages[mode];

  React.useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, mode]);

  const parseResponse = (text) => {
    const sourceMatch = text.match(/SOURCES:([\s\S]+)$/m);
    const mainText = sourceMatch ? text.replace(/SOURCES:[\s\S]+$/m, '').trim() : text.trim();
    const sources = [];
    if (sourceMatch) {
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let match;
      while ((match = linkRegex.exec(sourceMatch[1])) !== null) sources.push({ label: match[1], url: match[2] });
    }
    const cleanBody = mainText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => { sources.push({ label, url }); return label; });
    return { text: cleanBody.trim(), sources };
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: 'user', content: input.trim() };
    const updatedMessages = [...currentMessages, userMessage];
    setMessages(prev => ({ ...prev, [mode]: updatedMessages }));
    setInput('');
    setLoading(true);
    setLoadingMode(mode);
    setLoadingError(null);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: systemPrompts[mode], messages: updatedMessages.map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await response.json();
      const rawText = data.content?.[0]?.text;
      if (!rawText) { setLoadingError("Couldn't get a response - please try again"); setLoading(false); return; }
      const cleaned = renderMarkdown(rawText);
      const parsed = parseResponse(cleaned);
      setMessages(prev => ({ ...prev, [mode]: [...updatedMessages, { role: 'assistant', content: parsed.text, sources: parsed.sources }] }));
      setLoadingError(null);
    } catch (err) {
      setLoadingError("Network error - please check your connection and try again");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const ModeTab = ({ modeKey, cfg, small }) => (
    <button
      onClick={() => setMode(modeKey)}
      style={{
        padding: small ? '5px 8px' : '8px 8px',
        borderRadius: '10px', textAlign: 'center',
        fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500,
        border: modeKey === mode ? '1.5px solid #7EB3FF' : '1px solid #E0E0E0',
        background: modeKey === mode ? '#7EB3FF' : 'white',
        color: modeKey === mode ? 'white' : '#444',
        cursor: 'pointer', transition: 'all 0.15s',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
      }}
    >
      <cfg.Avatar />
      {cfg.label}
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#FEFEFE', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #E8E8E8', padding: '12px 20px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <button onClick={onBack} style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#7EB3FF', background: 'none', border: 'none', cursor: 'pointer' }}>← Back</button>
            <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111' }}>Tallied</span>
            <button onClick={onRestart} style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#AAA', background: 'none', border: 'none', cursor: 'pointer' }}>Start over</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {Object.entries(modeConfig).map(([key, cfg]) => <ModeTab key={key} modeKey={key} cfg={cfg} small={false} />)}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%', padding: '10px 20px 4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: config.badgeBg, color: config.badgeText }}>{config.badge}</span>
        </div>
        <div style={{ background: '#FFF0F3', border: '1px solid #F4B8C4', borderRadius: '10px', padding: '10px 14px' }}>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '11px', color: '#7A1A34', lineHeight: 1.55, fontStyle: 'italic' }}>
            {mode === 'talia' ? "Talia is an AI civic guide, not a human expert. Always verify important facts with official sources like elections.ca or canada.ca." : "This is an AI simulation based on verified 2025 platform positions only. It is not the real candidate. Always cross-reference with official sources before making voting decisions."}
          </p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: config.bubbleBg, border: `1px solid ${config.bubbleBorder}`, borderRadius: '14px', borderTopLeftRadius: '3px', padding: '16px', maxWidth: '80%' }}>
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#111', lineHeight: 1.75 }}>{config.intro}</p>
          </div>

          {currentMessages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '80%',
                background: msg.role === 'user' ? '#7EB3FF' : config.bubbleBg,
                border: msg.role === 'user' ? 'none' : `1px solid ${config.bubbleBorder}`,
                borderRadius: '14px',
                borderTopRightRadius: msg.role === 'user' ? '3px' : '14px',
                borderTopLeftRadius: msg.role === 'user' ? '14px' : '3px',
                padding: '16px',
              }}>
                <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', lineHeight: 1.75, color: msg.role === 'user' ? 'white' : '#111' }}>
                  {msg.role === 'assistant'
                    ? renderMarkdown(msg.content).split('\n').filter(l => l.trim()).map((line, li) => <p key={li} style={{ marginBottom: '8px' }}>{line}</p>)
                    : <p>{msg.content}</p>
                  }
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#888', marginBottom: '6px', fontWeight: 600 }}>Sources:</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {msg.sources.map((src, si) => (
                        <a key={si} href={src.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', background: '#EEF4FF', color: '#2D6FD4', padding: '3px 8px', borderRadius: '20px', border: '1px solid #C8DCFF', textDecoration: 'none' }}>
                          {src.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && loadingMode === mode && (
            <div style={{ background: config.bubbleBg, border: `1px solid ${config.bubbleBorder}`, borderRadius: '14px', borderTopLeftRadius: '3px', padding: '16px', maxWidth: '80px' }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0, 150, 300].map(delay => <div key={delay} style={{ width: '8px', height: '8px', background: '#AAA', borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: `${delay}ms` }} />)}
              </div>
            </div>
          )}
          {loadingError && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#991B1B' }}>{loadingError}</p>
                <button onClick={() => setLoadingError(null)} style={{ color: '#F87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>×</button>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div style={{ background: 'white', borderTop: '1px solid #E8E8E8', padding: '8px 20px 14px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '10px' }}>
            {Object.entries(modeConfig).map(([key, cfg]) => <ModeTab key={key} modeKey={key} cfg={cfg} small={true} />)}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder={config.placeholder} disabled={loading}
              style={{ flex: 1, border: '1px solid #E0E0E0', borderRadius: '10px', padding: '12px 16px', fontFamily: "'Lora', Georgia, serif", fontSize: '15px', outline: 'none', background: '#F8F8F8', color: '#222' }}
            />
            <button
              onClick={sendMessage} disabled={!input.trim() || loading}
              style={{ padding: '12px 20px', borderRadius: '10px', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', background: input.trim() && !loading ? '#7EB3FF' : '#E0E0E0', color: input.trim() && !loading ? 'white' : '#AAA', transition: 'all 0.15s' }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyPage({ onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: '#FEFEFE', padding: '48px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <button onClick={onBack} style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#7EB3FF', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '24px', display: 'block' }}>← Back</button>
        <div style={{ background: 'white', borderRadius: '16px', padding: '32px', marginBottom: '20px', border: '1px solid #E0E0E0' }}>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '26px', fontWeight: 500, color: '#111', marginBottom: '6px' }}>Privacy and Terms</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#AAA', marginBottom: '28px' }}>Last updated: April 2026</p>
          {[
            { title: "What Tallied is", body: "Tallied is a civic education tool built by Ivana Okpakovwodo as a student project. It is designed to help Ontario residents understand how political policies affect their lives. It is not affiliated with any political party, candidate, or government body." },
            { title: "What data we collect", body: "Tallied does not create accounts or store your personal information. The profile questions you answer exist only in your browser session and are not saved to any database. When you close or refresh the page, this information is gone. Chat conversations are processed through Anthropic's API. We do not store or review your chat conversations. Anthropic's privacy policy applies to those interactions." },
            { title: "About the AI chatbot", body: "The candidate simulations are AI-generated based on verified 2025 federal election platform positions. They are not real people and do not represent the actual views of these politicians beyond their documented platforms. Talia is a neutral AI civic guide, not a human. Always cross-reference with official sources before making voting decisions." },
            { title: "Content accuracy", body: "All policy content is sourced from official government websites, party platforms, and credible news outlets. Sources are linked throughout. Information may become outdated as policies change. Tallied is for educational purposes only." },
            { title: "Non-partisan commitment", body: "Tallied presents information about multiple political parties and candidates equally. It does not endorse any party, candidate, or political position. The tool is designed to inform, not persuade." },
            { title: "Contact", body: "This is a student project submitted as part of a TKS Focus project, April 2026." },
          ].map(section => (
            <div key={section.title} style={{ marginBottom: '24px' }}>
              <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>{section.title}</h2>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#333', lineHeight: 1.75 }}>{section.body}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={onBack} style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#AAA', background: 'none', border: 'none', cursor: 'pointer' }}>Back to Tallied</button>
        </div>
      </div>
    </div>
  );
}

export default App;