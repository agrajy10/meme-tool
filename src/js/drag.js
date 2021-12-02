let mouseX = 0,
  mouseY = 0,
  mouseMoveHandlerRef;

function mouseUpHandler() {
  document.removeEventListener("mousemove", mouseMoveHandlerRef);
  document.removeEventListener("mouseup", mouseUpHandler);
}

/*
    we are saving mouseMoveHandler inner function reference
    so that we will be able to clear it in removeEventListener
*/
function mouseMoveHandler(itemObj) {
  mouseMoveHandlerRef = function (e) {
    const dx = e.clientX - mouseX;
    const dy = e.clientY - mouseY;

    itemObj.topPos = itemObj.el.offsetTop + dy;
    itemObj.leftPos = itemObj.el.offsetLeft + dx;

    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  return mouseMoveHandlerRef;
}

function mouseDownHandler(itemObj) {
  return function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    document.addEventListener("mousemove", mouseMoveHandler(itemObj));
    document.addEventListener("mouseup", mouseUpHandler);
  };
}

export default mouseDownHandler;
