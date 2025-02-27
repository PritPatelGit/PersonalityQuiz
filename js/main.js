document.addEventListener("DOMContentLoaded", () => {
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

        // Get random questions from allQuestions array
        quizQuestions = [...allQuestions]
            .sort(() => Math.random() - 0.5)
            .slice(0, totalQuestions);
        
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
        questionContainer.innerHTML = `<h2>Question ${currentQuestionIndex + 1}: ${questionData.question}</h2>`;
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
        document.getElementById("quiz-setup").classList.remove("hidden");
    });

    function showResults() {
        quizContainer.classList.add("hidden");
        resultsContainer.classList.remove("hidden");

        // Calculate personality type based on answers
        const personalities = Object.keys(personalityProfiles);
        const personalityIndex = selectedAnswers.reduce((sum, val) => sum + val, 0) % personalities.length;
        const personalityType = personalities[personalityIndex];

        // Get personality profile
        const profile = personalityProfiles[personalityType];

        // Display detailed result
        resultContent.innerHTML = `
            <h3>${profile.title}</h3>
            <p class="message">${profile.message}</p>
            
            <div class="profile-section">
                <h4>Your Key Strengths:</h4>
                <ul>
                    ${profile.strengths.map(strength => `<li>${strength}</li>`).join('')}
                </ul>
            </div>

            <div class="profile-section">
                <h4>Career Paths That Suit You:</h4>
                <ul>
                    ${profile.career.map(career => `<li>${career}</li>`).join('')}
                </ul>
            </div>

            <div class="profile-section">
                <h4>In Relationships:</h4>
                <p>${profile.relationships}</p>
            </div>

            <div class="profile-section">
                <h4>Area for Growth:</h4>
                <p>${profile.growth}</p>
            </div>

            <div class="quote-section">
                <blockquote>${profile.quote}</blockquote>
            </div>
        `;

        // Add share button event listeners
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', () => shareResult(btn.dataset.platform, personalityType));
        });
    }

    function shareResult(platform, personalityType) {
        const text = `I got "${personalityProfiles[personalityType].title}" in this amazing personality quiz!`;
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
