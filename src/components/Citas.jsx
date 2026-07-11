import { useState } from 'react'

export default function Citas() {
  const [fecha, setFecha] = useState('')
  const [motivo, setMotivo] = useState('')

  const agendar = (e) => {
    e.preventDefault()
    alert(`Cita agendada para el ${fecha}`)
    setFecha(''); setMotivo('')
  }

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#1e1e1e', color: 'white', textAlign: 'left' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 15px 0' }}>📅 Agendar Cita Médica</h2>
      <form onSubmit={agendar} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Fecha y Hora:</label>
          <input type="datetime-local" value={fecha} onChange={(e) => setFecha(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Motivo de la consulta:</label>
          <input type="text" value={motivo} onChange={(e) => setMotivo(e.target.value)} required placeholder="Ej. Vacunación o control" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
        </div>
        <button type="submit" style={{ padding: '10px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
          Agendar Turno
        </button>
      </form>
    </div>
  )
}