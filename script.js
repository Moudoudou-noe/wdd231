
const courses = [
    { name: "HTML and CSS", code: "WDD101", credits: 3, completed: true },
    { name: "JavaScript Basics", code: "WDD102", credits: 3, completed: false },
    { name: "Responsive Web Design", code: "WDD201", credits: 3, completed: false },
    { name: "Database Fundamentals", code: "CSE101", credits: 3, completed: true },
    { name: "Server-Side Programming", code: "CSE202", credits: 3, completed: false },
];

function displayCourses(filter = 'all') {
    const courseList = document.getElementById('course-list');
    if (!courseList) {
        console.error("Element with ID 'course-list' not found.");
        return;
    }

    courseList.innerHTML = ''; // Clear existing content
    let filteredCourses;

    switch (filter) {
        case 'wdd':
            filteredCourses = courses.filter(course => course.code.startsWith('WDD'));
            break;
        case 'cse':
            filteredCourses = courses.filter(course => course.code.startsWith('CSE'));
            break;
        default:
            filteredCourses = courses;
    }

    filteredCourses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-item');
        if (course.completed) {
            courseDiv.classList.add('completed');
        }
        courseDiv.innerHTML = `
            <h3>${course.name} (${course.code})</h3>
            <p>Credits: ${course.credits}</p>
        `;
        courseList.appendChild(courseDiv);
    });

    updateTotalCredits(filteredCourses);
}

function updateTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
    const totalCreditsElement = document.getElementById('total-credits');
    if (totalCreditsElement) {
        totalCreditsElement.innerText = `Total Credits: ${totalCredits}`;
    } else {
        console.error("Element with ID 'total-credits' not found.");
    }
}

// Event listeners for buttons
document.getElementById('show-all')?.addEventListener('click', () => displayCourses('all'));
document.getElementById('filter-wdd')?.addEventListener('click', () => displayCourses('wdd'));
document.getElementById('filter-cse')?.addEventListener('click', () => displayCourses('cse'));

// Update dynamic footer information
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.getElementById('last-modified');
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}

// Initial display
displayCourses();