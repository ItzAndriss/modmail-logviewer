module.exports = {
    port: 3000,
    mongodb: "MONGODB_URL",
    nolog: ["cdn-cgi", "favicon.ico"],
    render_config: {
        name: "Example"
    },
    bot: {
        id: "BOT_ID",
        secret: "BOT_SECRET",
        page: "http://localhost:3000"
    }
}