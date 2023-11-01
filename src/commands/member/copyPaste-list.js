const { JSON_DIR, PAGES } = require("../../config");
const { getRandomPrefix } = require("../../services/prefixService");
const fs = require("fs");

module.exports = {
    name: "copyPaste-list",
    description: "Lista todos as pastas",
    commands: ["copyPaste-list", "copypaste-list"],
    usage: `${getRandomPrefix()}copyPaste-list <número da página>`,
    handle: async ({
        args,
        remoteJid, 
        sendWaitReply,
        sendWarningReact,
        sendSuccessReact,
        sendSuccessReply,
        sendReply,
        bot,
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

        const totalFolders = data.length;
        const totalPages = Math.ceil(totalFolders / PAGES);

        let requestPage = (args[0]) || 1;     
        
        if(totalPages === 0) {
            requestPage = 0;
        };

        const pagesInfos = (`*Página* (${requestPage}/${totalPages})\n*Total de Pastas Disponíveis:* ${totalFolders}`);

        if (data.length === 0) {
            await sendWarningReact();
            await sendReply(`
────────────────────────

Não há pastas a serem listadas

────────────────────────
${pagesInfos}
                `);
                return;
            }

        if (requestPage <= 0) {
            await sendWarningReact();
            await sendReply(`
────────────────────────

Este número de página não existe

────────────────────────
${pagesInfos}
            `);
            return;
        }

        if (requestPage > totalPages) {
            await sendWarningReact();
            await sendReply(`
────────────────────────

418 I'm a teapot... ☕ 
    Ops Página não existe

────────────────────────
${pagesInfos}
                `);
            return;
        }

        const start = (requestPage - 1) * PAGES;
        const end = start + PAGES;

        pasteList += `────────────────────────\n\n`;
        for (let i = start; i < end; i++) {
            if (i < totalFolders) {
                const folder = data[i];
                pasteList += `*Número:* ${folder.id}\n`;
                pasteList += `*Criador da Pasta:* ${folder.name}\n`;
                pasteList += `*Título:* ${folder.title}\n`;
                pasteList += `*Data da Pasta:* ${folder.pasteDate}\n\n`;
            }
        }

        pasteList += `────────────────────────\n`;
        pasteList += `${pagesInfos}\n\n`;

        await sendWaitReply();
        await sendSuccessReact();
        await bot.sendMessage(remoteJid, {text: pasteList});
    },
};
