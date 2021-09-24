const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async(client,message, args) => {
   if(!args[0])  return message.channel.send(new Discord.MessageEmbed()
.setColor('BLUE')
.setFooter( "Narcos Code Genel V5", client.user.avatarURL())
.setDescription('**Birşeyler Yazman Gerek!**\n**u!gelen-giden ayarla #kanal** - **Gelen-Giden sistemini ayarlar.** \n**u!gelen-giden sıfırla** - **Gelen-Giden sistemini sıfırlar.**'))

  if(args[0] === "ayarla") {

     var kanal = message.mentions.channels.first()
if(!kanal) return message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setFooter( "Narcos Code Genel V5", client.user.avatarURL()).setDescription('Bir kanal etiketlemelisin.'))
 
    await db.set(`gelenGiden_${message.guild.id}`, kanal.id)
  
    return message.channel.send(new Discord.MessageEmbed()
.setColor('BLUE')
.setFooter( "Narcos Code Genel V5", client.user.avatarURL())
.setDescription('**Gelen-Giden Sistemi Aktif!**\n**Üye gelince mesajın gideceği kanal** <#' +kanal.id+ '> **Olarak ayarlandı!**'))
  }
  
  if(args[0] === "sıfırla") {
          await db.delete(`gelenGiden_${message.guild.id}`)
          return message.channel.send(new Discord.MessageEmbed()
.setColor('BLUE')
.setFooter( "Narcos Code Genel V5", client.user.avatarURL())
.setDescription('**Gelen-Giden Sistemi Sıfırlandı!**'))

  }

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hgbb", "hg-bb", "gelengiden"],
  permlevel: 3
}

exports.help = {
  name: "gelen-giden",
        kategori: "ayarlama"
}