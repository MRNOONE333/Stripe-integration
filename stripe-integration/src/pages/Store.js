import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../CartContext';
import { Button, Row, Card, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Store() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState({ standard: 1, plus: 11 });



   useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate('/login');
  }, [navigate]);

  const plans = [
    { id: "basic", name: "Basic", price: 0, users: "1 user", features: "Basic features free for 14 Days" },
    { id: "standard", name: "Standard", price: 4999, users: "Up to 5 users", features: "Standard features /year/user" },
    { id: "plus", name: "Plus", price: 3999, users: "10+ users", features: "Advanced features /year/user" }
  ];

   const handleUserCountChange = (planId, value) => {
    setUserCount(prev => ({ ...prev, [planId]: value }));
   };


  const calculatePrice = (plan) => {
    let total = plan.price;
    if (plan.id === "standard" && userCount.standard <= 5) total = plan.price * userCount.standard;
    else if (plan.id === "plus" && userCount.plus > 10) total = plan.price * userCount.plus;
    return total;
  };

   return (
    <div className="store-container">
      <h1 className="text-center p-3">Welcome to the Store!</h1>
      <Row xs={1} md={3} className="g-4 text-center">
        {plans.map((plan, idx) => (
          <Col key={idx}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{plan.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">₹{plan.price}</Card.Subtitle>
                <Card.Text>
                  <p><strong>Users:</strong> {plan.users}</p>
                  <p><strong>Features:</strong> {plan.features}</p>
                </Card.Text>
                {plan.id !== "basic" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Number of Users:</Form.Label>
                    <Form.Control
                      type="number"
                      value={userCount[plan.id]}
                      min={plan.id === "plus" ? 11 : 1}
                      onChange={(e) => handleUserCountChange(plan.id, e.target.value)}
                    />
                  </Form.Group>
                )}
                <Button
                  variant="primary"
                  onClick={() => addToCart({ ...plan, price: calculatePrice(plan), quantity: userCount[plan.id] })}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
     </div>
  );
}

export default Store;
