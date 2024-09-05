const fieldElement = document.querySelector('#field');
const scoreElement = document.querySelector('#score'); // Додаємо посилання на елемент рахунку
let fieldMatrix = [];
let score = 0; // Оголошення змінної для рахунку

window.onload = () => startGame();

document.addEventListener('keyup', (event) => {
    if(event.key === 'ArrowLeft'){
        moveLeft();
        addNewBasic();
        drawField();
    } else if(event.key === 'ArrowRight'){
        moveRight();
        addNewBasic();
        drawField();
    } else if(event.key === 'ArrowUp'){
        moveUp();
        addNewBasic();
        drawField();
    } else if(event.key === 'ArrowDown'){
        moveDown();
        addNewBasic();
        drawField();
    }
});


const startGame = () => {
    fieldMatrix = new Array(4).fill(null).map(() => new Array(4).fill(0));
    score = 0; // Скидаємо рахунок
    updateScore(); // Оновлюємо відображення рахунку
    addNewBasic();
    addNewBasic();
    drawField();
}

const drawField = () => {
    fieldElement.innerHTML = '';
    fieldMatrix.flat().forEach(item => {
        const div = document.createElement('div');
        div.innerText = item === 0 ? '' : item;
        div.className = `tile ${item ? `x${item}` : ''}`;
        fieldElement.appendChild(div);
    });
}

const addNewBasic = () => {
    const basicValue = Math.random() >= 0.7 ? 4 : 2;
    let foundEmpty = false;
    while (!foundEmpty && checkFreeCell()) {
        let rowIndex = Math.floor(Math.random() * 4);
        let colIndex = Math.floor(Math.random() * 4);
        if (fieldMatrix[rowIndex][colIndex] === 0) {
            fieldMatrix[rowIndex][colIndex] = basicValue;
            foundEmpty = true;
        }
    }
}

const moveLeft = () => {
    let moved = false;
    fieldMatrix = fieldMatrix.map(row => {
        let filteredRow = row.filter(item => item > 0);
        let mergedRow = [];
        for (let i = 0; i < filteredRow.length; i++) {
            if (filteredRow[i] === filteredRow[i + 1]) {
                mergedRow.push(filteredRow[i] * 2);
                score += filteredRow[i] * 2;
                i++; // Пропускаємо наступний елемент
                moved = true;
            } else {
                mergedRow.push(filteredRow[i]);
            }
        }
        while (mergedRow.length < 4) {
            mergedRow.push(0);
        }
        return mergedRow;
    });
    updateScore(); // Оновлюємо відображення рахунку
    return moved;
}

const moveRight = () => {
    let moved = false;
    fieldMatrix = fieldMatrix.map(row => {
        let filteredRow = row.filter(item => item > 0);
        let mergedRow = [];
        for (let i = filteredRow.length - 1; i >= 0; i--) {
            if (filteredRow[i] === filteredRow[i - 1]) {
                mergedRow.unshift(filteredRow[i] * 2);
                score += filteredRow[i] * 2;
                i--; // Пропускаємо наступний елемент
                moved = true;
            } else {
                mergedRow.unshift(filteredRow[i]);
            }
        }
        while (mergedRow.length < 4) {
            mergedRow.unshift(0);
        }
        return mergedRow;
    });
    updateScore(); // Оновлюємо відображення рахунку
    return moved;
}

const moveUp = () => {
    let transposedMatrix = new Array(4).fill(null).map(() => new Array(4).fill(0));
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            transposedMatrix[i][j] = fieldMatrix[j][i];
        }
    }

    let moved = false;
    transposedMatrix = transposedMatrix.map(row => {
        let filteredRow = row.filter(item => item > 0);
        let mergedRow = [];
        for (let i = 0; i < filteredRow.length; i++) {
            if (filteredRow[i] === filteredRow[i + 1]) {
                mergedRow.push(filteredRow[i] * 2);
                score += filteredRow[i] * 2;
                i++; // Пропускаємо наступний елемент
                moved = true;
            } else {
                mergedRow.push(filteredRow[i]);
            }
        }
        while (mergedRow.length < 4) {
            mergedRow.push(0);
        }
        return mergedRow;
    });

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            fieldMatrix[j][i] = transposedMatrix[i][j];
        }
    }

    updateScore(); // Оновлюємо відображення рахунку
    return moved;
}

const moveDown = () => {
    let transposedMatrix = new Array(4).fill(null).map(() => new Array(4).fill(0));
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            transposedMatrix[i][j] = fieldMatrix[j][i];
        }
    }

    let moved = false;
    transposedMatrix = transposedMatrix.map(row => {
        let filteredRow = row.filter(item => item > 0);
        let mergedRow = [];
        for (let i = filteredRow.length - 1; i >= 0; i--) {
            if (filteredRow[i] === filteredRow[i - 1]) {
                mergedRow.unshift(filteredRow[i] * 2);
                score += filteredRow[i] * 2;
                i--; // Пропускаємо наступний елемент
                moved = true;
            } else {
                mergedRow.unshift(filteredRow[i]);
            }
        }
        while (mergedRow.length < 4) {
            mergedRow.unshift(0);
        }
        return mergedRow;
    });

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            fieldMatrix[j][i] = transposedMatrix[i][j];
        }
    }

    updateScore(); // Оновлюємо відображення рахунку
    return moved;
}

const checkFreeCell = () => {
    return fieldMatrix.flat().some(item => item === 0);
}

const updateScore = () => {
    scoreElement.innerText = score;
}
