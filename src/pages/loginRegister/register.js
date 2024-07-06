import { loginRegister } from "./loginRegister";
import "./register.css";

export const register = () => {
    const main = document.querySelector("main");
    main.innerHTML = "";

    const registerDiv = document.createElement("div");
    registerDiv.id = "register";

    Register(registerDiv);

    main.appendChild(registerDiv);
};

const Register = (mainElement) => {
    const registerTitle = document.createElement("h2");
    const form = document.createElement("form");
    const pRegister = document.createElement("p");
    const pA = document.createElement("a");

    const inputUn = document.createElement("input");
    const inputEmail = document.createElement("input");
    const inputPass = document.createElement("input");
    const button = document.createElement("button");

    inputUn.placeholder = "User Name";
    inputEmail.placeholder = "Email";
    inputPass.placeholder = "Password";
    button.textContent = "Register";
    registerTitle.textContent = "Register";

    inputEmail.type = "email";
    inputPass.type = "password";

    const card = document.createElement("div");
    card.className = "card";

    card.appendChild(registerTitle);
    card.appendChild(form);

    pRegister.appendChild(pA);
    pA.textContent = "¿Ya estás registrado? Inicia sesión";
    pA.href = "#";
    pA.addEventListener('click', (e) => {
        e.preventDefault();
        loginRegister();
    });

    form.appendChild(inputUn);
    form.appendChild(inputEmail);
    form.appendChild(inputPass);
    form.appendChild(button);
    form.appendChild(pRegister);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        submit(inputUn.value, inputPass.value, inputEmail.value);
    });

    mainElement.appendChild(card);
};

const submit = async (userName, password, email) => {
    const userObject = JSON.stringify({ userName, password, email });

    const options = {
        method: "POST",
        body: userObject,
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch("http://localhost:3000/api/v1/users/register", options);
        if (response.status === 400) {
            console.error("Usuario o contraseña incorrectos");
        } else {
            console.log("Usuario registrado con éxito");
            alert("Usuario registrado con éxito");
        }
    } catch (error) {
        console.error("Error al realizar la petición:", error);
    }

    loginRegister();
};