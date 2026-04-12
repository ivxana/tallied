import React, { useState } from 'react';

// ─── Image URLs (Unsplash) ────────────────────────────────────────────────────
const IMGS = {
  landing:    '/images/landing.jpg',
  housing:    '/images/housing.jpg',
  education:  '/images/education.jpg',
  healthcare: '/images/healthcare.jpg',
  jobs:       '/images/jobs.jpg',
  climate:    '/images/climate.jpg',
  costoflife: '/images/costoflife.jpg',
  canadaus:   '/images/canadaus.jpg',
  privacy:    '/images/privacy.jpg',
  carney:     'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Mark_Carney_2024.jpg/440px-Mark_Carney_2024.jpg',
  poilievre:  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Pierre_Poilievre_2022.jpg/440px-Pierre_Poilievre_2022.jpg',
};

// ─── Policy data ──────────────────────────────────────────────────────────────
const policies = [
  {
    id: 1, title: "Rent Control Removed for New Units", year: "2018",
    tag: "Housing", issueKey: "housing", img: IMGS.housing,
    plain: "Ontario removed rent control on units first occupied after Nov 15, 2018. Landlords of newer units can raise rent by any amount between tenancies.",
    getImpact: (a) => {
      if (a.housing === 'Homeowner') return "This has driven up property values as rental properties in newer buildings became more profitable for landlords.";
      if (a.housing === 'Living with family') return "When you move out, check if your unit was built after November 2018. If so, your landlord can raise rent by any amount - no legal cap.";
      if (a.housing === 'Looking to buy') return "Rental properties became more profitable investments, contributing to higher real estate prices overall.";
      return "If your unit was first occupied after Nov 15, 2018, your landlord can raise rent by any amount between tenancies - there is no legal limit.";
    },
    link: "https://www.ontario.ca/page/renting-ontario-your-rights", linkLabel: "Know your tenant rights",
    source: "Ontario Residential Tenancies Act"
  },
  {
    id: 2, title: "OSAP Grant Cuts - 85% to 25%", year: "2026",
    tag: "Education", issueKey: "education", img: IMGS.education,
    plain: "Starting Fall 2026, OSAP grants drop from 85% to 25% of your aid. At least 75% becomes repayable loans. The 7-year tuition freeze also ends.",
    getImpact: (a) => {
      if (a.student === 'In high school') return "When you start university, a $20,000 aid package that used to give $17,000 in free grants now gives only $5,000. You'll graduate with far more debt than students a year ahead of you.";
      if (a.student === 'College/university' || a.student === 'Yes, college/university') return "Starting Fall 2026, at least 75% of your OSAP becomes loans, not grants. The average Ontario grad already carries $30,800 in debt - this pushes that higher.";
      if (a.student === 'Recently graduated') return "You got out just in time. Students starting Fall 2026 face a dramatically worse OSAP system - grants dropping from 85% to 25%.";
      return "Anyone with family heading to university in Ontario will be hit hard. What was mostly free grant money becomes mostly debt.";
    },
    link: "https://www.ontario.ca/page/learn-about-osap", linkLabel: "Learn more about OSAP",
    source: "CBC News, Feb 12 2026"
  },
  {
    id: 3, title: "OHIP+ - Free Prescriptions Changed", year: "2019",
    tag: "Healthcare", issueKey: "healthcare", img: IMGS.healthcare,
    plain: "OHIP+ originally gave free prescriptions to everyone under 25. In 2019, Ford changed it so private insurance pays first - OHIP+ only covers what's left.",
    getImpact: (a) => {
      if (a.student === 'College/university' || a.student === 'Yes, college/university') return "If you're on a parent's plan or your school's health plan, OHIP+ no longer covers you first. You pay whatever your private plan doesn't cover.";
      if (a.student === 'In high school') return "If you're not covered by any private plan, OHIP+ still covers your prescriptions free. But if you're on a parent's work benefits plan, that goes first.";
      return "The 2019 change means OHIP+ is now secondary. If you're under 25 with any private coverage, your prescriptions may no longer be fully free.";
    },
    link: "https://www.ontario.ca/page/learn-about-ohip-plus", linkLabel: "Check OHIP+ eligibility",
    source: "Ontario Ministry of Health"
  },
  {
    id: 4, title: "Ontario Minimum Wage Increases", year: "2022-2024",
    tag: "Jobs & Economy", issueKey: "jobs", img: IMGS.jobs,
    plain: "Minimum wage rose from $15/hr in 2022 to $17.20/hr in 2024. But the GTA living wage is $23-25/hr - full-time minimum wage still doesn't cover rent.",
    getImpact: (a) => {
      if (a.student === 'In high school' || a.student === 'College/university' || a.student === 'Yes, college/university') return "Most student jobs pay at or near minimum wage. At $17.20/hr working 20 hours a week you're making ~$17,900/year. Still far below the $23-25/hr GTA living wage.";
      if (a.employment === 'Employed part-time' || a.income === 'Under $40k') return "The jump to $17.20/hr means ~$4,000/year more at full-time hours. But inflation eroded much of that gain - groceries, rent, and transit all went up too.";
      return "Ontario's minimum wage is still significantly below the GTA living wage of $23-25/hr, meaning many workers around you are still cost-burdened.";
    },
    link: "https://www.ontario.ca/document/your-guide-employment-standards-act-0/minimum-wage", linkLabel: "Ontario minimum wage info",
    source: "Ontario Ministry of Labour"
  },
  {
    id: 5, title: "Carbon Tax - Introduced then Cancelled", year: "2019-2025",
    tag: "Climate", issueKey: "climate", img: IMGS.climate,
    plain: "Canada introduced a carbon tax in 2019. Ontario residents got ~$560/year in rebates. Carney cancelled the consumer carbon tax in March 2025 - ending both the tax and the rebates.",
    getImpact: (a) => {
      if (a.income === 'Under $40k') return "When it existed, you were likely getting more back in rebates ($560/year) than you paid in extra costs. Now both the tax and rebate are gone.";
      if (a.student === 'In high school' || a.student === 'College/university' || a.student === 'Yes, college/university') return "As a student, the carbon tax rebate was likely more than you paid in costs. Both are gone now. The bigger question: what replaces it for climate action?";
      return "Both the carbon tax and the $560/year Ontario rebate are gone. The debate now shifts to what replaces it as Canada's main climate tool.";
    },
    link: "https://www.canada.ca/en/environment-climate-change/services/climate-change/pricing-pollution-how-it-will-work.html", linkLabel: "Canadian climate policy",
    source: "Environment and Climate Change Canada"
  },
  {
    id: 6, title: "Bank of Canada Interest Rate Hikes", year: "2022-2023",
    tag: "Cost of Living", issueKey: "costoflife", img: IMGS.costoflife,
    plain: "To fight 8.1% inflation, the Bank of Canada raised rates 10 times - from 0.25% to 5%. Mortgages, car loans, and lines of credit became far more expensive.",
    getImpact: (a) => {
      if (a.housing === 'Renting') return "Higher rates pushed more buyers out, putting pressure on rentals. If your rent increased after 2022, this is part of why. Ontario vacancy rates hit historic lows.";
      if (a.housing === 'Looking to buy') return "In 2020, mortgages were under 2%. By 2023, over 6%. On a $500k mortgage, that's $1,200/month more. Many first-time buyers were priced out entirely.";
      if (a.housing === 'Homeowner') return "If you renewed your mortgage after 2022, you likely saw a significant jump. About 45% of Ontario mortgage holders will face renewal shock by end of 2026.";
      return "Rate hikes made borrowing more expensive across the board. Rates have since dropped to 2.25% (March 2026) but the effects are still rippling through.";
    },
    link: "https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/", linkLabel: "Bank of Canada rate history",
    source: "Bank of Canada / CMHC"
  },
  {
    id: 7, title: "US Tariffs on Canadian Steel and Autos", year: "2025",
    tag: "Canada-US Relations", issueKey: "canadaus", img: IMGS.canadaus,
    plain: "The US imposed 25% tariffs on Canadian steel, aluminum, and cars in 2025. Ontario's Financial Accountability Office projects 119,200 fewer jobs in Ontario by 2026.",
    getImpact: (a) => {
      if (a.employment === 'Looking for work') return "Manufacturing, auto, and trades jobs are most at risk. The FAO projects 119,200 fewer Ontario jobs by 2026. Timing couldn't be worse for job seekers.";
      if (a.student === 'In high school' || a.student === 'College/university' || a.student === 'Yes, college/university') return "The job market you graduate into will be shaped by how this trade war plays out. Manufacturing and engineering roles face the most uncertainty.";
      return "Even if your job isn't in manufacturing, tariffs raise prices on goods with steel and aluminum - cars, appliances, construction materials. Ontario's GDP could drop 1.8% by 2026.";
    },
    link: "https://fao-on.org/en/report/impacts-of-us-tariffs/", linkLabel: "Read the FAO tariff report",
    source: "Ontario Financial Accountability Office, April 2025"
  },
  {
    id: 8, title: "Bill C-27 - Your Digital Privacy Rights", year: "2022-present",
    tag: "Privacy & Tech", issueKey: "privacy", img: IMGS.privacy,
    plain: "Bill C-27 would give Canadians the right to delete their data and require companies to explain AI decisions affecting them. Introduced in 2022 - still not passed.",
    getImpact: (a) => {
      if (a.student === 'In high school') return "This law would give you stronger rights to delete your data from TikTok, Instagram, and other platforms. It's been sitting in Parliament since 2022 without passing.";
      if (a.student === 'College/university' || a.student === 'Yes, college/university') return "Bill C-27 would give you the right to know when AI is making decisions about you - loan approvals, job screening, etc. Still not law four years later.";
      return "Bill C-27 would let Canadians see what data companies hold, delete it, and understand AI decisions affecting their lives. Data breaches tripled between 2013 and 2022.";
    },
    link: "https://www.parl.ca/legisinfo/en/bill/44-1/c-27", linkLabel: "Read about Bill C-27",
    source: "Parliament of Canada"
  }
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const IssueIcon = ({ issueKey, size = 18, color = '#7EB3FF' }) => {
  const s = { width: size, height: size, strokeWidth: 1.75, fill: 'none', stroke: color, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (issueKey === 'housing')    return <svg style={s} viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
  if (issueKey === 'education')  return <svg style={s} viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
  if (issueKey === 'healthcare') return <svg style={s} viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
  if (issueKey === 'jobs')       return <svg style={s} viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
  if (issueKey === 'climate')    return <svg style={s} viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>;
  if (issueKey === 'costoflife') return <svg style={s} viewBox="0 0 24 24"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;
  if (issueKey === 'canadaus')   return <svg style={s} viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>;
  if (issueKey === 'privacy')    return <svg style={s} viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
  return null;
};

const TalliedLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="4" y="4" width="68" height="68" rx="14" fill="#7EB3FF"/>
    <polyline points="18,46 34,62 46,50" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="34,62 84,12" stroke="#A3244A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const issueOptions = [
  { key: 'housing',    label: 'Housing & Affordability',  description: 'Rent, home prices, tenant rights',        img: IMGS.housing },
  { key: 'education',  label: 'Education & Student Debt',  description: 'Tuition, OSAP, student loans',            img: IMGS.education },
  { key: 'healthcare', label: 'Healthcare & Mental Health',description: 'Wait times, prescriptions, access',       img: IMGS.healthcare },
  { key: 'jobs',       label: 'Jobs & Economy',            description: 'Wages, employment, cost of living',       img: IMGS.jobs },
  { key: 'climate',    label: 'Climate & Environment',     description: 'Carbon policy, green jobs, emissions',    img: IMGS.climate },
  { key: 'costoflife', label: 'Cost of Living',            description: 'Inflation, interest rates, affordability',img: IMGS.costoflife },
  { key: 'canadaus',   label: 'Canada-US Relations',       description: 'Tariffs, sovereignty, trade',             img: IMGS.canadaus },
  { key: 'privacy',    label: 'Privacy & Tech',            description: 'Data rights, AI, digital safety',         img: IMGS.privacy },
];

// eslint-disable-next-line no-unused-vars
function renderMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/^#{1,3}\s+/gm, '').trim();
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar({ currentStep, onNavigate }) {
  const steps = [
    { key: 'form', label: 'Profile' },
    { key: 'priorities', label: 'Priorities' },
    { key: 'policies', label: 'Policies' },
    { key: 'results', label: 'Comparison' },
    { key: 'summary', label: 'Summary' },
    { key: 'chat', label: 'Chat' },
  ];
  const order = steps.map(s => s.key);
  const currentIdx = order.indexOf(currentStep);
  return (
    <div style={{ background: '#FEFEFE', borderBottom: '1px solid #E8E8E8', padding: '10px 20px', position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => onNavigate('landing')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <TalliedLogo size={26} />
          <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111' }}>Tallied</span>
        </button>
        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
          {steps.map((s, i) => (
            <button key={s.key} onClick={() => i <= currentIdx && onNavigate(s.key)}
              style={{ fontSize: '9px', padding: '3px 7px', borderRadius: '20px', border: 'none', cursor: i <= currentIdx ? 'pointer' : 'default', fontFamily: "'Inter', sans-serif", fontWeight: s.key === currentStep ? 600 : 400, background: s.key === currentStep ? '#7EB3FF' : 'transparent', color: s.key === currentStep ? 'white' : i < currentIdx ? '#7EB3FF' : '#BBB' }}>
              {s.label}
            </button>
          ))}
          <button onClick={() => onNavigate('privacy')} style={{ fontSize: '9px', padding: '3px 7px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: 400, background: 'transparent', color: '#BBB' }}>Privacy</button>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [userAnswers, setUserAnswers] = useState(null);
  const [selectedIssues, setSelectedIssues] = useState([]);

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
      @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
      .tl-fade   { animation: fadeUp 0.6s ease both; }
      .tl-fade-1 { animation: fadeUp 0.6s ease 0.15s both; }
      .tl-fade-2 { animation: fadeUp 0.6s ease 0.3s both; }
      .tl-fade-3 { animation: fadeUp 0.6s ease 0.45s both; }
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

  if (currentStep === 'landing') return <LandingPage onStart={() => setCurrentStep('form')} onPrivacy={() => setCurrentStep('privacy')} />;
  if (currentStep === 'form') return (
    <><NavBar currentStep={currentStep} onNavigate={navigate} />
    <PersonalizationForm existingAnswers={userAnswers}
      onComplete={(answers) => { setUserAnswers(answers); setCurrentStep('priorities'); }} /></>
  );
  if (currentStep === 'priorities') return (
    <><NavBar currentStep={currentStep} onNavigate={navigate} />
    <PrioritiesPage existingIssues={selectedIssues}
      onComplete={(issues) => { setSelectedIssues(issues); setCurrentStep('policies'); }} /></>
  );
  if (currentStep === 'policies') return (
    <><NavBar currentStep={currentStep} onNavigate={navigate} />
    <PoliciesPage answers={userAnswers} selectedIssues={selectedIssues} onComplete={() => setCurrentStep('results')} /></>
  );
  if (currentStep === 'results') return (
    <><NavBar currentStep={currentStep} onNavigate={navigate} />
    <ResultsPage answers={userAnswers} selectedIssues={selectedIssues} onContinue={() => setCurrentStep('summary')} onRestart={() => navigate('landing')} /></>
  );
  if (currentStep === 'summary') return (
    <><NavBar currentStep={currentStep} onNavigate={navigate} />
    <DecisionSummaryPage answers={userAnswers} selectedIssues={selectedIssues} onChat={() => setCurrentStep('chat')} onRestart={() => navigate('landing')} /></>
  );
  if (currentStep === 'chat') return (
    <><NavBar currentStep={currentStep} onNavigate={navigate} />
    <ChatPage answers={userAnswers} selectedIssues={selectedIssues} onRestart={() => navigate('landing')} /></>
  );
  if (currentStep === 'privacy') return (
    <><NavBar currentStep={currentStep} onNavigate={navigate} />
    <PrivacyPage onBack={() => navigate('landing')} /></>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage({ onStart, onPrivacy }) {
  return (
    <div style={{ minHeight: '100vh', background: '#FEFEFE', display: 'flex', flexDirection: 'column', fontFamily: "'Lora', Georgia, serif" }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px 40px', textAlign: 'center' }}>

        {/* Logo + name */}
        <div className="tl-fade" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '6px' }}>
          <TalliedLogo size={52} />
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '52px', fontWeight: 500, color: '#111', lineHeight: 1, letterSpacing: '-0.02em' }}>Tallied</h1>
        </div>
        <p className="tl-fade" style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#AAA', fontWeight: 600, marginBottom: '16px' }}>Voting, Personalized</p>
        <div className="tl-fade" style={{ background: '#F0F5FF', border: '1px solid #C8DCFF', borderRadius: '20px', padding: '5px 14px', marginBottom: '32px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#2D6FD4', fontWeight: 500 }}>Non-partisan educational tool · Not affiliated with any party</p>
        </div>

        {/* Stat */}
        <div className="tl-fade-1" style={{ marginBottom: '16px' }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(64px, 14vw, 104px)', fontWeight: 700, color: '#111', lineHeight: 1, letterSpacing: '-0.04em' }}>57%</div>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '17px', color: '#333', lineHeight: 1.65, maxWidth: '440px', margin: '10px auto 0' }}>
            of eligible Ontario voters didn't cast a ballot in the 2022 provincial election. Federal and provincial policies affect your{' '}
            <span style={{ color: '#7EB3FF', fontWeight: 500 }}>rent</span>,{' '}
            <span style={{ color: '#7EB3FF', fontWeight: 500 }}>tuition</span>, and{' '}
            <span style={{ color: '#A3244A', fontWeight: 500 }}>healthcare</span>.
          </p>
        </div>

        {/* Hero image - inline between text */}
        <div className="tl-fade-2" style={{ width: '100%', maxWidth: '560px', borderRadius: '16px', overflow: 'hidden', marginBottom: '32px', border: '1px solid #E8E8E8', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <img src={IMGS.landing} alt="People voting" style={{ width: '100%', height: '220px', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            onError={e => { e.currentTarget.style.display = 'none'; }} />
        </div>

        {/* CTA */}
        <div className="tl-fade-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <button onClick={onStart}
            style={{ background: '#7EB3FF', color: 'white', border: 'none', borderRadius: '14px', padding: '17px 52px', fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#6BA3EF'}
            onMouseLeave={e => e.currentTarget.style.background = '#7EB3FF'}
          >
            See how it affects you →
          </button>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#AAA', fontStyle: 'italic' }}>Takes 2 minutes · Built for Ontario residents</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#BBB', marginTop: '4px' }}>Covers the 2025 federal election and Ontario provincial policies</p>
        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '20px', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#CCC' }}>
        Built by Ivana Okpakovwodo · {new Date().getFullYear()}
        <div style={{ marginTop: '6px' }}>
          <button onClick={() => onPrivacy && onPrivacy()} style={{ color: '#CCC', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '11px', fontFamily: "'Inter', sans-serif" }}>Privacy & Terms</button>
        </div>
      </footer>
    </div>
  );
}


// ─── Personalization Form (Step 1 - Profile) ─────────────────────────────────
function PersonalizationForm({ onComplete, existingAnswers }) {
  const [answers, setAnswers] = useState(existingAnswers || { student: null, housing: null, employment: null });

  const questions = [
    { key: 'student',    question: 'What is your current student status?', options: ['College/university', 'In high school', 'Recently graduated', 'Not a student'] },
    { key: 'employment', question: "What's your employment situation?",    options: ['Employed full-time', 'Employed part-time', 'Looking for work', 'Not currently working'] },
    { key: 'housing',    question: "What's your housing situation?",       options: ['Renting', 'Homeowner', 'Living with family', 'Looking to buy'] }
  ];

  const isComplete = answers.student && answers.housing && answers.employment;
  const answeredCount = [answers.student, answers.employment, answers.housing].filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', background: '#FEFEFE', padding: '40px 20px 100px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#7EB3FF', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Step 1 of 3</p>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '28px', fontWeight: 500, color: '#111', marginBottom: '10px' }}>Tell us about yourself</h1>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#555', lineHeight: 1.6, marginBottom: '10px' }}>
            So we can show you exactly how each policy affects your specific situation.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#AAA', background: '#F8F8F8', borderRadius: '8px', padding: '6px 12px', display: 'inline-block' }}>
            🔒 Your answers stay on your device only and are never saved or shared.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px' }}>
            {[0,1,2].map(i => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i < answeredCount ? '#7EB3FF' : '#E0E0E0', transition: 'background 0.2s' }} />)}
          </div>
        </div>

        {questions.map(({ key, question, options }) => (
          <div key={key} style={{ background: 'white', borderRadius: '16px', padding: '22px 24px', marginBottom: '14px', border: '1px solid #E8E8E8', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '17px', fontWeight: 500, color: '#111', marginBottom: '14px' }}>{question}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {options.map(option => {
                const sel = answers[key] === option;
                return (
                  <button key={option} onClick={() => setAnswers({ ...answers, [key]: option })}
                    style={{ padding: '11px 14px', borderRadius: '10px', fontFamily: "'Lora', Georgia, serif", fontSize: '14px', cursor: 'pointer', transition: 'all 0.15s', background: sel ? '#7EB3FF' : '#F6F6F6', color: sel ? 'white' : '#222', border: sel ? '2px solid #7EB3FF' : '2px solid transparent', textAlign: 'left' }}
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
          <button onClick={() => isComplete && onComplete(answers)} disabled={!isComplete}
            style={{ padding: '16px 52px', borderRadius: '14px', fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, border: 'none', cursor: isComplete ? 'pointer' : 'not-allowed', background: isComplete ? '#7EB3FF' : '#E0E0E0', color: isComplete ? 'white' : '#AAA', transition: 'all 0.15s' }}
            onMouseEnter={e => { if (isComplete) e.currentTarget.style.background = '#6BA3EF'; }}
            onMouseLeave={e => { if (isComplete) e.currentTarget.style.background = '#7EB3FF'; }}
          >
            Next: Pick Your Issues →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Priorities Page (Step 2 - Issue selection) ───────────────────────────────
function PrioritiesPage({ onComplete, existingIssues }) {
  const [selected, setSelected] = useState(existingIssues || []);

  const toggle = (key) => {
    if (selected.includes(key)) setSelected(selected.filter(k => k !== key));
    else if (selected.length < 3) setSelected([...selected, key]);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FEFEFE', padding: '40px 20px 100px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#7EB3FF', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Step 2 of 3</p>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '28px', fontWeight: 500, color: '#111', marginBottom: '10px' }}>What matters most to you?</h1>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#555', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto' }}>
            Pick up to 3 issues. We'll filter every policy and candidate comparison through these.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#A3244A', marginTop: '12px' }}>{selected.length} of 3 selected</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          {issueOptions.map(issue => {
            const isSelected = selected.includes(issue.key);
            const isDisabled = !isSelected && selected.length >= 3;
            return (
              <button key={issue.key} onClick={() => toggle(issue.key)} disabled={isDisabled}
                style={{ padding: 0, borderRadius: '14px', textAlign: 'left', border: isSelected ? '2px solid #7EB3FF' : '1px solid #E8E8E8', background: 'white', cursor: isDisabled ? 'not-allowed' : 'pointer', transition: 'all 0.15s', overflow: 'hidden', boxShadow: isSelected ? '0 0 0 3px rgba(126,179,255,0.2)' : '0 1px 3px rgba(0,0,0,0.04)', opacity: isDisabled ? 0.4 : 1 }}
                onMouseEnter={e => { if (!isDisabled && !isSelected) e.currentTarget.style.borderColor = '#7EB3FF'; }}
                onMouseLeave={e => { if (!isDisabled && !isSelected) e.currentTarget.style.borderColor = '#E8E8E8'; }}
              >
                <div style={{ height: '80px', overflow: 'hidden', position: 'relative' }}>
                  <img src={issue.img} alt={issue.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {isSelected && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(126,179,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#7EB3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 500, fontSize: '13px', color: isSelected ? '#1A4FAA' : '#111', marginBottom: '2px' }}>{issue.label}</div>
                  <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '11px', color: '#888', fontStyle: 'italic' }}>{issue.description}</div>
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => selected.length > 0 && onComplete(selected)} disabled={selected.length === 0}
            style={{ padding: '16px 52px', borderRadius: '14px', fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, border: 'none', cursor: selected.length > 0 ? 'pointer' : 'not-allowed', background: selected.length > 0 ? '#7EB3FF' : '#E0E0E0', color: selected.length > 0 ? 'white' : '#AAA', transition: 'all 0.15s' }}
            onMouseEnter={e => { if (selected.length > 0) e.currentTarget.style.background = '#6BA3EF'; }}
            onMouseLeave={e => { if (selected.length > 0) e.currentTarget.style.background = '#7EB3FF'; }}
          >
            Show Me How This Affects Me →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Profile + Priorities (combined) ─────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
function ProfileAndPrioritiesPage({ onComplete, existingAnswers, existingIssues }) {
  const [answers, setAnswers] = useState(existingAnswers || { student: null, housing: null, employment: null });
  const [selected, setSelected] = useState(existingIssues || []);

  const questions = [
    { key: 'student',    question: 'Student status',      options: ['College/university', 'In high school', 'Recently graduated', 'Not a student'] },
    { key: 'employment', question: 'Employment',          options: ['Employed full-time', 'Employed part-time', 'Looking for work', 'Not currently working'] },
    { key: 'income',     question: 'Household income',    options: ['Under $40k', '$40k-$75k', '$75k-$120k', 'Over $120k'] },
    { key: 'housing',    question: 'Housing situation',   options: ['Renting', 'Homeowner', 'Living with family', 'Looking to buy'] }
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
      <div style={{ maxWidth: '840px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#7EB3FF', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Step 1 of 3</p>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '28px', fontWeight: 500, color: '#111', marginBottom: '10px' }}>Tell us about yourself</h1>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#555', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto' }}>
            Answer these so we can personalize every policy and candidate insight to your actual situation - not just generic info.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

          {/* LEFT: Profile */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#7EB3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: 'white' }}>1</div>
              <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', fontWeight: 500, color: '#111' }}>About you</span>
              <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
                {[0,1,2,3].map(i => <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: i < answeredCount ? '#7EB3FF' : '#E0E0E0', transition: 'background 0.2s' }} />)}
              </div>
            </div>
            {questions.map(({ key, question, options }) => (
              <div key={key} style={{ background: 'white', borderRadius: '14px', padding: '16px', marginBottom: '10px', border: '1px solid #E8E8E8' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>{question}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {options.map(option => {
                    const sel = answers[key] === option;
                    return (
                      <button key={option} onClick={() => setAnswers({ ...answers, [key]: option })}
                        style={{ padding: '9px 10px', borderRadius: '9px', fontFamily: "'Lora', Georgia, serif", fontSize: '13px', cursor: 'pointer', transition: 'all 0.12s', background: sel ? '#7EB3FF' : '#F6F6F6', color: sel ? 'white' : '#222', border: sel ? '2px solid #7EB3FF' : '2px solid transparent', textAlign: 'left' }}
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

          {/* RIGHT: Issues */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: selected.length > 0 ? '#7EB3FF' : '#E0E0E0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, color: 'white', transition: 'background 0.2s' }}>2</div>
              <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', fontWeight: 500, color: '#111' }}>What matters to you</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#A3244A', marginLeft: 'auto' }}>{selected.length}/3</span>
            </div>
            <div style={{ background: 'white', borderRadius: '14px', padding: '14px', border: '1px solid #E8E8E8' }}>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#666', marginBottom: '12px', lineHeight: 1.5 }}>Pick up to 3 issues. We'll filter everything through these.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {issueOptions.map(issue => {
                  const isSelected = selected.includes(issue.key);
                  const isDisabled = !isSelected && selected.length >= 3;
                  return (
                    <button key={issue.key} onClick={() => toggle(issue.key)} disabled={isDisabled}
                      style={{ padding: 0, borderRadius: '12px', textAlign: 'left', border: isSelected ? '2px solid #7EB3FF' : '1px solid #E8E8E8', background: 'white', cursor: isDisabled ? 'not-allowed' : 'pointer', transition: 'all 0.15s', overflow: 'hidden', boxShadow: isSelected ? '0 0 0 3px rgba(126,179,255,0.2)' : 'none', opacity: isDisabled ? 0.4 : 1 }}
                      onMouseEnter={e => { if (!isDisabled && !isSelected) e.currentTarget.style.borderColor = '#7EB3FF'; }}
                      onMouseLeave={e => { if (!isDisabled && !isSelected) e.currentTarget.style.borderColor = '#E8E8E8'; }}
                    >
                      <div style={{ height: '60px', overflow: 'hidden', position: 'relative' }}>
                        <img src={issue.img} alt={issue.label} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: isSelected ? 'none' : 'grayscale(30%)' }} />
                        {isSelected && <div style={{ position: 'absolute', top: '6px', right: '6px', width: '18px', height: '18px', borderRadius: '50%', background: '#7EB3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>}
                      </div>
                      <div style={{ padding: '8px 10px' }}>
                        <div style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 500, fontSize: '11px', color: isSelected ? '#1A4FAA' : '#111', lineHeight: 1.3 }}>{issue.label}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          {!isComplete && (
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#BBB', marginBottom: '12px', fontStyle: 'italic' }}>
              {!profileComplete ? 'Answer all four questions and pick at least one issue' : 'Now pick at least one issue that matters to you'}
            </p>
          )}
          <button onClick={() => isComplete && onComplete(answers, selected)} disabled={!isComplete}
            style={{ padding: '17px 52px', borderRadius: '14px', fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, border: 'none', cursor: isComplete ? 'pointer' : 'not-allowed', background: isComplete ? '#7EB3FF' : '#E0E0E0', color: isComplete ? 'white' : '#AAA', transition: 'all 0.15s' }}
            onMouseEnter={e => { if (isComplete) e.currentTarget.style.background = '#6BA3EF'; }}
            onMouseLeave={e => { if (isComplete) e.currentTarget.style.background = '#7EB3FF'; }}
          >
            Show me how this affects me →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Policy Card ──────────────────────────────────────────────────────────────
function PolicyCard({ policy, answers }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: 'white', borderRadius: '16px', marginBottom: '16px', border: hovered ? '1.5px solid #7EB3FF' : '1px solid #E0E0E0', boxShadow: hovered ? '0 8px 24px rgba(126,179,255,0.15)' : '0 1px 4px rgba(0,0,0,0.04)', transform: hovered ? 'translateY(-2px)' : 'none', transition: 'all 0.2s ease', overflow: 'hidden' }}>

      {/* Image */}
      <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
        <img src={policy.img} alt={policy.tag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: 'white', background: 'rgba(0,0,0,0.4)', padding: '3px 10px', borderRadius: '20px', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <IssueIcon issueKey={policy.issueKey} size={11} color="white" />
            {policy.tag}
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>{policy.year}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px' }}>
        <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '19px', fontWeight: 500, color: '#111', marginBottom: '10px', lineHeight: 1.3 }}>{policy.title}</h3>
        <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#444', lineHeight: 1.7, marginBottom: '14px' }}>{policy.plain}</p>

        {/* Personalized impact */}
        <div style={{ background: '#FFF0F3', borderRadius: '10px', padding: '14px 16px', marginBottom: '14px', border: '1px solid #F4B8C4' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, color: '#A3244A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '5px' }}>How this affects you</p>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#222', lineHeight: 1.65, fontStyle: 'italic' }}>{policy.getImpact(answers)}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href={policy.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#7EB3FF', textDecoration: 'none', fontWeight: 500 }}>{policy.linkLabel} ↗</a>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#BBB' }}>Source: {policy.source}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Policies Page ────────────────────────────────────────────────────────────
function PoliciesPage({ answers, selectedIssues, onComplete }) {
  const [showAll, setShowAll] = useState(false);
  const priorityPolicies = policies.filter(p => selectedIssues.includes(p.issueKey));
  const otherPolicies = policies.filter(p => !selectedIssues.includes(p.issueKey));

  return (
    <div style={{ minHeight: '100vh', background: '#F8F8F8', padding: '0 20px 80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', padding: '40px 0 28px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#7EB3FF', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Step 2 of 3</p>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '32px', fontWeight: 500, color: '#111', marginBottom: '10px' }}>Policies That Affect You</h1>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#555', maxWidth: '460px', margin: '0 auto', lineHeight: 1.6, marginBottom: '10px' }}>
            See how recent policy decisions have affected people like you. Your context before comparing candidates.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#AAA', maxWidth: '500px', margin: '0 auto' }}>
            Some policies below are provincial (Ford government), others are federal. Federal parties influence provincial issues through funding and legislation - both matter for Ontario voters.
          </p>
        </div>

        <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', fontWeight: 500, color: '#A3244A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A3244A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>
          Your Priority Issues
        </h3>
        {priorityPolicies.map(policy => <PolicyCard key={policy.id} policy={policy} answers={answers} />)}

        {!showAll ? (
          <button onClick={() => setShowAll(true)}
            style={{ width: '100%', padding: '14px', borderRadius: '12px', fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#555', background: 'white', border: '1px solid #E0E0E0', cursor: 'pointer', marginBottom: '24px', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#7EB3FF'; e.currentTarget.style.color = '#7EB3FF'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E0E0E0'; e.currentTarget.style.color = '#555'; }}
          >
            Explore all 8 issues ↓
          </button>
        ) : (
          <>
            <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', fontWeight: 500, color: '#555', marginBottom: '16px', marginTop: '8px' }}>Other Issues</h3>
            {otherPolicies.map(policy => <PolicyCard key={policy.id} policy={policy} answers={answers} />)}
          </>
        )}

        {/* CTA */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #E0E0E0', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '20px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>Ready to compare the candidates?</h3>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#555', marginBottom: '20px' }}>See what Carney and Poilievre actually plan to do about your priorities.</p>
          <button onClick={onComplete}
            style={{ padding: '16px 48px', borderRadius: '12px', fontFamily: "'Lora', Georgia, serif", fontSize: '15px', fontWeight: 500, background: '#7EB3FF', color: 'white', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#6BA3EF'}
            onMouseLeave={e => e.currentTarget.style.background = '#7EB3FF'}
          >
            Compare Candidates →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Candidate comparison data ────────────────────────────────────────────────
const candidateComparison = {
  housing: {
    liberal: { bottomLine: "GST removed for first-time buyers. 500,000 homes/year target.", what: "Carney's government removed the GST for first-time homebuyers on homes under $1M - saving up to $50,000. They also want to build 500,000 new homes per year. Already government policy.", source: "https://www.pm.gc.ca/en/news/news-releases/2025/03/20/prime-minister-mark-carney-will-eliminate-gst-for-first-time-homebuyers", sourceLabel: "PM announcement" },
    conservative: { bottomLine: "GST removed for ALL buyers (not just first-timers). 2.3M homes in 5 years.", what: "Poilievre promised GST removal on all new homes under $1.3M, sell federal land to developers, and cut funding to cities that slow approvals. Goal: 2.3 million homes in 5 years.", source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/", sourceLabel: "Conservative plan" },
    ndp: { bottomLine: "National rent control tied to federal housing money.", what: "3 million homes by 2030, with national rent control required for any city receiving federal housing funds. NDP lost the 2025 election and lost official party status.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP commitments" },
    getPersonalized: (a) => { if (a.housing === 'Renting') return "NDP's rent control proposal would have helped renters most. Since they lost, it's not happening. The Liberal and Conservative plans focus on buyers."; if (a.housing === 'Looking to buy') return "Liberal GST cut is now law - save up to $50K on a first home under $1M. Conservative would have gone further, removing GST for all buyers."; return "All parties promised more housing supply. Liberals are now implementing their plan."; }
  },
  education: {
    liberal: { bottomLine: "Mostly quiet on student debt. Modest tax cut for working students.", what: "No promises on tuition, OSAP, or debt cancellation. The main student benefit was a tax cut saving working Canadians up to $825/year.", source: "https://thegauntlet.ca/2025/04/25/the-liberal-partys-plan-for-students-steady-with-short-reach/", sourceLabel: "Liberal student plan analysis" },
    conservative: { bottomLine: "Income-contingent loan repayment. Pay back only when you earn enough.", what: "Poilievre promised you'd only repay student loans once you're earning enough, plus interest on student lines of credit would be tax-deductible.", source: "https://universityaffairs.ca/news/where-do-the-federal-election-candidates-stand-on-postsecondary-education/", sourceLabel: "University Affairs" },
    ndp: { bottomLine: "Cancel existing debt. Eventually free tuition.", what: "The biggest promises: cancel all student debt, eventually free tuition at public universities. Lost the 2025 election - none of this is happening.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP commitments" },
    getPersonalized: (a) => { if (a.student === 'In high school' || a.student === 'College/university' || a.student === 'Yes, college/university') return "The OSAP cuts are a Ford provincial decision - federal parties don't control OSAP. Federally, NDP promised the most but lost. Conservatives offered flexible repayment. Liberals were largely silent."; return "Federal parties had limited education platforms. The OSAP cuts are provincial. NDP had the boldest student promises but lost the election."; }
  },
  healthcare: {
    liberal: { bottomLine: "Dental care expanded to ages 18-64. Insulin and birth control covered.", what: "Carney's government is expanding dental care coverage to Canadians 18-64 - saving ~$800/year if you have no benefits. Insulin and birth control now covered through pharmacare.", source: "https://liberal.ca/mark-carneys-liberals-take-action-to-make-life-more-affordable/", sourceLabel: "Liberal affordability plan" },
    conservative: { bottomLine: "No new healthcare spending. Opposed pharmacare expansion.", what: "Poilievre's platform had no new healthcare programs. Focus was on making the existing system more efficient and reducing spending.", source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/", sourceLabel: "Conservative plan" },
    ndp: { bottomLine: "Family doctor for every Canadian by 2030. Free prescriptions for all.", what: "Most ambitious: every Canadian gets a family doctor by 2030, all prescriptions covered, mental health therapy covered. Lost the 2025 election.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP commitments" },
    getPersonalized: (a) => { if (a.student === 'College/university' || a.student === 'Yes, college/university' || a.student === 'In high school') return "Liberal dental expansion to 18-64 is happening - if you have no dental coverage through school or a parent's plan, you may qualify. NDP promised more but lost."; return "Liberals are expanding dental and pharmacare. NDP would have gone further. Conservatives planned nothing new."; }
  },
  jobs: {
    liberal: { bottomLine: "Tax cut up to $825/year. Tariff revenue directed to affected workers.", what: "Middle-class tax cut saving dual-income families up to $825/year. Every dollar from retaliatory tariffs goes to support workers affected by the trade war.", source: "https://liberal.ca/mark-carneys-liberals-take-action-to-make-life-more-affordable/", sourceLabel: "Liberal affordability plan" },
    conservative: { bottomLine: "Bigger tax cut - $900/year average. Grow through oil and resource jobs.", what: "Larger tax cut saving average worker $900/year, families $1,800. Funded by cutting spending and growing Canada's resource sector.", source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/", sourceLabel: "Conservative plan" },
    ndp: { bottomLine: "Raise tax-free threshold to $19,500. Stronger EI for gig workers.", what: "Most minimum wage workers would pay zero federal income tax. EI easier to qualify for and expanded to cover gig workers. Lost 2025 election.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP commitments" },
    getPersonalized: (a) => { if (a.employment === 'Looking for work') return "NDP's EI improvements would have helped you most. Liberal EI modernization is happening but slower. Conservative plan focused on creating jobs through resource extraction."; if (a.income === 'Under $40k') return "NDP's raised tax-free threshold ($19,500) would have helped you most. Liberal cut helps somewhat. Conservative cut is larger but you need to earn more to feel it."; return "Liberal tax cut is now law. Conservative promised bigger cuts. NDP focused on low earners and people between jobs."; }
  },
  climate: {
    liberal: { bottomLine: "Consumer carbon tax cancelled. Industrial polluters still pay.", what: "Carney cancelled the consumer carbon tax in March 2025. Big industrial companies still pay for pollution. Grants available for energy-efficient appliances and EVs.", source: "https://liberal.ca/cstrong/build/", sourceLabel: "Liberal climate plan" },
    conservative: { bottomLine: "Scrap all carbon pricing. Expand oil and gas.", what: "Would have cancelled all carbon pricing including industrial rules. Technology credits instead of carbon charges. More pipelines and oil production.", source: "https://www.conservative.ca/poilievre-announces-new-canada-first-economic-action-plan/", sourceLabel: "Conservative energy plan" },
    ndp: { bottomLine: "Keep industrial carbon pricing. Free home retrofits for low-income households.", what: "NDP wanted to keep charging big polluters AND cut $18B in fossil fuel subsidies. Free home energy upgrades for low-income households - saving up to $4,500/year.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP commitments" },
    getPersonalized: (a) => { if (a.student === 'In high school' || a.student === 'College/university' || a.student === 'Yes, college/university') return "This is your generation's issue. Liberals cancelled the consumer tax but kept industrial rules. NDP went furthest on climate. Conservatives would have scrapped all carbon rules."; return "Liberals cancelled consumer carbon tax but kept industrial pricing. NDP would have done more. Conservatives wanted to remove all carbon pricing entirely."; }
  },
  costoflife: {
    liberal: { bottomLine: "Tax cut + cheaper gas + dental care. Modest but already in effect.", what: "Income tax cut (up to $825/year), carbon tax cancellation saving ~18 cents/litre on gas, and dental care expansion. All already in effect.", source: "https://liberal.ca/mark-carneys-liberals-take-action-to-make-life-more-affordable/", sourceLabel: "Liberal affordability plan" },
    conservative: { bottomLine: "Bigger tax cut. But benefits higher earners more.", what: "Larger income tax cut ($900/year average). Cancel all carbon pricing. The bigger cut sounds great but economists noted flat rate cuts benefit higher earners more.", source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/", sourceLabel: "Conservative plan" },
    ndp: { bottomLine: "Remove GST from groceries, heat, and internet bills.", what: "Instead of income tax cuts, NDP wanted to remove GST from groceries, heating, internet, and diapers. Directly cuts the biggest expenses for lower-income Canadians.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP commitments" },
    getPersonalized: (a) => { if (a.income === 'Under $40k') return "NDP's GST removal from groceries and internet would have helped you most. Tax cuts are less useful when you earn less. Liberal dental helps if you have no coverage."; if (a.housing === 'Renting') return "NDP removing GST from heating and internet would have directly cut your bills. Liberal tax cut helps a bit. Conservative cut benefits higher earners more."; return "Liberal delivered modest tax cut and cheaper gas. NDP's approach targets everyday essentials like groceries and heat."; }
  },
  canadaus: {
    liberal: { bottomLine: "Fight back with matching tariffs. Protect affected workers.", what: "Matching tariffs on US goods. Every dollar collected goes to Canadian workers affected by the trade war. Building new trade relationships with Europe and Asia.", source: "https://www.canada.ca/en/department-finance/news/2025/03/canada-responds-to-unjustified-us-tariffs-on-canadian-steel-and-aluminum-products.html", sourceLabel: "Canada's tariff response" },
    conservative: { bottomLine: "Renegotiate CUSMA early. Remove interprovincial trade barriers.", what: "Renegotiate Canada's trade deal with the US early. Remove barriers to trade between Canadian provinces. Grow the resource sector to reduce US dependence.", source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/", sourceLabel: "Conservative plan" },
    ndp: { bottomLine: "Keep healthcare off the table in any trade deal.", what: "Whatever deal Canada makes, Canadian healthcare stays completely off the table. Stronger EI for workers who lose jobs due to tariffs. 'Buy Canadian' strategy.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP commitments" },
    getPersonalized: (a) => { if (a.employment === 'Looking for work') return "Tariffs are projected to cost Ontario 119,200 jobs by 2026. Liberal government is directing tariff revenues to displaced workers. NDP wanted stronger EI for job losses."; return "Liberals are retaliating and diversifying trade. Conservatives wanted to renegotiate and grow resource exports. NDP focused on worker protections."; }
  },
  privacy: {
    liberal: { bottomLine: "Introduced Bill C-27 in 2022. Still not passed.", what: "Bill C-27 would give Canadians the right to see, delete, and understand AI decisions about their data. Introduced in 2022, still hasn't passed four years later.", source: "https://www.parl.ca/legisinfo/en/bill/44-1/c-27", sourceLabel: "Bill C-27 status" },
    conservative: { bottomLine: "Focus on specific online harms - not broad data rights.", what: "Made specific online harms illegal (cyberbullying, non-consensual photos). No position on Bill C-27 or broader data ownership questions.", source: "https://pollenize.org/en/elections/canada-2025/pierre-poilievre/", sourceLabel: "Conservative platform" },
    ndp: { bottomLine: "Crack down on big tech. Regulate AI and social media.", what: "Most outspoken on tech accountability - regulate social media, crack down on AI misinformation, foreign agent registry. No specific Bill C-27 position.", source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing", sourceLabel: "NDP commitments" },
    getPersonalized: (a) => { if (a.student === 'In high school' || a.student === 'College/university' || a.student === 'Yes, college/university') return "No party made your digital privacy a real priority in 2025. Bill C-27 would let you delete your data from TikTok and Instagram - it's been sitting in Parliament since 2022."; return "All three parties fell short on digital privacy. Bill C-27 still isn't law four years after it was introduced."; }
  }
};

// ─── Results Page (with embedded chat) ───────────────────────────────────────
function ResultsPage({ answers, selectedIssues, onContinue, onRestart }) {
  const [showNDP, setShowNDP] = useState(false);
  const [activeChatIssue, setActiveChatIssue] = useState(null);
  const [chatMode, setChatMode] = useState('carney');

  const labelMap = {
    student: { 'College/university': 'college student', 'Yes, college/university': 'college student', 'In high school': 'high school student', 'Recently graduated': 'recent grad', 'Not a student': 'non-student' },
    employment: { 'Employed full-time': 'employed full-time', 'Employed part-time': 'employed part-time', 'Looking for work': 'looking for work', 'Not currently working': 'not working' },
    income: { 'Under $40k': 'under $40k', '$40k-$75k': '$40k-$75k', '$75k-$120k': '$75k-$120k', 'Over $120k': 'over $120k' },
    housing: { 'Renting': 'renter', 'Homeowner': 'homeowner', 'Living with family': 'living with family', 'Looking to buy': 'looking to buy' }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8F8F8', padding: '0 20px 80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', padding: '40px 0 28px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#7EB3FF', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Step 3 of 3</p>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '32px', fontWeight: 500, color: '#111', marginBottom: '10px' }}>Compare the Candidates</h1>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#555', maxWidth: '460px', margin: '0 auto', lineHeight: 1.6 }}>
            What Carney and Poilievre actually plan to do about your priorities.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#AAA', marginTop: '8px' }}>
            Personalized for: {[labelMap.student[answers.student], labelMap.employment[answers.employment], labelMap.income[answers.income], labelMap.housing[answers.housing]].filter(Boolean).join(' · ')}
          </p>
        </div>

        {/* Candidate photo header */}
        <div style={{ background: '#FFF8E8', borderRadius: '10px', padding: '8px 16px', marginBottom: '12px', border: '1px solid #FFE4A0', textAlign: 'center' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#92600A', fontWeight: 500 }}>AI Simulation · Based on verified 2025 party platforms · Not affiliated with any candidate</p>
        </div>
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px 24px', marginBottom: '24px', border: '1px solid #E0E0E0', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={IMGS.carney} alt="Mark Carney" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid #FCA5A5' }} />
            <div>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', fontWeight: 500, color: '#111' }}>Mark Carney</p>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', background: '#FEE2E2', color: '#991B1B', padding: '2px 8px', borderRadius: '20px', fontWeight: 600 }}>Liberal</span>
            </div>
          </div>
          <div style={{ width: '1px', height: '40px', background: '#E8E8E8' }} />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={IMGS.poilievre} alt="Pierre Poilievre" style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid #93C5FD' }} />
            <div>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', fontWeight: 500, color: '#111' }}>Pierre Poilievre</p>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', background: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: '20px', fontWeight: 600 }}>Conservative</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#EEF4FF', border: '1px solid #C8DCFF', borderRadius: '10px', padding: '10px 16px', marginBottom: '20px' }}>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#2D4A8A', textAlign: 'center' }}>Official 2025 federal election platform positions. Carney won and is now PM. All sourced from party websites.</p>
        </div>

        {/* Per-issue comparison cards */}
        {selectedIssues.map(issueKey => {
          const comparison = candidateComparison[issueKey];
          const issueInfo = issueOptions.find(i => i.key === issueKey);
          if (!comparison || !issueInfo) return null;
          const isOpen = activeChatIssue === issueKey;

          return (
            <div key={issueKey} style={{ background: 'white', borderRadius: '16px', marginBottom: '20px', border: '1px solid #E0E0E0', overflow: 'hidden' }}>

              {/* Issue image banner */}
              <div style={{ height: '120px', overflow: 'hidden', position: 'relative' }}>
                <img src={issueInfo.img} alt={issueInfo.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IssueIcon issueKey={issueKey} size={18} color="white" />
                  <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '20px', fontWeight: 500, color: 'white' }}>{issueInfo.label}</h2>
                </div>
              </div>

              <div style={{ padding: '20px 22px' }}>
                {/* Personalized */}
                <div style={{ background: '#FFF0F3', borderRadius: '10px', padding: '14px 16px', marginBottom: '18px', border: '1px solid #F4B8C4' }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 600, color: '#A3244A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>What this means for you</p>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#222', lineHeight: 1.65, fontStyle: 'italic' }}>{comparison.getPersonalized(answers)}</p>
                </div>

                {/* Two-column candidate comparison */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  {/* Carney */}
                  <div style={{ borderLeft: '3px solid #FCA5A5', paddingLeft: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <img src={IMGS.carney} alt="Carney" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
                      <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', fontWeight: 500, color: '#111' }}>Carney</span>
                    </div>
                    <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '12px', color: '#666', fontStyle: 'italic', marginBottom: '6px' }}>{comparison.liberal.bottomLine}</p>
                    <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#333', lineHeight: 1.6, marginBottom: '6px' }}>{comparison.liberal.what}</p>
                    <a href={comparison.liberal.source} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#7EB3FF' }}>Source ↗</a>
                  </div>

                  {/* Poilievre */}
                  <div style={{ borderLeft: '3px solid #93C5FD', paddingLeft: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <img src={IMGS.poilievre} alt="Poilievre" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
                      <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', fontWeight: 500, color: '#111' }}>Poilievre</span>
                    </div>
                    <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '12px', color: '#666', fontStyle: 'italic', marginBottom: '6px' }}>{comparison.conservative.bottomLine}</p>
                    <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#333', lineHeight: 1.6, marginBottom: '6px' }}>{comparison.conservative.what}</p>
                    <a href={comparison.conservative.source} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#7EB3FF' }}>Source ↗</a>
                  </div>
                </div>

                {/* Embedded chat buttons */}
                <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: '14px' }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#888', marginBottom: '10px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Ask about their position on {issueInfo.label.split(' ')[0]}</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => { setActiveChatIssue(isOpen && chatMode === 'carney' ? null : issueKey); setChatMode('carney'); }}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '10px', border: (isOpen && chatMode === 'carney') ? '2px solid #FCA5A5' : '1px solid #E8E8E8', background: (isOpen && chatMode === 'carney') ? '#FFF0F0' : 'white', cursor: 'pointer', transition: 'all 0.15s' }}>
                      <img src={IMGS.carney} alt="Carney" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
                      <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#111' }}>Chat with Mark</span>
                    </button>
                    <button onClick={() => { setActiveChatIssue(isOpen && chatMode === 'poilievre' ? null : issueKey); setChatMode('poilievre'); }}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '10px', border: (isOpen && chatMode === 'poilievre') ? '2px solid #93C5FD' : '1px solid #E8E8E8', background: (isOpen && chatMode === 'poilievre') ? '#EFF6FF' : 'white', cursor: 'pointer', transition: 'all 0.15s' }}>
                      <img src={IMGS.poilievre} alt="Poilievre" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
                      <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#111' }}>Chat with Pierre</span>
                    </button>
                  </div>

                  {/* Inline chat */}
                  {isOpen && <InlineChatBox mode={chatMode} issueKey={issueKey} answers={answers} selectedIssues={selectedIssues} />}
                </div>

                {/* NDP toggle */}
                {showNDP && (
                  <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: '14px', marginTop: '14px' }}>
                    <div style={{ borderLeft: '3px solid #FCD34D', paddingLeft: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', fontWeight: 500, color: '#111' }}>NDP</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', background: '#FEF3C7', color: '#92400E', padding: '2px 6px', borderRadius: '20px', fontWeight: 600 }}>Lost party status 2025</span>
                      </div>
                      <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '12px', color: '#666', fontStyle: 'italic', marginBottom: '4px' }}>{comparison.ndp.bottomLine}</p>
                      <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#333', lineHeight: 1.6 }}>{comparison.ndp.what}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <button onClick={() => setShowNDP(!showNDP)} style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#888', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
            {showNDP ? 'Hide NDP positions' : 'See NDP positions'}
          </button>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #E0E0E0', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '20px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>Ready to wrap up?</h3>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#555', marginBottom: '20px' }}>Get your decision summary and next steps.</p>
          <button onClick={onContinue}
            style={{ padding: '16px 48px', borderRadius: '12px', fontFamily: "'Lora', Georgia, serif", fontSize: '15px', fontWeight: 500, background: '#7EB3FF', color: 'white', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#6BA3EF'}
            onMouseLeave={e => e.currentTarget.style.background = '#7EB3FF'}
          >
            See My Decision Summary →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Inline Chat Box (embedded in comparison cards) ───────────────────────────
function InlineChatBox({ mode, issueKey, answers, selectedIssues }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = React.useRef(null);

  const issueInfo = issueOptions.find(i => i.key === issueKey);
  const profileSummary = answers ? `${answers.student}, ${answers.employment}, ${answers.income} income, ${answers.housing}` : 'Not provided';
  const selectedIssueLabels = selectedIssues ? issueOptions.filter(i => selectedIssues.includes(i.key)).map(i => i.label).join(', ') : '';

  const candidate = mode === 'carney' ? {
    name: 'Mark Carney', party: 'Liberal', img: IMGS.carney,
    bubbleBg: '#FEF2F2', bubbleBorder: '#FECACA',
    intro: `I'm an AI simulation of Mark Carney. Ask me about my position on ${issueInfo?.label}.`,
  } : {
    name: 'Pierre Poilievre', party: 'Conservative', img: IMGS.poilievre,
    bubbleBg: '#EFF6FF', bubbleBorder: '#BFDBFE',
    intro: `I'm an AI simulation of Pierre Poilievre. Ask me about my position on ${issueInfo?.label}.`,
  };

  const systemPrompt = mode === 'carney'
    ? `You are an AI simulation of Mark Carney based on his verified 2025 Liberal Party platform. Speak in first person, warmly and clearly. Focus especially on ${issueInfo?.label}. Default to 3 sentences max. Only expand if the user explicitly asks for more detail. No em dashes, no emojis, no markdown stars. User profile: ${profileSummary}. Priority issues: ${selectedIssueLabels}.

Key Liberal positions: Housing - GST removed for first-time buyers under $1M (saves up to $50k), 500,000 homes/year. Tax cut saving families up to $825/year. Dental care expanded to 18-64. Carbon tax cancelled, industrial pricing kept. Retaliatory tariffs on US goods directing revenue to workers.`
    : `You are an AI simulation of Pierre Poilievre based on his verified 2025 Conservative Party platform. Speak in first person, directly and clearly. Focus especially on ${issueInfo?.label}. Default to 3 sentences max. Only expand if the user explicitly asks for more detail. No em dashes, no emojis, no markdown stars. User profile: ${profileSummary}. Priority issues: ${selectedIssueLabels}.

Key Conservative positions: Housing - GST removed on ALL new homes under $1.3M, sell federal land, 2.3M homes in 5 years. Income tax cut saving workers $900/year. Cancel all carbon pricing. Early CUSMA renegotiation. Income-contingent student loan repayment.`;

  React.useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: systemPrompt, messages: updated.map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text;
      if (text) setMessages([...updated, { role: 'assistant', content: text.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').trim() }]);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ marginTop: '12px', border: `1px solid ${candidate.bubbleBorder}`, borderRadius: '12px', overflow: 'hidden' }}>
      {/* Chat header */}
      <div style={{ background: candidate.bubbleBg, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: `1px solid ${candidate.bubbleBorder}` }}>
        <img src={candidate.img} alt={candidate.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
        <div>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', fontWeight: 500, color: '#111' }}>{candidate.name}</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#888', fontStyle: 'italic' }}>AI simulation of platform positions only - NOT the real candidate</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ background: '#FAFAFA', padding: '12px', maxHeight: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ background: candidate.bubbleBg, border: `1px solid ${candidate.bubbleBorder}`, borderRadius: '10px', padding: '10px 12px', maxWidth: '85%' }}>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#111', lineHeight: 1.6 }}>{candidate.intro}</p>
        </div>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '85%', background: msg.role === 'user' ? '#7EB3FF' : candidate.bubbleBg, border: msg.role === 'user' ? 'none' : `1px solid ${candidate.bubbleBorder}`, borderRadius: '10px', padding: '10px 12px' }}>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: msg.role === 'user' ? 'white' : '#111', lineHeight: 1.6 }}>{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ background: candidate.bubbleBg, border: `1px solid ${candidate.bubbleBorder}`, borderRadius: '10px', padding: '10px 12px', maxWidth: '60px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[0,150,300].map(d => <div key={d} style={{ width: '6px', height: '6px', background: '#AAA', borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: `${d}ms` }} />)}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '8px', padding: '10px', background: 'white', borderTop: `1px solid ${candidate.bubbleBorder}` }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send(); }}
          placeholder={`Ask ${candidate.name.split(' ')[0]} about ${issueInfo?.label.split(' ')[0].toLowerCase()}...`}
          style={{ flex: 1, border: '1px solid #E0E0E0', borderRadius: '8px', padding: '9px 12px', fontFamily: "'Lora', Georgia, serif", fontSize: '13px', outline: 'none', color: '#222' }} />
        <button onClick={send} disabled={!input.trim() || loading}
          style={{ padding: '9px 16px', borderRadius: '8px', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', background: input.trim() && !loading ? '#7EB3FF' : '#E0E0E0', color: input.trim() && !loading ? 'white' : '#AAA', transition: 'all 0.15s' }}>
          Send
        </button>
      </div>
    </div>
  );
}

// ─── Decision Summary ─────────────────────────────────────────────────────────
function DecisionSummaryPage({ answers, selectedIssues, onChat, onRestart }) {
  const selectedIssueData = issueOptions.filter(i => selectedIssues.includes(i.key));
  const labelMap = {
    student: { 'College/university': 'college student', 'Yes, college/university': 'college student', 'In high school': 'high school student', 'Recently graduated': 'recent grad', 'Not a student': 'non-student' },
    employment: { 'Employed full-time': 'employed full-time', 'Employed part-time': 'employed part-time', 'Looking for work': 'looking for work', 'Not currently working': 'not currently working' },
    income: { 'Under $40k': 'under $40k', '$40k-$75k': '$40k-$75k', '$75k-$120k': '$75k-$120k', 'Over $120k': 'over $120k' },
    housing: { 'Renting': 'renter', 'Homeowner': 'homeowner', 'Living with family': 'living with family', 'Looking to buy': 'looking to buy' }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8F8F8', padding: '0 20px 80px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', padding: '40px 0 28px' }}>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '32px', fontWeight: 500, color: '#111', marginBottom: '10px' }}>Your Summary</h1>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#555' }}>
            {[labelMap.student[answers.student], labelMap.employment[answers.employment], labelMap.income[answers.income], labelMap.housing[answers.housing]].filter(Boolean).join(' · ')}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#888', marginTop: '6px' }}>Priorities: {selectedIssueData.map(i => i.label).join(', ')}</p>
        </div>

        {/* Quick visual breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          {selectedIssueData.map(issue => (
            <div key={issue.key} style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', border: '1px solid #E0E0E0' }}>
              <div style={{ height: '80px', overflow: 'hidden' }}>
                <img src={issue.img} alt={issue.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '10px 12px' }}>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', fontWeight: 500, color: '#111' }}>{issue.label}</p>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '11px', color: '#888', fontStyle: 'italic', marginTop: '3px', lineHeight: 1.4 }}>{candidateComparison[issue.key]?.liberal?.bottomLine}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Questions to ask yourself */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '16px', border: '1px solid #E0E0E0' }}>
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '18px', fontWeight: 500, color: '#111', marginBottom: '16px' }}>Questions to ask yourself</h3>
          {['Which candidate\'s approach to your top issue feels more realistic?', 'Are there tradeoffs you\'re willing to accept on lower-priority issues?', 'Does your local candidate\'s position matter as much as the party leader\'s?'].map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#2D6FD4' }}>{i+1}</span>
              </div>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#333', lineHeight: 1.6 }}>{q}</p>
            </div>
          ))}
        </div>

        {/* Next steps */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '16px', border: '1px solid #E0E0E0' }}>
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '18px', fontWeight: 500, color: '#111', marginBottom: '16px' }}>What now?</h3>
          {[
            { href: 'https://www.registertovoteon.ca/', label: 'Register to vote (Ontario)', sub: 'registertovoteon.ca', blue: true },
            { href: 'https://www.elections.ca/content.aspx?section=vot&dir=reg/etr&document=index&lang=e', label: 'Register to vote (Federal)', sub: 'elections.ca', blue: true },
            { href: 'https://www.elections.on.ca/en/voting-in-ontario/electoral-districts.html', label: 'Find your riding', sub: 'Your local candidate matters too', blue: false },
          ].map(item => (
            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '12px', background: item.blue ? '#EEF4FF' : '#F6F6F6', textDecoration: 'none', marginBottom: '10px', border: `1px solid ${item.blue ? '#C8DCFF' : '#E8E8E8'}` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.blue ? '#2D6FD4' : '#7EB3FF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <div>
                <p style={{ fontFamily: "'Lora', Georgia, serif", fontWeight: 500, fontSize: '14px', color: '#111' }}>{item.label}</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#888' }}>{item.sub}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Chat CTA */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #E0E0E0', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
            <img src={IMGS.carney} alt="Carney" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid #FCA5A5' }} />
            <img src={IMGS.poilievre} alt="Poilievre" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '2px solid #93C5FD' }} />
          </div>
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '18px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>Still have questions?</h3>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#555', marginBottom: '18px' }}>Chat with AI simulations of the candidates based on their verified platforms.</p>
          <button onClick={onChat}
            style={{ padding: '14px 36px', borderRadius: '12px', fontFamily: "'Lora', Georgia, serif", fontSize: '15px', fontWeight: 500, background: '#7EB3FF', color: 'white', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#6BA3EF'}
            onMouseLeave={e => e.currentTarget.style.background = '#7EB3FF'}
          >
            Chat with the candidates →
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={onRestart} style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#AAA', background: 'none', border: 'none', cursor: 'pointer' }}>Start over</button>
        </div>
      </div>
    </div>
  );
}

// ─── Full Chat Page ───────────────────────────────────────────────────────────
function ChatPage({ answers, selectedIssues, onRestart }) {
  const [mode, setMode] = useState('carney');
  const [messages, setMessages] = useState({ carney: [], poilievre: [] });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMode, setLoadingMode] = useState(null);
  const messagesEndRef = React.useRef(null);

  const profileSummary = answers ? `${answers.student}, ${answers.employment}, ${answers.income} income, ${answers.housing}` : 'Not provided';
  const selectedIssueLabels = selectedIssues ? issueOptions.filter(i => selectedIssues.includes(i.key)).map(i => i.label).join(', ') : 'Not selected';

  const systemPrompts = {
    carney: `You are an AI simulation of Mark Carney based on his verified 2025 Liberal Party platform. Speak in first person, warmly and clearly. You are talking to a Canadian voter.
RULES: Only make claims grounded in the verified 2025 Liberal platform. Never tell the user who to vote for. Do NOT use em dashes. Do NOT use emojis. Do NOT use markdown. Separate paragraphs with blank lines. Default to 3 sentences max. Expand only if the user asks. Never make up policies or numbers. For verifiable claims end with: SOURCES: [Label](URL).
User profile: ${profileSummary}. Priority issues: ${selectedIssueLabels}.
Key Liberal positions: GST removed for first-time buyers under $1M (up to $50k saved). 500,000 homes/year. Tax cut saving families up to $825/year. Dental care expanded to 18-64. Carbon tax cancelled, industrial pricing kept. Retaliatory tariffs on US goods, revenue to workers.`,
    poilievre: `You are an AI simulation of Pierre Poilievre based on his verified 2025 Conservative Party platform. Speak in first person, directly and clearly. You are talking to a Canadian voter.
RULES: Only make claims grounded in the verified 2025 Conservative platform. Never tell the user who to vote for. Do NOT use em dashes. Do NOT use emojis. Do NOT use markdown. Separate paragraphs with blank lines. Default to 3 sentences max. Expand only if the user asks. Never make up policies or numbers. For verifiable claims end with: SOURCES: [Label](URL).
User profile: ${profileSummary}. Priority issues: ${selectedIssueLabels}.
Key Conservative positions: GST removed on ALL new homes under $1.3M. Sell federal land for housing. 2.3M homes in 5 years. Income tax cut saving workers $900/year. Cancel all carbon pricing. Early CUSMA renegotiation. Income-contingent student loan repayment.`
  };

  const candidates = {
    carney: { name: 'Mark Carney', img: IMGS.carney, bubbleBg: '#FEF2F2', bubbleBorder: '#FECACA', badge: 'Liberal', badgeBg: '#FEE2E2', badgeText: '#991B1B', intro: "I'm an AI simulation of Mark Carney, based on his verified 2025 Liberal platform. Ask me about housing, healthcare, climate, jobs, or anything else. What's on your mind?" },
    poilievre: { name: 'Pierre Poilievre', img: IMGS.poilievre, bubbleBg: '#EFF6FF', bubbleBorder: '#BFDBFE', badge: 'Conservative', badgeBg: '#DBEAFE', badgeText: '#1E40AF', intro: "I'm an AI simulation of Pierre Poilievre, based on his verified 2025 Conservative platform. Ask me about housing, jobs, affordability, trade, or anything else. What do you want to know?" }
  };

  const config = candidates[mode];
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
    return { text: mainText.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').trim(), sources };
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: 'user', content: input.trim() };
    const updatedMessages = [...currentMessages, userMessage];
    setMessages(prev => ({ ...prev, [mode]: updatedMessages }));
    setInput('');
    setLoading(true);
    setLoadingMode(mode);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: systemPrompts[mode], messages: updatedMessages.map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await response.json();
      const rawText = data.content?.[0]?.text;
      if (rawText) {
        const parsed = parseResponse(rawText);
        setMessages(prev => ({ ...prev, [mode]: [...updatedMessages, { role: 'assistant', content: parsed.text, sources: parsed.sources }] }));
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FEFEFE', display: 'flex', flexDirection: 'column' }}>

      {/* Candidate switcher header */}
      <div style={{ background: 'white', borderBottom: '1px solid #E8E8E8', padding: '16px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '18px', fontWeight: 500, color: '#111' }}>Chat with the Candidates</h2>
            <button onClick={onRestart} style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#AAA', background: 'none', border: 'none', cursor: 'pointer' }}>Start over</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {Object.entries(candidates).map(([key, cand]) => (
              <button key={key} onClick={() => setMode(key)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderRadius: '12px', border: key === mode ? `2px solid ${cand.bubbleBorder}` : '1px solid #E0E0E0', background: key === mode ? cand.bubbleBg : 'white', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}>
                <img src={cand.img} alt={cand.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
                <div>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', fontWeight: 500, color: '#111' }}>{cand.name}</p>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', background: cand.badgeBg, color: cand.badgeText, padding: '1px 6px', borderRadius: '20px', fontWeight: 600 }}>{cand.badge}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', padding: '10px 20px 0' }}>
        <div style={{ background: '#FFF0F3', border: '1.5px solid #F4B8C4', borderRadius: '10px', padding: '12px 16px' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: '#A3244A', marginBottom: '4px' }}>⚠️ Important: AI Simulation Only</p>
          <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '13px', color: '#7A1A34', lineHeight: 1.5 }}>
            These are AI simulations based on verified 2025 platform positions - NOT the real candidates or their teams. Always verify with official party websites before making voting decisions.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#AAA', marginTop: '6px' }}>
            🔒 Your messages are not stored. This conversation is private.
          </p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: config.bubbleBg, border: `1px solid ${config.bubbleBorder}`, borderRadius: '14px', borderTopLeftRadius: '3px', padding: '14px 16px', maxWidth: '80%' }}>
            <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#111', lineHeight: 1.7 }}>{config.intro}</p>
          </div>
          {currentMessages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '80%', background: msg.role === 'user' ? '#7EB3FF' : config.bubbleBg, border: msg.role === 'user' ? 'none' : `1px solid ${config.bubbleBorder}`, borderRadius: '14px', borderTopRightRadius: msg.role === 'user' ? '3px' : '14px', borderTopLeftRadius: msg.role === 'user' ? '14px' : '3px', padding: '14px 16px' }}>
                <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', lineHeight: 1.7, color: msg.role === 'user' ? 'white' : '#111' }}>
                  {msg.role === 'assistant' ? msg.content.split('\n').filter(l => l.trim()).map((line, li) => <p key={li} style={{ marginBottom: '8px' }}>{line}</p>) : <p>{msg.content}</p>}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '0.5px solid rgba(0,0,0,0.1)', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {msg.sources.map((src, si) => (
                      <a key={si} href={src.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', background: '#EEF4FF', color: '#2D6FD4', padding: '2px 8px', borderRadius: '20px', border: '1px solid #C8DCFF', textDecoration: 'none' }}>{src.label} ↗</a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && loadingMode === mode && (
            <div style={{ background: config.bubbleBg, border: `1px solid ${config.bubbleBorder}`, borderRadius: '14px', borderTopLeftRadius: '3px', padding: '14px 16px', maxWidth: '80px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[0,150,300].map(d => <div key={d} style={{ width: '8px', height: '8px', background: '#AAA', borderRadius: '50%', animation: 'bounce 1s infinite', animationDelay: `${d}ms` }} />)}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div style={{ background: 'white', borderTop: '1px solid #E8E8E8', padding: '12px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '8px' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
            placeholder={`Ask ${config.name.split(' ')[0]} anything about their platform...`} disabled={loading}
            style={{ flex: 1, border: '1px solid #E0E0E0', borderRadius: '10px', padding: '12px 16px', fontFamily: "'Lora', Georgia, serif", fontSize: '15px', outline: 'none', background: '#F8F8F8', color: '#222' }} />
          <button onClick={sendMessage} disabled={!input.trim() || loading}
            style={{ padding: '12px 20px', borderRadius: '10px', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600, border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', background: input.trim() && !loading ? '#7EB3FF' : '#E0E0E0', color: input.trim() && !loading ? 'white' : '#AAA', transition: 'all 0.15s' }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Privacy Page ─────────────────────────────────────────────────────────────
function PrivacyPage({ onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: '#FEFEFE', padding: '48px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <button onClick={onBack} style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '14px', color: '#7EB3FF', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '24px', display: 'block' }}>← Back</button>
        <div style={{ background: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #E0E0E0' }}>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '26px', fontWeight: 500, color: '#111', marginBottom: '6px' }}>Privacy and Terms</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#AAA', marginBottom: '28px' }}>Last updated: April 2026</p>
          {[
            { title: "What Tallied is", body: "Tallied is a civic education tool built by Ivana Okpakovwodo as a student project. It is designed to help Ontario residents understand how political policies affect their lives. It is not affiliated with any political party, candidate, or government body." },
            { title: "What data we collect", body: "Tallied does not create accounts or store your personal information. The profile questions you answer exist only in your browser session. When you close or refresh the page, this information is gone. Chat conversations are processed through Anthropic's API. We do not store or review your chat conversations." },
            { title: "About the AI chatbot", body: "The candidate simulations are AI-generated based on verified 2025 federal election platform positions. They are not real people. Always cross-reference with official sources before making voting decisions." },
            { title: "Non-partisan commitment", body: "Tallied presents information about multiple political parties equally. It does not endorse any party, candidate, or political position. The tool is designed to inform, not persuade." },
          ].map(section => (
            <div key={section.title} style={{ marginBottom: '24px' }}>
              <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '16px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>{section.title}</h2>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '15px', color: '#333', lineHeight: 1.75 }}>{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;