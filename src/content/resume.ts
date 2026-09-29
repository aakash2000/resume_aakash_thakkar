import type { Entry, Localized, Profile, Resume, Stat, SubProject } from './types'

// German copy was machine-translated from the English resumes and still needs proofreading.

const PADERBORN: Localized = { en: 'Paderborn, Germany', de: 'Paderborn, Deutschland' }
const UNCHAINED = { org: 'Unchained Robotics GmbH', orgUrl: 'https://unchainedrobotics.de' }

const TECH_SEQUENCING: Localized<string[]> = {
  en: ['TypeScript', 'React', 'computational geometry'],
  de: ['TypeScript', 'React', 'algorithmische Geometrie'],
}

/* ───────────────────────── Stats ───────────────────────── */

const YRS: Localized = { en: 'yrs', de: 'Jahre' }

const statCells: Stat = {
  value: 60,
  suffix: '+',
  label: { en: 'deployed robot cells', de: 'installierte Roboterzellen' },
}
const statYearsAtUnchained: Stat = {
  value: 4,
  suffix: '+',
  unit: YRS,
  label: { en: 'at Unchained Robotics', de: 'bei Unchained Robotics' },
}
const statYearsInSoftware: Stat = {
  value: 10,
  unit: YRS,
  label: { en: 'in software', de: 'in der Softwareentwicklung' },
}

/* ───────────────────────── Profiles ───────────────────────── */

const robotics: Profile = {
  title: {
    en: 'Full Stack Engineer | Industrial Robotics & HMI',
    de: 'Full-Stack-Entwickler | Industrierobotik & HMI',
  },
  summary: {
    en: 'Full stack engineer in industrial robotics, working where the operator interface meets the machine. Main frontend developer on an HMI builder platform whose output runs on 60+ deployed palletizing cells at customers including WAGO, Albéa and Arvato. Comfortable at both ends of that stack: React, TypeScript and Three.js in the browser, Python and FastAPI behind it, Modbus TCP and OPC UA out to the PLC and cobots. MSc Computer Science, Universität Paderborn.',
    de: 'Full-Stack-Entwickler in der Industrierobotik, dort, wo die Bedienoberfläche auf die Maschine trifft. Hauptentwickler im Frontend einer HMI-Builder-Plattform, deren Ergebnisse auf über 60 installierten Palettierzellen bei Kunden wie WAGO, Albéa und Arvato laufen. Sicher an beiden Enden dieses Stacks: React, TypeScript und Three.js im Browser, Python und FastAPI dahinter, Modbus TCP und OPC UA bis zur SPS und zu den Cobots. MSc Informatik, Universität Paderborn.',
  },
  stats: [
    statCells,
    {
      value: 25,
      prefix: '~',
      label: {
        en: 'application programmers use the HMI builder',
        de: 'Anwendungsprogrammierer nutzen den HMI-Builder',
      },
    },
    statYearsAtUnchained,
    statYearsInSoftware,
  ],
  partTimeTitle: { en: 'Front End Developer', de: 'Frontend-Entwickler' },
  currentRoleProjects: [
    {
      title: { en: 'HMI Builder Platform', de: 'HMI-Builder-Plattform' },
      tech: [
        'TypeScript',
        'React',
        'Three.js',
        'Python',
        'FastAPI',
        'gRPC/Protobuf',
        'WebSockets',
        'Kubernetes',
        'Docker',
        'GitHub Actions',
      ],
      bullets: {
        en: [
          'Main developer of the feature set of a web-based drag-and-drop HMI builder. Around 25 application programmers use it to configure operator HMIs, which run on 60+ deployed robot cells in food, automotive and part-handling production (WAGO, Albéa, Arvato).',
          'Set the technical direction for the HMI layer, translating product requirements into the widget data model and the PLC interaction contract used by ~25 application programmers.',
          'Built most of the widget library. The pallet preview renders a full pallet in 3D, layer by layer, in Three.js. The pallet status widget shows layers in 2D with per-box active and inactive indicators. The image carousel pulls images from file storage or by name from the PLC.',
          'Wrote the FastAPI backend holding HMI configuration (products, pallet schemas, taught positions) for both the builder and the runtime HMI.',
          'Maintains the pnpm monorepo and owns releases: PR review, a major release every 3–4 months, minor releases roughly monthly, cloud editor deployed on Kubernetes through GitHub Actions.',
          'Runs sprint planning and capacity planning together with the team lead, in a team of three.',
          'Wrote Python simulators for PLC signals so widgets can be built and demonstrated without robot hardware.',
        ],
        de: [
          'Hauptentwickler des Funktionsumfangs eines webbasierten Drag-and-Drop-HMI-Builders. Rund 25 Anwendungsprogrammierer konfigurieren damit Bedien-HMIs, die auf über 60 installierten Roboterzellen in der Lebensmittel-, Automobil- und Teilehandhabungsproduktion laufen (WAGO, Albéa, Arvato).',
          'Technische Ausrichtung der HMI-Schicht festgelegt und Produktanforderungen in das Widget-Datenmodell und den SPS-Schnittstellenvertrag übersetzt, mit denen ~25 Anwendungsprogrammierer arbeiten.',
          'Großteil der Widget-Bibliothek entwickelt. Die Palettenvorschau rendert eine vollständige Palette Lage für Lage in 3D mit Three.js. Das Palettenstatus-Widget zeigt Lagen in 2D mit aktiven und inaktiven Anzeigen pro Karton. Das Bildkarussell lädt Bilder aus dem Dateispeicher oder per Namen von der SPS.',
          'FastAPI-Backend für die HMI-Konfiguration (Produkte, Palettenschemata, geteachte Positionen) für Builder und Laufzeit-HMI geschrieben.',
          'Betreut das pnpm-Monorepo und verantwortet die Releases: PR-Reviews, ein Major-Release alle 3–4 Monate, Minor-Releases etwa monatlich, Cloud-Editor auf Kubernetes über GitHub Actions ausgerollt.',
          'Leitet Sprint- und Kapazitätsplanung gemeinsam mit dem Teamleiter in einem dreiköpfigen Team.',
          'Python-Simulatoren für SPS-Signale geschrieben, damit Widgets ohne Roboterhardware entwickelt und vorgeführt werden können.',
        ],
      },
    },
    {
      title: { en: 'Sequencing and Multi-Pick Logic', de: 'Sequenzierung und Multi-Pick-Logik' },
      tech: TECH_SEQUENCING,
      bullets: {
        en: [
          'Rewrote the automatic sequence generator for pallet schemas. The old one produced sequences that collided, so operators had to check every one by hand. The replacement uses a corridor-sweep method and runs client-side.',
          'Added sequence validation with configurable sweep clearance, so hand-written sequences are checked for collisions before they reach a cell.',
          'Built the multi-pick and multi-place feasibility check. It takes gripper and product dimensions, feeding orientation and the boxes the operator selected, works out whether those boxes fit the gripper together, and then whether they can go down in one move or have to be split into sub-moves (13.1, 13.2) while staying a single pick.',
          'Surfaced grouping in the UI and in progress handling, so operators can select a group when starting or resuming a job.',
        ],
        de: [
          'Automatischen Sequenzgenerator für Palettenschemata neu geschrieben. Der alte erzeugte kollidierende Sequenzen, sodass Bediener jede von Hand prüfen mussten. Der Ersatz nutzt ein Corridor-Sweep-Verfahren und läuft clientseitig.',
          'Sequenzvalidierung mit konfigurierbarem Sweep-Abstand ergänzt, sodass handgeschriebene Sequenzen auf Kollisionen geprüft werden, bevor sie eine Zelle erreichen.',
          'Machbarkeitsprüfung für Multi-Pick und Multi-Place entwickelt. Sie nimmt Greifer- und Produktabmessungen, Zuführorientierung und die vom Bediener gewählten Kartons, prüft, ob diese gemeinsam in den Greifer passen, und dann, ob sie in einer Bewegung abgelegt werden können oder in Teilbewegungen (13.1, 13.2) aufgeteilt werden müssen, bei weiterhin einem einzigen Pick.',
          'Gruppierung in der Oberfläche und in der Fortschrittsverwaltung sichtbar gemacht, sodass Bediener beim Starten oder Fortsetzen eines Auftrags eine Gruppe wählen können.',
        ],
      },
    },
    {
      title: { en: 'Robot, PLC and Vision Integration', de: 'Roboter-, SPS- und Vision-Integration' },
      tech: {
        en: ['Doosan', 'Universal Robots', 'Modbus TCP', 'OPC UA', 'Python', 'Siemens coupler'],
        de: ['Doosan', 'Universal Robots', 'Modbus TCP', 'OPC UA', 'Python', 'Siemens-Koppler'],
      },
      bullets: {
        en: [
          'Programs and commissions Doosan and Universal Robots cobots for palletizing and depalletizing: teach pendant, joint moves scripted in Python, Modbus register reads and writes.',
          'Works daily against an in-house PLC platform written in Python, step-chain logic over a Siemens coupler, speaking Modbus TCP and OPC UA.',
          'Second-level support for the PLC programmers, tracing signal and communication faults across the HMI, PLC and robot layers, including faults that turn out to sit outside the HMI.',
          'Built a web HMI for an automated inspection cell in Python, Django, Docker and WebSockets. Operators teach inspection points, capture images and text, and edit and export reports. Integrated the Inspekto S70 vision system.',
        ],
        de: [
          'Programmiert Doosan- und Universal-Robots-Cobots für Palettier- und Depalettieraufgaben und nimmt sie in Betrieb: Teach-Pendant, in Python geskriptete Gelenkbewegungen, Lesen und Schreiben von Modbus-Registern.',
          'Arbeitet täglich mit einer hauseigenen, in Python geschriebenen SPS-Plattform: Schrittkettenlogik über einen Siemens-Koppler, Kommunikation über Modbus TCP und OPC UA.',
          'Second-Level-Support für die SPS-Programmierer: verfolgt Signal- und Kommunikationsfehler über HMI-, SPS- und Roboterebene hinweg, auch solche, die sich außerhalb des HMI befinden.',
          'Web-HMI für eine automatisierte Prüfzelle in Python, Django, Docker und WebSockets entwickelt. Bediener teachen Prüfpunkte, erfassen Bilder und Text und bearbeiten und exportieren Berichte. Vision-System Inspekto S70 integriert.',
        ],
      },
    },
  ],
}

const platform: Profile = {
  title: {
    en: 'Software Engineer | Python, Platform & Developer Tooling',
    de: 'Softwareentwickler | Python, Plattform & Developer Tooling',
  },
  summary: {
    en: 'Full stack engineer who builds and runs an internal platform used daily by around 25 engineers, in Python and TypeScript. FastAPI services and PostgreSQL and MongoDB behind them, React in the browser, Docker and Kubernetes underneath, with the monorepo, releases and GitHub Actions pipelines owned end to end. The platform configures operator software running on 60+ deployed industrial robot cells at customers including WAGO, Albéa and Arvato. MSc Computer Science, Universität Paderborn.',
    de: 'Full-Stack-Entwickler, der eine interne Plattform in Python und TypeScript entwickelt und betreibt, die täglich von rund 25 Engineers genutzt wird. FastAPI-Services mit PostgreSQL und MongoDB dahinter, React im Browser, Docker und Kubernetes darunter; Monorepo, Releases und GitHub-Actions-Pipelines verantwortet er durchgängig. Die Plattform konfiguriert Bediensoftware, die auf über 60 installierten Industrieroboterzellen bei Kunden wie WAGO, Albéa und Arvato läuft. MSc Informatik, Universität Paderborn.',
  },
  stats: [
    statCells,
    {
      value: 25,
      prefix: '~',
      label: { en: 'engineers use the platform', de: 'Engineers nutzen die Plattform' },
    },
    statYearsAtUnchained,
    statYearsInSoftware,
  ],
  partTimeTitle: { en: 'Full Stack Developer', de: 'Full-Stack-Entwickler' },
  currentRoleProjects: [
    {
      title: { en: 'Internal Platform and Developer Tooling', de: 'Interne Plattform und Developer Tooling' },
      tech: ['Python', 'FastAPI', 'TypeScript', 'React', 'Three.js', 'WebSockets', 'gRPC/Protobuf'],
      bullets: {
        en: [
          'Main developer of a web-based configuration platform used daily by around 25 application engineers, whose output runs on 60+ deployed industrial cells in food, automotive and part-handling production (WAGO, Albéa, Arvato).',
          'Sets the technical direction for the platform layer, turning product requirements into the data model and the interaction contract those 25 engineers build against.',
          'Built a WebSocket-based locking mechanism that prevents two users editing the same project at once.',
          'Wrote Python simulators for hardware signals, so features can be developed, demonstrated and tested without access to physical hardware.',
          'Replaced ZMQ messaging with gRPC after recurring worker drops, defining the Protobuf schemas and the WebSocket bridge that streams events into the browser.',
          'Owns the pnpm monorepo and the release process: PR review, a major release every 3–4 months, minor releases roughly monthly.',
          'Runs sprint planning and capacity planning with the team lead, in a team of three.',
        ],
        de: [
          'Hauptentwickler einer webbasierten Konfigurationsplattform, die täglich von rund 25 Application Engineers genutzt wird und deren Ergebnisse auf über 60 installierten Industriezellen in der Lebensmittel-, Automobil- und Teilehandhabungsproduktion laufen (WAGO, Albéa, Arvato).',
          'Legt die technische Ausrichtung der Plattformschicht fest und übersetzt Produktanforderungen in das Datenmodell und den Schnittstellenvertrag, auf denen diese 25 Engineers aufbauen.',
          'WebSocket-basierten Sperrmechanismus entwickelt, der verhindert, dass zwei Nutzer gleichzeitig dasselbe Projekt bearbeiten.',
          'Python-Simulatoren für Hardwaresignale geschrieben, damit Funktionen ohne Zugriff auf physische Hardware entwickelt, vorgeführt und getestet werden können.',
          'ZMQ-Messaging nach wiederholten Worker-Ausfällen durch gRPC ersetzt, einschließlich der Protobuf-Schemata und der WebSocket-Bridge, die Events in den Browser streamt.',
          'Verantwortet das pnpm-Monorepo und den Release-Prozess: PR-Reviews, ein Major-Release alle 3–4 Monate, Minor-Releases etwa monatlich.',
          'Leitet Sprint- und Kapazitätsplanung mit dem Teamleiter in einem dreiköpfigen Team.',
        ],
      },
    },
    {
      title: { en: 'Backend, Data and Infrastructure', de: 'Backend, Daten und Infrastruktur' },
      tech: ['FastAPI', 'PostgreSQL', 'MongoDB', 'Docker', 'Kubernetes', 'GitHub Actions', 'Scaleway', 'S3'],
      bullets: {
        en: [
          'Wrote the FastAPI backend holding platform configuration, with PostgreSQL for runtime data and MongoDB for editor documents.',
          'Uses S3-compatible object storage for user-uploaded assets such as images and icons.',
          'Runs the cloud editor on managed Kubernetes at Scaleway, deployed through GitHub Actions, and debugs cluster and deployment problems as they come up.',
        ],
        de: [
          'FastAPI-Backend für die Plattformkonfiguration geschrieben, mit PostgreSQL für Laufzeitdaten und MongoDB für Editor-Dokumente.',
          'Nutzt S3-kompatiblen Objektspeicher für von Nutzern hochgeladene Assets wie Bilder und Icons.',
          'Betreibt den Cloud-Editor auf Managed Kubernetes bei Scaleway, ausgerollt über GitHub Actions, und behebt Cluster- und Deployment-Probleme im laufenden Betrieb.',
        ],
      },
    },
    {
      title: {
        en: 'Project Ownership: Sequencing and Geometry',
        de: 'Projektverantwortung: Sequenzierung und Geometrie',
      },
      tech: TECH_SEQUENCING,
      bullets: {
        en: [
          'Led the rewrite of the automatic sequence generator from scoping through to release. The previous version produced sequences that collided, so operators had to verify every one by hand; the replacement uses a corridor-sweep method, runs client-side, and validates hand-written sequences at configurable clearance.',
          "Built a feasibility check that takes gripper and product dimensions, feeding orientation and the operator's selection, and works out whether items can be handled together in one movement or have to be split.",
        ],
        de: [
          'Neuentwicklung des automatischen Sequenzgenerators von der Planung bis zum Release geleitet. Die vorherige Version erzeugte kollidierende Sequenzen, sodass Bediener jede von Hand prüfen mussten; der Ersatz nutzt ein Corridor-Sweep-Verfahren, läuft clientseitig und validiert handgeschriebene Sequenzen mit konfigurierbarem Abstand.',
          'Machbarkeitsprüfung entwickelt, die aus Greifer- und Produktabmessungen, Zuführorientierung und der Auswahl des Bedieners ermittelt, ob Teile gemeinsam in einer Bewegung gehandhabt werden können oder aufgeteilt werden müssen.',
        ],
      },
    },
    {
      title: { en: 'Hardware and Protocol Integration', de: 'Hardware- und Protokollintegration' },
      tech: ['Doosan', 'Universal Robots', 'Modbus TCP', 'OPC UA', 'Python'],
      bullets: {
        en: [
          'Programs and commissions Doosan and Universal Robots cobots, scripting movements in Python over Modbus registers, against an in-house PLC platform speaking Modbus TCP and OPC UA.',
          'Second-level support for the controls engineers, tracing signal and communication faults across the interface, PLC and robot layers, including faults that turn out to sit elsewhere in the system.',
        ],
        de: [
          'Programmiert Doosan- und Universal-Robots-Cobots und nimmt sie in Betrieb, mit in Python geskripteten Bewegungen über Modbus-Register, angebunden an eine hauseigene SPS-Plattform mit Modbus TCP und OPC UA.',
          'Second-Level-Support für die Steuerungstechniker: verfolgt Signal- und Kommunikationsfehler über Oberflächen-, SPS- und Roboterebene hinweg, auch solche, die an anderer Stelle im System liegen.',
        ],
      },
    },
  ],
}

/* ───────────────────────── Experience ───────────────────────── */

const earlierExperience: Entry[] = [
  {
    id: 'flocess',
    title: { en: 'Full Stack Developer', de: 'Full-Stack-Entwickler' },
    partTime: true,
    // flocess.de no longer resolves, so the organisation is shown without a link.
    org: 'Flocess GmbH',
    start: '10.2020',
    end: '12.2021',
    location: PADERBORN,
    bullets: {
      en: [
        'Sole developer of a heat exchanger calculation web application (AngularJS, Django, SQL, Nginx), from build through testing to deployment.',
        'Added ThreeJs visualisations of exchanger vessels and interactive forms graphing calculated temperature and volume variations.',
      ],
      de: [
        'Alleiniger Entwickler einer Webanwendung zur Berechnung von Wärmetauschern (AngularJS, Django, SQL, Nginx), von der Entwicklung über Tests bis zum Deployment.',
        'ThreeJs-Visualisierungen der Wärmetauscherbehälter und interaktive Formulare ergänzt, die berechnete Temperatur- und Volumenverläufe grafisch darstellen.',
      ],
    },
  },
  {
    id: 'upb-assistant',
    title: { en: 'Student Research Assistant', de: 'Studentische Hilfskraft' },
    partTime: true,
    org: 'Universität Paderborn',
    orgUrl: 'https://www.uni-paderborn.de',
    start: '10.2019',
    end: '09.2020',
    location: PADERBORN,
  },
  {
    id: 'tcs',
    title: 'Systems Engineer',
    org: 'Tata Consultancy Services Pvt. Ltd.',
    orgUrl: 'https://www.tcs.com',
    start: '2016',
    end: '2019',
    location: { en: 'Delhi, India', de: 'Delhi, Indien' },
    bullets: {
      en: [
        'Built a Java tool called Legacy Adapter that pulls around a million JSON messages a day off a remote server, parses them and writes the extracted attributes into database tables, with automated tests flagging discrepancies against the source.',
        'Built mobile-compatible UI dashboards for retail data analysis in AngularJS and Node.js, and supported UNIX deployments with Git, SVN, SFTP and shell scripting.',
      ],
      de: [
        'Java-Tool „Legacy Adapter“ entwickelt, das täglich rund eine Million JSON-Nachrichten von einem entfernten Server abruft, parst und die extrahierten Attribute in Datenbanktabellen schreibt; automatisierte Tests melden Abweichungen zur Quelle.',
        'Mobilfähige UI-Dashboards zur Analyse von Handelsdaten in AngularJS und Node.js entwickelt und UNIX-Deployments mit Git, SVN, SFTP und Shell-Skripten unterstützt.',
      ],
    },
  },
]

function experience(profile: Profile): Entry[] {
  return [
    {
      id: 'unchained',
      title: { en: 'Full Stack Developer', de: 'Full-Stack-Entwickler' },
      ...UNCHAINED,
      start: '10.2022',
      location: PADERBORN,
      subProjects: profile.currentRoleProjects,
    },
    {
      id: 'unchained-part-time',
      title: profile.partTimeTitle,
      partTime: true,
      ...UNCHAINED,
      start: '03.2022',
      end: '08.2022',
      location: PADERBORN,
      bullets: {
        en: [
          'Migrated an e-commerce platform from WordPress to NextJS, working with GraphQL against a Saleor backend.',
          'Added features to an existing web-based HMI, including the pallet schema editor, and worked on a Python updater thread pushing message-system updates to the database and HMI over WebSockets.',
        ],
        de: [
          'E-Commerce-Plattform von WordPress auf NextJS migriert, mit GraphQL gegen ein Saleor-Backend.',
          'Funktionen für ein bestehendes webbasiertes HMI entwickelt, darunter den Palettenschema-Editor, und an einem Python-Updater-Thread gearbeitet, der Updates des Nachrichtensystems per WebSockets an Datenbank und HMI überträgt.',
        ],
      },
    },
    ...earlierExperience,
  ]
}

/* ───────────────────────── Education ───────────────────────── */

const masterThesis: SubProject = {
  title: {
    en: 'Master Thesis: Fuzzing with Static Analysis',
    de: 'Masterarbeit: Fuzzing mit statischer Analyse',
  },
  tech: ['Java', 'Maven', 'Bazel', 'Jazzer', 'JQF'],
  bullets: {
    en: [
      'Combined coverage-guided fuzzers with static data flow analysis, using the analysis to generate initial corpora and validate inputs.',
    ],
    de: [
      'Coverage-gesteuerte Fuzzer mit statischer Datenflussanalyse kombiniert; die Analyse erzeugt initiale Korpora und validiert Eingaben.',
    ],
  },
}

const education: Entry[] = [
  {
    id: 'msc',
    title: { en: 'Master of Science - Computer Science', de: 'Master of Science – Informatik' },
    org: 'Universität Paderborn',
    orgUrl: 'https://www.uni-paderborn.de',
    start: '2019',
    end: '2024',
    location: PADERBORN,
    subProjects: [
      masterThesis,
      {
        title: {
          en: 'Linked Data to Natural Language (LD2NL) - Project Group',
          de: 'Linked Data to Natural Language (LD2NL) – Projektgruppe',
        },
        bullets: {
          en: [
            'Built a summary generator for linked data (Knowledge Graphs) with a React frontend over a Java REST API, ordering output by node prominence.',
          ],
          de: [
            'Zusammenfassungsgenerator für Linked Data (Knowledge Graphs) mit React-Frontend über einer Java-REST-API entwickelt, der die Ausgabe nach Prominenz der Knoten ordnet.',
          ],
        },
      },
    ],
  },
  {
    id: 'btech',
    title: 'Bachelor of Technology - Computer Science & Engineering',
    org: 'VIT University',
    orgUrl: 'https://vit.ac.in',
    start: '2012',
    end: '2016',
    location: { en: 'Vellore, India', de: 'Vellore, Indien' },
    subProjects: [
      {
        title: {
          en: 'Bachelor Project: Automatic Traffic Jam Detection',
          de: 'Bachelorprojekt: Automatische Stauerkennung',
        },
        bullets: {
          en: [
            'Wrote an image recognition program in Python and OpenCV that detects and quantifies traffic congestion in real time, then sets traffic signal states from current conditions.',
          ],
          de: [
            'Bilderkennungsprogramm in Python und OpenCV geschrieben, das Verkehrsstaus in Echtzeit erkennt und quantifiziert und daraus die Ampelzustände ableitet.',
          ],
        },
      },
    ],
  },
]

/* ───────────────────────── Resume ───────────────────────── */

export const resume: Resume = {
  name: 'Aakash Thakkar',
  initials: 'AT',
  contact: {
    location: PADERBORN,
    email: 'p.aakash07@gmail.com',
    // TODO: add LinkedIn and GitHub once the profile URLs are confirmed.
    links: [],
  },
  customers: ['WAGO', 'Albéa', 'Arvato'],
  profiles: { robotics, platform },
  experience,
  education,
  skills: [
    {
      label: { en: 'Robotics', de: 'Robotik' },
      items: {
        en: [
          'Doosan and Universal Robots cobots',
          'Modbus TCP',
          'OPC UA',
          'PLC step-chain logic',
          'palletizing and depalletizing',
          'machine vision (Inspekto)',
        ],
        de: [
          'Doosan- und Universal-Robots-Cobots',
          'Modbus TCP',
          'OPC UA',
          'SPS-Schrittkettenlogik',
          'Palettieren und Depalettieren',
          'Machine Vision (Inspekto)',
        ],
      },
    },
    { label: 'Frontend', items: ['TypeScript', 'React', 'NextJS', 'Three.js', 'Tailwind'] },
    {
      label: 'Backend',
      items: ['Python (FastAPI, Django)', 'gRPC/Protobuf', 'WebSockets', 'REST', 'GraphQL'],
    },
    {
      label: { en: 'Languages', de: 'Programmiersprachen' },
      items: ['Python', 'TypeScript/JavaScript', 'Java'],
    },
    { label: 'DevOps', items: ['Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Git'] },
    { label: { en: 'Data', de: 'Daten' }, items: ['PostgreSQL', 'MongoDB'] },
    {
      label: { en: 'Process', de: 'Prozesse' },
      items: {
        en: ['Sprint and capacity planning', 'release management', 'PR review', 'Jira', 'Agile'],
        de: ['Sprint- und Kapazitätsplanung', 'Release-Management', 'PR-Reviews', 'Jira', 'Agile'],
      },
    },
  ],
  spokenLanguages: [
    { language: { en: 'English', de: 'Englisch' }, level: 'C1' },
    { language: { en: 'German', de: 'Deutsch' }, level: 'B1' },
  ],
  // TODO: add German PDFs (de) once they exist.
  pdfs: {
    robotics: { en: 'resume/robotics-en.pdf' },
    platform: { en: 'resume/platform-en.pdf' },
  },
}
