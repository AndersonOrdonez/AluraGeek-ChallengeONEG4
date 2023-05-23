import { clientServices } from "../appservice.js";

const login = document.querySelector("[data-form]");

login.addEventListener('submit',(e) => {
    e.preventDefault();

    const email = document.querySelector("[data-email]").value;
    const password = document.querySelector("[data-password]").value;

    clientServices.usuario().then((user) => {

        user.forEach((data) => {
            
            if(data.email === email && data.password === password){
                window.location.href = `./productos.html?id=${data.id}`
            }
        });

    }).catch((error) => alert(error))

})

