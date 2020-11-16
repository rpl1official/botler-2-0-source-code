const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");

module.exports = {
  info: {
    name: "leave",
    description: "Menghentikan musik, Menghapus antrian, Mengeluarkan bot",
    usage: "",
    aliases: [],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("Kamu harus di dalam voice channel!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("Sedang tidak memutar musik apapun, tidak ada yang dihentikan.", message.channel);
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("Musik berhenti");
    message.react("✅")
  },
};
