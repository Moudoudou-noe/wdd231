const courses = [
    { name: "HTML and CSS", code: "WDD101", credits: 3, completed: true },
    { name: "JavaScript Basics", code: "WDD102", credits: 3, completed: false },
    { name: "Responsive Web Design", code: "WDD201", credits: 3, completed: false },
    { name: "Database Fundamentals", code: "CSE101", credits: 3, completed: true },
    { name: "Server-Side Programming", code: "CSE202", credits: 3, completed: false }
];

function displayCourses(filter = 'all') {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = '';
    let filteredCourses;

    if (filter === 'wdd') {
        filteredCourses = courses.filter(course => course.code.startsWith('WDD'));
    } else if (filter === 'cse') {
        filteredCourses = courses.filter(course => course.code.startsWith('CSE'));
    } else {
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
    document.getElementById('total-credits').innerText = `Total Credits: ${totalCredits}`;
}

document.getElementById('show-all').addEventListener('click', () => displayCourses('all'));
document.getElementById('filter-wdd').addEventListener('click', () => displayCourses('wdd'));
document.getElementById('filter-cse').addEventListener('click', () => displayCourses('cse'));

document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;

displayCourses();
