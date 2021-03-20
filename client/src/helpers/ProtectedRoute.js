import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../utils/contexts';

const ProtectedRoute = ({
  component: Component, location, isLogin, ...rest
}) => {
  const authorized = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authorized) {
          return <Component {...rest} {...props} />;
        }
        return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.string,
  isLogin: PropTypes.bool,
};

export default ProtectedRoute;
