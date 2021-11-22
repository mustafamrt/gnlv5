const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);
exports.run = async (client, message, args) => {

  if(await db.fetch('numaraa') || await db.fetch('güncellemeler').length <= 0) return message.reply('Hiç güncelleme notu eklenmemiş.');
  
  let pages = [];
  let page = 1;
  await db.fetch('güncellemeler').sort((a, b) => b.number-a.number).forEach(data => {
    pages.push(new Discord.MessageEmbed()
    .setColor('BLUE')
    .setAuthor('Güncelleme #'+data.number)
    .setDescription(data.title)
    .addField('Açıklama', '・ '+data.description.split('\n').join('\n・ '))
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL()));
  });

  message.channel.send(pages[0]).then(m => {
    m.react('⬅').then(() => m.react('➡'));
    const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
    const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;

    const backwards = m.createReactionCollector(backwardsFilter, { time: 0 });
    const forwards = m.createReactionCollector(forwardsFilter, { time: 0 });

    forwards.on('collect', (reaction, user) => {
      if(page === pages.length) {
        page = 0;
      };
      page++;
      reaction.users.remove(user.id);
      m.edit(pages[page-1]);
    })
    backwards.on('collect', (reaction, user) => {
      console.log(page);
      if(page <= 1) {
        page = pages.length+1;
      };
      reaction.users.remove(user.id);
      page--;
      m.edit(pages[page-1]);
    })
  });

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["güncelleme"],
  permLevel: 0
};

exports.help = {
  name: 'güncellemeler'
};