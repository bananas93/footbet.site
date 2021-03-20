/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import moment from 'moment';
import Match from '../components/Match';
import MatchDetails from './MatchDetails';
import 'moment/locale/uk';

moment.locale('uk');

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const { path } = useRouteMatch();
  const loadMatches = async () => {
    const response = await fetch('http://localhost:3000/api/matches');
    const data = await response.json();
    const groups = data.reduce((allGroups, game) => {
      const date = game.date.split('T')[0];
      if (!allGroups[date]) {
        allGroups[date] = [];
      }
      allGroups[date].push(game);
      return allGroups;
    }, {});
    const groupArrays = Object.keys(groups).map((date, index) => ({
      id: index,
      date,
      games: groups[date],
    }));
    console.log(groupArrays);
    setMatches(groupArrays);
  };
  useEffect(() => {
    loadMatches();
  }, []);

  return (
    <Switch>
      <Route exact path={path}>
        <div className="site-page">
          <div className="container">
            <h1 className="site-title">Матчі</h1>
            {
                matches.map((group) => (
                  <div key={group.id}>
                    <div className="group-date">{moment(group.date).format('LL')}</div>
                    {
                      group.games.map((match) =>
                        <Match key={match._id} match={match} />)
                    }
                  </div>
                ))
              }
          </div>
        </div>
      </Route>
      <Route path={`${path}/:matchId`}>
        <MatchDetails />
      </Route>
    </Switch>
  );
}
