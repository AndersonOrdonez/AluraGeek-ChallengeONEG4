import { clientServices } from "../appservice.js";

const bloqueProducto = (nombre, precio,imagen,id) =>{
    const caja = document.createElement('div');
    caja.classList.add('producto');
    const contenido = `
        <div class="producto__caja-imagen">
            <img class="producto__imagen" src='.${imagen}'>
        </div>
        <span class="producto__nombre">${nombre}</span>
        <span class="producto__precio">$ ${precio}</span>
        <a class="producto__link" href="./producto.html?id=${id}">Ver producto ></a> `;
    
    caja.innerHTML = contenido;

    return caja;
}

clientServices.listaProductos().then((data) => {
        const productosFiltrados = data.reverse().slice(0,40);
        productosFiltrados.map((data) =>{
            const lista = document.querySelector('.categoria__container');
            const contenidoCaja = bloqueProducto(data.nombre,data.precio,data.imagen,data.id);
            lista.appendChild(contenidoCaja);
        });

}).catch((error) => alert('Ocurrió un error'));



