export default function Navbar({ cambiarPantalla, pantallaActual }) {
const botones = [
    { id: 'propietarios', texto: 'Propietarios' },
    { id: 'mascotas', texto: 'Mascotas' },
    { id: 'citas', texto: 'Citas' },
    { id: 'historial', texto: 'Historial Clínico' },
    { id: 'diagnosticos', texto: 'Diagnósticos' }
  ]

  return (
    <nav style={{ background: '#1a252f', padding: '15px 25px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
      <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#3498db' }}>
        🐾 Huellitas Saludables
      </h3>
      <div style={{ display: 'flex', gap: '15px' }}>
        {botones.map((b) => (
          <button 
            key={b.id}
            onClick={() => cambiarPantalla(b.id)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: pantallaActual === b.id ? '#3498db' : 'white', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              borderBottom: pantallaActual === b.id ? '2px solid #3498db' : 'none',
              paddingBottom: '2px'
            }}
          >
            {b.texto}
          </button>
        ))}
      </div>
    </nav>
  )
}