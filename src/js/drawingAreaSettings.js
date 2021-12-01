import Picker from "vanilla-picker";
import drawingAreaObj from "./classes/DrawingArea"

const drawingAreaWidthInput = document.querySelector('.drawing-area-size__width-input');
const drawingAreaHeightInput = document.querySelector('.drawing-area-size__height-input');
const drawingAreaBgColorDropdown = document.querySelector('.drawing-area-bg-color-dropdown')
const drawingAreaBgPickerEl = document.querySelector('.color-picker__drawing-area-bg');
const drawingAreaBrWidthLbl = document.querySelector('.drawing-area-br-width__label');
const drawingAreaBrWidthInput = document.querySelector('.drawing-area-br-width__input');
const drawingAreaBrColorDropdown = document.querySelector('.drawing-area-br-color-dropdown');
const drawingAreaBrColorPickerEl = document.querySelector('.color-picker__drawing-area-br-color');
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
    drawingAreaBrWidthLbl.querySelector('span').textContent = `(${drawingAreaObj.borderWidth}px)`;
}

function changeDrawingAreaBrStyle(e) {
    drawingAreaObj.borderStyle = e.target.value;
}

function initDrawingAreaSettings() {

    drawingAreaWidthInput.value = drawingAreaObj.width;
    drawingAreaHeightInput.value = drawingAreaObj.height;

    drawingAreaWidthInput.addEventListener('blur', changeDrawingAreaWidth);
    drawingAreaHeightInput.addEventListener('blur', changeDrawingAreaHeight);

    drawingAreaBgColorPicker = new Picker({
        color: drawingAreaObj.backgroundColor,
        parent: drawingAreaBgPickerEl,
        popup: false,
        onChange: function (color) {
            drawingAreaObj.backgroundColor = color.hex;
            drawingAreaBgColorDropdown.querySelector(".btn span").style.backgroundColor = color.hex;
        },
    });

    drawingAreaBrWidthLbl.querySelector('span').textContent = `(${drawingAreaObj.borderWidth}px)`;
    drawingAreaBrWidthInput.value = drawingAreaObj.borderWidth;
    drawingAreaBrWidthInput.addEventListener('input', changeDrawingAreaBrWidth);

    drawingAreaBrColorPicker = new Picker({
        color: drawingAreaObj.borderColor,
        parent: drawingAreaBrColorPickerEl,
        popup: false,
        onChange: function (color) {
            drawingAreaObj.borderColor = color.hex;
            drawingAreaBrColorDropdown.querySelector(".btn span").style.backgroundColor = color.hex;
        },
    });

    drawingAreaBrStyleSelect.value = drawingAreaObj.borderStyle;
    drawingAreaBrStyleSelect.addEventListener('change', changeDrawingAreaBrStyle);
}

export { initDrawingAreaSettings }