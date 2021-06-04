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
    setHardness ()
}
