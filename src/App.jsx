import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Propietarios from './components/Propietarios'
import Mascotas from './components/Mascotas'
import Citas from './components/Citas'
import Historial from './components/Historial'
import Diagnosticos from './components/Diagnosticos'

function App() {
  const [pantalla, setPantalla] = useState('propietarios')

  const renderPantalla = () => {
    switch(pantalla) {
      case 'propietarios': return <Propietarios />
      case 'mascotas': return <Mascotas />
      case 'citas': return <Citas />
      case 'historial': return <Historial />
      case 'diagnosticos': return <Diagnosticos />
      default: return <Propietarios />
    }
  }

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', fontFamily: 'sans-serif', color: 'white', paddingBottom: '50px' }}>
      <Navbar cambiarPantalla={setPantalla} pantallaActual={pantalla} /> 
      <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: '#3498db', textAlign: 'center', marginBottom: '30px' }}>Panel de Control Principal</h1>
        {renderPantalla()}
      </div>
    </div>
  )
}

export default App