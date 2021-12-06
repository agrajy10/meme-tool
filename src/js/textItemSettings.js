import Picker from "vanilla-picker";
import WebFont, {
  load
} from "webfontloader";
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
const textContentFontSelect = document.querySelector('.text-content-ff__select');
const textContentFontVariantSelect = document.querySelector('.text-content-ff__variant-select');
const textContentAlignment = document.querySelector('.text-content-alignment');
const textContentPosition = document.querySelector('.text-content-position');
let fontsList;
const loadedFontsList = [];

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
  textContentTransform.querySelectorAll('.text-content-transform__option').forEach(option => {
    option.disabled = false;
    if (option.value === appState.currentSelectedItem.textTransform) {
      option.checked = true;
    }
  });
  textContentFontSelect.disabled = false;
  textContentFontVariantSelect.disabled = false;
  textContentFontSelect.value = appState.currentSelectedItem.fontFamily;
  textContentFontVariantSelect.value = appState.currentSelectedItem.fontWeight;
  textContentAlignment.querySelectorAll('.text-content-alignment__option').forEach(option => {
    option.disabled = false;
    if (option.value === appState.currentSelectedItem.textAlign) {
      option.checked = true;
    }
  });
  textContentPosition.querySelectorAll('.btn').forEach(button => {
    button.disabled = false;
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
  textContentFontSelect.disabled = true;
  textContentFontVariantSelect.disabled = true;
  textContentTransform.querySelectorAll('.text-content-transform__option').forEach(option => {
    option.disabled = true;
  });
  textContentAlignment.querySelectorAll('.text-content-alignment__option').forEach(option => {
    option.disabled = true;
  });
  textContentPosition.querySelectorAll('.btn').forEach(button => {
    button.disabled = true;
  });
}

function changeTextItemFontSize(e) {
  appState.currentSelectedItem.fontSize = e.target.value;
  textContentFsLbl.textContent = `(${appState.currentSelectedItem.fontSize}px)`;
}

function changeTextItemTransform(e) {
  appState.currentSelectedItem.textTransform = e.target.value;
}

async function loadFontsList() {
  try {
    const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_FONTS_API_KEY}&sort=popularity`);
    const data = await response.json();
    fontsList = data.items.slice(0, 100);
    textContentFontSelect.innerHTML = fontsList.map(font => `<option value="${font.family}" data-category="${font.category}">${font.family}</option>`);
    loadFontFamily(`${textContentFontSelect.value}`);
  } catch (error) {
    console.log(error);
  }
}

function loadFontFamily(fontFamily) {
  if (!loadedFontsList.includes(fontFamily)) {
    WebFont.load({
      google: {
        families: [`${fontFamily}:regular`]
      }
    });
    loadedFontsList.push(`${fontFamily}:regular`);
  }
  const selectedFont = fontsList.find(font => font.family === fontFamily);
  textContentFontVariantSelect.innerHTML = selectedFont.variants.filter(variant => {
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
  const str = `${textContentFontSelect.value}:${variant}`;
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

function changeTextItemAlignment(e) {
  appState.currentSelectedItem.textAlign = e.target.value;
}

function setTextItemPosition(e) {
  const width = drawingAreaObj.width;
  const height = drawingAreaObj.height;
  const cls = e.target.classList;
  switch (true) {
    case cls.contains('text-content-position__top-left'):
      appState.currentSelectedItem.leftPos = 0;
      appState.currentSelectedItem.topPos = 0;
      break;
    case cls.contains('text-content-position__top-right'):
      appState.currentSelectedItem.leftPos = width - appState.currentSelectedItem.width;
      appState.currentSelectedItem.topPos = 0;
      break;
    case cls.contains('text-content-position__top-center'):
      appState.currentSelectedItem.leftPos = (width / 2) - (appState.currentSelectedItem.width / 2);
      appState.currentSelectedItem.topPos = 0;
      break;
    case cls.contains('text-content-position__center'):
      appState.currentSelectedItem.leftPos = (width / 2) - (appState.currentSelectedItem.width / 2);
      appState.currentSelectedItem.topPos = (height / 2) - (appState.currentSelectedItem.height / 2);
      break;
    case cls.contains('text-content-position__center-left'):
      appState.currentSelectedItem.leftPos = 0;
      appState.currentSelectedItem.topPos = (height / 2) - (appState.currentSelectedItem.height / 2);
      break;
    case cls.contains('text-content-position__center-right'):
      appState.currentSelectedItem.leftPos = width - appState.currentSelectedItem.width;
      appState.currentSelectedItem.topPos  = (height / 2) - (appState.currentSelectedItem.height / 2);
      break;
    case cls.contains('text-content-position__bottom-left'):
      appState.currentSelectedItem.leftPos = 0;
      appState.currentSelectedItem.topPos = height - appState.currentSelectedItem.height;
      break;
    case cls.contains('text-content-position__bottom-right'):
      appState.currentSelectedItem.leftPos = width - appState.currentSelectedItem.width;
      appState.currentSelectedItem.topPos = height - appState.currentSelectedItem.height;
      break;
    case cls.contains('text-content-position__bottom-center'):
      appState.currentSelectedItem.leftPos = (width / 2) - (appState.currentSelectedItem.width / 2);
      appState.currentSelectedItem.topPos = height - appState.currentSelectedItem.height;
      break;
    default:
      break;
  }
}

textContentInput.addEventListener("change", updateTextItemContent);
textContentDeleteBtn.addEventListener("click", deleteSelectedTextItem);
textContentFsInput.addEventListener('input', changeTextItemFontSize);
textContentFontSelect.addEventListener('change', function (e) {
  loadFontFamily(e.target.value);
});
textContentFontVariantSelect.addEventListener('change', function (e) {
  loadSelectedFontFamilyVariant(e.target.value);
});
textContentTransform.addEventListener('change', changeTextItemTransform);
textContentAlignment.addEventListener('click', changeTextItemAlignment);
textContentPosition.addEventListener('click', setTextItemPosition);
loadFontsList();
export {
  selectTextItem
};