const { IMAGES_DIR } = require("../../config");
const { menuMessage } = require("../../utils/messages");
const { getBuffer } = require("../../services/imageService");
const { getRandomPrefix } = require("../../services/prefixService");
const path = require("path");

module.exports = {
    name: "menu",
    description: "Menu de Comandos",
    commands: ["menu"],
    usage: `${getRandomPrefix()}menu`,
    handle: async ({ 
        baileysMessage,
        sendReact, 
        remoteJid, 
        bot
    }) => {
        try {
            const groupMeta = (await bot.groupMetadata(remoteJid));
            const dateGroupCreated = new Date(groupMeta.creation * 1000).toLocaleDateString("pt-br");
            let imageBuffer;

            await sendReact("☕");
            try {
                const image = await bot.profilePictureUrl(remoteJid, "image");
                imageBuffer = await getBuffer(image);
                await bot.sendMessage(remoteJid, 
                    { image: imageBuffer, caption: menuMessage(groupMeta, dateGroupCreated, baileysMessage) },
                    { quoted: JSON.parse(JSON.stringify(baileysMessage)) },
                );
            } catch (error) {
                console.error(error);
                imageBuffer = await path.resolve(`${IMAGES_DIR}/default.jpg`);
                await bot.sendMessage(remoteJid, 
                    { image: { url: imageBuffer }, caption: menuMessage(groupMeta, dateGroupCreated, baileysMessage) },
                    { quoted: JSON.parse(JSON.stringify(baileysMessage)) },
                );
            }
        } catch(error) {
            console.log(error);
            throw new Error(error);
        }
    },
};
