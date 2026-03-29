const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// test server
app.get("/", (req, res) => {
  res.send("Server running");
});

// webhook chuẩn
app.post("/webhook", (req, res) => {
  console.log("🔥 Received:", JSON.stringify(req.body, null, 2));

  // ⚡ TRẢ OK NGAY (quan trọng nhất)
  res.status(200).send("OK");

  // 👉 xử lý ngầm phía sau
  (async () => {
    try {
      const userId = req.body.sender?.id || "unknown";
      const message = req.body.message?.text || "no text";

      await fetch("https://script.google.com/macros/s/AKfycbxPcjDjUPWXXYZBA4TBFX28LUKy5E_5_snXyv59Ou0Gz_KHfDZPdiQmr69BobbVlV-2/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userId,
          message: message
        })
      });

      console.log("✅ Sent to Google Sheet");

    } catch (err) {
      console.log("❌ GAS error:", err);
    }
  })();
});

// chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
