import { clientServices } from "../appservice.js";


//Verificación de categoría
const url = new URL(window.location);
const id = url.searchParams.get("id");
if(id == null) {
    window.location.href = "/pages/404.html";
}
//

//Habilitación de categorías//No me deja entrar al forEach
let tipoDeCategoria = [];
clientServices.listaCategorias().then((data) => {
    data.map((dat) => {
        const crerCategoria = {nombre: dat.nombre, idClass: dat.idClass };
        tipoDeCategoria.push(crerCategoria)
    })
}).then(() => {
    tipoDeCategoria.forEach((data) => {
        if(data.idClass === id){
            categoriaDeProductos(data.nombre);
        }
    })
}   
).catch(() => alert('Hay un error'))



const categorias = document.querySelector('.categorias');
const categoriaDeProductos  = (categoria) =>{
    const seccion = document.createElement('section');
    categorias.appendChild(seccion);
    seccion.classList.add('categoria');
    const contenidoSeccion = `
        <h2 class="categoria__titulo" style="font-weight: 400; font-size: 1.5rem;" >Productos por Categoría</h2>
        <div class="categoria__tipo">
            <h2 class="categoria__titulo">${categoria}</h2>
        </div>
        <div class="categoria__container"></div> `;
    seccion.innerHTML = contenidoSeccion;
    return seccion;
};


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
    const productosFiltrados = data.filter((producto) => producto.idCategoria === id ).reverse().slice(0,40);
        productosFiltrados.map((data) =>{
            const lista = document.querySelector('.categoria__container');
            const contenidoCaja = bloqueProducto(data.nombre,data.precio,data.imagen,data.id);
            lista.appendChild(contenidoCaja);
        });

}).catch(() => alert('Ocurrió un error'));



