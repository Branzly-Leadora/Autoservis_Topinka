# STK Topinka – Stanice technické kontroly Plzeň

Moderní jednostránkový web stanice technické kontroly (STK) postavený na Reactu
a framer-motion. Tmavý „carbon“ design se signální zelenou, plný animací:
preloader, particle síť v hero sekci, parallax, běžící pás, 3D tilt karty,
scrollem dokreslovaná časová osa, animovaný ceník se záložkami, karusel recenzí
a FAQ akordeon.

## Struktura

- `src/data.js` – veškerý obsah webu (texty, ceník, kroky, FAQ, kontakty).
  Úpravy obsahu dělejte zde.
- `src/components/` – jednotlivé sekce webu (Hero, Services, Process, Pricing,
  Checklist, Reviews, Faq, Contact, Footer) a sdílené animační prvky (`ui.jsx`).
- `src/App.css` – design systém (barvy, typografie, animace, responzivita).

> Ceny v `PRICING_TABS` jsou orientační – před spuštěním webu je potvrďte
> s provozovatelem stanice.

## Skripty

V adresáři projektu:

### `npm start`

Spustí vývojový server na [http://localhost:3000](http://localhost:3000).

### `npm test`

Spustí testy (Jest + Testing Library).

### `npm run build`

Vytvoří produkční build do složky `build`.

---

Projekt byl založen pomocí [Create React App](https://github.com/facebook/create-react-app).
