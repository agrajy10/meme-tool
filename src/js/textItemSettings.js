import { appState } from "./appState";
import drawingAreaObj from "./classes/DrawingArea";
const textContentInput = document.querySelector(".text-item-content__input");
const textContentDeleteBtn = document.querySelector(".text-item-content__delete-btn");

function selectTextItem(itemObj) {
  appState.currentSelectedItem &&
  appState.currentSelectedItem.el.classList.remove("item-selected");
  appState.currentSelectedItem = itemObj;
  appState.currentSelectedItem.el.classList.add("item-selected");
  textContentInput.value = appState.currentSelectedItem.itemContent;
  textContentDeleteBtn.disabled = false;
}

function updateTextItemContent(e) {
  const target = e.target;
  if (target.value !== "") {
    target.classList.remove("is-invalid");
    appState.currentSelectedItem.itemContent = target.value;
  } else {
    target.classList.add("is-invalid");
  }
}

function deleteSelectedTextItem() {
  appState.items = appState.items.filter(item => item !== appState.currentSelectedItem);
  drawingAreaObj.removeItem(appState.currentSelectedItem);
  appState.currentSelectedItem = null;
  textContentInput.value = '';
  textContentDeleteBtn.disabled = true;
}

textContentInput.addEventListener("change", updateTextItemContent);
textContentDeleteBtn.addEventListener('click', deleteSelectedTextItem);


export { selectTextItem };
