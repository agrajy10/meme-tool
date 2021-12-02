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

    set width(newWidth) {
        this.size.width = newWidth;
        this.el.style.width = `${this.size.width}px`;
    }

    set height(newHeight) {
        this.size.height = newHeight;
        this.el.style.height = `${this.size.height}px`;
    }

    set backgroundColor(color) {
        this.styles.backgroundColor = color;
        this.el.style.backgroundColor = this.styles.backgroundColor;
    }

    set borderColor(color) {
        this.styles.borderColor = color;
        this.el.style.borderColor = this.styles.borderColor;
    }

    set borderWidth(width) {
        this.styles.borderWidth = width;
        this.el.style.borderWidth = `${this.styles.borderWidth}px`;
    }

    set borderStyle(style) {
        this.styles.borderStyle = style;
        this.el.style.borderStyle = this.styles.borderStyle;
    }

}

const drawingAreaObj = new DrawingArea();

export default drawingAreaObj;