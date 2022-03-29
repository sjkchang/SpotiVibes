const express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");

const app = express();
const routes = require("./routes");
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../build")));

app.use("/api", routes.authRouter);
app.use("/api/spotify", routes.spotifyRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

module.exports = {
  app,
};
