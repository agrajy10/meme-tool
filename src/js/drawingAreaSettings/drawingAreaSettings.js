import Picker from "vanilla-picker";
import drawingAreaObj from "../classes/DrawingArea";
import elements from './elements'

let drawingAreaBgColorPicker;
let drawingAreaBrColorPicker;

function changeDrawingAreaWidth(e) {
    drawingAreaObj.width = e.target.value;
} 

function changeDrawingAreaHeight(e) {
    drawingAreaObj.height = e.target.value;
}

function changeDrawingAreaBrWidth(e) {
    drawingAreaObj.borderWidth = e.target.value;
    elements.drawingAreaBrCurrentWidthLbl.textContent = `(${drawingAreaObj.borderWidth}px)`;
}

function changeDrawingAreaBrStyle(e) {
    drawingAreaObj.borderStyle = e.target.value;
}

function initDrawingAreaSettings() {

    elements.drawingAreaWidthInput.value = drawingAreaObj.width;
    elements.drawingAreaHeightInput.value = drawingAreaObj.height;

    drawingAreaBgColorPicker = new Picker({
        color: drawingAreaObj.backgroundColor,
        parent: elements.drawingAreaColorPickerEl,
        popup: false,
        onChange: function (color) {
            drawingAreaObj.backgroundColor = color.hex;
            elements.drawingAreaColorPickerBtn.querySelector("span").style.backgroundColor = color.hex;
        },
    });

    elements.drawingAreaBrCurrentWidthLbl.textContent = `(${drawingAreaObj.borderWidth}px)`;
    elements.drawingAreaBrWidthInput.value = drawingAreaObj.borderWidth;

    drawingAreaBrColorPicker = new Picker({
        color: drawingAreaObj.borderColor,
        parent: elements.drawingAreaBrColorPickerEl,
        popup: false,
        onChange: function (color) {
            drawingAreaObj.borderColor = color.hex;
            elements.drawingAreaBrColorPickerBtn.querySelector(".btn span").style.backgroundColor = color.hex;
        },
    });

    elements.drawingAreaBrStyleSelect.value = drawingAreaObj.borderStyle;

    elements.drawingAreaWidthInput.addEventListener('blur', changeDrawingAreaWidth);
    elements.drawingAreaHeightInput.addEventListener('blur', changeDrawingAreaHeight);
    elements.drawingAreaBrWidthInput.addEventListener('input', changeDrawingAreaBrWidth);
    elements.drawingAreaBrStyleSelect.addEventListener('change', changeDrawingAreaBrStyle);
}

export default initDrawingAreaSettings;