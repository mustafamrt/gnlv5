const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

module.exports.run = async (client, message, args) => {

let botisim = message.guild.members.cache.get(client.user.id).displayName
let data = await db.fetch(`jailrol_${message.guild.id}`)
if(!data)  return message.channel.send(`Jail rolünü bulamadım.`)
let data2 = await db.fetch(`jailyetkilisi_${message.guild.id}`)
if(!data2)  return message.channel.send(`Jail yetkilisi rolünü bulamadım.`)
let data3 = await db.fetch(`jailkanal_${message.guild.id}`)
if(!data3)  return message.channel.send(`Jail kanalını bulamadım.`)
let rol = message.guild.roles.cache.get(data)
if(!rol) return message.channel.send(`Jail rolü ayarlı değil.`)
let yetkili = message.guild.roles.cache.get(data2)
if(!yetkili) return message.channel.send(`Jail yetkilisi ayarlı değil.`)
let kanal = message.guild.channels.cache.get(data3)
if(!kanal) return message.channel.send(`Jail log kanalı ayarlı değil.`)

let yrol =  await db.fetch(`jailyetkilisi_${message.guild.id}`)
  if(!yrol) return message.channel.send(`Yetkili rolü ayarlanmamış!`)
  if(!message.member.roles.cache.has(yrol)) return message.channel.send(`Bu komutu kullanabilmek için YETKİLİ ROLÜNE sahip olmalısın.`)
    let kişi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!kişi) return message.channel.send(`Kimi susturacaksın? Etiketlemeyi unutma.`)
  if(kişi.hasPermission("MANAGE_GUILD")) return message.channel.send(`Olmaz. Bu kişiyi susturamam.`)
  
  let zaman = args[1]
  if(!args[1]) return message.channel.send(`Ne kadar süre jailde duracağını belirtmelisin.\nÖrnek: q!jail kişi süre sebep`)

let sebep = args.join(' ').slice(args[1].length+args[0].length + 1)
if(!sebep) sebep = 'Sebep belirtilmemiş.'
  
  const wasted = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL())
  .setColor("BLUE")
  .setDescription(`Al işte! Yine biri hapishaneye yollandı.`)
  .addField(`**Hapishaneye yollanan kişi:**`, kişi, true)
  .addField(`**Hakim:**`, `<@${message.author.id}>`, true)
  .addField(`**Sebep:**`, sebep, true)
  .addField(`**Süre:**`, zaman.replace(/s/, ' __saniye__').replace(/min/, ' __dakika__').replace(/h/, ' __saat__').replace(/d/, ' __gün__'), true)
  .setTimestamp()
  .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
  .setThumbnail(message.author.avatarURL());
  
  const bitti = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL())
  .setDescription(`Birisi tahliye oldu!`)
  .addField(`**Tahliye olan:**`, kişi, true)
  .addField(`**Hakim:**`, `<@${message.author.id}>`, true)
  .setTimestamp()
  .setColor(`PURPLE`)
  .setFooter( "Narcos Code Genel V5", client.user.avatarURL())
  .setThumbnail(message.author.avatarURL());
  
  kişi.roles.add(rol.id);
    kişi.roles.cache.forEach(async r => {
kişi.roles.remove(r.id)
await db.set(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
    kanal.send(wasted)
    message.channel.send(`${kişi} isimli kişi başarıyla hapishaneye gönderildi.`)
    setTimeout(async () =>{
    kişi.roles.remove(rol.id)
    kanal.send(bitti)
  }, ms(zaman));
            setTimeout(async () =>{
message.guild.roles.cache.forEach(async r => {
const i = await db.fetch(`${message.guild.id}.jail.${kişi.id}.roles.${r.id}` )
if(i != r.id)  return ;
if(i){kişi.roles.add(i)}
})
              }, ms(zaman));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['uçur', "fırlat"],
    permLevel: 0
  };
  
exports.help = {
 name: 'jail',
 description: 'Bir kişiyi belirlediğiniz rol ile jaile yollarsınız.',
        kategori: "jail"
};