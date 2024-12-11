let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

async function cargarProductos() {
    const response = await fetch('data/productos.json');
    const productos = await response.json();

    const productosGrid = document.querySelector('.productos-grid');
    productosGrid.innerHTML = '';

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
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    Swal.fire({
        icon: 'success',
        title: 'Producto agregado al carrito',
        text: `${producto.nombre} ha sido añadido.`,
        timer: 1500,
        showConfirmButton: false
    });

    actualizarCarrito();
}

function mostrarCarrito() {
    const carritoContainer = document.querySelector('.carrito-grid');
    carritoContainer.innerHTML = '';
    const carritoData = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if (carritoData.length === 0) {
        carritoContainer.textContent = 'Tu carrito está vacío';
        return;
    }

    let subtotal = 0;
    carritoData.forEach(item => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto-carrito');

        const descripcion = document.createElement('p');
        descripcion.textContent = `${item.nombre} x${item.cantidad} - Precio $${item.precio * item.cantidad}`;

        divProducto.appendChild(descripcion);
        carritoContainer.appendChild(divProducto);

        subtotal += item.precio * item.cantidad;
    });

    const divSubtotal = document.createElement('div');
    divSubtotal.classList.add('producto-carrito');
    divSubtotal.innerHTML = `<p style="font-size: 1.5em; text-align: center; font-weight: bold;">Subtotal: $${subtotal}</p>`;
    carritoContainer.appendChild(divSubtotal);
}

function actualizarCarrito() {
    const carritoData = JSON.parse(localStorage.getItem('carrito')) || [];
    const cantidadCarrito = carritoData.reduce((total, item) => total + item.cantidad, 0);
    const carritoBtn = document.getElementById('verCarritoBtn');
    carritoBtn.textContent = `Ver Carrito (${cantidadCarrito})`;
}

window.onload = function() {
    cargarProductos();
    actualizarCarrito();

    const carritoBtn = document.getElementById('verCarritoBtn');
    if (carritoBtn) {
        carritoBtn.addEventListener('click', mostrarCarrito);
    }
};
