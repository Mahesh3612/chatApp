const express = require('express')
const app = express()
const http = require('http').createServer(app)

// inside "createServer" we are passing our whole express app

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
// we are using our public folder here due to this server should know that we have to run this files also this is thw one of the middlware

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 

const io = require('socket.io')(http)
//here we are passing "http" this is the name of variable where our server is running 
// and for the understanding of "socket.io" means exactly where our server is running we are passing "http" 
// due to this socket.io will know that on which server we have to run

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})



http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})