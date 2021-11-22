const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async(client, message, args) => {

  
  let rol = message.mentions.roles.first()
  
  if (!rol) return message.channel.send(`Lütfen UnBan Yetkili Rolünü Belirtiniz.`)

  
 await db.set(`unbanyetkili_${message.guild.id}`, rol.id)
message.channel.send(`UnBan Yetkilisi Rolü **${rol.name}** Olarak Ayarlandı! `)
};
exports.conf = {
  aliases: [],
  permLevel: 4
};
exports.help = {
  name: 'unbanyetkili',
    kategori: "mod"
};