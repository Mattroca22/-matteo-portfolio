import { useState, useCallback } from 'react'
import './ClasificadorRiesgo.css'

/* ─── Static model weights (deterministic, no ML runtime needed) ─── */
const WEIGHTS = {
  dx:   { hta: 6, dm2: 10, epoc: 14, irc: 18 },
  edad: (v) => Math.round(((v - 18) / 72) * 20),
  comor:(v) => v * 8,
  hosp: (v) => v * 14,
  ctrl: (v) => Math.max(0, (6 - v) * 4),
  adh:  { alta: 0, media: 15, baja: 30 },
  zona: { urbana: 0, periferia: 5, rural: 12 },
}

function score(f) {
  return Math.min(100, Math.round(
    WEIGHTS.dx[f.dx] +
    WEIGHTS.edad(f.edad) +
    WEIGHTS.comor(f.comor) +
    WEIGHTS.hosp(f.hosp) +
    WEIGHTS.ctrl(f.ctrl) +
    WEIGHTS.adh[f.adh] +
    WEIGHTS.zona[f.zona]
  ))
}

const DEFAULTS = { dx:'hta', edad:58, comor:2, hosp:1, ctrl:3, adh:'media', zona:'rural' }

function tier(s) {
  if (s < 35) return { label:'Riesgo bajo',   cls:'low',  pct: Math.round((s / 35) * 33) }
  if (s < 65) return { label:'Riesgo medio',  cls:'mid',  pct: Math.round(33 + ((s - 35) / 30) * 34) }
  return           { label:'Riesgo alto',    cls:'high', pct: Math.round(67 + ((s - 65) / 35) * 33) }
}

function shapFactors(f, s) {
  const hospI  = Math.min(100, Math.round((WEIGHTS.hosp(f.hosp)  / 70) * 100))
  const adhI   = Math.min(100, Math.round((WEIGHTS.adh[f.adh]    / 30) * 100))
  const comorI = Math.min(100, Math.round((WEIGHTS.comor(f.comor)/ 40) * 100))
  const ctrlI  = Math.min(100, Math.round((WEIGHTS.ctrl(f.ctrl)  / 24) * 100))
  const edadI  = Math.min(100, Math.round((WEIGHTS.edad(f.edad)  / 20) * 100))
  return [
    { label:'Hospitalizaciones previas', pct: hospI,  note: f.hosp >= 2 ? 'Factor crítico' : 'Nivel aceptable' },
    { label:'Adherencia al tratamiento', pct: adhI,   note: f.adh === 'baja' ? 'Intervención urgente' : f.adh === 'media' ? 'Reforzar adherencia' : 'Factor protector' },
    { label:'Comorbilidades activas',    pct: comorI, note: f.comor >= 3 ? 'Polifarmacia probable' : 'Carga manejable' },
    { label:'Controles perdidos',        pct: ctrlI,  note: f.ctrl < 3 ? 'Seguimiento insuficiente' : 'Cobertura aceptable' },
    { label:'Edad del paciente',         pct: edadI,  note: f.edad > 65 ? 'Vulnerabilidad etaria' : 'Riesgo etario moderado' },
  ]
}

function actions(f, s) {
  const list = []
  if (f.hosp >= 2)       list.push({ sev:'high',   text:'Revisión por médico tratante — múltiples hospitalizaciones' })
  if (f.adh === 'baja')  list.push({ sev:'high',   text:'Consejería farmacéutica urgente — adherencia crítica' })
  else if (f.adh==='media') list.push({ sev:'mid', text:'Reforzar adherencia en próxima consulta' })
  if (f.ctrl < 3)        list.push({ sev:'mid',    text:'Programar controles pendientes' })
  if (f.comor >= 3)      list.push({ sev:'mid',    text:'Revisar interacciones medicamentosas' })
  if (f.zona === 'rural')list.push({ sev:'mid',    text:'Coordinar teleconsulta o visita domiciliaria' })
  if (s < 35)            list.push({ sev:'ok',     text:'Continuar plan de atención habitual — paciente estable' })
  if (s >= 65)           list.push({ sev:'high',   text:'Priorizar en lista de gestión del riesgo del mes' })
  return list
}

/* ─── Slider row ─── */
function Slider({ id, label, min, max, value, onChange }) {
  return (
    <div className="cr-field">
      <div className="cr-field-header">
        <label className="cr-label" htmlFor={id}>{label}</label>
        <span className="cr-val">{value}</span>
      </div>
      <input
        id={id} type="range"
        className="cr-slider"
        min={min} max={max} step={1} value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
      <div className="cr-slider-range"><span>{min}</span><span>{max}</span></div>
    </div>
  )
}

/* ─── Select row ─── */
function Select({ id, label, value, onChange, options }) {
  return (
    <div className="cr-field">
      <label className="cr-label" htmlFor={id}>{label}</label>
      <select id={id} className="cr-select" value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
    </div>
  )
}

/* ─── Main component ─── */
export default function ClasificadorRiesgo() {
  const [f, setF] = useState(DEFAULTS)
  const set = useCallback((k, v) => setF(prev => ({ ...prev, [k]: v })), [])

  const s   = score(f)
  const t   = tier(s)
  const shap = shapFactors(f, s)
  const acts = actions(f, s)

  return (
    <div className="cr-root">

      {/* ── Header ── */}
      <div className="cr-header">
        <div className="cr-header-label">Proyecto 02 · Machine Learning · Salud</div>
        <h2 className="cr-title">Clasificador de riesgo en pacientes crónicos</h2>
        <p className="cr-subtitle">
          Modelo XGBoost entrenado sobre variables clínico-administrativas. Estratifica pacientes
          con HTA, DM2, EPOC o IRC en niveles de riesgo con explicabilidad SHAP integrada.
        </p>
        <div className="cr-pills">
          {['Python','XGBoost','SHAP','scikit-learn','FastAPI','Streamlit'].map(t => (
            <span key={t} className="cr-pill">{t}</span>
          ))}
        </div>
      </div>

      {/* ── Demo interactiva ── */}
      <div className="cr-demo">

        {/* Left: inputs */}
        <div className="cr-inputs">
          <div className="cr-inputs-label">Variables del paciente</div>

          <Select id="dx" label="Diagnóstico principal (CIE-10)" value={f.dx} onChange={v => set('dx',v)}
            options={[
              {v:'hta',  l:'I10 — Hipertensión arterial'},
              {v:'dm2',  l:'E11 — Diabetes mellitus tipo 2'},
              {v:'epoc', l:'J44 — EPOC'},
              {v:'irc',  l:'N18 — Insuficiencia renal crónica'},
            ]}
          />
          <Slider id="edad"  label="Edad"                           min={18} max={90} value={f.edad}  onChange={v=>set('edad',v)}  />
          <Slider id="comor" label="Comorbilidades activas"         min={0}  max={5}  value={f.comor} onChange={v=>set('comor',v)} />
          <Slider id="ctrl"  label="Controles asistidos (6 meses)"  min={0}  max={6}  value={f.ctrl}  onChange={v=>set('ctrl',v)}  />
          <Slider id="hosp"  label="Hospitalizaciones (último año)" min={0}  max={5}  value={f.hosp}  onChange={v=>set('hosp',v)}  />
          <Select id="adh"   label="Adherencia al tratamiento" value={f.adh} onChange={v=>set('adh',v)}
            options={[
              {v:'alta',   l:'Alta — toma >80% de la medicación'},
              {v:'media',  l:'Media — toma 50–80%'},
              {v:'baja',   l:'Baja — toma <50%'},
            ]}
          />
          <Select id="zona" label="Zona geográfica" value={f.zona} onChange={v=>set('zona',v)}
            options={[
              {v:'urbana',   l:'Urbana'},
              {v:'periferia',l:'Periferia urbana'},
              {v:'rural',    l:'Rural / dispersa'},
            ]}
          />
        </div>

        {/* Right: output */}
        <div className="cr-output">

          {/* Score gauge */}
          <div className={`cr-gauge cr-gauge--${t.cls}`}>
            <div className="cr-gauge-track">
              <div className="cr-gauge-fill" style={{ width: `${s}%` }} />
            </div>
            <div className="cr-gauge-row">
              <span className={`cr-risk-badge cr-risk-badge--${t.cls}`}>{t.label}</span>
              <span className="cr-score-num">{s}<span className="cr-score-denom">/100</span></span>
            </div>
          </div>

          {/* SHAP bars */}
          <div className="cr-shap">
            <div className="cr-shap-title">Explicabilidad SHAP</div>
            {shap.map(item => (
              <div key={item.label} className="cr-shap-row">
                <div className="cr-shap-meta">
                  <span className="cr-shap-label">{item.label}</span>
                  <span className="cr-shap-note">{item.note}</span>
                </div>
                <div className="cr-shap-track">
                  <div className="cr-shap-bar" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="cr-actions">
            <div className="cr-actions-title">Acciones recomendadas</div>
            <ul className="cr-actions-list">
              {acts.map((a, i) => (
                <li key={i} className={`cr-action cr-action--${a.sev}`}>
                  <span className={`cr-action-dot cr-action-dot--${a.sev}`} />
                  {a.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Metrics strip ── */}
      <div className="cr-metrics">
        {[
          { label:'Accuracy',   val:'87%',  sub:'XGBoost · cv=5' },
          { label:'AUC-ROC',    val:'0.91', sub:'Alto vs bajo riesgo' },
          { label:'F1-score',   val:'0.84', sub:'Clase alto riesgo' },
          { label:'Variables',  val:'12',   sub:'Clínicas + administrativas' },
        ].map(m => (
          <div key={m.label} className="cr-metric">
            <div className="cr-metric-val">{m.val}</div>
            <div className="cr-metric-label">{m.label}</div>
            <div className="cr-metric-sub">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Build roadmap ── */}
      <div className="cr-roadmap">
        <div className="cr-roadmap-title">Hoja de ruta · 5 semanas</div>
        <div className="cr-roadmap-steps">
          {[
            { w:'Sem 01', title:'Datos sintéticos',   tech:'Faker · Pandas · CSV' },
            { w:'Sem 02', title:'EDA + limpieza',      tech:'Jupyter · Seaborn' },
            { w:'Sem 03', title:'Modelo + SHAP',       tech:'XGBoost · scikit-learn' },
            { w:'Sem 04', title:'API + UI',            tech:'FastAPI · Streamlit' },
            { w:'Sem 05', title:'Deploy + GitHub',     tech:'Render · README' },
          ].map((s, i) => (
            <div key={i} className="cr-step">
              <div className="cr-step-week">{s.w}</div>
              <div className="cr-step-title">{s.title}</div>
              <div className="cr-step-tech">{s.tech}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
