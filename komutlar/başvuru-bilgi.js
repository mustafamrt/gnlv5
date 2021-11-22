const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);

exports.run = async (client, message, args) => {
    if (!message.guild) return message.author.send('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');

    let soru1 =   db.fetch(`soru1_${message.guild.id}`)
    let soru2 =   db.fetch(`soru2_${message.guild.id}`)
    let soru3 =   db.fetch(`soru3_${message.guild.id}`)
    let soru4 =   db.fetch(`soru4_${message.guild.id}`)
    let soru5 =   db.fetch(`soru5_${message.guild.id}`)
 
    const nrc = new Discord.MessageEmbed()
        .setColor("BLUE")
    .setTitle(message.guild.name)
.setDescription(`

╔═════════════╣Narcos Code╠═════════════════
║
║ Merhaba Başvuru Yapmak İçin **!başvuru** yazınız
║ aşağıdaki soruları tek tek bot size sorucaktır
║ cevaplayınız arından yetkililerin **onay/red**
║ yapmasını bekleyiniz
║
╠═════════════╣Başvuru Formu╠═══════════════
║
║  **Soru 1** 
║   ${soru1}
║  **Soru 2** 
║   ${soru2}
║  **Soru 3** 
║   ${soru3}
║  **Soru 4** 
║   ${soru4}
║  **Soru 5** 
║   ${soru5}
║
╚══════════════════════════════════════════

`)

    message.channel.send(nrc);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [''],
    permLevel: 0
};

exports.help = {
    name: 'başvurubilgi',
    description: '',
 }