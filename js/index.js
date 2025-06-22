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

   
function stampaGriglia(){
    
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

// chiamo la funzione genera caselle passandogli come parametro il tot delle caselle
    generaCaselle(totBox);
}


// genero le caselle
function generaCaselle(totaleCaselle){

    let griglia = document.getElementById("griglia");
    griglia.innerHTML = "";
    

// struttura griglia
    console.log(totaleCaselle);
    let casellePerRiga = Math.sqrt(totaleCaselle);
    // console.log("caselle per riga", casellePerRiga);

// creazione griglia 
    let rigaGriglia = document.createElement("div");
    rigaGriglia.setAttribute("class", "riga-griglia");


// crea casella

    // for(let i = 1; i <= totaleCaselle; i++){

    //     let box = document.createElement("div");
    //     box.setAttribute("class", "box");
    //     box.style.width = `calc(100% / ${casellePerRiga})`;
    //     box.style.height = `calc(100% / ${casellePerRiga})`;
    //     box.innerText = i;
    //     rigaGriglia.append(box);
    // }

// crea casella con numero random
    let numeriRandom = [];
    
    while( numeriRandom.length < totaleCaselle){
        let numRandom = randomNumber(1, totaleCaselle);
        if(!numeriRandom.includes(numRandom)){
            numeriRandom.push(numRandom);

            let box = document.createElement("div");
            box.setAttribute("class", "box");
            box.style.width = `calc(100% / ${casellePerRiga})`;
            box.style.height = `calc(100% / ${casellePerRiga})`;
            box.innerText = numRandom;
            rigaGriglia.append(box);
        }

    }
    
    griglia.append(rigaGriglia); 
    
}


const gioca = document.getElementById("play").addEventListener("click", stampaGriglia);
