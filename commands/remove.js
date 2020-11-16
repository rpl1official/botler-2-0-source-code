const { MessageEmbed } = require("discord.js");
const sendError = require("../util/error");
let embed = new MessageEmbed();

module.exports = {
  info: {
    name: "remove",
    description: "Menghapus musik dalam antrian sesuai keinginan",
    usage: "<urutan>",
    aliases: ["rm"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel)return sendError("Kamu harus di dalam voice channel!", message.channel);
    
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)return sendError("Sedang tidak memutar musik apapun, tidak ada yang dihentikan.", message.channel);
    
    if(args[0] < 1) {
      return sendError(`Mau nomor berapa yang dihapus? cara pemakaian ${client.config.PREFIX}remove <urutan>`, message.channel);
    }
    
    if(isNaN(args[0])) {
      return sendError("Tolong ya tolong, masukin angka aja", message.channel);
    }
    
    if(args[0] > serverQueue.songs.length) {
      return sendError("hah ko gaada?, aku ga nemuin lagunya, yang mana maksudmu?", message.channel);
    }
    
    serverQueue.songs.splice(args[0] - 1, 1);
    message.channel.send("sukses menghapus musik");
    message.react("✅")
  },
};
