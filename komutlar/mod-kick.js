const Discord = require('discord.js');
const fs = require('fs');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);


  
exports.run = async(client, message, args) => {
if (!message.guild) {
  const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('Uyarı', '`kick` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.send(ozelmesajuyari); }

  
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let dızcılaraselam = message.mentions.users.first();

  if(!message.member.roles.cache.has(await db.fetch(`kickyetkili_${message.guild.id}`)) === (!message.member.hasPermission("KICK_MEMBERS"))) {
    return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
 }

  if (message.mentions.users.size < 1) return message.channel.send(`Lütfen sunucudan atacağınız kişiyi etiketleyin.`).catch(console.error);

  if (!message.guild.member(dızcılaraselam).bannable) return message.channel.send(`❌ Belirttiğiniz kişinin Yetkisi Benden Daha Üstün!`);
  message.guild.member(dızcılaraselam).kick();

  message.channel.send(" Başarılı, <@" + dızcılaraselam + ">**" + reason + "** sebebiyle sunucudan atıldı.")
     
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'ban <@kullanıcı> <sebep>',
  kategori: "mod"
 
};