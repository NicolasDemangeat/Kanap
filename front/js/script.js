

/* main fonction */
const fetchData = async function(){
    return await fetch("http://localhost:3000/api/products/")
    .then(response => response.json())
    .catch(e => console.log("il y a une erreur de type : " + e));
}

const main = async function(){
    const data = await fetchData();

    const section = document.getElementById('items');
    
    for (kanap of data){
        let a = document.createElement("a");
        a.setAttribute('href', '../html/product.html?id=' + kanap._id);
        let article = document.createElement('article');
        let img = document.createElement('img');
        img.setAttribute('src', kanap.imageUrl);
        img.setAttribute('alt', kanap.altTxt);
        let h3 = document.createElement('h3');
        h3.setAttribute('class', 'productName');
        h3.textContent = kanap.name;
        let p = document.createElement('p');
        p.setAttribute('class', 'productDescription');
        p.textContent = kanap.description;
        article.appendChild(img);
        article.appendChild(h3);
        article.appendChild(p);
        a.appendChild(article);
        section.appendChild(a);
    }
}

main();