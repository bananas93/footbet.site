import { logout } from '../api/auth';

function Account() {
  return (
    <div>
      <div>Account</div>
      <button type="button" onClick={logout}>Вийти</button>
    </div>
  );
}

export default Account;
