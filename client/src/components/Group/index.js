import PropTypes from 'prop-types';

export default function Group({ team, position }) {
  return (
    <tr>
      <td className="single-team">{position}</td>
      <td className="single-team">{team.name}</td>
      <td>{team.matches}</td>
      <td>{team.win}</td>
      <td>{team.draw}</td>
      <td>{team.lose}</td>
      <td>{team.goals}</td>
      <td>{team.goals_against}</td>
      <td>{team.points}</td>
    </tr>
  );
}

Group.propTypes = {
  team: PropTypes.object,
  position: PropTypes.number,
};
