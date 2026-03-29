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
      if (a.student === 'In high school') return "Most first jobs for high schoolers pay at or near minimum wage. At $17.20/hr you're making more than students did in 2022 ($15/hr), but the GTA living wage is estimated at $23-25/hr - meaning even full-time minimum wage isn't enough to live independently in most of Ontario.";
      if (a.student === 'Yes, college/university') return "Most student part-time jobs pay at or near minimum wage. At $17.20/hr working 20 hours a week you're making about $17,900/year - around $2,600 more than in 2022. Still well below the $23-25/hr living wage in the GTA though.";
      if (a.income === 'Under $40k') return "If you're earning near minimum wage, the jump to $17.20/hr means roughly $4,000/year more than 2022 rates at full-time hours. But Ontario inflation over the same period eroded much of that gain - groceries, rent, and transit all went up significantly too.";
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
            <h1 className="text-7xl font-bold text-gray-900 mb-3">Tallied</h1>
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
          setCurrentStep('policies');
        }}
      />
    );
  }

  if (currentStep === 'policies') {
    return (
      <PoliciesPage
        answers={userAnswers}
        onComplete={(issues) => {
          setSelectedIssues(issues);
          setCurrentStep('results');
        }}
      />
    );
  }

  if (currentStep === 'results') {
    return (
      <ResultsPage
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
    housing: null
  });

  const questions = [
    {
      key: 'student',
      question: 'What is your current student status?',
      options: ['Yes, college/university', 'In high school', 'Recently graduated', 'Not a student']
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

  const isComplete = answers.student && answers.income && answers.housing;
  const answeredCount = [answers.student, answers.income, answers.housing].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tallied</h1>
          <p className="text-gray-500">Step 1 of 3 - Tell us about yourself</p>
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2].map(i => (
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

function PoliciesPage({ answers, onComplete }) {
  const [selectedIssues, setSelectedIssues] = useState([]);

  const toggleIssue = (key) => {
    if (selectedIssues.includes(key)) {
      setSelectedIssues(selectedIssues.filter(k => k !== key));
    } else if (selectedIssues.length < 3) {
      setSelectedIssues([...selectedIssues, key]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tallied</h1>
          <p className="text-gray-500 mb-1">Step 2 of 3 - See how policies affect you</p>
          <p className="text-sm text-gray-400">Scroll through all 8 issues, then pick your top 3</p>
        </div>

        {policies.map(policy => (
          <div key={policy.id} className="bg-white rounded-2xl shadow-sm p-8 mb-5">
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
              <a
                href={policy.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                {policy.linkLabel}
              </a>
              <p className="text-xs text-gray-400">Source: {policy.source}</p>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-5 sticky bottom-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Which 3 issues matter most to you?
          </h3>
          <p className="text-gray-500 text-sm mb-5">
            Select up to 3 - we'll show you how candidates address YOUR priorities. ({selectedIssues.length}/3 selected)
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {issueOptions.map(issue => {
              const isSelected = selectedIssues.includes(issue.key);
              const isDisabled = !isSelected && selectedIssues.length >= 3;
              return (
                <button
                  key={issue.key}
                  onClick={() => toggleIssue(issue.key)}
                  disabled={isDisabled}
                  className={`p-4 rounded-xl text-left transition-all border-2 ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600'
                      : isDisabled
                      ? 'bg-gray-50 text-gray-300 border-transparent cursor-not-allowed'
                      : 'bg-gray-50 text-gray-700 border-transparent hover:border-blue-200'
                  }`}
                >
                  <div className="text-lg mb-1">{issue.emoji}</div>
                  <div className="font-semibold text-sm">{issue.label}</div>
                  <div className={`text-xs mt-1 ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                    {issue.description}
                  </div>
                </button>
              );
            })}
          </div>
          <button
            onClick={() => selectedIssues.length > 0 && onComplete(selectedIssues)}
            disabled={selectedIssues.length === 0}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              selectedIssues.length > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            See Candidate Comparison
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultsPage({ answers, selectedIssues, onRestart }) {
  const labelMap = {
    student: {
      'Yes, college/university': 'college/university student',
      'In high school': 'high school student',
      'Recently graduated': 'recent grad',
      'Not a student': 'non-student'
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

  const selectedPolicies = policies.filter(p => selectedIssues.includes(p.issueKey));
  const selectedIssueLabels = issueOptions
    .filter(i => selectedIssues.includes(i.key))
    .map(i => i.label);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tallied</h1>
          <p className="text-gray-600 mb-1">
            Step 3 of 3 - Your priorities: <span className="font-semibold text-blue-600">{selectedIssueLabels.join(', ')}</span>
          </p>
          <p className="text-sm text-gray-400">
            Showing results for a {labelMap.student[answers.student]}, {labelMap.income[answers.income]}, {labelMap.housing[answers.housing]}
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 text-center">
          <p className="text-yellow-800 font-medium text-sm">
            Coming soon: See how Carney vs Poilievre would address these exact issues for someone like you.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 text-center">
          <p className="text-green-800 font-medium">
            Ontario's next provincial election is June 5, 2029 - voter registration is free and takes 2 minutes
          </p>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Selected Issues - Deep Dive</h2>

        {selectedPolicies.map(policy => (
          <div key={policy.id} className="bg-white rounded-2xl shadow-sm p-8 mb-5">
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
              <a
                href={policy.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                {policy.linkLabel}
              </a>
              <p className="text-xs text-gray-400">Source: {policy.source}</p>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to do something about it?</h3>
          <p className="text-gray-500 text-sm mb-5">Ontario's next election is June 5, 2029. Registration takes 2 minutes.</p>
          <div className="grid grid-cols-1 gap-3">
            <a
              href="https://www.registertovoteon.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Register to Vote
            </a>
            <a
              href="https://www.elections.on.ca/en/voting-in-ontario/electoral-districts.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-xl transition-colors border-2 border-blue-200"
            >
              Find Your Riding
            </a>
          </div>
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
          Built by Ivana Okpakovwodo - {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

export default App;