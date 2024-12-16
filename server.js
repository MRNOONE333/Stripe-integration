const express = require('express');
const cors = require('cors');
const fs = require('fs');
const stripe = require('stripe')('sk_test_51QVjzVGqzq09xdgAR0zVOPPt2CK8FXHOq3mAtCTaq00SX09RaqISR97Oxhf3niZhI203OaypzzTvURZsqwZ3a6pZ00q8kHeF4Z');

const app = express();
app.use(cors());
app.use(express.json());

const usersFile = './users.json';

// POST route for signing up a new user
app.post('/signup', (req, res) => {
  const newUser = req.body;

  fs.readFile(usersFile, (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);

    if (users.some(user => user.email === newUser.email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    users.push(newUser);
    fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
      if (err) throw err;
      res.status(200).json({ message: "Signup successful" });
    });
  });
});

// POST route for logging in
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  fs.readFile(usersFile, (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

// POST route for Stripe checkout
app.post("/checkout", async (req, res) => {
  const items = req.body.items;

  const lineItems = items.map(item => ({
    price_data: {
      currency: 'INR',
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity || 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => console.log("Listening on port 4000!"));