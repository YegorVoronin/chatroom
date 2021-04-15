const socket = io('http://localhost:3000')
const chat = document.getElementById('chat')
const roomList = document.getElementById('room-list')
const navigation = document.getElementById('navigation')
const messageInput = document.getElementById('message')


if (navigation != null) {
  const name = prompt('Enter your name:')
  // sendMessage('You joined')
  socket.emit('new-user', roomName, name)

  navigation.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    sendMessage(`You: ${message}`)
    socket.emit('send-chat-message', roomName, message)
    messageInput.value = ''
  })
}

socket.on('room-created', room => {
  const roomName = document.createElement('div')
  roomName.innerText = room
  const roomJoin = document.createElement('a')
  roomJoin.href = `/${room}`
  roomJoin.innerText = 'EnterChat'
  roomList.append(roomName)
  roomList.append(roomJoin)
})

socket.on('chat-message', data => {
  sendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  sendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  sendMessage(`${name} disconnected`)
})

function sendMessage(message) {
  const msgContainer = document.createElement('div')
  msgContainer.innerText = message
  chat.append(msgContainer)
}