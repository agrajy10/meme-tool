import drawingAreaObj from "../classes/DrawingArea";
import appState from "../appState";


function setTextPosition(e) {
    const width = drawingAreaObj.width;
    const height = drawingAreaObj.height;
    const cls = e.target.classList;
    switch (true) {
        case cls.contains('text-position__top-left'):
            appState.currentSelectedItem.leftPos = 0;
            appState.currentSelectedItem.topPos = 0;
            break;
        case cls.contains('text-position__top-right'):
            appState.currentSelectedItem.leftPos = width - appState.currentSelectedItem.width;
            appState.currentSelectedItem.topPos = 0;
            break;
        case cls.contains('text-position__top-center'):
            appState.currentSelectedItem.leftPos = (width / 2) - (appState.currentSelectedItem.width / 2);
            appState.currentSelectedItem.topPos = 0;
            break;
        case cls.contains('text-position__center'):
            appState.currentSelectedItem.leftPos = (width / 2) - (appState.currentSelectedItem.width / 2);
            appState.currentSelectedItem.topPos = (height / 2) - (appState.currentSelectedItem.height / 2);
            break;
        case cls.contains('text-position__center-left'):
            appState.currentSelectedItem.leftPos = 0;
            appState.currentSelectedItem.topPos = (height / 2) - (appState.currentSelectedItem.height / 2);
            break;
        case cls.contains('text-position__center-right'):
            appState.currentSelectedItem.leftPos = width - appState.currentSelectedItem.width;
            appState.currentSelectedItem.topPos = (height / 2) - (appState.currentSelectedItem.height / 2);
            break;
        case cls.contains('text-position__bottom-left'):
            appState.currentSelectedItem.leftPos = 0;
            appState.currentSelectedItem.topPos = height - appState.currentSelectedItem.height;
            break;
        case cls.contains('text-position__bottom-right'):
            appState.currentSelectedItem.leftPos = width - appState.currentSelectedItem.width;
            appState.currentSelectedItem.topPos = height - appState.currentSelectedItem.height;
            break;
        case cls.contains('text-position__bottom-center'):
            appState.currentSelectedItem.leftPos = (width / 2) - (appState.currentSelectedItem.width / 2);
            appState.currentSelectedItem.topPos = height - appState.currentSelectedItem.height;
            break;
        default:
            break;
    }
}

export default setTextPosition