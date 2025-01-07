// Dynamic Year for Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Dynamic Last Modified Date
document.getElementById('lastModified').textContent += document.lastModified;

// Course Data
const courses = [
    { name: "WDD 130 - Web Fundamentals", completed: true, credits: 3 },
    { name: "WDD 131 - Dynamic Web Fundamentals", completed: false, credits: 3 },
    { name: "CSE 100 - Computer Science Basics", completed: false, credits: 4 },
    { name: "WDD 230 - Advanced Web Design", completed: true, credits: 4 },
    { name: "CSE 200 - Data Structures", completed: false, credits: 4 }
];

// Function to Display Courses
function displayCourses(filteredCourses) {
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = ''; // Clear the list first

    let totalCredits = 0;
    filteredCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.classList.add('course');
        courseElement.innerHTML = `
            <h3>${course.name}</h3>
            <p>Credits: ${course.credits}</p>
            <p>Status: ${course.completed ? 'Completed' : 'Not Completed'}</p>
        `;
        courseList.appendChild(courseElement);

        if (course.completed) {
            totalCredits += course.credits;
        }
    });

    // Update Total Credits
    document.getElementById('totalCredits').textContent = totalCredits;
}

// Initial Display of All Courses
displayCourses(courses);

// Filter Courses based on User Click
document.getElementById('allCourses').addEventListener('click', () => displayCourses(courses));
document.getElementById('wddCourses').addEventListener('click', () => displayCourses(courses.filter(course => course.name.includes('WDD'))));
document.getElementById('cseCourses').addEventListener('click', () => displayCourses(courses.filter(course => course.name.includes('CSE'))));