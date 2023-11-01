const axios = require("axios");

exports.getBuffer = (url, options) => {
    return new Promise((resolve, reject) => {
        options ? options : {};
        axios({
            method: "get",
            url,
            headers: {
                DNT: 1,
                "Upgrade-Insecure-Request": 1,
                range: "bytes=0-",
            },
            ...options,
            responseType: "arraybuffer",
        })
        .then((res) => {
            resolve(res.data);
        })
        .catch(reject);
    });
};
