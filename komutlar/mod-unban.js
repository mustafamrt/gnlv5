const Discord = require('discord.js');
const client = new Discord.Client();
exports.run = async(client, message, args, member ) => {
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

    if(!message.member.roles.cache.has(await db.fetch(`unbanyetkili_${message.guild.id}`)) === (!message.member.hasPermission("KICK_MEMBERS"))) {
    return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
 }
   
   
  
  
  if (!message.guild) {
  const ozelmesajuyari = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setTimestamp()
  .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı ', '`unban`komutu özel mesajlarda kullanılamaz.')
  return message.author.send(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[0];
  if (!user) {
    const bid = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setDescription('**Kullanım:`u!unban ID`')
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
   .setTimestamp() 
   return message.channel.send(bid).catch(console.error);
  } 
 
  
  message.guild.members.unban(user);
  const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTimestamp()
    .setDescription('**Bir Kullanıcının Yasağı Kaldırıldı** :white_check_mark:')
    .addField('Yasağı Kaldırılan Kullanıcı:', `<@!${user}>`,true)
    .addField('Yasağı Kaldıran Yetkili:', `<@!${message.author.id}>`,true)
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL());
    
   message.channel.send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'unban',
  description: 'İstediğiniz kişinin banını kaldırır.',
  usage: 'unban [kullanıcı] [sebep]',
  kategori: "mod"
};