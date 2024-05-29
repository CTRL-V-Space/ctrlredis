const { Callback } = require('./index');

exports.del = async (key, cb, invokingResource = GetInvokingResource()) => {
    try {
        let result = await client.del(key);

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