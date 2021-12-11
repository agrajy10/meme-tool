class DrawingArea {
    constructor() {
        this.size = {
            width: 500,
            height: 500
        },
        this.styles = {
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#cbc9c9'
        }
        this._renderDrawingArea();
    }

    _renderDrawingArea() {
        this.el = this._generateMarkup();
        const drawingAreaContainer = document.querySelector('.drawing-area-container');
        drawingAreaContainer.appendChild(this.el);
    }

    _generateMarkup() {
        const div = document.createElement('div');
        div.classList.add('drawing-area');
        div.style.width = `${this.size.width}px`;
        div.style.height = `${this.size.height}px`;
        div.style.position = 'relative';
        div.style.overflow = 'hidden';
        div.style.backgroundColor = this.styles.backgroundColor;
        div.style.borderWidth = `${this.styles.borderWidth}px`;
        div.style.borderStyle = this.styles.borderStyle;
        div.style.borderColor = this.styles.borderColor;
        return div;
    }

    appendMemeTemplate(memeTemplateEl) {
        const currentMemeTemplate = this.el.querySelector('.meme-template');
        if(currentMemeTemplate) {
            this.el.removeChild(currentMemeTemplate);
        }
        this.el.insertAdjacentElement('afterbegin', memeTemplateEl);
    }

    appendItem(itemObj) {
        return this.el.appendChild(itemObj.el);
    }

    removeItem(itemObj) {
        this.el.removeChild(itemObj.el);
    }

    get width() {
        return this.size.width
    }

    get height() {
        return this.size.height
    }

    get backgroundColor() {
        return this.styles.backgroundColor
    }

    get borderColor() {
        return this.styles.borderColor
    }

    get borderWidth() {
        return this.styles.borderWidth
    }

    get borderStyle() {
        return this.styles.borderStyle
    }

    set width(value) {
        this.size.width = value;
        this.el.style.width = `${this.size.width}px`;
    }

    set height(value) {
        this.size.height = value;
        this.el.style.height = `${this.size.height}px`;
    }

    set backgroundColor(value) {
        this.styles.backgroundColor = value;
        this.el.style.backgroundColor = this.styles.backgroundColor;
    }

    set borderColor(value) {
        this.styles.borderColor = value;
        this.el.style.borderColor = this.styles.borderColor;
    }

    set borderWidth(value) {
        this.styles.borderWidth = value;
        this.el.style.borderWidth = `${this.styles.borderWidth}px`;
    }

    set borderStyle(value) {
        this.styles.borderStyle = value;
        this.el.style.borderStyle = this.styles.borderStyle;
    }

}

const drawingAreaObj = new DrawingArea();

export default drawingAreaObj;