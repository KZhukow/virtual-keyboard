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
      new SetStateKey(this.root, 'CapsLock', 'Caps Lock', this.root.switchIsCapsPressed, true, 100), new Key(this.root, 'KeyA', 'a', 'A', 'ф', 'Ф'), new Key(this.root, 'KeyS', 's', 'S', 'ы', 'Ы'), new Key(this.root, 'KeyD', 'd', 'D', 'в', 'В'), new Key(this.root, 'KeyF', 'f', 'F', 'а', 'А'), new Key(this.root, 'KeyG', 'g', 'G', 'п', 'П'), new Key(this.root, 'KeyH', 'h', 'H', 'р', 'Р'), new Key(this.root, 'KeyJ', 'j', 'J', 'о', 'О'), new Key(this.root, 'KeyK', 'k', 'K', 'л', 'Л'), new Key(this.root, 'KeyL', 'l', 'L', 'д', 'Д'), new Key(this.root, 'Semicolon', ';', ':', 'ж', 'Ж'), new Key(this.root, 'Quote', '\'', '"', 'э', 'Э'), new SimpleKey(this.root, 'Enter', 'Enter', '\n', 86),
      new SetStateKey(this.root, 'ShiftLeft', 'Shift', this.root.setIsLeftShiftPressed, false, 100), new Key(this.root, 'KeyZ', 'z', 'Z', 'я', 'Я'), new Key(this.root, 'KeyX', 'x', 'X', 'ч', 'Ч'), new Key(this.root, 'KeyC', 'c', 'C', 'с', 'С'), new Key(this.root, 'KeyV', 'v', 'V', 'м', 'М'), new Key(this.root, 'KeyB', 'b', 'B', 'и', 'И'), new Key(this.root, 'KeyN', 'n', 'N', 'т', 'Т'), new Key(this.root, 'KeyM', 'm', 'M', 'ь', 'Ь'), new Key(this.root, 'Comma', ',', '<', 'б', 'Б'), new Key(this.root, 'Period', '.', '>', 'ю', 'Ю'), new Key(this.root, 'Slash', '/', '?', '.', ','), new SimpleKey(this.root, 'ArrowUp', '▲', '▲'), new SetStateKey(this.root, 'ShiftRight', 'Shift', this.root.setIsRightShiftPressed, false, 86),
      new FuncKey(this.root, 'ControlLeft', 'Ctrl'), new FuncKey(this.root, 'MetaLeft', 'Win'), new SetStateKey(this.root, 'AltLeft', 'Alt', this.root.setIsAltPressed), new SimpleKey(this.root, 'Space', '', ' ', 330), new FuncKey(this.root, 'AltRight', 'Alt'), new SimpleKey(this.root, 'ArrowLeft', '◄', '◄'), new SimpleKey(this.root, 'ArrowDown', '▼', '▼'), new SimpleKey(this.root, 'ArrowRight', '►', '►'), new FuncKey(this.root, 'ControlRight', 'Ctrl'),
    ];
    this.keysData.forEach((key) => this.keyboardContainer.appendChild(key.getElement()));
    this.setKeysValue();
  }

  setKeysValue() {
    this.keysData.forEach((key) => key.setKeyValue?.());
  }
}
