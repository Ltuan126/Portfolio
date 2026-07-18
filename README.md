# Tuan Nguyen Portfolio

Personal developer portfolio built with static web technologies.

## Overview

This is a single-page portfolio in an editorial / index-style design:

- Fixed left rail navigation with numbered sections and active-section highlight
- Hero with oversized serif name, portrait, and quick facts
- Selected work list (featured project card + numbered rows)
- Capability index (skills table) and soft-skill strip
- Build log (journey timeline)
- Profile section with pull quote
- Contact section with Netlify-powered form and social links
- Language toggle (English / Vietnamese), scroll progress bar, reveal-on-scroll animations

## Tech Stack

- HTML5
- CSS3 (no framework)
- JavaScript (vanilla)
- Fonts: Source Serif 4, Manrope, IBM Plex Mono (Google Fonts)

## Current Project Structure

```text
.
├── assets/          # CV PDF
├── images/          # Portrait + project screenshots
├── index.html
├── script.js
├── style.css
└── README.md
```

## Run Locally

Because this is a static website, you can run it in one of these ways:

1. Open index.html directly in your browser.
2. Or serve it locally, e.g. `npx http-server . -p 8123`.

## Contact Form

The form uses [Web3Forms](https://web3forms.com): submissions are sent by AJAX
to `https://api.web3forms.com/submit` and forwarded straight to the owner's
email inbox. Works on any static hosting (GitHub Pages, Vercel, Netlify).

Setup: get a free access key at https://web3forms.com (enter your email, the
key arrives in your inbox), then replace `YOUR_WEB3FORMS_ACCESS_KEY` in the
hidden `access_key` input in `index.html`. A hidden `botcheck` checkbox acts
as the spam honeypot.
