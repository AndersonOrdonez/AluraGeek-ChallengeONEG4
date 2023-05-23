import { clientServices } from "../appservice.js";

//Verificación de página que sea accedido por un usuario válido.
const url = new URL(window.location);
const id = url.searchParams.get("id");
if(id == null) {
    window.location.href = "/pages/404.html";
}
//

const bloqueProducto = (nombre, precio,imagen,id) =>{
    const caja = document.createElement('div');
    caja.classList.add('producto');
    const contenido = `
        <div class="producto__caja-imagen">
            <img class="producto__imagen" src='.${imagen}'>
        </div>
        <span class="producto__nombre">${nombre}</span>
        <span class="producto__precio">$ ${precio}</span>
        <a class="producto__link" href="./editar-producto.html?id=${id}">Editar producto ></a>
        <a class="producto__link delete" style="color: red; margin-top: 1rem;" id=${id}>Eliminar producto</a> `;
    
    caja.innerHTML = contenido;


    const btnDelete = caja.querySelector('.delete');
    btnDelete.addEventListener('click', (e) => {
        e.preventDefault();
        const idDelete = btnDelete.id;
        console.log(idDelete)
        clientServices.eliminarProducto(idDelete).then().catch (()=> alert('Error: No se eliminó')) 
    });

    return caja;
}

const linkAdmin = (idAdmin) => {
    const linkHref = document.querySelector('.categoria__tipo');
    const contenido = `
        <h2 class="categoria__titulo">Todos los productos</h2>
        <a class="todos__link" href="./nuevo-producto.html?id=${idAdmin}">Agregar producto</a>`
    linkHref.innerHTML = contenido;
}
linkAdmin(id);

clientServices.listaProductos().then((data) => {
        const productosFiltrados = data.reverse().slice(0,40);
        productosFiltrados.map((data) =>{
            const lista = document.querySelector('.categoria__container');
            const contenidoCaja = bloqueProducto(data.nombre,data.precio,data.imagen,data.id);
            lista.appendChild(contenidoCaja);
        });

}).catch((error) => alert('Ocurrió un error'));




