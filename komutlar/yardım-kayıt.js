const { MessageEmbed } = require("discord.js")

const { prefix } = require('../ayarlar.json');

exports.run = async(client, message, args) => {

    let moderasyonsize = client.commands.filter(cmds => cmds.help.kategori == "kayıt").map(cmd0 => cmd0.help.kategori == "kayıt").length;

  const embed = new MessageEmbed()

 .setAuthor(``,client.user.avatarURL())

 .setThumbnail('')

 .setColor('0c09e5')

 .setDescription(`

╔═════════════╣Narcos Code╠═════════════════
║
║<:879812557530087434:881951009646211143>  **Bu Bot Narcos Code Tarafından Yapılmıştır. 
║ Ultra Gelişmiş Ayarlamalı Kayıt Botu**
║
╠═════════════╣Kayıt Menü╠═══════════════════
║
${client.commands

  .filter(c=>c.help.kategori=== "kayıt")

  .map(kmt=>`║ <:880072774041878609:881951010057240626> **${prefix}${kmt.help.name}** = ${kmt.help.description || "**Açıklama Eklenmemiş**"}`)

  .join('\n')}
║
║
╠═════════════════════════════════════════
║
║⎾[Davet Linki](https://discord.com/oauth2/authorize?client_id=881891825869291532&scope=bot&permissions=8)⏌ ⎾[Destek Sunucusu](https://discord.gg/pnjjp5BDxN)⏌
║
╚══════════════════════════════════════════`)
  
  .setTimestamp()  

message.channel.send(embed) 

}

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: ["help-register"],

  permLevel: 0,

  botPermLevel: 0

};

exports.help = {

  name: 'yardım-kayıt',

  description: 'Botun Kayıt  komutlarını görürsün.',

  usage: '!yardım-kayıt',

  kategori: "yardım"

};