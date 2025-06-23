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
let punteggio;
let tentativi;

// CREO IL SETUP PER IL GIOCO DATO DALL'UTENTE
function valoriGioco(){
    arrayBombe = [];
    punteggio = 0;
    tentativi = 0;
    
    const app = document.getElementById("app");
    let gameDifficulty = document.getElementById("difficulty").value;
    // console.log(gameDifficulty);

    let messaggioFinale = document.getElementById("messaggio-finale");
    messaggioFinale.innerText = "";

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
    // console.log(this,"this");
    this.removeEventListener("click", coloraBox);


    // controllo se nell'array delle bombe c'è il numero di questa casella.. Game Over
    if(arrayBombe.includes(parseInt(this.innerText))){
        // this.style.backgroundColor = "red";
        // alert("Game Over");
        gameOver(false);
    }
    else if( !arrayBombe.includes(parseInt(this.innerText)) && this.innerText != ""){
        punteggio += 100;
        tentativi++;
        this.style.backgroundColor = "blue";
        this.style.cursor = "not-allowed";  
            if( tentativi == numeriRandom.length - arrayBombe.length){
                gameOver(true);
                // console.log("tentativi",numeriRandom.length - arrayBombe.length);
            }
    }
    
    // console.log(arrayBombe.includes(parseInt(this.innerText)));
}
function gameOver(vittoria) {
    let messaggioFinale = document.getElementById("messaggio-finale");
        messaggioFinale.classList.remove("d-none");
    // prendo tutti i box dal html
    const boxList = document.querySelectorAll(".box");

    if(vittoria == false){
        // ciclo su l'array delle bombe
        for(let b = 0; b < arrayBombe.length; b++){    
            const bombValue = arrayBombe[b];
            // Cerca nella griglia il box col numero-bomba
            for (let i = 0; i < boxList.length; i++) {
                boxList[i].removeEventListener("click", coloraBox);
                if (parseInt(boxList[i].innerText) === bombValue) {
                    boxList[i].style.backgroundColor = "red";
                    boxList[i].style.cursor = "not-allowed";
                    boxList[i].innerHTML = `
                    <img src="img/logo-campo-minato.png" alt="" style= width:100%;>`
                }
            }
        }
        // console.log(arrayBombe, "arrayBombe");
        // console.log(numeriRandom, "numeri random");
        console.log("punteggio", punteggio);
        console.log("tentativi", tentativi);
        
        messaggioFinale.innerText = `Score: ${punteggio} punti.. Hai trovato ${tentativi} caselle senza Bombe.`
    }
    else {
        messaggioFinale.innerText = `Score: ${punteggio} punti.. Congratulazioni hai trovato tutte le caselle senza Bombe.`
        for (let i = 0; i < boxList.length; i++) {
            boxList[i].removeEventListener("click", coloraBox);
        }
    }
    let main = document.getElementsByTagName("main")[0];
    console.log(main, "main");
    
    let rigioca = document.createElement("button");
    rigioca.setAttribute("class", "btn btn-secondary ms-1 mt-4");
    // rigioca.setAttribute("class", "btn btn-secondary ms-1");
    rigioca.innerText = "Rigioca";
    main.append(rigioca);
    rigioca.addEventListener("click", function(){
        valoriGioco();
        rigioca.setAttribute("class", "d-none");
    });
    let gioca = document.getElementById("play").addEventListener("click", function(){
        valoriGioco();
        rigioca.setAttribute("class", "d-none");
    })
    
}



let gioca = document.getElementById("play").addEventListener("click", valoriGioco);
