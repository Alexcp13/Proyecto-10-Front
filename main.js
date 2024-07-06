import { Header } from './src/components/headers/header';
import { Footer } from './src/pages/footer/footer';
import { Home, } from './src/pages/home/home'

import './style.css'

const Main = () => {

  const app = document.querySelector("body");

  app.innerHTML = `
  <header></header>
  <main></main>
  <footer></footer>
  `

}


Main();
Header();
Home()
Footer()