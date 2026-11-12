
// OpenWeatherMap API key.
const apiKey = "0b16f7fd4dc3f6f3625b9123ac90f7f8";

// Find HTML elements.
const weatherdata = document.querySelector("#weatherdata");
const citySelect = document.querySelector("#citySelect");
const cityInput = document.querySelector("#cityInput");
const fetchWeather = document.querySelector("#fetchWeather");
const searchCity = document.querySelector("#searchCity");

// Function to fetch weather data.
async function getWeather(city) {

    // Show loading message.
    weatherdata.textContent = "Haetaan säätietoja...";

    try {

        // Create API URL.
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&mode=xml&appid=${apiKey}&lang=fi`;

        // Fetch data from API.
        const response = await fetch(url);

        // Check for errors.
        if (!response.ok) {
            throw new Error("Kaupunkia ei löytynyt tai API-avain ei toimi.");
        }

        // Read XML response.
        const xmlText = await response.text();

        // Parse XML data.
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");

        // Check for XML parsing errors.
        if (xmlDoc.querySelector("parsererror")) {
            throw new Error("XML-datan lukeminen epäonnistui.");
        }

        // Find weather information from XML.
        const cityName = xmlDoc.querySelector("city")?.getAttribute("name");
        const temperature = xmlDoc.querySelector("temperature")?.getAttribute("value");
        const weather = xmlDoc.querySelector("weather")?.getAttribute("value");
        const humidity = xmlDoc.querySelector("humidity")?.getAttribute("value");
        const windSpeed = xmlDoc.querySelector("wind speed")?.getAttribute("value");

        // Check that important data exists.
        if (!temperature || !weather) {
            throw new Error("Säätietoja ei löytynyt.");
        }

        // Display weather information.
        weatherdata.innerHTML = `
            <h2>${cityName}</h2>
            <p><strong>Lämpötila:</strong> ${Number(temperature).toFixed(1)} °C</p>
            <p><strong>Sää:</strong> ${weather}</p>
            <p><strong>Kosteus:</strong> ${humidity ?? "Ei saatavilla"} %</p>
            <p><strong>Tuulen nopeus:</strong> ${windSpeed ?? "Ei saatavilla"} m/s</p>
        `;

    } catch (error) {

        // Display error message.
        weatherdata.textContent = "Virhe: " + error.message;

        // Show error in browser console.
        console.error(error);
    }
}

// Fetch weather when the selected city button is clicked.
fetchWeather.addEventListener("click", function () {
    const selectedCity = citySelect.value;
    getWeather(selectedCity);
});

// Search weather using the input field.
searchCity.addEventListener("click", function () {

    const city = cityInput.value.trim();

    if (city === "") {
        weatherdata.textContent = "Kirjoita ensin kaupungin nimi.";
        return;
    }

    getWeather(city);
});

// Allow searching by pressing Enter.
cityInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        searchCity.click();
    }
});
