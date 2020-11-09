const fastify = require("fastify")();
const axios = require("axios");

fastify.register(require("fastify-cors"));

const routes = [
  "games",
  "staff",
  "characters",
  "monsters",
  "bosses",
  "dungeons",
  "places",
  "items",
];

routes.forEach((route) =>
  fastify.get(`/${route}`, async (request, reply) => {
    const { data } = await axios(
      `http://zelda-api.apius.cc/api/${route}?limit=99`
    );
    return data;
  })
);

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
