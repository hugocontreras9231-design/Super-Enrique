<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Mini Mario</title>

<style>
body {
    margin: 0;
    background: #111;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: white;
    font-family: sans-serif;
}

#game {
    width: 300px;
    height: 150px;
    border: 2px solid #ccc;
    position: relative;
    overflow: hidden;
    background: #222;
}

.player {
    width: 12px;
    height: 12px;
    background: #00bfff;
    position: absolute;
    bottom: 0;
    left: 10px;
}

.enemy {
    width: 12px;
    height: 12px;
    background: #ff4444;
    position: absolute;
    bottom: 0;
    left: 220px;
}

.controls {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: center;
}

button {
    width: 60px;
    height: 40px;
    background: #333;
    border: 2px solid #777;
    color: white;
    font-size: 20px;
    border-radius: 6px;
}
button:active {
    background: #555;
}
</style>
</head>

<body>

<div>
    <div id="game">
        <div id="player" class="player"></div>
        <div id="enemy" class="enemy"></div>
    </div>

    <div class="controls">
        <button id="left">←</button>
        <button id="jump">↑</button>
        <button id="right">→</button>
    </div>
</div>

<script>
const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const game = document.getElementById("game");

let px = 10;
let py = 0;
let vy = 0;
let jumping = false;

let direction = 0; // -1 izquierda, 1 derecha, 0 nada

// Movimiento enemigo simple
let enemyDir = 1;
let ex = 220;

// Física del juego
function loop() {
    // Movimiento horizontal
    px += direction * 2;
    if (px < 0) px = 0;
    if (px > 288) px = 288;

    // Gravedad
    vy -= 0.6;
    py += vy;

    // Suelo
    if (py < 0) {
        py = 0;
        vy = 0;
        jumping = false;
    }

    // Actualizar posiciones
    player.style.left = px + "px";
    player.style.bottom = py + "px";

    // Movimiento enemigo
    ex += enemyDir * 1.5;
    if (ex < 0 || ex > 288) enemyDir *= -1;
    enemy.style.left = ex + "px";

    requestAnimationFrame(loop);
}
loop();

// Controles
document.getElementById("left").addEventListener("touchstart", () => direction = -1);
document.getElementById("right").addEventListener("touchstart", () => direction = 1);
document.getElementById("left").addEventListener("touchend", () => direction = 0);
document.getElementById("right").addEventListener("touchend", () => direction = 0);

document.getElementById("jump").addEventListener("touchstart", () => {
    if (!jumping) {
        jumping = true;
        vy = 8;
    }
});
</script>

</body>
</html>
