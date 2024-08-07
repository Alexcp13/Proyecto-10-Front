
import { apiFetch } from "../../application/apiFetch";
import { loginRegister } from "../loginRegister/loginRegister";
import "./home.css";


export const Home = async () => {
    const main = document.querySelector("main");

    main.innerHTML = "";

    const events = await apiFetch("/events")
    doEvents(events, main);
};

const doEvents = (events, mainElement) => {
    const divEvent = document.createElement("div");
    divEvent.className = "divEvent";

    events.forEach(event => {
        const divEvents = document.createElement("div");
        const title = document.createElement("h3");
        const eventImg = document.createElement("img");
        const date = document.createElement("p");
        const description = document.createElement("p");
        const assistants = document.createElement("p");
        const addButton = document.createElement("button");
        const removeButton = document.createElement("button");

        title.textContent = event.title;
        divEvents.className = "event";
        eventImg.src = event.eventImg;
        date.textContent = event.date;
        description.textContent = event.description;
        assistants.textContent = `Asistentes: ${event.assistants.length}`;
        addButton.textContent = "Apuntarse al viaje";
        addButton.className = "form-button";
        removeButton.className = "form-button2";
        removeButton.textContent = "Salirse del viaje";

        const user = JSON.parse(localStorage.getItem("user"));
        const isAttending = event.assistants.includes(user._id);


        if (isAttending) {
            removeButton.style.display = "block";
            addButton.style.display = "none";
        } else {
            removeButton.style.display = "none";
            addButton.style.display = "block";
        }


        addButton.addEventListener("click", async () => {
            await addAssistant(event._id, assistants);
            removeButton.style.display = "block";
            addButton.style.display = "none";
        });

        removeButton.addEventListener("click", async () => {
            await removeAssistant(event._id, assistants);
            removeButton.style.display = "none";
            addButton.style.display = "block";
        });

        divEvents.append(title, eventImg, date, description, assistants, addButton, removeButton);
        divEvent.append(divEvents);
    });

    mainElement.append(divEvent);
};

const addAssistant = async (eventId, assistants) => {
    try {

        const token = localStorage.getItem("token");
        if (!token) {
            loginRegister();
            return;
        }

        const endpoint = `/events/${eventId}/add`;
        const res = await apiFetch(endpoint, 'PATCH', null, token);
        console.log(res);

        if (!res) {
            throw new Error(`Error al unirse al evento: ${res.statusText}`);
        }

        const assistantsCount = parseInt(assistants.textContent.split(": ")[1]);
        assistants.textContent = `Asistentes: ${assistantsCount + 1}`;

        console.log("Usuario agregado correctamente");

    } catch (error) {
        console.error(error);
    }
};

const removeAssistant = async (eventId, assistants) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            loginRegister();
            return;
        }

        const endpoint = `/events/${eventId}/remove`;
        const res = await apiFetch(endpoint, 'PATCH', null, token);
        console.log(res);

        if (!res) {
            throw new Error(`Error al unirse al evento: ${res.statusText}`);
        }


        const assistantsCount = parseInt(assistants.textContent.split(": ")[1]);
        assistants.textContent = `Asistentes: ${assistantsCount - 1}`;

        console.log("Has salido del viaje");

    } catch (error) {
        console.error(error);
    }
};