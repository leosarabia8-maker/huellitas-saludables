import { useState } from 'react';

export default function Historial() {
  const [cedula, setCedula] = useState('');
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [buscado, setBuscado] = useState(false);

  const buscarHistorial = (e) => {
    e.preventDefault();
    if (!cedula) return;

    setCargando(true);
    setBuscado(true);

    // Enviamos la cédula en la URL como parámetro de búsqueda
    fetch(`http://localhost:5000/api/historial?cedula=${cedula}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHistorial(data);
        } else {
          setHistorial([]);
        }
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al consultar el historial:", err);
        setCargando(false);
      });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto', padding: '20px', backgroundColor: '#1e1e1e', color: '#fff', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🔒 Consulta de Historial Clínico</h2>
      
      {/* Formulario de búsqueda confidencial */}
      <form onSubmit={buscarHistorial} style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        <input 
          type="text" 
          value={cedula} 
          onChange={(e) => setCedula(e.target.value)} 
          placeholder="Ingrese la cédula del propietario..." 
          required 
          style={{ padding: '10px', width: '300px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }}
        />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '4px', border: 'none', backgroundColor: '#0284c7', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
          🔍 Consultar
        </button>
      </form>

      {cargando && <p style={{ textAlign: 'center' }}>Buscando registros confidenciales...</p>}

      {!cargando && buscado && historial.length === 0 && (
        <p style={{ textAlign: 'center', color: '#aaa' }}>No se encontraron registros médicos asociados a esta cédula.</p>
      )}

      {!cargando && historial.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', textAlign: 'left' }}>
              <th style={{ padding: '12px', borderBottom: '2px solid #555' }}>Mascota</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #555' }}>Síntomas</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #555' }}>Diagnóstico</th>
              <th style={{ padding: '12px', borderBottom: '2px solid #555' }}>Tratamiento</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((reg) => (
              <tr key={reg.id_diagnostico} style={{ borderBottom: '1px solid #444' }}>
                <td style={{ padding: '12px' }}><strong>{reg.mascota}</strong> <br/><small style={{color: '#aaa'}}>{reg.especie}</small></td>
                <td style={{ padding: '12px' }}>{reg.descripcion_sintomas}</td>
                <td style={{ padding: '12px' }}>{reg.diagnostico}</td>
                <td style={{ padding: '12px', color: '#10b981' }}>{reg.tratamiento_recetado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}