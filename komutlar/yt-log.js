const discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async(client, message, args) => {

    let channel = message.mentions.channels.first();

    
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
    .setDescription(`Kullanım:
    **${ayarlar.prefix}ytlog ayarla #ytlog**
     **${ayarlar.prefix}ytlog sıfırla ** `)

    .setColor("BLUE"));

if(args[0] == "ayarla") {
    if (!channel) return message.channel.send("**Lütfen bir Kanal etiketleyip tekrar deneyin.**")
     db.set(`ytlog_${message.guild.id}`, channel.id)
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Log Kanalı ${channel} Olarak Ayarlandı`)
    .setColor("BLUE"))


}

if(args[0] == "sıfırla") {
    if (!db.fetch(`ytlog_${message.guild.id}`)) return message.channel.send("**Ayarlanmamış ki sıfırlayayım.**")
     db.delete(`ytlog_${message.guild.id}`)
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Youtube Log Kanalı Sıfırlandı`)
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
  name: 'ytlog',
  description: 'Youtube Abone log ayarlarsın',
  usage: '',
        kategori: "youtube"
};