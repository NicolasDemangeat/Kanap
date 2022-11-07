
const gestionDuClik = function(){
    document.getElementById('addToCart').addEventListener('click', mouseEvent => {
        mouseEvent.preventDefault();

        let userChoice = [];
        let kanapObject = {};
        let quantity = parseInt(document.getElementById('quantity').value)
        let kanapId = getId();
        let kanapColor = document.getElementById('colors').value;
        console.log(kanapColor.length);

        if (kanapColor.length == 0 || quantity > 100 || quantity < 1) {
            alert('Il y a une erreur de saisie dans le formulaire.')
        }else{
            kanapObject.quantity = quantity;
            kanapObject.id = kanapId;
            kanapObject.color = kanapColor;
            userChoice.push(kanapObject);
        }
        localStorage.setItem("kanapDatas", JSON.stringify(userChoice));
        console.log(localStorage.getItem("kanapDatas"));
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