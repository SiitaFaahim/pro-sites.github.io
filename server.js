document.addEventListener('DOMContentLoaded', function() {
  // Weather button functionality
  const button = document.getElementById("display-button");

  button.addEventListener("click", () => {
      showLoader();
      showDiv();
      fetchWeather();
  });

  function showLoader() {
      document.getElementById("loader").style.display = "block";
  }

  function hideLoader() {
      document.getElementById("loader").style.display = "none";
  }

  function showDiv() {
      const weatherDataDiv = document.getElementById("weatherData");
      weatherDataDiv.classList.add("show");
  }

  function fetchWeather() {
      const apiKey = '5616199c7bbef44ee89fb2c08da9f3e6'; // Provided OpenWeather API key
      const city = document.getElementById('cityInput').value;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      fetch(apiUrl)
          .then(response => {
              if (!response.ok) {
                  throw new Error('City not found');
              }
              return response.json();
          })
          .then(data => {
              const weatherData = {
                  weather: data.weather[0].main,
                  temperature: data.main.temp,
                  humidity: data.main.humidity,
                  windSpeed: data.wind.speed
              };
              displayWeather(weatherData);
              hideLoader();
          })
          .catch(error => {
              alert(error.message);
              console.log('Error fetching data:', error);
              hideLoader();
          });
  }

  function displayWeather(weatherData) {
      const weatherDataDiv = document.getElementById('weatherData');
      weatherDataDiv.innerHTML = `

          <p> <img src="./resources/icons/icons8-partly-cloudy-day.png" alt=""> Weather: ${weatherData.weather}</p>
          <p> <img src="./resources/icons/icons8-temperature-50.png" alt=""> Temperature: ${weatherData.temperature}°C</p>
          <p> <img src="./resources/icons/icons8-humidity-50.png" alt=""> Humidity: ${weatherData.humidity}%</p>
          <p> <img src="./resources/icons/icons8-wind-50.png" alt=""> Wind Speed: ${weatherData.windSpeed} m/s</p>
      `;
  }

  // Dropdown menu functionality
  const helpIcon = document.getElementById('h1-icon1');
  const settingsIcon = document.getElementById('h1-icon2');
  const helpMenu = helpIcon.nextElementSibling;
  const settingsMenu = settingsIcon.nextElementSibling;

  helpIcon.addEventListener('click', () => {
      toggleDropdown(helpMenu);
      settingsMenu.style.display = 'none'; // Close other menu if open
  });

  settingsIcon.addEventListener('click', () => {
      toggleDropdown(settingsMenu);
      helpMenu.style.display = 'none'; // Close other menu if open
  });

  document.addEventListener('click', (event) => {
      if (!event.target.matches('.icon')) {
          helpMenu.style.display = 'none';
          settingsMenu.style.display = 'none';
      }
  });

  function toggleDropdown(menu) {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }

  // Dark mode functionality
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
  });
});
