const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async (client, message, args) => {
const prefix = await db.fetch(`prefix.${message.guild.id}`) || client.ayarlar.prefix;
const ad = await db.fetch(`numara.${message.channel.id}`)
if(!ad) {
ad = '0' }
  
if(message.channel.name === `ticket-${ad}` || message.channel.name === `closed-${ad}`) {
const ann = await db.fetch(`asd.${message.guild.id}.${message.channel.id}.${message.author.id}`)
if(!ann) return message.channel.send(`Bu bilet senin değil.`)
message.delete()

message.channel.send(new Discord.MessageEmbed()
.setColor('#ffff00')
.setDescription(`Bilet ${message.author} tarafından kapatıldı.`))
message.channel.setName(`closed-${ad}`)
message.channel.send(new Discord.MessageEmbed()
.setColor('RED')
.setDescription(`:unlock:: Ticketi tekrar açar.
:no_entry:: Ticketi siler.`)).then(m => {
m.react('🔓')
m.react('⛔')
let sil = (reaction, user) => reaction.emoji.name === "⛔" && user.id !== client.user.id && user.id == message.author.id
let sill = m.createReactionCollector(sil, { time: 0 });
let geri = (reaction, user) => reaction.emoji.name === "🔓" && user.id !== client.user.id && user.id == message.author.id
let geriaç = m.createReactionCollector(geri, { time: 0 });

geriaç.on('collect', async reaction => {
const author = reaction.users.last()
m.delete('500')
reaction.remove(author.id) 
message.channel.send(new Discord.MessageEmbed()
.setColor('GREEN')
.setDescription(`Bilet ${message.author} tarafından tekrar açıldı.`))
message.channel.setName(`ticket-${ad}`)
})

sill.on('collect', async reaction => {
const author = reaction.users.last()
reaction.remove(author.id) 
message.channel.send(new Discord.MessageEmbed()
.setColor('RED')
.setDescription(`Bilet 5 saniye sonra ebediyen silinecek.`))
setTimeout(async () => {
message.channel.delete()
await db.delete(`asd.${message.guild.id}.${message.channel.id}`)
}, 5000)

})  

})
  

} else { return message.channel.send(`Bu komutu bir bilet kanalında kullanın.`) }

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'kapat',
    kategori: "ticket"
};