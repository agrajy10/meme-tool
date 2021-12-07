import drawingAreaObj from "../classes/DrawingArea";
import elements from "./elements";
import appState from "../appState";


function disableTextBlockSettings() {
    elements.textInput.disabled = true;
    elements.textInput.value = "";
    elements.textDeleteBtn.disabled = true;
    elements.textColorPickerBtn.disabled = true;
    elements.textFsInput.disabled = true;
    elements.textFontSelect.disabled = true;
    elements.textFontVariantSelect.disabled = true;
    elements.textTransform.querySelectorAll('.text-content-transform__option').forEach(option => {
        option.disabled = true;
    });
    elements.textAlignment.querySelectorAll('.text-content-alignment__option').forEach(option => {
        option.disabled = true;
    });
    elements.textPosition.querySelectorAll('.btn').forEach(option => {
        option.disabled = true;
    });
}

function deleteSelectedText() {
    appState.items = appState.items.filter(
        (item) => item !== appState.currentSelectedItem
    );
    drawingAreaObj.removeItem(appState.currentSelectedItem);
    appState.currentSelectedItem = null;
    disableTextBlockSettings();
}

export default deleteSelectedText