import { clientServices } from "../appservice.js";

const url = new URL(window.location);
const id = url.searchParams.get("id");

const productoDetalles = (nombre, precio, descripcion, imagen) => {
    const areaProducto = document.querySelector('.producto-item')
    const productoContenedor = document.createElement('section');
    productoContenedor.classList.add('container-item');
    areaProducto.appendChild(productoContenedor);
    const contenido = `<section class="producto-item__sobre">
        <img class="producto-item__imagen" src=".${imagen}" alt="">
        <div class="producto-item__textos" >
            <span class="producto-item__nombre">${nombre}</span>
            <span class="producto-item__precio">$ ${precio}</span>
            <span class="producto-item__descripcion">${descripcion}</span>
        </div>
    </section>`;
    productoContenedor.innerHTML = contenido;
    return areaProducto;
}

clientServices.producto(id).then(res => {
    productoDetalles(res.nombre, res.precio, res.descripcion, res.imagen);

    clientServices.listaProductos().then((data) =>{

        const productosFiltrados = data.filter((data) => data.idCategoria === res.idCategoria).reverse().slice(0,4); 
            productosFiltrados.map((data) =>{
                const lista = document.querySelector('.categoria__container');
                const contenidoCaja = bloqueProducto(data.nombre,data.precio,data.imagen,data.id);
                lista.appendChild(contenidoCaja); 
            });
    
    }).catch(() => alert('Ocurrió un error')); 

}).catch(() => alert('Ocurrió un error')); 


const bloqueProducto = (nombre, precio,imagen,id) =>{
    const caja = document.createElement('div');
    caja.classList.add('producto');
    const contenido = `
        <div class="producto__caja-imagen">
            <img class="producto__imagen" src='.${imagen}'>
        </div>
        <span class="producto__nombre">${nombre}</span>
        <span class="producto__precio">$ ${precio}</span>
        <a class="producto__link" href="../pages/producto.html?id=${id}">Ver producto ></a> `;
    
    caja.innerHTML = contenido;

    return caja;
}







