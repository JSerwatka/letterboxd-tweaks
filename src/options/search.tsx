import { createResource, createSignal, on, onMount } from "solid-js";
import { onCleanup } from "solid-js";
import { waitForElement } from "@utils/element-observers";
import { render } from "solid-js/web";

async function fetchMovies(source: any) {
    console.log(source);
    // // abort the previous request if it's still ongoing
    // if (controller && !controller.signal.aborted) {
    //     controller.abort();
    // }

    // controller = new AbortController();
    // const signal = controller.signal;

    // const userInput = searchField.value;
    // let response;

    // try {
    //     response = await fetch(
    //         `https://letterboxd.com/s/autocompletefilm?q=${userInput}&limit=10&timestamp=1700657512497&adult=false`,
    //         { signal }
    //     );
    // } catch (err) {
    //     // ignore abort error
    //     if (err instanceof Error && err.name !== "AbortError") {
    //     }
    // }

    // if (!response) {
    //     return;
    // }

    // const movieList = await response.json();

    // const movieListMapped = await Promise.all(
    //     movieList.data.map(async (movie: any) => {
    //         const posterPageResponse = await fetch(`https://letterboxd.com/ajax/poster${movie.url}std/110x165/`, {
    //             signal
    //         });
    //         const posterPageText = await posterPageResponse.text();

    //         const parser = new DOMParser();
    //         const posterPageHTML = parser.parseFromString(posterPageText, "text/html");

    //         const posterImgElement = posterPageHTML.querySelector("img.image:not(.empty-poster-image)") as
    //             | HTMLImageElement
    //             | null
    //             | undefined;

    //         return {
    //             url: movie.url,
    //             name: movie.name,
    //             releaseYear: movie.releaseYear,
    //             directors: movie.directors,
    //             poster: posterImgElement?.src
    //         };
    //     })
    // );
}

export function SearchAutocomplete() {
    let controller: AbortController | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    const [searchValue, setSearchValue] = createSignal();
    const [data] = createResource(searchValue, fetchMovies);

    onMount(async () => {
        const searchInputField = await waitForElement(document, "form#search input#search-q");

        searchInputField?.addEventListener("keyup", async (event: Event) => {
            const searchField = event.target as HTMLInputElement;

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // timeout for request throttling
            timeoutId = setTimeout(() => setSearchValue(searchField.value), 200);
        });
    });

    onCleanup(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        if (controller && !controller.signal.aborted) {
            controller.abort();
        }
    });

    return (
        <>
            <div>hello</div>
            {/* <input id="search-q" type="text" placeholder="Search movies..." /> */}
            {/* {loading() && <div>Loading...</div>} */}
            {/* Render movies here */}
        </>
    );
}

export function renderSearch() {
    return render(() => <SearchAutocomplete />, document);
}
