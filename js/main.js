const productos = [
    { id: 1, nombre: 'Zapatilla adidas run50s roja', precio: 10000, img: 'assets/zapatilla-adidas-1.jpg' },
    { id: 2, nombre: 'Zapatilla de running adidas galaxy 6 negra', precio: 12000, img: 'assets/zapatilla-adidas-2.jpg' },
    { id: 3, nombre: 'Bota adidas mickey niño blanca', precio: 8000, img: 'assets/zapatilla-adidas-3.jpg' },
    { id: 4, nombre: 'Bota converse all star bordo', precio: 20000, img: 'assets/zapatilla-converse-1.jpg' },
    { id: 5, nombre: 'Zapatilla lecoq sportif r500 blanca', precio: 15000, img: 'assets/zapatilla-lecoq-1.jpg' },
    { id: 6, nombre: 'Zapatilla lecoq sportif unisex blanca', precio: 17000, img: 'assets/zapatilla-lecoq-2.jpg' },
    { id: 7, nombre: 'Zapatilla de running asics mujer blanca', precio: 9000, img: 'assets/zapatillas-asics-1.jpg' },
    { id: 8, nombre: 'Zapatilla de running asics mujer negra', precio: 10000, img: 'assets/zapatillas-asics-2.jpg' },
    { id: 9, nombre: 'Botines de futbol nike negro', precio: 18000, img: 'assets/zapatillas-nike-1.jpg' },
    { id: 10, nombre: 'Zapatilla de running nike negra', precio: 22000, img: 'assets/zapatillas-nike-2.jpg' },
    { id: 11, nombre: 'Zapatillas de running nike azules', precio: 20000, img: 'assets/zapatillas-nike-3.jpg' },
    { id: 12, nombre: 'Zapatilla de basquet topper negra', precio: 10000, img: 'assets/zapatilla-topper-1.jpg' },
    { id: 13, nombre: 'Zapatilla de running under armour verde', precio: 10000, img: 'assets/zapatilla-under-armour-1.jpg' },
];

function cargarProductos() {
    const productosGrid = document.querySelector('.productos-grid');
    
    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        
        const imgProducto = document.createElement('img');
        imgProducto.src = producto.img; 
        imgProducto.alt = producto.nombre; 
        
        const descripcion = document.createElement('p');
        descripcion.textContent = `${producto.nombre} - Precio $${producto.precio}`;
        
        const btnAgregar = document.createElement('button');
        btnAgregar.textContent = 'Agregar al carrito';
        btnAgregar.classList.add('agregar-btn');
        btnAgregar.addEventListener('click', () => agregarAlCarrito(producto));
        
        divProducto.appendChild(imgProducto);
        divProducto.appendChild(descripcion);
        divProducto.appendChild(btnAgregar);
        
        productosGrid.appendChild(divProducto);
    });
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({...producto, cantidad: 1});
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoGrid = document.querySelector('.carrito-grid');
    carritoGrid.innerHTML = ''; 

    if (carrito.length === 0) {
        const mensajeVacio = document.createElement('p');
        mensajeVacio.textContent = 'El carrito está vacío.';
        carritoGrid.appendChild(mensajeVacio);
    } else {
        let subtotal = 0;

        carrito.forEach(producto => {
            const divProductoCarrito = document.createElement('div');
            divProductoCarrito.classList.add('producto-carrito');

            const descripcionCarrito = document.createElement('p');
            descripcionCarrito.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio $${producto.precio * producto.cantidad}`;

            divProductoCarrito.appendChild(descripcionCarrito);
            carritoGrid.appendChild(divProductoCarrito);

            subtotal += producto.precio * producto.cantidad;
        });

        const divSubtotal = document.createElement('div');
        divSubtotal.classList.add('producto-carrito');
        divSubtotal.innerHTML = `<p style="font-size: 1.5em; text-align: center; font-weight: bold;">Subtotal: $${subtotal}</p>`;
        carritoGrid.appendChild(divSubtotal);
    }
}

window.onload = function() {
    localStorage.removeItem('carrito');

    cargarProductos();

    document.getElementById('verCarritoBtn').addEventListener('click', mostrarCarrito);
};
