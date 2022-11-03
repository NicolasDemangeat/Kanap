
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
 * @param {String}
 * @return {Promise}
 */
const fetchDataId =  function(id){
    return  fetch("http://localhost:3000/api/products/"+id)
    .then(response => response.json())
    .catch(e => console.log("il y a une erreur de type : " + e));
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


const gestionDuClik = function(){
    document.getElementById('addToCart').addEventListener('click', mouseEvent => {
        mouseEvent.preventDefault();

        let userChoice = [];
        let kanapObject = {};
        let quantity = parseInt(document.getElementById('quantity').value)

        kanapObject.id = getId();
        kanapObject.color = document.getElementById('colors').value;        
        kanapObject.price = parseInt(document.getElementById('price').textContent);
        if (quantity<=100) {
            kanapObject.quantity = quantity;
            userChoice.push(kanapObject);
        }else{
            alert('Vous ne pouvez mettre plus de 100 produits dans le panier.')
        }

        console.log(userChoice[0]);

    })






}

/**
 * main function
 * call the others function
 */
const main = async function(){
    let id = getId();
    let dataFromId = await fetchDataId(id);
    logoUpdate(dataFromId.imageUrl, dataFromId.altTxt);
    nameUpdate(dataFromId.name);
    priceUpate(dataFromId.price);
    descriptionUpdate(dataFromId.description);
    colorsOptionUpdate(dataFromId.colors);
    gestionDuClik();
}

main();