const { MessageEmbed, Client } = require("discord.js");
const sendError = require("../../util/error");
const get = require('got');
const client = new Client();

module.exports = {
  info: {
    name: "fbvid",
    description: "Download video dari Facebook",
    usage: "<link>",
    aliases: [""],
  },

  run: async function (client, message, args) {
    
    var searchString = args.join(" ");
    if (!searchString)return sendError("Masukin linknya dong sayangg", message.channel);
    
    if(args[0].length <= 11) {
      return sendError(`Link terlalu pendek!`, message.channel);
    }
    
    const epbe = await get.get(`https://mhankbarbar.herokuapp.com/api/epbe?url=${args[0]}&apiKey=${process.env.ALLAPI}`).json()
    if (epbe.error) return sendError(epbe.error, message.channel);
    
    const { filesize, published, result, status, title} = epbe
    const caps = `➸ *Judul* : ${title}\n➸ *Tanggal Publikasi* : ${published}\n➸ *Ukuran File* : ${filesize}\n➸ *Cara Download* : Klik link berikut otomatis akan terdownload.`;
    
    let embed = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(caps)
    message.channel.send(embed);
    message.channel.send(epbe.result)
    
  },
};
