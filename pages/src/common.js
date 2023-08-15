

export function convertToKmPerHour(speedInMmPerSecond) {
  const metersPerSecond = speedInMmPerSecond / 1000; // Convert mm/s to m/s
  const kmPerHour = metersPerSecond * 3.6; // Convert m/s to km/h
  return Math.round(kmPerHour * 10) / 10; // Round to 1 decimal place
}


export function convertTimeGapToMinSec(timeGapInMilliseconds) {
  const absTimeGapInSeconds = Math.abs(timeGapInMilliseconds) / 1000;
  const minutes = Math.floor(absTimeGapInSeconds / 60);
  const seconds = Math.floor(absTimeGapInSeconds % 60);
  
  // Ensure it's in two-digit format
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  return timeGapInMilliseconds < 0 ? `-${formattedTime}` : formattedTime;
}


export function convertToKilometers(distanceInMeters) {
  return (distanceInMeters / 1000).toFixed(1);
}

export function getPageNameFromPath() {
  const path = window.location.pathname;
  const lastIndex = path.lastIndexOf('/');
  const pageNameWithExtension = path.substring(lastIndex + 1);
  const pageName = pageNameWithExtension.replace('.html', ''); // Remove .html
  return pageName;
}

export function loadSettings(pageName, id) {
  const storageKey = `${pageName}_${id ? id : 'default'}`;
  const storedSettings = localStorage.getItem(storageKey);
  let settings = null;
  if (storedSettings) {
      settings = JSON.parse(storedSettings);
  }
  return settings;
}

export  function saveSettings(pageName, id, settings) {
  const storageKey = `${pageName}_${id ? id : 'default'}`;
  localStorage.setItem(storageKey, JSON.stringify(settings));
}