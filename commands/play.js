const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const sendError = require("../util/error")

module.exports = {
  info: {
    name: "play",
    description: "Untuk memutar lagu :D",
    usage: "<judul lagu>",
    aliases: ["p"],
  },

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
    if (!channel)return sendError("Kamu harus didalam voice channel untuk memutar lagu!", message.channel);

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT"))return sendError("Gagal masuk kedalam channel, pastikan saya memiliki izin!", message.channel);
    if (!permissions.has("SPEAK"))return sendError("Tidak dapat memutar lagu, pastikan saya memiliki izin berbicara!", message.channel);

    var searchString = args.join(" ");
    if (!searchString)return sendError("Masukin judulnya dong sayangg", message.channel);

    var serverQueue = message.client.queue.get(message.guild.id);

    var searched = await yts.search(searchString)
    if(searched.videos.length === 0)return sendError("Saya tidak menemukan musik itu di YouTube", message.channel)
    var songInfo = searched.videos[0]

    const song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, ' '),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
    };

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
      .setAuthor("Musik ditambahkan kedalam antrian", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("YELLOW")
      .addField("Judul", song.title, true)
      .addField("Durasi", song.duration, true)
      .addField("Permintaan Oleh", song.req.tag, true)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
      return message.channel.send(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 3,
      playing: true,
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        message.channel.send("Musik dihentikan, Bot meninggalkan channel karena dihentikan")
        queue.voiceChannel.leave();//If you want your bot stay in vc 24/7 remove this line :D
        message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          queue.songs.shift();
          play(queue.songs[0]);
        })
        .on("error", (error) => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      let thing = new MessageEmbed()
      .setAuthor("Mulai memutar lagu!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Judul", song.title, true)
      .addField("Durasi", song.duration, true)
      .addField("Permintaan Oleh", song.req.tag, true)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      queueConstruct.connection = connection;
      channel.guild.voice.setSelfDeaf(true)
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`Gagal konek : ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      return sendError(`Gagal konek voice channel : ${error}`, message.channel);
    }
  }
};