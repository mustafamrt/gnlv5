const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async (client, message, args) => {
const prefix = await db.fetch(`prefix.${message.guild.id}`) || client.ayarlar.prefix;
if(!message.member.hasPermission('ADMINISTRATOR')) return;
  
if(args[0] === 'ayarla') {

const kanalbelirle = await db.fetch(`kanal.${message.guild.id}`)
if(kanalbelirle) return message.channel.send(`Mesajı göndereceğim kanal zaten ayarlı: ${prefix}ticket-kanal sıfırla`)
let kanal = message.mentions.channels.first()
if(!args[1]) return message.channel.send(`Bir kanalı etiketlemelisin.`)
if(!kanal) return message.channel.send(`Etiketlediğin kanalı bulamıyorum.`)
await db.set(`kanal.${message.guild.id}`, kanal.id)
message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`Mesajın kanalı başarıyla ayarlandı: ${prefix}ticket gönder`))
}

if(args[0] === 'sıfırla') {
const kanalbelirle = await db.fetch(`kanal.${message.guild.id}`)
if(!kanalbelirle) return message.channel.send(`Mesajı göndereceğim kanal zaten ayarlı değil: ${prefix}ticket-kanal sıfırla`)

await db.delete(`kanal.${message.guild.id}`)
message.channel.send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`Mesajın kanalı başarıyla sıfırlandı: ${prefix}ticket-kanal ayarla #channel`))
}//Narcos Code tarafından türkçe çevrildi
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bilet-kanal'],
  permLevel: 0
}

exports.help = {
  name: 'ticket-kanal',
    kategori: "ticket"
}; 