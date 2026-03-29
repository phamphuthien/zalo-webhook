const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// test server
app.get("/", (req, res) => {
  res.send("Server running");
});

// webhook chính
app.post("/webhook", async (req, res) => {
  console.log("🔥 Received:", JSON.stringify(req.body, null, 2));

  try {
    const userId = req.body.sender?.id || "unknown";
    const message = req.body.message?.text || "no text";

    // gửi qua Google Sheet
    const response = await fetch("https://script.google.com/macros/s/AKfycbymjEle-mW3Tdpf2i8W7C0PEkZJtLguSU8WAPawMrLKerno3jn0qYywTS54eXJj5ZAbSA/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        message: message
      })
    });

    const text = await response.text();
    console.log("✅ GAS response:", text);

  } catch (err) {
    console.log("❌ GAS error:", err);
  }

  res.send("OK");
});

// chạy server (chuẩn Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
