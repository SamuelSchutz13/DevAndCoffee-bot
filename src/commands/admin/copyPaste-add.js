const { JSON_DIR } = require("../../config");
const { getRandomPrefix } = require("../../services/prefixService");
const Utils = require("../../utils/numberOfMessage");
const moment = require("moment");
const fs = require("fs");

module.exports = {
    name: "copyPaste-add",
    description: "Adiciona uma nova pasta",
    commands: ["copyPaste-add", "copypaste-add"],
    usage: `${getRandomPrefix()}copyPaste-add <titulo> <mensagem>`,
    handle: async ({
        remoteJid, 
        baileysMessage,
        sendWaitReply,
        sendWarningReact,
        sendSuccessReact,
        sendWarningReply,
        sendSuccessReply,
    }) => {
        if (!remoteJid) {
            await sendWaitReply();
            await sendWarningReact();
            await sendWarningReply("Não é possível determinar o grupo. Certifique-se de executar este comando em um grupo");
            return;
        }

        const groupJsonPath = `${JSON_DIR}/copypaste/${remoteJid}.json`; 
        let data = [];

        if (fs.existsSync(groupJsonPath)) {
            const jsonData = fs.readFileSync(groupJsonPath, 'utf-8');
            data = JSON.parse(jsonData);
        }

        const conversation = baileysMessage?.message?.conversation.toLowerCase();
        const titleAndMessage = conversation.substring(conversation.indexOf(" ") + 1);
        const title = titleAndMessage.substring(0, titleAndMessage.indexOf(" "));
        const message = titleAndMessage.substring(titleAndMessage.indexOf(" ") + 1);

        if (!title || !message) {
            await sendWarningReact();
            await sendWarningReply("Formato incorreto. Use `$copypaste-add <titulo> <mensagem>`.");
            return;
        }

        const pasteDate = moment().add(1, 'months').format('DD/MM/YYYY [às] HH:mm:ss');

        let nextID = 1;
        if (data.length > 0) {
            nextID = Math.max(...data.map(item => item.id)) + 1;
        }

        data.push({
            id: nextID,
            name: baileysMessage?.pushName,
            title: title,
            text: message,
            pasteDate: `${pasteDate}`,
        });

        fs.writeFileSync(groupJsonPath, JSON.stringify(data, null, 2), 'utf-8');
        
        await sendWaitReply();
        await sendSuccessReact();
        await sendSuccessReply(`A pasta ${nextID}. *${title}* foi adicionada com sucesso!`);
    },
};
