export function getToken(name) {
  const token = localStorage.getItem(name);
  return token || undefined;
}

export function setToken(name, value) {
  localStorage.setItem(name, value);
}

export function deleteToken(name) {
  localStorage.removeItem(name);
}

export const getJWToken = () => `Bearer ${getToken('JWToken')}`;

export function logout() {
  deleteToken('JWToken');
}
