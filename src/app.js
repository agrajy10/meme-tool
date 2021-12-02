import "@fontsource/inter";
import "@fortawesome/fontawesome-free/css/all.css";
import "./scss/main.scss";
import "./js/toolbar";
import Text from "./js/classes/Text";
import drawingAreaObj from "./js/classes/DrawingArea";
import { initDrawingAreaSettings } from "./js/drawingAreaSettings";
import { appState } from "./js/appState";

const addTextBtn = document.querySelector(".toolbar__add-text");

//initalize drawing area settings with default values
initDrawingAreaSettings();

function insertTextItem() {
  const textObj = new Text();
  drawingAreaObj.appendItem(textObj);
  appState.items.push(textObj);
}

addTextBtn.addEventListener("click", insertTextItem);
