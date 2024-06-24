document.addEventListener("DOMContentLoaded", mostrarEstadisticas);

function leerEstadisticas (){
    let ventas = JSON.parse(localStorage.getItem("ventas")) || [];
    let todosJuegosVendidos = [];
    if (ventas.length > 0) {
        todosJuegosVendidos = ventas.map((venta) => venta.juegos);
        todosJuegosVendidos = todosJuegosVendidos.flatMap((juegos) => juegos);
    }

    return todosJuegosVendidos; 
}

function mostrarEstadisticas() {
    let ventas = leerEstadisticas()
    console.log(ventas);
    mostrarEstadisticasGenerales(ventas);
    mostrarListadoJuegosVendidos(ventas);
}

function mostrarEstadisticasGenerales(ventas) {
 
    let totalIngresos = ventas.reduce((total, venta) => total + venta.totalVendido, 0);

    let totalJuegosVendidos = ventas.reduce((total, venta) => total + venta.cantidad, 0);

    document.getElementById("totalingresos").innerText = totalIngresos;
    document.getElementById("totalJuegosvendidos").innerText = totalJuegosVendidos;
}

function mostrarListadoJuegosVendidos(ventas) {
    let tablaJuegosVendidos = document.getElementById("tablajuegosvendidos");
    tablaJuegosVendidos.innerHTML = "";

    ventas.forEach(ventas => {

        let fila = document.createElement("tr");

        let celdaNombre = document.createElement("td");
        celdaNombre.innerText = ventas.nombre;

        let celdaCantidad = document.createElement("td");
        celdaCantidad.innerText = ventas.cantidad;

        let celdaIngresos = document.createElement("td");
        celdaIngresos.innerText = ventas.totalVendido;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaIngresos);

        tablaJuegosVendidos.appendChild(fila);
        });
    
}
