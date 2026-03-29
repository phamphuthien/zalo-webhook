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

app.post("/webhook", async (req, res) => {
  const userId = req.body.sender.id;
  const message = req.body.message.text;

  // gửi qua Google Sheet
  await fetch("https://script.google.com/macros/s/AKfycbymjEle-mW3Tdpf2i8W7C0PEkZJtLguSU8WAPawMrLKerno3jn0qYywTS54eXJj5ZAbSA/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: userId,
      message: message
    })
  });

  res.send("OK");
});
