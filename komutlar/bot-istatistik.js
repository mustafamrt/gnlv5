const Discord = require('discord.js');
const prettyMilliseconds = require("pretty-ms");

exports.run = async(client, message, args) => {
 
  const kulsayi = []
    client.guilds.cache.forEach((item, i) => {
        kulsayi.push(item.memberCount)
    });
    var toplamkulsayi = 0
    for (var i = 0; i < kulsayi.length; i++) {
        if (isNaN(kulsayi[i])){
            continue;
        }

        toplamkulsayi += Number(kulsayi[i])
    }
  
        message.channel.send('Gecikme hesaplanıyor...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            const embed = new Discord.MessageEmbed()
                .setTitle('Botun Anlık İstatistikleri :trophy:')
                .setColor('#0c09e5')
                .addField("Botun Gecikmesi :clock1:", `**${ping}ms**.`, true)
                .addField("API Gecikmesi :clock1:", `**${Math.round(message.client.ws.ping)}ms**.`, true)
                .addField('\u200B', '\u200B')
                .addField("Uptime :date:", `**${prettyMilliseconds(message.client.uptime)}** süredir aktif olarak çalışıyorum.`, true)
                .addField("**RAM Kullanımı :mechanic:**", `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}** MB`, true)
                .addField('\u200B', '\u200B')
                .addField("Hizmet Verilen Sunucu Sayısı :ringed_planet:", `${message.client.guilds.cache.size}`, true)
                .addField("Hizmet Verilen Kullanıcı Sayısı :dizzy:", `${toplamkulsayi}`, true)
                .setFooter(`${message.author.tag} tarafından istendi.`, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)
        })
    
}
exports.conf = {
  aliases: [],
  guildOnly : false,
  permLevel: 0
}
exports.help = {
  name: "istatistik",
      description: "Botun istatistiklerini gösterir",
    usage: "",
    kategori: "bot"
}