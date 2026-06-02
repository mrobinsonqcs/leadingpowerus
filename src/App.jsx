import { useState, useEffect, useRef, createContext, useContext } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { RANGES, SUBCATEGORIES, DIESEL_RANGES_BY_SUBCAT, DIESEL_SUBCAT_NAMES, CATEGORY_META } from "./productData";

// ═══════════════════ THEME ═══════════════════
const ACCENT = "#C8252E";        // Red from logo
const ACCENT_DARK = "#A01B23";   // Darker red for hover states
const ACCENT_LIGHT = "#FCE5E7";  // Light red tint
const DARK = "#1B2A4F";          // Navy blue from logo
const DARK2 = "#243561";         // Slightly lighter navy
const DARK3 = "#2D4072";         // Lighter navy for borders/cards
const LIGHT = "#F7F5F0";         // Cream background
const LIGHT2 = "#EFECE3";        // Slightly darker cream
const MID = "#B8C0D0";           // Muted blue-gray for nav text
const TEXT_DARK = "#1B2A4F";     // Navy for body text on light bg
const TEXT_MUTED = "#5A6478";    // Muted text on light bg
const WHITE = "#FFFFFF";
const BORDER = "#E5E2DB";

// ═══════════════════ ROUTER ═══════════════════
const RouterCtx = createContext();
const useRouter = () => useContext(RouterCtx);

function Router({ children }) {
  const [page, setPage] = useState("home");
  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "instant" }); };
  return <RouterCtx.Provider value={{ page, navigate }}>{children}</RouterCtx.Provider>;
}

// ═══════════════════ ANIMATION HOOKS ═══════════════════
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useIsMobile(breakpoint = 820) {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < breakpoint);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`, ...style }}>{children}</div>;
}

function Link({ to, children, style = {}, ...props }) {
  const { navigate } = useRouter();
  return <a href="#" onClick={e => { e.preventDefault(); navigate(to); }} style={{ textDecoration: "none", ...style }} {...props}>{children}</a>;
}

// ═══════════════════ DATA ═══════════════════
const CATEGORIES = [
  { id: "silent", title: "Silent Type", range: "15 – 1000 kVA" },
  { id: "open", title: "Open Type", range: "70 – 1000 kVA" },
  { id: "mobile", title: "Mobile Type", range: "3 – 125 kVA" },
  { id: "container", title: "Container Type", range: "1000 – 2500 kVA" },
];

const PRODUCTS = [
  {
    id: "silent-12-20",
    category: "silent",
    title: "12kW – 20kW Silent Diesel Generator Set",
    range: "15 – 25 kVA",
    desc: "Standby 12kW, 15kW, 18kW, 20kW silent type diesel generator sets.",
    hasPhotos: false,
  },
  {
    id: "silent-rollers",
    category: "silent",
    title: "Portable Silent Diesel Generator on Rollers",
    range: "Configurable",
    desc: "White silent enclosure with heavy-duty industrial caster wheels for in-facility positioning. Available in multiple kW configurations to fit your specific application.",
    hasPhotos: true,
    folder: "silent-rollers",
    photos: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    specs: [
      ["Format", "Silent enclosure on industrial casters"],
      ["Power range", "Configurable to customer requirements"],
      ["Voltage", "Configurable (60Hz US-spec available)"],
      ["Mobility", "Heavy-duty locking caster wheels"],
      ["Enclosure color", "White (custom colors available)"],
      ["Application", "Indoor positioning, factory floor, warehouse"],
      ["Sound rating", "Silent canopy with acoustic insulation"],
      ["Lift access", "Forklift pockets in base frame"],
      ["Certifications", "CE, ISO 9001"],
      ["Customization", "Color, branding, fuel tank size, kW rating"],
    ],
    keyComponents: [
      { title: "Industrial caster wheels", desc: "Heavy-duty locking casters allow positioning anywhere in your facility without crane or forklift lifting." },
      { title: "Silent enclosure", desc: "Sound-attenuating canopy with acoustic foam insulation for quiet indoor operation." },
      { title: "Configurable kW rating", desc: "We can spec the unit at the exact power level you need — from small commercial to mid-range industrial." },
      { title: "Locking access doors", desc: "Multi-point latching doors provide secure access to engine, alternator, and control panel." },
      { title: "Custom color options", desc: "Standard white finish or specify any color to match your fleet branding." },
      { title: "Forklift pockets", desc: "Integrated forklift channels in the steel base frame for safe lifting and transport." },
    ],
  },
  {
    id: "sida-20kw",
    category: "silent",
    title: "20kW SIDA Silent Diesel Generator",
    range: "20 kW / 25 kVA",
    desc: "20kW silent diesel generator powered by a SIDA (Shanghai Diesel) engine. Compact silent enclosure with full instrumentation panel — ideal for small commercial backup, telecom sites, and light industrial applications.",
    hasPhotos: true,
    folder: "sida-20kw",
    photos: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
    specs: [
      ["Model", "LDGP-20"],
      ["Rated power", "20 kW"],
      ["Voltage", "60Hz US-spec / 50Hz options available"],
      ["Engine", "SIDA (Shanghai Diesel) 4-cylinder inline"],
      ["Control panel", "Manual gauge panel with Genset Controller"],
      ["Instrumentation", "Amp meter, voltage/frequency display, water temp & oil pressure gauges"],
      ["Safety", "Emergency stop button, low oil warning"],
      ["Enclosure", "Compact silent canopy"],
      ["Color", "Standard cream/white (custom available)"],
      ["Certifications", "ISO 9001 certified"],
      ["Application", "Small commercial backup, telecom, light industrial"],
    ],
    keyComponents: [
      { title: "SIDA engine", desc: "Shanghai Diesel 4-cylinder inline diesel engine, proven workhorse design with excellent reliability." },
      { title: "Full instrumentation", desc: "Manual gauge panel with amp meter, voltage/frequency display, water temperature, and oil pressure gauges." },
      { title: "Emergency stop", desc: "Red mushroom emergency stop button for instant shutdown in case of fault or emergency." },
      { title: "Genset Controller", desc: "Integrated genset controller with low oil warning and protective auto-shutdown." },
      { title: "Compact silent canopy", desc: "Smaller footprint silent enclosure ideal for tight installations and indoor placement." },
      { title: "Service access", desc: "Multi-door enclosure design provides easy access for maintenance and inspection." },
    ],
  },
  {
    id: "perkins-24kw",
    category: "silent",
    title: "24kW Perkins Silent Diesel Generator | LDGP-30",
    range: "30 kVA",
    desc: "Single-phase Perkins 404D-22T engine paired with Leroy-Somer alternator. 60Hz, 110V, EPA Tier 4 certified for U.S. emergency standby use.",
    hasPhotos: true,
    folder: "perkins-24kw",
    photos: ["1.jpg", "2.jpg", "3a.jpg", "3b.jpg", "3c.jpg", "4a.jpg", "4b.jpg", "4c.jpg", "5a.jpg", "5b.jpg", "5c.jpg", "6a.jpg", "6b.jpg", "6c.jpg"],
    specs: [
      ["Model", "LDGP-30"],
      ["Rated power", "22 kW / 22 kVA"],
      ["Standby power", "24 kW / 24 kVA"],
      ["Voltage", "110V"],
      ["Phase", "1 Phase"],
      ["Frequency", "60 Hz"],
      ["Amps", "200 A"],
      ["Power factor", "1.0"],
      ["RPM", "1800 r/min"],
      ["Engine", "Perkins 404D-22T"],
      ["Alternator", "Nidec Leroy-Somer TAL-A42-B-SJ"],
      ["Weight", "1170 kg"],
      ["Dimensions", "2150 × 920 × 1640 mm"],
      ["Emissions", "EPA Tier 4 certified"],
      ["Application", "Stationary emergency standby use"],
    ],
    keyComponents: [
      { title: "Perkins engine", desc: "404D-22T turbocharged diesel — built in the UK by Perkins Engines, EPA-certified for U.S. emergency stationary use." },
      { title: "Leroy-Somer alternator", desc: "Nidec Leroy-Somer TAL-A42-B-SJ brushless alternator, IP23 rated, made in France." },
      { title: "DSE control panel", desc: "Deep Sea Electronics controller with auto-start, monitoring display, and emergency stop." },
      { title: "Genuine Perkins filtration", desc: "Perkins Powerpart air, fuel, and oil filters for OEM-grade reliability." },
      { title: "VARTA starting battery", desc: "Industrial-grade VARTA 6-QW-60(500)-L starting battery." },
      { title: "Sound-attenuated enclosure", desc: "Double-layer steel canopy with acoustic insulation and weatherproof IP23 rating." },
    ],
  },
  {
    id: "silent-25-50",
    category: "silent",
    title: "25kW – 50kW Silent Diesel Generator Set",
    range: "30 – 62.5 kVA",
    desc: "Intelligent 25kW, 30kW, 40kW, 50kW silent type diesel generator sets for commercial and light industrial applications.",
    hasPhotos: false,
  },
  {
    id: "ricardo-75kw",
    category: "silent",
    title: "75kW Silent Diesel Generator | LDGP-75",
    range: "75 kW / 100 kVA",
    desc: "75kW silent diesel generator built around a Ricardo YM4110BZL engine. Heavy-duty silent enclosure with acoustic dampening for industrial and commercial use.",
    hasPhotos: true,
    folder: "ricardo-75kw",
    photos: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5a.jpg", "5b.jpg", "5c.jpg", "6.jpg"],
    specs: [
      ["Model", "LDGP-75"],
      ["Rated power", "75 kW"],
      ["Voltage", "380V (50Hz config) / 480V (60Hz config available)"],
      ["Phase", "3 Phase"],
      ["Frequency", "50 Hz / 60 Hz options"],
      ["Amps", "142 A"],
      ["Power factor", "0.8"],
      ["RPM", "1500 / 1800 r/min"],
      ["Engine", "Ricardo YM4110BZL"],
      ["Engine rated power", "80 kW"],
      ["Net weight", "1410 kg"],
      ["Certifications", "CE, ISO 9001"],
      ["Enclosure", "Silent canopy with acoustic foam"],
      ["Application", "Industrial standby, commercial backup"],
    ],
    keyComponents: [
      { title: "Ricardo engine", desc: "Ricardo YM4110BZL diesel engine rated at 80kW @ 1500 RPM, built for heavy-duty continuous and standby operation." },
      { title: "Silent canopy", desc: "Sound-attenuating enclosure with internal acoustic foam, ventilation grilles, and weatherproof construction." },
      { title: "CE / ISO 9001 certified", desc: "Internationally certified for quality and safety standards." },
      { title: "Integrated exhaust system", desc: "Internal residential-grade muffler and exhaust ducting for low-noise operation." },
      { title: "Lift points & forklift access", desc: "Engineered for crane lifting and forklift positioning at install sites." },
      { title: "60Hz US configuration available", desc: "Standard 50Hz European spec; 60Hz / 480V US configurations available on request." },
    ],
  },
  {
    id: "silent-100-800",
    category: "silent",
    title: "100kW – 800kW Silent Diesel Generator Set",
    range: "125 – 1000 kVA",
    desc: "Large-scale silent type diesel generator sets for industrial backup, data centers, and utility applications.",
    hasPhotos: false,
  },
  {
    id: "mobile-3-12",
    category: "mobile",
    title: "3kW – 12kW Mobile Type Diesel Generator Set",
    range: "3 – 12 kVA",
    desc: "Single-phase portable diesel generators for residential backup, small businesses, and remote sites.",
    hasPhotos: false,
  },
  {
    id: "trailer-20-100kw",
    category: "mobile",
    title: "20kW – 100kW Trailer-Mounted Silent Diesel Generator",
    range: "25 – 125 kVA",
    desc: "Trailer-mounted silent diesel generators covering the full 20kW to 100kW range. Configurable trailer styles (single axle, tandem axle, 4-wheel cart) and color options to match your fleet. Built for job sites, events, and emergency deployment.",
    hasPhotos: true,
    folder: "trailer-20-100kw",
    photos: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
    specs: [
      ["Power range", "20 kW – 100 kW (25 – 125 kVA)"],
      ["Frequency", "60Hz US-spec available (50Hz also available)"],
      ["Voltage", "Configurable single or three-phase"],
      ["Trailer options", "Single axle, tandem axle, 4-wheel cart"],
      ["Hitch", "Tongue hitch, pintle hitch options"],
      ["Stabilizers", "Manual screw-down stabilizer jacks"],
      ["Color options", "Olive green, teal, custom colors available"],
      ["Enclosure", "Silent canopy with acoustic insulation"],
      ["Lighting", "Reflective markings, optional DOT lighting kit"],
      ["Speed rating", "Yard tow standard; DOT highway-rated trailers available on request"],
      ["Certifications", "CE, ISO 9001"],
      ["Application", "Construction, events, emergency deployment, remote sites"],
    ],
    keyComponents: [
      { title: "Multiple trailer configurations", desc: "Choose from single-axle, tandem-axle, or 4-wheel cart trailers depending on your kW size and tow vehicle." },
      { title: "Stabilizer jacks", desc: "Manual screw-down stabilizer jacks at all four corners for stable level operation on uneven ground." },
      { title: "Color customization", desc: "Standard olive green or teal finishes, plus full custom color options to match your fleet branding." },
      { title: "Silent enclosure", desc: "Sound-attenuating canopy with acoustic foam insulation — quiet enough for noise-sensitive deployments." },
      { title: "Tongue & pintle hitch options", desc: "Standard 2\" ball tongue hitch, with pintle hitch available for heavier units and commercial fleets." },
      { title: "Configurable kW range", desc: "Same trailer platform houses engines from 20kW up to 100kW — pick the power output that fits your application." },
    ],
  },
  {
    id: "open-50-800",
    category: "open",
    title: "50kW – 800kW Open Type Diesel Generator Set",
    range: "70 – 1000 kVA",
    desc: "Heavy-duty open frame diesel generators for indoor installations and industrial applications.",
    hasPhotos: false,
  },
  {
    id: "container-800-2000",
    category: "container",
    title: "800kW – 2000kW Container Type Diesel Generator Set",
    range: "1000 – 2500 kVA",
    desc: "Containerized power plants for large-scale operations, mining, utilities, and industrial sites.",
    hasPhotos: false,
  },
];

const STATS = [
  { num: "16+", label: "Years manufacturing experience" },
  { num: "10K+", label: "Units produced annually" },
  { num: "30+", label: "Countries served worldwide" },
  { num: "24/7", label: "US-based support" },
];

const CERTS = ["CE", "ISO 9001", "RoHS", "TUV Rheinland"];

// ═══════════════════ NAV ═══════════════════
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { page, navigate } = useRouter();
  const isMobile = useIsMobile();
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [page]);
  const navLink = (label, to) => (
    <a href="#" onClick={e => { e.preventDefault(); navigate(to); }} style={{ color: MID, textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}
      onMouseEnter={e => e.target.style.color = WHITE} onMouseLeave={e => e.target.style.color = MID}
    >{label}</a>
  );
  const mobileLink = (label, to) => (
    <a href="#" onClick={e => { e.preventDefault(); navigate(to); }} style={{ display: "block", color: WHITE, textDecoration: "none", fontSize: 17, fontWeight: 600, padding: "14px 0", borderBottom: `1px solid ${DARK3}` }}>{label}</a>
  );
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled || page !== "home" || menuOpen ? "rgba(27,42,79,0.97)" : "transparent", backdropFilter: scrolled || page !== "home" || menuOpen ? "blur(12px)" : "none", transition: "background 0.4s", borderBottom: scrolled || page !== "home" ? `1px solid ${DARK3}` : "1px solid transparent" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <a href="#" onClick={e => { e.preventDefault(); navigate("home"); }} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="/logos/horizontal.png" alt="Leading Power USA" style={{ height: isMobile ? 36 : 44, width: "auto", display: "block" }} />
        </a>
        {isMobile ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="tel:4322350801" style={{ background: ACCENT, color: WHITE, padding: "9px 16px", borderRadius: 6, fontWeight: 700, fontSize: 12, textDecoration: "none", letterSpacing: "0.02em" }}>Call</a>
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" style={{ background: "transparent", border: `1px solid ${DARK3}`, borderRadius: 6, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }}>
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2.5" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
              )}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {navLink("Home", "home")}
            {navLink("Products", "products")}
            {navLink("About", "about")}
            {navLink("Contact", "contact")}
            <a href="tel:4322350801" style={{ background: ACCENT, color: WHITE, padding: "10px 20px", borderRadius: 6, fontWeight: 700, fontSize: 13, textDecoration: "none", letterSpacing: "0.02em", transition: "transform 0.2s" }}
              onMouseEnter={e => e.target.style.transform = "scale(1.03)"} onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >Call now</a>
          </div>
        )}
      </div>
      {isMobile && menuOpen && (
        <div style={{ padding: "8px 20px 24px", borderTop: `1px solid ${DARK3}` }}>
          {mobileLink("Home", "home")}
          {mobileLink("Products", "products")}
          {mobileLink("About", "about")}
          {mobileLink("Contact", "contact")}
        </div>
      )}
    </nav>
  );
}

// ═══════════════════ FOOTER ═══════════════════
function Footer() {
  const { navigate } = useRouter();
  const fLink = (label, to) => (
    <a href="#" onClick={e => { e.preventDefault(); navigate(to); }} style={{ display: "block", fontSize: 13, color: MID, textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
      onMouseEnter={e => e.target.style.color = WHITE} onMouseLeave={e => e.target.style.color = MID}
    >{label}</a>
  );
  return (
    <footer style={{ background: DARK, borderTop: `1px solid ${DARK3}`, padding: "48px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40 }}>
          <div>
            <a href="#" onClick={e => { e.preventDefault(); navigate("home"); }} style={{ display: "inline-block", marginBottom: 16, textDecoration: "none" }}>
              <img src="/logos/horizontal.png" alt="Leading Power USA" style={{ height: 42, width: "auto", display: "block" }} />
            </a>
            <p style={{ fontSize: 13, color: MID, maxWidth: 300, lineHeight: 1.6 }}>Diesel generator sales, service, and support for the continental US.</p>
          </div>
          <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Quick Links</div>
              {fLink("Home", "home")}
              {fLink("Products", "products")}
              {fLink("About Us", "about")}
              {fLink("Contact Us", "contact")}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Categories</div>
              {CATEGORIES.map(c => fLink(c.title, "products"))}
              {fLink("Natural Gas Generators", "products-natural-gas")}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Contact</div>
              <div style={{ fontSize: 13, color: MID, lineHeight: 1.8 }}>
                (432) 235-0801<br />
                mrobinson@leadingpowerus.com<br />
                Houston, TX
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${DARK3}`, marginTop: 40, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#5A5850" }}>© {new Date().getFullYear()} Leading Power USA. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "#5A5850" }}>A division of Ningde Leading Power Co., Ltd.</span>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════ PAGE HEADER (interior pages) ═══════════════════
function PageHeader({ label, title, subtitle, breadcrumbs }) {
  const { navigate } = useRouter();
  const isMobile = useIsMobile();
  return (
    <section style={{ background: `linear-gradient(160deg, ${DARK} 0%, ${DARK2} 100%)`, padding: isMobile ? "92px 20px 40px" : "120px 24px 56px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse 60% 50% at 80% 30%, rgba(200,37,46,0.06) 0%, transparent 70%)` }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn>
          {breadcrumbs && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 13, color: MID }}>
              {breadcrumbs.map((b, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {b.to ? <a href="#" onClick={e => { e.preventDefault(); navigate(b.to); }} style={{ color: MID, textDecoration: "none" }}>{b.label}</a> : <span style={{ color: WHITE }}>{b.label}</span>}
                  {i < breadcrumbs.length - 1 && <span style={{ color: DARK3 }}>›</span>}
                </span>
              ))}
            </div>
          )}
          <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: WHITE, margin: "10px 0 0", letterSpacing: "-0.02em", lineHeight: 1.1 }}>{title}</h1>
          {subtitle && <p style={{ fontSize: 17, color: MID, marginTop: 14, maxWidth: 620, lineHeight: 1.6 }}>{subtitle}</p>}
        </FadeIn>
      </div>
    </section>
  );
}

// ═══════════════════ CONTACT FORM ═══════════════════
function ContactForm({ dark = true }) {
  const bg = dark ? DARK3 : WHITE;
  const inputBg = dark ? DARK2 : LIGHT;
  const inputBorder = dark ? "rgba(255,255,255,0.1)" : BORDER;
  const textColor = dark ? WHITE : DARK;
  const labelColor = dark ? MID : TEXT_MUTED;

  const [formspreeState, handleFormspreeSubmit] = useForm("xqejjwgo");

  const [fields, setFields] = useState({ name: "", email: "", phone: "", generatorType: "", message: "" });
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }));

  function validate() {
    const errs = {};
    if (!fields.name.trim()) errs.name = "Full name is required.";
    if (!fields.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!fields.message.trim()) errs.message = "Please tell us about your power needs.";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    handleFormspreeSubmit({ name: fields.name, email: fields.email, phone: fields.phone, generatorType: fields.generatorType, message: fields.message });
  }

  const inputStyle = (field) => ({
    width: "100%", padding: "12px 16px", background: inputBg,
    border: `1px solid ${errors[field] ? ACCENT : inputBorder}`,
    borderRadius: 8, color: textColor, fontSize: 14, outline: "none", boxSizing: "border-box",
  });
  const errStyle = { fontSize: 12, color: ACCENT, marginTop: 4 };

  if (formspreeState.succeeded) {
    return (
      <div style={{ background: bg, borderRadius: 20, padding: "40px 36px", border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : BORDER}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(200,37,46,0.12)", border: `1px solid rgba(200,37,46,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: textColor, margin: "0 0 10px" }}>Request sent!</h3>
        <p style={{ fontSize: 14, color: labelColor, lineHeight: 1.6, margin: 0, maxWidth: 280 }}>Thanks for reaching out. We'll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div style={{ background: bg, borderRadius: 20, padding: "40px 36px", border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : BORDER}` }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: textColor, margin: "0 0 28px" }}>Request a quote</h3>
      <form onSubmit={handleSubmit} noValidate>
        {[
          { label: "Full name", type: "text", key: "name", ph: "Your full name" },
          { label: "Email", type: "email", key: "email", ph: "your@company.com" },
          { label: "Phone", type: "tel", key: "phone", ph: "(000) 000-0000" },
        ].map(f => (
          <div key={f.key} style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: labelColor, marginBottom: 6 }}>{f.label}{f.key !== "phone" && " *"}</label>
            <input type={f.type} placeholder={f.ph} value={fields[f.key]} onChange={set(f.key)} style={inputStyle(f.key)} />
            {errors[f.key] && <div style={errStyle}>{errors[f.key]}</div>}
          </div>
        ))}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: labelColor, marginBottom: 6 }}>Generator type</label>
          <select value={fields.generatorType} onChange={set("generatorType")} style={{ width: "100%", padding: "12px 16px", background: inputBg, border: `1px solid ${inputBorder}`, borderRadius: 8, color: textColor, fontSize: 14, outline: "none" }}>
            {["Select a type...", "Silent Type", "Open Type", "Mobile / Trailer Type", "Container Type", "Not sure — need advice"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: labelColor, marginBottom: 6 }}>Message *</label>
          <textarea rows={4} placeholder="Tell us about your power needs..." value={fields.message} onChange={set("message")} style={{ ...inputStyle("message"), resize: "vertical" }} />
          {errors.message && <div style={errStyle}>{errors.message}</div>}
        </div>
        {formspreeState.errors && formspreeState.errors.length > 0 && (
          <div style={{ marginBottom: 16, padding: "12px 16px", background: "rgba(200,37,46,0.1)", border: `1px solid rgba(200,37,46,0.3)`, borderRadius: 8, fontSize: 13, color: ACCENT }}>
            Something went wrong. Please try again or email us directly.
          </div>
        )}
        <button type="submit" disabled={formspreeState.submitting} style={{ width: "100%", padding: "14px", background: formspreeState.submitting ? DARK3 : ACCENT, color: WHITE, border: "none", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: formspreeState.submitting ? "not-allowed" : "pointer", transition: "transform 0.2s, background 0.2s", opacity: formspreeState.submitting ? 0.7 : 1 }}
          onMouseEnter={e => { if (!formspreeState.submitting) e.target.style.transform = "scale(1.02)"; }}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
        >{formspreeState.submitting ? "Sending…" : "Submit request"}</button>
      </form>
    </div>
  );
}

// ═══════════════════ CATEGORY ICON ═══════════════════
function CategoryIcon({ id, size = 80 }) {
  const stroke = ACCENT;
  if (id === "silent") return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <rect x="14" y="20" width="52" height="40" rx="3" fill={DARK3} stroke={stroke} strokeWidth="1.5" />
      <rect x="18" y="26" width="20" height="28" rx="2" fill={DARK2} />
      <circle cx="28" cy="40" r="7" fill="none" stroke={stroke} strokeWidth="1.5" />
      <rect x="42" y="26" width="20" height="28" rx="2" fill={DARK2} />
      <line x1="46" y1="32" x2="58" y2="32" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
      <line x1="46" y1="38" x2="56" y2="38" stroke={stroke} strokeWidth="1.5" opacity="0.4" />
      <line x1="46" y1="44" x2="58" y2="44" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
  if (id === "open") return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <rect x="10" y="50" width="60" height="6" fill={DARK3} stroke={stroke} strokeWidth="1.5" />
      <rect x="14" y="22" width="22" height="28" fill={DARK2} stroke={stroke} strokeWidth="1.5" />
      <circle cx="25" cy="36" r="6" fill="none" stroke={stroke} strokeWidth="1.5" />
      <rect x="40" y="22" width="26" height="28" fill={DARK2} stroke={stroke} strokeWidth="1.5" />
      <rect x="44" y="26" width="18" height="6" fill={DARK3} />
      <line x1="44" y1="36" x2="62" y2="36" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1="44" y1="40" x2="60" y2="40" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1="44" y1="44" x2="58" y2="44" stroke={stroke} strokeWidth="1" opacity="0.5" />
    </svg>
  );
  if (id === "mobile") return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <rect x="10" y="46" width="60" height="4" fill={DARK3} stroke={stroke} strokeWidth="1" />
      <circle cx="22" cy="56" r="6" fill={DARK3} stroke={stroke} strokeWidth="1.5" />
      <circle cx="58" cy="56" r="6" fill={DARK3} stroke={stroke} strokeWidth="1.5" />
      <rect x="14" y="22" width="52" height="24" rx="2" fill={DARK2} stroke={stroke} strokeWidth="1.5" />
      <circle cx="30" cy="34" r="6" fill="none" stroke={stroke} strokeWidth="1.5" />
      <line x1="44" y1="30" x2="60" y2="30" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1="44" y1="34" x2="60" y2="34" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <line x1="44" y1="38" x2="56" y2="38" stroke={stroke} strokeWidth="1" opacity="0.5" />
    </svg>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <rect x="6" y="20" width="68" height="40" rx="2" fill={DARK3} stroke={stroke} strokeWidth="1.5" />
      <rect x="6" y="20" width="68" height="6" fill={DARK2} />
      <line x1="10" y1="23" x2="70" y2="23" stroke={stroke} strokeWidth="1" />
      <rect x="10" y="30" width="18" height="26" fill={DARK2} stroke={stroke} strokeWidth="0.75" />
      <line x1="10" y1="36" x2="28" y2="36" stroke={stroke} strokeWidth="0.5" opacity="0.5" />
      <line x1="10" y1="42" x2="28" y2="42" stroke={stroke} strokeWidth="0.5" opacity="0.5" />
      <line x1="10" y1="48" x2="28" y2="48" stroke={stroke} strokeWidth="0.5" opacity="0.5" />
      <rect x="32" y="30" width="22" height="26" fill={DARK2} stroke={stroke} strokeWidth="0.75" />
      <circle cx="43" cy="43" r="8" fill="none" stroke={stroke} strokeWidth="1.5" />
      <rect x="58" y="30" width="14" height="26" fill={DARK2} stroke={stroke} strokeWidth="0.75" />
      <line x1="60" y1="36" x2="70" y2="36" stroke={stroke} strokeWidth="0.5" opacity="0.5" />
      <line x1="60" y1="42" x2="70" y2="42" stroke={stroke} strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

// ═══════════════════ HOMEPAGE ═══════════════════
function HomePage() {
  const { navigate } = useRouter();
  const isMobile = useIsMobile();
  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: isMobile ? "auto" : "100vh", background: DARK, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, ${DARK} 0%, ${DARK2} 50%, #15203D 100%)` }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse 80% 60% at 75% 40%, rgba(200,37,46,0.1) 0%, transparent 70%)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "100px 20px 60px" : "120px 24px 80px", position: "relative", zIndex: 1, display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", gap: isMobile ? 40 : 48 }}>
          <div style={{ flex: 1, maxWidth: 580, width: "100%" }}>
            <FadeIn>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,37,46,0.12)", padding: "6px 16px", borderRadius: 50, marginBottom: 24, border: `1px solid rgba(200,37,46,0.2)` }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: ACCENT, letterSpacing: "0.08em", textTransform: "uppercase" }}>Now serving the continental US</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 style={{ fontSize: "clamp(36px, 7vw, 64px)", fontWeight: 800, color: WHITE, lineHeight: 1.05, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
                Powering America,<br /><span style={{ color: ACCENT }}>one generator</span><br />at a time.
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 24px" }}>
                <div style={{ width: 32, height: 2, background: ACCENT }} />
                <span style={{ fontSize: isMobile ? 11 : 13, fontWeight: 700, color: WHITE, letterSpacing: "0.18em", textTransform: "uppercase" }}>Built to Power. Built to Lead.</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontSize: isMobile ? 16 : 18, color: MID, lineHeight: 1.7, margin: "0 0 32px", maxWidth: 480 }}>
                The official U.S. division of Leading Power — 16 years of diesel generator manufacturing, with local sales, support, and inventory in Houston, Texas.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link to="products" style={{ background: ACCENT, color: WHITE, padding: isMobile ? "14px 24px" : "16px 32px", borderRadius: 8, fontWeight: 700, fontSize: 15, boxShadow: "0 4px 24px rgba(200,37,46,0.3)" }}>View generators</Link>
                <Link to="contact" style={{ background: "transparent", color: WHITE, padding: isMobile ? "14px 24px" : "16px 32px", borderRadius: 8, fontWeight: 600, fontSize: 15, border: `1px solid ${DARK3}` }}>Request a quote</Link>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} style={{ flex: "0 0 auto", width: isMobile ? "100%" : "auto", maxWidth: isMobile ? 400 : "none" }}>
            <div style={{ position: "relative", width: "100%" }}>
              <div style={{ width: isMobile ? "100%" : 480, aspectRatio: "1", borderRadius: 24, overflow: "hidden", border: `1px solid ${DARK3}`, boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }}>
                <img src="/images/products/perkins-24kw/1.jpg" alt="Leading Power LDGP-30 Silent Diesel Generator" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ position: "absolute", bottom: 24, left: -16, background: ACCENT, borderRadius: 10, padding: "14px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: WHITE }}>3kW – 3MW</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>Full range available</div>
              </div>
              <div style={{ position: "absolute", top: 24, right: -16, background: WHITE, borderRadius: 10, padding: "12px 16px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>Featured</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: DARK, marginTop: 2 }}>LDGP-30 Perkins</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* HOT CATEGORIES */}
      <section style={{ background: LIGHT, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase" }}>Hot Categories</span>
              <h2 style={{ fontSize: 38, fontWeight: 800, color: DARK, margin: "12px 0 0", letterSpacing: "-0.02em" }}>Built for every application</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {CATEGORIES.map((c, i) => (
              <FadeIn key={c.id} delay={i * 0.08}>
                <div onClick={() => navigate("products")} style={{ background: WHITE, borderRadius: 16, padding: "36px 28px", textAlign: "center", border: `1px solid ${BORDER}`, cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s", height: "100%" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = ACCENT; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = BORDER; }}
                >
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                    <CategoryIcon id={c.id} size={70} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: DARK, margin: "0 0 6px" }}>{c.title}</h3>
                  <div style={{ fontSize: 13, color: ACCENT, fontWeight: 600 }}>{c.range}</div>
                </div>
              </FadeIn>
            ))}
            <FadeIn delay={CATEGORIES.length * 0.08}>
              <div onClick={() => navigate("products-natural-gas")} style={{ background: WHITE, borderRadius: 16, padding: "36px 28px", textAlign: "center", border: `1px solid ${BORDER}`, cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s", height: "100%" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = ACCENT; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = BORDER; }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <svg width="70" height="70" viewBox="0 0 80 80" fill="none">
                    <path d="M40 12 C40 12 26 28 26 42 C26 50.84 32.27 58 40 58 C47.73 58 54 50.84 54 42 C54 28 40 12 40 12Z" fill={DARK3} stroke={ACCENT} strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M40 30 C40 30 33 38 33 44 C33 47.87 36.13 51 40 51 C43.87 51 47 47.87 47 44 C47 38 40 30 40 30Z" fill={DARK2} stroke={ACCENT} strokeWidth="1" strokeLinejoin="round" />
                    <circle cx="40" cy="44" r="4" fill="none" stroke={ACCENT} strokeWidth="1.5" />
                    <line x1="40" y1="58" x2="40" y2="64" stroke={ACCENT} strokeWidth="1.5" />
                    <line x1="28" y1="62" x2="52" y2="62" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: DARK, margin: "0 0 6px" }}>Natural Gas</h3>
                <div style={{ fontSize: 13, color: ACCENT, fontWeight: 600 }}>20 – 500 kW</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FEATURED SPOTLIGHT 1 - PERKINS */}
      <section style={{ background: DARK, padding: isMobile ? "60px 20px" : "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 64, alignItems: "center" }}>
            <FadeIn>
              <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "1", border: `1px solid ${DARK3}` }}>
                <img src="/images/products/perkins-24kw/1.jpg" alt="LDGP-30 Perkins Silent Diesel Generator" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase" }}>Featured Product</span>
                <h2 style={{ fontSize: 38, fontWeight: 800, color: WHITE, margin: "12px 0 16px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>Silent Diesel Generator Set</h2>
                <p style={{ fontSize: 16, color: MID, lineHeight: 1.75, margin: "0 0 24px" }}>
                  Hot-selling silent series with customizable appearance and diverse configurations. Soundproofed, weatherproof, and built for demanding applications. Standard 60Hz US-spec configurations available.
                </p>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
                  {[["Soundproof", "65 dB(A) at 7m"], ["Weatherproof", "IP23 enclosure"], ["EPA Tier 4", "Certified for US"]].map(([t, d]) => (
                    <div key={t}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: WHITE }}>{t}</div>
                      <div style={{ fontSize: 12, color: MID, marginTop: 2 }}>{d}</div>
                    </div>
                  ))}
                </div>
                <Link to="product-perkins-24kw" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: ACCENT, fontWeight: 700, fontSize: 15 }}>
                  View this product <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FEATURED SPOTLIGHT 2 - RICARDO */}
      <section style={{ background: DARK2, padding: isMobile ? "60px 20px" : "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 64, alignItems: "center" }}>
            <FadeIn>
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase" }}>Featured Product</span>
                <h2 style={{ fontSize: 38, fontWeight: 800, color: WHITE, margin: "12px 0 16px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>Super Silent Diesel Generator Set</h2>
                <p style={{ fontSize: 16, color: MID, lineHeight: 1.75, margin: "0 0 24px" }}>
                  Premium silent series with upgraded nano soundproofing foam — capable of achieving noise reduction down to 50–60 dB. Engineered for noise-sensitive deployments where standard silent units aren't quiet enough.
                </p>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
                  {[["Ultra-quiet", "50–60 dB noise reduction"], ["Premium build", "Nano-foam insulation"], ["Industrial-grade", "75kW continuous"]].map(([t, d]) => (
                    <div key={t}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: WHITE }}>{t}</div>
                      <div style={{ fontSize: 12, color: MID, marginTop: 2 }}>{d}</div>
                    </div>
                  ))}
                </div>
                <Link to="product-ricardo-75kw" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: ACCENT, fontWeight: 700, fontSize: 15 }}>
                  View this product <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "1", border: `1px solid ${DARK3}` }}>
                <img src="/images/products/ricardo-75kw/1.jpg" alt="LDGP-75 Super Silent Diesel Generator" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FEATURED SPOTLIGHT 3 - NATURAL GAS */}
      <section style={{ background: DARK, padding: isMobile ? "60px 20px" : "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 64, alignItems: "center" }}>
            <FadeIn>
              <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "1", border: `1px solid ${DARK3}`, background: DARK2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
                  <rect x="20" y="80" width="180" height="110" rx="6" fill={DARK3} stroke={ACCENT} strokeWidth="1.5" />
                  <rect x="20" y="80" width="180" height="18" rx="6" fill={DARK2} />
                  <rect x="30" y="108" width="60" height="72" rx="4" fill={DARK2} stroke={ACCENT} strokeWidth="1" strokeOpacity="0.5" />
                  <circle cx="60" cy="144" r="20" fill="none" stroke={ACCENT} strokeWidth="1.5" />
                  <circle cx="60" cy="144" r="8" fill={DARK3} stroke={ACCENT} strokeWidth="1" />
                  <rect x="100" y="108" width="90" height="72" rx="4" fill={DARK2} stroke={ACCENT} strokeWidth="1" strokeOpacity="0.5" />
                  <line x1="110" y1="124" x2="180" y2="124" stroke={ACCENT} strokeWidth="1" strokeOpacity="0.4" />
                  <line x1="110" y1="138" x2="175" y2="138" stroke={ACCENT} strokeWidth="1" strokeOpacity="0.4" />
                  <line x1="110" y1="152" x2="180" y2="152" stroke={ACCENT} strokeWidth="1" strokeOpacity="0.4" />
                  <path d="M110 50 C110 50 98 63 98 71 C98 77.63 103.37 83 110 83 C116.63 83 122 77.63 122 71 C122 63 110 50 110 50Z" fill="rgba(200,37,46,0.2)" stroke={ACCENT} strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M110 59 C110 59 104 66 104 71 C104 73.76 106.24 76 109 76 C111.76 76 114 73.76 114 71 C114 66 110 59 110 59Z" fill={DARK2} stroke={ACCENT} strokeWidth="1" strokeLinejoin="round" />
                  <text x="110" y="74" textAnchor="middle" fill={DARK3} fontSize="9" fontFamily="sans-serif" fontWeight="800">G</text>
                </svg>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase" }}>Featured Category</span>
                <h2 style={{ fontSize: 38, fontWeight: 800, color: WHITE, margin: "12px 0 16px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>Natural Gas Generator Sets</h2>
                <p style={{ fontSize: 16, color: MID, lineHeight: 1.75, margin: "0 0 24px" }}>
                  Clean-burning natural gas generators for commercial, industrial, and utility applications. Specialists in Permian Basin wellhead gas and flare gas recovery — turning waste gas into reliable on-site power.
                </p>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
                  {[["Clean fuel", "Lower emissions vs. diesel"], ["Wellhead gas", "Permian Basin specialists"], ["20–500 kW", "Full commercial range"]].map(([t, d]) => (
                    <div key={t}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: WHITE }}>{t}</div>
                      <div style={{ fontSize: 12, color: MID, marginTop: 2 }}>{d}</div>
                    </div>
                  ))}
                </div>
                <Link to="products-natural-gas" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: ACCENT, fontWeight: 700, fontSize: 15 }}>
                  View natural gas generators <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section style={{ background: LIGHT, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase" }}>Products</span>
              <h2 style={{ fontSize: 38, fontWeight: 800, color: DARK, margin: "12px 0 0", letterSpacing: "-0.02em" }}>Our complete product range</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {PRODUCTS.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.05}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: DARK, padding: "80px 24px", borderTop: `1px solid ${DARK3}`, borderBottom: `1px solid ${DARK3}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, fontWeight: 800, color: ACCENT, letterSpacing: "-0.02em" }}>{s.num}</div>
                <div style={{ fontSize: 14, color: MID, marginTop: 4 }}>{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section style={{ background: DARK2, padding: isMobile ? "60px 20px" : "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 64, alignItems: "center" }}>
          <FadeIn>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase" }}>About LDGP</span>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: WHITE, margin: "12px 0 24px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>Ningde Leading Power Co., Ltd.</h2>
              <p style={{ fontSize: 16, color: MID, lineHeight: 1.75, margin: "0 0 20px" }}>
                Headquartered in Ningde, Fujian, China, our parent company has 16 years of diesel generator manufacturing experience. Production strictly follows international standards and industry norms, with a comprehensive quality inspection system in place.
              </p>
              <p style={{ fontSize: 16, color: MID, lineHeight: 1.75, margin: "0 0 32px" }}>
                The factory is certified by international authorities including CE, ISO 9001, RoHS, and TUV Rheinland. Equipment is regularly maintained by professional technicians to ensure stable production.
              </p>
              <Link to="about" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: ACCENT, fontWeight: 700, fontSize: 15 }}>
                View More <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ position: "relative" }}>
              <div style={{ background: DARK3, borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid rgba(255,255,255,0.06)`, padding: 32 }}>
                <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
                  <rect x="10" y="80" width="380" height="140" rx="6" fill="#252830" stroke="#444" strokeWidth="1" /><rect x="10" y="80" width="380" height="20" rx="6" fill="#2E3138" />
                  <text x="200" y="94" textAnchor="middle" fill={ACCENT} fontSize="10" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.05em">LEADING POWER MANUFACTURING FACILITY</text>
                  {[64, 158, 252].map(cx => (<g key={cx}><rect x={cx - 40} y="110" width="80" height="100" rx="4" fill="#1A1D23" stroke="#444" strokeWidth="0.5" /><circle cx={cx} cy="160" r="30" fill="#2E323B" stroke={ACCENT} strokeWidth="1.5" /><circle cx={cx} cy="160" r="14" fill="#1A1D23" stroke={ACCENT} strokeWidth="1" /></g>))}
                  <rect x="306" y="110" width="72" height="100" rx="4" fill="#1A1D23" stroke="#444" strokeWidth="0.5" />
                  {[120, 140, 160, 180].map(y => <rect key={y} x="316" y={y} width="52" height="14" rx="2" fill="#2E323B" />)}
                  <text x="200" y="50" textAnchor="middle" fill="#777" fontSize="12" fontFamily="sans-serif" fontWeight="600">15,000 m² Production Base</text>
                  <text x="200" y="68" textAnchor="middle" fill="#555" fontSize="10" fontFamily="sans-serif">Ningde, Fujian, China</text>
                </svg>
              </div>
              <div style={{ position: "absolute", bottom: -20, left: -20, background: ACCENT, borderRadius: 12, padding: "20px 24px", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: WHITE }}>10,000+</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Units per year</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CUSTOMIZED SOLUTION */}
      <section style={{ background: DARK, padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase" }}>Customized Solution</span>
              <h2 style={{ fontSize: 38, fontWeight: 800, color: WHITE, margin: "12px 0 0", letterSpacing: "-0.02em" }}>Your specs. Our engineering.</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { num: "1", title: "Color customization", desc: "Logo, color scheme, and nameplate customized to your brand identity." },
              { num: "2", title: "Fuel tank capacity", desc: "8-hour, 12-hour, 16-hour, 24-hour, or 48-hour runtime configurations." },
              { num: "3", title: "Shape customization", desc: "Custom enclosure shapes designed within engineering parameters and shipping constraints." },
            ].map((f, i) => (
              <FadeIn key={f.num} delay={i * 0.08}>
                <div style={{ background: DARK2, border: `1px solid ${DARK3}`, borderRadius: 16, padding: "36px 32px", height: "100%", transition: "border-color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(200,37,46,0.4)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = DARK3}
                >
                  <div style={{ width: 44, height: 44, background: "rgba(200,37,46,0.12)", border: `1px solid rgba(200,37,46,0.3)`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 18, fontWeight: 800, color: ACCENT }}>{f.num}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: WHITE, margin: "0 0 10px" }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: MID, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section style={{ background: LIGHT, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase" }}>Quality Certification</span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: DARK, margin: "12px 0 16px", letterSpacing: "-0.02em" }}>Internationally certified</h2>
            <p style={{ fontSize: 15, color: TEXT_MUTED, maxWidth: 700, margin: "0 auto 48px", lineHeight: 1.6 }}>
              Our factory holds multiple international authority certifications. Custom certificates can be arranged according to specific customer requirements.
            </p>
          </FadeIn>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {CERTS.map((c, i) => (
              <FadeIn key={c} delay={i * 0.08}>
                <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "32px 48px", minWidth: 160, transition: "border-color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = ACCENT} onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}
                >
                  <div style={{ fontSize: 24, fontWeight: 800, color: DARK }}>{c}</div>
                  <div style={{ fontSize: 12, color: "#9B9790", marginTop: 4 }}>Certified</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: DARK, padding: "80px 24px", textAlign: "center" }}>
        <FadeIn>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: WHITE, margin: "0 0 16px", letterSpacing: "-0.02em" }}>Ready to power up?</h2>
            <p style={{ fontSize: 16, color: MID, lineHeight: 1.7, margin: "0 0 32px" }}>
              Get a quote on any generator in our lineup. Local support, factory-direct pricing, and inventory ready to ship from Houston.
            </p>
            <Link to="contact" style={{ display: "inline-block", background: ACCENT, color: WHITE, padding: "16px 40px", borderRadius: 8, fontWeight: 700, fontSize: 15 }}>Contact us today</Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

// ═══════════════════ PRODUCT CARD ═══════════════════
function ProductCard({ product }) {
  const { navigate } = useRouter();
  const goTo = product.hasPhotos ? `product-${product.id}` : "products";
  return (
    <div onClick={() => navigate(goTo)} style={{ background: WHITE, borderRadius: 14, overflow: "hidden", border: `1px solid ${BORDER}`, cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s", height: "100%", display: "flex", flexDirection: "column" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ background: DARK, aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
        {product.hasPhotos ? (
          <img src={`/images/products/${product.folder}/1.jpg`} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <CategoryIcon id={product.category} size={120} />
        )}
        {product.hasPhotos && (
          <div style={{ position: "absolute", top: 12, right: 12, background: ACCENT, color: WHITE, padding: "4px 10px", borderRadius: 50, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}>IN STOCK</div>
        )}
      </div>
      <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: ACCENT, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{product.range}</div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: DARK, margin: "0 0 10px", lineHeight: 1.3 }}>{product.title}</h3>
        <p style={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.55, margin: "0 0 14px", flex: 1 }}>{product.desc}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: ACCENT, fontSize: 12, fontWeight: 700 }}>
          <span>{product.hasPhotos ? "View Details" : "Inquire"}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════ QUOTE CONFIGURATOR FORM ═══════════════════
function QuoteConfiguratorForm({ powerOptions = [], rangeTitle = "" }) {
  const [fsState, handleFsSubmit] = useForm("xqejjwgo");
  const EMPTY = {
    power: "", engineBrand: "", alternatorBrand: "", phase: "", voltage: "",
    enclosure: "", fuelTank: "", controlPanel: "", soundAttenuation: "",
    atsIncluded: false, customColor: "",
    name: "", company: "", email: "", phone: "", message: "",
  };
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  function validate() {
    const errs = {};
    if (!fields.name.trim()) errs.name = "Full name is required.";
    if (!fields.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = "Enter a valid email address.";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    handleFsSubmit({ ...fields, rangeTitle, _subject: `Quote Request: ${rangeTitle}` });
  }

  const inputStyle = { width: "100%", padding: "11px 14px", background: DARK2, border: `1px solid rgba(255,255,255,0.1)`, borderRadius: 8, color: WHITE, fontSize: 14, outline: "none", boxSizing: "border-box" };
  const errStyle = { fontSize: 12, color: ACCENT, marginTop: 4 };
  const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: MID, marginBottom: 6 };

  const Sel = ({ label, k, opts }) => (
    <div>
      <label style={labelStyle}>{label}</label>
      <select value={fields[k]} onChange={set(k)} style={{ ...inputStyle, cursor: "pointer" }}>
        {opts.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  const Inp = ({ label, k, type = "text", ph, required }) => (
    <div>
      <label style={labelStyle}>{label}{required && " *"}</label>
      <input type={type} placeholder={ph} value={fields[k]} onChange={set(k)}
        style={{ ...inputStyle, borderColor: errors[k] ? ACCENT : "rgba(255,255,255,0.1)" }} />
      {errors[k] && <div style={errStyle}>{errors[k]}</div>}
    </div>
  );

  if (fsState.succeeded) {
    return (
      <div style={{ background: DARK3, borderRadius: 20, padding: "60px 40px", border: `1px solid rgba(255,255,255,0.06)`, textAlign: "center" }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(200,37,46,0.12)", border: `1px solid rgba(200,37,46,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 700, color: WHITE, margin: "0 0 10px" }}>Quote request sent!</h3>
        <p style={{ fontSize: 15, color: MID, lineHeight: 1.6, margin: 0, maxWidth: 340, marginLeft: "auto", marginRight: "auto" }}>
          We'll review your configuration and get back to you shortly with pricing and availability.
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: DARK3, borderRadius: 20, padding: "40px 36px", border: `1px solid rgba(255,255,255,0.06)` }}>
      <h3 style={{ fontSize: 22, fontWeight: 700, color: WHITE, margin: "0 0 6px" }}>Configure your generator</h3>
      <p style={{ fontSize: 14, color: MID, margin: "0 0 28px" }}>Customize your spec and we'll quote accordingly.</p>
      <form onSubmit={handleSubmit} noValidate>

        {/* Config grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 24px", marginBottom: 18 }}>
          <Sel label="Power output" k="power" opts={["Select...", ...powerOptions]} />
          <Sel label="Engine brand" k="engineBrand" opts={["Select...", "Cummins", "Doosan", "Perkins", "Ricardo", "Weichai", "SIDA"]} />
          <Sel label="Alternator brand" k="alternatorBrand" opts={["Select...", "Stamford", "Leroy-Somer", "Marathon", "Mecc Alte"]} />
          <Sel label="Phase" k="phase" opts={["Select...", "Single phase", "Three phase"]} />
          <Sel label="Voltage" k="voltage" opts={["Select...", "120/240V single phase", "120/208V three phase", "277/480V three phase", "Custom"]} />
          <Sel label="Enclosure type" k="enclosure" opts={["Select...", "Silent canopy", "Open frame", "Portable on casters", "Trailer mounted", "Container"]} />
          <Sel label="Fuel tank runtime" k="fuelTank" opts={["Select...", "Base tank (4–6 hrs)", "8 hour", "12 hour", "24 hour", "48 hour"]} />
          <Sel label="Control panel" k="controlPanel" opts={["Select...", "Deep Sea Electronics (DSE)", "ComAp", "SmartGen", "Manual gauge panel"]} />
          <Sel label="Sound attenuation" k="soundAttenuation" opts={["Select...", "Standard silent (65–75 dB)", "Super silent (50–65 dB)", "Open frame"]} />
          <Inp label="Custom color (optional)" k="customColor" ph="RAL 7035, olive green, custom…" />
        </div>

        {/* Options row */}
        <div style={{ marginBottom: 28 }}>
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <input type="checkbox" checked={fields.atsIncluded} onChange={set("atsIncluded")}
                style={{ width: 16, height: 16, accentColor: ACCENT, cursor: "pointer" }} />
              <span style={{ fontSize: 14, color: MID, fontWeight: 500 }}>Include ATS (Auto Transfer Switch)</span>
            </label>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: `1px solid rgba(255,255,255,0.08)`, margin: "0 0 24px" }} />
        <h4 style={{ fontSize: 16, fontWeight: 700, color: WHITE, margin: "0 0 20px" }}>Your information</h4>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 24px", marginBottom: 18 }}>
          <Inp label="Full name" k="name" ph="Your full name" required />
          <Inp label="Company" k="company" ph="Company name" />
          <Inp label="Email" k="email" type="email" ph="your@company.com" required />
          <Inp label="Phone" k="phone" type="tel" ph="(000) 000-0000" />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Message</label>
          <textarea rows={3} placeholder="Project details, timeline, site location…" value={fields.message} onChange={set("message")}
            style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        {fsState.errors && fsState.errors.length > 0 && (
          <div style={{ marginBottom: 16, padding: "12px 16px", background: "rgba(200,37,46,0.1)", border: `1px solid rgba(200,37,46,0.3)`, borderRadius: 8, fontSize: 13, color: ACCENT }}>
            Something went wrong. Please try again or email us directly.
          </div>
        )}

        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 16, flexWrap: "wrap" }}>
          {[["1 Year Warranty Included"], ["Factory-Direct Pricing"]].map(([text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}><path d="M2.5 7.5l3.5 3.5 6.5-7" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontSize: 13, color: TEXT_MUTED, fontWeight: 500 }}>{text}</span>
            </div>
          ))}
        </div>
        <button type="submit" disabled={fsState.submitting}
          style={{ width: "100%", padding: "15px", background: fsState.submitting ? DARK2 : ACCENT, color: WHITE, border: "none", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: fsState.submitting ? "not-allowed" : "pointer", opacity: fsState.submitting ? 0.7 : 1, transition: "background 0.2s" }}
          onMouseEnter={e => { if (!fsState.submitting) e.currentTarget.style.background = ACCENT_DARK; }}
          onMouseLeave={e => { if (!fsState.submitting) e.currentTarget.style.background = ACCENT; }}
        >{fsState.submitting ? "Sending…" : "Request quote"}</button>
      </form>
    </div>
  );
}

// ═══════════════════ PRODUCTS LANDING PAGE (Level 1) ═══════════════════
function ProductsLandingPage() {
  const { navigate } = useRouter();
  const isMobile = useIsMobile();

  const DieselIcon = () => (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="4" y="16" width="48" height="30" rx="4" fill={DARK2} stroke={ACCENT} strokeWidth="1.5"/>
      <rect x="8" y="20" width="18" height="22" rx="2" fill={DARK3}/>
      <circle cx="17" cy="31" r="7" fill="none" stroke={ACCENT} strokeWidth="1.5"/>
      <circle cx="17" cy="31" r="3" fill={ACCENT} opacity="0.4"/>
      <rect x="30" y="20" width="18" height="22" rx="2" fill={DARK3}/>
      <line x1="33" y1="27" x2="45" y2="27" stroke={ACCENT} strokeWidth="1.5" opacity="0.6"/>
      <line x1="33" y1="31" x2="44" y2="31" stroke={ACCENT} strokeWidth="1.5" opacity="0.5"/>
      <line x1="33" y1="35" x2="45" y2="35" stroke={ACCENT} strokeWidth="1.5" opacity="0.6"/>
      <rect x="20" y="10" width="16" height="6" rx="2" fill={DARK3} stroke={ACCENT} strokeWidth="1"/>
    </svg>
  );

  const GasIcon = () => (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M28 6 C22 14 16 20 16 28 C16 37.9 21.1 44 28 44 C34.9 44 40 37.9 40 28 C40 20 34 14 28 6Z" fill={DARK2} stroke={ACCENT} strokeWidth="1.5"/>
      <path d="M28 16 C25 21 22 24 22 28 C22 31.3 24.7 34 28 34 C31.3 34 34 31.3 34 28 C34 24 31 21 28 16Z" fill={ACCENT} opacity="0.3"/>
      <circle cx="28" cy="28" r="4" fill={ACCENT} opacity="0.6"/>
    </svg>
  );

  const categories = [
    {
      id: "diesel",
      title: "Diesel Generators",
      range: "3kW – 3MW",
      desc: "Stationary, mobile, and containerized diesel generator sets in silent, open frame, trailer-mounted, and container configurations. Factory-direct US-spec builds.",
      to: "products-diesel",
      highlights: ["Silent Type", "Open Frame", "Mobile & Trailer", "Container Type"],
      icon: <DieselIcon />,
    },
    {
      id: "natural-gas",
      title: "Natural Gas Generators",
      range: "20kW – 10MW+",
      desc: "Clean-burning natural gas generators for commercial, industrial, and utility applications. Specialists in Permian Basin wellhead gas and flare gas recovery.",
      to: "products-natural-gas",
      highlights: ["Small Commercial", "Commercial & Industrial", "Industrial", "Utility Scale"],
      icon: <GasIcon />,
    },
  ];

  return (
    <>
      <PageHeader
        label="Products"
        title="Factory-direct power generation"
        subtitle="Diesel and natural gas generator sets from 3kW to 10MW+, built to US specifications and stocked in Houston, Texas."
        breadcrumbs={[{ label: "Home", to: "home" }, { label: "Products" }]}
      />
      <section style={{ background: LIGHT, padding: isMobile ? "48px 20px 80px" : "80px 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24 }}>
            {categories.map((cat, i) => (
              <FadeIn key={cat.id} delay={i * 0.1}>
                <div
                  onClick={() => navigate(cat.to)}
                  style={{ background: DARK, borderRadius: 20, padding: isMobile ? "36px 28px" : "52px 44px", cursor: "pointer", border: `1px solid ${DARK3}`, transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s", display: "flex", flexDirection: "column", height: "100%" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 24px 56px rgba(0,0,0,0.3)"; e.currentTarget.style.borderColor = ACCENT; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = DARK3; }}
                >
                  <div style={{ marginBottom: 24 }}>{cat.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{cat.range}</div>
                  <h2 style={{ fontSize: isMobile ? 24 : 30, fontWeight: 800, color: WHITE, margin: "0 0 14px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{cat.title}</h2>
                  <p style={{ fontSize: 15, color: MID, lineHeight: 1.7, margin: "0 0 24px", flex: 1 }}>{cat.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                    {cat.highlights.map(h => (
                      <span key={h} style={{ fontSize: 12, fontWeight: 600, color: MID, background: DARK2, padding: "5px 12px", borderRadius: 50, border: `1px solid ${DARK3}` }}>{h}</span>
                    ))}
                  </div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: ACCENT, fontWeight: 700, fontSize: 15 }}>
                    Browse options
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ═══════════════════ CATEGORY PAGE (Level 2) ═══════════════════
function CategoryPage({ catId }) {
  const { navigate } = useRouter();
  const isMobile = useIsMobile();
  const meta = CATEGORY_META[catId];
  const subcats = SUBCATEGORIES[catId] || [];

  return (
    <>
      <PageHeader
        label={catId === "diesel" ? "Diesel Generators" : "Natural Gas Generators"}
        title={meta.title}
        subtitle={meta.desc}
        breadcrumbs={meta.breadcrumb}
      />
      <section style={{ background: LIGHT, padding: isMobile ? "48px 20px 80px" : "80px 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: 20 }}>
            {subcats.map((sc, i) => (
              <FadeIn key={sc.id} delay={i * 0.08}>
                <div
                  onClick={() => navigate(sc.pageId)}
                  style={{ background: WHITE, borderRadius: 16, padding: "36px 32px", cursor: "pointer", border: `1px solid ${BORDER}`, transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s", display: "flex", flexDirection: "column", height: "100%" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = ACCENT; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = BORDER; }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: ACCENT, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>{sc.range}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: DARK, margin: "0 0 12px", letterSpacing: "-0.01em" }}>{sc.title}</h3>
                  <p style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.65, margin: "0 0 20px", flex: 1 }}>{sc.desc}</p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: ACCENT, fontWeight: 700, fontSize: 14 }}>
                    {catId === "diesel" ? "View power ranges" : "View products"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ═══════════════════ SUBCATEGORY PAGE (Level 3 — Diesel only) ═══════════════════
function SubCategoryPage({ subCatId }) {
  const { navigate } = useRouter();
  const isMobile = useIsMobile();
  const subCatName = DIESEL_SUBCAT_NAMES[subCatId] || subCatId;
  const ranges = DIESEL_RANGES_BY_SUBCAT[subCatId] || [];

  return (
    <>
      <PageHeader
        label="Diesel Generators"
        title={`${subCatName} — Choose a power range`}
        subtitle="Select the power range that fits your application. Each range includes a full photo gallery, use cases, and a quote configurator."
        breadcrumbs={[
          { label: "Products", to: "products" },
          { label: "Diesel Generators", to: "products-diesel" },
          { label: subCatName },
        ]}
      />
      <section style={{ background: LIGHT, padding: isMobile ? "48px 20px 80px" : "80px 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${Math.min(ranges.length, 2)}, 1fr)`, gap: 20 }}>
            {ranges.map((r, i) => {
              const rangeData = RANGES[r.id];
              const allPhotos = rangeData ? rangeData.photos.flatMap(s => s.files.map(f => `/images/products/${s.folder}/${f}`)) : [];
              const thumb = allPhotos[0] || null;
              return (
                <FadeIn key={r.id} delay={i * 0.08}>
                  <div
                    onClick={() => navigate(`range-${r.id}`)}
                    style={{ background: DARK, borderRadius: 16, overflow: "hidden", cursor: "pointer", border: `1px solid ${DARK3}`, transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s", display: "flex", flexDirection: "column" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.25)"; e.currentTarget.style.borderColor = ACCENT; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = DARK3; }}
                  >
                    <div style={{ aspectRatio: "16/9", overflow: "hidden", background: DARK2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {thumb ? (
                        <img src={thumb} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <CategoryIcon id={subCatId === "open-frame" ? "open" : subCatId === "mobile-trailer" ? "mobile" : subCatId === "container" ? "container" : "silent"} size={80} />
                      )}
                    </div>
                    <div style={{ padding: "28px 28px 32px" }}>
                      <h3 style={{ fontSize: 26, fontWeight: 800, color: WHITE, margin: "0 0 6px", letterSpacing: "-0.02em" }}>{r.title}</h3>
                      {r.subtitle && <div style={{ fontSize: 13, color: ACCENT, fontWeight: 600, marginBottom: 14 }}>{r.subtitle}</div>}
                      {rangeData && <p style={{ fontSize: 14, color: MID, lineHeight: 1.6, margin: "0 0 20px" }}>{rangeData.desc}</p>}
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: ACCENT, fontWeight: 700, fontSize: 14 }}>
                        View range & configure
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

// ═══════════════════ RANGE PAGE ═══════════════════
function RangePage({ rangeId }) {
  const { navigate } = useRouter();
  const isMobile = useIsMobile();
  const [activeImg, setActiveImg] = useState(0);

  const range = RANGES[rangeId];
  if (!range) return <NotFoundPage />;

  const allPhotos = range.photos.flatMap(s => s.files.map(f => `/images/products/${s.folder}/${f}`));
  const hasPhotos = allPhotos.length > 0;

  const relatedRanges = (range.related || []).map(id => RANGES[id]).filter(Boolean);

  const catIconId = range.subCat === "open-frame" ? "open" : range.subCat === "mobile-trailer" ? "mobile" : range.subCat === "container" ? "container" : "silent";

  return (
    <>
      {/* Hero */}
      <PageHeader
        label={range.fuelType === "natural-gas" ? "Natural Gas Generators" : `Diesel Generators — ${DIESEL_SUBCAT_NAMES[range.subCat] || ""}`}
        title={range.title}
        subtitle={range.desc}
        breadcrumbs={range.breadcrumb}
      />

      {/* Photo Gallery */}
      <section style={{ background: LIGHT, padding: isMobile ? "48px 20px" : "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: DARK, margin: "0 0 32px", letterSpacing: "-0.02em" }}>
              {hasPhotos ? "Photo gallery" : "Product overview"}
            </h2>
          </FadeIn>
          {hasPhotos ? (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 20 : 32, alignItems: "start" }}>
              <FadeIn>
                <div>
                  <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "1", border: `1px solid ${BORDER}`, marginBottom: 10 }}>
                    <img src={allPhotos[activeImg]} alt={range.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
                    {allPhotos.slice(0, 7).map((src, i) => (
                      <div key={i} onClick={() => setActiveImg(i)}
                        style={{ aspectRatio: "1", borderRadius: 6, overflow: "hidden", cursor: "pointer", border: `2px solid ${activeImg === i ? ACCENT : "transparent"}`, opacity: activeImg === i ? 1 : 0.55, transition: "all 0.2s" }}>
                        <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {allPhotos.slice(1, 5).map((src, i) => (
                    <div key={i} onClick={() => setActiveImg(i + 1)}
                      style={{ aspectRatio: "1", borderRadius: 10, overflow: "hidden", border: `1px solid ${BORDER}`, cursor: "pointer", transition: "transform 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                      <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          ) : (
            <FadeIn>
              <div style={{ background: DARK2, borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 40px", border: `1px solid ${DARK3}`, textAlign: "center" }}>
                <CategoryIcon id={catIconId} size={100} />
                <p style={{ fontSize: 15, color: MID, margin: "20px 0 0", maxWidth: 340, lineHeight: 1.6 }}>
                  Photos for this range coming soon. Contact us for current unit photos and specifications.
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Use Cases */}
      <section style={{ background: WHITE, padding: isMobile ? "48px 20px" : "80px 24px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase" }}>Applications</span>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: DARK, margin: "10px 0 32px", letterSpacing: "-0.02em" }}>Who uses this range?</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {range.useCases.map((uc, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div style={{ background: LIGHT, borderRadius: 12, padding: "24px 24px", border: `1px solid ${BORDER}`, height: "100%" }}>
                  <div style={{ width: 32, height: 32, background: ACCENT_LIGHT, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: DARK, margin: "0 0 6px" }}>{uc.title}</h3>
                  <p style={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.6, margin: 0 }}>{uc.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Configurator */}
      <section style={{ background: DARK2, padding: isMobile ? "48px 20px" : "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase" }}>Get a quote</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: WHITE, margin: "10px 0 12px", letterSpacing: "-0.02em" }}>Configure your {range.title} generator</h2>
              <p style={{ fontSize: 15, color: MID, maxWidth: 560, margin: "0 auto" }}>Select your specs below and we'll come back with pricing, lead time, and availability from our Houston inventory.</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <QuoteConfiguratorForm powerOptions={range.powerOptions} rangeTitle={range.title} />
          </FadeIn>
        </div>
      </section>

      {/* Related Ranges */}
      {relatedRanges.length > 0 && (
        <section style={{ background: LIGHT, padding: isMobile ? "48px 20px" : "80px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: DARK, margin: "0 0 28px", letterSpacing: "-0.02em" }}>You might also consider</h2>
            </FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${relatedRanges.length}, 1fr)`, gap: 16 }}>
              {relatedRanges.map((r, i) => {
                const rPhotos = r.photos.flatMap(s => s.files.map(f => `/images/products/${s.folder}/${f}`));
                return (
                  <FadeIn key={r.id} delay={i * 0.07}>
                    <div onClick={() => { navigate(`range-${r.id}`); }}
                      style={{ background: WHITE, borderRadius: 14, overflow: "hidden", border: `1px solid ${BORDER}`, cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = ACCENT; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = BORDER; }}
                    >
                      <div style={{ aspectRatio: "16/9", background: DARK, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                        {rPhotos[0] ? (
                          <img src={rPhotos[0]} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <CategoryIcon id={r.subCat === "open-frame" ? "open" : r.subCat === "mobile-trailer" ? "mobile" : r.subCat === "container" ? "container" : "silent"} size={60} />
                        )}
                      </div>
                      <div style={{ padding: "20px 22px" }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: ACCENT, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{r.fuelType === "natural-gas" ? "Natural Gas" : "Diesel"}</div>
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: DARK, margin: "0 0 6px" }}>{r.title}</h3>
                        {r.subtitle && <div style={{ fontSize: 12, color: TEXT_MUTED, marginBottom: 10 }}>{r.subtitle}</div>}
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, color: ACCENT, fontWeight: 700, fontSize: 13 }}>
                          View range
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}


// ═══════════════════ ABOUT PAGE ═══════════════════
function AboutPage() {
  const isMobile = useIsMobile();
  return (
    <>
      <PageHeader
        label="About Us"
        title="Global manufacturing. Texas grit."
        subtitle="The story behind Leading Power USA — from factory floor in China to your job site in America."
        breadcrumbs={[{ label: "Home", to: "home" }, { label: "About" }]}
      />

      {/* Hero image + intro */}
      <section style={{ background: LIGHT, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ background: DARK3, borderRadius: 20, overflow: "hidden", aspectRatio: "21/9", marginBottom: 64, border: `1px solid ${DARK3}` }}>
              <img src="/images/products/perkins-24kw/1.jpg" alt="Leading Power generator" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: isMobile ? 32 : 64 }}>
            <FadeIn>
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase" }}>Company Introduction</span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: DARK, margin: "12px 0 0", letterSpacing: "-0.02em", lineHeight: 1.15 }}>Ningde Leading Power Co., Ltd.</h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <p style={{ fontSize: 16, color: "#5A5850", lineHeight: 1.8, margin: "0 0 20px" }}>
                  Ningde Leading Power Co., Ltd. is located in Ningde, Fujian, China, with a production facility covering 15,000 square meters. The company has 16 years of production and manufacturing experience, with processes that strictly follow international standards and industry norms.
                </p>
                <p style={{ fontSize: 16, color: "#5A5850", lineHeight: 1.8, margin: "0 0 20px" }}>
                  We maintain a rigorous quality inspection system — only finished products that pass comprehensive testing make it to packaging and shipping. Equipment is regularly serviced by professional technicians to ensure stable, consistent production.
                </p>
                <p style={{ fontSize: 16, color: "#5A5850", lineHeight: 1.8, margin: 0 }}>
                  As a socially responsible enterprise, we actively promote green manufacturing and remain committed to environmental protection. We adhere to a "customer first" philosophy, providing customized solutions tailored to your specific requirements. From our Houston, Texas headquarters, Leading Power USA brings the full Leading Power product catalog to American customers — with local inventory, US-based support, and factory-direct pricing.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Enterprise Advantages */}
      <section style={{ background: WHITE, padding: "80px 24px", borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, letterSpacing: "0.15em", textTransform: "uppercase" }}>Enterprise Advantages</span>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: DARK, margin: "12px 0 0", letterSpacing: "-0.02em" }}>Why Leading Power USA</h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { title: "High Efficiency Output", desc: "Our generators ensure stable and efficient power generation, maximizing productivity at every load level." },
              { title: "Reliable Quality Build", desc: "Robust construction means our generators are durable and built to withstand demanding conditions." },
              { title: "Advanced Technology", desc: "Incorporating modern engineering and controls for enhanced performance and ease of use." },
              { title: "Factory-Direct Pricing", desc: "No middlemen or import brokers. We work directly with the manufacturer, passing savings to you." },
              { title: "Local Inventory", desc: "Popular models stocked in Houston for fast delivery anywhere in the continental US." },
              { title: "Custom Configurations", desc: "Specific voltage, fuel tank size, or enclosure color? We configure to your exact requirements." },
            ].map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.06}>
                <div style={{ background: LIGHT, borderRadius: 16, padding: "32px 28px", height: "100%" }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: DARK, margin: "0 0 10px" }}>{v.title}</h3>
                  <p style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: DARK, padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 44, fontWeight: 800, color: ACCENT }}>{s.num}</div>
                <div style={{ fontSize: 14, color: MID, marginTop: 4 }}>{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: DARK2, padding: "64px 24px", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: WHITE, margin: "0 0 16px" }}>Partner with Leading Power USA</h2>
          <p style={{ fontSize: 15, color: MID, margin: "0 0 24px" }}>Whether you need a single unit or a fleet, we're ready to help.</p>
          <Link to="contact" style={{ display: "inline-block", background: ACCENT, color: WHITE, padding: "14px 36px", borderRadius: 8, fontWeight: 700, fontSize: 15 }}>Contact us</Link>
        </FadeIn>
      </section>
    </>
  );
}

// ═══════════════════ CONTACT PAGE ═══════════════════
function ContactPage() {
  const isMobile = useIsMobile();
  return (
    <>
      <PageHeader
        label="Contact Us"
        title="We are looking forward to hearing from you"
        subtitle="We're committed to providing you with outstanding service and support. Please don't hesitate to contact us with questions or comments about our products."
        breadcrumbs={[{ label: "Home", to: "home" }, { label: "Contact" }]}
      />
      <section style={{ background: LIGHT, padding: isMobile ? "48px 20px" : "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 64, alignItems: "start" }}>
          <div>
            <FadeIn>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20, marginBottom: 32 }}>
                {[
                  { label: "Address", value: "Houston, TX", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
                  { label: "Tel", value: "(432) 235-0801", d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
                  { label: "E-mail", value: "mrobinson@leadingpowerus.com", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                ].map((item) => (
                  <div key={item.label} style={{ background: WHITE, padding: "24px 24px", borderRadius: 12, border: `1px solid ${BORDER}` }}>
                    <div style={{ width: 36, height: 36, background: ACCENT_LIGHT, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.d}/></svg>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: DARK, fontWeight: 600, lineHeight: 1.4, wordBreak: "break-word" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div style={{ padding: "28px 28px", background: WHITE, borderRadius: 16, border: `1px solid ${BORDER}` }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: DARK, margin: "0 0 12px" }}>Business hours</h3>
                <div style={{ fontSize: 14, color: TEXT_MUTED, lineHeight: 1.8 }}>
                  Monday – Friday: 8:00 AM – 6:00 PM CST<br />
                  Saturday: 9:00 AM – 2:00 PM CST<br />
                  Sunday: Closed<br />
                  <span style={{ color: ACCENT, fontWeight: 600 }}>24/7 emergency support available</span>
                </div>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.1}>
            <ContactForm dark={false} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}

// ═══════════════════ APP ═══════════════════
function PageSwitch() {
  const { page } = useRouter();
  if (page === "home") return <HomePage />;
  if (page === "about") return <AboutPage />;
  if (page === "contact") return <ContactPage />;
  // Product navigation
  if (page === "products") return <ProductsLandingPage />;
  if (page === "products-diesel") return <CategoryPage catId="diesel" />;
  if (page === "products-natural-gas") return <CategoryPage catId="natural-gas" />;
  if (page === "products-diesel-silent") return <SubCategoryPage subCatId="silent" />;
  if (page === "products-diesel-open-frame") return <SubCategoryPage subCatId="open-frame" />;
  if (page === "products-diesel-mobile-trailer") return <SubCategoryPage subCatId="mobile-trailer" />;
  if (page === "products-diesel-container") return <SubCategoryPage subCatId="container" />;
  if (page.startsWith("range-")) return <RangePage rangeId={page.replace("range-", "")} />;
  return <NotFoundPage />;
}

function NotFoundPage() {
  const { navigate } = useRouter();
  return (
    <section style={{ background: DARK, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", textAlign: "center" }}>
      <div>
        <div style={{ fontSize: 96, fontWeight: 800, color: ACCENT, lineHeight: 1, letterSpacing: "-0.04em" }}>404</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: WHITE, margin: "16px 0 12px" }}>Page not found</h1>
        <p style={{ fontSize: 16, color: MID, margin: "0 0 32px", maxWidth: 400 }}>The page you're looking for doesn't exist. Try one of the links below.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate("home")} style={{ background: ACCENT, color: WHITE, padding: "13px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer" }}>Go home</button>
          <button onClick={() => navigate("products")} style={{ background: "transparent", color: WHITE, padding: "13px 28px", borderRadius: 8, fontWeight: 600, fontSize: 15, border: `1px solid ${DARK3}`, cursor: "pointer" }}>View products</button>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <Router>
      <div style={{ background: DARK, minHeight: "100vh" }}>
        <Nav />
        <PageSwitch />
        <Footer />
      </div>
    </Router>
  );
}
