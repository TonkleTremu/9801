const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 50,
  y: 180,
  width: 30,
  height: 30,
  color: "red",
  velocityY: 0,
  speed: 2,
  grounded: false,
  jumpForce: -10
};

const gravity = 0.5;
const platforms = [
  { x: 0, y: 210, width: 400, height: 30 } // Single platform
];

// Input state
const input = { left: false, right: false, jump: false };

// Game loop
setInterval(() => {
  update();
  render();
}, 1000 / 30); // Run at 30 FPS

function update() {
  // Apply gravity
  // if (!player.grounded) {
  //   player.velocityY += gravity;
  // }

  // Horizontal movement
  if (input.left) player.x -= player.speed;
  if (input.right) player.x += player.speed;

  // Vertical movement
  player.y += player.velocityY; // Keep this for testing

  // Check for platform collisions
  // player.grounded = false; // Reset grounded state
  // for (const platform of platforms) {
  //   // ... existing collision code ...
  // }

  // Prevent the player from moving off the canvas
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}


function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw platform
  ctx.fillStyle = "black";
  for (const platform of platforms) {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  }

  // Debug message to verify rendering
  ctx.fillStyle = "white";
  ctx.font = "14px Arial";
  ctx.fillText("Rendering Test", 10, 20); // Test text output
}



// Keyboard input handling
/*window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") input.left = true;
  if (e.key === "ArrowRight") input.right = true;
  if (e.key === " " && player.grounded) { // Space bar for jump
    player.velocityY = player.jumpForce;
    player.grounded = false;
  }
});*/

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") input.left = false;
  if (e.key === "ArrowRight") input.right = false;
});
