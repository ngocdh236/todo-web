const express = require('express')
const path = require('path')
const app = express()
const http = require('http')
var fs = require('fs')

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('titekapps_com_key.txt'),
  cert: fs.readFileSync('titekapps.com.crt')
}

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

http.createServer(options, app).listen(5000)
