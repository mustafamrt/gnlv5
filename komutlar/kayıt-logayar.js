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
    .setDescription(`Kullanım: **${ayarlar.prefix}kayıtlog ayarla #kayıtlog** `)
    .setColor("BLUE"));

if(args[0] == "ayarla") {
    if (!channel) return message.channel.send("**Lütfen bir Kanal etiketleyip tekrar deneyin.**")
   await  db.set(`klog_${message.guild.id}`, channel.id)
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Log Kanalı ${channel} Olarak Ayarlandı`)
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
  name: 'kayıtlog',
  description: 'Kayıt Log ayarlarsın',
  usage: '',
        kategori: "kayıt"
};