import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
import { AuthContext } from '../utils/contexts';

export default function MatchDetails() {
  const token = useContext(AuthContext);
  const { matchId } = useParams();
  const [match, setMatch] = useState();
  const [home, setHome] = useState();
  const [away, setAway] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [viewPredict, setViewPredict] = useState();

  useEffect(() => {
    async function loadMatch() {
      const response = await fetch(`http://localhost:3000/api/matches/${matchId}`);
      const data = await response.json();
      if (response.status === 200) {
        setMatch(data);
      } else {
        setError(data.message);
      }
    }
    loadMatch();
  }, [matchId]);

  const setPredict = () => {
    setViewPredict(!viewPredict);
  };
  const savePredict = () => {
    if (home && away) {
      setLoading(true);
      const bodyFormData = {
        match: matchId,
        home,
        away,
      };
      axios({
        method: 'post',
        url: `http://localhost:3000/api/bets/update/${matchId}`,
        data: bodyFormData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
          setLoading(false);
        });
    } else {
      console.log('error');
    }
  };
  const handleChange = (handler) => (e) => {
    const { value } = e.target;
    handler(value);
  };

  if (match) {
    return (
      <div className="match-details">
        <div className="container">
          <div className="match-details__header">
            <div className="match-details__stage">
              {match.stage}
              {' '}
              {match.group ? `- Група ${match.group}` : '' }
            </div>
            <div className="match-details__wrapper">
              <div className="match-details__team match-details__team--home">{match.home_team.name}</div>
              {match.status === 'scheduled' ? (
                <div className="match-details__datetime">
                  <span className="match-details__date">{moment(match.date).format('LL')}</span>
                  <span className="match-details__time">{moment(match.date).format('HH:mm')}</span>
                </div>
              ) : (
                <div className="match-details__score">
                  {match.score.home}
                  {' '}
                  -
                  {' '}
                  {match.score.away}
                </div>
              )}
              <div className="match-details__team match-details__team--away">{match.away_team.name}</div>
            </div>
            {token && (
            <div className={`match-details__stage ${loading ? 'match-details__stage--load' : ''}`}>
              <button type="button" onClick={setPredict}>Прогноз на матч</button>
              <div className="set-predict" style={viewPredict ? { display: 'block' } : { display: 'none' }}>
                <form className="site-form" method="POST" onSubmit={(e) => { e.preventDefault(); }}>
                  <input type="number" onChange={handleChange(setHome)} name="home" min="0" placeholder="0" required />
                  <input type="number" onChange={handleChange(setAway)} name="away" min="0" placeholder="0" required />
                  <button type="button" onClick={savePredict}>Зберегти</button>
                </form>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    );
  } if (error) {
    return (
      <div className="match-state">
        <div className="container">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="match-state">
      <div className="container">
        {error}
      </div>
    </div>
  );
}
