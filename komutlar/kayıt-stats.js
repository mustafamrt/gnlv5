const Discord = require(`discord.js`);
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async(client, message, args) => {
  if(!message.member.roles.cache.has(await db.fetch(`kayıty_${message.guild.id}`))) {
    return message.channel.send("Bu Komutu Kullanabilmek İçin **Kayıt Yetkilisi** Rolüne Sahip Olman Gerekir!")
  }
    let kişi = message.mentions.users.first()
if(!args[0]) {

    let kkişi = message.mentions.users.first()


    if (!kkişi) return message.channel.send("**Lütfen bir Kişi etiketleyip tekrar deneyin.**")



    let boş1 =    await db.fetch(`erkekkayıtstats_${kişi.id}.${message.guild.id}`)
    if(!boş1) return message.channel.send("Hiç Kayıt Yapılmamış  ne yazıkki statsı gösteremiyorum.")

    const erkekkayıt =  await db.fetch(`erkekkayıtstats_${kişi.id}.${message.guild.id}`)
    const kızkayıt =  await db.fetch(`kızkayıtstats_${kişi.id}.${message.guild.id}`)
    const narcoscode1 = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    .setDescription(`**${message.author} İsimli Yetkilinin Toplam Kayıtı**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    **Toplam \`${erkekkayıt ? erkekkayıt : '0'}\` Erkek Üye Kayıt Yapmış.**
    **Toplam \`${kızkayıt ? kızkayıt : '0'}\` Kız Üye Kayıt Yapmış.**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    message.channel.send(narcoscode1)}
if(kişi) {
    let boş =    await db.fetch(`erkekkayıtstats_${kişi.id}.${message.guild.id}`)
    if(!boş) return message.channel.send("Hiç rol verilmemiş ne yazıkki statsı gösteremiyorum.")



    const erkekkayıt1 = await db.fetch(`erkekkayıtstats_${kişi.id}.${message.guild.id}`)
    const kızkayıt1 =  await db.fetch(`kızkayıtstats_${kişi.id}.${message.guild.id}`)
    const narcoscode = new Discord.MessageEmbed()
    .setAuthor(kişi.username, kişi.avatarURL)
    .setThumbnail(message.mentions.users.first().avatarURL())
    .setTimestamp()
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    .setDescription(`**Yetkilinin Bilgileri**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    **Toplam \`${erkekkayıt1 ? erkekkayıt1 : '0'}\` Erkek Üye Kayıt Yapmış.**
    **Toplam \`${kızkayıt1 ? kızkayıt1 : '0'}\` Kız Üye Kayıt Yapmış.**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    message.channel.send(narcoscode)}  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0,
};
exports.help = {
 name: 'kayıtstats',
 description: 'Kim kaç kişi kaydetmiş görürsün',
 kategori: "kayıt"
};