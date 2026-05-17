import { useCallback, useMemo, useRef, useState } from 'react'
import ProjectPublicationModal from './ProjectPublicationModal'
import ClasificadorRiesgo from './ClasificadorRiesgo'
import './ProjectsCarousel.css'

const CHART_SLUG = 'open-data'
const CLASIFICADOR_SLUG = 'clasificador-riesgo'

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

/**
 * First slide: two project previews + open-data card (third column).
 * Further slides: remaining projects in groups of three.
 * Preview = title + short summary + tech line + CTA; full story opens in publication modal.
 */
export default function ProjectsCarousel({
  projects,
  vizTitle,
  vizTech,
  vizSummary,
  vizDetail,
  vizImpact,
  vizAriaLabel,
  vizMetaLeft,
  vizMetaRight,
  vizChartCaption,
  publicationOpen,
  publicationClose,
  prevLabel,
  nextLabel,
  dotGoTo,
}) {
  const [index, setIndex] = useState(0)
  const [pubSlug, setPubSlug] = useState(null)
  const touchStartX = useRef(null)

  const slides = useMemo(() => {
    const list = projects || []
    
    // Tu primera diapositiva se queda EXACTAMENTE igual (Tus 2 proyectos fijos + la visualización verde)
    const first = [
      list[0] ? { kind: 'project', data: list[0] } : null,
      list[1] ? { kind: 'project', data: list[1] } : null,
      { kind: 'chart-special' }, // Mantiene tu visualización open-data fija a la derecha
    ]

    // Filtramos explícitamente para asegurarnos de que el nuevo pipeline ruede a las siguientes páginas
    // Tomamos todos los proyectos a partir del índice 2, excluyendo el slug viejo para que no se duplique
    const rest = list.slice(2)
    
    const tailSlides = chunk(rest, 3).map((group) =>
      group.map((data) => ({ kind: 'project', data }))
    )
    
    return [first, ...tailSlides]
  }, [projects])

  const max = slides.length - 1
  const go = useCallback(
    (dir) => {
      setIndex((i) => Math.max(0, Math.min(max, i + dir)))
    },
    [max]
  )

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null
  }

  const onTouchEnd = (e) => {
    const start = touchStartX.current
    touchStartX.current = null
    if (start == null) return
    const end = e.changedTouches[0]?.clientX ?? start
    const dx = end - start
    if (dx < -48) go(1)
    if (dx > 48) go(-1)
  }

  const activeProject = useMemo(() => {
    if (!pubSlug || pubSlug === CHART_SLUG) return null;
    return projects.find((p) => p.slug === pubSlug);
  }, [projects, pubSlug]);

  const chartCopy = useMemo(
    () => ({
      title: vizTitle,
      tech: vizTech,
      detail: vizDetail,
      impact: vizImpact,
      chartCaption: vizChartCaption,
      ariaLabel: vizAriaLabel,
      metaLeft: vizMetaLeft,
      metaRight: vizMetaRight,
    }),
    [vizTitle, vizTech, vizDetail, vizImpact, vizChartCaption, vizAriaLabel, vizMetaLeft, vizMetaRight]
  )

  const modalVariant =
    pubSlug === CHART_SLUG
      ? 'chart'
      : pubSlug === CLASIFICADOR_SLUG || pubSlug === 'clasificador-riesgo-pipeline'
      ? 'clasificador-riesgo'
      : 'project'

  return (
    <>
      <div className="projects-carousel fade-in" role="region" aria-roledescription="carousel" aria-label={vizTitle}>
        <div
          className="projects-carousel__viewport"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="projects-carousel__track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((cells, si) => {
              const filled = cells.filter((c) => c != null)
              const single = filled.length === 1 && si > 0
              return (
                <div
                  className={`projects-carousel__slide${single ? ' projects-carousel__slide--single' : ''}`}
                  key={si}
                  aria-hidden={si !== index}
                >
                  {cells.map((cell, ci) => {
                    if (cell == null) {
                      return (
                        <div
                          key={`ph-${si}-${ci}`}
                          className="project-card project-card--preview project-card--placeholder"
                          aria-hidden
                        />
                      )
                    }
                    if (cell.kind === 'project') {
                      const p = cell.data
                      return (
                        <article className="project-card project-card--preview" key={p.slug}>
                          <div className="project-card__preview-main">
                            <h3 className="ptitle">{p.title}</h3>
                            <p className="pdesc">{p.summary}</p>
                            <p className="project-card__tech">{p.tech}</p>
                          </div>
                          <button
                            type="button"
                            className="project-card__cta btn btn-outline"
                            onClick={() => setPubSlug(p.slug)}
                          >
                            {publicationOpen}
                          </button>
                        </article>
                      )
                    }
                    return (
                      <article className="project-card project-card--preview project-card--viz" key={CHART_SLUG}>
                        <div className="project-card__preview-main">
                          <h3 className="ptitle">{vizTitle}</h3>
                          <p className="pdesc">{vizSummary}</p>
                          <p className="project-card__tech">{vizTech}</p>
                        </div>
                        <button
                          type="button"
                          className="project-card__cta btn btn-outline"
                          onClick={() => setPubSlug(CHART_SLUG)}
                        >
                          {publicationOpen}
                        </button>
                      </article>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {slides.length > 1 ? (
          <div className="projects-carousel__controls">
            <button
              type="button"
              className="projects-carousel__btn"
              onClick={() => go(-1)}
              disabled={index <= 0}
              aria-label={prevLabel}
            >
              ← {prevLabel}
            </button>
            <div className="projects-carousel__dots" role="tablist" aria-label={dotGoTo}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-current={i === index ? 'true' : undefined}
                  className="projects-carousel__dot"
                  onClick={() => setIndex(i)}
                  aria-label={`${dotGoTo} ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className="projects-carousel__btn"
              onClick={() => go(1)}
              disabled={index >= max}
              aria-label={nextLabel}
            >
              {nextLabel} →
            </button>
          </div>
        ) : null}
      </div>

      <ProjectPublicationModal
        open={pubSlug != null}
        onClose={() => setPubSlug(null)}
        variant={modalVariant}
        closeLabel={publicationClose}
        project={activeProject || undefined}
        chartCopy={chartCopy}
      />
    </>
  )
}
