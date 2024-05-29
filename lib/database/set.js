const { Callback } = require('./index');

exports.set = async (key, value, ttl, cb, invokingResource = GetInvokingResource()) => {
    try {
        console.log(typeof value)
        if (typeof value === 'object') value = JSON.stringify(value);

        console.log(value)
        const result = await client.set(key, value);

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