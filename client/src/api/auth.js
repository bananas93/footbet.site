import axios from 'axios';
import { setToken } from '../helpers/authHelper';

export function register({
  email, password, password_confirmation, name,
}) {
  const user = {
    email,
    password,
    password_confirmation,
    name,
  };
  return axios({
    method: 'post',
    url: 'http://localhost:3000/api/user/register',
    data: { user },
  })
    .then((res) => {
      if (res.status && res.status === 200) {
        setToken('JWToken', res.data);
      }
      return res;
    }).catch((e) => e.response);
}

export function login({ email, password }) {
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    url: 'http://localhost:3000/api/user/login',
    data: { email, password },
  })
    .then((res) => {
      if (res.status && res.status === 201) {
        setToken('JWToken', res.data.token);
      }
      return res;
    }).catch((e) => e.response);
}

export function logout() {
  localStorage.removeItem('JWToken');
  window.location.assign('/');
}
