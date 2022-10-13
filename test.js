const http = require('http')
const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv').config()
const Logger = require('./log')
const logger = new Logger()


const PORT = process.env.PORT
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html')

  const viewPath = (view) => { return path.resolve(__dirname,'views', `${view}.html`)} 
  let basePath = ''

  switch(req.url){
    case '/':
      basePath = viewPath('index')
      res.statusCode = 200
      break
    case '/contact':
      basePath = viewPath('contact')
      res.statusCode = 200
      break
    default:
      res.statusCode = 404
      res.end('404')
  }
  
  fs.readFile(basePath, 'utf8', (err, data) => {
      if(err){
        console.log(err)
        res.end();
      } else {
        res.end(data)
      }
    })
  
})

server.listen(PORT, 'localhost', (err) => {err ? console.log(err) : console.log(`lisening on ${PORT} port`)})
