/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Group from '../components/Group';

export default function Groups({ tournament }) {
  const [groups, setGroups] = useState([]);
  const loadGroups = async () => {
    const response = await fetch(`http://localhost:3000/api/groups/${tournament}`);
    const data = await response.json();
    setGroups(data);
  };
  useEffect(() => {
    loadGroups();
  }, [tournament]);

  if (!groups.length) {
    return (
      <div className="site-page">
        <div className="container">
          <div>Групп не знайдено</div>
        </div>
      </div>
      );
  }
  return (
    <div className="site-page">
      <div className="container">
        <h1 className="site-title">Групи</h1>
        <div className="single-groups">
          {groups.map((group) => (
            <div key={group._id} className="single-groups__wrapper">
              <div className="single-groups__name">
                Група
                {' '}
                {group.name}
              </div>
              <div className="single-groups__group">
                <table className="single-group">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Команда</th>
                      <th>В</th>
                      <th>Н</th>
                      <th>П</th>
                      <th>З</th>
                      <th>П</th>
                      <th>Р</th>
                      <th>О</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.teams.map((team, index) =>
                      <Group key={team.name} position={index + 1} team={team} />)}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Groups.propTypes = {
  tournament: PropTypes.string,
};