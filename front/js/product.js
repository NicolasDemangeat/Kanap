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
                console.log('il y a des elementss')
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
                    alert('Cet obet était déja présent dans votre panier, la quantité a été mise à jour.')
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
        console.log(localStorage.getItem('kanapDatas'))
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