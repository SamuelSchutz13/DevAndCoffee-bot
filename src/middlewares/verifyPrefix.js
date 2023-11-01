
const { PREFIX1, PREFIX2, PREFIX3 } = require("../config");

exports.verifyPrefix = (prefix) => {
    return prefix === PREFIX1 || prefix === PREFIX2 || prefix === PREFIX3;
};