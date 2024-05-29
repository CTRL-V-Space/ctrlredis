// TODO: Change code to typescript
const IORedis = require("ioredis");

// Variables
const redis_connection_string = GetConvar('redis_connection_string', '');

// Dynamic variables
let isServerConnected = false;

// Redis client
// TODO: Add error handler
global.client = new IORedis(redis_connection_string);

client.on('connect', function () {
    // TODO: Change message format
    console.log('^2Redis server connection established!^0')
    isServerConnected = true
});

client.on('reconnecting', () => {
    // TODO: Change message format & Add more information
    console.log('^1Redis server reconnecting!^0')
    isServerConnected = false
});

const waitForConnection = async () => {
    while (!isServerConnected) {
        await sleep(0);
    }
}

const { get, set } = require('./lib/database');
// Redis api for FiveM
let Redis = {};

Redis.awaitConnection = async () => {
    await waitForConnection();
    return true;
};

Redis.isReady = () => {
    return isServerConnected;
};

Redis.set = set;

Redis.get = get;

// TODO: Add support of TTL

for (const key in Redis) {
    const exp = Redis[key];
    global.exports(key, exp);
}