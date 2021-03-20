/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import moment from 'moment';

export default function Match({ match }) {
  const { url } = useRouteMatch();
  return (
    <div className="single-match">
      <Link className="single-match__link" to={`${url}${match._id}`}>
        <span className="single-match__time">{moment(match.date).format('HH:mm')}</span>
        <div className="single-match__group">
          Група
          {' '}
          {match.group}
        </div>
        <span className="single-match__team single-match__team--left">{match.home_team.name}</span>
        <span className={`single-match__score ${match.status === 'live' ? 'single-match__score--live' : ''}`}>
          {match.status === 'scheduled' ? (
            '-:-'
          ) : (
            `${match.score.home} - ${match.score.away}`
          )}
        </span>
        <span className="single-match__team single-match__right">{match.away_team.name}</span>
      </Link>
    </div>
  );
}

Match.propTypes = {
  match: PropTypes.object,
};
