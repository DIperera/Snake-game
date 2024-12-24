    const gameDiv = document.getElementById("gameDiv");
    const food = document.getElementById("food");
    const countDisplay = document.getElementById("count");

    const gridSize = 30;
    const maxPos = 270;

    let snake = []; // Array to store snake body segments
    let direction = null;
    let score = 0;

    // Initial position of the snake
    let positions = [{ x: 150, y: 150 }];

    // Create the initial head
    function createSegment(x, y) {
        const segment = document.createElement("div");
        segment.classList.add("snake");
        segment.style.transform = `translate(${x}px, ${y}px)`;
        gameDiv.appendChild(segment);
        return segment;
    }
    snake.push(createSegment(150, 150));

    // Place the food randomly
    function placeFood() {
        const foodX = Math.floor(Math.random() * 10) * gridSize;
        const foodY = Math.floor(Math.random() * 10) * gridSize;
        food.style.transform = `translate(${foodX}px, ${foodY}px)`;
    }
    placeFood();

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
            // Move each segment to the position of the previous one
            for (let i = snake.length - 1; i > 0; i--) {
                positions[i] = { ...positions[i - 1] };
            }

            // Update head position
            if (direction === "up") positions[0].y -= gridSize;
            if (direction === "down") positions[0].y += gridSize;
            if (direction === "left") positions[0].x -= gridSize;
            if (direction === "right") positions[0].x += gridSize;

            // Ensure the head stays within the game boundaries
            if (positions[0].x < 0) positions[0].x = 0;
            if (positions[0].x > maxPos) positions[0].x = maxPos;
            if (positions[0].y < 0) positions[0].y = 0;
            if (positions[0].y > maxPos) positions[0].y = maxPos;

            // Update the positions on the screen
            snake.forEach((segment, index) => {
                segment.style.transform = `translate(${positions[index].x}px, ${positions[index].y}px)`;
            });

            checkCollision();
        }
    }

    // Check for collision with food
    function checkCollision() {
        const head = positions[0];
        const foodX = parseInt(food.style.transform.split("(")[1]);
        const foodY = parseInt(food.style.transform.split(",")[1]);

        if (head.x === foodX && head.y === foodY) {
            score++;
            countDisplay.textContent = score;
            placeFood();

            // Add a new segment to the snake
            const lastSegment = positions[positions.length - 1];
            positions.push({ ...lastSegment });
            let newSnake = createSegment(lastSegment.x, lastSegment.y);
            snake.push(newSnake);
        }
    }

    // Run the game loop at a fixed interval
    setInterval(gameLoop, 200);

/*newly found keywords
   1. divElement.offsetwidth : return total width in pixels.
   (element.offsetTop is used to track element manually. but if we use following function no need to track manually.)
   2. divElement.getBoundingClientrect() : track movement of divElement automatically. 
   (getBoundingClientRect() has a predefined set of properties, such as "left, right, top, bottom, x, y, width, height". rectan.x is alternative for rectan.left/right)
   
   3. x : horizontal position , y : vertical position. (ex: {x:150,y:150})
   4. fillRect(x,y,width,height) : is a canvas 2D API function that use to draw afilled rectangle on the canvas.
   5. The unshift() method in JavaScript is used to add one or more elements to the beginning of an array. 
      It modifies the original array and returns the new length of the array.
      ex : 
         let numbers = [2, 3, 4];

        // Function to add an element at the beginning of the array
         function addElement() {
            let newElement = 1; // Element to add
            numbers.unshift(newElement); 
            
    6. Types of js arrays :
        1. Object arrays : Elements are objects.

        let objectArray = [
            { x: 10, y: 20 },
            { x: 30, y: 40 },
            { x: 50, y: 60 }
        ];

        console.log(objectArray[0]); // { x: 10, y: 20 } (an object)
        console.log(objectArray[1].x); // 30 (value of 'x' in the second object)
        
        2. Number array: Elements are numbers.

        let numberArray = [10, 20, 30, 40, 50];

        console.log(numberArray[0]); // 10 (a number)
        console.log(numberArray[2]); // 30 (number at index 2)
        
    7. spread operartor : spread operator (...) in JavaScript to create a shallow copy of the object positions[i - 1] and assign it to positions[i]
    
    let positions = [{ x: 10, y: 20 }];

    // Add a new object as a copy of the previous one
    positions[1] = { ...positions[0] };

    // Modify the new object
    positions[1].x = 30;

    console.log(positions); 
    // Output:
    // [
    //   { x: 10, y: 20 },
    //   { x: 30, y: 20 }
    // ]
*/
