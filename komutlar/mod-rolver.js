exports.run = (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(`Bu Komudu Kullanmaya İznin Yok! \n <@${message.author.id}>`)
    let role = message.mentions.roles.first();
    let member = message.mentions.members.first();
    if (!role) return message.reply('Lütfen Vermek İstediğiniz Rolü Etiketleyin!')
    if (!member) return message.reply('Lütfen Rol Vermek İstediğiniz Kişiyi Etiketleyin!')
    member.roles.add(role)
    const { MessageEmbed } = require("discord.js")
    const embed = new MessageEmbed()
    .setTitle(`Roller Değiştirildi`)
    .setDescription(`**Rol Verilen Kullanıcı: **${message.mentions.users.first()}\n**Verilen Rol: **${role}\n**Yetkili: <@${message.author.id}>**`)
    .setTimestamp()
    .setColor('BLUE')

    message.channel.send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  permLevel: 0,
  aliases: ["rolver"]
};

exports.help = {
  name: "rol-ver",
  description: "Üyelere rol verirsiniz",
  usage: "rolver",
      kategori: "mod"
};