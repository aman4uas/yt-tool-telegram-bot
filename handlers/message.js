exports.messageHandler = async (bot, msg) => {
  if (msg.chat.type !== "private") return;
  const text = msg.text || msg.caption;
  if(!text) return;
  const regex = [/^\/start *$/, /^\/help *$/, /\/calculate (.+)/, /^\/calculate *$/];
  for(let i=0; i<4; i++){
    if(text.match(regex[i])) return;
  }
  const chatId = msg.chat.id;
  const message = "I apologize, but I couldn't quite catch that. Please refer to the available commands listed below, and use one of them to interact with me.";
  bot.sendMessage(chatId, message).catch((err) => console.log("Error in sending message...", err));
};