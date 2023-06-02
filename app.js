const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const city = req.body.cityInput;
  const keyId = "3dcdb7331e84d051d68408cd9f567fc0&units=metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + keyId + "";
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherReport = JSON.parse(data);
      const temp = weatherReport.main.temp;
      const description = weatherReport.weather[0].description;
      const icon = weatherReport.weather[0].icon;
      const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      console.log(temp);
      console.log(description);
      res.write("<h1>The temprature at " + city + " is " + temp + " degree Celsius</h1>");
      res.write("<h2>The weather condition is " + description + ".</h2>");
      res.write("<img src= "+ imgURL +">");
      res.send();
    });
  });
});




app.listen(3000, function(){
  console.log("The Server is running at port 3000");
});
