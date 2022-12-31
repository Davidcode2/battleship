import '../css/style.css';
import { Game } from './game';

console.log('woot');

let gameRunning = false;
const newGameButton = document.querySelector('#newRandomGame');
newGameButton.addEventListener('click', () => {
  if (!gameRunning) {
    startGame();
  }
});

function startGame() {
  const game = new Game(8);
  gameRunning = true;
}

const replayButton = document.querySelector('#replay');
replayButton.addEventListener('click', () => {
  if (gameRunning) {
    let confirmationButton = makeConfirmatiomModal();
    confirmationButton.addEventListener('click', () => {
      resetGameScreen();
      gameRunning = false;
      startGame();
      confirmationButton.parentElement.parentElement.remove();
    });
  }
});

function makeConfirmatiomModal() {
  let confirmationModal = document.createElement('div');
  let confirmationText = document.createElement('div');
  let confirmationWrapper = document.createElement('div');
  let cancelCrossWrapper = document.createElement('div');
  let cancelButton = document.createElement('span');
  let confirmationButton = document.createElement('button');
  cancelCrossWrapper.classList.add('cancelCross');
  confirmationModal.classList.add('modal');
  confirmationWrapper.classList.add('textWrapper');
  confirmationText.textContent =
    'Are you sure you want to quit the running game and start a new one?';
  confirmationButton.textContent = 'Confirm';
  cancelButton.textContent = 'X';
  cancelCrossWrapper.appendChild(cancelButton);
  confirmationModal.appendChild(cancelCrossWrapper);
  confirmationWrapper.appendChild(confirmationText);
  confirmationWrapper.appendChild(confirmationButton);
  confirmationModal.appendChild(confirmationWrapper);
  document.body.appendChild(confirmationModal);
  cancelButton.addEventListener('click', () => confirmationModal.remove());
  return confirmationButton;
}

function resetGameScreen() {
  const gameboardContainer = document.querySelector('.gameboardContainer');
  const children = gameboardContainer.children;
  gameboardContainer.removeChild(children.item(0));
  gameboardContainer.removeChild(children.item(0));
}
