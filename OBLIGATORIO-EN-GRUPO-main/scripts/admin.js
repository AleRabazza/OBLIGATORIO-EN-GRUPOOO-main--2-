document.addEventListener("DOMContentLoaded", documentOnLoad);

const JUEGOSPRECARGADOS = [
    { id: 1, nombre: "Prince of Persia: The Lost Crown", precio: 100, img: "https://media.vandal.net/100/14/142947/prince-of-persia-the-lost-crown-202422310102789_1b.jpg" },
    { id: 2, nombre: "The Last of Us Parte II Remasterizado", precio: 100, img: "https://media.vandal.net/100/15/154258/the-last-of-us-parte-ii-remasterizado-202411911113128_1b.jpg" },
    { id: 3, nombre: "SILENT HILL: The Short Message", precio: 100, img: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Silent_Hill_The_Short_Message.jpeg/220px-Silent_Hill_The_Short_Message.jpeg" },
    { id: 4, nombre: "Mario Bros", precio: 100, img: "https://www.nintendo.com/eu/media/images/10_share_images/portals_3/2x1_SuperMarioHub_image1600w.jpg"},
    { id: 5, nombre: "Super Metroid", precio: 230, img: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2017/08/portada-super-metroid.jpg?tf=640x"},
    { id: 6, nombre: "Elden Ring", precio: 300, img:"https://media.vandal.net/100/74233/elden-ring-202161213161843_1b.jpg"},
    { id: 7, nombre: "The Legend of Zelda: Ocarina of Time 3D", precio: 390, img:"https://media.vandal.net/100/12807/2011625124710_1b.jpg"},
    { id: 8, nombre: "Grand Theft Auto: San Andreas", precio: 390, img:"https://media.vandal.net/100/3903/2005610224436_1b.jpg"},
    { id: 9, nombre: "Forza Horizon 4", precio: 390, img:"https://media.vandal.net/100/59799/forza-horizon-4-2018102103227_1b.jpg"},
    { id: 10, nombre: "Fallout 3", precio: 390, img:"https://media.vandal.net/100/3627/20081015173329_1b.jpg"},
    { id: 11, nombre: "God of War: Ragnarok ", precio: 390, img:"https://media.vandal.net/100/101651/god-of-war-ragnarok-2022101310444391_1b.jpg"},
    { id: 12, nombre: "Doom Eternal", precio: 390, img:"https://media.vandal.net/100/61939/doom-eternal-2018618194333_1b.jpg"}
];
const JUEGOS = [];

function storageGuardarJuegos() {
    localStorage.setItem("juegos", JSON.stringify(JUEGOS));
}

function storageLeerJuegos() {
    return JSON.parse(localStorage.getItem("juegos")) || [];
}

function cargarJuegos(juegos) {
    for (let juego of juegos) {
        agregarJuego(juego);
    }
}

function agregarJuego(juego) {
    juego.id = ultimoIdJuego() + 1;
    JUEGOS.push(juego);
    storageGuardarJuegos();
}

function modificarJuego(juego) {
    let indice = buscarIndiceJuego(juego.id);
    if (indice !== -1) {
        JUEGOS[indice] = juego;
        storageGuardarJuegos();
    }
}

function buscarJuego(idJuego) {
    for (let i = 0; i < JUEGOS.length; i++) {
        if (JUEGOS[i].id == idJuego) {
            return JUEGOS[i];
        }
    }
    return null;
}

function buscarIndiceJuego(idJuego) {
    for (let i = 0; i < JUEGOS.length; i++) {
        if (JUEGOS[i].id == idJuego) {
            return i;
        }
    }
    return -1;
}

function eliminarJuego(idJuego) {
    let indice = buscarIndiceJuego(idJuego);
    if (indice !== -1) {
        JUEGOS.splice(indice, 1);
        storageGuardarJuegos();
    }
}

function ultimoIdJuego() {
    let ultimoId = -1;
    for (let juego of JUEGOS) {
        if (juego.id > ultimoId) {
            ultimoId = juego.id;
        }
    }
    return ultimoId;
}

function renderizarJuego(juego) {
    let fila = document.createElement("tr");
    fila.dataset.idjuego = juego.id;

    let celdaImg = document.createElement("td");
    let imgImagen = document.createElement("img");
    if (juego.img.startsWith("http")) {
        imgImagen.src = juego.img;
    } else {
        imgImagen.src = "../" + juego.img;
    }
    imgImagen.alt = juego.nombre;
    celdaImg.appendChild(imgImagen);

    fila.appendChild(celdaImg);

    let celdaNombre = document.createElement("td");
    celdaNombre.innerText = juego.nombre;
    fila.appendChild(celdaNombre);

    let celdaPrecio = document.createElement("td");
    celdaPrecio.innerText = `$${juego.precio}`;
    fila.appendChild(celdaPrecio);

    let celdaAcciones = document.createElement("td");
    let divBtnGroup = document.createElement("div");
    divBtnGroup.classList.add("btn-group");

    let botonEditar = document.createElement("button");
    botonEditar.classList.add("btn", "btn-secondary");
    botonEditar.innerText = "Editar";
    botonEditar.addEventListener("click", onClickBotonEditar);
    divBtnGroup.appendChild(botonEditar);

    let botonEliminar = document.createElement("button");
    botonEliminar.classList.add("btn", "btn-danger");
    botonEliminar.innerText = "Eliminar";
    botonEliminar.addEventListener("click", onClickBotonEliminar);
    divBtnGroup.appendChild(botonEliminar);

    celdaAcciones.appendChild(divBtnGroup);

    fila.appendChild(celdaAcciones);
    return fila;
}

function renderizarJuegos() {
    let tablaJuegos = document.getElementById("tablaJuegos");
    tablaJuegos.innerHTML = "";
    let fila;

    for (let juego of JUEGOS) {
        fila = renderizarJuego(juego);
        tablaJuegos.appendChild(fila);
    }
}

function cambiarAFormularioAgregar() {
    let leyendaFormulario = document.getElementById("leyendaFormulario");
    let botonAgregarFormulario = document.getElementById("botonAgregar");

    leyendaFormulario.innerText = "Agregar Juego";
    botonAgregarFormulario.innerText = "Agregar";
}

function cambiarAFormularioEditar() {
    let leyendaFormulario = document.getElementById("leyendaFormulario");
    let botonAgregarFormulario = document.getElementById("botonAgregar");

    leyendaFormulario.innerText = "Editar Juego";
    botonAgregarFormulario.innerText = "Editar";
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("img").value = "";
    document.getElementById("idJuegoParaEditar").value = "-1";
}

function documentOnLoad() {
    console.log("El DOM ha sido cargado");
    document.getElementById("mostrarOcultarFormulario")
        .addEventListener("click", onClickMostrarOcultarFormulario);
    document.getElementById("botonCancelar")
        .addEventListener("click", onClickBotonCancelar);
    document.getElementById("botonAgregar")
        .addEventListener("click", onClickBotonAgregar);

    let juegosDeStorage = storageLeerJuegos();

    if (juegosDeStorage.length === 0) {
        cargarJuegos(JUEGOSPRECARGADOS);
        console.log("Juegos cargados:", JUEGOSPRECARGADOS); 
        storageGuardarJuegos();
    } else {
        cargarJuegos(juegosDeStorage);
    }

    renderizarJuegos();
}

function onClickMostrarOcultarFormulario() {
    let button = document.getElementById("mostrarOcultarFormulario");
    let fieldset = document.getElementById("formularioFieldset");
    if (button.dataset.formVisible === undefined || button.dataset.formVisible === "false") {
        button.dataset.formVisible = "true";
        fieldset.classList.remove("oculto");
        button.innerText = "Ocultar Formulario";
    } else {
        button.dataset.formVisible = "false";
        fieldset.classList.add("oculto");
        button.innerText = "Mostrar Formulario";
    }
}

function onClickBotonCancelar() {
    onClickMostrarOcultarFormulario();
    cambiarAFormularioAgregar();
    limpiarFormulario();
}

function onClickBotonAgregar() {
    let inputidJuegoParaEditar = document.getElementById("idJuegoParaEditar");
    let inputnombre = document.getElementById("nombre");
    let inputprecio = document.getElementById("precio");
    let inputimg = document.getElementById("img");

    let idJuegoParaEditar = inputidJuegoParaEditar.value;
    let nombre = inputnombre.value;
    let precio = parseFloat(inputprecio.value);
    let img = inputimg.value;

    if (nombre === "" || isNaN(precio) || img === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    if (idJuegoParaEditar === "-1") {
        let nuevoJuego = {
            id: ultimoIdJuego() + 1,
            nombre: nombre,
            precio: precio,
            img: img
        };
        agregarJuego(nuevoJuego);
    } else {
        let juegoModificado = {
            id: parseInt(idJuegoParaEditar),
            nombre: nombre,
            precio: precio,
            img: img
        };
        modificarJuego(juegoModificado);
    }

    renderizarJuegos();
    onClickBotonCancelar();
}

function onClickBotonEliminar(event) {
    let fila = event.target.closest("tr");
    let idJuego = parseInt(fila.dataset.idjuego);
    let confirmacion = window.confirm("Estas seguro de borrar este juego?")
    if(confirmacion==true){
    eliminarJuego(idJuego);
    renderizarJuegos();
    } else{
        renderizarJuegos();
    }
}

function onClickBotonEditar(event) {
  

    cambiarAFormularioEditar();

    let fila = event.target.closest("tr");
    let idJuego = parseInt(fila.dataset.idjuego);
    let juego = buscarJuego(idJuego);

    let inputidJuegoParaEditar = document.getElementById("idJuegoParaEditar");
    let inputnombre = document.getElementById("nombre");
    let inputprecio = document.getElementById("precio");
    let inputimg = document.getElementById("img");

    inputidJuegoParaEditar.value = juego.id;
    inputnombre.value = juego.nombre;
    inputprecio.value = juego.precio;
    inputimg.value = juego.img;
}


