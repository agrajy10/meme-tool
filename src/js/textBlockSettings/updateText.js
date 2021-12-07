import appState from "../appState";

function updateText(e) {
    const target = e.target;
    if (target.value !== "") {
        target.classList.remove("is-invalid");
        appState.currentSelectedItem.itemContent = target.value;
    } else {
        target.classList.add("is-invalid");
    }
}

export default updateText