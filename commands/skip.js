const sendError = require("../util/error");

module.exports = {
  info: {
    name: "skip",
    description: "Untuk melewati lagu yang sedang diputar",
    usage: "",
    aliases: ["s"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("Kamu harus di dalam voice channel!", message.channel);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("Sedang tidak memutar lagu apapun, tidak ada yang di lewati.", message.channel);
    serverQueue.connection.dispatcher.end("Musik dilewati");
    message.react("✅")
  },
};
