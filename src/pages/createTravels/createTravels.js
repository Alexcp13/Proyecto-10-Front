import { FieldForm } from "../../components/FieldForms/FieldForm";
import { Home } from "../home/home";
import { loginRegister } from "../loginRegister/loginRegister";

import "./createTravels.css";

export const createEvent = () => {
    const main = document.querySelector("main");
    main.innerHTML = "";

    const eventDiv = document.createElement("div");
    createEventForm(eventDiv);

    eventDiv.id = "create-event";
    main.appendChild(eventDiv);
};
const createEventForm = (mainElement) => {
    const formHTML = `
        <form class="event-form">
            <h2>Create your travel</h2>
            ${FieldForm("Event Title", "text", "form-input", 50)}
            ${FieldForm("Event Date", "date", "form-input")}
            ${FieldForm("Event Location", "text", "form-input", 100)}
            ${FieldForm("Event Description", "text", "form-input", 300)}
            ${FieldForm("Event Image", "file", "form-input")}
            <button class="form-button">Create Event</button>
        </form>
    `;

    mainElement.innerHTML = formHTML;

    const form = mainElement.querySelector("form");
    form.addEventListener("submit", submit);
};
const submit = async (e) => {
    e.preventDefault();

    const [inputTitle, inputDate, inputLocation, inputDescription, inputImg] =
        e.target;

    let errorPara = document.querySelector(".error");

    if (
        !inputTitle.value ||
        !inputDate.value ||
        !inputLocation.value ||
        !inputDescription.value
    ) {
        let errorPara = document.querySelector(".error");
        if (!errorPara) {
            errorPara = document.createElement("p");
            errorPara.classList.add("error");
            errorPara.style.color = "red";
            e.target.appendChild(errorPara);
        }
        errorPara.textContent =
            "Necesitas rellenar todos los campos para crear el evento";
    }

    const body = new FormData();

    body.append("title", inputTitle.value);
    body.append("date", inputDate.value);
    body.append("location", inputLocation.value);
    body.append("description", inputDescription.value);
    body.append("eventImg", inputImg.files[0]);

    const token = localStorage.getItem("token");
    if (!token) {
        loginRegister();
        return;
    }

    const res = await fetch("http://localhost:3000/api/v1/events", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: body,
    });
    const response = await res.json();

    if (res.status === 201) {
        console.log("Event created!");
        Home();
    } else {
        console.error("Error creating event");
    }
};