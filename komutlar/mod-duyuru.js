const discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);


exports.run = async(client, message, args) => {
	
	if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
				const embed = new discord.MessageEmbed()
					.setDescription(`Abicim bana yönetici izni vermemişsin, yönetici iznimi ver öle yap!`)
					.setColor("BLUE")
				return message.channel.send({embed})

  }
	
	if (!message.member.hasPermission("ADMINISTRATOR")) {
				const embed = new discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`)
					.setColor("BLUE")
				return message.channel.send({embed})

  }

    let duyurukanal = await db.fetch(`duyurukanal_${message.guild.id}`)
  let duyuru = args.slice(0).join(" ")
  
  if(!duyuru) {
	  const embed = new discord.MessageEmbed()
					.setDescription(`Bir duyuru gir.`)
					.setColor("BLUE")
				return message.channel.send({embed})
  }
  

  client.channels.cache.get(duyurukanal).send("**Bir Duyuru Var!!**\n" + duyuru)

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["duyur"],
  permLevel: 0
};

exports.help = {
  name: 'duyuru',
  description: 'Duyuru Atarsın',
  usage: '',
        kategori: "mod"
};