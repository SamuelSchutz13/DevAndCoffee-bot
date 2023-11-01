const { JSON_DIR } = require("../../config");
const { getRandomPrefix } = require("../../services/prefixService");
const fs = require("fs");

module.exports = {
    name: "copyPaste-search",
    description: "Obtém uma pasta pelo número",
    commands: ["copyPaste-search", "copypaste-search"],
    usage: `${getRandomPrefix()}copyPaste-search <número da pasta>`,
    handle: async ({
        bot,
        args,
        remoteJid,
        sendWaitReply,
        sendWarningReact,
        sendReply,
        sendSuccessReact,
        sendSuccessReply,
    }) => {
        if (!remoteJid) {
            await sendWaitReply();
            await sendSuccessReact();
            await sendSuccessReply("Não é possível determinar o grupo. Certifique-se de executar este comando em um grupo");
            return;
        }

        const groupJsonPath = `${JSON_DIR}/copypaste/${remoteJid}.json`;

        let data = [];

        if (fs.existsSync(groupJsonPath)) {
            const jsonData = fs.readFileSync(groupJsonPath, 'utf-8');
            data = JSON.parse(jsonData);
        }

        const id = parseInt(args[0]);
        const selectedPaste = data.find(paste => paste.id === id);

        if (!selectedPaste) {
            await sendWarningReact();
            await sendReply(`
────────────────────────

Pasta não encontrada. 
Verifique o número da pasta e tente novamente

────────────────────────
            `);
            return;
        }

        pasteInfo += `────────────────────────\n`;
        pasteInfo += `*Número:* ${selectedPaste.id} | *Criador:* ${selectedPaste.name}\n`;
        pasteInfo += `*Data de Criação:* ${selectedPaste.pasteDate}\n\n`;
        pasteInfo += `*${selectedPaste.title}*\n`;
        pasteInfo += `${selectedPaste.text}\n`;
        pasteInfo += `────────────────────────\n`;

        await sendWaitReply();
        await sendSuccessReact();
        await bot.sendMessage(remoteJid, { text: pasteInfo});
    },
};