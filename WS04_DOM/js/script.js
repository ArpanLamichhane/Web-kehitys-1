const taskOneHeading = document.querySelector("#taskOneHeading");
const changeHeadingButton = document.querySelector("#changeHeadingButton");
const changeStyleButton = document.querySelector("#changeStyleButton");
const animalText = document.querySelector("#animalText");
const changeTextButton = document.querySelector("#changeTextButton");
const addSentenceButton = document.querySelector("#addSentenceButton");
const changeBackgroundButton = document.querySelector(
    "#changeBackgroundButton"
);

changeHeadingButton.addEventListener("click", function () {
    taskOneHeading.textContent = "Muokattu otsikko!";
});

changeStyleButton.addEventListener("click", function () {
    taskOneHeading.classList.toggle("highlight");
});

changeTextButton.addEventListener("click", function () {
    animalText.textContent =
        "Elefantit ovat älykkäitä ja sosiaalisia eläimiä.";
});

addSentenceButton.addEventListener("click", function () {
    animalText.textContent +=
        " Ne elävät yleensä laumoissa ja kommunikoivat monilla eri tavoilla.";
});

changeBackgroundButton.addEventListener("click", function () {
    document.body.style.backgroundColor = "#e8e0f5";
});

const animalContent = document.querySelector("#animalContent");
const animalHeading = document.createElement("h3");
animalHeading.textContent = "Päivän eläin";
animalHeading.classList.add("animal-heading");
const animalParagraph = document.createElement("p");
animalParagraph.textContent =
    "Elefantti on suuri nisäkäs, joka tunnetaan hyvästä muististaan ja pitkästä kärsästään.";

const animalPicture = document.createElement("img");
animalPicture.src = "images/elephant.png";
animalPicture.alt = "Elefantti";

animalContent.append(
    animalHeading,
    animalParagraph,
    animalPicture
);

const hideAnimalButton = document.querySelector("#hideAnimalButton");

hideAnimalButton.addEventListener("click", function () {
    animalContent.style.display = "none";
});

const showAnimalButton = document.querySelector("#showAnimalButton");

showAnimalButton.addEventListener("click", function () {
    animalContent.style.display = "block";
});

const animalSelect = document.querySelector("#animalSelect");
const animalName = document.querySelector("#animalName");
const animalImage = document.querySelector("#animalImage");
const animalDescription = document.querySelector("#animalDescription");
const animals = {
    elephant: {
        name: "Elefantti",
        image: "images/elephant.png",
        description: "Elefantit ovat maailman suurimpia maaeläimiä."
    },

    tiger: {
        name: "Tiikeri",
        image: "images/tiger.png",
        description: "Tiikeri on suuri petoeläin, joka tunnetaan raidallisesta turkistaan."
    },

    penguin: {
        name: "Pingviini",
        image: "images/penguin.png",
        description: "Pingviinit ovat lentokyvyttömiä lintuja, jotka ovat taitavia uimareita."
    },

    panda: {
        name: "Panda",
        image: "images/panda.png",
        description: "Panda tunnetaan mustavalkoisesta turkistaan ja bambun syömisestä."
    }
};

animalSelect.addEventListener("change", function () {

    const selectedAnimal = animalSelect.value;

    const animal = animals[selectedAnimal];

    animalName.textContent = animal.name;

    animalImage.src = animal.image;

    animalImage.alt = animal.name;

    animalDescription.textContent = animal.description;
});

animalImage.addEventListener("mouseenter", function () {
    animalImage.classList.add("image-highlight");
});

animalImage.addEventListener("mouseleave", function () {
    animalImage.classList.remove("image-highlight");
});

const animalForm = document.querySelector("#animalForm");
const observationAnimal = document.querySelector("#observationAnimal");
const observationLocation = document.querySelector("#observationLocation");
const observationDate = document.querySelector("#observationDate");
const observationTableBody = document.querySelector(
    "#observationTableBody"
);


animalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const animal = observationAnimal.value.trim();
    const location = observationLocation.value.trim();
    const date = observationDate.value;
    if (animal === "" || location === "" || date === "") {
        alert("Täytä kaikki kentät ennen havainnon lisäämistä.");
        return;
    }
    const newRow = document.createElement("tr");
    const animalCell = document.createElement("td");
    animalCell.textContent = animal;
    const locationCell = document.createElement("td");
    locationCell.textContent = location;
    const dateCell = document.createElement("td");
    dateCell.textContent = date;
    newRow.append(
        animalCell,
        locationCell,
        dateCell
    );
    observationTableBody.append(newRow);
    animalForm.reset();
});
