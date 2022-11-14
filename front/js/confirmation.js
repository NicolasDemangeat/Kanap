const main = function(){
    let id = getId();
    document.getElementById('orderId').textContent = id;
    localStorage.clear()
}

main();