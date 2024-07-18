// Función para obtener datos del archivo JSON
function obtenerDatosJSON() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '../data/turnos.json', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject('Error al cargar el archivo JSON');
            }
        };
        xhr.send();
    });
}

// Función para simular la carga de datos y mostrar en la interfaz
function simularCargaDatos() {
    obtenerDatosJSON().then(turnos => {
        const container = document.getElementById('turnos-container');
        container.innerHTML = ''; // Limpiar contenido anterior

        turnos.forEach((turno, indice) => {
            const turnoHtml = document.createElement('p');
            turnoHtml.textContent = `Turno ${indice + 1} - Auto: ${turno.auto}, Fecha: ${new Date(turno.fecha).toLocaleDateString()}, Hora: ${turno.hora}`;
            container.appendChild(turnoHtml);
        });
    }).catch(error => {
        console.error(error);
    });
}

// Evento listener para el botón de simulación
document.getElementById('mostrar-turnos-btn').addEventListener('click', simularCargaDatos);
