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
        this.drawingAreaEl = this._generateMarkup();
        const drawingAreaContainer = document.querySelector('.drawing-area-container');
        drawingAreaContainer.appendChild(this.drawingAreaEl);
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
        this.drawingAreaEl.style.width = `${this.size.width}px`;
    }

    set height(newHeight) {
        this.size.height = newHeight;
        this.drawingAreaEl.style.height = `${this.size.height}px`;
    }

    set backgroundColor(color) {
        this.styles.backgroundColor = color;
        this.drawingAreaEl.style.backgroundColor = this.styles.backgroundColor;
    }

    set borderColor(color) {
        this.styles.borderColor = color;
        this.drawingAreaEl.style.borderColor = this.styles.borderColor;
    }

    set borderWidth(width) {
        this.styles.borderWidth = width;
        this.drawingAreaEl.style.borderWidth = `${this.styles.borderWidth}px`;
    }

    set borderStyle(style) {
        this.styles.borderStyle = style;
        this.drawingAreaEl.style.borderStyle = this.styles.borderStyle;
    }
}

const drawingAreaObj = new DrawingArea();

export default drawingAreaObj;