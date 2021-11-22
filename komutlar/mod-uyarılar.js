  
const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const data = new Database(ayarlar.mongourl);

////////////////////////////////////

exports.run = async (client, message, args) => {
    
if(!args[0]) return message.channel.send(`**Uyarılarına bakacağın kişiyi etiketle.**`)

let kullanıcı = message.mentions.users.first()
if(!args[0]) return message.reply(" Üye Etiketleyeceksin. **ÜYE!!**")
if(!kullanıcı) return message.reply(` Üye Bulunamadı. Hayırdır Gelmeden İzinsiz Uyarı Kontrol Etmek Felan?`)

const syı2 = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
if(!syı2) return message.channel.send(`${kullanıcı.tag}, uyarı sayısı` + "\n**Kullanıcının Uyarısı Yok. Temiz Çocukmuş Heee...**")
await message.channel.send(`${kullanıcı.tag}, Uyarı Sayısı:` + `\nToplam **${syı2}** Uyarısı Var!`)




}



exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['uyarilar'],
permLevel: 1
}

exports.help = {
name: 'uyarılar',
        description: 'uyarılara bakarsın',
      kategori: "mod"
}