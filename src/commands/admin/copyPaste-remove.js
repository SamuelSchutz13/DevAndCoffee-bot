const { JSON_DIR } = require("../../config");
const { getRandomPrefix } = require("../../services/prefixService");
const fs = require("fs");

module.exports = {
    name: "copyPaste-remove",
    description: "Remove uma pasta pelo número",
    commands: ["copyPaste-remove", "copypaste-remove"],
    usage: `${getRandomPrefix()}copyPaste-remove <número da pasta>`,
    handle: async ({
        args,
        sendWaitReply,
        sendSuccessReact,
        sendSuccessReply,
        remoteJid, 
    }) => {
        if (!remoteJid) {
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
        const selectedIndex = data.findIndex(paste => paste.id === id);

        if (selectedIndex === -1) {
            await sendWaitReply();
            await sendSuccessReact();
            await sendSuccessReply("Pasta não encontrada. Verifique o número e tente novamente");
            return;
        }

        const selectedPaste = data[selectedIndex];

        data.splice(selectedIndex, 1);

        for (let i = selectedIndex; i < data.length; i++) {
            data[i].id--;
        }
        
        fs.writeFileSync(groupJsonPath, JSON.stringify(data, null, 2), 'utf-8');

        await sendWaitReply();
        await sendSuccessReact();
        await sendSuccessReply(`A pasta ${selectedPaste.id}. *${selectedPaste.title}* foi removida com sucesso!`);
    },
};
