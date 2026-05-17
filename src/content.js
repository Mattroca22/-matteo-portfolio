export const content = {
  en: {
    navLinks: ['Pitch', 'Skills', 'Experience', 'Projects', 'Contact'],
    heroTag: 'Data Analyst · Data Engineer · Full Stack Developer',
    heroDesc: 'Transforming complex data into decisions that drive real impact. Specialized in health analytics, ETL pipelines, and full stack development for operations and clinical environments.',
    cta1: 'Get in Touch', cta2: 'View Projects',
    statsLabels: ['Years Experience', 'Time Saved', 'Asset Loss Reduced', 'DDD Reduction', 'Languages'],
    pitchTag: '// 00 — Why Hire Me', pitchTitle: 'The Pitch',
    pitchHeadline: 'You have data.\nYou need decisions.',
    pitchDesc: "Most businesses sit on raw data that nobody's turning into insight. I close that gap — building pipelines that clean and centralize your data, dashboards your team will actually use, and automations that cut manual work entirely. I've done it inside hospital systems and health operations. I can do it for you.",
    pitchCards: [
      { icon: '⚙', title: 'Data Engineer', desc: 'ETL pipelines, PostgreSQL, Power Automate. Your data, clean and centralized.' },
      { icon: '📊', title: 'Data Analyst', desc: 'Power BI, Tableau, R, Python. Insights your executives can act on.' },
      { icon: '🌐', title: 'Full Stack Dev', desc: 'React, TypeScript, SQL. Custom modules built around your workflow.' },
    ],
    s1tag: '// 01 — Capabilities', s1title: 'Technical Stack',
    s2tag: '// 02 — Track Record', s2title: 'Experience',
    s3tag: '// 03 — Built Things', s3title: 'Projects',
    vizTitle: 'Top 10 products by average price',
    projectVizOrg: 'Python · Pandas · Recharts · datos.gov.co',
    projectVizSummary:
      'Exploring Colombia open data with a small Python → JSON pipeline and an interactive bar chart in React.',
    projectVizDetail: `This write-up walks through a reproducible workflow: pulling the latest rows from Datos Abiertos Colombia (Socrata), shaping price fields with Pandas, exporting a static JSON artifact for the web, and visualizing the Top 10 highest average prices by Producto.

The goal is to mirror how I communicate analytical work in production: clear sourcing, explicit transformations, and a chart people can read without guessing the axes or units.

All values are shown in COP; the figure updates whenever you regenerate public/data_prices.json.`,
    projectVizImpact: 'Live JSON · Top 10 · sorted by precio_promedio',
    projectChartCaption:
      'Bars rank products by mean precio_promedio on the pulled slice; tooltip shows the formatted COP average.',
    vizMetaLeft: 'Sorted by precio_promedio · descending',
    vizMetaRight: 'Recharts · ResponsiveContainer',
    publicationOpen: 'Open publication',
    publicationClose: 'Close',
    carouselPrev: 'Previous',
    carouselNext: 'Next',
    carouselDotGoTo: 'Go to slide',
    s4tag: '// 04 — Contact', s4title: "Let's Talk",
    avail: 'Available for freelance projects',
    contactDesc: "Need a data analyst, engineer, or developer who understands the business side too? Let's build something that actually moves the needle.",
    contactTabChannels: 'Direct',
    contactTabForm: 'Contact Form',
    formName: 'Name',
    formEmail: 'Email',
    formMessage: 'Message',
    formSubmit: 'Send message',
    formSending: 'Sending...',
    formSuccess: "Thanks - I'll get back to you soon.",
    formError: 'Could not send. Please try again or use the email link.',
    formHintNoKey: 'Add VITE_WEB3FORMS_ACCESS_KEY in a .env file (free at web3forms.com) to send from this page. Otherwise we open your email app with the message prefilled.',
    cta3: '→ Start a Project',
    jobs: [
      { period: 'Sep 2025 — Present', role: 'Product Manager', co: 'Sehma B&B Holding · Home Health Care · Medellin',
        bullets: ['Designed and maintained <hl>data models + ETL processes</hl> to centralize operational information.','Built dashboards with KPIs focused on operations, conversion, and quality.','Automated reporting workflows through programming, <hl>reducing manual errors</hl> significantly.'] },
      { period: 'Oct 2024 — Mar 2025', role: 'Regional Support Professional', co: 'Hospital Alma Mater de Antioquia · Medellin',
        bullets: ['Managed <hl>geospatial data with ArcGIS</hl> to identify critical zones for public health interventions.','Produced periodic technical reports for regional epidemiological surveillance programs.','Consolidated multi-source data into reports directed at executive teams.'] },
      { period: 'Jan 2022 — Sep 2024', role: 'Health Information Analyst', co: 'Hospital Alma Mater de Antioquia · Medellin',
        bullets: ['Analyzed epidemiological and hospital data to support <hl>strategic institutional decision-making</hl>.','Designed automated Power BI reports achieving <hl>30% reduction in processing time</hl>.','Managed public health databases and regulatory reports submitted to the Ministry of Health.'] },
    ],
    projects: [
      {
        slug: 'proa',
        num: '01 / 2023',
        title: 'Antimicrobial Stewardship Program (PROA)',
        org: 'Hospital Alma Mater de Antioquia',
        tech: 'React · JavaScript · SQL · Clinical integrations',
        summary: 'Web module for infectology: antibiotic dispensing control linked to resistance surveillance.',
        detail: `Clinical stakeholders needed one place to reconcile dispensing decisions with microbiology signals — without adding manual spreadsheets to someone's Friday afternoon.

        The module focused on practical guardrails: traceable audit trails, role-aware views for physicians vs pharmacy, and exports that fit existing infection-committee workflows.

        Quantifying stewardship impact is never perfect, but we tracked Defined Daily Doses (DDD) alongside resistance alerts to show whether interventions were sticking.`,
        impact: '↓ 12% Reduction in Defined Daily Doses (DDD)',
      },
      {
        slug: "automotive-market-api",
        num: "02 / 2024",
        title: "Automotive Safety & Market Analytics",
        org: "Public Sector Data Pipeline",
        tech: "Python · REST APIs · Pandas · Interactive SVG",
        summary: "Automated ETL pipeline that consumes live federal automotive data via REST APIs, rendering analytical metrics for executive market oversight.",
        detail: `This project implements a fully automated data pipeline in Python that connects to public transportation safety APIs. It ingests, cleans, and structures complex manufacturing and sales metrics into high-fidelity JSON feeds.

        The dashboard leverages this pipeline to show historical top-selling models, live market share distributions, and geographic regional sales density mapped on a real interactive SVG layout. This allows decision-makers to analyze cross-regional volume trends dynamically without underlying API overhead.`,
        impact: "100% Automated Ingestion · Multi-dimensional Analytics",
      },
      {
        slug: 'warehouse-supply',
        num: '03 / 2021',
        title: 'Infrastructure Warehouse Supply Control',
        org: 'Hospital Alma Mater de Antioquia',
        tech: 'Web stack · SQL · Inventory workflows',
        summary: 'Administrative module for entries/exits, stock levels, and fewer unexplained variances.',
        detail: `Infrastructure teams were losing time reconciling paper trails with what the warehouse actually held on any given week.

        We automated the operational backbone: capture at the door, simple validations at posting time, and dashboards that made discrepancies visible early instead of at quarter close.

        The emphasis was reliability over novelty — fewer surprises for finance and faster answers when leadership asked "where did it go?".`,
        impact: '↓ 45% Reduction in Asset Losses',
      },
      {
        slug: 'clasificador-riesgo',
        num: '04 / 2025',
        title: 'Chronic Patient Risk Classifier',
        org: 'Portfolio · ML · Health Analytics',
        tech: 'Python · XGBoost · SHAP · scikit-learn · FastAPI · Streamlit',
        summary: 'XGBoost model that stratifies chronic patients (HTN, DM2, COPD, CKD) into risk tiers with SHAP explainability built in.',
        detail: `Clinical risk stratification matters most when it's explainable — not just a black box score.

        The model ingests 12 clinical-administrative variables (diagnosis, age, comorbidities, adherence, missed controls, prior hospitalizations, geography) and produces a 0–100 risk score with SHAP-based feature attribution.

        Built on synthetic but clinically coherent data generated with Faker. Deployed as a Streamlit UI backed by a FastAPI inference endpoint. Reproducible from a single requirements.txt.`,
        impact: '87% accuracy · AUC-ROC 0.91 · 12 clinical variables',
      },
      {
        slug: 'executive-kpi',
        num: '05 / 2024',
        title: 'Executive KPI pack (Power BI)',
        org: 'Sehma B&B Holding · Medellin',
        tech: 'Power BI · DAX · SQL · KPI modeling',
        summary: 'Executive drill-through on occupancy, margin, and quality — built for a weekly leadership rhythm.',
        detail: `Executives were getting monthly PDFs that were polished — and already stale.

        We rebuilt the narrative around weekly touchpoints: one semantic model, consistent definitions for margin and occupancy, and drill paths that respect role boundaries.

        The win wasn't "more charts"; it was fewer debates about definitions and more time spent deciding what to change next week.`,
        impact: '↑ Weekly exec touchpoints vs monthly PDFs',
      },
      {
        slug: 'etl-contracts',
        num: '06 / 2024',
        title: 'ETL hardening & data contracts',
        org: 'Freelance · Health operations',
        tech: 'Python · SQL · dbt-style checks · Documentation',
        summary: 'Lightweight validation on landing-zone tables before BI — assumptions documented for audits.',
        detail: `When BI sits on messy landing zones, analysts become accidental firefighters.

        I implemented lightweight row-level checks (freshness, keys, impossible combinations) and paired them with short "data contract" notes: what a column means, who owns it, and what "good" looks like.

        The objective was defensibility: when a dashboard looks wrong, you can answer whether it's the metric — or the feed.`,
        impact: '↓ Invalid rows caught at source',
      },
      {
        slug: 'forecast-rd',
        num: '07 / R&D',
        title: 'Forecasting experiments (Python)',
        org: 'Personal',
        tech: 'Python · pandas · statsmodels · Prophet',
        summary: 'ARIMA / Prophet prototypes on operational series — reproducible notebooks and model cards.',
        detail: `This is an R&D lane: compare baseline seasonal models against Prophet-style approaches on the same operational signals, with honest error reporting.

        Every experiment gets a tiny model card — data span, transforms, and what would need to change before production.

        It's not "AI magic"; it's disciplined iteration with measurable uncertainty.`,
        impact: 'MAPE benchmarks · WIP',
      },
      {
        slug: 'clasificador-riesgo-pipeline',
        num: '08 / ML',
        title: 'Cardiovascular Risk Predictive Pipeline',
        org: 'Clinical AI Research',
        tech: 'Python · Scikit-Learn · XGBoost · FastAPI',
        summary: 'End-to-end Machine Learning pipeline in Python classifying high-risk cardiac patients using public CDC health indicators, optimized to minimize false negatives.',
        detail: `A rigorous Machine Learning workflow built entirely in Python to address a critical healthcare challenge: early stratification of cardiovascular risk. Using public CDC health datasets (+300k records), I engineered a data pipeline that handles missing medical entries, balances class disparities, and trains an optimized XGBoost classifier.

        The model explicitly targets high Sensitivity/Recall (94.2%) because in healthcare, a false negative (missing a high-risk patient) is far more dangerous than a false positive. 

        The entire training pipeline is documented inside structured Python scripts following industry standards, featuring automated evaluation tracking and global feature importance extraction via SHAP values.`,
        impact: '94.2% Recall · 0.0% Critical False Negatives during validation',
      },
    ],
    footer1: '© 2025 Matteo Rodriguez Carmona', footer2: 'Data Analyst · Data Engineer · Full Stack Dev',
  },
  es: {
    navLinks: ['Pitch', 'Habilidades', 'Experiencia', 'Proyectos', 'Contacto'],
    heroTag: 'Analista de Datos · Data Engineer · Full Stack Developer',
    heroDesc: 'Transformo datos complejos en decisiones que generan impacto real. Especializado en analítica de salud, pipelines ETL y desarrollo full stack para entornos operativos y clínicos.',
    cta1: 'Contáctame', cta2: 'Ver Proyectos',
    statsLabels: ['Años de Experiencia', 'Tiempo Ahorrado', 'Reducción de Pérdidas', 'Reducción DDD', 'Idiomas'],
    pitchTag: '// 00 — Por qué contratarme', pitchTitle: 'El Pitch',
    pitchHeadline: 'Tienes datos.\nNecesitas decisiones.',
    pitchDesc: 'La mayoría de las empresas tienen datos sin procesar que nadie convierte en información útil. Yo cierro esa brecha — construyo pipelines que limpian y centralizan tus datos, dashboards que tu equipo realmente usa, y automatizaciones que eliminan el trabajo manual. Lo he hecho en hospitales y salud domiciliaria. Puedo hacerlo para ti.',
    pitchCards: [
      { icon: '⚙', title: 'Data Engineer', desc: 'Pipelines ETL, PostgreSQL, Power Automate. Tus datos, centralizados y limpios.' },
      { icon: '📊', title: 'Analista de Datos', desc: 'Power BI, Tableau, R, Python. Insights accionables para tus directivos.' },
      { icon: '🌐', title: 'Full Stack Dev', desc: 'React, TypeScript, SQL. Módulos a medida construidos para tu operación.' },
    ],
    s1tag: '// 01 — Capacidades', s1title: 'Stack Técnico',
    s2tag: '// 02 — Trayectoria', s2title: 'Experiencia',
    s3tag: '// 03 — Lo que he construido', s3title: 'Proyectos',
    vizTitle: 'Top 10 productos por precio promedio',
    projectVizOrg: 'Python · Pandas · Recharts · datos.gov.co',
    projectVizSummary:
      'Exploración de datos abiertos con un flujo Python → JSON y un gráfico interactivo en React.',
    projectVizDetail: `Esta publicación describe un flujo reproducible: descargar las últimas filas desde Datos Abiertos Colombia (Socrata), limpiar y tipificar precios con Pandas, exportar un JSON estático para la web y visualizar el Top 10 de mayores precios promedio por Producto.

    La idea es reflejar cómo comunico trabajo analítico "de verdad": fuente explícita, transformaciones claras y un gráfico que se entiende sin adivinar ejes o unidades.

    Los valores están en COP; la figura se actualiza cuando regeneras public/data_prices.json.`,
    projectVizImpact: 'JSON en vivo · Top 10 · orden por precio_promedio',
    projectChartCaption:
      'Las barras ordenan productos por precio_promedio medio en el slice consultado; el tooltip muestra el promedio formateado en COP.',
    vizMetaLeft: 'Ordenado por precio_promedio · descendente',
    vizMetaRight: 'Recharts · ResponsiveContainer',
    publicationOpen: 'Ver publicación',
    publicationClose: 'Cerrar',
    carouselPrev: 'Anterior',
    carouselNext: 'Siguiente',
    carouselDotGoTo: 'Ir a la diapositiva',
    s4tag: '// 04 — Contacto', s4title: 'Hablemos',
    avail: 'Disponible para proyectos freelance',
    contactDesc: '¿Necesitas un analista, ingeniero de datos o desarrollador que entienda el negocio? Construyamos algo que realmente marque la diferencia.',
    contactTabChannels: 'Directo',
    contactTabForm: 'Contact Form',
    formName: 'Nombre',
    formEmail: 'Correo',
    formMessage: 'Mensaje',
    formSubmit: 'Enviar mensaje',
    formSending: 'Enviando...',
    formSuccess: 'Gracias - te respondo pronto.',
    formError: 'No se pudo enviar. Intenta de nuevo o usa el enlace de correo.',
    formHintNoKey: 'Agrega VITE_WEB3FORMS_ACCESS_KEY en un archivo .env (gratis en web3forms.com) para enviar desde esta pagina. Si no, abrimos tu app de correo con el mensaje listo.',
    cta3: '→ Iniciar Proyecto',
    jobs: [
      { period: 'Ene 2022 — Sep 2024', role: 'Analista de Información en Salud', co: 'Hospital Alma Mater de Antioquia · Medellín',
        bullets: ['Analicé datos epidemiológicos y hospitalarios para apoyar <hl>decisiones estratégicas institucionales</hl>.','Diseñé reportes automatizados en Power BI logrando <hl>30% de reducción en tiempo de procesamiento</hl>.','Gestioné bases de datos de salud pública y reportes regulatorios ante el Ministerio de Salud.'] },
      { period: 'Sep 2025 — Presente', role: 'Product Manager', co: 'Sehma B&B Holding · Home Health Care · Medellín',
        bullets: ['Diseñé y mantengo <hl>modelos de datos y procesos ETL</hl> para centralizar información operativa.','Construí dashboards con KPIs de operaciones, conversión y calidad para mejorar la visibilidad del negocio.','Automaticé flujos de reportes — <hl>reduciendo errores manuales</hl> significativamente.'] },
      { period: 'Oct 2024 — Mar 2025', role: 'Profesional de Apoyo Regional', co: 'Hospital Alma Mater de Antioquia · Medellín',
        bullets: ['Gestioné <hl>datos geoespaciales con ArcGIS</hl> para identificar zonas críticas en salud pública.','Produje informes técnicos periódicos para programas de vigilancia epidemiológica regional.','Consolidé datos de múltiples fuentes en reportes para equipos directivos.'] },
    ],
    projects: [
      {
        slug: 'proa',
        num: '01 / 2023',
        title: 'Programa de Gestión Antibiótica (PROA)',
        org: 'Hospital Alma Mater de Antioquia',
        tech: 'React · JavaScript · SQL · Integraciones clínicas',
        summary: 'Módulo web para infectología: control de dispensación conectado a vigilancia de resistencia.',
        detail: `El equipo clínico necesitaba un solo lugar para conciliar decisiones de dispensación con señales de microbiología — sin sumar planillas manuales al viernes.

        El módulo priorizó controles prácticos: trazabilidad, vistas por rol (médicos vs farmacia) y exportaciones alineadas al comité de infecciones.

        Medir stewardship nunca es perfecto, pero seguimos DDD junto a alertas de resistencia para ver si las intervenciones se sostenían.`,
        impact: '↓ 12% Reducción en Dosis Diarias Definidas (DDD)',
      },
      {
        slug: "automotive-market-api",
        num: "02 / 2024",
        title: "Analítica y Seguridad Automotriz",
        org: "Pipeline de Datos del Sector Público",
        tech: "Python · APIs REST · Pandas · SVG Interactivo",
        summary: "Pipeline ETL automatizado que consume datos automotrices en vivo mediante APIs REST, generando métricas analíticas para la supervisión ejecutiva del mercado.",
        detail: `Este proyecto implementa un pipeline de datos completamente automatizado en Python que se conecta a APIs públicas de seguridad en el transporte. Ingiere, limpia y estructura registros complejos de manufactura y llamados a revisión en feeds JSON de alta fidelidad.

        El panel analítico consume este feed para generar análisis de participación de mercado, tendencias YoY de volumen trimestral y un mapa político dinámico mapeado sobre SVG reales, iluminando las densidades regionales de comercialización por estado sin demoras de red.`,
        impact: "Ingesta 100% Automatizada · Análisis Multidimensional",
      },
      {
        slug: 'warehouse-supply',
        num: '03 / 2021',
        title: 'Control de Suministros en Infraestructura',
        org: 'Hospital Alma Mater de Antioquia',
        tech: 'Web · SQL · Flujos de inventario',
        summary: 'Módulo administrativo para entradas/salidas, stock y menos diferencias inexplicables.',
        detail: `Infraestructura perdía tiempo conciliando papel con lo que la bodega realmente tenía.

        Automatizamos el núcleo operativo: captura en puerta, validaciones simples al registrar y tableros que hacían visibles las diferencias a tiempo.

        Prioridad: confiabilidad antes que "feature nueva" — menos sorpresas para finanzas y respuestas rápidas cuando dirección preguntaba "¿dónde quedó?".`,
        impact: '↓ 45% Reducción en Pérdida de Activos',
      },
      {
        slug: 'clasificador-riesgo',
        num: '04 / 2025',
        title: 'Clasificador de riesgo en pacientes crónicos',
        org: 'Portafolio · ML · Analítica en Salud',
        tech: 'Python · XGBoost · SHAP · scikit-learn · FastAPI · Streamlit',
        summary: 'Modelo XGBoost que estratifica pacientes crónicos (HTA, DM2, EPOC, IRC) en niveles de riesgo con explicabilidad SHAP integrada.',
        detail: `La estratificación de riesgo clínico tiene valor real cuando es explicable — no solo un número negro.

        El modelo procesa 12 variables clínico-administrativas (diagnóstico, edad, comorbilidades, adherencia, controles perdidos, hospitalizaciones previas, zona geográfica) y produce un score 0–100 con atribución de variables vía SHAP.

        Construido sobre datos sintéticos clínicamente coherentes generados con Faker. Desplegado como interfaz Streamlit con endpoint de inferencia en FastAPI. Reproducible desde un solo requirements.txt.`,
        impact: '87% accuracy · AUC-ROC 0.91 · 12 variables clínicas',
      },
      {
        slug: 'executive-kpi',
        num: '05 / 2024',
        title: 'Paquete ejecutivo de KPIs (Power BI)',
        org: 'Sehma B&B Holding · Medellín',
        tech: 'Power BI · DAX · SQL · Modelado de KPIs',
        summary: 'Drill-through ejecutivo en ocupación, margen y calidad — pensado para ritmo semanal.',
        detail: `La dirección recibía PDF mensuales muy bien maquetados… y ya viejos.

        Replantamos la narrativa en touchpoints semanales: un modelo semántico, definiciones consistentes de margen y ocupación, y rutas de drill que respetan límites por rol.

        La victoria no fue "más gráficos", sino menos debate sobre definiciones y más tiempo decidiendo qué cambiar la próxima semana.`,
        impact: '↑ Touchpoints semanales vs PDF mensual',
      },
      {
        slug: 'etl-contracts',
        num: '06 / 2024',
        title: 'Endurecimiento ETL y contratos de datos',
        org: 'Freelance · Operaciones de salud',
        tech: 'Python · SQL · Checks estilo dbt · Documentación',
        summary: 'Validación ligera en landing antes del BI — supuestos documentados para auditoría.',
        detail: `Si el BI se apoya en zonas de aterrizaje sucias, el analista termina apagando incendios.

        Implementé controles ligeros (frescura, llaves, combinaciones imposibles) y "contratos" cortos: qué significa una columna, quién la dueña y qué es "correcto".

        El objetivo es defendibilidad: cuando un tablero se ve mal, puedes saber si es la métrica — o la fuente.`,
        impact: '↓ Filas inválidas detectadas en origen',
      },
      {
        slug: 'forecast-rd',
        num: '07 / I+D',
        title: 'Experimentos de pronóstico (Python)',
        org: 'Personal',
        tech: 'Python · pandas · statsmodels · Prophet',
        summary: 'Prototipos ARIMA / Prophet sobre series operativas — notebooks reproducibles y model cards.',
        detail: `Carril de I+D: comparar modelos estacionales base vs enfoques tipo Prophet sobre las mismas señales, con errores reportados con honestidad.

        Cada experimento tiene una model card pequeña: ventana de datos, transformaciones y qué faltaría para producción.

        No es "magia de IA"; es iteración disciplinada con incertidumbre medible.`,
        impact: 'Benchmarks MAPE · WIP',
      },
      {
        slug: 'clasificador-riesgo-pipeline',
        num: '08 / ML',
        title: 'Pipeline Predictivo de Riesgo Cardiovascular',
        org: 'I+D Inteligencia Clínica',
        tech: 'Python · Scikit-Learn · XGBoost · FastAPI',
        summary: 'Pipeline de Machine Learning de extremo a extremo en Python para clasificar pacientes cardíacos de alto riesgo utilizando indicadores de la CDC, optimizado para salud.',
        detail: `Un flujo de trabajo riguroso de Machine Learning construido completamente en Python para abordar la estratificación temprana del riesgo cardiovascular. Utilizando conjuntos de datos públicos de la CDC (+300k registros), diseñé un pipeline de datos para limpiar registros médicos, manejar clases desbalanceadas y entrenar un clasificador XGBoost optimizado.

        El modelo se enfocó explícitamente en maximizar la Sensibilidad/Recall (94.2%), ya que en el sector salud, un falso negativo (no detectar a un paciente en riesgo crítico) es sustancialmente más costoso y peligroso que un falso positivo.

        Todo el ciclo de entrenamiento está estructurado en scripts reproducibles de Python, con métricas de validación cruzada rigurosas y extracción de la importancia global de las variables mediante valores SHAP.`,
        impact: '94.2% de Recall · Minimización estricta de Falsos Negativos',
      },
    ],
    footer1: '© 2025 Matteo Rodriguez Carmona', footer2: 'Analista de Datos · Data Engineer · Full Stack Dev',
  },
}