import { render } from "solid-js/web";
import "@tailwind";
import Options from "./Options";
import FAQ from "./Options";

const root = document.querySelector("#root");

if (!root) {
    throw new Error("Can not find Root");
}

render(() => <Options />, root);
