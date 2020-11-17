const { MessageEmbed, Client } = require("discord.js");
const sendError = require("../../util/error");
const get = require('got');
const fetch = require('node-fetch');
const client = new Client();

module.exports = {
  info: {
    name: "ytmp3",
    description: "Download audio dari YouTube",
    usage: "<link>",
    aliases: [""],
  },

  run: async function (client, message, args) {
    
    var searchString = args.join(" ");
    if (!searchString)return sendError("Masukin linknya dong sayangg", message.channel);
    
    const ytmp3 = await get.get(`https://mhankbarbar.herokuapp.com/api/yta?url=${args[0]}&apiKey=${process.env.ALLAPI}`).json()
    if (ytmp3.error) {
        return sendError(ytmp3.error, message.channel);
    }
        const result = `➸ Judul : ${ytmp3.title}\n\n➸ Ukuran : ${ytmp3.filesize}\n`;
    
    
    let embed = new MessageEmbed()
    .setColor("BLUE")
    .setAuthor("Audio siap di download ","https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setTitle("DOWNLOAD MP3 DISINI")
    .setDescription(result)
    .setThumbnail(ytmp3.thumb)
    .setURL(ytmp3.result)
    message.channel.send(embed);
    
  },
};
