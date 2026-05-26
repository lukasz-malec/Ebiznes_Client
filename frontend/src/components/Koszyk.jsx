import { Link } from 'react-router-dom'
import './Koszyk.css'

function Koszyk({ koszyk, usunZKoszyka }) {
  const suma = koszyk.reduce((sum, p) => sum + p.price * p.quantity, 0)

  return (
    <div className="koszyk-wrapper">
      <h1 className="koszyk-title">Koszyk</h1>

      {koszyk.length === 0 ? (
        <div className="koszyk-pusty">
          <p>Twój koszyk jest pusty</p>
          <Link to="/">Wróć do produktów</Link>
        </div>
      ) : (
        <>
          <div className="koszyk-lista">
            {koszyk.map(produkt => (
              <div key={produkt.id} className="koszyk-item">
                <div className="koszyk-item-info">
                  <span className="koszyk-item-name">{produkt.name}</span>
                  <span className="koszyk-item-ilosc">Ilość: {produkt.quantity}</span>
                </div>
                <div className="koszyk-item-right">
                  <span className="koszyk-item-cena">
                    {(produkt.price * produkt.quantity).toFixed(2)} zł
                  </span>
                  <button
                    className="koszyk-item-usun"
                    onClick={() => usunZKoszyka(produkt.id)}
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="koszyk-podsumowanie">
            <span className="koszyk-suma-label">Suma</span>
            <span className="koszyk-suma">{suma.toFixed(2)} zł</span>
          </div>

          <Link to="/platnosci" className="koszyk-cta">
            Przejdź do płatności
          </Link>
        </>
      )}
    </div>
  )
}

export default Koszyk