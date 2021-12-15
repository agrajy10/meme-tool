import Scrollbar from 'smooth-scrollbar';
import loadMemeTemplates from './loadMemeTemplates';
import initializeTextBlockSettings from './textBlockSettings/textBlockSettings';
import './clearCanvas';
import './download';

function init() {
    //loadMemeTemplates();
    initializeTextBlockSettings();
    Scrollbar.init(document.querySelector('#toolbar-pills-templates'));
    Scrollbar.init(document.querySelector('#toolbar-pills-text'));
}

export default init;