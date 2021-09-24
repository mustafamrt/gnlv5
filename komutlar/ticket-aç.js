const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async (client, message, args) => {
  const prefix =
    (await db.fetch(`prefix.${message.guild.id}`)) || client.ayarlar.prefix;
  const ad = await db.fetch(`numara.${message.channel.id}`);
  if (
    message.channel.name === `ticket-${ad}` ||
    message.channel.name === `closed-${ad}`
  ) {
    const ann = await db.fetch(
      `asd.${message.guild.id}.${message.channel.id}.${message.author.id}`
    );
    if (!ann) return message.channel.send(`Bu bilet senin değil.`);
    message.delete();

    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#ffff00")
        .setDescription(`Ticket ${message.author} tarafından açıldı.`)
    );
    message.channel.setName(`ticket-${ad}`);
    //Narcos Code tarafından türkçe çevrildi
  } else {
    return message.channel.send(`Bu komutu bir bilet kanalında kullanın.`);
  }
};
exports.conf = {
  enabled: true, //Narcos Code tarafından türkçe çevrildi
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "aç",
    kategori: "ticket"
}; //Narcos Code tarafından türkçe çevrildi