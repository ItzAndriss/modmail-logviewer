const router = require("express").Router()
const database = require('../modules/database');

router.get("/", async function (req, res) {
    const csapattag = await database.web.collection('access').findOne({ user_id: req.session.user.id });
    if(csapattag){
        if(csapattag.permission === "all"){
            let data = await database.mail.collection("logs").find({})
            .limit(500)
            .toArray();
            if(data) {
                res.render("logs", { user: req.session.user, data: data })
            } else {
                res.render("errors", { user: req.session.user, navbar: true, title: "errors.404.title", description: "errors.404.description" })
            }
        }else if(csapattag.permission === "tickets"){
            let data = await database.mail.collection("logs").find({ 'closer.id': req.session.user.id })
            .limit(500)
            .toArray();
            if(data) {
                res.render("logs", { user: req.session.user, data: data })
            } else {
                res.render("errors", { user: req.session.user, navbar: true, title: "errors.404.title", description: "errors.404.description" })
            }
        }else{
            res.render("errors", { user: req.session.user, navbar: true, title: "errors.403.title", description: "errors.403.description" })
        }
    }
});

router.get("/:logid", async function (req, res) {
    const csapattag = await database.web.collection('access').findOne({ user_id: req.session.user.id });
    if(csapattag){
        if(csapattag.permission === "all" || csapattag.permission === "tickets"){
            let data = await database.mail.collection("logs").findOne({ key: req.params["logid"] })
            if(data) {
                let internal = false;
                for (let i = 0; i < data.messages.length; i++) {
                    const msg = data.messages[i];
                    if(msg.type === "internal") internal = true;
                }
                res.render("log", { user:req.session.user, data: data, internal: internal })
            } else {
                res.render("errors", { user: req.session.user, navbar: true, title: "errors.404.title", description: "errors.404.description" })
            }
        }else{
            res.render("errors", { user: req.session.user, navbar: true, title: "errors.403.title", description: "errors.403.description" })
        }
    }
});

module.exports = router;