import { CONTACT } from "../data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-stripe" aria-hidden="true" />
      <div className="container footer-inner">
        <div className="footer-brand" aria-hidden="true">
          AUTOSERVIS TOPINKA
        </div>
        <div className="footer-cols">
          <div>
            <div className="footer-col-title">Autoservis Topinka · STK & Emise</div>
            <p className="footer-text">
              {CONTACT.addressLine1}
              <br />
              {CONTACT.addressLine2}
            </p>
            <a href={CONTACT.phoneHref} className="footer-phone">
              {CONTACT.phone}
            </a>
          </div>
          <div>
            <div className="footer-col-title">Na webu</div>
            <ul className="footer-links">
              {[
                ["sluzby", "Služby"],
                ["cenik", "Ceník"],
                ["kalkulacka", "Kalkulačka termínu STK"],
                ["objednani", "Objednání online"],
                ["radce", "Rádce"],
                ["faq", "Časté dotazy"],
              ].map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Hodnocení</div>
            <ul className="footer-links">
              <li>
                <a href={CONTACT.firmyUrl} target="_blank" rel="noreferrer">
                  Profil na Firmy.cz
                </a>
              </li>
              <li>
                <a href="#recenze">Recenze zákazníků</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Autoservis Topinka · Plzeň. Všechna práva vyhrazena.</span>
          <span className="footer-note">Ceny v ceníku jsou orientační.</span>
        </div>
      </div>
    </footer>
  );
}
