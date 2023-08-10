function isElectron() {
  return /electron/i.test(navigator.userAgent);
}
var socket;
var socket_open = false;
export let subscribe;
export let unsubscribe;

if (isElectron()) {
  const { ipcRenderer } = require('electron');

  // Receive IPC messages from the main process
  ipcRenderer.on('data', (event, data) => {
    console.log('Received data from main process:', data);
    // Display the data on the webpage
    updateDataInContainer(data);
  });

  subscribe = function subscribe() {
    const channel = document.getElementById('channelInput').value;
    if (channel.trim() !== '') {
      // Send an IPC message to the main process to subscribe to a channel
      ipcRenderer.send('subscribe', channel);
    }
  }

  unsubscribe = function unsubscribe() {
    const channel = document.getElementById('channelInput').value;
    if (channel.trim() !== '') {
      // Send an IPC message to the main process to unsubscribe from a channel
      ipcRenderer.send('unsubscribe', channel);
    }
  }
} else {
  // client.js
//const WebSocket = require('ws');

let ws; // WebSocket instance
const callbacks = new Map(); // Map to store callbacks for each channel

    // // WebSocket communication for external browsers
    // socket = new WebSocket('ws://localhost:3000/websocket');

    // socket.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   // Check if the server confirms the subscription or unsubscription
    //   if (data.subscribed !== undefined) {
    //     // Hide or show the channel text field and subscribe button accordingly
    //     isSubscribed = data.subscribed;
        
    //   } else {    
    //       console.log('Received data from server:', data);
    //       // Display the data on the webpage
    //       updateDataInContainer(data[0]);
    //     }
    //   };

  let isSubscribed = false; // Track the subscription status

  subscribe = async function subscribe(channel, callback) {
    let host = location.host;
    console.log(host);
    if(!ws){
      ws = new WebSocket(`ws://${host}/websocket`);
      await waitForOpenConnection(ws);

      ws.onmessage = (message) => {
        try {
          //console.log(message);
          const data = JSON.parse(message.data);
          const channel = data.channel;
          if (callbacks.has(channel)) {
            const callback = callbacks.get(channel);
            callback(data.data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    }
    if (ws) {
      const data = { action: 'subscribe', channel };
      ws.send(JSON.stringify(data));
      callbacks.set(channel, callback);
    } else {
      console.error('WebSocket is not connected. Call connectWebSocket() first.');
    }
  }

  unsubscribe = function unsubscribe(channel)
  {
      // Send a WebSocket message to the server to subscribe to a channel
      const unsubscriptionData = {
        action: 'unsubscribe',
        channel: channel,
      };
      ws.send(JSON.stringify(unsubscriptionData));
  }
}


export const waitForOpenConnection = (socket) => {
  return new Promise((resolve, reject) => {
      const maxNumberOfAttempts = 10
      const intervalTime = 200 //ms

      let currentAttempt = 0
      const interval = setInterval(() => {
          if (currentAttempt > maxNumberOfAttempts - 1) {
              clearInterval(interval)
              reject(new Error('Maximum number of attempts exceeded'))
          } else if (socket.readyState === socket.OPEN) {
              clearInterval(interval)
              resolve()
          }
          currentAttempt++
      }, intervalTime)
  })
}

const sendMessage = async (socket, msg) => {
  if (socket.readyState !== socket.OPEN) {
      try {
          await waitForOpenConnection(socket)
          socket.send(msg)
      } catch (err) { console.error(err) }
  } else {
      socket.send(msg)
  }
}
