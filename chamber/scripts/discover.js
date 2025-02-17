document.addEventListener("DOMContentLoaded", function() {
    // Update Year and Last Modified Date
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("last-modified").textContent = document.lastModified;

    // Display Visit Message
    const visitMessage = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = new Date();
    
    if (lastVisit) {
        const lastVisitDate = new Date(lastVisit);
        const diffTime = Math.abs(now - lastVisitDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        visitMessage.textContent = diffDays === 1 ? "Welcome back! You last visited 1 day ago." : `Welcome back! You last visited ${diffDays} days ago.`;
    } else {
        visitMessage.textContent = "Welcome! This is your first visit.";
    }
    
    localStorage.setItem("lastVisit", now);

    // Load Cards Dynamically
    const gridContainer = document.getElementById("grid-container");
    const places = [
        { name: "Odzala National Park", image: "images/pexels-noe.jpg", description: "One of Africa’s oldest national parks, home to unique wildlife and dense rainforests." },
        { name: "Marche Total", image: "images/pexels-quang.jpg", description: "A bustling market where you can find local crafts, fresh produce, and traditional Congolese goods." },
        { name: "Loufoulakari Falls", image: "images/park.jpg", description: "A breathtaking waterfall surrounded by lush greenery, a popular tourist attraction." },
        { name: "Diosso Gorge", image: "images/cultural-center.jpg", description: "A magnificent red rock canyon offering scenic views and a glimpse into geological history." }
    ];
    
    places.forEach(place => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
        `;
        gridContainer.appendChild(card);
    });
    fetch("places.json")
    .then(response => response.json())
    .then(data => {
        const gridContainer = document.getElementById("grid-container");
        data.forEach(place => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${place.image}" alt="${place.name}">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
            `;
            gridContainer.appendChild(card);
        });
    })
    .catch(error => console.error("Error loading places:", error));

});
