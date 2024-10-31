const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;
const player = {
  x: 50,        // Ensure this is within the canvas width
  y: 180,       // Ensure this is within the canvas height
  width: 30,
  height: 30,
  color: "red",
  velocityY: 0,
  speed: 2,
  grounded: false,
  jumpForce: -10
};

const platforms = [
  { x: 0, y: 210, width: 400, height: 30 } // Ensure the platform fits within the canvas
];


// Input state
const input = { left: false, right: false, jump: false };

// Game loop
// Replace gameLoop with setInterval for 3DS compatibility
setInterval(() => {
  update();
  render();
}, 1000 / 30);  // Run at 30 FPS for better performance on the 3DS


function update() {
  // Apply gravity
  if (!player.grounded) {
    player.velocityY += gravity;
  }

  // Horizontal movement
  if (input.left) player.x -= player.speed;
  if (input.right) player.x += player.speed;

  // Vertical movement
  player.y += player.velocityY;

  // Check for platform collisions
  player.grounded = false;
  for (const platform of platforms) {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y < platform.y + platform.height &&
      player.y + player.height > platform.y
    ) {
      player.y = platform.y - player.height;
      player.velocityY = 0;
      player.grounded = true;
    }
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(Math.floor(player.x), Math.floor(player.y), player.width, player.height);

  // Draw platforms
  ctx.fillStyle = "black";
  for (const platform of platforms) {
    ctx.fillRect(Math.floor(platform.x), Math.floor(platform.y), platform.width, platform.height);
  }
}


// Keyboard input handling
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") input.left = true;
  if (e.key === "ArrowRight") input.right = true;
  if (e.key === " " && player.grounded) { // Space bar for jump
    player.velocityY = player.jumpForce;
    player.grounded = false;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") input.left = false;
  if (e.key === "ArrowRight") input.right = false;
});

// Start the game loop
gameLoop();
