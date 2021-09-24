const { MessageEmbed } = require("discord.js");
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);


exports.run = async (client, message, args) => {

if(!await db.has(`caps_${message.guild.id}`)){
    const acildi = new MessageEmbed()
    .setTitle("BAŞARILI!")
    .setDescription("Bu sunucuda artık büyük harfli yazılar engellenecek.\nNOT: **Üyeleri Yasakla** yetkisine sahip olanların mesajları engellenmez.")
    .setColor("BLUE")
    .setFooter("UMEF-EK / Kaldığımız Yerden Devam!", client.user.avatarURL())
    message.channel.send(acildi)
    await db.set(`caps_${message.guild.id}`, "ACIK")
}else{
    const kapandi = new MessageEmbed()
    .setTitle("BAŞARILI!")
    .setDescription("Bu sunucuda artık büyük harfli yazılar engellenmeyecek.")
    .setColor("BLUE")
    .setFooter("UMEF-EK / Kaldığımız Yerden Devam!", client.user.avatarURL())
    message.channel.send(kapandi)
    await db.delete(`caps_${message.guild.id}`)
}

}
exports.conf = {
    aliases: ["caps-block"],
    enabled: true,
    guildOnly: true,
    permLevel: 4,
    botPermLevel: 1
}
exports.help = {
    name: "capslock-engel",
    description: "Sunucuda büyük harfli yazıları engellemeyi açıp kapar.",
    usage: "capslock-engel",
    kategori: "guard"
}