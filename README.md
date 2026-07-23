# VPACS Financial Services — Corporate Website

A modern, responsive, premium corporate website for **VPACS Financial Services**, built with
React, Tailwind CSS and Firebase Google Authentication. It covers two service divisions —
**General Finance** and **Healthcare Finance** — plus About, Contact and Google Sign-In.

---

## ✨ Features

- **6 pages** — Home, General Finance, Healthcare Finance, About Us, Contact Us, Sign In (+ 404)
- **Two finance divisions** with full service catalogues (loans, investments, tax, healthcare finance)
- **Google Authentication** via Firebase (graceful fallback when not configured)
- **Contact form** with validation, service pre-fill, Formspree/endpoint support and a mailto fallback
- **WhatsApp**, **Google Maps** embed, phone/email and social links
- **Fully responsive**, mobile-friendly navigation with mega-menus
- **Smooth animations** (Framer Motion), professional service cards and high-conversion CTAs
- **SEO-ready**: meta tags, Open Graph, JSON-LD, `robots.txt`, semantic HTML
- **Performance-optimised**: route-level code splitting, tree-shaken icons, vendor chunking

---

## 🧱 Tech Stack

| Area            | Choice                          |
| --------------- | ------------------------------- |
| Framework       | React 18 + Vite                 |
| Styling         | Tailwind CSS 3                  |
| Routing         | React Router 6                  |
| Auth            | Firebase Authentication (Google)|
| Animation       | Framer Motion                   |
| Icons           | lucide-react                    |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
# Firebase (Google Authentication)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

# Business / contact details
VITE_CONTACT_PHONE=+91 00000 00000
VITE_CONTACT_EMAIL=info@vpacs.in
VITE_WHATSAPP_NUMBER=910000000000

# Optional: contact-form POST endpoint (e.g. Formspree). Blank = mailto fallback.
VITE_CONTACT_FORM_ENDPOINT=
```

> The site runs fine **without** a `.env`. Sign-in shows a friendly "not configured" notice,
> and contact details fall back to placeholders until you provide real values.

### 3. Run the dev server

```bash
npm run dev
```

Open http://localhost:5173.

### 4. Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 🔐 Setting up Firebase Google Authentication

1. Go to the [Firebase Console](https://console.firebase.google.com) and create a project.
2. Add a **Web app** to get your config keys → paste them into `.env`.
3. Enable **Authentication → Sign-in method → Google**.
4. Under **Authentication → Settings → Authorized domains**, add your dev and production domains
   (`localhost` is authorized by default).

---

## 📨 Contact Form

- If `VITE_CONTACT_FORM_ENDPOINT` is set (e.g. a [Formspree](https://formspree.io) URL), the form
  POSTs submissions there as JSON.
- If it is blank, the form opens the visitor's mail client with a pre-filled enquiry to
  `VITE_CONTACT_EMAIL` (no backend required).

---

## 🗺️ Customising Content

| What                    | Where                                  |
| ----------------------- | -------------------------------------- |
| Business/contact info   | `src/data/site.js` (+ `.env`)          |
| General Finance services| `src/data/generalServices.js`          |
| Healthcare services     | `src/data/healthcareServices.js`       |
| Colours / theme         | `tailwind.config.js`                   |
| Google Map location     | `site.mapQuery` in `src/data/site.js`  |
| Social links            | `site.social` in `src/data/site.js`    |

---

## 🌐 Deployment

The project is a static SPA — deploy the `dist/` folder to any static host. SPA routing configs
are included for the two most common platforms:

- **Netlify** — `netlify.toml` + `public/_redirects` (build command `npm run build`, publish `dist`)
- **Vercel** — `vercel.json` (framework: Vite)

Remember to add your production domain to Firebase **Authorized domains** and set the same
environment variables in your host's dashboard.

---

## 📁 Project Structure

```
src/
├── components/     # Navbar, Footer, ServiceCard, CTASection, PageHero, WhatsApp, etc.
├── context/        # AuthContext (Firebase auth state)
├── data/           # site.js, generalServices.js, healthcareServices.js
├── pages/          # Home, GeneralFinance, HealthcareFinance, About, Contact, SignIn, NotFound
├── firebase.js     # Firebase init (safe when unconfigured)
├── App.jsx         # Routes + layout (lazy-loaded pages)
├── main.jsx        # Entry point
└── index.css       # Tailwind + design tokens
```

---

## 🎨 Brand Colours

| Token       | Use                          |
| ----------- | ---------------------------- |
| `navy`      | Deep Navy Blue — trust       |
| `brand`     | Professional Red — identity  |
| `medical`   | Medical Blue — healthcare    |

---

© VPACS Financial Services. Built with React + Tailwind + Firebase.
