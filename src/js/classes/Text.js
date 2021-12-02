import mouseDownHandler from "../drag";

class Text {
    constructor() {
        this.content = 'Line of text',
        this.styles = {
            fontSize: 25,
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: 1,
            textTransform: 'none',
            cursor: 'move',
            userSelect: 'none',
            top:0,
            left:0
        },
        this.el = this._generateMarkup();
        this.el.addEventListener('mousedown', mouseDownHandler(this));
    }

    _generateMarkup() {
        const div = document.createElement('div');
        div.classList.add('text-item');
        div.textContent = this.content;
        div.style.fontSize = `${this.styles.fontSize}px`;
        div.style.fontWeight = this.styles.fontWeight;
        div.style.lineHeight = this.styles.lineHeight;
        div.style.letterSpacing = `${this.styles.letterSpacing}px`;
        div.style.textTransform = this.styles.textTransform;
        div.style.cursor = this.styles.cursor;
        div.style.userSelect = this.styles.userSelect;
        div.style.position = 'absolute';
        div.style.left = `${this.styles.left}px`;
        div.style.top = `${this.styles.top}px`;
        return div;
    }

    set topPos(pos) {
        this.styles.top = pos;
        this.el.style.top = `${this.styles.top}px`;
    }

    set leftPos(pos) {
        this.styles.left = pos;
        this.el.style.left = `${this.styles.left}px`;
    }
}

export default Text