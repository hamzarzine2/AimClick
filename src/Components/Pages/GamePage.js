/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-constant-condition */
/* eslint-disable import/no-unresolved */
// changes
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { gsap } from 'gsap';
import { clearPage,makeOverflowAuto } from '../../utils/render';
import {
  drawOneFrame,
  setCanvasContextAndSize,
  initScore,
  updateSize,
  updateColor,
  score,
  drawOneFrameTroll,
} from '../Game/FormSpawner';
import { timerUpdate, time, updateTime, initTimer, clearTime } from '../Game/Timer';
import { getTypeGame } from '../../utils/games';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';

const main = document.querySelector('main');
let intervalId = 0;

const GamePage = () => {
  clearPage();
  makeOverflowAuto();
  clearTime();
  initTimer();
  renderPlayZone();
  setCanvasContextAndSize();
  startPersonnalisation();
  initScore();
  initPlayGround();
  updateSize(20);
  buttonAnime();
};

/*
**function that add all the div at the loading of the page
*/
function renderPlayZone() {
  const divGamePage = document.createElement('div');
  divGamePage.id = 'gamePageDiv';

  const divInformation = document.createElement('div');
  divInformation.id = 'gameInformation';

  const divTimer = document.createElement('div');
  divTimer.id = 'timer';
  divTimer.className = 'divBorder infoGame';
  divTimer.innerHTML = `<p> Time left : ${time} second  </p>`;

  const divScore = document.createElement('div');
  divScore.id = 'score';
  divScore.className = 'divBorder infoGame';
  divScore.innerHTML = ' <p> your score : 0 </p>';

  divInformation.appendChild(divTimer);
  divInformation.appendChild(divScore);

  divGamePage.appendChild(divInformation);

  const divCanvas = document.createElement('div');
  divCanvas.id = 'gameDiv';
  divCanvas.className = 'divBorder';
  divCanvas.innerHTML = '<canvas id="gameCanvas"/>';
  divGamePage.appendChild(divCanvas);

  main.appendChild(divGamePage);
}

/*
**function that add the different button to considering the different type of games
*/
function startPersonnalisation() {
  const divGamePage = document.getElementById('gamePageDiv');
  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'buttonContainer';
  const divButton = document.createElement('div');
  divButton.id = 'buttonDiv';

  const buttonStart = document.createElement('button');
  buttonStart.type = 'submit';
  buttonStart.id = 'startButton';
  buttonStart.className = 'buttonClass btn btn-primary';
  buttonStart.innerHTML = '<p> Start </p> ';

  const buttonPerso = document.createElement('button');
  buttonPerso.type = 'submit';
  buttonPerso.id = 'persoButton';
  buttonPerso.className = 'buttonClass btn btn-primary';
  buttonPerso.innerHTML = '<p> Customization </p> ';

  if (getTypeGame() !== 'quick') {
    buttonPerso.style.display = 'none';
  }

  const divPerso = document.createElement('div');
  divPerso.style.display = 'none';
  divPerso.id = 'divPerso';

  buttonPerso.addEventListener('click', displayPerso);
  buttonStart.addEventListener('click', startGame);

  divButton.appendChild(buttonStart);
  divButton.appendChild(buttonPerso);

  buttonContainer.appendChild(divButton);
  buttonContainer.appendChild(divPerso);

  divGamePage.appendChild(buttonContainer);
}

/*
**function that call the api to save a score in competition game
*/
async function saveScore() {
  const user = getAuthenticatedUser();
  const scoreToAdd = score;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      user: user.id,
      score: scoreToAdd,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: user.token,
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/users/addScore`, options);
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const etatAdding = await response.json();

  console.log('adding ? ', etatAdding);

  Navigate('/');
}

/*
**function that start the game and call all the method necessary
*/
function startGame(e) {
  e.preventDefault();
  if (time === 0) {
    initTimer();
  }
  initScore();
  initPlayGround();
  hideButton();
  if(getTypeGame() === 'troll'){
    drawOneFrameTroll();
  }else drawOneFrame();
  
  intervalId = setInterval(timerUpdate, 1000);
}

/*
**function that hide the button div
*/
function hideButton() {
  const buttonContainer = document.querySelector('#buttonContainer');
  buttonContainer.style.display = 'none';
}

/*
**function that set the canvas 
*/
function initPlayGround() {
  const divCanvas = document.querySelector('#gameDiv');
  divCanvas.innerHTML = '<canvas id="gameCanvas"/>';
  setCanvasContextAndSize();
}

/*
**function that set personalisation option 
*/
function displayPerso(e) {
  e.preventDefault();
  const divPerso = document.querySelector('#divPerso');
  if (divPerso.style.display === 'none') {
    divPerso.style.display = '';
    divPerso.innerHTML = `  
    <form id = "persoForm" >
      <div class="form-group">
        <label for="time">Time</label>
        <input type="number" class="form-control" id="time" >
      </div>  
      <div class="form-group">
        <label for="size">Size</label>
        <input type="number" class="form-control" id="size"  step="5">
      </div>
      <div class="form-group">
        <label for="color">Color</label>
        <input type="color" class="form-control" id="color" value="#ed2553">
      </div>
      <button type="submit" class="buttonClass btn btn-primary">Submit</button>
    </form>
  
  `;

    const form = document.querySelector('#persoForm');
    form.addEventListener('submit', personnalisation);
  } else {
    divPerso.style.display = 'none';
  }
}

/*
**function that update the personnalisation
*/
function personnalisation(e) {
  e.preventDefault();
  const divPerso = document.querySelector('#divPerso');
  divPerso.style.display = 'none';

  const newTime = document.querySelector('#time').value;
  const newSize = document.querySelector('#size').value;
  const c = document.querySelector('#color').value;

  if (newTime !== '' ) {
    updateTime(newTime);
  } 
  if( newSize !== ''){
      updateSize(newSize);

  }
    updateColor(c);
}

/*
**function that animate the div comming
*/
function buttonAnime() {
  gsap.from('#buttonContainer', {
    opacity: 0,
    y: 600,
    duration: 2,
  });

  gsap.from('#score', {
    opacity: 0,
    x: 300,
    duration: 2,
  });

  gsap.from('#timer', {
    opacity: 0,
    x: -100,
    duration: 2,
  });



}

export { GamePage, intervalId, saveScore };
