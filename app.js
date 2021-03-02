const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 3001;

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "hello", app: "Travel 366" });
// });

// app.post("/", (req, res) => {
//   res.send("Post working");
// });

const travels = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/travels-simple.json`)
);

app.get("/api/v1/travels/:id", (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;

  const travel = travels.find((el) => el.id === id);

  if (!travel) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid Id",
    });
  }

  res.status(200).json({
    status: "success",
    result: travels.length,
    data: {
      travels: travel,
    },
  });
});

app.get("/api/v1/travels", (req, res) => {
  res.status(200).json({
    status: "success",
    result: travels.length,
    data: {
      travels: travels,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
