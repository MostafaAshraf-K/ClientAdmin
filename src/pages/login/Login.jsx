import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls.js";
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div className="login-page">
      <div className="background"></div> {/* Background element */}
      <Container className="login-container">
        <Form className="login-form">
          {/* <Form.Group controlId="formUsername"> */}
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
          {/* </Form.Group> */}

          {/* <Form.Group controlId="formPassword"> */}
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          {/* </Form.Group> */}

          <Button variant="primary" onClick={handleClick}>
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
