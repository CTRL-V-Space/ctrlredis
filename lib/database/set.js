const { Callback } = require('./index');

exports.set = async (key, value, ttl, cb, invokingResource = GetInvokingResource()) => {
    try {
        if (typeof value === 'object') value = JSON.stringify(value);

        let result
        if (ttl) result = await client.set(key, JSON.stringify(value), 'EX', ttl);
        else result = await client.set(key, JSON.stringify(value));

        if (!cb)
            return result;
        try {
            Callback(cb, result ? result : null);
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
};