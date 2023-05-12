document.getElementById("devine").focus();
var rappelLastEntry = "";

// bouton "mots"
let cheat = document.getElementById("reponse");
cheat.addEventListener('click', function(){
    let res = document.getElementById("resultat");
    if (res.style.display == "block"){
        res.style.display = "none";
    }
    else{
        res.style.display = "block";
    }
})

// bouton "voir le mot à deviner"
let cheat2 = document.getElementById("motadev");
cheat2.addEventListener('click', function(){
    let res = document.getElementById("resultat2");
    if (res.style.display == "block"){
        res.style.display = "none";
    }
    else{
        res.style.display = "block";
    }
})

// récupérer les mots déjà entrés par l'utilisateur
function rowsToList(){
    let mots = "";
    let scores = "";
    let dico = {};
    if (document.getElementById("tableau") == null){
        return null;
    }
    let tab_tr = document.getElementById("tableau").getElementsByTagName('tr');
    const lg_tab_tr = tab_tr.length;
    for (let i=0; i<lg_tab_tr; i++) {
        tab_tr[i].childNodes.forEach(el => {
            if(el.tagName === "TD"){
                if(el.getAttribute("class") == "mot") mots = el.innerText;
                else{
                    scores = el.innerText.split("%")[0];
                } 
            }
        if (mots.length != 0){
        dico[mots] = scores;
        }
        });   
    }
    return dico;
}


// gestion de la barre de score
function move(myScore) {
    let i = 1;
    let elem = document.getElementById("myBar");
    let width = 1;
    let id = setInterval(frame, 10);    
    function frame() {
        if (width >= myScore) {
            clearInterval(id);
            i = 0;
        } else {
            width++;
            elem.style.width = width + "%";
        }
    }
    elem.innerText = myScore;

    if(myScore == "100"){
        elem.style.backgroundColor = "red";
    }    
}


// recréation du tableau des mots déjà rentrés par l'utilisateur après Ajax
// modification si meilleur score de la barre de score
function reCreate(myList){
    let myDiv = document.getElementById("myDiv");
    if (document.getElementById("tableau") != null){
    document.getElementById("tableau").remove();
    }
    let tableau = document.createElement("table");
    tableau.setAttribute("id", "tableau");
    myDiv.appendChild(tableau);
    
    for (let m = 0 ; m < myList.length ; m++){
        
        let tr = document.createElement("tr");
        tableau.appendChild(tr);
    
        let td = document.createElement("td");
        td.setAttribute("class", "mot");
        tr.appendChild(td);
        td.innerText = myList[m][0];

        let td2 = document.createElement("td");
        td2.setAttribute("class", "score");
        tr.appendChild(td2);
        td2.innerText = myList[m][1] + "%"; 
    }

    let myBar = document.getElementById("myBar");
    console.log(parseInt(myBar.innerText));
    if(parseInt(myList[0][1]) > parseInt(myBar.innerText)) {
        move(myList[0][1]);
    }

}


// fonction principale quand l'utilisateur entre un mot
function noRepeat(){
    const myText = document.getElementById("devine");
    let myDict;
    if (myText.value.length != 0){
        rappelLastEntry = myText.value;
        const rows = rowsToList();
        if (rows == null){
            myDict = {"mot" : rappelLastEntry};
        }
        else{
            myDict = {
                "mot" : rappelLastEntry,
                "liste" : rows
            };
    }
    document.getElementById("message").innerHTML = "";
    document.getElementById("devine").value = "";

    fetch('/devine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myDict)
      }).then(response => response.json())
      .then(el => {
        let sortable = [];
        document.getElementById("lastEntry").innerText = rappelLastEntry + " " + el[rappelLastEntry] + " %";
        for (let item in el) {
            sortable.push([item, el[item]]);
        }

        sortable.sort(function(a, b) {
            return  b[1] - a[1];
        });

        reCreate(sortable);
      })
    }
    else{
        document.getElementById("message").innerHTML = "Rentrez un mot !";
    }
}


// évènements sur l'input qui déclenchent la fonction principale
const myButton = document.getElementById("myButton");
const devin = document.getElementById("devine");

myButton.addEventListener("click", function(){
    noRepeat();
})
devin.addEventListener("keypress", function(e){
    if(e.key == "Enter"){
        noRepeat();
    }
})

