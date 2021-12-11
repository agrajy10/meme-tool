import drawingAreaObj from './classes/DrawingArea';
import appState from './appState';
import TextBlock from './classes/TextBlock';
import loadMemeTemplates from './loadMemeTemplates';

const addTextBtn = document.querySelector(".toolbar__add-text");
const memeTemplatesModal = document.querySelector('.meme-templates-modal');

function insertTextItem() {
  const textBlockObj = new TextBlock();
  drawingAreaObj.appendItem(textBlockObj);
  appState.items.push(textBlockObj);
}

function modalShown() {
  let isExecuted = false;
  return function() {
    if(!isExecuted) {
      isExecuted = true;
      loadMemeTemplates();
    } 
  }
}

addTextBtn.addEventListener("click", insertTextItem);
memeTemplatesModal.addEventListener('shown.bs.modal', modalShown());