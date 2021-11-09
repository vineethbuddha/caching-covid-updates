const redis = require('redis');

const redisClient = redis.createClient();

const DEFAULT_EXPIRATION_DURATION = 2000;

const getOrSetCache = (key, callbackFunction) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (error, data) => {
      if (error) {
        return reject(error);
      }

      if (data != null) {
        return resolve(JSON.parse(data));
      }

      callbackFunction().then(result => {
        redisClient.setex(key, DEFAULT_EXPIRATION_DURATION, JSON.stringify(result.data));
        resolve(result.data);
      });
    });
  });
};

module.exports = {
  getOrSetCache
};
