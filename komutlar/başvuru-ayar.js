const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);


exports.run = async(client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:no_entry: Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

  if(args[0] === "başvuruyap-kanal"){
    if(await db.has(`başvuru-ekle_${message.guild.id}`)) return message.channel.send("Bu kanal zaten ayarlanmış.Sıfırlamak için **!başvuru-ayar sıfırla**")
    let başvuruekle = message.mentions.channels.first();
    if(!başvuruekle) return message.channel.send("Lütfen kanal seçin")
    await db.set(`başvuru-ekle_${message.guild.id}`, başvuruekle.id)
    message.channel.send("başvuru-ekle kanalı başarıyla ayarlandı")
  }
   if(args[0] === "başvurulog-kanal"){
     if(await db.has(`başvuru-log_${message.guild.id}`)) return message.channel.send("Bu kanal zaten ayarlanmış.Sıfırlamak için **!başvuru-ayar sıfırla**")
     let başvurulog = message.mentions.channels.first();
     if(!başvurulog) return message.channel.send("Lütfen kanal seçiniz.")
     await db.set(`başvuru-log_${message.guild.id}`, başvurulog.id)
     message.channel.send("başvuru-log kanalı başarıyla ayarlandı")
  }
   if(args[0] === "başvurugiden-kanal"){
     if(await db.has(`basvuruk_${message.guild.id}`)) return message.channel.send("Bu kanal zaten ayarlanmış.Sıfırlamak için **!başvuru-ayar sıfırla**")
     let basvurukanal = message.mentions.channels.first();
     if(!basvurukanal) return message.channel.send("Lütfen kanal seçin.")
     await db.set(`basvuruk_${message.guild.id}`, basvurukanal.id)
     message.channel.send("Başvuru kanalı başarıyla ayarlandı")}
  if(args[0] === "yetkili"){
    if(await db.has(`byetkili_${message.guild.id}`)) return message.channel.send("Yetkili zaten ayarlanmış.")
    let yetkilirol = message.mentions.roles.first();
    if(!yetkilirol) return message.channel.send("Lütfen rol seçin.")
    await db.set(`byetkili_${message.guild.id}`, yetkilirol.id)
    message.channel.send("Başarıyla ayarlandı.")
  }
   if(args[0] === "sıfırla"){
     if(!await db.has(`başvuru-ekle_${message.guild.id}`)) return message.channel.send("Kanallar önceden ayarlanmamış.")
     if(!await db.has(`başvuru-log_${message.guild.id}`)) return message.channel.send("Kanallar önceden ayarlanmamış.")
     if(!await db.has(`basvuruk_${message.guild.id}`)) return message.channel.send("Kanallar önceden ayarlanmamış.")
     if(!await db.has(`basvuruk_${message.guild.id}`)) return message.channel.send("Rol önceden ayarlanmamış")
     await db.delete(`basvuruk_${message.guild.id}`)
     await db.delete(`başvuru-log_${message.guild.id}`)
     await db.delete(`başvuru-ekle_${message.guild.id}`)
     await db.delete(`byetkili_${message.guild.id}`)
     message.channel.send("Başarıyla sıfırlandı.")
     

   }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['başvuruayar','başvuruayarla'],
  permLevel: 0,
};

exports.help = {
  name: 'başvuru-ayar', 
  description: "başvuru List Ayarları",
  usage: 'başvuruayarla',
  kategori: "başvuru"
};