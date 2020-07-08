const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 80

// Serve any static files built by React
app.use(express.static(path.join(__dirname, '../dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist'))
})

app.listen(port, () => console.log(`Listening on port ${port}`))
