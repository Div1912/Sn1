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
const gamification = {
    badges: [
        { id: 'quick-learner', name: 'Quick Learner', icon: '🚀', description: 'Complete 5 assessments' },
        { id: 'streak-master', name: 'Streak Master', icon: '🔥', description: 'Maintain a 7-day streak' },
        { id: 'knowledge-seeker', name: 'Knowledge Seeker', icon: '📚', description: 'Complete all skill trees' },
        { id: 'perfect-score', name: 'Perfect Score', icon: '🎯', description: 'Get 100% in any assessment' }
    ],
    
    challenges: [
        { id: 'daily-assessment', name: 'Daily Assessment Challenge', xp: 100, completed: false },
        { id: 'practice-coding', name: 'Code for 30 minutes', xp: 150, completed: false },
        { id: 'learn-concept', name: 'Learn a New Concept', xp: 200, completed: false }
    ],
    
    userStats: {
        xp: 0,
        level: 1,
        streak: 0,
        lastActive: null,
        completedBadges: [],
        skillTreeProgress: {}
    },

    init() {
        this.loadUserStats();
        this.renderBadges();
        this.renderChallenges();
        this.initializeSkillTree();
        this.updateStreakCount();
        this.checkDailyLogin();
    },

    loadUserStats() {
        const savedStats = localStorage.getItem('userStats');
        if (savedStats) {
            this.userStats = JSON.parse(savedStats);
        }
    },

    saveUserStats() {
        localStorage.setItem('userStats', JSON.stringify(this.userStats));
    },

    renderBadges() {
        const badgesContainer = document.querySelector('.badges-grid');
        if (!badgesContainer) return;

        badgesContainer.innerHTML = this.badges.map(badge => `
            <div class="badge ${this.userStats.completedBadges.includes(badge.id) ? 'earned' : 'locked'}">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
                <div class="badge-description">${badge.description}</div>
            </div>
        `).join('');
    },

    renderChallenges() {
        const challengeList = document.querySelector('.challenge-list');
        if (!challengeList) return;

        challengeList.innerHTML = this.challenges.map(challenge => `
            <div class="challenge-card ${challenge.completed ? 'completed' : ''}" data-id="${challenge.id}">
                <div>
                    <h4>${challenge.name}</h4>
                    <p>+${challenge.xp} XP</p>
                </div>
                <button class="challenge-btn" ${challenge.completed ? 'disabled' : ''}>
                    ${challenge.completed ? 'Completed' : 'Start'}
                </button>
            </div>
        `).join('');

        // Add click handlers for challenges
        challengeList.querySelectorAll('.challenge-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const challengeId = e.target.closest('.challenge-card').dataset.id;
                this.startChallenge(challengeId);
            });
        });
    },

    startChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge && !challenge.completed) {
            // Simulate challenge completion
            setTimeout(() => {
                this.completeChallenge(challengeId);
            }, 2000);
        }
    },

    completeChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (challenge) {
            challenge.completed = true;
            this.addXP(challenge.xp);
            this.renderChallenges();
            this.showReward(`Challenge Complete! +${challenge.xp} XP`);
        }
    },

    checkDailyLogin() {
        const today = new Date().toDateString();
        if (this.userStats.lastActive !== today) {
            this.userStats.lastActive = today;
            if (this.isConsecutiveDay()) {
                this.userStats.streak++;
                this.showReward(`🔥 ${this.userStats.streak} Day Streak!`);
            } else {
                this.userStats.streak = 1;
            }
            this.saveUserStats();
            this.updateStreakCount();
        }
    },

    isConsecutiveDay() {
        const lastActive = new Date(this.userStats.lastActive);
        const today = new Date();
        const diffTime = Math.abs(today - lastActive);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 1;
    },

    updateStreakCount() {
        const streakElement = document.querySelector('.streak-count');
        if (streakElement) {
            streakElement.textContent = `🔥 ${this.userStats.streak} day streak`;
        }
    },

    addXP(amount) {
        this.userStats.xp += amount;
        this.updateXPBar();
        this.checkLevelUp();
        this.saveUserStats();
    },

    updateXPBar() {
        const xpProgress = document.querySelector('.xp-progress');
        if (xpProgress) {
            const nextLevel = this.userStats.level * 1000;
            const progress = (this.userStats.xp % 1000) / 10;
            xpProgress.style.width = `${progress}%`;
        }
    },

    checkLevelUp() {
        const newLevel = Math.floor(this.userStats.xp / 1000) + 1;
        if (newLevel > this.userStats.level) {
            this.userStats.level = newLevel;
            this.showReward(`Level Up! You're now level ${newLevel}`);
        }
    },

    showReward(message) {
        const popup = document.createElement('div');
        popup.className = 'reward-popup';
        popup.innerHTML = `
            <h3>${message}</h3>
            <div class="confetti"></div>
        `;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 3000);
    }
};

// Initialize gamification after DOM content loads
document.addEventListener('DOMContentLoaded', () => {
    gamification.init();
});

// Modify the existing selectAnswer function in skillAssessment
const originalSelectAnswer = skillAssessment.selectAnswer;
skillAssessment.selectAnswer = function(answer) {
    originalSelectAnswer.call(this, answer);
    
    // Add XP for completing a question
    gamification.addXP(50);
    
    // Check for perfect score achievement
    if (this.currentQuestion === 4) {
        const totalScore = Object.values(this.answers).flat()
            .filter(a => a === "Advanced" || a === "3+ languages" || a === "Extensive experience").length;
        
        if (totalScore === 4) {
            const perfectScoreBadge = gamification.badges.find(b => b.id === 'perfect-score');
            if (perfectScoreBadge && !gamification.userStats.completedBadges.includes('perfect-score')) {
                gamification.userStats.completedBadges.push('perfect-score');
                gamification.showReward('🎯 Perfect Score Badge Earned!');
                gamification.saveUserStats();
                gamification.renderBadges();
            }
        }
    }
};
