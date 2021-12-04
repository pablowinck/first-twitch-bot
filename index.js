const tmi = require("tmi.js");
const dotenv = require("dotenv").config();

const BotName = "name of bot";
const ChannelName = "channel twitch name";
const opts = {
  identity: {
    username: BotName,
    password: process.env.TOKEN,
  },
  channels: [ChannelName],
};
const client = new tmi.client(opts);

const commands = {
  "!formação": () => {
    client.say(
      ChannelName,
      "Fiz técnico em informática, com enfoque em desenvolvimento em Java. Tenho mais ou menos 4 anos de experiência em desenvolvimento de sotware"
    );
  },
  "!help": () => {
    client.say(
      ChannelName,
      "!formação - Retorna formação e tempo de experiência"
    );
  },
};

function recivedMessage(target, context, msg, bot) {
  console.log(`[${target}] ${context.username}: ${msg}`);
  if (bot) {
    return;
  }

  if (msg.startsWith("!")) {
    const command = msg.slice(1);
    if (command in commands) {
      commands[command]();
    }
  }
}
client.on("message", recivedMessage);
client.on("connected", () => {
  console.log("Bot is on!");
});

client.connect();
