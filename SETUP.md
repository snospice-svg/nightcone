# Nightcone Labs — Astro site (setup & editing guide)

The content-driven Nightcone site. **You edit Markdown files; the pages build themselves.** Experiments and journal posts are each just a Markdown file with a frontmatter header — add, edit, or delete a file and the matrix table, experiment cards, the "Oneirogens tested" count, the journal list, the tag filters, and every detail page update automatically.

## Run it

```bash
npm install        # one time
npm run dev        # preview at http://localhost:4321
npm run build      # output static site to ./dist
npm run preview    # preview the built ./dist
```

Requires Node 18.20+ (Node 20+ recommended).

---

## Add or edit an EXPERIMENT

Create a file in `src/content/experiments/`. The filename becomes the URL slug
(`galantamine.md` → `/experiments/galantamine/`). Copy this template:

```markdown
---
entry: 24                      # matrix entry number
title: Mugwort
dose: 500 mg                   # shown in the matrix; use "—" if n/a
protocol: Tea · pre-bed        # shown in the matrix; "None" if n/a
recall: 2                      # 0–5, or delete the line for "—"
lucidity: 1                    # 0–5, or delete the line for "—"
meta: 500 mg tea · Artemisia vulgaris   # small line under the card title
summary: One sentence — used as the matrix note and the card blurb.
tags: [ethnobotanical, vividness]       # become tag chips
nullResult: false              # true = first tag styled as a null marker
draft: false                   # true = hidden everywhere
---

The full write-up goes here in normal Markdown. Headings, lists, links, quotes
all work. This body is what shows on the experiment's detail page.
```

That's it. The new compound appears in the matrix (sorted by `entry`, newest first), gets a card on the homepage, bumps the "Oneirogens tested" count by one, and gets its own page at `/experiments/<filename>/`.

## Add or edit a JOURNAL POST

Create a file in `src/content/journal/`. Filename = URL slug. Template:

```markdown
---
title: What I changed this week
date: 2026-06-20                # YYYY-MM-DD — list sorts newest first
kind: Field Note                # Entry | Field Note | Null Result | Matrix Update
summary: One sentence shown in the journal list.
tags: [protocol, recall]        # power the tag filter on /journal/
draft: false
---

Body in Markdown.
```

The post shows up on `/journal/`, its tags join the filter bar automatically, and it gets a page at `/journal/<filename>/`.

> **Frontmatter tip:** if a `summary`, `title`, or `meta` value contains a colon-then-space (`like this: here`), wrap the whole value in double quotes — otherwise YAML reads it as a key and the build fails. Semicolons, dashes, and `·` are fine unquoted.

> The schema for both collections lives in `src/content.config.ts`. If you add a frontmatter field, add it there too — Astro validates every file against it at build time, so a typo fails the build instead of shipping broken.

---

## Contact form (one-time setup)

The contact page posts to **[Web3Forms](https://web3forms.com)** — no backend, no email address in the page. Register **brett@nightcone.co** there, copy the access key they email you, and paste it into `src/pages/contact.astro` in place of `REPLACE_WITH_WEB3FORMS_ACCESS_KEY`. Until then the form says "not configured yet." The key is safe to commit publicly.

---

## Deploy to Cloudflare Pages

**Git (recommended — auto-deploys on push):**
1. This repo is already on GitHub (snospice-svg/nightcone).
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → select this repo.
3. Framework preset: **Astro**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. Every `git push` rebuilds and redeploys.

**Direct upload:** run `npm run build` locally, then drag the contents of `dist/` into Cloudflare Pages → Upload assets.

Set your real domain in `astro.config.mjs` (`site:`) and add it under the project's Custom domains tab.

---

## What's where

```
src/
├── content.config.ts          # the schemas — the contract for your Markdown
├── content/
│   ├── experiments/*.md       # one file per compound
│   └── journal/*.md           # one file per post
├── layouts/Base.astro         # <head>, header, footer wrapper
├── components/                # Header, Footer, logo symbol
├── pages/
│   ├── index.astro            # homepage (reads experiments)
│   ├── experiments/[id].astro # one detail page per experiment
│   ├── journal/index.astro    # journal list + tag filter
│   ├── journal/[id].astro     # one detail page per post
│   ├── faq.astro
│   └── contact.astro
└── styles/global.css          # the brand (Ink Black / Bone White, Newsreader + JetBrains Mono)
public/
├── assets/mark.svg            # favicon / logo mark
└── _headers                   # Cloudflare security + cache headers
```

> **Font note:** the brand calls for **Lyon** (commercial). **Newsreader** is the free stand-in that's wired up. To use real Lyon, drop the licensed `.woff2` in `public/assets/`, add an `@font-face` at the top of `global.css`, and change the `--serif` variable.
