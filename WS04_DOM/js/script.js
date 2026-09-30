const heading = document.querySelector("#taskOneHeading");
const changeHeadingButton = document.querySelector("#changeHeadingButton");
const changeStyleButton = document.querySelector("#changeStyleButton");
const changeTextButton = document.querySelector("#changeTextButton");
const animalText = document.querySelector("#animalText");

changeHeadingButton.addEventListener("click", function () {
    heading.textContent = "Muokattu otsikko!";
});

changeStyleButton.addEventListener("click", function () {
    heading.classList.toggle("highlight");
});

changeTextButton.addEventListener("click", function () {
    animalText.textContent = "Elefantit ovat älykkäitä ja sosiaalisia eläimiä.";
});

const addSentenceButton = document.querySelector("#addSentenceButton");

addSentenceButton.addEventListener("click", function () {
    animalText.textContent += " Ne elävät yleensä laumoissa.";
});

const changeBackgroundButton = document.querySelector("#changeBackgroundButton");

changeBackgroundButton.addEventListener("click", function () {
    document.body.style.backgroundColor = "lightblue";
});

const animalContent = document.querySelector("#animalContent");

const animalHeading = document.createElement("h3");
animalHeading.textContent = "Päivän eläin";
animalHeading.classList.add("animal-heading");

const animalDescription = document.createElement("p");
animalDescription.textContent =
    "Tiikeri on suuri kissaeläin, joka tunnetaan raidallisesta turkistaan.";

const animalImage = document.createElement("img");
animalImage.src = "images/tiger.png";
animalImage.alt = "Tiikeri";

animalContent.append(
    animalHeading,
    animalDescription,
    animalImage
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


animalSelect.addEventListener("change", function () {
    const selectedAnimal = animalSelect.value;

    if (selectedAnimal === "elephant") {
        animalName.textContent = "Elefantti";
        animalImage.src = "images/elephant.png";
        animalImage.alt = "Elefantti";
        animalDescription.textContent =
            "Elefantit ovat maailman suurimpia maaeläimiä.";
    }

    else if (selectedAnimal === "tiger") {
        animalName.textContent = "Tiikeri";
        animalImage.src = "images/tiger.png";
        animalImage.alt = "Tiikeri";
        animalDescription.textContent =
            "Tiikeri on suuri kissaeläin, joka tunnetaan raidallisesta turkistaan.";
    }

    else if (selectedAnimal === "penguin") {
        animalName.textContent = "Pingviini";
        animalImage.src = "images/penguin.png";
        animalImage.alt = "Pingviini";
        animalDescription.textContent =
            "Pingviinit ovat lentokyvyttömiä lintuja, jotka ovat taitavia uimareita.";
    }

    else if (selectedAnimal === "panda") {
        animalName.textContent = "Panda";
        animalImage.src = "images/panda.png";
        animalImage.alt = "Panda";
        animalDescription.textContent =
            "Panda on mustavalkoinen karhu, joka syö pääasiassa bambua.";
    }
});


animalImage.addEventListener("mouseenter", function () {
    animalImage.classList.add("image-highlight");
});

animalImage.addEventListener("mouseleave", function () {
    animalImage.classList.remove("image-highlight");
});
