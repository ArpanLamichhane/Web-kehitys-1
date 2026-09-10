// STEP 1: Print text to the browser console is string ""

console.log("Hello, world");

// STEP 2: Variables

// Store text values in variables

const userName = "Arpan";
const favoriteAnimal = "jaguaari";

// Print the variables to the console

console.log("My name is " + userName);
console.log("My favorite animal is " + favoriteAnimal);

// STEP 3: User interaction
// Display a pop-up message

alert("tervetuloa hienoon nettisivustoon");

// Ask the user for their name

const visitorName = prompt("Mikä on nimesi?");

// Print the user's answer

console.log(visitorName);

console.log("Terve " + visitorName + "! Tertuloa javascriptin pariin!");

// Ask the user for their favorite animal

const visitorFavoriteAnimal = prompt("mikä on lempieläimesi?");

// Create a sentence using both answers

console.log("Terve, " + visitorName + "! Your favorite animal is " + visitorFavoriteAnimal + ".");

// ⭐⭐ BONUS Ask the user for their favorite animal.If their favorite animal is "Blue Elephant", print: Great choice! That's my favorite animal too!
// ⭐⭐ BONUS Otherwise, print: Nice! Your favorite animal is [animal]. Can you figure out how to do this using if / else?

if (visitorFavoriteAnimal === "Jaguaari") {
    console.log("Hyvä valinta! Se on myös minun lempi eläimeni!");
} else {
    console.log("Nice! Sinun lempi eläimesi on " + visitorFavoriteAnimal + ".");
}
