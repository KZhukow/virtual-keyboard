import { getKeyboardContainer } from '../utils/utils';
import Key from './keys/CharacterKeyboardButton';
import FuncKey from './keys/FunctionKeyboardButton';
import SetStateKey from './keys/SetKeyboardTypeButton';
import SimpleKey from './keys/SimpleKeyboardButton';

export default class Keyboard {
  constructor(root) {
    this.root = root;
    this.keyboardContainer = getKeyboardContainer();
    this.keysData = [
      new Key(this.root, 'Backquote', '`', '~', 'ё', 'Ё'), new Key(this.root, 'Digit1', '1', '!', '1', '!'), new Key(this.root, 'Digit2', '2', '@', '2', '"'), new Key(this.root, 'Digit3', '3', '#', '3', '№'), new Key(this.root, 'Digit4', '4', '$', '4', ';'), new Key(this.root, 'Digit5', '5', '%', '5', '%'), new Key(this.root, 'Digit6', '6', '^', '6', ':'), new Key(this.root, 'Digit7', '7', '&', '7', '?'), new Key(this.root, 'Digit8', '8', '*', '8', '*'), new Key(this.root, 'Digit9', '9', '(', '9', '('), new Key(this.root, 'Digit0', '0', ')', '0', ')'), new Key(this.root, 'Minus', '-', '_', '-', '_'), new Key(this.root, 'Equal', '=', '+', '=', '+'), new FuncKey(this.root, 'Backspace', 'Backspace', [this.root.changeInputState.bind(this.root, this.root.delPrevSymbol)], 100),
      new SimpleKey(this.root, 'Tab', 'Tab', '\t', 50), new Key(this.root, 'KeyQ', 'q', 'Q', 'й', 'Й'), new Key(this.root, 'KeyW', 'w', 'W', 'ц', 'Ц'), new Key(this.root, 'KeyE', 'e', 'E', 'у', 'У'), new Key(this.root, 'KeyR', 'r', 'R', 'к', 'К'), new Key(this.root, 'KeyT', 't', 'T', 'е', 'Е'), new Key(this.root, 'KeyY', 'y', 'Y', 'н', 'Н'), new Key(this.root, 'KeyU', 'u', 'U', 'г', 'Г'), new Key(this.root, 'KeyI', 'i', 'I', 'ш', 'Ш'), new Key(this.root, 'KeyO', 'o', 'O', 'щ', 'Щ'), new Key(this.root, 'KeyP', 'p', 'P', 'з', 'З'), new Key(this.root, 'BracketLeft', '[', '{', 'х', 'Х'), new Key(this.root, 'BracketRight', ']', '}', 'ъ', 'Ъ'), new Key(this.root, 'Backslash', '\\', '|', '\\', '/'), new FuncKey(this.root, 'Delete', 'Del', [this.root.changeInputState.bind(this.root, this.root.delNextSymbol)], 44),
      new SetStateKey(this.root, 'CapsLock', 'Caps Lock', this.root.switchIsCapsPressed, true, 100),
    ];
    this.keysData.forEach((key) => this.keyboardContainer.appendChild(key.getElement()));
    this.setKeysValue();
  }

  setKeysValue() {
    this.keysData.forEach((key) => key.setKeyValue?.());
  }
}
