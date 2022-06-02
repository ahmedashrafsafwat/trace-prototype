// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

const TraceAgent= require('@google-cloud/trace-agent');

const tracer = TraceAgent.start({
  samplingRate: 1000, // sample 5 traces per second, or at most 1 every 200 milliseconds.
  projectId: 'sonorous-pact-206308',
  // keyFilename: '',
  ignoreUrls: [/^\/vat_definitions/, /^\/purchaser_agencies/], // ignore the "/ignore-me" endpoint.
  ignoreMethods: ['get'], // ignore requests with OPTIONS method (case-insensitive).
});

export { tracer };

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send('The serve is working')
})

fastify.post('/cash_registers',async function (request, reply) {
  const retireveClient = tracer.createChildSpan({
    name: 'Retireve cLient from SIGN DE with each sign API version',
  });
  await setTimeout(()=>{},5000);
  reply.send('The serve is posting info')
  retireveClient.endSpan();
})

// Run the server!
fastify.listen(4000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})