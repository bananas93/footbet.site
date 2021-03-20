import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
          <Route path="/matches" component={Matches} />
          <Route path="/teams" component={Teams} />
          <Route path="/groups" component={Groups} />
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
