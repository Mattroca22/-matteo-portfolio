# Matteo Rodriguez — Portfolio

Portafolio personal construido con **React + Vite**.  
Bilingüe (ES / EN) con switch de idioma integrado.

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
