import { useEffect, useId, useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import './MonitorPreciosDashboard.css'

const COP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const COP_COMPACT = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 1,
})

function KpiCard({ label, product, value }) {
  return (
    <div className="monitor-dash__kpi">
      <div className="monitor-dash__kpi-label">{label}</div>
      <div className="monitor-dash__kpi-product" title={product}>
        {product || '—'}
      </div>
      <div className="monitor-dash__kpi-value">{value}</div>
    </div>
  )
}

function DashTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const row = payload[0]?.payload
  return (
    <div className="monitor-dash__tooltip">
      <div className="monitor-dash__tooltip-name">{row?.Producto}</div>
      <div className="monitor-dash__tooltip-price">{COP.format(Number(row?.precio_promedio))}</div>
    </div>
  )
}

/**
 * Monitor de Precios — visualization layer: KPIs + top-10 bar chart from public/data_prices.json.
 */
export default function MonitorPreciosDashboard({ dataUrl = '/data_prices.json' }) {
  const gradId = `monitor-${useId().replace(/:/g, '')}`
  const [rows, setRows] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setError(null)
    setRows(null)
    fetch(dataUrl)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json()
      })
      .then((data) => {
        if (cancelled) return
        if (!Array.isArray(data)) throw new Error('invalid')
        setRows(data)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [dataUrl])

  const stats = useMemo(() => {
    if (!rows?.length) return null
    const valid = rows.filter(
      (r) =>
        r &&
        typeof r.Producto === 'string' &&
        r.Producto.trim() &&
        Number.isFinite(Number(r.precio_promedio))
    )
    if (!valid.length) return null
    const normalized = valid.map((r) => ({
      Producto: r.Producto.trim(),
      precio_promedio: Number(r.precio_promedio),
    }))
    const byPrice = [...normalized].sort((a, b) => b.precio_promedio - a.precio_promedio)
    const cheapest = [...normalized].sort((a, b) => a.precio_promedio - b.precio_promedio)[0]
    const expensive = byPrice[0]
    const sum = normalized.reduce((s, r) => s + r.precio_promedio, 0)
    const avg = sum / normalized.length
    const top10 = byPrice.slice(0, 10)
    return { expensive, cheapest, avg, top10 }
  }, [rows])

  const lastUpdatedLabel = useMemo(() => {
    const d = new Date()
    return d.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [])

  if (error) {
    return (
      <div className="monitor-dash monitor-dash--state">
        No se pudo cargar <code>data_prices.json</code>. Ejecuta el script Python o comprueba la ruta pública.
      </div>
    )
  }

  if (rows === null) {
    return <div className="monitor-dash monitor-dash--state">Cargando datos…</div>
  }

  if (!stats) {
    return (
      <div className="monitor-dash monitor-dash--state">
        No hay filas numéricas válidas. Regenera el JSON con <code>scripts/get_prices.py</code>.
      </div>
    )
  }

  return (
    <section className="monitor-dash" aria-label="Monitor de precios — panel principal">
      <div className="monitor-dash__toolbar">
        <p className="monitor-dash__updated">
          <span className="monitor-dash__updated-label">Última consulta</span>
          <time dateTime={new Date().toISOString()}>{lastUpdatedLabel}</time>
        </p>
      </div>

      <div className="monitor-dash__kpis">
        <KpiCard
          label="Producto más caro"
          product={stats.expensive.Producto}
          value={COP.format(stats.expensive.precio_promedio)}
        />
        <KpiCard
          label="Producto más barato"
          product={stats.cheapest.Producto}
          value={COP.format(stats.cheapest.precio_promedio)}
        />
        <KpiCard
          label="Precio Promedio General"
          product="Promedio simple entre productos listados"
          value={COP.format(stats.avg)}
        />
      </div>

      <div className="monitor-dash__chart-wrap">
        <h3 className="monitor-dash__chart-title">Top 10 — mayor precio promedio (COP)</h3>
        <div className="monitor-dash__chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.top10} margin={{ top: 12, right: 12, left: 4, bottom: 8 }}>
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.92} />
                  <stop offset="100%" stopColor="#0099ff" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" vertical={false} stroke="rgba(30,45,61,0.85)" />
              <XAxis
                dataKey="Producto"
                type="category"
                tick={{ fill: 'var(--muted)', fontSize: 10, fontFamily: 'var(--mono)' }}
                tickLine={false}
                axisLine={{ stroke: 'var(--border)' }}
                interval={0}
                angle={-26}
                textAnchor="end"
                height={88}
              >
                <Label
                  value="Producto"
                  offset={10}
                  position="insideBottom"
                  style={{ fill: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 10 }}
                />
              </XAxis>
              <YAxis
                dataKey="precio_promedio"
                tick={{ fill: 'var(--muted)', fontSize: 10, fontFamily: 'var(--mono)' }}
                tickLine={false}
                axisLine={{ stroke: 'var(--border)' }}
                tickFormatter={(v) => COP_COMPACT.format(Number(v))}
                width={68}
              >
                <Label
                  value="precio_promedio"
                  angle={-90}
                  position="insideLeft"
                  style={{ fill: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 10 }}
                />
              </YAxis>
              <Tooltip content={<DashTooltip />} cursor={{ fill: 'rgba(0, 212, 170, 0.06)' }} />
              <Bar dataKey="precio_promedio" fill={`url(#${gradId})`} radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}
