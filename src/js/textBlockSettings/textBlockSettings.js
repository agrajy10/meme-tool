import Picker from "vanilla-picker";
import appState from "../appState";
import elements from "./elements";
import drawingAreaObj from "../classes/DrawingArea";
import TextBlock from "../classes/TextBlock";

let textColorPicker;

function changeFontSize(e) {
  appState.currentSelectedItem.fontSize = e.target.value;
  elements.textCurrentFontSize.textContent = `${appState.currentSelectedItem.fontSize}px`;
}

function changeTextLineHeight(e) {
  appState.currentSelectedItem.lineHeight = e.target.value;
  elements.textCurrentLineHeight.textContent = appState.currentSelectedItem.lineHeight;
}

function changeTextLetterSpacing(e) {
  appState.currentSelectedItem.letterSpacing = e.target.value;
  elements.textCurrentLetterSpacing.textContent = `${appState.currentSelectedItem.letterSpacing}px`;
}

function changeTextAlignment(e) {
  const target = e.target;
  if(target.classList.contains('text-alignment__option')) {
    appState.currentSelectedItem.textAlign = target.value;
  }
}

function changeTextTransform(e) {
  const target = e.target;
  if(target.classList.contains('text-transform__option')) {
    appState.currentSelectedItem.textTransform = target.value;
  }
}

function changeTextStyle() {
  if(elements.textStyleBold.checked) {
    appState.currentSelectedItem.fontWeight = '700';
  } else {
    appState.currentSelectedItem.fontWeight = 'normal';
  }

  if(elements.textStyleItalic.checked) {
    appState.currentSelectedItem.fontStyle = 'italic';
  } else {
    appState.currentSelectedItem.fontStyle = 'normal';
  }

  if(elements.textStyleUnderline.checked) {
    appState.currentSelectedItem.textDecoration = 'underline';
  } else {
    appState.currentSelectedItem.textDecoration = 'none';
  }
}

function insertText() {
  const textBlockObj = new TextBlock();
  drawingAreaObj.appendItem(textBlockObj);
  appState.textBlocks.push(textBlockObj);
}

function deleteText(e) {
  if(appState.currentSelectedItem) {
    appState.textBlocks = appState.textBlocks.filter(
      (item) => item !== appState.currentSelectedItem
    );
    drawingAreaObj.removeItem(appState.currentSelectedItem);
    appState.currentSelectedItem = null;
    elements.textSettingsPanel.classList.add('d-none');
  }
}


function initializeTextBlockSettings() {

  elements.addTextBtn.addEventListener('click', insertText);

  textColorPicker = new Picker({
    parent: elements.textColorPickerEl,
    popup: false,
    onChange: function (color) {
      if (appState.currentSelectedItem) {
        appState.currentSelectedItem.textColor = color.hex;
      }
    },
  });
  elements.textFontSizeInput.addEventListener('input', changeFontSize);
  elements.textLineHeightInput.addEventListener('input', changeTextLineHeight);
  elements.textLetterSpacingInput.addEventListener('input', changeTextLetterSpacing);
  elements.textAlignment.addEventListener('click', changeTextAlignment);
  elements.textTransform.addEventListener('click', changeTextTransform);
  elements.textStyle.addEventListener('click', changeTextStyle);
  elements.deleteTextBtn.addEventListener('click', deleteText);
  document.addEventListener('keyup', function(e) {
    if(e.code === 'Delete') {
      deleteText();
    }
  });
}

export default initializeTextBlockSettings;
export { textColorPicker }
