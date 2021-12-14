class DrawingArea {
    constructor() {
        this.size = {
            width: 500,
            height: 500
        },
        this.styles = {
            backgroundColor: '#FFFFFF',
        }
        this._renderDrawingArea();
    }

    _renderDrawingArea() {
        this.el = this._generateMarkup();
        const drawingAreaContainer = document.querySelector('.main-area');
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
        this.removeMemeTemplate();
        this.el.insertAdjacentElement('afterbegin', memeTemplateEl);
    }

    removeMemeTemplate() {
        const currentMemeTemplate = this.el.querySelector('.meme-template');
        if(currentMemeTemplate) {
            this.el.removeChild(currentMemeTemplate);
        }
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

    set width(value) {
        this.size.width = value;
        this.el.style.width = `${this.size.width}px`;
    }

    set height(value) {
        this.size.height = value;
        this.el.style.height = `${this.size.height}px`;
    }

}

const drawingAreaObj = new DrawingArea();

export default drawingAreaObj;