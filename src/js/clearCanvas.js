import * as bootstrap from 'bootstrap'
import appState from './appState'
import drawingAreaObj from './classes/DrawingArea';

const clearCanvasModal = new bootstrap.Modal(document.getElementById('clearCanvasModal'));
const clearBtn = document.querySelector('.clear-btn');

function clearDrawingArea() {
    appState.textBlocks.forEach(textBlock => {
        drawingAreaObj.removeItem(textBlock);
    });
    drawingAreaObj.removeMemeTemplate();
    drawingAreaObj.width = 500;
    drawingAreaObj.height = 500;
    appState.textBlocks = [];
    appState.currentSelectedItem = null;   
    clearCanvasModal.hide(); 
}

clearBtn.addEventListener('click', clearDrawingArea);