  
const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);


exports.run = async (client, message, args) => {
if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setTitle('Ne kadar mesajı uzay boşluğuna göndereceğim?'));
if(!Number(args[0])) (new Discord.MessageEmbed().setTitle('Bu kadar mesaj silemem ki, bu bir rakam değil!'));
if(args[0] > 100) return message.channel.send(new Discord.MessageEmbed().setTitle('Discord bu kadar mesajı silmeme izin vermiyor. Uzay boşluğunda bu kadar yer yokmuş.'));

message.channel.bulkDelete(args[0]);
return message.channel.send(new Discord.MessageEmbed()
.addField(`Temizleyen Yetkili`, `<@${message.author.id}>`)
.setFooter( "Narcos Code Genel V5", client.user.avatarURL())
.setColor("BLUE")
.setDescription('**Görev Tamamlandı! '+`${args[0]}`+' adet mesaj uzay boşluğunda kayboldu, nereye gitti bende bilmiyorum aramaya çalışma.**')).then(m => m.delete({timeout: 3900}));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 1
}

exports.help = {
  name: 'sil',
      kategori: "mod"
};