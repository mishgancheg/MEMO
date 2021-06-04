let gameHardness = 0; // Уровень сложности

const hardness = {
    0: {
        name: 'EASY',
        color: '#ddfff6',
        timeSec: 30
    },
    1: {
        name: 'NORMAL',
        color: '#fffadd',
        timeSec: 20
    },
    2: {
        name: 'HARD',
        color: '#ffe4dd',
        timeSec: 10
    },
}

function setHardness () {
    const gameHardnessEl = ge('hardnessButton');
    const { name, color, timeSec } = hardness[gameHardness];
    gameHardnessEl.innerHTML = name;
    ['main-header', 'menu', 'desk-table-container', 'choose-overflow', 'choose-paddings'].forEach((elId) => {
        changeBgColor(ge(elId), color);
    });
    ge('timer').innerHTML = `Время запоминания: ${timeSec} сек`;
}

function rotateHardness () {
    gameHardness = ++gameHardness % 3;
    setHardness();
}


let timer; // пока пустая переменная
function countdown (eiId, sec) {  // функция обратного отсчета
    ge(eiId).innerHTML = `${sec}`;
    sec--;
    if (sec < 0) {
        clearTimeout(timer); // таймер остановится на нуле
    } else {
        timer = setTimeout(() => {
            countdown(eiId, sec);
        }, 1000);
    }
}

function startButtonClick () {
    const arrOfDropzone = document.getElementsByClassName('dropzone');
    const arrOfDraggable = document.getElementsByClassName('draggable-object');
    [...arrOfDropzone].forEach((el) => {
        blinkDigits(el, 'black', 30000);
    });
    [...arrOfDraggable].forEach((el) => {
        el.draggable = true;
    });
}

