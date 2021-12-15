import * as bootstrap from 'bootstrap'
import appState from "../appState";
import elements from "./elements";
import { textColorPicker } from "./textBlockSettings";

export function selectTextBlock(itemObj) {
    appState.currentSelectedItem && appState.currentSelectedItem.el.classList.remove("selected");
    appState.currentSelectedItem = itemObj;
    appState.currentSelectedItem.el.classList.add("selected");
    elements.textSettingsPanel.classList.remove('d-none');
    textColorPicker.setColor(appState.currentSelectedItem.textColor);
    elements.textFontSizeInput.value = appState.currentSelectedItem.fontSize;
    elements.textCurrentFontSize.textContent = `${appState.currentSelectedItem.fontSize}px`;
    elements.textLineHeightInput.value = appState.currentSelectedItem.lineHeight;
    elements.textCurrentLineHeight.textContent = appState.currentSelectedItem.lineHeight;
    elements.textLetterSpacingInput.value = appState.currentSelectedItem.letterSpacing;
    elements.textCurrentLetterSpacing.textContent = `${appState.currentSelectedItem.letterSpacing}px`;
    elements.textAlignmentOptions.forEach(option => {
        if(option.value === appState.currentSelectedItem.textAlign) {
            option.checked = true;
        }
    });
    elements.textTransformOptions.forEach(option => {
        if(option.value === appState.currentSelectedItem.textTransform) {
            option.checked = true;
        }
    });
    elements.textStyleBold.checked = appState.currentSelectedItem.fontWeight === '700' ? true : false;
    elements.textStyleItalic.checked = appState.currentSelectedItem.fontStyle === 'italic' ? true : false;
    elements.textStyleUnderline.checked = appState.currentSelectedItem.textDecoration === 'underline' ? true : false;
}

function unselectTextBlock(e) {
    if(appState.currentSelectedItem) {
        elements.textSettingsPanel.classList.add('d-none');
        appState.currentSelectedItem.saveContent();
        appState.currentSelectedItem.el.classList.remove("selected");
        appState.currentSelectedItem = null;
    }
}

document.addEventListener('click', function(e) {
    if(!e.target.closest('.drawing-area') && !e.target.closest('.toolbar')) {
        unselectTextBlock();
    }
});


export default selectTextBlock
export {unselectTextBlock}