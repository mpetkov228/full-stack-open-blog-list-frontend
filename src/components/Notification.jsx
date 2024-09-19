import PropTypes from 'prop-types';

const Notification = ({ message, isError }) => {
  const styles = {
    color: isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };

  if (message === '') {
    return null;
  }

  return (
    <div style={styles}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired
};

export default Notification;