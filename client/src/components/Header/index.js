import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header header--euro">
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
              <Link to="/matches/" className="main-nav__link">Матчі</Link>
            </li>
            <li className="main-nav__item">
              <Link to="/teams/" className="main-nav__link">Команди</Link>
            </li>
            <li className="main-nav__item">
              <a href="/groups/" className="main-nav__link">Групи</a>
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
          <div className="change-tournament">
            <select className="change-tournament__select">
              <option>Ліга Чемпіонів 2020/2021</option>
              <option>ЄВРО 2020</option>
            </select>
          </div>
        </div>
      </nav>
    </header>
  );
}
