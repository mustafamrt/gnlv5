const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async (client, message, args) => {
    if (!message.guild) return message.author.send('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');

  

      
      
          const erkek =  await db.fetch(`kızrol_${message.guild.id}.${message.guild.id}`)
    const kız =  await db.fetch(`erkekrol_${message.guild.id}.${message.guild.id}`)
  


    const say = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayColor)
    .setTitle(message.guild.name)
        .addField(`👥     **Şu Anda \`${erkek? erkek : '0'}\` Erkek Üye Kayıtlı.**`)
        .addField(`👥     **Şu Anda \`${kız? kız : '0'}\` Kız Üye Kayıtlı.**`)

    message.channel.send(say);


}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'kayıt-say',
    description: 'Gelişmiş Kayıt sayaç sistemi',
    kategori: "kayıt"
 }