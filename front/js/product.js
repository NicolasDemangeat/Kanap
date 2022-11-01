
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
 * Fetch the API url with ID
 * @params {string}
 * @returns {promise}
 */
const fetchDataId =  function(id){
    return  fetch("http://localhost:3000/api/products/"+id)
    .then(response => response.json())
    .catch(e => console.log("il y a une erreur de type : " + e));
}

/**
 * update the logo in the page
 * @params {string}
 * @params {string}
 */
const logoUpdate = function(imageUrl, altTxt){
    let div = document.getElementsByClassName('item__img');
    let img = document.createElement('img');
    img.setAttribute('src', imageUrl);
    img.setAttribute('alt', altTxt);
    div[0].appendChild(img);
}

const titleUpdate = function(titleFromId){
    let title = document.getElementById('title');
    title.textContent = titleFromId;    
}

const priceUpate = function(priceFromId){    
    let price = document.getElementById('price');
    price.textContent = priceFromId;
}

const descriptionUpdate = function(descriptionFromId){
    let description = document.getElementById('description');
    description.textContent = descriptionFromId;
}

const colorsOptionUpdate = function(colorsFromId){
    let colorsOption = document.getElementById('colors');
    colorsFromId.forEach(color => {
        let option = document.createElement('option');
        option.setAttribute('value', color);
        option.textContent = color;
        colorsOption.appendChild(option);
    });
}

/**
 * main function
 * call the others function
 */
const main = async function(){
    let id = getId();
    let dataFromId = await fetchDataId(id);
    logoUpdate(dataFromId.imageUrl, dataFromId.altTxt);
    titleUpdate(dataFromId.title);
    priceUpate(dataFromId.price);
    descriptionUpdate(dataFromId.description);
    colorsOptionUpdate(dataFromId.colors);
}

main();