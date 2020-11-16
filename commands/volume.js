const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "volume",
    description: "Merubah volume musik",
    usage: "[volume]",
    aliases: ["v", "vol"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("Kamu harus di dalam voice channel!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return sendError("Sedang tidak memutar musik apapun.", message.channel);
    if (!args[0])return message.channel.send(`Volume saat ini : **${serverQueue.volume}**`);
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    let xd = new MessageEmbed()
    .setDescription(`Mengatur volume ke : **${args[0]}**`)
    .setAuthor("Volume Musik", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor("BLUE")
    return message.channel.send(xd);
  },
};
