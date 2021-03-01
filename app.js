const express = require("express");
const app = express();

const PORT = 3001;

app.get("/", (req, res) => {
  res.send("hai");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
