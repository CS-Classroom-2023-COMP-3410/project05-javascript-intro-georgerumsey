// JavaScript code for the interactive to-do list project
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const clearCompletedButton = document.getElementById('clearCompletedButton');
    const filterSelect = document.getElementById('filterTasks');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        const filteredTasks = filterTasks(tasks, filterSelect.value);
        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;
            li.className = task.completed ? 'completed' : '';
            li.draggable = true;
            li.ondragstart = (event) => dragStart(event, index);
            li.ondragover = (event) => dragOver(event);
            li.ondrop = (event) => drop(event, index);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editTask(index);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteTask(index);

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Undo' : 'Complete';
            completeButton.onclick = () => toggleComplete(index);

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            li.appendChild(completeButton);
            taskList.appendChild(li);
        });
    }

    function filterTasks(tasks, filter) {
        if (filter === 'completed') {
            return tasks.filter(task => task.completed);
        } else if (filter === 'pending') {
            return tasks.filter(task => !task.completed);
        }
        return tasks;
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }

    function editTask(index) {
        const newTaskText = prompt('Edit task:', tasks[index].text);
        if (newTaskText !== null) {
            tasks[index].text = newTaskText;
            saveTasks();
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function dragStart(event, index) {
        event.dataTransfer.setData('text/plain', index);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event, index) {
        event.preventDefault();
        const draggedIndex = event.dataTransfer.getData('text/plain');
        const draggedTask = tasks.splice(draggedIndex, 1)[0];
        tasks.splice(index, 0, draggedTask);
        saveTasks();
        renderTasks();
    }

    addTaskButton.addEventListener('click', addTask);
    clearCompletedButton.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    });
    filterSelect.addEventListener('change', renderTasks);
    renderTasks();
});