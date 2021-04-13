/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
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

export default function Matches({ tournament }) {
  const [matches, setMatches] = useState([]);
  const { path } = useRouteMatch();
  const loadMatches = async () => {
    const response = await fetch(`http://localhost:3000/api/matches/all/${tournament}`);
    const data = await response.json();
    setMatches(data);
  };
  useEffect(() => {
    loadMatches();
  }, [tournament]);

  if (!matches.length) {
    return (
      <div className="site-page">
        <div className="container">
          <div>Матчів не знайдено</div>
        </div>
      </div>
      );
  }
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

Matches.propTypes = {
  tournament: PropTypes.string,
};