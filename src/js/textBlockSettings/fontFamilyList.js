import WebFont from "webfontloader";
import elements from "./elements";
import appState from "../appState";

let fontsList;
const loadedFontsList = [];
const fontVariantLbl = {
    100 : 'Thin',
    200 : 'Extra-light',
    300 : 'Light',
    'regular' : 'Regular',
    500 : 'Medium',
    600 : 'Semi bold',
    700 : 'Bold',
    800 : 'Extra bold',
    900 : 'Black'
};

async function loadFontsList() {
    try {
        const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_FONTS_API_KEY}&sort=popularity`);
        const data = await response.json();
        fontsList = data.items.slice(0, 100);
        elements.textFontSelect.innerHTML = fontsList.map(font => `<option value="${font.family}" data-category="${font.category}">${font.family}</option>`);
        loadFontFamily('Oswald'); // load default font family of text block
    } catch (error) {
        console.log(error);
    }
}


function loadFontFamily(fontFamily) {
    const selectedFont = fontsList.find(font => font.family === fontFamily);
    if (!loadedFontsList.includes(fontFamily)) {
        WebFont.load({
            google: {
                families: [`${fontFamily}:regular`]
            }
        });
        loadedFontsList.push(`${fontFamily}:regular`);
    }
    elements.textFontVariantSelect.innerHTML = selectedFont.variants.filter(variant => {
        if (variant.includes('italic')) {
            return false;
        }
        return variant;
    }).map(variant => {
        if (variant === 'regular') {
            return `<option value="${variant}" selected>${fontVariantLbl[variant]}</option>`;
        }
        return `<option value="${variant}">${fontVariantLbl[variant]}</option>`;
    });
    if (appState.currentSelectedItem) {
        appState.currentSelectedItem.fontFamily = {
            fontFamily: fontFamily,
            fontCategory: selectedFont.category
        };
        appState.currentSelectedItem.fontWeight = 'regular';
    }
}

function loadSelectedFontFamilyVariant(variant) {
    const str = `${elements.textFontSelect.value}:${variant}`;
    if (!loadedFontsList.includes(str)) {
        WebFont.load({
            google: {
                families: [str]
            }
        });
        loadedFontsList.push(str);
    }
    if (appState.currentSelectedItem) {
        appState.currentSelectedItem.fontWeight = variant;
    }
}

export {
    loadFontsList,
    loadFontFamily,
    loadSelectedFontFamilyVariant
}