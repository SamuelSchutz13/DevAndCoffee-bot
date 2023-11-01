const { getRandomPrefix } = require("../../services/prefixService");

module.exports = {
    name: "mencionarTodos",
    description: "Descrição do comando",
    commands: ["mentionsAll", "mencionartodos", "mt"],
    usage: `${getRandomPrefix()}mentionsAll`,
    handle: async ({
        bot, 
        remoteJid, 
        sendWaitReply,
        sendSuccessReact,
    }) => {
        const participants = (await bot.groupMetadata(remoteJid));
        const getAdmins = participants.participants.filter(participant => participant.admin).map(participant => participant.id);

        if(getAdmins) {
            const metadata = (await bot.groupMetadata(remoteJid));
            const arrayParticipants = metadata.participants.map(participants => participants.id);

            let allMembers = `Marcando todos os *${metadata.size}* Participantes do grupo:\n\n`;
            arrayParticipants.forEach((participant, i) => allMembers += `@${arrayParticipants[i].replace('@s.whatsapp.net', '')}\n`);

            await sendWaitReply();
            await sendSuccessReact();
            await bot.sendMessage(remoteJid, {text: allMembers, mentions: arrayParticipants });
        }
    },
};
