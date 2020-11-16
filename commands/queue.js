const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "queue",
    description: "Untuk melihat daftar antrian musik",
    usage: "",
    aliases: ["q", "list", "songlist", "antrian"],
  },

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Sedang tidak memutar musik apapun.", message.channel);

    let queue = new MessageEmbed()
    .setAuthor("List Antrian Musik", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor("BLUE")
    .addField("Sedang memutar", serverQueue.songs[0].title, true)
    .addField("Text Channel", serverQueue.textChannel, true)
    .addField("Voice Channel", serverQueue.voiceChannel, true)
    .setDescription(serverQueue.songs.map((song) => {
      if(song === serverQueue.songs[0])return
      return `${serverQueue.songs
              .map((song, index) => index + 1 + ". " + song.title)
              .join("\n\n")}`
    }).join("\n\n\n"))
    .setFooter("Volume  "+serverQueue.volume)
    if(serverQueue.songs.length === 1)queue.setDescription(`Tidak ada musik, untuk menambah masukkan perintah \`\`${client.config.prefix}play <judul_lagu>\`\``)
    message.channel.send(queue)
  },
};