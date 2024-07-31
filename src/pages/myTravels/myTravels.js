
import { apiFetch } from "../../application/apiFetch";
import { loginRegister } from "../loginRegister/loginRegister";
import "./myTravels.css";

export const myTravels = async (eventId) => {
    const main = document.querySelector("main");

    main.innerHTML = "";

    const token = localStorage.getItem("token");
    if (!token) {
        loginRegister();
        return;
    }

    const events = await apiFetch(`/events/${eventId}/myEvents`, 'GET', null, token);



    doEvents(events, main);
};

const doEvents = (events, mainElement) => {
    const divEvent = document.createElement("div");
    divEvent.className = "divEvent2";

    events.forEach(event => {
        const deleteButton = document.createElement("button")
        const divEvents = document.createElement("div");
        const title = document.createElement("h3");
        const eventImg = document.createElement("img");
        const date = document.createElement("p");
        const description = document.createElement("p");
        const assistants = document.createElement("p");
        const removeButton = document.createElement("button");
        const editButton = document.createElement("button");

        title.textContent = event.title;
        divEvents.className = "event2";
        eventImg.src = event.eventImg;
        date.textContent = event.date;
        description.textContent = event.description;
        assistants.textContent = `Asistentes: ${event.assistants.length}`;
        removeButton.textContent = "Salirse del viaje";
        removeButton.className = "form-button2";
        deleteButton.textContent = "Borrar viaje"
        deleteButton.className = "form-button3";
        editButton.textContent = "Editar viaje";
        editButton.className = "form-button4";
        const form = document.createElement("form");
        const user = JSON.parse(localStorage.getItem("user"));



        if (user._id === event.createdBy || user.role === 'admin') {
            deleteButton.style.display = "block";
            editButton.style.display = "block";
        } else {
            deleteButton.style.display = "none";
            editButton.style.display = "none";
        }



        deleteButton.addEventListener("click", () => deleteEvent(event._id));
        removeButton.addEventListener("click", () => removeAssistant(event._id));
        editButton.addEventListener("click", () => toggleForm(form));

        form.innerHTML = `
            <input type="text" name="title" placeholder="Título" value="${event.title}">
            <input type="date" name="date" value="${event.date}">
            <input type="text" name="location" placeholder="Ubicación" value="${event.location}">
            <textarea name="description" placeholder="Descripción">${event.description}</textarea>
            <button type="submit">Guardar cambios</button>
            <button type="button" class="cancel-button">Cancelar</button>
        `;
        form.className = "edit-form";
        form.style.display = "none";

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            updateEvent(event._id, form);
        });

        form.querySelector(".cancel-button").addEventListener("click", () => toggleForm(form));

        divEvents.append(title, eventImg, date, description, assistants, removeButton, editButton, deleteButton, form);
        divEvent.append(divEvents);
    });

    mainElement.append(divEvent);
};
const toggleForm = (form) => {
    form.style.display = form.style.display === "none" ? "block" : "none";
};
const updateEvent = async (eventId, form) => {
    const updateEventData = {
        title: form.title.value,
        date: form.date.value,
        location: form.location.value,
        description: form.description.value
    };

    try {
        const token = localStorage.getItem("token");
        const res = await apiFetch(`/events/${eventId}`, 'PATCH', updateEventData, token);




        if (!res) {
            throw new Error(`Error al unirse al evento: ${res.statusText}`);
        }


        if (!res) {
            throw new Error(`Error al actualizar el evento: ${res.statusText}`);
        }

        console.log("Evento actualizado");
        myTravels();
    } catch (error) {
        console.error(error);
    }
};

const removeAssistant = async (eventId) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            throw new Error("Usuario no encontrado en localStorage");
        }

        const token = localStorage.getItem("token");
        const res = await apiFetch(`/events/${eventId}/remove`, 'PATCH', { userId: user._id }, token);

        if (!res) {
            throw new Error(`Error al salirse del evento: ${res.statusText}`);
        }

        console.log("Has salido del viaje");
        myTravels();
    } catch (error) {
        console.error(error);
    }
};

const deleteEvent = async (eventId) => {
    try {
        const main = document.querySelector("main");



        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            throw new Error("Usuario no encontrado en localStorage");
        }
        const token = localStorage.getItem("token");
        const res = await apiFetch(`/events/${eventId}`, 'DELETE', { userId: user._id }, token);
        if (!res) {
            throw new Error(`Error al borrar: ${res.statusText}`);
        }


        console.log('Evento eliminado:', data);

    } catch (error) {
        console.error(error);
    }
    myTravels()
};