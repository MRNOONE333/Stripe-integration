import { useState, useContext } from 'react';
import { Button, Container, Navbar, Modal } from 'react-bootstrap';
import { CartContext } from '../CartContext';

function NavbarComponent() {
  const [showModal, setShowModal] = useState(false);
        const { cart, removeFromCart } = useContext(CartContext);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

   const checkout = async () => {
    if (cart.length === 0) return alert('Your cart is empty!');

    const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price), 0);

    try {
      const response = await fetch('http://localhost:4000/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity }))
        })
      });

      const data = await response.json();
      if (data.url) window.location.assign(data.url);
      else alert('Payment session creation failed!');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price), 0);

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">SaaS</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleModalShow}>Cart Items ({cart.length})</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>{item.name} - ₹{item.price} (Qty: {item.quantity})</li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          {cart.length > 0 && (
            <>
              <Button variant="danger" onClick={removeFromCart}>Remove Plan</Button>
              <Button variant="success" onClick={checkout}>Pay ₹{totalAmount}</Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default NavbarComponent;




