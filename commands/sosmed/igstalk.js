const { MessageEmbed, Client } = require("discord.js");
const sendError = require("../../util/error");
const get = require('got');
const client = new Client();

module.exports = {
  info: {
    name: "igstalk",
    description: "Melihat informasi instagram seseorang",
    usage: "<username>",
    aliases: [""],
  },

  run: async function (client, message, args) {
    
    var searchString = args.join(" ");
    if (!searchString)return sendError("Masukin usernamenya dong sayangg", message.channel);
    
    if(args[0].length <= 2) {
      return sendError(`Username terlalu pendek!`, message.channel);
    }
    
    const stalk = await get.get(`https://mhankbarbar.herokuapp.com/api/stalk?username=${args[0]}&apiKey=${process.env.ALLAPI}`).json()
                if (stalk.error) return sendError(stalk.error, message.channel);
                const { Biodata, Jumlah_Followers, Jumlah_Following, Jumlah_Post, Name, Username, Profile_pic } = stalk
                const caps = `➸ *Nama* : ${Name}\n➸ *Username* : ${Username}\n➸ *Jumlah Followers* : ${Jumlah_Followers}\n➸ *Jumlah Following* : ${Jumlah_Following}\n➸ *Jumlah Postingan* : ${Jumlah_Post}\n➸ *Biodata* : ${Biodata}`;
      
    let embed = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(caps)
    .setThumbnail(Profile_pic)
    message.channel.send(embed);
    
  },
};
