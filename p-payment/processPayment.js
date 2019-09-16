const fetch = require('node-fetch');

module.exports.handler = async function(context, req) {
  context.log('Processing payment...');

  if (req.body && req.body.clientId) {
    const clientId = req.body.clientId;
    
    const clientStatus = await getClientData(clientId); 
    const paymentResponse = await processPayment(clientStatus);

    context.res = {
      status: 200,
      body: paymentResponse
    };
  } else {
    context.res = {
      status: 400,
      body: 'Invalid client Id',
    };
  }
};

async function getClientData(clientId) {
    const salesforceURL = `${process.env['s-salesforceURL']}/${clientId}`;
    try {
      const salesforceResponse = await fetch(salesforceURL);
      const clientStatus = salesforceResponse.json();
      return clientStatus;
    } catch(err) {
      throw err;
    }
}

async function processPayment(clientStatus) {
  if(clientStatus.situation != "green") {
    paymentResponse = {
        status: "PROBLEM",
        date: new Date().toISOString(),
        value: 1300.00,
        currency: "USD"
    };
  } else {
      try {
      const paypalURL = process.env['s-paypalURL'];
      const paypalResponse = await fetch(paypalURL, { method: 'POST'});
      const paymentResponse = paypalResponse.json();
      return paymentResponse;
    } catch(err) {
      throw err;
    }
  }
  return paymentResponse;
}