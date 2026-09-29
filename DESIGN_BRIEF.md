# Design Brief: Aakash Thakkar, Online Resume

This brief is for designing a personal resume website. Design only for now: layouts, visual system, components and states. No production code yet.

---

## 1. Context

- **Who:** Aakash Thakkar, a full stack engineer in Paderborn, Germany. He works at Unchained Robotics on the software that sits between factory operators and industrial robots.
- **What:** a single-page online resume that doubles as a clean, printable PDF.
- **Two profiles, one site.** Aakash keeps two versions of his resume that share most of their content:
  - **Robotics / HMI**, titled "Full Stack Engineer | Industrial Robotics & HMI"
  - **Platform / Web**, titled "Software Engineer | Python, Platform & Developer Tooling"

  The site should let a visitor switch between these two framings, for example with a toggle or tabs in the header. Each profile should also be linkable directly, e.g. `?profile=robotics` or `/robotics`, so the right version can go into each job application.
- **Audience:** recruiters and hiring managers, who skim in about 30 seconds on desktop or phone, and engineers, who read the details. Both industrial-automation companies and pure software companies.

## 2. Goals

1. The candidate is readable in 10 seconds: name, role, location, headline numbers (60+ deployed robot cells, ~25 engineers using his platform, customers WAGO / Albéa / Arvato).
2. The detail is there for anyone who wants it, without cluttering the first view.
3. It looks like it was made by an engineer who cares about UI, but it doesn't read as a gimmick. Credibility first.
4. It prints to a 1–2 page A4 PDF as good as, or better than, the current PDF resumes.

## 3. Technical constraints (for the designer to respect)

- Built later in **React + TypeScript (Vite)** as a static site on **GitHub Pages**. No backend.
- All content comes from one typed data file, so components must handle variable-length content: 0–8 bullets, optional sub-projects, optional tech tags, roles with no bullets.
- **Responsive:** from 360px phones up to wide desktop. No horizontal scroll.
- **Light and dark mode**, following the system setting, with an optional manual toggle.
- **Print stylesheet** (A4, ~14–16mm margins): no toggles or buttons, ink-friendly colors, URLs written out, and entries never split across a page break.
- **Accessibility:** WCAG AA contrast, semantic headings, keyboard-focusable controls, `prefers-reduced-motion` respected.
- **Performance:** fast first paint. Any heavy visual, such as 3D, must be optional or lazy-loaded and must never block reading the content.

## 4. Design direction

Suggested mood: **precise, industrial, calm.** Think engineering drawings, control-panel clarity, a well-set technical document. Not "startup landing page."

Ideas to explore (pick or reject):
- **Signature element (optional):** a small, restrained visual tied to his work, e.g. a subtle isometric pallet of boxes stacked layer by layer, echoing the Three.js pallet preview he built. It could sit in the header or behind the headline stats. It must degrade to a static SVG and disappear in print.
- **Headline stats strip:** 3–4 big numbers with short labels: `60+` deployed robot cells · `~25` engineers use the platform · `4+ yrs` at Unchained Robotics · `2` continents / `10 yrs` in software.
- **Typography:** a sharp sans for UI and body (e.g. Inter, IBM Plex Sans, Geist) with a mono for tech tags and dates (IBM Plex Mono, JetBrains Mono). The current PDF uses a slab/serif; a serif name heading is an option if it stays clean.
- **Color:** a mostly neutral palette with **one** accent. An industrial safety orange or a signal blue would suit the robotics side. The two profiles could differ only by a subtle accent shift, or not at all.
- **Timeline treatment** for experience: dates in a left rail on desktop, stacked on mobile.
- The current role at Unchained Robotics has **grouped sub-sections**, each with its own tech line and bullets. This is the densest part of the page and needs the most careful hierarchy (role → sub-project → tech → bullets).

## 5. Page structure

1. **Header:** name, title (changes per profile), location, contact links (email, LinkedIn, GitHub; phone, see open questions), profile switch, "Download PDF" button, theme toggle.
2. **Headline stats** (optional, see above).
3. **Summary:** one paragraph (changes per profile).
4. **Experience:** timeline of roles. The first role has 3–4 sub-sections (these change per profile).
5. **Education:** two degrees, each with 1–2 notable projects.
6. **Skills:** grouped by category. Tags or plain dotted lists.
7. **Languages:** English C1, Deutsch B1.
8. **Footer:** small; e.g. "Last updated" and a link to the source repo.

## 6. Deliverables expected from the design

- Desktop (1280px), tablet (768px) and mobile (375px) layouts, each in light and dark.
- A print / PDF layout (A4, 2 pages).
- A component sheet: header, profile switch, stat tile, section heading, experience entry (with and without sub-sections), education entry, skill group, tech tag, buttons, links, focus states.
- Design tokens: color (light, dark, print), type scale, spacing scale, radii, borders.
- Profile-switch interaction: what changes, and how it transitions (with a reduced-motion fallback).
- Hover and focus states for links and controls.

---

## 7. Content

Use this real content in the mockups; don't use lorem ipsum. Content shared by both profiles is listed once; profile-specific content is marked.

### 7.1 Identity

- **Name:** Aakash Thakkar
- **Title (Robotics / HMI):** Full Stack Engineer | Industrial Robotics & HMI
- **Title (Platform / Web):** Software Engineer | Python, Platform & Developer Tooling
- **Location:** Paderborn, Germany
- **Email:** p.aakash07@gmail.com
- **Phone:** kept out of this repo (see open questions)
- **Links:** LinkedIn, GitHub (URLs to be filled in)

### 7.2 Summary

**Robotics / HMI**
> Full stack engineer in industrial robotics, working where the operator interface meets the machine. Main frontend developer on an HMI builder platform whose output runs on **60+ deployed palletizing cells** at customers including WAGO, Albéa and Arvato. Comfortable at both ends of that stack: React, TypeScript and Three.js in the browser, Python and FastAPI behind it, Modbus TCP and OPC UA out to the PLC and cobots. MSc Computer Science, Universität Paderborn.

**Platform / Web**
> Full stack engineer who builds and runs an internal platform used daily by around 25 engineers, in Python and TypeScript. FastAPI services and PostgreSQL and MongoDB behind them, React in the browser, Docker and Kubernetes underneath, with the monorepo, releases and GitHub Actions pipelines owned end to end. The platform configures operator software running on **60+ deployed industrial robot cells** at customers including WAGO, Albéa and Arvato. MSc Computer Science, Universität Paderborn.

### 7.3 Experience

#### Full Stack Developer, Unchained Robotics GmbH
10.2022 – Present · Paderborn, Germany

**Robotics / HMI version: sub-sections**

*HMI Builder Platform*
Tech: TypeScript, React, Three.js, Python, FastAPI, gRPC/Protobuf, WebSockets, Kubernetes, Docker, GitHub Actions
- Main developer of the feature set of a web-based drag-and-drop HMI builder. Around 25 application programmers use it to configure operator HMIs, which run on 60+ deployed robot cells in food, automotive and part-handling production (WAGO, Albéa, Arvato).
- Set the technical direction for the HMI layer, translating product requirements into the widget data model and the PLC interaction contract used by ~25 application programmers.
- Built most of the widget library. The pallet preview renders a full pallet in 3D, layer by layer, in Three.js. The pallet status widget shows layers in 2D with per-box active and inactive indicators. The image carousel pulls images from file storage or by name from the PLC.
- Wrote the FastAPI backend holding HMI configuration (products, pallet schemas, taught positions) for both the builder and the runtime HMI.
- Maintains the pnpm monorepo and owns releases: PR review, a major release every 3–4 months, minor releases roughly monthly, cloud editor deployed on Kubernetes through GitHub Actions.
- Runs sprint planning and capacity planning together with the team lead, in a team of three.
- Wrote Python simulators for PLC signals so widgets can be built and demonstrated without robot hardware.

*Sequencing and Multi-Pick Logic*
Tech: TypeScript, React, computational geometry
- Rewrote the automatic sequence generator for pallet schemas. The old one produced sequences that collided, so operators had to check every one by hand. The replacement uses a corridor-sweep method and runs client-side.
- Added sequence validation with configurable sweep clearance, so hand-written sequences are checked for collisions before they reach a cell.
- Built the multi-pick and multi-place feasibility check. It takes gripper and product dimensions, feeding orientation and the boxes the operator selected, works out whether those boxes fit the gripper together, and then whether they can go down in one move or have to be split into sub-moves (13.1, 13.2) while staying a single pick.
- Surfaced grouping in the UI and in progress handling, so operators can select a group when starting or resuming a job.

*Robot, PLC and Vision Integration*
Tech: Doosan, Universal Robots, Modbus TCP, OPC UA, Python, Siemens coupler
- Programs and commissions Doosan and Universal Robots cobots for palletizing and depalletizing: teach pendant, joint moves scripted in Python, Modbus register reads and writes.
- Works daily against an in-house PLC platform written in Python, step-chain logic over a Siemens coupler, speaking Modbus TCP and OPC UA.
- Second-level support for the PLC programmers, tracing signal and communication faults across the HMI, PLC and robot layers, including faults that turn out to sit outside the HMI.
- Built a web HMI for an automated inspection cell in Python, Django, Docker and WebSockets. Operators teach inspection points, capture images and text, and edit and export reports. Integrated the Inspekto S70 vision system.

**Platform / Web version: sub-sections**

*Internal Platform and Developer Tooling*
Tech: Python, FastAPI, TypeScript, React, Three.js, WebSockets, gRPC/Protobuf
- Main developer of a web-based configuration platform used daily by around 25 application engineers, whose output runs on 60+ deployed industrial cells in food, automotive and part-handling production (WAGO, Albéa, Arvato).
- Sets the technical direction for the platform layer, turning product requirements into the data model and the interaction contract those 25 engineers build against.
- Built a WebSocket-based locking mechanism that prevents two users editing the same project at once.
- Wrote Python simulators for hardware signals, so features can be developed, demonstrated and tested without access to physical hardware.
- Replaced ZMQ messaging with gRPC after recurring worker drops, defining the Protobuf schemas and the WebSocket bridge that streams events into the browser.
- Owns the pnpm monorepo and the release process: PR review, a major release every 3–4 months, minor releases roughly monthly.
- Runs sprint planning and capacity planning with the team lead, in a team of three.

*Backend, Data and Infrastructure*
Tech: FastAPI, PostgreSQL, MongoDB, Docker, Kubernetes, GitHub Actions, Scaleway, S3
- Wrote the FastAPI backend holding platform configuration, with PostgreSQL for runtime data and MongoDB for editor documents.
- Uses S3-compatible object storage for user-uploaded assets such as images and icons.
- Runs the cloud editor on managed Kubernetes at Scaleway, deployed through GitHub Actions, and debugs cluster and deployment problems as they come up.

*Project Ownership: Sequencing and Geometry*
Tech: TypeScript, React, computational geometry
- Led the rewrite of the automatic sequence generator from scoping through to release. The previous version produced sequences that collided, so operators had to verify every one by hand; the replacement uses a corridor-sweep method, runs client-side, and validates hand-written sequences at configurable clearance.
- Built a feasibility check that takes gripper and product dimensions, feeding orientation and the operator's selection, and works out whether items can be handled together in one movement or have to be split.

*Hardware and Protocol Integration*
Tech: Doosan, Universal Robots, Modbus TCP, OPC UA, Python
- Programs and commissions Doosan and Universal Robots cobots, scripting movements in Python over Modbus registers, against an in-house PLC platform speaking Modbus TCP and OPC UA.
- Second-level support for the controls engineers, tracing signal and communication faults across the interface, PLC and robot layers, including faults that turn out to sit elsewhere in the system.

#### Front End Developer (20h/week), Unchained Robotics GmbH
03.2022 – 08.2022 · Paderborn, Germany
*(The Platform / Web profile titles this role "Full Stack Developer (20h/week)".)*
- Migrated an e-commerce platform from WordPress to NextJS, working with GraphQL against a Saleor backend.
- Added features to an existing web-based HMI, including the pallet schema editor, and worked on a Python updater thread pushing message-system updates to the database and HMI over WebSockets.

#### Full Stack Developer (20h/week), Flocess GmbH
10.2020 – 12.2021 · Paderborn, Germany
- Sole developer of a heat exchanger calculation web application (AngularJS, Django, SQL, Nginx), from build through testing to deployment.
- Added Three.js visualisations of exchanger vessels and interactive forms graphing calculated temperature and volume variations.

#### Student Research Assistant (20h/week), Universität Paderborn
10.2019 – 09.2020 · Paderborn, Germany
*(No bullets. The design must handle an entry with only a title, organisation and dates.)*

#### Systems Engineer, Tata Consultancy Services Pvt. Ltd.
2016 – 2019 · Delhi, India
- Built a Java tool called Legacy Adapter that pulls around **a million JSON messages a day** off a remote server, parses them and writes the extracted attributes into database tables, with automated tests flagging discrepancies against the source.
- Built mobile-compatible UI dashboards for retail data analysis in AngularJS and Node.js, and supported UNIX deployments with Git, SVN, SFTP and shell scripting.

### 7.4 Education

#### Master of Science, Computer Science, Universität Paderborn
2019 – 2024 · Paderborn, Germany
- **Master Thesis: Fuzzing with Static Analysis** (Java, Maven, Bazel, Jazzer, JQF). Combined coverage-guided fuzzers with static data flow analysis, using the analysis to generate initial corpora and validate inputs.
- **Linked Data to Natural Language (LD2NL), Project Group.** Built a summary generator for linked data (Knowledge Graphs) with a React frontend over a Java REST API, ordering output by node prominence.

#### Bachelor of Technology, Computer Science & Engineering, VIT University
2012 – 2016 · Vellore, India
- **Bachelor Project: Automatic Traffic Jam Detection.** Wrote an image recognition program in Python and OpenCV that detects and quantifies traffic congestion in real time, then sets traffic signal states from current conditions.

### 7.5 Skills
The skill list is the same in both profiles. The design could reorder groups per profile, e.g. Robotics first vs. Backend first.

- **Robotics:** Doosan and Universal Robots cobots, Modbus TCP, OPC UA, PLC step-chain logic, palletizing and depalletizing, machine vision (Inspekto)
- **Frontend:** TypeScript, React, NextJS, Three.js, Tailwind
- **Backend:** Python (FastAPI, Django), gRPC/Protobuf, WebSockets, REST, GraphQL
- **Languages:** Python, TypeScript/JavaScript, Java
- **DevOps:** Docker, Kubernetes, GitHub Actions, CI/CD, Git
- **Data:** PostgreSQL, MongoDB
- **Process:** Sprint and capacity planning, release management, PR review, Jira, Agile

### 7.6 Languages
English: C1 · Deutsch: B1

---

## 8. Open questions (decide during design)

1. **Phone number on the public site?** It's in the PDFs. Consider hiding it on the web and showing it only in the printed PDF, or dropping it entirely.
2. **Default profile** when someone lands with no parameter: Robotics / HMI or Platform / Web?
3. **Photo:** none (standard for tech roles) or a small avatar? German applications often expect one in the PDF.
4. **Signature visual:** include the pallet / robotics motif, or keep it purely typographic?
5. **Projects section:** add public GitHub projects later? Leave room for it in the layout.
6. **German version** of the site later? Keep labels short enough to allow for longer German strings.
