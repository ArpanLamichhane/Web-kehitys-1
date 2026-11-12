
// WS05 student starter / opiskelijan aloituspohja

const animalForm = document.getElementById("animalForm");
const animalName = document.getElementById("animalName");
const animalSpecies = document.getElementById("animalSpecies");
const careNote = document.getElementById("careNote");

const nameError = document.getElementById("nameError");
const speciesError = document.getElementById("speciesError");
const noteError = document.getElementById("noteError");
const formResult = document.getElementById("formResult");

// Exercise 1 and 3: Animal form and localStorage

animalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous errors
    nameError.textContent = "";
    speciesError.textContent = "";
    noteError.textContent = "";

    animalName.classList.remove("invalid");
    animalSpecies.classList.remove("invalid");
    careNote.classList.remove("invalid");

    formResult.textContent = "";

    // Read and trim values
    const name = animalName.value.trim();
    const species = animalSpecies.value.trim();
    const note = careNote.value.trim();

    let isValid = true;

    // Validate animal name
    if (name === "") {
        nameError.textContent = "Anna eläimen nimi.";
        animalName.classList.add("invalid");
        isValid = false;
    }

    // Validate species
    if (species === "") {
        speciesError.textContent = "Anna eläimen laji.";
        animalSpecies.classList.add("invalid");
        isValid = false;
    }

    // Validate care note
    if (note.length < 1 || note.length > 150) {
        noteError.textContent = "Hoitomuistion pitää olla 1–150 merkkiä.";
        careNote.classList.add("invalid");
        isValid = false;
    }

    // Stop if the form is invalid
    if (!isValid) {
        formResult.textContent = "Tarkista lomakkeen tiedot.";
        return;
    }

    // Create animal object
    const animal = {
        name: name,
        species: species,
        note: note
    };

    // Save animal to localStorage
    localStorage.setItem("ws05Animal", JSON.stringify(animal));

    formResult.textContent = "Eläin lisätty onnistuneesti!";

    console.log(animal);
});


// Exercise 2: Sponsorship calculator

const sponsorForm = document.getElementById("sponsorForm");
const animalType = document.getElementById("animalType");
const yearsInput = document.getElementById("years");
const cost = document.getElementById("cost");
const discountMessage = document.getElementById("discountMessage");

sponsorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Convert values to numbers
    const yearlyPrice = Number(animalType.value);
    const years = Number(yearsInput.value);

    // Validate years
    if (!Number.isInteger(years) || years < 1) {
        cost.textContent = "Anna vähintään yksi kokonainen vuosi.";
        discountMessage.textContent = "";
        return;
    }

    // Calculate original price
    let total = yearlyPrice * years;

    let message = "Ei alennusta.";

    // Apply 20% discount for more than 2 years
    if (years > 2) {
        total = total * 0.80;
        message = "Saat 20 % alennuksen!";
    }

    // Additional 5 € discount for at least 5 years
    if (years >= 5) {
        total = total - 5;
        message = "Saat 20 % alennuksen ja lisäksi 5 € alennuksen!";
    }

    // Display result
    cost.textContent = "Yhteensä: " + total.toFixed(2) + " €";
    discountMessage.textContent = message;
});


// Exercise 4: Load and delete saved animal

const loadButton = document.getElementById("loadAnimal");
const clearButton = document.getElementById("clearAnimal");
const savedAnimal = document.getElementById("savedAnimal");

function loadAnimal() {

    // Read saved animal
    const savedData = localStorage.getItem("ws05Animal");

    // Check if data exists
    if (savedData === null) {
        savedAnimal.textContent = "Ei vielä tallennettua eläintä.";
        return;
    }

    // Convert JSON text into an object
    const animal = JSON.parse(savedData);

    // Display animal information
    savedAnimal.textContent =
        "Nimi: " + animal.name +
        " | Laji: " + animal.species +
        " | Hoitomuistio: " + animal.note;
}

// Load button
loadButton.addEventListener("click", loadAnimal);

// Delete button
clearButton.addEventListener("click", function () {

    localStorage.removeItem("ws05Animal");

    savedAnimal.textContent = "Tallennettu eläin poistettu.";
});

// Restore saved animal when page opens
loadAnimal();
