import * as client from './client.js';



let isSubscribed = false; // Track the subscription status



// Function to update the data in the data container
function updateDataInContainer(indata) {
      // Check if the server confirms the subscription or unsubscription
      if (indata.subscribed !== undefined) {
        // Hide or show the channel text field and subscribe button accordingly
        isSubscribed = indata.subscribed;
        
      } else {    
          console.log('Received data from server:', indata);
          // Display the data on the webpage
        let data = indata[0];
        data.speed = convertToKmPerHour(data.speed);
        if (data.team == "No Team")
        {
          document.getElementById('Team').innerText = "";
        }
        else
        {
          document.getElementById('Team').innerText = data.team;
        }
        document.getElementById('Name').innerText = data.name;
        document.getElementById('Power').innerText = data.power;
        document.getElementById('Speed').innerText = data.speed;
        document.getElementById('Cadence').innerText = data.cadence;
        document.getElementById('HeartRate').innerText = data.heartrate;
  
}
}


function convertToKmPerHour(speedInMmPerSecond) {
  const metersPerSecond = speedInMmPerSecond / 1000; // Convert mm/s to m/s
  const kmPerHour = metersPerSecond * 3.6; // Convert m/s to km/h
  return Math.round(kmPerHour * 10) / 10; // Round to 1 decimal place
}

export async function main() {
  client.subscribe("focus", updateDataInContainer);
}