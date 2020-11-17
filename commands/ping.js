const { MessageEmbed, Client } = require("discord.js");
const sendError = require("../util/error");
const client = new Client();

module.exports = {
  info: {
    name: "ping",
    description: "Cek ping bot dan latency",
    usage: "",
    aliases: [""],
  },

  run: async function (client, message, args) {
    
    var ping = `${Date.now() - message.createdTimestamp} ms`;
    
    let embed = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(`➸ Ping Bot : ${client.ws.ping}\n\n ➸ Latency : ${ping}`)
    message.channel.send(embed);
  
  },
};
