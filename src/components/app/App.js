import InputField from '../inputField/InputField';
import Keyboard from '../keyboard/Keyboard';
import SegmentedControl from '../segmentedControl/SegmentedControl';
import {
  keyboardCapsStateKey, keyboardDefaultStateKey, keyboardShiftCapsStateKey,
  keyboardShiftStateKey, pressedKeyClassName, enLangKey, ruLangKey, darkThemeKey, lightThemeKey,
} from '../utils/const';
import {
  getCurrentLanguage, getCurrentTheme, setLocalStorageLanguage, setLocalStorageTheme,
} from '../utils/utils';

export default class App {
  body = document.body;

  constructor() {
    this.language = getCurrentLanguage();
    this.theme = getCurrentTheme();
    this.isLanguageSwitched = false;
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
    this.languageSegmentedControl = new SegmentedControl(this.language, 'EN', enLangKey, 'RU', ruLangKey, this.switchSegmentedControlLanguage);
    this.themeSegmentedControl = new SegmentedControl(this.theme, '🌑', darkThemeKey, '🌞', lightThemeKey, this.switchTheme);
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
    if (!value && !this.isRightShiftPressed) this.isLanguageSwitched = false;
  };

  setIsRightShiftPressed = (value) => {
    this.isRightShiftPressed = value;
    if (!value && !this.isLeftShiftPressed) this.isLanguageSwitched = false;
  };

  setIsAltPressed = (value) => {
    this.isAltPressed = value;
    if (!value) this.isLanguageSwitched = false;
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

  switchLanguage() {
    if (this.isLanguageSwitched) return;
    const isShift = this.isLeftShiftPressed || this.isRightShiftPressed;
    if (isShift && this.isAltPressed) {
      this.language = this.language === ruLangKey ? enLangKey : ruLangKey;
      setLocalStorageLanguage(this.language);
      this.isLanguageSwitched = true;
      this.languageSegmentedControl.changeBtnState(this.language);
    }
  }

  switchSegmentedControlLanguage = () => {
    this.language = this.language === ruLangKey ? enLangKey : ruLangKey;
    setLocalStorageLanguage(this.language);
    this.keyboard.setKeysValue();
    return this.language;
  };

  changeKeysTypeState(callback, ...args) {
    callback(...args);
    const { language: oldLang, keysType: oldKeysType } = this;
    this.setKeysType();
    this.switchLanguage();
    const { language: newLang, keysType: newKeysType } = this;
    if (oldKeysType === newKeysType && oldLang === newLang) return;
    this.keyboard.setKeysValue();
  }

  switchTheme = () => {
    this.theme = this.theme === darkThemeKey ? lightThemeKey : darkThemeKey;
    setLocalStorageTheme(this.theme);
    this.body.setAttribute('theme', this.theme);
    return this.theme;
  };

  start() {
    this.body.insertAdjacentHTML('afterbegin', `
    <div class="container">
      <p class="title">RSS Virtual Keyboard</p>
      <div class="main">
      </div>
      <div class="optionalButtons">
      </div>
      <p class="description">Keyboard created in Windows</p>
      <p class="description">Switch language: left alt + shift</p>
    </div>
  `);
    this.body.setAttribute('theme', this.theme);
    this.body.querySelector('.main').appendChild(this.inputField.getElement());
    this.body.querySelector('.main').appendChild(this.keyboard.keyboardContainer);
    this.body.querySelector('.optionalButtons').appendChild(this.languageSegmentedControl.getElement());
    this.body.querySelector('.optionalButtons').appendChild(this.themeSegmentedControl.getElement());

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
