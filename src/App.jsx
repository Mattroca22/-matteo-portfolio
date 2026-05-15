import { useState, useEffect } from 'react'
import ProjectsCarousel from './components/ProjectsCarousel'
import ClasificadorRiesgo from './components/ClasificadorRiesgo'
import { content } from './content'
import './App.css'

/** Monitor de Precios — Recharts dashboard (fetch + KPIs + bar chart); used in `ProjectPublicationModal` for the open-data publication. */
export { default as MonitorPreciosDashboard } from './components/MonitorPreciosDashboard'

const CONTACT_EMAIL = 'matt.roca22@gmail.com'

const SECTION_IDS = ['pitch', 'skills', 'experience', 'projects', 'contact']

function renderBullet(text) {
  return text.split(/<hl>(.*?)<\/hl>/).map((part, i) =>
    i % 2 === 1 ? <span key={i} className="hl">{part}</span> : part
  )
}

export default function App() {
  const [lang, setLang] = useState('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactTab, setContactTab] = useState('channels')
  const [formSending, setFormSending] = useState(false)
  const [formFeedback, setFormFeedback] = useState(null)
  const t = content[lang]

  useEffect(() => {
    setFormFeedback(null)
  }, [contactTab])

  async function handleContactSubmit(e) {
    e.preventDefault()
    const form = e.target
    const fd = new FormData(form)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const message = String(fd.get('message') || '').trim()
    const key = String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim()

    if (!name || !email || !message) return

    if (!key) {
      const subject = encodeURIComponent(`Portfolio · ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`)
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
      return
    }

    setFormSending(true)
    setFormFeedback(null)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          subject: `[Portfolio] ${name}`,
          name,
          email,
          message,
          replyto: email,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (data.success) {
        setFormFeedback('success')
        form.reset()
      } else {
        setFormFeedback('error')
      }
    } catch {
      setFormFeedback('error')
    } finally {
      setFormSending(false)
    }
  }

  // Scroll fade-in
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [lang])

  // Close menu on scroll
  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close)
    return () => window.removeEventListener('scroll', close)
  }, [])

  const switchLang = (l) => { setLang(l); setMenuOpen(false) }

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">MRC<span className="blink">_</span></div>

          {/* Desktop links */}
          <ul className="nav-links desktop-only">
            {t.navLinks.map((l, i) => (
              <li key={i}><a href={`#${SECTION_IDS[i]}`} onClick={() => setMenuOpen(false)}>{l}</a></li>
            ))}
            <li className="lang-sw">
              <button className={lang === 'en' ? 'active' : ''} onClick={() => switchLang('en')}>EN</button>
              <button className={lang === 'es' ? 'active' : ''} onClick={() => switchLang('es')}>ES</button>
            </li>
          </ul>

          {/* Mobile: lang + hamburger */}
          <div className="mobile-nav-right">
            <div className="lang-sw">
              <button className={lang === 'en' ? 'active' : ''} onClick={() => switchLang('en')}>EN</button>
              <button className={lang === 'es' ? 'active' : ''} onClick={() => switchLang('es')}>ES</button>
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
              <span className={menuOpen ? 'open' : ''} />
              <span className={menuOpen ? 'open' : ''} />
              <span className={menuOpen ? 'open' : ''} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {t.navLinks.map((l, i) => (
          <a key={i} href={`#${SECTION_IDS[i]}`} onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-tag">{t.heroTag}</div>
          <h1 className="hero-name">Matteo<br /><span>Rodriguez</span></h1>
          <div className="hero-role">
            <em>SQL</em> · <em>Python</em> · <em>Power BI</em> · <em>React</em> · Medellin, CO
          </div>
          <p className="hero-desc">{t.heroDesc}</p>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">{t.cta1}</a>
            <a href="#projects" className="btn btn-outline">{t.cta2}</a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar fade-in">
        {[['3+',0],['30%',1],['45%',2],['12%',3],['2',4]].map(([n,i]) => (
          <div className="stat" key={i}>
            <span className="stat-num">{n}</span>
            <span className="stat-label">{t.statsLabels[i]}</span>
          </div>
        ))}
      </div>

      {/* PITCH */}
      <section id="pitch" className="section-alt">
        <div className="section-tag">{t.pitchTag}</div>
        <h2 className="section-title">{t.pitchTitle}</h2>
        <div className="pitch-layout fade-in">
          <div className="pitch-left">
            <p className="pitch-headline">{t.pitchHeadline}</p>
            <p className="pitch-desc">{t.pitchDesc}</p>
            <a href="#contact" className="btn btn-primary">{t.cta1}</a>
          </div>
          <div className="pitch-cards">
            {t.pitchCards.map((c, i) => (
              <div className="pitch-card" key={i}>
                <div className="pitch-card-num">0{i+1}</div>
                <div className="pitch-card-title">{c.title}</div>
                <p className="pitch-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-tag">{t.s1tag}</div>
        <h2 className="section-title">{t.s1title}</h2>
        <div className="skills-grid fade-in">
          {[
            { title: 'Programming', tags: ['SQL','Python','R','JavaScript','TypeScript','React'] },
            { title: 'BI & Visualization', tags: ['Power BI','Tableau','Advanced Excel'] },
            { title: 'Data & Infrastructure', tags: ['PostgreSQL','ETL Pipelines','Power Automate','GitHub','ArcGIS'] },
            { title: 'Domain Expertise', tags: ['Health Informatics','Epidemiology','Regulatory Compliance','Clinical Data'] },
          ].map((s, i) => (
            <div className="skill-card" key={i}>
              <div className="skill-title">{s.title}</div>
              <div className="skill-tags">
                {s.tags.map((tag, j) => <span className="skill-tag" key={j}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section-alt">
        <div className="section-tag">{t.s2tag}</div>
        <h2 className="section-title">{t.s2title}</h2>
        <div className="timeline fade-in">
          {t.jobs.map((job, i) => (
            <div className="titem" key={i}>
              <div className="tperiod">{job.period}</div>
              <div className="trole">{job.role}</div>
              <div className="tco">{job.co}</div>
              <ul className="tbullets">
                {job.bullets.map((b, j) => <li key={j}>{renderBullet(b)}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-tag">{t.s3tag}</div>
        <h2 className="section-title">{t.s3title}</h2>
        <ProjectsCarousel
          projects={t.projects}
          vizTitle={t.vizTitle}
          vizTech={t.projectVizOrg}
          vizSummary={t.projectVizSummary}
          vizDetail={t.projectVizDetail}
          vizImpact={t.projectVizImpact}
          vizAriaLabel={t.vizTitle}
          vizMetaLeft={t.vizMetaLeft}
          vizMetaRight={t.vizMetaRight}
          vizChartCaption={t.projectChartCaption}
          publicationOpen={t.publicationOpen}
          publicationClose={t.publicationClose}
          prevLabel={t.carouselPrev}
          nextLabel={t.carouselNext}
          dotGoTo={t.carouselDotGoTo}
        />
      </section>

      {/* CONTACT */}
      <section id="contact" className="section-alt">
        <div className="section-tag">{t.s4tag}</div>
        <h2 className="section-title">{t.s4title}</h2>
        <div className="contact-grid fade-in">
          <div>
            <div className="avail-badge">
              <div className="avail-dot" />{t.avail}
            </div>
            <p className="contact-p">{t.contactDesc}</p>

            <div className="contact-tabs" role="tablist" aria-label={lang === 'es' ? 'Contacto' : 'Contact'}>
              <button
                type="button"
                role="tab"
                id="contact-tab-channels"
                aria-selected={contactTab === 'channels'}
                aria-controls="contact-panel-channels"
                className={`contact-tab ${contactTab === 'channels' ? 'active' : ''}`}
                onClick={() => setContactTab('channels')}
              >
                {t.contactTabChannels}
              </button>
              <button
                type="button"
                role="tab"
                id="contact-tab-form"
                aria-selected={contactTab === 'form'}
                aria-controls="contact-panel-form"
                className={`contact-tab ${contactTab === 'form' ? 'active' : ''}`}
                onClick={() => setContactTab('form')}
              >
                {t.contactTabForm}
              </button>
            </div>

            <div
              id="contact-panel-channels"
              role="tabpanel"
              aria-labelledby="contact-tab-channels"
              className="contact-tabpanel"
              hidden={contactTab !== 'channels'}
            >
              <div className="clinks">
                <a className="clink" href={`mailto:${CONTACT_EMAIL}`}>✉ matt.roca22@gmail.com</a>
                <a className="clink" href="https://linkedin.com/in/matt22roca" target="_blank" rel="noreferrer">in linkedin.com/in/matt22roca</a>
                <a className="clink" href="tel:+573104262429">☎ +57 310 426 2429</a>
              </div>
            </div>

            <div
              id="contact-panel-form"
              role="tabpanel"
              aria-labelledby="contact-tab-form"
              className="contact-tabpanel"
              hidden={contactTab !== 'form'}
            >
              {!import.meta.env.VITE_WEB3FORMS_ACCESS_KEY && (
                <p className="contact-form-hint">{t.formHintNoKey}</p>
              )}
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="contact-field">
                  <label htmlFor="contact-name">{t.formName}</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" required />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">{t.formEmail}</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-message">{t.formMessage}</label>
                  <textarea id="contact-message" name="message" rows={5} required />
                </div>
                {formFeedback === 'success' && (
                  <p className="contact-form-msg contact-form-msg-success" role="status">{t.formSuccess}</p>
                )}
                {formFeedback === 'error' && (
                  <p className="contact-form-msg contact-form-msg-error" role="alert">{t.formError}</p>
                )}
                <button type="submit" className="btn btn-primary" disabled={formSending}>
                  {formSending ? t.formSending : t.formSubmit}
                </button>
              </form>
            </div>
          </div>
          <div className="contact-code-side">
            <div className="code-block">
              <span className="ckw">const </span><span className="cvar">analyst</span> = {'{'}<br />
              &nbsp;&nbsp;<span className="ckey">name</span>: <span className="cstr">"Matteo Rodriguez"</span>,<br />
              &nbsp;&nbsp;<span className="ckey">stack</span>: [<span className="cstr">"SQL","Python","Power BI"</span>],<br />
              &nbsp;&nbsp;<span className="ckey">roles</span>: [<span className="cstr">"Analyst","Engineer","Dev"</span>],<br />
              &nbsp;&nbsp;<span className="ckey">available</span>: <span className="cbool">true</span><br />
              {'}'};
            </div>
            <a href="mailto:matt.roca22@gmail.com" className="btn btn-primary" style={{display:'block',textAlign:'center'}}>{t.cta3}</a>
          </div>
        </div>
      </section>

      <footer>
        <span>{t.footer1}</span>
        <span>{t.footer2}</span>
      </footer>
    </>
  )
}
