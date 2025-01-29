document.addEventListener("DOMContentLoaded", function() {
    // Set current year in footer
    document.getElementById("year").textContent = new Date().getFullYear();
    
    // Set last modified date in footer
    document.getElementById("lastModified").textContent = document.lastModified;

    // Fetch weather data from OpenWeatherMap API
    const apiKey = "moudoudou01@";
    const city = "brazzaville";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            const weatherSection = document.querySelector(".weather");
            const currentTemp = data.list[0].main.temp;
            const weatherDesc = data.list[0].weather[0].description;
            
            let forecastHTML = `<p>Current Temperature: ${currentTemp}°C</p>`;
            forecastHTML += `<p>${weatherDesc}</p>`;
            
            // Get a three-day forecast
            for (let i = 1; i <= 3; i++) {
                let forecast = data.list[i * 8]; // Adjusted for daily forecast
                forecastHTML += `<p>Day ${i}: ${forecast.main.temp}°C, ${forecast.weather[0].description}</p>`;
            }
            
            weatherSection.innerHTML = forecastHTML;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.querySelector(".weather").innerHTML = "<p>Failed to load weather data.</p>";
        });

    // Fetch and display company spotlight members
    fetch("data/members2.json")
        .then(response => response.json())
        .then(data => {
            const members = data.members.filter(member => 
                ["Gold", "Silver", "Bronze"].includes(member.membership)
            );
            const selectedMembers = members.sort(() => 0.5 - Math.random()).slice(0, 3);
            
            const spotlightContainer = document.querySelector(".spotlight-container");
            spotlightContainer.innerHTML = "";
            
            selectedMembers.forEach(member => {
                let memberHTML = `
                    <div class="spotlight-card">
                        <img src="${member.logo}" alt="${member.name} logo">
                        <h3>${member.name}</h3>
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <a href="${member.website}" target="_blank">Visit Website</a>
                        <p class="membership">${member.membership} Member</p>
                    </div>
                `;
                spotlightContainer.innerHTML += memberHTML;
            });
        })
        .catch(error => console.error("Error fetching member data:", error));
});