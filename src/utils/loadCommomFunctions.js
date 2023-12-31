const { BOT_EMOJI } = require("../config");
const { extractDataFromMessage, baileysIs, download } = require(".");
const { getRandomWaitMessage } = require("./messages");

exports.loadCommomFunctions = ({ bot, baileysMessage }) => {
    const { remoteJid, prefix, commandName, args, userJid, isReply, replyJid } =
        extractDataFromMessage(baileysMessage);

    const isImage = baileysIs(baileysMessage, "image");
    const isVideo = baileysIs(baileysMessage, "video");
    const isSticker = baileysIs(baileysMessage, "sticker");

    const downloadImage = async (baileysMessage, fileName) =>
        await download(baileysMessage, fileName, "image", "jpeg");

    const downloadSticker = async (baileysMessage, fileName) =>
        await download(baileysMessage, fileName, "sticker", "webp");

    const downloadVideo = async (baileysMessage, fileName) =>
        await download(baileysMessage, fileName, "video", "mp4");

    const sendText = async (text) =>
        await bot.sendMessage(remoteJid, { text: `${BOT_EMOJI} ${text}` });

    const sendReply = async (text) =>
        await bot.sendMessage(
        remoteJid,
        { text: `${BOT_EMOJI} ${text}` },
        { quoted: baileysMessage }
    );

    const sendReact = async (emoji) =>
        await bot.sendMessage(remoteJid, {
        react: {
            text: emoji,
            key: baileysMessage.key,
        },
    });

    const sendSuccessReact = async () => await sendReact("✅");
    const sendWaitReact = async () => await sendReact("⏳");
    const sendWarningReact = async () => await sendReact("⚠️");
    const sendErrorReact = async () => await sendReact("❌");

    const sendSuccessReply = async (text) => {
        await sendSuccessReact();
        return await sendReply(`✅ ${text}`);
    };

    async function sendWaitReply(text) {
        await sendWaitReact();
        const waitMessage = getRandomWaitMessage();
        return await sendReply(`⏳ Aguarde! ${text || waitMessage}`);
    }

    const sendWarningReply = async (text) => {
        await sendWarningReact();
        return await sendReply(`⚠️ Atenção! ${text}`);
    };

    const sendErrorReply = async (text) => {
        await sendErrorReact();
        return await sendReply(`❌ Erro! ${text}`);
    };

    const sendStickerFromFile = async (file) =>
        await bot.sendMessage(remoteJid, {
        sticker: { url: file },
    });

    const sendImageFromFile = async (file) =>
        await bot.sendMessage(remoteJid, {
        image: { url: file },
    });


    const sendAudioFromFile = async (file) =>
        await bot.sendMessage(remoteJid, {
            audio: { url: file },
            mimetype: 'audio/mpeg'
    });

    return {
        bot,
        remoteJid,
        userJid,
        prefix,
        commandName,
        args,
        isReply,
        isImage,
        isVideo,
        isSticker,
        replyJid,
        baileysMessage,
        sendText,
        sendReply,
        sendStickerFromFile,
        sendImageFromFile,
        sendAudioFromFile,
        sendReact,
        sendSuccessReact,
        sendWaitReact,
        sendWarningReact,
        sendErrorReply,
        sendSuccessReply,
        sendWaitReply,
        sendWarningReply,
        sendErrorReact,
        downloadImage,
        downloadSticker,
        downloadVideo,
    };
};
