import "./footer.css"


export const Footer = () => {
    const footer = document.querySelector("footer");
    footer.innerHTML = ""


    const p = document.createElement("p");
    p.textContent = "© " + new Date().getFullYear() + " FriendsFly. Todos los derechos reservados.";


    footer.appendChild(p);

    return footer;
}

