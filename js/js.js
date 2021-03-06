var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer;
var timer = null;
var timerFuel = null;
var fuel = 100;
var intentos = 1;
var h = 60.22;
var alt = 60.22;
//al cargar por completo la página...
window.onload = function() {
    //definición de eventos
    //mostrar menú móvil
    document.getElementById("showm").onclick = function() {
            document.getElementsByClassName("c")[0].style.display = "block";
            stop();
        }
        //ocultar menú móvil
    document.getElementById("hidem").onclick = function() {
            document.getElementsByClassName("c")[0].style.display = "none";
            start();
        }
        //encender/apagar el motor al hacer click en la pantalla
    document.onclick = function() {
            if (a == g) {
                motorOn();
            } else {
                motorOff();
            }
        }
        //encender/apagar al apretar/soltar una tecla
    document.onkeydown = motorOn;
    document.onkeyup = motorOff;

    //Empezar a mover nave
    start();
    window.onkeydown = function(e) {
        var claveTecla;
        if (window.event)
            claveTecla = window.event.keyCode;
        else if (e)
            claveTecla = e.which;
        if ((claveTecla == 32)) {
            motorOn();
        }
    }
    window.onkeyup = motorOff;
}

//Definición de funciones
function start() {
    timer = setInterval(function() {
        moverNave();
    }, dt * 1000);
}

function stop() {
    clearInterval(timer);
}

function reanudar() {
    start();
    document.getElementById("reanudar").style.display = "none";
    document.getElementById("pausa").style.display = "inline-block";
}

function pausar() {
    stop();
    document.getElementById("pausa").style.display = "none";
    document.getElementById("reanudar").style.display = "inline-block";
}

function finJuego() {
    if (v > 7) {
        document.getElementById("naveimg").src = "img/naveKaput.gif";
        document.getElementById("gameOver").style.display = "block";
        document.getElementById("intentos").innerHTML = intentos;
    } else {
        document.getElementById("victoria").style.display = "block";
    }

}

function moverNave() {
    v += a * dt;
    document.getElementById("velocidad").innerHTML = v.toFixed(2);
    y += v * dt;
    h -= v * dt;
    alt = h;
    document.getElementById("altura").innerHTML = alt.toFixed(2);

    //mover hasta que top sea un 70% de la pantalla
    if (y < 70) {
        document.getElementById("nave").style.top = y + "%";
    } else {
        stop();
        finJuego();
    }
}

function motorOn() {
    a = -g;
    fuel--;
    document.getElementById("fuel").innerHTML = fuel;
    document.getElementById("fuegoimg").style.display = "block";
    if (fuel <= 0) {
        motorOff();
        document.getElementById("fuel").innerHTML = 0;

    }
}

function motorOff() {
    a = g
    document.getElementById("fuegoimg").style.display = "none";
}

function actualizarAltura() {
    //Aquí hay que cambiar el valor del marcador de Fuel...
    fuel -= 1;
    document.getElementById("fuel").innerHTML = fuel;
}

function reiniciarJuego() {
    stop();
    document.getElementById("reanudar").style.display = "none";
    document.getElementById("pausa").style.display = "inline-block";
    intentos++;
    y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
    v = 0;
    g = 1.622;
    a = g;
    dt = 0.016683;
    fuel = 100;
    h = 60.22;
    alt = 60.22;
    clearInterval(timer);
    start();
    document.getElementById("intentos").innerHTML = intentos;
    document.getElementById("naveimg").src = "img/nave.png";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("victoria").style.display = "none";
    document.getElementById("fuel").innerHTML = fuel;
}