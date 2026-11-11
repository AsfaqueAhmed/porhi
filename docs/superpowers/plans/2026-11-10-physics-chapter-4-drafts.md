# SSC Physics Chapter 4 (কাজ, ক্ষমতা ও শক্তি / Work, Power and Energy) Drafts Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate all 8 sections and the index hub in `drafts/physics-chapter-4/` to match the pedagogical rigor, KaTeX precision, and interactive simulation capabilities of Chapter 3, including two embedded simulation labs (Mechanical Energy Conservation and Pump Efficiency).

**Architecture:** Each section is authored as an accessible, clean, responsive HTML5 document styled with `styles.css` and KaTeX CDN. Sections 4.4 and 4.8 include embedded interactive SVG/HTML simulation laboratories with dynamic sliders, real-time math calculations, and visual charts. A Node.js validator script in scratch ensures no structural, mathematical, or relational regression occurs across all 8 sections.

**Tech Stack:** HTML5, CSS3, KaTeX CDN (`katex@0.16.8`), SVG, JavaScript (Vanilla ES6 for simulations), Node.js validation test script.

**Spec:** `docs/superpowers/specs/2026-11-10-physics-chapter-4-drafts-design.md`

## Global Constraints

- Must import and initialize KaTeX identically to Chapters 1, 2, and 3 with `$$...$$` (display) and `$...$` (inline) delimiters.
- Every section must contain: Topbar crumb, Section badge, Bilingual title (`<h1 class="title">...<small>...</small></h1>`), 🎯 শিখনফল (`section.goal`), Terminology grid (`.grid > .term`), Highlight box (`.highlight-box`), Real-life example (`.note`), Mnemonic memory aid (`.memory`), Worked problem with step-by-step solution (`.worked > .problem + .solution`), Interactive check quiz (`details.check`), Navigation bar (`.nav`), and Footer linking to `chapter-source.html`.
- Section 4.4 must contain an interactive *Conservation of Mechanical Energy Simulator* (falling body / pendulum height-velocity slider, live SVG bar chart showing $E_p, E_k, E_{\text{total}}$).
- Section 4.8 must contain an interactive *Motor & Pump Efficiency Simulator* (inputs for $P_{\text{in}}$, $m$, $h$, $t$, live calculation of $P_{\text{out}}$, $P_{\text{loss}}$, and animated circular gauge displaying $\eta\%$).
- All relative links (`index.html`, `section-01.html` through `section-08.html`, `chapter-source.html`, `styles.css`) must resolve cleanly without 404s.
- `index.html` must follow the Chapter 4 emerald/teal theme (`#0f766e`, `#0d9488`, `#2dd4bf`), 4 stats cards, and 8 detailed roadmap cards.

## Review Focus

1. **Unrendered or broken LaTeX expressions:** Ensure all mathematical notation is valid KaTeX syntax without unbalanced dollar signs or escaping issues.
2. **Missing pedagogical components:** Ensure no section omits required components (worked problems, mnemonics, terms, goals).
3. **Broken navigation targets:** Ensure Previous / Next buttons point to the correct adjacent sections (`section-01` has index as previous; `section-08` has index as next).
4. **Interactive simulation state handling:** Ensure sliders and numeric controls in Section 4.4 and 4.8 handle edge values smoothly without NaN or broken SVG renders.
5. **Encoding & Bengali typography:** Ensure UTF-8 formatting and correct Bengali terminology conforming to NCTB 2026 standards.

---

### Task 1: Setup Validation Test Harness for Chapter 4 Drafts

**Files:**
- Create: `/Users/asfaque/.gemini/antigravity/brain/968c18fe-3c26-4615-9233-9b083729248a/scratch/validate-ch4-drafts.js`

**Interfaces:**
- Produces: Command-line exit code 0 if all 8 section files + `index.html` pass validation rules; exit code 1 with specific errors otherwise.

- [ ] **Step 1: Write the validation test harness**
  Implement `validate-ch4-drafts.js` checking:
  - File existence for `index.html` and `section-01.html` through `section-08.html`
  - Presence of KaTeX CSS and JS in all 8 sections
  - Presence of `<section class="goal">`, `.grid`, `.term`, `.highlight-box`, `.worked`, `.problem`, `.solution`, `.note`, `.memory`, `details.check`, `.nav`, and footer
  - Presence of simulation labs in Section 4 (`lab-card` or `simulation-container`) and Section 8
  - Balanced display math `$$` delimiters
  - Relative link targets exist on disk

- [ ] **Step 2: Run the validator to verify current failures on un-enhanced Chapter 4 files**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/968c18fe-3c26-4615-9233-9b083729248a/scratch/validate-ch4-drafts.js`
  Expected: FAIL on current un-enhanced files (missing KaTeX, mnemonics, etc.)

- [ ] **Step 3: Verify script is functional**
  Ensure script exits with status 1 and lists expected missing items.

---

### Task 2: Enhance Sections 4.1 & 4.2

**Files:**
- Modify: `drafts/physics-chapter-4/section-01.html` (৪.১ কাজ / Work)
- Modify: `drafts/physics-chapter-4/section-02.html` (৪.২ শক্তি ও শক্তির রূপ / Energy and Forms of Energy)

**Interfaces:**
- Consumes: NCTB 2026 curriculum & `chapter-source.html` content for 4.1 and 4.2.
- Produces: Enhanced HTML drafts conforming to all structural and pedagogical constraints.

- [ ] **Step 1: Write enhanced `section-01.html`**
  - Scientific definition of work: $W = Fs \cos\theta$.
  - Three conditions: Positive work ($\theta = 0^\circ$), Negative work ($\theta = 180^\circ$), Zero work ($\theta = 90^\circ$ or $s=0$).
  - Work by gravity vs against gravity ($W = mgh$).
  - Units & Dimension: $\text{J} = \text{N}\cdot\text{m}$, $[ML^2T^{-2}]$.
  - Terminology grid: Positive Work, Negative Work, Zero Work, Component of Force.
  - Worked numerical problem: $50\text{ kg}$ person climbing 30 steps of $20\text{ cm}$ in $10\text{ s}$ ($W = 2940\text{ J}$).
  - Mnemonic, self-check quiz, navigation (`index.html` $\leftarrow$ $\rightarrow$ `section-02.html`).

- [ ] **Step 2: Write enhanced `section-02.html`**
  - Scientific definition of energy: capacity of doing work ($W = \Delta E$).
  - Scalar quantity, unit Joule ($\text{J}$), dimension $[ML^2T^{-2}]$.
  - Different forms of energy: Mechanical, Thermal, Light, Sound, Electrical, Chemical, Nuclear, Solar.
  - Primary source of all earth energy: Sun.
  - Terminology grid: Mechanical Energy, Chemical Energy, Thermal Energy, Solar Energy.
  - Worked analysis problem: energy conversion and dimensions.
  - Mnemonic, self-check quiz, navigation (`section-01.html` $\leftarrow$ $\rightarrow$ `section-03.html`).

- [ ] **Step 3: Verify sections 4.1 & 4.2 with validator**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/968c18fe-3c26-4615-9233-9b083729248a/scratch/validate-ch4-drafts.js --only=1,2`
  Expected: PASS for sections 1 and 2.

---

### Task 3: Enhance Section 4.3 (গতিশক্তি ও বিভবশক্তি)

**Files:**
- Modify: `drafts/physics-chapter-4/section-03.html` (৪.৩ গতিশক্তি ও বিভবশক্তি / Kinetic and Potential Energy)

**Interfaces:**
- Consumes: Kinetic and potential energy derivations, relation with momentum, spring potential energy.
- Produces: Enhanced HTML draft 4.3.

- [ ] **Step 1: Write enhanced `section-03.html`**
  - Two forms of mechanical energy: Kinetic ($E_k$) and Potential ($E_p$).
  - Derivation of kinetic energy: $W = Fs = mas = m \cdot \frac{v^2-u^2}{2} \implies E_k = \frac{1}{2}mv^2$.
  - Relation between momentum and kinetic energy: $E_k = \frac{p^2}{2m}$.
  - Gravitational potential energy: $E_p = mgh$.
  - Elastic potential energy of a compressed/extended spring: $E_p = \frac{1}{2}kx^2$.
  - Terminology grid: Kinetic Energy, Gravitational Potential Energy, Elastic Potential Energy, Spring Constant.
  - Worked numerical problem: $1200\text{ kg}$ car moving at $20\text{ m/s}$ ($E_k = 2.4 \times 10^5\text{ J}$), and effect of doubling velocity.
  - Mnemonic, self-check quiz, navigation (`section-02.html` $\leftarrow$ $\rightarrow$ `section-04.html`).

- [ ] **Step 2: Verify section 4.3 with validator**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/968c18fe-3c26-4615-9233-9b083729248a/scratch/validate-ch4-drafts.js --only=3`
  Expected: PASS for section 3.

---

### Task 4: Enhance Section 4.4 with Interactive Mechanical Energy Conservation Lab

**Files:**
- Modify: `drafts/physics-chapter-4/section-04.html` (৪.৪ শক্তির নিত্যতা ও রূপান্তর / Conservation and Transformation of Energy)

**Interfaces:**
- Consumes: Conservation of mechanical energy proof for freely falling bodies, interactive simulation requirements.
- Produces: Comprehensive lesson draft 4.4 with embedded interactive SVG/HTML simulation lab.

- [ ] **Step 1: Write enhanced `section-04.html` with embedded simulation lab**
  - Principle of Conservation of Energy: "Energy can neither be created nor destroyed...".
  - Mathematical proof for freely falling body from height $h$:
    - Point A (top): $E_A = mgh$
    - Point B (intermediate at $h-x$): $E_B = mgx + mg(h-x) = mgh$
    - Point C (just before ground): $E_C = mgh$
    - $E_A = E_B = E_C = \text{constant}$.
  - **Embedded Interactive Simulation Lab:**
    - Height slider ($0$ to $100\text{ m}$), mass selector ($1$ to $10\text{ kg}$), play/pause falling animation.
    - Real-time SVG bar charts for $E_p$, $E_k$, and $E_{\text{total}}$, showing total energy remaining strictly constant while $E_p$ converts into $E_k$.
    - Dynamic velocity display $v = \sqrt{2gx}$.
  - Terminology grid: Conservation of Energy, Mechanical Energy, Freely Falling Body, Energy Transformation.
  - Worked numerical problem: height where $E_k = 2E_p$ or $E_k = 3E_p$.
  - Mnemonic, self-check quiz, navigation (`section-03.html` $\leftarrow$ $\rightarrow$ `section-05.html`).

- [ ] **Step 2: Verify section 4.4 with validator**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/968c18fe-3c26-4615-9233-9b083729248a/scratch/validate-ch4-drafts.js --only=4`
  Expected: PASS for section 4.

---

### Task 5: Enhance Sections 4.5 & 4.6

**Files:**
- Modify: `drafts/physics-chapter-4/section-05.html` (৪.৫ শক্তির উৎস ও পরিবেশের ওপর প্রভাব)
- Modify: `drafts/physics-chapter-4/section-06.html` (৪.৬ ভর ও শক্তির সম্পর্ক)

**Interfaces:**
- Consumes: Energy sources, environmental impacts, Einstein's $E=mc^2$, nuclear reactions.
- Produces: Enhanced HTML drafts 4.5 and 4.6.

- [ ] **Step 1: Write enhanced `section-05.html`**
  - Non-renewable energy (Coal, Petroleum, Natural Gas, Nuclear fuel) vs Renewable energy (Hydro, Solar, Wind, Biomass, Geothermal, Ocean).
  - Environmental impacts: Greenhouse effect ($CO_2, CH_4$), Global warming, Acid rain ($SO_2, NO_x$), radioactive waste.
  - Sustainable energy development & conservation.
  - Terminology grid: Renewable Energy, Non-renewable Energy, Fossil Fuel, Greenhouse Effect.
  - Worked analysis problem: power generation and carbon emission trade-offs.
  - Mnemonic, self-check quiz, navigation (`section-04.html` $\leftarrow$ $\rightarrow$ `section-06.html`).

- [ ] **Step 2: Write enhanced `section-06.html`**
  - Einstein's mass-energy equivalence: $E = mc^2$ with $c = 3 \times 10^8\text{ m/s}$.
  - Mass defect ($\Delta m$) converting to energy.
  - Nuclear Fission (Uranium-235 chain reaction) and Nuclear Fusion (Hydrogen to Helium in Sun).
  - Scientific basis of Rooppur Nuclear Power Plant.
  - Terminology grid: Mass-Energy Equivalence, Mass Defect, Nuclear Fission, Nuclear Fusion.
  - Worked numerical problem: energy release from $1\text{ g} = 10^{-3}\text{ kg}$ complete conversion ($9 \times 10^{13}\text{ J}$).
  - Mnemonic, self-check quiz, navigation (`section-05.html` $\leftarrow$ $\rightarrow$ `section-07.html`).

- [ ] **Step 3: Verify sections 4.5 & 4.6 with validator**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/968c18fe-3c26-4615-9233-9b083729248a/scratch/validate-ch4-drafts.js --only=5,6`
  Expected: PASS for sections 5 and 6.

---

### Task 6: Enhance Section 4.7 (ক্ষমতা)

**Files:**
- Modify: `drafts/physics-chapter-4/section-07.html` (৪.৭ ক্ষমতা / Power)

**Interfaces:**
- Consumes: Scientific definition of power, units, relation to force and velocity, electric energy unit.
- Produces: Enhanced HTML draft 4.7.

- [ ] **Step 1: Write enhanced `section-07.html`**
  - Definition of power: rate of doing work or rate of energy conversion ($P = \frac{W}{t}$).
  - Relation to force and constant velocity: $P = \frac{Fs}{t} = Fv$.
  - Units & Dimensions: Watt ($\text{W} = \text{J/s}$), Kilowatt ($\text{kW}$), Megawatt ($\text{MW}$), Horsepower ($1\text{ HP} = 746\text{ W}$), $[ML^2T^{-3}]$.
  - Commercial unit of electrical energy: $\text{kWh}$ / Unit ($1\text{ kWh} = 3.6 \times 10^6\text{ J}$).
  - Terminology grid: Power, Watt, Horsepower, Kilowatt-hour.
  - Worked numerical problem: electric pump lifting $1500\text{ kg}$ water to $20\text{ m}$ in $1\text{ min}$ ($P = 4.9\text{ kW} \approx 6.57\text{ HP}$).
  - Mnemonic, self-check quiz, navigation (`section-06.html` $\leftarrow$ $\rightarrow$ `section-08.html`).

- [ ] **Step 2: Verify section 4.7 with validator**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/968c18fe-3c26-4615-9233-9b083729248a/scratch/validate-ch4-drafts.js --only=7`
  Expected: PASS for section 7.

---

### Task 7: Enhance Section 4.8 with Interactive Pump & Motor Efficiency Lab

**Files:**
- Modify: `drafts/physics-chapter-4/section-08.html` (৪.৮ কর্মদক্ষতা / Efficiency)

**Interfaces:**
- Consumes: Efficiency definition, formula, energy loss mechanisms, simulation requirements.
- Produces: Comprehensive lesson draft 4.8 with embedded interactive SVG/HTML efficiency lab.

- [ ] **Step 1: Write enhanced `section-08.html` with embedded simulation lab**
  - Definition of efficiency: ratio of useful output energy/power to total input energy/power.
  - Formulas: $\eta = \frac{E_{\text{out}}}{E_{\text{in}}} \times 100\% = \frac{P_{\text{out}}}{P_{\text{in}}} \times 100\%$.
  - Energy losses: Loss = Input - Output (heat, friction, noise); why efficiency is strictly $< 100\%$.
  - **Embedded Interactive Simulation Lab:**
    - Controls for Input Electrical Power ($P_{\text{in}}$ in kW), Water Mass ($m$), Height ($h$), and Time ($t$).
    - Real-time calculations of Output Power ($P_{\text{out}} = \frac{mgh}{t}$), Power Loss, and animated circular gauge displaying $\eta\%$.
    - Dynamic rating tag (Excellent / Average / Poor) and step-by-step formula breakdown.
  - Terminology grid: Efficiency, Useful Energy Output, Input Energy, Energy Loss.
  - Worked numerical problem: $3\text{ kW}$ motor with $70\%$ efficiency lifting water to $10\text{ m}$ in 5 minutes ($m \approx 6429\text{ kg}$).
  - Mnemonic, self-check quiz, navigation (`section-07.html` $\leftarrow$ $\rightarrow$ `index.html`).

- [ ] **Step 2: Verify section 4.8 with validator**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/968c18fe-3c26-4615-9233-9b083729248a/scratch/validate-ch4-drafts.js --only=8`
  Expected: PASS for section 8.

---

### Task 8: Enhance Chapter Hub (`index.html`)

**Files:**
- Modify: `drafts/physics-chapter-4/index.html`

**Interfaces:**
- Consumes: Metadata and link references for all 8 sections + `chapter-source.html`.
- Produces: Beautifully styled, responsive Chapter 4 home hub.

- [ ] **Step 1: Write enhanced `index.html`**
  - Styled Hero section with emerald/teal gradient (`#0f766e` to `#0d9488`).
  - 4 stats cards: ৮টি বিষয়ভিত্তিক পূর্ণাঙ্গ পাঠ, ২টি লাইভ ইন্টারঅ্যাক্টিভ সিমুলেশন ল্যাব, ২৫+ গাণিতিক সমাধান ও উদাহরণ, ১০০% এনসিটিবি ২০২৬ সিলেবাস।
  - 8 structured roadmap cards with route number (4.1 to 4.8), Bengali title, English subtitle, rich 3-bullet description, right chevron.
  - Source card linking to `chapter-source.html`.
  - PoRi branding footer.

- [ ] **Step 2: Verify `index.html` with validator**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/968c18fe-3c26-4615-9233-9b083729248a/scratch/validate-ch4-drafts.js --only=index`
  Expected: PASS for index.

---

### Task 9: Full Chapter Verification & Review

**Files:**
- All files in `drafts/physics-chapter-4/`

- [ ] **Step 1: Run full automated validator on all 9 files**
  Run: `node /Users/asfaque/.gemini/antigravity/brain/968c18fe-3c26-4615-9233-9b083729248a/scratch/validate-ch4-drafts.js`
  Expected: All 9 files PASS with zero errors.

- [ ] **Step 2: Inspect KaTeX rendering and markup consistency**
  Verify that mathematical expressions contain no unmatched tags and comply with browser rendering.

- [ ] **Step 3: Git status & summary**
  Review git diff/status and prepare completion summary.
