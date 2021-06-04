let tableNumbers = [];

function drawTable () {
    const el = document.getElementById('desk-table-container');

    let tableHTML = '<table id="table1">';
    let index = 1;
    const edgeLen = 4;
    for (let i = 0; i < edgeLen ** 2; i++) {
        tableNumbers.push(i + 1);
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




function dragAbility (isDraggable) {
    [...document.getElementsByClassName('draggable-object')].forEach((el) => {
        el.draggable = isDraggable;
    });
}


function onDragStart (event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function onDragOver (event) {
    event.preventDefault();
}

function changeBgColor (el, color) {
    el.style.background = color;
    el.style.transitionProperty = 'background';
    el.style.transitionDuration = '800ms';
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

let quantityOfCorrectHits = 0;
let quantityOfIncorrectHits = 0;

function onDrop (event) {
    const id = event.dataTransfer.getData('text');
    event.dataTransfer.clearData();
    const draggableElement = ge(id);
    const dropzone = event.target;
    const draggableIndex = Number(id.substr(1));
    const index = Number(dropzone.id.substr(1)) - 1;
    if (quantityOfCorrectHits === 16) {
        ge('menu').style.backgroundColor = '#39ac7a'
    }
    if (draggableIndex - 1 === index) {
        dropzone.innerHTML = `${index + 1}`;
        dropzone.style.color = '#ffffff';
        dropzone.style.background = '#6bff56';
        dropzone.style.transitionProperty = 'background';
        dropzone.style.transitionDuration = '800ms';
        draggableElement.style.display = 'none';
        quantityOfCorrectHits++;
    } else {
        blink(dropzone, '#ff4444');
    }
}

function init () {
    drawTable();
    drawDraggables();
    setHardness();
    document.querySelectorAll('.draggable-object').forEach((el) => {
        el.addEventListener('dragstart', onDragStart);
    });
    document.querySelectorAll('.dropzone').forEach((el) => {
        el.addEventListener('dragover', onDragOver);
        el.addEventListener('drop', onDrop);
    });
}
