const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error")

module.exports = {
  info: {
    name: "nowplaying",
    description: "Melihat musik yang sedang diputar",
    usage: "",
    aliases: ["np"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Sedang tidak memutar lagu.", message.channel);
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
      .setAuthor("Sedang memutar", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Judul", song.title, true)
      .addField("Durasi", song.duration, true)
      .addField("Permintaan oleh", song.req.tag, true)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
    return message.channel.send(thing)
  },
};
