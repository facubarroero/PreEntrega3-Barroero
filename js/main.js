const container = document.getElementById("generalContainer");
const buscarInput = document.getElementById("buscar");
const carrito = recuperarCarrito();
const carritoContainer = document.getElementById("productosCarrito");
const btnVaciarCarrito = document.getElementById("vaciarCarrito");

function generarProductCardsHTML(instrumento) {
  return `<div class="productCard">
                <div class="cardImg">
                    <img src="./img/${instrumento.img}">
                </div>
                <div class="cardName">
                    <h3>${instrumento.nombre}</h3>
                </div>
                <div class="cardPrice">
                    <p class="price">$${instrumento.precio}</p>
                </div>
                <div class="cardType">
                    <p class="tipo">${instrumento.tipo.toUpperCase()}</p>
                </div>
                <div class="cardBtnContainer">
                    <button class="cardBtn" id="${
                      instrumento.id
                    }">Agregar al carrito</button>
                </div>
            </div>`;
}

function inyectarProductos(stock) {
  container.innerHTML = "";
  stock.forEach((instrumento) => {
    container.innerHTML += generarProductCardsHTML(instrumento);
  });
  eventoAddCarrito();
}

function eventoAddCarrito() {
  const btns = document.querySelectorAll(".cardBtn");
  for (let boton of btns) {
    boton.addEventListener("click", () => {
      carrito.push(
        instrumentos.find(
          (instrumento) => instrumento.id === parseInt(boton.id)
        )
      );
      guardarCarrito();
      Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#4CAF50",
        stopOnFocus: true,
      }).showToast();
    });
  }
}

function guardarCarrito() {
  localStorage.setItem("carritoDeInstrumentos", JSON.stringify(carrito));
}

function recuperarCarrito() {
  return JSON.parse(localStorage.getItem("carritoDeInstrumentos")) || [];
}

function filtro(value) {
  let input = instrumentos.filter((instrumento) =>
    instrumento.nombre.toLowerCase().includes(value.toLowerCase())
  );
  input.length > 0 && inyectarProductos(input);
}

buscarInput.addEventListener("search", (e) => {
  filtro(e.target.value);
});

function existe(instrumento) {
  carrito.find((producto) => producto.id === parseInt(instrumento.id));
}

function generarCardCarrito(instrumento) {
  return `<td>${instrumento.nombre}</td>
          <td>$${instrumento.precio.toFixed(2)}</td>
          <td>
            <button class = "btnRemove" onclick="eliminarInstrumento(${
              instrumento.id
            })">Eliminar</button>
          </td>`;
}
function inyectarEnCarrito(carrito) {
  carritoContainer.innerHTML = "";
  carrito.forEach((instrumento) => {
    carritoContainer.innerHTML += generarCardCarrito(instrumento);
  });
}

/* function eliminarInstrumento(id){
    
} */


function vaciarCarrito() {
  carrito.length = 0;
  localStorage.setItem("carritoDeInstrumentos", JSON.stringify(carrito));
  Toastify({
    text: "Carrito vaciado",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: "#FFA500",
    stopOnFocus: true,
  }).showToast();
  recuperarCarrito();
}

inyectarProductos(instrumentos);
inyectarEnCarrito(carrito);
recuperarCarrito();
