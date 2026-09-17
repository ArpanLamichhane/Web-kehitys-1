//harjoitus 1//
const paina_minua = document.getElementById("paina_minua");

paina_minua.addEventListener("click", function(){
    alert("You clicked me!");
});

document.querySelector("#btnTable").addEventListener("click", showTable);

function showTable() {
    const animals = [
        { animal: "Tiikeri", habitat: "Metsä", diet: "Liha" },
        { animal: "Norsu", habitat: "Savanni", diet: "Kasvit" }
    ];

    let tableHTML = `
        <table border="1">
            <tr>
                <th>Eläin</th>
                <th>Elinympäristö</th>
                <th>Ruokavalio</th>
            </tr>
            ${animals.map(a => `
                <tr>
                    <td>${a.animal}</td>
                    <td>${a.habitat}</td>
                    <td>${a.diet}</td>
                </tr>
            `).join("")}
        </table>
    `;

    document.querySelector("#tableContainer").innerHTML = tableHTML;
}

//harjoitus2//
document.querySelector("#h2").addEventListener("mouseover", () => {
    console.log("Stepped over me with a mouse!");
});

document.querySelector("#h1").addEventListener("click", () => {
    const h1 = document.querySelector("#h1");
    h1.style.color = "red";
    h1.innerHTML = "Bye bye mouse!";
});

const textarea = document.querySelector("#feedback");
const status = document.querySelector("#status");
const charcount = document.querySelector("#charcount");
const preview = document.querySelector("#preview");

textarea.addEventListener("focus", () => {
    status.textContent = "Kirjoita palautteesi...";
    textarea.style.backgroundColor = "#eef";
});

textarea.addEventListener("blur", () => {
    status.textContent = "";
    textarea.style.backgroundColor = "white";
});

textarea.addEventListener("input", () => {
    const len = textarea.value.length;
    charcount.textContent = `${len}/200`;
    preview.textContent = textarea.value;
});

//harjoitus4//
document.querySelector("#feedbackForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const text = textarea.value.trim();

    if (text.length < 10 || text.length > 200) {
        status.textContent = "Feedback must be 10–200 characters!";
        status.style.color = "red";
        return;
    }

    textarea.value = "";
    charcount.textContent = "0/200";
    preview.textContent = "";
    status.style.color = "green";
    status.textContent = "Thank you for your feedback!";
});

document.addEventListener("keydown", (event) => {
    console.log(event);

    const info = document.querySelector("#keyinfo");
    info.innerHTML = `
        <strong>Painettu näppäin:</strong> ${event.key} <br>
        <strong>Koodi:</strong> ${event.code}
    `;

    const box = document.querySelector("#keybox");
    box.style.fontSize = "3em";
    box.textContent = event.key;
});

//bonustehtävä//
let count = 0;

document.addEventListener("keydown", (event) => {
    console.log(event);

    count++;

    const info = document.querySelector("#keyinfo");
    info.innerHTML = `
        <strong>Painettu näppäin:</strong> ${event.key} <br>
        <strong>Koodi:</strong> ${event.code} <br>
        <strong>Painalluksia yhteensä:</strong> ${count}
    `;

    const box = document.querySelector("#keybox");
    box.style.fontSize = "3em";
    box.textContent = event.key;

    document.body.style.backgroundColor =
        `hsl(${Math.random() * 360}, 70%, 80%)`;

    let mods = [];
    if (event.shiftKey) mods.push("Shift");
    if (event.ctrlKey) mods.push("Ctrl");
    if (event.altKey) mods.push("Alt");

    const modBox = document.querySelector("#modifiers");
    modBox.textContent = mods.length
        ? `Painettuna: ${mods.join(", ")}`
        : "Ei modifikaattoreita";
});

//bonustehtävä 1 google maps//
let lat = 60.1699;
let lon = 24.9384;

document.querySelector("#openMapsBtn").addEventListener("click", () => {
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    window.location.href = url;
});


