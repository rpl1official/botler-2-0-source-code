const { MessageEmbed, Client } = require("discord.js");
const sendError = require("../../util/error");
const get = require('got');
const client = new Client();

module.exports = {
  info: {
    name: "doujindownload",
    description: "Download Doujin",
    usage: "<kode_nuklir>",
    aliases: [""],
  },

  run: async function (client, message, args) {
    
    var searchString = args.join(" ");
    if (!searchString)return sendError("Masukin kodenya dong sayangg", message.channel);
    
    message.channel.send('Tunggu Sebentar...')
    
    const doujin = await get.get(`https://mhankbarbar.herokuapp.com/api/nhentai?type=download&nuklir=${args[0]}&apiKey=${process.env.ALLAPI}`).json()
    if (doujin.error) {
        return sendError(doujin.error, message.channel);
    }
    const result = `➸ Judul : ${doujin.title}\n\n➸ Artis : ${doujin.artists}\n➸ Kategori : ${doujin.categories}\n➸ Tag : ${doujin.tags}\n➸ Bahasa : ${doujin.languages}\n`;
    
    
    let embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("DOWNLOAD HASIL DISINI")
    .setDescription(result)
    .setThumbnail(doujin.thumb)
    .setURL(doujin.result)
    message.channel.send(embed);
    
  },
};
