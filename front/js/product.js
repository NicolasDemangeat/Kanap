const checkUserChoices = function(color, quantity){
    if (color.length == 0 || quantity > 100 || quantity < 1) {
        return false;
    }else{
        return true;
    }    
}


const gestionDuClik = function(){
    document.getElementById('addToCart').addEventListener('click', mouseEvent => {
        mouseEvent.preventDefault();

        let userChoice = [];
        let kanapObject = {};
        let urlId = getId();
        let userChoiceQuantity = parseInt(document.getElementById('quantity').value)
        let userChoiceColor = document.getElementById('colors').value;

        if (checkUserChoices(userChoiceColor, userChoiceQuantity)) {
            kanapObject.quantity = userChoiceQuantity;
            kanapObject.id = urlId;
            kanapObject.color = userChoiceColor;
            userChoice.push(kanapObject);

            if(localStorage.getItem('kanapDatas')){
                console.log('il y a un element')
                let arrCart = [];
                arrCart = JSON.parse(localStorage.getItem("kanapDatas"));
                
                let newArrCart = arrCart.filter(kanap => kanap.color == kanapObject.color && kanap.id === kanapObject.id);

                if(newArrCart.length){
                    newArrCart[0].quantity += userChoiceQuantity;
                }


                arrCart.forEach(element => {
                    if (element.id == urlId && element.color == userChoiceColor) {
                        element.quantity += userChoiceQuantity;
                        console.log(element.quantity)
                    }
                });
            }else{
                localStorage.setItem("kanapDatas", JSON.stringify(userChoice));
            }

        }else{
            alert('Il y a une erreur de saisie dans le formulaire.')
        }
        console.log(localStorage.getItem("kanapDatas"))
    })
}

/**
 * main function
 * call the others function
 */
const main = async function(){

    let id = getId();
    let dataFromId = await fetchData(id);
    logoUpdate(dataFromId.imageUrl, dataFromId.altTxt);
    nameUpdate(dataFromId.name);
    priceUpate(dataFromId.price);
    descriptionUpdate(dataFromId.description);
    colorsOptionUpdate(dataFromId.colors);
    gestionDuClik();
}

main();