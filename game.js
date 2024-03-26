// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

// Player setup
const player = {
  x: 50,
  y: canvas.height - 70,
  width: 50,
  height: 50,
  velocityX: 0,
  velocityY: 0,
  speed: 5,
  jumping: true,
  jumpSpeed: 15,
  gravity: 1,
};

// Input handling
const keys = {
  right: false,
  left: false,
  up: false,
};

window.addEventListener('keydown', function(e) {
  if (e.key === "ArrowRight") keys.right = true;
  if (e.key === "ArrowLeft") keys.left = true;
  if (e.key === "ArrowUp" && !player.jumping) {
    player.jumping = true;
    player.velocityY = -player.jumpSpeed;
  }
});

window.addEventListener('keyup', function(e) {
  if (e.key === "ArrowRight") keys.right = false;
  if (e.key === "ArrowLeft") keys.left = false;
});

// Game loop
function gameLoop() {
  requestAnimationFrame(gameLoop);
  updateGame();
  drawGame();
}

function updateGame() {
  // Movement
  if (keys.right) {
    player.velocityX = player.speed;
  } else if (keys.left) {
    player.velocityX = -player.speed;
  } else {
    player.velocityX = 0;
  }

  // Gravity
  if (player.y + player.height < canvas.height) {
    player.velocityY += player.gravity;
    player.jumping = true;
  } else {
    player.velocityY = 0;
    player.jumping = false;
    player.y = canvas.height - player.height; // Correct player's y position if below ground
  }

  // Update player position
  player.x += player.velocityX;
  player.y += player.velocityY;

  // Prevent player from moving out of canvas
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

gameLoop();
