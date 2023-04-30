import {
  enLangKey, keyboardCapsStateKey, keyboardDefaultStateKey,
  keyboardShiftCapsStateKey, keyboardShiftStateKey, pressedKeyClassName, ruLangKey,
} from '../../utils/const';
import { getKeyboardKey } from '../../utils/utils';

export default class CharacterKeyboardButton {
  isCharacterKey = true;

  constructor(
    root,
    keyCode,
    enDefault,
    enShift,
    ruDefault,
    ruShift,
    width = undefined,
  ) {
    this.root = root;
    this.keyCode = keyCode;

    this.keyData = {
      [ruLangKey]: {
        [keyboardDefaultStateKey]: ruDefault,
        [keyboardShiftStateKey]: ruShift,
        [keyboardCapsStateKey]: ruDefault.toUpperCase(),
        [keyboardShiftCapsStateKey]: ruShift.toUpperCase(), // ТУТ ЛОВЕР кейс
      },
      [enLangKey]: {
        [keyboardDefaultStateKey]: enDefault,
        [keyboardShiftStateKey]: enShift,
        [keyboardCapsStateKey]: enDefault.toUpperCase(),
        [keyboardShiftCapsStateKey]: enShift.toUpperCase(), // тут ловер кейс
      },
    };

    this.key = getKeyboardKey(this.keyCode, width);
    this.key.addEventListener('mousedown', () => {
      this.root.changeInputState(this.root.addInputValueSymbol, this.getKeyValue());
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === this.keyCode) {
        this.root.changeInputState(this.root.addInputValueSymbol, this.getKeyValue());
        this.key.classList.add(pressedKeyClassName);
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === this.keyCode) {
        this.key.classList.remove(pressedKeyClassName);
      }
    });
  }

  getElement() {
    return this.key;
  }

  setKeyValue() {
    this.key.innerHTML = this.getKeyValue();
  }

  getKeyValue() {
    return this.keyData[this.root.language][this.root.keysType];
  }
}
