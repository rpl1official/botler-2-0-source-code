const { MessageEmbed, Client } = require("discord.js");
const sendError = require("../../util/error");
const get = require('got');
const client = new Client();

module.exports = {
  info: {
    name: "wiki",
    description: "Mencari informasi dalam wiki",
    usage: "<kata kunci>",
    aliases: [""],
  },

  run: async function (client, message, args) {
    
    var searchString = args.join(" ");
    if (!searchString)return sendError("Masukin kata kuncinya dong sayangg", message.channel);
    
    const tul = encodeURIComponent(message);
    const query_ = tul.slice(6);
    const wiki = await get.get(`https://mhankbarbar.herokuapp.com/api/wiki?q=${query_}&lang=id&apiKey=${process.env.ALLAPI}`).json()
    if (wiki.error) {
        return sendError(wiki.error, message.channel);
    }
        message.channel.send(`➸ *Hasil* : ${wiki.source}`);
    
  },
};
