
import { apiFetch } from "../../application/apiFetch";
import { FieldForm } from "../../components/FieldForms/FieldForm";
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
    const card = document.createElement("div");
    card.className = "card";

    const formHTML = `
        <h2>Log In</h2>
        <form>
            ${FieldForm("User Name", "text", "username")}
            ${FieldForm("Password", "password", "password")}
            <button>Login</button>
            <p><a href="#">¿Todavía no estás registrado?</a></p>
        </form>
    `;

    card.innerHTML = formHTML;
    mainElement.appendChild(card);

    const form = card.querySelector("form");
    const inputUn = form.querySelector(".username");
    const inputPass = form.querySelector(".password");
    const pA = form.querySelector("a");

    pA.addEventListener('click', (e) => {
        e.preventDefault();
        register();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        submit(inputUn.value, inputPass.value, form);
    });
};
const submit = async (userName, password, form) => {
    const objetoFinal = { userName, password };
    const loadingIndicator = document.createElement("p");
    loadingIndicator.textContent = "Cargando...";
    loadingIndicator.style.display = "block";
    form.appendChild(loadingIndicator);

    try {
        let res;


        await new Promise((resolve, reject) => {
            setTimeout(() => {
                apiFetch("/users/login", "POST", objetoFinal)
                    .then(response => {
                        res = response;
                        resolve();
                    })
                    .catch(reject);
            }, 4000);
        });

        loadingIndicator.style.display = "none";

        if (!res.token) {
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

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        Home();
        Header();
    } catch (error) {
        loadingIndicator.style.display = "none";
        console.error("Error en la solicitud de login", error.message);
        let pError = document.querySelector(".error");

        if (!pError) {
            pError = document.createElement("p");
            pError.classList.add("error");
            pError.style.color = "red";
            form.appendChild(pError);
        }

        pError.textContent = "Error en la solicitud de login: " + error.message;
    }
};