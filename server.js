const express = require('express');
//const https = require('https');
const WebSocket = require('ws');

const fs = require('fs');

const myserver = express();
const port = 3000; // You can use any port you prefer

myserver.use(express.json());
// Serve static files from the 'public' directory
myserver.use(express.static('pages'));

// Start the HTTP server
const server = myserver.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const wss = new WebSocket.Server({ server });
const channels = {};

myserver.post('/post', (req, res) => {
  const contentType = req.headers['content-type'];
  const channel = req.query.channel;

  if (!channel) {
      return res.status(400).json({ error: 'channel parameter is missing' });
  }
  if (contentType !== 'application/json') {
    res.status(400).json({ error: 'Unsupported Content-Type' });
  }
  // Store data for each channel
  if (!channels[channel]) {
    channels[channel] = new Set();
  }
  const data = req.body; // Assuming the data is in JSON format

    // console.log('Received JSON data:', JSON.stringify(data));
    // Broadcast the message to WebSocket clients (slaves)
    if (channels[channel]) {
      channels[channel].forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          let senddata = {
            channel: channel,
            data: data,
          }
          client.send(JSON.stringify(senddata));
        }
      });
    }    
    res.sendStatus(200);
});

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('A client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.action === 'subscribe') {
      // Subscribe to a channel
      const channel = data.channel;
      if (!channels[channel]) {
        channels[channel] = new Set();
      }
      channels[channel].add(ws);
      console.log('Client subscribed to channel:', channel);
      ws.send(JSON.stringify({subscribed: true}));
    } else if (data.action === 'unsubscribe') {
      // Unsubscribe from a channel
      const channel = data.channel;
      if (channels[channel]) {
        channels[channel].delete(ws);
        ws.send(JSON.stringify({subscribed: false}));
        console.log('Client unsubscribed from channel:', channel);
      }
    }
    });  

  ws.on('close', () => {
    console.log('A client disconnected');
  });
});
