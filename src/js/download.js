import FileSaver from 'file-saver';
import * as htmlToImage from 'html-to-image';
import appState from './appState';
import drawingAreaObj from './classes/DrawingArea';
import { unselectTextBlock } from './textBlockSettings/selectText';

const downloadBtn = document.querySelector('.download-modal__download-btn');
const downloadFileName = document.querySelector('.download-modal__filename');
const downloadErrorAlert = document.querySelector('.download-modal .alert')

async function downloadMemeTemplate() {
    try {
        downloadErrorAlert.classList.add('d-none');
        if(appState.currentSelectedItem) {
            unselectTextBlock();
        }
        //calculate width and height of each text block
        if(appState.textBlocks.length) {
            appState.textBlocks.forEach(item => {
                const {width, height} =  item.el.children[0].getBoundingClientRect();
                item.el.style.width = `${width + 4}px`; // add additional 4pixels to prevent text from breaking down into next line
                item.el.style.height = `${height}px`;
            });
        }
        const dataURL = await htmlToImage.toBlob
            (
                drawingAreaObj.el, 
                {
                    pixelRatio: 1, 
                    canvasHeight: drawingAreaObj.height, 
                    canvasWidth : drawingAreaObj.width
                }
            );
        window.saveAs(dataURL, `${downloadFileName.value}.png`);
        //unset calculated width and height of each text block after download
        if(appState.textBlocks.length) {
            appState.textBlocks.forEach(item => {
                item.el.style.width = ''; // add additional 4pixels to prevent text from breaking down into next line
                item.el.style.height = '';
            });
        }
    } catch(error) {
        downloadErrorAlert.classList.remove('d-none');
        downloadErrorAlert.textContent = error.message;
    }
}

downloadBtn.addEventListener('click', downloadMemeTemplate);