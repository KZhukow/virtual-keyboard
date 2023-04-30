import InputField from '../inputField/InputField';
import Keyboard from '../keyboard/Keyboard';
import {
  keyboardCapsStateKey, keyboardDefaultStateKey, keyboardShiftCapsStateKey,
  keyboardShiftStateKey, pressedKeyClassName,
} from '../utils/const';
import { getCurrentLanguage } from '../utils/utils';

export default class App {
  body = document.body;

  constructor() {
    this.language = getCurrentLanguage();
    this.isLeftShiftPressed = false;
    this.isRightShiftPressed = false;
    this.isCapsPressed = false;
    this.isAltPressed = false;
    this.keysType = keyboardDefaultStateKey;
    this.inputValue = '';
    this.startCursorPosition = 0;
    this.ensCursorPosition = 0;
    this.keyboard = new Keyboard(this);
    this.inputField = new InputField(this);
  }

  addInputValueSymbol = (symbol) => {
    const { inputValue: value, startCursorPosition: startPos, ensCursorPosition: endPos } = this;
    this.inputValue = value.slice(0, startPos) + symbol + value.slice(endPos);
    this.startCursorPosition += 1;
    this.ensCursorPosition = this.startCursorPosition;
  };

  delPrevSymbol = () => {
    const { inputValue: value, startCursorPosition: startPos, ensCursorPosition: endPos } = this;
    if (startPos === 0 && endPos === 0) return;
    this.inputValue = value.slice(0, startPos === endPos ? startPos - 1 : startPos)
    + value.slice(endPos);
    this.startCursorPosition = startPos === endPos ? startPos - 1 : startPos;
    this.ensCursorPosition = this.startCursorPosition;
  };

  delNextSymbol = () => {
    const { inputValue: value, startCursorPosition: startPos, ensCursorPosition: endPos } = this;
    if (startPos === value.length && endPos === value.length) return;
    this.inputValue = value.slice(0, startPos)
    + value.slice(startPos === endPos ? endPos + 1 : endPos);
    this.ensCursorPosition = this.startCursorPosition;
  };

  setKeysType() {
    const isShift = this.isLeftShiftPressed || this.isRightShiftPressed;
    const isCaps = this.isCapsPressed;
    if (!isShift && !isCaps) this.keysType = keyboardDefaultStateKey;
    if (isShift && !isCaps) this.keysType = keyboardShiftStateKey;
    if (!isShift && isCaps) this.keysType = keyboardCapsStateKey;
    if (isShift && isCaps) this.keysType = keyboardShiftCapsStateKey;
  }

  setIsLeftShiftPressed = (value) => {
    this.isLeftShiftPressed = value;
  };

  setIsRightShiftPressed = (value) => {
    this.isRightShiftPressed = value;
  };

  switchIsCapsPressed = () => {
    this.isCapsPressed = !this.isCapsPressed;
  };

  resetPressedStates = () => {
    this.isLeftShiftPressed = false;
    this.isRightShiftPressed = false;
    this.isAltPressed = false;
  };

  changeInputState(callback, ...args) {
    callback(...args);
    this.inputField.setInputValue(this.inputValue);
    this.inputField.setCursorPosition(this.startCursorPosition, this.ensCursorPosition);
  }

  changeKeysTypeState(callback, ...args) {
    callback(...args);
    const oldShiftState = this.keysType;
    this.setKeysType();
    const newShiftState = this.keysType;
    if (oldShiftState === newShiftState) return;
    this.keyboard.setKeysValue();
  }

  start() {
    this.body.insertAdjacentHTML('afterbegin', `
    <div class="container">
      <p class="title">RSS Virtual Keyboard</p>
      <div class="main">
      </div>
      <p class="description">Keyboard created in Windows</p>
      <p class="description">Switch language: left alt + shift</p>
    </div>
  `);
    this.body.querySelector('.main').appendChild(this.inputField.getElement());
    this.body.querySelector('.main').appendChild(this.keyboard.keyboardContainer);

    window.addEventListener('keydown', (e) => { e.preventDefault(); });
    window.addEventListener('keyup', (e) => { e.preventDefault(); });
    window.addEventListener('blur', () => {
      this.keyboard.keysData.forEach((key) => {
        key.getElement().classList.remove(pressedKeyClassName);
        key.resetClickedState?.();
      });
      this.changeKeysTypeState(this.resetPressedStates);
    });
  }
}
