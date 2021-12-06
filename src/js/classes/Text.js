import mouseDownHandler from "../drag";
import { selectTextItem } from "../textItemSettings";

class Text {
  constructor() {
    this.content = "Line of text",
    this.styles = {
        fontFamily: 'Roboto',
        fontCategory : 'sans-serif',
        fontSize: 25,
        fontWeight: 'regular',
        textAlign: 'left',
        lineHeight: 1,
        letterSpacing: 1,
        textTransform: "none",
        cursor: "move",
        userSelect: "none",
        top: 0,
        left: 0,
        color: '#000000'
    },
    this.el = this._generateMarkup();
    this.el.addEventListener("mousedown", mouseDownHandler(this));
    this.el.addEventListener("click", this.clickHandler.bind(this));
  }

  clickHandler() {
    selectTextItem(this);
  }

  _generateMarkup() {
    const div = document.createElement("div");
    div.classList.add("text-item");
    div.textContent = this.content;
    div.style.fontFamily = `${this.styles.fontFamily}, ${this.styles.fontCategory}`;
    div.style.fontSize = `${this.styles.fontSize}px`;
    div.style.fontWeight = this.styles.fontWeight;
    div.style.lineHeight = this.styles.lineHeight;
    div.style.letterSpacing = `${this.styles.letterSpacing}px`;
    div.style.textTransform = this.styles.textTransform;
    div.style.textAlign = this.styles.textAlign;
    div.style.cursor = this.styles.cursor;
    div.style.userSelect = this.styles.userSelect;
    div.style.position = "absolute";
    div.style.left = `${this.styles.left}px`;
    div.style.top = `${this.styles.top}px`;
    div.style.color = this.styles.color;
    return div;
  }

  get itemContent() {
    return this.content
  }

  get textColor() {
    return this.styles.color
  }

  get fontSize() {
    return this.styles.fontSize
  }

  get textTransform() {
    return this.styles.textTransform;
  }

  get fontFamily(){
    return this.styles.fontFamily;
  }

  get fontWeight(){
    return this.styles.fontWeight;
  }

  get textAlign() {
    return this.styles.textAlign;
  }
  
  set topPos(pos) {
    this.styles.top = pos;
    this.el.style.top = `${this.styles.top}px`;
  }

  set leftPos(pos) {
    this.styles.left = pos;
    this.el.style.left = `${this.styles.left}px`;
  }

  set itemContent(newContent) {
    this.content = newContent;
    this.el.textContent = this.content;
  }

  set textColor(color) {
    this.styles.color = color;
    this.el.style.color = this.styles.color;
  }

  set fontSize(newFontSize) {
    this.styles.fontSize = newFontSize;
    this.el.style.fontSize = `${this.styles.fontSize}px`;
  }

  set textTransform(value) {
    this.styles.textTransform = value;
    this.el.style.textTransform = this.styles.textTransform;
  }

  set fontFamily({fontFamily, fontCategory}) {
    this.styles.fontFamily = fontFamily;
    this.styles.fontCategory = fontCategory;
    this.el.style.fontFamily = `${this.styles.fontFamily}, ${this.styles.fontCategory}`;
  }

  set fontWeight(newFontWeight) {
    this.styles.fontWeight = newFontWeight;
    this.el.style.fontWeight = this.styles.fontWeight;
  }

  set textAlign(newTextAlign) {
    this.styles.textAlign = newTextAlign;
    this.el.style.textAlign = this.styles.textAlign;
  }
}

export default Text;
