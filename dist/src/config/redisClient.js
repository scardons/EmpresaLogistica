"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: 'redis://localhost:6379'
});
redisClient.on('error', (err) => console.error('❌ Redis Client Error', err));
exports.default = redisClient;
