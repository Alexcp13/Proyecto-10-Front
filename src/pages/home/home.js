import { loginRegister } from "../loginRegister/loginRegister";
import "./home.css";

export const Home = async () => {
    const main = document.querySelector("main");

    main.innerHTML = "";

    const res = await fetch("http://localhost:3000/api/v1/events");
    const events = await res.json();
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

        title.textContent = event.title;
        divEvents.className = "event";
        eventImg.src = event.eventImg;
        date.textContent = event.date;
        description.textContent = event.description;
        assistants.textContent = `Asistentes: ${event.assistants.length}`;
        addButton.textContent = "Apuntarse al viaje";
        addButton.className = "form-button";

        addButton.addEventListener("click", () => addAssistant(event._id));

        divEvents.append(title, eventImg, date, description, assistants, addButton);
        divEvent.append(divEvents);
    });

    mainElement.append(divEvent);
};

const addAssistant = async (eventId) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            loginRegister();
            return;
        }
        const res = await fetch(`http://localhost:3000/api/v1/events/${eventId}/add`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        });

        console.log("Usuario agregado correctamente");
        Home();
    } catch (error) {
        console.error(error);
    }
};