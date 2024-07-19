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

// Función para obtener datos del clima
async function obtenerClima() {
    const apiKey = 'TU_API_KEY_DE_OPENWEATHERMAP';
    const ciudad = 'Salta';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        mostrarClima(data);
    } catch (error) {
        console.error("Error al obtener los datos del clima:", error);
    }
}

// Función para mostrar los datos del clima
function mostrarClima(data) {
    const container = document.getElementById('weather-container');
    container.innerHTML = `
        <h2>Clima en ${data.name}</h2>
        <p>Temperatura: ${data.main.temp} °C</p>
        <p>Descripción: ${data.weather[0].description}</p>
    `;
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

// Obtener y mostrar el clima al cargar la página
obtenerClima();

