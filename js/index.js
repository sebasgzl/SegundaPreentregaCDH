//CLASES 

class Producto {
    constructor(id, nombre, imagen, precio) {
        this.id = id
        this.nombre = nombre
        this.imagen = imagen
        this.precio = precio
    }
}

class Carrito {
    constructor(id) {
        this.id = id
        this.productos = []
    }
    calcularTotal() {
        let total = 0
        for (let i = 0; i < this.productos.length; i++) {
            total = total + this.productos[i].precio
        }
        return total
    }
}

//CATALOGO DE PRODUCTOS 

let catalogoDeProducto = []


let cooler = new Producto(1, "cooler", "1.jpg", 10000)
let mouse = new Producto(2, "mouse g403", "2.jpg", 16000)
let gabinete = new Producto(3, "Gabinete", "3.png", 35000)
let monitorUno = new Producto(4, "monitor omen ", "4.jpg", 75000)
let monitorDos = new Producto(5, "Monitor LG", "5.jpg",70000)
let pc = new Producto(6, "Pc gamer AMD", "6.jpg",150000 )
let teclado = new Producto(7, "teclado republic ", "7.png", 8000)

catalogoDeProducto.push(cooler)
catalogoDeProducto.push(mouse)
catalogoDeProducto.push(gabinete)
catalogoDeProducto.push(monitorUno)
catalogoDeProducto.push(monitorDos)
catalogoDeProducto.push(pc)
catalogoDeProducto.push(teclado)

//CARDS PRODUCTOS 

let cardsDiv = document.querySelector("#cards")

catalogoDeProducto.forEach(producto => {
    cardsDiv.innerHTML += rendercard(producto)
})

//FUNCIONES

function rendercard(producto) {
    let cardRendered = `
    <div class="card m-3 col-6 col-sm-3" style="width: 18rem;">
<img src="./img/${producto.imagen}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${producto.id}.${producto.nombre}</h5>
  <p class="card-text">$ ${producto.precio}</p>
  <a href="#" class="btn btn-primary botonDeCompras" id="${producto.id}">Agregar al Carrito</a>
</div>
</div>
    `
    return cardRendered
}

function limpiarCarrito() {
    let divCarrito = document.querySelector("#carrito")
    divCarrito.innerHTML = ""
}

function actualizarCarrito(carrito) {
    let divCarrito = document.querySelector("#carrito")
    carrito.productos.forEach(producto => {
        divCarrito.innerHTML += rendercard(producto)
    })
    divCarrito.innerHTML += `<h2>Precio Total: ARG$ ${carrito.calcularTotal()}</h2>`

}

function mostrarAlert(){
    Swal.fire({
        icon: 'success',
        title: 'Felicitaciones',
        text: 'Producto agregado al Carrito',
      })
} 

function renovaeStorage(){
    localStorage.removeItem("carrito"); 
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

window.addEventListener('DOMContentLoaded', (e) => {
    let storage = JSON.parse(localStorage.getItem("carrito"));
    let carritoGuardado = new Carrito(storage.id, storage.productos);
    storage.productos.forEach(producto => {
        carritoGuardado.productos.push(producto)
    })
    limpiarCarrito()
    actualizarCarrito(carritoGuardado)
})
//INGRESAR PRODCUTOS AL CARRITO 

let carrito = new Carrito(1)

let botones = document.querySelectorAll(".botonDeCompras")
botones.onclick = mostrarAlert
let arrayDeBotones = Array.from(botones)
arrayDeBotones.forEach(boton => {
    boton.addEventListener("click", (e) => {
        let productoSelecionado = catalogoDeProducto.find(producto => producto.id == e.target.id)
        carrito.productos.push(productoSelecionado)
        limpiarCarrito()
        actualizarCarrito(carrito)
        renovaeStorage()
        mostrarAlert()
    })
})