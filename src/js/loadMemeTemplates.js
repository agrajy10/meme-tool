import * as bootstrap from 'bootstrap'
import drawingAreaObj from './classes/DrawingArea';

const memeTemplatesModalObj = new bootstrap.Modal(document.getElementById('memeTemplatesModal'));
const memeTemplatesModalBody = document.querySelector('.meme-templates-modal .modal-body');
const memeTemplatesModalLoader = document.querySelector('.meme-templates-modal__loader');
const memeTemplatesModalGrid = document.querySelector('.meme-templates-modal__grid');
const requestHeaders = new Headers();
requestHeaders.append('Authorization', `Client-ID ${process.env.IMGUR_CLIENT_ID}`);

const requestOptions = {
    method: 'GET',
    headers: requestHeaders,
    redirect: 'follow'
}

function showError(msg) {
    return `<div class="alert alert-danger" role="alert">${msg}</div>`;
}

function insertMemeTemplate(data) {
    const div = document.createElement('div');
    const image = document.createElement('img');
    div.classList.add('meme-template');
    image.addEventListener('load', function() {
        drawingAreaObj.width = data.width;
        drawingAreaObj.height = data.height;
        div.appendChild(this);
        drawingAreaObj.appendMemeTemplate(div);
    });
    image.src = data.link;
}

async function loadMemeTemplate(templateID) {
    memeTemplatesModalGrid.classList.add('loading');
    try {
        const res = await fetch(`https://api.imgur.com/3/image/${templateID}`, requestOptions);
        const { data } = await res.json();
        insertMemeTemplate(data);
        memeTemplatesModalObj.hide();
    } catch (error) {
        memeTemplatesModalGrid.insertAdjacentHTML('beforebegin', showError(error.message));
        console.log(error);
    } finally {
        memeTemplatesModalGrid.classList.remove('loading');
    }
}

async function loadMemeTemplates() {
    try {
        const res = await fetch(`https://api.imgur.com/3/album/${process.env.IMGUR_ALBUM_ID}/images`, requestOptions);
        const {
            data
        } = await res.json();
        memeTemplatesModalLoader.style.display = 'none';
        data.forEach(item => {
            const div = document.createElement('div');
            const image = document.createElement('img');
            const ext = item.link.substr(-4);
            const thumbnail = `${item.link.substr(0, item.link.length - 4)}m`;
            image.src = `${thumbnail}${ext}`;
            image.classList.add('border');
            div.appendChild(image);
            div.classList.add('meme-templates-modal__grid-item');
            div.setAttribute('data-id', item.id);
            memeTemplatesModalGrid.appendChild(div);
        });
        memeTemplatesModalGrid.addEventListener('click', function (e) {
            const target = e.target;
            if (target.closest('.meme-templates-modal__grid-item')) {
                const templateID = target.parentElement.dataset.id;
                loadMemeTemplate(templateID);
            }
        });
    } catch (error) {
        memeTemplatesModalBody.querySelector('.meme-templates-modal__msg').innerHTML = showError(error.message);
    }
}

export default loadMemeTemplates