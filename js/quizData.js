const allQuestions = [
    { 
        question: "What do you prefer?", 
        options: ["Adventure", "Creativity", "Logic", "Socializing"],
        insights: [
            "You're drawn to excitement and new experiences!",
            "You have a natural artistic flair!",
            "You appreciate structured thinking!",
            "You thrive on human connections!"
        ]
    },
    { 
        question: "How do you solve problems?", 
        options: ["Trial & error", "Innovative ideas", "Step-by-step analysis", "Team discussions"],
        insights: [
            "Your hands-on approach leads to practical solutions!",
            "Your creative problem-solving is unique!",
            "Your methodical approach ensures accuracy!",
            "Your collaborative spirit brings people together!"
        ]
    },
    { question: "What is your favorite color?", options: ["Red", "Blue", "Green", "Yellow"] },
    { question: "Which animal do you like most?", options: ["Dog", "Cat", "Bird", "Elephant"] },
    { question: "What's your ideal vacation?", options: ["Beach", "Mountains", "City", "Countryside"] },
    { question: "What time of day do you prefer?", options: ["Morning", "Afternoon", "Evening", "Night"] },
    { question: "Pick a hobby:", options: ["Reading", "Sports", "Gaming", "Music"] }
];

const personalityProfiles = {
    "Adventurous": {
        title: "The Fearless Explorer!",
        message: "You have a thrill-seeking nature and a drive for excitement. Your boldness and courage inspire those around you!",
        strengths: [
            "Natural leader in challenging situations",
            "Quick to adapt to new environments",
            "Thrives under pressure",
            "Inspires others to take positive risks"
        ],
        career: [
            "Outdoor Guide",
            "Travel Photographer",
            "Emergency Response",
            "Sports Professional"
        ],
        relationships: "You bring excitement and spontaneity to relationships. People are drawn to your confident and adventurous spirit.",
        growth: "Consider balancing your adventurous spirit with moments of reflection and planning.",
        quote: "Life is either a daring adventure or nothing at all. - Helen Keller"
    },
    "Creative": {
        title: "The Innovative Dreamer!",
        message: "Your imagination knows no bounds. You bring fresh perspectives and artistic vision to the world!",
        strengths: [
            "Unique problem-solving approach",
            "Strong artistic expression",
            "Emotional intelligence",
            "Original thinking"
        ],
        career: [
            "Artist or Designer",
            "Writer or Content Creator",
            "Innovation Consultant",
            "Creative Director"
        ],
        relationships: "Your emotional depth and creative expression make relationships rich and meaningful.",
        growth: "Practice turning your creative ideas into concrete actions.",
        quote: "Creativity is intelligence having fun. - Albert Einstein"
    },
    "Analytical": {
        title: "The Logical Thinker!",
        message: "You approach challenges with reason and precision. Your mind is a powerhouse of problem-solving!",
        strengths: [
            "Excellence in critical thinking",
            "Detail-oriented approach",
            "Strong decision-making skills",
            "Systematic problem solving"
        ],
        career: [
            "Data Analyst",
            "Research Scientist",
            "Software Engineer",
            "Strategic Planner"
        ],
        relationships: "You bring clarity and stability to relationships through your thoughtful approach.",
        growth: "Remember to embrace emotional aspects alongside logical thinking.",
        quote: "In the middle of difficulty lies opportunity. - Albert Einstein"
    },
    "Social": {
        title: "The Charismatic Connector!",
        message: "You thrive in social settings, making meaningful connections. Your energy and charm light up the room!",
        strengths: [
            "Natural networking ability",
            "Strong empathy and understanding",
            "Excellent communication skills",
            "Team building expertise"
        ],
        career: [
            "Public Relations",
            "Human Resources",
            "Sales Leadership",
            "Community Management"
        ],
        relationships: "You excel at building and maintaining meaningful relationships with diverse groups of people.",
        growth: "Focus on developing deep, lasting connections beyond surface-level interactions.",
        quote: "Alone we can do so little; together we can do so much. - Helen Keller"
    }
};
