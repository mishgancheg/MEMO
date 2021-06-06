let gameHardness = 0; // Уровень сложности

const hardness = {
    0: {
        name: 'EASY',
        color: '#ddfff6',
        timeSec: 40
    },
    1: {
        name: 'NORMAL',
        color: '#fffadd',
        timeSec: 25
    },
    2: {
        name: 'HARD',
        color: '#ffe4dd',
        timeSec: 10
    },
}
function changeBgColor (el, color) {
    el.style.background = color;
    el.style.transitionProperty = 'background';
    el.style.transitionDuration = '800ms';
}
function setHardness () {
    const gameHardnessEl = ge('hardnessButton');
    const { name, color, timeSec } = hardness[gameHardness];
    gameHardnessEl.innerHTML = name;
    ['main-header', 'menu', 'desk-table-container', 'choose-overflow', 'choose-paddings', 'start', 'hardnessButton', 'fallsBlock'].forEach((elId) => {
        changeBgColor(ge(elId), color);
    });
    ge('timer').innerHTML = `Время для запоминания: ${timeSec} сек`;
}

function rotateHardness () {
    gameHardness = ++gameHardness % 3;
    setHardness();
    setTimeout(() => {
        ge('start').disabled = true;
    }, 2000);

}


let timer; // пока пустая переменная
function countdown (elId, sec) {  // функция обратного отсчета
    ge(elId).innerHTML = `${sec}  сек`;
    sec--;
    if (sec < 0) {
        clearTimeout(timer);
        ge(elId).style.opacity = '0';
    } else {
        timer = setTimeout(() => {
            countdown(elId, sec);
        }, 1000);
    }
}
function blinkDigits (el, color, durationMs) {
    const initialColor = el.style.color;
    const lightOnDuration = 1;
    const timeToEnableDrag = 2000;
    const lightOffDuration = durationMs;
    el.style.transitionDuration = `${lightOnDuration}ms`;
    el.style.color = color;
    el.style.textShadow ='0 0 4px #3D6F68';
    setTimeout(() => {
        setTimeout(() => {
            el.style.transitionDuration = '2000ms';
            el.style.color = initialColor;
            el.style.textShadow =`0 0 4px ${initialColor}`;
            setTimeout(() => {
                el.innerHTML = '';
                dragAbility(true);
            }, timeToEnableDrag);
        }, lightOffDuration);
    }, lightOnDuration);
}
function startButtonClick () {
    const arrOfDropzone = document.getElementsByClassName('dropzone');
    [...arrOfDropzone].forEach((el) => {
        blinkDigits(el, '#3D6F68', Math.abs(((gameHardness+1)*10000) - 40000));
    });

    countdown('timer', hardness[gameHardness].timeSec);
    ge('start').disabled = true;
    ge('hardnessButton').disabled = true;

}

