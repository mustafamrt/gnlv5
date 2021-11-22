const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);



exports.run = async (client, message, args) => {
    if (!message.guild) return message.author.send('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');


	if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
                                          .setTitle("Doğru Kullanım:")
                                          .addField("Soru Ayarlama Menüsü", `
                                          ╔══════════════════════════════════════╗
                                          ║
                                          ║ <:mod2:823577817621987358> **•** \`${ayarlar.prefix}soru-ayar 1 (sorunuz) \` ➡ **Soru 1 Ayarlarsınız**
                                          ║ <:mod2:823577817621987358> **•** \`${ayarlar.prefix}soru-ayar 2 (sorunuz) \` ➡ **Soru 2 Ayarlarsınız**
                                          ║ <:mod2:823577817621987358> **•** \`${ayarlar.prefix}soru-ayar 3 (sorunuz) \` ➡ **Soru 3 Ayarlarsınız**
                                          ║ <:mod2:823577817621987358> **•** \`${ayarlar.prefix}soru-ayar 4 (sorunuz) \` ➡ **Soru 4 Ayarlarsınız**
                                          ║ <:mod2:823577817621987358> **•** \`${ayarlar.prefix}soru-ayar 5 (sorunuz) \` ➡ **Soru 5 Ayarlarsınız**
                                          ║
                                          ╚══════════════════════════════════════╝
                                          \`\`\`Altyapı Narcos Code'ye Aittir.\`\`\`
                                          `)
                                          .setColor(message.guild.me.displayColor)
                                          )



  if(args[0] === "1") {
  if(db.has(`soru1_${message.guild.id}`)) return message.channel.send("Soru 1 Zaten Ayarlanmış.")
  if(!args.slice(1).join(" ")) return message.channel.send("Bir soru yaz.")
  db.set(`soru1_${message.guild.id}`, args.slice(1).join(" "))
  return message.channel.send("Başarıyla ayarlandı.")
      }


      if(args[0] === "2") {
        if(db.has(`soru2_${message.guild.id}`)) return message.channel.send("Soru 2 Zaten Ayarlanmış.")
        if(!args.slice(1).join(" ")) return message.channel.send("Bir soru yaz.")
        db.set(`soru2_${message.guild.id}`, args.slice(1).join(" "))
        return message.channel.send("Başarıyla ayarlandı.")
            }


            if(args[0] === "3") {
                if(db.has(`soru3_${message.guild.id}`)) return message.channel.send("Soru 3 Zaten Ayarlanmış.")
                if(!args.slice(1).join(" ")) return message.channel.send("Bir soru yaz.")
                db.set(`soru3_${message.guild.id}`, args.slice(1).join(" "))
                return message.channel.send("Başarıyla ayarlandı.")
                    }

                    if(args[0] === "4") {
                        if(db.has(`soru4_${message.guild.id}`)) return message.channel.send("Soru 4 Zaten Ayarlanmış.")
                        if(!args.slice(1).join(" ")) return message.channel.send("Bir soru yaz.")
                        db.set(`soru4_${message.guild.id}`, args.slice(1).join(" "))
                        return message.channel.send("Başarıyla ayarlandı.")
                            }

                            if(args[0] === "5") {
                                if(db.has(`soru5_${message.guild.id}`)) return message.channel.send("Soru 5 Zaten Ayarlanmış.")
                                if(!args.slice(1).join(" ")) return message.channel.send("Bir soru yaz.")
                                db.set(`soru5_${message.guild.id}`, args.slice(1).join(" "))
                                return message.channel.send("Başarıyla ayarlandı.")
                                    }


                                    if(args[0] === "sıfırla"){
                                        if(!db.has(`soru1_${message.guild.id}`)) return message.channel.send("Soru 1 ayarlanmalı ilk önce")
                                        if(!db.has(`soru2_${message.guild.id}`)) return message.channel.send("Soru 2 ayarlanmalı ilk önce")
                                        if(!db.has(`soru3_${message.guild.id}`)) return message.channel.send("Soru 3 ayarlanmalı ilk önce")
                                        if(!db.has(`soru4_${message.guild.id}`)) return message.channel.send("Soru 4 ayarlanmalı ilk önce")
                                        if(!db.has(`soru5_${message.guild.id}`)) return message.channel.send("Soru 5 ayarlanmalı ilk önce")
                                        db.delete(`soru1_${message.guild.id}`)
                                        db.delete(`soru2_${message.guild.id}`)
                                        db.delete(`soru3_${message.guild.id}`)
                                        db.delete(`soru4_${message.guild.id}`)
                                        db.delete(`soru5_${message.guild.id}`)
                                        message.channel.send("Başarıyla sıfırlandı.")
                                        
                                   
                                      }
            
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'soru-ayar',
    description: 'ayarlama',
 }