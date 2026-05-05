import { useEffect, useId, useRef } from 'react'
import MonitorPreciosDashboard from './MonitorPreciosDashboard'
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

  return (
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
              {!isChart && project?.num ? (
                <div className="pub-modal__num">{project.num}</div>
              ) : null}
              <h2 id={titleId} className="pub-modal__title">
                {isChart ? chartCopy.title : project?.title}
              </h2>
              {!isChart && project?.org ? (
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
            {!isChart && project?.impact ? (
              <div className="pub-modal__impact">{project.impact}</div>
            ) : null}
            {isChart && chartCopy?.impact ? (
              <div className="pub-modal__impact">{chartCopy.impact}</div>
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
          </div>
        </div>
      </div>
    </>
  )
}
