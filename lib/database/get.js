const { Callback, isJsonString } = require('./index');

exports.get = async (key, cb, invokingResource = GetInvokingResource()) => {
    try {
        let result = await client.get(key);
        
        if (isJsonString(result)) result = JSON.parse(result);

        if (!cb)
            return result;
        try {
            Callback(cb, result ? result : null);
        } catch (err) {
            console.log(err)
        }
    } catch (err) {
        console.log(err);
    }
}