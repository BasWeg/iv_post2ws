import * as client from './client.js';



let isSubscribed = false; // Track the subscription status

export function subscribe() {
  if (!isSubscribed) {
    const channel = document.getElementById('channelInput').value;
    if (channel.trim() !== '') {
      // Send a WebSocket message to the server to subscribe to a channel
      client.subscribe(channel, updateDataInContainer);
      isSubscribed = true;
      channelInput.disabled = true;
      subscribeButton.disabled = true;      
    }
  }
}

export function unsubscribe() {
    const channel = document.getElementById('channelInput').value;
    if (channel.trim() !== '') {
      client.unsubscribe(channel);
      isSubscribed = false;
      channelInput.disabled = false;
      subscribeButton.disabled = false;
    }
}

let lastData = null; // Keep track of the last displayed data

// Function to update the data in the data container
function updateDataInContainer(data) {
      // Check if the server confirms the subscription or unsubscription
//          console.log('Received data from server:', data);
          // Display the data on the webpage
          document.getElementById("json").innerHTML = JSON.stringify(data, undefined, 2);
 
}

export async function main() {

}