import { clientServices } from "../appservice.js";

//Verificación de página que sea accedido por un usuario válido.
const url = new URL(window.location);
const id = url.searchParams.get("id");
if(id == null) {
    window.location.href = "/pages/404.html";
}
//

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

    clientServices.crearProducto(nombre,precio,imagen,descripcion,categoria,idCategoria).then(() =>  {
        alert('Producto nuevo agregado')
    }).catch(() => alert('Hubo un error, producto no registrado'))
})