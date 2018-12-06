/**
 * create Redis
 */

const Redis = require('ioredis')
const config = require('../config.js')

const redis = new Redis(config.redis)

module.exports = redis
