process.env.NTBA_FIX_319 = 1;

const TelegramBotApi = require("node-telegram-bot-api");

const TOKEN = require("./hidden-folder/token");

const catsBot = new TelegramBotApi(TOKEN, { polling: true });

catsBot.onText(/\/start/, function (msg, match) {
    var fromId = msg.from.id; 
    console.log(msg)
    catsBot.sendMessage(fromId, 'Hello Friend! I am the Awesome Cats Bot. I am here to serve you some cat photos and gifs. ');
});

catsBot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id; // Получаем ID отправителя
    var resp = match[1]; // Получаем текст после /echo
    catsBot.sendMessage(fromId, resp);
});

catsBot.on("polling_error", (err) => console.log(err));