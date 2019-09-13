const fetch = require('node-fetch');

module.exports.handler = async function(context, req) {
  context.log('Processing payment...');

  if (req.body && req.body.clientId) {
    const clientId = req.body.clientId;
    
    const clientStatus = await getClientData(clientId);
    const paymentResponse = await processPayment();

    context.res = {
      status: 200,
      body: {}
    };
  } else {
    context.res = {
      status: 400,
      body: 'Invalid client Id',
    };
  }
};

async function getClientData(clientId) {
    const salesforceURL = `process.env['s-salesforceURL']/${clientId}`;
    try {
      const salesforceResponse = await fetch(salesForceURL);
      const clientStatus = salesforceResponse.json();
    } catch(err) {
      throw err;
    }
    return clientStatus;
}

async function processPayment() {
  try {
    const paypalURL = process.env['s-paypalURL'];
    const paypalResponse = await fetch(paypalURL);
    const paymentResponse = paypalResponse.json();
  } catch(err) {
    throw err;
  }
  return paymentResponse;
}