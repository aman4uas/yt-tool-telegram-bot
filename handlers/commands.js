const calculate = require("./calculate");

exports.startHandler = async (bot, msg) => {
  if (msg.chat.type !== "private") return;
  const chatId = msg.chat.id;
  const message =
    "I'm a Telegram bot that can calculate:\n• Total number of videos in playlist\n• Total length of a YouTube playlist\n• Average length of videos in the playlist\n• Length of playlist at increased speeds of 1.25x, 1.50x, 1.75x, and 2x.\n\nTo use me, simply send me the link to the YouTube playlist that you want to calculate the length of using /calculate command. I'll then reply with the total length of the playlist, as well as the length of the playlist at increased speeds.\n\nI'm a great way to save time and effort when you're trying to learn something from a YouTube tutorial series or a course, or when you're creating your own playlists.\n\nPlease refer to the /help command to learn how to use this bot.";
  bot
    .sendMessage(chatId, message)
    .catch((err) => console.log("Error in sending message...", err));
};

exports.helpHandler = async (bot, msg) => {
  if (msg.chat.type !== "private") return;
  const chatId = msg.chat.id;
  const message = "To use the Bot, simply send it the link to the YouTube playlist that you want to calculate the length of:\n\n/calculate <playlist_link>\n\nFor example, to calculate the length of the playlist 'My Favorite YouTube Videos', you would send the following message:\n\n/calculate https://www.youtube.com/playlist?list=PLmy_favorite_youtube_videos\n\nThe bot will then reply with the total number of videos in the playlist, average length of videos in the playlist, total length of the playlist as well as the length of the playlist at increased speeds:\n\nNumber of Videos: 7\nAverage length of Videos: 11 min, 36 sec\nTotal Length of Playlist: 1 hr, 21 min, 14 sec\nAt 1.25x: 1 hr, 4 minutes, 59 sec\nAt 1.50x: 0 hr, 54 min, 9 sec\nAt 1.75x: 0 hr, 46 min, 25 sec\nAt 2.00x: 0 hr, 40 min, 37 sec\n\nThe bot is a great way to save time and effort when you're trying to learn something from a YouTube tutorial series or a course, or when you're creating your own playlists.";
  bot
    .sendMessage(chatId, message)
    .catch((err) => console.log("Error in sending message...", err));
};

exports.calculateHandler = async(bot, msg, match) => {
  if (msg.chat.type !== "private") return;
  const chatId = msg.chat.id;
  const data = match[1].trim();

  await calculate.getDuration(bot, chatId, data);
};

exports.calcErrorHandler = async(bot, msg) => {
  if (msg.chat.type !== "private") return;
  const chatId = msg.chat.id;
  const message = "/calculate command is not used alone.\n\nPlease mention playlist URL after the command with a space in between.\n\nPlease refer to the /help command to learn more.";
  bot
    .sendMessage(chatId, message)
    .catch((err) => console.log("Error in sending message...", err));
};