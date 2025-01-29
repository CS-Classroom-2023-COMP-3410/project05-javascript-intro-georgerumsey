// This file contains the JavaScript code for the interactive story game, managing narrative branching, progress tracking, and localStorage.

const story = {
    start: {
        text: "You wake up in a mysterious forest. What do you want to do?",
        options: [
            { text: "Explore the forest", next: "explore" },
            { text: "Build a shelter", next: "shelter" }
        ]
    },
    explore: {
        text: "You find a hidden path. Do you want to follow it?",
        options: [
            { text: "Yes", next: "hiddenPath" },
            { text: "No", next: "stay" }
        ]
    },
    shelter: {
        text: "You build a shelter. It's getting dark. What now?",
        options: [
            { text: "Light a fire", next: "fire" },
            { text: "Go to sleep", next: "sleep" }
        ]
    },
    hiddenPath: {
        text: "You discover a treasure chest! What do you want to do?",
        options: [
            { text: "Open it", next: "openChest" },
            { text: "Leave it", next: "leaveChest" }
        ]
    },
    stay: {
        text: "You decide to stay put. Suddenly, you hear a noise...",
        options: [
            { text: "Investigate", next: "investigate" },
            { text: "Run away", next: "runAway" }
        ]
    },
    fire: {
        text: "You light a fire and feel warm. Do you want to cook some food?",
        options: [
            { text: "Yes", next: "cookFood" },
            { text: "No", next: "sleep" }
        ]
    },
    sleep: {
        text: "You go to sleep and wake up refreshed. What do you want to do next?",
        options: [
            { text: "Explore the forest", next: "explore" },
            { text: "Stay at the shelter", next: "stayShelter" }
        ]
    },
    cookFood: {
        text: "You cook some food and feel energized. What do you want to do next?",
        options: [
            { text: "Explore the forest", next: "explore" },
            { text: "Stay at the shelter", next: "stayShelter" }
        ]
    },
    stayShelter: {
        text: "You stay at the shelter and hear a noise outside. What do you want to do?",
        options: [
            { text: "Investigate", next: "investigate" },
            { text: "Stay inside", next: "stayInside" }
        ]
    },
    investigate: {
        text: "You investigate the noise and find a friendly animal. What do you want to do?",
        options: [
            { text: "Befriend the animal", next: "befriendAnimal" },
            { text: "Ignore the animal", next: "ignoreAnimal" }
        ]
    },
    runAway: {
        text: "You run away and find yourself at a crossroads. Which way do you want to go?",
        options: [
            { text: "Left", next: "leftPath" },
            { text: "Right", next: "rightPath" }
        ]
    },
    befriendAnimal: {
        text: "You befriend the animal and it leads you to a hidden treasure. You win!",
        options: [
            { text: "Restart", next: "start" }
        ]
    },
    ignoreAnimal: {
        text: "You ignore the animal and continue your journey. What do you want to do next?",
        options: [
            { text: "Explore the forest", next: "explore" },
            { text: "Stay at the shelter", next: "stayShelter" }
        ]
    },
    leftPath: {
        text: "You take the left path and find a river. What do you want to do?",
        options: [
            { text: "Cross the river", next: "crossRiver" },
            { text: "Follow the river", next: "followRiver" }
        ]
    },
    rightPath: {
        text: "You take the right path and find a cave. What do you want to do?",
        options: [
            { text: "Enter the cave", next: "enterCave" },
            { text: "Avoid the cave", next: "avoidCave" }
        ]
    },
    crossRiver: {
        text: "You cross the river and find a village. You win!",
        options: [
            { text: "Restart", next: "start" }
        ]
    },
    followRiver: {
        text: "You follow the river and find a waterfall. What do you want to do?",
        options: [
            { text: "Climb the waterfall", next: "climbWaterfall" },
            { text: "Stay by the river", next: "stayRiver" }
        ]
    },
    enterCave: {
        text: "You enter the cave and find a sleeping dragon. What do you want to do?",
        options: [
            { text: "Sneak past the dragon", next: "sneakDragon" },
            { text: "Leave the cave", next: "leaveCave" }
        ]
    },
    avoidCave: {
        text: "You avoid the cave and continue your journey. What do you want to do next?",
        options: [
            { text: "Explore the forest", next: "explore" },
            { text: "Stay at the shelter", next: "stayShelter" }
        ]
    },
    climbWaterfall: {
        text: "You climb the waterfall and find a hidden cave. You win!",
        options: [
            { text: "Restart", next: "start" }
        ]
    },
    stayRiver: {
        text: "You stay by the river and enjoy the peaceful surroundings. What do you want to do next?",
        options: [
            { text: "Explore the forest", next: "explore" },
            { text: "Stay at the shelter", next: "stayShelter" }
        ]
    },
    sneakDragon: {
        text: "You sneak past the dragon and find a treasure. You win!",
        options: [
            { text: "Restart", next: "start" }
        ]
    },
    leaveCave: {
        text: "You leave the cave and continue your journey. What do you want to do next?",
        options: [
            { text: "Explore the forest", next: "explore" },
            { text: "Stay at the shelter", next: "stayShelter" }
        ]
    }
};

let currentNode = 'start';
let progress = [];

function displayStory() {
    const storyText = document.getElementById('story-text');
    const optionsContainer = document.getElementById('choices'); // Updated ID

    storyText.innerText = story[currentNode].text;
    optionsContainer.innerHTML = '';

    story[currentNode].options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.onclick = () => selectOption(option.next, option.text);
        optionsContainer.appendChild(button);
    });
}

function selectOption(nextNode, chosenOptionText) {
    progress.push({ node: currentNode, choice: chosenOptionText });
    currentNode = nextNode;
    displayStory();
    saveProgress();
    displayProgress(); // Update progress display immediately
}

function displayProgress() {
    const progressContainer = document.getElementById('progress');
    progressContainer.innerHTML = ''; // Clear previous progress

    progress.forEach(entry => {
        const progressItem = document.createElement('div');
        progressItem.innerText = `${story[entry.node].text} - You chose: ${entry.choice}`;
        progressContainer.appendChild(progressItem);
    });
}

function saveProgress() {
    localStorage.setItem('storyProgress', JSON.stringify(progress));
    localStorage.setItem('currentNode', currentNode); // Save current node
}

function loadProgress() {
    const savedProgress = JSON.parse(localStorage.getItem('storyProgress'));
    const savedNode = localStorage.getItem('currentNode'); // Load current node
    if (savedProgress && savedNode) {
        progress = savedProgress;
        currentNode = savedNode;
    }
}

function resetGame() {
    localStorage.removeItem('storyProgress');
    localStorage.removeItem('currentNode'); // Remove current node
    progress = [];
    currentNode = 'start';
    displayStory();
    displayProgress(); // Clear progress display
}

document.getElementById('reset-button').onclick = resetGame;

// Update the restart option to use the resetGame function
story.befriendAnimal.options[0].onclick = resetGame;
story.crossRiver.options[0].onclick = resetGame;
story.climbWaterfall.options[0].onclick = resetGame;
story.sneakDragon.options[0].onclick = resetGame;

loadProgress();
displayStory();
displayProgress(); // Initial progress display