import mouseDownHandler from "../drag";
import selectTextBlock from "../textBlockSettings/selectText";

class TextBlock {
  constructor() {
    this.content = "Line of text",
    this.isEditing = false;
    this.styles = {
        fontFamily: 'Oswald',
        fontCategory : 'sans-serif',
        fontSize: 40,
        fontWeight: '700',
        fontStyle:'normal',
        textAlign: 'left',
        lineHeight: 1,
        letterSpacing: 1,
        textTransform: "uppercase",
        textDecoration: 'none',
        cursor: "move",
        userSelect: "none",
        top: 0,
        left: 0,
        color: '#000000'
    },
    this.el = this._generateMarkup();
    this.el.addEventListener("mousedown", mouseDownHandler(this));
    this.el.addEventListener("click", this.clickHandler.bind(this));
    this.el.addEventListener('dblclick', this.editContent.bind(this));
  }

  clickHandler() {
    selectTextBlock(this);
  }

  editContent() {
    this.isEditing = true;
    this.el.children[0].contentEditable = true;
    this.el.children[0].focus();
  }

  saveContent() {
    this.isEditing = false;
    this.el.children[0].contentEditable = false;
    this.el.children[0].blur();
    this.content = this.el.children[0].textContent;
  }

  _generateMarkup() {
    const div = document.createElement("div");
    const p  = document.createElement('p');
    p.textContent = this.content;
    p.contentEditable = this.isEditing;
    div.appendChild(p);
    div.classList.add("text-block");
    div.style.fontFamily = `${this.styles.fontFamily}, ${this.styles.fontCategory}`;
    div.style.fontSize = `${this.styles.fontSize}px`;
    div.style.fontWeight = this.styles.fontWeight;
    div.style.fontStyle  = this.styles.fontStyle;
    div.style.lineHeight = this.styles.lineHeight;
    div.style.letterSpacing = `${this.styles.letterSpacing}px`;
    div.style.textTransform = this.styles.textTransform;
    div.style.textAlign = this.styles.textAlign;
    div.style.textDecoration = this.styles.textDecoration;
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

  get textDecoration() {
    return this.styles.textDecoration
  }

  get fontFamily(){
    return this.styles.fontFamily;
  }

  get fontWeight(){
    return this.styles.fontWeight;
  }

  get fontStyle() {
    return this.styles.fontStyle;
  }

  get textAlign() {
    return this.styles.textAlign;
  }

  get width() {
    return this.el.getBoundingClientRect().width;
  }

  get height() {
    return this.el.getBoundingClientRect().height;
  }

  get lineHeight() {
    return this.styles.lineHeight;
  }

  get letterSpacing() {
    return this.styles.letterSpacing
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
  }

  set textColor(value) {
    this.styles.color = value;
    this.el.style.color = this.styles.color;
  }

  set fontSize(value) {
    this.styles.fontSize = value;
    this.el.style.fontSize = `${this.styles.fontSize}px`;
  }

  set fontStyle(value) {
    this.styles.fontStyle = value;
    this.el.style.fontStyle = this.styles.fontStyle;
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
    this.el.style.fontWeight = value;
  }

  set textAlign(value) {
    this.styles.textAlign = value;
    this.el.style.textAlign = this.styles.textAlign;
  }

  set textDecoration(value) {
    this.styles.textDecoration = value;
    this.el.style.textDecoration = this.styles.textDecoration;
  }

  set letterSpacing(value) {
    this.styles.letterSpacing = value;
    this.el.style.letterSpacing = `${this.styles.letterSpacing}px`;
  }

  set lineHeight(value) {
    this.styles.lineHeight = value;
    this.el.style.lineHeight = this.styles.lineHeight;
  }

}

export default TextBlock;
