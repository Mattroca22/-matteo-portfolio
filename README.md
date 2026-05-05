# Matteo Rodriguez — Portfolio

Portafolio personal construido con **React + Vite**.  
Bilingüe (ES / EN) con switch de idioma integrado.

---

## Colombia Basic Basket Price Monitor

**Monitor de Precios** — pipeline ETL automatizado que obtiene datos del API abierto del Gobierno de Colombia (**Socrata / Datos Abiertos**), agrega precios por producto y alimenta un panel en React.

### Description

Automated ETL pipeline that fetches data from the Colombian Government open data API (Socrata), processes it with **Pandas**, exports `public/data_prices.json`, and renders **KPI cards** plus a **Top 10 bar chart** (Recharts) in the portfolio publication view.

### Tech stack

| Layer | Technology |
|--------|------------|
| Data / ETL | **Python** (Pandas), `scripts/get_prices.py` |
| Visualization | **React** (Recharts), `src/components/MonitorPreciosDashboard.jsx` |
| Automation | **GitHub Actions** — `.github/workflows/update_data.yml` (scheduled refresh + commit) |

### Key insights *(placeholder — add your 3 bullets)*

1. _(Insight 1 — e.g. price dispersion across products in the latest slice.)_
2. _(Insight 2 — e.g. how often the “top 10” composition changes week over week.)_
3. _(Insight 3 — e.g. caveats: geography, sample size, canasta definition.)_

### Local data refresh

```bash
pip install -r requirements.txt
python scripts/get_prices.py
```

### Scheduled update (GitHub)

On **Mondays at 08:00 UTC**, the workflow runs the script and pushes `public/data_prices.json` when it changes. You can also run it manually from the Actions tab (**workflow_dispatch**).

---

## Stack

- React 18
- Vite 5
- CSS vanilla (sin frameworks)
- Google Fonts: Space Mono + Syne

## Desarrollo local

```bash
npm install
npm run dev
```

## Build para producción (subir a hosting)

```bash
npm install
npm run build
```

Esto genera una carpeta `/dist` con archivos estáticos listos para subir.

## Deploy en tu hosting (cPanel / File Manager)

1. Corre `npm run build`
2. Abre tu cPanel → File Manager → `public_html`
3. Sube **todo el contenido** de la carpeta `dist/`
4. ¡Listo!

## Deploy en GitHub Pages (gratis)

```bash
npm install gh-pages --save-dev
```

Agrega en `package.json`:
```json
"homepage": "https://TU_USUARIO.github.io/matteo-portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Luego:
```bash
npm run deploy
```

## Deploy en Netlify (más fácil — drag & drop)

1. Corre `npm run build`
2. Ve a [netlify.com](https://netlify.com)
3. Arrastra la carpeta `dist/` al dashboard
4. URL pública instantánea ✓
