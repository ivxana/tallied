import React, { useState } from 'react';

const policies = [
  {
    id: 1,
    title: "OSAP Grant Cuts",
    year: "2019",
    tag: "Education",
    tagColor: "#dbeafe",
    tagText: "#1e40af",
    plain: "The Ford government cut OSAP grants and lowered the income threshold for eligibility. A 10% tuition cut was introduced at the same time, but many students ended up worse off overall because grant reductions outweighed the tuition savings.",
    getImpact: (a) => {
      if (a.student === 'Not a student') return "You're not in post-secondary right now, but if you ever plan to go to college or university in Ontario, you'll face this reduced grant system. Ontario has the highest average tuition in Canada at $8,700/year.";
      if (a.student === 'In high school') return "This directly affects your future. When you head to college or university in Ontario, you'll be applying under the post-2019 OSAP system - which gives out less free money than it used to. Ontario has the highest average tuition in Canada at $8,700/year, so it's worth understanding OSAP before you apply.";
      if (a.student === 'Yes, college/university' && a.income === 'Under $40k') return "At your income level you likely still qualify for OSAP, but the 2019 cuts reduced maximum grants by up to $3,400/year compared to the previous system. You're getting less free money than students did before 2019.";
      if (a.student === 'Yes, college/university' && a.income === '$40k–$75k') return "Your household income puts you in the bracket hit hardest by the 2019 changes. Middle-income families lost between $1,800–$4,200/year in grant eligibility. You're taking on more loans than students did before these cuts.";
      if (a.student === 'Recently graduated') return "You graduated under the post-2019 OSAP system, which means you likely took on more loan debt than students did before the cuts. The 2019 changes also removed the 6-month interest-free grace period on the Ontario portion of your loan after graduation.";
      return "At your income level OSAP grants are very limited. Ontario's average tuition of $8,700/year is the highest in Canada and you're largely paying it yourself or through loans.";
    },
    link: "https://www.ontario.ca/page/learn-about-osap",
    linkLabel: "Learn more about OSAP"
  },
  {
    id: 2,
    title: "Rent Control Removed for New Units",
    year: "2018",
    tag: "Housing",
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
    linkLabel: "Know your tenant rights"
  },
  {
    id: 3,
    title: "Bill 184 - Illegal Rent Increases",
    year: "2020",
    tag: "Housing",
    tagColor: "#fef3c7",
    tagText: "#92400e",
    plain: "Bill 184 changed the rules so that if a landlord illegally raises your rent and you don't formally dispute it within 12 months, it becomes permanently legal. Before this bill, illegal increases stayed illegal no matter how long you waited.",
    getImpact: (a) => {
      if (a.housing === 'Renting') return "This is a trap you need to know about. If your landlord charges you more than the legal guideline and you quietly pay it for 12 months, you permanently lose the right to dispute it - and that higher amount becomes your new baseline rent forever. Always check your rent increase notices.";
      if (a.housing === 'Living with family') return "When you move into your first rental in Ontario, remember: if a landlord overcharges you, you have exactly 12 months to dispute it or it becomes permanent. Don't assume your rent is legal - check it against the annual guidelines.";
      if (a.housing === 'Looking to buy') return "If you're currently renting while saving to buy, make sure your rent increases are legal. Bill 184 means illegal increases become permanent after 12 months of paying them without disputing.";
      return "As a homeowner this doesn't affect you directly, but it's worth knowing if you ever rent out a property - or if family members are renting in Ontario.";
    },
    link: "https://www.acto.ca/bill-184/",
    linkLabel: "Understand Bill 184"
  },
  {
    id: 4,
    title: "OHIP+ Changes - Free Prescriptions",
    year: "2019",
    tag: "Healthcare",
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
    linkLabel: "Check OHIP+ eligibility"
  },
  {
    id: 5,
    title: "Ontario Minimum Wage Increases",
    year: "2022–2024",
    tag: "Labour",
    tagColor: "#ede9fe",
    tagText: "#5b21b6",
    plain: "Ontario's minimum wage rose from $15/hr in 2022 to $17.20/hr in October 2024 - a 14.7% increase over two years. However the living wage in the GTA is estimated at $23–25/hr, meaning full-time minimum wage workers still face a major gap.",
    getImpact: (a) => {
      if (a.student === 'In high school') return "Most first jobs for high schoolers pay at or near minimum wage. At $17.20/hr you're making more than students did in 2022 ($15/hr), but the GTA living wage is estimated at $23–25/hr - meaning even full-time minimum wage isn't enough to live independently in most of Ontario.";
      if (a.student === 'Yes, college/university') return "Most student part-time jobs pay at or near minimum wage. At $17.20/hr working 20 hours a week you're making about $17,900/year - around $2,600 more than in 2022. Still well below the $23–25/hr living wage in the GTA though.";
      if (a.income === 'Under $40k') return "If you're earning near minimum wage, the jump to $17.20/hr means roughly $4,000/year more than 2022 rates at full-time hours. But Ontario inflation over the same period eroded much of that gain - groceries, rent, and transit all went up significantly too.";
      if (a.income === '$40k–$75k') return "You're likely earning above minimum wage, but these increases affect your cost of living indirectly - businesses often raise prices to offset higher labour costs. The gap between minimum wage ($17.20/hr) and GTA living wage ($23–25/hr) also means many workers around you are still cost-burdened.";
      return "At your income level minimum wage increases don't affect your earnings directly. But Ontario's minimum wage is still significantly below the estimated living wage of $23–25/hr in the GTA, meaning many workers are still struggling despite the increases.";
    },
    link: "https://www.ontario.ca/document/your-guide-employment-standards-act-0/minimum-wage",
    linkLabel: "Ontario minimum wage info"
  }
];

function App() {
  const [currentStep, setCurrentStep] = useState('landing');
  const [userAnswers, setUserAnswers] = useState(null);

  if (currentStep === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="max-w-2xl w-full text-center">

            <h1 className="text-7xl font-bold text-gray-900 mb-3">
              Tallied
            </h1>
            <p className="text-xl text-blue-600 font-semibold mb-10">
              This affects you. Get tallied.
            </p>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-10 text-left">
              <p className="text-4xl font-bold text-gray-900 mb-2">57%</p>
              <p className="text-gray-600 leading-relaxed">
               That's how many eligible voters didn't cast a ballot. How many didn't vote for the party making decisions about your rent, your tuition, and your healthcare.
              </p>
            </div>

            <p className="text-lg text-gray-500 mb-10">
              See exactly how Ontario's recent policy changes affect your life, based on your situation. Takes 2 minutes.
            </p>

            <button
              onClick={() => setCurrentStep('form')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-12 rounded-xl text-lg transition-colors shadow-md"
            >
              Get Started →
            </button>

          </div>
        </div>

        <footer className="text-center py-6 text-sm text-gray-400">
          Built by Ivana Okpakovwodo · {new Date().getFullYear()}
        </footer>
      </div>
    );
  }

  if (currentStep === 'form') {
    return (
      <PersonalizationForm
        onComplete={(answers) => {
          setUserAnswers(answers);
          setCurrentStep('results');
        }}
      />
    );
  }

  if (currentStep === 'results') {
    return (
      <ResultsPage
        answers={userAnswers}
        onRestart={() => setCurrentStep('landing')}
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
      options: ['Under $40k', '$40k–$75k', '$75k–$120k', 'Over $120k']
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
          <p className="text-gray-500">3 quick questions to personalize your results</p>
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i < answeredCount ? 'bg-blue-600' : 'bg-gray-300'
                }`}
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
            Show My Impact →
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultsPage({ answers, onRestart }) {
  const labelMap = {
    student: {
      'Yes, college/university': 'college/university student',
      'In high school': 'high school student',
      'Recently graduated': 'recent grad',
      'Not a student': 'non-student'
    },
    income: {
      'Under $40k': 'under $40k income',
      '$40k–$75k': '$40k–$75k income',
      '$75k–$120k': '$75k–$120k income',
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

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Tallied</h1>
          <p className="text-gray-600">
            Showing results for a{' '}
            <span className="font-semibold text-blue-600">{labelMap.student[answers.student]}</span>,{' '}
            <span className="font-semibold text-blue-600">{labelMap.income[answers.income]}</span>,{' '}
            <span className="font-semibold text-blue-600">{labelMap.housing[answers.housing]}</span>
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 text-center">
          <p className="text-green-800 font-medium">
            🗳️ Ontario's next provincial election will come - voter registration is free and takes 2 minutes
          </p>
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
            <a
              href={policy.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              {policy.linkLabel} →
            </a>
          </div>
        ))}

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to do something about it?</h3>
          <p className="text-gray-500 text-sm mb-5">Ontario's next election will come. Registration takes 2 minutes.</p>
          <div className="grid grid-cols-1 gap-3">
            <a
              href="https://www.registertovoteon.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              Register to Vote →
            </a>
            <a
              href="https://www.elections.on.ca/en/voting-in-ontario/electoral-districts.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-xl transition-colors border-2 border-blue-200"
            >
              Find Your Riding →
            </a>
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={onRestart}
            className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
          >
            ← Start over
          </button>
        </div>

        <footer className="text-center py-4 text-sm text-gray-400">
          Built by Ivana Okpakovwodo · {new Date().getFullYear()}
        </footer>

      </div>
    </div>
  );
}

export default App;