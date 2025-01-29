// Automatically set the timestamp when the form loads
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("timestamp").value = new Date().toISOString();
});

// Function to open a modal
function openModal(id) {
    document.getElementById(id).style.display = "block";
}

// Function to close a modal
function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// Close modals when clicking outside of the modal content
window.onclick = function (event) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};

// Form validation (Optional: You can enhance this further)
document.querySelector("form").addEventListener("submit", function (event) {
    const firstName = document.querySelector("input[name='firstName']").value.trim();
    const lastName = document.querySelector("input[name='lastName']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const phone = document.querySelector("input[name='phone']").value.trim();
    const organization = document.querySelector("input[name='organization']").value.trim();

    if (!firstName || !lastName || !email || !phone || !organization) {
        alert("Please fill in all required fields.");
        event.preventDefault(); // Stop form submission
    }
});