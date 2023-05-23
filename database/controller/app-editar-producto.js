import { clientServices } from "../appservice.js";

//Verificación de producto a editar.
const url = new URL(window.location);
const id = url.searchParams.get("id");
if(id == null) {
    window.location.href = "/pages/404.html";
}
clientServices.producto(id).then((data) => {
    document.querySelector("[data-URLImagen]").value = data.imagen;
    document.querySelector("[data-categoria]").value = data.categoria;
    document.querySelector("[data-nombre]").value = data.nombre;
    document.querySelector("[data-precio]").value = data.precio;
    document.querySelector("[data-descripcion]").value = data.descripcion;

}).catch(() => alert('Hay un error con el servidor'));

//Habilitación de categorías
let tipoDeCategoria= [];
clientServices.listaCategorias().then((data) => {
    data.map((dat) => {
        const crerCategoria = {nombre: dat.nombre, idClass: dat.idClass };
        tipoDeCategoria.push(crerCategoria)
    })
})

const formulario = document.querySelector("[data-form]");

formulario.addEventListener('submit',(e) => {
    e.preventDefault();

    const imagen = document.querySelector("[data-URLImagen]").value;
    const categoria = document.querySelector("[data-categoria]").value;
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const descripcion = document.querySelector("[data-descripcion]").value;

    const asignarIdCategoria = () => {
        let id = '';
        tipoDeCategoria.forEach((cat) => {
            if(categoria === cat.nombre){
                id=cat.idClass;
            }
        })
        return id;
    }
    const idCategoria = asignarIdCategoria();

    clientServices.actualizarProducto(nombre,precio,imagen,descripcion,categoria,idCategoria,id).then(() =>  {
        alert('Producto actualizado')
    }).catch(() => alert('Hubo un error, producto no registrado'))
})

