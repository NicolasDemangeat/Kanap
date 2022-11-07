/**
 * Fetch the main url of the API.
 * @returns {Promise}
 */
 const fetchData = function(id = ''){
    return fetch("http://localhost:3000/api/products/"+id)
    .then(response => response.json())
    .catch(e => console.log("il y a une erreur de type : " + e));
}


/**
 * find the id in the current URL
 * @returns {string}
 */
 const getId = function(){
    let url = new URL(document.location.href);
    let id = url.searchParams.get('id');
    return id;
}

/**
 * update the image of the product in the page
 * @param { String } imageUrl
 * @param { String } altTxt
 */
const logoUpdate = function(imageUrl, altTxt){
    let div = document.getElementsByClassName('item__img');
    let img = document.createElement('img');
    img.setAttribute('src', imageUrl);
    img.setAttribute('alt', altTxt);
    div[0].appendChild(img);
}
/**
 * Update the product name
 * @param {String} nameFromId 
 */
const nameUpdate = function(nameFromId){
    let name = document.getElementById('title');
    name.textContent = nameFromId;    
}

/**
 * Update the product price
 * @param {Number} priceFromId 
 */
const priceUpate = function(priceFromId){    
    let price = document.getElementById('price');
    price.textContent = priceFromId;
}

/**
 * Update the product description
 * @param {String} descriptionFromId 
 */
const descriptionUpdate = function(descriptionFromId){
    let description = document.getElementById('description');
    description.textContent = descriptionFromId;
}

/**
 * 
 * @param { (String | Array) } colorsFromId
 */
const colorsOptionUpdate = function(colorsFromId){
    let colorsOption = document.getElementById('colors');
    colorsFromId.forEach(color => {
        let option = document.createElement('option');
        option.setAttribute('value', color);
        option.textContent = color;
        colorsOption.appendChild(option);
    });
}