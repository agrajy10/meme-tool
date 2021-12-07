import appState from "../appState";
import elements from "./elements";
import { textColorPicker } from "./textBlockSettings";

function enableTextBlockSettings() {
    elements.textInput.disabled = false;
    elements.textDeleteBtn.disabled = false;
    elements.textColorPickerBtn.disabled = false;
    elements.textFsInput.disabled = false;
    elements.textTransform.querySelectorAll('.text-transform__option').forEach(option => {
        option.disabled = false;
        if (option.value === appState.currentSelectedItem.textTransform) {
            option.checked = true;
        }
    });
    elements.textAlignment.querySelectorAll('.text-alignment__option').forEach(option => {
        option.disabled = false;
        if (option.value === appState.currentSelectedItem.textAlign) {
            option.checked = true;
        }
    });
    elements.textPosition.querySelectorAll('.btn').forEach(option => {
        option.disabled = false;
    });
    elements.textFontSelect.disabled = false;
    elements.textFontVariantSelect.disabled = false;
}

export function selectTextBlock(itemObj) {
    appState.currentSelectedItem && appState.currentSelectedItem.el.classList.remove("item-selected");
    appState.currentSelectedItem = itemObj;
    appState.currentSelectedItem.el.classList.add("item-selected");
    enableTextBlockSettings();
    elements.textInput.value = appState.currentSelectedItem.itemContent;
    elements.textColorPickerBtn.querySelector(".text-color-picker__indicator").style.backgroundColor = appState.currentSelectedItem.textColor;
    textColorPicker.setColor(appState.currentSelectedItem.textColor);
    elements.textFsInput.value = appState.currentSelectedItem.fontSize;
    elements.textCurrentFsLbl.textContent = `(${appState.currentSelectedItem.fontSize}px)`;
    elements.textFontSelect.value = appState.currentSelectedItem.fontFamily;
    elements.textFontVariantSelect.value = appState.currentSelectedItem.fontWeight !== '400' ? appState.currentSelectedItem.fontWeight : 'regular';
}


export default selectTextBlock