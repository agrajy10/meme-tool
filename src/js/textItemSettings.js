import { appState } from "./appState";
const textContentInput = document.querySelector(".text-item-content__input");


function selectTextItem(itemObj) {
  appState.currentSelectedItem && appState.currentSelectedItem.el.classList.remove('item-selected');
  appState.currentSelectedItem = itemObj;
  appState.currentSelectedItem.el.classList.add('item-selected');
  textContentInput.value = appState.currentSelectedItem.itemContent;
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

textContentInput.addEventListener("change", updateTextItemContent);

export { selectTextItem };
