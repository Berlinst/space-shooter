const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
const score = document.querySelector('.score');
const divTitle = document.querySelector('.divTitle');
let alienInterval;
var counter = 0;

// movement and fire function
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if(event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

// up function
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "0px") {
        return
    } else {
        let position = parseInt(topPosition);
        position -= 25;
        yourShip.style.top = `${position}px`;
    }
}

// down function
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "510px"){
        return
    } else {
        let position = parseInt(topPosition);
        position += 25;
        yourShip.style.top = `${position}px`;
    }
}

// fire function
function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let newLaser = document.createElement('img');
    newLaser.src = 'img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPosition}px`;
    newLaser.style.top = `${yPosition - 10}px`;
    return newLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');

        aliens.forEach((alien) => { 
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
                counter++;
                score.innerHTML = `Score: ${counter}`;
            }
        })

        if(xPosition === 340) {
            laser.remove();
        } else {
            laser.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}

// create aliens
function createAliens() {
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de imagens
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

// move aliens
function moveAlien(alien) {
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPosition <= 15) {
            if(Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            } else {
                gameOver();
            }
        } else {
            alien.style.left = `${xPosition - 4}px`;
        }
    }, 30);
}

// collision function
function checkLaserCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;
    if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if(laserTop <= alienTop && laserTop >= alienBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// start game 
const startEasy = document.querySelector('.easy')
const startMedium = document.querySelector('.medium')
const startHard = document.querySelector('.hard')

//easy
startEasy.addEventListener('click', (event) => {
    playGameEasy();
})

function playGameEasy() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    divTitle.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    alienInterval = setInterval(() => {
        createAliens();
    }, 2000);
}

//medium
startMedium.addEventListener('click', (event) => {
    playGameMedium();
})

function playGameMedium() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    divTitle.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    alienInterval = setInterval(() => {
        createAliens();
        createAliens();
    }, 3000);
}

//hard
startHard.addEventListener('click', (event) => {
    playGameHard();
})

function playGameHard() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    divTitle.style.display = 'none';
    window.addEventListener('keydown', flyShip);
    alienInterval = setInterval(() => {
        createAliens();
        createAliens();
    }, 2000);
}

// game over function
function gameOver() {
    counter = 0;
    score.innerHTML = `Score: `
    window.removeEventListener('keydown', flyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien) => alien.remove());
    let lasers = document.querySelectorAll('.laser');
    lasers.forEach((laser) => laser.remove());
    setTimeout(() => {
        alert('Game Over! Clique em OK para reiniciar.');
        yourShip.style.top = "250px";
        divTitle.style.display = 'block';
        startButton.style.display = 'block';
        startButton.style.display = 'flex';
        instructionsText.style.display = "block";
    });
}