import './style.css'

import {createState, createStateFixed} from "./StateWithGetter";

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`

function update() {
  app.innerHTML = `
  <h1>Hello Vite!</h1>
  State: ${state.state.value},
  Fixed? ${fixedState.state.value}
`
}

const state = createState();
const fixedState = createStateFixed();

state.subscribe(update);
fixedState.subscribe(update);