const main = async function() {
    let currentCart = getLocalStorage() || [];
    await checkLoop(currentCart);
    updateQuantity(currentCart);
    updatePrice(currentCart);
    updateWhenChange();
    configDeleteButton();
    configOrderButton(currentCart);
}

main();