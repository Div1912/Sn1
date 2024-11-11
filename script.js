document.addEventListener("DOMContentLoaded", function() {
    // Dark Mode Toggle
    const toggleButton = document.querySelector('.dark-mode-toggle');
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    // OTP Alert
    const otpButton = document.querySelector('.otp-form button');
    otpButton.addEventListener('click', function() {
        alert('OTP has been sent to your mobile number!');
    });

    

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const courses = document.querySelectorAll('.course-item');
        courses.forEach(course => {
            if (course.textContent.toLowerCase().includes(query)) {
                course.style.display = 'block';
            } else {
                course.style.display = 'none';
            }
        });
    });

    // Course List Generation
    const courses = [
        { title: 'Graphic Designing', description: 'Learn the fundamentals of graphic design, including typography, color theory, and software tools like Adobe Photoshop and Illustrator.' },
        { title: 'Web Development', description: 'Master front-end and back-end web development technologies like HTML, CSS, JavaScript, and frameworks like React and Node.js.' },
        { title: 'Data Science', description: 'Dive into data analysis, machine learning, and statistical modeling using tools like Python, R, and SQL.' }
    ];

    const courseList = document.querySelector('.course-list');
    
    courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.classList.add('course-item');
        
        const courseTitle = document.createElement('h3');
        courseTitle.innerText = course.title;
        courseItem.appendChild(courseTitle);
        
        const courseDescription = document.createElement('p');
        courseDescription.innerText = course.description;
        courseItem.appendChild(courseDescription);
        
        courseList.appendChild(courseItem);
    });
});

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7xdQ_NmD57dalDwmGOvHjeooiXvaDWqo",
    authDomain: "skillnavigator-13d12.firebaseapp.com",
    projectId: "skillnavigator-13d12D",
    storageBucket: "skillnavigator-13d12.firebasestorage.app",
    messagingSenderId: "71439730616",
    appId: "1:71439730616:web:6ae00cc9f2627152d2714d"
};


    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('newUsername').value;
            const password = document.getElementById('newPassword').value;

            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    console.log('User signed up:', userCredential.user);
                })
                .catch((error) => {
                    console.error('Error signing up:', error.message);
                });
        });
    }
});
// Skills Assessment
    const startAssessmentButton = document.getElementById('startAssessment');
    const assessmentResults = document.getElementById('assessmentResults');
    const skillsScoreElement = document.getElementById('skillsScore');
    const recommendedCoursesElement = document.getElementById('recommendedCourses');

    startAssessmentButton.addEventListener('click', () => {
        // Perform skills assessment logic here
        const skillsScore = 80; // Sample score
        const recommendedCourses = ['Web Development', 'Data Science']; // Sample recommendations

        skillsScoreElement.textContent = `Your skills score: ${skillsScore}`;
        recommendedCoursesElement.textContent = `Recommended courses: ${recommendedCourses.join(', ')}`;
        assessmentResults.classList.remove('hidden');
    });

    // Progress Tracking and Assessments
    const progressBar = document.querySelector('.progress-bar .progress-indicator');
    const assessmentButton = document.getElementById('assessmentButton');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const interventionActivities = document.getElementById('interventionActivities');

    // Sample progress tracking and assessment logic
    let progress = 0;
    progressBar.style.width = `${progress}%`;

    assessmentButton.addEventListener('click', () => {
        // Perform progress assessment logic here
        progress += 10;
        progressBar.style.width = `${progress}%`;

        if (progress < 50) {
            feedbackMessage.textContent = 'Keep up the good work! You\'re on the right track.';
            interventionActivities.innerHTML = '<p>Recommended activities:</p><ul><li>Complete additional practice exercises</li><li>Review course materials again</li></ul>';
        } else if (progress < 80) {
            feedbackMessage.textContent = 'Great progress! Let\'s focus on improving your weaker areas.';
            interventionActivities.innerHTML = '<p>Recommended activities:</p><ul><li>Attend a study group session</li><li>Schedule a session with a tutor</li></ul>';
        } else {
            feedbackMessage.textContent = 'Excellent work! You\'re ready to move on to the next level.';
            interventionActivities.innerHTML = '<p>Recommended activities:</p><ul><li>Explore advanced courses in your field</li><li>Start applying for internships or job opportunities</li></ul>';
        }
    });

// Skills Assessment Integration
const startAssessmentButton = document.getElementById('startAssessment');
const assessmentResults = document.getElementById('assessmentResults');
const skillsScoreElement = document.getElementById('skillsScore');
const recommendedCoursesElement = document.getElementById('recommendedCourses');

startAssessmentButton.addEventListener('click', () => {
    // Perform skills assessment logic
    performSkillsAssessment();
});

function performSkillsAssessment() {
    // Simulate skills assessment process
    const skillsScore = getRandomSkillsScore();
    const recommendedCourses = getRecommendedCourses(skillsScore);

    displayAssessmentResults(skillsScore, recommendedCourses);
}

function getRandomSkillsScore() {
    // Simulate a random skills score between 0 and 100
    return Math.floor(Math.random() * 101);
}

function getRecommendedCourses(skillsScore) {
    // Determine recommended courses based on the skills score
    if (skillsScore < 50) {
        return ['Introductory Web Development', 'Data Analysis Fundamentals'];
    } else if (skillsScore < 80) {
        return ['Intermediate Web Development', 'Statistical Modeling'];
    } else {
        return ['Advanced Web Development', 'Machine Learning Specialization'];
    }
}

function displayAssessmentResults(skillsScore, recommendedCourses) {
    skillsScoreElement.textContent = `Your skills score: ${skillsScore}`;
    recommendedCoursesElement.textContent = `Recommended courses: ${recommendedCourses.join(', ')}`;
    assessmentResults.classList.remove('hidden');
}
// Progress Tracking and Assessments
const progressBar = document.querySelector('.progress-bar .progress-indicator');
const assessmentButton = document.getElementById('assessmentButton');
const feedbackMessage = document.getElementById('feedbackMessage');
const interventionActivities = document.getElementById('interventionActivities');

let progress = 0;
updateProgressBar();

assessmentButton.addEventListener('click', () => {
    // Perform progress assessment logic
    performProgressAssessment();
});

function performProgressAssessment() {
    // Simulate progress assessment
    const newProgress = progress + 10;
    updateProgress(newProgress);

    // Provide personalized feedback and interventions
    displayFeedbackAndInterventions(newProgress);
}

function updateProgress(newProgress) {
    progress = newProgress;
    updateProgressBar();
}

function updateProgressBar() {
    progressBar.style.width = `${progress}%`;
}

function displayFeedbackAndInterventions(progress) {
    if (progress < 50) {
        feedbackMessage.textContent = 'Keep up the good work! You\'re on the right track.';
        interventionActivities.innerHTML = '<p>Recommended activities:</p><ul><li>Complete additional practice exercises</li><li>Review course materials again</li></ul>';
    } else if (progress < 80) {
        feedbackMessage.textContent = 'Great progress! Let\'s focus on improving your weaker areas.';
        interventionActivities.innerHTML = '<p>Recommended activities:</p><ul><li>Attend a study group session</li><li>Schedule a session with a tutor</li></ul>';
    } else {
        feedbackMessage.textContent = 'Excellent work! You\'re ready to move on to the next level.';
        interventionActivities.innerHTML = '<p>Recommended activities:</p><ul><li>Explore advanced courses in your field</li><li>Start applying for internships or job opportunities</li></ul>';
    }
}
// Personalized Course Recommendations
const courseList = document.querySelector('.course-list');

function getPersonalizedCourses(skillsScore) {
    // Determine personalized course recommendations based on the skills score
    if (skillsScore < 50) {
        return [
            { title: 'Introductory Web Development', description: 'Learn the basics of HTML, CSS, and JavaScript to build simple websites.' },
            { title: 'Data Analysis Fundamentals', description: 'Gain skills in data manipulation, visualization, and basic statistical analysis.' }
        ];
    } else if (skillsScore < 80) {
        return [
            { title: 'Intermediate Web Development', description: 'Dive deeper into front-end frameworks, APIs, and server-side development.' },
            { title: 'Statistical Modeling', description: 'Understand regression analysis, hypothesis testing, and predictive modeling.' }
        ];
    } else {
        return [
            { title: 'Advanced Web Development', description: 'Master modern web development practices, including single-page applications and full-stack development.' },
            { title: 'Machine Learning Specialization', description: 'Explore supervised and unsupervised learning algorithms, deep learning, and practical applications.' }
        ];
    }
}

function displayPersonalizedCourses(courses) {
    courseList.innerHTML = ''; // Clear the existing course list

    courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.classList.add('course-item');

        const courseTitle = document.createElement('h3');
        courseTitle.innerText = course.title;
        courseItem.appendChild(courseTitle);

        const courseDescription = document.createElement('p');
        courseDescription.innerText = course.description;
        courseItem.appendChild(courseDescription);

        courseList.appendChild(courseItem);
    });
}
