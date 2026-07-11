import { useState, useEffect } from 'react';

export default function Diagnosticos() {
  const [cedula, setCedula] = useState('');
  const [mascotas, setMascotas] = useState([]);
  const [idMascota, setIdMascota] = useState('');
  const [diagnosticoText, setDiagnosticoText] = useState(''); // Se mapea a 'descripcion_sintomas' y 'diagnostico'
  const [tratamiento, setTratamiento] = useState(''); // Se mapea a 'tratamiento_recetado'
  const [mensaje, setMensaje] = useState('');

  // Buscar mascotas automáticamente cuando se digita la cédula del dueño
  useEffect(() => {
    if (cedula.length >= 9) {
      fetch(`http://localhost:5000/api/mascotas-por-cedula?cedula=${cedula}`)
        .then((res) => res.json())
        .then((data) => {
          setMascotas(data);
          if (data.length > 0) {
            setIdMascota(data[0].id_mascota); // Preselecciona la primera mascota encontrada
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

  const guardarDiagnostico = async (e) => {
    e.preventDefault();

    if (!idMascota) {
      setMensaje('❌ Por favor, seleccione una mascota válida.');
      return;
    }

    // Estructura exacta que espera tu tabla 'diagnosticos' en la BD
    const nuevoDiagnostico = {
      id_mascota: parseInt(idMascota),
      descripcion_sintomas: diagnosticoText, 
      diagnostico: diagnosticoText,          
      tratamiento_recetado: tratamiento      
    };

    try {
      const respuesta = await fetch('http://localhost:5000/api/diagnosticos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoDiagnostico)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        setMensaje(`✔️ ${resultado.mensaje || 'Diagnóstico registrado con éxito'}`);
        setDiagnosticoText('');
        setTratamiento('');
      } else {
        setMensaje(`❌ Error: ${resultado.error || 'No se pudo guardar el diagnóstico'}`);
      }
    } catch (error) {
      console.error("Error conectando con el backend:", error);
      setMensaje('❌ No se pudo conectar con el servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '20px auto', padding: '20px', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#1e1e1e', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>🩺 Registrar Diagnóstico</h2>
      
      {mensaje && (
        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', backgroundColor: mensaje.includes('✔️') ? '#1b4332' : '#641e1e', textAlign: 'center' }}>
          {mensaje}
        </div>
      )}

      <form onSubmit={guardarDiagnostico} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        <label>Cédula del Dueño:</label>
        <input 
          type="text" 
          value={cedula} 
          onChange={(e) => setCedula(e.target.value)} 
          required 
          placeholder="Ej: 1234567890" 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }} 
        />

        <label>Seleccione el Paciente (Mascota):</label>
        <select 
          value={idMascota} 
          onChange={(e) => setIdMascota(e.target.value)} 
          required
          disabled={mascotas.length === 0}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff', cursor: 'pointer' }}
        >
          {mascotas.length === 0 ? (
            <option value="">Escriba la cédula para buscar mascotas...</option>
          ) : (
            mascotas.map((m) => (
              <option key={m.id_mascota} value={m.id_mascota}>{m.nombre}</option>
            ))
          )}
        </select>

        <label>Descripción del Diagnóstico:</label>
        <textarea 
          value={diagnosticoText} 
          onChange={(e) => setDiagnosticoText(e.target.value)} 
          required 
          placeholder="Ej: Presenta una leve infección estomacal..." 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff', minHeight: '80px', resize: 'vertical' }} 
        />

        <label>Receta Médica / Tratamiento:</label>
        <textarea 
          value={tratamiento} 
          onChange={(e) => setTratamiento(e.target.value)} 
          required 
          placeholder="Ej: Dar 5ml de jarabe cada 8 horas por 3 días..." 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff', minHeight: '80px', resize: 'vertical' }} 
        />

        <button type="submit" style={{ marginTop: '10px', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#0284c7', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
          Guardar Diagnóstico
        </button>
      </form>
    </div>
  );
}