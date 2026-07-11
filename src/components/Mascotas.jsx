import { useState } from 'react'

export default function Mascotas() {
  const [nombre, setNombre] = useState('')
  const [raza, setRaza] = useState('')
  const [edad, setEdad] = useState('')

  const alEnviar = (e) => {
    e.preventDefault()
    alert(`¡Mascota registrada!\nNombre: ${nombre}\nRaza: ${raza}\nEdad: ${edad} años`)
    setNombre(''); setRaza(''); setEdad('')
  }

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#1e1e1e', color: 'white', textAlign: 'left' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 15px 0' }}>📋 Registro de Mascotas</h2>
      <form onSubmit={alEnviar} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Nombre de la mascota:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Ej. Thor" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Raza / Linaje:</label>
          <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)} required placeholder="Ej. Mestizo" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Edad (años):</label>
          <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} required placeholder="Ej. 3" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
        </div>
        <button type="submit" style={{ padding: '10px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
          Guardar Mascota
        </button>
      </form>
    </div>
  )
}