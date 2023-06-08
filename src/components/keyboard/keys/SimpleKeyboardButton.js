import { pressedKeyClassName } from '../../utils/const';
import { getKeyboardKey } from '../../utils/utils';

export default class SimpleKeyboardButton {
  constructor(root, keyCode, keyName, symbol, width = undefined) {
    this.root = root;
    this.keyCode = keyCode;
    this.keyName = keyName;
    this.keyData = symbol;

    this.key = getKeyboardKey(this.keyCode, width, this.keyName);

    this.key.addEventListener('mousedown', () => {
      this.root.changeInputState(this.root.addInputValueSymbol, this.keyData);
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === this.keyCode) {
        this.root.changeInputState(this.root.addInputValueSymbol, this.keyData);
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
}
