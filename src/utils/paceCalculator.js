
export const mphToKph = (mph) => {
  if (!mph) return 0;
  return parseFloat((mph * 1.60934).toFixed(2));
};

export const kphToMph = (kph) => {
  if (!kph) return 0;
  return parseFloat((kph / 1.60934).toFixed(2));
};

export const speedToPace = (speed, unit = 'mph') => {
  // speed in unit (mph or kph)
  // returns string "MM:SS" per mile or per km
  if (!speed || speed <= 0) return "00:00";
  
  const minutesPerUnit = 60 / speed;
  const minutes = Math.floor(minutesPerUnit);
  const seconds = Math.round((minutesPerUnit - minutes) * 60);
  
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${paddedSeconds}`;
};

export const paceToSpeed = (minutes, seconds, unit = 'mph') => {
  // returns speed in unit
  const totalHours = (parseInt(minutes) + parseInt(seconds) / 60) / 60;
  if (totalHours <= 0) return 0;
  return parseFloat((1 / totalHours).toFixed(2));
};

export const calculateTime = (distanceKm, speedKph) => {
  if (!speedKph || speedKph <= 0) return "--:--";
  
  const totalHours = distanceKm / speedKph;
  const hours = Math.floor(totalHours);
  const minutes = Math.floor((totalHours - hours) * 60);
  const seconds = Math.round(((totalHours - hours) * 60 - minutes) * 60);

  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  if (hours > 0) {
    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }
  return `${minutes}:${paddedSeconds}`;
};

export const generatePaceTableData = () => {
  const data = [];
  // Generate from 3.0 to 15.0 mph in 0.5 increments
  for (let mph = 3.0; mph <= 15.0; mph += 0.5) {
    const kph = mphToKph(mph);
    data.push({
      mph: mph.toFixed(1),
      kph: kph.toFixed(1),
      paceMile: speedToPace(mph, 'mph'),
      paceKm: speedToPace(kph, 'kph'),
      time5k: calculateTime(5, kph),
      time10k: calculateTime(10, kph),
      timeHalf: calculateTime(21.0975, kph),
      timeFull: calculateTime(42.195, kph)
    });
  }
  return data.reverse(); 
};
