import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message?.includes('wrong')) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else if (message?.includes('new')) {
    return (
      <div className="added">
        {message}
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string.isRequired
}

export default Notification