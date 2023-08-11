import * as client from './client.js';
import * as common from './common.js';


let isSubscribed = false; // Track the subscription status



// Function to update the data in the data container
function updateDataInContainer(indata) {
      // Check if the server confirms the subscription or unsubscription
      if (indata.subscribed !== undefined) {
        // Hide or show the channel text field and subscribe button accordingly
        isSubscribed = indata.subscribed;
        
      } else {    
          // Display the data on the webpage
        let data = indata[0];
        data.speed = common.convertToKmPerHour(data.speed);
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


export async function main() {
  client.subscribe("focus", updateDataInContainer);
}