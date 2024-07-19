// Constructor de Turno
function Turno(auto, fecha, hora) {
    this.auto = auto;
    this.fecha = fecha;
    this.hora = hora;
}

// Función para cargar turnos desde el LocalStorage
function cargarTurnos() {
    const turnosGuardados = localStorage.getItem('turnos');
    if (turnosGuardados) {
        return JSON.parse(turnosGuardados);
    }
    return [];
}

// Función para guardar turnos en el LocalStorage
function guardarTurnos(turnos) {
    localStorage.setItem('turnos', JSON.stringify(turnos));
}

// Array de turnos
let turnos = cargarTurnos();

// Función para agendar un turno
function agendarTurno() {
    const auto = prompt("Ingrese el modelo del auto:");
    const fecha = prompt("Ingrese la fecha del turno (formato: DD/MM/AAAA):");
    const hora = prompt("Ingrese la hora del turno (formato: HH:MM):");

    // Convertir la fecha ingresada a un objeto Date
    const partesFecha = fecha.split("/");
    const fechaTurno = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);

    // Crear un nuevo turno y agregarlo al array de turnos
    const nuevoTurno = new Turno(auto, fechaTurno, hora);
    turnos.push(nuevoTurno);

    // Guardar los turnos actualizados en el LocalStorage
    guardarTurnos(turnos);
}

// Función para mostrar los turnos en el contenedor HTML
function mostrarTurnos() {
    const container = document.getElementById('turnos-container');
    container.innerHTML = '';

    turnos.forEach((turno, indice) => {
        const turnoHtml = document.createElement('p');
        turnoHtml.textContent = `Turno ${indice + 1} - Auto: ${turno.auto}, Fecha: ${turno.fecha.toLocaleDateString()}, Hora: ${turno.hora}`;
        container.appendChild(turnoHtml);
    });
}

// Evento Listeners para los botones
document.getElementById('agregar-turno-btn').addEventListener('click', function() {
    agendarTurno();
    mostrarTurnos();
});

document.getElementById('mostrar-turnos-btn').addEventListener('click', function() {
    mostrarTurnos();
});

// Mostrar turnos al cargar la página
mostrarTurnos();

// Función para obtener datos desde JSONPlaceholder
async function obtenerDatos() {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/posts');
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

// Función para mostrar los datos obtenidos en el contenedor HTML
async function mostrarDatos() {
    const datos = await obtenerDatos();
    const container = document.getElementById('datos-container');
    container.innerHTML = '';

    datos.forEach((dato, indice) => {
        const datoHtml = document.createElement('p');
        datoHtml.textContent = `ID: ${dato.id} - Título: ${dato.title}`;
        container.appendChild(datoHtml);
    });
}

// Evento Listener para el botón de mostrar datos
document.getElementById('mostrar-datos-btn').addEventListener('click', function() {
    mostrarDatos();
});

