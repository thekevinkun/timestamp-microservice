// index.js
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

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

app.get("/api/:date?", function (req, res) {
  let parameter = req.params.date;
  let date;

  // if api date parameter empty, get current date()
  if (!parameter) {
    date= new Date();
  } else {
    date = new Date(parameter); 
  }
  
  // if api parameters is not date, check if unix
  if (!isValidDate(date)) {
    // first, convert unix to date
    date = new Date(Number(parameter));

    // check if converted unix to date is become a valid date
    if (!isValidDate(date)) {
      res.send({error: 'Invalid Date'});
    }
  }

  // convert to GMT date format
  let gmtDate = date.toUTCString();
  // convert date to unix time in milliseconds
  let unixTimeStamp = date.getTime();

  res.send({unix: unixTimeStamp, utc: gmtDate});
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
