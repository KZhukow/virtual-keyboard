import { pressedKeyClassName } from '../../utils/const';
import { getKeyboardKey } from '../../utils/utils';

export default class FunctionKeyboardButton {
  constructor(root, keyCode, keyName, keyDownActions, keyUpActions, width = undefined) {
    this.root = root;
    this.keyCode = keyCode;
    this.keyName = keyName;
    this.keyDownActions = keyDownActions;
    this.keyUpActions = keyUpActions;

    this.key = getKeyboardKey(this.keyCode, width, this.keyName);

    this.key.addEventListener('mousedown', () => {
      this.keyDownActions.forEach((action) => action());
    });

    if (this.keyUpActions !== null) {
      this.key.addEventListener('mouseup', () => {
        this.keyUpActions.forEach((action) => action());
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.code === this.keyCode) {
        this.keyDownActions.forEach((action) => action());
        this.key.classList.add(pressedKeyClassName);
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === this.keyCode) {
        if (this.keyUpActions !== null) {
          this.keyUpActions.forEach((action) => { action(); });
        }
        this.key.classList.remove(pressedKeyClassName);
      }
    });
  }

  getElement() {
    return this.key;
  }
}
