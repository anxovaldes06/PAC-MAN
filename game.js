const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const livesEl = document.getElementById('lives');
const gameOverEl = document.getElementById('game-over');
const winEl = document.getElementById('win');

const TILE = 20;
const COLS = 28;
const ROWS = 31;

const MAP = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
    [1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
    [0,0,0,0,0,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,0,0,0,0,0],
    [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
    [0,0,0,0,0,1,2,1,1,0,1,1,1,5,5,1,1,1,0,1,1,2,1,0,0,0,0,0],
    [1,1,1,1,1,1,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,1,1,1,1,1,1],
    [0,0,0,0,0,0,2,0,0,0,1,4,4,4,4,4,4,1,0,0,0,2,0,0,0,0,0,0],
    [1,1,1,1,1,1,2,1,1,0,1,4,4,4,4,4,4,1,0,1,1,2,1,1,1,1,1,1],
    [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
    [0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
    [0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
    [1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
    [1,3,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,3,1],
    [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
    [1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
    [1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
    [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
    [1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const DIR = { NONE: 0, UP: 1, DOWN: 2, LEFT: 3, RIGHT: 4 };

const GHOST_SCATTER = 0;
const GHOST_CHASE = 1;
const GHOST_FRIGHTENED = 2;
const GHOST_EATEN = 3;

const SCATTER_TICKS = 420;
const CHASE_TICKS = 1200;
const FRIGHTENED_TICKS = 360;

const BLINKY = 0;
const PINKY = 1;
const INKY = 2;
const CLYDE = 3;

const GHOST_COLORS = ['#ff0000', '#ffb8ff', '#00ffff', '#ffb852'];
const GHOST_EATEN_COLOR = '#fff';
const GHOST_FRIGHTENED_COLOR = '#2121de';
const GHOST_FRIGHTENED_FLASH = '#fff';

let score = 0;
let lives = 3;
let level = 1;
let totalDots = 0;
let dotsEaten = 0;
let powerMode = false;
let powerTimer = 0;
let gameState = 'ready';
let ghostMode = GHOST_SCATTER;
let modeTimer = 0;
let modeIndex = 0;
let frightenedTimer = 0;
let eatGhostScore = 200;

const MODE_SEQUENCE = [
    { mode: GHOST_SCATTER, duration: SCATTER_TICKS },
    { mode: GHOST_CHASE, duration: CHASE_TICKS },
    { mode: GHOST_SCATTER, duration: SCATTER_TICKS },
    { mode: GHOST_CHASE, duration: CHASE_TICKS },
    { mode: GHOST_SCATTER, duration: SCATTER_TICKS },
    { mode: GHOST_CHASE, duration: CHASE_TICKS },
    { mode: GHOST_SCATTER, duration: SCATTER_TICKS },
    { mode: GHOST_CHASE, duration: Infinity }
];

let maze = [];
let pacman = null;
let ghosts = [];
let particles = [];
let animFrame = null;

function initMaze() {
    maze = [];
    totalDots = 0;
    dotsEaten = 0;
    for (let r = 0; r < ROWS; r++) {
        maze[r] = [];
        for (let c = 0; c < COLS; c++) {
            maze[r][c] = MAP[r][c];
            if (MAP[r][c] === 2 || MAP[r][c] === 3) totalDots++;
        }
    }
}

function getPixelCenter(tileX, tileY) {
    return { x: tileX * TILE + TILE / 2, y: tileY * TILE + TILE / 2 };
}

function getTile(pixel) {
    return { col: Math.floor(pixel.x / TILE), row: Math.floor(pixel.y / TILE) };
}

function isWalkable(col, row) {
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return false;
    return maze[row][col] !== 1 && (maze[row][col] < 4 || maze[row][col] > 5 || maze[row][col] === 6);
}

function isWalkableForGhost(col, row) {
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return false;
    return maze[row][col] !== 1;
}

function canEnterGhostHouse(col, row) {
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return false;
    return maze[row][col] !== 1;
}

function createPacman() {
    return {
        x: 14 * TILE + TILE / 2,
        y: 23 * TILE + TILE / 2,
        dir: DIR.NONE,
        nextDir: DIR.NONE,
        speed: 1.5,
        mouthAngle: 0,
        mouthOpen: true,
        moving: false,
        pixelX: 14 * TILE + TILE / 2,
        pixelY: 23 * TILE + TILE / 2
    };
}

function createGhost(type) {
    const positions = [
        { col: 14, row: 11 },
        { col: 13, row: 14 },
        { col: 14, row: 14 },
        { col: 15, row: 14 }
    ];
    const pos = positions[type];
    const p = getPixelCenter(pos.col, pos.row);
    const ghost = {
        type: type,
        x: p.x,
        y: p.y,
        pixelX: p.x,
        pixelY: p.y,
        dir: DIR.NONE,
        speed: 1.2,
        mode: GHOST_SCATTER,
        frightened: false,
        eaten: false,
        inHouse: true,
        releaseTimer: type === BLINKY ? 0 : type === PINKY ? 15 : type === INKY ? 30 : 45,
        scatterTarget: [
            { col: 25, row: 0 },
            { col: 2, row: 0 },
            { col: 27, row: 29 },
            { col: 0, row: 29 }
        ][type],
        cornerCol: pos.col,
        cornerRow: pos.row,
        lastTile: ''
    };
    return ghost;
}

function resetPositions() {
    pacman = createPacman();
    ghosts = [];
    for (let i = 0; i < 4; i++) {
        ghosts.push(createGhost(i));
    }
    modeIndex = 0;
    modeTimer = 0;
    ghostMode = GHOST_SCATTER;
    powerMode = false;
    powerTimer = 0;
    frightenedTimer = 0;
    eatGhostScore = 200;
}

function drawMaze() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const tile = maze[r][c];
            const x = c * TILE;
            const y = r * TILE;

            if (tile === 1) {
                ctx.fillStyle = '#2121de';
                ctx.fillRect(x, y, TILE, TILE);
                drawWallEdges(c, r);
            } else if (tile === 2) {
                ctx.fillStyle = '#ffb8ae';
                const cx = x + TILE / 2;
                const cy = y + TILE / 2;
                ctx.beginPath();
                ctx.arc(cx, cy, 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (tile === 3) {
                if (!powerMode || Math.floor(powerTimer / 10) % 2 === 0) {
                    ctx.fillStyle = '#ffb8ae';
                    const cx = x + TILE / 2;
                    const cy = y + TILE / 2;
                    ctx.beginPath();
                    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    }
}

function drawWallEdges(c, r) {
    const x = c * TILE;
    const y = r * TILE;
    ctx.fillStyle = '#2121de';
    ctx.strokeStyle = '#4141ff';
    ctx.lineWidth = 2;

    if (r > 0 && maze[r - 1][c] !== 1) {
        ctx.beginPath();
        ctx.moveTo(x + 2, y);
        ctx.lineTo(x + TILE - 2, y);
        ctx.stroke();
    }
    if (r < ROWS - 1 && maze[r + 1][c] !== 1) {
        ctx.beginPath();
        ctx.moveTo(x + 2, y + TILE);
        ctx.lineTo(x + TILE - 2, y + TILE);
        ctx.stroke();
    }
    if (c > 0 && maze[r][c - 1] !== 1) {
        ctx.beginPath();
        ctx.moveTo(x, y + 2);
        ctx.lineTo(x, y + TILE - 2);
        ctx.stroke();
    }
    if (c < COLS - 1 && maze[r][c + 1] !== 1) {
        ctx.beginPath();
        ctx.moveTo(x + TILE, y + 2);
        ctx.lineTo(x + TILE, y + TILE - 2);
        ctx.stroke();
    }
}

function drawPacman() {
    const x = pacman.pixelX;
    const y = pacman.pixelY;
    let angle = 0;

    switch (pacman.dir) {
        case DIR.RIGHT: angle = 0; break;
        case DIR.DOWN: angle = Math.PI / 2; break;
        case DIR.LEFT: angle = Math.PI; break;
        case DIR.UP: angle = -Math.PI / 2; break;
        default: angle = 0;
    }

    const mouth = pacman.moving ? (pacman.mouthOpen ? 0.3 : 0.05) : 0.05;

    ctx.fillStyle = '#ff0';
    ctx.beginPath();
    ctx.arc(x, y, 9, angle + mouth, angle + Math.PI * 2 - mouth);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
}

function drawGhost(ghost) {
    if (ghost.eaten) return;

    const x = ghost.pixelX;
    const y = ghost.pixelY;
    const r = 9;

    let color;
    if (ghost.mode === GHOST_EATEN) {
        color = GHOST_EATEN_COLOR;
    } else if (ghost.mode === GHOST_FRIGHTENED) {
        if (frightenedTimer < 120 && Math.floor(frightenedTimer / 6) % 2 === 0) {
            color = GHOST_FRIGHTENED_FLASH;
        } else {
            color = GHOST_FRIGHTENED_COLOR;
        }
    } else {
        color = GHOST_COLORS[ghost.type];
    }

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y - 3, r, Math.PI, 0);
    ctx.lineTo(x + r, y + 4);

    for (let i = 0; i < 3; i++) {
        const wx = x + r - (i * r * 2 / 3);
        ctx.quadraticCurveTo(wx - 3, y + 8, wx - r / 3, y + 4);
    }

    ctx.closePath();
    ctx.fill();

    if (ghost.mode !== GHOST_EATEN && ghost.mode !== GHOST_FRIGHTENED) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(x - 3, y - 5, 2.5, 0, Math.PI * 2);
        ctx.arc(x + 3, y - 5, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#2121de';
        let lookX = 0, lookY = 0;
        switch (ghost.dir) {
            case DIR.LEFT: lookX = -1.5; break;
            case DIR.RIGHT: lookX = 1.5; break;
            case DIR.UP: lookY = -1.5; break;
            case DIR.DOWN: lookY = 1.5; break;
        }
        ctx.beginPath();
        ctx.arc(x - 3 + lookX, y - 5 + lookY, 1.2, 0, Math.PI * 2);
        ctx.arc(x + 3 + lookX, y - 5 + lookY, 1.2, 0, Math.PI * 2);
        ctx.fill();
    } else if (ghost.mode === GHOST_FRIGHTENED) {
        const fColor = (frightenedTimer < 120 && Math.floor(frightenedTimer / 6) % 2 === 0) ? '#ff0000' : '#ffb8ae';
        ctx.fillStyle = fColor;
        ctx.beginPath();
        ctx.arc(x - 3, y - 5, 2, 0, Math.PI * 2);
        ctx.arc(x + 3, y - 5, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;
        p.size -= 0.1;
        if (p.alpha <= 0 || p.size <= 0) {
            particles.splice(i, 1);
        }
    }
}

function spawnParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            alpha: 1,
            size: Math.random() * 3 + 1,
            color: color
        });
    }
}

function canMove(x, y, dir, isGhost) {
    const speed = isGhost ? 1.2 : 1.5;
    let nx = x, ny = y;

    switch (dir) {
        case DIR.LEFT: nx = x - speed; break;
        case DIR.RIGHT: nx = x + speed; break;
        case DIR.UP: ny = y - speed; break;
        case DIR.DOWN: ny = y + speed; break;
        default: return true;
    }

    const checkFn = isGhost ? isWalkableForGhost : isWalkable;
    const corners = [
        { col: Math.floor((nx - 2) / TILE), row: Math.floor((ny - 2) / TILE) },
        { col: Math.floor((nx + 2) / TILE), row: Math.floor((ny - 2) / TILE) },
        { col: Math.floor((nx - 2) / TILE), row: Math.floor((ny + 2) / TILE) },
        { col: Math.floor((nx + 2) / TILE), row: Math.floor((ny + 2) / TILE) }
    ];

    for (const c of corners) {
        if (!checkFn(c.col, c.row)) return false;
    }

    if (dir === DIR.LEFT || dir === DIR.RIGHT) {
        const midY = Math.floor(ny / TILE);
        const checkCol = Math.floor((dir === DIR.LEFT ? nx - 2 : nx + 2) / TILE);
        if (checkCol < 0 || checkCol >= COLS) return false;
        if (!checkFn(checkCol, midY)) return false;
    } else {
        const midX = Math.floor(nx / TILE);
        const checkRow = Math.floor((dir === DIR.UP ? ny - 2 : ny + 2) / TILE);
        if (checkRow < 0 || checkRow >= ROWS) return false;
        if (!checkFn(midX, checkRow)) return false;
    }

    return true;
}

function updatePacman() {
    if (gameState !== 'playing' && gameState !== 'ready') return;

    if (gameState === 'ready') {
        gameState = 'playing';
    }

    const tile = getTile({ x: pacman.pixelX, y: pacman.pixelY });
    const col = tile.col;
    const row = tile.row;

    if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
        if (maze[row][col] === 2 || maze[row][col] === 3) {
            const isPower = maze[row][col] === 3;
            maze[row][col] = 0;
            dotsEaten++;

            if (isPower) {
                score += 50;
                activatePowerMode();
                spawnParticles(pacman.pixelX, pacman.pixelY, 15, '#ffb8ae');
            } else {
                score += 10;
            }
            updateScore();
        }
    }

    if (pacman.nextDir !== DIR.NONE && pacman.nextDir !== pacman.dir) {
        if (canMove(pacman.pixelX, pacman.pixelY, pacman.nextDir, false)) {
            pacman.dir = pacman.nextDir;
        }
    }

    if (pacman.dir !== DIR.NONE) {
        if (canMove(pacman.pixelX, pacman.pixelY, pacman.dir, false)) {
            pacman.moving = true;
            switch (pacman.dir) {
                case DIR.LEFT: pacman.pixelX -= pacman.speed; break;
                case DIR.RIGHT: pacman.pixelX += pacman.speed; break;
                case DIR.UP: pacman.pixelY -= pacman.speed; break;
                case DIR.DOWN: pacman.pixelY += pacman.speed; break;
            }
        } else {
            pacman.moving = false;
        }
    }

    if (pacman.pixelX < -TILE / 2) pacman.pixelX = COLS * TILE + TILE / 2;
    if (pacman.pixelX > COLS * TILE + TILE / 2) pacman.pixelX = -TILE / 2;

    if (pacman.moving) {
        if (pacman.mouthOpen) {
            pacman.mouthAngle += 0.1;
            if (pacman.mouthAngle > 0.3) pacman.mouthOpen = false;
        } else {
            pacman.mouthAngle -= 0.1;
            if (pacman.mouthAngle < 0.05) pacman.mouthOpen = true;
        }
    }

    if (dotsEaten >= totalDots) {
        gameState = 'win';
        winEl.classList.remove('hidden');
    }
}

function activatePowerMode() {
    powerMode = true;
    powerTimer = 0;
    frightenedTimer = FRIGHTENED_TICKS;
    eatGhostScore = 200;

    for (const ghost of ghosts) {
        if (ghost.mode !== GHOST_EATEN && !ghost.inHouse) {
            ghost.mode = GHOST_FRIGHTENED;
            if (ghost.dir === DIR.UP) ghost.dir = DIR.DOWN;
            else if (ghost.dir === DIR.DOWN) ghost.dir = DIR.UP;
            else if (ghost.dir === DIR.LEFT) ghost.dir = DIR.RIGHT;
            else if (ghost.dir === DIR.RIGHT) ghost.dir = DIR.LEFT;
        }
    }
}

function updateGhostMode() {
    if (powerMode) {
        powerTimer++;
        frightenedTimer--;
        if (frightenedTimer <= 0) {
            powerMode = false;
            for (const ghost of ghosts) {
                if (ghost.mode === GHOST_FRIGHTENED) {
                    ghost.mode = ghostMode;
                }
            }
        }
        return;
    }

    modeTimer++;
    const currentMode = MODE_SEQUENCE[modeIndex];
    if (modeTimer >= currentMode.duration && currentMode.duration !== Infinity) {
        modeIndex = (modeIndex + 1) % MODE_SEQUENCE.length;
        modeTimer = 0;
        ghostMode = MODE_SEQUENCE[modeIndex].mode;
        for (const ghost of ghosts) {
            if (ghost.mode !== GHOST_EATEN && !ghost.inHouse) {
                ghost.mode = ghostMode;
            }
        }
    }
}

function getTargetForGhost(ghost) {
    if (ghost.mode === GHOST_CHASE) {
        const pTile = getTile({ x: pacman.pixelX, y: pacman.pixelY });
        switch (ghost.type) {
            case BLINKY:
                return { col: pTile.col, row: pTile.row };
            case PINKY: {
                let targetCol = pTile.col, targetRow = pTile.row;
                switch (pacman.dir) {
                    case DIR.UP: targetRow -= 4; targetCol -= 4; break;
                    case DIR.DOWN: targetRow += 4; break;
                    case DIR.LEFT: targetCol -= 4; break;
                    case DIR.RIGHT: targetCol += 4; break;
                }
                return { col: targetCol, row: targetRow };
            }
            case INKY: {
                let aheadCol = pTile.col, aheadRow = pTile.row;
                switch (pacman.dir) {
                    case DIR.UP: aheadRow -= 2; aheadCol -= 2; break;
                    case DIR.DOWN: aheadRow += 2; break;
                    case DIR.LEFT: aheadCol -= 2; break;
                    case DIR.RIGHT: aheadCol += 2; break;
                }
                const blinky = ghosts[BLINKY];
                const bTile = getTile({ x: blinky.pixelX, y: blinky.pixelY });
                return {
                    col: aheadCol + (aheadCol - bTile.col),
                    row: aheadRow + (aheadRow - bTile.row)
                };
            }
            case CLYDE: {
                const gTile = getTile({ x: ghost.pixelX, y: ghost.pixelY });
                const dist = Math.sqrt(
                    Math.pow(pTile.col - gTile.col, 2) +
                    Math.pow(pTile.row - gTile.row, 2)
                );
                if (dist > 8) {
                    return { col: pTile.col, row: pTile.row };
                } else {
                    return ghost.scatterTarget;
                }
            }
        }
    } else if (ghost.mode === GHOST_SCATTER) {
        return ghost.scatterTarget;
    } else if (ghost.mode === GHOST_FRIGHTENED) {
        return {
            col: Math.floor(Math.random() * COLS),
            row: Math.floor(Math.random() * ROWS)
        };
    } else if (ghost.mode === GHOST_EATEN) {
        return { col: 14, row: 11 };
    }
    return { col: 14, row: 11 };
}

function getReverseDir(dir) {
    switch (dir) {
        case DIR.UP: return DIR.DOWN;
        case DIR.DOWN: return DIR.UP;
        case DIR.LEFT: return DIR.RIGHT;
        case DIR.RIGHT: return DIR.LEFT;
        default: return DIR.NONE;
    }
}

function updateGhost(ghost) {
    if (ghost.inHouse) {
        if (ghost.releaseTimer > 0) {
            ghost.releaseTimer--;
            return;
        }

        // Exit target: the tile just above the ghost house door (row 11, col 14)
        const exitCol = 14;
        const exitRow = 11;
        const exitX = exitCol * TILE + TILE / 2;
        const exitY = exitRow * TILE + TILE / 2;

        // Step 1: if not horizontally centered on col 14, move there first
        const centerX = exitCol * TILE + TILE / 2;
        if (Math.abs(ghost.pixelX - centerX) > ghost.speed) {
            if (ghost.pixelX < centerX) {
                ghost.pixelX += ghost.speed;
                ghost.dir = DIR.RIGHT;
            } else {
                ghost.pixelX -= ghost.speed;
                ghost.dir = DIR.LEFT;
            }
            return;
        }

        // Snap to column center
        ghost.pixelX = centerX;

        // Step 2: move upward toward the exit
        if (ghost.pixelY > exitY) {
            ghost.pixelY -= ghost.speed;
            ghost.dir = DIR.UP;
            return;
        }

        // Step 3: reached exit tile — release the ghost
        ghost.pixelX = exitX;
        ghost.pixelY = exitY;
        ghost.inHouse = false;
        ghost.mode = ghostMode;
        ghost.dir = DIR.LEFT;
        ghost.lastTile = '';
        return;
    }

    const gTile = getTile({ x: ghost.pixelX, y: ghost.pixelY });
    const cx = gTile.col * TILE + TILE / 2;
    const cy = gTile.row * TILE + TILE / 2;
    const atCenter = Math.abs(ghost.pixelX - cx) < 2 && Math.abs(ghost.pixelY - cy) < 2;

    if (ghost.mode === GHOST_EATEN && gTile.col === 14 && gTile.row === 11 && atCenter) {
        ghost.mode = ghostMode;
        ghost.speed = 1.2;
        ghost.inHouse = true;
        ghost.releaseTimer = 10;
        ghost.lastTile = '';
        return;
    }

    const tileKey = gTile.col + ',' + gTile.row;
    if (atCenter && tileKey !== ghost.lastTile) {
        ghost.lastTile = tileKey;
        ghost.pixelX = cx;
        ghost.pixelY = cy;

        const target = getTargetForGhost(ghost);
        const dirs = [DIR.UP, DIR.DOWN, DIR.LEFT, DIR.RIGHT];
        const reverse = getReverseDir(ghost.dir);
        let bestDir = ghost.dir;
        let bestDist = Infinity;

        for (const d of dirs) {
            if (d === reverse && ghost.mode !== GHOST_FRIGHTENED) continue;
            const nt = { col: gTile.col, row: gTile.row };
            switch (d) {
                case DIR.LEFT: nt.col--; break;
                case DIR.RIGHT: nt.col++; break;
                case DIR.UP: nt.row--; break;
                case DIR.DOWN: nt.row++; break;
            }
            let allowed = isWalkableForGhost(nt.col, nt.row);
            if (ghost.mode !== GHOST_EATEN) {
                allowed = allowed && maze[nt.row][nt.col] !== 4 && maze[nt.row][nt.col] !== 5;
            }
            if (allowed) {
                const dist = Math.pow(nt.col - target.col, 2) + Math.pow(nt.row - target.row, 2);
                if (dist < bestDist) {
                    bestDist = dist;
                    bestDir = d;
                }
            }
        }
        ghost.dir = bestDir;

        if (ghost.mode === GHOST_EATEN) {
            ghost.speed = 2.5;
        } else if (ghost.mode === GHOST_FRIGHTENED) {
            ghost.speed = 0.8;
        } else {
            ghost.speed = 1.2;
        }
    }

    switch (ghost.dir) {
        case DIR.LEFT: ghost.pixelX -= ghost.speed; break;
        case DIR.RIGHT: ghost.pixelX += ghost.speed; break;
        case DIR.UP: ghost.pixelY -= ghost.speed; break;
        case DIR.DOWN: ghost.pixelY += ghost.speed; break;
    }

    if (ghost.pixelX < -TILE / 2) ghost.pixelX = COLS * TILE + TILE / 2;
    if (ghost.pixelX > COLS * TILE + TILE / 2) ghost.pixelX = -TILE / 2;
}

function checkGhostCollision() {
    if (gameState !== 'playing') return;

    for (const ghost of ghosts) {
        if (ghost.inHouse) continue;
        const dist = Math.sqrt(
            Math.pow(pacman.pixelX - ghost.pixelX, 2) +
            Math.pow(pacman.pixelY - ghost.pixelY, 2)
        );

        if (dist < 14) {
            if (ghost.mode === GHOST_FRIGHTENED) {
                ghost.mode = GHOST_EATEN;
                score += eatGhostScore;
                eatGhostScore *= 2;
                updateScore();
                spawnParticles(ghost.pixelX, ghost.pixelY, 20, '#fff');
            } else if (ghost.mode !== GHOST_EATEN) {
                loseLife();
                return;
            }
        }
    }
}

function loseLife() {
    lives--;
    updateLives();
    gameState = 'dying';

    setTimeout(() => {
        if (lives <= 0) {
            gameState = 'gameover';
            gameOverEl.classList.remove('hidden');
        } else {
            resetPositions();
            gameState = 'ready';
        }
    }, 1000);
}

function updateScore() {
    scoreEl.textContent = score.toString().padStart(6, '0');
}

function updateLives() {
    livesEl.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const span = document.createElement('span');
        span.className = 'life';
        span.textContent = '●';
        livesEl.appendChild(span);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawParticles();

    for (const ghost of ghosts) {
        if (ghost.inHouse && ghost.releaseTimer > 0 && ghost.releaseTimer < 10) continue;
        drawGhost(ghost);
    }

    if (gameState !== 'gameover' && gameState !== 'dying') {
        drawPacman();
    }

    if (gameState === 'dying') {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function gameLoop() {
    if (gameState === 'playing' || gameState === 'ready') {
        updatePacman();
        updateGhostMode();

        const released = ghosts.filter(g => !g.inHouse);
        for (const ghost of released) {
            updateGhost(ghost);
        }
        for (const ghost of ghosts) {
            if (ghost.inHouse) updateGhost(ghost);
        }

        checkGhostCollision();
    }

    draw();
    animFrame = requestAnimationFrame(gameLoop);
}

function restartGame() {
    gameOverEl.classList.add('hidden');
    winEl.classList.add('hidden');
    score = 0;
    lives = 3;
    level = 1;
    particles = [];
    eatGhostScore = 200;
    updateScore();
    updateLives();
    initMaze();
    resetPositions();
    gameState = 'ready';
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': case 'w': case 'W':
            e.preventDefault();
            if (gameState === 'playing' || gameState === 'ready') {
                pacman.nextDir = DIR.UP;
            }
            break;
        case 'ArrowDown': case 's': case 'S':
            e.preventDefault();
            if (gameState === 'playing' || gameState === 'ready') {
                pacman.nextDir = DIR.DOWN;
            }
            break;
        case 'ArrowLeft': case 'a': case 'A':
            e.preventDefault();
            if (gameState === 'playing' || gameState === 'ready') {
                pacman.nextDir = DIR.LEFT;
            }
            break;
        case 'ArrowRight': case 'd': case 'D':
            e.preventDefault();
            if (gameState === 'playing' || gameState === 'ready') {
                pacman.nextDir = DIR.RIGHT;
            }
            break;
    }
});

document.getElementById('restart-btn').addEventListener('click', restartGame);
document.getElementById('restart-btn-win').addEventListener('click', restartGame);

restartGame();
gameLoop();
