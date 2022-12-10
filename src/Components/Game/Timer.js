/* eslint-disable import/no-mutable-exports */
import { score } from './FormSpawner';
// eslint-disable-next-line import/no-cycle
import { intervalId, saveScore } from '../Pages/GamePage';
import { getTypeGame } from '../../utils/games';

let time = 10;

/*
**function that update the timer while the time is different from 0
** if time = 0 function change the gamediv and stop the setinterval
**if game is ranked add the save button and the eventlistenener
*/
function timerUpdate() {
  if (time === 0) {
    const divCanvas = document.querySelector('#gameDiv');
    divCanvas.innerHTML = ` 
    <div id ="divEndGameDisplay">
      <div id="textScore" class="infoGame">
        <p> Your score is ${score} </p>
      </div>
      <div id="save">
        <button type="submit" id ="saveButton" class = "buttonClass btn btn-primary">
        <p> Save Score </p>
      </div>
    </div>
    `;
    const saveButton = document.querySelector('#saveButton');
    saveButton.addEventListener('click', saveScore);

    if (getTypeGame() === 'competition') {
      saveButton.style.display = '';
    } else {
      saveButton.style.display = 'none';
    }

    clearTime();
    showDivButton();
    return;
  }
  time -= 1;
  const divTimer = document.querySelector('#timer');
  divTimer.innerHTML = `<p> Time left : ${time} second  </p>`;
}

/*
**function that show the button div hidden 
*/
function showDivButton() {
  const buttonContainer = document.querySelector('#buttonContainer');
  buttonContainer.style.display = '';
  const buttonStart = document.querySelector('#startButton');
  buttonStart.innerHTML = 'Restart';
}

/*
**function that stop the interval call
*/
function clearTime() {
  clearInterval(intervalId);
}

/*
**function that init the timer to 0
*/
function initTimer() {
  time = 10;
}

/*
**function that update the time 
*/
function updateTime(addTime) {
  time = addTime;
  const timerDiv = document.querySelector('#timer');
  timerDiv.innerHTML = `<p> Time left : ${time} second  </p>`;
}

export { initTimer, timerUpdate, updateTime, time, clearTime };
