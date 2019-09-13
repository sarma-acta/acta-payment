var express = require('express');
var port = process.env.PORT || 3000;
const stripe = require('stripe')('sk_test_zyF2y2jXcwOmii029FBiaHff00t0f4CfKk');
var uuid = require('uuid');
bodyParser = require('body-parser');
var app = express();

app.get('/', function(req, res) {
  res.send({
    Output: 'Hello World!'
  });
});

app.post('/', function(req, res) {
  res.send({
    Output: 'Hello World!'
  });
});
app.post('/charge', async (req, res) => {
  console.log(req.body.amount);
  try {
    let { status } = stripe.charges.create(
      {
        amount: req.body.amount,
        currency: 'usd',
        source: 'tok_mastercard', // obtained with Stripe.js
        description: 'Charge for jenny.rosen@example.com'
      },
      {
        idempotency_key: uuid.v4()
      },
      function(err, charge) {
        // asynchronously called
        console.log('ERROR >>> ', err, charge);
      }
    );
    res.json({ status });
  } catch (err) {
    res.status(500).end(err);
  }
});

app.get('/balance', async (req, res) => {
  const result = await stripe.balance.retrieve();
  console.log(result);
  res.json(result);
});

app.listen(port);
module.exports = app;
