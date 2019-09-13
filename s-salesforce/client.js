module.exports.status = async function(context, req) {
  context.log('Status for client, ' , req.params.id);

  if (req.params.id && req.params.id == 1000) {
    context.res = {
      status: 200,
      body: {
        situation: 'green',
        debits: 0,
        credit: 1000
      }
    };
  } else {
    context.res = {
      status: 200,
      body: {
        situation: 'red',
        debits: 144.30,
        credit: 0
      }
    };
  }
  context.done(null, context.res);
};
