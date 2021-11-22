const url = require("url");
const path = require("path");
const Discord = require("discord.js");
var express = require('express');
var app = express();
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const ms = require("ms")
var flash = require('connect-flash');
module.exports = (client) => {
const templateDir = path.resolve(`${process.cwd()}${path.sep}html`);

app.use("/css", express.static(path.resolve(`${templateDir}${path.sep}css`)));
//-- discord auth kısmı --
passport.serializeUser((user, done) => {
done(null, user);
});
passport.deserializeUser((obj, done) => {
done(null, obj);
});
  
app.use(flash());
passport.use(new Strategy({
clientID: client.ayarlar.id,
clientSecret: client.ayarlar.oauthSecret,
callbackURL: client.ayarlar.callbackURL,
scope: ["identify","guilds"],
passReqToCallback:true
},
async (req, accessToken, refreshToken, profile, done) => {
 if(await client.db.get(`karaliste.${profile.id}`)) return done(null, false, req.flash("karaliste", "Kurucular tarafından karalisteye alınmışsın!"));
      
     done(null, profile)
    
   var accessToke = accessToken
}));

app.use(session({
secret: '123',
resave: false,
saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
//-- bitüş --
app.locals.domain = process.env.PROJECT_DOMAIN;

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
extended: true
})); 



const renderTemplate = async (res, req, template, data = {}) => {
const baseData = {
bot: client,
path: req.path,
user: req.isAuthenticated() ? req.user : null
};
res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
};
//-- sayfalar --
app.get("/giris", (req, res, next) => {
if (req.session.backURL) {
req.session.backURL = req.session.backURL;
} else if (req.headers.referer) {
const parsed = url.parse(req.headers.referer);
if (parsed.hostname === app.locals.domain) {
req.session.backURL = parsed.path;
}
} else {
req.session.backURL = "/";
}
    next();
},
passport.authenticate("discord"));

app.get("/callback", passport.authenticate("discord", {
  failureRedirect: "/autherror" 
}), async (req, res) => {

if (req.session.backURL) {
const url = req.session.backURL;
req.session.backURL = null;
res.redirect(url);
} else {
res.redirect("/");
}
});
app.get("/autherror", async(req, res) => {
  if(req.flash("karaliste")[0]) return res.redirect(`/hata?type=blacklist`)
res.redirect(`/hata?type=blacklist`)
})
app.get("/cikis", function(req, res) {
req.session.destroy(() => {
req.logout();
res.redirect("/");
});
});
  //------------------------------------------------//
  
app.get("/", async (req, res) => {
renderTemplate(res, req, "index.ejs");
});
  
app.get("/profile/:id", async(req, res) => {
  let userr = client.kisibul(req.params["id"])
  let vip = await client.db.get(`vip.${req.params["id"]}`) ? `<i class="far fa-check-circle" style="color:GREEN"></i>`: `<i class="far fa-times-circle" style="color:RED"></i>`
renderTemplate(res, req, "profile.ejs", {userr,vip});
});
  
app.get("/admin", async (req, res) => {
 if(!client.ayarlar.gelistirici.includes(req.user.id) ) return res.redirect('/')
renderTemplate(res, req, "admin/index.ejs");
});
  
app.get("/admin/gold-uye", async (req, res) => {
 if(!client.ayarlar.gelistirici.includes(req.user.id) ) return res.redirect('/')
renderTemplate(res, req, "admin/goldüye.ejs");
});
  
app.get("/admin/kara-liste", async (req, res) => {
 if(!client.ayarlar.gelistirici.includes(req.user.id) ) return res.redirect('/')
renderTemplate(res, req, "admin/kara-liste.ejs");
});
  
app.get("/bilgi", async (req, res) => {
renderTemplate(res, req, "hakkımızda.ejs");
});
  
app.get("/hata", async (req, res) => {
  let type = req.query.type || "Yazı Bulunamadı"
  let text = ""
  if(type === "auth") {
    text = "Girişte bir hata oluştu sonra tekrar deneyiniz."
  }else if(type === "eksik") {
    text = "Gerekli yerlerin hepsini doldurman gerekiyor!"
  }else if(type === "kayıt") {
    text = "Bilgileri kayıt ederken bir hata meydana geldi!"
  }else if(type === "bulunamadı") {
    text = "İstenilen yer bulunamadı!"
  }else if(type === "giris") {
    text = "Bu sayfaya girmek için giriş yapmalısın!"
  }else if(type === "blacklist") text = "Karalistedesin giriş yapamazsın!"
renderTemplate(res, req, "hata.ejs", {text});
});
  
app.get("/basarili", async (req, res) => {
  let type = req.query.type || "Yazı Bulunamadı"
  let text = ""
  if(type === "ayarlar") {
    text = "Girilen bilgiler kaydedildi!"
  }
renderTemplate(res, req, "basarili.ejs", {text});
});
  
app.get("/panel", async (req, res) => {
 if(!req.user) return res.redirect("/hata?type=giris")
     const perms = Discord.Permissions;
renderTemplate(res, req, "yonet.ejs", {perms});
});
  
app.get("/yonet", async(req, res) => {
  if(!req.user) return res.redirect("/hata?type=giris")
  let id = req.query.server
  if(!id) return res.redirect("/hata?type=bulunamadı")
  let perm = client.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.redirect("/hata?type=bulunamadı")
  renderTemplate(res, req, "yonet/server.ejs", {id})
})
  
app.get("/yonetim/:id/ayar", async(req, res) => {
  if(!req.user) return res.redirect("/hata?type=giris")
  let id = req.params.id
  if(!id) return res.redirect("/hata?type=bulunamadı")
  let perm = client.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.redirect("/hata?type=bulunamadı")
  renderTemplate(res, req, "yonetim/ayar.ejs", {id})
})
  
    app.get("/yonetim/:id/filtre", async(req, res) => {
  if(!req.user) return res.redirect("/hata?type=giris")
  let id = req.params.id
  if(!id) return res.redirect("/hata?type=bulunamadı")
  let perm = client.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.redirect("/hata?type=bulunamadı")
  renderTemplate(res, req, "yonetim/filtre.ejs", {id})
})
  
      app.get("/yonetim/:id/guard", async(req, res) => {
  if(!req.user) return res.redirect("/hata?type=giris")
  let id = req.params.id
  if(!id) return res.redirect("/hata?type=bulunamadı")
  let perm = client.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.redirect("/hata?type=bulunamadı")
  renderTemplate(res, req, "yonetim/guard.ejs", {id})
})
  
  
        app.get("/yonetim/:id/moderasyon", async(req, res) => {
  if(!req.user) return res.redirect("/hata?type=giris")
  let id = req.params.id
  if(!id) return res.redirect("/hata?type=bulunamadı")
  let perm = client.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.redirect("/hata?type=bulunamadı")
  renderTemplate(res, req, "yonetim/moderasyon.ejs", {id})
})
  
    app.get("/yonetim/:id/", async(req, res) => {
  if(!req.user) return res.redirect("/hata?type=giris")
  let id = req.params.id
  if(!id) return res.redirect("/hata?type=bulunamadı")
  let perm = client.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.redirect("/hata?type=bulunamadı")
  renderTemplate(res, req, "yonetim/log.ejs", {id})
})
  //------------------------------------------------//
  app.post("/admin/gold-uye", async(req, res) => {
    if(!client.ayarlar.gelistirici.includes(req.user.id) ) return res.redirect('/')
 if(req.body["gold-id"]) {
     await client.db.set(`vip.${req.body["gold-id"]}`, true)
     await client.db.set(`viptime.${req.body["gold-id"]}`, Date.now() + ms(req.body["gold-time"] + "d"))
    }else if(req.body["usr-id"]) {
     await client.db.delete(`vip.${req.body["gold-id"]}`)
     await client.db.delete(`viptime.${req.body["gold-id"]}`)
    }
    res.redirect("/admin/gold-uye")
  })
  app.post("/yonetim/:id/ayar", async(req, res) => {
    let ayarlar = req.body
    console.log(ayarlar)
if(!req.user) return res.redirect("/hata?type=giris")
 let id = req.params.id
 if(!id) return res.redirect("/hata?type=bulunamadı")
  let perm = client.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.redirect("/hata?type=bulunamadı")
    if(ayarlar) {
      if(ayarlar["başvuru-kanal"]) {
      await client.db.set(`başvuru-ekle_${id}`, ayarlar["başvuru-kanal"])
      }else{
        try {
        await client.db.delete(`başvuru-ekle_${id}`)
     } catch(err) {
       
     }
      }
      if(ayarlar["başvuru-log"]) {
      await client.db.set(`başvuru-log_${id}`, ayarlar["başvuru-log"])
      }else{
        try {
        await client.db.delete(`başvuru-log_${id}`)
     } catch(err) {
       
     }
      }
      if(ayarlar["başvuruytk-rol"]) {
      await client.db.set(`byetkili_${id}`, ayarlar["başvuruytk-rol"])
      }else{
        try {
        await client.db.delete(`byetkili_${id}`)
     } catch(err) {
       
     }
        
        
      }
      if(ayarlar["başvurusoru-1"]) {
      await client.db.set(`soru1_{id}`, ayarlar["başvurusoru-1"])
      }else{
        try {
        await client.db.delete(`soru1_{id}`)
     } catch(err) {
       
     }
        
        
      }
      
            if(ayarlar["başvurusoru-2"]) {
      await client.db.set(`soru2_{id}`, ayarlar["başvurusoru-2"])
      }else{
        try {
        await client.db.delete(`soru2_{id}`)
     } catch(err) {
       
     }
        
        
      }
      
                  if(ayarlar["başvurusoru-3"]) {
      await client.db.set(`soru3_{id}`, ayarlar["başvurusoru-3"])
      }else{
        try {
        await client.db.delete(`soru3_{id}`)
     } catch(err) {
       
     }
        
        
      }
      
                        if(ayarlar["başvurusoru-4"]) {
      await client.db.set(`soru4_{id}`, ayarlar["başvurusoru-4"])
      }else{
        try {
        await client.db.delete(`soru4_{id}`)
     } catch(err) {
       
     }
        
        
      }
      
                              if(ayarlar["başvurusoru-5"]) {
      await client.db.set(`soru5_{id}`, ayarlar["başvurusoru-5"])
      }else{
        try {
        await client.db.delete(`soru5_{id}`)
     } catch(err) {
       
     }
        
        
      }
      
      if(ayarlar["başvuru-giden"]) {
      await client.db.set(`basvuruk_${id}`, ayarlar["başvuru-giden"])
      }else{
        try {
        await client.db.delete(`basvuruk_${id}`)
     } catch(err) {
       
     }
        
        
      } 
      
      
      ////////youtube bot
      
            if(ayarlar["yt-log"]) {
      await client.db.set(`ytlog_${id}`, ayarlar["yt-log"])
      }else{
        try {
        await client.db.delete(`ytlog_${id}`)
     } catch(err) {
       
     }
        
        
      } 
    
      
                  if(ayarlar["ytid"]) {
      await client.db.set(`kanalid_${id}`, ayarlar["ytid"])
      }else{
        try {
        await client.db.delete(`kanalid_${id}`)
     } catch(err) {
       
     }
        
        
      } 
    
      
                        if(ayarlar["yt-bildirim"]) {
      await client.db.set(`ytbildirim_${id}`, ayarlar["yt-bildirim"])
      }else{
        try {
        await client.db.delete(`ytbildirim_${id}`)
     } catch(err) {
       
     }
        
        
      } 
      
      
      ////////////kayıt 
      
      
            if(ayarlar["erkek-rol"]) {
      await client.db.set(`erkekrol_${id}`, ayarlar["erkek-rol"])
      }else{
        try {
        await client.db.delete(`erkekrol_${id}`)
     } catch(err) {
       
     }
        
        
      } 
      
            
            if(ayarlar["kız-rol"]) {
      await client.db.set(`kızrol_${id}`, ayarlar["kız-rol"])
      }else{
        try {
        await client.db.delete(`kızrol_${id}`)
     } catch(err) {
       
     }
        
        
      } 
      
            
            if(ayarlar["kayıt-kanal"]) {
      await client.db.set(`klog_${id}`, ayarlar["kayıt-kanal"])
      }else{
        try {
        await client.db.delete(`klog_${id}`)
     } catch(err) {
       
     }
        
        
      } 
      
            
            if(ayarlar["kayıtsız-rol"]) {
      await client.db.set(`misafir_${id}`, ayarlar["kayıtsız-rol"])
      }else{
        try {
        await client.db.delete(`misafir_${id}`)
     } catch(err) {
       
     }
        
        
      } 
      
            
            if(ayarlar["tag-ayar"]) {
      await client.db.set(`tag_${id}`, ayarlar["tag-ayar"])
      }else{
        try {
        await client.db.delete(`tag_${id}`)
     } catch(err) {
       
     }
        
        
      } 
      
      
             if(ayarlar["kayıtyetkili-rol"]) {
      await client.db.set(`kayıty_${id}`, ayarlar["kayıtyetkili-rol"])
      }else{
        try {
        await client.db.delete(`kayıty_${id}`)
     } catch(err) {
       
     }
        
        
      }      
      
      
      
      ///////////jail 
      
    
      
            if(ayarlar["jail-kanal"]) {
    await  client.db.set(`jailkanal_${id}`, ayarlar["jail-kanal"])
      }else{
        try {
     await   client.db.delete(`jailkanal_${id}`)
     } catch(err) {
       
     }
        
        
      } 
            if(ayarlar["jail-rol"]) {
      client.db.set(`jailrol_${id}`, ayarlar["jail-rol"])
      }else{
        try {
        client.db.delete(`jailrol_${id}`)
     } catch(err) {
       
     }
        
        
      } 
            if(ayarlar["jailytk-rol"]) {
     await client.db.set(`jailyetkilisi_${id}`, ayarlar["jailytk-rol"])
      }else{
        try {
      await  client.db.delete(`jailyetkilisi_${id}`)
     } catch(err) {
       
     }
        
        
      } 
      
      
      
      
      
      ////////////////////// gelenGiden_
      
            if(ayarlar["duyuru-kanal"]) {
     await client.db.set(`duyurukanal_${id}`, ayarlar["duyuru-kanal"])
      }else{
        try {
       await client.db.delete(`duyurukanal_${id}`)
     } catch(err) {
       
     }
        
        
      } 
            if(ayarlar["görsel-kanal"]) {
     await client.db.set(`fotochat_${id}`, ayarlar["görsel-kanal"])
      }else{
        try {
       await client.db.delete(`fotochat_${id}`)
     } catch(err) {
       
     }
        
        
      } 
      
            if(ayarlar["ticket-kanal"]) {
      await client.db.set(`kanal.${id}`, ayarlar["ticket-kanal"])
      }else{
        try {
        await client.db.delete(`kanal.${id}`)
     } catch(err) {
       
     }
        
        
      } 
      
      if(ayarlar["sayac-kanal"]) {
     await client.db.set(`sayacK_${id}`, ayarlar["sayac-kanal"])
      }else{
        try {
        await client.db.delete(`sayacK_${id}`)
     } catch(err) {
       
     }
      }
      if(ayarlar["sayac-hedef"]) {
     await client.db.set(`sayac_${id}`, ayarlar["sayac-hedef"])
      }else{
        try {
       await client.db.delete(`sayac_${id}`)
     } catch(err) {
       
     }
      }
      if(ayarlar["hgbb-kanal"]) {
      await client.db.set(`gelenGiden_${id}`, ayarlar["hgbb-kanal"])
      }else{
        try {
        await client.db.delete(`gelenGiden_${id}`)
     } catch(err) {
       
     }
      }
    }else{
      
    }
  res.redirect("/basarili?type=ayarlar")
    })

  app.post("/yonetim/:id/filtre", async(req, res) => {
    let ayarlar = req.body
if(!req.user) return res.redirect("/hata?type=giris")
 let id = req.params.id
 if(!id) return res.redirect("/hata?type=bulunamadı")
  let perm = client.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.redirect("/hata?type=bulunamadı")
    if(ayarlar) {
      if(ayarlar["link-engel"] === "on") {
     await client.db.set(`reklam_${id}`, true)
      }else{
        try {
       await client.db.delete(`reklam_${id}`)
     } catch(err) {
       
     }
      }
      if(ayarlar["caps-engel"] === "on") {
      await client.db.set(`caps_${id}`, "ACIK")
      }else{
        try {
        await client.db.delete(`caps_${id}`)
     } catch(err) {
       
     }
      }
      if(ayarlar["küfür-engel"] === "on") {
      await client.db.set(`küfürT_${id}`, "acik")
      }else{
        try {
        client.db.delete(`küfürT_$${id}`)
     } catch(err) {
       
     }
      }
    }else{
      
    }
  res.redirect("/basarili?type=ayarlar")
    })
  
  
  app.post("/yonetim/:id/guard", async(req, res) => {
    let ayarlar = req.body
if(!req.user) return res.redirect("/hata?type=giris")
 let id = req.params.id
 if(!id) return res.redirect("/hata?type=bulunamadı")
  let perm = client.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.redirect("/hata?type=bulunamadı")
    if(ayarlar) {
     if(ayarlar["ekle"]) {
      await client.db.set(`eklenecek_${id}`, ayarlar["başvuru-giden"])
      }else{
        try {
        await client.db.delete(`eklenecekk_${id}`)
     } catch(err) {
       
     }
        
        
      } 
    }else{
      
    }
  res.redirect("/basarili?type=ayarlar")
    })
  
  
  app.post("/yonetim/:id/moderasyon", async(req, res) => {
    let ayarlar = req.body
if(!req.user) return res.redirect("/hata?type=giris")
 let id = req.params.id
 if(!id) return res.redirect("/hata?type=bulunamadı")
  let perm = client.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.redirect("/hata?type=bulunamadı")
    if(ayarlar) {
     if(ayarlar["ban-rol"]) {
      await client.db.set(`banyetkili_${id}`, ayarlar["ban-rol"])
      }else{
        try {
        await client.db.delete(`banyetkili_${id}`)
     } catch(err) {
       
     }
        
        
        
             if(ayarlar["kick-rol"]) {
      await client.db.set(`kickyetkili_${id}`, ayarlar["ban-rol"])
      }else{
        try {
        await client.db.delete(`kickyetkili_${id}`)
     } catch(err) {
       
     }
      }
             if(ayarlar["unban-rol"]) {
      await client.db.set(`unbanyetkili_${id}`, ayarlar["unban-rol"])
      }else{
        try {
        await client.db.delete(`unbanyetkili_${id}`)
     } catch(err) {
       
     }
      }
        
      } 
    }else{
      
    }
    
                 if(ayarlar["mod-log"]) {
      await client.db.set(`narcosmodlog_${id}`, ayarlar["mod-log"])
      }else{
        try {
        await client.db.delete(`narcosmodlog_${id}`)
     } catch(err) {
       
     }
      }
  
          
  
    
  res.redirect("/basarili?type=ayarlar")
    })
  
  
 app.post("/panel/kara-add", async(req, res) => {
  
  if(!client.ayarlar.gelistirici.includes(req.user.id) ) return res.redirect('/')
  let ayar = req.body
  if (ayar === {} || !ayar['kul-id']) return res.redirect('/admin')
  let id = ayar['kul-id']

  await client.db.set(`karaliste.${id}`, true)  
  res.redirect('/admin')
  
});

  app.post("/panel/kara-remove", async (req, res) => {
  
  if(!client.ayarlar.gelistirici.includes (req.user.id) ) return res.redirect('/')
 let ayar = req.body
  if (ayar === {} || !ayar['kul-id']) return res.redirect('/admin')
  let id = ayar['kul-id']

  await client.db.delete(`karaliste.${id}`)  

  
  res.redirect('/admin')
  
});

  //------------------------------------------------//
app.listen(3000);
  
};