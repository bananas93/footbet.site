import {
 BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { AuthContext } from './utils/contexts';
import Header from './components/Header';
import Home from './views/Home';
import Matches from './views/Matches';
import Teams from './views/Teams';
import Groups from './views/Groups';
import Login from './views/Login';
import Account from './views/Account';
import ProtectedRoute from './helpers/ProtectedRoute';

function checkAuthorization(ctx) {
  const token = localStorage.getItem('JWToken');
  if (token) {
    return ctx ? token : token;
  }
  return false;
}

function App() {
  const authorized = checkAuthorization();
  return (
    <AuthContext.Provider value={authorized}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/euro-2020">
            <Route
              path="/euro-2020/matches"
              render={(props) => (
                <Matches {...props} tournament="603535998dd7c95a71ffadca" />
              )}
            />
            <Route
              path="/euro-2020/teams"
              render={(props) => (
                <Teams {...props} tournament="603535998dd7c95a71ffadca" />
              )}
            />
            <Route
              path="/euro-2020/groups"
              render={(props) => (
                <Groups {...props} tournament="603535998dd7c95a71ffadca" />
              )}
            />
          </Route>
          <Route path="/champions-league-2021">
            <Route
              path="/champions-league-2021/matches"
              render={(props) => (
                <Matches {...props} tournament="6075835617c92006f9d4ed0c" />
              )}
            />
            <Route
              path="/champions-league-2021/teams"
              render={(props) => (
                <Teams {...props} tournament="6075835617c92006f9d4ed0c" />
              )}
            />
            <Route
              path="/champions-league-2021/groups"
              render={(props) => (
                <Groups {...props} tournament="6075835617c92006f9d4ed0c" />
              )}
            />
          </Route>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/account" component={Account} />
          <Route path="*">
            <div>Error 404</div>
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
