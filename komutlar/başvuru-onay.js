const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);


exports.run = function(client, message, args) {
  let yetkili = db.fetch(`byetkili_${message.guild.id}`)
  if (!message.member.roles.cache.has(yetkili)) return message.channel.send('Bu Komutu Kullanamazsın')
    let adı = args[0]
  let sahip = args[1]


  
    let basvuru = db.fetch(`basvuruk_${message.guild.id}`)
    let kanal = db.fetch(`başvuru-ekle_${message.guild.id}`)
  let log =   db.fetch(`başvuru-log_${message.guild.id}`)
    if(!log) return message.channel.send("Bu komudu kullanmak için yetkili başvuru kanallarının sunucuda ayarlı olması gerekiyor.")
  if(!basvuru) return message.channel.send("Bu komudu kullanmak için yetkili başvuru kanallarının sunucuda ayarlı olması gerekiyor.")
  if(!kanal) return message.channel.send("Bu komudu kullanmak için yetkili başvuru kanallarının sunucuda ayarlı olması gerekiyor.")



  const onay = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setDescription(` <@${adı}> adlı kişinini yetkili başvurusunu onayladın.\nOnaylayan yetkili : ${message.author}`)
  
  


  if (!adı) return message.channel.send(`:no_entry: Başvuran kişinin İD sini yazmalısınız`).then(m => m.delete({timeout: 10000}))
  message.delete()
  if(isNaN(args[0])) return message.channel.send("Bir İd Girmelisin Etiket Veya Harf Değil").then(m => m.delete({timeout: 10000}))

    
  

  if(!db.has(`sorularitamamladi_${adı}_${message.guild.id}`)) return message.channel.send("Bu Kişi Başvuru Yapmamış") .then(m => m.delete({timeout: 10000}))


  client.channels.cache.get(log).send(`<@${adı}>`)      
        client.channels.cache.get(log).send(onay)      
  message.channel.send(`başvuru onayladınız.`).then(m => m.delete({timeout: 10000}))

  client.users.cache.get(args[0]).send(`**${message.guild.name}** İsimli Sunucuda Başvurunuz **${message.author.tag}** Tarafından Onaylandı!`).catch(err =>  message.channel.send("Mesajı atarken sorun yaşadım. Böyle bir id yok veya üyenin DM'i kapalı."))



 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['başvuru-onayla', 'onayla'],
  permLevel: 3
};

exports.help = {
  name: 'başvuruonayla', 
  description: "Sunucuya eklenen başvuruu onaylar.",
  usage: 'başvuruonayla <başvuru ismi>'
};