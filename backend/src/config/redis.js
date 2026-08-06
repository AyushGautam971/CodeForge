 const { createClient }  = require('redis');



const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: process.env.NEW_HOST_rediscloud_com,
        port: process.env.NEW_PORT
    }
});


 module.exports = redisClient;


