const discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async(client, message, args) => {

    let yt = args[1];

    
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
    **${ayarlar.prefix}ytid ayarla idniz** 
    **${ayarlar.prefix}ytid sıfırla ** `)

    .setColor("BLUE"));

if(args[0] == "ayarla") {
    if (!db.fetch(`ytlog_${message.guild.id}`)) return message.channel.send(`**İlk Önce log kanalını ayarlayınız ${ayarlar.prefix}ytlog ayarla #logkanal**`)
    if (!yt) return message.channel.send("**Lütfen YT id nizi atınız**")
     db.set(`kanalid_${message.guild.id}`, yt)
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Youtube id  Ayarlandı`)
    .setColor("BLUE"))


}

if(args[0] == "sıfırla") {
    if (!db.fetch(`ytbildirim_${message.guild.id}`)) return message.channel.send("**Ayarlanmamış ki sıfırlayayım.**")
     db.delete(`kanalid_${message.guild.id}`)
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Youtube Bildirim Kanalı Sıfırlandı`)
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
  name: 'ytid',
  description: 'Youtube Kanal id ayarlarsın',
  usage: '',
        kategori: "youtube"
};