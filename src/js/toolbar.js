import * as bootstrap from 'bootstrap'
import drawingAreaObj from './classes/DrawingArea';
import appState from './appState';
import Text from './classes/Text'

const addTextBtn = document.querySelector(".toolbar__add-text");
const tooltipTriggerList = [].slice.call(document.querySelectorAll('.toolbar [data-bs-toggle="tooltip"]'))

tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

function insertTextItem() {
  const textObj = new Text();
  drawingAreaObj.appendItem(textObj);
  appState.items.push(textObj);
}

addTextBtn.addEventListener("click", insertTextItem);