import * as bootstrap from 'bootstrap'
import initDrawingAreaSettings from './drawingAreaSettings/drawingAreaSettings';
import initializeTextBlockSettings from './textBlockSettings/textBlockSettings';

function init() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl)
    });

    initDrawingAreaSettings();
    initializeTextBlockSettings();
}

export default init;