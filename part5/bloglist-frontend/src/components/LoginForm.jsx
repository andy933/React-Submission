import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {
  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleSubmit}>
                username<input type='text' value={username} name='Username' onChange={handleUsernameChange} />
        <br />
                password<input type='password' value={password} name='Password' onChange={handlePasswordChange} />
        <br />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired, 
  username: PropTypes.string.isRequired, 
  password: PropTypes.string.isRequired
}

export default LoginForm