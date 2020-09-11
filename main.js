//menu
const $estado = document.querySelector("#estado")
const $ronda = document.querySelector("#ronda")
const $comenzar = document.querySelector("#comenzar")

//cuadros
const $cuadros = document.querySelectorAll(".cuadro")

let secuenciaMaquina = []
let secuenciaJugador = []


function estadoAlCargarPagina() {
    document.querySelector("#estado").textContent = "Estás listo para jugar? cuando quieras!"
    document.querySelector("#ronda").textContent = "Número de rondas"
}



estadoAlCargarPagina()

$comenzar.onclick = function () {

    let numeroRonda = 0
    manejarRondas();
    function manejarRondas() {

        estadoTurnoMaquina();
        numeroRonda++;
        $ronda.textContent = `Ronda # ${numeroRonda}`

        let nuevoCuadro = obtenerCuadroAleatorio();
        agregarSecuenciaMaquina(nuevoCuadro);

        secuenciaMaquina.forEach(function ($cuadros, i) {
            const retardoMS = (i + 1) * 1000;
            setTimeout(function () {
                resaltar($cuadros);
            }, retardoMS);
        });

        secuenciaJugador = []


        const retrasoJugador = (secuenciaMaquina.length + 1) * 1000

        turnoDelJugador();
        function turnoDelJugador() {
            setTimeout(function () {
                estadoTurnoJugador();
                habilitarInputUsuario();
            }, retrasoJugador);



        }

    }


    function manejarInputUsuario(e) {
        const $cuadro = e.target;
        resaltar($cuadro);
        secuenciaJugador.push($cuadro)

        const $cuadroMaquina = secuenciaMaquina[secuenciaJugador.length - 1];
        if ($cuadro.id !== $cuadroMaquina.id) {
            gameOver();
            return;
        }
        if (secuenciaJugador.length === secuenciaMaquina.length) {
            bloquearInputUsuario();
            setTimeout(manejarRondas, 1000)

        }
    }





    function habilitarInputUsuario() {
        document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
            $cuadro.onclick = manejarInputUsuario;
        });
    }
    function bloquearInputUsuario() {
        document.querySelectorAll(".cuadro").forEach(function ($cuadro) {
            $cuadro.onclick = function () {
            }
        });
    }
    function gameOver() {
        classEstado("alert alert-warning")
        cambiarEstado("GAME OVER ¿Intentas de nuevo?")
        bloquearInputUsuario();
    }
}






function agregarSecuenciaMaquina() {
    secuenciaMaquina.Push(Number(numeroRandom))

}

function resaltar($cuadro) {
    $cuadro.style.opacity = 1;
    setTimeout(function () {
        $cuadro.style.opacity = 0.5;
    }, 500);
}
function agregarSecuenciaMaquina(nuevoCuadro) {
    secuenciaMaquina.push(nuevoCuadro)
}

function obtenerCuadroAleatorio() {
    const $cuadros = document.querySelectorAll(".cuadro")
    let i = Math.floor(Math.random() * $cuadros.length)
    return $cuadros[i]
}

function cambiarEstado(texto) {
    $estado.textContent = texto
}


function resetearSecuenciaJugador() {
    secuenciaJugador = []
}

function classEstado(texto) {
    $estado.className = texto
}

function estadoTurnoMaquina() {
    classEstado("alert alert-primary")
    cambiarEstado("Turno de la maquina");
}

function estadoTurnoJugador() {
    classEstado("alert alert-success")
    cambiarEstado("Turno del jugador");
}