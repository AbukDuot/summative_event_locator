const Redis = require('ioredis'); 

// Create a Redis client
const redis = new Redis();

module.exports = redis;