const { PREFIX1, PREFIX2, PREFIX3 } = require("../config");

function getRandomPrefix()  {
    const prefixes = [PREFIX1, PREFIX2, PREFIX3];
    const randomIndex = Math.floor(Math.random() * prefixes.length);
    return prefixes[randomIndex];
};

module.exports = { getRandomPrefix };
