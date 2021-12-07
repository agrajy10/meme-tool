import * as bootstrap from 'bootstrap'
import initDrawingAreaSettings from './drawingAreaSettings';

function init() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl)
    });

    initDrawingAreaSettings();
}

export default init;