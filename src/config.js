const path = require("path");

exports.PREFIX1 = "$";
exports.PREFIX2 = "#";
exports.PREFIX3 = "/";

exports.BOT_EMOJI = "🤖";
exports.BOT_VERSION = "1.0.0";
exports.BOT_NAME = "Dev&Coffee-bot";
exports.BOT_NUMBER = "xxx";

exports.COMMANDS_DIR = path.join(__dirname, "commands");
exports.TEMP_DIR = path.resolve(__dirname, "..", "assets", "temp");
exports.IMAGES_DIR = path.resolve(__dirname, "..", "assets", "images");
exports.JSON_DIR = path.resolve(__dirname, "..", "assets", "json");

exports.TIMEOUT_IN_MILLISECONDS_BY_EVENT = 700;
