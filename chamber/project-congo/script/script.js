// DOMContentLoaded to ensure the DOM is fully loaded before interacting with it
document.addEventListener('DOMContentLoaded', () => {
    // Active la page de navigation en fonction de la section active
    activateNavLink();

    // Fonctionnalité pour gérer le bouton "Retour en haut"
    addBackToTopButton();

    // Activation des sections dynamiques (par exemple, la météo)
    fetchWeatherData();

    // Formulaire de contact - Validation de base
    addFormValidation();
});

// Active le lien de navigation correspondant à la page actuelle
function activateNavLink() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        // Ajouter la classe 'active' au lien correspondant à la page actuelle
        if (link.href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// Fonction pour ajouter un bouton "Retour en haut"
function addBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = 'Retour en haut';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);

    // Écouter le scroll pour afficher/masquer le bouton
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Quand l'utilisateur clique sur le bouton, revenir en haut de la page
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fonction pour récupérer la météo via l'API OpenWeatherMap
function fetchWeatherData() {
    const weatherElement = document.querySelector('#weather');
    const apiKey = 'YOUR_API_KEY'; // Remplacez par votre clé API
    const city = 'Brazzaville'; // Nom de la ville

    if (weatherElement) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                weatherElement.innerHTML = `
                    <h3>Météo actuelle à ${city}</h3>
                    <p>${temperature}°C - ${description}</p>
                `;
            })
            .catch(err => {
                console.error('Erreur lors de la récupération de la météo:', err);
                weatherElement.innerHTML = '<p>Impossible de récupérer la météo.</p>';
            });
    }
}

// Fonction pour ajouter une validation de formulaire de contact
function addFormValidation() {
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const name = form.querySelector('[name="name"]');
            const email = form.querySelector('[name="email"]');
            const message = form.querySelector('[name="message"]');

            // Validation de base
            if (!name.value || !email.value || !message.value) {
                alert('Tous les champs doivent être remplis.');
                return;
            }

            if (!validateEmail(email.value)) {
                alert('L\'adresse e-mail n\'est pas valide.');
                return;
            }

            // Sauvegarde des données du formulaire dans le localStorage (optionnel)
            localStorage.setItem('contact-form', JSON.stringify({
                name: name.value,
                email: email.value,
                message: message.value
            }));

            // Confirmation de soumission
            alert('Merci pour votre message ! Nous vous répondrons sous peu.');
            form.reset();
        });
    }
}

// Fonction de validation d'email simple
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

// Ajouter une animation de défilement au clic des liens "Learn More"
function addSmoothScrollToLearnMore() {
    const learnMoreButtons = document.querySelectorAll('.learn-more');

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 80, // Ajuste pour éviter l'en-tête fixe
                behavior: 'smooth'
            });
        });
    });
}

// Appel de la fonction pour activer le défilement fluide des liens "Learn More"
addSmoothScrollToLearnMore();
function loadAttractions() {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const attractionsContainer = document.querySelector('#attractions-container');
        data.attractions.forEach(attraction => {
          const attractionElement = document.createElement('div');
          attractionElement.classList.add('attraction');
          attractionElement.innerHTML = `
            <img src="${attraction.image}" alt="${attraction.name}" class="attraction-image">
            <h3>${attraction.name}</h3>
            <p>${attraction.description}</p>
            <a href="${attraction.link}" class="learn-more">En savoir plus</a>
          `;
          attractionsContainer.appendChild(attractionElement);
        });
      })
      .catch(error => console.error('Erreur de chargement des attractions:', error));
  }
  
  // Fonction pour charger les hébergements depuis le fichier JSON
  function loadAccommodations() {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const accommodationsContainer = document.querySelector('#accommodations-container');
        data.accommodations.forEach(accommodation => {
          const accommodationElement = document.createElement('div');
          accommodationElement.classList.add('accommodation');
          accommodationElement.innerHTML = `
            <h3>${accommodation.name}</h3>
            <p>${accommodation.description}</p>
            <p><strong>Prix : </strong>${accommodation.price}</p>
            <a href="${accommodation.link}" class="learn-more">Voir les détails</a>
          `;
          accommodationsContainer.appendChild(accommodationElement);
        });
      })
      .catch(error => console.error('Erreur de chargement des hébergements:', error));
  }
  
  // Fonction pour charger les conseils de voyage depuis le fichier JSON
  function loadTravelTips() {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const travelTipsContainer = document.querySelector('#travel-tips-container');
        data.travelTips.forEach(tip => {
          const tipElement = document.createElement('div');
          tipElement.classList.add('travel-tip');
          tipElement.innerHTML = `
            <h4>${tip.category}</h4>
            <p>${tip.tip}</p>
          `;
          travelTipsContainer.appendChild(tipElement);
        });
      })
      .catch(error => console.error('Erreur de chargement des conseils de voyage:', error));
  }
  
  // Appel des fonctions pour charger les données
  loadAttractions();
  loadAccommodations();
  loadTravelTips();