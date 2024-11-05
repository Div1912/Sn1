document.addEventListener("DOMContentLoaded", function() {
    // Placeholder for user data; could be fetched from a backend in a real scenario
    const userName = 'Divyanshu Singh';
    const enrolledCourses = ['Graphic Designing', 'Web Development'];
    const recommendedCourses = ['Data Science', 'AI & Machine Learning'];
  
    document.querySelector('.dashboard-container h1').innerText = `Welcome, ${userName}!`;
  
    const enrolledCoursesList = document.getElementById('enrolled-courses');
    enrolledCourses.forEach(course => {
      const listItem = document.createElement('li');
      listItem.textContent = course;
      enrolledCoursesList.appendChild(listItem);
    });
  
    const recommendedCoursesList = document.getElementById('recommended-courses');
    recommendedCourses.forEach(course => {
      const listItem = document.createElement('li');
      listItem.textContent = course;
      recommendedCoursesList.appendChild(listItem);
    });
  
   // Basic AI recommendation logic
   function recommendNewCourses(currentCourses) {
    const allCourses = {
      'Graphic Designing': ['Advanced Graphic Design', 'Digital Illustration'],
      'Web Development': ['React.js Advanced', 'Node.js & Express'],
      'Data Science': ['Machine Learning', 'Deep Learning'],
      'AI & Machine Learning': ['Neural Networks', 'Reinforcement Learning']
    };

    currentCourses.forEach(course => {
      if (allCourses[course]) {
        learningPathSection.push(...allCourses[course]);
      }
    });

    return learningPathSection;
  }

  const aiRecommendations = recommendNewCourses(enrolledCourses);
  aiRecommendations.forEach(course => {
    const listItem = document.createElement('li');
    listItem.textContent = course;
    recommendedCoursesList.appendChild(listItem);
  });

  const learningPathList = document.createElement('ul');
  learningPathSection.forEach(course => {
    const listItem = document.createElement('li');
    listItem.textContent = course;
    learningPathList.appendChild(listItem);
  });

  const learningPathSection = document.createElement('section');
  learningPathSection.innerHTML = `<h2>Your Learning Path</h2>`;
  learningPathSection.appendChild(learningPathList);
  document.querySelector('.dashboard-container').appendChild(learningPathSection);
});

