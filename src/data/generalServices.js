// General Finance service catalogue.
// Each service: id (slug), name, category, icon (lucide name),
// description, benefits[]. Rendered on the General Finance page.

export const generalCategories = [
  {
    id: 'banking-loans',
    title: 'Banking & Loan Services',
    subtitle: 'Fund every milestone — home, business, education and more.',
  },
  {
    id: 'investment-tax',
    title: 'Investment & Tax Services',
    subtitle: 'Grow and protect your wealth with expert planning.',
  },
  {
    id: 'additional',
    title: 'Additional Services',
    subtitle: 'Specialised solutions beyond traditional finance.',
  },
]

export const generalServices = [
  // ---- Banking & Loans ----
  {
    id: 'home-loans',
    category: 'banking-loans',
    name: 'Home Loans',
    icon: 'Home',
    description:
      'Own your dream home with competitive interest rates, high eligibility and flexible tenures up to 30 years.',
    benefits: ['Attractive interest rates', 'Loans up to 90% of property value', 'Balance transfer & top-up options'],
  },
  {
    id: 'loan-against-property',
    category: 'banking-loans',
    name: 'Loan Against Property',
    icon: 'Building2',
    description:
      'Unlock the value of your residential or commercial property for business or personal needs.',
    benefits: ['High loan value', 'Lower interest than personal loans', 'Retain ownership of property'],
  },
  {
    id: 'personal-loans',
    category: 'banking-loans',
    name: 'Personal Loans',
    icon: 'Wallet',
    description:
      'Instant funds for weddings, travel, medical or any personal requirement — no collateral needed.',
    benefits: ['Minimal documentation', 'Quick disbursal', 'Flexible repayment tenures'],
  },
  {
    id: 'business-loans',
    category: 'banking-loans',
    name: 'Business Loans',
    icon: 'Briefcase',
    description:
      'Fuel expansion, inventory or cash flow with tailored business financing for enterprises of every size.',
    benefits: ['Collateral-free options', 'Customised repayment', 'Fast processing'],
  },
  {
    id: 'msme-loans',
    category: 'banking-loans',
    name: 'MSME Loans',
    icon: 'Factory',
    description:
      'Government-backed and institutional funding designed for micro, small and medium enterprises.',
    benefits: ['Subsidised interest schemes', 'Higher eligibility', 'Support for new & existing units'],
  },
  {
    id: 'educational-loans',
    category: 'banking-loans',
    name: 'Educational Loans',
    icon: 'GraduationCap',
    description:
      'Finance higher education in India and abroad with coverage for tuition, living and travel costs.',
    benefits: ['Covers full course cost', 'Moratorium during study', 'Tax benefits under 80E'],
  },
  {
    id: 'car-loans',
    category: 'banking-loans',
    name: 'Car Loans (New & Used)',
    icon: 'Car',
    description:
      'Drive home your new or pre-owned vehicle with up to 100% on-road financing and quick approvals.',
    benefits: ['New & used vehicles', 'Up to 100% funding', 'Attractive rates'],
  },
  {
    id: 'machinery-loans',
    category: 'banking-loans',
    name: 'Machinery Loans',
    icon: 'Cog',
    description:
      'Purchase or upgrade plant and machinery to scale your production capacity.',
    benefits: ['Equipment-backed funding', 'Flexible tenures', 'Preserve working capital'],
  },
  {
    id: 'project-finance',
    category: 'banking-loans',
    name: 'Project Finance',
    icon: 'LayoutTemplate',
    description:
      'Structured, long-term funding for large infrastructure, industrial and commercial projects.',
    benefits: ['Tailored structuring', 'Long repayment horizon', 'Advisory support'],
  },
  {
    id: 'working-capital-loans',
    category: 'banking-loans',
    name: 'Working Capital Loans',
    icon: 'RefreshCw',
    description:
      'Keep operations running smoothly with funding for day-to-day business expenses.',
    benefits: ['Improves liquidity', 'Renewable limits', 'Fast access to funds'],
  },
  {
    id: 'term-loans',
    category: 'banking-loans',
    name: 'Term Loans',
    icon: 'CalendarClock',
    description:
      'Fixed-tenure funding for capital expenditure with predictable EMIs and clear timelines.',
    benefits: ['Fixed or floating rates', 'Structured repayment', 'Suited to expansion plans'],
  },
  {
    id: 'overdraft',
    category: 'banking-loans',
    name: 'Overdraft (OD)',
    icon: 'CreditCard',
    description:
      'Withdraw more than your account balance up to a sanctioned limit — pay interest only on what you use.',
    benefits: ['Interest on usage only', 'On-demand liquidity', 'Renewable facility'],
  },
  {
    id: 'loan-against-securities',
    category: 'banking-loans',
    name: 'Loan Against Securities',
    icon: 'LineChart',
    description:
      'Borrow against shares, mutual funds and bonds without liquidating your investments.',
    benefits: ['Retain your portfolio', 'Quick processing', 'Attractive interest'],
  },
  {
    id: 'fixed-deposits',
    category: 'banking-loans',
    name: 'Fixed Deposits',
    icon: 'PiggyBank',
    description:
      'Park your savings in secure, high-yield fixed deposits from leading banks and NBFCs.',
    benefits: ['Assured returns', 'Flexible tenures', 'Loan against FD available'],
  },

  // ---- Investment & Tax ----
  {
    id: 'mutual-funds',
    category: 'investment-tax',
    name: 'Mutual Funds',
    icon: 'TrendingUp',
    description:
      'Build long-term wealth with curated mutual fund portfolios matched to your risk and goals.',
    benefits: ['Goal-based planning', 'SIP & lumpsum options', 'Diversified portfolios'],
  },
  {
    id: 'insurance',
    category: 'investment-tax',
    name: 'Insurance',
    icon: 'ShieldCheck',
    description:
      'Protect your family, health and assets with life, health and general insurance solutions.',
    benefits: ['Life, health & general cover', 'Tax-saving plans', 'Trusted insurers'],
  },
  {
    id: 'income-tax-filing',
    category: 'investment-tax',
    name: 'Income Tax Filing',
    icon: 'FileText',
    description:
      'Accurate, hassle-free ITR filing and tax planning for individuals and businesses.',
    benefits: ['Expert-assisted filing', 'Maximised deductions', 'Timely compliance'],
  },

  // ---- Additional ----
  {
    id: 'school-funding',
    category: 'additional',
    name: 'School Funding',
    icon: 'School',
    description:
      'Institutional funding for schools — infrastructure, expansion and working capital needs.',
    benefits: ['Infrastructure finance', 'Flexible structures', 'Advisory support'],
  },
  {
    id: 'realty-services',
    category: 'additional',
    name: 'Realty Services',
    icon: 'Building',
    description:
      'End-to-end real estate advisory — buying, selling and financing residential & commercial property.',
    benefits: ['Verified listings', 'Financing tie-ups', 'Expert guidance'],
  },
  {
    id: 'it-services',
    category: 'additional',
    name: 'IT Services',
    icon: 'Laptop',
    description:
      'Technology solutions including web, software and digital services for growing businesses.',
    benefits: ['Custom software', 'Web & digital presence', 'Scalable solutions'],
  },
  {
    id: 'software-training',
    category: 'additional',
    name: 'Software Training & Placement',
    icon: 'MonitorSmartphone',
    description:
      'Industry-ready training programs with placement assistance in in-demand technologies.',
    benefits: ['Job-oriented courses', 'Expert trainers', 'Placement assistance'],
  },
]
