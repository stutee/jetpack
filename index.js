const express = require("express");
const fs = require("fs");
const PORT = 3000;

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.static("./jetpack"));

app.get("/api/getdata/", (req, res) => {
  fs.readFile("./dataStorage.txt", "utf8", function (err, data) {
    let splitData = data.split(" ");
    let coin = splitData[0];
    let distance = splitData[1];

    res.json({ totalCoin: coin, highestDistance: distance });
  });
});

app.post("/api/postdata/", function (req, res) {
  // console.log(request.body);      // your JSON
  let jsondata = req.body;
  let data = "" + jsondata.totalCoin + " " + jsondata.highestDistance;
  console.log("data", data, typeof jsondata);
  fs.writeFile("./dataStorage.txt", data, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log("data saved");
  });
  console.log(jsondata);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));
