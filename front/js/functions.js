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
 * Update the tag title of the page product
 * @param {string} kanapName 
 */
const titleUpdate = function(kanapName){
    let titleTag = document.getElementsByTagName('title');
    titleTag[0].textContent = kanapName;
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
 * Update the option value for the colors
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

/**
 * Check if the user's choices in the form is correct
 * @param { String } color 
 * @param { Number } quantity 
 * @returns 
 */
 const checkUserChoices = function(color, quantity){
    if (color.length == 0 || quantity > 100 || quantity < 1) {
        return false;
    }else{
        return true;
    }    
}

/**
 * This function is executed when uers click on the add to cart button.
 * Firt we recover the ueser choices, then we check them with checkUserChoices.
 * After that, we check if the localstorage is empty or not, and create or update with the new user choices.
 */
const gestionDuClik = function(){
    document.getElementById('addToCart').addEventListener('click', mouseEvent => {
        mouseEvent.preventDefault();

        let urlId = getId();
        let userChoiceQuantity = parseInt(document.getElementById('quantity').value)
        let userChoiceColor = document.getElementById('colors').value;

        if (checkUserChoices(userChoiceColor, userChoiceQuantity)) {
            let userChoice = [];
            let kanapObject = {};

            kanapObject.quantity = userChoiceQuantity;
            kanapObject.id = urlId;
            kanapObject.color = userChoiceColor;

            if(localStorage.getItem('kanapDatas')){
                let arrCart = [];
                arrCart = JSON.parse(localStorage.getItem("kanapDatas"));                
                let newArrCart = arrCart.filter(kanap => kanap.color == userChoiceColor && kanap.id === urlId);

                if(newArrCart.length){
                    let total = userChoiceQuantity + newArrCart[0].quantity;

                    arrCart.forEach(kanap => {
                        if(kanap.color == userChoiceColor && kanap.id === urlId){
                            kanap.quantity = total;
                        };
                    });

                    localStorage.setItem("kanapDatas", JSON.stringify(arrCart));
                    alert(`Cet obet était déja présent dans votre panier, la quantité a été mise à jour. \n Qauntité : ${total}`)

                }else{
                    arrCart.push(kanapObject);
                    localStorage.setItem("kanapDatas", JSON.stringify(arrCart));                    
                }

            }else{
                userChoice.push(kanapObject);
                localStorage.setItem("kanapDatas", JSON.stringify(userChoice));
            }

        }else{
            alert('Il y a une erreur de saisie dans le formulaire.')
        }

        console.log(localStorage.getItem("kanapDatas"));
    })
}