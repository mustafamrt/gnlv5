const discord = require("discord.js")
exports.run = async(client,message,args) => {
let ping = client.ws.ping;

/*if(ping > 200) return message.reply(`Dostum bu çok kötü Narcos botun pingi çok fazla :( lütfen sonra tekrar deneyin pingi: ${ping}`)
else if(ping < 100) return message.reply(`Dostum bu harika Narcos botun pingi süper komutlarını sabırsızlıkla bekliyor pingi: ${ping}`)
*/
if(ping < 100) return message.reply(`Dostum bu harika Narcos botun pingi süper komutlarını sabırsızlıkla bekliyor pingi: ${ping}`)
if(ping < 200) return message.reply(`Hmm, bilemedim yani botun ortalarda bir pingi var ama çalışmak için sabırsızlıkla bekliyor pingi: ${ping}`)
if(ping > 200) return message.reply(`Dostum bu çok kötü Narcos botun pingi çok fazla :( lütfen sonra tekrar deneyin pingi: ${ping}`)
  
}
exports.conf = {
  aliases: [],
  guildOnly : false,
  permLevel: 0
}
exports.help = {
  name: "ping",
      description: "Botun pingini görürsünüz",
    usage: "",
    kategori: "bot"
}