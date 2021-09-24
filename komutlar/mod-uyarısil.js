const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const data = new Database(ayarlar.mongourl);


////////////////////////////////////

exports.run = async (client, message, args) => {
if(!args[0]) return message.channel.send(`**Uyarılarını sileceğin kişiyi etiketle.**`)




let kullanıcı = message.mentions.users.first()
if(!args[0]) return message.reply(" Lütfen Bir Üye Etiketle. Boşluğun Uyarılarını Silemem.")
if(!kullanıcı) return message.reply(` Üye Bulunamadı. Hayırdır Gelmeden Uyarı Silmeler Felan? (` + args[0] + `)`)

let sayı = args[1]
if(!sayı) return message.reply(` Ne Kadar Sileceğim, Sonsuz Sileceğim Sanırsam?`)
if(isNaN(sayı)) return message.reply(` Abi Geçersiz Bu Sayı Geçmiyor Bizim Buralarda.`)
if(sayı === '0') return message.reply(` En Az 1 Uyarı Silebilirsin. Kandırıkçı Şey...`)
const syı2 = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
if(syı2 < sayı) return message.reply("Başaramadık Abi..." + `**${kullanıcı.tag}** Üyesinin **${syı2}** Uyarısı Var. Bundan Düşük Bir Sayı Girmen Gerek. Eksilere Düşmesin Uyarısı Yazık...`)

data.add(`uyarı.${message.guild.id}.${kullanıcı.id}`, -sayı)
const syı = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)
await message.channel.send(`${kullanıcı.tag}, Uyarısı Silindi.` + `Toplamda **${sayı}** Uyarı Silindi. Kalan Uyarısı: ${syı ? `**`+ syı + `** Uyarı`: '**0**'}`)
  
  


}


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["uyarı-sil"],
    permLevel: 1
};

exports.help = {
    name: 'uyarısil',
      description: 'uyarıları silebilirsin',
      kategori: "mod"
};