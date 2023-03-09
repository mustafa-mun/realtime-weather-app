let searchKey = "";
searchKey = "aksaray";

const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchKey}&APPID=babd2876d8bd18cc2edf5ff02fad870f`;

function fToCTempConversion(f) {
  return Math.round((f - 32) * .5556)
}

console.log(fToCTempConversion(50));

async function fetchWeatherApi() {
  const fetchApi = await fetch(url)
  const response = await fetchApi.json()
  console.log(response);
}

fetchWeatherApi()
