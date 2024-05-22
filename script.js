console.log("Script file loaded.");

fetch("https://api.gameofthronesquotes.xyz/v1/random")
    .then((response) => response.json()) // changing response to JSON format
    .then((result) => {
        // Storing required data
        let name = result.character.name;
        let house = result.character.house.name;
        let sentence = result.sentence;
        let name1 = "Jon Snow";
        let name2 = "Sansa Stark";

        // Conditions applied for omitting same options for two buttons
        if (name === "Jon Snow") {
            name1 = "Tyrion Lannister";
        }
        if (name === "Sansa Stark") {
            name2 = "Arya Stark";
        }

        // Calling displayData function and passing required values
        displayData(sentence, name, name1, name2);

        // Calling eventListeners function and passing required values
        eventListeners(house);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

// Function to display the data on the screen with stored values
function displayData(sentence, name, name1, name2) {
    const body = document.querySelector(".body"); // targeting class body
    body.innerHTML = ''; // Clear previous content
    // Appending required HTML elements and passing the values
    body.innerHTML += `
        <h2>${sentence}</h2>
        <form class="form">
            <button class="hint">Hint</button>
            <button class="firstButton">${name}</button>
            <button class="secondButton">${name1}</button>
            <button class="thirdButton">${name2}</button>
        </form>
        <div class="result"></div>
    `;
}

// Function full of eventListeners to perform certain functions
function eventListeners(house) {
    // Helper function to update result text
    function updateResult(text) {
        const result = document.querySelector(".result"); // targeting class result
        result.innerText = text;
    }

    // Targeting class firstButton
    const firstButton = document.querySelector(".firstButton");
    firstButton.addEventListener("click", (event) => {
        event.preventDefault(); // to prevent page from loading
        updateResult("Correct Answer");
    });

    // Targeting class secondButton
    const secondButton = document.querySelector(".secondButton");
    secondButton.addEventListener("click", (event) => {
        event.preventDefault(); // to prevent page from loading
        updateResult("Wrong Answer");
    });

    // Targeting class thirdButton
    const thirdButton = document.querySelector(".thirdButton");
    thirdButton.addEventListener("click", (event) => {
        event.preventDefault(); // to prevent page from loading
        updateResult("Wrong Answer");
    });

    // Targeting class hint
    const hintButton = document.querySelector(".hint");
    hintButton.addEventListener("click", (event) => {
        event.preventDefault(); // to prevent page from loading
        updateResult(`Hint: ${house}`);
    });

    // Targeting class next
    const nextButton = document.querySelector(".next");
    nextButton.addEventListener("click", (event) => {
        event.preventDefault(); // to prevent default form submission
        location.reload(); // reload the page for next API response
    });
}