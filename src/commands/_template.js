const { getRandomPrefix } = require("../../services/prefixService");

module.exports = {
    name: "comando",
    description: "Descrição do comando",
    commands: ["comando1", "comando2"],
    usage: `${getRandomPrefix()}comando`,
    handle: async ({

    }) => {
        
    },
};
