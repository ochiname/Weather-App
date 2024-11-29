const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'b6efe96c46254681cc507399e8302737';
let previousCity = '';
let cityHistory = [];

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');

const formattedDateTime = `DATE: ${year}-${month}-${day} \nTIME: ${hours}:${minutes}:${seconds}`;


async function getApiData(city) {
    try {
        if (!city) throw new Error('City Name Not Valid');
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        rendaring(data);
        
    } catch (error) {
        alert("City Name Not Valid Or Not Available"); // Show user-friendly error
    }
}

// Render data to the DOM
function rendaring(data) {
    const container = document.getElementById('weather-info');
    const clear  = document.getElementById('clear-btn');

    if (!container) {
        alert('Container with ID "weather-info" not found in DOM (DOM ERROR)');
        return;
    }
    const tempF = (data.main.temp * 9/5 + 32).toFixed(2);
    const iconCode = data.weather[0].icon; // Get the icon code from the API response
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; 
    const dateTimeParagraph = document.getElementById('date-time');
    dateTimeParagraph.innerText = formattedDateTime;
    container.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C / ${tempF}°F</p>
        <p>Weather: ${data.weather[0].description}</p>
        <img src="${iconUrl}" alt="${data.weather[0].description}" />
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    if (clear) {
        clear.addEventListener('click', () => {
            container.innerHTML = ''; 
        });
    }
}

// Set up search functionality
function setupSearch() {
    const searchButton = document.getElementById('search-btn');
    const inputField = document.getElementById('input');
    const historyButton = document.getElementById('history-btn');
    const historyContainer = document.getElementById('history-list');

    if (!searchButton || !inputField || !historyContainer) {
        alert('Required elements not found in DOM');
        return;
    }

  
    historyContainer.style.display = 'none';

    
    searchButton.addEventListener('click', () => {
        const city = inputField.value.trim();
        if (city) {
            previousCity = city; 
            cityHistory.push(city); 
            getApiData(city);
            updateHistoryDisplay(); 
        } else {
            alert('Please enter a city name.');
        }
    });

   
    historyButton.addEventListener('click', () => {
        if (cityHistory.length > 0) {
            // Toggle the display of the history list
            historyContainer.style.display = historyContainer.style.display === 'none' ? 'block' : 'none';
        } else {
            alert('No city history available.');
        }
    });
}

function updateHistoryDisplay() {
    const historyContainer = document.getElementById('history-list');

    if (!historyContainer) {
        alert('History container is empty');
        return;
    }

    historyContainer.innerHTML = ''; 

    cityHistory.forEach((city) => {
        const cityItem = document.createElement('li');
        cityItem.textContent = city;

        // Add an event listener to each city item to display its weather data when clicked
        cityItem.addEventListener('click', () => {
            getApiData(city);
        });
        historyContainer.appendChild(cityItem);
    });
}


function refresh() {
    if (previousCity) getApiData(previousCity);
}


function startAutoRefresh() {
    setInterval(refresh, 30000);
}


setupSearch();
startAutoRefresh();
