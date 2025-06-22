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
const app = document.getElementById("app");
console.log(app);

