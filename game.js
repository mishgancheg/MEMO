function ge (id) {
    return document.getElementById(id);
}

let tableNumbers = [];

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
    const el = document.getElementById('choose-box');

    let tableHTML = '';
    const edgeLen = 4;
    for (let j = 1; j < edgeLen ** 2 + 1; j++) {
        tableHTML += `<div id="d${j}" class="draggable-object" draggable="true">${j}</div>`;
    }
    el.innerHTML = tableHTML;
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

function onDrop (event) {
    const id = event.dataTransfer.getData('text');
    event.dataTransfer.clearData();
    const draggableElement = ge(id);
    const dropzone = event.target;
    const draggableIndex = Number(id.substr(1));
    const index = Number(dropzone.id.substr(1)) - 1;
    if (draggableIndex - 1 === index) {
        dropzone.style.background = '#6bff56';
        dropzone.style.transitionProperty = 'background';
        dropzone.style.transitionDuration = '800ms';
        draggableElement.style.display = 'none';
    } else {
        blink(dropzone, '#ff4444');
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
