const Discord = require('discord.js')
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const data = new Database(ayarlar.mongourl);


exports.run = async (client, message, args) => {
  
  
  
  
  
if(!args[0]) return message.channel.send(`**Uyaracağın kişiyi etiketle.**`)


let kullanıcı = message.mentions.users.first()
if(!args[0]) return message.reply(" Lütfen bir üye etiketle.")
if(!kullanıcı) return message.reply(` Üye Bulunamadı. Hayırdır Gelmeden Uyarmak Felan? (` + args[0] + `)`)
if(kullanıcı.bot) return message.reply(` Botları uyaramazsın! Onların uyarı sayısı sonsuz zaten xd`)
if(kullanıcı.id === message.author.id) return message.reply(` Kendini uyaramazsın, başka birini etiketle`)

data.add(`uyarı.${message.guild.id}.${kullanıcı.id}`, +1)
const syı = await data.fetch(`uyarı.${message.guild.id}.${kullanıcı.id}`)

let reason = args.slice(1).join(' ')

if(!reason) {
await message.channel.send(`${kullanıcı.tag} Uyarıldı.` + "\n**Sebep:** Belirtilmedi")
return}

if(reason) {
await message.channel.send(`${kullanıcı.tag} Uyarıldı.` + "\n**Sebep:** "+ reason)
return} }







exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 1
};

exports.help = {
    name: 'uyar',
      description: 'uyarı verebilirsin',
      kategori: "mod"
};