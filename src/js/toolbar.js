import DomToImage from 'dom-to-image';
import FileSaver from 'file-saver';
import * as htmlToImage from 'html-to-image';
import drawingAreaObj from './classes/DrawingArea';
import appState from './appState';
import TextBlock from './classes/TextBlock';
import loadMemeTemplates from './loadMemeTemplates';

const addTextBtn = document.querySelector(".toolbar__add-text");
const memeTemplatesModal = document.querySelector('.meme-templates-modal');
const downloadBtn = document.querySelector('.toolbar__download-btn');

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

async function downloadMeme() {
  // this.disabled = true;
  // try {
  //   const blob = await DomToImage.toBlob(drawingAreaObj.el);
  //   window.saveAs(blob, 'meme.png');
  // } catch (error) {
  //   console.log(error);
  // } finally {
  //   this.disabled = false;
  // }
  
  htmlToImage.toPng(drawingAreaObj.el)
  .then(function (dataUrl) {
    var img = new Image();
    img.src = dataUrl;
    document.body.appendChild(img);
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
}

addTextBtn.addEventListener("click", insertTextItem);
memeTemplatesModal.addEventListener('shown.bs.modal', modalShown());
downloadBtn.addEventListener('click', downloadMeme);
