import "@tailwind";
import { checkIfOptionPage } from "@utils/page-lookup";

// TODO run functions of all options in storage
console.log("options");

chrome.storage.onChanged.addListener((changes, areaName) => {
    console.log(changes, areaName);
    if (areaName === "sync") {
        console.log("local storage has changed", changes);
        // TODO run given option's function
    }
});

async function main() {
    // using window is the easiest way to access pathname
    // console.log(window.location.pathname);
    // console.log(checkIfOptionPage(["diary", "filmSingle"], true));
    // const file = await import("@options/films");
    // file["showFilmData"]();
    await import("@options/films/filmsContainer");
    // file["renderSearch"]();
    // file["addMovieToPrivateList"]();
    // file["profileMenuActions"]();
    // file["redirect"]();
    // file['hideProfileMenuLinks']();
    // file['hideNavbarLinks']();
}

main();
