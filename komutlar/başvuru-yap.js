const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);



exports.run = async(client, message, args) => {

  let basvuru = db.fetch(`basvuruk_${message.guild.id}`)
    let kanal = db.fetch(`başvuru-ekle_${message.guild.id}`)
  let log =   db.fetch(`başvuru-log_${message.guild.id}`)
  let soru1 =   db.fetch(`soru1_${message.guild.id}`)
  let soru2 =   db.fetch(`soru2_${message.guild.id}`)
  let soru3 =   db.fetch(`soru3_${message.guild.id}`)
  let soru4 =   db.fetch(`soru4_${message.guild.id}`)
  let soru5 =   db.fetch(`soru5_${message.guild.id}`)
   let yetkili = db.fetch(`byetkili_${message.guild.id}`)


  
    if(!log) return message.channel.send("Bu komudu kullanmak için başvuru kanallarının sunucuda ayarlı olması gerekiyor.")
  if(!basvuru) return message.channel.send("Bu komudu kullanmak için başvuru kanallarının sunucuda ayarlı olması gerekiyor.")
  if(!kanal) return message.channel.send("Bu komudu kullanmak için başvuru kanallarının sunucuda ayarlı olması gerekiyor.")
  if(!soru1) return message.channel.send("Bu komudu kullanmak için Soru 1'in sunucuda ayarlı olması gerekiyor.")
  if(!soru2) return message.channel.send("Bu komudu kullanmak için Soru 2'nin sunucuda ayarlı olması gerekiyor.")
  if(!soru3) return message.channel.send("Bu komudu kullanmak için Soru 3'ün sunucuda ayarlı olması gerekiyor.")
  if(!soru4) return message.channel.send("Bu komudu kullanmak için Soru 4'ün sunucuda ayarlı olması gerekiyor.")
  if(!soru5) return message.channel.send("Bu komudu kullanmak için Soru 5'in sunucuda ayarlı olması gerekiyor.")





  if (message.channel.id !== kanal) return message.channel.send(`Bu komutu sadece <#${kanal}> kanalında kullanabilirsin.`)
  
  if(db.has(`sorularitamamladi_${message.author.id}_${message.guild.id}`)) return message.channel.send("Zaten Başvurmuşsun Onaylanmış Veya Beklemede olabilir Reddedilir ise tekrardan başvuru yapabilirsin.")
      
  
  if (message.channel.id == kanal) {

	message.delete()

  message.channel.send(`Soru 1: ${soru1}\n**Unutma! Her soru için 20 saniyen var.**`).then(mesajcik => {
    mesajcik.delete({timeout: 20000})
  })
  message.channel.awaitMessages(m => (m.author.id === message.author.id), {
    max: 1,
    time: 20000,
    errors: ["time"]
}).then(mesaj => {
  mesaj.first().delete()
  db.set(`soru1cevap_${message.author.id}_${message.guild.id}`, mesaj.first().content)
  message.channel.send(`Tamamdır! Şimdi Soru 2: ${soru2}`).then(mesajcik => {
    mesajcik.delete({timeout: 20000})
  })
  message.channel.awaitMessages(m => (m.author.id === message.author.id), {
    max: 1,
    time: 20000,
    errors: ["time"]
  }).then(mesaaj => {
mesaaj.first().delete()
    db.set(`soru2cevap_${message.author.id}_${message.guild.id}`, mesaaj.first().content)
  message.channel.send(`Harikasın! Sırada Soru 3: ${soru3}`).then(mesajcik => {
    mesajcik.delete({timeout: 20000})
  })
  message.channel.awaitMessages(m => (m.author.id === message.author.id), {
    max: 1,
    time: 20000,
    errors: ["time"]
  }).then(mesaaaj => {
mesaaaj.first().delete()
    db.set(`soru3cevap_${message.author.id}_${message.guild.id}`, mesaaaj.first().content)
  message.channel.send(`Bilgiler gelsinn .d Soru 4: ${soru4}`).then(mesajcik => {
    mesajcik.delete({timeout: 20000})
  })
  message.channel.awaitMessages(m => (m.author.id === message.author.id), {
    max: 1,
    time: 20000,
    errors: ["time"]
  }).then(mesaaaaj => {
mesaaaaj.first().delete()
    db.set(`soru4cevap_${message.author.id}_${message.guild.id}`, mesaaaaj.first().content)
  message.channel.send(`Son 1 soru kaldı! Soru 5: ${soru5}`).then(mesajcik => {
    mesajcik.delete({timeout: 20000})
  })
  message.channel.awaitMessages(m => (m.author.id === message.author.id), {
    max: 1,
    time: 20000,
    errors: ["time"]
  }).then(soru5cevapladiadam => {
soru5cevapladiadam.first().delete()
    db.set(`soru5cevap_${message.author.id}_${message.guild.id}`, soru5cevapladiadam.first().content)
	db.set(`sorularitamamladi_${message.author.id}_${message.guild.id}`, true)
    message.channel.send("Tebrikler! Başvurunuz yetkililer tarafından incelenecektir.").then(mesajcik => {
      mesajcik.delete({timeout: 5000})
    
      const basvuruuu = new Discord.MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`${message.author} adlı kullanıcı yeni bir başvuru yaptı!`)
      const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setTitle("Başvuru Geldi!")
      .addField(`**•** Başvuran kişi etiket: `, `<@${message.author.id}>`)
      .addField(`<:klln:823577811067469844> **•** ${soru1} Yanıt`, `\`\`\`${db.fetch(`soru1cevap_${message.author.id}_${message.guild.id}`)}\`\`\``)
      .addField(`<:klln:823577811067469844> **•** ${soru2} Yanıt`, `\`\`\`${db.fetch(`soru2cevap_${message.author.id}_${message.guild.id}`)}\`\`\``)
      .addField(`<:klln:823577811067469844> **•** ${soru3} Yanıt`, `\`\`\`${db.fetch(`soru3cevap_${message.author.id}_${message.guild.id}`)}\`\`\``)
      .addField(`<:klln:823577811067469844> **•** ${soru4} Yanıt`, `\`\`\`${db.fetch(`soru4cevap_${message.author.id}_${message.guild.id}`)}\`\`\``)
      .addField(`<:klln:823577811067469844> **•** ${soru5} Yanıt`, `\`\`\`${db.fetch(`soru5cevap_${message.author.id}_${message.guild.id}`)}\`\`\``)
      
      client.channels.cache.get(log).send(`<@&${yetkili}>`)
      client.channels.cache.get(basvuru).send(embed)
      client.channels.cache.get(log).send(basvuruuu)


      if(db.has(`sorularitamamladi_${message.author.id}_${message.guild.id}`)) {

        db.delete(`soru1cevap_${message.author.id}_${message.guild.id}`)
          db.delete(`soru2cevap_${message.author.id}_${message.guild.id}`)
          db.delete(`soru3cevap_${message.author.id}_${message.guild.id}`)
          db.delete(`soru4cevap_${message.author.id}_${message.guild.id}`)
          db.delete(`soru5cevap_${message.author.id}_${message.guild.id}`)
        }

    
    })
  }).catch(err => {
    message.channel.send("Üzgünüm, süren doldu...").then(mesajcik => {
      mesajcik.delete({timeout: 5000})
    })
    db.delete(`soru1cevap_${message.author.id}_${message.guild.id}`)
    db.delete(`soru2cevap_${message.author.id}_${message.guild.id}`)
    db.delete(`soru3cevap_${message.author.id}_${message.guild.id}`)
    db.delete(`soru4cevap_${message.author.id}_${message.guild.id}`)
    return
  })
  }).catch(err => {
    message.channel.send("Üzgünüm, süren doldu...").then(mesajcik => {
      mesajcik.delete({timeout: 5000})
    })
    db.delete(`soru1cevap_${message.author.id}_${message.guild.id}`)
    db.delete(`soru2cevap_${message.author.id}_${message.guild.id}`)
    db.delete(`soru3cevap_${message.author.id}_${message.guild.id}`)
    return
  })
  }).catch(err => {
    message.channel.send("Üzgünüm, süren doldu...").then(mesajcik => {
      mesajcik.delete({timeout: 5000})
    })
    db.delete(`soru1cevap_${message.author.id}_${message.guild.id}`)
    db.delete(`soru2cevap_${message.author.id}_${message.guild.id}`)
    return
  })
  }).catch(err => {
    message.channel.send("Üzgünüm, süren doldu...").then(mesajcik => {
      mesajcik.delete({timeout: 5000})
    })
    db.delete(`soru1cevap_${message.author.id}_${message.guild.id}`)
    return
  })
}).catch(err => {
  return message.channel.send("Üzgünüm, süren doldu...").then(mesajcik => {
    mesajcik.delete({timeout: 5000})
  })
})





  }


};



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkili-başvuru'],
  permLevel: 0
};

exports.help = {
  name: 'başvuru', 
  description: "Bir başvuru yaparsınız.",
  usage: 'başvur'
};