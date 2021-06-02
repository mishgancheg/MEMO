function ge (id) {
    return document.getElementById(id);
}

let tableNumbers = [];
let dictOfObj = {};

function shuffle (array) {
    return array.sort(() => Math.random() - 0.5);
}

function drawTable () {
    const el = document.getElementById('desk-table-container');

    let tableHTML = '<table id="table1">';
    let index = 1;
    const edgeLen = 4;
    for (let i = 0; i < edgeLen ** 2; i++) {
        tableNumbers.push(i + 1);
        dictOfObj[i + 1] = true;
    }
    tableNumbers = shuffle(tableNumbers);
    for (let i = 0; i < edgeLen; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < edgeLen; j++) {
            tableHTML += `<td id="i${tableNumbers[index - 1]}" class="dropzone"">${tableNumbers[index - 1]}</td>`;
            index++;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    el.innerHTML = tableHTML;
}

function drawDraggables () {
    const el = ge('choose-box');

    let tableHTML = '';
    const edgeLen = 4;
    for (let j = 1; j < edgeLen ** 2 + 1; j++) {
        tableHTML += `<div id="d${j}" class="draggable-object" draggable="false">${j}</div>`;
    }
    for (let j = 0; j < 8; j++) {
        tableHTML += `<div class="hidden-objects"></div>`;
    }
    el.innerHTML = tableHTML;
}

let isStarted = false;

function startButton () {
    if (isStarted) {
        return false;
    }
    const arrOfDropzone = document.getElementsByClassName('dropzone');
    const arrOfDraggable = document.getElementsByClassName('draggable-object');
    [...arrOfDropzone].forEach((el) => {
        el.innerHTML = '';
        el.style.color = 'white';
    });
    [...arrOfDraggable].forEach((el) => {
        el.draggable = true;
    });
    isStarted = true;
}

function dragAbility (isDraggable) {
    [...document.getElementsByClassName('draggable-object')].forEach((el) => {
        el.draggable = isDraggable
    });
}

function showButton () {
    for (let i = 1; i <= 16; i++) {
        if (dictOfObj[i] === true) {
            ge(`i${i}`).innerHTML = `${i}`;
            blinkDigits(ge(`i${i}`), '#000000', 5000);
        }
    }
    dragAbility(false);
}


function onDragStart (event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function onDragOver (event) {
    event.preventDefault();
}

function blink (el, color) {
    const { style } = el;
    const initialColor = style.backgroundColor;
    const lightOnDuration = 1;
    const lightOffDuration = 1000;
    style.transitionDuration = `${lightOnDuration}ms`;
    style.backgroundColor = color;
    setTimeout(() => {
        style.transitionDuration = `${lightOffDuration}ms`;
        style.backgroundColor = initialColor;
    }, lightOnDuration);
}

function blinkDigits (el, color, durationMs) {
    const initialColor = el.style.color;
    const lightOnDuration = 1;
    const lightOffDuration = durationMs;
    el.style.transitionDuration = `${lightOnDuration}ms`;
    el.style.color = color;
    setTimeout(() => {
        el.style.transitionDuration = `${lightOffDuration}ms`;
        el.style.color = initialColor;
        setTimeout(() => {
            el.innerHTML = '';
            dragAbility(true);
        }, lightOffDuration);
    }, lightOnDuration);
}

//переменные для очков
let score = 0;
let factor = 1;

function onDrop (event) {
    const id = event.dataTransfer.getData('text');
    event.dataTransfer.clearData();
    const draggableElement = ge(id);
    const dropzone = event.target;
    const draggableIndex = Number(id.substr(1));
    const index = Number(dropzone.id.substr(1)) - 1;
    if (draggableIndex - 1 === index) {
        dictOfObj[index + 1] = false;
        //Анимации
        dropzone.innerHTML = `${index + 1}`;
        dropzone.style.color = '#ffffff';
        dropzone.style.background = '#6bff56';
        dropzone.style.transitionProperty = 'background';
        dropzone.style.transitionDuration = '800ms';
        draggableElement.style.display = 'none';
        //Очки
        score += 100 * factor ** 2;
        factor++;
        ge('score').innerHTML = `Score: ${score}`;
        ge('combo').innerHTML = `Combo: ${factor - 1}`;
    } else {
        blink(dropzone, '#ff4444');
        factor = 1;
        ge('combo').innerHTML = 'Combo: 0';
    }
}

function init () {
    drawTable();
    drawDraggables();
    document.querySelectorAll('.draggable-object').forEach((el) => {
        el.addEventListener('dragstart', onDragStart);
    });
    document.querySelectorAll('.dropzone').forEach((el) => {
        el.addEventListener('dragover', onDragOver);
        el.addEventListener('drop', onDrop);
    });
}
