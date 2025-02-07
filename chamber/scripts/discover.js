document.addEventListener("DOMContentLoaded", function () {
    // Set current year in footer
    document.getElementById("year").textContent = new Date().getFullYear();
    
    // Set last modified date in footer
    document.getElementById("last-modified").textContent = document.lastModified;
    
    // Fetch weather data from OpenWeatherMap API
    const apiKey = "YOUR_API_KEY_HERE"; // Replace with your valid API key
    const city = "Brazzaville";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.list) {
                const weatherSection = document.createElement("section");
                weatherSection.classList.add("weather");
                
                const currentTemp = data.list[0].main.temp;
                const weatherDesc = data.list[0].weather[0].description;
                
                let forecastHTML = `<h2>Weather in ${city}</h2>`;
                forecastHTML += `<p>Current Temperature: ${currentTemp}°C</p>`;
                forecastHTML += `<p>${weatherDesc}</p>`;
                
                // Get a three-day forecast
                for (let i = 1; i <= 3; i++) {
                    let forecastIndex = i * 8; // Get values for each day
                    if (data.list[forecastIndex]) {
                        let forecast = data.list[forecastIndex];
                        forecastHTML += `<p>Day ${i}: ${forecast.main.temp}°C, ${forecast.weather[0].description}</p>`;
                    }
                }
                
                weatherSection.innerHTML = forecastHTML;
                document.querySelector("main").appendChild(weatherSection);
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
    
    // Fetch and display company spotlight members
    fetch("data/items.json")
        .then(response => response.json())
        .then(data => {
            if (data.length) {
                const spotlightContainer = document.createElement("section");
                spotlightContainer.classList.add("spotlight-container");
                
                data.forEach(item => {
                    let itemHTML = `
                        <div class="item-card">
                            <figure>
                                <img src="${item.image}" alt="${item.name}">
                            </figure>
                            <h3><a href="${item.link}" target="_blank">${item.name}</a></h3>
                            <p>${item.address}</p>
                            <p>${item.description}</p>
                        </div>
                    `;
                    spotlightContainer.innerHTML += itemHTML;
                });
                document.querySelector("main").appendChild(spotlightContainer);
            }
        })
        .catch(error => console.error("Error fetching item data:", error));
});