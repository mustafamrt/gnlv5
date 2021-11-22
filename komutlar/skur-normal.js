const Discord = require('discord.js');

const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const data = new Database(ayarlar.mongourl);

exports.run = async(client, message, args) => {

if(message.author.id !== message.guild.owner.user.id) return message.channel.send(new Discord.MessageEmbed().setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png').setDescription(`Bu komutu kullanmak için, \`**Sunucu Sahibi**\` olmanız gerekiyor.`).addField('Sunucu Sahibi', message.guild.owner.user.tag).setImage('https://hizliresim.com/xnoGzL'));

  

message.channel.send(new Discord.MessageEmbed()
.setTitle('Normal Sunucu Kurma İşlemi')
.setThumbnail('https://cdn.discordapp.com/avatars/686185592899633200/6499d2f1c46b106eed1e25892568aa55.webp?size=512')
.setColor("BLUE")
.setFooter( "UMEF-EK / Discord'da Yeni Devrim!", client.user.avatarURL())
.setDescription(`${message.author} **Normal Sunucunun** kurulmasını onaylıyor musun? 😇
**Dipnot:** Bazı kanllar silinmemiş gibi görünebilir. Discord dan çıkıp girin düzelir.
**Dipnot:** Tüm roller ve kanallar silinecek. Topluluk aktifse kurallar ve topluluk güncellemeleri kanalları silinmez.`)).then(resulter => {
resulter.react('✅').then(() => resulter.react('❌'));

const yesFilter = (reaction, user) => { return reaction.emoji.name === '✅' && user.id === message.guild.owner.user.id; };
const yes = resulter.createReactionCollector(yesFilter, { time: 0 });
const noFilter = (reaction, user) => { return reaction.emoji.name === '❌' && user.id === message.guild.owner.user.id; };
const no = resulter.createReactionCollector(noFilter, { time: 0 });

  yes.on('collect', async reaction => {

    await message.guild.channels.cache.forEach(a => a.delete())

    await message.guild.roles.cache.forEach(a => a.delete())

    message.guild.roles.create({ data: {name : '👑 Kurucu' } , reason: 'ayn'}).then(role => {
      role.setPermissions(['ADMINISTRATOR']);
      role.setColor('#ff0000');
      });
      message.guild.roles.create({ data: {name : '🧧 Admin' } , reason: 'ayn'}).then(role => {
        role.setPermissions(['ADMINISTRATOR']);
        role.setColor('#ff4000');
        });
    message.guild.roles.create({ data: {name : '🗣️ Moderatör' } , reason: 'ayn'}).then(role => {
      role.setPermissions(['VIEW_CHANNELS', 'MANAGE_NICKNAMES', 'VIEW_AUDIT_LOG', 'CREATE_INVITE', 'CHANGE_NICKNAME', 'KICK_MEMBERS', 'SEND_MESSAGES', 'MUTE_MEMBERS' , 'CONNECT', 'SPEAK' ,'ATTACH_FILES', 'USE_EXTERNAL_EMOJI', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY']);
      role.setColor('#955aab');
      });
      message.guild.roles.create({ data: {name : '🐕‍ Rehber' } , reason: 'ayn'}).then(role => {
        role.setPermissions(['VIEW_CHANNELS', 'CREATE_INVITE', 'CHANGE_NICKNAME', 'SEND_MESSAGES', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJI', 'CONNECT', 'SPEAK', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY']);
        role.setColor('#9527c2');
        });
        message.guild.roles.create({ data: {name : '📹 YouTuber' } , reason: 'ayn'}).then(role => {
          role.setPermissions(['VIEW_CHANNELS', 'CREATE_INVITE', 'CHANGE_NICKNAME', 'SEND_MESSAGES', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJI', 'CONNECT', 'SPEAK', 'READ_MESSAGE_HISTORY']);
          role.setColor('#ff5b4d');
          });
          message.guild.roles.create({ data: {name : '⭐ V.I.P' } , reason: 'ayn'}).then(role => {
            role.setPermissions(['VIEW_CHANNELS', 'CREATE_INVITE', 'CHANGE_NICKNAME', 'SEND_MESSAGES', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJI', 'CONNECT', 'SPEAK', 'READ_MESSAGE_HISTORY']);
            role.setColor('#ffee00');
            });
          message.guild.roles.create({ data: {name : '💜 Booster' } , reason: 'ayn'}).then(role => {
            role.setPermissions(['VIEW_CHANNELS', 'CREATE_INVITE', 'CHANGE_NICKNAME', 'SEND_MESSAGES', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJI', 'CONNECT', 'SPEAK', 'READ_MESSAGE_HISTORY']);
            role.setColor('#ff4fea');
            });
            message.guild.roles.create({ data: {name : '💚 Level 20' } , reason: 'ayn'}).then(role => {
              role.setPermissions(['VIEW_CHANNELS', 'CREATE_INVITE', 'SEND_MESSAGES', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJI', 'CONNECT', 'SPEAK', 'READ_MESSAGE_HISTORY']);
              role.setColor('#36ff57');
              });
              message.guild.roles.create({ data: {name : '💙 Level 15' } , reason: 'ayn'}).then(role => {
                role.setPermissions(['VIEW_CHANNELS', 'CREATE_INVITE', 'SEND_MESSAGES', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJI', 'CONNECT', 'SPEAK', 'READ_MESSAGE_HISTORY']);
                role.setColor('#1f8bff');
                });
                message.guild.roles.create({ data: {name : '💛 Level 10' } , reason: 'ayn'}).then(role => {
                  role.setPermissions(['VIEW_CHANNELS', 'CREATE_INVITE', 'SEND_MESSAGES', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJI', 'CONNECT', 'SPEAK', 'READ_MESSAGE_HISTORY']);
                  role.setColor('#e2fc35');
                  });
                  message.guild.roles.create({ data: {name : '🧡 Level 5' } , reason: 'ayn'}).then(role => {
                    role.setPermissions(['VIEW_CHANNELS', 'CREATE_INVITE', 'SEND_MESSAGES', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJI', 'CONNECT', 'SPEAK', 'READ_MESSAGE_HISTORY']);
                    role.setColor('#fc9f35');
                    });
                    message.guild.roles.create({ data: {name : '❤️ Level 1' } , reason: 'ayn'}).then(role => {
                      role.setPermissions(['VIEW_CHANNELS', 'CREATE_INVITE', 'SEND_MESSAGES', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJI', 'CONNECT', 'SPEAK', 'READ_MESSAGE_HISTORY']);
                      role.setColor('#ff2317');
                      });
                      message.guild.roles.create({ data: {name : '🗣️🗣 Üye' } , reason: 'ayn'}).then(role => {
                        role.setPermissions(['VIEW_CHANNELS', 'CREATE_INVITE', 'SEND_MESSAGES', 'ATTACH_FILES', 'USE_EXTERNAL_EMOJI', 'CONNECT', 'SPEAK', 'READ_MESSAGE_HISTORY']);
                        role.setColor('#2c00c9');
                        });
  
await message.guild.channels.create('Önemli Kanallar', { type: "category" }).then(a => {
a.createOverwrite(message.guild.roles.cache.find(a => a.name === "@everyone"), {
 SEND_MESSAGES: false,
 VIEW_CHANNEL: true,
 CHANGE_NICKNAME: true,
 READ_MESSAGE_HISTORY: true
})
})
await message.guild.channels.create("「📣」Duyurular", {type: "text", parent: message.guild.channels.cache.find(a => a.name === 'Önemli Kanallar').id,})
await message.guild.channels.create("「📊」Kurallar", {type: "text", parent: message.guild.channels.cache.find(a => a.name === 'Önemli Kanallar').id})
await message.guild.channels.create("「🎉」Çekiliş", {type: "text", parent: message.guild.channels.cache.find(a => a.name === 'Önemli Kanallar').id})
await message.guild.channels.create("「💝」Boost", {type: "text", parent: message.guild.channels.cache.find(a => a.name === 'Önemli Kanallar').id})

                                        
  
  
await message.guild.channels.create('Genel', { type: "category" })
await message.guild.channels.create("「💬」Chat", {type: "text", parent: message.guild.channels.cache.find(a => a.name === 'Genel').id})
await message.guild.channels.create("「🛠️」Komut", {type: "text", parent: message.guild.channels.cache.find(a => a.name === 'Genel').id})
await message.guild.channels.create("「📷」Medya", {type: "text", parent: message.guild.channels.cache.find(a => a.name === 'Genel').id})

await message.guild.channels.create('Eğlence Kanalları', { type: "category" })  
  await message.guild.channels.create("「💣」bom", {type: "text", parent: message.guild.channels.cache.find(a => a.name === 'Eğlence Kanalları').id})
   await message.guild.channels.create("「🔢」sayı-sayma", {type: "text", parent: message.guild.channels.cache.find(a => a.name === 'Eğlence Kanalları').id})
   await message.guild.channels.create("「💡」kelime türetme", {type: "text", parent: message.guild.channels.cache.find(a => a.name === 'Eğlence Kanalları').id})
  
  
await message.guild.channels.create('Sohbet Kanalları', { type: "category" })
await message.guild.channels.create("「💬」Sohbet | 1", {type: "voice", parent: message.guild.channels.cache.find(a => a.name === 'Sohbet Kanalları').id})
await message.guild.channels.create("「💬」Sohbet | 2", {type: "voice", parent: message.guild.channels.cache.find(a=> a.name === 'Sohbet Kanalları').id})
await message.guild.channels.create("「💬」Sohbet | 3", {type: "voice", parent: message.guild.channels.cache.find(a => a.name === 'Sohbet Kanalları').id})

await message.guild.channels.create('Muzik Kanalları', { type: "category" })
await message.guild.channels.create("「🎵」Music | 1", {type: "voice", parent: message.guild.channels.cache.find(a => a.name === 'Muzik Kanalları').id})
await message.guild.channels.create("「🎵」Music | 2", {type: "voice", parent: message.guild.channels.cache.find(a => a.name === 'Muzik Kanalları').id})
await message.guild.channels.create("「🎵」Music | 3", {type: "voice", parent: message.guild.channels.cache.find(a => a.name === 'Muzik Kanalları').id})

  
  
await message.guild.channels.create('Yetkili Agalar', { type: "category" }).then(async a => {
a.createOverwrite(message.guild.roles.cache.find(a => a.name === "@everyone"), {
 SEND_MESSAGES: false,
 VIEW_CHANNEL: false,
 READ_MESSAGE_HISTORY: false
}), message.guild.roles.cache.find(a => a.name === "🗣️ Moderatör"), {
  SEND_MESSAGES: true,
  VIEW_CHANNEL: true,
  READ_MESSAGE_HISTORY: true
 }, message.guild.roles.cache.find(a => a.name === "🐕‍ Rehber"), {
  SEND_MESSAGES: true,
  VIEW_CHANNEL: true,
  READ_MESSAGE_HISTORY: true
 }
await message.guild.channels.create("「🔒」Yetkili-Sohbet", {type: "text", parent: message.guild.channels.cache.find(a => a.name === 'Yetkili Agalar').id}) 
await message.guild.channels.create("「🎤」Yetkili-Özel", {type: "voice", parent: message.guild.channels.cache.find(a => a.name === 'Yetkili Agalar').id})
})}
         )})}

exports.conf = {
enabled: true, 
guildOnly: false,
aliases: [], 
permLevel: 0 
};

exports.help = {
name: 'sunucu-kur-normal',
description: 'Normal Sunucu Kurarsın',
        kategori: "skur",
usage: ''
}