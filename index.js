const fs = require("fs");
const express = require("express");
const { format } = require("date-fns");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  const currTime = format(new Date(), "dd-mm-yyyy-hh-mm-ss");
  const addCurrTime = path.join("Current-timestamp", `${currTime}.txt`);

  fs.writeFileSync(addCurrTime, currTime, "utf-8");
  fs.readFileSync(addCurrTime, "utf-8");

  res.status(200).send(`Current Timestamp: ${currTime}.
    Go to /getFiles endpoint to get all the files`);
});

app.get("/getFiles", (req, res) => {
  fs.readdir("Current-timestamp", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occured");
    } else {
      const getFiles = files.filter((file) => path.extname(file) === ".txt");
      res.status(200).send(getFiles);
    }
  });
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
