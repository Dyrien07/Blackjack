(() => {
    "use strict";
    //Mazo y Tipos de Cartas

    const palos = ["C", "D", "H", "S"],
        especiales = ["A", "J", "Q", "K"];

    let puntosJugaodores = [],
        deck = [];
    // Referencias al HTML
    const btnPedir = document.querySelector("#btnPedir"),
        smallJugadores = document.querySelectorAll("small"),
        divCartas = document.querySelectorAll(".divCartas"),
        btnDetener = document.querySelector("#btnDetner"),
        btnNuevoJuego = document.querySelector("#btnNuevo");

    const iniciarJego = (numJugadores = 2) => {
        puntosJugaodores = [];
        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugaodores.push(0);
            smallJugadores[i].innerText = 0;
            divCartas[i].innerHTML = "";


            
            btnPedir.disabled = false;
            btnDetener.disabled = false;
            
        
        }
    };
    const determinarGanador = ()=>{
        const [puntosMinimos, puntosComputadora] = puntosJugaodores
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert("Nadie Gana");
            } else if (puntosMinimos < 21) {
                alert("Computadora Gana");
            } else if (puntosComputadora > 21) {
                alert("Jugador Gana");
            } else {
                alert("Computadora Gana");
            }
        }, 100);
    }

    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let palo of palos) {
                deck.push(i + palo);
            }
        }

        for (let palo of palos) {
            for (let carta of especiales) {
                deck.push(carta + palo);
            }
        }

        return _.shuffle(deck);
    };

    const pedirCarta = () => {
        if (deck.length === 0) {
            alert("No quedan mas cartas.");
            return;
        }

        return deck.pop();
    };
    const ValorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
    };

    const acumularPuntos = (carta, turno) => {
        puntosJugaodores[turno] = puntosJugaodores[turno] + ValorCarta(carta);
        smallJugadores[turno].innerText = puntosJugaodores[turno];
        return puntosJugaodores[turno];
    };


    const crearCarta = (carta, turno)=>{
        let imgCarta = document.createElement("img");
            imgCarta.src = "assets/cartas/" + carta + ".png";
            imgCarta.classList.add("carta");

            divCartas[turno].append(imgCarta);
    }
    //Turno Computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0
        const computadora = puntosJugaodores.length -1;
        do {
            let carta = pedirCarta();
            puntosComputadora =   acumularPuntos(carta, computadora);
            crearCarta(carta, computadora)

            
            if (puntosMinimos > 21) {
                break;
            }
        } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

       determinarGanador()
    };

    //Eventos
    btnPedir.addEventListener("click", () => {
        let carta = pedirCarta();
        const puntosJuador = acumularPuntos(carta, 0);
      crearCarta(carta, 0);

        if (puntosJuador > 21) {
            console.warn("Perdiste");
            turnoComputadora(puntosJuador);
            btnPedir.disabled = true;
            btnDetener.disabled = true;
        } else if (puntosJuador === 21) {
            console.warn("21, Ganaste!");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJuador);
        }
    });
    btnDetener.addEventListener("click", () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugaodores[0]);
    });
    btnNuevoJuego.addEventListener("click", () => {
        iniciarJego(2);
    });
    return {
        nuevoJuego: iniciarJego
    }
})();
