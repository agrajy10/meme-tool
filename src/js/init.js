import * as bootstrap from 'bootstrap'
import initDrawingAreaSettings from './drawingAreaSettings';
import initializeTextBlockSettings from './textItemSettings';

function init() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl)
    });

    initDrawingAreaSettings();
    initializeTextBlockSettings();
}

export default init;