const elements = (() => {
  const searchBtn = document.getElementById("search-btn");
  const inputEl = document.querySelector("input");
  const errorMsg = document.getElementById("error-msg");
  const body = document.querySelector("body");

  return {
    inputEl,
    searchBtn,
    errorMsg,
    body,
  };
})();

const variables = (() => {
  const searchKey = "";
  const letterRegex = /[A-Za-z]/;

  return {
    searchKey,
    letterRegex,
  };
})();

const dom = (() => {
  const forecastDom = (cityName, temp, feelsLike, humidity, wind) => {
    // Create forecast container element
    const main = document.createElement("main");
    const cityNameText = document.createElement("p");
    const tempText = document.createElement("p");
    const feelsLikeText = document.createElement("p");
    const humidityText = document.createElement("p");
    const windText = document.createElement("p");

    main.className = "forecast-container";
    main.id = "forecast";

    cityNameText.className = "xl-text";
    cityNameText.innerHTML = cityName;

    tempText.className = "big-text";
    tempText.innerHTML = `${temp} &degC`;

    feelsLikeText.innerHTML = `Feels like: ${feelsLike} &degC`;
    humidityText.innerHTML = `Humidity: ${humidity}%`;
    windText.innerHTML = `Wind: ${wind} km/h`;

    main.appendChild(cityNameText);
    main.appendChild(tempText);
    main.appendChild(feelsLikeText);
    main.appendChild(humidityText);
    main.appendChild(windText);

    return main;
  };

  return {
    forecastDom,
  };
})();

function kToCTempConversion(k) {
  // Convert kelvin to celcius
  return Math.round(k - 273.15);
}

async function fetchWeatherApi(url) {
  // Fetch api data function
  try {
    const fetchApi = await fetch(url);
    const response = await fetchApi.json();

    const forecastContainer = document.getElementById("forecast");

    if (!forecastContainer) {
      elements.body.appendChild(
        dom.forecastDom(
          response.name,
          kToCTempConversion(response.main.temp),
          kToCTempConversion(response.main.feels_like),
          response.main.humidity,
          response.wind.speed
        )
      );
    } else {
      elements.body.removeChild(elements.body.lastChild);
      elements.body.appendChild(
        dom.forecastDom(
          response.name,
          kToCTempConversion(response.main.temp),
          kToCTempConversion(response.main.feels_like),
          response.main.humidity,
          response.wind.speed
        )
      );
    }
  } catch (err) {
    elements.errorMsg.textContent = err;
  }
}

elements.searchBtn.addEventListener("click", () => {
  const inputValue = elements.inputEl.value;

  if (inputValue && variables.letterRegex.test(inputValue)) {
    variables.searchKey = inputValue;
    elements.errorMsg.textContent = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${variables.searchKey}&APPID=babd2876d8bd18cc2edf5ff02fad870f`;
    fetchWeatherApi(url);
  } else {
    elements.errorMsg.textContent = "Input is Invalid!";
  }
});
