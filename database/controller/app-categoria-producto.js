import { clientServices } from "../appservice.js";

//Habilitación de categorías
let tipoDeCategoria= [];
clientServices.listaCategorias().then((data) => {
    data.map((dat) => {
        const crerCategoria = {nombre: dat.nombre, idClass: dat.idClass };
        tipoDeCategoria.push(crerCategoria)
    })
})

const categorias = document.querySelector('.categorias');
const categoriaDeProductos  = (categoria, idClass) =>{
    const seccion = document.createElement('section');
    categorias.appendChild(seccion);
    seccion.classList.add('categoria');
    const contenidoSeccion = `<div class="categoria__tipo">
    <h2 class="categoria__titulo">${categoria}</h2>
    <a class="categoria__ver-todo"href="../pages/productos-categorias.html?id=${idClass}">Ver todo<img src="./assets/img/flecha.svg" alt="ver más"></a>
    </div>
    <div class="categoria__container ${idClass}"></div> `;
    seccion.innerHTML = contenidoSeccion;
    return seccion;
};


const bloqueProducto = (nombre, precio,imagen,id) =>{
    const caja = document.createElement('div');
    caja.classList.add('producto');
    const contenido = `
        <div class="producto__caja-imagen">
            <img class="producto__imagen" src=${imagen}>
        </div>
        <span class="producto__nombre">${nombre}</span>
        <span class="producto__precio">$ ${precio}</span>
        <a class="producto__link" href="../pages/producto.html?id=${id}">Ver producto ></a> `;
    
    caja.innerHTML = contenido;

    return caja;
}

clientServices.listaProductos().then((data) =>{

    tipoDeCategoria.map((categoria) => {
        const { nombre, idClass} = categoria;
        //Crea las categorías
        categoriaDeProductos(nombre, idClass);

        //Coloca los productos en las categorías
        const productosFiltrados = data.filter((producto) => producto.idCategoria === idClass ).reverse().slice(0,4);
        // const productosFiltrados = data.filter((producto) => producto.idCategoria === idClass );//Filtrar la categoría
        //const reverse = productosFiltrados.reverse();// Invertir el array
        //const productosRecientes = reverse.slice(0, 4);//SEleccionar los primeros 4 elementos
        productosFiltrados.map((data) =>{
            const lista = document.querySelector('.' + idClass);
            const contenidoCaja = bloqueProducto(data.nombre,data.precio,data.imagen,data.id);
            lista.appendChild(contenidoCaja);
        });
    });

}).catch((error) => alert('Ocurrió un error')); 





