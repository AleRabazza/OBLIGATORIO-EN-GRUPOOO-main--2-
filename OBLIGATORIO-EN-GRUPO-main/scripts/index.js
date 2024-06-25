document.addEventListener('DOMContentLoaded', documentOnLoad);
const JUEGOS = [
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

let CARRITO = [];

const VENTAS = [];

function storageLeerJuegos() {
    return JSON.parse(localStorage.getItem("juegos")) || JUEGOS;
}

function cargarJuegos(juegos) {
    JUEGOS.length = 0; 
    juegos.forEach(juego => JUEGOS.push(juego));
}


function cargarVenta(ventas) {
    let ventasGuardadas = JSON.parse(localStorage.getItem("ventas")) || [];
    ventasGuardadas.push(ventas);
    localStorage.setItem("ventas", JSON.stringify(ventasGuardadas));
}


function buscarJuego(idJuego) {
    for (let i = 0; i < JUEGOS.length; i++) {
        if (JUEGOS[i].id == idJuego) {
            return JUEGOS[i];
        }
    }
    return null;
}

function agregarJuegoAlCarrito(juego) {
    let indice = buscarEnCarrito(juego);

    if (indice === -1) {
        CARRITO.push({
            juego,
            cantidad: 1
        });
    } else {
        CARRITO[indice].cantidad++;
    }
    renderizarCarrito();
}

function eliminarJuegoDelCarrito(juego) {
    let indice = buscarEnCarrito(juego);
    if (indice !== -1) {
        CARRITO.splice(indice, 1);
    }
    renderizarCarrito();
}

function buscarEnCarrito(juego) {
    for (let i = 0; i < CARRITO.length; i++) {
        if (CARRITO[i].juego.id == juego.id) {
            return i;
        }
    }
    return -1;
}

function renderizarJuegos(juegos) {
    let ul = document.getElementById("lista-juegos");
    ul.innerHTML = "";

    juegos.forEach(juego => {
        let li = crearLiJuego(juego);
        ul.appendChild(li);
    });
}

function renderizarCarrito() {
    let ul = document.getElementById("carritoLista");
    ul.innerHTML = "";
    let totalUnidades = 0;
    let totalPrecio = 0;

    CARRITO.forEach(({ juego, cantidad }) => {
        let li = document.createElement("li");
        li.innerHTML = `${juego.nombre} - Cantidad: ${cantidad} - Precio por unidad: $${juego.precio.toFixed(2)} - Total: $${(cantidad * juego.precio).toFixed(2)}`;
        ul.appendChild(li);

        totalUnidades += cantidad;
        totalPrecio += cantidad * juego.precio;
    });

    if (totalUnidades == 3) {
        totalPrecio *= 0.85;
        alert("¡Se te aplicó un descuento del 15% por comprar más de 3 unidades!");
    }

    document.getElementById("carritoTotalUnidades").innerText = totalUnidades;
    document.getElementById("carritoTotalPrecio").innerText = totalPrecio.toFixed(2);
}

function comprarTodo() {
    if (CARRITO.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let ventas = {
            juegos: CARRITO.map(({ juego, cantidad }) => ({
            nombre: juego.nombre,
            cantidad,
            totalVendido: cantidad * juego.precio
        })),
        totalVendido: CARRITO.reduce((sum, { juego, cantidad }) => sum + (cantidad * juego.precio), 0)
    };

    cargarVenta(ventas);
    CARRITO = [];
    renderizarCarrito();
    alert("Compra realizada con éxito. Los detalles de la venta han sido guardados.");
}


function documentOnLoad() {
    console.log("El DOM ha sido cargado");
    document.getElementById("buscar").addEventListener("input", onKeyPressInputBuscar);
    document.getElementById("botonComprarTodos").addEventListener("click", comprarTodo);
   
    let juegosEnStorage = storageLeerJuegos();

    if (juegosEnStorage.length === 0) {
        cargarJuegos(JUEGOS);
        console.log("Juegos cargados:", JUEGOS); 
        storageLeerJuegos();
    } else {
        cargarJuegos(juegosEnStorage);
    }

    renderizarJuegos(JUEGOS);

}

function onKeyPressInputBuscar(evento) {
    let texto = evento.target.value;

    if (texto === "") {
        renderizarJuegos(JUEGOS);
        return;
    }

    let juegosFiltrados = JUEGOS.filter(juego => juego.nombre.toLowerCase().includes(texto.toLowerCase()));

    renderizarJuegos(juegosFiltrados);
}


function crearLiJuego(juego) {
    let li = document.createElement("li");
    li.dataset.idjuego = juego.id;
    let span = document.createElement("span");
    span.innerText = juego.nombre;
    let imgTag = document.createElement("img");
    if (juego.img.startsWith("http")) {
        imgTag.src = juego.img;
    } else {
        imgTag.src = "../" + juego.img;
    }
    imgTag.alt = juego.nombre;
    imgTag.classList.add("img-thumbnail");
    let span2 = document.createElement("span");
    span2.innerText = `$${juego.precio.toFixed(2)}`;
    let button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.innerText = "Agregar al carrito";
    button.addEventListener("click", onClickButtonAgregarAlCarrito);

    li.appendChild(span);
    li.appendChild(imgTag);
    li.appendChild(span2);
    li.appendChild(button);

    return li;
}

function onClickButtonAgregarAlCarrito(evento) {
    let idJuego = parseInt(evento.target.parentElement.dataset.idjuego);
    let juego = buscarJuego(idJuego);

    agregarJuegoAlCarrito(juego);
}




