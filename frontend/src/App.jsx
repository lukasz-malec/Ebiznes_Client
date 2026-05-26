import { useState } from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Produkty from './components/Produkty'
import Koszyk from './components/Koszyk'
import Platnosci from './components/Platnosci'
import './App.css'

function App() {

  // React Hook useState na 4.0
  // koszyk przesalany jako props do komponentow
  const [koszyk, setKoszyk] = useState([])

  const dodajDoKoszyka = (produkt) => {
    setKoszyk(prev => {
      const istniejacy = prev.find(p => p.id === produkt.id)
      if (istniejacy) {
        return prev.map(p =>
          p.id === produkt.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      }
      return [...prev, { ...produkt, quantity: 1 }]
    })
  }

  const usunZKoszyka = (id) => {
    setKoszyk(prev => prev.filter(p => p.id !== id))
  }

  const suma = koszyk.reduce((sum, p) => sum + p.price * p.quantity, 0)

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo">SKlep React JS + GO</Link>
        <div className="nav-links">
          <NavLink to="/" end>Produkty</NavLink>
          <NavLink to="/koszyk">Koszyk</NavLink>
          <NavLink to="/platnosci">Płatności</NavLink>
        </div>
        <Link to="/koszyk" className="nav-cart">
          Koszyk ({koszyk.length}) · {suma.toFixed(2)} zł
        </Link>
      </nav>


      
      <Routes>
        <Route path="/" element={<Produkty dodajDoKoszyka={dodajDoKoszyka} />} />
        <Route path="/koszyk" element={<Koszyk koszyk={koszyk} usunZKoszyka={usunZKoszyka} />} />
        <Route path="/platnosci" element={<Platnosci koszyk={koszyk} />} />
      </Routes>
    </>
  )
}

export default App