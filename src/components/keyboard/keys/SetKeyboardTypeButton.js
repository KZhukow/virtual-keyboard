import { pressedKeyClassName } from '../../utils/const';
import { getKeyboardKey } from '../../utils/utils';

export default class SetKeyboardTypeButton {
  constructor(root, keyCode, keyName, setState, isIndicator = false, width = undefined) {
    this.root = root;
    this.keyCode = keyCode;
    this.keyName = keyName;
    this.setState = setState;
    this.isIndicatorKey = isIndicator;

    this.key = getKeyboardKey(this.keyCode, width, this.keyName, isIndicator);

    this.key.addEventListener('mousedown', () => {
      this.root.changeKeysTypeState(this.setState, true);
      if (isIndicator) {
        this.toggleIndicator();
      }
    });
    this.key.addEventListener('mouseup', () => {
      if (!this.isIndicatorKey) {
        this.root.changeKeysTypeState(this.setState, false);
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === this.keyCode && !e.repeat) {
        this.root.changeKeysTypeState(this.setState, true);
        this.key.classList.add(pressedKeyClassName);
        if (isIndicator) {
          this.toggleIndicator();
        }
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === this.keyCode) {
        if (!this.isIndicatorKey) {
          this.root.changeKeysTypeState(this.setState, false);
        }
        this.key.classList.remove(pressedKeyClassName);
      }
    });
  }

  getElement() {
    return this.key;
  }

  toggleIndicator() {
    const indicator = this.getElement().querySelector(`#${this.keyCode}Indicator`);
    indicator.classList.toggle('isActive');
  }
}
