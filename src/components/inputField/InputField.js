import { getInputField } from '../utils/utils';

export default class InputField {
  constructor(root) {
    this.root = root;

    this.inputElement = getInputField();
    this.inputElement.addEventListener('blur', this.inputElement.focus);
    this.inputElement.addEventListener('click', (e) => {
      this.root.startCursorPosition = e.currentTarget.selectionStart;
      this.root.ensCursorPosition = e.currentTarget.selectionEnd;
    });
    this.inputElement.addEventListener('select', (e) => {
      this.root.startCursorPosition = e.currentTarget.selectionStart;
      this.root.ensCursorPosition = e.currentTarget.selectionEnd;
    });
  }

  getElement() {
    return this.inputElement;
  }

  setInputValue(value) {
    this.inputElement.value = value;
  }

  setCursorPosition(start, end = start) {
    this.inputElement.setSelectionRange(start, end);
  }

  getCursorPosition() {
    return this.inputElement.selectionStart;
  }
}
