// Enhanced progress tracking system
const progressTracker = {
    userProgress: {
        courses: {},
        skills: {},
        overallProgress: 0,
        milestones: [],
        lastUpdated: null
    },

    // Initialize progress tracking
    init() {
        this.loadProgress();
        this.initializeProgressBars();
        this.setupProgressEvents();
        this.initializeInteractiveElements();
    },

    // Load saved progress from localStorage
    loadProgress() {
        const savedProgress = localStorage.getItem('userProgress');
        if (savedProgress) {
            this.userProgress = JSON.parse(savedProgress);
        }
    },

    // Save progress to localStorage
    saveProgress() {
        this.userProgress.lastUpdated = new Date().toISOString();
        localStorage.setItem('userProgress', JSON.stringify(this.userProgress));
        this.updateUI();
    },

    // Initialize progress bars for all tracked items
    initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const indicator = bar.querySelector('.progress-indicator');
            if (indicator) {
                indicator.style.width = `${this.userProgress.overallProgress}%`;
            }
        });
    },

    // Update course progress
    updateCourseProgress(courseId, progress) {
        if (!this.userProgress.courses[courseId]) {
            this.userProgress.courses[courseId] = {
                progress: 0,
                completedModules: [],
                timeSpent: 0,
                lastAccessed: null
            };
        }
        
        this.userProgress.courses[courseId].progress = Math.min(100, progress);
        this.userProgress.courses[courseId].lastAccessed = new Date().toISOString();
        this.recalculateOverallProgress();
        this.checkMilestones();
        this.saveProgress();
        
        // Integrate with gamification system
        if (progress === 100) {
            gamification.addXP(500);
            this.awardCourseCompletionBadge(courseId);
        }
    },

    // Update skill progress
    updateSkillProgress(skillId, level) {
        if (!this.userProgress.skills[skillId]) {
            this.userProgress.skills[skillId] = {
                level: 0,
                exercises: [],
                assessments: []
            };
        }
        
        this.userProgress.skills[skillId].level = level;
        this.recalculateOverallProgress();
        this.saveProgress();
    },

    // Recalculate overall progress
    recalculateOverallProgress() {
        const courseProgresses = Object.values(this.userProgress.courses)
            .map(course => course.progress);
        const skillLevels = Object.values(this.userProgress.skills)
            .map(skill => (skill.level / 3) * 100); // Assuming max level is 3
        
        const totalItems = courseProgresses.length + skillLevels.length;
        const totalProgress = [...courseProgresses, ...skillLevels]
            .reduce((sum, val) => sum + val, 0);
        
        this.userProgress.overallProgress = totalItems > 0 
            ? Math.round(totalProgress / totalItems) 
            : 0;
    },

    // Check and award milestones
    checkMilestones() {
        const milestones = [
            { id: 'first-course', name: 'First Course Started', threshold: 1 },
            { id: 'quarter-way', name: '25% Complete', threshold: 25 },
            { id: 'halfway', name: '50% Complete', threshold: 50 },
            { id: 'almost-there', name: '75% Complete', threshold: 75 },
            { id: 'completion', name: 'Journey Complete', threshold: 100 }
        ];

        milestones.forEach(milestone => {
            if (this.userProgress.overallProgress >= milestone.threshold && 
                !this.userProgress.milestones.includes(milestone.id)) {
                this.userProgress.milestones.push(milestone.id);
                this.showMilestoneAchieved(milestone);
            }
        });
    },

    // Show milestone achievement popup
    showMilestoneAchieved(milestone) {
        const popup = document.createElement('div');
        popup.className = 'milestone-popup';
        popup.innerHTML = `
            <div class="milestone-content">
                <h3>🎉 Milestone Achieved!</h3>
                <p>${milestone.name}</p>
                <div class="progress-bar">
                    <div class="progress-indicator" style="width: ${this.userProgress.overallProgress}%"></div>
                </div>
                <p>${this.userProgress.overallProgress}% Complete</p>
            </div>
        `;
        document.body.appendChild(popup);

        // Trigger gamification reward
        gamification.addXP(250);
        
        setTimeout(() => {
            popup.remove();
        }, 3000);
    },

    // Initialize interactive elements
    initializeInteractiveElements() {
        // Add interactive course cards
        const courseCards = document.querySelectorAll('.course-item');
        courseCards.forEach(card => {
            card.addEventListener('click', () => {
                this.showCourseDetails(card.dataset.courseId);
            });
        });

        // Add progress assessment button functionality
        const assessmentButton = document.querySelector('.progress-tracking button');
        if (assessmentButton) {
            assessmentButton.addEventListener('click', () => {
                this.startProgressAssessment();
            });
        }
    },

    // Show detailed course progress
    showCourseDetails(courseId) {
        const courseProgress = this.userProgress.courses[courseId];
        if (!courseProgress) return;

        const modal = document.createElement('div');
        modal.className = 'course-progress-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Course Progress</h3>
                <div class="progress-details">
                    <p>Progress: ${courseProgress.progress}%</p>
                    <p>Completed Modules: ${courseProgress.completedModules.length}</p>
                    <p>Time Spent: ${Math.round(courseProgress.timeSpent / 60)} hours</p>
                    <p>Last Accessed: ${new Date(courseProgress.lastAccessed).toLocaleDateString()}</p>
                </div>
                <button class="close-modal">Close</button>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    },

    // Start progress assessment
    startProgressAssessment() {
        skillAssessment.startAssessment();
    },

    // Update UI elements
    updateUI() {
        // Update progress bars
        const progressBars = document.querySelectorAll('.progress-bar .progress-indicator');
        progressBars.forEach(bar => {
            bar.style.width = `${this.userProgress.overallProgress}%`;
        });

        // Update skill levels in skill tree
        Object.entries(this.userProgress.skills).forEach(([skillId, skill]) => {
            const skillNode = document.querySelector(`[data-skill-id="${skillId}"]`);
            if (skillNode) {
                skillNode.dataset.level = skill.level;
                skillNode.classList.toggle('completed', skill.level === 3);
            }
        });
    },

    // Award course completion badge
    awardCourseCompletionBadge(courseId) {
        const badge = {
            id: `course-${courseId}`,
            name: 'Course Master',
            icon: '🎓',
            description: 'Completed a full course'
        };
        
        if (!gamification.userStats.completedBadges.includes(badge.id)) {
            gamification.userStats.completedBadges.push(badge.id);
            gamification.showReward('🎓 New Badge: Course Master');
            gamification.saveUserStats();
            gamification.renderBadges();
        }
    }
};

// Initialize progress tracker after DOM content loads
document.addEventListener('DOMContentLoaded', () => {
    progressTracker.init();
});

// Integrate with existing skill assessment
const originalShowResults = skillAssessment.showResults;
skillAssessment.showResults = function() {
    originalShowResults.call(this);
    
    // Update skill progress based on assessment results
    Object.entries(this.answers).forEach(([category, answers]) => {
        const level = this.calculateLevel(answers);
        progressTracker.updateSkillProgress(category, {
            'beginner': 1,
            'intermediate': 2,
            'advanced': 3
        }[level]);
    });
};