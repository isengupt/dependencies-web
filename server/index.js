const express = require('express')
const app = express()
const port = 3001

const fs = require('fs');

let rawdata = fs.readFileSync('science_crates.json');
let science_crates = JSON.parse(rawdata);

const tree = require('./tree')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});


app.get('/', (req,res) => {
    res.send(science_crates);
})


app.post('/getTree', (req, res) => {
  tree.getFlatArray(req.body)
  .then(response => {
  
    res.status(200).send(response);
  })

})

app.post('/getSnapshot', (req, res) => {
  tree.getGraphSnapshot(req.body)
  .then(response => {
   
    res.status(200).send(response);
  })

})

app.post('/getKeyword', (req, res) => {
  tree.getKeywordSnapshot(req.body)
  .then(response => {
  
    res.status(200).send(response);
  })

})

app.post('/getDownloads', (req, res) => {
  tree.getDownloadFilter(req.body)
  .then(response => {
  
    res.status(200).send(response);
  })

})

app.post('/getReverse', (req, res) => {
  tree.getReverseDependencies(req.body)
  .then(response => {
  
    res.status(200).send(response);
  })

})

app.post('/getTimeSeries', (req, res) => {
  tree.getTimeSeries(req.body)
  .then(response => {
  
    res.status(200).send(response);
  })

})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})