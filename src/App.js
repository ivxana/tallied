import React, { useState } from 'react';

const policies = [
  {
    id: 1,
    title: "Rent Control Removed for New Units",
    year: "2018",
    tag: "Housing",
    issueKey: "housing",
    tagColor: "#fef3c7",
    tagText: "#92400e",
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
    tagColor: "#dbeafe",
    tagText: "#1e40af",
    plain: "On February 12, 2026, the Ford government announced the most dramatic OSAP change in the program's history. Starting Fall 2026, OSAP grants drop from a maximum of 85% of your aid to just 25%. The rest - at least 75% - becomes loans you have to repay. The 7-year tuition freeze also ends, with tuition rising up to 2% per year.",
    getImpact: (a) => {
      if (a.student === 'Not a student') return "If you ever plan to go to college or university in Ontario, this change hits you hard. Starting Fall 2026, what used to be mostly free grant money becomes mostly loans. A student who previously got $17,000 in free grants from a $20,000 OSAP package will now only get $5,000 in grants - and owe $15,000 in loans.";
      if (a.student === 'In high school') return "This is probably the most important policy change for your future. When you start university or college this fall or next year, you'll face a completely different OSAP system. A $20,000 aid package that used to give $17,000 in free grants now gives only $5,000 - you'll graduate with significantly more debt than students who started even one year earlier.";
      if (a.student === 'Yes, college/university' && a.income === 'Under $40k') return "If you're returning in Fall 2026, your OSAP package will look very different. What used to be up to 85% free grant money becomes mostly repayable loans. A professor at U of T called this 'relatively regressive' - lower-income students pay several thousand dollars more while wealthier families barely notice the difference.";
      if (a.student === 'Yes, college/university') return "Starting Fall 2026, at least 75% of your provincial OSAP funding becomes loans instead of grants. If you're mid-degree, the changes apply when you re-apply for OSAP. The average Ontario bachelor's grad already carries $30,800 in debt - this change will push that number significantly higher for future graduates.";
      if (a.student === 'Recently graduated') return "You got out just in time. Students starting Fall 2026 face a dramatically worse OSAP system - grants dropping from 85% to 25% of aid. Your debt load would have been significantly higher under these new rules, especially combined with the tuition freeze ending and fees rising up to 2% per year.";
      return "Ontario's OSAP overhaul starting Fall 2026 shifts the financial burden of post-secondary education heavily onto students. Grants drop from 85% to 25% of aid, turning what was mostly free money into mostly debt. This affects anyone with family members heading to college or university in Ontario.";
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
    tagColor: "#d1fae5",
    tagText: "#065f46",
    plain: "When OHIP+ launched in 2018 it gave free prescriptions to everyone under 25. In 2019 the Ford government changed it so that if you have any private insurance you must use that first. OHIP+ only covers what private insurance doesn't pay.",
    getImpact: (a) => {
      if (a.student === 'Yes, college/university') return "If you're on a parent's benefits plan or your school's health plan, OHIP+ no longer covers you first - your private insurance does. Private plans often have co-pays and deductibles, so you're not getting fully free prescriptions anymore even though OHIP+ technically still exists for under-25s.";
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
    tagColor: "#ede9fe",
    tagText: "#5b21b6",
    plain: "Ontario's minimum wage rose from $15/hr in 2022 to $17.20/hr in October 2024 - a 14.7% increase over two years. However the living wage in the GTA is estimated at $23-25/hr, meaning full-time minimum wage workers still face a major gap.",
    getImpact: (a) => {
      if (a.employment === 'Looking for work') return "Ontario's minimum wage is now $17.20/hr, up from $15 in 2022. But the bigger picture for job seekers is that the GTA living wage is $23-25/hr - meaning even a full-time minimum wage job won't cover rent, food, and transit in most of the city. The job market has also tightened due to interest rate hikes slowing the economy.";
      if (a.student === 'In high school') return "Most first jobs for high schoolers pay at or near minimum wage. At $17.20/hr you're making more than students did in 2022 ($15/hr), but the GTA living wage is estimated at $23-25/hr - meaning even full-time minimum wage isn't enough to live independently in most of Ontario.";
      if (a.student === 'Yes, college/university') return "Most student part-time jobs pay at or near minimum wage. At $17.20/hr working 20 hours a week you're making about $17,900/year - around $2,600 more than in 2022. Still well below the $23-25/hr living wage in the GTA though.";
      if (a.employment === 'Employed part-time' || a.income === 'Under $40k') return "If you're earning near minimum wage, the jump to $17.20/hr means roughly $4,000/year more than 2022 rates at full-time hours. But Ontario inflation over the same period eroded much of that gain - groceries, rent, and transit all went up significantly too.";
      if (a.income === '$40k-$75k') return "You're likely earning above minimum wage, but these increases affect your cost of living indirectly - businesses often raise prices to offset higher labour costs. The gap between minimum wage ($17.20/hr) and GTA living wage ($23-25/hr) also means many workers around you are still cost-burdened.";
      return "At your income level minimum wage increases don't affect your earnings directly. But Ontario's minimum wage is still significantly below the estimated living wage of $23-25/hr in the GTA, meaning many workers are still struggling despite the increases.";
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
    tagColor: "#d1fae5",
    tagText: "#14532d",
    plain: "Canada introduced a federal carbon tax in 2019 at $20/tonne, rising to $80/tonne by 2024. Ontario residents received quarterly rebates - around $560/year for individuals. In March 2025, the Carney government cancelled the consumer carbon tax entirely, ending both the tax and the rebates.",
    getImpact: (a) => {
      if (a.income === 'Under $40k') return "When the carbon tax existed, you were likely getting more back in rebates ($560/year in Ontario) than you paid in extra costs - 8 in 10 lower-income Canadians came out ahead. Since Carney cancelled it in March 2025, you no longer get the rebate, but gas is slightly cheaper. The net effect depends on how much you drive and heat your home.";
      if (a.housing === 'Renting') return "As a renter you probably don't pay directly for home heating fuel, so the carbon tax's cost impact on you was relatively low. The $560/year Ontario rebate was essentially free money while it lasted. Now that it's been cancelled (March 2025), both the tax and the rebate are gone.";
      if (a.student === 'In high school' || a.student === 'Yes, college/university') return "As a student, the carbon tax rebate ($560/year in Ontario) was likely more than you paid in extra costs - most young Canadians came out ahead. With its cancellation in March 2025, both the rebate and the tax are gone. The bigger question is what replaces it for climate action.";
      return "Ontario individuals received ~$560/year in carbon rebates before cancellation in March 2025. Whether you came out ahead depended on how much fossil fuel you consumed. The policy debate now shifts to what replaces the carbon tax as Canada's main climate tool.";
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
    tagColor: "#fee2e2",
    tagText: "#991b1b",
    plain: "To fight inflation that hit a 40-year high of 8.1% in 2022, the Bank of Canada raised interest rates 10 times - from 0.25% to 5% between March 2022 and July 2023. This made mortgages, car loans, and lines of credit significantly more expensive for millions of Canadians.",
    getImpact: (a) => {
      if (a.housing === 'Renting') return "Higher interest rates made it harder for people to buy homes, pushing more people into the rental market and driving up rent prices. If your rent increased significantly after 2022, this is part of why. Vacancy rates in Ontario hit 1.5% in late 2023 - one of the lowest ever recorded.";
      if (a.housing === 'Looking to buy') return "This directly affects your home-buying plans. In 2020-2021, you could get a mortgage at under 2%. By 2023 rates were over 6%. On a $500,000 mortgage, that's roughly $1,200 more per month. Many first-time buyers were priced out entirely during this period.";
      if (a.housing === 'Homeowner') return "If you renewed your mortgage after 2022, you likely saw a significant payment increase. Median mortgage payments for variable-rate holders were up 70% by late 2023. About 45% of all Ontario mortgage holders will face renewal shock by end of 2026.";
      if (a.income === 'Under $40k') return "Higher interest rates increased the cost of any debt you carry - credit cards, car loans, student lines of credit. If you have a $10,000 student line of credit, you're paying significantly more interest than you would have in 2021. It also made buying a home essentially impossible for most people in your income range.";
      return "Interest rate hikes made borrowing more expensive across the board. Even if your income is higher, the ripple effects - higher prices, slower economy, tighter job market - affected everyone. Rates have since dropped back to 2.25% (March 2026) but mortgage renewal shock is still hitting thousands of Ontarians.";
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
    tagColor: "#e0f2fe",
    tagText: "#0c4a6e",
    plain: "In March 2025, the US imposed 25% tariffs on Canadian steel, aluminum, and automobiles. Ontario's manufacturing sector - which sends 40% of its output to the US - was hit hardest. Ontario's Financial Accountability Office projects 119,200 fewer jobs in Ontario by 2026 compared to a no-tariff scenario.",
    getImpact: (a) => {
      if (a.employment === 'Looking for work') return "The timing couldn't be worse. US tariffs are projected to cost Ontario 119,200 jobs by 2026 according to the Financial Accountability Office. Manufacturing, auto, and trades jobs - historically strong options for job seekers - are among the most at risk.";
      if (a.student === 'In high school') return "By the time you enter the job market, Ontario's economy could look very different. The FAO projects 119,200 fewer jobs in Ontario by 2026 due to US tariffs. Manufacturing, auto, and steel jobs - traditionally strong entry-level options - are among the most affected sectors.";
      if (a.student === 'Yes, college/university' || a.student === 'Recently graduated') return "If you're studying in or entering fields connected to manufacturing, engineering, or trade, the tariff situation directly affects your job prospects. Ontario's auto and steel industries - which employ hundreds of thousands - are projected to see significant output declines.";
      if (a.income === 'Under $40k') return "Lower-income workers are disproportionately represented in the manufacturing and trades jobs most at risk from tariffs. If you or family members work in auto, steel, or related industries, job security is a real concern. The FAO projects Ontario's manufacturing GDP could drop 8% in 2026.";
      if (a.housing === 'Renting' || a.housing === 'Living with family') return "Tariffs raise prices on goods that contain steel and aluminum - appliances, cars, construction materials. This contributes to overall inflation, making the cost of living more expensive for everyone, including renters who are already stretched thin.";
      return "Even if your job isn't directly in manufacturing, the tariff situation affects Ontario's broader economy - slower growth, potential recession, and higher prices for goods. Ontario's GDP is projected to be 1.8% lower than it would have been without tariffs by 2026, per the Financial Accountability Office.";
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
    tagColor: "#f3e8ff",
    tagText: "#581c87",
    plain: "Bill C-27 (the Digital Charter Implementation Act) is Canada's proposed update to privacy law for the internet age. It would give Canadians the right to delete their data, require companies to explain how AI makes decisions about them, and create Canada's first AI regulation framework. As of 2025 it is still working through Parliament.",
    getImpact: (a) => {
      if (a.student === 'In high school') return "This law directly protects you. It would give you - and your parents - stronger rights to delete information collected about you when you were a child. TikTok, Instagram, and other platforms would face stricter rules about how they collect and use your data. Canada's Privacy Commissioner has been investigating TikTok's practices specifically under this framework.";
      if (a.student === 'Yes, college/university') return "As a college or university student, you generate huge amounts of data - through your devices, school platforms, social media. Bill C-27 would give you the right to know when AI is making decisions about you (like loan approvals or job screening), request explanations, and move your data between services.";
      if (a.student === 'Recently graduated') return "As you enter the workforce, AI is increasingly used in hiring, credit scoring, and performance evaluation. Bill C-27 would require companies to disclose when they're using automated systems to make decisions about you and give you the right to challenge those decisions.";
      return "Bill C-27 affects anyone who uses the internet in Canada - which is everyone. It would strengthen your right to know what data companies hold about you, require them to delete it when asked, and create Canada's first legal framework for regulating AI systems that make decisions affecting your life. Data breaches more than tripled between 2013 and 2022.";
    },
    link: "https://www.parl.ca/legisinfo/en/bill/44-1/c-27",
    linkLabel: "Read about Bill C-27",
    source: "Parliament of Canada / Office of the Privacy Commissioner"
  }
];

const issueOptions = [
  { key: 'housing', label: 'Housing & Affordability', emoji: '🏠', description: 'Rent, home prices, tenant rights' },
  { key: 'education', label: 'Education & Student Debt', emoji: '📚', description: 'Tuition, OSAP, student loans' },
  { key: 'healthcare', label: 'Healthcare & Mental Health', emoji: '🏥', description: 'Wait times, prescriptions, access' },
  { key: 'jobs', label: 'Jobs & Economy', emoji: '💼', description: 'Wages, employment, cost of living' },
  { key: 'climate', label: 'Climate & Environment', emoji: '🌍', description: 'Carbon policy, green jobs, emissions' },
  { key: 'costoflife', label: 'Cost of Living', emoji: '💰', description: 'Inflation, interest rates, affordability' },
  { key: 'canadaus', label: 'Canada-US Relations', emoji: '🇨🇦', description: 'Tariffs, sovereignty, trade' },
  { key: 'privacy', label: 'Privacy & Tech', emoji: '🔒', description: 'Data rights, AI, digital safety' },
];

function App() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [userAnswers, setUserAnswers] = useState(null);
  const [selectedIssues, setSelectedIssues] = useState([]);

  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-2xl w-full text-center">
            <h1 className="text-7xl font-bold text-gray-900 mb-2">Tallied</h1>
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3">
              Politics, Personalized
            </p>
            <p className="text-xl text-blue-600 font-semibold mb-10">
              This affects you. Get tallied.
            </p>
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-10 text-left">
              <p className="text-4xl font-bold text-gray-900 mb-2">57%</p>
              <p className="text-gray-600 leading-relaxed">
                That's the share of eligible Ontario voters who didn't cast a ballot in 2022 - the highest abstention rate in provincial history. Meanwhile the policies they skipped voting on affect your rent, your tuition, and your healthcare.
              </p>
            </div>
            <p className="text-lg text-gray-500 mb-10">
              See exactly how Canadian policy changes affect your life, based on your situation. Takes 5 minutes.
            </p>
            <button
              onClick={() => setCurrentStep('form')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-12 rounded-xl text-lg transition-colors shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>
        <footer className="text-center py-6 text-sm text-gray-400">
          Built by Ivana Okpakovwodo - {new Date().getFullYear()}
        </footer>
      </div>
    );
  }

  if (currentStep === 'form') {
    return (
      <PersonalizationForm
        onComplete={(answers) => {
          setUserAnswers(answers);
          setCurrentStep('priorities');
        }}
      />
    );
  }

  if (currentStep === 'priorities') {
    return (
      <PrioritiesPage
        onComplete={(issues) => {
          setSelectedIssues(issues);
          setCurrentStep('policies');
        }}
      />
    );
  }

  if (currentStep === 'policies') {
    return (
      <PoliciesPage
        answers={userAnswers}
        selectedIssues={selectedIssues}
        onComplete={() => setCurrentStep('results')}
      />
    );
  }

  if (currentStep === 'results') {
    return (
      <ResultsPage
        answers={userAnswers}
        selectedIssues={selectedIssues}
        onContinue={() => setCurrentStep('summary')}
        onRestart={() => {
          setCurrentStep('landing');
          setSelectedIssues([]);
          setUserAnswers(null);
        }}
      />
    );
  }

  if (currentStep === 'summary') {
    return (
      <DecisionSummaryPage
        answers={userAnswers}
        selectedIssues={selectedIssues}
        onRestart={() => {
          setCurrentStep('landing');
          setSelectedIssues([]);
          setUserAnswers(null);
        }}
      />
    );
  }
}

function PersonalizationForm({ onComplete }) {
  const [answers, setAnswers] = useState({
    student: null,
    income: null,
    housing: null,
    employment: null
  });

  const questions = [
    {
      key: 'student',
      question: 'What is your current student status?',
      options: ['Yes, college/university', 'In high school', 'Recently graduated', 'Not a student']
    },
    {
      key: 'employment',
      question: "What's your employment situation?",
      options: ['Employed full-time', 'Employed part-time', 'Looking for work', 'Not currently working']
    },
    {
      key: 'income',
      question: "What's your household income range?",
      options: ['Under $40k', '$40k-$75k', '$75k-$120k', 'Over $120k']
    },
    {
      key: 'housing',
      question: "What's your housing situation?",
      options: ['Renting', 'Homeowner', 'Living with family', 'Looking to buy']
    }
  ];

  const isComplete = answers.student && answers.income && answers.housing && answers.employment;
  const answeredCount = [answers.student, answers.employment, answers.income, answers.housing].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tallied</h1>
          <p className="text-gray-500">Step 1 of 3 - Tell us about yourself</p>
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${i < answeredCount ? 'bg-blue-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        {questions.map(({ key, question, options }) => (
          <div key={key} className="bg-white rounded-2xl shadow-sm p-8 mb-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-5">{question}</h2>
            <div className="grid grid-cols-2 gap-3">
              {options.map(option => (
                <button
                  key={option}
                  onClick={() => setAnswers({ ...answers, [key]: option })}
                  className={`py-3 px-4 rounded-xl font-medium text-sm transition-all border-2 ${
                    answers[key] === option
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-50 text-gray-700 border-transparent hover:border-blue-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-6">
          <button
            onClick={() => isComplete && onComplete(answers)}
            disabled={!isComplete}
            className={`py-4 px-12 rounded-xl font-semibold text-lg transition-all ${
              isComplete
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            See How Policy Affects You
          </button>
        </div>
      </div>
    </div>
  );
}

function PrioritiesPage({ onComplete }) {
  const [selected, setSelected] = useState([]);

  const toggle = (key) => {
    if (selected.includes(key)) {
      setSelected(selected.filter(k => k !== key));
    } else if (selected.length < 3) {
      setSelected([...selected, key]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tallied</h1>
          <div className="flex justify-center gap-2 mt-3 mb-3">
            {['Profile', 'Priorities', 'Policies', 'Comparison', 'Summary'].map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-blue-600' : i < 1 ? 'bg-blue-300' : 'bg-gray-200'}`} />
                <span className={`text-xs hidden sm:inline ${i === 1 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-5">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What matters most to you?</h2>
          <p className="text-gray-500 text-sm mb-6">
            Pick your top 3 issues. We'll show you exactly how recent policy decisions have affected people in your situation - and how today's candidates plan to address them. ({selected.length}/3 selected)
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {issueOptions.map(issue => {
              const isSelected = selected.includes(issue.key);
              const isDisabled = !isSelected && selected.length >= 3;
              return (
                <button
                  key={issue.key}
                  onClick={() => toggle(issue.key)}
                  disabled={isDisabled}
                  className={`p-4 rounded-xl text-left transition-all border-2 ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600'
                      : isDisabled
                      ? 'bg-gray-50 text-gray-300 border-transparent cursor-not-allowed'
                      : 'bg-gray-50 text-gray-700 border-transparent hover:border-blue-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{issue.emoji}</div>
                  <div className="font-semibold text-sm">{issue.label}</div>
                  <div className={`text-xs mt-1 ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                    {issue.description}
                  </div>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => selected.length > 0 && onComplete(selected)}
            disabled={selected.length === 0}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              selected.length > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            See How These Issues Affect You
          </button>
        </div>
      </div>
    </div>
  );
}

function PolicyCard({ policy, answers }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-5">
      <div className="flex items-start justify-between mb-3">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: policy.tagColor, color: policy.tagText }}
        >
          {policy.tag}
        </span>
        <span className="text-sm text-gray-400">{policy.year}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{policy.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{policy.plain}</p>
      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
          How this affects you
        </p>
        <p className="text-gray-800 text-sm leading-relaxed">
          {policy.getImpact(answers)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <a href={policy.link} target="_blank" rel="noopener noreferrer"
          className="text-blue-600 text-sm font-medium hover:underline">
          {policy.linkLabel}
        </a>
        <p className="text-xs text-gray-400">Source: {policy.source}</p>
      </div>
    </div>
  );
}

function PoliciesPage({ answers, selectedIssues, onComplete }) {
  const [showAll, setShowAll] = useState(false);

  const priorityPolicies = policies.filter(p => selectedIssues.includes(p.issueKey));
  const otherPolicies = policies.filter(p => !selectedIssues.includes(p.issueKey));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tallied</h1>
          <div className="flex justify-center gap-2 mt-3 mb-3">
            {['Profile', 'Priorities', 'Policies', 'Comparison', 'Summary'].map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-blue-600' : i < 2 ? 'bg-blue-300' : 'bg-gray-200'}`} />
                <span className={`text-xs hidden sm:inline ${i === 2 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Signpost */}
        <div className="bg-blue-600 rounded-2xl p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-2">Step 3: Understand the Landscape</h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Before comparing candidates, see how recent policy decisions have already affected people like you. This is your context - what's actually happened, and what's at stake.
          </p>
        </div>

        {/* Priority policies */}
        <h3 className="text-lg font-bold text-gray-700 mb-4">📌 Your Priority Issues</h3>
        {priorityPolicies.map(policy => (
          <PolicyCard key={policy.id} policy={policy} answers={answers} />
        ))}

        {/* Explore all toggle */}
        {!showAll ? (
          <button
            onClick={() => setShowAll(true)}
            className="w-full py-4 rounded-xl font-medium text-gray-600 bg-white border-2 border-gray-200 hover:border-blue-300 transition-all mb-6"
          >
            Explore all 8 issues ↓
          </button>
        ) : (
          <>
            <h3 className="text-lg font-bold text-gray-700 mb-4 mt-2">🗂 Other Issues</h3>
            {otherPolicies.map(policy => (
              <PolicyCard key={policy.id} policy={policy} answers={answers} />
            ))}
            <button
              onClick={() => setShowAll(false)}
              className="w-full py-3 rounded-xl font-medium text-gray-400 text-sm mb-6"
            >
              Show less ↑
            </button>
          </>
        )}

        {/* Continue signpost */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to compare candidates?</h3>
          <p className="text-gray-500 text-sm mb-5">
            Now that you understand how policies have affected people like you, let's see what Carney and Poilievre actually plan to do about your top priorities.
          </p>
          <button
            onClick={onComplete}
            className="w-full py-4 rounded-xl font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all"
          >
            Compare Candidates on My Priorities →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Candidate comparison data ───────────────────────────────────────────────
// Sources:
//   Liberal: liberal.ca/plan, liberal.ca/housing-plan, liberal.ca/cstrong/build, pm.gc.ca
//   Conservative: conservative.ca/poilievre-unveils-his-plan-for-change, conservative.ca
//   NDP: ndp.ca/news/singh-announces-campaign-commitments, cp24.com NDP platform April 2025
//   All party positions reflect official 2025 federal election platforms.
//   Carney won the April 2025 election; some Liberal promises are now in effect.

const candidateComparison = {
  housing: {
    liberal: {
      bottomLine: "Focused on helping first-time buyers get in the door.",
      what: "Carney's government removed the GST (a federal sales tax) for first-time homebuyers on homes under $1 million - that saves you up to $50,000 upfront. They also want to build 500,000 new homes per year by getting the government involved in construction again, similar to how Canada built housing after World War II. This is already government policy.",
      source: "https://www.pm.gc.ca/en/news/news-releases/2025/03/20/prime-minister-mark-carney-will-eliminate-gst-for-first-time-homebuyers",
      sourceLabel: "PM announcement - GST for first-time buyers"
    },
    conservative: {
      bottomLine: "Went furthest on housing - tax cuts for all buyers, not just first-timers.",
      what: "Poilievre promised to remove the GST on ALL new homes under $1.3 million - not just for first-time buyers. He also wanted to sell federal government land and buildings to developers to build homes faster, and cut funding to cities that slow down new home approvals. His goal was 2.3 million homes in 5 years.",
      source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/",
      sourceLabel: "Conservative plan for change"
    },
    ndp: {
      bottomLine: "Most focused on renters and people who can't afford to buy at all.",
      what: "The NDP wanted to build 3 million homes by 2030 and make national rent control a condition for any city or province that wants federal housing money. In plain terms: if the federal government gives your city money for housing, that city has to cap how much landlords can raise rent. They also wanted to protect existing social housing from being bought up by large investment companies.",
      source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing",
      sourceLabel: "NDP campaign commitments"
    },
    getPersonalized: (a) => {
      if (a.housing === 'Renting') return "As a renter, Carney and Poilievre's plans mostly help people buying homes - not you right now. The NDP's rent control proposal would have had the most direct impact on what you pay monthly. Since NDP lost the election, none of that is happening federally. The rent control that exists is provincial.";
      if (a.housing === 'Looking to buy') return "The Liberal GST cut is now law - if you buy your first home under $1 million, you save up to $50,000 in tax. Poilievre would have gone further and removed GST for everyone, not just first-timers. NDP focused more on building affordable rentals than helping people buy.";
      if (a.housing === 'Living with family') return "When you eventually move out, the Liberal GST cut (already in effect) means your first home purchase under $1M comes with up to $50,000 in tax savings. All parties promised to build more homes - which should eventually bring prices down.";
      return "All parties promised major housing construction. Liberals are now in government implementing their plan. If you're a homeowner, more supply eventually helps the broader market even if it doesn't directly lower your mortgage.";
    }
  },
  education: {
    liberal: {
      bottomLine: "Mostly silent on student debt and tuition - this was a weak spot.",
      what: "Carney's 2025 platform had almost nothing specifically for post-secondary students. No promises to lower tuition, cancel debt, or fix OSAP (that's a provincial issue anyway). The main benefit was a tax cut that saves working Canadians up to $825 a year - helpful if you work while studying, but not transformational for student finances.",
      source: "https://thegauntlet.ca/2025/04/25/the-liberal-partys-plan-for-students-steady-with-short-reach/",
      sourceLabel: "The Gauntlet - Liberal plan for students"
    },
    conservative: {
      bottomLine: "Made loan repayment more flexible, but didn't cancel debt.",
      what: "Poilievre promised income-contingent repayment for student loans - meaning you only start paying back your loans once you're earning enough money to afford it. He also wanted to make the interest on student lines of credit tax-deductible, so you'd get some money back at tax time. No promises on tuition or wiping out debt.",
      source: "https://universityaffairs.ca/news/where-do-the-federal-election-candidates-stand-on-postsecondary-education/",
      sourceLabel: "University Affairs - party education platforms"
    },
    ndp: {
      bottomLine: "Most ambitious for students - free tuition and debt cancellation.",
      what: "The NDP made the biggest promises: cancel existing student debt entirely, and eventually make tuition free at public colleges and universities. They also wanted federal funding for affordable student housing. These are long-standing NDP commitments. The catch: the NDP lost the 2025 election badly and lost official party status, so none of this is happening.",
      source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing",
      sourceLabel: "NDP campaign commitments"
    },
    getPersonalized: (a) => {
      if (a.student === 'In high school') return "Important to know: the OSAP cuts you'll face when you start university are a Ford provincial government decision - the federal parties don't control OSAP. Federally, NDP promised the most for students (free tuition, cancel debt) but lost the election. Liberals and Conservatives had very little for students specifically.";
      if (a.student === 'Yes, college/university') return "None of the federal parties promised to fix Ontario's OSAP cuts - that's on the Ford government, not Ottawa. Federally, NDP promised full debt cancellation and free tuition but lost the election. Conservatives offered more flexible loan repayment. Liberals were largely quiet on student finances.";
      if (a.student === 'Recently graduated') return "Conservatives' flexible repayment plan would have helped you most - paying back loans only once you earn enough. NDP promised full cancellation. Liberals offered little. Since Liberals won, your federal student loan situation stays as-is.";
      return "Federal parties had limited education platforms in 2025. The OSAP cuts are provincial. Federally, NDP had the boldest student promises but lost. The Liberal government in place offers a modest tax cut but nothing specific for student debt or tuition.";
    }
  },
  healthcare: {
    liberal: {
      bottomLine: "Expanding what's already covered - dental and some prescriptions.",
      what: "Carney's government is expanding dental care coverage to Canadians aged 18 to 64. That means if you don't have dental benefits through work or school, you can now access government-covered dental care - saving around $800 per person per year. They're also covering insulin and birth control through pharmacare, and investing $4 billion in building more local health clinics to reduce wait times.",
      source: "https://liberal.ca/mark-carneys-liberals-take-action-to-make-life-more-affordable/",
      sourceLabel: "Liberal affordability announcement"
    },
    conservative: {
      bottomLine: "No new healthcare spending - focused on fixing the system, not expanding it.",
      what: "Poilievre's platform didn't promise major new healthcare programs or funding. His focus was on reducing government spending overall and letting the system become more efficient. He opposed expanding pharmacare. In practice, this would have meant no new benefits for most Canadians, but also no new taxes to pay for them.",
      source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/",
      sourceLabel: "Conservative plan for change"
    },
    ndp: {
      bottomLine: "Most ambitious - wanted every Canadian covered for doctor, dental, and prescriptions.",
      what: "The NDP promised the biggest expansion of Canadian healthcare since Medicare was created. Every Canadian would have a family doctor by 2030. All prescriptions - not just insulin and birth control - would eventually be covered for free. Mental health therapy and counselling would be covered too. They also wanted to stop US companies from buying Canadian hospitals or clinics.",
      source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing",
      sourceLabel: "NDP campaign commitments"
    },
    getPersonalized: (a) => {
      if (a.student === 'Yes, college/university' || a.student === 'In high school') return "The Liberal dental expansion to ages 18-64 is already happening - if you don't have dental coverage through school or a parent's plan, you may now qualify. NDP promised to go much further with full pharmacare and mental health coverage, but they lost the election.";
      if (a.income === 'Under $40k' || a.employment === 'Looking for work' || a.employment === 'Not currently working') return "Without employer benefits, you pay out of pocket for dental and prescriptions. The Liberal dental expansion (now in effect) directly helps you. NDP's full pharmacare would have helped even more - free prescriptions regardless of income or job. Conservatives offered nothing new here.";
      return "Liberals are expanding dental care to ages 18-64 and covering insulin and birth control. NDP wanted to go further - cover all prescriptions and guarantee everyone a family doctor. Conservatives planned no new healthcare programs.";
    }
  },
  jobs: {
    liberal: {
      bottomLine: "Small tax cut for workers, focused on protecting jobs from US tariffs.",
      what: "Carney cut income taxes slightly for the middle class - saving a household with two working adults up to $825 a year. That's roughly $70 a month. He also promised that every dollar Canada collects from retaliatory tariffs on US goods goes directly to support Canadian workers and businesses affected by the trade war. Employment Insurance (EI - the program that pays you when you lose your job) is being updated to better cover gig workers and freelancers.",
      source: "https://liberal.ca/mark-carneys-liberals-take-action-to-make-life-more-affordable/",
      sourceLabel: "Liberal affordability announcement"
    },
    conservative: {
      bottomLine: "Bigger tax cut, betting on oil and resource jobs to grow the economy.",
      what: "Poilievre promised a larger income tax cut - saving the average worker $900 a year, and families with two incomes $1,800 a year. He planned to fund this by cutting government spending and growing the economy through more oil, mining, and natural resource extraction. His argument: more resource jobs = more tax revenue = lower taxes for everyone. Critics argued this mainly helps higher earners and depends on oil prices staying high.",
      source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/",
      sourceLabel: "Conservative plan for change"
    },
    ndp: {
      bottomLine: "Best for low-income workers and people between jobs.",
      what: "The NDP wanted to raise the basic personal amount - the amount of money you can earn before paying any federal income tax at all - from about $16,000 to $19,500. For a minimum wage worker, this would mean paying little to no federal income tax. They also wanted to make Employment Insurance easier to qualify for, extend how long you can receive it, and expand it to cover gig workers and freelancers who currently get nothing when they lose work.",
      source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing",
      sourceLabel: "NDP campaign commitments"
    },
    getPersonalized: (a) => {
      if (a.employment === 'Looking for work') return "NDP's EI improvements would have helped you most - easier to qualify, longer duration, higher payments. Liberal EI modernization is happening but more slowly. Conservative plan focused on creating new jobs through resource extraction, not supporting people between jobs.";
      if (a.employment === 'Employed part-time' || a.income === 'Under $40k') return "NDP's plan to raise the tax-free threshold to $19,500 would have been the biggest benefit for you - most part-time and minimum wage workers would pay little to no federal income tax. Liberal tax cut helps a bit. Conservative cut is larger but you need to earn more to feel it.";
      if (a.student === 'Yes, college/university' || a.student === 'In high school') return "NDP's higher tax-free threshold ($19,500) would mean most student jobs pay zero federal income tax. Liberal cut (now in effect) saves working students something. Conservative cut is bigger but mainly benefits people earning above average - most students aren't there yet.";
      return "Liberal tax cut (up to $825/family) is now law. Conservative promised bigger cuts ($1,800/family) paid for by spending cuts and resource revenue. NDP focused on making sure low earners pay nothing and people between jobs are properly supported.";
    }
  },
  climate: {
    liberal: {
      bottomLine: "Cancelled the gas price tax but kept rules for big polluters.",
      what: "Carney cancelled the consumer carbon tax - the fee that was added to gas, home heating, and other fuels - in March 2025. You no longer pay that. But big industrial companies like oil refineries and factories still have to pay for their pollution. The government is also offering money to help Canadians buy more energy-efficient appliances, electric vehicles, and home upgrades - though you have to apply for these grants.",
      source: "https://liberal.ca/cstrong/build/",
      sourceLabel: "Liberal build plan - climate section"
    },
    conservative: {
      bottomLine: "Would have scrapped all carbon rules and focused on oil and gas growth.",
      what: "Poilievre wanted to cancel not just the consumer carbon tax (which Carney already did) but all carbon pricing - including the rules that big companies follow. His approach: instead of charging polluters, give them tax credits if they choose to reduce emissions voluntarily. He also wanted to build more pipelines and expand oil and gas production. Critics say this approach doesn't actually reduce emissions; supporters say it keeps energy cheaper.",
      source: "https://www.conservative.ca/poilievre-announces-new-canada-first-economic-action-plan/",
      sourceLabel: "Conservative Canada First Economic Action Plan"
    },
    ndp: {
      bottomLine: "Strongest on climate - make polluters pay and help households go green for free.",
      what: "The NDP wanted to keep charging big polluters for their emissions AND stop giving oil and gas companies $18 billion in government subsidies every year. They also had the most ambitious program to help regular people: free home energy upgrades (insulation, heat pumps) for low-income households, potentially saving up to $4,500 a year on energy bills. They also brought back the $5,000 rebate for buying an electric vehicle.",
      source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing",
      sourceLabel: "NDP campaign commitments"
    },
    getPersonalized: (a) => {
      if (a.income === 'Under $40k') return "NDP's free home retrofit for low-income households would have been the biggest direct benefit - cutting your energy bills by up to $4,500/year with no upfront cost. Liberal green grants exist but require you to pay first and apply for reimbursement. Conservative plan had nothing targeted at lower-income Canadians on climate.";
      if (a.housing === 'Renting') return "As a renter you don't control your heating system or appliances, so most green home grants don't apply to you. The consumer carbon tax cancellation (already done by Carney) saves you a bit on gas. NDP's EV rebate would have helped if you buy a car. Honestly climate policy affects renters more through future extreme weather costs than immediate benefits.";
      if (a.student === 'In high school' || a.student === 'Yes, college/university') return "This is your generation's issue more than any other. Liberals cancelled the consumer tax but kept industrial rules. NDP kept the most climate action and cut oil subsidies. Conservatives would have removed all carbon rules and expanded fossil fuels. The differences between parties here are significant and long-lasting.";
      return "Liberals cancelled consumer carbon tax (done) but kept industrial pricing. NDP would have kept industrial pricing AND cut fossil fuel subsidies AND provided home retrofit grants. Conservatives wanted to remove all carbon pricing entirely and grow oil and gas - the most different from the other two.";
    }
  },
  costoflife: {
    liberal: {
      bottomLine: "Tax cut, cheaper gas, and dental care - modest but real.",
      what: "Carney's government delivered three main cost-of-living wins: a small income tax cut (up to $825/year for a two-income family), the cancellation of the carbon tax which saves about 18 cents per litre of gas, and expanding dental coverage so more Canadians don't have to pay out of pocket for basic dental work. These are already in effect.",
      source: "https://liberal.ca/mark-carneys-liberals-take-action-to-make-life-more-affordable/",
      sourceLabel: "Liberal affordability announcement"
    },
    conservative: {
      bottomLine: "Bigger tax cut - but mostly benefits people who already earn decent wages.",
      what: "Poilievre promised a larger income tax cut - saving workers $900/year and two-income families $1,800/year - by cutting government spending. He also wanted to cancel all carbon pricing (saving more on gas than Carney did) and freeze the tax on alcohol. The bigger tax cut sounds great, but economists noted it benefits higher earners more since it's a flat rate cut - if you don't earn much, you don't save much.",
      source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/",
      sourceLabel: "Conservative plan for change"
    },
    ndp: {
      bottomLine: "Targeted the actual things eating up your budget - groceries, internet, heat.",
      what: "The NDP's approach was different: instead of income tax cuts (which help more if you earn more), they wanted to directly cap prices on grocery staples and permanently remove the GST from things everyone buys - groceries, home heating bills, internet plans, diapers. For someone spending most of their income on basics, this would have helped more than a tax cut. Funded by a new tax on households worth over $10 million.",
      source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing",
      sourceLabel: "NDP campaign commitments"
    },
    getPersonalized: (a) => {
      if (a.income === 'Under $40k') return "NDP's approach would have helped you most - capping grocery prices and removing tax from your internet and heating bills hits your biggest expenses directly. Tax cuts are less useful when you don't earn much. Liberal dental expansion also helps if you have no coverage. Conservative tax cut is larger but you'd need to earn more to feel it.";
      if (a.housing === 'Renting') return "Your biggest costs are rent, groceries, and utilities. No federal party capped rent - that's provincial. But NDP removing GST from heating and internet would have directly cut your monthly bills. Liberal tax cut puts a bit back in your pocket. Conservative cut is larger but mostly benefits higher earners.";
      if (a.student === 'Yes, college/university' || a.student === 'In high school') return "As a student, your money goes to food, phone bills, and transit. NDP's GST removal from grocery and internet bills would have helped directly. Liberal tax cut helps if you work. Conservative tax cut is bigger but you'd need to be earning a real salary to benefit much.";
      return "Liberal delivered modest tax cut and cheaper gas. Conservative promised bigger tax cut paid for by spending cuts. NDP focused on directly reducing the cost of groceries, heat and internet - a different philosophy that benefits people who spend most of their income on basics.";
    }
  },
  canadaus: {
    liberal: {
      bottomLine: "Fighting back against the US while protecting Canadian workers.",
      what: "When the US put tariffs (extra taxes) on Canadian steel, aluminum and cars, Carney responded by putting matching tariffs on US goods coming into Canada. Every dollar Canada collects from those tariffs is being directed to Canadian workers and businesses affected by the trade war - like auto workers in Ontario. The longer-term goal is to make Canada less dependent on the US by building better trade relationships with Europe and Asia.",
      source: "https://www.canada.ca/en/department-finance/news/2025/03/canada-responds-to-unjustified-us-tariffs-on-canadian-steel-and-aluminum-products.html",
      sourceLabel: "Canada.ca - response to US tariffs"
    },
    conservative: {
      bottomLine: "Renegotiate the deal and grow our own economy so we need the US less.",
      what: "Poilievre's plan was to renegotiate Canada's trade deal with the US (called CUSMA) early, before it was due for review in 2026. He also wanted to remove trade barriers between Canadian provinces - right now it's actually easier for Ontario to trade with the US than with Alberta in some industries. His long-term strategy: grow Canada's oil and resource sector so we generate enough wealth to be less dependent on any single trading partner.",
      source: "https://www.conservative.ca/poilievre-unveils-his-plan-for-change/",
      sourceLabel: "Conservative plan for change"
    },
    ndp: {
      bottomLine: "Protect workers first - and don't trade away Canadian healthcare to get a deal.",
      what: "The NDP's main positions: whatever deal Canada makes with the US, Canadian healthcare must stay completely off the table - no allowing US companies to run Canadian hospitals as part of any trade agreement. They also wanted to make Employment Insurance easier to access for workers who lose jobs because of tariffs, and invest in Canadian-made products through a 'Buy Canadian' strategy.",
      source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing",
      sourceLabel: "NDP campaign commitments"
    },
    getPersonalized: (a) => {
      if (a.employment === 'Looking for work') return "The tariff situation is directly reducing job opportunities in Ontario right now - the province's financial watchdog projects 119,200 fewer jobs by 2026. Liberal government is directing tariff revenues to displaced workers. NDP wanted stronger EI for job losses. Conservative plan was more about long-term economic growth than immediate job protection.";
      if (a.income === 'Under $40k' || a.employment === 'Employed part-time') return "Tariffs make everyday goods more expensive - things made with Canadian steel and aluminum like cars, appliances, and construction materials all cost more. Liberal government is using tariff revenue to support affected workers. NDP's 'Buy Canadian' approach would support domestic jobs. All parties agreed Canada needs to rely on the US less.";
      if (a.student === 'In high school' || a.student === 'Yes, college/university') return "The job market you graduate into will be shaped by how Canada handles this trade war. Liberals are actively building new trade relationships with Europe and Asia. Conservatives wanted to grow the resource sector as Canada's economic base. NDP focused on protecting workers during the transition. The differences matter for what kinds of jobs will exist.";
      return "Liberals are retaliating against US tariffs and directing the revenue to affected workers while diversifying trade. Conservatives planned to renegotiate the trade deal and grow resource exports. NDP focused on worker protections and keeping healthcare out of any trade negotiations.";
    }
  },
  privacy: {
    liberal: {
      bottomLine: "Introduced a privacy law in 2022 but hasn't passed it yet.",
      what: "The Liberals introduced Bill C-27 - a law that would give Canadians the right to see what data companies hold on them, delete it, and understand when AI is making decisions about their lives. But they introduced it in 2022 and it still hasn't passed into law by 2026. Their 2025 election platform made no new digital privacy promises. They're committed to AI regulation but haven't done much concrete yet.",
      source: "https://www.parl.ca/legisinfo/en/bill/44-1/c-27",
      sourceLabel: "Parliament of Canada - Bill C-27 status"
    },
    conservative: {
      bottomLine: "Focused on specific online harms - not broad privacy rights.",
      what: "Poilievre's platform focused on making specific online harms illegal - things like cyberbullying, sharing someone's private photos without consent, and child sexual abuse material. These are already illegal in many cases, but he wanted stronger criminal enforcement. He didn't take a position on Bill C-27 or broader questions about who owns your data and how companies use it.",
      source: "https://pollenize.org/en/elections/canada-2025/pierre-poilievre/",
      sourceLabel: "Pollenize - Conservative platform summary"
    },
    ndp: {
      bottomLine: "Most vocal on tech accountability, but no specific data privacy law.",
      what: "The NDP were the most outspoken about tech companies having too much power - they wanted to crack down on AI-driven misinformation, regulate social media platforms more strongly, and create a foreign agent registry to stop foreign interference in Canadian democracy. They didn't take a specific position on Bill C-27 but were generally in favour of stronger tech accountability.",
      source: "https://www.ndp.ca/news/singh-announces-campaign-commitments-first-budget-focused-health-care-affordability-and-housing",
      sourceLabel: "NDP campaign commitments"
    },
    getPersonalized: (a) => {
      if (a.student === 'In high school') return "Honest answer: no party made your digital privacy a real priority in 2025. Bill C-27 - which would let you delete your data from TikTok, Instagram and other platforms - has been sitting in Parliament since 2022 without passing. NDP was loudest on tech accountability but didn't win. If this matters to you, it's worth knowing that none of the parties treated it seriously.";
      if (a.student === 'Yes, college/university') return "None of the major parties made digital privacy a centrepiece in 2025. The law that would give you rights over your data (Bill C-27) is still not passed. NDP was most vocal about tech accountability and AI. Conservatives focused on specific crimes online. Liberals introduced the bill but haven't moved it forward in 4 years.";
      return "All three parties fell short on digital privacy in 2025. Bill C-27 gives Canadians important rights - know what data is held about you, delete it, understand AI decisions - but it's still not law. NDP strongest on tech accountability generally. Conservatives focused on criminal harms. Liberals stalled on the bill they introduced.";
    }
  }
};

function ResultsPage({ answers, selectedIssues, onContinue, onRestart }) {
  const [showNDP, setShowNDP] = useState(false);

  const selectedIssueLabels = issueOptions
    .filter(i => selectedIssues.includes(i.key))
    .map(i => i.label);

  const labelMap = {
    student: {
      'Yes, college/university': 'college/university student',
      'In high school': 'high school student',
      'Recently graduated': 'recent grad',
      'Not a student': 'non-student'
    },
    employment: {
      'Employed full-time': 'employed full-time',
      'Employed part-time': 'employed part-time',
      'Looking for work': 'looking for work',
      'Not currently working': 'not currently working'
    },
    income: {
      'Under $40k': 'under $40k income',
      '$40k-$75k': '$40k-$75k income',
      '$75k-$120k': '$75k-$120k income',
      'Over $120k': 'over $120k income'
    },
    housing: {
      'Renting': 'renter',
      'Homeowner': 'homeowner',
      'Living with family': 'living with family',
      'Looking to buy': 'looking to buy'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tallied</h1>
          <div className="flex justify-center gap-2 mt-3 mb-3">
            {['Profile', 'Priorities', 'Policies', 'Comparison', 'Summary'].map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${i === 3 ? 'bg-blue-600' : i < 3 ? 'bg-blue-300' : 'bg-gray-200'}`} />
                <span className={`text-xs hidden sm:inline ${i === 3 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>{s}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mb-1">
            Your priorities: <span className="font-semibold text-blue-600">{selectedIssueLabels.join(', ')}</span>
          </p>
          <p className="text-sm text-gray-400">
            Personalized for a {labelMap.student[answers.student]}, {labelMap.employment[answers.employment]}, {labelMap.income[answers.income]}, {labelMap.housing[answers.housing]}
          </p>
        </div>

        {/* Signpost */}
        <div className="bg-blue-600 rounded-2xl p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-2">Step 4: Compare the Candidates</h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Now that you understand how policies have shaped your world, here's what Carney and Poilievre actually propose to do about your priorities - in plain language.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
          <p className="text-blue-800 text-sm text-center">
            These are official 2025 federal election platform positions. Carney won and is now PM - Liberal promises marked ✓ are in effect. All positions sourced from party websites and CBC News.
          </p>
        </div>

        {/* Candidate comparison cards */}
        {selectedIssues.map(issueKey => {
          const comparison = candidateComparison[issueKey];
          const issueInfo = issueOptions.find(i => i.key === issueKey);
          if (!comparison || !issueInfo) return null;

          return (
            <div key={issueKey} className="bg-white rounded-2xl shadow-sm p-6 mb-6">

              {/* Issue header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{issueInfo.emoji}</span>
                <h2 className="text-xl font-bold text-gray-900">{issueInfo.label}</h2>
              </div>

              {/* Personalized impact */}
              <div className="bg-blue-50 rounded-xl p-4 mb-5">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">What this means for you</p>
                <p className="text-gray-800 text-sm leading-relaxed">{comparison.getPersonalized(answers)}</p>
              </div>

              {/* Liberal */}
              <div className="border-l-4 border-red-400 pl-4 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-gray-900">🔴 Mark Carney - Liberal</span>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Current PM</span>
                </div>
                <p className="text-xs font-semibold text-gray-500 italic mb-2">{comparison.liberal.bottomLine}</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">{comparison.liberal.what}</p>
                <a href={comparison.liberal.source} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-red-500 hover:underline">
                  Source: {comparison.liberal.sourceLabel} ↗
                </a>
              </div>

              {/* Conservative */}
              <div className="border-l-4 border-blue-500 pl-4 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-gray-900">🔵 Pierre Poilievre - Conservative</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Opposition Leader</span>
                </div>
                <p className="text-xs font-semibold text-gray-500 italic mb-2">{comparison.conservative.bottomLine}</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">{comparison.conservative.what}</p>
                <a href={comparison.conservative.source} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline">
                  Source: {comparison.conservative.sourceLabel} ↗
                </a>
              </div>

              {/* NDP toggle */}
              {showNDP && (
                <div className="border-l-4 border-orange-400 pl-4 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">🟠 NDP - New Democrats</span>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Lost party status 2025</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-500 italic mb-2">{comparison.ndp.bottomLine}</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">{comparison.ndp.what}</p>
                  <a href={comparison.ndp.source} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-orange-500 hover:underline">
                    Source: {comparison.ndp.sourceLabel} ↗
                  </a>
                </div>
              )}

            </div>
          );
        })}

        {/* NDP toggle button */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowNDP(!showNDP)}
            className="text-sm font-medium text-gray-500 hover:text-gray-800 underline transition-colors"
          >
            {showNDP ? 'Hide NDP positions ↑' : 'Curious about other parties? See NDP positions ↓'}
          </button>
          {showNDP && (
            <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto">
              The NDP lost official party status in the April 2025 election. Jagmeet Singh resigned; Avi Lewis became leader in March 2026. These are the 2025 platform positions.
            </p>
          )}
        </div>

        {/* Continue to summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Seen enough? Let's wrap this up.</h3>
          <p className="text-gray-500 text-sm mb-4">Get a plain-language summary of what you learned and your next steps.</p>
          <button
            onClick={onContinue}
            className="w-full py-4 rounded-xl font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all"
          >
            See My Decision Summary →
          </button>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={onRestart}
            className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
          >
            Start over
          </button>
        </div>

        <footer className="text-center py-4 text-sm text-gray-400">
          Built by Ivana Okpakovwodo · Sources: liberal.ca, conservative.ca, ndp.ca, CBC News, Parliament of Canada
        </footer>
      </div>
    </div>
  );
}

function DecisionSummaryPage({ answers, selectedIssues, onRestart }) {
  const selectedIssueData = issueOptions.filter(i => selectedIssues.includes(i.key));

  const labelMap = {
    student: {
      'Yes, college/university': 'college/university student',
      'In high school': 'high school student',
      'Recently graduated': 'recent grad',
      'Not a student': 'non-student'
    },
    employment: {
      'Employed full-time': 'employed full-time',
      'Employed part-time': 'employed part-time',
      'Looking for work': 'looking for work',
      'Not currently working': 'not currently working'
    },
    income: {
      'Under $40k': 'under $40k',
      '$40k-$75k': '$40k-$75k',
      '$75k-$120k': '$75k-$120k',
      'Over $120k': 'over $120k'
    },
    housing: {
      'Renting': 'renter',
      'Homeowner': 'homeowner',
      'Living with family': 'living with family',
      'Looking to buy': 'looking to buy'
    }
  };

  // Per-issue who-leans-your-way logic
  const issueAlignment = {
    housing: {
      renting: { liberal: false, conservative: false, ndp: true, note: "NDP was the only party that proposed national rent control." },
      buying: { liberal: true, conservative: true, ndp: false, note: "Both Liberal and Conservative removed GST on new homes - Conservative went further." },
      default: { liberal: true, conservative: true, ndp: true, note: "All parties promised major home construction increases." }
    },
    education: {
      student: { liberal: false, conservative: false, ndp: true, note: "NDP was the only party that promised to cancel student debt and pursue free tuition." },
      default: { liberal: false, conservative: false, ndp: true, note: "NDP had the boldest education platform but lost the election." }
    },
    healthcare: {
      low_income: { liberal: true, conservative: false, ndp: true, note: "Liberal dental expansion is now in effect. NDP promised full pharmacare." },
      default: { liberal: true, conservative: false, ndp: true, note: "Liberals expanded dental and pharmacare. NDP promised even more. Conservatives proposed nothing new." }
    },
    jobs: {
      low_wage: { liberal: false, conservative: false, ndp: true, note: "NDP's raised tax-free threshold helps low earners most. Liberal cut helps all workers somewhat." },
      job_seeking: { liberal: true, conservative: false, ndp: true, note: "Liberal tariff revenue goes to affected workers. NDP wanted stronger EI for people between jobs." },
      default: { liberal: true, conservative: true, ndp: false, note: "Both Liberal and Conservative delivered income tax cuts - Conservative's was larger." }
    },
    climate: {
      low_income: { liberal: false, conservative: false, ndp: true, note: "NDP's free home retrofit program would help low-income Canadians most." },
      default: { liberal: true, conservative: false, ndp: true, note: "Liberals kept industrial carbon pricing and invested in clean energy. NDP went furthest. Conservatives would have scrapped all carbon rules." }
    },
    costoflife: {
      low_income: { liberal: false, conservative: false, ndp: true, note: "NDP's grocery caps and GST removal from essentials would help low earners most." },
      renting: { liberal: false, conservative: false, ndp: true, note: "NDP removing GST from heating and internet directly cuts monthly bills for renters." },
      default: { liberal: true, conservative: true, ndp: false, note: "Both parties cut taxes - Conservative's cut was larger but benefits higher earners more." }
    },
    canadaus: {
      job_seeking: { liberal: true, conservative: false, ndp: true, note: "Liberal tariff revenue goes to workers. NDP wanted stronger EI for displaced workers." },
      default: { liberal: true, conservative: true, ndp: true, note: "All parties agreed Canada needs to diversify away from US dependence - different strategies." }
    },
    privacy: {
      default: { liberal: false, conservative: false, ndp: false, note: "No party made digital privacy a real priority in 2025. All fell short." }
    }
  };

  const getAlignment = (issueKey) => {
    const issue = issueAlignment[issueKey];
    if (!issue) return issue?.default;
    if (issueKey === 'housing' && answers.housing === 'Renting') return issue.renting;
    if (issueKey === 'housing' && (answers.housing === 'Looking to buy' || answers.housing === 'Living with family')) return issue.buying;
    if (issueKey === 'education' && (answers.student === 'Yes, college/university' || answers.student === 'In high school' || answers.student === 'Recently graduated')) return issue.student;
    if (issueKey === 'healthcare' && answers.income === 'Under $40k') return issue.low_income;
    if (issueKey === 'jobs' && answers.employment === 'Looking for work') return issue.job_seeking;
    if (issueKey === 'jobs' && (answers.employment === 'Employed part-time' || answers.income === 'Under $40k')) return issue.low_wage;
    if (issueKey === 'climate' && answers.income === 'Under $40k') return issue.low_income;
    if (issueKey === 'costoflife' && answers.income === 'Under $40k') return issue.low_income;
    if (issueKey === 'costoflife' && answers.housing === 'Renting') return issue.renting;
    if (issueKey === 'canadaus' && answers.employment === 'Looking for work') return issue.job_seeking;
    return issue.default;
  };

  const alignments = selectedIssues.map(key => ({
    key,
    info: issueOptions.find(i => i.key === key),
    alignment: getAlignment(key)
  }));

  const liberalScore = alignments.filter(a => a.alignment?.liberal).length;
  const conservativeScore = alignments.filter(a => a.alignment?.conservative).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tallied</h1>
          <div className="flex justify-center gap-2 mt-3 mb-3">
            {['Profile', 'Priorities', 'Policies', 'Comparison', 'Summary'].map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${i === 4 ? 'bg-blue-600' : 'bg-blue-300'}`} />
                <span className={`text-xs hidden sm:inline ${i === 4 ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Intro */}
        <div className="bg-blue-600 rounded-2xl p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-2">Your Decision Summary</h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Based on your priorities and profile, here's a plain-language summary of what you learned - and what to do next. This isn't "here's who to vote for." It's the information you need to decide for yourself.
          </p>
        </div>

        {/* Profile recap */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-5">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Your profile</h3>
          <p className="text-gray-600 text-sm">
            {labelMap.student[answers.student]} · {labelMap.employment[answers.employment]} · {labelMap.income[answers.income]} income · {labelMap.housing[answers.housing]}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Your top priorities: {selectedIssueData.map(i => `${i.emoji} ${i.label}`).join(', ')}
          </p>
        </div>

        {/* Per-issue alignment */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-5">
          <h3 className="text-lg font-bold text-gray-900 mb-4">On your priorities, here's who leans your way</h3>
          {alignments.map(({ key, info, alignment }) => (
            <div key={key} className="mb-5 pb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{info?.emoji}</span>
                <span className="font-semibold text-gray-900 text-sm">{info?.label}</span>
              </div>
              <div className="flex gap-2 mb-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${alignment?.liberal ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-400 line-through'}`}>
                  🔴 Carney
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${alignment?.conservative ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400 line-through'}`}>
                  🔵 Poilievre
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${alignment?.ndp ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-400 line-through'}`}>
                  🟠 NDP
                </span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">{alignment?.note}</p>
            </div>
          ))}
        </div>

        {/* Overall takeaway */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-5 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3">The honest takeaway</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            Based on your priorities and situation:
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm">🔴</span>
              <p className="text-sm text-gray-700">
                <strong>Carney</strong> - {liberalScore === 0
                  ? "None of his positions align with your priorities as someone in your situation. That doesn't mean he's wrong - it means your specific circumstances aren't who his platform was built around."
                  : liberalScore === selectedIssues.length
                  ? `His positions align with all ${selectedIssues.length} of your priorities.`
                  : `His positions align with ${liberalScore} of your ${selectedIssues.length} priorities.`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm">🔵</span>
              <p className="text-sm text-gray-700">
                <strong>Poilievre</strong> - {conservativeScore === 0
                  ? "None of his positions align with your priorities as someone in your situation. That doesn't mean he's wrong - it means your specific circumstances aren't who his platform was built around."
                  : conservativeScore === selectedIssues.length
                  ? `His positions align with all ${selectedIssues.length} of your priorities.`
                  : `His positions align with ${conservativeScore} of your ${selectedIssues.length} priorities.`}
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Politics is about tradeoffs - no candidate perfectly matches anyone. The question isn't who's perfect. It's who's closer to what matters most to you. And that's something only you can decide.
          </p>
        </div>

        {/* Next steps */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-5">
          <h3 className="text-lg font-bold text-gray-900 mb-4">What now?</h3>
          <div className="space-y-3">
            <a href="https://www.registertovoteon.ca/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Register to vote (Ontario)</p>
                <p className="text-xs text-gray-500">Takes 2 minutes - registertovoteon.ca</p>
              </div>
            </a>
            <a href="https://www.elections.ca/content.aspx?section=vot&dir=reg/etr&document=index&lang=e" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <span className="text-xl">✅</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Register to vote (Federal)</p>
                <p className="text-xs text-gray-500">elections.ca</p>
              </div>
            </a>
            <a href="https://www.elections.on.ca/en/voting-in-ontario/electoral-districts.html" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <span className="text-xl">📍</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Find your riding</p>
                <p className="text-xs text-gray-500">Your local candidate matters too</p>
              </div>
            </a>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <span className="text-xl">📅</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Ontario's next provincial election</p>
                <p className="text-xs text-gray-500">June 5, 2029 - put it in your calendar</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <button onClick={onRestart}
            className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
            Start over
          </button>
        </div>

        <footer className="text-center py-4 text-sm text-gray-400">
          Built by Ivana Okpakovwodo · Sources: liberal.ca, conservative.ca, ndp.ca, CBC News, Parliament of Canada
        </footer>
      </div>
    </div>
  );
}

export default App;