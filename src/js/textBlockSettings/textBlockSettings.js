import Picker from "vanilla-picker";
import appState from "../appState";
import elements from "./elements";
import { loadFontsList, loadFontFamily, loadSelectedFontFamilyVariant } from "./fontFamilyList";
import setTextPosition from "./textPosition";
import deleteSelectedText from "./deleteText";
import updateText from './updateText';

let textColorPicker;

function changeTextFontSize(e) {
  appState.currentSelectedItem.fontSize = e.target.value;
  elements.textCurrentFsLbl.textContent = `(${appState.currentSelectedItem.fontSize}px)`;
}

function changeTextTransform(e) {
  appState.currentSelectedItem.textTransform = e.target.value;
}

function changeTextAlignment(e) {
  appState.currentSelectedItem.textAlign = e.target.value;
}

function initializeTextBlockSettings() {
  loadFontsList();

  textColorPicker = new Picker({
    parent: elements.textColorPickerEl,
    popup: false,
    onChange: function (color) {
      if (appState.currentSelectedItem) {
        appState.currentSelectedItem.textColor = color.hex;
        elements.textColorPickerBtn.querySelector(".text-color-picker__indicator").style.backgroundColor = appState.currentSelectedItem.textColor;
      }
    },
  });

  elements.textInput.addEventListener("change", updateText);
  elements.textDeleteBtn.addEventListener("click", deleteSelectedText);
  elements.textFsInput.addEventListener('input', changeTextFontSize);
  elements.textFontSelect.addEventListener('change', function (e) {
    loadFontFamily(e.target.value);
  });
  elements.textFontVariantSelect.addEventListener('change', function (e) {
    loadSelectedFontFamilyVariant(e.target.value);
  });
  elements.textTransform.addEventListener('change', changeTextTransform);
  elements.textAlignment.addEventListener('click', changeTextAlignment);
  elements.textPosition.addEventListener('click', setTextPosition);
}

export default initializeTextBlockSettings;
export { textColorPicker }
