
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

export const generatePaceTableData = () => {
  const data = [];
  // Generate from 5kph to 20kph (approx 3mph to 12.5mph)
  // Or maybe better to go by common paces? 
  // Let's go by MPH from 3.0 to 15.0 in 0.5 increments
  for (let mph = 3.0; mph <= 15.0; mph += 0.5) {
    const kph = mphToKph(mph);
    data.push({
      mph: mph.toFixed(1),
      kph: kph.toFixed(1),
      paceMile: speedToPace(mph, 'mph'),
      paceKm: speedToPace(kph, 'kph')
    });
  }
  return data.reverse(); // Faster paces at top? Or slower? usually faster at top is nice, or standard list. Let's do fast to slow or slow to fast. Usually tables go 3mph -> 4mph. Let's keep it ascending speed (descending pace).
  // Actually, let's return it ascending speed (3.0, 3.5...)
};
