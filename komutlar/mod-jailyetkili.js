const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);



exports.run = async(client, message, args) => {
  let yrol =  await db.fetch(`yrol.${message.guild.id}`)
  //if(!yrol) return message.channel.send(`Yetkili rolü ayarlanmamış!`)
//  if(!message.member.roles.cache.has(yrol)) return message.channel.send(`Bu komutu kullanabilmek için YETKİLİ ROLÜNE sahip olmalısın.`)
   var başarılı = ['**İŞTE BU!** <a:like:819837331737149461>', '**SÜPER!** <a:like:819837331737149461>', '**NASIL YAPTIN BUNU?!** <a:like:819837331737149461>', '**MÜKEMMEL!** <a:like:819837331737149461>', '**SEVDİM BUNU!** <a:like:819837331737149461>', '**ŞİMDİ OLDU!** <a:like:819837331737149461>'];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**TÜH!** <a:nope:819837486741192784>', '**OLMADI BU!** <a:nope:819837486741192784>', '**HAY AKSİ!** <a:nope:819837486741192784>', '**HADİ ORADAN!** <a:nope:819837486741192784>', '**OLMADI YA!** <a:nope:819837486741192784>', '**BÖYLE OLMAZ?!** <a:nope:819837486741192784>', '**HADİ YA!** <a:nope:819837486741192784>'];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply(`**u!jail-yetkilisi ayarla/sıfırla** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
if (!args[0]) return message.reply(`Sistemi kullanabilmek için, u!jail-yetkilisi ayarla/sıfırla @rol yazmalısın.`)
   
  
  if (args[0] == 'ayarla') {
  
  let yetkilirol = message.mentions.roles.first() || message.guild.roles.find(c => c.name === args[1].join(' '))
  if (!yetkilirol) return message.channel.send(x2 + ` Bir rol etiketle.`)
  
  await db.set(`jailyetkilisi_${message.guild.id}`, yetkilirol.id)
  message.channel.send(x + ` Jail yetkilisi ${yetkilirol} olarak ayarlandı.`)
  } 
  

  if (args[0] == 'sıfırla') {
   await db.delete(`jailyetkilisi_${message.guild.id}`)
    message.channel.send(x + ` Jail yetkilisi başarıyla sıfırlandı.`)
  }
  
  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
   aliases: ['jailyetkilisi'],
 permLevel: 0
};

exports.help = {
 name: 'jail-yetkilisi',
 description: 'Hangi role sahip kişilerin jaile atabileceğini ayarlarsınız.',
 usage: 'jail-yetkilisi ayarla/sıfırla @rol',
  kategori: "jail"
};