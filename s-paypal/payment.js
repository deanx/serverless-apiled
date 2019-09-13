module.exports.handler = async function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
    context.res = {
      status: 200,
      body: {
        status: "SUCCESS",
        date: new Date().toISOString(),
        value: 1300.00,
        currency: "USD"
      }
    };
};
