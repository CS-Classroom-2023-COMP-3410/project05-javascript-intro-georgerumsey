function startKeyboardTrainer() {
    const textDisplay = document.getElementById('text-display');
    const userInput = document.getElementById('user-input');
    const speedDisplay = document.getElementById('speed');
    const accuracyDisplay = document.getElementById('accuracy');
    const restartButton = document.getElementById('restart');
    const difficultySelect = document.getElementById('difficulty');

    const texts = {
        easy: [
            "The quick brown fox jumps over the lazy dog.",
            "A journey of a thousand miles begins with a single step."
        ],
        medium: [
            "To be or not to be, that is the question.",
            "All that glitters is not gold."
        ],
        hard: [
            "In the middle of difficulty lies opportunity.",
            "She sells seashells by the seashore."
        ]
    };

    let currentText = '';
    let startTime;
    let isTyping = false;
    let mistakes = 0;

    function getRandomText(difficulty) {
        const textArray = texts[difficulty];
        return textArray[Math.floor(Math.random() * textArray.length)];
    }

    function startGame() {
        const difficulty = difficultySelect.value;
        currentText = getRandomText(difficulty);
        textDisplay.textContent = currentText;
        userInput.value = '';
        speedDisplay.textContent = '';
        accuracyDisplay.textContent = '';
        isTyping = true;
        startTime = new Date();
        mistakes = 0;
        userInput.focus();
    }

    function checkInput() {
        if (!isTyping) return;

        const typedText = userInput.value;
        if (typedText === currentText) {
            const endTime = new Date();
            const timeTaken = (endTime - startTime) / 1000; // in seconds
            const accuracy = calculateAccuracy(typedText, currentText);
            const wpm = calculateWPM(typedText, timeTaken);
            speedDisplay.textContent = `Speed: ${wpm} WPM`;
            accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;
            isTyping = false;
        } else {
            highlightErrors(typedText);
        }
    }

    function calculateAccuracy(typedText, originalText) {
        const typedArray = typedText.split('');
        const originalArray = originalText.split('');
        let correctChars = 0;

        typedArray.forEach((char, index) => {
            if (char === originalArray[index]) {
                correctChars++;
            }
        });

        const totalChars = originalArray.length;
        const incorrectChars = mistakes + (totalChars - typedArray.length);

        return ((correctChars / (correctChars + incorrectChars)) * 100).toFixed(2);
    }

    function calculateWPM(typedText, timeTaken) {
        const words = typedText.split(' ').length;
        return ((words / timeTaken) * 60).toFixed(2);
    }

    function highlightErrors(typedText) {
        const textArray = currentText.split('');
        const typedArray = typedText.split('');
        const highlightedText = textArray.map((char, index) => {
            if (index < typedArray.length) {
                if (typedArray[index] === char) {
                    return `<span class="correct" style="background-color: green; color: white;">${char}</span>`;
                } else {
                    mistakes++;
                    return `<span class="incorrect" style="background-color: red; color: white;">${char}</span>`;
                }
            } else {
                return char;
            }
        }).join('');
        textDisplay.innerHTML = highlightedText;
    }

    userInput.addEventListener('input', checkInput);
    restartButton.addEventListener('click', startGame);
    difficultySelect.addEventListener('change', startGame);

    startGame();
}

document.addEventListener('DOMContentLoaded', startKeyboardTrainer);