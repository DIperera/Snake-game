const gameDiv = document.getElementById("gameDiv");
const head = document.getElementById("head");
const food = document.getElementById("food");
const countDisplay = document.getElementById("count");

const gridSize = 30; // Grid size
const maxPos = 270; // Maximum position for 300px container with 30px cells

let x = 150; // Initial position of the snake
let y = 150;
let direction = null; // Movement direction
let score = 0;

// Place the food randomly
function placeFood() {
    const foodX = Math.floor(Math.random() * 10) * gridSize;
    const foodY = Math.floor(Math.random() * 10) * gridSize;
    food.style.transform = `translate(${foodX}px, ${foodY}px)`;
}
placeFood();

// Set initial position of the head
head.style.transform = `translate(${x}px, ${y}px)`;

// Button listeners to change direction
document.getElementById("up").addEventListener("click", () => {
    if (direction !== "down") direction = "up";
});
document.getElementById("down").addEventListener("click", () => {
    if (direction !== "up") direction = "down";
});
document.getElementById("left").addEventListener("click", () => {
    if (direction !== "right") direction = "left";
});
document.getElementById("right").addEventListener("click", () => {
    if (direction !== "left") direction = "right";
});

// Main game loop
function gameLoop() {
    if (direction) {
        if (direction === "up") y -= gridSize;
        if (direction === "down") y += gridSize;
        if (direction === "left") x -= gridSize;
        if (direction === "right") x += gridSize;

        // Ensure the head stays within the game boundaries
        if (x < 0){
            x = 0;
        } 
        if (x > maxPos){
            x = maxPos;
        }
        if (y < 0) {
            y = 0;
        }
        if (y > maxPos) {
            y = maxPos;
        }

        head.style.transform = `translate(${x}px, ${y}px)`;
        checkCollision();
    }
}

// Check for collision with food
function checkCollision() {
    const headRect = head.getBoundingClientRect();
    const foodRect = food.getBoundingClientRect();

    if (
        (headRect.top === foodRect.top && headRect.left === foodRect.left)
    ) {
        score++;
        countDisplay.textContent = score;
        placeFood();
    }
}

// Run the game loop at a fixed interval
setInterval(gameLoop, 200);

