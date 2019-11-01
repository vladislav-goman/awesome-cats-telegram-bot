process.env.NTBA_FIX_319 = 1;

// Importing packages
const TelegramBotApi = require("node-telegram-bot-api");

// Importing constants
const TOKEN = require("../hidden-folder/token");

// Creating the bot instance.
const catsBot = new TelegramBotApi(TOKEN, { polling: true });

catsBot.onText(/\/start/, function(msg) {
  var fromId = msg.from.id;
  catsBot.sendMessage(
    fromId,
    "Hello Friend! I am the Awesome Cats Bot. I am here to serve you some cat photos and gifs. Try `/cat` to see it."
  );
});

catsBot.onText(/\/cat/, function(msg) {
  var fromId = msg.from.id;
  catsBot.sendMessage(fromId, 'Cat photo haha');
});

catsBot.onText(/\/echo (.+)/, function(msg, match) {
  var fromId = msg.from.id;
  var resp = match[1]; 
  catsBot.sendMessage(fromId, resp);
});

catsBot.on("polling_error", err => console.log(err));
