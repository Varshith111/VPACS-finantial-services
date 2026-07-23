import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, Loader2,
  Facebook, Instagram, Linkedin, Twitter, Youtube,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import { site } from '../data/site'

const services = [
  'Home Loan', 'Personal Loan', 'Business Loan', 'MSME Loan', 'Education Loan',
  'Loan Against Property', 'Car Loan', 'Mutual Funds', 'Insurance', 'Income Tax Filing',
  'Medical Education Loan', 'Doctor Loan', 'Clinic Setup Loan', 'Hospital Finance',
  'Medical Equipment Loan', 'Other',
]

const socials = [
  { name: 'Facebook', icon: Facebook, href: site.social.facebook },
  { name: 'Instagram', icon: Instagram, href: site.social.instagram },
  { name: 'LinkedIn', icon: Linkedin, href: site.social.linkedin },
  { name: 'Twitter', icon: Twitter, href: site.social.twitter },
  { name: 'YouTube', icon: Youtube, href: site.social.youtube },
]

export default function Contact() {
  const [params] = useSearchParams()
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})

  // Prefill the service from the ?service= query param (from service cards).
  useEffect(() => {
    const preset = params.get('service')
    if (preset) setForm((f) => ({ ...f, service: preset }))
  }, [params])

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.email.trim()) e.email = 'Please enter your email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.phone.trim()) e.phone = 'Please enter your phone number'
    else if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number'
    if (!form.message.trim()) e.message = 'Please tell us how we can help'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')

    // If a form endpoint (e.g. Formspree) is configured, POST to it.
    if (site.formEndpoint) {
      try {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          setStatus('success')
          setForm({ name: '', email: '', phone: '', service: '', message: '' })
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
      return
    }

    // Fallback: open the user's mail client with a prefilled enquiry.
    const subject = encodeURIComponent(`Enquiry: ${form.service || 'General'} — ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service || 'N/A'}\n\nMessage:\n${form.message}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setStatus('success')
    setForm({ name: '', email: '', phone: '', service: '', message: '' })
  }

  const details = [
    { icon: Phone, label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/\s+/g, '')}` },
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: `https://wa.me/${site.whatsapp}` },
    { icon: Clock, label: 'Working Hours', value: site.hours },
  ]

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        breadcrumb="Contact Us"
        title="Let's talk about your goals"
        subtitle="Have a question or ready to apply? Send us a message and a VPACS advisor will get back to you shortly."
      />

      <section className="section">
        <div className="container-custom grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-navy-100 sm:p-8">
              <h2 className="text-2xl font-bold text-navy-900">Send us an enquiry</h2>
              <p className="mt-2 text-sm text-navy-500">
                Fields marked with <span className="text-brand-600">*</span> are required.
              </p>

              {status === 'success' ? (
                <div className="mt-8 flex flex-col items-center rounded-2xl bg-green-50 p-8 text-center ring-1 ring-green-100">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                  <h3 className="mt-4 text-lg font-semibold text-navy-900">Thank you!</h3>
                  <p className="mt-2 max-w-sm text-sm text-navy-600">
                    Your enquiry has been received. A VPACS advisor will reach out to you shortly.
                  </p>
                  <button onClick={() => setStatus('idle')} className="btn-outline mt-6">
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Your name" required />
                    <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="+91 00000 00000" required />
                  </div>
                  <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="you@example.com" required />

                  <div>
                    <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-navy-800">
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      <option value="">Select a service (optional)</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy-800">
                      Message <span className="text-brand-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us a little about what you need…"
                      className={`w-full rounded-lg border px-4 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 ${
                        errors.message
                          ? 'border-brand-400 focus:ring-brand-500/20'
                          : 'border-navy-200 focus:border-brand-500 focus:ring-brand-500/20'
                      }`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-brand-600">{errors.message}</p>}
                  </div>

                  {status === 'error' && (
                    <p className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-700">
                      Something went wrong. Please try again or reach us directly at {site.email}.
                    </p>
                  )}

                  <button type="submit" disabled={status === 'sending'} className="btn-primary w-full">
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send Enquiry <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 lg:col-span-2"
          >
            <div className="rounded-3xl bg-navy-900 p-6 text-white shadow-card sm:p-8">
              <h3 className="text-lg font-bold">Contact information</h3>
              <p className="mt-1 text-sm text-navy-300">Reach us through any channel below.</p>
              <div className="mt-6 space-y-4">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-400">
                      <d.icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">{d.label}</p>
                      {d.href ? (
                        <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm font-medium text-white hover:text-brand-400">
                          {d.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-white">{d.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-navy-800 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Follow us</p>
                <div className="mt-3 flex gap-2.5">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-brand-600"
                    >
                      <s.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-navy-100 sm:p-8">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Office address</p>
                  <address className="mt-1 text-sm not-italic leading-relaxed text-navy-700">
                    {site.address.line1}<br />
                    {site.address.line2}<br />
                    {site.address.city}, {site.address.state} {site.address.pincode}<br />
                    {site.address.country}
                  </address>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-navy-100">
            <iframe
              title="VPACS office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ label, name, value, onChange, error, type = 'text', placeholder, required }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-navy-800">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 ${
          error ? 'border-brand-400 focus:ring-brand-500/20' : 'border-navy-200 focus:border-brand-500 focus:ring-brand-500/20'
        }`}
      />
      {error && <p className="mt-1 text-xs text-brand-600">{error}</p>}
    </div>
  )
}
