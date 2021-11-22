const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = function(client, message, args) {

  let yetkili = db.fetch(`byetkili_${message.guild.id}`)
if (!message.member.roles.cache.has(yetkili)) return message.channel.send('Bu Komutu Kullanamazsın')    
  let adı = args[0]
  let sebep = args.slice(1).join(" ");
  let basvuru = db.fetch(`basvuruk_${message.guild.id}`)
    let kanal = db.fetch(`başvuru-ekle_${message.guild.id}`)
  let log =   db.fetch(`başvuru-log_${message.guild.id}`)
    if(!log) return message.channel.send("Bu komudu kullanmak için başvuru  kanallarının sunucuda ayarlı olması gerekiyor.")
  if(!basvuru) return message.channel.send("Bu komudu kullanmak için başvuru  kanallarının sunucuda ayarlı olması gerekiyor.")
  if(!kanal) return message.channel.send("Bu komudu kullanmak için başvuru  kanallarının sunucuda ayarlı olması gerekiyor.")
 
  message.delete()
  const red = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription(`<@${adı}> adlı kişinin yaptığı başvuru reddedildi.\nSebep : ${sebep}\nReddeden yetkili : ${message.author}`)
    
    if (!adı) return message.channel.send(`:no_entry: başvuranın ID'sini yazmalısın.`).then(m => m.delete({timeout: 10000}))
    if(!db.has(`sorularitamamladi_${adı}_${message.guild.id}`)) return message.channel.send("Başvuru Yapmamış Ki Reddedeyim.")


    if(isNaN(args[0])) return message.channel.send("Bir İd Girmelisin Etiket Veya Harf Değil").then(m => m.delete({timeout: 10000}))

    


  if (!sebep) return message.channel.send(`:no_entry: başvuruyu neden onaylamadığını yazmalısın.`).then(m => m.delete({timeout: 10000}))
  
  


  db.delete(`sorularitamamladi_${adı}_${message.guild.id}`)
  client.channels.cache.get(log).send(`<@${adı}>`)     
        client.channels.cache.get(log).send(red);
        message.channel.send(`başvuru reddettiniz.`).then(m => m.delete({timeout: 10000}))


        client.users.cache.get(args[0]).send(`**${message.guild.name}** İsimli Sunucuda Başvurunuz **${message.author.tag}** Tarafından Reddedildi.\n Sebep: **${sebep}** \n **Üzülme Reddedildiği için senin başvuru kayıtlarını sildim tekrardan başvurabilirsin.** `).catch(err =>  message.channel.send("Mesajı atarken sorun yaşadım. Böyle bir id yok veya üyenin DM'i kapalı."))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['başvuru-reddet', 'reddet'],
  permLevel: 3
};

exports.help = {
  name: 'başvurureddet', 
  description: "Sunucuya eklenen başvuruu reddeder.",
  usage: 'başvurureddet <başvuru ismi> - <sebep>'
};