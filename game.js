const playField = document.getElementById('playfield');
const tileSize = new Array(16);
const jqueryHelper = new JqueryHelper();
const helperFunction = new Helper();
let enableMove = false;
let scoreGame = 0;

/*
1) Сделать какие-то простейшие анимации при перемещении плиток, т.е. плитки должны перемещаться с места на место не моментально, а постепенно.
2) Добавить задержку перед появлением новой плитки, чтобы было понятнее, что именно происходит на игровом поле.
3) Управление мышкой должно быть реализовано. Можете для собственного удобства сделать также управление с клавиатуры, но управление мышкой должно быть.
4) Блокировка ввода - нужно блокировать ввод, когда анимации еще не закончены, чтобы не получилось так, что плитки еще движутся, а игрок уже делает новый ход, и получается каша из плиток.
*/

const initStage = () => {
    for (let i = 0; i < tileSize.length; i++) {
        let tile = newTile(0);
        tile.setAttribute('index', i);
        playField.appendChild(tile);
        tileSize[i] = tile;

    }
    randomTiles();
};


const newTile = (val) => {
    let tile = document.createElement('div');
    setTileValue(tile, val);
    return tile;
};


function setTileValue(tile, val) {
    tile.className = (`tile tile${val}`);
    tile.setAttribute('val', val);
    tile.innerHTML = val > 0 ? val : '';
}


function randomTiles() {
    let emptyTiles = [];
    for (let i = 0; i < tileSize.length; i++) {
        if (tileSize[i].getAttribute('val') == '0') {
            emptyTiles.push(tileSize[i]);
        }
    }
    let randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    setTileValue(randomTile, helperFunction.randomStartTile());
    jqueryHelper.setNewTileClass(randomTile);
    enableMove = true;
}



function moveUp() {
    if (enableMove) {
        enableMove = false;
        let tempUp = 0;
        for (let i = 4; i < tileSize.length; i++) {
            enableMove = false;
            tempUp = i;
            while (tempUp >= 4) {
                additionTile(tileSize[tempUp - 4], tileSize[tempUp]);
                tempUp -= 4;
            }
        }
        randomTiles();
        enableMove = true;
    }
}


function moveRight() {
    if (enableMove) {
        enableMove = false;
        let tempRight = 0;
        for (let i = 14; i >= 0; i--) {
            tempRight = i;
            while (tempRight % 4 != 3) {
                additionTile(tileSize[tempRight + 1], tileSize[tempRight]);
                tempRight += 1;
            }
        }
        randomTiles();
        enableMove = true;
    }
}

function moveLeft() {
    if (enableMove) {
        enableMove = false;
        let tempLeft = 0;
        for (let i = 1; i < tileSize.length; i++) {
            enableMove = false;
            tempLeft = i;
            while (tempLeft % 4 != 0) {
                additionTile(tileSize[tempLeft - 1], tileSize[tempLeft]);
                tempLeft -= 1;
            }
        }
        randomTiles();
        enableMove = true;
    }
}

function moveDown() {
    if (enableMove) {
        let tempDown = 0;
        for (var i = 11; i >= 0; i--) {
            enableMove = false;
            tempDown = i;
            while (tempDown <= 11) {
                additionTile(tileSize[tempDown + 4], tileSize[tempDown]);
                tempDown += 4;
            }
        }
        randomTiles();
        enableMove = true;
    }
}




function additionTile(earlyTile, currentTile) {
    let earlyValue = earlyTile.getAttribute('val');
    let currentValue = currentTile.getAttribute('val');
    if (currentValue != 0) {
        if (earlyValue == 0) {
            setTileValue(earlyTile, currentValue);
            setTileValue(currentTile, 0);
        } else if (earlyValue == currentValue) {
            setTileValue(earlyTile, earlyValue * 2);
            jqueryHelper.tileMerged(earlyTile);
            scoreGame += earlyValue * 2;
            jqueryHelper.addScore(scoreGame);
            setTileValue(currentTile, 0);
        }
    }
}


const gameWinner = () => {
    for (let i = 0; i < tileSize.length; i++) {
        if (tileSize[i].getAttribute('val') == 2048) {
            return true;
        }
    }
};



const overMove = () => {
    for (let i = 0; i < tileSize.length; i++) {
        if (tileSize[i].getAttribute('val') == '0') {
            return false;
        }
        if (i % 4 != 3) {
            if (helperFunction.compare(tileSize[i], tileSize[i + 1])) {
                return false;
            }
        }
        if (i < 12) {
            if (helperFunction.compare(tileSize[i], tileSize[i + 4])) {
                return false;
            }
        }
    }
    return true;
};



function listenMoveMouse() {
    let hammer = new Hammer.Manager(playField);
    var swipeBlock = new Hammer.Swipe({
        direction: Hammer.DIRECTION_ALL
    });
    hammer.add(swipeBlock);
    hammer.on('swipeleft', (e) => {
        moveLeft();
        gameManager();
    });

    hammer.on('swiperight', (e) => {
        moveRight();
        gameManager();
    });

    hammer.on('swipeup', (e) => {
        moveUp();
        gameManager();
    });

    hammer.on('swipedown', (e) => {
        moveDown();
        gameManager();
    });
}

function listenMoveKeyBoard() {
    addEventListener('keydown', (e) => {
        if (e.keyCode == 38 || e.keyCode == 87) {
            moveUp();
            gameManager();
        } else if (e.keyCode == 39 || e.keyCode == 68) {
            moveRight();
            gameManager();
        } else if (e.keyCode == 40 || e.keyCode == 83) {
            moveDown();
            gameManager();
        } else if (e.keyCode == 37 || e.keyCode == 65) {
            moveLeft();
            gameManager();
        }
    });
}





function gameManager() {
    if (overMove()) {
        alert('Lose!');
        helperFunction.clearStage();
        initStage();
    }
    if (gameWinner()) {
        alert('You Win!');
    }
}



initStage();
listenMoveMouse();
listenMoveKeyBoard();