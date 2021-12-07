import Picker from "vanilla-picker";
import drawingAreaObj from "./classes/DrawingArea"

const drawingAreaWidthInput = document.querySelector('.drawing-area-size__width-input');
const drawingAreaHeightInput = document.querySelector('.drawing-area-size__height-input');
const drawingAreaColorPickerBtn = document.querySelector('.drawing-area-color-picker__btn');
const drawingAreaColorPickerEl = document.querySelector('.drawing-area-color-picker__el');
const drawingAreaBrCurrentWidthLbl = document.querySelector('.drawing-area-br-w__lbl span');
const drawingAreaBrWidthInput = document.querySelector('.drawing-area-br-w__input');
const drawingAreaBrColorPickerBtn = document.querySelector('.drawing-area-br-color-picker__btn');
const drawingAreaBrColorPickerEl = document.querySelector('.drawing-area-br-color-picker__el');
const drawingAreaBrStyleSelect = document.querySelector('.drawing-area-br-style__select');

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
    drawingAreaBrCurrentWidthLbl.textContent = `(${drawingAreaObj.borderWidth}px)`;
}

function changeDrawingAreaBrStyle(e) {
    drawingAreaObj.borderStyle = e.target.value;
}

function initDrawingAreaSettings() {

    drawingAreaWidthInput.value = drawingAreaObj.width;
    drawingAreaHeightInput.value = drawingAreaObj.height;

    drawingAreaBgColorPicker = new Picker({
        color: drawingAreaObj.backgroundColor,
        parent: drawingAreaColorPickerEl,
        popup: false,
        onChange: function (color) {
            drawingAreaObj.backgroundColor = color.hex;
            drawingAreaColorPickerBtn.querySelector("span").style.backgroundColor = color.hex;
        },
    });

    drawingAreaBrCurrentWidthLbl.textContent = `(${drawingAreaObj.borderWidth}px)`;
    drawingAreaBrWidthInput.value = drawingAreaObj.borderWidth;

    drawingAreaBrColorPicker = new Picker({
        color: drawingAreaObj.borderColor,
        parent: drawingAreaBrColorPickerEl,
        popup: false,
        onChange: function (color) {
            drawingAreaObj.borderColor = color.hex;
            drawingAreaBrColorPickerBtn.querySelector(".btn span").style.backgroundColor = color.hex;
        },
    });

    drawingAreaBrStyleSelect.value = drawingAreaObj.borderStyle;

    drawingAreaWidthInput.addEventListener('blur', changeDrawingAreaWidth);
    drawingAreaHeightInput.addEventListener('blur', changeDrawingAreaHeight);
    drawingAreaBrWidthInput.addEventListener('input', changeDrawingAreaBrWidth);
    drawingAreaBrStyleSelect.addEventListener('change', changeDrawingAreaBrStyle);
}

export default initDrawingAreaSettings;