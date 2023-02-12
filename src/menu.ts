export class Menu {
  private gameRunning;

  // TODO: need to pass parameter for size
  private startGameFunction;

  private gameboardSize: number;

  constructor(
    gameRunning: boolean,
    startGameFunction: Function,
  ) {
    this.gameRunning = gameRunning;
    this.startGameFunction = startGameFunction;
    this.makeNewGameButton();
    this.makeReplayButton();
    this.makeNewRandomGameButton();
  }

  makeNewGameButton() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', this.createSizeModal.bind(this));
  }

  createSizeModal() {
    if (!this.confirmAction(this.showSizeModal.bind(this))) {
      this.showSizeModal();
    }
  }

  makeNewRandomGameButton() {
    const newGameRandomGameButton = document.querySelector('#newRandomGame');
    newGameRandomGameButton.addEventListener(
      'click',
      this.conditionalStartGame.bind(this)
    );
  }

  conditionalStartGame() {
    if (!this.gameRunning) {
      this.startGameFunction(this.gameboardSize);
      this.gameRunning = true;
    }
  }

  showSizeModal() {
    const sizeButtonsContainer = document.createElement('div');
    sizeButtonsContainer.classList.add('sizeButtonContainer');
    const sizeButtons = this.makeSizeChoosingBox();
    for (let sizeButton of sizeButtons)
      sizeButtonsContainer.appendChild(sizeButton);
    const modalObject = this.makeModal(sizeButtonsContainer);
    document.body.appendChild(modalObject.modal);
  }

  chooseSize(event: any) {
    let element = document.getElementById(event.target.id);
    element.parentElement.parentElement.parentElement.remove();
    this.gameboardSize = +event.target.id;
    this.conditionalStartGame();
  }

  makeSizeChoosingBox() {
    let sizeButtons = new Array<HTMLElement>();
    for (let i = 0; i < 6; i++) {
      const sizeButton = document.createElement('div');
      sizeButton.id = `${i * 2}`;
      sizeButton.classList.add('sizeButton');
      const size = `${i}0px`;
      sizeButton.style.width = size;
      sizeButton.style.setProperty('--sizeSelectBox', `${size}`);
      sizeButton.addEventListener('click', this.chooseSize.bind(this));
      sizeButtons.push(sizeButton);
    }
    return sizeButtons;
  }

  confirmAction(callback: Function) {
    let confirmationButton = this.makeConfirmatiomModal();
    if (confirmationButton) {
      console.log('is true');
      confirmationButton.addEventListener('click', () => {
        this.resetGameScreen();
        this.gameRunning = false;
        console.log('hit confirmation');
        confirmationButton.parentElement.parentElement.remove();
        callback();
      });
      return true;
    }
  }

  makeReplayButton() {
    const replayButton = document.querySelector('#replay');
    replayButton.addEventListener('click', () => {
      this.confirmAction(this.conditionalStartGame.bind(this));
    });
  }

  makeModal(content: HTMLDivElement) {
    let modal = document.createElement('div');
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

  makeConfirmatiomModal() {
    if (this.gameRunning) {
      let confirmationText = document.createElement('div');
      confirmationText.textContent =
        'Are you sure you want to quit the running game and start a new one?';
      const confirmationModalObject = this.makeModal(confirmationText);
      document.body.appendChild(confirmationModalObject.modal);
      return confirmationModalObject.confirmationButton;
    }
  }

  makeGenericModal() {
    let confirmationText = document.createElement('div');
    confirmationText.textContent = 'How large do you want the board to be?';
    const confirmationModalObject = this.makeModal(confirmationText);
    document.body.appendChild(confirmationModalObject.modal);
    return confirmationModalObject.confirmationButton;
  }

  resetGameScreen() {
    const gameboardContainer = document.querySelector('.gameboardContainer');
    const children = gameboardContainer.children;
    gameboardContainer.removeChild(children.item(0));
    gameboardContainer.removeChild(children.item(0));
  }
}
