const { MessageEmbed, Client } = require("discord.js");
const sendError = require("../../util/error");
const get = require('got');
const client = new Client();

module.exports = {
  info: {
    name: "nulis",
    description: "Teks ke Gambar",
    usage: "<tulisan>",
    aliases: [""],
  },

  run: async function (client, message, args) {
    
    var searchString = args.join(" ");
    if (!searchString)return sendError("Masukin tulisannya dong sayangg", message.channel);
    
    const tul = encodeURIComponent(message);
    const nulis = tul.slice(11, tul.length);
    let urlnulis = `https://mhankbarbar.herokuapp.com/nulis?text=${nulis}&apiKey=${process.env.ALLAPI}`
    const tulis = await get.get(urlnulis).json()
    
    const { result } = tulis
    
    let embed = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(`Nulis Selesai`)
    message.channel.send(embed);    
    message.channel.send(result);
    
  },
};
