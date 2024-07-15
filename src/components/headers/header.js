import { Home } from "../../pages/home/home"
import { loginRegister } from "../../pages/loginRegister/loginRegister"
import { myTravels } from "../../pages/myTravels/myTravels"
import { createEvent } from "../../pages/createTravels/createTravels"


import "./header.css"


const routes = [
    {

        function: Home,
        image: "https://cdn-icons-png.flaticon.com/128/4586/4586976.png"
    },
    {
        text: "Create Travel",
        function: createEvent
    },
    {
        text: "My Travels",
        function: myTravels
    },
    {
        text: "Login",
        function: loginRegister
    }
]


export const Header = () => {
    const header = document.querySelector("header");
    const divHeader = document.createElement("div")
    header.innerHTML = "";
    const nav = document.createElement("nav");
    const p1 = document.createElement("p")

    p1.textContent = "FriendsFly"

    for (const route of routes) {
        const a = document.createElement("a");
        a.href = "#";


        if (route.text === "Login" && localStorage.getItem("token")) {
            const user = JSON.parse(localStorage.getItem("user"));
            a.textContent = "Logout";

            a.addEventListener("click", () => {
                localStorage.removeItem("token");
                Header()
            });
        } else {
            if (route.image) {
                const img = document.createElement("img");
                img.src = route.image;
                img.id = "plane"


                a.appendChild(img);
            } else {
                a.textContent = route.text;
            }
            a.addEventListener("click", route.function);
        }
        nav.appendChild(a);
    }

    divHeader.append(p1)
    header.append(divHeader)
    header.append(nav);
};

