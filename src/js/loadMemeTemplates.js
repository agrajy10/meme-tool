
import drawingAreaObj from './classes/DrawingArea';

const templatesGrid = document.querySelector('.templates-grid');
const templatesGridLoader = document.querySelector('.templates-grid .loader');
const templatesGridAlert = document.querySelector('.templates-grid .alert');

const requestHeaders = new Headers();
requestHeaders.append('Authorization', `Client-ID ${process.env.IMGUR_CLIENT_ID}`);

const requestOptions = {
    method: 'GET',
    headers: requestHeaders,
    redirect: 'follow'
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
    templatesGridAlert.classList.add('d-none');
    templatesGrid.classList.add('loading');
    try {
        const res = await fetch(`https://api.imgur.com/3/image/${templateID}`, requestOptions);
        const { data } = await res.json();
        insertMemeTemplate(data);
    } catch (error) {
        templatesGridAlert.classList.remove('d-none');
        templatesGridAlert.textContent = '';
        templatesGridAlert.textContent = error.message;
    } finally {
        templatesGrid.classList.remove('loading');
    }
}

async function loadMemeTemplates() {
    try {
        const res = await fetch(`https://api.imgur.com/3/album/${process.env.IMGUR_ALBUM_ID}/images?perPage=50`, requestOptions);
        const {
            data
        } = await res.json();
        templatesGridLoader.classList.add('d-none');
        data.forEach(item => {
            const div = document.createElement('div');
            const image = document.createElement('img');
            const ext = item.link.substr(-4);
            const thumbnail = `${item.link.substr(0, item.link.length - 4)}m`;
            image.src = `${thumbnail}${ext}`;
            image.classList.add('border');
            div.appendChild(image);
            div.classList.add('templates-grid__grid-item');
            div.setAttribute('data-id', item.id);
            templatesGrid.appendChild(div);
        });
        templatesGrid.addEventListener('click', function (e) {
            const target = e.target;
            if (target.closest('.templates-grid__grid-item')) {
                const templateID = target.parentElement.dataset.id;
                loadMemeTemplate(templateID);
            }
        });
    } catch (error) {
        templatesGridAlert.textContent = error.message;
    }
}

export default loadMemeTemplates