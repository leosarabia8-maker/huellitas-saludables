import { useState } from 'react';

export default function Propietarios() {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const guardarPropietario = async (e) => {
    e.preventDefault();

    // Creamos el objeto con los mismos nombres que espera Python
    const nuevoPropietario = {
      cedula: cedula,
      nombre_completo: nombre,
      telefono: telefono,
      direccion: direccion
    };

    try {
      // Enviamos los datos al backend usando fetch
      const respuesta = await fetch('http://localhost:5000/api/propietarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoPropietario)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        setMensaje(`✔️ ${resultado.mensaje}`);
        // Limpiamos las casillas del formulario
        setCedula('');
        setNombre('');
        setTelefono('');
        setDireccion('');
      } else {
        setMensaje(`❌ Error: ${resultado.error || 'No se pudo guardar'}`);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setMensaje('❌ No se pudo conectar con el servidor backend.');
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '20px auto', padding: '20px', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#1e1e1e', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>📝 Registrar Propietario</h2>
      
      {mensaje && (
        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', backgroundColor: mensaje.includes('✔️') ? '#1b4332' : '#641e1e', textAlign: 'center' }}>
          {mensaje}
        </div>
      )}

      <form onSubmit={guardarPropietario} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>Cédula:</label>
        <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }} />

        <label>Nombre Completo:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }} />

        <label>Teléfono:</label>
        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }} />

        <label>Dirección:</label>
        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }} />

        <button type="submit" style={{ marginTop: '10px', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#0284c7', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
          Guardar Dueño
        </button>
      </form>
    </div>
  );
}