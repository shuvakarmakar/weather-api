const apiKey = '44e1f3908ece4bda837102809241610';

document.getElementById('search-btn').addEventListener('click', fetchWeather);
document.getElementById('city').addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {
        fetchWeather();
    }
});

function fetchWeather() {
    const city = document.getElementById('city').value;
    document.getElementById('weather-info').innerHTML = "";

    if (city) {
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                const weatherInfo = `
          <div class="weather-details">
            <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
            <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
            <p><strong>Condition:</strong> ${data.current.condition.text}</p>
            <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Feels Like:</strong> ${data.current.feelslike_c}°C</p>
          </div>
        `;
                document.getElementById('weather-info').innerHTML = weatherInfo;
            })
            .catch(error => {
                document.getElementById('weather-info').innerHTML = `<p>Error: ${error.message}. Please try again.</p>`;
            });
    } else {
        document.getElementById('weather-info').innerHTML = '<p>Please enter a city name.</p>';
    }
}
