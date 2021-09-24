exports.run = async (client, message, args) => {
    const ms = require('rhino-ms')
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`Bu Komudu Kullanmaya İznin Yok! \n <@${message.author.id}>`)
    const zaman = ms(args.join(" "), {birim: "saniye"})
    if(!args[0]) return message.channel.send("Lütfen Bir Zaman Dilimi Belirtin.\nÖrnek: u!yavaşmod 31s = Yavaş Mod 31 Saniye Olur.\nRakamın Sonunda H(saat) M(dakika) S(saniye) yazınız yoksa sistem çalışmaz.")
    if (zaman < 0 || zaman > 21600) return message.reply('Lütfen 0 Saniye ile 6 Saat Arası Süre Girin!')
    const slowmode = Math.floor(zaman)
    message.channel.setRateLimitPerUser(slowmode)
    const { MessageEmbed } = require('discord.js')
    const embed = new MessageEmbed()
    .setFooter( "UMEF-EK / Discord'da Yeni Devrim!", client.user.avatarURL())
    .setTimestamp()
    .setColor("BLUE")
    .setTitle('Yavaş Mod Ayarlandı')
    .setDescription(`**Slowmode Ayarlanan Kanal: ** <#${message.channel.id}>\n**Süre: **` + args.join(" "))
    message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yavaş-mod", "slowmode"],
  permLevel: 0
};

exports.help = {
  name: "yavaşmod",
  description: "yavaş modu ayarlarsınız",
  usage: "yavaşmod",
    kategori: "mod"
};