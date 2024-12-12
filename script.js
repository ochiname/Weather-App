const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const apiKey = "b6efe96c46254681cc507399e8302737";

let previousCity = '';
let cityHistory = [];
const container = document.getElementById('weather-info');


async function getApiData(city) {
    try {
        if (!city) throw new Error('City Name Not Valid');
        container.textContent = 'Loading weather data...';

        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
       
        const processedData = processForecastData(data);
        renderWeatherData(processedData, data.city.name);

    } catch (error) {
        container.textContent = "City Name Not Valid Or Not Available";
        console.error(error.message); 
    }
}

function processForecastData(data) {
  
    const processedData = data.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toISOString().split("T")[0]; 
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});

    return processedData;
}

function renderWeatherData(processedData, cityName) {
    const container = document.getElementById('weather-info');
    const clearButton = document.getElementById('clear-btn');

    if (!container) {
        console.error('Container with ID "weather-info" not found in DOM (DOM ERROR)');
        return;
    }

   
    container.innerHTML = '';

    let count = 0;
    for (const [date, weatherItems] of Object.entries(processedData)) {
        
        if (count >= 5) break;

        const dayData = weatherItems[0]; // Get the first item for each date as representative data

        const tempC = dayData.main.temp;
        const tempF = (tempC * 9 / 5 + 32).toFixed(2);
        const iconCode = dayData.weather[0].icon; // Get the icon code
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        const description = dayData.weather[0].description;
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dates = new Date(date);
        const preDates = days[dates.getDay()];
        
        const weatherCard = `
            <div class="weather-card">
                <h2>${cityName}</h2>
                <h3>${preDates}</h3
                <p>Temperature: ${tempC}°C / ${tempF}°F</p>
                <p>Weather: ${description}</p>
                <img src="${iconUrl}" alt="${description}" />
                <p>Humidity: ${dayData.main.humidity}%</p>
                <p>Wind Speed: ${dayData.wind.speed} m/s</p>
            </div>
        `;

        // Append the card to the container
        container.innerHTML += weatherCard;
        count++;
    }   


    if (clearButton) {
        clearButton.addEventListener('click', () => {
            container.innerHTML = '';
        });
    }
}

function setupSearch() {
    const searchButton = document.getElementById('search-btn');
    const inputField = document.getElementById('input');
    const historyButton = document.getElementById('history-btn');
    const historyContainer = document.getElementById('history-list');
    const maxHistoryItems = 5;

    if (!searchButton || !inputField || !historyContainer) {
        alert('Required elements not found in DOM');
        return;
    }

    historyContainer.style.display = 'none';

    searchButton.addEventListener('click', () => {
        const city = inputField.value.trim();
        if (city) {
            if (!cityHistory.includes(city)) {
                cityHistory.unshift(city); 
                if (cityHistory.length > maxHistoryItems) {
                    cityHistory.pop(); 
                }
            }
            previousCity = city; 
            getApiData(city);
            updateHistoryDisplay(); 
        } else {
            alert('Please enter a city name.');
        }
    });

    historyButton.addEventListener('click', () => {
        if (cityHistory.length > 0) {
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













// const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
// const apiKey = "b6efe96c46254681cc507399e8302737"81fab1ac75917caf509e4deee52debb5

// let previousCity = '';
// let cityHistory = [];
// const container = document.getElementById('weather-info');
// const currentDate = new Date();
// const year = currentDate.getFullYear();
// const month = String(currentDate.getMonth() + 1).padStart(2, '0');
// const day = String(currentDate.getDate()).padStart(2, '0');
// const hours = String(currentDate.getHours()).padStart(2, '0');
// const minutes = String(currentDate.getMinutes()).padStart(2, '0');
// const seconds = String(currentDate.getSeconds()).padStart(2, '0');

// const formattedDateTime = (`DATE: ${year}-${month}-${day} \nTIME: ${hours}:${minutes}:${seconds}`);


// async function getApiData(city) {
//     try {
//         if (!city) throw new Error('City Name Not Valid');
//         container.textContent = 'City Name Not Valid'

//         const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
//         const data = await response.json();
        
//         rendaring(data);
        
//         const processedData = data.list.reduce((acc, item) => {
//             const date = new Date(item.dt * 1000).toISOString().split("T")[0]; // Extract date
//             if (!acc[date]) {
//                 acc[date] = [];
//             }
//             acc[date].push(item);
//             return acc;
//         }, {});

//         rendaring(processedData);

//         return processedData; 
//     } catch (error) {
//         // Show error in the UI
//         container.textContent = "City Name Not Valid Or Not Available";
//         console.error(error.message); // Log error for debugging
//     }
// }


// // Render data to the DOM
// function rendaring(processedData) {
//     const container = document.getElementById('weather-info');
//     const clearButton = document.getElementById('clear-btn');

//     if (!container) {
//         alert('Container with ID "weather-info" not found in DOM (DOM ERROR)');
//         return;
//     }

//     // Clear previous content
//     container.innerHTML = '';

//     // Loop through processed data (grouped by date)
//     for (const [date, weatherItems] of Object.entries(processedData)) {
//         const dayData = weatherItems[0]; // Get the first item for each date as representative data

//         const tempC = dayData.main.temp;
//         const tempF = (tempC * 9 / 5 + 32).toFixed(2);
//         const iconCode = dayData.weather[0].icon; // Get the icon code
//         const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
//         const description = dayData.weather[0].description;

//         // Create a card for each day
//         const weatherCard = `
//             <div class="weather-card">
//                 <h3>${date}</h3>
//                 <p>Temperature: ${tempC}°C / ${tempF}°F</p>
//                 <p>Weather: ${description}</p>
//                 <img src="${iconUrl}" alt="${description}" />
//                 <p>Humidity: ${dayData.main.humidity}%</p>
//                 <p>Wind Speed: ${dayData.wind.speed} m/s</p>
//             </div>
//         `;

//         // Append the card to the container
//         container.innerHTML += weatherCard;
//     }

//     // Add event listener for clear button
//     if (clearButton) {
//         clearButton.addEventListener('click', () => {
//             container.innerHTML = '';
//         });
//     }
// }

// // function rendaring(processedData) {
// //     // const container = document.getElementById('weather-info');
// //     const clear  = document.getElementById('clear-btn');

// //     if (!container) {
// //         alert('Container with ID "weather-info" not found in DOM (DOM ERROR)');
// //         return;
// //     }
// //     const tempF = (data.main.temp * 9/5 + 32).toFixed(2);
// //     const iconCode = data.weather[0].icon; // Get the icon code from the API response
// //     const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; 
// //     const dateTimeParagraph = document.getElementById('date-time');
// //     dateTimeParagraph.innerText = formattedDateTime;
// //     container.innerHTML = `
// //         <h2>${data.name}</h2>
// //         <p>Temperature: ${data.main.temp}°C / ${tempF}°F</p>
// //         <p>Weather: ${data.weather[0].description}</p>
// //         <img src="${iconUrl}" alt="${data.weather[0].description}" />
// //         <p>Humidity: ${data.main.humidity}%</p>
// //         <p>Wind Speed: ${data.wind.speed} m/s</p>
// //     `;
// //     if (clear) {
// //         clear.addEventListener('click', () => {
// //             container.innerHTML = ''; 
// //         });
// //     }
// // }

// // Set up search functionality
// function setupSearch() {
//     const searchButton = document.getElementById('search-btn');
//     const inputField = document.getElementById('input');
//     const historyButton = document.getElementById('history-btn');
//     const historyContainer = document.getElementById('history-list');

//     if (!searchButton || !inputField || !historyContainer) {
//         alert('Required elements not found in DOM');
//         return;
//     }

  
//     historyContainer.style.display = 'none';

    
//     searchButton.addEventListener('click', () => {
//         const city = inputField.value.trim();
//         if (city) {
//             previousCity = city; 
//             cityHistory.push(city); 
//             getApiData(city);
//             updateHistoryDisplay(); 
//         } else {
//             alert('Please enter a city name.');
//         }
//     });

   
//     historyButton.addEventListener('click', () => {
//         if (cityHistory.length > 0) {
//             // Toggle the display of the history list
//             historyContainer.style.display = historyContainer.style.display === 'none' ? 'block' : 'none';
//         } else {
//             alert('No city history available.');
//         }
//     });
// }

// function updateHistoryDisplay() {
//     const historyContainer = document.getElementById('history-list');

//     if (!historyContainer) {
//         alert('History container is empty');
//         return;
//     }

//     historyContainer.innerHTML = ''; 

//     cityHistory.forEach((city) => {
//         const cityItem = document.createElement('li');
//         cityItem.textContent = city;

//         // Add an event listener to each city item to display its weather data when clicked
//         cityItem.addEventListener('click', () => {
//             getApiData(city);
//         });
//         historyContainer.appendChild(cityItem);
//     });
// }


// function refresh() {
//     if (previousCity) getApiData(previousCity);
// }


// function startAutoRefresh() {
//     setInterval(refresh, 30000);
// }


// setupSearch();
// startAutoRefresh();
