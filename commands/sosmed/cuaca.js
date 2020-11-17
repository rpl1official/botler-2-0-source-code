const { MessageEmbed, Client } = require("discord.js");
const sendError = require("../../util/error");
const get = require('got');
const client = new Client();

module.exports = {
  info: {
    name: "cuaca",
    description: "Periksa cuaca pada suatu tempat",
    usage: "<lokasi>",
    aliases: [""],
  },

  run: async function (client, message, args) {
    
    var searchString = args.join(" ");
    if (!searchString)return sendError("Masukin tulisannya dong sayangg", message.channel);
    
    const mess = encodeURIComponent(message);
    const resmess = mess.slice(11, mess.length);
    const weather = await get.get(`https://mhankbarbar.herokuapp.com/api/cuaca?q=${resmess}&apiKey=${process.env.ALLAPI}`).json()
    if (weather.error) {
        return sendError(weather.error, message.channel);
    }
        const result = `➸ Tempat : ${weather.result.tempat}\n\n➸ Angin : ${weather.result.angin}\n➸ Cuaca : ${weather.result.cuaca}\n➸ Deskripsi : ${weather.result.desk}\n➸ Kelembapan : ${weather.result.kelembapan}\n➸ Suhu : ${weather.result.suhu}\n➸ Udara : ${weather.result.udara}`;
    
    
    let embed = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(result)
    message.channel.send(embed);
    
  },
};
