const express = require('express');
const path = require('path');
const config = require('./config');
const moment = require('moment');
const app = express();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const i18n = require('i18n');

app.set('view engine', 'ejs')
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({ limit: '1mb', extended: false }));
app.use("/assets", express.static(path.join(__dirname, 'assets')));
app.use("/", express.static(path.join(__dirname, 'public')));

const store = new MongoDBStore({
    uri: config.mongodb,
    databaseName: "web_log",
    collection: 'sessions'
});
app.use(session({
    secret: '48738924783748273742398747238',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
      },
      store: store,
      resave: true,
      saveUninitialized: true
}));

i18n.configure({
    locales: ['en', 'hu'],
    directory: './locales',
    defaultLocale: 'en',
    cookie: 'locale',
    autoReload: true
  });
  
  app.use(i18n.init);

app.use("/", require("./routes/index"))

app.use(function(req, res) {
    res.render("errors", { user: req.session.user, navbar: true, title: "errors.404.title", description: "errors.404.description" })
});

app.locals.moment = moment
app.locals.config = config.render_config

app.listen(config.port, function(){
    console.log("The page is available at the link below: http://localhost:"+config.port)
})