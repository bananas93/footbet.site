/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import Team from '../components/Team';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const loadTeams = async () => {
    const response = await fetch('http://localhost:3000/api/teams');
    const data = await response.json();
    setTeams(data);
  };
  useEffect(() => {
    loadTeams();
  }, []);

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
