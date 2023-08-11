

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

