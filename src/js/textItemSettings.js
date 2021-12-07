import Picker from "vanilla-picker";
import WebFont from "webfontloader";
import appState from "./appState";
import drawingAreaObj from "./classes/DrawingArea";

const textInput = document.querySelector(".text-content__input");
const textDeleteBtn = document.querySelector(".text-content__delete-btn");
const textColorPickerBtn = document.querySelector(".text-color-picker__btn");
const textColorPickerEl = document.querySelector(".text-color-picker__el");
const textCurrentFsLbl = document.querySelector('.text-fs__lbl span');
const textFsInput = document.querySelector('.text-fs__input');
const textTransform = document.querySelector('.text-transform');
const textFontSelect = document.querySelector('.text-ff__select');
const textFontVariantSelect = document.querySelector('.text-ff__variant-select');
const textAlignment = document.querySelector('.text-alignment');
const textPosition = document.querySelector('.text-position');
const loadedFontsList = [];

let fontsList;
let textContentColorPicker;

export function selectTextBlock(itemObj) {
  appState.currentSelectedItem && appState.currentSelectedItem.el.classList.remove("item-selected");
  appState.currentSelectedItem = itemObj;
  appState.currentSelectedItem.el.classList.add("item-selected");
  textInput.disabled = false;
  textInput.value = appState.currentSelectedItem.itemContent;
  textDeleteBtn.disabled = false;
  textColorPickerBtn.disabled = false;
  textColorPickerBtn.querySelector(".text-color-picker__indicator").style.backgroundColor = appState.currentSelectedItem.textColor;
  textContentColorPicker.setColor(appState.currentSelectedItem.textColor);
  textFsInput.disabled = false;
  textFsInput.value = appState.currentSelectedItem.fontSize;
  textCurrentFsLbl.textContent = `(${appState.currentSelectedItem.fontSize}px)`;
  textTransform.querySelectorAll('.text-transform__option').forEach(option => {
    option.disabled = false;
    if (option.value === appState.currentSelectedItem.textTransform) {
      option.checked = true;
    }
  });
  textFontSelect.disabled = false;
  textFontVariantSelect.disabled = false;
  textFontSelect.value = appState.currentSelectedItem.fontFamily;
  textFontVariantSelect.value = appState.currentSelectedItem.fontWeight;
  textAlignment.querySelectorAll('.text-alignment__option').forEach(option => {
    option.disabled = false;
    if (option.value === appState.currentSelectedItem.textAlign) {
      option.checked = true;
    }
  });
  textPosition.querySelectorAll('.btn').forEach(option => {
    option.disabled = false;
  });
}

function updateText(e) {
  const target = e.target;
  if (target.value !== "") {
    target.classList.remove("is-invalid");
    appState.currentSelectedItem.itemContent = target.value;
  } else {
    target.classList.add("is-invalid");
  }
}

function deleteSelectedText() {
  appState.items = appState.items.filter(
    (item) => item !== appState.currentSelectedItem
  );
  drawingAreaObj.removeItem(appState.currentSelectedItem);
  appState.currentSelectedItem = null;
  textInput.disabled = true;
  textInput.value = "";
  textDeleteBtn.disabled = true;
  textColorPickerBtn.disabled = true;
  textFsInput.disabled = true;
  textFontSelect.disabled = true;
  textFontVariantSelect.disabled = true;
  textTransform.querySelectorAll('.text-content-transform__option').forEach(option => {
    option.disabled = true;
  });
  textAlignment.querySelectorAll('.text-content-alignment__option').forEach(option => {
    option.disabled = true;
  });
  textPosition.querySelectorAll('.btn').forEach(option => {
    option.disabled = true;
  });
}

function changeTextFontSize(e) {
  appState.currentSelectedItem.fontSize = e.target.value;
  textCurrentFsLbl.textContent = `(${appState.currentSelectedItem.fontSize}px)`;
}

function changeTextTransform(e) {
  appState.currentSelectedItem.textTransform = e.target.value;
}

async function loadFontsList() {
  try {
    const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_FONTS_API_KEY}&sort=popularity`);
    const data = await response.json();
    fontsList = data.items.slice(0, 100);
    textFontSelect.innerHTML = fontsList.map(font => `<option value="${font.family}" data-category="${font.category}">${font.family}</option>`);
    loadFontFamily(`${textFontSelect.value}`);
  } catch (error) {
    console.log(error);
  }
}

function loadFontFamily(fontFamily) {
  const selectedFont = fontsList.find(font => font.family === fontFamily);
  if (!loadedFontsList.includes(fontFamily)) {
    WebFont.load({
      google: {
        families: [`${fontFamily}:regular`]
      }
    });
    loadedFontsList.push(`${fontFamily}:regular`);
  }
  textFontVariantSelect.innerHTML = selectedFont.variants.filter(variant => {
    if (variant.includes('italic')) {
      return false;
    }
    return variant;
  }).map(variant => {
    return `<option value="${variant}" ${variant === 'regular' && 'selected'}>${variant}</option>`
  });
  if (appState.currentSelectedItem) {
    appState.currentSelectedItem.fontFamily = {
      fontFamily: fontFamily,
      fontCategory: selectedFont.category
    };
    appState.currentSelectedItem.fontWeight = 'regular';
  }
}

function loadSelectedFontFamilyVariant(variant) {
  const str = `${textFontSelect.value}:${variant}`;
  if (!loadedFontsList.includes(str)) {
    WebFont.load({
      google: {
        families: [str]
      }
    });
    loadedFontsList.push(str);
  }
  if (appState.currentSelectedItem) {
    appState.currentSelectedItem.fontWeight = variant;
  }
}

function changeTextAlignment(e) {
  appState.currentSelectedItem.textAlign = e.target.value;
}

function setTextPosition(e) {
  const width = drawingAreaObj.width;
  const height = drawingAreaObj.height;
  const cls = e.target.classList;
  switch (true) {
    case cls.contains('text-position__top-left'):
      appState.currentSelectedItem.leftPos = 0;
      appState.currentSelectedItem.topPos = 0;
      break;
    case cls.contains('text-position__top-right'):
      appState.currentSelectedItem.leftPos = width - appState.currentSelectedItem.width;
      appState.currentSelectedItem.topPos = 0;
      break;
    case cls.contains('text-position__top-center'):
      appState.currentSelectedItem.leftPos = (width / 2) - (appState.currentSelectedItem.width / 2);
      appState.currentSelectedItem.topPos = 0;
      break;
    case cls.contains('text-position__center'):
      appState.currentSelectedItem.leftPos = (width / 2) - (appState.currentSelectedItem.width / 2);
      appState.currentSelectedItem.topPos = (height / 2) - (appState.currentSelectedItem.height / 2);
      break;
    case cls.contains('text-position__center-left'):
      appState.currentSelectedItem.leftPos = 0;
      appState.currentSelectedItem.topPos = (height / 2) - (appState.currentSelectedItem.height / 2);
      break;
    case cls.contains('text-position__center-right'):
      appState.currentSelectedItem.leftPos = width - appState.currentSelectedItem.width;
      appState.currentSelectedItem.topPos  = (height / 2) - (appState.currentSelectedItem.height / 2);
      break;
    case cls.contains('text-position__bottom-left'):
      appState.currentSelectedItem.leftPos = 0;
      appState.currentSelectedItem.topPos = height - appState.currentSelectedItem.height;
      break;
    case cls.contains('text-position__bottom-right'):
      appState.currentSelectedItem.leftPos = width - appState.currentSelectedItem.width;
      appState.currentSelectedItem.topPos = height - appState.currentSelectedItem.height;
      break;
    case cls.contains('text-position__bottom-center'):
      appState.currentSelectedItem.leftPos = (width / 2) - (appState.currentSelectedItem.width / 2);
      appState.currentSelectedItem.topPos = height - appState.currentSelectedItem.height;
      break;
    default:
      break;
  }
}

function initializeTextBlockSettings() {
  loadFontsList();
  textInput.addEventListener("change", updateText);
  textDeleteBtn.addEventListener("click", deleteSelectedText);
  textContentColorPicker = new Picker({
    parent: textColorPickerEl,
    popup: false,
    onChange: function (color) {
      if (appState.currentSelectedItem) {
        appState.currentSelectedItem.textColor = color.hex;
        textColorPickerBtn.querySelector(".text-color-picker__indicator").style.backgroundColor = appState.currentSelectedItem.textColor;
      }
    },
  });
  textFsInput.addEventListener('input', changeTextFontSize);
  textFontSelect.addEventListener('change', function (e) {
    loadFontFamily(e.target.value);
  });
  textFontVariantSelect.addEventListener('change', function (e) {
    loadSelectedFontFamilyVariant(e.target.value);
  });
  textTransform.addEventListener('change', changeTextTransform);
  textAlignment.addEventListener('click', changeTextAlignment);
  textPosition.addEventListener('click', setTextPosition);
}

export default initializeTextBlockSettings
