const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);
const ms = require('ms');
const moment = require('moment');
moment.locale('tr');
require('moment-duration-format');

exports.run = async (client, message, args) => {//NarcosCode
  let sahip = ayarlar.sahip //Premium üyelik verecek kişinin ID'sini girin. 
  if(!message.author.id == sahip) return message.channel.send("Bu Komutu Kullanamazsın!")
  
  if(!args[0]) return message.channel.send(`**${ayarlar.prefix}karaliste aktifleştir ID**\n**${ayarlar.prefix}karaliste deaktifleştir ID**`)
  
  if (args[0].toLowerCase() === 'aktifleştir') {
    let Kullanıcı = args[1]
  if (!args[1]) return message.channel.send(`<@${message.author.id}> Kimi Karalisteye Sokacam Ben?`)
  if (!Number(args[1])) return message.channel.send(`<@${message.author.id}> ID Dedim Lan ID, Harf Felan Demedim!!`)
  if (await db.has(`karaliste.${Kullanıcı}`)) return message.channel.send(`Bence adamı salalım şu anki karalistesinde kalsın, 2 kat yapmaya ne gerek var yani :)`)
   await db.set(`karaliste.${Kullanıcı}`, true)
    return message.channel.send(new Discord.MessageEmbed().setDescription(`<@!${Kullanıcı}> Artık Karalistede!`).setFooter( "Narcos Code Genel V5", client.user.avatarURL()).setColor("BLUE"))
    return Kullanıcı.send(new Discord.MessageEmbed().setDescription(`<@!${message.author.id}> Tarafından Karalisteye Girdin. Artık Komut Kullanamazsın!`))
  }
  

  if (args[0].toLowerCase() === 'deaktifleştir') {
    let Kullanıcı = args[1]
  if (!args[1]) return message.channel.send(`<@${message.author.id}> Kimi Karalisteden Çıkarcam Ben?`)
  if (!Number(args[1])) return message.channel.send(`<@${message.author.id}> ID Dedim Lan ID, Harf Felan Demedim!!`)
  if (!await db.has(`karaliste.${Kullanıcı}`)) return message.channel.send(`Adam karalistede değil zaten, bırak koşsun çayırlarda kırlarda...`)
    await db.delete(`karaliste.${Kullanıcı}`)
    return message.channel.send(new Discord.MessageEmbed().setDescription(`<@!${Kullanıcı}> Artık Karalistede Değil!`).setColor("BLUE").setFooter( "Narcos Code Genel V5", client.user.avatarURL()))
    return Kullanıcı.send(new Discord.MessageEmbed().setDescription(`<@!${message.author.id}> Tarafından Karalisteden Çıktın. Artık Komutlarımı Kullanabilirsin!`))
  }


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kara-liste"],
  permLevel: 0
}

exports.help = {
  name: 'karaliste'
};