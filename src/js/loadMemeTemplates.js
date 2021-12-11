const memeTemplatesModalBody = document.querySelector('.meme-templates-modal .modal-body');
const memeTemplatesModalLoader = document.querySelector('.meme-templates-modal__loader');
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

async function loadMemeTemplates() {
    try {
        const res = await fetch(`https://api.imgur.com/3/album/${process.env.IMGUR_ALBUM_ID}/images`, requestOptions);
        const { data } = await res.json();
        memeTemplatesModalLoader.style.display = 'none';
        data.forEach(item => {
            const div = document.createElement('div');
            const image = document.createElement('img');
            const ext = item.link.substr(-4);
            const thumbnail = `${item.link.substr(0, item.link.length - 4)}m`;
            image.src = `${thumbnail}${ext}`;
            image.classList.add('border');
            div.appendChild(image);
            div.setAttribute('data-id', item.id);
            memeTemplatesModalBody.querySelector('.meme-templates-modal__grid').appendChild(div);
        });
    } catch (error) {
       memeTemplatesModalBody.querySelector('.meme-templates-modal__msg').innerHTML = showError(error.message);
    } 
}

export default loadMemeTemplates