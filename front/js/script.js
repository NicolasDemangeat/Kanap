/* main fonction */
const fetchKanapData = async function(){
    return await fetch("http://localhost:3000/api/products/")
    .then(response => response.json())
    .then(data => {return data});
}
console.log("test : " + fetchKanapData().then(datas => {
    for (kanap in datas[0]){
        console.log("je saiss pas " + kanap["description"])
    };
}));

const fetchData = async function () {
    return await fetch("http://localhost:3000/api/products/")
    .then(response => response.json())
    .then(data => {return data})
    .catch(e => console.log("il y a une erreur de type : " + e));
}

console.log("deuxieme kanapData" + fetchData());