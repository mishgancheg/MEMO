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

let mode = 0;
function startButton () {
    const arrOfDropzone = document.getElementsByClassName('dropzone');
    const arrOfDraggable = document.getElementsByClassName('draggable-object');
    [...arrOfDropzone].forEach((el) => {
        if(mode === 0){
            blinkDigits(el, 'black', 30000);
            countdown('time', 30);
        } else if(mode === 1){
            blinkDigits(el, 'black', 20000);
            countdown('time', 20);

        } else if(mode === 2){
            blinkDigits(el, 'black', 10000);
            countdown('time', 10);
        }
    });
    [...arrOfDraggable].forEach((el) => {
        el.draggable = true;
    });

}
let timer; // пока пустая переменная
function countdown(el, sec){  // функция обратного отсчета
    ge(el).innerHTML = `${sec}`;
    sec--;
    if (sec<0){
        clearTimeout(timer); // таймер остановится на нуле
    }
    else {
        timer = setTimeout(countdown, 1000);
    }
}
function chooseMode () {
    const el = ge('modeButton');
    const el2 = ge('timer');
    if(mode === 0){
        el.innerHTML = 'EASY';
        changeBgColor(ge('main-header'), '#ddfff6');
        changeBgColor(ge('menu'), '#ddfff6');
        changeBgColor(ge('desk-table-container'), '#ddfff6');
        changeBgColor(ge('choose-overflow'), '#ddfff6');
        changeBgColor(ge('choose-paddings'), '#ddfff6');
        el2.innerHTML = 'Время запоминания: 30 сек'+ mode;
        mode++;
    }else if(mode === 1){
        el.innerHTML = 'NORMAL';
        changeBgColor(ge('main-header'), '#fffadd');
        changeBgColor(ge('menu'), '#fffadd');
        changeBgColor(ge('desk-table-container'), '#fffadd');
        changeBgColor(ge('choose-overflow'), '#fffadd');
        changeBgColor(ge('choose-paddings'), '#fffadd');
        el2.innerHTML = 'Время запоминания: 20 сек'+ mode;
        mode++;
    }else if(mode === 2){
        el.innerHTML = 'HARD';
        changeBgColor(ge('main-header'), '#ffe4dd');
        changeBgColor(ge('menu'), '#ffe4dd');
        changeBgColor(ge('desk-table-container'), '#ffe4dd');
        changeBgColor(ge('choose-overflow'), '#ffe4dd');
        changeBgColor(ge('choose-paddings'), '#ffe4dd');
        el2.innerHTML = 'Время запоминания: 10 сек'+ mode;
        mode = 0;
    }
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
