const router = require("express").Router()
const fs = require("fs");
const moment = require("moment/moment");
const config = require("../config");
const database = require("../modules/database");

router.use("/auth", require("./auth"))

router.use(async function (req, res, next) {
    if (!req.session.user) {
        req.session.redirect_uri = req.originalUrl;
        return res.redirect(`/auth`);
    } else {
        for (let i = 0; i < config.nolog.length; i++) {
            const element = config.nolog[i];
            if (req.originalUrl.indexOf(element) !== -1) return next();
        }

        try {
            const csapattag = await database.web.collection('access').findOne({ user_id: req.session.user.id });

            if (!csapattag) {
                await database.web.collection('log').insertOne({
                    user_id: req.session.user.id,
                    date: Date.now(),
                    page: req.originalUrl
                });
                res.render("errors", { user: req.session.user, navbar: false, title: "errors.403.title", description: "errors.403.description" })
            } else {
                await database.web.collection('log').insertOne({
                    user_id: req.session.user.id,
                    date: Date.now(),
                    page: req.originalUrl
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
    next();
});

router.get("/", function (req, res) {
    res.render("index", { user: req.session.user })
});

router.get("/access", function (req, res) {
    res.render("errors", { user: req.session.user, navbar: true, title: "error.unavailable.title", description: "error.unavailable.description" })
});

router.get("/settings", function (req, res) {
    res.render("errors", { user: req.session.user, navbar: true, title: "error.unavailable.title", description: "error.unavailable.description" })
});

router.use("/logs", require("./logs"))

module.exports = router