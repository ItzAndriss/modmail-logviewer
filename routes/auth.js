const router = require("express").Router()
const config = require("../config");

router.get('/', (req, res) => {
    if (req.session.user) return res.redirect(`/`);
    let authorizeUrl = `https://discord.com/api/oauth2/authorize?client_id={clientId}&redirect_uri={page}%2Fauth%2Fcallback&response_type=code&scope=identify`
    .replace("{clientId}", config.bot.id)
    .replace("{page}", config.bot.page.replace("://", "%3A%2F%2F"))

    res.redirect(authorizeUrl);
});
  
  router.get('/callback', (req, res) => {
      if (req.session.user) return res.redirect('/');
  
      const accessCode = req.query.code;
      if (!accessCode) return res.send('No access code returned from Discord');
  
      const data = new FormData();
      data.append('client_id', config.bot.id);
      data.append('client_secret', config.bot.secret);
      data.append('grant_type', 'authorization_code');
      data.append('redirect_uri', config.bot.page+"/auth/callback");
      data.append('scope', ["identify"].join(' '));
      data.append('code', accessCode);
      fetch('https://discordapp.com/api/oauth2/token', {
          method: 'POST',
          body: data
      })
      .then(res => res.json())
      .then(response => {
          fetch('https://discordapp.com/api/users/@me', {
            method: 'GET',
              headers: {
                  authorization: `${response.token_type} ${response.access_token}`
              },
          })
          .then(res2 =>res2.json())
          .then(userResponse => {
            if(!userResponse.message){
                req.session.user = userResponse;
                if(req.session.redirect_uri){
                    res.redirect(config.bot.page+req.session.redirect_uri);
                    req.session.redirect_uri = ""
                    return;
                }else{
                    return res.redirect("/");
                }
            }else{
                res.render("403")
            }
          });
        });
  });

  router.get('/logout', (req, res) => {
    if (req.session.user){
        req.session.destroy()
        res.render("errors", { navbar: false, title: "logout.success", description: null })
    }else{
        let authorizeUrl = `https://discord.com/api/oauth2/authorize?client_id={clientId}&redirect_uri={page}%2Fauth%2Fcallback&response_type=code&scope=identify`
        .replace("{clientId}", config.bot.id)
        .replace("{page}", config.bot.page.replace("://", "%3A%2F%2F"))
    
        res.redirect(authorizeUrl);
    }
});

  module.exports = router