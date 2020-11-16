const { MessageEmbed, Client } = require("discord.js");
const sendError = require("../../util/error");
const get = require('got');
const client = new Client();

module.exports = {
  info: {
    name: "text2img",
    description: "Teks ke Gambar",
    usage: "<tulisan>",
    aliases: [""],
  },

  run: async function (client, message, args) {
    
    var searchString = args.join(" ");
    if (!searchString)return sendError("Masukin tulisannya dong sayangg", message.channel);
    
    const tul = encodeURIComponent(message);
    const ulis = tul.slice(14, tul.length);
    
    const nulis = await get.get(`https://mhankbarbar.herokuapp.com/api/text2image?text=${ulis}&apiKey=${process.env.ALLAPI}`).json()
    if (nulis.error) return sendError(nulis.error, message.channel);
    
    const { result } = nulis
    
    let embed = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(`Konversi Selesai`)
    message.channel.send(embed);    
    message.channel.send(result);
    
  },
};
