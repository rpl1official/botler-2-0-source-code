const { MessageEmbed } = require('discord.js')

module.exports = {
    info: {
        name: "help",
        description: "Untuk melihat daftar perintah",
        usage: "[perintah]",
        aliases: ["command", "h", "perintah"]
    },

    run: async function(client, message, args){
        var allcmds = "";

        client.commands.forEach(cmd => {
            let cmdinfo = cmd.info
            allcmds+="``"+client.config.prefix+cmdinfo.name+" "+cmdinfo.usage+"`` ~ "+cmdinfo.description+"\n"
        })

        let embed = new MessageEmbed()
        .setAuthor("Daftar perintah "+client.user.username, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
        .setColor("BLUE")
        .setDescription(allcmds)
        .setFooter(`Untuk melihat detail perintah, kamu bisa ketik ${client.config.prefix}help [perintah] | BotLer`)

        if(!args[0])return message.channel.send(embed)
        else {
            let cmd = args[0]
            let command = client.commands.get(cmd)
            if(!command)command = client.commands.find(x => x.info.aliases.includes(cmd))
            if(!command)return message.channel.send("Perintah tidak dikenal")
            let commandinfo = new MessageEmbed()
            .setTitle("Perintah: "+command.info.name+" info")
            .setColor("YELLOW")
            .setDescription(`
Nama: ${command.info.name}
Deskripsi: ${command.info.description}
Penggunaan: \`\`${client.config.prefix}${command.info.name} ${command.info.usage}\`\`
Alias: ${command.info.aliases.join(", ")}
`)
            message.channel.send(commandinfo)
        }
    }
}
