import { useState, useEffect } from 'react'
import axios from 'axios'
import './Produkty.css'

import ps5 from '../assets/images/ps5.jpg'
import iphone from '../assets/images/iphone.jpg'
import mysz from '../assets/images/mysz.jpg'
import klas from '../assets/images/klas.jpg'
import monitor from '../assets/images/monitor.jpg'

const obrazki = {
  'ps5.jpg': ps5,
  'iphone.jpg': iphone,
  'mysz.jpg': mysz,
  'klas.jpg': klas,
  'monitor.jpg': monitor,
}

function Produkty({ dodajDoKoszyka }) {
  const [produkty, setProdukty] = useState([])
  const [blad, setBlad] = useState(null)
  const [ladowanie, setLadowanie] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(res => setProdukty(res.data))
      .catch(err => {
        setBlad('Błąd pobierania produktów')
        console.error(err)
      })
      .finally(() => setLadowanie(false))
  }, [])

  if (ladowanie) return <div className="produkty-loading">Ładowanie...</div>
  if (blad) return <div className="produkty-blad">{blad}</div>

return (
    <>
        <div className="produkty-hero">
            <div className="produkty-hero-label">Nowa kolekcja</div>
            <h1 className="produkty-hero-title">Elektronika<br />najwyższej klasy</h1>
      </div>

      <div className="produkty-grid">
        {produkty.map(produkt => (
          <div key={produkt.id} className="produkt-card">
            <img
              src={obrazki[produkt.image_url]}
              alt={produkt.name}
              className="produkt-img"
            />
            <div className="produkt-name">{produkt.name}</div>
            <div className="produkt-desc">{produkt.description}</div>
            <div className="produkt-footer">
              <span className="produkt-price">{produkt.price.toFixed(2)} zł</span>
              <button
                className="produkt-btn"
                onClick={() => dodajDoKoszyka(produkt)}
              >
                Dodaj do koszyka
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Produkty