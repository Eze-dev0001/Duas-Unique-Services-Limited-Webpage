/* =========================================================
   DUAS UNIQUE SERVICES LIMITED
   EXECUTIVE APPLICATION LOGIC & INTERACTIONS
   RC 1639974 — Abuja, Nigeria
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const root = document.documentElement;

  // Global DOM Elements
  const loader = document.getElementById("pageLoader");
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavBackdrop = document.getElementById("mobileNavBackdrop");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const backTop = document.getElementById("backTop");
  const toastNotice = document.getElementById("toastNotice");

  /* =====================================================
     1. THEME MANAGER (LIGHT / DARK WITH SYSTEM PREF)
     ===================================================== */
  const THEME_STORAGE_KEY = "duas-theme-mode";

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      root.classList.add("dark");
      themeIcon.textContent = "☀";
      themeToggle.setAttribute("aria-label", "Switch to light mode");
    } else {
      root.classList.remove("dark");
      themeIcon.textContent = "☾";
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
  }

  let currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  themeToggle.addEventListener("click", () => {
    currentTheme = root.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    applyTheme(currentTheme);
    showToast(`Switched to ${currentTheme} mode`);
  });

  /* =====================================================
     2. NAVIGATION & MOBILE MENU
     ===================================================== */
  function openMobileNav() {
    mobileNav.classList.add("open");
    if (mobileNavBackdrop) mobileNavBackdrop.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
    document.body.classList.add("modal-open");
  }

  function closeMobileNav() {
    mobileNav.classList.remove("open");
    if (mobileNavBackdrop) mobileNavBackdrop.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("modal-open");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.contains("open");
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener("click", closeMobileNav);
  }

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  // Sticky Header & Back to Top
  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY;
      header.classList.toggle("scrolled", scrollY > 20);
      backTop.classList.toggle("show", scrollY > 500);
    },
    { passive: true },
  );

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Active Link Scroll Spy
  const navLinks = [...document.querySelectorAll(".desktop-nav a[href^='#']")];
  const trackedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const scrollSpyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`,
            );
          });
        }
      });
    },
    { rootMargin: "-25% 0px -65% 0px" },
  );

  trackedSections.forEach((section) => scrollSpyObserver.observe(section));

  /* =====================================================
     3. PRELOADER
     ===================================================== */
  window.addEventListener("load", () => {
    if (loader) {
      setTimeout(() => {
        loader.classList.add("hide");
        loader.setAttribute("aria-hidden", "true");
      }, 350);
    }
  });

  /* =====================================================
     4. DATA: 13 CORE DISCIPLINES & SERVICES
     ===================================================== */
  const services = [
    {
      id: "civil",
      name: "Civil Engineering Work",
      category: "engineering",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l8-4v18M13 7l6 3v11M9 9h1M9 13h1M9 17h1M17 13h1M17 17h1"/></svg>`,
      description:
        "Comprehensive civil engineering, massive earthworks, site preparation, reinforced concrete foundations, and municipal drainage infrastructure.",
      deliverables: [
        "Site topographical survey and soil load-bearing analysis",
        "Retaining walls, structural foundations, and culvert construction",
        "Erosion control, storm drainage, and hydraulic infrastructure",
        "COREN and NSE certified quality assurance and field supervision",
      ],
      standards: "COREN, Nigerian National Building Code (NNBC), BS 8110",
    },
    {
      id: "building",
      name: "Building Structure & Development",
      category: "engineering",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3M9 7h1M9 11h1M9 15h1M14 7h1M14 11h1M14 15h1"/></svg>`,
      description:
        "Turnkey design-and-build, residential complexes, commercial office towers, industrial warehouse development, and structural rehabilitation.",
      deliverables: [
        "Architectural drafting, structural engineering, and MEP coordination",
        "High-strength reinforced concrete frames and steel truss erection",
        "Interior partitioning, premium plaster finishes, and facade glazing",
        "Complete safety audits, fire protection compliance, and handover",
      ],
      standards: "ISO 9001:2015 Construction Management, BPP Compliance",
    },
    {
      id: "roads",
      name: "Road Construction & Rehabilitation",
      category: "engineering",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M4 19L8 5m8 14l4-14M12 5v3m0 5v3m0 5v1"/></svg>`,
      description:
        "Urban dual-carriageway paving, rural feeder road rehabilitation, asphalt binder and wearing courses, bridge culverts, and road furniture.",
      deliverables: [
        "Subgrade stabilization, stone base spreading, and prime coating",
        "Heavy-duty hot-mix asphalt (HMA) laying and compaction testing",
        "Concrete road kerbs, stormwater channels, and embankment protection",
        "Thermoplastic retroreflective road markings and solar street lighting",
      ],
      standards: "Federal Ministry of Works & Housing Highway Standards",
    },
    {
      id: "ict",
      name: "ICT & Telecommunication Infrastructure",
      category: "technology",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
      description:
        "Fiber optic cable reticulation, enterprise structured cabling, server room deployment, telecommunication mast installation, and network security.",
      deliverables: [
        "Metropolitan and intra-campus fiber optic cable trenching & splicing",
        "Structured Cat6A/Fiber optic backbone and data center rack installation",
        "Telecom tower erection, microwave links, and cellular co-location",
        "Enterprise IP surveillance, access control, and VoIP integration",
      ],
      standards: "NCC Specifications, TIA/EIA-568 Commercial Building Cabling",
    },
    {
      id: "electrical",
      name: "Electrical Installation & Maintenance",
      category: "engineering",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
      description:
        "High, medium, and low voltage electrical power distribution, industrial control panel wiring, substation commissioning, and statutory safety audits.",
      deliverables: [
        "Substation transformer installation (11kV / 33kV) and switchgear setup",
        "Building conduit piping, power distribution panels, and busbar trunking",
        "Surge protection, lightning arrester systems, and deep earth grounding",
        "Thermographic inspection, preventive servicing, and load balancing",
      ],
      standards: "NEMSA Certified, IEE Wiring Regulations (BS 7671)",
    },
    {
      id: "water",
      name: "Borehole Drilling & Water Systems",
      category: "water",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>`,
      description:
        "Hydrogeological geophysics, industrial motorized borehole drilling, reverse osmosis water purification plants, and reticulation schemes.",
      deliverables: [
        "Resistivity meter geophysical aquifer surveys and yield logging",
        "Deep drilling (up to 250m) in sedimentary and basement complex terrains",
        "Stainless steel submersible solar pumps and elevated storage tanks",
        "Multi-stage chemical filtration, iron removal, and reverse osmosis",
      ],
      standards: "Federal Ministry of Water Resources & WHO Potable Standards",
    },
    {
      id: "import",
      name: "Importation & Exportation",
      category: "business",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>`,
      description:
        "Global trade logistics, international procurement of heavy industrial machinery, customs clearance, freight forwarding, and specialized cargo handling.",
      deliverables: [
        "Form M processing, PAAR documentation, and customs compliance",
        "Ocean freight container shipping, breakbulk, and airfreight handling",
        "Direct manufacturer sourcing across Europe, Asia, and the Americas",
        "Bonded terminal warehousing and door-to-door project delivery",
      ],
      standards: "Nigeria Customs Service Certified, SCUML / EFCC Compliant",
    },
    {
      id: "power",
      name: "Power & Energy Infrastructure",
      category: "energy",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M18.36 6.64a9 9 0 11-12.73 0M12 2v10"/></svg>`,
      description:
        "Grid extension projects, 33kV transmission lines, diesel/gas backup power generation plants, captive power systems, and energy audits.",
      deliverables: [
        "HT & LT concrete pole / steel lattice transmission line stringing",
        "Industrial heavy-duty generator bank synchronization and sound attenuation",
        "Step-down distribution transformers and automatic transfer switches (ATS)",
        "Industrial energy efficiency audits and harmonic distortion correction",
      ],
      standards: "NERC Regulations, NEMSA Safety and Testing Clearances",
    },
    {
      id: "solar",
      name: "Solar Energy System & Installation",
      category: "energy",
      iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
      description:
        "Commercial and residential solar PV microgrids, Tier-1 monocrystalline installations, lithium LiFePO4 battery energy storage, and solar streetlights.",
      deliverables: [
        "Detailed solar irradiance analysis and commercial load profiling",
        "Tier-1 bifacial solar PV panels with aluminum roof and ground mounts",
        "Pure sine wave hybrid inverters with smart remote cloud telemetry",
        "High-capacity Lithium Iron Phosphate (LiFePO4) storage banks",
      ],
      standards: "IEC 61215 PV Quality Standards, Clean Energy Council Certified",
    },
    {
      id: "agro",
      name: "Agro & Agricultural Services",
      category: "business",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v8m-3-3l3 3 3-3"/></svg>`,
      description:
        "Modern mechanized farm infrastructure, solar drip irrigation schemes, grain storage silos, greenhouse construction, and agro-allied value addition.",
      deliverables: [
        "Commercial center-pivot and pressurized drip irrigation installation",
        "Galvanized steel grain storage silos and drying plant equipment",
        "Climate-controlled agricultural greenhouse structure assembly",
        "Farm mechanization procurement, tractor implements, and logistics",
      ],
      standards: "Federal Ministry of Agriculture Standards, FMARD Compliant",
    },
    {
      id: "procurement",
      name: "Procurement & General Supplies",
      category: "procurement",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>`,
      description:
        "Federal, state, and corporate procurement contracting, industrial raw materials, medical and laboratory consumables, and specialized equipment supply.",
      deliverables: [
        "Transparent BPP-compliant procurement bidding and vendor management",
        "Direct factory-to-site supply chain coordination and quality verification",
        "Industrial construction materials: rebar, cement, bitumen, and piping",
        "Rapid mobilization and guaranteed delivery timelines across Nigeria",
      ],
      standards: "BPP National Database Certified, ISO 20400 Sustainable Supply",
    },
    {
      id: "consultancy",
      name: "Consultancy Services & Partnership",
      category: "business",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm14 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
      description:
        "Feasibility studies, structural integrity assessments, engineering project management, PPP advisory, and joint venture execution.",
      deliverables: [
        "Bankable technical and economic feasibility reports",
        "Non-destructive structural testing (NDT) and integrity audits",
        "Contract administration, Bill of Quantities (BOQ), and cost planning",
        "Public-Private Partnership (PPP) framework structuring",
      ],
      standards: "ACEN / COREN Recognized Engineering Consultancy Standards",
    },
    {
      id: "general",
      name: "General Contract & Services",
      category: "business",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>`,
      description:
        "Flexible multidisciplinary EPC contracting, facility maintenance operations, emergency civil restorations, and turnkey project delivery.",
      deliverables: [
        "Total facility lifecycle operation and maintenance contracts",
        "Rapid response structural, electrical, and hydraulic emergency fixes",
        "Multi-trade workforce mobilization and heavy plant equipment leasing",
        "Turnkey project supervision from initial brief to commissioning",
      ],
      standards: "Corporate Affairs Commission (CAC) Registered: RC 1639974",
    },
  ];

  const categoryLabels = {
    engineering: "Civil & Infrastructure",
    technology: "Technology & Telecom",
    energy: "Energy & Solar",
    water: "Water Systems",
    procurement: "Procurement & Trade",
    business: "Business & Agro",
  };

  /* =====================================================
     5. RENDER SERVICES
     ===================================================== */
  const serviceGrid = document.getElementById("serviceGrid");
  const serviceCountBadge = document.getElementById("serviceCountBadge");
  const contactServiceSelect = document.getElementById("contactService");

  function populateContactServiceOptions() {
    if (!contactServiceSelect) return;
    contactServiceSelect.innerHTML =
      `<option value="">Select a service category...</option>` +
      services
        .map(
          (s) =>
            `<option value="${escapeAttr(s.name)}">${escapeHtml(s.name)}</option>`,
        )
        .join("");
  }

  function renderServices(filter = "all") {
    if (!serviceGrid) return;
    const filtered = services.filter(
      (s) => filter === "all" || s.category === filter,
    );

    if (serviceCountBadge) {
      serviceCountBadge.innerHTML = `<strong>${filtered.length}</strong> Disciplines Available`;
    }

    serviceGrid.innerHTML = filtered
      .map((service, index) => {
        const overallIndex = services.indexOf(service) + 1;
        const seqStr = String(overallIndex).padStart(2, "0");
        return `
          <article class="service-card reveal" data-service-id="${service.id}" style="animation-delay: ${index * 60}ms">
              <div class="service-card-top">
                  <span class="service-seq">DISCIPLINE // ${seqStr}</span>
                  <span class="service-category-tag">${categoryLabels[service.category] || service.category}</span>
              </div>
              <div class="service-icon-box" aria-hidden="true">${service.iconSvg}</div>
              <h3>${escapeHtml(service.name)}</h3>
              <p>${escapeHtml(service.description)}</p>
              <div class="service-action-link">
                  View Scope & Specifications <span>→</span>
              </div>
          </article>
        `;
      })
      .join("");

    // Wire up card clicks to open Service Modal
    serviceGrid.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("click", () => {
        const sId = card.dataset.serviceId;
        const found = services.find((item) => item.id === sId);
        if (found) openServiceModal(found);
      });
    });

    observeReveals();
  }

  // Filter Buttons
  document.querySelectorAll("[data-service-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll("[data-service-filter]")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderServices(btn.dataset.serviceFilter);
    });
  });

  /* =====================================================
     6. SERVICE DETAIL MODAL (WITH BUG FIX)
     ===================================================== */
  const serviceModal = document.getElementById("serviceModal");
  const serviceModalTitle = document.getElementById("serviceModalTitle");
  const serviceModalCategory = document.getElementById("serviceModalCategory");
  const serviceModalDesc = document.getElementById("serviceModalDesc");
  const serviceModalPoints = document.getElementById("serviceModalPoints");
  const serviceModalClose = document.getElementById("serviceModalClose");
  const serviceModalCta = document.getElementById("serviceModalCta");
  let activeModalService = null;

  function openServiceModal(service) {
    activeModalService = service;
    serviceModalTitle.textContent = service.name;
    serviceModalCategory.textContent =
      categoryLabels[service.category] || service.category;
    serviceModalDesc.textContent = service.description;

    serviceModalPoints.innerHTML = service.deliverables
      .map(
        (point) => `
          <div class="modal-scope-point">
              <span class="check-icon">✓</span>
              <span>${escapeHtml(point)}</span>
          </div>
        `,
      )
      .join("");

    serviceModal.classList.add("open");
    serviceModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    serviceModalClose.focus();
  }

  function closeServiceModal() {
    serviceModal.classList.remove("open");
    serviceModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    activeModalService = null;
  }

  if (serviceModalClose) {
    serviceModalClose.addEventListener("click", closeServiceModal);
  }

  // Fix: Close modal when clicking "Request Quote for this Service" and populate contact form!
  if (serviceModalCta) {
    serviceModalCta.addEventListener("click", (e) => {
      e.preventDefault();
      const currentService = activeModalService;
      closeServiceModal();

      if (contactServiceSelect && currentService) {
        contactServiceSelect.value = currentService.name;
      }

      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const messageInput = document.getElementById("contactMessage");
          if (messageInput) {
            messageInput.focus();
            if (currentService && !messageInput.value) {
              messageInput.value = `Hello Duas Unique Services, I am interested in discussing your ${currentService.name} solutions. Please share a preliminary consultation or quotation.`;
            }
          }
        }, 600);
      }
    });
  }

  // Close modal when clicking backdrop
  serviceModal.addEventListener("click", (e) => {
    if (e.target === serviceModal) {
      closeServiceModal();
    }
  });

  /* =====================================================
     7. DATA: AUTHENTIC NIGERIAN INFRASTRUCTURE PROJECTS
     ===================================================== */
  const defaultProjects = [
    {
      id: "proj-01",
      title: "Dual-Carriageway Road Rehabilitation & Stormwater Network",
      location: "Central Business District & Garki, Abuja",
      zone: "north-central",
      year: "2024",
      sector: "engineering",
      scope:
        "14.2 km dual-carriageway rehabilitation, 6,200m trapezoidal concrete stormwater drainage channels, pavement milling, 60mm asphalt concrete overlay, and solar street lighting installations.",
      deliverables: [
        "Heavy-duty asphalt paving and wearing course laying",
        "Pre-cast hydraulic drainage and culvert structures",
        "Thermoplastic retroreflective road markings and signage",
        "Autonomous commercial solar street lighting fixtures",
      ],
      clientSector: "Federal Capital Infrastructure Project",
    },
    {
      id: "proj-02",
      title: "Corporate Commercial Multi-Storey Structural Complex",
      location: "Victoria Island, Lagos State",
      zone: "south-west",
      year: "2023",
      sector: "engineering",
      scope:
        "Full structural construction of a 7-floor corporate headquarters building, deep pile foundation testing, reinforced concrete shear walls, structural steel frame, and curtain walling.",
      deliverables: [
        "Bored cast-in-situ piling and reinforced raft foundation",
        "Multi-storey concrete super-structure and post-tensioned slabs",
        "High-performance low-emissivity glass curtain wall facade",
        "Integrated mechanical, electrical, and plumbing (MEP) reticulation",
      ],
      clientSector: "Commercial Real Estate Development",
    },
    {
      id: "proj-03",
      title: "Community Hybrid Solar PV Mini-Grid & Power Reticulation",
      location: "Keffi Corridor, Nasarawa State",
      zone: "north-central",
      year: "2024",
      sector: "energy",
      scope:
        "Turnkey design, supply, and installation of a 150kWp decentralized solar PV hybrid mini-grid with 320kWh Lithium Iron Phosphate (LiFePO4) storage and a 5.2km low-voltage distribution network.",
      deliverables: [
        "Tier-1 monocrystalline solar PV ground mount array (150kWp)",
        "Industrial 3-phase hybrid inverters with cloud SCADA telemetry",
        "320kWh modular LiFePO4 battery bank with active BMS",
        "5.2km concrete-pole low-voltage power distribution lines",
      ],
      clientSector: "Rural Electrification & Clean Energy",
    },
    {
      id: "proj-04",
      title: "Deep Industrial Borehole & High-Volume Treatment Scheme",
      location: "Bompai Industrial Layout, Kano State",
      zone: "north-west",
      year: "2023",
      sector: "water",
      scope:
        "Geophysical aquifer imaging, motorized deep drilling to 195 meters, submersible pumping plant, multi-stage iron/manganese removal treatment plant, and a 60,000-litre elevated galvanized steel reservoir.",
      deliverables: [
        "Deep rotary drilling in crystalline basement rock formation",
        "60m³ elevated water storage tank on a 15m structural steel tower",
        "Automated dual-sand, activated carbon, and UV purification system",
        "Dedicated distribution pipework serving 4 commercial facilities",
      ],
      clientSector: "Industrial Manufacturing Cluster",
    },
    {
      id: "proj-05",
      title: "Campus-Wide Fiber Optic Backbone & Smart ICT Infrastructure",
      location: "University Campus, Bauchi State",
      zone: "north-east",
      year: "2024",
      sector: "technology",
      scope:
        "Deployment of 9.4 kilometers of armored single-mode underground fiber optic cabling, interconnecting 14 administrative and faculty buildings, central data center racks, and campus WiFi hotspots.",
      deliverables: [
        "Civil trenching, HDPE ducting, and fusion-spliced fiber reticulation",
        "Tier-2 server room rack buildout with precision cooling and UPS",
        "High-density commercial outdoor WiFi access points and routers",
        "Campus perimeter IP surveillance system with NVR integration",
      ],
      clientSector: "Higher Education & Research Institution",
    },
    {
      id: "proj-06",
      title: "Federal Engineering Equipment Procurement & Delivery",
      location: "Abuja FCT & Port Harcourt, Rivers State",
      zone: "south-south",
      year: "2023",
      sector: "procurement",
      scope:
        "International sourcing, marine shipping, customs clearance, and nationwide dispatch of heavy-duty auxiliary power generators (500kVA–1000kVA) and specialized soil mechanics test apparatus.",
      deliverables: [
        "Full compliance with Bureau of Public Procurement (BPP) mandates",
        "Customs clearance, port documentation, and insured inland haulage",
        "Site offloading, rigorous pre-commissioning testing, and QA signoff",
        "Client engineering staff operational training and maintenance manuals",
      ],
      clientSector: "Federal Agency Public Procurement",
    },
    {
      id: "proj-07",
      title: "Commercial Agricultural Irrigation & Solar Pump Network",
      location: "Owerri Agro-Cluster, Imo State",
      zone: "south-east",
      year: "2023",
      sector: "business",
      scope:
        "Comprehensive 30-hectare agricultural development including high-yield solar-powered submersible pumps, pressurized drip irrigation manifold, and perimeter security electrification.",
      deliverables: [
        "Installation of 4 high-head solar borehole water abstraction pumps",
        "Mainline PVC piping and automated precision drip irrigation lines",
        "Solar-powered agricultural electric security perimeter fence",
        "25,000-litre ground-level holding reservoirs with booster stations",
      ],
      clientSector: "Commercial Agro-Allied Farm Project",
    },
    {
      id: "proj-08",
      title: "33/11kV Injection Substation Rehabilitation & Power Audit",
      location: "Kakuri Industrial Area, Kaduna State",
      zone: "north-west",
      year: "2023",
      sector: "energy",
      scope:
        "Complete overhaul and servicing of two 15MVA power transformers, vacuum circuit breaker replacements, underground cable fault detection, and protective relay calibrations.",
      deliverables: [
        "Transformer oil filtration, dielectric breakdown testing, and degassing",
        "11kV indoor switchgear and microprocessor relay retrofitting",
        "Thermal imaging audit of overhead busbars and line connections",
        "Comprehensive statutory electrical safety compliance certification",
      ],
      clientSector: "Regional Power Distribution Network",
    },
  ];

  const STORAGE_PROJECTS_KEY = "duas-portfolio-projects-v3";

  function loadProjects() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_PROJECTS_KEY) || "null",
      );
      if (Array.isArray(saved) && saved.length > 0) return saved;
    } catch (e) {
      console.warn("Could not read stored portfolio data.", e);
    }
    localStorage.setItem(
      STORAGE_PROJECTS_KEY,
      JSON.stringify(defaultProjects),
    );
    return [...defaultProjects];
  }

  let projects = loadProjects();
  let currentSectorFilter = "all";
  let currentZoneFilter = "all";
  let searchQuery = "";

  const projectGrid = document.getElementById("projectGrid");
  const projectCountDisplay = document.getElementById("projectCountDisplay");
  const emptyProjectState = document.getElementById("emptyProjectState");
  const projectSearchInput = document.getElementById("projectSearchInput");
  const projectZoneSelect = document.getElementById("projectZoneSelect");

  const zoneNames = {
    "north-central": "North-Central (FCT, Nasarawa, Niger)",
    "north-east": "North-East (Bauchi, Borno, Gombe)",
    "north-west": "North-West (Kano, Kaduna, Sokoto)",
    "south-west": "South-West (Lagos, Oyo, Ogun)",
    "south-east": "South-East (Enugu, Imo, Anambra)",
    "south-south": "South-South (Rivers, Delta, Akwa Ibom)",
  };

  const sectorBadgeNames = {
    engineering: "Civil & Infrastructure",
    technology: "Technology & ICT",
    energy: "Power & Solar Energy",
    water: "Borehole & Water Systems",
    procurement: "Procurement & Logistics",
    business: "Agro & General Services",
  };

  function renderProjects() {
    if (!projectGrid) return;

    const filtered = projects.filter((proj) => {
      const matchSector =
        currentSectorFilter === "all" || proj.sector === currentSectorFilter;
      const matchZone =
        currentZoneFilter === "all" || proj.zone === currentZoneFilter;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        proj.title.toLowerCase().includes(query) ||
        proj.location.toLowerCase().includes(query) ||
        proj.scope.toLowerCase().includes(query) ||
        (sectorBadgeNames[proj.sector] || "")
          .toLowerCase()
          .includes(query);

      return matchSector && matchZone && matchSearch;
    });

    if (projectCountDisplay) {
      projectCountDisplay.textContent = filtered.length;
    }

    if (filtered.length === 0) {
      projectGrid.innerHTML = "";
      if (emptyProjectState) emptyProjectState.hidden = false;
      return;
    }

    if (emptyProjectState) emptyProjectState.hidden = true;

    projectGrid.innerHTML = filtered
      .map((p, index) => {
        const sectorTitle = sectorBadgeNames[p.sector] || p.sector;
        const zoneTitle = zoneNames[p.zone] ? p.zone.toUpperCase() : "NIGERIA";

        return `
          <article class="project-card reveal" data-project-id="${p.id}" style="animation-delay: ${index * 60}ms">
              <div class="project-banner">
                  <div class="project-banner-pattern"></div>
                  <span class="project-tag">${escapeHtml(sectorTitle)}</span>
                  <span class="project-year-badge">${escapeHtml(p.year || "2024")}</span>
              </div>
              <div class="project-info">
                  <div class="project-location">
                      <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
                      <span>${escapeHtml(p.location)}</span>
                  </div>
                  <h3>${escapeHtml(p.title)}</h3>
                  <p>${escapeHtml(p.scope)}</p>
                  <div class="project-footer-meta">
                      <span class="project-zone-pill">${escapeHtml(zoneTitle)}</span>
                      <button class="view-case-btn" type="button">
                          Case Specs <span>↗</span>
                      </button>
                  </div>
              </div>
          </article>
        `;
      })
      .join("");

    // Wire up project card clicks to open Project Modal
    projectGrid.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", () => {
        const pId = card.dataset.projectId;
        const project = projects.find((item) => item.id === pId);
        if (project) openProjectModal(project);
      });
    });

    observeReveals();
  }

  // Project Sector Tabs
  document.querySelectorAll("[data-project-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll("[data-project-filter]")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentSectorFilter = btn.dataset.projectFilter;
      renderProjects();
    });
  });

  // Project Zone Dropdown
  if (projectZoneSelect) {
    projectZoneSelect.addEventListener("change", (e) => {
      currentZoneFilter = e.target.value;
      renderProjects();
    });
  }

  // Project Live Search
  if (projectSearchInput) {
    projectSearchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderProjects();
    });
  }

  /* =====================================================
     8. PROJECT CASE STUDY MODAL
     ===================================================== */
  const projectModal = document.getElementById("projectModal");
  const projectModalTitle = document.getElementById("projectModalTitle");
  const projectModalSector = document.getElementById("projectModalSector");
  const projectModalLocation = document.getElementById(
    "projectModalLocation",
  );
  const projectModalScope = document.getElementById("projectModalScope");
  const projectModalDeliverables = document.getElementById(
    "projectModalDeliverables",
  );
  const projectModalClose = document.getElementById("projectModalClose");
  const projectModalCta = document.getElementById("projectModalCta");
  let activeProject = null;

  function openProjectModal(p) {
    activeProject = p;
    projectModalTitle.textContent = p.title;
    projectModalSector.textContent =
      sectorBadgeNames[p.sector] || p.sector;
    projectModalLocation.textContent = `${p.location} (${zoneNames[p.zone] || p.zone}) • Completed ${p.year || "2024"}`;
    projectModalScope.textContent = p.scope;

    const items = p.deliverables || [
      "Rigorous technical quality inspection and milestone documentation",
      "Full adherence to client specifications and regulatory standards",
      "Disciplined resource mobilization and on-time project completion",
    ];

    projectModalDeliverables.innerHTML = items
      .map(
        (point) => `
          <div class="modal-scope-point">
              <span class="check-icon">✓</span>
              <span>${escapeHtml(point)}</span>
          </div>
        `,
      )
      .join("");

    projectModal.classList.add("open");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    projectModalClose.focus();
  }

  function closeProjectModal() {
    projectModal.classList.remove("open");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    activeProject = null;
  }

  if (projectModalClose) {
    projectModalClose.addEventListener("click", closeProjectModal);
  }

  if (projectModalCta) {
    projectModalCta.addEventListener("click", (e) => {
      e.preventDefault();
      const currentProj = activeProject;
      closeProjectModal();

      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const messageInput = document.getElementById("contactMessage");
          if (messageInput && currentProj) {
            messageInput.focus();
            messageInput.value = `Hello Duas Unique Services, I am reviewing your project "${currentProj.title}" in ${currentProj.location}. We have a similar infrastructure project scope to discuss.`;
          }
        }, 600);
      }
    });
  }

  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  // Global Escape Key Listener for all modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeServiceModal();
      closeProjectModal();
      closeMobileNav();
    }
  });

  /* =====================================================
     9. HERO COMMAND SHOWCASE (INTERACTIVE DISCIPLINE SWITCHER)
     ===================================================== */
  const heroDisciplineData = {
    civil: {
      title: "Civil & Highway Infrastructure",
      desc: "Turnkey road construction, storm drainage channels, bridge culverts, and structural earthworks across federal corridors.",
      specs: [
        "Subgrade Stabilization",
        "Asphalt Paving",
        "Hydraulic Drainage",
        "COREN Supervised",
      ],
    },
    energy: {
      title: "Solar & Hybrid Mini-Grids",
      desc: "High-capacity commercial solar PV generation, lithium storage banks (LiFePO4), and 33/11kV injection substation overhauls.",
      specs: [
        "Tier-1 Bifacial PV",
        "LiFePO4 Storage",
        "Substation Servicing",
        "NEMSA Certified",
      ],
    },
    water: {
      title: "Industrial Boreholes & Water Reticulation",
      desc: "Precision hydrogeology, deep motorized aquifer drilling (up to 250m), industrial water treatment, and steel reservoirs.",
      specs: [
        "Resistivity Surveys",
        "Reverse Osmosis",
        "Elevated Tanks",
        "WHO Standards",
      ],
    },
    ict: {
      title: "Fiber Optic & Telecom Networks",
      desc: "Metropolitan fiber optic trenching, server room infrastructure, structured Cat6A cabling, and telecom mast installations.",
      specs: [
        "Underground Fiber",
        "Data Center Racks",
        "Telecom Towers",
        "NCC Compliant",
      ],
    },
  };

  const disciplineTabs = document.querySelectorAll(
    ".discipline-tabs .discipline-tab",
  );
  const disciplineTitle = document.getElementById("disciplineTitle");
  const disciplineDesc = document.getElementById("disciplineDesc");
  const disciplineSpecs = document.getElementById("disciplineSpecs");

  disciplineTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      disciplineTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const key = tab.dataset.discipline;
      const data = heroDisciplineData[key];
      if (data && disciplineTitle && disciplineDesc && disciplineSpecs) {
        disciplineTitle.innerHTML = `<span>⚙</span> ${escapeHtml(data.title)}`;
        disciplineDesc.textContent = data.desc;
        disciplineSpecs.innerHTML = data.specs
          .map((s) => `<span>${escapeHtml(s)}</span>`)
          .join("");
      }
    });
  });

  /* =====================================================
     10. STATS COUNTER ANIMATION
     ===================================================== */
  const statElements = document.querySelectorAll("[data-counter]");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.counter);
        const prefix = el.dataset.counterPrefix || "";
        const suffix = el.dataset.counterSuffix || "";
        const duration = 1400;
        const start = performance.now();

        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(step);
          }
        }

        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );

  statElements.forEach((el) => counterObserver.observe(el));

  /* =====================================================
     11. CONTACT FORM & DUAL DISPATCH (EMAIL & WHATSAPP)
     ===================================================== */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const whatsappSubmitBtn = document.getElementById("whatsappSubmitBtn");

  function validateContactForm() {
    const name = contactForm.elements.name.value.trim();
    const email = contactForm.elements.email.value.trim();
    const phone = contactForm.elements.phone.value.trim();
    const message = contactForm.elements.message.value.trim();

    if (!name || !email || !phone || !message) {
      setFormStatus(
        "Please fill in your full name, email, phone number, and project details.",
        "error",
      );
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setFormStatus("Please provide a valid email address.", "error");
      return false;
    }

    return {
      name,
      email,
      phone,
      service: contactForm.elements.service.value || "General Engineering",
      message,
    };
  }

  function setFormStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = "block";
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = validateContactForm();
      if (!data) return;

      const subject = encodeURIComponent(
        `Duas Unique Services — RFP Project Inquiry [${data.service}]`,
      );
      const body = encodeURIComponent(
        `PROJECT CONSULTATION REQUEST\n` +
          `============================\n` +
          `Full Name: ${data.name}\n` +
          `Email: ${data.email}\n` +
          `Phone: ${data.phone}\n` +
          `Service Area: ${data.service}\n\n` +
          `PROJECT DETAILS & SCOPE:\n` +
          `${data.message}\n\n` +
          `Sent via Duas Unique Services Limited Web Portal (RC 1639974)`,
      );

      window.location.href = `mailto:duasltd07@gmail.com?subject=${subject}&body=${body}`;
      setFormStatus(
        "Your default email application is launching with the pre-formatted RFP enquiry. Thank you!",
        "success",
      );
      showToast("Email client opened with project details.");
    });
  }

  if (whatsappSubmitBtn) {
    whatsappSubmitBtn.addEventListener("click", () => {
      const data = validateContactForm();
      if (!data) return;

      const waText = encodeURIComponent(
        `*PROJECT INQUIRY — DUAS UNIQUE SERVICES LIMITED*\n\n` +
          `*Client Name:* ${data.name}\n` +
          `*Phone:* ${data.phone}\n` +
          `*Email:* ${data.email}\n` +
          `*Service:* ${data.service}\n\n` +
          `*Project Scope:*\n${data.message}`,
      );

      const waUrl = `https://wa.me/2348069622685?text=${waText}`;
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setFormStatus(
        "Opening WhatsApp chat with your project consultation message ready to send.",
        "success",
      );
      showToast("WhatsApp inquiry prepared.");
    });
  }

  /* =====================================================
     12. TOAST NOTIFICATION UTILITY
     ===================================================== */
  let toastTimer = null;
  function showToast(msg) {
    if (!toastNotice) return;
    clearTimeout(toastTimer);
    toastNotice.textContent = msg;
    toastNotice.classList.add("show");
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove("show");
    }, 2800);
  }

  /* =====================================================
     13. SCROLL REVEAL OBSERVER
     ===================================================== */
  function observeReveals() {
    const revealEls = document.querySelectorAll(".reveal:not(.is-visible)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* =====================================================
     14. STRING SANITIZATION HELPERS
     ===================================================== */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttr(str) {
    return escapeHtml(str);
  }

  /* =====================================================
     15. INITIALIZATION CALLS
     ===================================================== */
  populateContactServiceOptions();
  renderServices();
  renderProjects();
  observeReveals();

  // Dynamic Copyright Year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
