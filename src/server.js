const express = require("express");
var cookieParser = require("cookie-parser");

const app = express();
const routes = require("./routes");
app.use(cookieParser());

app.get("/", (req, res) => res.send("App is working"));

app.use("/auth", routes.authRouter);
app.use("/spotify", routes.spotifyRouter);

app.listen(3000, () => console.log("Example app listening on port 3000!"));

module.exports = {
    app,
};
