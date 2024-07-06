
import { Header } from "../../components/headers/header";
import { Home } from "../home/home";
import "./loginRegister.css";
import { register } from "./register";





export const loginRegister = () => {
    const main = document.querySelector("main");
    main.innerHTML = "";

    const loginDiv = document.createElement("div");
    loginDiv.id = "login";

    Login(loginDiv);

    main.appendChild(loginDiv);
};

const Login = (mainElement) => {
    const initSesion = document.createElement("h2");
    const form = document.createElement("form");
    const pLogin = document.createElement("p");
    const pA = document.createElement("a");

    const inputUn = document.createElement("input");
    const inputPass = document.createElement("input");
    const button = document.createElement("button");

    inputUn.placeholder = "User Name";
    inputPass.placeholder = "Password";
    button.textContent = "Login";
    initSesion.textContent = "Log In";

    inputPass.type = "password";

    const card = document.createElement("div");
    card.className = "card";

    card.appendChild(initSesion);
    card.appendChild(form);

    pLogin.appendChild(pA);
    pA.textContent = "¿Todavía no estás registrado?";
    pA.href = "#";
    pA.addEventListener('click', (e) => {
        e.preventDefault();
        register();
    });

    form.appendChild(inputUn);
    form.appendChild(inputPass);
    form.appendChild(button);
    form.appendChild(pLogin);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        submit(inputUn.value, inputPass.value, form);
    });

    mainElement.appendChild(card);
};

const submit = async (userName, password, form) => {
    const objetoFinal = JSON.stringify({ userName, password });

    const options = {
        method: "POST",
        body: objetoFinal,
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const res = await fetch("http://localhost:3000/api/v1/users/login", options);
        if (res.status === 400) {
            let pError = document.querySelector(".error");

            if (!pError) {
                pError = document.createElement("p");
                pError.classList.add("error");
                pError.style.color = "red";
                form.appendChild(pError);
            }

            pError.textContent = "Usuario o contraseña incorrectos";
            return;
        }

        const pError = document.querySelector(".error");
        if (pError) {
            pError.remove();
        }

        const respuestaFinal = await res.json();
        localStorage.setItem("token", respuestaFinal.token);
        localStorage.setItem("user", JSON.stringify(respuestaFinal.user));
        Home();
        Header();
    } catch (error) {
        console.error("Error en la solicitud de login", error);
    }
};