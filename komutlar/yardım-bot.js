const { MessageEmbed } = require("discord.js")

const { prefix } = require('../ayarlar.json');

exports.run = async(client, message, args) => {

    let moderasyonsize = client.commands.filter(cmds => cmds.help.kategori == "bot").map(cmd0 => cmd0.help.kategori == "bot").length;

  const embed = new MessageEmbed()

 .setAuthor(``,client.user.avatarURL())

 .setThumbnail('')

 .setColor('0c09e5')

 .setDescription(`

╔═════════════╣Narcos Code╠═══════════════
║
║<:879812557530087434:881951009646211143>  **Bu Bot Narcos Code Tarafından Yapılmıştır. 
║ En Gelişmiş Ve Panelden Yönetilebilen Bir Bot Sunucunuzu 
║ Korumasını Bilen Gelişmiş Moderasyon Komutları Vardır.**
║
╠═════════════╣Ana Menü╠══════════════════
║
║
${client.commands

  .filter(c=>c.help.kategori=== "bot")

  .map(kmt=>`║ <:880072774041878609:881951010057240626> **${prefix}${kmt.help.name}** = ${kmt.help.description || "**Açıklama Eklenmemiş**"}`)

  .join('\n')}
║
║
╠═══════════════════════════════════════════
║
║⎾[Davet Linki](https://discord.com/oauth2/authorize?client_id=881891825869291532&scope=bot&permissions=8)⏌ ⎾[Destek Sunucusu](https://discord.gg/pnjjp5BDxN)⏌
║
╚═════════════════════════════════════════════`)
  
  .setTimestamp()  

message.channel.send(embed) 

}

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: ["help-bot"],

  permLevel: 0,

  botPermLevel: 0

};

exports.help = {

  name: 'yardım-bot',

  description: 'Botun   komutlarını görürsün.',

  usage: '!yardım',

  kategori: "yardım"

};