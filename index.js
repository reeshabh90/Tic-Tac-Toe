/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
let grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let winner = false;

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
    const header = document.getElementById("result");
    header.textContent = 'Player : X Computer: O';
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        // Value for X => 1
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        // Value for O => -1
        else if (gridValue === -1) {
            content = '<span class="cross">O</span>';
        }
        else if (gridValue === 0) {
            content = '';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    if (!winner) {
        var rowIdx = this.getAttribute("rowIdx");
        var colIdx = this.getAttribute("colIdx");
        let newValue = 1;
        if (grid[colIdx][rowIdx] === 0) {
            grid[colIdx][rowIdx] = newValue;
        }
        renderMainGrid();
        addClickHandlers();

        // check for winner
        checkWinner();
        if (!winner) {
            onComputerTurnClick();
        }
    }
}

function onComputerTurnClick() {
    const emptyBox = [];
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
            if (grid[colIdx][rowIdx] === 0) {
                emptyBox.push({ 'y': colIdx, 'x': rowIdx });
            }
        }
    }

    if (emptyBox.length) {
        let compSelectedCell = Math.ceil(Math.random() * emptyBox.length) - 1;
        var rowIdx = emptyBox[compSelectedCell].x;
        var colIdx = emptyBox[compSelectedCell].y;
        let newValue = -1;
        if (grid[colIdx][rowIdx] === 0) {
            grid[colIdx][rowIdx] = newValue;
        }

        renderMainGrid();
        addClickHandlers();
        // check for winner
        checkWinner();
    } else {
        // check for winner
        checkWinner();
    }
}

function checkWinner() {
    // Value for X = 1; value for O = 2
    // First Check all the rows
    const header = document.getElementById("result");
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let rowValue = 0;
        let resultSet = [];
        for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
            rowValue += grid[colIdx][rowIdx];
            resultSet.push({ 'x': colIdx, 'y': rowIdx })
        }
        if (rowValue === 3) {
            // X Wins
            header.textContent = 'Player wins';
            winner = true;
            markBoxes(resultSet);
        }
        if (rowValue === -3) {
            // O wins
            header.textContent = 'Computer wins';
            winner = true;
            markBoxes(resultSet);
        }
    }

    if (!winner) {
        //If no winner, check all the columns 
        for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
            let colValue = 0;
            let resultSet = [];
            for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
                colValue += grid[rowIdx][colIdx]
                resultSet.push({ 'x': rowIdx, 'y': colIdx })
            }
            if (colValue === 3) {
                // X Wins
                header.textContent = 'Player wins';
                winner = true;
                markBoxes(resultSet);
            }
            if (colValue === -3) {
                // O wins
                header.textContent = 'Computer wins';
                winner = true;
                markBoxes(resultSet);
            }
        }
    }

    if (!winner) {
        //If no winner, check diagonals
        if (grid[0][0] + grid[1][1] + grid[2][2] === 3) {
            // X wins
            header.textContent = 'Player wins';
            winner = true;
            markBoxes([{ 'x': 0, 'y': 0 }, { 'x': 1, 'y': 1 }, { 'x': 2, 'y': 2 }])
        }
        else if (grid[0][0] + grid[1][1] + grid[2][2] === -3) {
            // O wins
            header.textContent = 'Computer wins';
            winner = true;
            markBoxes([{ 'x': 0, 'y': 0 }, { 'x': 1, 'y': 1 }, { 'x': 2, 'y': 2 }])
        }

        if (grid[2][0] + grid[1][1] + grid[0][2] === 3) {
            // X wins
            header.textContent = 'Player wins';
            winner = true;
            markBoxes([{ 'x': 2, 'y': 0 }, { 'x': 1, 'y': 1 }, { 'x': 0, 'y': 2 }])
        }
        else if (grid[2][0] + grid[1][1] + grid[0][2] === -3) {
            // O wins
            header.textContent = 'Computer wins';
            winner = true;
            markBoxes([{ 'x': 2, 'y': 0 }, { 'x': 1, 'y': 1 }, { 'x': 0, 'y': 2 }])
        }
    }
}

function markBoxes(resultSet) {
    let boxes = document.getElementsByClassName("box");
    for (let set of resultSet) {
        for (var idx = 0; idx < boxes.length; idx++) {
            let row = boxes[idx].getAttribute('rowidx');
            let col = boxes[idx].getAttribute('colidx');
            if (set.x.toString() === col && set.y.toString() === row) {
                boxes[idx].style.border = '1px solid red'
            }
        }
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function btnReset() {
    grid = [];
    winner = false;
    startEngine();
}

function startEngine() {
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}

startEngine();
