const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async(client, message, args) => {
    const narcosmisafir = await db.fetch(`misafir_${message.guild.id}`); 
    const nkayıterkek = await db.fetch(`erkekrol_${message.guild.id}`); 
  
  const klog = await db.fetch(`klog_${message.guild.id}`); 
  const tag = await db.fetch(`tag_${message.guild.id}`);

  var toplam = await db.fetch(`erkekkayıtstats_${message.author.id}.${message.guild.id}`)
  var toplam2 = await db.fetch(`kızkayıtstats_${message.author.id}.${message.guild.id}`)


  let kayıtsız =  await  db.fetch(`misafir_${message.guild.id}`)
  let kızrol =   await db.fetch(`erkekrol_${message.guild.id}`)
  let kayıtl =    await db.fetch(`klog_${message.guild.id}`)
  let kyetkili =    await db.fetch(`kayıty_${message.guild.id}`)
  let tagayar =    await db.fetch(`tag_${message.guild.id}`)
  if(!kayıtsız) return message.channel.send("Bu komudu kullanmak için **Kayıtsız Rol** sunucuda ayarlı olması gerekiyor.")
  if(!kızrol) return message.channel.send("Bu komudu kullanmak için **Erkek Rol** sunucuda ayarlı olması gerekiyor.")
  if(!kayıtl) return message.channel.send("Bu komudu kullanmak için **Kayıt Log** sunucuda ayarlı olması gerekiyor.")
  if(!kyetkili) return message.channel.send("Bu komudu kullanmak için **Kayıt Yetkilisi** Rolü sunucuda ayarlı olması gerekiyor.")
  if(!tagayar) return message.channel.send("Bu komudu kullanmak için **Tag** sunucuda ayarlı olması gerekiyor.")

  if(!message.member.roles.cache.has(await db.fetch(`kayıty_${message.guild.id}`))) {
    return message.channel.send("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
 }


  {
    let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
      if(!member) return message.channel.send("Bir kullanıcı girin.")
    const c = message.guild.member(member)
    const nick = args[1];
    const yas = args[2];
      if(!nick) return message.channel.send("**Kayıt Edebilmem İçin Bir ``İsim`` Girmelisin.**")
      if(!yas) return message.channel.send("**Kayıt Edebilmem İçin Bir ``Yaş`` Girmelisin.**")
    c.roles.add(nkayıterkek)
    c.roles.remove(narcosmisafir)
    c.setNickname(`${tag} ${nick} , ${yas}`)
    await db.add(`erkekkayıtstats_${message.author.id}.${message.guild.id}`, 1)
            await db.add(`erkekkayıt_${message.author.id}.${message.guild.id}`, 1)
     const narcoscode = new Discord.MessageEmbed()
    .setDescription(`
:white_check_mark: Kayıt Başarılı :white_check_mark:

• Kaydı Yapılan Üye: **${c.user.tag}**
• Değiştirilen İsim: ${tag} ${nick} | ${yas}
• Verilen Rol: <@&${nkayıterkek}>

`)
.addField(`Toplam Erkek Kayıt\n`, toplam || 0)
.addField(`Toplam Kız Kayıt\n`, toplam2 || 0)


         .setFooter('Narcos Erkek Kayıt Sistemi')
     message.channel.send(narcoscode)
     


    
   
    
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["e","bay"],
  permLevel: 0
};
exports.help = {
  name: "erkek",
  description: "Erkek üye kaydedersin",
  usage: "",
  kategori: "kayıt"
};
   
