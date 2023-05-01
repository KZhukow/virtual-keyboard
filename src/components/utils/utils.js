import { enLangKey, languageKeyTypes, storageLanguageKey } from './const';

export function setLocalStorageLanguage(lang) {
  localStorage.setItem(storageLanguageKey, lang);
}

export function getCurrentLanguage() {
  const value = localStorage.getItem(storageLanguageKey);
  if (languageKeyTypes.includes(value)) {
    return value;
  }
  localStorage.setItem(storageLanguageKey, enLangKey);
  return enLangKey;
}

export function getKeyboardContainer() {
  const container = document.createElement('div');
  container.className = 'keyboard';
  container.id = 'keyboard';
  return container;
}

export function getKeyboardKey(
  keyCode,
  width = undefined,
  symbol = undefined,
  isIndicator = false,
) {
  const key = document.createElement('div');
  key.className = 'key';
  key.id = keyCode;
  if (width !== undefined) {
    key.style.width = `${width}px`;
  }
  if (symbol !== undefined) {
    key.innerHTML = symbol;
  }
  if (isIndicator) {
    const indicator = document.createElement('div');
    indicator.className = 'keyIndicator';
    indicator.id = `${keyCode}Indicator`;
    key.appendChild(indicator);
  }
  return key;
}

export function getInputField() {
  const input = document.createElement('textarea');
  input.setAttribute('autofocus', '');
  input.spellcheck = false;
  input.id = 'text';
  input.className = 'input-text';
  return input;
}
