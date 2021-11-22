const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async (client, message, args) => {
const prefix = await db.fetch(`prefix.${message.guild.id}`) || client.ayarlar.prefix;
  
if(args[0] === 'gönder') {
const kanalbelirle = await db.fetch(`kanal.${message.guild.id}`)
if(!kanalbelirle) return message.channel.send(`Mesajı göndereceğim kanalı ayarlamamışsın: ${prefix}ticket-kanal ayarla #channel`)
client.channels.cache.get(kanalbelirle).send(new Discord.MessageEmbed()
.setTitle(`Narcos Code Ticket Bot Altyapısı`)
.setFooter(`Narcos Code Ticket Bot Altyapısı - Ticketing without clutter.`, client.user.avatarURL())
.setColor('GREEN')
.setDescription(`📩 tepkisine tıklayıp bir bilet oluşturabilirsiniz.`)).then(m => {
m.react('📩')
let açç = (reaction, user) => reaction.emoji.name === "📩" && user.id !== client.user.id
let aç = m.createReactionCollector(açç, { time: 0 });  

aç.on('collect', async reaction => {
const author = reaction.users.cache.last()
reaction.users.remove(author.id)
const sd = await db.fetch(`ass.${message.guild.id}.${author.id}`)

await db.add(`numara.${message.guild.id}`, 1)
const as = await db.fetch(`numara.${message.guild.id}`)
message.guild.channels.create(`ticket-${as}`).then(async s => {
await db.add(`numara.${s.id}`, as)// Narcos Code 
await db.set(`ass.${message.guild.id}.${author.id}`, s.id)
await db.set(`asd.${message.guild.id}.${s.id}.${author.id}`, 'ticketaçma')
let role = message.guild.roles.cache.find(r => r.name === '@everyone')
s.createOverwrite(role, { 'VIEW_CHANNEL': false });
message.guild.members.cache.forEach(u => {
if(u.hasPermission('MANAGE_GUILD')) { 
s.createOverwrite(u, { 'VIEW_CHANNEL':true, 'SEND_MESSAGES':true, 'MANAGE_MESSAGES':true, 'MANAGE_CHANNELS':true }); }})
s.createOverwrite(author, { 'VIEW_CHANNEL':true, 'SEND_MESSAGES':true });
s.send(`${author}, Hoşgeldin!`, new Discord.MessageEmbed()
.setColor('GREEN')
.setDescription(`Çok yakın zaman da seninle ilgileneceğiz.
Bileti kapatmak istersen: 🔒`)
.setFooter(`Narcos Code Ticket Bot Altyapısı - Ticketing without clutter`, client.user.avatarURL())).then(m => {
m.react(`🔒`)
let si = (reaction, user) => reaction.emoji.name === "🔒" && user.id !== client.user.id
let s23 = m.createReactionCollector(si, { time: 0 });

s23.on('collect', async reaction => {
const author = reaction.users
reaction.users.remove(author.id) 
m.react(`✅`)
m.react(`❌`)
let sil = (reaction, user) => reaction.emoji.name === "✅" && user.id !== client.user.id
let sill = m.createReactionCollector(sil, { time: 0 });
let ss = (reaction, user) => reaction.emoji.name === "❌" && user.id !== client.user.id
let s2 = m.createReactionCollector(ss, { time: 0 });
s2.on('collect', async reaction => {
s.messages.fetchs({limit:10}).then(async messages => { 


})})
sill.on('collect', async reaction => {
let us = reaction.users.cache.last()
reaction.users.remove(us.id)
s.send(new Discord.MessageEmbed()
.setColor('#ffff00')
.setDescription(`Bilet ${us} tarafından kapatıldı.`))
s.setName(`closed-${as}`)
s.send(new Discord.MessageEmbed()
.setColor('RED')
.setDescription(`:unlock:: Ticketi tekrar açar.
:no_entry:: Ticketi siler.`)).then(m2 => {
m2.react('🔓')
m2.react('⛔')
let sil = (reaction, user) => reaction.emoji.name === "⛔" && user.id !== client.user.id
let sill = m2.createReactionCollector(sil, { time: 0 });
let geri = (reaction, user) => reaction.emoji.name === "🔓" && user.id !== client.user.id
let geriaç = m2.createReactionCollector(geri, { time: 0 });

geriaç.on('collect', async reaction => {
const author = reaction.users.cache.last()
m2.delete({timeout: 5000})
reaction.users.remove(author.id) 
s.send(new Discord.MessageEmbed()//Narcos Code tarafından türkçe çevrildi
.setColor('GREEN')
.setDescription(`Bilet ${author} tarafından tekrar açıldı.`))
s.setName(`ticket-${as}`)
})

sill.on('collect', async reaction => {
const author = reaction.users.cache.last()
reaction.users.remove(author.id) 
s.send(new Discord.MessageEmbed()
.setColor('RED')
.setDescription(`Bilet 5 saniye sonra ebediyen silinecek.`))
setTimeout(async () => {
s.delete()
const sd = await db.fetch(`ass.${message.guild.id}.${author.id}`)
await db.delete(`asd.${message.guild.id}.${author.id}`)
await db.delete(`asd.${message.guild.id}.${s.id}.${author.id}`)
}, 5000)

})  

})
})
})
})
  
  
})

})  

})
}
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bilet'],
  permLevel: 0
}

exports.help = {
  name: 'ticket',
    kategori: "ticket"
};