import { useState } from 'react';

export default function Mascotas() {
  const [nombre, setNombre] = useState('');
  const [especie, setEskie] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [cedulaPropietario, setCedulaPropietario] = useState('');
  const [mensaje, setMensaje] = useState('');

  const guardarMascota = async (e) => {
    e.preventDefault();

    // Objeto con los datos estructurados para Python
    const nuevaMascota = {
      nombre: nombre,
      especie: especie,
      raza: raza,
      edad: parseInt(edad), // Lo convertimos a número entero
      cedula_propietario: cedulaPropietario
    };

    try {
      const respuesta = await fetch('http://localhost:5000/api/mascotas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaMascota)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        setMensaje(`✔️ ${resultado.mensaje}`);
        // Limpiamos los campos
        setNombre('');
        setEskie('');
        setRaza('');
        setEdad('');
        setCedulaPropietario('');
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
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>🐾 Registrar Mascota</h2>
      
      {mensaje && (
        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', backgroundColor: mensaje.includes('✔️') ? '#1b4332' : '#641e1e', textAlign: 'center' }}>
          {mensaje}
        </div>
      )}

      <form onSubmit={guardarMascota} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>Nombre de la Mascota:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }} />

        <label>Especie (Perro, Gato, etc.):</label>
        <input type="text" value={especie} onChange={(e) => setEskie(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }} />

        <label>Raza:</label>
        <input type="text" value={raza} onChange={(e) => setRaza(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }} />

        <label>Edad (Años):</label>
        <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }} />

        <label>Cédula del Dueño:</label>
        <input type="text" value={cedulaPropietario} onChange={(e) => setCedulaPropietario(e.target.value)} required placeholder="Debe existir en propietarios" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }} />

        <button type="submit" style={{ marginTop: '10px', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#10b981', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
          Guardar Mascota
        </button>
      </form>
    </div>
  );
}