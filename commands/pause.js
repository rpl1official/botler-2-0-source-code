const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "pause",
    description: "Untuk menjeda musik yang sedang diputar",
    usage: "",
    aliases: ["jeda"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      let xd = new MessageEmbed()
      .setDescription("⏸ Musik Terjeda!")
      .setColor("YELLOW")
      .setAuthor("Musik telah terjeda!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      return message.channel.send(xd);
    }
    return sendError("Sedang tidak memutar apapun.", message.channel);
  },
};
