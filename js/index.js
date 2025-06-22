/* Replica del gioco campo minato

FLOWCHART =>    
    Inizio
    
    Scelta modalità (facile/difficile/crazy)
    
    Crea griglia con n celle
    
    Assegna numeri casuali
    
    Posiziona bombe in modo casuale
    
    🎮 Logica interazione utente
    L'utente clicca una cella:
    
    È una bomba?
    
    Sì → Mostra punteggio, Svela tutte le bombe, Fine gioco
    
    No → Rivela cella, Disabilita click
    
    Se tutte le celle sicure sono rivelate → Mostra punteggio, Vittoria
    
    🏁 Fine del gioco
    Mostra messaggio (vittoria o game over)
    
    Mostra punteggio finale
    
    */

// UTILITIES
function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
}

// VARIABILI GLOBALI
let arrayBombe = [];
let totBomb = 16;
let numeriRandom;

// CREO IL SETUP PER IL GIOCO DATO DALL'UTENTE
function valoriGioco(){
    arrayBombe = [];
    
    const app = document.getElementById("app");
    let gameDifficulty = document.getElementById("difficulty").value;
    // console.log(gameDifficulty);

    // gestisco il numero di caselle totali in base alla difficoltà
    let totBox = "";
    switch(gameDifficulty) {
    case "facile":
        totBox = 100;
        break;
    case "difficile":
        totBox = 81;
        break;
    case "crazy":
        totBox = 49;
        break;
    default:
        alert("Devi scegliere una difficoltà per giocare");
        return
    }
    // creo bombe casuali e le pusho nell'array
    while(arrayBombe.length < totBomb){
        let casualBomb = randomNumber(1, totBox);
        if(!arrayBombe.includes(casualBomb)){
            arrayBombe.push(casualBomb);
            console.log("bombe", arrayBombe);
            
        }
    }
    // console.log(arrayBombe);
// chiamo la funzione genera caselle passandogli come parametro il tot delle caselle
    generaGriglia(totBox);
}


// FUNZIONE CHE GENERA L
function generaGriglia(totaleCaselle){

    let griglia = document.getElementById("griglia");
    griglia.innerHTML = "";
    

// struttura griglia
    // radice quadrata per dare una dimenzione hai box della griglia
    let casellePerRiga = Math.sqrt(totaleCaselle);
    // console.log("caselle per riga", casellePerRiga);

// creazione griglia 
    let rigaGriglia = document.createElement("div");
    rigaGriglia.setAttribute("class", "riga-griglia");


// crea casella prova
    // for(let i = 1; i <= totaleCaselle; i++){

    //     let box = document.createElement("div");
    //     box.setAttribute("class", "box");
    //     box.style.width = `calc(100% / ${casellePerRiga})`;
    //     box.style.height = `calc(100% / ${casellePerRiga})`;
    //     box.innerText = i;
    //     rigaGriglia.append(box);
    // }

// crea casella con numero random
    numeriRandom = []; //array dei numeri random
    
    // ciclo fino a che numeriRandom.length è uguale al totaleCaselle
    while( numeriRandom.length < totaleCaselle){
        let numRandom = randomNumber(1, totaleCaselle);
        if(!numeriRandom.includes(numRandom)){
            numeriRandom.push(numRandom);

        // creo la singola casella
            // let box = document.createElement("div");
            // box.setAttribute("class", "box");
            // box.style.width = `calc(100% / ${casellePerRiga})`;
            // box.style.height = `calc(100% / ${casellePerRiga})`;
            // box.innerText = numRandom;
            // rigaGriglia.append(box);

        // gestisco la creazione della casella con una funzione
        let myBox = generaBox(numRandom, casellePerRiga);
        rigaGriglia.append(myBox);
        }

    }
    
    
    griglia.append(rigaGriglia); 
    // console.log("numeri random", numeriRandom);
    
   
    
}

function generaBox(numRand, boxPerRiga){
    let box = document.createElement("div");
    box.setAttribute("class", "box");
    box.style.width = `calc(100% / ${boxPerRiga})`;
    box.style.height = `calc(100% / ${boxPerRiga})`;
    box.style.cursor = "pointer";
    box.innerText = numRand;
    box.addEventListener("click", coloraBox);
    return box;
}

// LOGICA DEL GIOCO
function coloraBox() {
    // console.log(this.innerText,"this");
    this.removeEventListener("click", coloraBox);


    // controllo se nell'array delle bombe c'è il numero di questa casella.. Game Over
    if(arrayBombe.includes(parseInt(this.innerText))){
        // this.style.backgroundColor = "red";
        // alert("Game Over");
        gameOver();
    } else {
        this.style.backgroundColor = "blue";
        this.style.cursor = "not-allowed";     
    }
    


    // console.log(arrayBombe.includes(parseInt(this.innerText)));
}
function gameOver() {
    // prendo tutti i box dal html
    const boxList = document.querySelectorAll(".box");

    // ciclo su l'array delle bombe
    for(let b = 0; b < arrayBombe.length; b++){    
        const bombValue = arrayBombe[b];
        // Cerca nella griglia il box col numero-bomba
        for (let i = 0; i < boxList.length; i++) {
            if (parseInt(boxList[i].innerText) === bombValue) {
                boxList[i].style.backgroundColor = "red";
                boxList[i].style.cursor = "not-allowed";
            }
        }
    }
    // console.log(arrayBombe, "arrayBombe");
    // console.log(numeriRandom, "numeri random");
    
    
    
}



const gioca = document.getElementById("play").addEventListener("click", valoriGioco);
