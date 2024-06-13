function Turno(auto, fecha, hora) {
    this.auto = auto;
    this.fecha = fecha;
    this.hora = hora;
}

var turnos = [];

function agendarTurno() {
    var auto = prompt("Ingrese el auto:");
    var fecha = prompt("Ingrese la fecha del turno (formato: DD/MM/AAAA):");
    var hora = prompt("Ingrese la hora del turno (formato: HH:MM):");

    var partesFecha = fecha.split("/");
    var fechaTurno = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);

    var nuevoTurno = new Turno(auto, fechaTurno, hora);
    turnos.push(nuevoTurno);
}

function mostrarTurnos() {
    var container = document.getElementById('turnos-container');
    container.innerHTML = '';

    turnos.forEach(function(turno, indice) {
        var turnoHtml = document.createElement('p');
        turnoHtml.textContent = "Turno " + (indice + 1) + " - Auto: " + turno.auto + ", Fecha: " + turno.fecha.toLocaleDateString() + ", Hora: " + turno.hora;
        container.appendChild(turnoHtml);
    });
}

document.getElementById('agregar-turno-btn').addEventListener('click', function() {
    agendarTurno();
});

document.getElementById('mostrar-turnos-btn').addEventListener('click', function() {
    mostrarTurnos();
});
