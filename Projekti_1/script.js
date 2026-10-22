
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const errorMessage = document.getElementById("errorMessage");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll(".filter");

// Ladataan tallennetut tehtävät selaimesta.
let tasks = [];

try {
    tasks = JSON.parse(localStorage.getItem("myTasks")) || [];
    if (!Array.isArray(tasks)) {
        tasks = [];
    }
} catch (error) {
    tasks = [];
}

let currentFilter = "all";

// Tallennetaan tehtävät selaimen muistiin.
function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Tarkistetaan syötekenttä.
function validateInput() {
    const value = taskInput.value.trim();

    if (value.length < 3) {
        errorMessage.textContent =
            "Tehtävän nimen tulee sisältää vähintään 3 merkkiä.";
        taskInput.classList.add("invalid");
        taskInput.setAttribute("aria-invalid", "true");
        return false;
    }

    errorMessage.textContent = "";
    taskInput.classList.remove("invalid");
    taskInput.removeAttribute("aria-invalid");
    return true;
}

// Lisätään uusi tehtävä.
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateInput()) {
        taskInput.focus();
        return;
    }

    const newTask = {
        id: Date.now() + Math.random(),
        name: taskInput.value.trim(),
        priority: priorityInput.value,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskForm.reset();
    errorMessage.textContent = "";
    taskInput.classList.remove("invalid");
    taskInput.removeAttribute("aria-invalid");
    taskInput.focus();
});

// Poistetaan virheilmoitus, kun käyttäjä korjaa syötettä.
taskInput.addEventListener("input", function () {
    if (taskInput.classList.contains("invalid")) {
        validateInput();
    }
});

// Näytetään tehtävät listassa.
function renderTasks() {
    taskList.replaceChildren();

    const openTasks = tasks.filter(task => !task.completed).length;
    taskCounter.textContent =
        openTasks + (openTasks === 1
            ? " avoin tehtävä"
            : " avointa tehtävää");

    let visibleTasks = tasks;

    if (currentFilter === "active") {
        visibleTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === "completed") {
        visibleTasks = tasks.filter(task => task.completed);
    }

    emptyMessage.hidden = visibleTasks.length > 0;

    if (tasks.length === 0) {
        emptyMessage.textContent =
            "Ei vielä tehtäviä. Lisää ensimmäinen tehtäväsi!";
    } else if (visibleTasks.length === 0) {
        emptyMessage.textContent =
            "Tässä näkymässä ei ole tehtäviä.";
    }

    visibleTasks.forEach(function (task) {
        const item = document.createElement("li");
        item.className = "task-item";

        if (task.completed) {
            item.classList.add("completed");
        }

        // Valintaruutu tehtävän valmistumiselle.
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute(
            "aria-label",
            "Merkitse tehtävä tehdyksi: " + task.name
        );

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        // Tehtävän nimi ja tärkeys.
        const content = document.createElement("div");
        content.className = "task-content";

        const name = document.createElement("div");
        name.className = "task-name";
        name.textContent = task.name;

        const priority = document.createElement("span");
        priority.className = "priority";

        if (task.priority === "Kiireellinen") {
            priority.classList.add("kiireellinen");
        } else if (task.priority === "Tärkeä") {
            priority.classList.add("tärkeä");
        }

        priority.textContent = task.priority;

        content.append(name, priority);

        // Poistopainike.
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Poista";
        deleteButton.setAttribute(
            "aria-label",
            "Poista tehtävä: " + task.name
        );

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        item.append(checkbox, content, deleteButton);
        taskList.appendChild(item);
    });
}

// Vaihdetaan tehtävien suodatusta.
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(function (filterButton) {
            filterButton.classList.toggle(
                "active",
                filterButton === button
            );
        });

        renderTasks();
    });
});

// Näytetään tallennetut tehtävät sivun avautuessa.
renderTasks();
