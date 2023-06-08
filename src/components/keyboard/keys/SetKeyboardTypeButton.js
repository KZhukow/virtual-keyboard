import { pressedKeyClassName } from '../../utils/const';
import { getKeyboardKey } from '../../utils/utils';

export default class SetKeyboardTypeButton {
  constructor(root, keyCode, keyName, setState, isIndicator = false, width = undefined) {
    this.root = root;
    this.keyCode = keyCode;
    this.keyName = keyName;
    this.setState = setState;
    this.isIndicatorKey = isIndicator;
    this.isKeyClicked = false;
    this.isKeyPressed = false;

    this.key = getKeyboardKey(this.keyCode, width, this.keyName, isIndicator);
    this.key.addEventListener('mousedown', () => {
      this.isKeyClicked = true;
      if (!this.isKeyPressed) {
        this.root.changeKeysTypeState(this.setState, true);
        if (isIndicator) {
          this.toggleIndicator();
        }
      }
    });
    window.addEventListener('mouseup', () => {
      if (this.isKeyClicked && !this.isIndicatorKey && !this.isKeyPressed) {
        this.root.changeKeysTypeState(this.setState, false);
      }
      this.isKeyClicked = false;
    });

    window.addEventListener('keydown', (e) => {
      if (e.code === this.keyCode && !e.repeat) {
        this.isKeyPressed = true;
        if (!this.isKeyClicked) {
          this.root.changeKeysTypeState(this.setState, true);
          if (isIndicator) {
            this.toggleIndicator();
          }
        }
        this.key.classList.add(pressedKeyClassName);
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === this.keyCode) {
        this.isKeyPressed = false;
        if (!this.isIndicatorKey && !this.isKeyClicked) {
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

  resetClickedState() {
    this.isKeyClicked = false;
    this.isKeyPressed = false;
  }
}
