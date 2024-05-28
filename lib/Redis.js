// TODO: Change code to typescript
const IORedis = require("ioredis");

// Variables
const redis_connection_string = GetConvar('redis_connection_string', '');

// Dynamic variables
let isServerConnected = false;

// Redis client
// TODO: Add error handler
const client = new IORedis(redis_connection_string);

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

async function waitForConnection() {
  	while (!isServerConnected) {
    	await sleep(0);
  	}
}

// Redis api for FiveM
let Redis = {};

Redis.awaitConnection = async () => {
  	await waitForConnection();
  	return true;
};

Redis.isReady = () => {
  	return isServerConnected;
};

Redis.set = async (key, value, cb, invokingResource = GetInvokingResource()) => {
  	const resp = await client.set(key, value);
  	if (!cb)
      return resp;
	try {
      	cb(resp);
    } catch (err) {
      	if (typeof err === "string") {
        	if (err.includes("SCRIPT ERROR:"))
          		return console.log(err);
        	console.log(`^1SCRIPT ERROR in invoking resource ${invokingResource}: ${err}^0`);
      	}
    }
};

Redis.get = async (key, cb, invokingResource = GetInvokingResource()) => {
	const result = await client.get(key);
	if (!cb)
		return result;
	try {
		cb(result);
	} catch (err) {
		if (typeof err === "string") {
		  	if (err.includes("SCRIPT ERROR:"))
				return console.log(err);
		  	console.log(`^1SCRIPT ERROR in invoking resource ${invokingResource}: ${err}^0`);
		}
	}
};

// TODO: Add support of TTL

for (const key in Redis) {
  	const exp = Redis[key];
  	global.exports(key, exp);
}