# Wells of Life Pneuma Church — Website

A multi-page church website built with **HTML, CSS, and vanilla JavaScript**. The site presents the church's story, ministries, events, sermons, contact details, and an online giving page, all styled with a consistent navy-and-gold visual identity.

---

## 🌐 Live Pages

| Page | File | Description |
|------|------|--------------|
| Home | `index.html` | Hero section, welcome/features, service times, and an "our story" preview |
| About | `about.html` | Church story, mission & vision, core values, and beliefs |
| Ministries | `ministries.html` | Grid of ministry areas (Worship, Youth, Outreach, Discipleship, Prayer, Small Groups) |
| Events | `events.html` | Upcoming events grid, recurring calendar info, and a call-to-action |
| Sermons | `sermons.html` | Featured sermon, filterable sermon library, and an email subscribe form |
| Contact | `contact.html` | Contact info, social links, contact form with validation, and an embedded map |
| Give | `give.html` | Mobile Money giving instructions, giving categories, and a scripture callout |

---

## 📁 Project Structure

```
wells-of-life-website/
│
├── index.html              # Home page
├── about.html               # About page
├── ministries.html          # Ministries page
├── events.html               # Events page
├── sermons.html              # Sermons page
├── contact.html               # Contact page
├── give.html                  # Give / Mobile Money page
│
├── css/
│   └── style.css             # Global stylesheet (variables, navbar, hero, shared sections)
│
├── Css/
│   ├── contact.css           # Contact page styles
│   ├── ministry.css           # Ministries page styles
│   └── give.css                # Give page styles
│
├── images/
│   ├── logo.jpg               # Church logo (navbar)
│   ├── hero_img.jpg           # Home page hero image
│   └── story_img.jpg          # About preview image
│
├── script.js                  # Shared JS (navbar menu, sermon filter, subscribe form)
├── contact.js                  # Contact form validation & submit handling
├── give.js                       # Give page config (Mobile Money number) & copy-to-clipboard
│
└── README.md                   # This file
```

> ⚠️ **Note on folder casing:** Some pages currently link to `Css/contact.css`, `Css/ministry.css`, and `Css/give.css` (capital "C"), while `css/style.css` uses lowercase. This works on Windows but **will break on case-sensitive servers** (Linux, most web hosts, GitHub Pages). See [Known Issues](#-known-issues--recommended-fixes) below.

---

## 🎨 Design System

All shared design tokens live at the top of `css/style.css` as CSS custom properties:

```css
:root {
    --primary-dark: #0A3860;   /* Navy blue — navbar, headers, buttons */
    --primary-gold: #D4A574;   /* Gold/amber accent — highlights, CTAs */
    --text-white: #FFFFFF;
    --text-dark: #1a1a1a;
    --text-light: #e8e8e8;
    --light-bg: #F8F8F8;

    --font-main: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --font-size-base: 16px;
    --line-height-base: 1.6;

    --spacing-small: 8px;
    --spacing-medium: 16px;
    --spacing-large: 32px;
}
```

Every page-specific stylesheet (`contact.css`, `ministry.css`, `give.css`) reuses these variables so the site stays visually consistent. To re-theme the whole site, edit these variables once in `style.css`.

**Shared components** (defined once in `style.css`, reused everywhere):
- `.navbar` / `.nav-menu` / `.hamburger` — sticky navbar with mobile hamburger menu
- `.page-header` — the navy gradient banner used at the top of every inner page
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline` — button styles
- `.fade-in`, `.form-message` — shared animations and form feedback styling

---

## ⚙️ JavaScript Overview

### `script.js` (loaded on every page)
- **Mobile navigation** — toggles `.nav-menu.active` when the hamburger icon is clicked; closes the menu when a link is tapped.
- **Sermon filter** (`sermons.html` only) — filters `.sermon-card` elements by `data-series` when a `.filter-btn` is clicked.
- **Subscribe form** (`sermons.html` only) — validates the email format and shows a success/error message.

### `contact.js` (loaded on `contact.html`)
- Validates the contact form fields (name, email, subject, message) before allowing submission and displays inline error messages.

### `give.js` (loaded on `give.html`)
- Contains a single configuration object, `GIVE_CONFIG`, holding the Mobile Money number and account name.
- Populates the number throughout the page and wires up a **"Copy Number"** button and a **tap-to-call** link.

**To update the Mobile Money number**, edit only this block at the top of `give.js` — nothing else needs to change:

```javascript
const GIVE_CONFIG = {
    phoneNumber: "+256 791 588 338",   // Displayed format
    phoneNumberRaw: "+256791588338",   // Used for tel: link & copy button
    accountName: "Wells of Life Pneuma Ministries"
};
```

---

## 🧩 Adding a New Page

To keep the site consistent when adding a new page:

1. Copy the `<head>`, `<nav>`, and `<script>` tags from an existing page (e.g. `about.html`).
2. Link `css/style.css` first, then a page-specific stylesheet if needed (e.g. `Css/yourpage.css`).
3. Wrap your unique content inside a `<section class="page-header">` (banner) followed by your content sections.
4. Add a `<li class="nav-item">` link to the new page in the `<ul class="nav-menu">` of **every** existing page.
5. Reuse existing CSS variables (`var(--primary-dark)`, etc.) instead of hardcoding colors, so the page matches the rest of the site.

---

## 📱 Responsive Breakpoints

The site is fully responsive using two shared breakpoints across all stylesheets:

| Breakpoint | Applies to |
|------------|-----------|
| `max-width: 768px` | Tablets — navbar becomes a hamburger menu, grids collapse from 3–4 columns to 1–2 |
| `max-width: 480px` | Mobile phones — font sizes shrink further, buttons become full-width, forms stack vertically |

---

## 🛠️ Known Issues & Recommended Fixes

- **Folder casing (`css/` vs `Css/`)** — Rename the `Css/` folder to lowercase `css/` and update the `<link>` tags in `contact.html`, `ministries.html`, and `give.html` accordingly. This avoids broken stylesheets when deployed to a case-sensitive server.
- **Placeholder links** — Several buttons/links (e.g. "Plan Your Visit," "Learn More," event "Learn More →" links, social media icons) currently point to `#`. Replace these with real destinations before launch.
- **No footer yet** — Every page has an HTML comment `<!-- Footer will go here later -->`. A shared footer (service times, quick links, social icons, copyright) should be built once and included on every page.
- **Contact form has no backend** — `contact.js` currently validates the form but does not send data anywhere. You'll need a backend endpoint, a form service (e.g. Formspree), or a mailto fallback to actually receive submissions.
- **Sermon audio/video is placeholder** — Sermon cards use a play-icon placeholder rather than real embedded audio/video players.
- **Images** — `images/logo.jpg`, `images/hero_img.jpg`, and `images/story_img.jpg` must be added to an `images/` folder for the site to display correctly.

---

## 🚀 Deployment

This is a static site — no build step or server-side code required. It can be hosted on:

- **GitHub Pages** — push to a repository and enable Pages in settings
- **Netlify / Vercel** — drag-and-drop the folder or connect a Git repo
- **Any standard web host** — upload all files via FTP, keeping the folder structure intact

Before deploying, fix the folder-casing issue noted above so styles don't break on Linux-based hosts.

---

## 📄 License

This project is custom-built for **Wells of Life Pneuma Ministries**. All church-specific content, branding, and imagery belong to the church; the code structure may be reused or adapted for other church/nonprofit websites.
