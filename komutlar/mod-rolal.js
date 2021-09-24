const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")

exports.run = (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(`Bu Komudu Kullanmaya İznin Yok! \n <@${message.author.id}>`)
    let role = message.mentions.roles.first();
    let member = message.mentions.members.first();
    if (!role) return message.reply('Lütfen Almak İstediğiniz Rolü Etiketleyin!')
    if (!member) return message.reply('Lütfen Rol Almak İstediğiniz Kişiyi Etiketleyin!')
    member.roles.remove(role)
    const embed = new MessageEmbed()
    .setAuthor(`Rolü Aldım`)
    .setDescription(`**Rolü Alınan Kullanıcı: **${message.mentions.users.first()}\n**Alınan Rol: **${role}\n**Yetkili: <@${message.author.id}>**`)
    .setTimestamp()
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setColor("BLUE")
    message.channel.send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  permLevel: 0,
  aliases: ["rol-al"]
};

exports.help = {
  name: "rolal",
  description: "Birinden rol alırsınız.",
  usage: "rolal",
    kategori: "mod"
};