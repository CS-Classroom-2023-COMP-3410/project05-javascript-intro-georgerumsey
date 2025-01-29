// This file contains the JavaScript code for the sorting visualization tool, managing sorting algorithms, animations, and commentary.

const arraySize = 50;
let array = [];
let algorithm = 'bubble';
let speed = 100;
let isSorting = false;

function setup() {
    array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100));
    drawArray();
    updateCommentary('Array initialized.');
}

function drawArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.style.height = `${value * 3}px`;
        bar.style.width = '10px';
        bar.style.backgroundColor = 'blue';
        bar.style.margin = '0 1px';
        bar.style.display = 'inline-block';
        container.appendChild(bar);
    });
}

function updateCommentary(text) {
    const commentary = document.getElementById('commentary');
    commentary.innerText = text;
}

async function bubbleSort() {
    isSorting = true;
    updateCommentary('Starting Bubble Sort... Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. This process is repeated until the list is sorted.');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray();
                updateCommentary(`Swapped elements at index ${j} and ${j + 1}`);
                await new Promise(resolve => setTimeout(resolve, speed));
            }
        }
    }
    updateCommentary('Bubble Sort completed.');
    isSorting = false;
}

async function selectionSort() {
    isSorting = true;
    updateCommentary('Starting Selection Sort... Selection Sort divides the list into two parts: a sorted and an unsorted part. It repeatedly selects the smallest element from the unsorted part and moves it to the sorted part.');
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        drawArray();
        updateCommentary(`Swapped elements at index ${i} and ${minIndex}`);
        await new Promise(resolve => setTimeout(resolve, speed));
    }
    updateCommentary('Selection Sort completed.');
    isSorting = false;
}

async function insertionSort() {
    isSorting = true;
    updateCommentary('Starting Insertion Sort... Insertion Sort builds the final sorted array one item at a time. It takes each element from the input and finds the correct position within the sorted part.');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
            drawArray();
            updateCommentary(`Moved element at index ${j + 1} to index ${j + 2}`);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
        array[j + 1] = key;
        drawArray();
        updateCommentary(`Inserted element at index ${i} to index ${j + 1}`);
        await new Promise(resolve => setTimeout(resolve, speed));
    }
    updateCommentary('Insertion Sort completed.');
    isSorting = false;
}

function startSorting() {
    if (isSorting) return;
    if (algorithm === 'bubble') {
        bubbleSort();
    } else if (algorithm === 'selection') {
        selectionSort();
    } else if (algorithm === 'insertion') {
        insertionSort();
    }
}

function resetArray() {
    if (isSorting) return;
    setup();
}

document.getElementById('bubble-sort').addEventListener('click', () => {
    algorithm = 'bubble';
    startSorting();
});

document.getElementById('selection-sort').addEventListener('click', () => {
    algorithm = 'selection';
    startSorting();
});

document.getElementById('insertion-sort').addEventListener('click', () => {
    algorithm = 'insertion';
    startSorting();
});

document.getElementById('speed').addEventListener('input', (event) => {
    speed = 1000 - event.target.value;
});

document.getElementById('reset-button').addEventListener('click', resetArray);

setup();