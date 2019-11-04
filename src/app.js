process.env.NTBA_FIX_319 = 1;

// Importing packages
const Telegraf = require("telegraf");

// Importing project inner stuff
const { telegramAPIToken } = require("../hidden-folder/keys");
const CatApi = require("../services/CatAPI");
const Markup = require("telegraf/markup");

// Creating the bot instance.
const catsBot = new Telegraf(telegramAPIToken, { polling: true });

const sendCatPhoto = ctx => {
  if (ctx.match && ctx.match[0].includes("-")) {
    CatApi.getCategoryCatPhoto(ctx.match[0].split("-")[1]).then(catPhoto => {
      ctx.replyWithPhoto({
        url: catPhoto[0].url,
        filename: "kitten.jpg"
      });
    });
  } else
    CatApi.getRandomCatPhoto().then(catPhoto => {
      ctx.replyWithPhoto({
        url: catPhoto[0].url,
        filename: "kitten.jpg"
      });
    });
};

const sendCategories = ctx => {
  CatApi.getAvalibleCategories().then(categories => {
    const reply = categories.reduce((acc, { name, id }, index) => {
      if (index % 2 === 1) {
        acc[Math.trunc(index / 2)].push(
          Markup.callbackButton(
            name.charAt(0).toUpperCase() + name.slice(1),
            `cat-${id}`
          )
        );
        return acc;
      }
      return [
        ...acc,
        [
          Markup.callbackButton(
            name.charAt(0).toUpperCase() + name.slice(1),
            `cat-${id}`
          )
        ]
      ];
    }, []);
    ctx.reply(
      "Theese are avalible categories:",
      Markup.inlineKeyboard(reply).extra()
    );
  });
};

catsBot.start(ctx => {
  ctx.reply(
    "Hello Friend! I am the Awesome Cats Bot. I am here to serve you some cat photos and gifs.",
    Markup.inlineKeyboard([
      Markup.callbackButton("Cat photo!", "cat"),
      Markup.callbackButton("Show Categories!", "categories")
    ]).extra()
  );
});

catsBot.help(ctx => ctx.reply("Use /cat."));

catsBot.on("text", ctx => {
  const { text, from: {username} } = ctx.update.message;
  if(username === 'fanyashaf') {
    ctx.reply("Mary, hello. I know it's you. I (Ladick) love you so much!!!");
  }
  if (text.match(/\/cat/)) {
    sendCatPhoto(ctx);
  } else {
    ctx.reply("Try /help if you stuck.");
  }
});

catsBot.action(/cat-\d+/, sendCatPhoto);
catsBot.action("cat", sendCatPhoto);
catsBot.action("categories", sendCategories);

catsBot.on("error", err => console.log(err));

catsBot.launch();
