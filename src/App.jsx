import { useState } from 'react'
import Navbar from './components/Navbar'
import Propietarios from './components/Propietarios'
import Mascotas from './components/Mascotas'
import Citas from './components/Citas'
import Historial from './components/Historial'
import Diagnosticos from './components/Diagnosticos'
import './App.css'

function App() {
  // Este estado guardará el id de la pantalla que queremos ver.
  // Empezamos mostrando la pantalla de 'propietarios' por defecto.
  const [pantallaActual, setPantallaActual] = useState('propietarios')

  // Esta función se encarga de decidir qué componente renderizar 
  // según el valor de 'pantallaActual'
  const renderizarPantalla = () => {
    switch (pantallaActual) {
      case 'propietarios':
        return <Propietarios />
      case 'mascotas':
        return <Mascotas />
      case 'citas':
        return <Citas />
      case 'historial':
        return <Historial />
      case 'diagnosticos':
        return <Diagnosticos />
      default:
        return <Propietarios />
    }
  }

  return (
    <div className="app-container">
      {/* Pasamos el estado y la función para cambiarlo al Navbar */}
      <Navbar pantallaActual={pantallaActual} cambiarPantalla={setPantallaActual} />
      
      {/* Renderizamos el formulario o vista correspondiente de manera dinámica */}
      <main className="contenido-principal">
        {renderizarPantalla()}
      </main>
    </div>
  )
}

export default App