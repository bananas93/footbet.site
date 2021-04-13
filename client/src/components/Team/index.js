import PropTypes from 'prop-types';

export default function Team({ team }) {
  return (
    <div className="single-team">
      {team.uploadedFile && (
        <img width="50px" src={`http://localhost:3000//${team.uploadedFile.path}`} alt={team.name} />
      )}
      {team.name}
    </div>
  );
}

Team.propTypes = {
  team: PropTypes.object,
};
