import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const LoginForm = ({
  username,
  password,
  handleLogin,
  onChangeUsername,
  onChangePassword,
}) => {
  return (
    <div>
      <h2 className="mt-3">Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mt-3">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={onChangeUsername}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
        </Form.Group>
        <Button className="mt-3" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
