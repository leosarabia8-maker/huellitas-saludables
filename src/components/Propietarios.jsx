import { useState } from 'react'

export default function Propietarios() {
  const [cedula, setCedula] = useState('')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')

  const guardarPropietario = (e) => {
    e.preventDefault()
    alert(`¡Propietario Registrado!\nNombre: ${nombre}\nCédula: ${cedula}`)
    setCedula(''); setNombre(''); setTelefono(''); setDireccion('')
  }

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#1e1e1e', color: 'white', textAlign: 'left' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 15px 0' }}>👤 Registro de Propietarios</h2>
      <form onSubmit={guardarPropietario} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Número de Cédula:</label>
          <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} required placeholder="Ej. 09XXXXXXXX" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Nombre Completo:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Ej. Juan Pérez" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Teléfono de Contacto:</label>
          <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required placeholder="Ej. 0987654321" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Dirección domiciliaria:</label>
          <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required placeholder="Ej. Av. Principal y Calle B" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }} />
        </div>
        <button type="submit" style={{ padding: '10px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
          Guardar Dueño
        </button>
      </form>
    </div>
  )
}