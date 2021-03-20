import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../api/auth';

export default function SignIn({ toggleType }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const signIn = () => {
    login({ email, password }).then((res) => {
      if (res) {
        if (res.status === 201) {
          window.location.assign('/account');
        } else if (res.status === 422) {
          setError('Invalid email or password');
        }
      } else {
        setError('Server error...');
      }
    });
  };
  const handleChange = (handler) => (e) => {
    const { value } = e.target;
    handler(value);
  };
  return (
    <div>
      {error && (
        error
      )}
      <form className="site-form" method="POST" onSubmit={(e) => { e.preventDefault(); }}>
        <div className="site-form__title">Вхід</div>
        <div className="site-form__field">
          <label htmlFor="email" className="site-form__label">Email</label>
          <input
            className="site-form__input"
            id="email"
            placeholder="Email"
            onChange={handleChange(setEmail)}
            required
          />
        </div>
        <div className="site-form__field">
          <label htmlFor="password" className="site-form__label">Пароль</label>
          <input
            className="site-form__input"
            id="password"
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={handleChange(setPassword)}
            required
          />
        </div>
        <input type="submit" className="site-form__btn" onClick={signIn} value="Вхід" />
        <div className="site-form__toggle">
          <Link to="#" onClick={toggleType}>Реєстрація</Link>
        </div>
      </form>
    </div>
  );
}

SignIn.propTypes = {
  toggleType: PropTypes.func,
};
