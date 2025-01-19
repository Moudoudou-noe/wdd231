// Fetch and display members from members.json
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

// Display members in grid or list view
function displayMembers(members) {
    const container = document.getElementById('members-container');
    container.innerHTML = '';

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';

        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h2>${member.name}</h2>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        container.appendChild(memberCard);
    });
}

// Toggle between grid and list view
function toggleView(viewType) {
    const container = document.getElementById('members-container');
    if (viewType === 'list') {
        container.classList.add('list-view');
    } else {
        container.classList.remove('list-view');
    }
}

// Set up event listeners for view toggle buttons
document.getElementById('grid-view').addEventListener('click', () => toggleView('grid'));
document.getElementById('list-view').addEventListener('click', () => toggleView('list'));

// Update footer with current year and last modified date
function updateFooter() {
    const yearElement = document.getElementById('current-year');
    const modifiedElement = document.getElementById('last-modified');

    yearElement.textContent = new Date().getFullYear();
    modifiedElement.textContent = document.lastModified;
}

// Initialize the page
function init() {
    fetchMembers();
    updateFooter();
}

document.addEventListener('DOMContentLoaded', init);
