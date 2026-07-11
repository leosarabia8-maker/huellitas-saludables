import { useState } from 'react'

export default function Historial() {
  const [busqueda, setBusqueda] = useState('')

  const manejarBusqueda = (e) => {
    e.preventDefault()
    alert(`Buscando historial clínico para: ${busqueda}`)
  }

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#1e1e1e', color: 'white', textAlign: 'left' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 15px 0' }}>📋 Consulta de Historial Clínico</h2>
      <form onSubmit={manejarBusqueda} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} required placeholder="Buscar por Cédula o Nombre..." style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
        <button type="submit" style={{ padding: '10px 20px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Buscar</button>
      </form>
      <div style={{ padding: '15px', backgroundColor: '#2a2a2a', borderRadius: '6px', borderLeft: '4px solid #3498db' }}>
        <p style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>Resultados aparecerán aquí al conectar la base de datos...</p>
      </div>
    </div>
  )
}