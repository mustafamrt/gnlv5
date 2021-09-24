const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async(client, message, args) => {

  
  let rol = message.mentions.roles.first()
  
  if (!rol) return message.channel.send(`Lütfen Ban Yetkili Rolünü Belirtiniz.`)

  
 await db.set(`banyetkili_${message.guild.id}`, rol.id)
message.channel.send(`Ban Yetkilisi Rolü **${rol.name}** Olarak Ayarlandı! `)
};
exports.conf = {
  aliases: [],
  permLevel: 4
};
exports.help = {
  name: 'banyetkili',
    description: 'Ban yetkilisi rolünü ayarlarsın',
      kategori: "mod"
};