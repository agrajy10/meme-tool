import Picker from "vanilla-picker";
import appState from "./appState";
import drawingAreaObj from "./classes/DrawingArea";

const textContentInput = document.querySelector(".text-item-content__input");
const textContentDeleteBtn = document.querySelector(".text-item-content__delete-btn");
const textContentColorPickerDropdown = document.querySelector(".text-item-content-color-dropdown");
const textContentColorPickerBtn = textContentColorPickerDropdown.querySelector(".btn");
const textContentColorPickerEl = document.querySelector(".color-picker__text-item-content");
const textContentFsLbl = document.querySelector('.text-content-fs__label span');
const textContentFsInput = document.querySelector('.text-content-fs__input');
const textContentTransform = document.querySelector('.text-content-transform');
const textContentTransformOptions = document.querySelectorAll('.text-content-transform__option');

const textContentColorPicker = new Picker({
  parent: textContentColorPickerEl,
  popup: false,
  onChange: function (color) {
    if (appState.currentSelectedItem) {
      appState.currentSelectedItem.textColor = color.hex;
      textContentColorPickerBtn.querySelector(".color-picker__indicator").style.backgroundColor = appState.currentSelectedItem.textColor;
    }
  },
});

function selectTextItem(itemObj) {
  appState.currentSelectedItem && appState.currentSelectedItem.el.classList.remove("item-selected");
  appState.currentSelectedItem = itemObj;
  appState.currentSelectedItem.el.classList.add("item-selected");
  textContentInput.disabled = false;
  textContentInput.value = appState.currentSelectedItem.itemContent;
  textContentDeleteBtn.disabled = false;
  textContentColorPickerBtn.disabled = false;
  textContentColorPickerBtn.querySelector(".color-picker__indicator").style.backgroundColor = appState.currentSelectedItem.textColor;
  textContentColorPicker.setColor(appState.currentSelectedItem.textColor);
  textContentFsInput.disabled = false;
  textContentFsInput.value = appState.currentSelectedItem.fontSize;
  textContentFsLbl.textContent = `(${appState.currentSelectedItem.fontSize}px)`;
  textContentTransformOptions.forEach(option => {
    option.disabled = false;
    if(option.value === appState.currentSelectedItem.textTransform) {
      option.checked = true;
    }
  });
}

function updateTextItemContent(e) {
  const target = e.target;
  if (target.value !== "") {
    target.classList.remove("is-invalid");
    appState.currentSelectedItem.itemContent = target.value;
  } else {
    target.classList.add("is-invalid");
  }
}

function deleteSelectedTextItem() {
  appState.items = appState.items.filter(
    (item) => item !== appState.currentSelectedItem
  );
  drawingAreaObj.removeItem(appState.currentSelectedItem);
  appState.currentSelectedItem = null;
  textContentInput.disabled = true;
  textContentInput.value = "";
  textContentDeleteBtn.disabled = true;
  textContentColorPickerBtn.disabled = true;
  textContentFsInput.disabled = true;
  textContentTransformOptions.forEach(option => {
    option.disabled = true;
  });
}

function changeTextItemFontSize(e) {
  appState.currentSelectedItem.fontSize = e.target.value;
  textContentFsLbl.textContent = `(${appState.currentSelectedItem.fontSize}px)`;
}

function changeTextItemTransform(e) {
  const value = e.target.value;
  appState.currentSelectedItem.textTransform = value;
}

textContentInput.addEventListener("change", updateTextItemContent);
textContentDeleteBtn.addEventListener("click", deleteSelectedTextItem);
textContentFsInput.addEventListener('input', changeTextItemFontSize);
textContentTransform.addEventListener('change', changeTextItemTransform);

export { selectTextItem };
