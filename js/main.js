const productos = [
    { id: 1, nombre: 'Zapatilla adidas run50s roja', precio: 10000 },
    { id: 2, nombre: 'Zapatilla de running adidas galaxy 6 negra', precio: 12000 },
    { id: 3, nombre: 'Bota adidas mickey niño blanca', precio: 8000 },
    { id: 4, nombre: 'Bota converse all star bordo', precio: 20000 },
    { id: 5, nombre: 'Zapatilla lecoq sportif r500 blanca', precio: 15000 },
    { id: 6, nombre: 'Zapatilla lecoq sportif unisex blanca', precio: 17000 },
    { id: 7, nombre: 'Zapatilla de running asics mujer blanca', precio: 9000 },
    { id: 8, nombre: 'Zapatilla de running asics mujer negra', precio: 10000 },
    { id: 9, nombre: 'Botines de futbol nike negro', precio: 18000 },
    { id: 10, nombre: 'Zapatilla de running nike negra', precio: 22000 },
    { id: 11, nombre: 'Zapatillas de running nike azules', precio: 20000 },
    { id: 12, nombre: 'Zapatilla de basquet topper negra', precio: 10000 },
    { id: 13, nombre: 'Zapatilla de running under armour verde', precio: 10000 },
];

let carrito = [];

function agregarProductoAlCarrito() {
    alert("Bienvenido a Tres Estrellas. A continuación, selecciona los productos que desees.");

    for (let i = 0; i < productos.length; i++) {
        console.log(`ID: ${productos[i].id} - Producto: ${productos[i].nombre} - Precio: $${productos[i].precio}`);
    }

    let productoID = parseInt(prompt("Ingresá el ID del producto que querés agregar al carrito:"));

    const productoSeleccionado = productos.find(producto => producto.id === productoID);

    if (productoSeleccionado) {
        let confirmacion = confirm(`¿Deseás agregar el producto "${productoSeleccionado.nombre}" al carrito por $${productoSeleccionado.precio}?`);

        if (confirmacion) {
            carrito.push(productoSeleccionado);
            alert("Producto agregado al carrito exitosamente.");
        } else {
            alert("Producto no agregado al carrito.");
        }
    } else {
        alert("El producto ingresado no existe.");
    }

    console.log("Carrito actual:", carrito);
    alert(`Actualmente tienes ${carrito.length} producto(s) en tu carrito.`);
}

window.onload = function() {
    let iniciarCompra = confirm("¿Deseas comenzar a comprar?");
    
    if (iniciarCompra) {
        agregarProductoAlCarrito();
    } else {
        alert("Gracias por visitar Tres Estrellas.");
    }
};
