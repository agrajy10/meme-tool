import loadMemeTemplates from './loadMemeTemplates';
import initializeTextBlockSettings from './textBlockSettings/textBlockSettings';
import './clearCanvas';
import './download';

function init() {
    loadMemeTemplates();
    initializeTextBlockSettings();
}

export default init;