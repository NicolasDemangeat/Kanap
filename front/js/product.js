/**
 * main function
 * call the other functions
 */
const main = async function(){
    let id = getId();
    let dataFromId = await fetchData(id);
    logoUpdate(dataFromId.imageUrl, dataFromId.altTxt);
    nameUpdate(dataFromId.name);
    priceUpate(dataFromId.price);
    descriptionUpdate(dataFromId.description);
    colorsOptionUpdate(dataFromId.colors);
    titleUpdate(dataFromId.name);
    gestionDuClik();
}

main();