import React from 'react'

export default function ClasificadorPipelineDashboard() {
  return (
    <div style={{
      padding: '1.5rem',
      background: '#0d1117',
      borderRadius: '8px',
      border: '1px solid #30363d',
      color: '#c9d1d9',
      fontFamily: 'monospace'
    }}>
      <h3 style={{ color: '#58a6ff', marginTop: 0, marginBottom: '1rem' }}>
        // Python Pipeline Execution Metrics
      </h3>
      
      {/* Contenedor de Mini Tarjetas de KPIs */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '1rem',
        marginBottom: '1.5rem' 
      }}>
        <div style={{ background: '#161b22', padding: '0.75rem', borderRadius: '6px', border: '1px solid #21262d' }}>
          <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>Model Recall</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3fb950' }}>94.2%</div>
        </div>
        <div style={{ background: '#161b22', padding: '0.75rem', borderRadius: '6px', border: '1px solid #21262d' }}>
          <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>False Negatives</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f85149' }}>0.0%</div>
        </div>
        <div style={{ background: '#161b22', padding: '0.75rem', borderRadius: '6px', border: '1px solid #21262d' }}>
          <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>Dataset Size</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>+300k</div>
        </div>
      </div>

      {/* Consola de simulación de entrenamiento */}
      <div style={{
        background: '#010409',
        padding: '1rem',
        borderRadius: '6px',
        fontSize: '0.85rem',
        lineHeight: '1.4',
        color: '#7ee787',
        border: '1px solid #21262d'
      }}>
        <p style={{ margin: '0 0 0.5rem 0', color: '#8b949e' }}># Executing train_pipeline.py...</p>
        <p style={{ margin: 0 }}>[INFO] Loading CDC health indicators dataset...</p>
        <p style={{ margin: 0 }}>[INFO] Handling class imbalance using SMOTE...</p>
        <p style={{ margin: 0 }}>[INFO] Training XGBoost Classifier with GridSearchCV...</p>
        <p style={{ margin: 0, color: '#58a6ff' }}>[SUCCESS] Model serialized to artifacts/model.pkl</p>
        <p style={{ margin: 0, color: '#3fb950' }}>[METRIC] Target Recall achieved: 94.2%</p>
      </div>
    </div>
  )
}