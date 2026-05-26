import { useState } from 'react'
import axios from 'axios'
import './Platnosci.css'

function Platnosci({ koszyk }) {


  const [formularz, setFormularz] = useState({
    name: '',
    email: '',
    address: ''
  })


  const [status, setStatus] = useState(null)
  const [ladowanie, setLadowanie] = useState(false)

  const handleChange = (e) => {
    setFormularz(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (koszyk.length === 0) {
      setStatus({ typ: 'blad', tekst: 'Koszyk jest pusty' })
      return
    }

    setLadowanie(true)

    const zamowienie = {
      items: koszyk.map(p => ({
        product_id: p.id,
        name: p.name,
        quantity: p.quantity,
        price: p.price
      })),
      total: koszyk.reduce((sum, p) => sum + p.price * p.quantity, 0),
      customer: {
        name: formularz.name,
        email: formularz.email,
        address: formularz.address
      }
    }

    // axios zadanie 5.0
    axios.post('http://localhost:8080/api/orders', zamowienie)
      .then(res => {
        setStatus({ typ: 'sukces', tekst: `Zamówienie złożone! Numer: #${res.data.order_id}` })
      })
      .catch(err => {
        setStatus({ typ: 'blad', tekst: 'Błąd składania zamówienia' })
        console.error(err)
      })
      .finally(() => setLadowanie(false))
  }

  const suma = koszyk.reduce((sum, p) => sum + p.price * p.quantity, 0)

  return (
    <div className="platnosci-wrapper">
      <h1 className="platnosci-title">Płatności</h1>
      <p className="platnosci-subtitle">Wypełnij dane dostawy</p>

      <div className="platnosci-podsumowanie">
        <div className="platnosci-sekcja-title">Zamówienie</div>
        {koszyk.map(p => (
          <div key={p.id} className="platnosci-wiersz">
            <span>{p.name} × {p.quantity}</span>
            <span>{(p.price * p.quantity).toFixed(2)} zł</span>
          </div>
        ))}
        <div className="platnosci-wiersz-suma">
          <span>Suma</span>
          <span>{suma.toFixed(2)} zł</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="platnosci-sekcja">
          <div className="platnosci-sekcja-title">Dane dostawy</div>

          <div className="platnosci-pole">
            <label className="platnosci-label">Imię i nazwisko</label>
            <input
              className="platnosci-input"
              name="name"
              placeholder="Jan Kowalski"
              value={formularz.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="platnosci-pole">
            <label className="platnosci-label">Email</label>
            <input
              className="platnosci-input"
              name="email"
              type="email"
              placeholder="jan@example.com"
              value={formularz.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="platnosci-pole">
            <label className="platnosci-label">Adres dostawy</label>
            <input
              className="platnosci-input"
              name="address"
              placeholder="ul. Przykładowa 1, Kraków"
              value={formularz.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button
          className="platnosci-btn"
          type="submit"
          disabled={ladowanie}
        >
          {ladowanie ? 'Przetwarzanie...' : 'Złóż zamówienie'}
        </button>
      </form>

      {status && (
        <div className={`platnosci-status ${status.typ}`}>
          {status.tekst}
        </div>
      )}
    </div>
  )
}

export default Platnosci