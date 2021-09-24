const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")

const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);
exports.run = async (client, message, args) => {
  const kisi = await db.fetch(`afkid_${message.author.id}_${message.guild.id}`);
  if (kisi) return;
  const sebep = args[0];

  
  
  
  				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu sebepleri giremezsiniz engelli listemde kayıtlı...`)
					.setColor("BLUE")
          
          
          
  if (!args[0]) {
    let kullanıcı = message.guild.members.cache.get(message.author.id);
    const b = kullanıcı.displayName;

    await db.set(
      `afkSebep_${message.author.id}_${message.guild.id}`,
      "Sebep Girilmemiş"
    );
    await db.set(
      `afkid_${message.author.id}_${message.guild.id}`,
      message.author.id
    );
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b);

    const a = await db.fetch(
      `afkSebep_${message.author.id}_${message.guild.id}`
    );

    message.channel.send(`Başarıyla Afk Oldunuz \n Sebep: ${a}`);

    message.member.setNickname(`[AFK] ` + b);
  }
  
  


  
  if (args[0]) {
    let sebep = args.join(" ");
    let kullanıcı = message.guild.members.cache.get(message.author.id);
    const b = kullanıcı.displayName;

    if (sebep.includes("@everyone")) return message.channel.send(embed).then(a => a.delete({timeout: 4500}));
        if (sebep.includes("@here")) return message.channel.send(embed).then(a => a.delete({timeout: 4500}));
    

    await db.set(`afkSebep_${message.author.id}_${message.guild.id}`, sebep);
    await db.set(
      `afkid_${message.author.id}_${message.guild.id}`,
      message.author.id
    );
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b);
    const a = await db.fetch(
      `afkSebep_${message.author.id}_${message.guild.id}`
    );

    message.channel.send(`**Artık AFK'sınız.**\nBirisi sizi etiketleyince **${a}** diyeceğim.`);

    message.member.setNickname(`[AFK] ` + b);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["afkk"],
  permLevel: 0
};

exports.help = {
  name: "afk",
  description: "Afk Olmanızı Sağlar.",
  usage: "afk / afk <sebep>",
        kategori: "kullanıcı"
};

