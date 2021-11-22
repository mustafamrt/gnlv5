const discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async(client, message, args) => {

    let rol = message.mentions.roles.first();

    
	if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new discord.MessageEmbed()
            .setDescription(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`)
            .setColor("BLUE")
            .setFooter( "Narcos Code Ayarlamalı Kayıt Botu", client.user.avatarURL())
        message.channel.send({embed})

}

    if (!args[0]) return message.channel.send(new discord.MessageEmbed()                                          
    .setTitle("Hata!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Kullanım: **${ayarlar.prefix}kızrol ayarla @lady** `)
    .setColor("BLUE"));

if(args[0] == "ayarla") {
    if (!rol) return message.channel.send("**Lütfen bir Rol etiketleyip tekrar deneyin.**")
     await db.set(`kızrol_${message.guild.id}`, rol.id)
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Kız Rolü ${rol} Olarak Ayarlandı`)
    .setColor("BLUE"))


}


if(args[0] == "sıfırla") {
   await db.delete(`kızrol_${message.guild.id}`)
  message.channel.send(new discord.MessageEmbed()
  .setTitle("Başarılı!")
  .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
  .setDescription(`Kız Rolü Sıfırlandı`)
  .setColor("BLUE"))


}


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kızrol',
  description: 'Kız Rolünü ayarlarsın',
  usage: '',
        kategori: "kayıt"
};