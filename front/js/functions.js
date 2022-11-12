/**
 * Fetch the main url of the API.
 * @param {String} [id]
 * @return {Promise}
 */
 const fetchData = function(id = ''){
    return fetch("http://localhost:3000/api/products/"+id)
    .then(response => response.json())
    .catch(e => console.log("il y a une erreur de type : " + e));
}

/**
 * find the id in the current URL
 * @return {String} 
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
 * update the product image in the page
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
 * Check if the user's choices in the form are correct
 * @param { String } color 
 * @param { Number } quantity 
 * @return {Boolean}
 */
 const checkUserChoices = function(color, quantity){
    if (color.length == 0 || quantity > 100 || quantity < 1) {
        return false;
    }else{
        return true;
    }    
}

/**
 * This function is executed when users click on the add to cart button.
 * Firt we recover the user choices, then we check them with checkUserChoices.
 * After that, we check if the localstorage is empty or not, and create or update with the new user choices.
 */
const gestionDuClik = function(){
    document.getElementById('addToCart').addEventListener('click', mouseEvent => {
        mouseEvent.preventDefault();

        let urlId = getId();
        let userChoiceQuantity = parseInt(document.getElementById('quantity').value)
        let userChoiceColor = document.getElementById('colors').value;
        let kanapPrice = document.getElementById('price').textContent;

        if (checkUserChoices(userChoiceColor, userChoiceQuantity)) {
            let userChoice = [];
            let kanapObject = {};

            kanapObject.quantity = userChoiceQuantity;
            kanapObject.id = urlId;
            kanapObject.color = userChoiceColor;
            kanapObject.price = kanapPrice;

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
    })
}

/**
 * Stock the api data in a collection.
 * retrieve the current cart
 * Then compare the ID in the current cart with the id in the collection,
 * if ok => displayElements()
 */
 const checkLoop = async function(){
    let apiData = await fetchData();
    let currentCart = JSON.parse(localStorage.getItem('kanapDatas'));

    for(data of apiData)
    {
        for(kanap of currentCart)
        {
            if(data._id == kanap.id)
            {
                displayElements(data, kanap);
            }
        }
    }
}

/**
 * retrive the items section
 * push the data in a format HTML text
 * update the items section with the new text
 * @param { Object } data api data
 * @param { object } kanap data in the localStorage
 */
const displayElements = async function(data, kanap){
    let itemsSection = document.getElementById('cart__items');
    let text = `<article class="cart__item" data-id="${data._id}" data-color="${kanap.color}">
                    <div class="cart__item__img">
                        <img src="${data.imageUrl}" alt="${data.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${data.name}</h2>
                            <p class="color">Couleur : ${kanap.color}</p>
                            <p class="price">${kanap.price}€</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanap.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`

    itemsSection.insertAdjacentHTML('beforeend', text);
}

/**
 * this function select all the tag element with the clas itemQuantity
 * then compare the id and color to the id and color of the cart product
 * if match, and new quantity is between 1 and 100, upddate the new quantity in the cart
 * 
 */
 const updateWhenChange = function(){
    const arrItemQuantity = document.querySelectorAll(".itemQuantity");

    arrItemQuantity.forEach(element => {
        const tagClosest = element.closest("article");
        const id = tagClosest.dataset.id; 
        const color = tagClosest.dataset.color;

        element.addEventListener('change', event => {            
            event.preventDefault();
            let currentCart = JSON.parse(localStorage.getItem('kanapDatas'));
            let newQuantity = element.value;
            if(newQuantity < 1 || newQuantity > 100){
                alert('Les quantités doivent être comprie entre 1 et 100')
            }else{
                currentCart.forEach(kanap => {
                    if(kanap.id == id && kanap.color == color){
                        kanap.quantity = parseInt(newQuantity)
                        localStorage.setItem("kanapDatas", JSON.stringify(currentCart));
                    }
                })
            }
            currentCart = JSON.parse(localStorage.getItem('kanapDatas'));
            updateQuantity(currentCart);
            updatePrice(currentCart);
        })
    })
}
 /**
  * update the total kanap quantity
  * @param {array} currentCart 
  */
const updateQuantity = function(currentCart){
    let spanQuantity = document.getElementById('totalQuantity');
    let totalQuantity = 0;

    currentCart.forEach(kanap => {
        totalQuantity += parseInt(kanap.quantity)
    });
    spanQuantity.textContent = totalQuantity;
    return totalQuantity;
}

 /**
  * update the total kanap price
  * @param {array} currentCart 
  */
  const updatePrice = function(currentCart){
    let spanPrice = document.getElementById('totalPrice');
    let totalPrice = 0;

    currentCart.forEach(kanap => {
        totalPrice += kanap.quantity * kanap.price;
    });
    spanPrice.textContent = totalPrice;
    return totalPrice;
}

/**
 * config all delete button.
 * add an event listener click on each button
 * recovers the local storage and if Id and color match 
 * => delete the item in the local storage and remove the article in the page. 
 */
const configDeleteButton = function(){
    const arrButtonDelet = document.querySelectorAll(".deleteItem");

    arrButtonDelet.forEach(element => {
        const tagClosest = element.closest("article");
        const id = tagClosest.dataset.id; 
        const color = tagClosest.dataset.color;

        element.addEventListener('click', event => {
            event.preventDefault();
            let currentCart = JSON.parse(localStorage.getItem('kanapDatas'));
            currentCart.forEach(kanap => {
                if(kanap.id == id && kanap.color == color){
                    let pos = currentCart.indexOf(kanap)
                    currentCart.splice(pos, 1);
                    localStorage.setItem("kanapDatas", JSON.stringify(currentCart));
                    currentCart = JSON.parse(localStorage.getItem('kanapDatas'));
                    tagClosest.remove();
                    updatePrice(currentCart);
                    updateQuantity(currentCart);
                }
            })
        })
    })
}

const configOrderButton = function(){
    /**
     *     - on verifi les champs du formulaire -> faire une fonction
        -> si NOK message d'erreur
    - si tous les champs OK 
        -> on créer un objet contact avec les données du formulaires et un array avec les donées du localStorage
        contact: {
        * firstName: string,
        * lastName: string,
        * address: string,
        * city: string,
        * email: string
        * }
        * products: [string] <-- array of product _id
    
    - on POST tout vers l'api
     */

    const orderButton = document.getElementById("order");
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    const emailErrorMsg = document.getElementById("emailErrorMsg");

    const regexName = /^[a-zA-ZÀ-ÿ_-]{2,60}$/;
    const regexCity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
    const regexAddress = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/;
    const regexEmail = /^[^@\s]{2,30}@[^@\s]{2,30}\.[^@\s]{2,5}$/;

    orderButton.addEventListener('click', event => {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const email = document.getElementById('email').value;

        let regexOfFirstName = regexTest(firstName, regexName, firstNameErrorMsg);
        let regexOfLastName = regexTest(lastName, regexName, lastNameErrorMsg);
        let regexOfAdress = regexTest(address, regexAddress, addressErrorMsg);
        let regexOfCity = regexTest(city, regexCity, cityErrorMsg);
        let regexOfEmail = regexTest(email, regexEmail, emailErrorMsg);

        let arrRegexTest = [regexOfFirstName,regexOfLastName,regexOfAdress,regexOfCity,regexOfEmail]
        
        if (!arrRegexTest.every(element => element == true)){
            console.log('NOK')            
        }
    })
}


const regexTest = function(value, regex, errorMsg){
    if (!regex.test(value)){
        errorMsg.textContent = 'Une erreur de saisi est survenue.';
        return false;
    }else{
        errorMsg.textContent = '';
        return true;
    }
}