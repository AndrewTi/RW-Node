const fetch = require('node-fetch');

module.exports = (source, target, text) => {
    if(!source || !target || !text)
        throw TypeError

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&hl=${target}&dt=bd&dj=1&source=input&dt=t&q=` + encodeURI(text);
    
    return fetch(url).then(response => response.json())
}