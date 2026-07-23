import PageHero from '../components/PageHero'
import { site } from '../data/site'

// Lightweight legal pages (Privacy / Terms / Disclaimer).
// Placeholder copy — replace with content reviewed by the client's legal advisor.
const docs = {
  privacy: {
    title: 'Privacy Policy',
    breadcrumb: 'Privacy Policy',
    intro: 'This Privacy Policy explains how VPACS Financial Services collects, uses and protects the information you share with us.',
    sections: [
      { h: 'Information we collect', p: 'We collect details you provide through our enquiry forms — such as your name, phone number, email and the service you are interested in — solely to respond to your request and offer suitable financial solutions.' },
      { h: 'How we use your information', p: 'Your information is used to contact you, assess suitable products with our lending partners, and improve our services. We do not sell your personal data.' },
      { h: 'Data sharing', p: 'We share your details with banking/NBFC partners only when required to process an enquiry or application you have initiated, and only with your consent.' },
      { h: 'Data security', p: 'We follow reasonable technical and organisational measures to protect your information against unauthorised access, alteration or disclosure.' },
      { h: 'Your choices', p: 'You may request access to, correction of, or deletion of your personal data at any time by contacting us.' },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    breadcrumb: 'Terms & Conditions',
    intro: 'By using this website and our services, you agree to the following terms.',
    sections: [
      { h: 'Nature of services', p: 'VPACS Financial Services acts as a facilitator connecting customers with banks and NBFCs. We do not lend directly. All loans are subject to the eligibility criteria and approval of the respective lending partner.' },
      { h: 'No guarantee of approval', p: 'Submitting an enquiry does not guarantee loan sanction. Final approval, interest rates and terms are determined solely by the lending institution.' },
      { h: 'Accuracy of information', p: 'You agree to provide accurate and complete information. VPACS is not responsible for decisions made based on inaccurate details supplied by you.' },
      { h: 'Intellectual property', p: 'All content on this website is the property of VPACS Financial Services and may not be reproduced without permission.' },
      { h: 'Changes to terms', p: 'We may update these terms from time to time. Continued use of the website constitutes acceptance of the revised terms.' },
    ],
  },
  disclaimer: {
    title: 'Disclaimer',
    breadcrumb: 'Disclaimer',
    intro: 'Please read this disclaimer carefully before using our website or services.',
    sections: [
      { h: 'Facilitation only', p: 'VPACS Financial Services is a financial services facilitator and not a bank or lending institution. We assist customers in identifying and applying for financial products offered by our partners.' },
      { h: 'Indicative information', p: 'Interest rates, EMIs, eligibility figures and other numbers shown on this website (including calculators) are indicative only and may differ from the actual terms offered by the lender.' },
      { h: 'No financial advice', p: 'Content on this site is for general information and does not constitute personalised financial, investment, tax or legal advice. Please consult a qualified professional before making decisions.' },
      { h: 'Third-party links', p: 'Our website may contain links to third-party sites. We are not responsible for the content or practices of those sites.' },
    ],
  },
}

export default function Legal({ doc }) {
  const content = docs[doc] || docs.disclaimer
  return (
    <>
      <PageHero eyebrow="Legal" breadcrumb={content.breadcrumb} title={content.title} subtitle={content.intro} />
      <section className="section">
        <div className="container-custom max-w-3xl">
          <div className="space-y-8">
            {content.sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-xl font-bold text-navy-900">{s.h}</h2>
                <p className="mt-2 leading-relaxed text-navy-600">{s.p}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl bg-navy-50 p-6">
            <p className="text-sm text-navy-600">
              For any questions regarding this {content.title.toLowerCase()}, please contact us at{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-brand-600 hover:underline">
                {site.email}
              </a>
              .
            </p>
            <p className="mt-3 text-xs text-navy-400">
              This is placeholder content and should be reviewed by a legal advisor before publication.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
