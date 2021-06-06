let tableNumbers = [];
const EDGE_LEN = 4;
const BLOCK_SIZE = 130;

function drawTable () {
    const el = document.getElementById('desk-table-container');

    let tableHTML = '<table id="table1">';
    let index = 1;
    for (let i = 0; i < EDGE_LEN ** 2; i++) {
        tableNumbers.push(i + 1);
    }
    tableNumbers = shuffle(tableNumbers);
    for (let i = 0; i < EDGE_LEN; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < EDGE_LEN; j++) {
            tableHTML += `<td id="i${tableNumbers[index - 1]}" class="dropzone">${tableNumbers[index - 1]}</td>`;
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
    for (let j = 1; j < EDGE_LEN ** 2 + 1; j++) {
        tableHTML += `<div id="d${j}" class="draggable-object" draggable="false">${j}</div>`;
    }
    el.innerHTML = tableHTML;
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
function gameLost(){
    const arrOfDropzone = document.getElementsByClassName('dropzone');
    const arrOfDraggable = document.getElementsByClassName('draggable-object');
    [...arrOfDropzone].forEach((dropzone) => {
        dropzone.style.background = '#ff7474';
        dropzone.style.transitionProperty = 'background';
        dropzone.style.transitionDuration = '500ms';
        dropzone.innerHTML = `${dropzone.id}`.replace('i', '');
    });
    [...arrOfDraggable].forEach((el) => {
        el.draggable = false;
    });
}
function gameWon(){

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
    if (draggableIndex - 1 === index) {
        dropzone.innerHTML = `${index + 1}`;
        dropzone.style.color = '#ffffff';
        dropzone.style.background = '#6bff56';
        dropzone.style.transitionProperty = 'background';
        dropzone.style.transitionDuration = '800ms';
        draggableElement.style.display = 'none';
        quantityOfCorrectHits++;
    } else {
        quantityOfIncorrectHits++;
        if(quantityOfIncorrectHits === 1){
            ge('fall1').style.opacity = '1';
        }
        if(quantityOfIncorrectHits === 2){
            ge('fall2').style.opacity = '1';
        }
        if(quantityOfIncorrectHits === 3){
            ge('fall3').style.opacity = '1';
        }
        if(quantityOfIncorrectHits === 3) {
            gameLost();
        }else{
            blink(dropzone, '#ff7474');
        }
    }
    if (quantityOfCorrectHits === EDGE_LEN ** 2) {
        gameWon();
    }


}

function init () {
    drawTable();
    ge('choose-box').style.width = `${BLOCK_SIZE * EDGE_LEN + 10}px`

    drawDraggables();
    setHardness();

    const blockSize = `${BLOCK_SIZE}px`;

    document.querySelectorAll('.draggable-object').forEach((el) => {
        el.style.width = blockSize;
        el.style.height = blockSize;
        el.style.flexBasis = blockSize;
        el.addEventListener('dragstart', onDragStart);
    });
    document.querySelectorAll('.dropzone').forEach((el) => {
        el.style.width = blockSize;
        el.style.height = blockSize;
        el.addEventListener('dragover', onDragOver);
        el.addEventListener('drop', onDrop);
    });
}
