import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }
  })
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerChildren({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const UNSPLASH = {
  hero: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1400&q=80",
  mechanic: "https://images.unsplash.com/photo-1632823471406-4c5c7e4c6f24?w=800&q=80",
  engine: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
  stk: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  workshop: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=80",
};

const reviews = [
  { name: "Jiří K.", stars: 5, text: "Naprosto nevídaný a vstřícný přístup, nic není problém. Auto bylo hotové dřív, než jsem čekal. Určitě se vrátím." },
  { name: "Petra M.", stars: 5, text: "Blesková rychlost opravy – auto bylo hotové do druhého rána. A cena? Naprosto rozumná. Tady budu chodit vždycky." },
  { name: "Martin V.", stars: 5, text: "Skvělá kvalita práce za velmi rozumné ceny. Pan Topinka je profík a paní Gábina na recepci je úžasná – vše zařídí a vysvětlí." },
  { name: "Jana S.", stars: 5, text: "Přišla jsem s přípravou na STK, provedli prohlídku, opravili co bylo třeba a STK jsem projela napoprvé. Moc děkuji!" },
];

const services = [
  {
    icon: "🔧",
    title: "Opravy vozidel",
    subtitle: "Všechny značky a modely",
    desc: "Nezáleží na tom, jestli řídíte Škodovku, BMW nebo Toyotu. Zvládneme opravy a servis prakticky všech vozidel.",
    img: UNSPLASH.engine,
    list: ["Motor a převodovka", "Brzdový systém", "Podvozek a řízení", "Klimatizace a elektroinstalace", "Výfukový systém"],
  },
  {
    icon: "✅",
    title: "Příprava na STK",
    subtitle: "Projdete napoprvé",
    desc: "Provedeme důkladnou prohlídku, odhalíme závady a rovnou je opravíme. Na STK pojedete s klidnou hlavou.",
    img: UNSPLASH.stk,
    list: ["Kompletní předSTK prohlídka", "Oprava zjištěných závad", "Kontrola brzd a osvětlení", "Kontrola emisí a výfuku", "Poradenství zdarma"],
  },
];

const whyItems = [
  { icon: "⚡", title: "Bleskové opravy", text: "Spoustu oprav zvládneme do druhého rána – abyste co nejdřív mohli zase vyjet na silnici." },
  { icon: "🤝", title: "Vstřícný přístup", text: "Nic není problém. Ke každému zákazníkovi přistupujeme individuálně a s trpělivostí." },
  { icon: "💰", title: "Férové ceny", text: "Poctivá práce za cenu, která vás nepřekvapí. Transparentně, bez skrytých příplatků." },
  { icon: "⭐", title: "Stovky spokojených", text: "Hodnocení 4,9/5 a 4,7/5 na Google není náhoda – je to výsledek let poctivé práce." },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const unsub = scrollY.on("change", v => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const styles = {
    root: {
      fontFamily: "'DM Sans', sans-serif",
      background: "#0f1623",
      color: "#e8e4dc",
      overflowX: "hidden",
      position: "relative",
    },
    // NAV
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2rem", height: "68px",
      transition: "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
      background: scrolled ? "rgba(15,22,35,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(232,88,10,0.3)" : "1px solid transparent",
    },
    logo: {
      fontFamily: "'Bebas Neue', cursive",
      fontSize: "1.15rem", lineHeight: 1.1,
      color: "#fff", letterSpacing: "1px",
    },
    logoAccent: { color: "#e8580a" },
    navLinks: { display: "flex", alignItems: "center", gap: "1.75rem" },
    navLink: {
      color: "rgba(232,228,220,0.7)", textDecoration: "none",
      fontSize: "0.83rem", fontWeight: 500,
      cursor: "pointer", transition: "color 0.2s",
      background: "none", border: "none",
    },
    navCta: {
      background: "#e8580a", color: "#fff",
      border: "none", borderRadius: "7px",
      padding: "0.5rem 1.1rem", fontSize: "0.82rem",
      fontWeight: 700, cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      transition: "background 0.2s, transform 0.1s",
    },
    // HERO
    hero: {
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", textAlign: "center",
    },
    heroBg: {
      position: "absolute", inset: 0, zIndex: 0,
    },
    heroBgImg: {
      width: "100%", height: "100%", objectFit: "cover",
      filter: "brightness(0.25) saturate(0.8)",
    },
    heroOverlay: {
      position: "absolute", inset: 0,
      background: "linear-gradient(180deg, rgba(15,22,35,0.3) 0%, rgba(15,22,35,0.7) 60%, #0f1623 100%)",
    },
    heroContent: { position: "relative", zIndex: 2, padding: "0 1.5rem", maxWidth: "780px", margin: "0 auto" },
    heroBadge: {
      display: "inline-flex", alignItems: "center", gap: "0.4rem",
      background: "rgba(232,88,10,0.15)", border: "1px solid rgba(232,88,10,0.35)",
      color: "#ff8a47", fontSize: "0.72rem", fontWeight: 700,
      padding: "0.3rem 0.9rem", borderRadius: "20px", marginBottom: "1.5rem",
      letterSpacing: "1.5px", textTransform: "uppercase",
    },
    heroH1: {
      fontFamily: "'Bebas Neue', cursive",
      fontSize: "clamp(3.5rem, 10vw, 7rem)",
      lineHeight: 0.92, letterSpacing: "1px",
      color: "#fff", marginBottom: "1.25rem",
    },
    heroAccent: { color: "#e8580a" },
    heroSub: {
      fontFamily: "'Lora', serif",
      fontSize: "1.05rem", color: "rgba(232,228,220,0.7)",
      maxWidth: "500px", margin: "0 auto 2rem",
      lineHeight: 1.75, fontWeight: 400,
    },
    heroTrust: {
      display: "flex", justifyContent: "center", gap: "1.25rem",
      flexWrap: "wrap", marginBottom: "2.5rem",
    },
    trustItem: {
      display: "flex", alignItems: "center", gap: "0.4rem",
      color: "rgba(232,228,220,0.8)", fontSize: "0.8rem", fontWeight: 500,
    },
    heroCta: {
      display: "inline-flex", alignItems: "center", gap: "0.6rem",
      background: "#e8580a", color: "#fff",
      fontSize: "1rem", fontWeight: 700,
      padding: "1rem 2.25rem", borderRadius: "9px",
      textDecoration: "none", border: "none", cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      boxShadow: "0 0 40px rgba(232,88,10,0.3)",
    },
    heroScroll: {
      position: "absolute", bottom: "2rem", left: "50%",
      transform: "translateX(-50%)", zIndex: 2,
      display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem",
      color: "rgba(232,228,220,0.35)", fontSize: "0.7rem", letterSpacing: "1px",
      textTransform: "uppercase",
    },
    // SECTIONS
    section: { padding: "6rem 2rem", maxWidth: "900px", margin: "0 auto" },
    sectionLabel: {
      textTransform: "uppercase", letterSpacing: "2.5px", fontSize: "0.7rem",
      fontWeight: 700, color: "#e8580a", marginBottom: "0.5rem",
    },
    sectionTitle: {
      fontFamily: "'Bebas Neue', cursive",
      fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
      lineHeight: 1, letterSpacing: "0.5px", marginBottom: "1rem",
      color: "#f0ece4",
    },
    sectionPerex: { color: "rgba(232,228,220,0.6)", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: "520px" },
    divider: { width: "100%", height: "1px", background: "rgba(232,228,220,0.07)", margin: "0" },
    // WHY
    whySection: { background: "#131d2e", borderTop: "1px solid rgba(232,228,220,0.06)" },
    whyGrid: {
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
      gap: "1rem", marginTop: "3rem",
    },
    whyCard: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: "14px", padding: "1.75rem 1.5rem",
      cursor: "default",
    },
    whyIcon: {
      fontSize: "1.75rem", marginBottom: "1rem",
      display: "block",
    },
    whyTitle: { fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.5rem", color: "#f0ece4" },
    whyText: { fontSize: "0.83rem", color: "rgba(232,228,220,0.55)", lineHeight: 1.65 },
    // SERVICES
    serviceSection: { background: "#0f1623" },
    serviceCard: {
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: "0", borderRadius: "18px", overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.07)",
      marginBottom: "1.5rem",
    },
    serviceImg: { width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: "280px" },
    serviceBody: { padding: "2.5rem 2rem", background: "#131d2e" },
    serviceIcon: { fontSize: "1.5rem", marginBottom: "0.5rem", display: "block" },
    serviceCardTitle: { fontFamily: "'Bebas Neue', cursive", fontSize: "1.8rem", color: "#f0ece4", lineHeight: 1, marginBottom: "0.25rem" },
    serviceCardSub: { fontSize: "0.78rem", color: "#e8580a", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem" },
    serviceDesc: { fontSize: "0.87rem", color: "rgba(232,228,220,0.6)", lineHeight: 1.7, marginBottom: "1.25rem" },
    serviceList: { listStyle: "none", padding: 0 },
    serviceListItem: {
      fontSize: "0.83rem", color: "rgba(232,228,220,0.75)",
      padding: "0.35rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
      display: "flex", alignItems: "center", gap: "0.5rem",
    },
    // REVIEWS
    reviewSection: { background: "#131d2e", borderTop: "1px solid rgba(232,228,220,0.06)" },
    ratingRow: { display: "flex", gap: "2.5rem", marginTop: "1.5rem", marginBottom: "3rem", flexWrap: "wrap" },
    ratingBlock: { display: "flex", alignItems: "center", gap: "0.75rem" },
    ratingNum: { fontFamily: "'Bebas Neue', cursive", fontSize: "3.5rem", color: "#f0ece4", lineHeight: 1 },
    ratingStars: { color: "#d4a017", fontSize: "1rem", marginBottom: "2px" },
    ratingSource: { fontSize: "0.73rem", color: "rgba(232,228,220,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" },
    reviewsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" },
    reviewCard: {
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "14px", padding: "1.5rem",
    },
    reviewStars: { color: "#d4a017", fontSize: "0.85rem", marginBottom: "0.75rem" },
    reviewText: { fontFamily: "'Lora', serif", fontSize: "0.9rem", color: "rgba(232,228,220,0.8)", lineHeight: 1.7, marginBottom: "1rem", fontStyle: "italic" },
    reviewAuthor: { fontSize: "0.75rem", fontWeight: 700, color: "rgba(232,228,220,0.35)", textTransform: "uppercase", letterSpacing: "1px" },
    reviewLink: { marginTop: "2rem", textAlign: "center" },
    reviewLinkA: { color: "#e8580a", fontSize: "0.85rem", fontWeight: 700, textDecoration: "none" },
    // ABOUT
    aboutSection: {
      background: "#0f1623", borderTop: "1px solid rgba(232,228,220,0.06)",
    },
    aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" },
    aboutImg: { borderRadius: "16px", overflow: "hidden", position: "relative" },
    aboutImgEl: { width: "100%", display: "block", objectFit: "cover", aspectRatio: "4/3" },
    aboutImgOverlay: {
      position: "absolute", bottom: 0, left: 0, right: 0,
      background: "linear-gradient(0deg, rgba(15,22,35,0.8) 0%, transparent 60%)",
      padding: "1.5rem",
    },
    aboutImgLabel: { color: "rgba(232,228,220,0.9)", fontSize: "0.8rem", fontWeight: 600 },
    aboutText: {},
    aboutP: { color: "rgba(232,228,220,0.65)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "1rem" },
    aboutPStrong: { color: "#f0ece4", fontWeight: 700 },
    // CONTACT
    contactSection: { background: "#131d2e", borderTop: "1px solid rgba(232,228,220,0.06)" },
    contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginTop: "3rem", alignItems: "start" },
    infoList: { listStyle: "none", padding: 0, marginBottom: "2rem" },
    infoItem: {
      display: "flex", alignItems: "flex-start", gap: "1rem",
      padding: "1rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
      color: "rgba(232,228,220,0.8)", fontSize: "0.88rem",
    },
    infoLabel: { color: "rgba(232,228,220,0.35)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", minWidth: "80px", paddingTop: "2px" },
    hoursOpen: { color: "#4ade80", fontWeight: 600 },
    hoursClosed: { color: "rgba(232,228,220,0.25)" },
    mapPlaceholder: {
      borderRadius: "14px", overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.02)",
    },
    mapIframe: { width: "100%", height: "360px", border: "none", display: "block", filter: "grayscale(60%) invert(90%) hue-rotate(180deg)" },
    btnPrimary: {
      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
      background: "#e8580a", color: "#fff",
      fontSize: "0.95rem", fontWeight: 700,
      padding: "0.9rem 1.75rem", borderRadius: "9px",
      border: "none", cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      width: "100%", marginBottom: "0.75rem",
      boxShadow: "0 0 30px rgba(232,88,10,0.2)",
    },
    btnSecondary: {
      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
      background: "transparent", color: "rgba(232,228,220,0.75)",
      fontSize: "0.9rem", fontWeight: 500,
      padding: "0.85rem 1.75rem", borderRadius: "9px",
      border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      width: "100%",
    },
    // FOOTER
    footer: {
      background: "#080e18", borderTop: "2px solid #e8580a",
      padding: "2.5rem 2rem 2rem", textAlign: "center",
    },
    footerLogo: { fontFamily: "'Bebas Neue', cursive", fontSize: "1.4rem", color: "#fff", letterSpacing: "1px" },
    footerAddr: { color: "rgba(232,228,220,0.35)", fontSize: "0.78rem", marginTop: "0.3rem" },
    footerLinks: { display: "flex", justifyContent: "center", gap: "2rem", margin: "1rem 0" },
    footerLink: { color: "rgba(232,228,220,0.4)", fontSize: "0.78rem", textDecoration: "none" },
    footerCopy: { color: "rgba(232,228,220,0.2)", fontSize: "0.7rem", marginTop: "0.75rem" },
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />

      <div style={styles.root}>

        {/* NAV */}
        <nav style={styles.nav}>
          <motion.div style={styles.logo} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            Autoservis<br /><span style={styles.logoAccent}>Richard Topinka</span>
          </motion.div>
          <motion.div style={styles.navLinks} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
            {["sluzby", "vyhody", "recenze", "onas", "kontakt"].map((id, i) => (
              <motion.button key={id} style={styles.navLink} onClick={() => scrollTo(id)} whileHover={{ color: "#fff" }}>
                {["Služby", "Proč my", "Recenze", "O nás", "Kontakt"][i]}
              </motion.button>
            ))}
            <motion.button
              style={styles.navCta}
              onClick={() => window.open("tel:+420377385154")}
              whileHover={{ background: "#ff6b1a", scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              📞 +420 377 385 154
            </motion.button>
          </motion.div>
        </nav>

        {/* HERO */}
        <section style={styles.hero} id="hero">
          <motion.div style={{ ...styles.heroBg, y: heroY }}>
            <img src={UNSPLASH.hero} alt="Autoservis dílna" style={styles.heroBgImg} />
            <div style={styles.heroOverlay} />
          </motion.div>

          <motion.div style={{ ...styles.heroContent, opacity: heroOpacity }}>
            <motion.div style={styles.heroBadge} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              🏆 Hodnocení 4,9/5 · Plzeň Skvrňany
            </motion.div>

            <motion.h1 style={styles.heroH1} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              Váš spolehlivý<br />autoservis<br />v <span style={styles.heroAccent}>Plzni.</span>
            </motion.h1>

            <motion.p style={styles.heroSub} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}>
              Opravujeme vozidla všech značek a důkladně připravíme váš vůz na STK. Rychle, poctivě a za férovou cenu.
            </motion.p>

            <motion.div style={styles.heroTrust} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              {["⭐ 4,9/5 Firmy.cz", "⭐ 4,7/5 Google (113 recenzí)", "🔧 Všechny značky", "⚡ Bleskové opravy"].map(t => (
                <div key={t} style={styles.trustItem}>{t}</div>
              ))}
            </motion.div>

            <motion.button
              style={styles.heroCta}
              onClick={() => window.open("tel:+420377385154")}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 60px rgba(232,88,10,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              📞 Zavolat a domluvit termín
            </motion.button>
          </motion.div>

          <motion.div style={styles.heroScroll}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>↓</motion.div>
            <span>Scrollovat</span>
          </motion.div>
        </section>

        {/* WHY */}
        <div style={styles.whySection} id="vyhody">
          <div style={styles.section}>
            <AnimatedSection>
              <div style={styles.sectionLabel}>Proč si vybrat nás</div>
              <h2 style={styles.sectionTitle}>Co říkají zákazníci –<br />a proč se k nám vrací</h2>
              <p style={styles.sectionPerex}>Nejsme anonymní servisní centrum. Jsme rodinný autoservis v Plzni se skutečnou péčí o zákazníka.</p>
            </AnimatedSection>
            <StaggerChildren style={styles.whyGrid}>
              {whyItems.map((item) => (
                <motion.div key={item.title} style={styles.whyCard} variants={fadeUp}
                  whileHover={{ y: -5, borderColor: "rgba(232,88,10,0.3)", background: "rgba(232,88,10,0.04)" }}
                  transition={{ duration: 0.25 }}
                >
                  <span style={styles.whyIcon}>{item.icon}</span>
                  <div style={styles.whyTitle}>{item.title}</div>
                  <div style={styles.whyText}>{item.text}</div>
                </motion.div>
              ))}
            </StaggerChildren>
          </div>
        </div>

        {/* SERVICES */}
        <div style={styles.serviceSection} id="sluzby">
          <div style={styles.section}>
            <AnimatedSection>
              <div style={styles.sectionLabel}>Naše služby</div>
              <h2 style={styles.sectionTitle}>Co pro vás uděláme</h2>
              <p style={{ ...styles.sectionPerex, marginBottom: "3rem" }}>Ať váš vůz potřebuje cokoliv – jsme tu pro všechny značky a modely.</p>
            </AnimatedSection>
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <motion.div style={{
                  ...styles.serviceCard,
                  gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                }}
                  whileHover={{ borderColor: "rgba(232,88,10,0.25)" }}
                >
                  {i % 2 === 0 ? (
                    <>
                      <div><img src={s.img} alt={s.title} style={styles.serviceImg} /></div>
                      <div style={styles.serviceBody}>
                        <span style={styles.serviceIcon}>{s.icon}</span>
                        <div style={styles.serviceCardTitle}>{s.title}</div>
                        <div style={styles.serviceCardSub}>{s.subtitle}</div>
                        <p style={styles.serviceDesc}>{s.desc}</p>
                        <ul style={styles.serviceList}>
                          {s.list.map(li => <li key={li} style={styles.serviceListItem}><span style={{ color: "#e8580a" }}>✓</span>{li}</li>)}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={styles.serviceBody}>
                        <span style={styles.serviceIcon}>{s.icon}</span>
                        <div style={styles.serviceCardTitle}>{s.title}</div>
                        <div style={styles.serviceCardSub}>{s.subtitle}</div>
                        <p style={styles.serviceDesc}>{s.desc}</p>
                        <ul style={styles.serviceList}>
                          {s.list.map(li => <li key={li} style={styles.serviceListItem}><span style={{ color: "#e8580a" }}>✓</span>{li}</li>)}
                        </ul>
                      </div>
                      <div><img src={s.img} alt={s.title} style={styles.serviceImg} /></div>
                    </>
                  )}
                </motion.div>
              </AnimatedSection>
            ))}
            <AnimatedSection>
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <motion.button style={{ ...styles.btnPrimary, width: "auto", padding: "1rem 2.5rem" }}
                  onClick={() => window.open("tel:+420377385154")}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(232,88,10,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  📞 Zavolat a domluvit termín
                </motion.button>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* REVIEWS */}
        <div style={styles.reviewSection} id="recenze">
          <div style={styles.section}>
            <AnimatedSection>
              <div style={styles.sectionLabel}>Recenze zákazníků</div>
              <h2 style={styles.sectionTitle}>Co o nás říkají<br />naši zákazníci</h2>
              <div style={styles.ratingRow}>
                {[["4,9", "Firmy.cz"], ["4,7", "Google (113)"]].map(([n, s]) => (
                  <div key={s} style={styles.ratingBlock}>
                    <div style={styles.ratingNum}>{n}</div>
                    <div>
                      <div style={styles.ratingStars}>★★★★★</div>
                      <div style={styles.ratingSource}>{s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <StaggerChildren style={styles.reviewsGrid}>
              {reviews.map((r) => (
                <motion.div key={r.name} style={styles.reviewCard} variants={fadeUp}
                  whileHover={{ y: -4, borderColor: "rgba(212,160,23,0.3)" }}
                >
                  <div style={styles.reviewStars}>{"★".repeat(r.stars)}</div>
                  <p style={styles.reviewText}>„{r.text}"</p>
                  <div style={styles.reviewAuthor}>{r.name}</div>
                </motion.div>
              ))}
            </StaggerChildren>
            <div style={styles.reviewLink}>
              <a href="https://www.firmy.cz/detail/256850-autoservis-richard-topinka-plzen-skvrnany.html" target="_blank" style={styles.reviewLinkA}>
                📋 Přečíst všechny recenze na Firmy.cz →
              </a>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div style={styles.aboutSection} id="onas">
          <div style={styles.section}>
            <div style={styles.aboutGrid}>
              <AnimatedSection delay={0}>
                <div style={styles.aboutImg}>
                  <img src={UNSPLASH.workshop} alt="Dílna autoservisu" style={styles.aboutImgEl} />
                  <div style={styles.aboutImgOverlay}>
                    <div style={styles.aboutImgLabel}>🔧 Autoservis Richard Topinka · Plzeň Skvrňany</div>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.15}>
                <div style={styles.aboutText}>
                  <div style={styles.sectionLabel}>O nás</div>
                  <h2 style={styles.sectionTitle}>Za každým autem<br />stojí člověk.</h2>
                  <p style={styles.aboutP}>Autoservis Richard Topinka není anonymní servisní řetězec. Jsme rodinný podnik v Plzni Skvrňanech, kde se každý zákazník zná jménem.</p>
                  <p style={styles.aboutP}><strong style={styles.aboutPStrong}>Pan Topinka</strong> do svého řemesla vkládá vášeň a letité zkušenosti – stará se o to, aby každá oprava byla provedena poctivě a na první dobrou.</p>
                  <p style={styles.aboutP}>Na recepci vás přivítá <strong style={styles.aboutPStrong}>paní Gábina</strong>, která se postará o hladkou komunikaci, vysvětlí vám co a jak a domluví termín.</p>
                  <motion.button
                    style={{ ...styles.btnPrimary, marginTop: "0.5rem", width: "auto", display: "inline-flex" }}
                    onClick={() => window.open("tel:+420377385154")}
                    whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(232,88,10,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    📞 Zavolat: +420 377 385 154
                  </motion.button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div style={styles.contactSection} id="kontakt">
          <div style={styles.section}>
            <AnimatedSection>
              <div style={styles.sectionLabel}>Kontakt</div>
              <h2 style={styles.sectionTitle}>Přijeďte nebo zavolejte –<br />jsme tu pro vás</h2>
            </AnimatedSection>
            <div style={styles.contactGrid}>
              <AnimatedSection delay={0.1}>
                <ul style={styles.infoList}>
                  <li style={styles.infoItem}>
                    <span style={styles.infoLabel}>📍 Adresa</span>
                    <span>Nade Mží 1108/15<br />318 00 Plzeň – Skvrňany (Plzeň 3)</span>
                  </li>
                  <li style={styles.infoItem}>
                    <span style={styles.infoLabel}>📞 Telefon</span>
                    <a href="tel:+420377385154" style={{ color: "#e8580a", fontWeight: 700, textDecoration: "none" }}>+420 377 385 154</a>
                  </li>
                  <li style={styles.infoItem}>
                    <span style={styles.infoLabel}>🕐 Otevírací<br />doba</span>
                    <span>
                      <div>Po – Pá: <span style={styles.hoursOpen}>7:30 – 16:00</span></div>
                      <div>Sobota: <span style={styles.hoursClosed}>Zavřeno</span></div>
                      <div>Neděle: <span style={styles.hoursClosed}>Zavřeno</span></div>
                    </span>
                  </li>
                </ul>
                <motion.button style={styles.btnPrimary} onClick={() => window.open("tel:+420377385154")}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(232,88,10,0.35)" }} whileTap={{ scale: 0.97 }}>
                  📞 Zavolat a domluvit termín
                </motion.button>
                <motion.button style={styles.btnSecondary}
                  onClick={() => window.open("https://maps.google.com/?q=Nade+Mzi+1108/15,+Plzen")}
                  whileHover={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>
                  🗺️ Zobrazit trasu v Google Maps
                </motion.button>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div style={styles.mapPlaceholder}>
                  <iframe
                    title="Mapa autoservisu"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2574.2!2d13.3574!3d49.7408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470af1f0b0a0a0a1%3A0x1!2sNade+M%C5%BEi+1108%2F15%2C+318+00+Plze%C5%88!5e0!3m2!1scs!2scz!4v1"
                    style={styles.mapIframe}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <motion.div style={styles.footerLogo} whileHover={{ color: "#e8580a" }}>
            Autoservis <span style={{ color: "#e8580a" }}>Richard Topinka</span>
          </motion.div>
          <div style={styles.footerAddr}>Nade Mží 1108/15, 318 00 Plzeň – Skvrňany &nbsp;|&nbsp; +420 377 385 154</div>
          <div style={styles.footerLinks}>
            <a href="https://www.firmy.cz/detail/256850-autoservis-richard-topinka-plzen-skvrnany.html" target="_blank" style={styles.footerLink}>Firmy.cz profil</a>
            <a href="#recenze" style={styles.footerLink} onClick={e => { e.preventDefault(); scrollTo("recenze"); }}>Recenze zákazníků</a>
            <a href="#kontakt" style={styles.footerLink} onClick={e => { e.preventDefault(); scrollTo("kontakt"); }}>Kontakt</a>
          </div>
          <div style={styles.footerCopy}>© 2025 Autoservis Richard Topinka. Všechna práva vyhrazena.</div>
        </footer>

      </div>
    </>
  );
}

