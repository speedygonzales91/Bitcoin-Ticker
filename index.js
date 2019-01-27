//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app= express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {

  //console.log(req.body);
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var url  = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/' +  crypto+fiat;


  request(url, function (error, response, body) {
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.

    var data = JSON.parse(body);
    var price = data.last;

    var currentTime = data.display_timestamp;

    res.write("<p>The current date is: " + currentTime + "</p>");
    //console.log(price);
    res.write("<h1>The price of " + crypto +  " is: " + price + " " + fiat+ "</h1>");

    res.send();
  });
});



app.listen('3000',function(){
  console.log('Server is running on port 3000');
});
