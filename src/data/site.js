// Central place for business/contact details used across the site.
// Values fall back to sensible placeholders so the site renders even
// before the client provides final details / .env values.

export const site = {
  name: 'VPACS Financial Services',
  shortName: 'VPACS',
  tagline: 'Finance that moves you forward.',
  description:
    'Premium general and medical education financing solutions built on trust, transparency and speed.',
  phone: import.meta.env.VITE_CONTACT_PHONE || '+91 95538 31325',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'info@vpacspvtltd.com',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '+919553831325',
  address: {
    line1: 'VPACS Financial Services',
    line2: 'Corporate Office, Business District',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
    country: 'India',
  },
  // Google Maps embed query — replace with the exact office location.
  mapQuery: 'Hyderabad, Telangana, India',
  hours: 'Mon – Sat: 9:30 AM – 6:30 PM',
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
    twitter: 'https://twitter.com/',
    youtube: 'https://youtube.com/',
  },
  formEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '',
}

// Structured for animated counters: prefix + value + suffix.
export const stats = [
  { icon: 'Landmark', prefix: '₹', value: 500, suffix: ' Cr+', label: 'Loans Facilitated' },
  { icon: 'Users', prefix: '', value: 12000, suffix: '+', label: 'Happy Customers' },
  { icon: 'Building2', prefix: '', value: 40, suffix: '+', label: 'Banking Partners' },
  { icon: 'Award', prefix: '', value: 15, suffix: '+', label: 'Years Experience' },
]

// Representative partner banks/NBFCs shown as wordmarks on the trust strip.
// NOTE: Replace with the client's actual, confirmed lending partners before launch.
export const bankingPartners = [
  'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'State Bank of India',
  'Kotak Mahindra', 'Canara Bank', 'Punjab National Bank', 'Bajaj Finserv',
  'IDFC First', 'Yes Bank', 'Federal Bank', 'Tata Capital',
]

// Quick, trust-building highlights for the "Why VPACS" checklist.
export const trustHighlights = [
  'Fast Loan Processing',
  'Low Interest Rates',
  'Expert Advisors',
  'Dedicated Support',
  'Transparent Process',
  'Secure Documentation',
]

// Homepage FAQ.
export const faqs = [
  {
    q: 'What types of loans does VPACS help with?',
    a: 'We assist with home, personal, business, MSME, education, car, machinery and project loans, plus loan against property and securities. We also have a dedicated medical education finance division for doctors, students and institutions.',
  },
  {
    q: 'Does VPACS charge for consultation?',
    a: 'No. Our initial advisory and eligibility assessment are completely free. We help you compare options across 40+ lending partners at no cost.',
  },
  {
    q: 'How long does loan approval take?',
    a: 'It varies by product and lender, but with our streamlined documentation and partner network, many loans are sanctioned within a few working days.',
  },
  {
    q: 'Which banks and NBFCs do you work with?',
    a: 'We work with a wide network of 40+ leading banks and NBFCs, allowing us to find competitive rates and terms matched to your profile.',
  },
  {
    q: 'Is my personal and financial information secure?',
    a: 'Absolutely. We follow strict confidentiality and secure documentation practices, and we never share your details without your consent.',
  },
  {
    q: 'How do I get started?',
    a: "Simply send us an enquiry through the contact form, call us, or message us on WhatsApp. A dedicated advisor will get in touch to understand your needs.",
  },
]

export const whyChoose = [
  {
    icon: 'ShieldCheck',
    title: 'Trusted & Transparent',
    desc: 'No hidden charges. Clear terms, honest guidance and complete confidentiality at every step.',
  },
  {
    icon: 'Zap',
    title: 'Fast Approvals',
    desc: 'Streamlined documentation and a wide lender network mean quicker sanctions and disbursals.',
  },
  {
    icon: 'Users',
    title: 'Expert Advisors',
    desc: 'Dedicated relationship managers who understand your goals and structure the right solution.',
  },
  {
    icon: 'Landmark',
    title: '40+ Banking Partners',
    desc: 'Access competitive rates across leading banks, NBFCs and financial institutions.',
  },
  {
    icon: 'HeartPulse',
    title: 'Healthcare Specialists',
    desc: 'A dedicated division for doctors, students and healthcare businesses with tailored finance.',
  },
  {
    icon: 'Headset',
    title: 'End-to-End Support',
    desc: 'From the first enquiry to final disbursal — and beyond — we stay by your side.',
  },
]
