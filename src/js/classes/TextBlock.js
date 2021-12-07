import mouseDownHandler from "../drag";
import { selectTextBlock } from "../textItemSettings";

class TextBlock {
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
    selectTextBlock(this);
  }

  _generateMarkup() {
    const div = document.createElement("div");
    const p  = document.createElement('p');
    p.textContent = this.content;
    div.appendChild(p);
    div.classList.add("text-item");
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

  get width() {
    return this.el.getBoundingClientRect().width
  }

  get height() {
    return this.el.getBoundingClientRect().height
  }
  
  set topPos(value) {
    this.styles.top = value;
    this.el.style.top = `${this.styles.top}px`;
  }

  set leftPos(value) {
    this.styles.left = value;
    this.el.style.left = `${this.styles.left}px`;
  }

  set itemContent(value) {
    this.content = value;
    this.el.children[0].textContent = this.content;
  }

  set textColor(value) {
    this.styles.color = value;
    this.el.style.color = this.styles.color;
  }

  set fontSize(value) {
    this.styles.fontSize = value;
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

  set fontWeight(value) {
    this.styles.fontWeight = value;
    this.el.style.fontWeight = this.styles.fontWeight;
  }

  set textAlign(value) {
    this.styles.textAlign = value;
    this.el.style.textAlign = this.styles.textAlign;
  }
}

export default TextBlock;
