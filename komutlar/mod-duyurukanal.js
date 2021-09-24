const discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async(client, message, args) => {

    let kanal = message.mentions.channels.first();

    
	if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new discord.MessageEmbed()
            .setDescription(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`)
            .setColor("BLUE")
            .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
        message.channel.send({embed})

}

    if (!args[0]) return message.channel.send(new discord.MessageEmbed()                                          
    .setTitle("Hata!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription("Kullanım: (prefix)duyurukanal ayarla #kanal \nSıfırlamak İçin: (prefix)duyurukanal sıfırla")
    .setColor("BLUE"));

if(args[0] == "ayarla") {
    if (!kanal) return message.channel.send("**Lütfen bir kanalı etiketleyip tekrar deneyin.**")
    await db.set(`duyurukanal_${message.guild.id}`, kanal.id)
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Artık Biri Duyuru Komutunu Kullanınca Duyuruyu ${kanal} Kanalına Göndereceğim.`)
    .setColor("BLUE"))

if(args[0] == "sıfırla") {
   await db.delete(`duyurukanal_${message.guild.id}`)
    message.channel.send(new discord.MessageEmbed()
    .setTitle("Başarılı!")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
    .setDescription(`Duyuru Kanalı Sıfırlandı.`)
    .setColor("BLUE"))
}    
}


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["duyuru-kanal"],
  permLevel: 0
};

exports.help = {
  name: 'duyurukanal',
  description: 'Duyuru Kanalını ayarlarsın',
  usage: '',
        kategori: "ayarlama"
};