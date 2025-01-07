const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to programming basics. Topics include variables, decisions, loops, arrays, and I/O to solve problems.",
        technology: ["Python"],
        completed: false
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to web design and development careers through hands-on web programming.",
        technology: ["HTML", "CSS"],
        completed: false
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Students learn to write and call functions to solve problems in business, science, and humanities.",
        technology: ["Python"],
        completed: false
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('courseList');
    const totalCredits = document.getElementById('totalCredits');
    const currentYear = document.getElementById('currentYear');
    const lastModified = document.getElementById('lastModified');

    // Display current year and last modified date
    currentYear.textContent = new Date().getFullYear();
    lastModified.textContent += document.lastModified;

    // Filter buttons
    document.getElementById('allCourses').addEventListener('click', () => displayCourses(courses));
    document.getElementById('wddCourses').addEventListener('click', () => filterCourses('WDD'));
    document.getElementById('cseCourses').addEventListener('click', () => filterCourses('CSE'));

    // Display courses
    function displayCourses(courseArray) {
        courseList.innerHTML = '';
        let creditSum = 0;
        courseArray.forEach(course => {
            const courseItem = document.createElement('div');
            courseItem.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <p>Credits: ${course.credits}</p>
                <p>Technology: ${course.technology.join(', ')}</p>
            `;
            courseList.appendChild(courseItem);
            creditSum += course.credits;
        });
        totalCredits.textContent = creditSum;
    }

    // Filter courses by subject
    function filterCourses(subject) {
        const filteredCourses = courses.filter(course => course.subject === subject);
        displayCourses(filteredCourses);
    }

    // Initialize with all courses
    displayCourses(courses);
});