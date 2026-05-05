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
import './TopPricesBarChart.css'

const COP_COMPACT = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 1,
})

const COP_FULL = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const row = payload[0]?.payload
  const value = row?.precio_promedio
  return (
    <div
      style={{
        background: 'rgba(8, 12, 16, 0.96)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: '0.65rem 0.85rem',
        fontFamily: 'var(--mono)',
        fontSize: '0.68rem',
        maxWidth: 280,
        boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
      }}
    >
      <div style={{ color: 'var(--accent)', marginBottom: 6, lineHeight: 1.35 }}>{label}</div>
      <div style={{ color: 'var(--text)' }}>
        precio_promedio: <strong>{COP_FULL.format(Number(value))}</strong>
      </div>
    </div>
  )
}

/**
 * Bar chart of the top 10 most expensive products from `public/data_prices.json`.
 * X-axis: Producto · Y-axis: precio_promedio (COP).
 */
export default function TopPricesBarChart({
  dataUrl = '/data_prices.json',
  title = '',
  caption,
  metaLeft,
  metaRight,
  ariaLabel = 'Top products by average price',
  embedded = false,
  showMeta = true,
}) {
  const gradId = `topPricesBarFill-${useId().replace(/:/g, '')}`
  const [rows, setRows] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setError(null)
    setRows(null)
    fetch(dataUrl)
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status}`)
        return r.json()
      })
      .then((data) => {
        if (cancelled) return
        if (!Array.isArray(data)) throw new Error('invalid')
        setRows(data)
      })
      .catch(() => {
        if (!cancelled) setError('fetch')
      })
    return () => {
      cancelled = true
    }
  }, [dataUrl])

  const chartData = useMemo(() => {
    if (!rows?.length) return []
    const valid = rows.filter(
      (r) =>
        r &&
        typeof r.Producto === 'string' &&
        r.Producto.trim() &&
        Number.isFinite(Number(r.precio_promedio))
    )
    return [...valid]
      .sort((a, b) => Number(b.precio_promedio) - Number(a.precio_promedio))
      .slice(0, 10)
      .map((r) => ({
        Producto: r.Producto.trim(),
        precio_promedio: Number(r.precio_promedio),
      }))
  }, [rows])

  const showChart = chartData.length > 0 && !error

  const rootClass = ['top-prices', embedded ? 'top-prices--embedded' : ''].filter(Boolean).join(' ')

  return (
    <div className={rootClass} role="region" aria-label={ariaLabel}>
      {!embedded && (title || caption) ? (
        <div className="top-prices__header">
          {title ? <h3 className="top-prices__title">{title}</h3> : null}
          {caption ? <p className="top-prices__caption">{caption}</p> : null}
        </div>
      ) : null}

      {error ? (
        <div className={`top-prices__state top-prices__state--error${embedded ? ' top-prices__state--embedded' : ''}`}>
          Could not load price data. Ensure <code>public/data_prices.json</code> exists and the dev server is running.
        </div>
      ) : rows === null ? (
        <div className={`top-prices__state${embedded ? ' top-prices__state--embedded' : ''}`}>Loading chart data…</div>
      ) : chartData.length === 0 ? (
        <div className={`top-prices__state${embedded ? ' top-prices__state--embedded' : ''}`}>
          No numeric price rows found. Regenerate the JSON with the Python script.
        </div>
      ) : null}

      {showChart ? (
        <>
          <div className="top-prices__chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={
                  embedded
                    ? { top: 4, right: 2, left: 0, bottom: 2 }
                    : { top: 8, right: 8, left: 4, bottom: 4 }
                }
              >
                <defs>
                  <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#0099ff" stopOpacity={0.55} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" vertical={false} />
                <XAxis
                  dataKey="Producto"
                  type="category"
                  tick={{ fill: 'var(--muted)', fontSize: embedded ? 9 : 11, fontFamily: 'var(--mono)' }}
                  tickLine={false}
                  axisLine={{ stroke: 'var(--border)' }}
                  interval={0}
                  angle={embedded ? -28 : -32}
                  textAnchor="end"
                  height={embedded ? 72 : 110}
                >
                  {!embedded ? (
                    <Label
                      value="Producto"
                      offset={8}
                      position="insideBottom"
                      style={{ fill: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 11 }}
                    />
                  ) : null}
                </XAxis>
                <YAxis
                  dataKey="precio_promedio"
                  tick={{ fill: 'var(--muted)', fontSize: embedded ? 9 : 11, fontFamily: 'var(--mono)' }}
                  tickLine={false}
                  axisLine={{ stroke: 'var(--border)' }}
                  tickFormatter={(v) => COP_COMPACT.format(Number(v))}
                  width={embedded ? 56 : 72}
                >
                  {!embedded ? (
                    <Label
                      value="precio_promedio"
                      angle={-90}
                      position="insideLeft"
                      style={{ fill: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 11 }}
                    />
                  ) : null}
                </YAxis>
                <Tooltip
                  cursor={{ fill: 'rgba(0, 212, 170, 0.06)' }}
                  content={<CustomTooltip />}
                />
                <Bar
                  dataKey="precio_promedio"
                  fill={`url(#${gradId})`}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={embedded ? 40 : 52}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {showMeta ? (
            <div className="top-prices__meta">
              <span>{metaLeft}</span>
              <span>{metaRight}</span>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
