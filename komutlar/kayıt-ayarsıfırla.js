const discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async(client, message, args) => {



    
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
    .setDescription(`Kullanım: **${ayarlar.prefix}ayarlar Sıfırla** `)
    .setColor("BLUE"));




if(args[0] == "sıfırla") {





   if(!  await db.has(`kızrol_${message.guild.id}`)) return message.channel.send("Kız Rol ayarlanmamış ki sıfırlıyayım")
   await db.delete(`kızrol_${message.guild.id}`)

   if(! await db.has(`erkekrol_${message.guild.id}`)) return message.channel.send("Erkek Rol ayarlanmamış ki sıfırlıyayım")
   await db.delete(`erkekrol_${message.guild.id}`)

   if(! await db.has(`misafir_${message.guild.id}`)) return message.channel.send("Kayıtsız Rol ayarlanmamış ki sıfırlıyayım")
   await db.delete(`misafir_${message.guild.id}`)

   if(! await db.has(`klog_${message.guild.id}`)) return message.channel.send("Kayıt Log ayarlanmamış ki sıfırlıyayım")
   await db.delete(`klog_${message.guild.id}`)

   if(! await db.has(`kayıty_${message.guild.id}`)) return message.channel.send("Kayıt Yetkilisi Rol ayarlanmamış ki sıfırlıyayım")
  await db.delete(`kayıty_${message.guild.id}`)

   if(! await db.has(`tag_${message.guild.id}`)) return message.channel.send("Tag ayarlanmamış ki sıfırlıyayım")
   await db.delete(`tag_${message.guild.id}`)

  message.channel.send(new discord.MessageEmbed()
  .setTitle("Başarılı!")
  .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
  .setDescription(`Ayarlar Sıfırlandı`)
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
  name: 'ayarlar',
  description: 'Ayarları sıfırlarsın',
  usage: '',
        kategori: "kayıt"
};