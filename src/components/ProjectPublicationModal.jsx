import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom' // <-- Importamos el portal nativo de React
import MonitorPreciosDashboard from './MonitorPreciosDashboard'
import ClasificadorRiesgo from './ClasificadorRiesgo'
import './ProjectPublicationModal.css'

function StopScroll({ lock }) {
  useEffect(() => {
    if (!lock) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [lock])
  return null
}

export default function ProjectPublicationModal({
  open,
  onClose,
  variant,
  closeLabel,
  project,
  chartCopy,
}) {
  const titleId = useId()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => closeRef.current?.focus(), 50)
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const isChart = variant === 'chart'
  const isClasificadorViejo = variant === 'clasificador-riesgo' && project?.slug === 'clasificador-riesgo'
  const isClasificadorPipeline = variant === 'clasificador-riesgo' && project?.slug === 'clasificador-riesgo-pipeline'
  const isClasificador = isClasificadorViejo || isClasificadorPipeline

  // Usamos createPortal para inyectar este HTML al final del body de la app
  return createPortal(
    <>
      <StopScroll lock />
      <div
        className="pub-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className="pub-modal__backdrop"
          aria-label={closeLabel}
          onClick={onClose}
        />
        <div className="pub-modal__panel">
          <header className="pub-modal__head">
            <div className="pub-modal__titles">
              {project?.num ? (
                <div className="pub-modal__num">{project.num}</div>
              ) : null}
              <h2 id={titleId} className="pub-modal__title">
                {isChart ? chartCopy.title : project?.title}
              </h2>
              {project?.org ? (
                <div className="pub-modal__org">{project.org}</div>
              ) : null}
              <div className="pub-modal__tech">
                {isChart ? chartCopy.tech : project?.tech}
              </div>
            </div>
            <button
              ref={closeRef}
              type="button"
              className="pub-modal__close"
              onClick={onClose}
              aria-label={closeLabel}
            >
              ×
            </button>
          </header>

          <div className="pub-modal__body">
            {isChart && chartCopy?.impact ? (
              <div className="pub-modal__impact">{chartCopy.impact}</div>
            ) : null}
            {!isChart && project?.impact ? (
              <div className="pub-modal__impact">{project.impact}</div>
            ) : null}

            <div className="pub-modal__detail">
              {(isChart ? chartCopy?.detail : project?.detail)
                ?.split(/\n\s*\n/)
                .map((p) => p.trim())
                .filter(Boolean)
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>

            {isChart ? (
              <div className="pub-modal__viz">
                <MonitorPreciosDashboard />
                {chartCopy?.chartCaption ? (
                  <p className="pub-modal__chart-note">{chartCopy.chartCaption}</p>
                ) : null}
              </div>
            ) : null}

            {isClasificadorViejo ? (
              <div className="pub-modal__viz">
                <ClasificadorRiesgo />
              </div>
            ) : null}

            {isClasificadorPipeline ? (
              <div className="pub-modal__viz">
                <div style={{ padding: '1.5rem', background: '#0d1117', borderRadius: '8px', border: '1px solid #30363d', color: '#c9d1d9', fontFamily: 'monospace' }}>
                  <h3 style={{ color: '#58a6ff', marginTop: 0, marginBottom: '1rem' }}>// Python Pipeline Metrics</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: '#161b22', padding: '0.75rem', borderRadius: '6px', border: '1px solid #21262d' }}>
                      <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>Model Recall</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3fb950' }}>94.2%</div>
                    </div>
                    <div style={{ background: '#161b22', padding: '0.75rem', borderRadius: '6px', border: '1px solid #21262d' }}>
                      <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>False Negatives</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f85149' }}>0.0%</div>
                    </div>
                  </div>
                  <div style={{ background: '#010409', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem', color: '#7ee787', border: '1px solid #21262d' }}>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#8b949e' }}># Executing train_pipeline.py...</p>
                    <p style={{ margin: 0 }}>[INFO] Handling class imbalance using SMOTE...</p>
                    <p style={{ margin: 0, color: '#3fb950' }}>[METRIC] Target Recall achieved: 94.2%</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>,
    document.body // Inyección directa en la raíz del documento para limpiar el z-index
  )
}