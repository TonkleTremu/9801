const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Check if the 3DS browser successfully initializes the canvas
if (ctx) {
  // Draw a single blue square in the center
  ctx.fillStyle = "blue";
  ctx.fillRect(150, 90, 100, 100);  // Centered square on 400x240 canvas
} else {
  // If the 3DS browser fails to get a 2D context, display a message
  document.body.innerHTML = "<p>Canvas not supported.</p>";
}
