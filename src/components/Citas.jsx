import { useState, useEffect } from 'react';

export default function Citas() {
  const [cedula, setCedula] = useState('');
  const [mascotas, setMascotas] = useState([]);
  const [idMascota, setIdMascota] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Buscar mascotas automáticamente cuando la cédula tenga una longitud válida
  useEffect(() => {
    if (cedula.length >= 9) { 
      fetch(`http://localhost:5000/api/mascotas-por-cedula?cedula=${cedula}`)
        .then((res) => res.json())
        .then((data) => {
          setMascotas(data);
          if (data.length > 0) {
            setIdMascota(data[0].id_mascota); // Preselecciona la primera mascota
          } else {
            setIdMascota('');
          }
        })
        .catch((err) => console.error("Error al cargar mascotas:", err));
    } else {
      setMascotas([]);
      setIdMascota('');
    }
  }, [cedula]);

  const agendarCita = async (e) => {
    e.preventDefault();

    if (!idMascota) {
      setMensaje('❌ Por favor, seleccione una mascota válida.');
      return;
    }

    const nuevaCita = {
      id_mascota: parseInt(idMascota),
      fecha: fecha,
      hora: hora,
      motivo: motivo
    };

    try {
      // Cambia la línea 23 por esta:
const respuesta = await fetch('https://huellitas-saludables.onrender.com/api/propietarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaCita)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        setMensaje(`✔️ ${resultado.mensaje}`);
        setFecha('');
        setHora('');
        setMotivo('');
      } else {
        setMensaje(`❌ Error: ${resultado.error || 'No se pudo agendar la cita'}`);
      }
    } catch (error) {
      console.error("Error conectando con el backend:", error);
      setMensaje('❌ No se pudo conectar con el servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '20px auto', padding: '20px', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#1e1e1e', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>📅 Agendar Cita</h2>
      
      {mensaje && (
        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', backgroundColor: mensaje.includes('✔️') ? '#1b4332' : '#641e1e', textAlign: 'center' }}>
          {mensaje}
        </div>
      )}

      <form onSubmit={agendarCita} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        <label>Cédula del Dueño:</label>
        <input 
          type="text" 
          value={cedula} 
          onChange={(e) => setCedula(e.target.value)} 
          required 
          placeholder="Ej: 1234567890" 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }} 
        />

        <label>Seleccione la Mascota:</label>
        <select 
          value={idMascota} 
          onChange={(e) => setIdMascota(e.target.value)} 
          required
          disabled={mascotas.length === 0}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff', cursor: 'pointer' }}
        >
          {mascotas.length === 0 ? (
            <option value="">Escriba una cédula con mascotas registradas...</option>
          ) : (
            mascotas.map((m) => (
              <option key={m.id_mascota} value={m.id_mascota}>{m.nombre}</option>
            ))
          )}
        </select>

        <label>Fecha de la Cita:</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }} />

        <label>Hora de la Cita:</label>
        <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }} />

        <label>Motivo de la Consulta:</label>
        <textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} required placeholder="Ej: Vacunación, control de rutina..." style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff', minHeight: '60px', resize: 'vertical' }} />

        <button type="submit" style={{ marginTop: '10px', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#0284c7', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
          Agendar Cita
        </button>
      </form>
    </div>
  );
}