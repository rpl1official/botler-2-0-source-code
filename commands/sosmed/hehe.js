const { MessageEmbed, Client } = require("discord.js");
const sendError = require("../../util/error");
const get = require('got');
const client = new Client();

module.exports = {
  info: {
    name: "hehe",
    description: "Download video dari Hehe XN",
    usage: "<link>",
    aliases: ["xnxx"],
  },

  run: async function (client, message, args) {
    
    var searchString = args.join(" ");
    if (!searchString)return sendError("Masukin linknya dong sayangg", message.channel);
    
    if(args[0].length <= 8) {
      return sendError(`Link terlalu pendek!`, message.channel);
    }
    
    const xnxx = await get.get(`https://mhankbarbar.herokuapp.com/api/xnxx?url=${args[0]}&apiKey=${process.env.ALLAPI}`).json()
    if (xnxx.error) return sendError(xnxx.error, message.channel);
    
    const { result } = xnxx
    const caps = `➸ *Judul* : ${result.judul}\n➸ *Deskripsi* : ${result.desc}\n➸ *Ukuran File* : ${result.size}\n➸ *Cara Download* : Klik link berikut kemudian pencet titik tiga, lalu download.`;
    
    let embed = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(caps)
    .setThumbnail(result.thumb)
    message.channel.send(embed);    
    message.channel.send(result.vid);
    
  },
};
