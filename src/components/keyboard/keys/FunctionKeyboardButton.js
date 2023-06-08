import { pressedKeyClassName } from '../../utils/const';
import { getKeyboardKey } from '../../utils/utils';

export default class FunctionKeyboardButton {
  constructor(root, keyCode, keyName, actions = [], width = undefined) {
    this.root = root;
    this.keyCode = keyCode;
    this.keyName = keyName;
    this.keyActions = actions;

    this.key = getKeyboardKey(this.keyCode, width, this.keyName);

    this.key.addEventListener('mousedown', () => {
      this.keyActions.forEach((action) => action());
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === this.keyCode) {
        this.keyActions.forEach((action) => action());
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
