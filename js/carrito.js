function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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
