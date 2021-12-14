const elements = {
    textSettingsPanel : document.querySelector('.text-settings-panel'),
    addTextBtn : document.querySelector('.add-text-btn'),
    textColorPickerEl : document.querySelector('.text-color-picker'),
    textFontSizeInput: document.querySelector('.text-fs__input'),
    textCurrentFontSize: document.querySelector('.text-fs .range-input__value'),
    textLetterSpacingInput: document.querySelector('.text-ls__input'),
    textCurrentLetterSpacing : document.querySelector('.text-ls .range-input__value'),
    textLineHeightInput: document.querySelector('.text-lh__input'),
    textCurrentLineHeight : document.querySelector('.text-lh .range-input__value'),
    textAlignment: document.querySelector('.text-alignment'),
    textAlignmentOptions : document.querySelectorAll('.text-alignment__option'),
    textStyle : document.querySelector('.text-style'),
    textStyleBold : document.querySelector('.text-style__bold'),
    textStyleItalic : document.querySelector('.text-style__italic'),
    textStyleUnderline : document.querySelector('.text-style__underline'),
    textTransform: document.querySelector('.text-transform'),
    textTransformOptions: document.querySelectorAll('.text-transform__option'),
    deleteTextBtn: document.querySelector(".delete-text-btn")
}

export default elements