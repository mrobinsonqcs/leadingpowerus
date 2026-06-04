// ═══════════════════ PRODUCT NAVIGATION DATA ═══════════════════

export const CATEGORY_META = {
  diesel: {
    title: "Diesel Generators",
    label: "Diesel Power",
    desc: "Our complete line of diesel generators — from compact 3kW residential units to multi-megawatt containerized power plants. Factory-direct, US-spec 60Hz configurations available.",
    breadcrumb: [{ label: "Products", to: "products" }, { label: "Diesel Generators" }],
  },
  "natural-gas": {
    title: "Natural Gas Generators",
    label: "Natural Gas Power",
    desc: "Clean-burning natural gas generators for commercial, industrial, and utility-scale applications. Ideal for sites with existing gas supply or Permian Basin wellhead and flare gas recovery.",
    breadcrumb: [{ label: "Products", to: "products" }, { label: "Natural Gas Generators" }],
  },
};

export const SUBCATEGORIES = {
  diesel: [
    {
      id: "silent",
      title: "Silent Type",
      range: "3kW – 3MW",
      desc: "Sound-attenuated canopy enclosures for noise-sensitive sites. IP23 weatherproof — suitable for outdoor installation.",
      pageId: "products-diesel-silent",
    },
    {
      id: "open-frame",
      title: "Open Frame",
      range: "20kW – 500kW",
      desc: "Open frame generators for indoor machine rooms and covered enclosures. Lower upfront cost with easy maintenance access.",
      pageId: "products-diesel-open-frame",
    },
    {
      id: "mobile-trailer",
      title: "Mobile & Trailer",
      range: "10kW – 150kW",
      desc: "Trailer-mounted and portable units for field deployment, job sites, and events. Single-axle, tandem-axle, and 4-wheel cart options.",
      pageId: "products-diesel-mobile-trailer",
    },
    {
      id: "container",
      title: "Container Type",
      range: "500kW – 3MW",
      desc: "ISO containerized power plants for large-scale and remote industrial installations. Easy to transport and relocate.",
      pageId: "products-diesel-container",
    },
  ],
  "natural-gas": [
    {
      id: "ng-small-commercial",
      title: "Small Commercial",
      range: "20kW – 100kW",
      desc: "Compact gas generators for small commercial sites. Clean-burning with minimal maintenance where a gas line is already available.",
      pageId: "range-ng-small-commercial",
    },
    {
      id: "ng-commercial-industrial",
      title: "Commercial & Industrial",
      range: "100kW – 500kW",
      desc: "Mid-range natural gas for commercial campuses, hotels, and Permian Basin wellhead gas recovery.",
      pageId: "range-ng-commercial-industrial",
    },
    {
      id: "ng-industrial-power",
      title: "Industrial & Power Generation",
      range: "500kW – 2MW",
      desc: "Large gas generators for co-generation, data centers, and heavy industrial applications.",
      pageId: "range-ng-industrial-power",
    },
    {
      id: "ng-utility",
      title: "Utility Scale",
      range: "2MW – 10MW+",
      desc: "Utility-scale natural gas generation for pipeline compressor stations and large processing facilities.",
      pageId: "range-ng-utility",
    },
  ],
};

export const DIESEL_RANGES_BY_SUBCAT = {
  silent: [
    { id: "silent-3-30", title: "3kW – 30kW", subtitle: "Residential & Light Commercial" },
    { id: "silent-30-150", title: "30kW – 150kW", subtitle: "Commercial & Industrial" },
    { id: "silent-150-500", title: "150kW – 500kW", subtitle: "Heavy Industrial" },
    { id: "silent-500-3000", title: "500kW – 3MW", subtitle: "Utility & Large Scale" },
  ],
  "open-frame": [
    { id: "open-20-100", title: "20kW – 100kW", subtitle: "" },
    { id: "open-100-500", title: "100kW – 500kW", subtitle: "" },
  ],
  "mobile-trailer": [
    { id: "mobile-10-50", title: "10kW – 50kW", subtitle: "" },
    { id: "mobile-50-150", title: "50kW – 150kW", subtitle: "" },
  ],
  container: [
    { id: "container-500-1000", title: "500kW – 1MW", subtitle: "" },
    { id: "container-1000-3000", title: "1MW – 3MW", subtitle: "" },
  ],
};

export const DIESEL_SUBCAT_NAMES = {
  silent: "Silent Type",
  "open-frame": "Open Frame",
  "mobile-trailer": "Mobile & Trailer",
  container: "Container Type",
};

export const RANGES = {
  "silent-3-30": {
    id: "silent-3-30",
    fuelType: "diesel",
    subCat: "silent",
    title: "3kW – 30kW Silent Diesel",
    subtitle: "Residential & Light Commercial",
    desc: "Compact silent diesel generators for homeowners, small businesses, and telecom sites. Whisper-quiet canopy enclosures keep sound levels below 65 dB(A) at 7m — suitable for residential zones and noise-sensitive deployments.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Diesel Generators", to: "products-diesel" },
      { label: "Silent Type", to: "products-diesel-silent" },
      { label: "3kW – 30kW" },
    ],
    photos: [
      { folder: "silent-3-30kw", files: ["silent-3-30kw-1.webp", "silent-3-30kw-2.webp", "silent-3-30kw-3.webp", "silent-3-30kw-4.webp", "silent-3-30kw-5.webp", "silent-3-30kw-6.webp", "silent-3-30kw-collage.webp"] },
    ],
    useCases: [
      { title: "Homeowners", desc: "Whole-home backup power during outages" },
      { title: "Small Retail & Restaurants", desc: "Keep refrigeration and POS systems running" },
      { title: "Telecom Towers", desc: "Remote site power for cell and data equipment" },
      { title: "Small Agricultural", desc: "Irrigation pumps, barns, and remote outbuildings" },
    ],
    powerOptions: ["3kW", "5kW", "8kW", "10kW", "12kW", "15kW", "18kW", "20kW", "25kW", "30kW"],
    related: ["silent-30-150", "mobile-10-50", "ng-small-commercial"],
  },

  "silent-30-150": {
    id: "silent-30-150",
    fuelType: "diesel",
    subCat: "silent",
    title: "30kW – 150kW Silent Diesel",
    subtitle: "Commercial & Industrial",
    desc: "Mid-range silent diesel generators for commercial backup, construction sites, and light-to-medium industrial applications. Available with Perkins, Cummins, and SIDA engines in US-spec 60Hz configurations.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Diesel Generators", to: "products-diesel" },
      { label: "Silent Type", to: "products-diesel-silent" },
      { label: "30kW – 150kW" },
    ],
    photos: [
      { folder: "silent-30-150kw", files: ["silent-30-150kw-1.webp", "silent-30-150kw-2.webp", "silent-30-150kw-3.webp", "silent-30-150kw-4.webp", "silent-30-150kw-5.webp", "silent-30-150kw-6.webp", "silent-30-150kw-collage.webp"] },
      { folder: "silent-30-150kw-blue", files: ["silent-30-150kw-blue-1.webp", "silent-30-150kw-blue-2.webp", "silent-30-150kw-blue-3.webp", "silent-30-150kw-blue-4.webp", "silent-30-150kw-blue-5.webp", "silent-30-150kw-blue-6.webp", "silent-30-150kw-blue-collage.webp"] },
    ],
    useCases: [
      { title: "Construction Sites", desc: "Reliable power for tools, lighting, and site offices" },
      { title: "Oil Field Support", desc: "Portable and stationary power for drilling and production" },
      { title: "Hotels & Hospitality", desc: "Critical backup for HVAC, lighting, and guest systems" },
      { title: "Commercial Backup", desc: "Offices, strip malls, and mid-size retail" },
      { title: "Agriculture", desc: "Processing, irrigation, and cold-storage operations" },
    ],
    powerOptions: ["30kW", "40kW", "50kW", "60kW", "75kW", "80kW", "100kW", "120kW", "150kW"],
    related: ["silent-3-30", "silent-150-500", "open-20-100"],
  },

  "silent-150-500": {
    id: "silent-150-500",
    fuelType: "diesel",
    subCat: "silent",
    title: "150kW – 500kW Silent Diesel",
    subtitle: "Heavy Industrial",
    desc: "Heavy-duty silent diesel generators for large manufacturing plants, data centers, and critical-care facilities. Ricardo, Cummins, and Doosan engine options with premium double-layer acoustic enclosures.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Diesel Generators", to: "products-diesel" },
      { label: "Silent Type", to: "products-diesel-silent" },
      { label: "150kW – 500kW" },
    ],
    photos: [
      { folder: "silent-150-500kw-tan", files: ["silent-150-500kw-tan-1.webp", "silent-150-500kw-tan-2.webp", "silent-150-500kw-tan-3.webp", "silent-150-500kw-tan-4.webp", "silent-150-500kw-tan-5.webp", "silent-150-500kw-tan-6.webp", "silent-150-500kw-tan-collage.webp"] },
      { folder: "silent-150-500kw-gray", files: ["silent-150-500kw-gray-1.webp", "silent-150-500kw-gray-2.webp", "silent-150-500kw-gray-3.webp", "silent-150-500kw-gray-4.webp", "silent-150-500kw-gray-5.webp", "silent-150-500kw-gray-6.webp", "silent-150-500kw-gray-collage.webp"] },
    ],
    useCases: [
      { title: "Large Manufacturing", desc: "Continuous and standby power for production lines" },
      { title: "Data Centers", desc: "N+1 backup for server farms and colocation facilities" },
      { title: "Hospitals", desc: "Life-safety and critical load protection" },
      { title: "Military Installations", desc: "Base power and mission-critical backup" },
    ],
    powerOptions: ["150kW", "175kW", "200kW", "250kW", "300kW", "350kW", "400kW", "500kW"],
    related: ["silent-30-150", "silent-500-3000", "open-100-500"],
  },

  "silent-500-3000": {
    id: "silent-500-3000",
    fuelType: "diesel",
    subCat: "silent",
    title: "500kW – 3MW Silent Diesel",
    subtitle: "Utility & Large Scale",
    desc: "Utility-scale silent diesel generator sets for large campuses, industrial complexes, and power generation projects. Parallel operation and custom configurations available.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Diesel Generators", to: "products-diesel" },
      { label: "Silent Type", to: "products-diesel-silent" },
      { label: "500kW – 3MW" },
    ],
    photos: [
      { folder: "silent-500kw-3mw", files: ["silent-500kw-3mw-1.webp", "silent-500kw-3mw-2.webp", "silent-500kw-3mw-3.webp", "silent-500kw-3mw-4.webp", "silent-500kw-3mw-5.webp", "silent-500kw-3mw-6.webp", "silent-500kw-3mw-collage.webp"] },
      { folder: "silent-500kw-3mw-blue", files: ["silent-500kw-3mw-blue-1.webp", "silent-500kw-3mw-blue-2.webp", "silent-500kw-3mw-blue-3.webp", "silent-500kw-3mw-blue-4.webp", "silent-500kw-3mw-blue-5.webp", "silent-500kw-3mw-blue-6.webp", "silent-500kw-3mw-blue-collage.webp"] },
    ],
    useCases: [
      { title: "Utilities & Grid Support", desc: "Peaking and emergency power for utility operators" },
      { title: "Large Mining Operations", desc: "Remote site power for extraction and processing" },
      { title: "Oil & Gas Platforms", desc: "Offshore and onshore platform power generation" },
      { title: "Large Campuses", desc: "Universities, hospitals, and industrial parks" },
    ],
    powerOptions: ["500kW", "600kW", "750kW", "1MW", "1.25MW", "1.5MW", "2MW", "2.5MW", "3MW"],
    related: ["silent-150-500", "container-500-1000", "container-1000-3000"],
  },

  "open-20-100": {
    id: "open-20-100",
    fuelType: "diesel",
    subCat: "open-frame",
    title: "20kW – 100kW Open Frame",
    subtitle: "Diesel",
    desc: "Open frame diesel generators for indoor generator rooms and machine enclosures. Lower upfront cost with easy maintenance access — ideal when the installation provides its own noise and weather protection.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Diesel Generators", to: "products-diesel" },
      { label: "Open Frame", to: "products-diesel-open-frame" },
      { label: "20kW – 100kW" },
    ],
    photos: [
      { folder: "open-frame-20-100kw", files: ["open-frame-20-100kw-1.webp", "open-frame-20-100kw-2.webp", "open-frame-20-100kw-3.webp", "open-frame-20-100kw-4.webp", "open-frame-20-100kw-5.webp", "open-frame-20-100kw-6.webp", "open-frame-20-100kw-collage.webp"] },
    ],
    useCases: [
      { title: "Indoor Generator Rooms", desc: "Installations within an existing mechanical enclosure" },
      { title: "Warehouses & Facilities", desc: "Buildings that provide their own weather protection" },
      { title: "Cost-Sensitive Projects", desc: "Budget installations where a canopy isn't required" },
      { title: "Generator Room Upgrades", desc: "Replacing aging sets in existing generator rooms" },
    ],
    powerOptions: ["20kW", "30kW", "40kW", "50kW", "60kW", "75kW", "80kW", "100kW"],
    related: ["open-100-500", "silent-30-150"],
  },

  "open-100-500": {
    id: "open-100-500",
    fuelType: "diesel",
    subCat: "open-frame",
    title: "100kW – 500kW Open Frame",
    subtitle: "Diesel",
    desc: "Heavy-duty open frame diesel generators for large indoor installations and facilities with purpose-built generator enclosures. Cummins, Doosan, and Ricardo engine options.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Diesel Generators", to: "products-diesel" },
      { label: "Open Frame", to: "products-diesel-open-frame" },
      { label: "100kW – 500kW" },
    ],
    photos: [
      { folder: "open-frame-100-500kw", files: ["open-frame-100-500kw-1.webp", "open-frame-100-500kw-2.webp", "open-frame-100-500kw-3.webp", "open-frame-100-500kw-4.webp", "open-frame-100-500kw-5.webp", "open-frame-100-500kw-6.webp", "open-frame-100-500kw-collage.webp"] },
    ],
    useCases: [
      { title: "Large Generator Rooms", desc: "Permanent indoor installation with dedicated enclosure" },
      { title: "Industrial Facilities", desc: "Manufacturing plants with covered install areas" },
      { title: "Data Center Infrastructure", desc: "Raised-floor and machine-room backup systems" },
      { title: "Power Plant Supplemental", desc: "Auxiliary generation for existing power facilities" },
    ],
    powerOptions: ["100kW", "125kW", "150kW", "200kW", "250kW", "300kW", "400kW", "500kW"],
    related: ["open-20-100", "silent-150-500"],
  },

  "mobile-10-50": {
    id: "mobile-10-50",
    fuelType: "diesel",
    subCat: "mobile-trailer",
    title: "10kW – 50kW Mobile & Trailer",
    subtitle: "Diesel",
    desc: "Trailer-mounted and portable diesel generators for job sites, events, and emergency response. Single-axle and 4-wheel cart options with tow-ready hitches.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Diesel Generators", to: "products-diesel" },
      { label: "Mobile & Trailer", to: "products-diesel-mobile-trailer" },
      { label: "10kW – 50kW" },
    ],
    photos: [
      { folder: "mobile-10-50kw", files: ["mobile-10-50kw-1.webp", "mobile-10-50kw-2.webp", "mobile-10-50kw-3.webp", "mobile-10-50kw-4.webp", "mobile-10-50kw-5.webp", "mobile-10-50kw-6.webp", "mobile-10-50kw-collage.webp"] },
    ],
    useCases: [
      { title: "Construction & Job Sites", desc: "Tools, lighting, and site office power" },
      { title: "Outdoor Events", desc: "Festivals, weddings, and temporary installations" },
      { title: "Emergency Deployment", desc: "Rapid response for outages and disasters" },
      { title: "Remote Operations", desc: "Off-grid worksites with no utility power" },
    ],
    powerOptions: ["10kW", "15kW", "20kW", "25kW", "30kW", "40kW", "50kW"],
    related: ["mobile-50-150", "silent-3-30"],
  },

  "mobile-50-150": {
    id: "mobile-50-150",
    fuelType: "diesel",
    subCat: "mobile-trailer",
    title: "50kW – 150kW Mobile & Trailer",
    subtitle: "Diesel",
    desc: "Mid-to-large trailer-mounted diesel generators for demanding field operations. Tandem axle trailers and pintle hitch options for heavy commercial and government deployments.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Diesel Generators", to: "products-diesel" },
      { label: "Mobile & Trailer", to: "products-diesel-mobile-trailer" },
      { label: "50kW – 150kW" },
    ],
    photos: [
      { folder: "mobile-50-150kw", files: ["mobile-50-150kw-1.webp", "mobile-50-150kw-2.webp", "mobile-50-150kw-3.webp", "mobile-50-150kw-4.webp", "mobile-50-150kw-5.webp", "mobile-50-150kw-6.webp", "mobile-50-150kw-collage.webp"] },
    ],
    useCases: [
      { title: "Large Construction Projects", desc: "Cranes, welders, and heavy equipment support" },
      { title: "Oil Field Operations", desc: "Remote drilling and production site power" },
      { title: "Military & Government", desc: "Tactical and base camp power generation" },
      { title: "Disaster Relief", desc: "Hurricane, flood, and emergency response" },
    ],
    powerOptions: ["50kW", "60kW", "75kW", "100kW", "125kW", "150kW"],
    related: ["mobile-10-50", "silent-30-150"],
  },

  "container-500-1000": {
    id: "container-500-1000",
    fuelType: "diesel",
    subCat: "container",
    title: "500kW – 1MW Container Type",
    subtitle: "Diesel",
    desc: "Fully containerized diesel power plants in ISO container form factor. Easy to transport, install, and relocate — ideal for mining, oil & gas, and remote industrial projects.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Diesel Generators", to: "products-diesel" },
      { label: "Container Type", to: "products-diesel-container" },
      { label: "500kW – 1MW" },
    ],
    photos: [
      { folder: "container-500kw-1mw", files: ["container-500kw-1mw-1.webp", "container-500kw-1mw-2.webp", "container-500kw-1mw-3.webp", "container-500kw-1mw-4.webp", "container-500kw-1mw-5.webp", "container-500kw-1mw-6.webp", "container-500kw-1mw-7.webp", "container-500kw-1mw-collage.webp"] },
    ],
    useCases: [
      { title: "Mining Operations", desc: "Remote mine site power generation" },
      { title: "Oil & Gas Sites", desc: "Extraction site and pipeline power" },
      { title: "Grid Support", desc: "Utility peaking and emergency backup" },
      { title: "Remote Industrial", desc: "Off-grid processing and manufacturing" },
    ],
    powerOptions: ["500kW", "600kW", "750kW", "800kW", "1MW"],
    related: ["container-1000-3000", "silent-500-3000"],
  },

  "container-1000-3000": {
    id: "container-1000-3000",
    fuelType: "diesel",
    subCat: "container",
    title: "1MW – 3MW Container Type",
    subtitle: "Diesel",
    desc: "Multi-megawatt containerized diesel power plants for the largest industrial and utility applications. Multi-unit parallel configurations with integrated switchgear available.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Diesel Generators", to: "products-diesel" },
      { label: "Container Type", to: "products-diesel-container" },
      { label: "1MW – 3MW" },
    ],
    photos: [
      { folder: "container-1mw-3mw", files: ["container-1mw-3mw-1.webp", "container-1mw-3mw-2.webp", "container-1mw-3mw-3.webp", "container-1mw-3mw-4.webp", "container-1mw-3mw-5.webp", "container-1mw-3mw-6.webp", "container-1mw-3mw-collage.webp"] },
    ],
    useCases: [
      { title: "Utility Operators", desc: "Grid peak shaving and emergency generation" },
      { title: "Large Mining", desc: "High-demand mine and mineral processing power" },
      { title: "Oil & Gas Platforms", desc: "Platform and processing facility generation" },
      { title: "Industrial Campuses", desc: "Self-sufficient large-scale manufacturing" },
    ],
    powerOptions: ["1MW", "1.25MW", "1.5MW", "2MW", "2.5MW", "3MW"],
    related: ["container-500-1000", "silent-500-3000"],
  },

  "ng-small-commercial": {
    id: "ng-small-commercial",
    fuelType: "natural-gas",
    title: "20kW – 100kW Natural Gas",
    subtitle: "Small Commercial",
    desc: "Compact natural gas generators for small commercial sites. Clean-burning and low-maintenance — ideal wherever a natural gas supply line is already available.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Natural Gas Generators", to: "products-natural-gas" },
      { label: "Small Commercial (20kW – 100kW)" },
    ],
    photos: [
      { folder: "natgas-20-100kw", files: ["natgas-20-100kw-1.webp", "natgas-20-100kw-2.webp", "natgas-20-100kw-3.webp", "natgas-20-100kw-4.webp", "natgas-20-100kw-5.webp", "natgas-20-100kw-6.webp", "natgas-20-100kw-collage.webp"] },
    ],
    useCases: [
      { title: "Small Commercial Buildings", desc: "Offices, clinics, and professional services" },
      { title: "Restaurants & Food Service", desc: "Protect refrigeration, prep, and service systems" },
      { title: "Cell Towers & Telecom", desc: "Lower operating cost than diesel at gas-connected sites" },
      { title: "Gas-Connected Sites", desc: "Anywhere natural gas eliminates diesel fuel logistics" },
    ],
    powerOptions: ["20kW", "30kW", "40kW", "50kW", "75kW", "100kW"],
    related: ["ng-commercial-industrial", "silent-3-30", "silent-30-150"],
  },

  "ng-commercial-industrial": {
    id: "ng-commercial-industrial",
    fuelType: "natural-gas",
    title: "100kW – 500kW Natural Gas",
    subtitle: "Commercial & Industrial",
    desc: "Mid-range natural gas generators for commercial campuses and Permian Basin wellhead gas applications. Cost-effective alternative to diesel with lower emissions and fuel costs.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Natural Gas Generators", to: "products-natural-gas" },
      { label: "Commercial & Industrial (100kW – 500kW)" },
    ],
    photos: [
      { folder: "natgas-100-500kw", files: ["natgas-100-500kw-1.webp", "natgas-100-500kw-2.webp", "natgas-100-500kw-3.webp", "natgas-100-500kw-4.webp", "natgas-100-500kw-5.webp", "natgas-100-500kw-6.webp", "natgas-100-500kw-7.webp", "natgas-100-500kw-collage.webp"] },
    ],
    useCases: [
      { title: "Office Campuses", desc: "Commercial park and multi-tenant standby backup" },
      { title: "Hotels & Resorts", desc: "Continuous and emergency power for full properties" },
      { title: "Wellhead Gas Utilization", desc: "Permian Basin associated gas monetization" },
      { title: "Flare Gas Reduction", desc: "Convert flared gas to on-site power generation" },
    ],
    powerOptions: ["100kW", "125kW", "150kW", "200kW", "250kW", "300kW", "400kW", "500kW"],
    related: ["ng-small-commercial", "ng-industrial-power"],
  },

  "ng-industrial-power": {
    id: "ng-industrial-power",
    fuelType: "natural-gas",
    title: "500kW – 2MW Natural Gas",
    subtitle: "Industrial & Power Generation",
    desc: "Large natural gas generators for industrial co-generation and critical facilities. High thermal efficiency with optional heat recovery for combined heat and power (CHP) configurations.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Natural Gas Generators", to: "products-natural-gas" },
      { label: "Industrial & Power Generation (500kW – 2MW)" },
    ],
    photos: [
      { folder: "natgas-500kw-2mw", files: ["natgas-500kw-2mw-1.webp", "natgas-500kw-2mw-2.webp", "natgas-500kw-2mw-3.webp", "natgas-500kw-2mw-4.webp", "natgas-500kw-2mw-5.webp", "natgas-500kw-2mw-6.webp", "natgas-500kw-2mw-collage.webp"] },
    ],
    useCases: [
      { title: "Large Industrial Facilities", desc: "Continuous power for heavy production operations" },
      { title: "Co-Generation (CHP)", desc: "Combined heat and power for maximum efficiency" },
      { title: "Data Centers", desc: "Large-scale backup with a lower carbon footprint" },
      { title: "Large Commercial Complexes", desc: "Shopping centers, convention centers, hospitals" },
    ],
    powerOptions: ["500kW", "750kW", "1MW", "1.25MW", "1.5MW", "2MW"],
    related: ["ng-commercial-industrial", "ng-utility"],
  },

  "ng-utility": {
    id: "ng-utility",
    fuelType: "natural-gas",
    title: "2MW – 10MW+ Natural Gas",
    subtitle: "Utility Scale",
    desc: "Utility-scale natural gas power generation for pipeline compressor stations, large processing facilities, and distributed generation projects. Multi-unit configurations available.",
    breadcrumb: [
      { label: "Products", to: "products" },
      { label: "Natural Gas Generators", to: "products-natural-gas" },
      { label: "Utility Scale (2MW – 10MW+)" },
    ],
    photos: [
      { folder: "natgas-2mw-10mw", files: ["natgas-2mw-10mw-1.webp", "natgas-2mw-10mw-2.webp", "natgas-2mw-10mw-3.webp", "natgas-2mw-10mw-4.webp", "natgas-2mw-10mw-5.webp", "natgas-2mw-10mw-6.webp", "natgas-2mw-10mw-collage.webp"] },
    ],
    useCases: [
      { title: "Pipeline Compressor Stations", desc: "Reliable drive power for gas transmission compressors" },
      { title: "Gas Processing Facilities", desc: "Self-generation for large processing plants" },
      { title: "Distributed Generation", desc: "Wholesale power supply and grid support projects" },
      { title: "Industrial Park Power", desc: "Central power plant for large industrial complexes" },
    ],
    powerOptions: ["2MW", "3MW", "4MW", "5MW", "6MW", "8MW", "10MW+"],
    related: ["ng-industrial-power", "container-1000-3000"],
  },
};
