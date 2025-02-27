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
        
        // Calculate personality type based on answers
        const personalities = ["Adventurous", "Creative", "Analytical", "Social"];
        const personalityIndex = selectedAnswers.reduce((sum, val) => sum + val, 0) % personalities.length;
        const personalityType = personalities[personalityIndex];
        
        resultContent.innerHTML = `
            <h3>Your personality type is ${personalityType}!</h3>
            <p>Based on your answers, you have a unique perspective on life.</p>
        `;

        // Add share button event listeners
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', () => shareResult(btn.dataset.platform, personalityType));
        });
    }

    // Add this new function for sharing
    function shareResult(platform, personalityType) {
        const text = `I got ${personalityType} personality type in this amazing quiz!`;
        const url = window.location.href;
        let shareUrl;

        switch(platform) {
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
