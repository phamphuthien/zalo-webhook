const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/webhook", (req, res) => {
  console.log(req.body);
  res.send("OK");
});

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(3000);
