import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className="button">
      Load More
    </button>
  );
};

export default Button;

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
