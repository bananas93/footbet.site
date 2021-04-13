/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Team from '../components/Team';

export default function Teams({ tournament }) {
  const [teams, setTeams] = useState([]);
  const loadTeams = async () => {
    const response = await fetch(`http://localhost:3000/api/teams/${tournament}`);
    const data = await response.json();
    setTeams(data);
  };
  useEffect(() => {
    loadTeams();
  }, [tournament]);

  if (!teams.length) {
    return (
      <div className="site-page">
        <div className="container">
          <div>Команд не знайдено</div>
        </div>
      </div>
      );
  }
  return (
    <div className="site-page">
      <div className="container">
        <h1 className="site-title">Команди</h1>
        {teams.map((team) =>
          <Team key={team._id} team={team} />)}
      </div>
    </div>
  );
}

Teams.propTypes = {
  tournament: PropTypes.string,
};