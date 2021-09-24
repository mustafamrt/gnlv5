const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log("Saatlik Restart Atıldı!")
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Aktif, Komutlar yüklendi!`
  );
  console.log(
    `[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${
      client.user.username
    } ismi ile giriş yapıldı!`
  );
  console.log("şu anda "+client.commands.size+" komut hazır")
  client.user.setStatus("online");
  var oyun = [
    "Narcos Code Genel V5",
    "Türkiyenini En iyi Altyapısı",
    "Çok Yakında sizlerle..."

  ];

  setInterval(function() {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);

    client.user.setActivity(oyun[random], "");
  }, 2 * 2500);
  
  setInterval(function() {
    console.log("SAATLIK RESTART ATILIYOR...")
    process.exit(0)
  }, 3600000)
  
};