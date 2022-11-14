const main = async function() {
    await checkLoop();
    let currentCart = getLocalStorage() || [];
    updateQuantity(currentCart);
    updatePrice(currentCart);
    updateWhenChange();
    configDeleteButton();
    configOrderButton(currentCart);
}

main();