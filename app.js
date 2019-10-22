// require dependencies
const config = require('config')     // for config variables
const express = require('express')   // Express web framework
const helmet = require('helmet')     // HTTP security

// create an Express app
const app = express()

// use Helmet middleware to automatically set secure HTTP headers
app.use(helmet())

// Use hosting values if available, otherwise default 
const environment = process.env.NODE_ENV || 'development'
const hostname = process.env.HOSTNAME || config.get("hostname")
const port = process.env.PORT || config.get("port");

// Use Express app.get() methods to configure endpoints

// declare your callback function the old way
app.get('/', function (req, res) {
  res.send('<body style="background-color: #7575DD">' +
    '<h1>Express App Example</h1> <hr> <br> <br>' +
    'Try going to different URIs by adding these at the end: <br> <br>' +
    '/hello <br>' +
    '/big <br>' +
    '/json <br>' +
    '/greeting/yourname <br>' +
    '/yo/Dr.Rogers <br>' +
    '/fortune <br>' +
    '/fancy/?first=Kelsie&last=Dibben <br>' +
    '/appleproduct <br>' +
    '<br> <br>' +
    '<h3>The source code for this app can be found <a href="https://github.com/kdibben/node-express-app">here</a></h3>'
  )
})

// or use the new arrow function syntax
// respond with text
app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

// or respond with html
app.get('/big', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// or respond with JSON
app.get('/json', (req, res) => {
  res.send('{"name" : "Nandini"}')
})

// :name indicates a parameter at this location in the URI
app.get('/greeting/:id', (req, res) => {
  res.send(`Hello! The id provided was ${req.params.id}.`)
})

// combine your skills and get creative
app.get('/yo/:buddy', (req, res) => {
  res.send(`<h1>Yo, ${req.params.buddy}!</h1>`)
})

// provide multiple query parameters (named first and last) with ? and &
app.get('/fancy', (req, res) => {
  const first = req.query.first
  const last = req.query.last
  res.send(`Hello ${first} ${last}!`)
})

let fortunes = ['It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes - definitely.',
'You may rely on it', 'As I see it, yes.', 'Most likely', 'Outlook good.', 'Yes.', 'Signs point to yes.',
'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 
'Concentrate and ask again.', 'Don\'t count on it.', 'My reply is no.', 'My sources say no.', 'Outlook not so good.',
'Very doubtful.']

// Implements a Magic 8 Ball service
app.get('/fortune', (req,res) => {
  if(isEmpty(req.query)){
    res.send('<h2>You wish to know the future?</h2>' +
             '<p>Ask a question in the query string, e.g., http://localhost:3002/fortune?Will I become rich? <br/>' +
             '<p>The Magic 8 Ball will answer!</p>')
  } else {
    res.send(`The answer is ... wait for it ... ${fortunes[randomInt(0, fortunes.length)]}`)
  }
})

let products = ['iPhone', 'iPhone 3G', 'iPhone 3GS', 'iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5C', 'iPhone 5S', 'iPhone 6',
  'iPhone 6 Plus', 'iPhone 6S', 'iPhone 6S Plus', 'iPhone SE', 'iPhone 7', 'iPhone 7 Plus', 'iPhone 8', 'iPhone 8 Plus', 'iPhone X', 
  'iPhone Xs', 'iPhone Xs Max', 'iPhone Xʀ', 'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max', 'iPad', 'iPad 2', 'iPad 3', 'iPad 4',
  'iPad 5', 'iPad 6', 'iPad Air', 'iPad Air 2', 'iPad Air 3', 'iPad Mini', 'iPad Mini 2', 'iPad Mini 3', 'iPad Mini 4', 'iPad Mini 5',
  'iPad Pro 9.7-inch', 'iPad Pro 10.5-inch', 'iPad Pro 11-inch', 'iPad Pro 12.9-inch', 'iPad Pro 12.9-inch 2', 'iPad Pro 12.9-inch 3', 
  'Apple Watch', 'Apple Watch Series 1', 'Apple Watch Series 2', 'Apple Watch Series 3', 'Apple Watch Series 4', 'Apple Watch Series 5']

app.get('/appleproduct', (req, res) => {
  res.send(`Apple Product: ${products[randomInt(0, products.length)]}`)
})

// Use middleware to handle all non-managed routes (e.g. /xyz)
// https://expressjs.com/en/api.html#req.originalUrl
app.use((req, res, next) => {
  res.status(404).send(`status 404 - ${req.originalUrl} was not found`);
})

// start listening and inform developers
app.listen(port, hostname, () => {
  console.log(`\n App listening at http://${hostname}:${port}/`)
  console.log(`\n Try going to different URIs:\n`)
  console.log(`   Try /hello`)
  console.log(`   Try /big`)
  console.log(`   Try /json`)
  console.log(`   Try /fortune`)
  console.log(`   Try /greeting/yourname`)
  console.log(`   Try /yo/Dr.Rogers`)
  console.log(`   Try /fancy/?first=Denise&last=Case`)
  console.log('   Try /appleproduct')
  console.log('\n Hit CTRL-C CTRL-C to stop\n')
})

// Utility to see if an object is empty or not

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

// generates a random value in [low,high) 
function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}