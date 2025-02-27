document.addEventListener("DOMContentLoaded", () => {
    // Theme switching functionality
    const themeBtn = document.getElementById('theme-switch');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    applyTheme(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    });

    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeBtn.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    const startQuizBtn = document.getElementById("start-quiz");
    const questionCountInput = document.getElementById("question-count");
    const quizContainer = document.getElementById("quiz-container");
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const progressBar = document.querySelector(".progress");
    const resultsContainer = document.getElementById("results-container");
    const resultContent = document.getElementById("result-content");
    const retakeQuizBtn = document.getElementById("retake-quiz");

    let currentQuestionIndex = 0;
    let selectedAnswers = [];
    let quizQuestions = [];

    const allQuestions = [
        { question: "What do you prefer?", options: ["Adventure", "Creativity", "Logic", "Socializing"] },
        { question: "How do you solve problems?", options: ["Trial & error", "Innovative ideas", "Step-by-step analysis", "Team discussions"] },
        { question: "Your ideal weekend?", options: ["Hiking", "Painting", "Reading", "Party"] },
        { question: "How do you handle stress?", options: ["Excitement", "Self-expression", "Logic", "Talking with friends"] },
        { question: "What motivates you?", options: ["New experiences", "Art & ideas", "Solving problems", "People & relationships"] }
    ];

    startQuizBtn.addEventListener("click", () => {
        let totalQuestions = parseInt(questionCountInput.value);
        if (totalQuestions < 1 || totalQuestions > 10) {
            alert("Please choose between 1 and 10 questions.");
            return;
        }

        quizQuestions = allQuestions.slice(0, totalQuestions);
        currentQuestionIndex = 0;
        selectedAnswers = [];

        quizContainer.classList.remove("hidden");
        resultsContainer.classList.add("hidden");

        showQuestion();
    });

    function showQuestion() {
        if (currentQuestionIndex >= quizQuestions.length) {
            showResults();
            return;
        }

        const questionData = quizQuestions[currentQuestionIndex];
        questionContainer.innerHTML = `<h2>${questionData.question}</h2>`;
        optionsContainer.innerHTML = "";

        questionData.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.classList.add("btn");
            button.innerText = option;
            button.addEventListener("click", () => {
                selectedAnswers.push(index);
                currentQuestionIndex++;
                showQuestion();
            });
            optionsContainer.appendChild(button);
        });

        progressBar.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;
    }

    retakeQuizBtn.addEventListener("click", () => {
        quizContainer.classList.add("hidden");
        resultsContainer.classList.add("hidden");
    });

    function showResults() {
        quizContainer.classList.add("hidden");
        resultsContainer.classList.remove("hidden");

        // Calculate personality type
        const personalityIndex = selectedAnswers.reduce((sum, val) => sum + val, 0) % 4;
        const personalityType = Object.keys(personalityProfiles)[personalityIndex];
        const profile = personalityProfiles[personalityType];

        // Collect insights from answers
        const insights = selectedAnswers.map((answer, index) => 
            quizQuestions[index].insights[answer]
        );

        // Display detailed results
        resultContent.innerHTML = `
            <div class="personality-result">
                <h3>${profile.title}</h3>
                <p class="main-message">${profile.message}</p>
                
                <div class="insights-section">
                    <h4>Your Response Insights:</h4>
                    <ul class="insights-list">
                        ${insights.map(insight => `<li>${insight}</li>`).join('')}
                    </ul>
                </div>

                <div class="strengths-section">
                    <h4>Your Key Strengths:</h4>
                    <ul class="strengths-list">
                        ${profile.strengths.map(strength => `<li>${strength}</li>`).join('')}
                    </ul>
                </div>

                <div class="career-section">
                    <h4>Recommended Career Paths:</h4>
                    <ul class="career-list">
                        ${profile.career.map(career => `<li>${career}</li>`).join('')}
                    </ul>
                </div>

                <div class="relationship-section">
                    <h4>In Relationships:</h4>
                    <p>${profile.relationships}</p>
                </div>

                <div class="growth-section">
                    <h4>Growth Opportunity:</h4>
                    <p>${profile.growth}</p>
                </div>

                <div class="quote-section">
                    <blockquote>${profile.quote}</blockquote>
                </div>
            </div>
        `;

        // Add share button event listeners
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', () => shareResult(btn.dataset.platform, profile.title));
        });
    }

    function shareResult(platform, personalityType) {
        const text = `I got ${personalityType} personality type in this amazing quiz!`;
        const url = window.location.href;
        let shareUrl;

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }
});
