const fetch = require('node-fetch');

module.exports.handler = async function(context, req) {
  context.log('Receiving a payment');

  const clientId = req.body.clientId;
  const paymentMethod = req.body.paymentMethod;
  let res = {};
  if(paymentMethod !== "paypal") {
    context.res = { 
      status: 400,
      body: "Invalid payment method"
    }
  }

  else {
    const paymentResponse = await processPayment(clientId);
    context.res = {
      status: 200,
      body: {
        status: paymentResponse.status,
        value: paymentResponse.value,
        currency: paymentResponse.currency
      },
      headers: { 'Content-Type': 'application/json' }
    }
  
  }
  
};

async function processPayment(clientId) {
  const paymentAPIURL = process.env['p-paymentURL'];
  try {
    const paymentResponse = await fetch(paymentAPIURL, 
      { 
        method: 'POST', 
        body: JSON.stringify({clientId: clientId}),
        headers: { 'Content-Type': 'application/json' }
      }
      );
    const jsonResponse = await paymentResponse.json();
    return jsonResponse;
  } catch(err) {
    throw err;
  }
}
