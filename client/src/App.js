import Header from './components/Header';
import Home from './views/Home';
import Matches from './views/Matches';
import Teams from './views/Teams';
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/matches" component={Matches} />
          <Route path="/teams" component={Teams} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}


export default App;
