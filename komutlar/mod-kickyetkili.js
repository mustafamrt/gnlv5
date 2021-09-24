const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async(client, message, args) => {

  
  let rol = message.mentions.roles.first()
  
  if (!rol) return message.channel.send(`Lütfen Kick Yetkili Rolünü Belirtiniz.`)

  
 await db.set(`kickyetkili_${message.guild.id}`, rol.id)
message.channel.send(`Kick Yetkilisi Rolü **${rol.name}** Olarak Ayarlandı! `)
};
exports.conf = {
  aliases: [],
  permLevel: 4
};
exports.help = {
  name: 'kickyetkili',
  kategori: "mod"
};