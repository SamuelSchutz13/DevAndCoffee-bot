exports.checkPermission = async ({ 
    type, 
    bot, 
    userJid, 
    remoteJid,
}) => {
    const { participants, owner } = await bot.groupMetadata(remoteJid);
    const participant = participants.find(
        (participant) => participant.id === userJid
    );

    if (participant !== undefined && (type === "member" || type === "menus")) {
        return true;
    }

    const isOwner = participant.id === owner || participant.admin === "superadmin";
    const isAdmin = participant.admin === "admin";

    if (type === "owner") {
        return isOwner;
    }

    if (type === "admin") {
        return isOwner || isAdmin;
    }

    return false;
};
