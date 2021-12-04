import tmi from "tmi.js";
import { BOT_USERNAME, CHANNEL_NAME, OAUTH_TOKEN } from "./constants";

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: BOT_USERNAME,
    password: "oauth:" + OAUTH_TOKEN,
  },
  channels: [CHANNEL_NAME],
});

const say = (message) => {
  client.say(CHANNEL_NAME, message);
};

const commands = {
  "!formação": () => {
    say(
      "Fiz técnico em informática, com enfoque em desenvolvimento em Java. Tenho mais ou menos 4 anos de experiência em desenvolvimento de sotware"
    );
  },
  "!setup": () => {
    say(
      "CPU i9 9900k, RAM 16gb 3000mhz XPG, COOLER Water Cooler Corsair h100x, FONTE Redragon 500w, SSD XPG S41 TUF, 256GB, 3500MB/s 1000MB/s"
    );
  },
  "!help": () => {
    say(
      "!formação - Retorna formação e tempo de experiência\n!setup - Retorna configurações do pc"
    );
  },
};

function recivedMessage(target, context, msg, bot) {
  console.log(`[${target}] ${context.username}: ${msg}`);
  if (bot) {
    return;
  }

  if (msg.startsWith("!")) {
    const command = msg;
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
