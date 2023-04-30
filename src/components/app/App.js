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
    this.isShiftPressed = false;
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
    if (!this.isShiftPressed && !this.isCapsPressed) this.keysType = keyboardDefaultStateKey;
    if (this.isShiftPressed && !this.isCapsPressed) this.keysType = keyboardShiftStateKey;
    if (!this.isShiftPressed && this.isCapsPressed) this.keysType = keyboardCapsStateKey;
    if (this.isShiftPressed && this.isCapsPressed) this.keysType = keyboardShiftCapsStateKey;
  }

  setIsShiftPressed = (value) => {
    this.isShiftPressed = value;
  };

  switchIsCapsPressed = () => {
    this.isCapsPressed = !this.isCapsPressed;
  };

  changeInputState(callback, ...args) {
    callback(...args);
    this.inputField.setInputValue(this.inputValue);
    this.inputField.setCursorPosition(this.startCursorPosition, this.ensCursorPosition);
  }

  changeKeysTypeState(callback, ...args) {
    callback(...args);
    this.setKeysType();
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
      this
        .keyboard
        .keysData
        .forEach((key) => key.getElement().classList.remove(pressedKeyClassName));
    });
  }
}
