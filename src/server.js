const express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");

const app = express();
const routes = require("./routes");
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.use("/api", routes.authRouter);
app.use("/api/spotify", routes.spotifyRouter);

app.listen(3000, () => console.log("Example app listening on port 3000!"));

module.exports = {
    app,
};
