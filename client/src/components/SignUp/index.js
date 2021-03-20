/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function SignUp({ toggleType }) {
  return (
    <div>
      <form className="site-form">
        <div className="site-form__title">Реєстрація</div>
        <div className="site-form__field">
          <label htmlFor="name" className="site-form__label">Ім'я</label>
          <input className="site-form__input" id="name" placeholder="Ім'я" required />
        </div>
        <div className="site-form__field">
          <label htmlFor="email" className="site-form__label">Email</label>
          <input className="site-form__input" id="email" placeholder="Email" required />
        </div>
        <div className="site-form__field">
          <label htmlFor="password" className="site-form__label">Пароль</label>
          <input className="site-form__input" id="password" type="password" name="password" placeholder="Пароль" required />
        </div>
        <div className="site-form__field">
          <label htmlFor="password2" className="site-form__label">Ще раз пароль</label>
          <input className="site-form__input" id="password2" type="password" name="password2" placeholder="Ще раз пароль" required />
        </div>
        <input type="submit" className="site-form__btn" value="Реєстрація" />
        <div className="site-form__toggle">
          <Link to="#" onClick={toggleType}>Вхід</Link>
        </div>
      </form>
    </div>
  );
}

SignUp.propTypes = {
  toggleType: PropTypes.func,
};
