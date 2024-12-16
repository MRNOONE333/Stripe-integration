import { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginSignup({ loginUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
    const handleToggle = () => setIsLogin(prev => !prev);
   const handleLoginSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    loginUser();
    navigate('/');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    loginUser();
    navigate('/');
  };
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '25rem' }}>
        <Card.Body>
          <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
          <Form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </Form>
          <Button variant="link" onClick={handleToggle} className="mt-3 d-block w-100 text-center">
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginSignup;
