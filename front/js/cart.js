

async function main() {
    await checkLoop();
    let currentCart = JSON.parse(localStorage.getItem('kanapDatas'));
    updateQuantity(currentCart);
    updatePrice(currentCart);
    updateWhenChange();
    configDeleteButton();
    configOrderButton();
}

main();