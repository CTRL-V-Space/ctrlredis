exports.Callback = (cb, ...args) => {
    if (typeof cb === 'function') return setImmediate(() => cb(...args));
    else return false;
}
exports.isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const { get } = require('./get');
const { set } = require('./set');
const { del } = require('./del');

exports.get = get;

exports.set = set;

exports.del = del;