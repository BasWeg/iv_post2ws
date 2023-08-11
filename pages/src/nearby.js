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


export async function main() {
    client.subscribe("nearby", updateDataInContainer);
}
