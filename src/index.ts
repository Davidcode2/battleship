import '../css/style.css';
import { Game } from './game';

console.log('woot');

let gameboardSize = 8;
let gameRunning = false;

const newGameRandomGameButton = document.querySelector('#newRandomGame');
newGameRandomGameButton.addEventListener('click', () => {
  if (!gameRunning) {
    startGame();
  }
});

function startGame() {
  const game = new Game(gameboardSize);
  gameRunning = true;
}

const newGameButton = document.querySelector('#newGame');
newGameButton.addEventListener('click', () => {
  if (!confirmAction(showSizeModal)) {
    showSizeModal();
  }
});

function showSizeModal() {
  const sizeButtonsContainer = document.createElement('div');
  sizeButtonsContainer.classList.add('sizeButtonContainer');
  const sizeButtons = makeSizeChoosingBox();
  for (let sizeButton of sizeButtons) sizeButtonsContainer.appendChild(sizeButton);
  const modalObject = makeModal(sizeButtonsContainer);
  document.body.appendChild(modalObject.modal);
}

function chooseSize(event: any) {
  let element = document.getElementById(event.target.id)
  element.parentElement.parentElement.parentElement.remove();
  gameboardSize = +event.target.id;
  startGame();
}

function makeSizeChoosingBox() {
  let sizeButtons = new Array<HTMLElement>;
  for (let i = 0; i < 6; i++) {
    const sizeButton = document.createElement('div');
    sizeButton.id = `${i*2}`;
    sizeButton.classList.add('sizeButton');
    const size = `${i}0px`;
    sizeButton.style.width = size;
    sizeButton.style.setProperty('--sizeSelectBox', `${size}`);
    sizeButton.addEventListener('click', chooseSize);
    sizeButtons.push(sizeButton);
  }
  return sizeButtons;
}

function confirmAction(callback: Function) {
  let confirmationButton = makeConfirmatiomModal();
  if (confirmationButton) {
    confirmationButton.addEventListener('click', () => {
      resetGameScreen();
      gameRunning = false;
      confirmationButton.parentElement.parentElement.remove();
      callback();
    });
    return true;
  }
}

const replayButton = document.querySelector('#replay');
replayButton.addEventListener('click', () => {
  confirmAction(startGame);
});

function makeModal(content: HTMLDivElement) {
  let modal = document.createElement('div');
  let contentWrapper = document.createElement('div');
  let wrapper = document.createElement('div');
  let cancelCrossWrapper = document.createElement('div');
  let cancelButton = document.createElement('span');
  let confirmationButton = document.createElement('button');
  cancelCrossWrapper.classList.add('cancelCross');
  modal.classList.add('modal');
  wrapper.classList.add('textWrapper');
  confirmationButton.textContent = 'Confirm';
  cancelButton.textContent = 'X';
  cancelCrossWrapper.appendChild(cancelButton);
  modal.appendChild(cancelCrossWrapper);
  wrapper.appendChild(content);
  wrapper.appendChild(confirmationButton);
  modal.appendChild(wrapper);
  cancelButton.addEventListener('click', () => modal.remove());
  return { modal, confirmationButton };
}

function makeConfirmatiomModal() {
  if (gameRunning) {
    let confirmationText = document.createElement('div');
    confirmationText.textContent =
      'Are you sure you want to quit the running game and start a new one?';
    const confirmationModalObject = makeModal(confirmationText);
    document.body.appendChild(confirmationModalObject.modal);
    return confirmationModalObject.confirmationButton;
  }
}

function makeGenericModal() {
  let confirmationText = document.createElement('div');
  confirmationText.textContent = 'How large do you want the board to be?';
  const confirmationModalObject = makeModal(confirmationText);
  document.body.appendChild(confirmationModalObject.modal);
  return confirmationModalObject.confirmationButton;
}

function resetGameScreen() {
  const gameboardContainer = document.querySelector('.gameboardContainer');
  const children = gameboardContainer.children;
  gameboardContainer.removeChild(children.item(0));
  gameboardContainer.removeChild(children.item(0));
}
