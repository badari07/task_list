const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

(function () {
    form.addEventListener('submit', addtask);
    clearBtn.addEventListener('click', removeAlltask);
    taskList.addEventListener('click', removetask);
    filter.addEventListener('keyup', filterTask);
    document.addEventListener('DOMContentLoaded', getTask);
})();

function localStorageLoop() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    };
    return tasks;
}


function getTask() {
    let tasks = localStorageLoop();

    // let tasks;
    // if (localStorage.getItem('tasks') === null) {
    //     tasks = [];
    // } else {
    //     tasks = JSON.parse(localStorage.getItem('tasks'));

    // };

    tasks.forEach(cur => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(cur))


        const link = document.createElement('a');
        link.className = 'delete-item secondary-content ';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        taskList.appendChild(li);

    })


};


function addtask(e) {
    if (taskInput.value === '') {
        alert('add task');
    } else {

        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value))


        const link = document.createElement('a');
        link.className = 'delete-item secondary-content ';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        taskList.appendChild(li);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = '';

        e.preventDefault();
    }
};

function storeTaskInLocalStorage(task) {
    let tasks = localStorageLoop();

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));


};

function removetask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure')) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }
};

function removeTaskFromLS(taskItem) {
    let tasks = localStorageLoop();

    tasks.forEach((cur, index) => {
        if (taskItem.textContent === cur) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeAlltask(e) {
    // taskList.innerHTML = '';

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    clearTaskFromLs();
};


function clearTaskFromLs() {
    localStorage.clear();
}


function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(cur => {
        const item = cur.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            cur.style.display = 'block';
        } else {
            cur.style.display = 'none'
        }

    })
};