import { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { AuthContext } from '../utils/contexts';

export default function Login() {
  const authorized = useContext(AuthContext);
  const [type, setType] = useState();
  const toggleType = () => {
    setType(!type);
  };
  if (!authorized) {
    return (
      <div className="site-page">
        <div className="container">
          <h1 className="site-title">Вхід</h1>
          {type ? (
            <SignUp type={type} toggleType={toggleType} />
          ) : (
            <SignIn type={type} toggleType={toggleType} />
          )}
        </div>
      </div>
    );
  }
  return <Redirect to={{ pathname: '/account', state: { from: '/login' } }} />;
}
