// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res) {
  
  let original = req.params.date;
  let result = Number(original);
  let date_object = Date(result);
  let date = Date(original);

  console.log("date: " + date);

  const new_date = new Date(result);

  console.log("new date: " + new_date);

  if (original == null || original.trim() == "") {
    let current = Date(Date.now());
    let val = current.slice(0, 3) + ", " + current.slice(8, 10) + " " +  current.slice(4, 7) + " " + current.slice(11, 28);

  if (current == 'Invalid Date') {
    res.json({error: "Invalid Date"});
  }
    
    res.json({unix: Date.now(), utc: val})
  }

  if (new_date != 'Invalid Date') {
    let obj = Date(result);
    
  
    let val = new_date.toString().slice(0, 3) + ", " + new_date.toString().slice(8, 10) + " " +  new_date.toString().slice(4, 7) + " " + new_date.toString().slice(11, 28);
    console.log(val);
  

    
    res.json({unix: result, utc: val});
  }
  
  if (new_date == 'Invalid Date' && date == 'Invalid Date') {
    res.json({error: "Invalid Date"});
  }

  if (date != null && date != 'Invalid Date') {
    let time = new Date(original).getTime();
    date = new Date(time);
    let val = date.toString().slice(0, 3) + ", " + date.toString().slice(8, 10) + " " +  date.toString().slice(4, 7) + " " + date.toString().slice(11, 28);
    console.log("time: " + time);

  if (date == 'Invalid Date') {
    res.json({error: "Invalid Date"});
  }
    
    res.json({unix: time, utc: val});
  }
  

  //console.log(date_object);
});



// listen for requests :)
let port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
