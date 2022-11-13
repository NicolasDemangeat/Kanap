const main = async function() {
    await checkLoop();
    let currentCart = JSON.parse(localStorage.getItem('kanapDatas'));
    updateQuantity(currentCart);
    updatePrice(currentCart);
    updateWhenChange();
    configDeleteButton();
    configOrderButton(currentCart);
}

main();