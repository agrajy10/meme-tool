import drawingAreaObj from './classes/DrawingArea';
import appState from './appState';
import TextBlock from './classes/TextBlock';

const addTextBtn = document.querySelector(".toolbar__add-text");

function insertTextItem() {
  const textBlockObj = new TextBlock();
  drawingAreaObj.appendItem(textBlockObj);
  appState.items.push(textBlockObj);
}

addTextBtn.addEventListener("click", insertTextItem);