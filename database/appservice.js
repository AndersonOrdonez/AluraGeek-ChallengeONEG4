const URL = 'https://examplealurageek.onrender.com';

const listaProductos = () => fetch(`${URL}/producto`).then((respuesta) => respuesta.json());
const listaCategorias = () => fetch(`${URL}/categoria`).then((respuesta) => respuesta.json());
const usuario = () => fetch(`${URL}/usuario`).then((respuesta) => respuesta.json());

//LEER/PARA LEER EL ID
const producto = (id) => {
    return fetch(`${URL}/producto/${id}`).then((respuesta) => respuesta.json());
};

//CREAR: POST
const crearProducto = (nombre,precio,imagen,descripcion,categoria,idCategoria) => {
    return fetch(`${URL}/producto`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: uuid.v4(),nombre,precio,imagen,descripcion,categoria,idCategoria}), 
    })
}

//ACTUALIZAR: PUT
const actualizarProducto = (nombre,precio,imagen,descripcion,categoria,idCategoria,id) => {
    return fetch(`${URL}/producto/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre,precio,imagen,descripcion,categoria,idCategoria})
    })
    .then(respuesta => respuesta)
    .catch((error) => console.log(error));
};

//Borrar: DELETE
const eliminarProducto = (id) => {
    return fetch(`${URL}/producto/${id}`, {
        method: 'DELETE'
    })
}




export const clientServices = {
    listaProductos,
    usuario,
    producto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    listaCategorias,
};