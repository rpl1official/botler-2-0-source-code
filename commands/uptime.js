const { MessageEmbed, Client } = require("discord.js");
const sendError = require("../util/error");
const client = new Client();

module.exports = {
  info: {
    name: "uptime",
    description: "Cek uptime bot",
    usage: "",
    aliases: [""],
  },

  run: async function (client, message, args) {
    
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    
    let embed = new MessageEmbed()
    .setAuthor("Uptime BOT ","https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor("BLUE")
    .setDescription(`➸ ${days} Hari\n➸ ${hours} Jam\n➸ ${minutes} Menit\n➸ ${seconds} Detik`)
    message.channel.send(embed);
  
  },
};
