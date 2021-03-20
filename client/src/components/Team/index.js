import PropTypes from 'prop-types';

export default function Team({ team }) {
  return (
    <div className="single-team">{team.name}</div>
  );
}

Team.propTypes = {
  team: PropTypes.object,
};
