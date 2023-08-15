import * as client from './client.js';
import * as common from './common.js';

// Modify to accommodate multiple data entries
function updateDataInContainer(dataArray) {
  const container = document.querySelector('.riders-container');
  container.innerHTML = ''; // Clear existing entries

  dataArray.forEach(data => {
      const racer = document.createElement('div');
      racer.className = 'rider';

      const speed = common.convertToKmPerHour(data.speed);
      const distanceInKm = common.convertToKilometers(data.distance);
      const formattedTimeGap = common.convertTimeGapToMinSec(data.timeGap);

      racer.innerHTML = `
        <svg viewBox="0 0 363.20001 54.720001" id="nearbysvg">
            <use xlink:href="#nearbyframe"></use>
        </svg>
          <div class="position">${data.position}</div>
          <div class="details">
              <div class="name">${data.name}</div>
              <div class="data">
              <span class="distance">${distanceInKm} <span class="unit">km</span></span>
              <span class="team">${data.team}</span>
              <span class="time-gap">${formattedTimeGap}</span>
          </div>
          </div>
      `;

      container.appendChild(racer);
  });
}






function getUniqueTeamEntries(dataArray) {
  const uniqueEntries = [];

  dataArray.sort((a, b) => a.position - b.position); // Sort by position

  const seenTeams = new Set();

  dataArray.forEach(data => {
      if (!seenTeams.has(data.team)) {
          seenTeams.add(data.team);
          uniqueEntries.push(data);
      }
  });

  return uniqueEntries;
}

// Add a right-click context menu for settings
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const contextMenu = document.querySelector('#settings-menu');
    if (contextMenu.style.display === 'block') {
        contextMenu.style.display = 'none';
    } else {
    contextMenu.style.display = 'block';
    contextMenu.style.left = `0px`;
    contextMenu.style.top = `0px`;
    }
});

const pageName = common.getPageNameFromPath(); // Get page name without .html
const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get('id'); // Extract id from URL query   
const channel = urlSearchParams.get('channel'); // Extract id from URL query   

const defaultsettings = {
    outerColor: "#ff0000",
    innerColor: "#333331",
    outerTextColor: "#000000",
    innerTextColor: "#FFFFFF",
    backgroundColor: "#FFFFFF"
};



function loadSettings() {
    const settings = common.loadSettings(pageName, id) || defaultsettings;
    // const outerColor = localStorage.getItem('outerColor') || "#f2ca29";
    // const innerColor = localStorage.getItem('innerColor') || "#333331";
    // const outerTextColor = localStorage.getItem('outerTextColor') || "#000000";
    // const innerTextColor = localStorage.getItem('innerTextColor') || "#FFFFFF";    
    // const backgroundColor = localStorage.getItem('backgroundColor') || "#FFFFFF"; 

        document.documentElement.style.setProperty('--outer-color', settings.outerColor);
        document.querySelector('#coloris-outer').value = settings.outerColor;
        document.querySelector('#coloris-outer-field').style = "color: " + settings.outerColor;

        document.documentElement.style.setProperty('--inner-color', settings.innerColor);
        document.querySelector('#coloris-inner').value = settings.innerColor;
        document.querySelector('#coloris-inner-field').style = "color: " + settings.innerColor;

        document.documentElement.style.setProperty('--outer-text-color', settings.outerTextColor);
        document.querySelector('#coloris-outer-text').value = settings.outerTextColor;
        document.querySelector('#coloris-outer-text-field').style = "color: " + settings.outerTextColor;

        document.documentElement.style.setProperty('--inner-text-color', settings.innerTextColor);
        document.querySelector('#coloris-inner-text').value = settings.innerTextColor;
        document.querySelector('#coloris-inner-text-field').style = "color: " + settings.innerTextColor;

        document.documentElement.style.setProperty('--background-color', settings.backgroundColor);
        document.querySelector('#coloris-background').value = settings.backgroundColor;
        document.querySelector('#coloris-background-field').style = "color: " + settings.backgroundColor;
   
}

function saveSettings() {
    const outerColor = document.querySelector('#coloris-outer').value;
    const innerColor = document.querySelector('#coloris-inner').value;
    const outerTextColor = document.querySelector('#coloris-outer-text').value;
    const innerTextColor = document.querySelector('#coloris-inner-text').value;    
    const backgroundColor = document.querySelector('#coloris-background').value;
    const settings = {
        outerColor: outerColor,
        innerColor: innerColor,
        outerTextColor: outerTextColor,
        innerTextColor: innerTextColor,
        backgroundColor: backgroundColor        
    }
    common.saveSettings(pageName, id, settings);
 
    loadSettings(); // Apply the new settings
}

// Load saved settings when the page loads
window.addEventListener('load', () => {

    loadSettings();
    document.querySelector('#coloris-background').addEventListener('input', saveSettings);
    document.querySelector('#coloris-outer').addEventListener('input', saveSettings);
    document.querySelector('#coloris-inner').addEventListener('input', saveSettings);
    document.querySelector('#coloris-inner-text').addEventListener('input', saveSettings);   
    document.querySelector('#coloris-outer-text').addEventListener('input', saveSettings); 
});



export async function main() {
    client.subscribe((channel ? channel : 'nearby'), updateDataInContainer);
}
