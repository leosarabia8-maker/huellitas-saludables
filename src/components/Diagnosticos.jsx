import { useState } from 'react'

export default function Diagnosticos() {
  const [mascota, setMascota] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [receta, setReceta] = useState('')

  const guardarDiagnostico = (e) => {
    e.preventDefault()
    alert(`Diagnóstico guardado para la mascota: ${mascota}`)
    setMascota(''); setSintomas(''); setReceta('')
  }

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#1e1e1e', color: 'white', textAlign: 'left' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 15px 0' }}>🩺 Registro de Diagnóstico y Tratamiento</h2>
      <form onSubmit={guardarDiagnostico} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Seleccionar Mascota:</label>
          <input type="text" value={mascota} onChange={(e) => setMascota(e.target.value)} required placeholder="Ej. Thor" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Síntomas / Hallazgos Clínicos:</label>
          <textarea value={sintomas} onChange={(e) => setSintomas(e.target.value)} required placeholder="Describa el estado..." rows="3" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white', fontFamily: 'sans-serif' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Tratamiento / Receta Médica:</label>
          <textarea value={receta} onChange={(e) => setReceta(e.target.value)} required placeholder="Medicinas..." rows="3" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white', fontFamily: 'sans-serif' }} />
        </div>
        <button type="submit" style={{ padding: '10px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Guardar Registro Médico</button>
      </form>
    </div>
  )
}