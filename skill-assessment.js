// skill-assessment.js
const skillAssessment = {
    questions: [
        {
            category: 'programming',
            questions: [
                {
                    id: 1,
                    question: "What is your experience level with programming?",
                    options: ["Beginner", "Intermediate", "Advanced"]
                },
                {
                    id: 2,
                    question: "Which programming languages are you familiar with?",
                    options: ["None", "1-2 languages", "3+ languages"]
                }
            ]
        },
        {
            category: 'dataScience',
            questions: [
                {
                    id: 3,
                    question: "How comfortable are you with statistics?",
                    options: ["Beginner", "Intermediate", "Advanced"]
                },
                {
                    id: 4,
                    question: "Have you worked with data visualization?",
                    options: ["No experience", "Some experience", "Extensive experience"]
                }
            ]
        }
    ],
    
    courseRecommendations: {
        programming: {
            beginner: [
                { title: "Introduction to Programming", duration: "3 months", description: "Learn programming basics with Python" },
                { title: "Web Development Fundamentals", duration: "4 months", description: "HTML, CSS, and basic JavaScript" }
            ],
            intermediate: [
                { title: "Advanced Programming Concepts", duration: "6 months", description: "Data structures, algorithms, and OOP" },
                { title: "Full Stack Development", duration: "8 months", description: "Building complete web applications" }
            ],
            advanced: [
                { title: "Software Architecture", duration: "6 months", description: "System design and architecture patterns" },
                { title: "Cloud Computing", duration: "4 months", description: "AWS, Azure, and cloud architecture" }
            ]
        },
        dataScience: {
            beginner: [
                { title: "Data Science Fundamentals", duration: "4 months", description: "Basic statistics and Python for data analysis" },
                { title: "SQL and Database Basics", duration: "2 months", description: "Database management and querying" }
            ],
            intermediate: [
                { title: "Machine Learning Basics", duration: "6 months", description: "Fundamental ML algorithms and applications" },
                { title: "Data Visualization", duration: "3 months", description: "Creating impactful data visualizations" }
            ],
            advanced: [
                { title: "Advanced Machine Learning", duration: "8 months", description: "Deep learning and neural networks" },
                { title: "Big Data Analytics", duration: "6 months", description: "Handling and analyzing large datasets" }
            ]
        }
    },

    currentQuestion: 0,
    answers: {},

    startAssessment() {
        this.currentQuestion = 0;
        this.answers = {};
        this.showQuestion();
        document.getElementById('assessmentResults').classList.add('hidden');
    },

    showQuestion() {
        const currentCategory = Math.floor(this.currentQuestion / 2);
        const categoryQuestions = this.questions[currentCategory].questions;
        const questionIndex = this.currentQuestion % 2;
        const question = categoryQuestions[questionIndex];

        const container = document.createElement('div');
        container.className = 'question-container';
        container.innerHTML = `
            <h3>${question.question}</h3>
            <div class="options-container">
                ${question.options.map((option, index) => `
                    <button class="option-button" onclick="skillAssessment.selectAnswer('${option}')">${option}</button>
                `).join('')}
            </div>
        `;

        const assessmentArea = document.querySelector('.skills-assessment');
        const oldQuestion = assessmentArea.querySelector('.question-container');
        if (oldQuestion) {
            oldQuestion.remove();
        }
        assessmentArea.appendChild(container);
    },

    selectAnswer(answer) {
        const currentCategory = Math.floor(this.currentQuestion / 2);
        const category = this.questions[currentCategory].category;
        
        if (!this.answers[category]) {
            this.answers[category] = [];
        }
        this.answers[category].push(answer);

        this.currentQuestion++;
        if (this.currentQuestion < 4) {
            this.showQuestion();
        } else {
            this.showResults();
        }
    },

    calculateLevel(categoryAnswers) {
        const levels = categoryAnswers.map(answer => {
            if (answer === "Beginner" || answer === "None" || answer === "No experience") return 1;
            if (answer === "Intermediate" || answer === "1-2 languages" || answer === "Some experience") return 2;
            return 3;
        });
        
        const average = levels.reduce((a, b) => a + b) / levels.length;
        if (average <= 1.5) return "beginner";
        if (average <= 2.5) return "intermediate";
        return "advanced";
    },

    showResults() {
        const results = {};
        for (const category in this.answers) {
            results[category] = this.calculateLevel(this.answers[category]);
        }

        const recommendations = this.getRecommendations(results);
        this.displayResults(results, recommendations);
    },

    getRecommendations(results) {
        const recommendations = {};
        for (const category in results) {
            const level = results[category];
            recommendations[category] = this.courseRecommendations[category][level];
        }
        return recommendations;
    },

    displayResults(results, recommendations) {
        const resultsContainer = document.getElementById('assessmentResults');
        resultsContainer.innerHTML = `
            <h3>Your Skill Assessment Results</h3>
            <div class="results-container">
                ${Object.entries(results).map(([category, level]) => `
                    <div class="category-result">
                        <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                        <p>Level: ${level.charAt(0).toUpperCase() + level.slice(1)}</p>
                        <div class="recommendations">
                            <h5>Recommended Courses:</h5>
                            ${recommendations[category].map(course => `
                                <div class="course-recommendation">
                                    <h6>${course.title}</h6>
                                    <p>${course.description}</p>
                                    <span class="duration">Duration: ${course.duration}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        resultsContainer.classList.remove('hidden');
    }
};

// Add event listener to start assessment button
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startAssessment');
    if (startButton) {
        startButton.addEventListener('click', () => skillAssessment.startAssessment());
    }
});