//-------------- TANIMLAMALAR --------------
const Discord = require('discord.js')

const { Client, Util } = require('discord.js');

const ayarlar = require('./ayarlar.json');
const client = new Discord.Client({disableMentions:"everyone",ws: { intents: new Discord.Intents(Discord.Intents.ALL) }})
const { Database } = require("quickmongo");
const db = new Database("Mongo İD");
require('./util/eventloader.js')(client);

const ayarla = require('./ayarlar.json');

const fs = require("fs")
const moment = require("moment");
require("moment-duration-format");

//const millisCreated = new Date().getTime() - client.users.cache.get("554266211043770400").createdTimeStamp.getTime();
//    const daysCreated = moment.duration(millisCreated).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")

//----------- AYARLAMALAR ------------
client.ayarlar = {
	token: "ODgxODkxODI1ODY5MjkxNTMy.YSzbxA.laVaNH_SV0Eco0cczz9e5z9gigI",
	gelistirici:["384683153769496586","844955462586859560"],
	oauthSecret: "oiypGXZLPXHRuu1y-B7cLE2xs74e1Fhg",
	callbackURL: "https://narcoscode.tk/callback",
    id:"881891825869291532",
	prefix:"!",
}
client.commands = new Discord.Collection()
var prefix = ayarlar.prefix;
var deasync = require('deasync');

function userBul(ID) {
  return deasync(async(_ID, cb) => {
    let output = null;
    
    
  

    try {
      let user = await client.users.fetch(_ID);

      output = { 
        tag: user.tag,
        avatar: user.avatarURL(),
        name:user.username,
        isbot:user.bot,
     };
    } catch(err) { output = {tag:"Bulunamadı#0000",isbot:null,name:"Bulunamadı",avatar:client.user.avatarURL()} }
    
    cb(null, output);
  })(ID);
}

 function kisalt(str) {
  var newstr = "";
  var koyulan = 0;
  if(str.length > 10) {
    dongu: for(var i = 0;i<str.length;i++) {
      const element = str.split("")[i];
      if(i >= 28) { 
        if(koyulan < 3) {
          newstr += " .";
          koyulan++;
        }else {
          break dongu;
        }
        
      }else newstr += element; 
    }
    return newstr;
  }else return str;
}

const zaman = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

function botista() {
	return {
		serverSize: client.guilds.cache.size,
		userSize:client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(),
		emojiSize:client.emojis.cache.size.toLocaleString(),
		channelSize:client.channels.cache.size.toLocaleString(),
		uptime:moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")
	}
}
client.db = db
client.stats = botista
client.kisibul = userBul
client.tools = {
	kisalt:kisalt
}
client.on("ready", async() => {
 console.log(`Narcos Code ile her zaman online`)
  require("./dash")(client)
})
let tag = ""
Object.keys( db.get(`viptime`).then(x => console.log(x)) || "").map(id => { 
setInterval (async () => { 
      let x = await db.get(`viptime.${id}`);
    if(x) {
    if(x < Date.now()) {
 await db.delete(`vip.${id}`);
await db.delete(`viptime.${id}`);
      let embe = new Discord.MessageEmbed() 
.setColor("#FFEE58") 
.setDescription(`**${client.kisibul(id).tag}** Adlı kullanıcının vip üyeliği bitti`)
client.channels.cache.get(ayarla.goldlog).send(embe);
    }
}else{
}    }, 1000)
                                   }) 



/////////////////////


client.on('guildDelete', guild => {

    let narcoscode = new Discord.MessageEmbed()
    
    .setColor("RED")
    .setTitle(" ATILDIM !")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
    
       client.channels.cache.get(ayarlar.girdiçıktılog).send(narcoscode);
      
    });
    
    
    client.on('guildCreate', guild => {
    
    let narcoscode = new Discord.MessageEmbed()
    
    .setColor("GREEN")
    .setTitle("EKLENDİM !")
    .addField("Sunucu Adı:", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
    
       client.channels.cache.get(ayarlar.girdiçıktılog).send(narcoscode);
      
    });



///////////////////////Youtube Bot log
client.on("message", message => {
let ytlog = db.fetch(`ytlog_${message.guild.id}`)
let kanalid = db.fetch(`kanalid_${message.guild.id}`) 

const ytch = require('yt-channel-info')

let id = kanalid
let type = "user"
if(id) {
    ytch.getChannelInfo(id, type).then((response) => { 


        setInterval(() => {
            client.channels.cache.get(ytlog).send("Şu anda **"+response.subscriberCount+" **Abone var")
            }, 1800000)

          

    })
}



///////////////////////Youtube Bot bildirim


const nrc = new (require("rss-parser"))();


function handleUploads() {
    if (db.fetch(`postedVideos`) === null) db.set(`postedVideos`, []);
    setInterval(() => {
        nrc.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${kanalid}`)
        .then(nrc1 => {
            if (db.fetch(`postedVideos`).includes(nrc1.items[0].link)) return;
            else {
                db.set(`videoData`, nrc1.items[0]);
                db.push("postedVideos", nrc1.items[0].link);
                let nrcvideo = db.fetch(`videoData`);
                let channel = db.fetch(`ytbildirim_${message.guild.id}`)
                if (!channel) return;
                let message = "Hey `@everyone`, **{author}** Yeni Video Yükledi: **{title}**!\n{url}"
                    .replace(/{author}/g, nrcvideo.author)
                    .replace(/{title}/g, Discord.Util.escapeMarkdown(nrcvideo.title))
                    .replace(/{url}/g, nrcvideo.link);
                channel.send(message);
            }
        });
    }, 30000);
}

});



/////////////////////////Discord bot kısmı




client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    (` Toplam ${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        (`Yüklenen komut: ${props.help.name}`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
    if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 4;
    if (message.author.id === ayarlar.sahip) permlvl = 5;
    return permlvl;
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let botPermlvl = 0;
    if (message.member.hasPermission("MANAGE_MESSAGES")) botPermlvl = 1;
    if (message.member.hasPermission("KICK_MEMBERS")) botPermlvl = 2;
    if (message.member.hasPermission("BAN_MEMBERS")) botPermlvl = 3;
    if (message.member.hasPermission("ADMINISTRATOR")) botPermlvl = 4;
    if (message.author.id === ayarlar.sahip) botPermlvl = 5;
    return botPermlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));



//afk
client.on("message", async msg => {
  if (!msg.guild) return;
  if (msg.content.startsWith(ayarlar.prefix + "afk")) return;

  let afk = msg.mentions.users.first();

  const kisi = await db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`);

  const isim = await db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`);
  if (afk) {
    const sebep = await db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`);
    const kisi3 = await db.fetch(`afkid_${afk.id}_${msg.guild.id}`);
    if (msg.content.includes(kisi3)) {
      msg.reply(`Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`);
    }
  }
  if (msg.author.id === kisi) {
    msg.reply(`Afk'lıktan Çıktınız`);
   await db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`);
    await db.delete(`afkid_${msg.author.id}_${msg.guild.id}`);
    await db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`);
    msg.member.setNickname(isim);
  }
});


///////////////////////////CapsEngel

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
 } 

client.on("message", async(message) => {
    if(!message.guild) return;
    let matched = message.content.replace(/[^A-Z]/g, "").length
    let yuzde = percentage(matched, message.content.length)
    if(message.author.bot) return;
    if(await db.has(`caps_${message.guild.id}`)) {
        if(message.content.length > 4) {
          if(Math.round(yuzde) > 40) {
              if(!message.member.hasPermission("BAN_MEMBERS")) {
                  message.delete()
                  const embed = new Discord.MessageEmbed()
                  .setTitle("Dur Bakalım!")
                  .setDescription("Bu sunucuda büyük harfle yazmak yasak. Caps yüzdesi: %"+ yuzde.toFixed(2))
                  .setColor("BLUE")
                  .setFooter("Narcos Code Genel V5", client.user.avatarURL())
                  message.channel.send(embed).then(mesaj => {
                    setTimeout(function () {
                        mesaj.delete()
                    }, 4000)
            
                })
              }
          }
        }
    }
})

////////////////////////// küfür engel
client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.get(`küfürT_${msg.guild.id}`);
  if (i == "acik") {
    const kelime = [
      "amk",
      "aq",
      "p!ç",
      "pç",
      "piç",
      "velet",
      "göt",
      "amcık",
      "sikiyim",
      "sik",
      "vld",
      "orospu",
      "orosbu",
      "or",
      "orç",
      "amına",
      "pipi",
      "annesiz",
      "amık",
      "sg",
      "a-q",
      "a--q",
      "a.q",
      "a+q",
      "anan",
      "orusbu",
      "pezevenk"
    ];
    if (kelime.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();
          return msg.channel
            .send(
              `<@${msg.author.id}> **Kanka Naber? Sanırsam Küfür Ediyorsun Fakat Ben Buradayken Bunu Yapamazsınn :))**`
            )
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("messageUpdate", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.get(`küfürT_${msg.guild.id}`);
  if (i == "acik") {
    const kelime = [
      "amk",
      "aq",
      "p!ç",
      "pç",
      "piç",
      "velet",
      "göt",
      "amcık",
      "sikiyim",
      "sik",
      "vld",
      "amına",
      "pipi",
      "annesiz",
      "amık",
      "sg",
      "a-q",
      "a--q",
      "a.q",
      "a+q",
      "anan",
      "orusbu",
      "pezevenk"
    ];
    if (kelime.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();
          return msg.channel
            .send(
              `<@${msg.author.id}> **Kanka Naber? Sanırsam Küfür Ediyorsun Fakat Ben Buradayken Bunu Yapamazsınn :))**`
            )
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});


//////////Reklam engel

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.get(`reklam_${msg.guild.id}`);
  if (i == "acik") {
    const kelime = ["https://", ".net", ".com", ".gov", "http://", ".tc"];
    if (kelime.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();
          return msg.channel
            .send(
              `<@${msg.author.id}> **Kanka Naber? Sanırsam Reklam Yapıyorsun Fakat Ben Buradayken Bunu Yapamazsınn :))**`
            )
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});


//Foto chat

client.on("message", async m => {
  let chattt = await db.fetch(`fotochat_${m.guild.id}`);
  if(!chattt) return;
  if (m.channel.id !== chattt) {
    //buraya o kanalın ID'si yazılacak.
    return;
  }
  if (!m.member.hasPermission("ADMINISTRATOR")) {
    if (m.attachments.size < 1) {
      m.delete()
      m.channel.send("Bu kanalda sadece fotoğraf paylaşılabilir.").then(m => m.delete({timeout: 3900}));
    }
  }
});

////hg-bb


client.on("guildMemberAdd", async member => {
  let skanal9 = await db.fetch(`gelenGiden_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = client.channels.cache.get(skanal9);
  if (!skanal31) return;
  const geldi = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setFooter( "Narcos Code Genel Bot V5", client.user.avatarURL())

    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addField(
      `**Bir Üye Katıldı!**`,
      `**${member} Sunucuya Katıldı.**\n**Toplam ${member.guild.memberCount} Kişiyiz.**`
    );
  skanal31.send(geldi);
});

client.on("guildMemberRemove", async member => {
  let skanal9 = await db.fetch(`gelenGiden_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = client.channels.cache.get(skanal9);
  if (!skanal31) return;
  const gitti = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setFooter( "Narcos Code Genel Bot V5", client.user.avatarURL())

    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addField(
      `**Bir Üye Ayrıldı!**`,
      `**${member} Sunucudan Ayrıldı.**\n**Toplam ${member.guild.memberCount} Kişiyiz.**`
    );
  skanal31.send(gitti);
});






///////////

//-----------------------Sayaç-----------------------\\

client.on("guildMemberAdd", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = client.channels.cache.get(skanal9);
  if (!skanal31) return;
  const geldi = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())

    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addField(
      `**Bir Üye Katıldı!**`,
      `**${member} Sunucuya Katıldı.**\n**${sayac} Kişi Olmamıza ${sayac -
        member.guild.memberCount} Kişi Kaldı.**\n**Toplam ${
        member.guild.memberCount
      } Kişiyiz.**`
    );
  if(member.guild.memberCount == sayac) {
    skanal31.send(":tada: :tada: **İnanılmaz! Sunucu hedefe ulaştı! Sayaç sıfırlandı.** :tada: :tada:")
   await  db.delete(`sayac_${member.guild.id}`)
 await   db.delete(`sayacK_${member.guild.id}`)
  }else{
    skanal31.send(geldi);
  }
  
});

client.on("guildMemberRemove", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal9 = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal9) return;
  const skanal31 = client.channels.cache.get(skanal9);
  if (!skanal31) return;
  const gitti = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setFooter( "Narcos Code Genel V5", client.user.avatarURL())

    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addField(
      `**Bir Üye Ayrıldı!**`,
      `**${member} Sunucudan Ayrıldı.**\n**${sayac} Kişi Olmamıza ${sayac -
        member.guild.memberCount} Kişi Kaldı.**\n**Toplam ${
        member.guild.memberCount
      } Kişiyiz.**`
    );
  skanal31.send(gitti);
});





//////////// kayıt bölümü




client.on("guildMemberAdd", async(member) => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
          '0': `0`,
            '1': `1`,
            '2': `2`,
            '3': `3`,
            '4': `4`,
            '5': `5`,
            '6': `6`,
            '7': `7`,
            '8': `8`,
            '9': `9`}[d];})}
            const kanal = await db.fetch(`klog_${member.guild.id}`)
            if(!kanal) return console.log("BÖLE BİR KANAL BULAMADIM.......")
      let register = await db.fetch(`kayıty_${member.guild.id}`)
      let tagayar =    await db.fetch(`tag_${member.guild.id}`)
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: ❌ Güvenilir Değil. ❌'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: :white_check_mark:  Güvenilir Gözüküyor. :white_check_mark: '
    moment.locale("tr");
  const embeddd = new Discord.MessageEmbed()
  .setAuthor(member.guild.name, member.guild.iconURL({dynamic:true}))
  .setDescription(`
  ▫️<@`+member.id+`> **Sunucumuza Katıldı !** 
  
  ▫️**Kayıt edilmek için teyit odasında <@&${register}> rolündekilerine teyit vermen yeterli ! **
  
  ▫️**Seninle birlikte **`+üyesayısı+`** kişiye ulaştık !**
  
  ▫️**Sunucumuzun kurallarına uymayı unutma, kurallarımızı okumanı tavsiye ederiz.**

  ▫️**Sunucumuzun tagını (\` ${tagayar} \`) alarak bizlere destek olabilirsin**

  ▫️**`+kontrol+`**

  ▫️**İçeride keyifli vakitler geçirmeni dileriz.**

  **Narcos Code Ultra Gelişmiş Kayıt **
`)
  member.guild.channels.cache.get(kanal).send(embeddd) 
  member.guild.channels.cache.get(kanal).send(`<@&${register}> - <@`+member.id+`>`)
});




client.login(client.ayarlar.token)
