import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <nav className="header__container">
        <div className="header__wrapper">
          <a href="/">
            <img width="50" src="/logo.svg" alt="Logo" />
          </a>
          <ul className="main-nav">
            <li className="main-nav__item">
              <Link to="/" className="main-nav__link">Головна</Link>
            </li>
            <li className="main-nav__item">
              <Link to="/euro-2020/" className="main-nav__link">ЄВРО-2020</Link>
            </li>
            <li className="main-nav__item">
              <Link to="/champions-league-2021/" className="main-nav__link">Ліга Чемпіонів 2021/2022</Link>
            </li>
            <li className="main-nav__item">
              <a href="/" className="main-nav__link">Правила</a>
            </li>
            <li className="main-nav__item">
              <a href="/" className="main-nav__link">Мої прогнози</a>
            </li>
            <li className="main-nav__item">
              <a href="/account" className="main-nav__link">Мій акаунт</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}