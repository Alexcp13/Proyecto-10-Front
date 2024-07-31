import { FieldForm } from "../../components/FieldForms/FieldForm";
import { Header } from "../../components/headers/header";
import { Home } from "../home/home";
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
    const card = document.createElement("div");
    card.className = "card";

    const formHTML = `
        <h2>Register</h2>
        <form>
            ${FieldForm("User Name", "text", "username")}
            ${FieldForm("Email", "email", "email")}
            ${FieldForm("Password", "password", "password")}
            <button>Register</button>
            <p><a href="#">¿Ya estás registrado? Inicia sesión</a></p>
        </form>
    `;

    card.innerHTML = formHTML;
    mainElement.appendChild(card);

    const form = card.querySelector("form");
    const inputUn = form.querySelector(".username");
    const inputEmail = form.querySelector(".email");
    const inputPass = form.querySelector(".password");
    const pA = form.querySelector("a");

    pA.addEventListener('click', (e) => {
        e.preventDefault();
        loginRegister();
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        submit(inputUn.value, inputPass.value, inputEmail.value, form);
    });
};

const submit = async (userName, password, email, form) => {
    const userObject = { userName, password, email };

    const loadingIndicator = document.createElement("p");
    loadingIndicator.textContent = "Cargando...";
    loadingIndicator.style.display = "block";
    form.appendChild(loadingIndicator);

    try {
        let response;


        await new Promise((resolve, reject) => {
            setTimeout(() => {
                fetch("http://localhost:3000/api/v1/users/register", {
                    method: "POST",
                    body: JSON.stringify(userObject),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(res => {
                        response = res;
                        resolve();
                    })
                    .catch(reject);
            }, 4000);
        });

        loadingIndicator.style.display = "none";

        if (response.status === 400) {
            console.error("Error al registrar el usuario");
            alert("Error al registrar el usuario");
            return;
        }

        console.log("Usuario registrado con éxito");
        alert("Usuario registrado con éxito");


        const loginResponse = await fetch("http://localhost:3000/api/v1/users/login", {
            method: "POST",
            body: JSON.stringify(userObject),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (loginResponse.status === 200) {
            console.log("Usuario logueado con éxito");
            const respuestaFinal = await loginResponse.json();
            localStorage.setItem("token", respuestaFinal.token);
            localStorage.setItem("user", JSON.stringify(respuestaFinal.user));
            Home();
            Header();
        } else {
            console.error("Error al iniciar sesión");
            alert("Error al iniciar sesión");
        }
    } catch (error) {
        loadingIndicator.style.display = "none";
        console.error("Error al realizar la petición:", error);
    }
};