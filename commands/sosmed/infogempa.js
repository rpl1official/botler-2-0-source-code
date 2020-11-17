const { MessageEmbed, Client } = require("discord.js");
const sendError = require("../../util/error");
const get = require('got');
const client = new Client();

module.exports = {
  info: {
    name: "infogempa",
    description: "Mengetahui informasi gempa dari BMKG",
    usage: "",
    aliases: [""],
  },

  run: async function (client, message, args) {
    
    const bmkg = await get.get(`https://mhankbarbar.herokuapp.com/api/infogempa?apiKey=${process.env.ALLAPI}`).json()
    const { potensi, koordinat, lokasi, kedalaman, magnitude, waktu, map } = bmkg
    const hasil = `*${waktu}*\n📍 *Lokasi* : *${lokasi}*\n〽️ *Kedalaman* : *${kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${potensi}*\n📍 *Koordinat* : *${koordinat}*`;
    
    
    let embed = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(hasil)
    message.channel.send(embed);
    message.channel.send(map);
    
  },
};
