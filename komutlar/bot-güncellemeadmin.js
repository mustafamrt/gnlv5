const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const db = new Database(ayarlar.mongourl);
exports.run = async (client, message, args) => {

  if(message.author.id !== ayarlar.sahip) return;
  if(!args[0]) return message.reply('Yapılacak işlemi yazmayı unuttun. Kullanabileceğin parametreler: ekle, sil');
  if(!['ekle', 'sil'].includes(args[0])) return message.reply('Yanlış bir parametre girdin. Kullanabileceğin parametreler: ekle, sil');

  if(args[0] === 'ekle') {
    if(!args[1]) return message.reply('Güncelleme başlığını yazmalısın. Her parametre arasına | koyman gerekiyor. Örnek: u!güncelleme-admin ekle Başlık | Açıklama');
    args = args.slice(1).join(' ').split(' | ');
    if(!args[1]) return message.reply('Güncelleme açıklamasını yazmalısın. Her parametre arasına | koyman gerekiyor. Örnek: u!güncelleme-admin ekle Başlık | Açıklama');
    
   await db.add('numaraa', 1);
    const then = await db.fetch('numaraa');
    await db.push('güncellemeler', {
      title: args[0],
      description: args[1],
      number: Number(then)
    });
    return message.reply('Güncelleme eklendi.');
  } else {
    if(!args[1]) return message.reply('Hangi güncellemeyi silmek istiyorsan o güncellemenin numarasını yazmalısın.');
    if(isNaN(args[1])) return message.reply('Güncellemenin numarasını yazarken sadece sayı kullanabilirsin.');
    const güncellemeler = await db.fetch('güncellemeler');
    if(!güncellemeler || güncellemeler.length <= 0 || !güncellemeler.some(data => data.number === Number(args[1]))) return message.reply('Bu numaraya sahip bir güncelleme bulunamadı.');
    await db.set('güncellemeler', güncellemeler.filter(data => data.number !== Number(args[1])));
    return message.reply('Güncelleme silindi.');
  };

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'güncelleme-admin'
};