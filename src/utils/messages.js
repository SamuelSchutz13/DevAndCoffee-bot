const { BOT_NAME, PREFIX1, PREFIX2, PREFIX3 } = require("../config");
const { getRandomPrefix } = require("../services/prefixService");

const menuMessage = () => {
    const date = new Date();

    return `
╭━━⪩ *${BOT_NAME}* ⪨━━
▢
▢ • *Data de Hoje:* ${date.toLocaleDateString("pt-br")}
▢ • *Horário:* ${date.toLocaleTimeString("pt-br")}
▢ • *Prefixo de Comandos:* ${PREFIX1} ${PREFIX2} ${PREFIX3}
▢
╰━━─「🪐」─━━

╭━━⪩ *Menus de Comandos* ⪨━━
▢
▢ • Desenvolvimento 
▢
╰━━─「👽」─━━

    `; 
};

const waitMessages = [
    "Carregando os dados...",
    "PHP melhor que Python...",,
];

function getRandomWaitMessage() {
    const randomIndex = Math.floor(Math.random() * waitMessages.length);
    return waitMessages[randomIndex];
};

module.exports = {
    getRandomWaitMessage,
    menuMessage,
};