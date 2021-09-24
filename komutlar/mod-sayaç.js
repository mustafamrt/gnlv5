const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);


exports.run = async (client, message, args) => {

  const sayacsayi =  await db.fetch(`sayac_${message.guild.id}`);
  const sayackanal = message.mentions.channels.first()
  
 if(!args[0]) {
    message.channel.send(`**Bir sayı yazmalısın.**`)
    return
  }
  
  if(!sayackanal) {
   message.channel.send(`**Sayaç kanalını etiketlemelisin.**`)
  }
  
  
  if(args[0] === "sıfırla") {
    if(!sayacsayi) {
      message.channel.send(`**Ayarlanmayan şeyi sıfırlayamazsın.**`)
      return
    }
    
    await db.delete(`sayac_${message.guild.id}`)
    await db.delete(`sayacK_${message.guild.id}`)
    message.channel.send(`**Sayaç başarıyla sıfırlandı.**`)
    return
  }
  
  if(isNaN(args[0])) {
    message.channel.send(`**Yazdığın şey bir sayı olmalı.**`)
    return
  }
 
        if(args[0] <= message.guild.members.size) {
                message.channel.send(`**Sunucudaki kullanıcı sayısından (${message.guild.members.size}) daha yüksek bir değer girmelisin.**`)
                return
        }
  
  await db.set(`sayac_${message.guild.id}`, args[0])
  await db.set(`sayacK_${message.guild.id}`, sayackanal.id)
  
  message.channel.send(`**Hedef** \`${args[0]}\`, \n**Sayaç kanalı ${sayackanal} olarak ayarlandı.**`)
}
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['sayac'],
        permLevel: 3
}
 
exports.help = {
        name: 'sayaç',
        description: 'Sayacı ayarlar.',
        usage: 'sayaç <sayı> <#kanal> / sıfırla'
}