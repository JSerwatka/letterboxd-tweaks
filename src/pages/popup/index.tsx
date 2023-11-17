import { render } from "solid-js/web";
import "@tailwind";
import Popup from "./Popup";
import { OptionsProvider } from "@context/OptionsContext";

const root = document.querySelector("#root");

if (!root) {
    throw new Error("Can not find Root");
}

render(
    () => (
        <OptionsProvider>
            <Popup />
        </OptionsProvider>
    ),
    root
);
