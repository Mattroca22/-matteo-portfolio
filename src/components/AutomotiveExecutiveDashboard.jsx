import React, { useState } from 'react';
import masterData from '../assests/automotive-senior-data.json';
import { usaMapPaths } from '../assests/usaMapPaths'; // <-- Usamos tu archivo original perfecto

export default function AutomotiveExecutiveDashboard() {
  const [year, setYear] = useState('2024');
  const data = masterData[year];

  // Buscamos de forma segura el valor máximo de ventas del año activo para la escala de opacidad
  const mapValues = Object.values(data?.map_data || {});
  const maxMap = mapValues.length > 0 ? Math.max(...mapValues) : 1;

  // Manejador dinámico de estilos basado en tus geometrías reales
  const getMapStyle = (stateKey) => {
    const salesVolume = data?.map_data?.[stateKey];
    
    // Si el estado NO tiene ventas registradas en el JSON para este año
    if (!salesVolume) {
      return {
        fill: '#21262d', // Fondo gris oscuro apagado para estados sin datos
        stroke: '#30363d',
        strokeWidth: '1',
        transition: 'fill 0.3s ease'
      };
    }

    // Si el estado SÍ tiene ventas (Escala limpia con tu esmeralda corporativo)
    const intensity = salesVolume / maxMap;
    return {
      fill: `rgba(0, 212, 170, ${0.15 + intensity * 0.85})`, // Esmeralda dinámico
      stroke: '#00d4aa',
      strokeWidth: '1',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: '#c9d1d9', fontFamily: 'sans-serif' }}>
      
      {/* Selector Corporativo superior */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#161b22', padding: '15px', borderRadius: '8px', border: '1px solid #30363d' }}>
        <div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#58a6ff' }}>REPORT_ID: AUTO-INTEL-{year}</span>
          <h3 style={{ margin: '5px 0 0 0', fontSize: '1.2rem', color: '#f0f6fc' }}>Automotive Market Intelligence</h3>
        </div>
        <select value={year} onChange={(e) => setYear(e.target.value)} style={{ background: '#0d1117', color: '#58a6ff', border: '1px solid #30363d', padding: '6px 12px', borderRadius: '6px', fontFamily: 'monospace', cursor: 'pointer' }}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Gráfico de Barras Trimestrales */}
        <div style={{ background: '#161b22', padding: '20px', borderRadius: '8px', border: '1px solid #30363d' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#8b949e', marginBottom: '20px' }}>// QUARTERLY VOLUME TREND (YoY)</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '160px', width: '100%' }}>
            {data?.trend_data?.map((d, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '55px' }}>
                <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#58a6ff' }}>{(d.volume / 1000).toFixed(0)}k</div>
                <div style={{ width: '100%', background: 'linear-gradient(to top, #00d4aa, rgba(0,214,170,0.15))', height: `${(d.volume / 600000) * 120}px`, borderRadius: '4px 4px 0 0', transition: 'height 0.3s ease' }} />
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#8b949e' }}>{d.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CONTENEDOR DEL MAPA REAL EN ALTA RESOLUCIÓN */}
        <div style={{ background: '#161b22', padding: '20px', borderRadius: '8px', border: '1px solid #30363d', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#8b949e', marginBottom: '15px' }}>// REGIONAL DENSITY (FULL USA MAP)</div>
          
          <div style={{ width: '100%', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* El viewBox original de tu mapa es 0 0 959 593 para que los vectores calcen exactos */}
            <svg viewBox="0 0 959 593" style={{ width: '100%', height: '100%' }}>
                <g id="usa-states-geometry" transform="translate(-17.49179,-131.9412)">
                {Object.keys(usaMapPaths).map((stateKey) => (
                  <path
                    key={stateKey}
                    id={stateKey}
                    d={usaMapPaths[stateKey].path} // <-- Extrae tu path original perfecto
                    style={getMapStyle(stateKey)}  // <-- Aplica el color esmeralda corporativo
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>

      </div>

      {/* Tabla de Modelos */}
      <div style={{ background: '#161b22', padding: '20px', borderRadius: '8px', border: '1px solid #30363d' }}>
        <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#00d4aa', marginBottom: '15px' }}>// TOP VOLUME DISTRIBUTION</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #30363d', textAlign: 'left', color: '#8b949e' }}>
              <th style={{ paddingBottom: '10px' }}>MODEL</th>
              <th style={{ paddingBottom: '10px' }}>VOLUME</th>
              <th style={{ paddingBottom: '10px', textAlign: 'right' }}>SHARE</th>
            </tr>
          </thead>
          <tbody>
            {data?.top_models?.map((m, i) => (
              <tr key={i} style={{ borderBottom: i !== data.top_models.length - 1 ? '1px solid #21262d' : 'none' }}>
                <td style={{ padding: '12px 0', color: '#c9d1d9' }}>
                  <strong style={{ color: '#f0f6fc' }}>{m.make}</strong> <span style={{ color: '#8b949e', marginLeft: '4px' }}>{m.model}</span>
                </td>
                <td style={{ fontFamily: 'monospace' }}>{m.sales.toLocaleString()}</td>
                <td style={{ textAlign: 'right', color: '#00d4aa', fontFamily: 'monospace', fontWeight: '600' }}>
                  {data?.total_sales ? ((m.sales / data.total_sales) * 100).toFixed(1) : 0}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}