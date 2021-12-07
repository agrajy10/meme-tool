import * as bootstrap from 'bootstrap'
import drawingAreaObj from './classes/DrawingArea';
import appState from './appState';
import Text from './classes/Text'

const addTextBtn = document.querySelector(".toolbar__add-text");

function insertTextItem() {
  const textObj = new Text();
  drawingAreaObj.appendItem(textObj);
  appState.items.push(textObj);
}

addTextBtn.addEventListener("click", insertTextItem);