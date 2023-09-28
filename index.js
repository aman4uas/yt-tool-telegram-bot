require("dotenv").config();

const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const { startHandler, helpHandler, calculateHandler, calcErrorHandler } = require("./handlers/commands");
const { messageHandler } = require("./handlers/message");

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/^\/start *$/, (msg) => startHandler(bot, msg));
bot.onText(/^\/help *$/, (msg) => helpHandler(bot, msg));
bot.onText(/\/calculate (.+)/, (msg, match) => calculateHandler(bot, msg, match));
bot.onText(/^\/calculate *$/, (msg) => calcErrorHandler(bot, msg));
bot.on("message", (msg) => messageHandler(bot, msg));

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => res.sendFile("index.html"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
