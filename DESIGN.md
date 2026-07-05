# Design Notes

## Context: What is this site?

- A single point of information for my consulting and professional services,
  including my publications.
- A place where all my publications can have their canonical home, and url, to
  be referred to in Substack, LinkedIn, etc.
- Who I am and what I do:
  * These are a little varied, so one challenge in the site is to make them all
    fit together.
  * First, I am a FIMI expert. Let's use the term information threat consultant.
  * Second, I am an AI expert. My PhD is in AI, I have deployed AI for 
    counter-FIMI, and I do research on AI in FIMI.
  * Third, I am an AI engineer. I consult with SMBs on how to come into the 
    contemporary era of AI, how to get on the wave, become adopters, unlock
    productivity, and not fall behind.

## Criteria to judge any design against

For a research-and-consulting site where credibility is the currency, these are 
the axes that matter:

**Credibility signal**. Does it look like a serious independent expert, or like 
a template? The single biggest risk for a solo consultant is looking generic — 
a stock theme reads as "hasn't invested here." Distinctiveness signals 
competence in a way clients register subconsciously.

**Readability**. Your core asset is long-form writing (findings pieces, 
methodology-adjacent essays). Body typography, line length (~65-75 characters), 
line height, and contrast matter more than anything flashy. If the reading 
experience is excellent, you've won most of the battle.

**Restraint**. For your field — information integrity, security-adjacent, 
government/think-tank audience — sober beats slick. Over-designed sites read as 
marketing; understated reads as substance. Your audience trusts austerity.

**Hierarchy**. Can a visitor tell in three seconds what you do and where to go? 
The tension is between "here's my writing" (blog) and "here's what I sell"
(consulting). The design has to serve both without muddying either.

**Consistency**. One typeface pairing, one accent color, consistent spacing. 
Amateur sites betray themselves through inconsistency more than through any 
single bad choice. Constraint is your friend when you're not confident in 
design.

## Design Principles

- Simplicity
- First page should give the key information about who I am and what I do within
  seconds without needing to scroll or read a wall of text.
- **Space**: err toward more whitespace than feels comfortable. Amateur sites 
  are almost always too cramped; near-nobody over-spaces.
- Visible pathways, no over-styling.

---

## Current implementation

The sections above are the brief/intent. This section documents what's actually
built, so it stays a trustworthy reference rather than drifting from reality as the
site evolves.

### Site structure

Three-item top nav, identical on every page: **Home**, **Publications**, **Advisory**.
There is no "Writing"/blog section — one existed briefly during the Astro migration
(old posts converted to a content collection) and was deliberately removed. Don't
reintroduce it without being asked.

### Global layout — persistent identity panel

A left identity panel is part of the shared layout and appears on **every page**, not
just Home: headshot photo, name (寒山 / Tim Niven, PhD), one-line role, and a contact
list — email (shown as the literal address, not the word "Email"), GitHub, LinkedIn,
Google Scholar, ORCID. Each contact link except email has a small monochrome grey
icon to its left — a deliberate, restrained exception to "no icons," kept to four
small greyscale brand marks in that one panel. The right column holds each page's own
content, capped at a comfortable reading width. Below ~42rem viewport width the
layout collapses to one column, identity first.

Note: there's no "Hanshan Intelligence / 寒山智慧工作室" studio branding on this site —
that's planned as a separate site later. Don't reintroduce it here.

### Typography

Everything — headings, body, header/nav/footer, the identity panel's role line and
contact links, all page content — uses one serif family (Source Serif 4, with
Georgia/Times New Roman fallback). There is no separate mono treatment for metadata,
dates, or labels; that was tried and reversed per direct feedback ("match everything
to the serif"). A mono face (IBM Plex Mono) is still loaded and used for exactly one
thing: `code`/`pre` blocks.

### Colour

```
--bg:      #fefefc   /* main background — near-white */
--bg-alt:  #eeece7   /* header + footer band — subtly greyer than --bg */
--fg:      #201d1a   /* near-black text */
--muted:   #6e6659   /* secondary text, icon colour */
--accent:  #963f3f   /* single accent — a brighter, more saturated red, used for
                         every link site-wide and the nav active state */
--border:  rgba(32, 29, 26, 0.14)
```

One accent colour, used everywhere links appear. Header and footer get the
`--bg-alt` band specifically, a deliberate departure from a single flat background.
Icons in the identity panel are `--muted` (grey), independent of the
accent-coloured link text next to them.

### Publications page

Content collection at `src/content/publications/*.yaml` (one file per entry).
Adding a publication is just adding a YAML file. Rendered grouped by year,
descending, citation-style.

### Advisory page

Short intro, engagement types (FIMI analysis, threat/vulnerability assessment,
agentic AI adoption), who it's for, one email contact path. This currently reflects
the FIMI-expert and AI-expert framing from the Context section above; the
AI-engineer-for-SMBs consulting angle isn't reflected there yet — worth revisiting
if that's meant to show up on this site rather than a separate one.

### Technical baseline

- Astro, static output, deployed to GitHub Pages via `.github/workflows/deploy.yml`.
  Repo Settings → Pages source must be "GitHub Actions".
- Local dev/build is Dockerized (`Dockerfile`, `docker-compose.yml`) so the host only
  needs Docker — no local Node version dependency. `docker compose up dev` for a
  live-reloading dev server on port 4321; `docker compose run --rm build` for a
  production build.
- Custom domain `timniven.com` via `public/CNAME`.
