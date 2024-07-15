import { Home } from "../home/home";
import { loginRegister } from "../loginRegister/loginRegister";

import "./createTravels.css"


export const createEvent = () => {
    const main = document.querySelector("main");
    main.innerHTML = "";

    const eventDiv = document.createElement("div");
    createEventForm(eventDiv);

    eventDiv.id = "create-event";
    main.appendChild(eventDiv);
};

const createEventForm = (mainElement) => {
    const form = document.createElement("form");
    form.className = "event-form";

    const h2Create = document.createElement("h2")
    h2Create.textContent = "Create your travel"

    const inputTitle = document.createElement("input");
    inputTitle.className = "form-input";
    inputTitle.placeholder = "Event Title";
    inputTitle.maxLength = 50;

    const inputDate = document.createElement("input");
    inputDate.type = "date";
    inputDate.className = "form-input";
    inputDate.placeholder = "Event Date";

    const inputLocation = document.createElement("input");
    inputLocation.className = "form-input";
    inputLocation.placeholder = "Event Location";
    inputLocation.maxLength = 100;

    const inputDescription = document.createElement("input");
    inputDescription.className = "form-input";
    inputDescription.placeholder = "Event Description";
    inputDescription.maxLength = 300;

    const inputImg = document.createElement("input");
    inputImg.className = "form-input";
    inputImg.type = "file";

    const button = document.createElement("button");
    button.className = "form-button";
    button.textContent = "Create Event";


    form.appendChild(h2Create);
    form.appendChild(inputTitle);
    form.appendChild(inputDate);
    form.appendChild(inputLocation);
    form.appendChild(inputDescription);
    form.appendChild(inputImg);
    form.appendChild(button);

    mainElement.appendChild(form);

    form.addEventListener("submit", submit);
};

const submit = async (e) => {
    e.preventDefault();

    const [inputTitle, inputDate, inputLocation, inputDescription, inputImg] = e.target;


    let errorPara = document.querySelector(".error");

    if (!inputTitle.value || !inputDate.value || !inputLocation.value || !inputDescription.value) {
        let errorPara = document.querySelector(".error");
        if (!errorPara) {
            errorPara = document.createElement("p");
            errorPara.classList.add("error");
            errorPara.style.color = "red";
            e.target.appendChild(errorPara);
        }
        errorPara.textContent = "Necesitas rellenar todos los campos para crear el evento";
    }












    const body = new FormData();

    body.append("title", inputTitle.value)
    body.append("date", inputDate.value)
    body.append("location", inputLocation.value)
    body.append("description", inputDescription.value)
    body.append("eventImg", inputImg.files[0])


    const token = localStorage.getItem("token");
    if (!token) {
        loginRegister();
        return;
    }

    const res = await fetch("http://localhost:3000/api/v1/events", {
        method: "POST",
        headers: {

            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: body
    });
    const response = await res.json();

    if (res.status === 201) {

        console.log("Event created!");
        Home();
    } else {

        console.error("Error creating event");
    }


};