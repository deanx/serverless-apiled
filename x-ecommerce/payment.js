const fetch = require('node-fetch');

module.exports.handler = async function(context, req) {
  context.log('Receiving a payment');

  const clientId = req.body.clientId;
  const paymentMethod = req.body.paymentMethod;

  if(paymentMethod !== "paypal") {
    let res = { 
      status: 400,
      body: "Invalid payment method"
    }
  }

  else {
    const paymentResponse = await processPayment(clientId);
    let res = {
      status: 200,
      body: {
        status: paymentResponse.status,
        value: paymentResponse.value,
        currency: paymentResponse.currency
      }
    }
  }
  context.done(null, res);
};

async function processPayment(clientId) {
  const paymentAPIURL = ${process.env['p-paymentURL']};
  try {
    const paymentResponse = await fetch(paymentAPIURL, { method: 'POST', body: { clientId: clientId}});
    const jsonResponse = await paymentResponse.json();
    return jsonResponse;
  } catch(err) {
    throw err;
  }
}
