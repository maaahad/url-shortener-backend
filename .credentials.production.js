module.exports = {
  mongodb: {
    connectionString: process.env.MONGODB_CONNECTION_STRING,
  },
  site: {
    port: process.env.PORT || 3001,
    origin: `${process.env.ORIGIN}:${process.env.PORT || 3001}`,
  },
};
