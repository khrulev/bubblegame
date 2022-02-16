const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (e)=>{
    if (e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        timeEl.innerHTML = `00:${time}`
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (e)=>{
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decreaseTime,1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();    
    } else {
        setTime (--time);
    }
}

function setTime (currentTime) {
    timeEl.innerHTML = `00:${currentTime<10?'0':''}${currentTime}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    
    const size = getRandomNumber(5,60);
    
    const {width, height} = board.getBoundingClientRect();
    const shiftX = getRandomNumber(0,width-size);
    const shiftY = getRandomNumber(0,height-size);
    
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${shiftY}px`;
    circle.style.left = `${shiftX}px`;
    circle.style.backgroundColor = getRandomColor();
    
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random()*(max-min)+min);
}

function getRandomColor() {
    let randomColor = Math.floor((Math.random()*1000000)+1);
    return "#f9f5ff"; //"#" + ("000000" + randomColor.toString(16)).slice(-6);
}

