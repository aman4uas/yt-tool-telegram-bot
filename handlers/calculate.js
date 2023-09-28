require("dotenv").config();
const axios = require("axios");
const baseURL = process.env.BASE_URL;

async function sendMessage(bot, chatId, message){
  bot
    .sendMessage(chatId, message)
    .catch((err) => console.log("Error in sending message...", err));
}

async function failure(bot, chatId, message){
  const msg = `Uhhhh... ${message}\n\nPlease refer to the /help command to learn how to use this bot.`;
  await sendMessage(bot, chatId, msg);
}

async function success(bot, chatId, response){
  const message = `Number of Videos: ${response.count}\nAverage length of Videos: ${response.avgTime}\nTotal Length of Playlist: ${response.t100x}\n\nAt 1.25x: ${response.t125x}\nAt 1.50x: ${response.t150x}\nAt 1.75x: ${response.t175x}\nAt 2.00x: ${response.t200x}\n`;
  await sendMessage(bot, chatId, message);
}

function isYtUrl(inputString) {
  const regex = /^https?:\/\/(www\.|m\.)?youtube\.com/;
  const ans = regex.test(inputString);
  return ans;
}

async function calculateTime(bot, chatId, url) {
  let id = null;
  try {
    id = getYTPlaylistID(url);
  } catch {
    await failure(bot, chatId, "Cannot find playlist ID !!");
    return;
  }
  await getTime(bot, chatId, id);
}

function getYTPlaylistID(playlistLink) {
  let regex = /(?:list=)([^&#]+)/;
  let match = playlistLink.match(regex);
  if (match && match[1]) return match[1];
  else throw new Error("Cannot find playlist ID !!");
}


async function getTime(bot, chatId, id) {
  let url, response;
  url = baseURL + id;
  try {
    response = await axios.get(url);
    response = response.data;
  } catch (error) {
    console.log(error);
    await failure(bot, chatId, "Something went wrong. Please try again !!");
    return;
  }
  if (!response.ok) {
    await failure(bot, chatId, response.message);
    return;
  }
  
  response = response.data;
  await success(bot, chatId, response);
}


exports.getDuration = async (bot, chatId, data) => {
  if(isYtUrl(data)===false) {
    await failure(bot, chatId, "This is not a Youtube URL");
    return;
  }
  await calculateTime(bot, chatId, data);
}